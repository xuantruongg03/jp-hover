// Content Script chính - Xử lý bắt vị trí chuột, nhận diện từ tiếng Nhật, hiển thị Tooltip & Sổ tay từ vựng

(function () {
  console.log('%c[JP Furigana Hover] v1.5.7 Loaded successfully!', 'color:#38bdf8;font-weight:bold;font-size:12px;');

  // Tránh inject trùng lặp trên cùng context
  if (window.__JP_HOVER_EXTENSION_INJECTED__) return;
  window.__JP_HOVER_EXTENSION_INJECTED__ = true;
  if (document.documentElement) {
    document.documentElement.setAttribute('data-jp-hover-injected', 'true');
  }

  // Cấu hình mặc định
  let settings = {
    enabled: true,
    allowQuickSearchWhenDisabled: true, // Cho phép mở bảng Tra cứu nhanh (Alt+S) không cần bật tiện ích
    activationMode: 'always', // 'always' | 'shift' | 'alt'
    showReading: true,
    showKatakana: true,
    readingFormat: 'hiragana', // 'hiragana' | 'katakana' | 'both'
    showRomaji: true,
    showHanViet: true,
    showMeaning: true,
    showKanjiBreakdown: true,
    showPitchAccent: true,
    showOnKunRule: true,
    showAnkiBtn: false,
    showCopyBtn: false,
    showLookupBtn: false,
    showPinBtn: true,
    showCloseBtn: true,
    enableVisualHighlight: false,
    enableOnlineFallback: true,
    enableSelectionTranslate: true,
    autoPlayAudio: false,
    speechRate: 0.95,
    speechPitch: 1.0,
    voiceUri: '',
    translationEngine: 'google',
    geminiApiKey: '',
    aiProvider: 'gemini',
    aiApiKey: '',
    aiModel: 'gemini-flash-latest',
    aiCustomEndpoint: '',
    aiEnableSentenceTranslate: true,
    aiEnableGrammarAnalysis: true,
    aiEnableWordExplain: true,
    feedbackWebhookUrl: ''
  };

  // Trạng thái hiện tại
  let currentWord = null;
  let currentReading = null;
  let currentHanViet = '';
  let currentMeaning = '';
  let currentWordData = null;
  let isMouseOverTooltip = false;
  let isPinned = false;
  let isSelectingOnPage = false;
  let scanExtend = 0; // Giữ lại để không phá API getWordAtOffset nhưng luôn = 0
  let lastHoverPos = { clientX: 0, clientY: 0 };
  let debounceTimer = null;
  let hideDelayTimer = null;
  let activeAbortController = null; // Quản lý hủy API khi người dùng di chuột đi nơi khác
  let shadowRoot = null;
  let cardElem = null;
  let highlightOverlay = null;
  let selectionBadge = null;
  let sentenceCard = null;
  let currentSelectedText = '';
  let savedWordsSet = new Set();
  let currentContextSentence = '';
  let lastUserTypingTime = 0;
  let strokeModalOverlay = null;
  let currentStrokeChar = '';
  let showStrokeNumbers = true;
  let feedbackModalOverlay = null;
  let activeFeedbackContext = {};
  let justOpenedSentenceCardAt = 0;
  let toastElem = null;
  let toastHideTimer = null;
  let lastToggleToastState = null;
  let lastToggleToastAt = 0;

  // Helper lưu trữ đồng nhất (Hỗ trợ cả Chrome Storage MV3 & LocalStorage dự phòng)
  function getStorageData(keys, callback) {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(keys, callback);
    } else {
      const res = {};
      keys.forEach(k => {
        try {
          const val = localStorage.getItem(k);
          if (val) res[k] = JSON.parse(val);
        } catch (_) {}
      });
      callback(res);
    }
  }

  function setStorageData(data, callback) {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set(data, callback);
    } else {
      Object.keys(data).forEach(k => {
        try {
          localStorage.setItem(k, JSON.stringify(data[k]));
        } catch (_) {}
      });
      if (callback) callback();
    }
  }

  // 1. Tải cài đặt và danh sách từ đã lưu
  getStorageData(['jpSettings', 'jpSavedWords'], (res) => {
    if (res && res.jpSettings) {
      settings = { ...settings, ...res.jpSettings };
      window.__JP_SETTINGS__ = settings;
      window.__JP_EXTENSION_ENABLED__ = settings.enabled !== false;
      const qs = window.quickSearchPalette || (typeof quickSearchPalette !== 'undefined' ? quickSearchPalette : null);
      if (qs) {
        if (qs.setAllowWhenDisabled) qs.setAllowWhenDisabled(settings.allowQuickSearchWhenDisabled !== false);
        if (qs.setEnabled) qs.setEnabled(settings.enabled !== false);
      }
    }
    if (res && Array.isArray(res.jpSavedWords)) {
      savedWordsSet = new Set(res.jpSavedWords.map(item => item.word));
    }
  });

  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local') {
        if (changes.jpSettings) {
          const prevEnabled = settings.enabled !== false;
          const nextVal = (changes.jpSettings.newValue && typeof changes.jpSettings.newValue === 'object')
            ? changes.jpSettings.newValue
            : {};
          settings = { ...settings, ...nextVal };
          const nextEnabled = settings.enabled !== false;
          window.__JP_SETTINGS__ = settings;
          window.__JP_EXTENSION_ENABLED__ = nextEnabled;
          const qs = window.quickSearchPalette || (typeof quickSearchPalette !== 'undefined' ? quickSearchPalette : null);
          if (qs) {
            if (qs.setAllowWhenDisabled) qs.setAllowWhenDisabled(settings.allowQuickSearchWhenDisabled !== false);
            if (qs.setEnabled) qs.setEnabled(nextEnabled);
          }
          if (!nextEnabled) {
            hideAllPopups(true);
          }
          if (prevEnabled !== nextEnabled) {
            showToggleToast(nextEnabled);
          }
        }
        if (changes.jpSavedWords) {
          const list = changes.jpSavedWords.newValue || [];
          savedWordsSet = new Set(list.map(item => item.word));
          updateStarButtonState();
        }
        if (changes.jpCustomDictionary) {
          if (typeof japaneseEngine !== 'undefined' && japaneseEngine && japaneseEngine.onlineCache) {
            japaneseEngine.onlineCache.clear();
          }
        }
      }
    });
  }

  // Cập nhật trạng thái nút Ngôi sao (Đã lưu / Chưa lưu)
  function updateStarButtonState() {
    if (!cardElem) return;
    const starBtn = cardElem.querySelector('#jp-star-btn');
    if (starBtn && currentWord) {
      if (savedWordsSet.has(currentWord)) {
        starBtn.classList.add('active');
        starBtn.title = 'Bỏ lưu khỏi Sổ tay từ vựng';
      } else {
        starBtn.classList.remove('active');
        starBtn.title = 'Lưu vào Sổ tay từ vựng (⭐)';
      }
    }
  }

  // 2. Khởi tạo Shadow DOM UI để cô lập hoàn toàn với trang web
  function initShadowDOM() {
    let host = document.getElementById('jp-hover-extension-root');
    if (host) {
      try {
        host.remove();
      } catch (_) {}
    }

    host = document.createElement('div');
    host.id = 'jp-hover-extension-root';
    host.style.position = 'absolute';
    host.style.top = '0';
    host.style.left = '0';
    host.style.zIndex = '2147483647';
    host.style.pointerEvents = 'none';

    const parent = document.body || document.documentElement;
    if (parent) {
      parent.appendChild(host);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        if (!document.getElementById('jp-hover-extension-root')) {
          (document.body || document.documentElement).appendChild(host);
        }
      });
    }

    try {
      shadowRoot = host.attachShadow({ mode: 'open' });
    } catch (e) {
      console.warn('JP Hover: attachShadow error:', e);
      return;
    }

    // Nhúng toàn bộ CSS trực tiếp qua thẻ <style> vào ShadowRoot
    // Tuyệt đối KHÔNG dùng thẻ <link href="chrome-extension://..."> vì sẽ bị trình duyệt chặn trên YouTube, Netflix do vi phạm chính sách Same-Origin/COEP
    const styleElem = document.createElement('style');
    styleElem.textContent = getDefaultCss();
    shadowRoot.appendChild(styleElem);

    // 1. Tạo lớp Highlight dạ quang trên trang web
    highlightOverlay = document.createElement('div');
    highlightOverlay.className = 'jp-highlight-overlay';
    shadowRoot.appendChild(highlightOverlay);

    // 2. Tạo Card HTML Tooltip
    cardElem = document.createElement('div');
    cardElem.className = 'jp-card';
    cardElem.innerHTML = `
      <div class="jp-header">
        <div class="jp-word-box">
          <div class="jp-reading-row">
            <span class="jp-reading" id="jp-reading"></span>
            <span class="jp-reading-kata" id="jp-reading-kata" style="display:none;" title="Phiên âm Katakana"></span>
            <span class="jp-pitch-badge" id="jp-pitch-badge" style="display:none;"></span>
          </div>
          <div class="jp-main-word" id="jp-word" title="Click để sao chép từ vựng"></div>
        </div>
        <div class="jp-actions">
          <button class="jp-anki-btn" id="jp-anki-btn" title="Thêm vào Anki Desktop 1-Click (Phím E)" style="display:none;">📥 Anki</button>
          <button class="jp-icon-btn jp-audio-btn" id="jp-audio-btn" title="Phát âm tiếng Nhật (Phím S)">
            <svg viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </button>
          <button class="jp-icon-btn jp-star-btn" id="jp-star-btn" title="Lưu vào Sổ tay từ vựng (Phím W)">⭐</button>
          <button class="jp-icon-btn jp-copy-btn" id="jp-copy-btn" title="Sao chép từ (Phím C)" style="display:none;">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
          <button class="jp-icon-btn jp-lookup-btn" id="jp-lookup-btn" title="Tra cứu Mazii" style="display:none;">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button class="jp-icon-btn jp-ai-btn" id="jp-ai-btn" title="Hỏi AI phân tích & giải thích sâu từ vựng">✨</button>
          <button class="jp-icon-btn" id="jp-pin-btn" title="Ghim popup cố định (Phím P)">📌</button>
          <button class="jp-icon-btn" id="jp-close-btn" title="Đóng (Esc)">✕</button>
        </div>
      </div>
      
      <div class="jp-tags-row" id="jp-tags-row"></div>
      
      <div class="jp-meaning-container" id="jp-meaning-container">
        <div class="jp-meaning-box" id="jp-meaning-box">
          <span class="jp-meaning-icon">💡</span>
          <span id="jp-meaning-text"></span>
        </div>
        <div class="jp-synonyms-row" id="jp-synonyms-row" style="display:none;"></div>
      </div>

      <!-- Khung giải thích AI chuyên sâu (Khi bấm nút ✨) -->
      <div class="jp-ai-panel" id="jp-ai-panel" style="display:none;">
        <div class="jp-ai-panel-header">
          <span class="jp-ai-panel-title">✨ Trí tuệ Nhân tạo AI</span>
          <button type="button" class="jp-ai-panel-close" id="jp-ai-panel-close" title="Đóng panel AI">✕</button>
        </div>
        <div class="jp-ai-panel-body" id="jp-ai-panel-body"></div>
      </div>

      <!-- Bảng phân tích Ngữ pháp & Quy tắc âm On/Kun -->
      <div class="jp-grammar-panel" id="jp-grammar-panel" style="display:none;">
        <div class="jp-grammar-row" id="jp-grammar-form-row" style="display:none;">
          <span class="jp-grammar-label" id="jp-grammar-label">📚 Ngữ pháp:</span>
          <span class="jp-grammar-val" id="jp-grammar-pos-val"></span>
        </div>
        <div class="jp-rule-box" id="jp-rule-box" style="display:none;"></div>
      </div>

      <!-- Bóc tách chữ Kanji -->
      <div class="jp-kanji-section" id="jp-kanji-section" style="display:none;">
        <div class="jp-kanji-heading">
          <span>🏮 Bóc tách chữ Hán (Kanji)</span>
        </div>
        <div class="jp-kanji-grid" id="jp-kanji-grid"></div>
      </div>

      <div class="jp-footer">
        <div class="jp-footer-left">
          <span class="jp-shortcut-item"><span class="jp-kbd" title="Phát âm từ đang hover (Phím S)">S</span> Nghe</span>
          <span class="jp-shortcut-item"><span class="jp-kbd" title="Ghim popup cố định (Phím P)">P</span> Ghim</span>
          <span class="jp-shortcut-item"><span class="jp-kbd" title="Tra cứu nhanh (Phím Alt+S)">Alt+S</span> Tra từ</span>
        </div>
        <div class="jp-footer-right">
          <button type="button" class="jp-report-footer-btn" id="jp-report-btn" title="Báo lỗi từ sai hoặc tự sửa nhanh">🚩 Báo lỗi</button>
          <div class="jp-shortcut-hint" title="Bật / Tắt tiện ích (Phím Alt+J)">
            <span class="jp-kbd">Alt+J</span>
            <span>Bật/Tắt</span>
          </div>
        </div>
      </div>
    `;

    shadowRoot.appendChild(cardElem);

    // 3. Tạo Floating Selection Badge & Sentence Card
    selectionBadge = document.createElement('div');
    selectionBadge.className = 'jp-selection-badge';
    selectionBadge.innerHTML = `<span>📖</span><span>Dịch & Luyện đọc</span>`;
    shadowRoot.appendChild(selectionBadge);

    sentenceCard = document.createElement('div');
    sentenceCard.className = 'jp-sentence-card';
    shadowRoot.appendChild(sentenceCard);

    // 4. Tạo Modal xem Thứ tự nét viết chữ Hán (Kanji Stroke Order)
    strokeModalOverlay = document.createElement('div');
    strokeModalOverlay.className = 'jp-stroke-modal-overlay';
    strokeModalOverlay.id = 'jp-stroke-modal-overlay';
    strokeModalOverlay.innerHTML = `
      <div class="jp-stroke-modal">
        <div class="jp-stroke-header">
          <div class="jp-stroke-title">
            <span>✍️ Thứ tự nét viết chữ Hán</span>
            <span id="jp-stroke-kanji-title" style="color: #38bdf8; font-size: 24px; font-weight: bold; margin-left: 8px;"></span>
          </div>
          <button class="jp-stroke-close" id="jp-stroke-close-btn" title="Đóng (Esc)">✕</button>
        </div>
        <div class="jp-stroke-canvas-box" id="jp-stroke-canvas-box">
          <div style="color: #94a3b8; font-size: 13px;">Đang tải nét vẽ...</div>
        </div>
        <div class="jp-stroke-controls">
          <button class="jp-stroke-btn jp-stroke-show-all-btn" id="jp-stroke-show-all-btn" title="Hiển thị ngay toàn bộ nét chữ không cần chờ vẽ">⚡ Hiện toàn bộ</button>
          <button class="jp-stroke-btn" id="jp-stroke-play-btn" title="Phát hoạt ảnh vẽ từng nét theo thứ tự">▶️ Vẽ từng nét</button>
          <button class="jp-stroke-btn" id="jp-stroke-toggle-numbers" title="Bật hoặc tắt số thứ tự nét">🔢 Bật/Tắt số nét</button>
        </div>
        <div class="jp-stroke-info" id="jp-stroke-info"></div>
      </div>
    `;
    shadowRoot.appendChild(strokeModalOverlay);

    // Bắt sự kiện trên Stroke Modal
    strokeModalOverlay.querySelector('#jp-stroke-close-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      closeStrokeModal();
    });
    strokeModalOverlay.addEventListener('click', (e) => {
      if (e.target === strokeModalOverlay) closeStrokeModal();
    });
    strokeModalOverlay.querySelector('#jp-stroke-show-all-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const canvasBox = strokeModalOverlay.querySelector('#jp-stroke-canvas-box');
      if (canvasBox && typeof kanjiStrokeAnimator !== 'undefined') {
        kanjiStrokeAnimator.showAllStrokes(canvasBox);
      }
    });
    strokeModalOverlay.querySelector('#jp-stroke-play-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const canvasBox = strokeModalOverlay.querySelector('#jp-stroke-canvas-box');
      if (canvasBox && typeof kanjiStrokeAnimator !== 'undefined') {
        kanjiStrokeAnimator.startAnimation(canvasBox);
      }
    });
    strokeModalOverlay.querySelector('#jp-stroke-toggle-numbers').addEventListener('click', async (e) => {
      e.stopPropagation();
      showStrokeNumbers = !showStrokeNumbers;
      if (currentStrokeChar && typeof kanjiStrokeAnimator !== 'undefined') {
        const rawSvg = await kanjiStrokeAnimator.fetchKanjiSvg(currentStrokeChar);
        const canvasBox = strokeModalOverlay.querySelector('#jp-stroke-canvas-box');
        if (rawSvg && canvasBox) {
          const wasPlaying = kanjiStrokeAnimator.isPlaying;
          kanjiStrokeAnimator.renderAnimatedSvg(canvasBox, rawSvg, { showNumbers: showStrokeNumbers });
          if (wasPlaying) {
            kanjiStrokeAnimator.startAnimation(canvasBox);
          } else {
            kanjiStrokeAnimator.showAllStrokes(canvasBox);
          }
        }
      }
    });

    // 5. Tạo Modal Báo lỗi / Sửa từ & Góp ý (Feedback & Word Fix Modal)
    feedbackModalOverlay = document.createElement('div');
    feedbackModalOverlay.className = 'jp-feedback-modal-overlay';
    feedbackModalOverlay.id = 'jp-feedback-modal-overlay';
    feedbackModalOverlay.innerHTML = `
      <div class="jp-feedback-modal" role="dialog" aria-modal="true">
        <div class="jp-fb-header">
          <div class="jp-fb-title-group">
            <span class="jp-fb-title">🚩 Báo lỗi từ sai &amp; Góp ý</span>
            <span class="jp-fb-subtitle" id="jp-fb-subtitle">Giúp cải thiện độ chính xác từ điển</span>
          </div>
          <button type="button" class="jp-stroke-close" id="jp-fb-close-btn" title="Đóng (Esc)">✕</button>
        </div>

        <div class="jp-fb-snapshot" id="jp-fb-snapshot" style="display:none;">
          <div class="jp-fb-snapshot-word" id="jp-fb-snap-word"></div>
          <div class="jp-fb-snapshot-meta" id="jp-fb-snap-meta"></div>
        </div>

        <div class="jp-fb-form">
          <div class="jp-fb-field">
            <label class="jp-fb-label" for="jp-fb-category">Loại vấn đề</label>
            <select class="jp-fb-select" id="jp-fb-category">
              <option value="wrong_reading">🔤 Sai phiên âm (Furigana / Romaji / Audio)</option>
              <option value="wrong_meaning">💡 Sai nghĩa / Thiếu nghĩa tiếng Việt</option>
              <option value="wrong_onkun">📖 Sai quy tắc On/Kun / Hán-Việt</option>
              <option value="wrong_segment">✂️ Sai tách từ / Chia thể ngữ pháp</option>
              <option value="bug">🐛 Lỗi giao diện / Chức năng</option>
              <option value="suggestion">✨ Góp ý / Đề xuất tính năng mới</option>
            </select>
          </div>

          <div class="jp-fb-word-fields" id="jp-fb-word-fields">
            <div class="jp-fb-row-2">
              <div class="jp-fb-field">
                <label class="jp-fb-label" for="jp-fb-word">Từ tiếng Nhật</label>
                <input type="text" class="jp-fb-input" id="jp-fb-word" placeholder="Ví dụ: フランス語">
              </div>
              <div class="jp-fb-field">
                <label class="jp-fb-label" for="jp-fb-correct-reading">Cách đọc đúng (Kana)</label>
                <input type="text" class="jp-fb-input" id="jp-fb-correct-reading" placeholder="Ví dụ: ふらんすご">
              </div>
            </div>
            <div class="jp-fb-field">
              <label class="jp-fb-label" for="jp-fb-correct-meaning">Nghĩa tiếng Việt đúng / Đề xuất</label>
              <input type="text" class="jp-fb-input" id="jp-fb-correct-meaning" placeholder="Nhập nghĩa chuẩn xác hơn...">
            </div>
          </div>

          <div class="jp-fb-field">
            <label class="jp-fb-label" for="jp-fb-note">Mô tả chi tiết hoặc góp ý</label>
            <textarea class="jp-fb-textarea" id="jp-fb-note" rows="3" placeholder="Mô tả vấn đề bạn gặp phải hoặc ý tưởng cải thiện..."></textarea>
          </div>

          <div class="jp-fb-options">
            <label class="jp-fb-check" id="jp-fb-override-wrap">
              <input type="checkbox" id="jp-fb-apply-override" checked>
              <span>✏️ Áp dụng ngay bản sửa này cho Từ điển cá nhân (hiện đúng tức thì)</span>
            </label>
            <label class="jp-fb-check">
              <input type="checkbox" id="jp-fb-include-domain" checked>
              <span id="jp-fb-domain-label">🌐 Đính kèm tên miền trang web hiện tại</span>
            </label>
          </div>
        </div>

        <div class="jp-fb-status" id="jp-fb-status" style="display:none;"></div>

        <div class="jp-fb-actions">
          <button type="button" class="jp-fb-btn jp-fb-btn-primary" id="jp-fb-submit-btn">💾 Lưu &amp; Gửi</button>
          <button type="button" class="jp-fb-btn jp-fb-btn-email" id="jp-fb-email-btn" title="Gửi qua Email tới lexuantruong098@gmail.com">📧 Gửi Email</button>
          <button type="button" class="jp-fb-btn jp-fb-btn-github" id="jp-fb-github-btn" title="Mở GitHub Issues với nội dung đã điền sẵn">🐙 GitHub Issue</button>
          <button type="button" class="jp-fb-btn jp-fb-btn-ghost" id="jp-fb-copy-btn" title="Sao chép báo cáo dạng Markdown">📋 Copy</button>
        </div>

        <div class="jp-fb-email-hint">
          <span>📬 Mail hỗ trợ: <strong id="jp-fb-email-addr">lexuantruong098@gmail.com</strong></span>
          <div class="jp-fb-email-links">
            <button type="button" class="jp-fb-link-btn" id="jp-fb-gmail-btn" title="Mở soạn thư trên Gmail Web">🌐 Gmail Web</button>
            <button type="button" class="jp-fb-link-btn" id="jp-fb-copy-email-btn" title="Sao chép địa chỉ email">📋 Copy Email</button>
          </div>
        </div>
      </div>
    `;
    shadowRoot.appendChild(feedbackModalOverlay);

    // Chặn rò rỉ phím tắt/chuột của trang web khi thao tác trong Modal Báo lỗi
    feedbackModalOverlay.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        closeFeedbackModal();
        return;
      }
      e.stopPropagation();
    });
    feedbackModalOverlay.addEventListener('mousedown', (e) => e.stopPropagation());
    feedbackModalOverlay.addEventListener('click', (e) => {
      e.stopPropagation();
      if (e.target === feedbackModalOverlay) closeFeedbackModal();
    });
    feedbackModalOverlay.querySelector('#jp-fb-close-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      closeFeedbackModal();
    });

    const fbCatSelect = feedbackModalOverlay.querySelector('#jp-fb-category');
    const fbWordFields = feedbackModalOverlay.querySelector('#jp-fb-word-fields');
    const fbOverrideWrap = feedbackModalOverlay.querySelector('#jp-fb-override-wrap');
    if (fbCatSelect) {
      fbCatSelect.addEventListener('change', () => {
        const isIssueWithWord = !['bug', 'suggestion'].includes(fbCatSelect.value);
        if (fbWordFields) fbWordFields.style.display = isIssueWithWord ? 'flex' : 'none';
        if (fbOverrideWrap) fbOverrideWrap.style.display = isIssueWithWord ? 'flex' : 'none';
      });
    }

    const collectFeedbackPayload = () => {
      const cat = feedbackModalOverlay.querySelector('#jp-fb-category')?.value || 'wrong_reading';
      const wordVal = feedbackModalOverlay.querySelector('#jp-fb-word')?.value.trim() || '';
      const sugReading = feedbackModalOverlay.querySelector('#jp-fb-correct-reading')?.value.trim() || '';
      const sugMeaning = feedbackModalOverlay.querySelector('#jp-fb-correct-meaning')?.value.trim() || '';
      const noteVal = feedbackModalOverlay.querySelector('#jp-fb-note')?.value.trim() || '';
      const includeDomain = !!feedbackModalOverlay.querySelector('#jp-fb-include-domain')?.checked;
      const applyLocalOverride = !!feedbackModalOverlay.querySelector('#jp-fb-apply-override')?.checked;

      return {
        input: {
          ...activeFeedbackContext,
          category: cat,
          word: wordVal,
          suggestedReading: sugReading,
          suggestedMeaning: sugMeaning,
          note: noteVal,
          includeDomain,
          pageDomain: (typeof location !== 'undefined' && location.hostname) ? location.hostname : ''
        },
        options: {
          applyLocalOverride,
          webhookUrl: settings.feedbackWebhookUrl || ''
        }
      };
    };

    const showFeedbackStatus = (msg, isError = false) => {
      const statusBox = feedbackModalOverlay.querySelector('#jp-fb-status');
      if (!statusBox) return;
      statusBox.textContent = msg;
      statusBox.className = isError ? 'jp-fb-status error' : 'jp-fb-status success';
      statusBox.style.display = 'block';
    };

    const handleFeedbackSubmit = async (mode = 'save') => {
      const fbService = window.japaneseFeedbackService || (typeof japaneseFeedbackService !== 'undefined' ? japaneseFeedbackService : null);
      if (!fbService) {
        showFeedbackStatus('⚠️ Không tìm thấy dịch vụ báo cáo.', true);
        return;
      }
      const { input, options } = collectFeedbackPayload();
      const hasWordFix = Boolean(input.word && (input.suggestedReading || input.suggestedMeaning));
      if (!hasWordFix && !input.note && !input.word) {
        showFeedbackStatus('⚠️ Vui lòng nhập mô tả lỗi hoặc nội dung cần sửa.', true);
        return;
      }

      const submitBtn = feedbackModalOverlay.querySelector('#jp-fb-submit-btn');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const res = await fbService.submitReport(input, options);
        if (submitBtn) submitBtn.disabled = false;

        if (res.overrideApplied && input.word && currentWord === input.word && typeof japaneseEngine !== 'undefined') {
          // Làm mới Tooltip ngay lập tức với bản sửa từ điển cá nhân
          const refreshedData = japaneseEngine.analyze(input.word, currentContextSentence || '', 0);
          if (refreshedData && cardElem && cardElem.classList.contains('visible')) {
            showTooltip(refreshedData, lastHoverPos.clientX, lastHoverPos.clientY, null);
          }
        }

        if (mode === 'github') {
          await fbService.updateReportStatus(res.report.id, 'github_opened');
          window.open(res.githubUrl, '_blank', 'noopener,noreferrer');
          showFeedbackStatus(
            res.overrideApplied
              ? '✅ Đã cập nhật Từ điển cá nhân & mở trang GitHub Issue điền sẵn!'
              : '✅ Đã lưu báo cáo & mở trang GitHub Issue điền sẵn!'
          );
        } else if (mode === 'email') {
          await fbService.updateReportStatus(res.report.id, 'email_opened');
          fbService.openMailto(res.mailtoUrl);
          showFeedbackStatus(
            res.overrideApplied
              ? `✅ Đã cập nhật Từ điển cá nhân & mở ứng dụng Email tới ${res.supportEmail}!`
              : `✅ Đã mở ứng dụng Email soạn thư gửi tới ${res.supportEmail}!`
          );
        } else if (mode === 'gmail') {
          await fbService.updateReportStatus(res.report.id, 'email_opened');
          window.open(res.gmailUrl, '_blank', 'noopener,noreferrer');
          showFeedbackStatus(
            res.overrideApplied
              ? `✅ Đã cập nhật Từ điển cá nhân & mở Gmail Web gửi tới ${res.supportEmail}!`
              : `✅ Đã mở Gmail Web soạn thư gửi tới ${res.supportEmail}!`
          );
        } else if (mode === 'copy') {
          const onCopied = () => {
            showFeedbackStatus(
              res.overrideApplied
                ? '📋 Đã áp dụng bản sửa cục bộ & sao chép báo cáo Markdown!'
                : '📋 Đã lưu & sao chép báo cáo Markdown vào Clipboard!'
            );
          };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(res.markdown).then(onCopied).catch(() => fallbackCopyText(res.markdown, onCopied));
          } else {
            fallbackCopyText(res.markdown, onCopied);
          }
        } else {
          if (options.webhookUrl && res.webhookResult && res.webhookResult.success) {
            showFeedbackStatus(
              res.overrideApplied
                ? '✅ Đã gửi báo cáo Webhook & áp dụng ngay vào Từ điển cá nhân!'
                : '✅ Đã gửi báo cáo thành công tới Webhook!'
            );
          } else if (options.webhookUrl && res.webhookResult && !res.webhookResult.success) {
            showFeedbackStatus(`⚠️ Đã lưu cục bộ, nhưng gửi Webhook lỗi: ${res.webhookResult.error}`, true);
          } else {
            showFeedbackStatus(
              res.overrideApplied
                ? '✅ Đã áp dụng bản sửa tức thì & lưu báo cáo (bấm Gửi Email hoặc GitHub Issue để gửi cho dev).'
                : `✅ Đã lưu báo cáo! Bấm "Gửi Email" (${res.supportEmail}) hoặc "GitHub Issue" để gửi cho dev.`
            );
          }
        }
      } catch (err) {
        if (submitBtn) submitBtn.disabled = false;
        showFeedbackStatus(`⚠️ Có lỗi xảy ra: ${err.message}`, true);
      }
    };

    feedbackModalOverlay.querySelector('#jp-fb-submit-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      handleFeedbackSubmit('save');
    });
    feedbackModalOverlay.querySelector('#jp-fb-email-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      handleFeedbackSubmit('email');
    });
    feedbackModalOverlay.querySelector('#jp-fb-gmail-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      handleFeedbackSubmit('gmail');
    });
    feedbackModalOverlay.querySelector('#jp-fb-copy-email-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const emailAddr = 'lexuantruong098@gmail.com';
      const onCopied = () => showFeedbackStatus(`📧 Đã sao chép email: ${emailAddr}`);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailAddr).then(onCopied).catch(() => fallbackCopyText(emailAddr, onCopied));
      } else {
        fallbackCopyText(emailAddr, onCopied);
      }
    });
    feedbackModalOverlay.querySelector('#jp-fb-github-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      handleFeedbackSubmit('github');
    });
    feedbackModalOverlay.querySelector('#jp-fb-copy-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      handleFeedbackSubmit('copy');
    });

    // Bắt sự kiện click nút dịch câu bôi đen (giữ selection khi pointerdown/mousedown và mở card tại click)
    const preserveSelectionOnBadge = (e) => {
      e.stopPropagation();
      e.preventDefault();
    };
    selectionBadge.addEventListener('pointerdown', preserveSelectionOnBadge);
    selectionBadge.addEventListener('mousedown', preserveSelectionOnBadge);
    selectionBadge.addEventListener('mouseup', (e) => {
      e.stopPropagation();
    });
    selectionBadge.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!settings.enabled || settings.enableSelectionTranslate === false) {
        hideSelectionBadge();
        return;
      }
      if (currentSelectedText) {
        showSentenceTranslation(currentSelectedText, e.clientX, e.clientY);
      }
    });

    // Ngăn chặn sự kiện mousedown, mouseup, click trên Card làm đóng Tooltip
    cardElem.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      cancelHideSchedule();
    });

    cardElem.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      cancelHideSchedule();
    });

    cardElem.addEventListener('mouseup', (e) => {
      e.stopPropagation();
      cancelHideSchedule();
    });

    cardElem.addEventListener('click', (e) => {
      e.stopPropagation();
      cancelHideSchedule();
    });

    sentenceCard.addEventListener('mousedown', (e) => {
      e.stopPropagation();
    });

    // Nút 1-Click Anki Sync (phím tắt: E)
    const ankiBtn = cardElem.querySelector('#jp-anki-btn');
    if (ankiBtn) {
      ankiBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        e.preventDefault();
        await syncCurrentWordToAnki();
      });
    }

    // Phát âm audio với animation sóng âm thanh
    const audioBtn = cardElem.querySelector('#jp-audio-btn');
    audioBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const speakText = getActiveSpeakText();
      if (speakText) {
        japaneseEngine.speak(
          speakText,
          {
            rate: settings.speechRate || 0.95,
            pitch: settings.speechPitch || 1.0,
            voiceUri: settings.voiceUri || ''
          },
          () => audioBtn.classList.add('playing'),
          () => audioBtn.classList.remove('playing')
        );
      }
    });

    // Click vào chữ từ vựng để sao chép nhanh
    const wordElem = cardElem.querySelector('#jp-word');
    if (wordElem) {
      wordElem.addEventListener('click', (e) => {
        e.stopPropagation();
        copyCurrentWord();
      });
    }

    // Nút Lưu từ vựng vào Sổ tay (Bookmark Star ⭐ - Phím W)
    const starBtn = cardElem.querySelector('#jp-star-btn');
    if (starBtn) {
      starBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleCurrentWordSaved();
      });
    }

    // Nút Sao chép (Quick Copy 📋 - Phím C)
    const copyBtn = cardElem.querySelector('#jp-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        copyCurrentWord();
      });
    }

    // Nút Kính lúp tra cứu từ điển trực tuyến (Mazii)
    const lookupBtn = cardElem.querySelector('#jp-lookup-btn');
    if (lookupBtn) {
      lookupBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (currentWord) {
          const isSingleKanji = currentWord.length === 1 && typeof isKanji === 'function' && isKanji(currentWord);
          const searchUrl = isSingleKanji 
            ? `https://mazii.net/vi-VN/search/kanji/javi/${encodeURIComponent(currentWord)}`
            : `https://mazii.net/vi-VN/search/word/javi/${encodeURIComponent(currentWord)}`;
          window.open(searchUrl, '_blank');
        }
      });
    }

    // Nút Ghim cố định (Pin - Phím P)
    const pinBtn = cardElem.querySelector('#jp-pin-btn');
    if (pinBtn) {
      pinBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        togglePinTooltip();
      });
    }

    // Nút Hỏi AI (✨) trên Tooltip
    const aiBtn = cardElem.querySelector('#jp-ai-btn');
    const aiPanel = cardElem.querySelector('#jp-ai-panel');
    const aiPanelBody = cardElem.querySelector('#jp-ai-panel-body');
    const aiPanelClose = cardElem.querySelector('#jp-ai-panel-close');

    if (aiPanelClose) {
      aiPanelClose.addEventListener('click', (e) => {
        e.stopPropagation();
        if (aiPanel) aiPanel.style.display = 'none';
        if (aiBtn) aiBtn.classList.remove('active');
      });
    }

    if (aiBtn) {
      aiBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (!currentWord || !aiPanel) return;

        if (aiPanel.style.display === 'block') {
          aiPanel.style.display = 'none';
          aiBtn.classList.remove('active');
          return;
        }

        aiPanel.style.display = 'block';
        aiBtn.classList.add('active');
        if (aiPanelBody) {
          aiPanelBody.innerHTML = `<div style="display:flex;align-items:center;gap:8px;padding:8px 0;color:#38bdf8;font-size:12px;"><span class="jp-wave-dot"></span><span>Đang hỏi AI giải thích chuyên sâu "${escapeHtml(currentWord)}"...</span></div>`;
        }

        try {
          const aiService = window.japaneseAiService || (typeof japaneseAiService !== 'undefined' ? japaneseAiService : null);
          if (!aiService) {
            if (aiPanelBody) aiPanelBody.innerHTML = `<span style="color:#ef4444;">AI Service chưa sẵn sàng.</span>`;
            return;
          }

          const res = await aiService.explainWord(currentWord);
          if (res && res.success && res.result) {
            if (aiPanelBody) aiPanelBody.innerHTML = aiService.formatMarkdown(res.result);
          } else {
            const err = res?.error || 'Không thể kết nối đến AI API';
            if (aiPanelBody) {
              aiPanelBody.innerHTML = `
                <div style="color:#f87171;font-size:12px;margin-bottom:6px;">⚠️ ${escapeHtml(err)}</div>
                <div style="font-size:11px;color:#94a3b8;line-height:1.4;">
                  💡 <em>Mở popup Cài đặt (Alt+J) để cấu hình API Key (Google Gemini, OpenAI, Claude, DeepSeek, Groq...) hoặc chọn nhà cung cấp AI mong muốn.</em>
                </div>
              `;
            }
          }
        } catch (ex) {
          if (aiPanelBody) aiPanelBody.innerHTML = `<span style="color:#ef4444;">Lỗi: ${escapeHtml(ex.message)}</span>`;
        }
      });
    }

    // Nút Đóng (Esc)
    const closeBtn = cardElem.querySelector('#jp-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        isPinned = false;
        if (pinBtn) pinBtn.classList.remove('active');
        cardElem.classList.remove('pinned');
        hideTooltip(true);
      });
    }

    const reportBtn = cardElem.querySelector('#jp-report-btn');
    if (reportBtn) {
      reportBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        openFeedbackModal({
          category: 'wrong_reading',
          word: currentWord || '',
          currentReading: currentReading || (currentWordData ? currentWordData.reading : '') || '',
          currentRomaji: (currentWordData ? currentWordData.romaji : '') || '',
          currentMeaning: currentMeaning || (currentWordData ? currentWordData.meaning : '') || '',
          currentHanViet: currentHanViet || (currentWordData ? currentWordData.hanviet : '') || '',
          currentOnKun: (currentWordData && currentWordData.onKunRule)
            ? `${currentWordData.onKunRule.badge || ''} - ${currentWordData.onKunRule.rule || ''}`.trim()
            : '',
          contextSentence: currentContextSentence || '',
          source: 'Hover Tooltip'
        });
      });
    }

    // Giữ Tooltip mở khi chuột di vào trong Card hoặc Sentence Card
    cardElem.addEventListener('mouseenter', () => {
      isMouseOverTooltip = true;
      cancelHideSchedule();
    });

    cardElem.addEventListener('mouseleave', () => {
      isMouseOverTooltip = false;
      if (!isPinned) {
        scheduleHide(350);
      }
    });

    if (sentenceCard) {
      sentenceCard.addEventListener('mouseenter', () => {
        isMouseOverTooltip = true;
        cancelHideSchedule();
      });

      sentenceCard.addEventListener('mouseleave', () => {
        isMouseOverTooltip = false;
        if (!isPinned) {
          scheduleHide(350);
        }
      });

      sentenceCard.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        cancelHideSchedule();
      });
    }

    updateActionButtonsVisibility();
  }

  // Cập nhật ẩn/hiển thị các nút thao tác trên Tooltip theo cài đặt
  function updateActionButtonsVisibility() {
    if (!cardElem) return;
    const ankiBtn = cardElem.querySelector('#jp-anki-btn');
    const copyBtn = cardElem.querySelector('#jp-copy-btn');
    const lookupBtn = cardElem.querySelector('#jp-lookup-btn');
    const pinBtn = cardElem.querySelector('#jp-pin-btn');
    const closeBtn = cardElem.querySelector('#jp-close-btn');

    if (ankiBtn) ankiBtn.style.display = settings.showAnkiBtn ? 'inline-flex' : 'none';
    if (copyBtn) copyBtn.style.display = settings.showCopyBtn ? 'inline-flex' : 'none';
    if (lookupBtn) lookupBtn.style.display = settings.showLookupBtn ? 'inline-flex' : 'none';
    if (pinBtn) pinBtn.style.display = settings.showPinBtn !== false ? 'inline-flex' : 'none';
    if (closeBtn) closeBtn.style.display = settings.showCloseBtn !== false ? 'inline-flex' : 'none';
  }

  // Sao chép từ vựng hiện tại (Click vào từ hoặc Phím C)
  function copyCurrentWord() {
    const copyWord = currentWord;
    if (!copyWord) return;

    const notifySuccess = () => {
      const copyBtn = cardElem ? cardElem.querySelector('#jp-copy-btn') : null;
      if (copyBtn) {
        copyBtn.classList.add('copied');
        setTimeout(() => copyBtn.classList.remove('copied'), 1500);
      }
      showToast(`📋 Đã sao chép: ${copyWord}`);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(copyWord).then(notifySuccess).catch(() => {
        fallbackCopyText(copyWord, notifySuccess);
      });
    } else {
      fallbackCopyText(copyWord, notifySuccess);
    }
  }

  function fallbackCopyText(text, callback) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    textarea.setAttribute('readonly', '');
    document.body.appendChild(textarea);
    textarea.select();
    try {
      const successful = document.execCommand('copy');
      if (successful && callback) callback();
    } catch (_) {}
    document.body.removeChild(textarea);
  }

  // Bật/tắt lưu từ vào Sổ tay từ vựng (⭐ - Phím W)
  function toggleCurrentWordSaved() {
    const targetWord = currentWord;
    if (!targetWord) return;
    const starBtn = cardElem ? cardElem.querySelector('#jp-star-btn') : null;

    getStorageData(['jpSavedWords'], (res) => {
      let list = res && Array.isArray(res.jpSavedWords) ? res.jpSavedWords : [];
      const idx = list.findIndex(item => item.word === targetWord);

      if (idx >= 0) {
        list.splice(idx, 1);
        savedWordsSet.delete(targetWord);
        if (starBtn) {
          starBtn.classList.remove('active');
          starBtn.title = 'Lưu vào Sổ tay từ vựng (⭐ - Phím W)';
        }
        showToast(`Đã bỏ lưu [${targetWord}]`);
      } else {
        const newItem = {
          word: targetWord,
          reading: currentReading || targetWord,
          hanviet: currentHanViet || '',
          meaning: currentMeaning || '',
          romaji: (currentWordData && currentWordData.romaji) ? currentWordData.romaji : '',
          type: (currentWordData && currentWordData.type) ? currentWordData.type : '',
          sentence: currentContextSentence || '',
          deck: settings.activeDeck || 'Mặc định',
          status: 'learning',
          savedAt: Date.now(),
          srs: {
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: Date.now(),
            history: []
          }
        };
        list.unshift(newItem);
        savedWordsSet.add(targetWord);
        if (starBtn) {
          starBtn.classList.add('active');
          starBtn.title = 'Bỏ lưu khỏi Sổ tay từ vựng (Phím W)';
        }
        showToast(`⭐ Đã lưu [${targetWord}] vào Sổ tay!`);
      }

      setStorageData({ jpSavedWords: list });
    });
  }

  // Bật/tắt ghim Tooltip cố định (📌 - Phím P)
  function togglePinTooltip() {
    isPinned = !isPinned;
    const pinBtn = cardElem ? cardElem.querySelector('#jp-pin-btn') : null;
    if (isPinned) {
      if (pinBtn) {
        pinBtn.classList.add('active');
        pinBtn.title = 'Bỏ ghim popup (Phím P)';
      }
      if (cardElem) cardElem.classList.add('pinned');
      showToast('📌 Đã ghim popup cố định (Phím P)');
    } else {
      if (pinBtn) {
        pinBtn.classList.remove('active');
        pinBtn.title = 'Ghim popup cố định (Phím P)';
      }
      if (cardElem) cardElem.classList.remove('pinned');
      showToast('Đã bỏ ghim popup');
    }
  }

  // Lấy chính xác chuỗi phiên âm cần phát âm cho từ hiện tại
  // Đảm bảo đồng bộ 100% giữa cách đọc hiển thị trên tooltip và giọng đọc audio
  function getActiveSpeakText() {
    // 1. Ưu tiên cách đọc đang hiển thị trên tooltip (miễn là không chứa chữ Kanji)
    if (currentReading && !/[一-龯]/.test(currentReading)) {
      return currentReading;
    }
    // 2. Nếu có speechText đã phân tích không chứa chữ Kanji
    if (currentWordData && currentWordData.speechText && !/[一-龯]/.test(currentWordData.speechText)) {
      return currentWordData.speechText;
    }
    return currentReading || currentWord || '';
  }

  // 3. Hiển thị thông tin lên Tooltip
  function showTooltip(data, mouseX, mouseY, wordRange = null) {
    const host = document.getElementById('jp-hover-extension-root');
    if (!cardElem || !shadowRoot || !host || !document.contains(host)) {
      initShadowDOM();
    }
    if (!cardElem || !shadowRoot) return;

    cancelHideSchedule();

    const targetWord = data.word;
    currentWord = targetWord;
    currentReading = data.reading || targetWord;
    currentHanViet = data.hanviet || '';
    currentMeaning = data.meaning || '';
    currentWordData = data;

    const readingElem = cardElem.querySelector('#jp-reading');
    const pitchElem = cardElem.querySelector('#jp-pitch-badge');
    const wordElem = cardElem.querySelector('#jp-word');
    const tagsRow = cardElem.querySelector('#jp-tags-row');
    const meaningBox = cardElem.querySelector('#jp-meaning-box');
    const meaningText = cardElem.querySelector('#jp-meaning-text');
    const synonymsRow = cardElem.querySelector('#jp-synonyms-row');
    const kanjiSection = cardElem.querySelector('#jp-kanji-section');
    const kanjiGrid = cardElem.querySelector('#jp-kanji-grid');

    // 1. Cập nhật từ chính & cách đọc (Hiragana, Katakana)
    wordElem.textContent = targetWord;
    updateActionButtonsVisibility();

    const aiPanel = cardElem.querySelector('#jp-ai-panel');
    const aiBtn = cardElem.querySelector('#jp-ai-btn');
    if (aiPanel) aiPanel.style.display = 'none';
    if (aiBtn) aiBtn.classList.remove('active');

    const rawReading = data.reading || '';
    const hiraReading = typeof katakanaToHiragana === 'function' ? katakanaToHiragana(rawReading) : rawReading;
    const kataReading = typeof hiraganaToKatakana === 'function' ? hiraganaToKatakana(hiraReading) : '';
    const kataElem = cardElem.querySelector('#jp-reading-kata');

    if (settings.showReading !== false && (hiraReading || rawReading)) {
      if (settings.readingFormat === 'katakana') {
        readingElem.textContent = kataReading ? `(${kataReading})` : rawReading;
        readingElem.style.display = 'inline';
        if (kataElem) kataElem.style.display = 'none';
      } else if (settings.readingFormat === 'both') {
        readingElem.textContent = hiraReading || rawReading;
        readingElem.style.display = 'inline';
        if (kataElem && kataReading && kataReading !== hiraReading) {
          kataElem.textContent = `(${kataReading})`;
          kataElem.style.display = 'inline';
        } else if (kataElem) {
          kataElem.style.display = 'none';
        }
      } else {
        // Mặc định: 'hiragana' - Chỉ hiển thị Hiragana sạch sẽ, không lặp lại Katakana cùng âm
        readingElem.textContent = hiraReading || rawReading;
        readingElem.style.display = 'inline';
        if (kataElem) kataElem.style.display = 'none';
      }
    } else {
      readingElem.style.display = 'none';
      if (kataElem) kataElem.style.display = 'none';
    }

    // Trọng âm (Pitch Accent)
    if (settings.showPitchAccent && data.pitch !== null && typeof data.pitch !== 'undefined') {
      const pitchNames = { 0: '⓪ Heiban (Bằng)', 1: '① Atamadaka (Cao đầu)', 2: '② Nakadaka (Cao giữa)', 3: '③ Nakadaka', 4: '④ Nakadaka' };
      pitchElem.textContent = pitchNames[data.pitch] || `[${data.pitch}]`;
      pitchElem.style.display = 'inline-block';
    } else {
      pitchElem.style.display = 'none';
    }

    // 2. Cập nhật các Tags (Romaji, Hán Việt, Quy tắc On/Kun, Từ loại)
    tagsRow.innerHTML = '';

    if (settings.showRomaji && data.romaji) {
      const romajiBadge = document.createElement('span');
      romajiBadge.className = 'jp-badge jp-badge-romaji';
      romajiBadge.textContent = `Romaji: ${data.romaji}`;
      tagsRow.appendChild(romajiBadge);
    }

    if (settings.showHanViet && data.hanviet) {
      const hanvietBadge = document.createElement('span');
      hanvietBadge.className = 'jp-badge jp-badge-hanviet';
      hanvietBadge.textContent = `Âm HV: ${data.hanviet}`;
      tagsRow.appendChild(hanvietBadge);
    }

    if (data.onKunRule && data.onKunRule.badge) {
      const onKunBadge = document.createElement('span');
      onKunBadge.className = 'jp-badge jp-badge-onkun';
      onKunBadge.textContent = data.onKunRule.badge;
      tagsRow.appendChild(onKunBadge);
    }

    if (data.type) {
      const typeBadge = document.createElement('span');
      typeBadge.className = 'jp-badge jp-badge-type';
      typeBadge.textContent = data.type;
      tagsRow.appendChild(typeBadge);
    }

    tagsRow.style.display = tagsRow.children.length > 0 ? 'flex' : 'none';

    // Bảng phân tích Ngữ pháp chi tiết & Quy tắc âm đọc
    const grammarPanel = cardElem.querySelector('#jp-grammar-panel');
    const grammarFormRow = cardElem.querySelector('#jp-grammar-form-row');
    const grammarLabel = cardElem.querySelector('#jp-grammar-label');
    const grammarPosVal = cardElem.querySelector('#jp-grammar-pos-val');
    const ruleBox = cardElem.querySelector('#jp-rule-box');

    let hasGrammarRow = false;
    if (data.isGrammar) {
      if (grammarLabel) grammarLabel.textContent = '📚 Ngữ pháp:';
      const parts = [data.grammarBadge || 'Cấu trúc JLPT'];
      if (data.grammarTags && data.grammarTags.length > 0) parts.push(...data.grammarTags);
      grammarPosVal.textContent = parts.join(' • ');
      grammarFormRow.style.display = 'flex';
      hasGrammarRow = true;
    } else if (data.grammarForm && data.grammarForm !== 'Nguyên mẫu (辞書形)') {
      if (grammarLabel) grammarLabel.textContent = '🔄 Dạng biến thể:';
      const parts = [`Thể: ${data.grammarForm}`];
      if (data.grammarTags && data.grammarTags.length > 0) parts.push(...data.grammarTags);
      grammarPosVal.textContent = parts.join(' • ');
      grammarFormRow.style.display = 'flex';
      hasGrammarRow = true;
    } else {
      grammarFormRow.style.display = 'none';
      grammarPosVal.textContent = '';
    }

    ruleBox.textContent = '';
    let hasRuleBox = false;
    if (data.pronunciationNote) {
      const noteDiv = document.createElement('div');
      noteDiv.className = 'jp-pronunciation-note';
      noteDiv.textContent = data.pronunciationNote;
      ruleBox.appendChild(noteDiv);
      hasRuleBox = true;
    }
    if (data.onKunRule && data.onKunRule.rule) {
      const ruleDiv = document.createElement('div');
      ruleDiv.className = 'jp-onkun-rule-item';
      const iconSpan = document.createElement('span');
      iconSpan.textContent = '💡 ';
      const strong = document.createElement('strong');
      strong.textContent = 'Quy tắc âm đọc: ';
      const textSpan = document.createElement('span');
      textSpan.textContent = data.onKunRule.rule;
      ruleDiv.appendChild(iconSpan);
      ruleDiv.appendChild(strong);
      ruleDiv.appendChild(textSpan);
      ruleBox.appendChild(ruleDiv);
      hasRuleBox = true;
    }
    ruleBox.style.display = hasRuleBox ? 'flex' : 'none';

    grammarPanel.style.display = (hasGrammarRow || hasRuleBox) ? 'flex' : 'none';

    // 3. Cập nhật nghĩa Offline
    synonymsRow.style.display = 'none';
    synonymsRow.innerHTML = '';

    if (settings.showMeaning && data.meaning) {
      meaningText.textContent = data.meaning;
      meaningBox.style.display = 'flex';
    } else {
      meaningText.textContent = 'Đang tải nghĩa...';
      meaningBox.style.display = 'flex';
    }

    // 4. Bóc tách chữ Kanji (Decomposition)
    if (settings.showKanjiBreakdown && data.kanjiList && data.kanjiList.length > 0) {
      kanjiGrid.innerHTML = '';
      data.kanjiList.forEach(k => {
        const kCard = document.createElement('div');
        kCard.className = 'jp-kanji-card';
        kCard.innerHTML = `
          <div class="jp-kanji-char jp-stroke-trigger" data-kanji="${k.char}" title="Bấm để xem nét vẽ chữ [${k.char}]">${k.char}</div>
          <div class="jp-kanji-info">
            <div class="jp-kanji-meta">
              <span class="jp-kanji-hv-name">${k.hv}</span>
              <span class="jp-kanji-onkun">On: ${k.on || '—'} | Kun: ${k.kun || '—'}</span>
            </div>
            <div class="jp-kanji-desc">${k.m}</div>
          </div>
          <div class="jp-kanji-actions">
            <button class="jp-kanji-action-btn jp-kanji-stroke-btn" data-kanji="${k.char}" title="Xem thứ tự nét viết chữ [${k.char}]">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                <path d="M2 2l7.586 7.586"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
            </button>
            <button class="jp-kanji-action-btn jp-kanji-lookup-btn" data-kanji="${k.char}" title="Tra cứu chi tiết chữ [${k.char}] trên Mazii">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        `;
        kanjiGrid.appendChild(kCard);
      });

      kanjiGrid.querySelectorAll('.jp-stroke-trigger, .jp-kanji-stroke-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const char = btn.dataset.kanji;
          if (char) openStrokeModal(char);
        });
      });

      kanjiGrid.querySelectorAll('.jp-kanji-lookup-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const char = btn.dataset.kanji;
          if (char) {
            const url = `https://mazii.net/vi-VN/search/kanji/javi/${encodeURIComponent(char)}`;
            window.open(url, '_blank');
          }
        });
      });

      kanjiSection.style.display = 'flex';
    } else {
      kanjiSection.style.display = 'none';
    }

    // Cập nhật nút Bookmark Star
    updateStarButtonState();

    // 5. Visual Text Highlight trên trang web
    if (settings.enableVisualHighlight && wordRange) {
      updateVisualHighlight(wordRange, mouseX, mouseY);
    }

    // 6. Định vị và hiển thị Card
    if (!isPinned) {
      positionTooltip(mouseX, mouseY);
    }
    cardElem.classList.add('visible');

    // 7. Tự động phát âm
    if (settings.autoPlayAudio) {
      const audioBtn = cardElem.querySelector('#jp-audio-btn');
      const speakText = getActiveSpeakText();
      if (speakText) {
        japaneseEngine.speak(
          speakText,
          {
            rate: settings.speechRate || 0.95,
            pitch: settings.speechPitch || 1.0,
            voiceUri: settings.voiceUri || ''
          },
          () => audioBtn && audioBtn.classList.add('playing'),
          () => audioBtn && audioBtn.classList.remove('playing')
        );
      }
    }

    // 8. Kích hoạt Online Fallback API nếu offline thiếu nghĩa
    if (settings.enableOnlineFallback && (!data.hasOfflineMeaning || !data.meaning)) {
      if (activeAbortController) {
        activeAbortController.abort();
      }
      activeAbortController = new AbortController();
      const signal = activeAbortController.signal;

      japaneseEngine.fetchOnlineData(targetWord, signal).then(onlineRes => {
        if (onlineRes && currentWord === targetWord && cardElem.classList.contains('visible')) {
          if (onlineRes.meaning) {
            currentMeaning = onlineRes.meaning;
            // TUÂN THỦ MANIFEST V3 (Blue Argon policy):
            // Tuyệt đối không dùng innerHTML để gán dữ liệu từ API bên ngoài.
            // Dùng textContent và tạo DOM node an toàn 100%.
            meaningText.textContent = onlineRes.meaning;
            const onlineTag = document.createElement('span');
            onlineTag.className = 'jp-online-tag';
            onlineTag.textContent = '🌐 Trực tuyến';
            meaningText.appendChild(onlineTag);
            meaningBox.style.display = 'flex';
          }
          if (onlineRes.reading && settings.showReading !== false) {
            const hiraOnline = typeof katakanaToHiragana === 'function' ? katakanaToHiragana(onlineRes.reading) : onlineRes.reading;
            const kataOnline = typeof hiraganaToKatakana === 'function' ? hiraganaToKatakana(hiraOnline) : '';
            currentReading = hiraOnline;
            readingElem.textContent = settings.readingFormat === 'katakana' ? (kataOnline ? `(${kataOnline})` : hiraOnline) : hiraOnline;
            readingElem.style.display = 'inline';
            if (kataElem) {
              if (settings.readingFormat === 'both' && kataOnline && kataOnline !== hiraOnline) {
                kataElem.textContent = `(${kataOnline})`;
                kataElem.style.display = 'inline';
              } else {
                kataElem.style.display = 'none';
              }
            }

            const newRomaji = onlineRes.romaji || (typeof toRomaji === 'function' ? toRomaji(hiraOnline) : '');
            if (currentWordData) {
              currentWordData.reading = hiraOnline;
              currentWordData.speechText = hiraOnline;
              if (newRomaji) {
                currentWordData.romaji = newRomaji;
              }
            }

            // Đồng bộ lại thẻ Romaji trên giao diện nếu đang hiển thị
            if (settings.showRomaji && newRomaji) {
              let romajiBadge = tagsRow.querySelector('.jp-badge-romaji');
              if (!romajiBadge) {
                romajiBadge = document.createElement('span');
                romajiBadge.className = 'jp-badge jp-badge-romaji';
                tagsRow.insertBefore(romajiBadge, tagsRow.firstChild);
              }
              romajiBadge.textContent = `Romaji: ${newRomaji}`;
              romajiBadge.style.display = 'inline-block';
            }

            // Đồng bộ và tính toán lại Quy tắc âm đọc On/Kun dựa theo phiên âm chính xác vừa nhận được
            if (typeof japaneseEngine !== 'undefined' && japaneseEngine.classifyOnKunRule) {
              const newRule = japaneseEngine.classifyOnKunRule(
                targetWord,
                hiraOnline,
                currentWordData?.kanjiList || [],
                currentContextSentence || ''
              );
              if (newRule) {
                if (currentWordData) currentWordData.onKunRule = newRule;

                // Cập nhật Badge On-Kun
                let onKunBadge = tagsRow.querySelector('.jp-badge-onkun');
                if (newRule.badge) {
                  if (!onKunBadge) {
                    onKunBadge = document.createElement('span');
                    onKunBadge.className = 'jp-badge jp-badge-onkun';
                    tagsRow.appendChild(onKunBadge);
                  }
                  onKunBadge.textContent = newRule.badge;
                  onKunBadge.style.display = 'inline-block';
                }

                // Cập nhật Rule Box (Quy tắc âm đọc)
                const grammarPanel = cardElem.querySelector('#jp-grammar-panel');
                const ruleBox = cardElem.querySelector('#jp-rule-box');
                if (ruleBox && newRule.rule) {
                  let ruleItem = ruleBox.querySelector('.jp-onkun-rule-item');
                  if (!ruleItem) {
                    ruleItem = document.createElement('div');
                    ruleItem.className = 'jp-onkun-rule-item';
                    ruleBox.appendChild(ruleItem);
                  }
                  ruleItem.textContent = '';
                  const iconSpan = document.createElement('span');
                  iconSpan.textContent = '💡 ';
                  const strong = document.createElement('strong');
                  strong.textContent = 'Quy tắc âm đọc: ';
                  const span = document.createElement('span');
                  span.textContent = newRule.rule;
                  ruleItem.appendChild(iconSpan);
                  ruleItem.appendChild(strong);
                  ruleItem.appendChild(span);
                  ruleBox.style.display = 'flex';
                  if (grammarPanel) grammarPanel.style.display = 'flex';
                }
              }
            }

            if (tagsRow) {
              tagsRow.style.display = tagsRow.children.length > 0 ? 'flex' : 'none';
            }
          }
          if (onlineRes.synonyms && onlineRes.synonyms.length > 0) {
            // An toàn DOM: Sử dụng DOM node và textContent thay vì innerHTML
            synonymsRow.textContent = '';
            const synLabel = document.createElement('span');
            synLabel.textContent = 'Đồng nghĩa: ';
            synonymsRow.appendChild(synLabel);
            onlineRes.synonyms.forEach(s => {
              const pill = document.createElement('span');
              pill.className = 'jp-synonym-pill';
              pill.textContent = s;
              synonymsRow.appendChild(pill);
            });
            synonymsRow.style.display = 'flex';
          }
          // Tự động kiểm tra lại toạ độ để chống tràn màn hình khi nội dung giãn nở
          if (!isPinned) {
            positionTooltip(lastHoverPos.clientX, lastHoverPos.clientY);
          }
        }
      }).catch(() => {});
    }
  }

  // Quản lý phát âm câu/đoạn văn chuyên sâu cho luyện đọc JLPT (Dokkai)
  let activeSentenceReading = {
    isReading: false,
    text: '',
    chunks: [],
    currentIndex: 0,
    speed: 1.0,
    audioBtn: null,
    sourceElem: null,
    wordTimer: null
  };

  function stopSentenceReading() {
    if (activeSentenceReading.wordTimer) {
      clearInterval(activeSentenceReading.wordTimer);
      activeSentenceReading.wordTimer = null;
    }
    if (!activeSentenceReading.isReading) return;
    activeSentenceReading.isReading = false;
    if (window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch (_) {}
    }
    const engine = window.japaneseEngine || (typeof japaneseEngine !== 'undefined' ? japaneseEngine : null);
    if (engine && engine.currentAudio) {
      try { engine.currentAudio.pause(); engine.currentAudio = null; } catch (_) {}
    }
    if (typeof japaneseAudio !== 'undefined' && japaneseAudio.stop) {
      try { japaneseAudio.stop(); } catch (_) {}
    }
    if (activeSentenceReading.audioBtn) {
      activeSentenceReading.audioBtn.classList.remove('playing');
      activeSentenceReading.audioBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      `;
      activeSentenceReading.audioBtn.title = 'Phát âm (Luyện nghe JLPT)';
    }
    if (activeSentenceReading.sourceElem) {
      activeSentenceReading.sourceElem.querySelectorAll('.jp-reading-sentence-item').forEach(el => {
        el.classList.remove('active');
        el.querySelectorAll('.jp-reading-word').forEach(w => w.classList.remove('word-active'));
      });
    }
  }

  function startSentenceReading(targetText, speed, audioBtn, sourceElem, startIndex = 0) {
    stopSentenceReading();
    if (!targetText) return;

    // Phân tách đoạn văn thành các câu độc lập theo dấu câu tiếng Nhật để luyện đọc JLPT
    const parts = targetText.split(/([。！？!?\n]+)/);
    const chunks = [];
    for (let i = 0; i < parts.length; i += 2) {
      const sentence = (parts[i] || '') + (parts[i + 1] || '');
      if (sentence.trim()) {
        chunks.push(sentence.trim());
      }
    }
    if (chunks.length === 0) chunks.push(targetText.trim());

    const startIdx = Math.max(0, Math.min(startIndex, chunks.length - 1));

    activeSentenceReading = {
      isReading: true,
      text: targetText,
      chunks: chunks,
      currentIndex: startIdx,
      speed: speed,
      audioBtn: audioBtn,
      sourceElem: sourceElem,
      wordTimer: null
    };

    if (audioBtn) {
      audioBtn.classList.add('playing');
      audioBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <rect x="6" y="6" width="12" height="12" rx="2" />
        </svg>
      `;
      audioBtn.title = 'Dừng phát âm (Click để dừng)';
    }

    playCurrentSentenceChunk();
  }

  function playCurrentSentenceChunk() {
    if (!activeSentenceReading.isReading) return;
    const { chunks, currentIndex, speed, audioBtn, sourceElem } = activeSentenceReading;
    if (currentIndex >= chunks.length) {
      stopSentenceReading();
      return;
    }

    if (activeSentenceReading.wordTimer) {
      clearInterval(activeSentenceReading.wordTimer);
      activeSentenceReading.wordTimer = null;
    }

    const chunk = chunks[currentIndex];

    // Áp dụng HIỆU ỨNG BOX HIGHLIGHT BAO PHỦ CÂU ĐANG ĐỌC
    let activeSentenceItem = null;
    if (sourceElem) {
      const items = sourceElem.querySelectorAll('.jp-reading-sentence-item');
      items.forEach((item, idx) => {
        if (idx === currentIndex) {
          item.classList.add('active');
          activeSentenceItem = item;
          try {
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } catch (_) {}
        } else {
          item.classList.remove('active');
          item.querySelectorAll('.jp-reading-word').forEach(w => w.classList.remove('word-active'));
        }
      });
    }

    const wordSpans = activeSentenceItem ? Array.from(activeSentenceItem.querySelectorAll('.jp-reading-word')) : [];

    // Fallback timer: quét từng từ theo nhịp độ phát âm để đảm bảo highlight mượt mà
    let timerWordIdx = 0;
    if (wordSpans.length > 0) {
      wordSpans[0].classList.add('word-active');
      const estimatedTotalMs = Math.max(800, (chunk.length * 280) / Math.max(0.4, speed));
      const stepMs = Math.max(100, Math.round(estimatedTotalMs / Math.max(1, wordSpans.length)));

      activeSentenceReading.wordTimer = setInterval(() => {
        if (!activeSentenceReading.isReading) return;
        timerWordIdx++;
        if (timerWordIdx < wordSpans.length) {
          wordSpans.forEach((w, i) => {
            if (i === timerWordIdx) w.classList.add('word-active');
            else w.classList.remove('word-active');
          });
        }
      }, stepMs);
    }

    // Bộ bắt event onboundary chính xác từ Web Speech API
    const handleBoundary = (event) => {
      if (!activeSentenceReading.isReading || !activeSentenceItem) return;
      if (typeof event.charIndex === 'number' && wordSpans.length > 0) {
        if (activeSentenceReading.wordTimer) {
          clearInterval(activeSentenceReading.wordTimer);
          activeSentenceReading.wordTimer = null;
        }

        const charIdx = event.charIndex;
        let matched = false;
        wordSpans.forEach(w => {
          const s = parseInt(w.getAttribute('data-start') || '0', 10);
          const e = parseInt(w.getAttribute('data-end') || '0', 10);
          if (charIdx >= s && charIdx < e) {
            w.classList.add('word-active');
            matched = true;
          } else {
            w.classList.remove('word-active');
          }
        });
        if (!matched && wordSpans.length > 0) {
          for (let k = 0; k < wordSpans.length; k++) {
            const e = parseInt(wordSpans[k].getAttribute('data-end') || '0', 10);
            if (charIdx < e) {
              wordSpans[k].classList.add('word-active');
              break;
            }
          }
        }
      }
    };

    const engine = window.japaneseEngine || (typeof japaneseEngine !== 'undefined' ? japaneseEngine : null);
    if (engine && engine.speak) {
      engine.speak(
        chunk,
        {
          rate: speed,
          pitch: settings.speechPitch || 1.0,
          voiceUri: settings.voiceUri || '',
          onBoundary: handleBoundary
        },
        null,
        () => {
          if (!activeSentenceReading.isReading) return;
          if (activeSentenceReading.wordTimer) {
            clearInterval(activeSentenceReading.wordTimer);
            activeSentenceReading.wordTimer = null;
          }
          if (wordSpans.length > 0) {
            wordSpans.forEach(w => w.classList.remove('word-active'));
          }
          activeSentenceReading.currentIndex++;
          setTimeout(() => {
            if (activeSentenceReading.isReading) {
              playCurrentSentenceChunk();
            }
          }, 180);
        }
      );
    }
  }

  function segmentSentenceToSpans(sentenceStr, sIdx) {
    if (!sentenceStr || typeof sentenceStr !== 'string') return '';
    let segments = [];
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      try {
        const seg = new Intl.Segmenter('ja', { granularity: 'word' });
        segments = Array.from(seg.segment(sentenceStr));
      } catch (_) {}
    }
    if (segments.length === 0) {
      return `<span class="jp-reading-word" data-s-idx="${sIdx}" data-w-idx="0" data-start="0" data-end="${sentenceStr.length}">${escapeHtml(sentenceStr)}</span>`;
    }
    return segments.map((item, wIdx) => {
      const start = item.index;
      const end = item.index + item.segment.length;
      return `<span class="jp-reading-word" data-s-idx="${sIdx}" data-w-idx="${wIdx}" data-start="${start}" data-end="${end}">${escapeHtml(item.segment)}</span>`;
    }).join('');
  }

  function escapeHtml(str) {
    if (!str || typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 4. Hiển thị Card dịch câu khi bôi đen (Selection Translate & JLPT Reading)
  async function showSentenceTranslation(text, mouseX, mouseY) {
    if (!settings.enabled || settings.enableSelectionTranslate === false) {
      hideSentenceCard();
      hideSelectionBadge();
      return;
    }
    if (!sentenceCard) return;

    justOpenedSentenceCardAt = Date.now();
    hideSelectionBadge();
    stopSentenceReading();

    let currentSpeed = 1.0;
    let translatedJapanese = '';

    // Chia text thành các câu độc lập và bọc từng câu trong một Box Highlight riêng
    const parts = text.split(/([。！？!?\n]+)/);
    const chunks = [];
    for (let i = 0; i < parts.length; i += 2) {
      const sentence = (parts[i] || '') + (parts[i + 1] || '');
      if (sentence.trim()) {
        chunks.push(sentence.trim());
      }
    }
    if (chunks.length === 0) chunks.push(text.trim());

    const chunksHtml = chunks.map((c, idx) => `
      <div class="jp-reading-sentence-item" data-index="${idx}" title="Bấm vào câu này để nghe riêng (JLPT)">
        <div class="jp-reading-speaker-badge">
          <span class="jp-wave-dot"></span>
          <span class="jp-wave-dot"></span>
          <span class="jp-wave-dot"></span>
          <span>Đang đọc</span>
        </div>
        <div class="jp-reading-sentence-content">
          ${segmentSentenceToSpans(c, idx)}
        </div>
      </div>
    `).join('');

    sentenceCard.innerHTML = `
      <div class="jp-st-header">
        <div class="jp-st-header-left">
          <span class="jp-st-title" id="jp-sentence-title">📖 Dịch câu & Luyện đọc JLPT</span>
          <span class="jp-api-badge" id="jp-sentence-api-badge">Đang dịch...</span>
        </div>
        <div class="jp-st-header-actions">
          <button type="button" class="jp-icon-btn jp-sentence-copy-btn" id="jp-sentence-copy" title="Sao chép nội dung">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
          <button type="button" class="jp-icon-btn jp-sentence-play-btn" id="jp-sentence-audio" title="Phát âm toàn đoạn">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </button>
          <button type="button" class="jp-icon-btn jp-report-icon-btn" id="jp-sentence-report" title="Báo lỗi dịch / Góp ý">🚩</button>
          <button type="button" class="jp-icon-btn jp-close-icon-btn" id="jp-sentence-close" title="Đóng (Esc)">✕</button>
        </div>
      </div>

      <div class="jp-st-controls-bar">
        <span class="jp-st-hint">🎧 Bấm vào câu để nghe đọc</span>
        <div class="jp-jlpt-speed-bar" title="Tốc độ đọc JLPT (0.6x - 1.5x)">
          <span class="jp-jlpt-speed-label">Tốc độ</span>
          <button type="button" class="jp-jlpt-speed-btn" data-speed="0.6" title="0.6x - Rất chậm (Sơ cấp)">0.6x</button>
          <button type="button" class="jp-jlpt-speed-btn" data-speed="0.8" title="0.8x - Chậm (N5/N4)">0.8x</button>
          <button type="button" class="jp-jlpt-speed-btn active" data-speed="1.0" title="1.0x - Chuẩn bản ngữ">1.0x</button>
          <button type="button" class="jp-jlpt-speed-btn" data-speed="1.2" title="1.2x - Nhanh (Dokkai)">1.2x</button>
          <button type="button" class="jp-jlpt-speed-btn" data-speed="1.5" title="1.5x - Cực nhanh (N2/N1)">1.5x</button>
        </div>
      </div>

      <div id="jp-sentence-source-box" class="jp-sentence-source-box">${chunksHtml}</div>

      <!-- Segmented Tab Navigation -->
      <div class="jp-st-tabs-bar">
        <button type="button" class="jp-st-tab-btn active" data-tab="translate">📖 Bản dịch</button>
        <button type="button" class="jp-st-tab-btn" data-tab="grammar">🧩 Ngữ pháp AI</button>
        <button type="button" class="jp-st-tab-btn" data-tab="explain">💡 Giải thích chi tiết AI</button>
      </div>

      <div id="jp-st-pane-translate" class="jp-st-pane active">
        <div id="jp-sentence-meaning" class="jp-sentence-meaning">
          Đang dịch câu qua API...
        </div>
      </div>

      <div id="jp-st-pane-grammar" class="jp-st-pane" style="display:none;">
        <div id="jp-sentence-grammar-body" class="jp-st-ai-box"></div>
      </div>

      <div id="jp-st-pane-explain" class="jp-st-pane" style="display:none;">
        <div id="jp-sentence-explain-body" class="jp-st-ai-box"></div>
      </div>
    `;

    const sourceElem = sentenceCard.querySelector('#jp-sentence-source-box');
    const audioBtn = sentenceCard.querySelector('#jp-sentence-audio');
    const copySentenceBtn = sentenceCard.querySelector('#jp-sentence-copy');

    // Cho phép người dùng bấm trực tiếp vào từng câu để phát âm câu đó
    sourceElem.querySelectorAll('.jp-reading-sentence-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(item.getAttribute('data-index') || '0', 10);
        const speakTarget = translatedJapanese || text;
        startSentenceReading(speakTarget, currentSpeed, audioBtn, sourceElem, idx);
      });
    });

    // Tốc độ phát âm JLPT
    const speedBtns = sentenceCard.querySelectorAll('.jp-jlpt-speed-btn');
    speedBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        speedBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSpeed = parseFloat(btn.getAttribute('data-speed')) || 1.0;

        // Cập nhật ngay tức thì tốc độ cho audio đang phát dở
        if (typeof japaneseAudio !== 'undefined' && japaneseAudio.currentAudio) {
          try {
            japaneseAudio.currentAudio.playbackRate = currentSpeed;
            japaneseAudio.currentAudio.defaultPlaybackRate = currentSpeed;
          } catch (_) {}
        }
        const eng = window.japaneseEngine || (typeof japaneseEngine !== 'undefined' ? japaneseEngine : null);
        if (eng && eng.currentAudio) {
          try {
            eng.currentAudio.playbackRate = currentSpeed;
            eng.currentAudio.defaultPlaybackRate = currentSpeed;
          } catch (_) {}
        }

        if (activeSentenceReading.isReading) {
          const curIdx = activeSentenceReading.currentIndex;
          const speakTarget = translatedJapanese || text;
          startSentenceReading(speakTarget, currentSpeed, audioBtn, sourceElem, curIdx);
        }
      });
    });

    // Định vị sentence card với độ rộng lớn hơn cho bài đọc JLPT
    const cardWidth = Math.min(600, window.innerWidth - 32);
    let left = Math.min(mouseX + 10, window.innerWidth - cardWidth - 20);
    let top = Math.min(mouseY + 15, Math.max(16, window.innerHeight - 360));
    sentenceCard.style.left = `${Math.max(16, left)}px`;
    sentenceCard.style.top = `${Math.max(16, top)}px`;
    sentenceCard.classList.add('visible');

    // Nút copy câu đang chọn hoặc bản dịch
    copySentenceBtn.addEventListener('click', () => {
      const copyTarget = translatedJapanese || text;
      const onSuccess = () => {
        copySentenceBtn.classList.add('copied');
        showToast('📋 Đã sao chép nội dung');
        setTimeout(() => copySentenceBtn.classList.remove('copied'), 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyTarget).then(onSuccess).catch(() => fallbackCopyText(copyTarget, onSuccess));
      } else {
        fallbackCopyText(copyTarget, onSuccess);
      }
    });

    // Nút audio và close với toggle play/stop
    audioBtn.addEventListener('click', () => {
      if (activeSentenceReading.isReading) {
        stopSentenceReading();
      } else {
        const speakTarget = translatedJapanese || text;
        startSentenceReading(speakTarget, currentSpeed, audioBtn, sourceElem, 0);
      }
    });

    const sentenceReportBtn = sentenceCard.querySelector('#jp-sentence-report');
    if (sentenceReportBtn) {
      sentenceReportBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const currentTransText = sentenceCard.querySelector('#jp-sentence-meaning')?.textContent || '';
        openFeedbackModal({
          category: 'wrong_meaning',
          word: text.trim().slice(0, 120),
          currentMeaning: currentTransText,
          contextSentence: text.trim().slice(0, 240),
          source: 'Selection Translate Card'
        });
      });
    }

    sentenceCard.querySelector('#jp-sentence-close').addEventListener('click', () => {
      hideSentenceCard();
    });

    // Quản lý Tab: Bản dịch, Phân tích ngữ pháp AI, Giải thích chi tiết AI
    let hasLoadedGrammar = false;
    let hasLoadedExplain = false;

    const tabBtns = sentenceCard.querySelectorAll('.jp-st-tab-btn');
    const tabPanes = {
      translate: sentenceCard.querySelector('#jp-st-pane-translate'),
      grammar: sentenceCard.querySelector('#jp-st-pane-grammar'),
      explain: sentenceCard.querySelector('#jp-st-pane-explain')
    };

    tabBtns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const tab = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        Object.keys(tabPanes).forEach(k => {
          if (tabPanes[k]) tabPanes[k].style.display = (k === tab) ? 'block' : 'none';
        });

        const aiService = window.japaneseAiService || (typeof japaneseAiService !== 'undefined' ? japaneseAiService : null);

        if (tab === 'grammar' && !hasLoadedGrammar) {
          const body = sentenceCard.querySelector('#jp-sentence-grammar-body');
          if (body) {
            body.innerHTML = `<div style="display:flex;align-items:center;gap:8px;padding:12px 4px;color:#38bdf8;font-size:12.5px;"><span class="jp-wave-dot"></span><span>Đang phân tích cấu trúc & ngữ pháp JLPT bằng AI...</span></div>`;
            if (!aiService) {
              body.innerHTML = `<span style="color:#ef4444;">AI Service chưa sẵn sàng.</span>`;
              return;
            }
            const res = await aiService.explainGrammar(text);
            if (res && res.success && res.result) {
              hasLoadedGrammar = true;
              body.innerHTML = aiService.formatMarkdown(res.result);
            } else {
              const err = res?.error || 'Không kết nối được AI';
              body.innerHTML = `
                <div style="color:#f87171;font-size:12px;margin-bottom:6px;">⚠️ ${escapeHtml(err)}</div>
                <div style="font-size:11px;color:#94a3b8;line-height:1.4;">
                  💡 <em>Mẹo: Mở cài đặt Extension (Alt+J) để cấu hình API Key (Google Gemini, OpenAI, Claude, DeepSeek, Groq...).</em>
                </div>
              `;
            }
          }
        } else if (tab === 'explain' && !hasLoadedExplain) {
          const body = sentenceCard.querySelector('#jp-sentence-explain-body');
          if (body) {
            body.innerHTML = `<div style="display:flex;align-items:center;gap:8px;padding:12px 4px;color:#38bdf8;font-size:12.5px;"><span class="jp-wave-dot"></span><span>Đang hỏi AI giải thích chuyên sâu & ví dụ...</span></div>`;
            if (!aiService) {
              body.innerHTML = `<span style="color:#ef4444;">AI Service chưa sẵn sàng.</span>`;
              return;
            }
            const res = await aiService.explainWord(text);
            if (res && res.success && res.result) {
              hasLoadedExplain = true;
              body.innerHTML = aiService.formatMarkdown(res.result);
            } else {
              const err = res?.error || 'Không kết nối được AI';
              body.innerHTML = `
                <div style="color:#f87171;font-size:12px;margin-bottom:6px;">⚠️ ${escapeHtml(err)}</div>
                <div style="font-size:11px;color:#94a3b8;line-height:1.4;">
                  💡 <em>Mẹo: Mở cài đặt Extension (Alt+J) để cấu hình API Key.</em>
                </div>
              `;
            }
          }
        }
      });
    });

    // Gọi API dịch câu bên ngoài (Google Translate API hoặc AI Engine đa nền tảng)
    try {
      const res = await japaneseEngine.translateSentence(text, {
        engine: settings.translationEngine || 'google',
        apiKey: settings.aiApiKey || settings.geminiApiKey || '',
        provider: settings.aiProvider || 'gemini',
        model: settings.aiModel || 'gemini-flash-latest',
        customEndpoint: settings.aiCustomEndpoint || ''
      });
      if (res && res.meaning) {
        const mElem = sentenceCard.querySelector('#jp-sentence-meaning');
        const bElem = sentenceCard.querySelector('#jp-sentence-api-badge');
        const tElem = sentenceCard.querySelector('#jp-sentence-title');
        if (mElem) {
          mElem.textContent = res.meaning;
        }
        if (res.direction === 'vi-ja') {
          translatedJapanese = res.meaning;
          if (tElem) tElem.textContent = '📖 Dịch câu & Luyện đọc JLPT';
          if (audioBtn) audioBtn.title = 'Phát âm tiếng Nhật đã dịch';
          if (copySentenceBtn) copySentenceBtn.title = 'Sao chép tiếng Nhật đã dịch';
        }
        if (bElem && res.provider) {
          bElem.textContent = res.provider;
          if (res.isAi || res.provider.includes('AI') || res.provider.includes('Gemini') || res.provider.includes('GPT') || res.provider.includes('Claude') || res.provider.includes('DeepSeek') || res.provider.includes('Groq')) {
            bElem.classList.add('ai');
          } else {
            bElem.classList.remove('ai');
          }
        }
      }
    } catch (_) {}
  }

  function hideSentenceCard() {
    stopSentenceReading();
    if (sentenceCard) {
      sentenceCard.classList.remove('visible');
    }
  }

  function showSelectionBadge(x, y) {
    if (!settings.enabled || settings.enableSelectionTranslate === false) {
      hideSelectionBadge();
      return;
    }
    if (!selectionBadge) return;
    const left = Math.max(8, Math.min(x, window.innerWidth - 160));
    const top = Math.max(8, Math.min(y, window.innerHeight - 44));
    selectionBadge.style.left = `${left}px`;
    selectionBadge.style.top = `${top}px`;
    selectionBadge.classList.add('visible');
  }

  function hideSelectionBadge() {
    if (selectionBadge) {
      selectionBadge.classList.remove('visible');
    }
  }

  function hideAllPopups(force = false) {
    hideTooltip(force);
    hideSelectionBadge();
    hideSentenceCard();
    const qs = window.quickSearchPalette || (typeof quickSearchPalette !== 'undefined' ? quickSearchPalette : null);
    if (qs && qs.isOpen && settings.allowQuickSearchWhenDisabled === false) {
      qs.close();
    }
  }

  // 5. Vẽ lớp Visual Highlight dạ quang bao quanh từ trên trang web
  function updateVisualHighlight(range, mouseX, mouseY) {
    if (!highlightOverlay || !range || !settings.enableVisualHighlight) {
      hideVisualHighlight();
      return;
    }

    try {
      // 1. Ưu tiên lấy ClientRects từng dòng thực tế của văn bản
      const rects = range.getClientRects();
      let targetRect = null;

      if (rects && rects.length > 0) {
        if (typeof mouseX === 'number' && typeof mouseY === 'number') {
          // Tìm rect chính xác mà con trỏ chuột đang nằm trên đó
          for (let i = 0; i < rects.length; i++) {
            const r = rects[i];
            if (
              mouseX >= r.left - 30 &&
              mouseX <= r.right + 30 &&
              mouseY >= r.top - 30 &&
              mouseY <= r.bottom + 30
            ) {
              targetRect = r;
              break;
            }
          }
        }
        if (!targetRect) {
          targetRect = rects[0];
        }
      }

      // 2. Nếu getClientRects không có, fallback sang getBoundingClientRect
      if (!targetRect) {
        targetRect = range.getBoundingClientRect();
      }

      if (!targetRect) {
        hideVisualHighlight();
        return;
      }

      // 3. KIỂM TRA KÍCH THƯỚC AN TOÀN TUYỆT ĐỐI (Sanity checks):
      // Một từ vựng tiếng Nhật (Kanji/Kana) thông thường không bao giờ rộng quá 220px
      // hoặc cao quá 36px.
      // Nếu vượt quá ngưỡng này -> Trình duyệt trả về bounding box của cả bảng/container -> TỪ CHỐI hiển thị highlight!
      const maxWidth = 220;
      const maxHeight = 36;

      if (
        targetRect.width >= 4 &&
        targetRect.height >= 4 &&
        targetRect.width <= maxWidth &&
        targetRect.height <= maxHeight &&
        targetRect.top >= -20 &&
        targetRect.bottom <= window.innerHeight + 20
      ) {
        highlightOverlay.style.left = `${Math.round(targetRect.left - 2)}px`;
        highlightOverlay.style.top = `${Math.round(targetRect.top - 1)}px`;
        highlightOverlay.style.width = `${Math.round(targetRect.width + 4)}px`;
        highlightOverlay.style.height = `${Math.round(targetRect.height + 2)}px`;
        highlightOverlay.classList.add('active');
        return;
      }
    } catch (_) {}

    hideVisualHighlight();
  }

  function hideVisualHighlight() {
    if (highlightOverlay) {
      highlightOverlay.classList.remove('active');
    }
  }

  // 6. Định vị Tooltip thông minh (Re-clamped)
  function positionTooltip(mouseX, mouseY) {
    if (!cardElem) return;
    const cardRect = cardElem.getBoundingClientRect();
    const tooltipWidth = cardRect.width || 300;
    const tooltipHeight = cardRect.height || 200;
    const padding = 16;

    let left = mouseX + 14;
    let top = mouseY + 18;

    if (left + tooltipWidth > window.innerWidth - padding) {
      left = mouseX - tooltipWidth - 14;
    }
    if (left < padding) {
      left = padding;
    }
    if (top + tooltipHeight > window.innerHeight - padding) {
      top = mouseY - tooltipHeight - 18;
    }
    if (top < padding) {
      top = padding;
    }

    cardElem.style.left = `${left}px`;
    cardElem.style.top = `${top}px`;
  }

  // 7. Quản lý ẩn Tooltip có độ trễ (Grace Period)
  function scheduleHide(delayMs = 350) {
    if (isPinned) return;
    cancelHideSchedule();
    hideDelayTimer = setTimeout(() => {
      if (!isMouseOverTooltip && !isPinned && !isSelectingOnPage) {
        hideTooltip();
      }
    }, delayMs);
  }

  function cancelHideSchedule() {
    if (hideDelayTimer) {
      clearTimeout(hideDelayTimer);
      hideDelayTimer = null;
    }
  }

  function hideTooltip(force = false) {
    if (isPinned && !force) return;
    
    if (activeAbortController) {
      activeAbortController.abort();
      activeAbortController = null;
    }

    if (cardElem) {
      cardElem.classList.remove('visible');
    }
    hideVisualHighlight();
    currentWord = null;
    scanExtend = 0;
  }

  // 8. Bắt sự kiện chuột
  function isInsideExtensionUi(e) {
    const path = e && e.composedPath ? e.composedPath() : [];
    return path.some(el =>
      el === cardElem ||
      el === sentenceCard ||
      el === selectionBadge ||
      el === feedbackModalOverlay ||
      el === strokeModalOverlay
    );
  }

  function handleMouseDown(e) {
    if (isInsideExtensionUi(e)) {
      cancelHideSchedule();
      return;
    }

    // Click ra ngoài sentence card & selection badge → đóng ngay (trừ khi vừa mở xong)
    if (sentenceCard && sentenceCard.classList.contains('visible')) {
      if (Date.now() - justOpenedSentenceCardAt < 350) return;
      hideSentenceCard();
    }
    if (selectionBadge && selectionBadge.classList.contains('visible')) {
      hideSelectionBadge();
    }

    isSelectingOnPage = true;
    if (!isPinned) {
      hideTooltip();
    }
  }

  function handleMouseUp(e) {
    isSelectingOnPage = false;
    if (isInsideExtensionUi(e)) {
      return;
    }
    if (!settings.enabled || settings.enableSelectionTranslate === false) {
      hideSelectionBadge();
      return;
    }

    const mouseX = e && typeof e.clientX === 'number' ? e.clientX : 24;
    const mouseY = e && typeof e.clientY === 'number' ? e.clientY : 24;

    setTimeout(() => {
      if (!settings.enabled || settings.enableSelectionTranslate === false) {
        hideSelectionBadge();
        return;
      }

      const sel = window.getSelection();
      let text = sel ? sel.toString().trim() : '';
      let fromFormControl = false;

      if (!text) {
        const activeEl = document.activeElement;
        if (activeEl && (activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'INPUT')) {
          try {
            if (
              typeof activeEl.selectionStart === 'number' &&
              typeof activeEl.selectionEnd === 'number' &&
              activeEl.selectionEnd > activeEl.selectionStart
            ) {
              text = String(activeEl.value || '').slice(activeEl.selectionStart, activeEl.selectionEnd).trim();
              fromFormControl = Boolean(text);
            }
          } catch (_) {}
        }
      }

      if (text.length >= 2 && isJapaneseText(text)) {
        currentSelectedText = text;
        if (!fromFormControl) {
          try {
            if (sel && sel.rangeCount > 0) {
              const range = sel.getRangeAt(0);
              const rect = range.getBoundingClientRect();
              if (rect && (rect.width > 0 || rect.height > 0)) {
                showSelectionBadge(rect.right + 6, rect.bottom + 4);
                return;
              }
            }
          } catch (_) {}
        }
        showSelectionBadge(mouseX + 8, mouseY + 10);
        return;
      }
      hideSelectionBadge();
    }, 60);
  }

  function isStrokeModalOpen() {
    if (strokeModalOverlay && strokeModalOverlay.classList.contains('active')) return true;
    if (feedbackModalOverlay && feedbackModalOverlay.classList.contains('active')) return true;
    const qsObj = window.quickSearchPalette || (typeof quickSearchPalette !== 'undefined' ? quickSearchPalette : null);
    if (qsObj && qsObj.isOpen) return true;
    const qs = document.getElementById('jp-quick-search-root');
    if (qs && !qs.hasAttribute('hidden') && qs.style.display !== 'none') return true;
    return false;
  }

  // 9. Bắt sự kiện di chuột (MouseMove)
  function handleMouseMove(e) {
    if (!settings.enabled || isStrokeModalOpen()) return;
    
    lastHoverPos = { clientX: e.clientX, clientY: e.clientY };

    const path = e.composedPath ? e.composedPath() : [];
    const isOverCard = isMouseOverTooltip || path.some(el => el === cardElem || el === sentenceCard);

    if (isOverCard || isPinned) {
      cancelHideSchedule();
      return;
    }

    if (isSelectingOnPage || e.buttons !== 0) {
      if (!isPinned) hideTooltip();
      return;
    }

    if (settings.activationMode === 'shift' && !e.shiftKey) {
      scheduleHide(350);
      return;
    }
    if (settings.activationMode === 'alt' && !e.altKey) {
      scheduleHide(350);
      return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      processHover(e.clientX, e.clientY);
    }, 35);
  }

  // 10. Xử lý nhận diện ký tự dưới con trỏ & tính Range highlight
  function processHover(clientX, clientY) {
    if (isMouseOverTooltip || isPinned || isSelectingOnPage || isStrokeModalOpen()) return;

    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      return;
    }

    let textNode = null;
    let offset = 0;
    let wordRange = null;

    if (document.caretPositionFromPoint) {
      const pos = document.caretPositionFromPoint(clientX, clientY);
      if (pos && pos.offsetNode) {
        if (pos.offsetNode.nodeType === Node.TEXT_NODE) {
          textNode = pos.offsetNode;
          offset = pos.offset;
        } else if (pos.offsetNode.childNodes && pos.offsetNode.childNodes.length > 0) {
          const child = pos.offsetNode.childNodes[pos.offset] || pos.offsetNode.firstChild;
          if (child && child.nodeType === Node.TEXT_NODE) {
            textNode = child;
            offset = 0;
          }
        }
      }
    }
    if (!textNode && document.caretRangeFromPoint) {
      const range = document.caretRangeFromPoint(clientX, clientY);
      if (range && range.startContainer) {
        if (range.startContainer.nodeType === Node.TEXT_NODE) {
          textNode = range.startContainer;
          offset = range.startOffset;
        } else if (range.startContainer.childNodes && range.startContainer.childNodes.length > 0) {
          const child = range.startContainer.childNodes[range.startOffset] || range.startContainer.firstChild;
          if (child && child.nodeType === Node.TEXT_NODE) {
            textNode = child;
            offset = 0;
          }
        }
      }
    }

    // Fallback thông minh cho Phụ đề YouTube / Netflix khi bị overlay che chắn
    if (!textNode) {
      const els = document.elementsFromPoint ? document.elementsFromPoint(clientX, clientY) : [document.elementFromPoint(clientX, clientY)];
      for (const el of els) {
        if (!el) continue;
        const subSeg = el.closest ? el.closest('.ytp-caption-segment, .captions-text, .timed-text-container, .player-timedtext-text-container') : null;
        if (subSeg) {
          const walker = document.createTreeWalker(subSeg, NodeFilter.SHOW_TEXT, null, false);
          let n;
          while ((n = walker.nextNode())) {
            if (n.nodeValue && isJapaneseText(n.nodeValue)) {
              textNode = n;
              offset = 0;
              break;
            }
          }
          if (textNode) break;
        }
      }
    }

    if (!textNode) {
      scheduleHide(350);
      return;
    }

    const text = textNode.nodeValue;
    if (!text) {
      scheduleHide(350);
      return;
    }

    // Giới hạn offset trong phạm vi an toàn
    if (offset >= text.length && offset > 0) {
      offset = text.length - 1;
    }
    if (offset < 0) offset = 0;

    // Tách từ tiếng Nhật tại offset
    const word = japaneseEngine.getWordAtOffset(text, offset, scanExtend);

    if (word) {
      let wordIndex = -1;
      try {
        wordIndex = text.indexOf(word, Math.max(0, offset - word.length));
        if (wordIndex === -1) {
          wordIndex = text.indexOf(word);
        }
        if (wordIndex !== -1) {
          wordRange = document.createRange();
          wordRange.setStart(textNode, wordIndex);
          wordRange.setEnd(textNode, wordIndex + word.length);
        }
      } catch (_) {}

      // Kiểm tra tọa độ vật lý khi có ClientRects (với dung sai an toàn theo line-height & DPI scaling)
      if (wordRange) {
        const rects = wordRange.getClientRects();
        if (rects && rects.length > 0) {
          let isInsideWord = false;
          const padX = 24; // Dung sai 24px theo chiều ngang
          const padY = 24; // Dung sai 24px theo chiều dọc cho line-height
          for (let i = 0; i < rects.length; i++) {
            const r = rects[i];
            if (
              clientX >= r.left - padX &&
              clientX <= r.right + padX &&
              clientY >= r.top - padY &&
              clientY <= r.bottom + padY
            ) {
              isInsideWord = true;
              break;
            }
          }
          if (!isInsideWord) {
            scheduleHide(350);
            return;
          }
        }
      }

      // Trích xuất câu ngữ cảnh
      currentContextSentence = '';
      if (text) {
        const sentences = text.split(/(?<=[。！？\n])/);
        for (const s of sentences) {
          if (s.includes(word)) {
            currentContextSentence = s.trim();
            break;
          }
        }
        if (!currentContextSentence) {
          currentContextSentence = text.trim().slice(0, 160);
        }
      }

      if (word === currentWord) {
        cancelHideSchedule();
        if (wordRange) updateVisualHighlight(wordRange, clientX, clientY);
        return;
      }

      if (activeAbortController) {
        activeAbortController.abort();
        activeAbortController = null;
      }

      // Nhận diện Furigana trong ngoặc đơn NGAY SAU TỪ KANJI hoặc trong thẻ <ruby>
      let inlineFurigana = '';
      try {
        // Chỉ tìm ngoặc đơn nếu nó bắt đầu ngay lập tức sau từ (ví dụ: 時計（とけい）)
        // Không quét xa để tránh nhận nhầm ngoặc của từ khác trong câu (như すみません、この時計（とけい）)
        const startAfter = (wordIndex !== -1) ? (wordIndex + word.length) : (offset + word.length);
        const afterText = text.slice(startAfter);
        const matchParen = afterText.match(/^\s*[\(（]([\u3040-\u309F\u30A0-\u30FFー]+)[\)）]/);

        if (matchParen && matchParen[1]) {
          inlineFurigana = matchParen[1].trim();
        } else if (textNode.parentElement) {
          const rubyElem = textNode.parentElement.closest('ruby');
          if (rubyElem) {
            const rtElem = rubyElem.querySelector('rt');
            if (rtElem && rtElem.textContent) {
              inlineFurigana = rtElem.textContent.trim();
            }
          }
        }
      } catch (_) {}

      const analyzed = japaneseEngine.analyze(word, text, offset);
      if (analyzed) {
        analyzed.word = word;

        // Chỉ áp dụng Furigana trong ngoặc đơn nếu từ chứa chữ Kanji
        if (inlineFurigana && isJapaneseText(inlineFurigana) && /[一-龯]/.test(word)) {
          analyzed.reading = inlineFurigana;
          analyzed.speechText = inlineFurigana;
          if (typeof toRomaji === 'function') {
            analyzed.romaji = toRomaji(inlineFurigana);
          }
        }

        showTooltip(analyzed, clientX, clientY, wordRange);
        return;
      }
    }

    scheduleHide(350);
  }

  function handleDocumentClick(e) {
    if (isInsideExtensionUi(e)) {
      cancelHideSchedule();
      return;
    }
    if (Date.now() - justOpenedSentenceCardAt < 350) {
      return;
    }
    // Click ra ngoài sentence card & selection badge → đóng
    if (sentenceCard && sentenceCard.classList.contains('visible')) {
      hideSentenceCard();
    }
    if (selectionBadge && selectionBadge.classList.contains('visible')) {
      hideSelectionBadge();
    }
    if (!isPinned) {
      if (cardElem && cardElem.classList.contains('visible')) {
        hideTooltip();
      }
    }
  }

  // Đồng bộ từ vựng hiện tại sang Anki Desktop
  async function syncCurrentWordToAnki() {
    if (!currentWord) return;
    const ankiBtn = shadowRoot ? shadowRoot.getElementById('jp-anki-btn') : null;
    if (ankiBtn) {
      ankiBtn.textContent = '⏳';
    }

    try {
      const cardData = {
        word: currentWord,
        reading: currentReading || '',
        hanviet: currentHanViet || '',
        meaning: currentMeaning || '',
        pitchAccent: currentWordData ? currentWordData.pitchAccent : '',
        sentence: currentContextSentence || '',
        deckName: settings.ankiDeckName || 'JP Hover Notebook',
        modelName: settings.ankiModelName || 'Basic'
      };

      if (typeof ankiConnect !== 'undefined') {
        const res = await ankiConnect.addWordNote(cardData);
        if (ankiBtn) {
          ankiBtn.textContent = '✅ Anki';
          ankiBtn.classList.add('success');
        }
        showToast(`✅ Đã thêm [${currentWord}] vào Anki (${res.deckName})!`);
        setTimeout(() => {
          if (ankiBtn) {
            ankiBtn.textContent = '📥 Anki';
            ankiBtn.classList.remove('success');
          }
        }, 2500);
      }
    } catch (err) {
      if (ankiBtn) ankiBtn.textContent = '❌ Lỗi';
      showToast(`⚠️ Anki: ${err.message}`, 4000);
      setTimeout(() => {
        if (ankiBtn) ankiBtn.textContent = '📥 Anki';
      }, 2500);
    }
  }

  // Mở modal xem thứ tự nét viết chữ Hán
  async function openStrokeModal(char) {
    if (!char || !strokeModalOverlay) return;
    hideTooltip(true);
    currentStrokeChar = char;
    strokeModalOverlay.classList.add('active');
    const titleElem = strokeModalOverlay.querySelector('#jp-stroke-kanji-title');
    const canvasBox = strokeModalOverlay.querySelector('#jp-stroke-canvas-box');
    const infoBox = strokeModalOverlay.querySelector('#jp-stroke-info');

    if (titleElem) titleElem.textContent = char;
    if (canvasBox) {
      canvasBox.textContent = '';
      const loadMsg = document.createElement('div');
      loadMsg.style.cssText = 'color:#64748b;font-size:13px;display:flex;align-items:center;justify-content:center;height:100%;';
      loadMsg.textContent = '⏳ Đang tải nét vẽ...';
      canvasBox.appendChild(loadMsg);
    }

    // Metadata Kanji
    if (infoBox && typeof KANJI_DATA !== 'undefined') {
      const kData = KANJI_DATA[char] || {};
      const hv = Array.isArray(kData.hv || kData.hanviet)
        ? (kData.hv || kData.hanviet).join(', ')
        : (kData.hv || kData.hanviet || 'Chưa có');
      const on = Array.isArray(kData.on)
        ? kData.on.join(', ')
        : (kData.on || '—');
      const kun = Array.isArray(kData.kun)
        ? kData.kun.join(', ')
        : (kData.kun || '—');
      const level = kData.level || (kData.jlpt ? `JLPT N${kData.jlpt}` : 'Chữ Hán');

      infoBox.innerHTML = `
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
          <span style="color:#fcd34d;font-weight:bold;font-size:14px;">Âm Hán-Việt: ${hv}</span>
          <span style="background:rgba(56,189,248,0.15);color:#38bdf8;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;">${level}</span>
        </div>
        <div style="color:#cbd5e1;font-size:12px;margin-bottom:2px;"><strong>Âm On:</strong> ${on}</div>
        <div style="color:#cbd5e1;font-size:12px;margin-bottom:2px;"><strong>Âm Kun:</strong> ${kun}</div>
        <div style="color:#94a3b8;font-size:12px;margin-top:4px;">${kData.m || ''}</div>
      `;
    }

    // Tải SVG nét vẽ
    if (typeof kanjiStrokeAnimator !== 'undefined') {
      try {
        const rawSvg = await kanjiStrokeAnimator.fetchKanjiSvg(char);
        if (rawSvg && canvasBox) {
          kanjiStrokeAnimator.renderAnimatedSvg(canvasBox, rawSvg, { showNumbers: showStrokeNumbers });
          kanjiStrokeAnimator.showAllStrokes(canvasBox);
        }
      } catch (err) {
        console.warn('Lỗi hiển thị SVG nét vẽ:', err);
        if (canvasBox) {
          canvasBox.textContent = '';
          const fallbackDiv = document.createElement('div');
          fallbackDiv.style.cssText = 'font-size:68px;font-weight:bold;display:flex;align-items:center;justify-content:center;height:100%;color:#ffffff;';
          fallbackDiv.textContent = char;
          canvasBox.appendChild(fallbackDiv);
        }
      }
    }
  }

  function closeStrokeModal() {
    if (strokeModalOverlay) {
      strokeModalOverlay.classList.remove('active');
      if (typeof kanjiStrokeAnimator !== 'undefined') {
        kanjiStrokeAnimator.stopAnimation();
      }
    }
  }

  window.__JP_OPEN_STROKE_MODAL = openStrokeModal;

  function openFeedbackModal(contextData = {}) {
    if (!feedbackModalOverlay) return;
    activeFeedbackContext = { ...(contextData || {}) };
    cancelHideSchedule();

    const catEl = feedbackModalOverlay.querySelector('#jp-fb-category');
    const wordEl = feedbackModalOverlay.querySelector('#jp-fb-word');
    const readEl = feedbackModalOverlay.querySelector('#jp-fb-correct-reading');
    const meanEl = feedbackModalOverlay.querySelector('#jp-fb-correct-meaning');
    const noteEl = feedbackModalOverlay.querySelector('#jp-fb-note');
    const wordFields = feedbackModalOverlay.querySelector('#jp-fb-word-fields');
    const overrideWrap = feedbackModalOverlay.querySelector('#jp-fb-override-wrap');
    const overrideCb = feedbackModalOverlay.querySelector('#jp-fb-apply-override');
    const domainLabel = feedbackModalOverlay.querySelector('#jp-fb-domain-label');
    const snapBox = feedbackModalOverlay.querySelector('#jp-fb-snapshot');
    const snapWord = feedbackModalOverlay.querySelector('#jp-fb-snap-word');
    const snapMeta = feedbackModalOverlay.querySelector('#jp-fb-snap-meta');
    const statusBox = feedbackModalOverlay.querySelector('#jp-fb-status');

    const catVal = activeFeedbackContext.category || (activeFeedbackContext.word ? 'wrong_reading' : 'suggestion');
    if (catEl) catEl.value = catVal;
    const isWordIssue = !['bug', 'suggestion'].includes(catVal);
    if (wordFields) wordFields.style.display = isWordIssue ? 'flex' : 'none';
    if (overrideWrap) overrideWrap.style.display = isWordIssue ? 'flex' : 'none';
    if (overrideCb) overrideCb.checked = true;

    if (wordEl) wordEl.value = activeFeedbackContext.word || '';
    if (readEl) readEl.value = '';
    if (meanEl) meanEl.value = '';
    if (noteEl) noteEl.value = '';
    if (statusBox) statusBox.style.display = 'none';

    if (domainLabel) {
      const host = (typeof location !== 'undefined' && location.hostname) ? location.hostname : '';
      domainLabel.textContent = host ? `🌐 Đính kèm tên miền (${host})` : '🌐 Đính kèm tên miền trang web';
    }

    if (snapBox && snapWord && snapMeta) {
      if (activeFeedbackContext.word) {
        snapWord.textContent = activeFeedbackContext.word;
        const metaParts = [];
        if (activeFeedbackContext.currentReading) metaParts.push(`Đọc: ${activeFeedbackContext.currentReading}`);
        if (activeFeedbackContext.currentRomaji) metaParts.push(`Romaji: ${activeFeedbackContext.currentRomaji}`);
        if (activeFeedbackContext.currentMeaning) metaParts.push(`Nghĩa: ${activeFeedbackContext.currentMeaning}`);
        snapMeta.textContent = metaParts.join(' • ') || 'Chưa có thông tin phiên âm/nghĩa';
        snapBox.style.display = 'flex';
      } else {
        snapBox.style.display = 'none';
      }
    }

    feedbackModalOverlay.classList.add('active');
    setTimeout(() => {
      const targetFocus = isWordIssue ? (readEl || noteEl) : noteEl;
      if (targetFocus) targetFocus.focus();
    }, 40);
  }

  function closeFeedbackModal() {
    if (feedbackModalOverlay) {
      feedbackModalOverlay.classList.remove('active');
    }
  }

  window.__JP_OPEN_FEEDBACK_MODAL = openFeedbackModal;

  // 11. Phím tắt toàn cục: Alt+J, Alt+R/Alt+F, Alt+S, E (Anki), S (Audio)
  function handleKeyDown(e) {
    // 1. Alt + J: Bật/Tắt Extension (Luôn luôn lắng nghe để người dùng bật lại khi cần)
    if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && (e.key === 'j' || e.key === 'J' || e.code === 'KeyJ')) {
      e.preventDefault();
      e.stopPropagation();
      settings.enabled = !(settings.enabled !== false);
      window.__JP_EXTENSION_ENABLED__ = settings.enabled;
      window.__JP_SETTINGS__ = settings;
      const qs = window.quickSearchPalette || (typeof quickSearchPalette !== 'undefined' ? quickSearchPalette : null);
      if (qs && qs.setEnabled) {
        qs.setEnabled(settings.enabled);
      }
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ jpSettings: settings });
      }
      if (!settings.enabled) {
        hideAllPopups(true);
      }
      showToggleToast(settings.enabled);
      return;
    }

    // 1b. Alt + S / Ctrl + Shift + F: Mở thanh tra cứu nhanh (hỗ trợ mở ngay cả khi tắt hover nếu được cho phép)
    const isAltS = e.altKey && !e.ctrlKey && !e.metaKey && (e.key === 's' || e.key === 'S' || e.code === 'KeyS');
    const isCtrlShiftF = e.ctrlKey && e.shiftKey && !e.altKey && (e.key === 'f' || e.key === 'F' || e.code === 'KeyF');
    if (isAltS || isCtrlShiftF) {
      const allowIndependent = settings.allowQuickSearchWhenDisabled !== false;
      if (!settings.enabled && !allowIndependent) return;
      const palette = window.quickSearchPalette || (typeof quickSearchPalette !== 'undefined' ? quickSearchPalette : null);
      if (palette) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        palette.toggle(allowIndependent);
        return;
      }
    }

    // 1c. Luôn cho phép Esc đóng Quick Search, Modal Báo lỗi hoặc Modal nét viết Kanji ngay cả khi đang TẮT hover
    if (e.key === 'Escape') {
      if (feedbackModalOverlay && feedbackModalOverlay.classList.contains('active')) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        closeFeedbackModal();
        return;
      }
      const qs = window.quickSearchPalette || (typeof quickSearchPalette !== 'undefined' ? quickSearchPalette : null);
      if (qs && qs.isOpen) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        qs.close();
        return;
      }
      if (strokeModalOverlay && strokeModalOverlay.classList.contains('active')) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        closeStrokeModal();
        return;
      }
    }

    // Nếu Extension đang TẮT -> Không bắt bất kỳ phím tắt nào khác
    if (!settings.enabled) return;

    // Nhận diện xem người dùng có đang gõ văn bản trong input/textarea/chatgpt prompt không
    const activeEl = document.activeElement;
    const isFocusInInput = activeEl && (
      ['INPUT', 'TEXTAREA'].includes(activeEl.tagName) ||
      activeEl.isContentEditable ||
      activeEl.getAttribute('contenteditable') === 'true' ||
      activeEl.getAttribute('role') === 'textbox'
    );
    const targetIsInput = ['INPUT', 'TEXTAREA'].includes(e.target.tagName) || 
                          e.target.isContentEditable || 
                          (typeof e.target.getAttribute === 'function' && e.target.getAttribute('contenteditable') === 'true');

    // Chỉ kích hoạt phím tắt từ vựng (S, W, E, C, P) khi:
    // - Tooltip đang hiển thị VÀ
    // - Chuột đang rê trên tooltip HOẶC người dùng KHÔNG focus trong bất kỳ ô nhập văn bản nào
    const isCardVisible = cardElem && cardElem.classList.contains('visible');
    const canTriggerWordShortcut = isCardVisible && currentWord && (isMouseOverTooltip || (!targetIsInput && !isFocusInInput));

    // Esc để đóng Quick Search, Sentence Card, Stroke Modal hoặc đóng Tooltip
    if (e.key === 'Escape') {
      const qs = window.quickSearchPalette || (typeof quickSearchPalette !== 'undefined' ? quickSearchPalette : null);
      if (qs && qs.isOpen) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        qs.close();
        return;
      }
      if (sentenceCard && sentenceCard.classList.contains('visible')) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        hideSentenceCard();
        return;
      }
      if (strokeModalOverlay && strokeModalOverlay.classList.contains('active')) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        closeStrokeModal();
        return;
      }
      if (isCardVisible) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        hideTooltip(true);
        return;
      }
    }

    // Phím 'S' để phát âm khi có từ đang hiển thị trên Tooltip
    if ((e.key === 's' || e.key === 'S') && !e.ctrlKey && !e.altKey && !e.metaKey) {
      if (canTriggerWordShortcut) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        cancelHideSchedule();
        const speakText = getActiveSpeakText();
        const audioBtn = cardElem ? cardElem.querySelector('#jp-audio-btn') : null;
        if (speakText && typeof japaneseEngine !== 'undefined') {
          japaneseEngine.speak(
            speakText,
            {
              rate: settings.speechRate || 0.95,
              pitch: settings.speechPitch || 1.0,
              voiceUri: settings.voiceUri || ''
            },
            () => audioBtn && audioBtn.classList.add('playing'),
            () => audioBtn && audioBtn.classList.remove('playing')
          );
        }
        return;
      }
    }

    // Phím 'E' để thêm vào Anki khi có từ đang hiển thị trên Tooltip
    if ((e.key === 'e' || e.key === 'E') && !e.ctrlKey && !e.altKey && !e.metaKey) {
      if (canTriggerWordShortcut) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        syncCurrentWordToAnki();
        return;
      }
    }

    // Phím 'W' để lưu/bỏ lưu từ vào Sổ tay từ vựng (Bookmark ⭐)
    if ((e.key === 'w' || e.key === 'W') && !e.ctrlKey && !e.altKey && !e.metaKey) {
      if (canTriggerWordShortcut) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        toggleCurrentWordSaved();
        return;
      }
    }

    // Phím 'C' để sao chép từ vựng hiện tại (Copy 📋)
    if ((e.key === 'c' || e.key === 'C') && !e.ctrlKey && !e.altKey && !e.metaKey) {
      if (canTriggerWordShortcut) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        copyCurrentWord();
        return;
      }
    }

    // Phím 'P' để ghim/bỏ ghim Tooltip cố định (Pin 📌)
    if ((e.key === 'p' || e.key === 'P') && !e.ctrlKey && !e.altKey && !e.metaKey) {
      if (canTriggerWordShortcut) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        togglePinTooltip();
        return;
      }
    }

  }

  function ensureToastElement() {
    if (toastElem) {
      if (shadowRoot && toastElem.parentNode !== shadowRoot) {
        shadowRoot.appendChild(toastElem);
      }
      return toastElem;
    }
    toastElem = document.createElement('div');
    toastElem.id = 'jp-quick-toast';
    toastElem.className = 'jp-quick-toast';
    if (shadowRoot) {
      shadowRoot.appendChild(toastElem);
    } else {
      const targetParent = document.body || document.documentElement;
      if (targetParent) targetParent.appendChild(toastElem);
    }
    return toastElem;
  }

  function showToast(msg, duration = 2000, isMuted = false) {
    const toast = ensureToastElement();
    if (!toast) return;

    if (toastHideTimer) {
      clearTimeout(toastHideTimer);
      toastHideTimer = null;
    }

    toast.textContent = msg;
    if (isMuted) {
      toast.classList.add('is-off');
    } else {
      toast.classList.remove('is-off');
    }

    // Fallback style nếu không nằm trong Shadow DOM
    if (!shadowRoot) {
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #0f172a;
        color: ${isMuted ? '#cbd5e1' : '#38bdf8'};
        border: 1px solid ${isMuted ? '#64748b' : '#38bdf8'};
        padding: 10px 18px;
        border-radius: 10px;
        font-family: sans-serif;
        font-size: 13px;
        font-weight: 700;
        z-index: 2147483647;
        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
        transition: all 0.25s ease;
        pointer-events: none;
      `;
    }

    toast.classList.add('visible');
    toastHideTimer = setTimeout(() => {
      toast.classList.remove('visible');
      if (!shadowRoot) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.visibility = 'hidden';
      }
      toastHideTimer = null;
    }, Math.max(800, Number(duration) || 2000));
  }

  function showToggleToast(enabled) {
    // Chỉ hiển thị ở tab đang mở để tránh nháy thông báo trên các tab nền khi sync storage
    if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
      return;
    }
    const nextState = Boolean(enabled);
    const now = Date.now();
    // Chống trùng lặp khi cả chrome.storage.onChanged lẫn SET_STATE cùng đến cho 1 lần bấm
    if (lastToggleToastState === nextState && (now - lastToggleToastAt) < 400) {
      return;
    }
    lastToggleToastState = nextState;
    lastToggleToastAt = now;
    showToast(
      nextState
        ? '🟢 Đã BẬT phiên âm tiếng Nhật (Alt+J)'
        : '⚪ Đã TẮT phiên âm tiếng Nhật (Alt+J)',
      2200,
      !nextState
    );
  }

  // Lắng nghe tin nhắn từ Extension Background / Popup
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg.action === 'SET_STATE' || msg.action === 'TOGGLE_HOVER') {
        const prevEnabled = settings.enabled !== false;
        if (msg.settings && typeof msg.settings === 'object') {
          settings = { ...settings, ...msg.settings };
          window.__JP_SETTINGS__ = settings;
        }
        const nextEnabled = typeof msg.enabled === 'boolean' ? msg.enabled : !(settings.enabled !== false);
        settings.enabled = nextEnabled;
        window.__JP_EXTENSION_ENABLED__ = nextEnabled;
        const qs = window.quickSearchPalette || (typeof quickSearchPalette !== 'undefined' ? quickSearchPalette : null);
        if (qs) {
          if (qs.setAllowWhenDisabled) qs.setAllowWhenDisabled(settings.allowQuickSearchWhenDisabled !== false);
          if (qs.setEnabled) qs.setEnabled(nextEnabled);
        }
        if (!nextEnabled) hideAllPopups(true);
        if (msg.action === 'TOGGLE_HOVER' || msg.showToggleToast || prevEnabled !== nextEnabled) {
          showToggleToast(nextEnabled);
        }
        sendResponse({ enabled: nextEnabled });
      } else if (msg.action === 'GET_STATUS') {
        sendResponse({ enabled: settings.enabled });
      } else if (msg.action === 'TOGGLE_QUICK_SEARCH') {
        const allowIndependent = Boolean(msg.forceAllow || msg.allowWhenDisabled || settings.allowQuickSearchWhenDisabled !== false);
        if (!settings.enabled && !allowIndependent) {
          sendResponse({ success: false, reason: 'disabled' });
          return;
        }
        const palette = window.quickSearchPalette || (typeof quickSearchPalette !== 'undefined' ? quickSearchPalette : null);
        if (palette) {
          palette.toggle(allowIndependent);
          sendResponse({ success: true });
        }
      } else if (msg.action === 'SYNC_ANKI') {
        syncCurrentWordToAnki();
        sendResponse({ success: true });
      }
    });
  }

  // CSS nhúng trực tiếp an toàn 100% trong Shadow DOM (không vi phạm CSP/Same-Origin trên YouTube, Netflix)
  function getDefaultCss() {
    return `
/* CSS dành riêng cho Tooltip hiển thị phiên âm tiếng Nhật trong Shadow DOM & Highlight Overlay */

:host {
  all: initial;
  z-index: 2147483647;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", "Hiragino Kaku Gothic ProN", Meiryo, "Yu Gothic", "Noto Sans JP", sans-serif;
  line-height: 1.5;
  color: #f1f5f9;
}

/* Lớp Highlight dạ quang màu Cyan bao quanh từ vựng trên trang web */
.jp-highlight-overlay {
  position: fixed;
  pointer-events: none;
  background: rgba(56, 189, 248, 0.22);
  border: 1.5px solid #38bdf8;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.45);
  z-index: 2147483640;
  transition: all 0.12s cubic-bezier(0.2, 0, 0.2, 1);
  display: none;
}

.jp-highlight-overlay.active {
  display: block;
}

/* Thẻ Popup Card chính */
.jp-card {
  position: fixed;
  z-index: 2147483647;
  pointer-events: auto;
  min-width: 300px;
  max-width: 480px;
  width: max-content;
  background: rgba(15, 23, 42, 0.96);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 20px 45px -5px rgba(0, 0, 0, 0.75), 0 0 1px 1px rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 14px 16px;
  color: #f8fafc;
  box-sizing: border-box;
  opacity: 0;
  visibility: hidden;
  transform: translateY(6px) scale(0.97);
  transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.2s;
  display: flex;
  flex-direction: column;
  gap: 10px;
  user-select: text !important;
  -webkit-user-select: text !important;
}

.jp-card.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.jp-card.pinned {
  border-color: #38bdf8;
  box-shadow: 0 20px 45px -5px rgba(0, 0, 0, 0.85), 0 0 0 1px #38bdf8;
}

/* Phần Đầu: Từ gốc + Cách đọc Furigana + Nút Hành động */
.jp-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 8px;
}

.jp-word-box {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  flex: 1 1 auto;
  user-select: text !important;
  -webkit-user-select: text !important;
}

.jp-reading-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex-wrap: wrap;
  min-width: 0;
  line-height: 1.4;
}

.jp-reading {
  font-size: 15px;
  font-weight: 700;
  color: #38bdf8; /* Xanh Cyan sáng */
  letter-spacing: 0.3px;
  word-break: break-word;
  user-select: text !important;
  -webkit-user-select: text !important;
  cursor: text;
}

.jp-reading-kata {
  font-size: 13.5px;
  font-weight: 600;
  color: #cbd5e1; /* Katakana bọc trong ngoặc (タカイ) rõ ràng */
  letter-spacing: 0.3px;
  word-break: break-word;
  user-select: text !important;
  -webkit-user-select: text !important;
}

.jp-pitch-badge {
  background: rgba(236, 72, 153, 0.16);
  color: #f472b6;
  border: 1px solid rgba(236, 72, 153, 0.35);
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
  line-height: 1.4;
  align-self: center;
}

.jp-main-word {
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.25;
  word-break: break-word;
  user-select: text !important;
  -webkit-user-select: text !important;
  cursor: text;
}

.jp-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  margin-top: 2px;
  user-select: none;
  -webkit-user-select: none;
}

/* Nút hành động */
.jp-icon-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #94a3b8;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
  flex-shrink: 0;
  font-size: 12px;
  user-select: none;
  -webkit-user-select: none;
}

.jp-icon-btn:hover {
  background: rgba(56, 189, 248, 0.2);
  color: #38bdf8;
  border-color: #38bdf8;
  transform: scale(1.08);
}

.jp-icon-btn.active {
  background: #38bdf8;
  color: #0f172a;
  border-color: #38bdf8;
}

.jp-audio-btn {
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.35);
  color: #38bdf8;
}

.jp-audio-btn:hover {
  background: #38bdf8;
  color: #0f172a;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.5);
}

.jp-audio-btn svg {
  width: 15px;
  height: 15px;
  fill: currentColor;
}

/* Các thẻ Tags (Romaji & Hán Việt & Ngữ pháp) */
.jp-tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  user-select: text !important;
  -webkit-user-select: text !important;
}

.jp-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.3px;
  user-select: text !important;
  -webkit-user-select: text !important;
  cursor: text;
}

.jp-badge-romaji {
  background: rgba(99, 102, 241, 0.2);
  color: #a5b4fc;
  border: 1px solid rgba(99, 102, 241, 0.35);
}

.jp-badge-hanviet {
  background: rgba(245, 158, 11, 0.2);
  color: #fcd34d;
  border: 1px solid rgba(245, 158, 11, 0.35);
}

.jp-badge-grammar {
  background: rgba(234, 88, 12, 0.2);
  color: #fb923c;
  border: 1px solid rgba(234, 88, 12, 0.35);
}

.jp-badge-type {
  background: rgba(16, 185, 129, 0.2);
  color: #6ee7b7;
  border: 1px solid rgba(16, 185, 129, 0.35);
}

.jp-badge-onkun {
  background: rgba(236, 72, 153, 0.2);
  color: #f472b6;
  border: 1px solid rgba(236, 72, 153, 0.35);
}

/* Bảng phân tích Ngữ pháp & Quy tắc âm đọc */
.jp-grammar-panel {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 11px;
  color: #cbd5e1;
  user-select: text !important;
  -webkit-user-select: text !important;
}

.jp-grammar-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.jp-grammar-label {
  color: #94a3b8;
  font-weight: 600;
  font-size: 10.5px;
}

.jp-grammar-val {
  color: #38bdf8;
  font-weight: 600;
}

.jp-rule-box {
  background: rgba(245, 158, 11, 0.08);
  border-left: 2.5px solid #f59e0b;
  padding: 4px 8px;
  border-radius: 0 4px 4px 0;
  font-size: 10.5px;
  color: #fcd34d;
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.jp-pronunciation-note {
  background: rgba(6, 182, 212, 0.12);
  border-left: 2.5px solid #06b6d4;
  padding: 3px 6px;
  border-radius: 0 4px 4px 0;
  font-size: 10.5px;
  color: #67e8f9;
  line-height: 1.35;
}

.jp-onkun-rule-item {
  color: #fcd34d;
}


/* Phần Ý nghĩa (Meaning) & Đồng nghĩa */
.jp-meaning-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.jp-meaning-box {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #e2e8f0;
  line-height: 1.45;
  background: rgba(255, 255, 255, 0.04);
  padding: 7px 10px;
  border-radius: 8px;
  border-left: 3px solid #38bdf8;
  user-select: text !important;
  -webkit-user-select: text !important;
  cursor: text;
}

.jp-meaning-icon {
  color: #38bdf8;
  font-size: 13px;
  margin-top: 2px;
  flex-shrink: 0;
  user-select: none;
  -webkit-user-select: none;
}

.jp-online-tag {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 9.5px;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 4px;
  padding: 1px 4px;
  margin-left: 4px;
  vertical-align: middle;
}

/* Từ đồng nghĩa (Synonyms) */
.jp-synonyms-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #94a3b8;
  padding: 0 4px;
}

.jp-synonym-pill {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1px 6px;
  border-radius: 4px;
  color: #cbd5e1;
}

/* Bóc tách Kanji (Kanji Decomposition Grid) */
.jp-kanji-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 8px;
}

.jp-kanji-heading {
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.jp-kanji-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;
}

.jp-kanji-card {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 11.5px;
  transition: all 0.2s ease;
}

.jp-kanji-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(56, 189, 248, 0.25);
}

.jp-kanji-char {
  font-size: 18px;
  font-weight: 700;
  color: #38bdf8;
  min-width: 26px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.2);
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.jp-kanji-char:hover {
  background: rgba(56, 189, 248, 0.25);
  transform: scale(1.08);
}

.jp-kanji-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1 1 auto;
  min-width: 0;
}

.jp-kanji-meta {
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex-wrap: wrap;
}

.jp-kanji-hv-name {
  font-weight: 700;
  color: #fcd34d;
  font-size: 11.5px;
  letter-spacing: 0.5px;
}

.jp-kanji-onkun {
  color: #94a3b8;
  font-size: 10px;
  word-break: break-word;
}

.jp-kanji-desc {
  color: #cbd5e1;
  font-size: 10.5px;
  line-height: 1.35;
  word-break: break-word;
}

.jp-kanji-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  flex-shrink: 0;
}

.jp-kanji-action-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #94a3b8;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
  -webkit-user-select: none;
}

.jp-kanji-action-btn:hover {
  background: rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.5);
  color: #38bdf8;
  transform: translateY(-1px) scale(1.06);
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.25);
}

.jp-kanji-action-btn svg {
  width: 13px;
  height: 13px;
  stroke: currentColor;
  transition: stroke 0.2s ease;
}

/* Thanh thông tin dưới cùng (Footer / Shortcut tips) */
.jp-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 11px;
  color: #94a3b8;
  padding-top: 8px;
  border-top: 1px dashed rgba(255, 255, 255, 0.08);
  user-select: none;
  -webkit-user-select: none;
  white-space: nowrap;
}

.jp-footer-left {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.jp-shortcut-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}

.jp-shortcut-hint {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  white-space: nowrap;
}

.jp-kbd {
  background: rgba(255, 255, 255, 0.08);
  padding: 1px 6px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  font-size: 9.5px;
  font-weight: 600;
  color: #cbd5e1;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
}

/* Nút sao lưu từ vựng (Bookmark Star) */
.jp-star-btn {
  color: #94a3b8;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.jp-star-btn:hover {
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.15);
  border-color: rgba(251, 191, 36, 0.4);
}

.jp-star-btn.active {
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.2);
  border-color: #fbbf24;
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(251, 191, 36, 0.4);
}

/* Nút sao chép (Copy) */
.jp-copy-btn:hover {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.15);
  border-color: rgba(56, 189, 248, 0.4);
}

.jp-copy-btn.copied {
  color: #10b981;
  background: rgba(16, 185, 129, 0.2);
  border-color: #10b981;
}

/* Hiệu ứng sóng âm thanh khi phát âm */
@keyframes jpAudioPulse {
  0% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.6); }
  70% { box-shadow: 0 0 0 8px rgba(56, 189, 248, 0); }
  100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
}

.jp-audio-btn.playing {
  background: #38bdf8 !important;
  color: #0f172a !important;
  animation: jpAudioPulse 1.2s infinite ease-out;
}

/* Nút mini dịch đoạn bôi đen (Selection Translate Badge) */
.jp-selection-badge {
  position: fixed;
  z-index: 2147483647;
  visibility: hidden;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(56, 189, 248, 0.5);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 12px rgba(56, 189, 248, 0.3);
  padding: 6px 12px;
  border-radius: 20px;
  color: #38bdf8;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transform: translateY(4px);
  opacity: 0;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
}

.jp-selection-badge.visible {
  visibility: visible;
  pointer-events: auto;
  opacity: 1;
  transform: translateY(0);
}

.jp-selection-badge:hover {
  background: #38bdf8;
  color: #0f172a;
  transform: translateY(-2px) scale(1.05);
}

/* Thẻ kết quả dịch câu khi bôi đen & Luyện đọc JLPT */
.jp-sentence-card {
  position: fixed;
  z-index: 2147483647;
  pointer-events: auto;
  max-width: 600px;
  min-width: 360px;
  width: 90vw;
  max-height: 85vh;
  overflow-y: auto;
  background: linear-gradient(160deg, rgba(15, 23, 42, 0.98) 0%, rgba(11, 17, 32, 0.99) 100%);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  border: 1px solid rgba(56, 189, 248, 0.3);
  box-shadow: 0 24px 60px -10px rgba(0, 0, 0, 0.88), 0 0 0 1px rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  padding: 14px 16px;
  color: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(6px) scale(0.97);
  transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.2s;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", "Hiragino Kaku Gothic ProN", Meiryo, "Yu Gothic", "Noto Sans JP", sans-serif;
}

.jp-sentence-card::-webkit-scrollbar {
  width: 6px;
}
.jp-sentence-card::-webkit-scrollbar-thumb {
  background: rgba(56, 189, 248, 0.25);
  border-radius: 4px;
}

.jp-sentence-card.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.jp-st-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.jp-st-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  min-width: 0;
}

.jp-st-title {
  font-weight: 700;
  color: #38bdf8;
  font-size: 13.5px;
  letter-spacing: -0.1px;
  white-space: nowrap;
}

.jp-st-header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.jp-st-controls-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.jp-st-hint {
  font-size: 11px;
  color: #64748b;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.jp-jlpt-speed-bar {
  display: inline-flex;
  align-items: center;
  background: rgba(2, 6, 23, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 2px 4px;
  gap: 2px;
}

.jp-jlpt-speed-label {
  font-size: 10.5px;
  color: #64748b;
  font-weight: 600;
  padding: 0 5px 0 3px;
}

.jp-jlpt-speed-btn {
  appearance: none;
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 11px;
  font-weight: 600;
  font-family: inherit;
  padding: 3px 7px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.jp-jlpt-speed-btn:hover {
  color: #f8fafc;
  background: rgba(255, 255, 255, 0.1);
}

.jp-jlpt-speed-btn.active {
  background: #38bdf8;
  color: #0f172a;
  box-shadow: 0 1px 6px rgba(56, 189, 248, 0.35);
}

.jp-sentence-play-btn.playing {
  background: #22c55e !important;
  color: #ffffff !important;
  animation: jpAudioWave 1.2s infinite ease-in-out;
}

.jp-sentence-source-box {
  font-family: "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", "Noto Sans JP", sans-serif;
  margin: 0;
  padding: 4px;
  background: rgba(2, 6, 23, 0.5);
  border: 1px solid rgba(56, 189, 248, 0.16);
  border-radius: 12px;
  max-height: 40vh;
  overflow-y: auto;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  gap: 4px;
  user-select: text;
  -webkit-user-select: text;
}

.jp-sentence-source-box::-webkit-scrollbar {
  width: 6px;
}
.jp-sentence-source-box::-webkit-scrollbar-thumb {
  background: rgba(56, 189, 248, 0.25);
  border-radius: 4px;
}
.jp-sentence-source-box::-webkit-scrollbar-thumb:hover {
  background: rgba(56, 189, 248, 0.5);
}

/* Thẻ bao phủ từng câu trong đoạn văn */
.jp-reading-sentence-item {
  position: relative;
  padding: 10px 14px;
  border-radius: 9px;
  border: 1px solid transparent;
  background: transparent;
  font-size: 17px;
  line-height: 1.75;
  color: #f1f5f9;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
}

.jp-reading-sentence-item:hover {
  background: rgba(56, 189, 248, 0.08);
  border-color: rgba(56, 189, 248, 0.2);
  color: #ffffff;
}

/* HIỆU ỨNG BOX HIGHLIGHT BAO PHỦ CÂU ĐANG ĐỌC (Luyện đọc JLPT) */
.jp-reading-sentence-item.active {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.18) 0%, rgba(14, 165, 233, 0.08) 100%) !important;
  border: 1.5px solid #38bdf8 !important;
  box-shadow: 0 0 18px rgba(56, 189, 248, 0.32), inset 0 0 10px rgba(56, 189, 248, 0.12) !important;
  color: #ffffff !important;
  font-weight: 500;
}

/* Badge loa hiển thị trên góc Box Highlight */
.jp-reading-speaker-badge {
  display: none;
  position: absolute;
  top: -9px;
  right: 12px;
  background: #0284c7;
  color: #ffffff;
  font-size: 10.5px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  letter-spacing: 0.4px;
  align-items: center;
  gap: 4px;
  z-index: 2;
  pointer-events: none;
}

.jp-reading-sentence-item.active .jp-reading-speaker-badge {
  display: inline-flex;
  animation: jpSpeakerBadgePulse 1.6s infinite ease-in-out;
}

@keyframes jpSpeakerBadgePulse {
  0%, 100% { opacity: 0.95; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(56, 189, 248, 0.5); }
}

.jp-wave-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #ffffff;
  display: inline-block;
  animation: jpWaveBounce 1s infinite ease-in-out;
}
.jp-wave-dot:nth-child(1) { animation-delay: 0s; }
.jp-wave-dot:nth-child(2) { animation-delay: 0.2s; }
.jp-wave-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes jpWaveBounce {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50% { transform: translateY(-3px); opacity: 1; }
}

/* Hiệu ứng quét sáng từng từ bên trong Box Highlight (Karaoke style) */
.jp-reading-word {
  display: inline;
  border-radius: 3px;
  transition: background-color 0.1s ease, color 0.1s ease;
}

.jp-reading-sentence-item.active .jp-reading-word.word-active {
  background: rgba(56, 189, 248, 0.38) !important;
  color: #ffffff !important;
  font-weight: 700 !important;
  box-shadow: 0 0 8px rgba(56, 189, 248, 0.55);
  border-radius: 3px;
  padding: 1px 2px;
}

/* Segmented Tabs cho Selection Translate Card */
.jp-st-tabs-bar {
  display: flex;
  gap: 5px;
  background: rgba(2, 6, 23, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 4px;
}

.jp-st-tab-btn {
  appearance: none;
  -webkit-appearance: none;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 7px;
  padding: 7px 10px;
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.18s ease;
  user-select: none;
  white-space: nowrap;
  outline: none;
}

.jp-st-tab-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #e2e8f0;
}

.jp-st-tab-btn.active {
  background: rgba(56, 189, 248, 0.16);
  color: #38bdf8;
  border-color: rgba(56, 189, 248, 0.42);
  box-shadow: 0 2px 10px rgba(56, 189, 248, 0.18);
}

.jp-st-tab-btn[data-tab="grammar"].active,
.jp-st-tab-btn[data-tab="explain"].active {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.24) 0%, rgba(56, 189, 248, 0.16) 100%);
  color: #e9d5ff;
  border-color: rgba(168, 85, 247, 0.45);
  box-shadow: 0 2px 12px rgba(168, 85, 247, 0.22);
}

.jp-st-pane {
  display: block;
}

.jp-sentence-meaning {
  font-size: 14.5px;
  font-weight: 500;
  color: #f8fafc;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(14, 165, 233, 0.04) 100%);
  border: 1px solid rgba(56, 189, 248, 0.16);
  border-left: 3.5px solid #38bdf8;
  padding: 12px 14px;
  border-radius: 10px;
  line-height: 1.6;
  user-select: text;
  -webkit-user-select: text;
}

.jp-st-ai-box {
  background: rgba(2, 6, 23, 0.55);
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 12.5px;
  line-height: 1.65;
  color: #f1f5f9;
  max-height: 360px;
  overflow-y: auto;
  user-select: text;
  -webkit-user-select: text;
}

.jp-st-ai-box::-webkit-scrollbar,
.jp-ai-panel::-webkit-scrollbar {
  width: 6px;
}
.jp-st-ai-box::-webkit-scrollbar-thumb,
.jp-ai-panel::-webkit-scrollbar-thumb {
  background: rgba(168, 85, 247, 0.35);
  border-radius: 4px;
}

/* AI Button & Panel trong Hover Tooltip */
.jp-ai-btn {
  background: rgba(168, 85, 247, 0.14) !important;
  border-color: rgba(168, 85, 247, 0.4) !important;
  color: #c084fc !important;
}

.jp-ai-btn:hover,
.jp-ai-btn.active {
  background: #a855f7 !important;
  border-color: #a855f7 !important;
  color: #ffffff !important;
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.55) !important;
}

.jp-ai-panel {
  background: rgba(2, 6, 23, 0.72);
  border: 1px solid rgba(168, 85, 247, 0.35);
  border-radius: 10px;
  padding: 10px 12px;
  margin-top: 2px;
  font-size: 12px;
  line-height: 1.6;
  color: #f1f5f9;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  max-height: 260px;
  overflow-y: auto;
  user-select: text;
  -webkit-user-select: text;
}

.jp-ai-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(168, 85, 247, 0.25);
  padding-bottom: 6px;
  margin-bottom: 8px;
}

.jp-ai-panel-title {
  font-weight: 700;
  font-size: 12px;
  color: #c084fc;
}

.jp-ai-panel-close {
  appearance: none;
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 13px;
  padding: 2px 6px;
  border-radius: 4px;
}

.jp-ai-panel-close:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
}

.jp-ai-md h3, .jp-ai-md h4,
.jp-st-ai-box strong, .jp-ai-panel-body strong {
  color: #e9d5ff;
}

.jp-report-btn:hover,
.jp-report-icon-btn:hover {
  background: rgba(245, 158, 11, 0.22) !important;
  border-color: rgba(245, 158, 11, 0.55) !important;
  color: #fbbf24 !important;
}

.jp-flashcard-btn:hover {
  background: rgba(99, 102, 241, 0.25) !important;
  color: #818cf8 !important;
  border-color: rgba(99, 102, 241, 0.5) !important;
  transform: scale(1.1);
}

/* Badge hiển thị nguồn API dịch ngoài */
.jp-api-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.3);
  letter-spacing: 0.2px;
  transition: all 0.2s ease;
  user-select: none;
}

.jp-api-badge.ai {
  background: rgba(168, 85, 247, 0.18);
  color: #c084fc;
  border-color: rgba(168, 85, 247, 0.4);
}

/* ==========================================================================
   TÍNH NĂNG MỚI: ANKICONNECT, KANJI STROKE ORDER & QUICK SEARCH
   ========================================================================== */

/* Nút Anki 1-Click trên Header Tooltip */
.jp-anki-btn {
  background: rgba(14, 165, 233, 0.12);
  border: 1px solid rgba(14, 165, 233, 0.35);
  color: #38bdf8;
  font-size: 11px;
  font-weight: 600;
  border-radius: 6px;
  padding: 3px 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.15s ease;
}

.jp-anki-btn:hover {
  background: #0284c7;
  color: #ffffff;
  border-color: #0284c7;
  transform: scale(1.05);
}

.jp-anki-btn.success {
  background: #10b981 !important;
  color: #ffffff !important;
  border-color: #10b981 !important;
}

/* Nút xem nét vẽ chữ Hán trên Kanji Breakdown */
.jp-stroke-trigger {
  cursor: pointer;
  text-decoration: underline dotted #38bdf8;
  transition: color 0.15s ease;
}

.jp-stroke-trigger:hover {
  color: #38bdf8;
}

/* Modal xem Nét vẽ Chữ Hán (Kanji Stroke Order) */
.jp-stroke-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  z-index: 2147483647;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.2s ease;
}

.jp-stroke-modal-overlay.active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.jp-stroke-modal {
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.9);
  border-radius: 18px;
  width: 90%;
  max-width: 440px;
  padding: 22px;
  color: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transform: scale(0.95);
  transition: transform 0.2s ease;
}

.jp-stroke-modal-overlay.active .jp-stroke-modal {
  transform: scale(1);
}

.jp-stroke-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 12px;
}

.jp-stroke-title {
  font-size: 18px;
  font-weight: 700;
  color: #38bdf8;
  display: flex;
  align-items: center;
  gap: 8px;
}

.jp-stroke-close {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: color 0.15s ease;
}

.jp-stroke-close:hover {
  color: #ffffff;
}

.jp-stroke-canvas-box {
  width: 220px;
  height: 220px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #38bdf8;
  box-shadow: 0 10px 25px rgba(56, 189, 248, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.jp-stroke-controls {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.jp-stroke-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f1f5f9;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.15s ease;
  user-select: none;
}

.jp-stroke-btn:hover {
  background: #38bdf8;
  color: #0f172a;
  border-color: #38bdf8;
}

.jp-stroke-show-all-btn {
  background: rgba(56, 189, 248, 0.14);
  border-color: rgba(56, 189, 248, 0.35);
  color: #38bdf8;
}

.jp-stroke-show-all-btn:hover {
  background: #38bdf8;
  color: #0f172a;
}

.jp-stroke-info {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 12px;
  font-size: 13px;
  line-height: 1.6;
}

/* Nút Báo lỗi trong Footer Tooltip */
.jp-footer-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.jp-report-footer-btn {
  appearance: none;
  -webkit-appearance: none;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.3);
  color: #fbbf24;
  border-radius: 6px;
  padding: 2px 7px;
  font-size: 10.5px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.jp-report-footer-btn:hover {
  background: rgba(245, 158, 11, 0.25);
  border-color: #fbbf24;
  color: #ffffff;
}

/* Modal Báo lỗi / Sửa từ & Góp ý */
.jp-feedback-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.78);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 2147483647;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.2s ease;
}

.jp-feedback-modal-overlay.active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.jp-feedback-modal {
  background: linear-gradient(160deg, rgba(15, 23, 42, 0.99) 0%, rgba(11, 17, 32, 0.99) 100%);
  border: 1px solid rgba(56, 189, 248, 0.3);
  box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.92), 0 0 0 1px rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  width: 100%;
  max-width: 470px;
  max-height: 88vh;
  overflow-y: auto;
  padding: 18px 20px;
  color: #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transform: scale(0.96);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", "Noto Sans JP", sans-serif;
}

.jp-feedback-modal-overlay.active .jp-feedback-modal {
  transform: scale(1);
}

.jp-fb-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.jp-fb-title-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.jp-fb-title {
  font-size: 15px;
  font-weight: 700;
  color: #fbbf24;
}

.jp-fb-subtitle {
  font-size: 11.5px;
  color: #94a3b8;
}

.jp-fb-snapshot {
  display: flex;
  flex-direction: column;
  gap: 3px;
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.22);
  border-left: 3px solid #38bdf8;
  border-radius: 9px;
  padding: 8px 12px;
}

.jp-fb-snapshot-word {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
}

.jp-fb-snapshot-meta {
  font-size: 11.5px;
  color: #cbd5e1;
  line-height: 1.45;
  word-break: break-word;
}

.jp-fb-form,
.jp-fb-word-fields {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.jp-fb-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.jp-fb-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.jp-fb-label {
  font-size: 11.5px;
  font-weight: 600;
  color: #cbd5e1;
}

.jp-fb-input,
.jp-fb-select,
.jp-fb-textarea {
  width: 100%;
  box-sizing: border-box;
  background: rgba(2, 6, 23, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  padding: 8px 10px;
  color: #f8fafc;
  font-size: 12.5px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.jp-fb-select option {
  background: #0f172a;
  color: #f8fafc;
}

.jp-fb-input:focus,
.jp-fb-select:focus,
.jp-fb-textarea:focus {
  border-color: #38bdf8;
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
}

.jp-fb-textarea {
  resize: vertical;
  min-height: 64px;
}

.jp-fb-options {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  padding: 8px 10px;
}

.jp-fb-check {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  color: #cbd5e1;
  cursor: pointer;
}

.jp-fb-check input {
  accent-color: #38bdf8;
  width: 14px;
  height: 14px;
  cursor: pointer;
  flex-shrink: 0;
}

.jp-fb-status {
  font-size: 12px;
  font-weight: 600;
  padding: 8px 10px;
  border-radius: 8px;
  line-height: 1.45;
}

.jp-fb-status.success {
  background: rgba(16, 185, 129, 0.14);
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: #34d399;
}

.jp-fb-status.error {
  background: rgba(239, 68, 68, 0.14);
  border: 1px solid rgba(239, 68, 68, 0.35);
  color: #f87171;
}

.jp-fb-actions {
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
  padding-top: 4px;
}

.jp-fb-btn {
  appearance: none;
  -webkit-appearance: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.jp-fb-btn-primary {
  flex: 1;
  background: linear-gradient(135deg, #0284c7 0%, #38bdf8 100%);
  border: 1px solid rgba(56, 189, 248, 0.6);
  color: #0b1120;
}

.jp-fb-btn-primary:hover {
  filter: brightness(1.1);
}

.jp-fb-btn-github {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #f8fafc;
}

.jp-fb-btn-github:hover {
  background: rgba(255, 255, 255, 0.16);
  border-color: #ffffff;
}

.jp-fb-btn-email {
  background: rgba(16, 185, 129, 0.16);
  border: 1px solid rgba(52, 211, 153, 0.45);
  color: #6ee7b7;
}

.jp-fb-btn-email:hover {
  background: rgba(16, 185, 129, 0.28);
  border-color: #34d399;
  color: #ecfdf5;
}

.jp-fb-btn-ghost {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #cbd5e1;
}

.jp-fb-email-hint {
  margin-top: 8px;
  padding: 7px 10px;
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.65);
  border: 1px dashed rgba(52, 211, 153, 0.28);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 11px;
  color: #94a3b8;
}

.jp-fb-email-hint strong {
  color: #6ee7b7;
  user-select: text;
}

.jp-fb-email-links {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.jp-fb-link-btn {
  appearance: none;
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #cbd5e1;
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 10.5px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s ease;
}

.jp-fb-link-btn:hover {
  background: rgba(52, 211, 153, 0.18);
  border-color: rgba(52, 211, 153, 0.45);
  color: #a7f3d0;
}

.jp-fb-btn-ghost:hover {
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  border-color: rgba(56, 189, 248, 0.35);
}

/* ==========================================================================
   CSS CHO CHẾ ĐỘ CHÈN FURIGANA TOÀN TRANG (FULL-PAGE FURIGANA)
   ========================================================================== */
ruby.jp-ext-injected-ruby {
  display: inline-ruby !important;
  ruby-align: center !important;
  margin: 0 1px;
}

rt.jp-ext-injected-rt {
  font-size: 0.65em !important;
  line-height: 1 !important;
  color: #0284c7 !important;
  font-family: "Hiragino Sans", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif !important;
  user-select: none !important;
  -webkit-user-select: none !important;
}

/* Toast thông báo bật/tắt & thao tác nhanh (cô lập hoàn toàn trong Shadow DOM) */
.jp-quick-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 2147483647;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transform: translateY(10px) scale(0.97);
  background: rgba(15, 23, 42, 0.96);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.6);
  padding: 10px 18px;
  border-radius: 12px;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.1px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.55), 0 0 16px rgba(56, 189, 248, 0.22);
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
}

.jp-quick-toast.visible {
  visibility: visible;
  opacity: 1;
  transform: translateY(0) scale(1);
}

.jp-quick-toast.is-off {
  color: #e2e8f0;
  border-color: rgba(148, 163, 184, 0.55);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.55);
}

`;
  }

  // Khởi động
  initShadowDOM();
  document.addEventListener('input', () => {
    lastUserTypingTime = Date.now();
  }, true);
  document.addEventListener('mousedown', handleMouseDown, true);
  document.addEventListener('mouseup', handleMouseUp, true);
  document.addEventListener('mousemove', handleMouseMove, true);
  document.addEventListener('click', handleDocumentClick, true);
  document.addEventListener('keydown', handleKeyDown, true);
  window.addEventListener('scroll', () => {
    if (!isPinned) {
      hideVisualHighlight();
    }
  }, { passive: true });
})();
