/**
 * Quick Floating Search Palette (Command Palette: Alt+S)
 * Thanh tra cứu nhanh tiếng Nhật nổi trên mọi trang web
 * Hỗ trợ tìm kiếm thời gian thực theo Kanji, Hiragana, Romaji, Hán-Việt và Nghĩa tiếng Việt
 * Tự động nhận diện câu và gọi API dịch trực tuyến (Google Translate / Gemini AI)
 * Tự động tra cứu trực tuyến khi từ điển nội bộ không có từ cần tìm
 * Hỗ trợ tra cứu ngược (Việt ➔ Nhật) và tra cứu xuôi (Nhật ➔ Việt)
 * Sử dụng Shadow DOM độc lập 100% để tránh xung đột CSS với mọi trang web
 */

class QuickSearchPalette {
  constructor() {
    this.isOpen = false;
    this.currentMode = 'auto'; // 'auto' | 'vi-ja' | 'ja-vi' | 'online'
    this.activeOnlineAbort = null;
    this.container = null;
    this.shadow = null;
    this.input = null;
    this.tagsContainer = null;
    this.modeBtns = null;
    this.resultsContainer = null;
    this.debounceTimer = null;
    this.lastActiveElement = null;
    this._lastToggleTime = 0;
    this._enabled = true;

    // Đồng bộ trạng thái bật/tắt tiện ích từ bộ nhớ Chrome
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['jpSettings'], (res) => {
        if (res && res.jpSettings && typeof res.jpSettings.enabled === 'boolean') {
          this._enabled = res.jpSettings.enabled;
        }
      });

      if (chrome.storage.onChanged) {
        chrome.storage.onChanged.addListener((changes, area) => {
          if (area === 'local' && changes.jpSettings && changes.jpSettings.newValue) {
            const next = changes.jpSettings.newValue.enabled !== false;
            this.setEnabled(next);
          }
        });
      }
    }

    this.initKeyListeners();
  }

  /**
   * Kiểm tra xem tiện ích có đang BẬT hay không
   */
  isEnabled() {
    if (typeof window !== 'undefined') {
      if (typeof window.__JP_EXTENSION_ENABLED__ === 'boolean') {
        return window.__JP_EXTENSION_ENABLED__;
      }
      if (window.__JP_SETTINGS__ && typeof window.__JP_SETTINGS__.enabled === 'boolean') {
        return window.__JP_SETTINGS__.enabled;
      }
    }
    return this._enabled !== false;
  }

  /**
   * Cập nhật trạng thái bật/tắt trực tiếp
   */
  setEnabled(enabled) {
    this._enabled = !!enabled;
    if (!this._enabled && this.isOpen) {
      this.close();
    }
  }

  /**
   * Thoát ký tự HTML an toàn tuyệt đối chống XSS và tuân thủ Manifest V3
   */
  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Nhận diện văn bản nhập vào có phải là câu hoàn chỉnh hay không
   */
  isSentence(text) {
    if (!text || typeof text !== 'string') return false;
    const clean = text.trim();
    if (clean.length >= 18) return true;
    if (/[。！？!?\n]/.test(clean)) return true;
    const words = clean.split(/\s+/);
    if (words.length >= 4) return true;
    return false;
  }

  /**
   * Đảm bảo DOM đã được tạo và gắn an toàn vào trang qua Shadow DOM
   */
  ensureDOM() {
    if (this.container && document.contains(this.container) && this.shadow) return true;

    const parent = document.body || document.documentElement;
    if (!parent) return false;

    // Dọn dẹp root cũ nếu có phiên bản trước tồn tại để tránh xung đột DOM
    const oldRoot = document.getElementById('jp-quick-search-root');
    if (oldRoot && oldRoot !== this.container) {
      oldRoot.remove();
    }

    let root = document.createElement('div');
    root.id = 'jp-quick-search-root';
    root.setAttribute('hidden', '');
    root.style.setProperty('position', 'fixed', 'important');
    root.style.setProperty('inset', '0', 'important');
    root.style.setProperty('z-index', '2147483646', 'important');
    root.style.setProperty('display', 'none', 'important');
    root.style.setProperty('pointer-events', 'none', 'important');
    parent.appendChild(root);

    let shadow = root.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        ${this.getStyles()}
      </style>
      <div class="jp-qs-backdrop">
        <div class="jp-qs-modal" role="dialog" aria-modal="true">
          <!-- Ô tìm kiếm chính (Spotlight Header) -->
          <div class="jp-qs-header">
            <span class="jp-qs-icon" id="jp-qs-header-icon">🔍</span>
            <input type="text" class="jp-qs-input" placeholder="Nhập từ vựng, Romaji hoặc tiếng Việt (Esc để đóng)..." autofocus autocomplete="off" spellcheck="false" />
            <button class="jp-qs-close" title="Đóng (Esc)">✕</button>
          </div>

          <!-- Thanh công cụ: Chuyển đổi hướng tra cứu -->
          <div class="jp-qs-toolbar">
            <div class="jp-qs-mode-bar">
              <button type="button" class="jp-qs-mode-btn active" data-mode="auto" title="Tự động nhận diện">⚡ Tự động</button>
              <button type="button" class="jp-qs-mode-btn" data-mode="vi-ja" title="Gõ tiếng Việt tìm tiếng Nhật">Việt ➔ Nhật</button>
              <button type="button" class="jp-qs-mode-btn" data-mode="ja-vi" title="Gõ tiếng Nhật tìm tiếng Việt">Nhật ➔ Việt</button>
              <button type="button" class="jp-qs-mode-btn" data-mode="online" title="Dịch trực tuyến câu hoặc từ vựng qua Google Translate">🌐 Dịch trực tuyến</button>
            </div>
          </div>

          <!-- Khu vực hiển thị kết quả tìm kiếm -->
          <div class="jp-qs-results">
            <div class="jp-qs-empty">
              <div style="font-size:32px;margin-bottom:8px;">🔍</div>
              Gõ từ vựng tiếng Nhật hoặc tiếng Việt để tra cứu tức thì...
            </div>
          </div>

          <!-- Chân thanh công cụ hướng dẫn phím tắt -->
          <div class="jp-qs-footer">
            <span><kbd>Alt+S</kbd> Mở thanh tra</span>
            <span><kbd>Esc</kbd> Đóng</span>
            <span><kbd>Enter</kbd> Nghe phát âm từ đầu tiên</span>
          </div>
        </div>
      </div>
    `;

    this.container = root;
    this.shadow = shadow;
    this.input = shadow.querySelector('.jp-qs-input');
    this.modeBtns = shadow.querySelectorAll('.jp-qs-mode-btn');
    this.resultsContainer = shadow.querySelector('.jp-qs-results');

    // Sự kiện chuyển đổi hướng tra cứu (Mode buttons)
    this.modeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const mode = btn.getAttribute('data-mode');
        this.setMode(mode);
      });
    });

    // Sự kiện nút đóng
    const closeBtn = shadow.querySelector('.jp-qs-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.close();
      });
    }

    const backdrop = shadow.querySelector('.jp-qs-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          e.preventDefault();
          e.stopPropagation();
          this.close();
        }
      });
    }

    // Bắt phím Escape bên trong Shadow DOM
    shadow.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        this.close();
      }
    });

    // Gõ tìm kiếm thời gian thực với Debounce
    this.input.addEventListener('input', () => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.performSearch(this.input.value.trim());
      }, 150);
    });

    // Phím trong ô tìm kiếm: Escape để đóng, Enter để phát âm từ đầu tiên
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        this.close();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const firstCard = this.resultsContainer.querySelector('.jp-qs-card');
        if (firstCard) {
          const speakBtn = firstCard.querySelector('.btn-speak');
          if (speakBtn) speakBtn.click();
        }
      }
    });

    return true;
  }

  /**
   * Chuyển đổi hướng tra cứu (Tự động / Việt-Nhật / Nhật-Việt)
   */
  setMode(mode) {
    if (this.currentMode === mode) return;
    this.currentMode = mode;
    if (this.modeBtns) {
      this.modeBtns.forEach(btn => {
        if (btn.getAttribute('data-mode') === mode) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    if (this.input) {
      if (mode === 'vi-ja') {
        this.input.placeholder = 'Gõ từ tiếng Việt để tìm tiếng Nhật tương ứng...';
      } else if (mode === 'ja-vi') {
        this.input.placeholder = 'Nhập từ tiếng Nhật (Kanji, Kana hoặc Romaji)...';
      } else if (mode === 'online') {
        this.input.placeholder = 'Dịch trực tuyến câu hoặc từ ngữ qua Google Translate...';
      } else {
        this.input.placeholder = 'Nhập từ vựng, Romaji hoặc tiếng Việt (Esc để đóng)...';
      }
      this.input.focus();
    }

    if (this.input && this.input.value.trim()) {
      this.performSearch(this.input.value.trim());
    } else {
      this.renderInitialEmptyState();
    }
  }

  /**
   * Hiển thị trạng thái rỗng ban đầu phù hợp với chế độ
   */
  renderInitialEmptyState() {
    if (!this.resultsContainer) return;
    let hint = 'Gõ từ vựng tiếng Nhật, Romaji hoặc tiếng Việt để tra cứu tức thì...';
    if (this.currentMode === 'vi-ja') {
      hint = 'Gõ từ tiếng Việt để tìm từ tiếng Nhật tương ứng...';
    } else if (this.currentMode === 'ja-vi') {
      hint = 'Gõ từ tiếng Nhật (Kanji, Kana, Romaji) để tra nghĩa...';
    } else if (this.currentMode === 'online') {
      hint = 'Nhập câu hoặc văn bản bất kỳ để dịch trực tuyến qua Google Translate...';
    }

    this.resultsContainer.innerHTML = `
      <div class="jp-qs-empty">
        <div style="font-size:32px;margin-bottom:8px;">🔍</div>
        ${this.escapeHtml(hint)}
      </div>
    `;
  }

  /**
   * Bắt phím tắt mở Palette (Alt + S hoặc Ctrl + Shift + F) & phím Escape
   */
  initKeyListeners() {
    window.addEventListener('keydown', (e) => {
      if ((e.altKey && (e.key === 's' || e.key === 'S')) || 
          (e.ctrlKey && e.shiftKey && (e.key === 'f' || e.key === 'F'))) {
        // NẾU EXTENSION ĐÃ TẮT -> KHÔNG MỞ POPUP SEARCH VÀ ĐỂ HỆ THỐNG / TRANG WEB XỬ LÝ TỰ NHIÊN
        if (!this.isEnabled()) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      } else if (e.key === 'Escape') {
        if (this.isOpen) {
          e.preventDefault();
          e.stopPropagation();
          this.close();
        }
      }
    }, true);
  }

  /**
   * Mở hoặc đóng Palette (có debounce chống nhảy double-toggle)
   */
  toggle() {
    if (this.isOpen) {
      this.close();
      return;
    }

    // Nếu Extension đang TẮT thì không mở
    if (!this.isEnabled()) {
      return;
    }

    const now = Date.now();
    if (this._lastToggleTime && now - this._lastToggleTime < 280) {
      return;
    }
    this._lastToggleTime = now;
    this.open();
  }

  /**
   * Đặt focus chắc chắn vào ô input tìm kiếm (thử nhiều frame để đảm bảo)
   */
  focusSearchInput() {
    if (!this.input) return;
    const doFocus = () => {
      if (this.isOpen && this.input) {
        try {
          this.input.focus();
          this.input.select();
        } catch (_) {}
      }
    };

    doFocus();
    requestAnimationFrame(doFocus);
    setTimeout(doFocus, 40);
    setTimeout(doFocus, 120);
  }

  open() {
    if (!this.isEnabled()) return;
    if (!this.ensureDOM()) return;

    // 1. Lưu lại phần tử input/textarea/contentEditable đang focus trước khi mở
    const active = document.activeElement;
    if (active && active !== document.body && active !== document.documentElement) {
      const isInput = active.tagName === 'INPUT' || 
                      active.tagName === 'TEXTAREA' || 
                      active.isContentEditable || 
                      active.getAttribute('contenteditable') === 'true' ||
                      active.getAttribute('role') === 'textbox';
      if (isInput) {
        this.lastActiveElement = active;
      } else {
        this.lastActiveElement = null;
      }
    } else {
      this.lastActiveElement = null;
    }

    // 2. Hiển thị modal qua cả style inline lẫn thuộc tính hidden
    this.container.removeAttribute('hidden');
    this.container.style.setProperty('display', 'block', 'important');
    this.container.style.setProperty('pointer-events', 'auto', 'important');
    this.isOpen = true;

    // 3. Tự động focus vào ô tìm kiếm
    this.focusSearchInput();
  }

  close() {
    if (this.container) {
      this.container.setAttribute('hidden', '');
      this.container.style.setProperty('display', 'none', 'important');
      this.container.style.setProperty('pointer-events', 'none', 'important');
    }
    this.isOpen = false;

    // Khôi phục focus về phần tử input cũ trước đó (nếu trước đó đang gõ vào input)
    const prevEl = this.lastActiveElement;
    this.lastActiveElement = null;
    if (prevEl && typeof prevEl.focus === 'function' && document.contains(prevEl)) {
      try {
        setTimeout(() => {
          prevEl.focus({ preventScroll: true });
        }, 20);
      } catch (_) {}
    }
  }

  /**
   * Thực hiện tra cứu thời gian thực
   */
  performSearch(query) {
    if (!query) {
      this.renderInitialEmptyState();
      return;
    }

    const cleanQuery = query.trim();
    if (!cleanQuery) {
      this.renderInitialEmptyState();
      return;
    }

    // Hủy request trực tuyến đang chạy trước đó nếu có
    if (this.activeOnlineAbort) {
      this.activeOnlineAbort.abort();
      this.activeOnlineAbort = null;
    }

    // Chế độ dịch trực tuyến chuyên dụng
    if (this.currentMode === 'online') {
      this.performOnlineSearch(cleanQuery);
      return;
    }

    const isViDetected = typeof isVietnameseQuery === 'function' 
      ? isVietnameseQuery(cleanQuery) 
      : /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(cleanQuery);
    
    const isReverse = this.currentMode === 'vi-ja' || (this.currentMode === 'auto' && isViDetected);

    if (isReverse) {
      this.performReverseSearch(cleanQuery);
    } else {
      this.performStandardSearch(cleanQuery);
    }
  }

  /**
   * Chế độ dịch trực tuyến trực tiếp qua Google Translate
   */
  performOnlineSearch(query) {
    const isVi = typeof isVietnameseQuery === 'function' 
      ? isVietnameseQuery(query) 
      : /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(query);

    this.resultsContainer.innerHTML = `
      <div class="jp-qs-online-slot" id="jp-qs-online-slot">
        <div class="jp-qs-loading-card">
          <span style="font-size:18px;">🌐</span>
          <span>Đang dịch trực tuyến "${this.escapeHtml(query)}" qua Google Translate...</span>
        </div>
      </div>
    `;

    if (this.isSentence(query)) {
      this.fetchOnlineSentence(query, isVi ? 'vi-ja' : 'ja-vi');
    } else if (isVi) {
      this.fetchOnlineReverse(query);
    } else {
      this.fetchOnlineStandardWord(query);
    }
  }

  /**
   * Gọi API Google Translate thông qua Background Service Worker hoặc Engine để vượt CSP trên ChatGPT/YouTube
   */
  async requestTranslation(text, sl = 'ja', tl = 'vi', signal = null) {
    const engine = window.japaneseEngine || (typeof japaneseEngine !== 'undefined' ? japaneseEngine : null);
    if (engine && engine.callGoogleTranslateAPI) {
      return await engine.callGoogleTranslateAPI(text, sl, tl, signal);
    }
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      try {
        const bgRes = await new Promise((resolve) => {
          chrome.runtime.sendMessage({ action: 'GOOGLE_TRANSLATE_API', text, sl, tl }, (response) => {
            if (chrome.runtime.lastError || !response || !response.success) resolve(null);
            else resolve(response.data);
          });
        });
        if (bgRes) return bgRes;
      } catch (_) {}
    }
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(tl)}&dt=t&dt=bd&dt=rm&q=${encodeURIComponent(text)}`;
      const res = await fetch(url, { signal });
      if (res && res.ok) return await res.json();
    } catch (_) {}
    return null;
  }

  /**
   * Tra cứu ngược: Tiếng Việt ➔ Tiếng Nhật
   * Tự động nhận diện câu hoặc từ đơn. Chỉ gọi API online khi từ điển không có kết quả.
   */
  performReverseSearch(query) {
    const isSent = this.isSentence(query);
    const revData = (!isSent && typeof lookupVietnameseToJapanese === 'function')
      ? lookupVietnameseToJapanese(query, 35)
      : { words: [] };

    let html = '';

    if (isSent) {
      html += `
        <div class="jp-qs-online-slot" id="jp-qs-online-slot">
          <div class="jp-qs-loading-card">
            <span style="font-size:18px;">🌐</span>
            <span>Đang dịch câu tiếng Việt sang tiếng Nhật qua Google Translate...</span>
          </div>
        </div>
      `;
      this.resultsContainer.innerHTML = html;
      this.fetchOnlineSentence(query, 'vi-ja');
      return;
    }

    // Danh sách từ vựng tiếng Nhật tương ứng từ từ điển nội bộ
    if (revData.words && revData.words.length > 0) {
      html += `<div class="jp-qs-section-title">📚 Từ vựng tiếng Nhật tương ứng (${revData.words.length})</div>`;
      revData.words.forEach(item => {
        const romaji = typeof toRomaji === 'function' ? toRomaji(item.r || '') : '';
        const showReading = item.r && item.r !== item.word;
        html += `
          <div class="jp-qs-card" data-word="${this.escapeHtml(item.word)}" data-reading="${this.escapeHtml(item.r || '')}" data-meaning="${this.escapeHtml(item.m || '')}" title="Bấm vào thẻ để sao chép từ">
            <div class="jp-qs-card-left">
              <div class="jp-qs-word-title">
                <span class="jp-qs-vocab">${this.escapeHtml(item.word)}</span>
                ${showReading ? `<span class="jp-qs-reading">${this.escapeHtml(item.r)}</span>` : ''}
                ${romaji ? `<span class="jp-qs-romaji">${this.escapeHtml(romaji)}</span>` : ''}
              </div>
              <div class="jp-qs-meaning">💡 ${this.escapeHtml(item.m || '')}</div>
              ${item.t ? `<div class="jp-qs-type-badge">${this.escapeHtml(item.t)}</div>` : ''}
            </div>
            <div class="jp-qs-actions">
              <button class="jp-qs-action-btn btn-speak" title="Phát âm tiếng Nhật">🔊</button>
              <button class="jp-qs-action-btn btn-copy" title="Sao chép từ">📋</button>
              <button class="jp-qs-action-btn btn-save" title="Lưu vào Sổ tay từ vựng">⭐</button>
              <button class="jp-qs-action-btn btn-anki" title="Thêm vào Anki (Desktop)">📥 Anki</button>
            </div>
          </div>
        `;
      });

      // Tùy chọn tra cứu online thủ công ở cuối danh sách kết quả nội bộ
      html += `
        <div class="jp-qs-manual-online-bar">
          <button type="button" class="jp-qs-manual-online-btn" id="jp-qs-btn-search-online" data-query="${this.escapeHtml(query)}" data-dir="vi-ja">
            🌐 Tra cứu trực tuyến "${this.escapeHtml(query)}" qua Google Translate
          </button>
        </div>
        <div class="jp-qs-online-slot" id="jp-qs-online-slot" style="display:none;"></div>
      `;

      this.resultsContainer.innerHTML = html;
      this.bindCardEvents();
    } else {
      // Từ điển nội bộ không có kết quả -> Tự động gọi API tra cứu online
      html += `
        <div class="jp-qs-online-slot" id="jp-qs-online-slot">
          <div class="jp-qs-loading-card">
            <span style="font-size:18px;">🌐</span>
            <span>Từ "${this.escapeHtml(query)}" chưa có trong từ điển nội bộ. Đang tự động tra cứu trực tuyến qua Google Translate...</span>
          </div>
        </div>
      `;
      this.resultsContainer.innerHTML = html;
      this.fetchOnlineReverse(query);
    }
  }

  /**
   * Gọi API trực tuyến dịch Việt ➔ Nhật và cập nhật slot trên giao diện
   */
  async fetchOnlineReverse(query) {
    const engine = window.japaneseEngine || (typeof japaneseEngine !== 'undefined' ? japaneseEngine : null);
    this.activeOnlineAbort = new AbortController();
    const signal = this.activeOnlineAbort.signal;

    try {
      let res = null;
      if (engine && engine.translateVietnameseToJapanese) {
        res = await engine.translateVietnameseToJapanese(query, signal);
      }

      // Dùng requestTranslation (hỗ trợ Background Proxy vượt CSP trên ChatGPT/YouTube)
      if (!res || !res.japanese) {
        const data = await this.requestTranslation(query, 'vi', 'ja', signal);
        if (data) {
          let translation = '';
          let onlineRomaji = '';
          const synonyms = [];
          if (data[0] && Array.isArray(data[0])) {
            translation = data[0].map(item => item[0]).filter(Boolean).join('').trim();
            const romajiItem = data[0].find(item => item && item[3]);
            if (romajiItem && romajiItem[3]) {
              onlineRomaji = romajiItem[3];
            }
          }
          if (data[1] && Array.isArray(data[1])) {
            for (const posGroup of data[1]) {
              if (posGroup && Array.isArray(posGroup[1])) {
                posGroup[1].slice(0, 4).forEach(syn => {
                  if (syn && !synonyms.includes(syn) && syn !== translation) {
                    synonyms.push(syn);
                  }
                });
              }
            }
          }
          let reading = '';
          if (onlineRomaji && typeof romajiToHiragana === 'function') {
            reading = romajiToHiragana(onlineRomaji);
          }
          if (translation) {
            res = { japanese: translation, reading, romaji: onlineRomaji, synonyms };
          }
        }
      }

      if (!res || !res.japanese) {
        throw new Error('No reverse translation');
      }

      const slot = this.resultsContainer.querySelector('#jp-qs-online-slot');
      if (!slot) return;

      const readingText = res.reading || '';
      const romajiText = res.romaji || '';
      const showReading = readingText && readingText !== res.japanese;

      slot.innerHTML = `
        <div class="jp-qs-card jp-qs-reverse-card" data-word="${this.escapeHtml(res.japanese)}" data-reading="${this.escapeHtml(readingText)}" data-meaning="${this.escapeHtml(query)}" title="Bấm vào thẻ để sao chép từ">
          <div class="jp-qs-card-left">
            <div class="jp-qs-reverse-badge">
              <span>🌐 Bản dịch trực tuyến</span>
            </div>
            <div class="jp-qs-word-title">
              <span class="jp-qs-vocab jp-qs-vocab-hero">${this.escapeHtml(res.japanese)}</span>
              ${showReading ? `<span class="jp-qs-reading">${this.escapeHtml(readingText)}</span>` : ''}
              ${romajiText ? `<span class="jp-qs-romaji">${this.escapeHtml(romajiText)}</span>` : ''}
            </div>
            <div class="jp-qs-meaning" style="font-size:14px;color:#f1f5f9;margin-top:2px;">💡 ${this.escapeHtml(query)}</div>
          </div>
          <div class="jp-qs-actions">
            <button class="jp-qs-action-btn btn-speak" title="Phát âm tiếng Nhật">🔊</button>
            <button class="jp-qs-action-btn btn-copy" title="Sao chép từ tiếng Nhật">📋</button>
            <button class="jp-qs-action-btn btn-save" title="Lưu vào Sổ tay từ vựng">⭐</button>
            <button class="jp-qs-action-btn btn-anki" title="Thêm vào Anki (Desktop)">📥 Anki</button>
          </div>
        </div>
      `;

      const newCard = slot.querySelector('.jp-qs-reverse-card');
      if (newCard) {
        this.bindEventsToCard(newCard);
      }
    } catch (e) {
      if (e.name === 'AbortError') return;
      const slot = this.resultsContainer.querySelector('#jp-qs-online-slot');
      if (slot && slot.querySelector('.jp-qs-loading-card')) {
        slot.innerHTML = `
          <div class="jp-qs-empty">
            <div style="font-size:28px;margin-bottom:6px;">🤔</div>
            Không tìm thấy từ tiếng Nhật tương ứng cho "<strong>${this.escapeHtml(query)}</strong>".<br/>
            <small style="color:#64748b;font-size:12px;margin-top:4px;display:inline-block;">
              Hãy thử kiểm tra lại chính tả hoặc chuyển sang chế độ Nhật ➔ Việt nếu muốn gõ Romaji.
            </small>
          </div>
        `;
      }
    }
  }

  /**
   * Gọi API trực tuyến dịch câu hoàn chỉnh (Việt ➔ Nhật hoặc Nhật ➔ Việt)
   */
  async fetchOnlineSentence(query, direction) {
    const engine = window.japaneseEngine || (typeof japaneseEngine !== 'undefined' ? japaneseEngine : null);
    this.activeOnlineAbort = new AbortController();
    const signal = this.activeOnlineAbort.signal;

    try {
      let translation = '';
      let romaji = '';

      if (engine && engine.translateSentence) {
        const res = await engine.translateSentence(query, { direction });
        if (res && res.meaning) {
          translation = res.meaning;
        }
      }

      // Fallback gọi Google Translate API qua background proxy
      if (!translation) {
        const sl = direction === 'vi-ja' ? 'vi' : 'ja';
        const tl = direction === 'vi-ja' ? 'ja' : 'vi';
        const data = await this.requestTranslation(query, sl, tl, signal);
        if (data && data[0] && Array.isArray(data[0])) {
          const separator = tl === 'ja' ? '' : ' ';
          translation = data[0].map(item => item[0]).filter(Boolean).join(separator).trim();
          const romajiItem = data[0].find(item => item && item[3]);
          if (romajiItem && romajiItem[3]) {
            romaji = romajiItem[3];
          }
        }
      }

      if (!translation) {
        throw new Error('No translation returned');
      }

      const slot = this.resultsContainer.querySelector('#jp-qs-online-slot');
      if (!slot) return;

      const isViToJa = direction === 'vi-ja';
      const japaneseText = isViToJa ? translation : query;
      const vietnameseText = isViToJa ? query : translation;

      slot.innerHTML = `
        <div class="jp-qs-card jp-qs-hero-card" data-word="${this.escapeHtml(japaneseText)}" data-reading="" data-meaning="${this.escapeHtml(vietnameseText)}" title="Bấm vào thẻ để sao chép câu tiếng Nhật">
          <div class="jp-qs-card-left">
            <div class="jp-qs-hero-top">
              <span class="jp-qs-hero-badge">🌐 Dịch câu hoàn chỉnh (${isViToJa ? 'Việt ➔ Nhật' : 'Nhật ➔ Việt'})</span>
              <span class="jp-qs-hero-source">${isViToJa ? 'Tiếng Việt' : 'Tiếng Nhật'}: "${this.escapeHtml(query)}"</span>
            </div>
            <div class="jp-qs-hero-target">${this.escapeHtml(isViToJa ? japaneseText : vietnameseText)}</div>
            ${!isViToJa ? `<div class="jp-qs-hero-sub">🇯🇵 Bản gốc tiếng Nhật: "${this.escapeHtml(japaneseText)}"</div>` : ''}
            ${romaji ? `<div class="jp-qs-romaji" style="font-size:12.5px;color:#94a3b8;margin-top:2px;">${this.escapeHtml(romaji)}</div>` : ''}
          </div>
          <div class="jp-qs-actions">
            <button class="jp-qs-action-btn btn-speak" title="Phát âm tiếng Nhật">🔊</button>
            <button class="jp-qs-action-btn btn-copy" title="Sao chép câu tiếng Nhật">📋</button>
            <button class="jp-qs-action-btn btn-save" title="Lưu vào Sổ tay từ vựng">⭐</button>
            <button class="jp-qs-action-btn btn-anki" title="Thêm vào Anki (Desktop)">📥 Anki</button>
          </div>
        </div>
      `;

      const newCard = slot.querySelector('.jp-qs-hero-card');
      if (newCard) {
        this.bindEventsToCard(newCard);
      }
    } catch (e) {
      if (e.name === 'AbortError') return;
      const slot = this.resultsContainer.querySelector('#jp-qs-online-slot');
      if (slot) {
        slot.innerHTML = `
          <div class="jp-qs-empty">
            <div style="font-size:28px;margin-bottom:6px;">⚠️</div>
            Không thể kết nối đến dịch vụ dịch trực tuyến.<br/>
            <small style="color:#64748b;font-size:12px;margin-top:4px;display:inline-block;">
              Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau giây lát.
            </small>
          </div>
        `;
      }
    }
  }

  /**
   * Bóc tách các từ vựng và Kanji xuất hiện bên trong một câu tiếng Nhật dài
   */
  extractWordsFromSentence(sentence) {
    const results = [];
    if (!sentence || typeof sentence !== 'string') return results;
    const clean = sentence.trim();

    // 1. Quét từ điển chính
    if (typeof JP_DICTIONARY !== 'undefined') {
      const keys = Object.keys(JP_DICTIONARY).filter(k => k.length >= 2 && clean.includes(k));
      keys.sort((a, b) => b.length - a.length);
      for (const k of keys.slice(0, 8)) {
        results.push({ word: k, ...JP_DICTIONARY[k] });
      }
    }

    // 2. Quét từ điển mở rộng nếu cần thêm
    if (results.length < 5 && typeof JP_DICTIONARY_EXPANDED !== 'undefined') {
      const expKeys = Object.keys(JP_DICTIONARY_EXPANDED).filter(k => k.length >= 2 && clean.includes(k) && !results.some(r => r.word === k));
      expKeys.sort((a, b) => b.length - a.length);
      for (const k of expKeys.slice(0, 8 - results.length)) {
        results.push({ word: k, ...JP_DICTIONARY_EXPANDED[k] });
      }
    }

    return results;
  }

  /**
   * Tra cứu xuôi: Tiếng Nhật ➔ Tiếng Việt (Kanji, Hiragana, Katakana, Romaji, câu hoàn chỉnh)
   */
  performStandardSearch(query) {
    const isSent = this.isSentence(query);

    // Nếu người dùng nhập cả câu tiếng Nhật
    if (isSent) {
      let html = `
        <div class="jp-qs-online-slot" id="jp-qs-online-slot">
          <div class="jp-qs-loading-card">
            <span style="font-size:18px;">🌐</span>
            <span>Đang dịch câu tiếng Nhật sang tiếng Việt qua Google Translate...</span>
          </div>
        </div>
      `;

      // Bóc tách các từ vựng xuất hiện trong câu
      const extractedWords = this.extractWordsFromSentence(query);
      if (extractedWords.length > 0) {
        html += `<div class="jp-qs-section-title">📚 Từ vựng bóc tách trong câu (${extractedWords.length})</div>`;
        extractedWords.forEach(item => {
          const romaji = typeof toRomaji === 'function' ? toRomaji(item.r || '') : '';
          const showReading = item.r && item.r !== item.word;
          html += `
            <div class="jp-qs-card" data-word="${this.escapeHtml(item.word)}" data-reading="${this.escapeHtml(item.r || '')}" data-meaning="${this.escapeHtml(item.m || '')}" title="Bấm vào thẻ để sao chép từ">
              <div class="jp-qs-card-left">
                <div class="jp-qs-word-title">
                  <span class="jp-qs-vocab">${this.escapeHtml(item.word)}</span>
                  ${showReading ? `<span class="jp-qs-reading">${this.escapeHtml(item.r)}</span>` : ''}
                  ${romaji ? `<span class="jp-qs-romaji">${this.escapeHtml(romaji)}</span>` : ''}
                </div>
                <div class="jp-qs-meaning">${this.escapeHtml(item.m || '')}</div>
                ${item.t ? `<div class="jp-qs-type-badge">${this.escapeHtml(item.t)}</div>` : ''}
              </div>
              <div class="jp-qs-actions">
                <button class="jp-qs-action-btn btn-speak" title="Phát âm tiếng Nhật">🔊</button>
                <button class="jp-qs-action-btn btn-copy" title="Sao chép từ">📋</button>
                <button class="jp-qs-action-btn btn-save" title="Lưu vào Sổ tay từ vựng">⭐</button>
                <button class="jp-qs-action-btn btn-anki" title="Thêm vào Anki (Desktop)">📥 Anki</button>
              </div>
            </div>
          `;
        });
      }

      this.resultsContainer.innerHTML = html;
      this.bindCardEvents();
      this.fetchOnlineSentence(query, 'ja-vi');
      return;
    }

    // Tra cứu từ đơn hoặc cụm từ ngắn
    const matches = [];
    const qLower = query.toLowerCase();

    // Hỗ trợ chuyển Romaji sang Hiragana để tra cứu từ điển
    let qHira = '';
    if (typeof romajiToHiragana === 'function' && /^[a-zA-Z\s'-]+$/.test(query)) {
      qHira = romajiToHiragana(query);
    }

    // 1. Tìm trong từ điển chính
    if (typeof JP_DICTIONARY !== 'undefined') {
      for (const [w, data] of Object.entries(JP_DICTIONARY)) {
        if (matches.length >= 25) break;
        const matchWord = (w === query || w.includes(query) || (qHira && w.includes(qHira)));
        const matchReading = (data.r && (data.r.includes(query) || (qHira && data.r.includes(qHira))));
        const matchMeaning = (data.m && data.m.toLowerCase().includes(qLower));
        if (matchWord || matchReading || matchMeaning) {
          matches.push({ word: w, ...data });
        }
      }
    }

    // 2. Tìm trong từ điển mở rộng nếu chưa đủ
    if (matches.length < 15 && typeof JP_DICTIONARY_EXPANDED !== 'undefined') {
      for (const [w, data] of Object.entries(JP_DICTIONARY_EXPANDED)) {
        if (matches.length >= 35) break;
        if (!matches.some(m => m.word === w)) {
          const matchWord = (w === query || w.includes(query) || (qHira && w.includes(qHira)));
          const matchReading = (data.r && (data.r.includes(query) || (qHira && data.r.includes(qHira))));
          const matchMeaning = (data.m && data.m.toLowerCase().includes(qLower));
          if (matchWord || matchReading || matchMeaning) {
            matches.push({ word: w, ...data });
          }
        }
      }
    }

    // 3. Nếu từ điển nội bộ không có từ này -> Kiểm tra nếu là tiếng Việt trước khi tra online
    if (matches.length === 0) {
      // Tự động nhận diện nếu người dùng gõ tiếng Việt ở chế độ Auto
      if (this.currentMode === 'auto') {
        const revCheck = typeof lookupVietnameseToJapanese === 'function' ? lookupVietnameseToJapanese(query, 5) : null;
        if (revCheck && revCheck.words && revCheck.words.length > 0) {
          this.performReverseSearch(query);
          return;
        }
      }

      this.resultsContainer.innerHTML = `
        <div class="jp-qs-online-slot" id="jp-qs-online-slot">
          <div class="jp-qs-loading-card">
            <span style="font-size:18px;">🌐</span>
            <span>Từ "${this.escapeHtml(query)}" chưa có trong từ điển nội bộ. Đang tự động tra cứu trực tuyến qua Google Translate...</span>
          </div>
        </div>
      `;
      this.fetchOnlineStandardWord(query);
      return;
    }

    let html = '';

    // Render danh sách từ vựng tiếng Nhật từ từ điển nội bộ
    html += `<div class="jp-qs-section-title">📚 Từ vựng tiếng Nhật (${matches.length})</div>`;
    matches.forEach(item => {
      const romaji = typeof toRomaji === 'function' ? toRomaji(item.r || '') : '';
      const showReading = item.r && item.r !== item.word;
      html += `
        <div class="jp-qs-card" data-word="${this.escapeHtml(item.word)}" data-reading="${this.escapeHtml(item.r || '')}" data-meaning="${this.escapeHtml(item.m || '')}" title="Bấm vào thẻ để sao chép từ">
          <div class="jp-qs-card-left">
            <div class="jp-qs-word-title">
              <span class="jp-qs-vocab">${this.escapeHtml(item.word)}</span>
              ${showReading ? `<span class="jp-qs-reading">${this.escapeHtml(item.r)}</span>` : ''}
              ${romaji ? `<span class="jp-qs-romaji">${this.escapeHtml(romaji)}</span>` : ''}
            </div>
            <div class="jp-qs-meaning">💡 ${this.escapeHtml(item.m || '')}</div>
            ${item.t ? `<div class="jp-qs-type-badge">${this.escapeHtml(item.t)}</div>` : ''}
          </div>
          <div class="jp-qs-actions">
            <button class="jp-qs-action-btn btn-speak" title="Phát âm tiếng Nhật">🔊</button>
            <button class="jp-qs-action-btn btn-copy" title="Sao chép từ">📋</button>
            <button class="jp-qs-action-btn btn-save" title="Lưu vào Sổ tay từ vựng">⭐</button>
            <button class="jp-qs-action-btn btn-anki" title="Thêm vào Anki (Desktop)">📥 Anki</button>
          </div>
        </div>
      `;
    });

    // Tùy chọn tra cứu online thủ công ở cuối danh sách kết quả nội bộ
    html += `
      <div class="jp-qs-manual-online-bar">
        <button type="button" class="jp-qs-manual-online-btn" id="jp-qs-btn-search-online" data-query="${this.escapeHtml(query)}" data-dir="ja-vi">
          🌐 Tra cứu trực tuyến "${this.escapeHtml(query)}" qua Google Translate
        </button>
      </div>
      <div class="jp-qs-online-slot" id="jp-qs-online-slot" style="display:none;"></div>
    `;

    this.resultsContainer.innerHTML = html;
    this.bindCardEvents();
  }

  /**
   * Gọi API trực tuyến cho từ đơn tiếng Nhật không có trong từ điển nội bộ
   */
  async fetchOnlineStandardWord(query) {
    const engine = window.japaneseEngine || (typeof japaneseEngine !== 'undefined' ? japaneseEngine : null);
    this.activeOnlineAbort = new AbortController();
    const signal = this.activeOnlineAbort.signal;

    try {
      let result = null;
      if (engine && engine.translateOnline) {
        result = await engine.translateOnline(query, signal);
      }

      // Direct Google Translate single API qua background proxy
      if (!result) {
        const data = await this.requestTranslation(query, 'ja', 'vi', signal);
        if (data) {
          let translation = '';
          let onlineRomaji = '';
          const synonyms = [];
          if (data && data[0] && Array.isArray(data[0])) {
            translation = data[0].map(item => item[0]).filter(Boolean).join(' ').trim();
            const romajiItem = data[0].find(item => item && item[3]);
            if (romajiItem && romajiItem[3]) {
              onlineRomaji = romajiItem[3];
            }
          }
          if (data && data[1] && Array.isArray(data[1])) {
            for (const posGroup of data[1]) {
              if (posGroup && Array.isArray(posGroup[1])) {
                posGroup[1].slice(0, 3).forEach(syn => {
                  if (syn && !synonyms.includes(syn) && syn !== translation) {
                    synonyms.push(syn);
                  }
                });
              }
            }
          }
          let reading = '';
          if (onlineRomaji && typeof romajiToHiragana === 'function') {
            reading = romajiToHiragana(onlineRomaji);
          }
          if (translation) {
            result = {
              meaning: translation,
              reading: reading,
              romaji: onlineRomaji,
              synonyms: synonyms,
              fromOnline: true
            };
          }
        }
      }

      if (!result || !result.meaning) {
        throw new Error('Not found online');
      }

      const slot = this.resultsContainer.querySelector('#jp-qs-online-slot');
      if (!slot) return;

      const readingText = result.reading || '';
      const romajiText = result.romaji || '';
      const showReading = readingText && readingText !== query;

      slot.innerHTML = `
        <div class="jp-qs-card jp-qs-reverse-card" data-word="${this.escapeHtml(query)}" data-reading="${this.escapeHtml(readingText)}" data-meaning="${this.escapeHtml(result.meaning)}" title="Bấm vào thẻ để sao chép từ">
          <div class="jp-qs-card-left">
            <div class="jp-qs-reverse-badge">
              <span>🌐 Bản dịch trực tuyến</span>
            </div>
            <div class="jp-qs-word-title">
              <span class="jp-qs-vocab jp-qs-vocab-hero">${this.escapeHtml(query)}</span>
              ${showReading ? `<span class="jp-qs-reading">${this.escapeHtml(readingText)}</span>` : ''}
              ${romajiText ? `<span class="jp-qs-romaji">${this.escapeHtml(romajiText)}</span>` : ''}
            </div>
            <div class="jp-qs-meaning" style="font-size:14px;color:#f1f5f9;margin-top:2px;">💡 ${this.escapeHtml(result.meaning)}</div>
          </div>
          <div class="jp-qs-actions">
            <button class="jp-qs-action-btn btn-speak" title="Phát âm tiếng Nhật">🔊</button>
            <button class="jp-qs-action-btn btn-copy" title="Sao chép từ">📋</button>
            <button class="jp-qs-action-btn btn-save" title="Lưu vào Sổ tay từ vựng">⭐</button>
            <button class="jp-qs-action-btn btn-anki" title="Thêm vào Anki (Desktop)">📥 Anki</button>
          </div>
        </div>
      `;

      const newCard = slot.querySelector('.jp-qs-reverse-card');
      if (newCard) {
        this.bindEventsToCard(newCard);
      }
    } catch (e) {
      if (e.name === 'AbortError') return;
      const slot = this.resultsContainer.querySelector('#jp-qs-online-slot');
      if (slot) {
        slot.innerHTML = `
          <div class="jp-qs-empty">
            <div style="font-size: 28px; margin-bottom: 8px;">🤔</div>
            Không tìm thấy từ "<strong>${this.escapeHtml(query)}</strong>" trong từ điển nội bộ lẫn trực tuyến.<br/>
            <small style="color: #64748b; font-size: 12px; margin-top: 6px; display: inline-block;">
              Hãy thử kiểm tra lại chính tả hoặc chuyển sang chế độ <strong>Việt ➔ Nhật</strong> nếu muốn tìm từ tiếng Nhật tương ứng.
            </small>
          </div>
        `;
      }
    }
  }

  /**
   * Gắn sự kiện cho toàn bộ danh sách thẻ
   */
  bindCardEvents() {
    this.resultsContainer.querySelectorAll('.jp-qs-card').forEach(card => {
      this.bindEventsToCard(card);
    });

    // Nút kích hoạt tra cứu trực tuyến thủ công khi đã có kết quả nội bộ
    const manualBtn = this.resultsContainer.querySelector('#jp-qs-btn-search-online');
    if (manualBtn && !manualBtn.__hasEvents) {
      manualBtn.__hasEvents = true;
      manualBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const query = manualBtn.getAttribute('data-query');
        const dir = manualBtn.getAttribute('data-dir');
        const bar = manualBtn.closest('.jp-qs-manual-online-bar');
        if (bar) bar.style.display = 'none';

        const slot = this.resultsContainer.querySelector('#jp-qs-online-slot');
        if (slot) {
          slot.style.display = 'block';
          slot.innerHTML = `
            <div class="jp-qs-loading-card">
              <span style="font-size:18px;">🌐</span>
              <span>Đang tra cứu trực tuyến "${this.escapeHtml(query)}" qua Google Translate...</span>
            </div>
          `;
        }

        if (dir === 'vi-ja') {
          this.fetchOnlineReverse(query);
        } else {
          this.fetchOnlineStandardWord(query);
        }
      });
    }
  }

  /**
   * Gắn sự kiện cho từng thẻ kết quả đơn lẻ
   */
  bindEventsToCard(card) {
    if (!card || card.__hasEvents) return;
    card.__hasEvents = true;

    // Gắn sự kiện sao chép từ khi click vào card
    card.addEventListener('click', (e) => {
      if (e.target.closest('.jp-qs-actions') || e.target.closest('.jp-qs-stroke-btn')) return;
      const word = card.getAttribute('data-word');
      if (word && navigator.clipboard) {
        navigator.clipboard.writeText(word).catch(() => {});
        const vocabEl = card.querySelector('.jp-qs-vocab, .jp-qs-hero-target');
        if (vocabEl) {
          const orig = vocabEl.textContent;
          vocabEl.textContent = 'Đã sao chép! 📋';
          setTimeout(() => { vocabEl.textContent = orig; }, 1200);
        }
      }
    });

    // Nút sao chép chuyên dụng
    const copyBtn = card.querySelector('.btn-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = card.getAttribute('data-word');
        if (word && navigator.clipboard) {
          navigator.clipboard.writeText(word).then(() => {
            copyBtn.textContent = '✅';
            setTimeout(() => { copyBtn.textContent = '📋'; }, 1500);
          }).catch(() => {});
        }
      });
    }

    // Gắn sự kiện phát âm
    const speakBtn = card.querySelector('.btn-speak');
    if (speakBtn) {
      speakBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = card.getAttribute('data-word');
        const reading = card.getAttribute('data-reading');
        const speakText = (reading && !/[一-龯]/.test(reading)) ? reading : word;
        const speaker = window.japaneseAudio || (typeof japaneseAudio !== 'undefined' ? japaneseAudio : null) || (typeof japaneseEngine !== 'undefined' ? japaneseEngine : null);
        if (speaker && speaker.speak) {
          speaker.speak(speakText);
        }
      });
    }

    // Gắn sự kiện lưu vào Sổ tay
    const saveBtn = card.querySelector('.btn-save');
    if (saveBtn) {
      saveBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const word = card.getAttribute('data-word');
        const reading = card.getAttribute('data-reading');
        const meaning = card.getAttribute('data-meaning');
        const saveFn = window.saveWordToNotebook || (typeof saveWordToNotebook === 'function' ? saveWordToNotebook : null);
        if (saveFn) {
          await saveFn({ word, reading, meaning });
          saveBtn.textContent = '✅';
          saveBtn.style.color = '#10b981';
          setTimeout(() => {
            saveBtn.textContent = '⭐';
            saveBtn.style.color = '';
          }, 2000);
        }
      });
    }

    // Gắn sự kiện thêm vào Anki
    const ankiBtn = card.querySelector('.btn-anki');
    if (ankiBtn) {
      ankiBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const word = card.getAttribute('data-word');
        const reading = card.getAttribute('data-reading');
        const meaning = card.getAttribute('data-meaning');
        ankiBtn.textContent = '⏳';
        try {
          const client = window.ankiConnect || (typeof ankiConnect !== 'undefined' ? ankiConnect : null);
          if (client) {
            await client.addWordNote({ word, reading, meaning });
            ankiBtn.textContent = '✅ Anki';
            ankiBtn.style.color = '#10b981';
            setTimeout(() => {
              ankiBtn.textContent = '📥 Anki';
              ankiBtn.style.color = '';
            }, 2500);
          } else {
            alert('Không tìm thấy AnkiConnect. Hãy khởi động Anki Desktop.');
            ankiBtn.textContent = '📥 Anki';
          }
        } catch (err) {
          alert('Lỗi AnkiConnect: ' + err.message);
          ankiBtn.textContent = '❌ Lỗi';
          setTimeout(() => {
            ankiBtn.textContent = '📥 Anki';
          }, 2500);
        }
      });
    }

    // Gắn sự kiện xem nét viết Kanji
    const strokeBtn = card.querySelector('.jp-qs-stroke-btn');
    if (strokeBtn) {
      strokeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const char = strokeBtn.getAttribute('data-kanji');
        if (window.__JP_OPEN_STROKE_MODAL) {
          window.__JP_OPEN_STROKE_MODAL(char);
        }
      });
    }
  }

  /**
   * Toàn bộ CSS đóng gói nội tuyến bên trong Shadow DOM
   * Cách ly 100% với styling của trang web ngoài (ChatGPT, YouTube, Facebook...)
   */
  getStyles() {
    return `
      :host {
        all: initial !important;
        font-size: 14px !important;
        line-height: 1.5 !important;
        letter-spacing: normal !important;
        text-align: left !important;
        direction: ltr !important;
      }
      :host([hidden]) {
        display: none !important;
      }
      *, *::before, *::after {
        box-sizing: border-box !important;
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif;
        line-height: 1.4;
        letter-spacing: normal;
        text-transform: none;
        text-indent: 0;
      }

      .jp-qs-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(10, 15, 29, 0.78);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 8vh;
        z-index: 2147483646;
        pointer-events: auto;
        user-select: none;
        -webkit-user-select: none;
      }

      .jp-qs-modal {
        width: 92%;
        max-width: 680px;
        max-height: 85vh;
        background: #0f172a !important;
        opacity: 1 !important;
        border: 1.5px solid rgba(56, 189, 248, 0.45) !important;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(56, 189, 248, 0.3) !important;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        animation: qsFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        color: #f8fafc;
        pointer-events: auto;
        user-select: text;
        -webkit-user-select: text;
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
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(30, 41, 59, 0.5);
      }

      .jp-qs-icon {
        font-size: 20px;
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }

      .jp-qs-input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        font-size: 16px;
        color: #f8fafc;
        font-weight: 500;
        line-height: 1.4;
        padding: 0;
      }

      .jp-qs-input::placeholder {
        color: #64748b;
        font-size: 14.5px;
      }

      .jp-qs-close {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #94a3b8;
        width: 30px;
        height: 30px;
        border-radius: 8px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        font-weight: bold;
        flex-shrink: 0;
        transition: all 0.15s ease;
        pointer-events: auto !important;
        user-select: none;
      }

      .jp-qs-close:hover {
        background: #ef4444 !important;
        border-color: #ef4444 !important;
        color: #ffffff !important;
        transform: scale(1.05);
      }

      .jp-qs-toolbar {
        display: flex;
        align-items: center;
        padding: 8px 18px;
        background: rgba(15, 23, 42, 0.95);
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        gap: 8px;
        overflow-x: auto;
      }

      .jp-qs-mode-bar {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
      }

      .jp-qs-mode-btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #94a3b8;
        height: 28px;
        line-height: 28px;
        padding: 0 12px;
        border-radius: 14px;
        font-size: 11.5px;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.15s ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        box-sizing: border-box;
        flex-shrink: 0;
      }

      .jp-qs-mode-btn:hover {
        background: rgba(56, 189, 248, 0.15);
        color: #e2e8f0;
        border-color: rgba(56, 189, 248, 0.3);
      }

      .jp-qs-mode-btn.active {
        background: #38bdf8;
        color: #0f172a;
        border-color: #38bdf8;
        font-weight: 700;
        box-shadow: 0 2px 8px rgba(56, 189, 248, 0.3);
      }

      .jp-qs-tags {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
        padding: 8px 18px;
        background: rgba(255, 255, 255, 0.02);
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        overflow: visible;
      }

      .jp-qs-tag {
        -webkit-appearance: none;
        appearance: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        box-sizing: border-box;
        height: 28px;
        line-height: 1 !important;
        padding: 0 12px;
        border-radius: 14px;
        font-size: 12px;
        font-weight: 500;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", "Meiryo", sans-serif;
        background: rgba(56, 189, 248, 0.1);
        border: 1px solid rgba(56, 189, 248, 0.25);
        color: #38bdf8;
        cursor: pointer;
        white-space: nowrap;
        user-select: none;
        outline: none;
        flex-shrink: 0;
        transition: all 0.15s ease;
        margin: 0;
      }

      .jp-qs-tag:hover, .jp-qs-tag:focus-visible {
        background: #0284c7 !important;
        border-color: #38bdf8 !important;
        color: #ffffff !important;
        box-shadow: 0 2px 8px rgba(56, 189, 248, 0.35) !important;
      }

      .jp-qs-results {
        flex: 1 1 auto;
        overflow-y: auto;
        padding: 14px 20px 24px 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: calc(85vh - 180px);
        overscroll-behavior: contain;
      }

      .jp-qs-results::-webkit-scrollbar,
      .jp-qs-tags::-webkit-scrollbar,
      .jp-qs-toolbar::-webkit-scrollbar {
        width: 6px;
        height: 5px;
      }
      .jp-qs-results::-webkit-scrollbar-track,
      .jp-qs-tags::-webkit-scrollbar-track,
      .jp-qs-toolbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .jp-qs-results::-webkit-scrollbar-thumb,
      .jp-qs-tags::-webkit-scrollbar-thumb,
      .jp-qs-toolbar::-webkit-scrollbar-thumb {
        background: rgba(56, 189, 248, 0.25);
        border-radius: 4px;
      }
      .jp-qs-results::-webkit-scrollbar-thumb:hover,
      .jp-qs-tags::-webkit-scrollbar-thumb:hover,
      .jp-qs-toolbar::-webkit-scrollbar-thumb:hover {
        background: rgba(56, 189, 248, 0.5);
      }

      .jp-qs-empty {
        text-align: center;
        padding: 40px 20px;
        color: #94a3b8;
        font-size: 14px;
        line-height: 1.6;
      }

      .jp-qs-section-title {
        font-size: 11.5px;
        font-weight: 700;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding: 6px 4px 2px 4px;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .jp-qs-manual-online-bar {
        display: flex;
        justify-content: center;
        padding: 10px 0 4px 0;
      }

      .jp-qs-manual-online-btn {
        background: rgba(56, 189, 248, 0.08);
        border: 1px dashed rgba(56, 189, 248, 0.4);
        color: #38bdf8;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 12.5px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-family: inherit;
      }

      .jp-qs-manual-online-btn:hover {
        background: rgba(56, 189, 248, 0.2);
        border-color: #38bdf8;
        color: #ffffff;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(56, 189, 248, 0.25);
      }

      .jp-qs-loading-card {
        background: rgba(56, 189, 248, 0.08);
        border: 1px dashed rgba(56, 189, 248, 0.4);
        border-radius: 12px;
        padding: 14px 18px;
        display: flex;
        align-items: center;
        gap: 10px;
        color: #7dd3fc;
        font-size: 13.5px;
        animation: qsPulse 1.6s infinite ease-in-out;
      }

      @keyframes qsPulse {
        0%, 100% { opacity: 0.75; transform: scale(0.995); }
        50% { opacity: 1; transform: scale(1); }
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
        cursor: pointer;
      }

      .jp-qs-card:hover {
        background: rgba(56, 189, 248, 0.08);
        border-color: rgba(56, 189, 248, 0.35);
        transform: translateX(3px);
      }

      .jp-qs-hero-card {
        background: linear-gradient(135deg, rgba(56, 189, 248, 0.16), rgba(16, 185, 129, 0.1));
        border: 1.5px solid rgba(56, 189, 248, 0.45);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
      }

      .jp-qs-hero-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 4px;
        flex-wrap: wrap;
      }

      .jp-qs-hero-badge {
        font-size: 11px;
        font-weight: 700;
        color: #38bdf8;
        background: rgba(56, 189, 248, 0.2);
        padding: 2px 8px;
        border-radius: 4px;
      }

      .jp-qs-hero-source {
        font-size: 11.5px;
        color: #cbd5e1;
        background: rgba(255, 255, 255, 0.06);
        padding: 2px 7px;
        border-radius: 4px;
      }

      .jp-qs-hero-target {
        font-size: 19px;
        font-weight: 700;
        color: #ffffff;
        line-height: 1.5;
        user-select: text;
        -webkit-user-select: text;
      }

      .jp-qs-hero-sub {
        font-size: 13px;
        color: #94a3b8;
        margin-top: 4px;
      }

      .jp-qs-reverse-card {
        background: linear-gradient(135deg, rgba(56, 189, 248, 0.14), rgba(16, 185, 129, 0.09));
        border: 1.5px solid rgba(56, 189, 248, 0.45);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
      }

      .jp-qs-reverse-badge {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 2px;
      }

      .jp-qs-reverse-badge span:first-child {
        font-size: 11px;
        font-weight: 700;
        color: #38bdf8;
        background: rgba(56, 189, 248, 0.18);
        padding: 2px 7px;
        border-radius: 4px;
      }

      .jp-qs-source-pill {
        font-size: 11px;
        color: #cbd5e1;
        background: rgba(255, 255, 255, 0.06);
        padding: 2px 7px;
        border-radius: 4px;
      }

      .jp-qs-vocab-hero {
        font-size: 23px !important;
        color: #38bdf8 !important;
        font-weight: 800 !important;
      }

      .jp-qs-synonyms-row {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
        margin-top: 4px;
      }

      .jp-qs-syn-pill {
        font-size: 11.5px;
        color: #7dd3fc;
        background: rgba(56, 189, 248, 0.12);
        border: 1px solid rgba(56, 189, 248, 0.25);
        padding: 1px 6px;
        border-radius: 4px;
      }

      .jp-qs-card-left {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
      }

      .jp-qs-word-title {
        display: flex;
        align-items: baseline;
        gap: 10px;
        flex-wrap: wrap;
      }

      .jp-qs-vocab {
        font-size: 19px;
        font-weight: 700;
        color: #f8fafc;
      }

      .jp-qs-reading {
        font-size: 14.5px;
        color: #38bdf8;
        font-weight: 600;
      }

      .jp-qs-kata {
        font-size: 11.5px;
        color: #fb923c;
        background: rgba(251, 146, 60, 0.15);
        border: 1px solid rgba(251, 146, 60, 0.35);
        padding: 1px 6px;
        border-radius: 4px;
        font-weight: 600;
        letter-spacing: 0.3px;
      }

      .jp-qs-romaji {
        font-size: 13px;
        color: #94a3b8;
        font-style: italic;
      }

      .jp-qs-meaning {
        font-size: 13.5px;
        color: #e2e8f0;
        line-height: 1.4;
      }

      .jp-qs-type-badge {
        font-size: 11px;
        color: #a78bfa;
      }

      .jp-qs-actions {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
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
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }

      .jp-qs-action-btn:hover {
        background: #38bdf8;
        color: #0f172a;
        border-color: #38bdf8;
      }

      .jp-qs-kanji-card {
        border-left: 3.5px solid #38bdf8;
      }

      .jp-qs-kanji-header {
        display: flex;
        align-items: center;
        gap: 14px;
        width: 100%;
      }

      .jp-qs-kanji-big {
        font-size: 30px;
        font-weight: 700;
        color: #38bdf8;
        min-width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(56, 189, 248, 0.12);
        border: 1px solid rgba(56, 189, 248, 0.25);
        border-radius: 10px;
        flex-shrink: 0;
      }

      .jp-qs-kanji-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
      }

      .jp-qs-kanji-hv {
        font-size: 15px;
        font-weight: 700;
        color: #fcd34d;
      }

      .jp-qs-kanji-readings {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        font-size: 11px;
      }

      .tag-on {
        color: #f472b6;
        background: rgba(236, 72, 153, 0.15);
        padding: 2px 6px;
        border-radius: 4px;
        border: 1px solid rgba(236, 72, 153, 0.3);
      }

      .tag-kun {
        color: #38bdf8;
        background: rgba(56, 189, 248, 0.15);
        padding: 2px 6px;
        border-radius: 4px;
        border: 1px solid rgba(56, 189, 248, 0.3);
      }

      .tag-jlpt {
        color: #34d399;
        background: rgba(52, 211, 153, 0.15);
        padding: 2px 6px;
        border-radius: 4px;
        border: 1px solid rgba(52, 211, 153, 0.3);
      }

      .jp-qs-kanji-meaning {
        font-size: 12.5px;
        color: #cbd5e1;
      }

      .jp-qs-stroke-btn {
        background: rgba(56, 189, 248, 0.12);
        border: 1px solid rgba(56, 189, 248, 0.35);
        color: #38bdf8;
        border-radius: 8px;
        padding: 6px 12px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .jp-qs-stroke-btn:hover {
        background: #38bdf8;
        color: #0f172a;
      }

      .jp-qs-footer {
        padding: 10px 20px;
        background: rgba(0, 0, 0, 0.35);
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        display: flex;
        gap: 16px;
        font-size: 12px;
        color: #64748b;
        flex-wrap: wrap;
      }

      .jp-qs-footer kbd {
        background: rgba(255, 255, 255, 0.1);
        padding: 2px 6px;
        border-radius: 4px;
        color: #94a3b8;
        font-family: inherit;
        font-size: 11px;
      }
    `;
  }
}

// Khởi tạo instance toàn cục gắn vào window
const quickSearchPalette = new QuickSearchPalette();
if (typeof window !== 'undefined') {
  window.quickSearchPalette = quickSearchPalette;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QuickSearchPalette, quickSearchPalette };
}
