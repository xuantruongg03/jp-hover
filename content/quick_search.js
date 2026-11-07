/**
 * Quick Floating Search Palette (Command Palette: Alt+S)
 * Thanh tra cứu nhanh tiếng Nhật nổi trên mọi trang web
 * Hỗ trợ tìm kiếm thời gian thực theo Kanji, Hiragana, Romaji, Hán-Việt và Nghĩa tiếng Việt
 * Sử dụng Shadow DOM độc lập 100% để tránh xung đột CSS với mọi trang web (ChatGPT, YouTube, Facebook, v.v.)
 */

class QuickSearchPalette {
  constructor() {
    this.isOpen = false;
    this.container = null;
    this.shadow = null;
    this.input = null;
    this.resultsContainer = null;
    this.debounceTimer = null;
    this._lastToggleTime = 0;
    this.initKeyListeners();
  }

  /**
   * Thoát ký tự HTML an toàn
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
   * Đảm bảo DOM đã được tạo và gắn an toàn vào trang qua Shadow DOM
   */
  ensureDOM() {
    if (this.container && document.contains(this.container) && this.shadow) return true;

    const parent = document.body || document.documentElement;
    if (!parent) return false;

    let root = document.getElementById('jp-quick-search-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'jp-quick-search-root';
      root.style.cssText = 'position:fixed;inset:0;z-index:2147483646;display:none;pointer-events:none;';
      parent.appendChild(root);
    }

    let shadow = root.shadowRoot;
    if (!shadow) {
      shadow = root.attachShadow({ mode: 'open' });
    }

    shadow.innerHTML = `
      <style>
        ${this.getStyles()}
      </style>
      <div class="jp-qs-backdrop">
        <div class="jp-qs-modal" role="dialog" aria-modal="true">
          <div class="jp-qs-header">
            <span class="jp-qs-icon">🔍</span>
            <input type="text" class="jp-qs-input" placeholder="Tra cứu Kanji, Hiragana, Romaji hoặc nghĩa tiếng Việt... (Esc để đóng)" autofocus />
            <button class="jp-qs-close" title="Đóng (Esc)">✕</button>
          </div>
          <div class="jp-qs-tags">
            <span class="jp-qs-tag" data-query="勉強">勉強 (Học)</span>
            <span class="jp-qs-tag" data-query="先生">先生 (Thầy cô)</span>
            <span class="jp-qs-tag" data-query="日本">日本 (Nhật Bản)</span>
            <span class="jp-qs-tag" data-query="ありがとう">ありがとう (Cảm ơn)</span>
          </div>
          <div class="jp-qs-results">
            <div class="jp-qs-empty">
              <div style="font-size:32px;margin-bottom:8px;">🔍</div>
              Gõ từ vựng tiếng Nhật, Romaji hoặc nghĩa tiếng Việt để bắt đầu tra cứu nhanh...
            </div>
          </div>
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
    this.resultsContainer = shadow.querySelector('.jp-qs-results');

    // Sự kiện đóng
    shadow.querySelector('.jp-qs-close').addEventListener('click', () => this.close());
    shadow.querySelector('.jp-qs-backdrop').addEventListener('click', (e) => {
      if (e.target.classList.contains('jp-qs-backdrop')) this.close();
    });

    // Tag gợi ý
    shadow.querySelectorAll('.jp-qs-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const query = tag.getAttribute('data-query');
        this.input.value = query;
        this.performSearch(query);
      });
    });

    // Gõ tìm kiếm
    this.input.addEventListener('input', () => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.performSearch(this.input.value.trim());
      }, 150);
    });

    // Phím Enter trong ô tìm kiếm để phát âm từ đầu tiên
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
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
   * Bắt phím tắt mở Palette (Alt + S hoặc Ctrl + Shift + F)
   */
  initKeyListeners() {
    window.addEventListener('keydown', (e) => {
      if ((e.altKey && (e.key === 's' || e.key === 'S')) || 
          (e.ctrlKey && e.shiftKey && (e.key === 'f' || e.key === 'F'))) {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      } else if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    }, true);
  }

  /**
   * Mở hoặc đóng Palette (có debounce chống nhảy double-toggle)
   */
  toggle() {
    const now = Date.now();
    if (this._lastToggleTime && now - this._lastToggleTime < 280) {
      return;
    }
    this._lastToggleTime = now;

    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (!this.ensureDOM()) return;
    this.container.style.display = 'block';
    this.container.style.pointerEvents = 'auto';
    this.isOpen = true;
    setTimeout(() => {
      if (this.input) {
        this.input.focus();
        this.input.select();
      }
    }, 50);
  }

  close() {
    if (this.container) {
      this.container.style.display = 'none';
      this.container.style.pointerEvents = 'none';
    }
    this.isOpen = false;
  }

  /**
   * Thực hiện tra cứu thời gian thực
   */
  performSearch(query) {
    if (!query) {
      this.resultsContainer.innerHTML = `
        <div class="jp-qs-empty">
          <div style="font-size:32px;margin-bottom:8px;">🔍</div>
          Gõ từ vựng tiếng Nhật, Romaji hoặc nghĩa tiếng Việt để bắt đầu tra cứu nhanh...
        </div>
      `;
      return;
    }

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

    // 3. Tìm trong Kanji Hán-Việt
    let kanjiMatch = null;
    if (typeof KANJI_DATA !== 'undefined' && KANJI_DATA[query]) {
      kanjiMatch = { char: query, ...KANJI_DATA[query] };
    }

    if (matches.length === 0 && !kanjiMatch) {
      this.resultsContainer.innerHTML = `
        <div class="jp-qs-empty">
          <div style="font-size: 32px; margin-bottom: 8px;">🤔</div>
          Không tìm thấy từ "<strong>${this.escapeHtml(query)}</strong>" trong từ điển có sẵn.<br/>
          <small style="color: #64748b; font-size: 12px; margin-top: 6px; display: inline-block;">
            Bạn có thể bôi đen từ trên trang web để dịch trực tuyến hoặc tra từ điển chi tiết.
          </small>
        </div>
      `;
      return;
    }

    let html = '';

    // Render chữ Kanji nếu khớp
    if (kanjiMatch) {
      const hv = Array.isArray(kanjiMatch.hv || kanjiMatch.hanviet)
        ? (kanjiMatch.hv || kanjiMatch.hanviet).join(', ')
        : (kanjiMatch.hv || kanjiMatch.hanviet || '');
      const on = Array.isArray(kanjiMatch.on)
        ? kanjiMatch.on.join(', ')
        : (kanjiMatch.on || '');
      const kun = Array.isArray(kanjiMatch.kun)
        ? kanjiMatch.kun.join(', ')
        : (kanjiMatch.kun || '');
      const m = kanjiMatch.m || '';

      html += `
        <div class="jp-qs-card jp-qs-kanji-card">
          <div class="jp-qs-kanji-header">
            <span class="jp-qs-kanji-big">${this.escapeHtml(kanjiMatch.char)}</span>
            <div class="jp-qs-kanji-info">
              <div class="jp-qs-kanji-hv">${this.escapeHtml(hv)}</div>
              <div class="jp-qs-kanji-readings">
                ${on ? `<span class="tag-on">On: ${this.escapeHtml(on)}</span>` : ''}
                ${kun ? `<span class="tag-kun">Kun: ${this.escapeHtml(kun)}</span>` : ''}
                ${kanjiMatch.level ? `<span class="tag-jlpt">${this.escapeHtml(kanjiMatch.level)}</span>` : ''}
              </div>
              ${m ? `<div class="jp-qs-kanji-meaning">${this.escapeHtml(m)}</div>` : ''}
            </div>
            <button class="jp-qs-stroke-btn" data-kanji="${this.escapeHtml(kanjiMatch.char)}" title="Xem thứ tự nét viết chữ [${this.escapeHtml(kanjiMatch.char)}]">✍️ Xem nét</button>
          </div>
        </div>
      `;
    }

    // Render danh sách từ vựng
    matches.forEach(item => {
      const romaji = typeof toRomaji === 'function' ? toRomaji(item.r || '') : '';
      html += `
        <div class="jp-qs-card" data-word="${this.escapeHtml(item.word)}" data-reading="${this.escapeHtml(item.r || '')}" data-meaning="${this.escapeHtml(item.m || '')}" title="Bấm vào thẻ để sao chép từ">
          <div class="jp-qs-card-left">
            <div class="jp-qs-word-title">
              <span class="jp-qs-vocab">${this.escapeHtml(item.word)}</span>
              <span class="jp-qs-reading">${this.escapeHtml(item.r || '')}</span>
              ${romaji ? `<span class="jp-qs-romaji">${this.escapeHtml(romaji)}</span>` : ''}
            </div>
            <div class="jp-qs-meaning">${this.escapeHtml(item.m || '')}</div>
            ${item.t ? `<div class="jp-qs-type-badge">${this.escapeHtml(item.t)}</div>` : ''}
          </div>
          <div class="jp-qs-actions">
            <button class="jp-qs-action-btn btn-speak" title="Phát âm tiếng Nhật">🔊</button>
            <button class="jp-qs-action-btn btn-save" title="Lưu vào Sổ tay từ vựng">⭐</button>
            <button class="jp-qs-action-btn btn-anki" title="Thêm vào Anki (Desktop)">📥 Anki</button>
          </div>
        </div>
      `;
    });

    this.resultsContainer.innerHTML = html;

    // Gắn sự kiện sao chép từ khi click vào card
    this.resultsContainer.querySelectorAll('.jp-qs-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.jp-qs-actions') || e.target.closest('.jp-qs-stroke-btn')) return;
        const word = card.getAttribute('data-word');
        if (word && navigator.clipboard) {
          navigator.clipboard.writeText(word).catch(() => {});
          const vocabEl = card.querySelector('.jp-qs-vocab');
          if (vocabEl) {
            const orig = vocabEl.textContent;
            vocabEl.textContent = 'Đã sao chép! 📋';
            setTimeout(() => { vocabEl.textContent = orig; }, 1200);
          }
        }
      });
    });

    // Gắn sự kiện phát âm
    this.resultsContainer.querySelectorAll('.btn-speak').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = e.target.closest('.jp-qs-card');
        const word = card.getAttribute('data-word');
        const reading = card.getAttribute('data-reading');
        const speakText = (reading && !/[一-龯]/.test(reading)) ? reading : word;
        const speaker = window.japaneseAudio || (typeof japaneseAudio !== 'undefined' ? japaneseAudio : null) || (typeof japaneseEngine !== 'undefined' ? japaneseEngine : null);
        if (speaker && speaker.speak) {
          speaker.speak(speakText);
        }
      });
    });

    // Gắn sự kiện lưu vào Sổ tay
    this.resultsContainer.querySelectorAll('.btn-save').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const card = e.target.closest('.jp-qs-card');
        const word = card.getAttribute('data-word');
        const reading = card.getAttribute('data-reading');
        const meaning = card.getAttribute('data-meaning');
        const saveFn = window.saveWordToNotebook || (typeof saveWordToNotebook === 'function' ? saveWordToNotebook : null);
        if (saveFn) {
          await saveFn({ word, reading, meaning });
          btn.textContent = '✅';
          btn.style.color = '#10b981';
          setTimeout(() => {
            btn.textContent = '⭐';
            btn.style.color = '';
          }, 2000);
        }
      });
    });

    // Gắn sự kiện thêm vào Anki
    this.resultsContainer.querySelectorAll('.btn-anki').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const card = e.target.closest('.jp-qs-card');
        const word = card.getAttribute('data-word');
        const reading = card.getAttribute('data-reading');
        const meaning = card.getAttribute('data-meaning');
        btn.textContent = '⏳';
        try {
          const client = window.ankiConnect || (typeof ankiConnect !== 'undefined' ? ankiConnect : null);
          if (client) {
            await client.addWordNote({ word, reading, meaning });
            btn.textContent = '✅ Anki';
            btn.style.color = '#10b981';
            setTimeout(() => {
              btn.textContent = '📥 Anki';
              btn.style.color = '';
            }, 2500);
          } else {
            alert('Không tìm thấy AnkiConnect. Hãy khởi động Anki Desktop.');
            btn.textContent = '📥 Anki';
          }
        } catch (err) {
          alert('Lỗi AnkiConnect: ' + err.message);
          btn.textContent = '❌ Lỗi';
          setTimeout(() => {
            btn.textContent = '📥 Anki';
          }, 2500);
        }
      });
    });

    // Gắn sự kiện xem nét viết Kanji
    this.resultsContainer.querySelectorAll('.jp-qs-stroke-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const char = e.target.getAttribute('data-kanji');
        if (window.__JP_OPEN_STROKE_MODAL) {
          window.__JP_OPEN_STROKE_MODAL(char);
        }
      });
    });
  }

  /**
   * Toàn bộ CSS đóng gói nội tuyến bên trong Shadow DOM
   */
  getStyles() {
    return `
      :host {
        all: initial;
        display: block;
      }
      *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif;
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
        padding-top: 10vh;
        z-index: 2147483646;
        pointer-events: auto;
        user-select: none;
        -webkit-user-select: none;
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
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(30, 41, 59, 0.4);
      }

      .jp-qs-icon {
        font-size: 20px;
        display: flex;
        align-items: center;
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
        transition: all 0.15s ease;
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
        transition: all 0.15s ease;
      }

      .jp-qs-tag:hover {
        background: #38bdf8;
        color: #0f172a;
      }

      .jp-qs-results {
        flex: 1;
        overflow-y: auto;
        padding: 14px 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 55vh;
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
        cursor: pointer;
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
