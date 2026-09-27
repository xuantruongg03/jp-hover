// Content Script chính - Xử lý bắt vị trí chuột, nhận diện từ tiếng Nhật & hiển thị Tooltip

(function () {
  // Tránh inject trùng lặp
  if (window.__JP_HOVER_EXTENSION_INJECTED__) return;
  window.__JP_HOVER_EXTENSION_INJECTED__ = true;

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
    autoPlayAudio: false,
    speechRate: 0.95
  };

  // Trạng thái hiện tại
  let currentWord = null;
  let currentReading = null;
  let isMouseOverTooltip = false;
  let isPinned = false;
  let isSelectingOnPage = false;
  let scanExtend = 0; // Số từ mở rộng sang phải khi nhấn phím D
  let lastHoverPos = { clientX: 0, clientY: 0 };
  let debounceTimer = null;
  let hideDelayTimer = null;
  let activeAbortController = null; // Quản lý hủy API khi người dùng di chuột đi nơi khác
  let shadowRoot = null;
  let cardElem = null;
  let highlightOverlay = null;

  // 1. Tải cài đặt từ chrome.storage
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['jpSettings'], (res) => {
      if (res && res.jpSettings) {
        settings = { ...settings, ...res.jpSettings };
      }
    });

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes.jpSettings) {
        settings = { ...settings, ...changes.jpSettings.newValue };
        if (!settings.enabled) {
          hideTooltip(true);
        }
      }
    });
  }

  // 2. Khởi tạo Shadow DOM UI để cô lập hoàn toàn với trang web
  function initShadowDOM() {
    let host = document.getElementById('jp-hover-extension-root');
    if (!host) {
      host = document.createElement('div');
      host.id = 'jp-hover-extension-root';
      document.documentElement.appendChild(host);
    }

    shadowRoot = host.attachShadow({ mode: 'open' });

    // Nạp CSS từ file hoặc fallback
    const styleElem = document.createElement('style');
    const cssUrl = (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL) 
      ? chrome.runtime.getURL('content/tooltip.css') 
      : 'content/tooltip.css';
    
    if (cssUrl) {
      fetch(cssUrl)
        .then(r => r.text())
        .then(css => {
          styleElem.textContent = css;
          shadowRoot.appendChild(styleElem);
        })
        .catch(() => {
          styleElem.textContent = getDefaultCss();
          shadowRoot.appendChild(styleElem);
        });
    } else {
      styleElem.textContent = getDefaultCss();
      shadowRoot.appendChild(styleElem);
    }

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
          <button class="jp-icon-btn jp-audio-btn" id="jp-audio-btn" title="Phát âm tiếng Nhật">
            <svg viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </button>
          <button class="jp-icon-btn jp-lookup-btn" id="jp-lookup-btn" title="Tra cứu từ điển chi tiết (Mazii)">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
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
        <div class="jp-grammar-row" id="jp-grammar-form-row">
          <span class="jp-grammar-label">🏷️ Ngữ pháp:</span>
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
        <span>🇯🇵 Phiên âm tiếng Nhật</span>
        <div class="jp-shortcut-hint">
          <span>Phím:</span>
          <span class="jp-kbd">Alt+J</span>
          <span class="jp-kbd" title="Nhấn D để mở rộng cụm từ">D: Mở rộng</span>
        </div>
      </div>
    `;

    shadowRoot.appendChild(cardElem);

    // Cho phép bôi đen chọn text thoải mái bên trong Card
    cardElem.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      cancelHideSchedule();
    });

    // Phát âm audio (ưu tiên phát âm theo cách đọc Hiragana để không bị đọc nhầm sang âm On mặc định của Kanji)
    const audioBtn = cardElem.querySelector('#jp-audio-btn');
    audioBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const speakText = currentReading || currentWord;
      if (speakText) {
        japaneseEngine.speak(speakText, settings.speechRate || 0.95);
      }
    });

    // Nút Kính lúp tra cứu từ điển trực tuyến (Mazii)
    const lookupBtn = cardElem.querySelector('#jp-lookup-btn');
    lookupBtn.addEventListener('click', (e) => {
      e.stopPropagation();
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

  // 3. Hiển thị thông tin lên Tooltip (Offline ngay lập tức + Online Fallback bất đồng bộ)
  function showTooltip(data, mouseX, mouseY, wordRange = null) {
    if (!cardElem || !shadowRoot) return;

    cancelHideSchedule();

    const targetWord = data.word;
    currentWord = targetWord;
    currentReading = data.reading || targetWord;

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
    
    if (settings.showReading && data.reading && data.reading !== targetWord) {
      readingElem.textContent = data.reading;
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
    const grammarPosVal = cardElem.querySelector('#jp-grammar-pos-val');
    const ruleBox = cardElem.querySelector('#jp-rule-box');

    let hasGrammarContent = false;
    const grammarParts = [];

    if (data.type) grammarParts.push(data.type);
    if (data.grammarForm && data.grammarForm !== 'Nguyên mẫu (辞書形)') {
      grammarParts.push(`Thể: ${data.grammarForm}`);
    }
    if (data.grammarTags && data.grammarTags.length > 0) {
      grammarParts.push(...data.grammarTags);
    }

    if (grammarParts.length > 0) {
      grammarPosVal.textContent = grammarParts.join(' • ');
      hasGrammarContent = true;
    }

    if (data.onKunRule && data.onKunRule.rule) {
      ruleBox.innerHTML = `💡 <strong>Quy tắc âm đọc:</strong> ${data.onKunRule.rule}`;
      ruleBox.style.display = 'block';
      hasGrammarContent = true;
    } else {
      ruleBox.style.display = 'none';
    }

    grammarPanel.style.display = hasGrammarContent ? 'flex' : 'none';

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
          <div class="jp-kanji-char">${k.char}</div>
          <div class="jp-kanji-info">
            <div class="jp-kanji-meta">
              <span class="jp-kanji-hv-name">${k.hv}</span>
              <span class="jp-kanji-onkun">On: ${k.on || '—'} | Kun: ${k.kun || '—'}</span>
            </div>
            <div class="jp-kanji-desc">${k.m}</div>
          </div>
          <button class="jp-kanji-lookup-btn" data-kanji="${k.char}" title="Tra cứu chi tiết chữ [${k.char}] (cách viết nét, bộ thủ, ví dụ) trên Mazii">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        `;
        kanjiGrid.appendChild(kCard);
      });

      // Bắt sự kiện bấm nút kính lúp của từng chữ Kanji
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
      japaneseEngine.speak(currentReading || targetWord, settings.speechRate || 0.95);
    }

    // 8. Kích hoạt Online Fallback API nếu offline thiếu nghĩa hoặc để bổ sung từ đồng nghĩa
    // Tự động HỦY (Abort) nếu người dùng di chuyển chuột sang từ khác
    if (settings.enableOnlineFallback && (!data.hasOfflineMeaning || !data.meaning)) {
      if (activeAbortController) {
        activeAbortController.abort(); // Hủy request cũ ngay lập tức
      }
      activeAbortController = new AbortController();
      const signal = activeAbortController.signal;

      japaneseEngine.fetchOnlineData(targetWord, signal).then(onlineRes => {
        // Chỉ cập nhật nếu người dùng VẪN ĐANG HOVER vào đúng từ này
        if (onlineRes && currentWord === targetWord && cardElem.classList.contains('visible')) {
          if (onlineRes.meaning) {
            meaningText.innerHTML = `${onlineRes.meaning} <span class="jp-online-tag">🌐 Trực tuyến</span>`;
            meaningBox.style.display = 'flex';
          }
          if (onlineRes.synonyms && onlineRes.synonyms.length > 0) {
            synonymsRow.innerHTML = '<span>Đồng nghĩa:</span> ' + onlineRes.synonyms.map(s => `<span class="jp-synonym-pill">${s}</span>`).join(' ');
            synonymsRow.style.display = 'flex';
          }
        }
      }).catch(() => {
        // Request bị hủy hoặc lỗi mạng -> không làm phiền UI
      });
    }
  }

  // 4. Vẽ lớp Visual Highlight dạ quang bao quanh từ trên trang web
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

  // 5. Định vị Tooltip thông minh
  function positionTooltip(mouseX, mouseY) {
    const cardRect = cardElem.getBoundingClientRect();
    const tooltipWidth = cardRect.width || 280;
    const tooltipHeight = cardRect.height || 180;
    const padding = 16;

    let left = mouseX + 12;
    let top = mouseY + 16;

    if (left + tooltipWidth > window.innerWidth - padding) {
      left = mouseX - tooltipWidth - 12;
    }
    if (left < padding) {
      left = padding;
    }
    if (top + tooltipHeight > window.innerHeight - padding) {
      top = mouseY - tooltipHeight - 16;
    }
    if (top < padding) {
      top = padding;
    }

    cardElem.style.left = `${left}px`;
    cardElem.style.top = `${top}px`;
  }

  // 6. Quản lý ẩn Tooltip có độ trễ (Grace Period)
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
    
    // Hủy request API đang chạy nếu có
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

  function isMouseInTooltipBuffer(clientX, clientY) {
    if (!cardElem || !cardElem.classList.contains('visible')) return false;
    const rect = cardElem.getBoundingClientRect();
    const buffer = 20;
    return (
      clientX >= rect.left - buffer &&
      clientX <= rect.right + buffer &&
      clientY >= rect.top - buffer &&
      clientY <= rect.bottom + buffer
    );
  }

  // 7. Bắt sự kiện nhấn chuột để phân biệt khi người dùng đang BÔI ĐEN (Select text)
  function handleMouseDown(e) {
    if (!isMouseOverTooltip && !isMouseInTooltipBuffer(e.clientX, e.clientY)) {
      isSelectingOnPage = true;
      if (!isPinned) {
        hideTooltip();
      }
    }
  }

  function handleMouseUp() {
    isSelectingOnPage = false;
  }

  // 8. Bắt sự kiện di chuột (MouseMove)
  function handleMouseMove(e) {
    if (!settings.enabled) return;
    
    lastHoverPos = { clientX: e.clientX, clientY: e.clientY };

    if (isSelectingOnPage || e.buttons !== 0) {
      if (!isPinned) hideTooltip();
      return;
    }

    if (isMouseOverTooltip || isPinned) {
      cancelHideSchedule();
      return;
    }

    if (isMouseInTooltipBuffer(e.clientX, e.clientY)) {
      cancelHideSchedule();
      return;
    }

    if (settings.activationMode === 'shift' && !e.shiftKey) {
      scheduleHide(200);
      return;
    }
    if (settings.activationMode === 'alt' && !e.altKey) {
      scheduleHide(200);
      return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      processHover(e.clientX, e.clientY);
    }, 45);
  }

  // 9. Xử lý nhận diện ký tự dưới con trỏ & tính Range highlight
  function processHover(clientX, clientY) {
    if (isMouseOverTooltip || isPinned || isSelectingOnPage) return;

    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      return;
    }

    let textNode = null;
    let offset = 0;
    let wordRange = null;

    if (document.caretPositionFromPoint) {
      const pos = document.caretPositionFromPoint(clientX, clientY);
      if (pos && pos.offsetNode && pos.offsetNode.nodeType === Node.TEXT_NODE) {
        textNode = pos.offsetNode;
        offset = pos.offset;
      }
    } else if (document.caretRangeFromPoint) {
      const range = document.caretRangeFromPoint(clientX, clientY);
      if (range && range.startContainer && range.startContainer.nodeType === Node.TEXT_NODE) {
        textNode = range.startContainer;
        offset = range.startOffset;
      }
    }

    if (!textNode) {
      scheduleHide(300);
      return;
    }

    const text = textNode.nodeValue;
    if (!text) {
      scheduleHide(300);
      return;
    }

    // Tách từ tiếng Nhật tại offset
    const word = japaneseEngine.getWordAtOffset(text, offset, scanExtend);

    if (word) {
      // Tạo range chính xác để vẽ highlight
      try {
        const wordIndex = text.indexOf(word, Math.max(0, offset - word.length));
        if (wordIndex !== -1) {
          wordRange = document.createRange();
          wordRange.setStart(textNode, wordIndex);
          wordRange.setEnd(textNode, wordIndex + word.length);
        }
      } catch (_) {}

      if (word === currentWord) {
        cancelHideSchedule();
        if (wordRange) updateVisualHighlight(wordRange);
        return;
      }

      // Hủy API request của từ trước nếu có
      if (activeAbortController) {
        activeAbortController.abort();
        activeAbortController = null;
      }

      // Tự động nhận diện Furigana trong ngoặc đơn bên cạnh từ (Ví dụ: 大 (おお) きい, 会社 (かいしゃ)) hoặc thẻ <ruby>
      let inlineFurigana = '';
      try {
        const afterText = text.slice(offset);
        const matchParen = afterText.match(/^[^\(（]*[\(（]([\u3040-\u309F\u30A0-\u30FFー]+)[\)）]/);
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
        // BẢO ĐẢM TUYỆT ĐỐI: data.word luôn giữ nguyên ký tự tiếng Nhật gốc
        analyzed.word = word;

        // Nếu phát hiện Furigana trong ngoặc từ chính trang web, chỉ cập nhật reading/romaji, KHÔNG BAO GIỜ đổi data.word
        if (inlineFurigana && isJapaneseText(inlineFurigana)) {
          analyzed.reading = inlineFurigana;
          if (typeof toRomaji === 'function') {
            analyzed.romaji = toRomaji(inlineFurigana);
          }
        }

        showTooltip(analyzed, clientX, clientY, wordRange);
        return;
      }
    }

    scheduleHide(300);
  }

  function handleDocumentClick(e) {
    if (!cardElem || !cardElem.classList.contains('visible')) return;
    if (!isMouseInTooltipBuffer(e.clientX, e.clientY) && !isPinned) {
      hideTooltip();
    }
  }

  // 10. Phím tắt điều hướng mở rộng từ ghép (D để mở rộng, A để thu hẹp)
  function handleScanShortcuts(e) {
    // Chỉ xử lý khi đang hiển thị popup và không gõ trong input/textarea
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTag === 'input' || activeTag === 'textarea') return;

    if (cardElem && cardElem.classList.contains('visible')) {
      if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        scanExtend = Math.min(4, scanExtend + 1); // Mở rộng thêm 1 từ sang phải
        processHover(lastHoverPos.clientX, lastHoverPos.clientY);
      } else if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        scanExtend = Math.max(0, scanExtend - 1); // Thu hẹp lại
        processHover(lastHoverPos.clientX, lastHoverPos.clientY);
      }
    }
  }

  // Phím tắt toàn cục Alt+J dự phòng
  function handleKeyDown(e) {
    handleScanShortcuts(e);

    if (e.altKey && (e.key === 'j' || e.key === 'J' || e.code === 'KeyJ')) {
      const isExtension = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id && typeof chrome.commands !== 'undefined';
      if (isExtension) {
        return;
      }

      e.preventDefault();
      settings.enabled = !settings.enabled;
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ jpSettings: settings });
      }
      if (!settings.enabled) {
        hideTooltip(true);
      }
      showToast(settings.enabled ? '🟢 Đã BẬT phiên âm tiếng Nhật (Alt+J)' : '⚪ Đã TẮT phiên âm tiếng Nhật (Alt+J)');
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
        if (!settings.enabled) hideTooltip(true);
        showToast(settings.enabled ? '🟢 Đã BẬT phiên âm tiếng Nhật (Alt+J)' : '⚪ Đã TẮT phiên âm tiếng Nhật (Alt+J)');
        sendResponse({ enabled: settings.enabled });
      } else if (msg.action === 'GET_STATUS') {
        sendResponse({ enabled: settings.enabled });
      }
    });
  }

  // CSS dự phòng
  function getDefaultCss() {
    return `
      .jp-card {
        position: fixed;
        background: rgba(15, 23, 42, 0.96);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 12px;
        padding: 12px 16px;
        color: #fff;
        font-family: sans-serif;
        z-index: 2147483647;
        opacity: 0;
        transition: opacity 0.2s;
      }
      .jp-card.visible { opacity: 1; }
      .jp-reading { color: #38bdf8; font-size: 13px; font-weight: bold; }
      .jp-main-word { font-size: 20px; font-weight: bold; }
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
