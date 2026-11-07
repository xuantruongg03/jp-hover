// Content Script chính - Xử lý bắt vị trí chuột, nhận diện từ tiếng Nhật, hiển thị Tooltip & Sổ tay từ vựng

(function () {
  // Tránh inject trùng lặp trên cùng context
  if (window.__JP_HOVER_EXTENSION_INJECTED__) return;
  window.__JP_HOVER_EXTENSION_INJECTED__ = true;
  if (document.documentElement) {
    document.documentElement.setAttribute('data-jp-hover-injected', 'true');
  }

  // Cấu hình mặc định
  let settings = {
    enabled: true,
    activationMode: 'always', // 'always' | 'shift' | 'alt'
    showReading: true,
    showRomaji: true,
    showHanViet: true,
    showMeaning: true,
    showKanjiBreakdown: true,
    showPitchAccent: true,
    enableVisualHighlight: true,
    enableOnlineFallback: true,
    enableSelectionTranslate: true,
    autoPlayAudio: false,
    speechRate: 0.95,
    translationEngine: 'google',
    geminiApiKey: ''
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
  let strokeModalOverlay = null;
  let currentStrokeChar = '';
  let showStrokeNumbers = true;

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
    }
    if (res && Array.isArray(res.jpSavedWords)) {
      savedWordsSet = new Set(res.jpSavedWords.map(item => item.word));
    }
  });

  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local') {
        if (changes.jpSettings) {
          settings = { ...settings, ...changes.jpSettings.newValue };
          if (!settings.enabled) {
            hideAllPopups(true);
          }
        }
        if (changes.jpSavedWords) {
          const list = changes.jpSavedWords.newValue || [];
          savedWordsSet = new Set(list.map(item => item.word));
          updateStarButtonState();
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
            <span class="jp-pitch-badge" id="jp-pitch-badge" style="display:none;"></span>
          </div>
          <div class="jp-main-word" id="jp-word"></div>
        </div>
        <div class="jp-actions">
          <button class="jp-anki-btn" id="jp-anki-btn" title="Thêm vào Anki Desktop 1-Click (Phím E)">📥 Anki</button>
          <button class="jp-icon-btn jp-audio-btn" id="jp-audio-btn" title="Phát âm tiếng Nhật">
            <svg viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </button>
          <button class="jp-icon-btn jp-star-btn" id="jp-star-btn" title="Lưu vào Sổ tay từ vựng">⭐</button>
          <button class="jp-icon-btn jp-copy-btn" id="jp-copy-btn" title="Sao chép từ">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
          <button class="jp-icon-btn jp-lookup-btn" id="jp-lookup-btn" title="Tra cứu từ điển chi tiết (Mazii)">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button class="jp-icon-btn" id="jp-pin-btn" title="Ghim popup cố định">📌</button>
          <button class="jp-icon-btn" id="jp-close-btn" title="Đóng">✕</button>
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
          <span class="jp-footer-title">🇯🇵 Phím tắt:</span>
          <span class="jp-kbd" title="Phát âm từ đang hover">S</span> Nghe
          <span class="jp-kbd" title="Thêm vào Anki (1-click)">E</span> Anki
          <span class="jp-kbd" title="Tra cứu nhanh">Alt+S</span> Tra từ
        </div>
        <div class="jp-shortcut-hint" title="Bật / Tắt tiện ích">
          <span class="jp-kbd">Alt+J</span>
          <span>Bật/Tắt</span>
        </div>
      </div>
    `;

    shadowRoot.appendChild(cardElem);

    // 3. Tạo Floating Selection Badge & Sentence Card
    selectionBadge = document.createElement('div');
    selectionBadge.className = 'jp-selection-badge';
    selectionBadge.innerHTML = `<span>🇯🇵</span><span>Dịch câu</span>`;
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
          <button class="jp-stroke-btn" id="jp-stroke-play-btn">▶️ Phát lại nét</button>
          <button class="jp-stroke-btn" id="jp-stroke-toggle-numbers">🔢 Bật/Tắt số nét</button>
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
          kanjiStrokeAnimator.renderAnimatedSvg(canvasBox, rawSvg, { showNumbers: showStrokeNumbers });
          kanjiStrokeAnimator.startAnimation(canvasBox);
        }
      }
    });

    // Bắt sự kiện click nút dịch câu bôi đen
    selectionBadge.addEventListener('mousedown', (e) => {
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

    // Nút Lưu từ vựng vào Sổ tay (Bookmark Star ⭐)
    const starBtn = cardElem.querySelector('#jp-star-btn');
    starBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const targetWord = currentWord;
      if (!targetWord) return;

      getStorageData(['jpSavedWords'], (res) => {
        let list = res && Array.isArray(res.jpSavedWords) ? res.jpSavedWords : [];
        const idx = list.findIndex(item => item.word === targetWord);

        if (idx >= 0) {
          list.splice(idx, 1);
          savedWordsSet.delete(targetWord);
          starBtn.classList.remove('active');
          starBtn.title = 'Lưu vào Sổ tay từ vựng (⭐)';
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
          starBtn.classList.add('active');
          starBtn.title = 'Bỏ lưu khỏi Sổ tay từ vựng';
          showToast(`⭐ Đã lưu [${targetWord}] vào Sổ tay!`);
        }

        setStorageData({ jpSavedWords: list });
      });
    });

    // Nút Sao chép (Quick Copy 📋)
    const copyBtn = cardElem.querySelector('#jp-copy-btn');
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();

      const copyWord = currentWord;
      if (!copyWord) return;

      // Chỉ sao chép nội dung từ vựng đang chọn / hover (không copy nghĩa)
      const copyStr = copyWord;

      const notifySuccess = () => {
        copyBtn.classList.add('copied');
        showToast(`📋 Đã sao chép: ${copyWord}`);
        setTimeout(() => copyBtn.classList.remove('copied'), 1500);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyStr).then(notifySuccess).catch(() => {
          fallbackCopyText(copyStr, notifySuccess);
        });
      } else {
        fallbackCopyText(copyStr, notifySuccess);
      }
    });

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

    // Nút Kính lúp tra cứu từ điển trực tuyến (Mazii)
    const lookupBtn = cardElem.querySelector('#jp-lookup-btn');
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

    // Nút Ghim cố định (Pin)
    const pinBtn = cardElem.querySelector('#jp-pin-btn');
    pinBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      isPinned = !isPinned;
      if (isPinned) {
        pinBtn.classList.add('active');
        cardElem.classList.add('pinned');
        pinBtn.title = 'Bỏ ghim popup';
      } else {
        pinBtn.classList.remove('active');
        cardElem.classList.remove('pinned');
        pinBtn.title = 'Ghim popup cố định';
      }
    });

    // Nút Đóng
    const closeBtn = cardElem.querySelector('#jp-close-btn');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      isPinned = false;
      pinBtn.classList.remove('active');
      cardElem.classList.remove('pinned');
      hideTooltip(true);
    });

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
    if (!cardElem || !shadowRoot) {
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

    // 1. Cập nhật từ chính & cách đọc
    wordElem.textContent = targetWord;
    
    // Đảm bảo phiên âm Hiragana luôn luôn hiển thị trên Tooltip (cho cả Kanji, Katakana và Hiragana)
    const hiraReading = typeof katakanaToHiragana === 'function' ? katakanaToHiragana(data.reading || '') : (data.reading || '');
    if (settings.showReading !== false && (hiraReading || data.reading)) {
      readingElem.textContent = hiraReading || data.reading;
      readingElem.style.display = 'inline';
    } else {
      readingElem.style.display = 'none';
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
      updateVisualHighlight(wordRange);
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
            currentReading = hiraOnline;
            readingElem.textContent = hiraOnline;
            readingElem.style.display = 'inline';
            if (currentWordData) {
              currentWordData.reading = hiraOnline;
              currentWordData.speechText = hiraOnline;
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

  // 4. Hiển thị Card dịch câu khi bôi đen (Selection Translate)
  async function showSentenceTranslation(text, mouseX, mouseY) {
    if (!settings.enabled || settings.enableSelectionTranslate === false) {
      hideSentenceCard();
      hideSelectionBadge();
      return;
    }
    if (!sentenceCard) return;

    hideSelectionBadge();

    sentenceCard.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;">
        <div style="display:flex;align-items:center;gap:6px;">
          <span style="font-weight:bold;color:#38bdf8;font-size:13px;">📑 Dịch câu</span>
          <span class="jp-api-badge" id="jp-sentence-api-badge">Đang gọi API ngoài...</span>
        </div>
        <div style="display:flex;gap:6px;">
          <button class="jp-icon-btn jp-sentence-copy-btn" id="jp-sentence-copy" title="Sao chép nội dung câu đang chọn">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
          <button class="jp-icon-btn jp-sentence-audio-btn" id="jp-sentence-audio" title="Nghe câu">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
          </button>
          <button class="jp-icon-btn" id="jp-sentence-close" title="Đóng">✕</button>
        </div>
      </div>
      <div id="jp-sentence-source-text" style="font-size:15px;font-weight:bold;color:#ffffff;line-height:1.4;margin-top:4px;"></div>
      <div id="jp-sentence-meaning" style="font-size:13.5px;color:#e2e8f0;background:rgba(255,255,255,0.06);padding:10px 12px;border-radius:8px;line-height:1.45;border-left:3px solid #38bdf8;">
        Đang dịch câu qua API ngoài...
      </div>
    `;

    const sourceElem = sentenceCard.querySelector('#jp-sentence-source-text');
    if (sourceElem) {
      sourceElem.textContent = text;
    }

    // Định vị sentence card
    const cardWidth = 360;
    let left = Math.min(mouseX + 10, window.innerWidth - cardWidth - 20);
    let top = Math.min(mouseY + 15, window.innerHeight - 200);
    sentenceCard.style.left = `${Math.max(16, left)}px`;
    sentenceCard.style.top = `${Math.max(16, top)}px`;
    sentenceCard.classList.add('visible');

    // Nút copy câu đang chọn
    const copySentenceBtn = sentenceCard.querySelector('#jp-sentence-copy');
    copySentenceBtn.addEventListener('click', () => {
      const onSuccess = () => {
        copySentenceBtn.classList.add('copied');
        showToast('📋 Đã sao chép nội dung');
        setTimeout(() => copySentenceBtn.classList.remove('copied'), 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(() => fallbackCopyText(text, onSuccess));
      } else {
        fallbackCopyText(text, onSuccess);
      }
    });

    // Nút audio và close
    const audioBtn = sentenceCard.querySelector('#jp-sentence-audio');
    audioBtn.addEventListener('click', () => {
      japaneseEngine.speak(
        text,
        {
          rate: settings.speechRate || 0.95,
          pitch: settings.speechPitch || 1.0,
          voiceUri: settings.voiceUri || ''
        },
        () => audioBtn.classList.add('playing'),
        () => audioBtn.classList.remove('playing')
      );
    });

    sentenceCard.querySelector('#jp-sentence-close').addEventListener('click', () => {
      hideSentenceCard();
    });

    // Gọi API dịch câu bên ngoài (Google Translate API hoặc Gemini AI API)
    try {
      const res = await japaneseEngine.translateSentence(text, {
        engine: settings.translationEngine || 'google',
        apiKey: settings.geminiApiKey || ''
      });
      if (res && res.meaning) {
        const mElem = sentenceCard.querySelector('#jp-sentence-meaning');
        const bElem = sentenceCard.querySelector('#jp-sentence-api-badge');
        if (mElem) {
          mElem.textContent = res.meaning;
        }
        if (bElem && res.provider) {
          bElem.textContent = res.provider;
          if (res.provider.includes('Gemini')) {
            bElem.classList.add('ai');
          } else {
            bElem.classList.remove('ai');
          }
        }
      }
    } catch (_) {}
  }

  function hideSentenceCard() {
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
    selectionBadge.style.left = `${Math.min(x, window.innerWidth - 120)}px`;
    selectionBadge.style.top = `${Math.min(y, window.innerHeight - 40)}px`;
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
  }

  // 5. Vẽ lớp Visual Highlight dạ quang bao quanh từ trên trang web
  function updateVisualHighlight(range) {
    if (!highlightOverlay || !range) return;
    try {
      const rect = range.getBoundingClientRect();
      if (rect && rect.width > 0 && rect.height > 0) {
        highlightOverlay.style.left = `${rect.left - 2}px`;
        highlightOverlay.style.top = `${rect.top - 1}px`;
        highlightOverlay.style.width = `${rect.width + 4}px`;
        highlightOverlay.style.height = `${rect.height + 2}px`;
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
  function handleMouseDown(e) {
    const path = e.composedPath ? e.composedPath() : [];
    const insideCard = path.some(el => el === cardElem || el === sentenceCard || el === selectionBadge);
    if (insideCard) {
      cancelHideSchedule();
      return;
    }

    // Click ra ngoài sentence card & selection badge → đóng ngay
    if (sentenceCard && sentenceCard.classList.contains('visible')) {
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
    if (!settings.enabled || settings.enableSelectionTranslate === false) {
      hideSelectionBadge();
      return;
    }

    setTimeout(() => {
      if (!settings.enabled || settings.enableSelectionTranslate === false) {
        hideSelectionBadge();
        return;
      }

      const sel = window.getSelection();
      const text = sel ? sel.toString().trim() : '';

      if (text.length >= 2 && isJapaneseText(text)) {
        currentSelectedText = text;
        try {
          const range = sel.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          if (rect && rect.width > 0) {
            showSelectionBadge(rect.right + 6, rect.bottom + 4);
            return;
          }
        } catch (_) {}
      }
      hideSelectionBadge();
    }, 60);
  }

  function isStrokeModalOpen() {
    if (strokeModalOverlay && strokeModalOverlay.classList.contains('active')) return true;
    const qs = document.getElementById('jp-quick-search-root');
    if (qs && qs.style.display !== 'none' && qs.style.pointerEvents !== 'none') return true;
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
      scheduleHide(150);
      return;
    }
    if (settings.activationMode === 'alt' && !e.altKey) {
      scheduleHide(150);
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
      scheduleHide(150);
      return;
    }

    const text = textNode.nodeValue;
    if (!text) {
      scheduleHide(150);
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
            scheduleHide(150);
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
        if (wordRange) updateVisualHighlight(wordRange);
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

    scheduleHide(150);
  }

  function handleDocumentClick(e) {
    const path = e.composedPath ? e.composedPath() : [];
    if (path.some(el => el === cardElem || el === sentenceCard || el === selectionBadge)) {
      cancelHideSchedule();
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
          kanjiStrokeAnimator.startAnimation(canvasBox);
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

  // 11. Phím tắt toàn cục: Alt+J, Alt+R/Alt+F, Alt+S, E (Anki), S (Audio)
  function handleKeyDown(e) {
    const isTyping = ['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable;

    // Esc để đóng Stroke Modal
    if (e.key === 'Escape') {
      if (strokeModalOverlay && strokeModalOverlay.classList.contains('active')) {
        closeStrokeModal();
        return;
      }
    }

    // Phím 'E' để thêm vào Anki khi có từ đang chọn / hover
    if ((e.key === 'e' || e.key === 'E') && !e.ctrlKey && !e.altKey && !e.metaKey && !isTyping) {
      if (currentWord) {
        e.preventDefault();
        e.stopPropagation();
        syncCurrentWordToAnki();
        return;
      }
    }

    // Phím 'S' để phát âm khi có từ đang chọn / hover
    if ((e.key === 's' || e.key === 'S') && !e.ctrlKey && !e.altKey && !e.metaKey && !isTyping) {
      if (currentWord) {
        e.preventDefault();
        e.stopPropagation();
        const speakText = getActiveSpeakText();
        if (speakText && typeof japaneseEngine !== 'undefined') {
          japaneseEngine.speak(speakText, {
            rate: settings.speechRate || 0.95,
            pitch: settings.speechPitch || 1.0,
            voiceUri: settings.voiceUri || ''
          });
        }
        return;
      }
    }

    // Alt + S / Ctrl + Shift + F: Mở thanh tra cứu nhanh
    if ((e.altKey && (e.key === 's' || e.key === 'S')) || 
        (e.ctrlKey && e.shiftKey && (e.key === 'f' || e.key === 'F'))) {
      const palette = window.quickSearchPalette || (typeof quickSearchPalette !== 'undefined' ? quickSearchPalette : null);
      if (palette) {
        e.preventDefault();
        e.stopPropagation();
        palette.toggle();
        return;
      }
    }

    // Alt + J: Bật/Tắt Extension
    if (e.altKey && (e.key === 'j' || e.key === 'J' || e.code === 'KeyJ')) {
      e.preventDefault();
      e.stopPropagation();
      settings.enabled = !settings.enabled;
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ jpSettings: settings });
      }
      if (!settings.enabled) {
        hideAllPopups(true);
      }
      showToast(settings.enabled ? '🟢 Đã BẬT phiên âm tiếng Nhật (Alt+J)' : '⚪ Đã TẮT phiên âm tiếng Nhật (Alt+J)');
      return;
    }
  }

  function showToast(msg) {
    let toast = document.getElementById('jp-quick-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'jp-quick-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #0f172a;
        color: #38bdf8;
        border: 1px solid #38bdf8;
        padding: 10px 18px;
        border-radius: 10px;
        font-family: sans-serif;
        font-size: 13px;
        font-weight: bold;
        z-index: 2147483647;
        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.25s ease;
        pointer-events: none;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 1800);
  }

  // Lắng nghe tin nhắn từ Extension Background / Popup
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg.action === 'SET_STATE' || msg.action === 'TOGGLE_HOVER') {
        const nextEnabled = typeof msg.enabled === 'boolean' ? msg.enabled : !settings.enabled;
        settings.enabled = nextEnabled;
        if (!settings.enabled) hideAllPopups(true);
        showToast(settings.enabled ? '🟢 Đã BẬT phiên âm tiếng Nhật (Alt+J)' : '⚪ Đã TẮT phiên âm tiếng Nhật (Alt+J)');
        sendResponse({ enabled: settings.enabled });
      } else if (msg.action === 'GET_STATUS') {
        sendResponse({ enabled: settings.enabled });
      } else if (msg.action === 'TOGGLE_QUICK_SEARCH') {
        if (typeof quickSearchPalette !== 'undefined') {
          quickSearchPalette.toggle();
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
  min-width: 270px;
  max-width: 400px;
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
  gap: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 8px;
}

.jp-word-box {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  flex: 1 1 0;
  user-select: text !important;
  -webkit-user-select: text !important;
}

.jp-reading-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.jp-reading {
  font-size: 14px;
  font-weight: 700;
  color: #38bdf8; /* Xanh Cyan sáng */
  letter-spacing: 0.5px;
  white-space: nowrap;
  flex-shrink: 0;
  user-select: text !important;
  -webkit-user-select: text !important;
  cursor: text;
}

.jp-pitch-badge {
  background: rgba(236, 72, 153, 0.2);
  color: #f472b6;
  border: 1px solid rgba(236, 72, 153, 0.4);
  font-size: 10px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
}

.jp-main-word {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  gap: 8px;
  font-size: 10px;
  color: #94a3b8;
  padding-top: 6px;
  border-top: 1px dashed rgba(255, 255, 255, 0.08);
  user-select: none;
  -webkit-user-select: none;
  flex-wrap: wrap;
}

.jp-footer-left {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
}

.jp-footer-title {
  color: #cbd5e1;
  font-weight: 600;
}

.jp-shortcut-hint {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.jp-kbd {
  background: rgba(255, 255, 255, 0.1);
  padding: 1px 5px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-size: 9.5px;
  font-weight: 600;
  color: #e2e8f0;
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
  pointer-events: auto;
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
  opacity: 1;
  transform: translateY(0);
}

.jp-selection-badge:hover {
  background: #38bdf8;
  color: #0f172a;
  transform: translateY(-2px) scale(1.05);
}

/* Thẻ kết quả dịch câu khi bôi đen */
.jp-sentence-card {
  position: fixed;
  z-index: 2147483647;
  pointer-events: auto;
  max-width: 440px;
  min-width: 280px;
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(56, 189, 248, 0.35);
  box-shadow: 0 24px 50px -5px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(56, 189, 248, 0.2);
  border-radius: 14px;
  padding: 14px 16px;
  color: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(6px) scale(0.97);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.jp-sentence-card.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
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
  gap: 10px;
}

.jp-stroke-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f1f5f9;
  padding: 7px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s ease;
}

.jp-stroke-btn:hover {
  background: #38bdf8;
  color: #0f172a;
  border-color: #38bdf8;
}

.jp-stroke-info {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 12px;
  font-size: 13px;
  line-height: 1.6;
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

/* ==========================================================================
   CSS CHO THANH TRA CỨU NHANH (QUICK SEARCH PALETTE: ALT+S)
   ========================================================================== */
#jp-quick-search-root {
  position: fixed;
  inset: 0;
  z-index: 2147483646;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", sans-serif;
}

.jp-qs-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10vh;
}

.jp-qs-modal {
  width: 90%;
  max-width: 640px;
  max-height: 80vh;
  background: #0f172a;
  border: 1px solid rgba(56, 189, 248, 0.35);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(56, 189, 248, 0.25);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: qsFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes qsFadeIn {
  from { opacity: 0; transform: translateY(-12px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.jp-qs-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.jp-qs-icon {
  font-size: 20px;
}

.jp-qs-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 17px;
  color: #f8fafc;
  font-weight: 500;
}

.jp-qs-input::placeholder {
  color: #64748b;
  font-size: 15px;
}

.jp-qs-close {
  background: rgba(255, 255, 255, 0.08);
  border: none;
  color: #94a3b8;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.jp-qs-close:hover {
  background: #ef4444;
  color: #ffffff;
}

.jp-qs-tags {
  display: flex;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  overflow-x: auto;
}

.jp-qs-tag {
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.25);
  color: #38bdf8;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}

.jp-qs-tag:hover {
  background: #38bdf8;
  color: #0f172a;
}

.jp-qs-results {
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.jp-qs-empty {
  text-align: center;
  padding: 40px 20px;
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.6;
}

.jp-qs-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  transition: all 0.15s ease;
}

.jp-qs-card:hover {
  background: rgba(56, 189, 248, 0.08);
  border-color: rgba(56, 189, 248, 0.35);
  transform: translateX(3px);
}

.jp-qs-card-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.jp-qs-word-title {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.jp-qs-vocab {
  font-size: 20px;
  font-weight: 700;
  color: #f8fafc;
}

.jp-qs-reading {
  font-size: 15px;
  color: #38bdf8;
  font-weight: 600;
}

.jp-qs-romaji {
  font-size: 13px;
  color: #94a3b8;
  font-style: italic;
}

.jp-qs-meaning {
  font-size: 14px;
  color: #e2e8f0;
}

.jp-qs-type-badge {
  font-size: 11px;
  color: #a78bfa;
}

.jp-qs-actions {
  display: flex;
  gap: 6px;
}

.jp-qs-action-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f1f5f9;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.jp-qs-action-btn:hover {
  background: #38bdf8;
  color: #0f172a;
  border-color: #38bdf8;
}

.jp-qs-footer {
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #64748b;
}

.jp-qs-footer kbd {
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  color: #94a3b8;
}
`;
  }

  // Khởi động
  initShadowDOM();
  document.addEventListener('mousedown', handleMouseDown, true);
  document.addEventListener('mouseup', handleMouseUp, true);
  document.addEventListener('mousemove', handleMouseMove, true);
  document.addEventListener('click', handleDocumentClick, true);
  document.addEventListener('keydown', handleKeyDown, true);
})();
