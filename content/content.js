// Content Script chính - Xử lý bắt vị trí chuột, nhận diện từ tiếng Nhật, hiển thị Tooltip & Sổ tay từ vựng

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
            hideTooltip(true);
            hideSelectionBadge();
            hideSentenceCard();
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
    if (!host) {
      host = document.createElement('div');
      host.id = 'jp-hover-extension-root';
      document.documentElement.appendChild(host);
    }

    shadowRoot = host.attachShadow({ mode: 'open' });

    // Nạp CSS bằng thẻ <link> (chuẩn MV3, không bị chặn bởi connect-src CSP)
    const linkElem = document.createElement('link');
    linkElem.rel = 'stylesheet';
    linkElem.href = (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL)
      ? chrome.runtime.getURL('content/tooltip.css')
      : 'content/tooltip.css';
    shadowRoot.appendChild(linkElem);

    // Kèm style dự phòng toàn diện để không bao giờ bị vỡ giao diện
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

    // Bắt sự kiện click nút dịch câu bôi đen
    selectionBadge.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      e.preventDefault();
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

    // Phát âm audio với animation sóng âm thanh
    const audioBtn = cardElem.querySelector('#jp-audio-btn');
    audioBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const speakText = currentReading || currentWord;
      if (speakText) {
        japaneseEngine.speak(
          speakText,
          settings.speechRate || 0.95,
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
            status: 'learning',
            savedAt: Date.now()
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

  // 3. Hiển thị thông tin lên Tooltip
  function showTooltip(data, mouseX, mouseY, wordRange = null) {
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
          <button class="jp-kanji-lookup-btn" data-kanji="${k.char}" title="Tra cứu chi tiết chữ [${k.char}] trên Mazii">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        `;
        kanjiGrid.appendChild(kCard);
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
      japaneseEngine.speak(
        currentReading || targetWord,
        settings.speechRate || 0.95,
        () => audioBtn && audioBtn.classList.add('playing'),
        () => audioBtn && audioBtn.classList.remove('playing')
      );
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
            meaningText.innerHTML = `${onlineRes.meaning} <span class="jp-online-tag">🌐 Trực tuyến</span>`;
            meaningBox.style.display = 'flex';
          }
          if (onlineRes.reading && onlineRes.reading !== targetWord && (!data.reading || data.reading === targetWord)) {
            currentReading = onlineRes.reading;
            readingElem.textContent = onlineRes.reading;
            readingElem.style.display = 'inline';
          }
          if (onlineRes.synonyms && onlineRes.synonyms.length > 0) {
            synonymsRow.innerHTML = '<span>Đồng nghĩa:</span> ' + onlineRes.synonyms.map(s => `<span class="jp-synonym-pill">${s}</span>`).join(' ');
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
      <div style="font-size:15px;font-weight:bold;color:#ffffff;line-height:1.4;margin-top:4px;">${text}</div>
      <div id="jp-sentence-meaning" style="font-size:13.5px;color:#e2e8f0;background:rgba(255,255,255,0.06);padding:10px 12px;border-radius:8px;line-height:1.45;border-left:3px solid #38bdf8;">
        Đang dịch câu qua API ngoài...
      </div>
    `;

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
        settings.speechRate || 0.95,
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

  function isMouseInTooltipBuffer(clientX, clientY) {
    if (!cardElem || !cardElem.classList.contains('visible')) return false;
    const rect = cardElem.getBoundingClientRect();
    const buffer = 18;
    return (
      clientX >= rect.left - buffer &&
      clientX <= rect.right + buffer &&
      clientY >= rect.top - buffer &&
      clientY <= rect.bottom + buffer
    );
  }

  // 8. Bắt sự kiện chuột
  function handleMouseDown(e) {
    const path = e.composedPath ? e.composedPath() : [];
    const insideCard = path.some(el => el === cardElem || el === sentenceCard || el === selectionBadge);
    if (insideCard) {
      cancelHideSchedule();
      return;
    }

    // Click ra ngoài sentence card → đóng ngay
    if (sentenceCard && sentenceCard.classList.contains('visible')) {
      hideSentenceCard();
    }

    if (isMouseInTooltipBuffer(e.clientX, e.clientY)) {
      cancelHideSchedule();
      return;
    }

    isSelectingOnPage = true;
    if (!isPinned) {
      hideTooltip();
    }
  }

  function handleMouseUp(e) {
    isSelectingOnPage = false;
    if (settings.enableSelectionTranslate === false) return;

    setTimeout(() => {
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

  // 9. Bắt sự kiện di chuột (MouseMove)
  function handleMouseMove(e) {
    if (!settings.enabled) return;
    
    lastHoverPos = { clientX: e.clientX, clientY: e.clientY };

    const path = e.composedPath ? e.composedPath() : [];
    const isOverCard = isMouseOverTooltip || 
                       path.some(el => el === cardElem || el === sentenceCard) ||
                       isMouseInTooltipBuffer(e.clientX, e.clientY);

    if (isOverCard || isPinned) {
      cancelHideSchedule();
      return;
    }

    if (isSelectingOnPage || e.buttons !== 0) {
      if (!isPinned) hideTooltip();
      return;
    }

    // Nếu chuột đang ở trong buffer của tooltip thì chỉ cần hủy hẹn giờ ẩn (KHÔNG return để vẫn hover được từ lân cận)
    if (isMouseInTooltipBuffer(e.clientX, e.clientY)) {
      cancelHideSchedule();
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

  // 10. Xử lý nhận diện ký tự dưới con trỏ & tính Range highlight
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
      let wordIndex = -1;
      try {
        wordIndex = text.indexOf(word, Math.max(0, offset - word.length));
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
    const path = e.composedPath ? e.composedPath() : [];
    if (path.some(el => el === cardElem || el === sentenceCard || el === selectionBadge)) {
      cancelHideSchedule();
      return;
    }
    if (isMouseInTooltipBuffer(e.clientX, e.clientY)) {
      return;
    }
    // Click ra ngoài sentence card → đóng
    if (sentenceCard && sentenceCard.classList.contains('visible')) {
      hideSentenceCard();
    }
    if (!isPinned) {
      if (cardElem && cardElem.classList.contains('visible')) {
        hideTooltip();
      }
    }
  }

  // 11. Phím tắt toàn cục Alt+J
  function handleKeyDown(e) {
    if (e.altKey && (e.key === 'j' || e.key === 'J' || e.code === 'KeyJ')) {
      // Khi đang chạy trong môi trường Chrome Extension, Background Service Worker (chrome.commands) sẽ xử lý
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id) {
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

  // CSS dự phòng toàn diện (hoạt động 100% kể cả khi CSP trang web chặn file ngoài)
  function getDefaultCss() {
    return `
      :host { all: initial; z-index: 2147483647; position: absolute; top: 0; left: 0; pointer-events: none; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", "Hiragino Kaku Gothic ProN", Meiryo, "Yu Gothic", "Noto Sans JP", sans-serif; }
      .jp-card { position: fixed; pointer-events: auto; min-width: 250px; max-width: 380px; background: rgba(15, 23, 42, 0.96); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.14); box-shadow: 0 20px 45px -5px rgba(0, 0, 0, 0.75); border-radius: 14px; padding: 14px 16px; color: #f8fafc; opacity: 0; visibility: hidden; transform: translateY(6px) scale(0.97); transition: opacity 0.2s, transform 0.2s, visibility 0.2s; display: flex; flex-direction: column; gap: 10px; user-select: text !important; }
      .jp-card.visible { opacity: 1; visibility: visible; transform: translateY(0) scale(1); }
      .jp-card.pinned { border-color: #38bdf8; box-shadow: 0 20px 45px -5px rgba(0,0,0,0.85), 0 0 0 1px #38bdf8; }
      .jp-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 8px; }
      .jp-word-box { display: flex; flex-direction: column; gap: 2px; }
      .jp-reading-row { display: flex; align-items: center; gap: 6px; }
      .jp-reading { font-size: 13.5px; font-weight: 600; color: #38bdf8; }
      .jp-pitch-badge { background: rgba(236, 72, 153, 0.2); color: #f472b6; border: 1px solid rgba(236, 72, 153, 0.4); font-size: 10px; font-weight: 700; padding: 1px 5px; border-radius: 4px; }
      .jp-main-word { font-size: 22px; font-weight: 700; color: #ffffff; line-height: 1.2; }
      .jp-actions { display: flex; align-items: center; gap: 5px; flex-shrink: 0; margin-top: 2px; }
      .jp-icon-btn { background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); color: #94a3b8; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; transition: all 0.2s ease; font-size: 12px; }
      .jp-icon-btn:hover { background: rgba(56, 189, 248, 0.2); color: #38bdf8; border-color: #38bdf8; transform: scale(1.08); }
      .jp-icon-btn.active { background: #38bdf8; color: #0f172a; border-color: #38bdf8; }
      .jp-audio-btn { background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.35); color: #38bdf8; }
      .jp-audio-btn svg { width: 14px; height: 14px; fill: currentColor; }
      .jp-tags-row { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
      .jp-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; }
      .jp-badge-romaji { background: rgba(99, 102, 241, 0.2); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.35); }
      .jp-badge-hanviet { background: rgba(245, 158, 11, 0.2); color: #fcd34d; border: 1px solid rgba(245, 158, 11, 0.35); }
      .jp-badge-onkun { background: rgba(236, 72, 153, 0.2); color: #f472b6; border: 1px solid rgba(236, 72, 153, 0.35); }
      .jp-badge-type { background: rgba(16, 185, 129, 0.2); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.35); }
      .jp-meaning-container { display: flex; flex-direction: column; gap: 6px; }
      .jp-meaning-box { display: flex; align-items: flex-start; gap: 8px; background: rgba(255, 255, 255, 0.05); padding: 8px 12px; border-radius: 8px; font-size: 13px; line-height: 1.45; color: #f1f5f9; border-left: 3px solid #38bdf8; }
      .jp-synonyms-row { display: flex; flex-wrap: wrap; gap: 6px; font-size: 11.5px; color: #94a3b8; }
      .jp-synonym-pill { background: rgba(255, 255, 255, 0.08); padding: 2px 7px; border-radius: 12px; color: #cbd5e1; }
      .jp-grammar-panel { display: flex; flex-direction: column; gap: 5px; background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 6px 10px; font-size: 11px; color: #cbd5e1; }
      .jp-kanji-section { display: flex; flex-direction: column; gap: 8px; }
      .jp-kanji-heading { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
      .jp-kanji-grid { display: flex; flex-direction: column; gap: 6px; max-height: 180px; overflow-y: auto; }
      .jp-kanji-card { display: flex; align-items: center; gap: 10px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 6px 10px; }
      .jp-kanji-char { font-size: 22px; font-weight: 700; color: #ffffff; min-width: 28px; text-align: center; }
      .jp-kanji-info { display: flex; flex-direction: column; gap: 2px; flex: 1; }
      .jp-kanji-meta { display: flex; align-items: baseline; gap: 6px; }
      .jp-kanji-hv-name { font-weight: 700; color: #fcd34d; font-size: 11px; }
      .jp-kanji-onkun { color: #94a3b8; font-size: 10px; }
      .jp-kanji-desc { color: #cbd5e1; font-size: 10.5px; }
      .jp-kanji-lookup-btn { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #94a3b8; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
      .jp-footer { display: flex; align-items: center; justify-content: space-between; font-size: 10px; color: #94a3b8; padding-top: 4px; border-top: 1px dashed rgba(255, 255, 255, 0.08); }
      .jp-kbd { background: rgba(255, 255, 255, 0.1); padding: 1px 5px; border-radius: 4px; border: 1px solid rgba(255, 255, 255, 0.15); font-size: 9.5px; color: #cbd5e1; }
      .jp-highlight-overlay { position: fixed; pointer-events: none; background: rgba(56, 189, 248, 0.22); border: 1.5px solid #38bdf8; border-radius: 4px; box-shadow: 0 0 10px rgba(56, 189, 248, 0.45); z-index: 2147483646; display: none; }
      .jp-highlight-overlay.active { display: block; }
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
