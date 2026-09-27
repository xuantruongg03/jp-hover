// Logic tương tác Popup Extension, Sổ tay từ vựng & Live Playground

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements - Navigation
  const tabBtnSettings = document.getElementById('tab-btn-settings');
  const tabBtnNotebook = document.getElementById('tab-btn-notebook');
  const paneSettings = document.getElementById('pane-settings');
  const paneNotebook = document.getElementById('pane-notebook');
  const savedCountBadge = document.getElementById('saved-count-badge');

  // DOM Elements - Settings
  const masterToggle = document.getElementById('master-toggle');
  const statusDot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');

  const activationRadios = document.querySelectorAll('input[name="activation-mode"]');
  const optReading = document.getElementById('opt-reading');
  const optRomaji = document.getElementById('opt-romaji');
  const optHanviet = document.getElementById('opt-hanviet');
  const optMeaning = document.getElementById('opt-meaning');
  const optKanjiBreakdown = document.getElementById('opt-kanji-breakdown');
  const optPitchAccent = document.getElementById('opt-pitch-accent');
  const optVisualHighlight = document.getElementById('opt-visual-highlight');
  const optSelectionTranslate = document.getElementById('opt-selection-translate');
  const optOnlineFallback = document.getElementById('opt-online-fallback');
  const optAutoAudio = document.getElementById('opt-auto-audio');

  const speedSlider = document.getElementById('speech-rate-slider');
  const speedBadge = document.getElementById('speed-badge');
  const presetButtons = document.querySelectorAll('.preset-btn');

  const testPreview = document.getElementById('test-preview');
  const testWords = document.querySelectorAll('.test-word');

  // DOM Elements - Notebook
  const savedSearchInput = document.getElementById('saved-search-input');
  const exportAnkiBtn = document.getElementById('export-anki-btn');
  const clearSavedBtn = document.getElementById('clear-saved-btn');
  const savedWordsContainer = document.getElementById('saved-words-container');
  const savedEmptyState = document.getElementById('saved-empty-state');

  // Cấu hình mặc định
  let currentSettings = {
    enabled: true,
    activationMode: 'always',
    showReading: true,
    showRomaji: true,
    showHanViet: true,
    showMeaning: true,
    showKanjiBreakdown: true,
    showPitchAccent: true,
    enableVisualHighlight: true,
    enableSelectionTranslate: true,
    enableOnlineFallback: true,
    autoPlayAudio: false,
    speechRate: 0.95
  };

  let savedWordsList = [];

  // 1. Quản lý Tab Navigation
  function switchTab(tabId) {
    if (tabId === 'settings') {
      tabBtnSettings.classList.add('active');
      tabBtnNotebook.classList.remove('active');
      paneSettings.classList.add('active');
      paneNotebook.classList.remove('active');
    } else {
      tabBtnSettings.classList.remove('active');
      tabBtnNotebook.classList.add('active');
      paneSettings.classList.remove('active');
      paneNotebook.classList.add('active');
      loadSavedWords();
    }
  }

  tabBtnSettings.addEventListener('click', () => switchTab('settings'));
  tabBtnNotebook.addEventListener('click', () => switchTab('notebook'));

  // 2. Tải cài đặt hiện tại
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['jpSettings', 'jpSavedWords'], (res) => {
      if (res && res.jpSettings) {
        currentSettings = { ...currentSettings, ...res.jpSettings };
      }
      applySettingsToUI();

      if (res && Array.isArray(res.jpSavedWords)) {
        savedWordsList = res.jpSavedWords;
        updateSavedCountBadge();
      }
    });

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes.jpSavedWords) {
        savedWordsList = changes.jpSavedWords.newValue || [];
        updateSavedCountBadge();
        if (paneNotebook.classList.contains('active')) {
          renderSavedWordsList(savedSearchInput.value);
        }
      }
    });
  } else {
    applySettingsToUI();
  }

  // 3. Cập nhật UI theo dữ liệu settings
  function applySettingsToUI() {
    masterToggle.checked = currentSettings.enabled;
    updateStatusDisplay(currentSettings.enabled);

    activationRadios.forEach(radio => {
      radio.checked = (radio.value === currentSettings.activationMode);
    });

    optReading.checked = currentSettings.showReading !== false;
    optRomaji.checked = currentSettings.showRomaji !== false;
    optHanviet.checked = currentSettings.showHanViet !== false;
    optMeaning.checked = currentSettings.showMeaning !== false;
    optKanjiBreakdown.checked = currentSettings.showKanjiBreakdown !== false;
    optPitchAccent.checked = currentSettings.showPitchAccent !== false;
    optVisualHighlight.checked = currentSettings.enableVisualHighlight !== false;
    if (optSelectionTranslate) {
      optSelectionTranslate.checked = currentSettings.enableSelectionTranslate !== false;
    }
    optOnlineFallback.checked = currentSettings.enableOnlineFallback !== false;
    optAutoAudio.checked = currentSettings.autoPlayAudio === true;

    // Cập nhật tốc độ đọc
    const rate = currentSettings.speechRate || 0.95;
    speedSlider.value = rate;
    updateSpeedBadge(rate);
  }

  // Cập nhật trạng thái hiển thị
  function updateStatusDisplay(enabled) {
    if (enabled) {
      statusDot.classList.remove('disabled');
      statusText.textContent = 'Đang hoạt động';
      statusText.style.color = '#10b981';
    } else {
      statusDot.classList.add('disabled');
      statusText.textContent = 'Đã tắt';
      statusText.style.color = '#64748b';
    }
  }

  function updateSpeedBadge(rate) {
    const num = parseFloat(rate);
    speedBadge.textContent = `${num.toFixed(2)}x`;

    presetButtons.forEach(btn => {
      const btnSpeed = parseFloat(btn.dataset.speed);
      if (Math.abs(btnSpeed - num) < 0.04) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function updateSavedCountBadge() {
    if (savedCountBadge) {
      savedCountBadge.textContent = savedWordsList.length;
    }
  }

  // 4. Lưu cài đặt vào chrome.storage
  function saveSettings() {
    currentSettings = {
      enabled: masterToggle.checked,
      activationMode: document.querySelector('input[name="activation-mode"]:checked')?.value || 'always',
      showReading: optReading.checked,
      showRomaji: optRomaji.checked,
      showHanViet: optHanviet.checked,
      showMeaning: optMeaning.checked,
      showKanjiBreakdown: optKanjiBreakdown.checked,
      showPitchAccent: optPitchAccent.checked,
      enableVisualHighlight: optVisualHighlight.checked,
      enableSelectionTranslate: optSelectionTranslate ? optSelectionTranslate.checked : true,
      enableOnlineFallback: optOnlineFallback.checked,
      autoPlayAudio: optAutoAudio.checked,
      speechRate: parseFloat(speedSlider.value) || 0.95
    };

    updateStatusDisplay(currentSettings.enabled);

    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ jpSettings: currentSettings });
    }
  }

  // Gắn sự kiện thay đổi settings
  masterToggle.addEventListener('change', saveSettings);

  activationRadios.forEach(radio => {
    radio.addEventListener('change', saveSettings);
  });

  optReading.addEventListener('change', saveSettings);
  optRomaji.addEventListener('change', saveSettings);
  optHanviet.addEventListener('change', saveSettings);
  optMeaning.addEventListener('change', saveSettings);
  optKanjiBreakdown.addEventListener('change', saveSettings);
  optPitchAccent.addEventListener('change', saveSettings);
  optVisualHighlight.addEventListener('change', saveSettings);
  if (optSelectionTranslate) {
    optSelectionTranslate.addEventListener('change', saveSettings);
  }
  optOnlineFallback.addEventListener('change', saveSettings);
  optAutoAudio.addEventListener('change', saveSettings);

  speedSlider.addEventListener('input', () => {
    const rate = parseFloat(speedSlider.value);
    updateSpeedBadge(rate);
  });

  speedSlider.addEventListener('change', () => {
    saveSettings();
    if (typeof japaneseEngine !== 'undefined') {
      japaneseEngine.speak('日本語', currentSettings.speechRate);
    }
  });

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const speed = parseFloat(btn.dataset.speed);
      speedSlider.value = speed;
      updateSpeedBadge(speed);
      saveSettings();
      if (typeof japaneseEngine !== 'undefined') {
        japaneseEngine.speak('日本語', speed);
      }
    });
  });

  // 5. Quản lý Sổ tay từ vựng (Vocabulary Notebook)
  function loadSavedWords() {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['jpSavedWords'], (res) => {
        savedWordsList = (res && Array.isArray(res.jpSavedWords)) ? res.jpSavedWords : [];
        updateSavedCountBadge();
        renderSavedWordsList(savedSearchInput.value);
      });
    } else {
      renderSavedWordsList('');
    }
  }

  function renderSavedWordsList(filterQuery = '') {
    const query = (filterQuery || '').trim().toLowerCase();
    const filtered = query
      ? savedWordsList.filter(item => 
          (item.word && item.word.toLowerCase().includes(query)) ||
          (item.reading && item.reading.toLowerCase().includes(query)) ||
          (item.hanviet && item.hanviet.toLowerCase().includes(query)) ||
          (item.meaning && item.meaning.toLowerCase().includes(query))
        )
      : savedWordsList;

    if (!filtered || filtered.length === 0) {
      savedWordsContainer.innerHTML = '';
      savedWordsContainer.style.display = 'none';
      savedEmptyState.style.display = 'flex';
      if (query) {
        savedEmptyState.querySelector('.empty-title').textContent = 'Không tìm thấy kết quả';
        savedEmptyState.querySelector('.empty-desc').textContent = `Không có từ nào khớp với từ khóa "${filterQuery}".`;
      } else {
        savedEmptyState.querySelector('.empty-title').textContent = 'Chưa có từ nào được lưu';
        savedEmptyState.querySelector('.empty-desc').textContent = 'Khi rê chuột tra từ trên bất kỳ trang web nào, hãy bấm nút ⭐ trên tooltip để lưu từ vào đây!';
      }
      return;
    }

    savedEmptyState.style.display = 'none';
    savedWordsContainer.style.display = 'flex';
    savedWordsContainer.innerHTML = '';

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'saved-word-card';

      const readingText = (item.reading && item.reading !== item.word) ? item.reading : '';
      const hvBadge = item.hanviet ? `<span class="saved-word-hv">${item.hanviet}</span>` : '';

      card.innerHTML = `
        <div class="saved-word-top">
          <div class="saved-word-main">
            <span class="saved-word-kanji">${item.word}</span>
            ${readingText ? `<span class="saved-word-reading">${readingText}</span>` : ''}
            ${hvBadge}
          </div>
          <div class="saved-word-actions">
            <button class="saved-item-btn saved-play-btn" title="Nghe phát âm">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
              </svg>
            </button>
            <button class="saved-item-btn saved-del-btn" title="Xóa từ này">✕</button>
          </div>
        </div>
        <div class="saved-word-meaning">${item.meaning || 'Chưa có giải nghĩa'}</div>
      `;

      // Nút audio
      card.querySelector('.saved-play-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof japaneseEngine !== 'undefined') {
          japaneseEngine.speak(item.reading || item.word, currentSettings.speechRate);
        }
      });

      // Nút xóa
      card.querySelector('.saved-del-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteSavedWord(item.word);
      });

      savedWordsContainer.appendChild(card);
    });
  }

  function deleteSavedWord(wordToDelete) {
    savedWordsList = savedWordsList.filter(item => item.word !== wordToDelete);
    updateSavedCountBadge();
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ jpSavedWords: savedWordsList }, () => {
        renderSavedWordsList(savedSearchInput.value);
      });
    } else {
      renderSavedWordsList(savedSearchInput.value);
    }
  }

  // Tìm kiếm thời gian thực
  savedSearchInput.addEventListener('input', () => {
    renderSavedWordsList(savedSearchInput.value);
  });

  // Mở trang Flashcard & Sổ tay toàn màn hình
  const openFlashcardsBtn = document.getElementById('open-flashcards-page-btn');
  if (openFlashcardsBtn) {
    openFlashcardsBtn.addEventListener('click', () => {
      if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.create) {
        chrome.tabs.create({ url: chrome.runtime.getURL('flashcards.html') });
      } else {
        window.open('../flashcards.html', '_blank');
      }
    });
  }

  // Xóa tất cả từ đã lưu
  clearSavedBtn.addEventListener('click', () => {
    if (savedWordsList.length === 0) return;
    if (confirm(`Bạn có chắc chắn muốn xóa toàn bộ ${savedWordsList.length} từ vựng đã lưu không?`)) {
      savedWordsList = [];
      updateSavedCountBadge();
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ jpSavedWords: [] }, () => {
          renderSavedWordsList('');
        });
      } else {
        renderSavedWordsList('');
      }
    }
  });

  // Xuất Anki (CSV)
  exportAnkiBtn.addEventListener('click', () => {
    if (savedWordsList.length === 0) {
      alert('Sổ từ vựng đang trống. Hãy lưu ít nhất 1 từ vựng trước khi xuất Anki!');
      return;
    }

    // Định dạng CSV chuẩn UTF-8 kèm BOM cho Anki/Excel
    let csvContent = '\uFEFF';
    csvContent += 'Từ vựng,Cách đọc,Âm Hán-Việt,Giải nghĩa,Từ loại,Ngày lưu\n';

    savedWordsList.forEach(item => {
      const escapeCsv = (str) => {
        if (!str) return '""';
        return `"${String(str).replace(/"/g, '""')}"`;
      };

      const dateStr = item.savedAt ? new Date(item.savedAt).toLocaleDateString('vi-VN') : '';
      const row = [
        escapeCsv(item.word),
        escapeCsv(item.reading || item.word),
        escapeCsv(item.hanviet || ''),
        escapeCsv(item.meaning || ''),
        escapeCsv(item.type || ''),
        escapeCsv(dateStr)
      ].join(',');

      csvContent += row + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `jp_anki_words_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });

  // 6. Live Playground: Tương tác thử nghiệm từ vựng ngay trong Popup
  testWords.forEach(span => {
    span.addEventListener('mouseenter', () => {
      const text = span.textContent.trim();
      const analyzed = typeof japaneseEngine !== 'undefined' ? japaneseEngine.analyze(text) : null;

      if (analyzed) {
        renderPreview(analyzed);
        if (currentSettings.autoPlayAudio && typeof japaneseEngine !== 'undefined') {
          japaneseEngine.speak(analyzed.reading || text, currentSettings.speechRate);
        }
      }
    });

    span.addEventListener('click', () => {
      const text = span.textContent.trim();
      const analyzed = typeof japaneseEngine !== 'undefined' ? japaneseEngine.analyze(text) : null;
      if (typeof japaneseEngine !== 'undefined') {
        japaneseEngine.speak((analyzed && analyzed.reading) ? analyzed.reading : text, currentSettings.speechRate);
      }
    });
  });

  function renderPreview(data) {
    let tagsHtml = '';
    if (currentSettings.showRomaji && data.romaji) {
      tagsHtml += `<span class="preview-tag-ro">Romaji: ${data.romaji}</span>`;
    }
    if (currentSettings.showHanViet && data.hanviet) {
      tagsHtml += `<span class="preview-tag-hv">Âm HV: ${data.hanviet}</span>`;
    }
    if (data.onKunRule && data.onKunRule.badge) {
      tagsHtml += `<span style="background:rgba(236,72,153,0.2);color:#f472b6;font-size:10px;padding:2px 6px;border-radius:4px;border:1px solid rgba(236,72,153,0.3);">${data.onKunRule.badge}</span>`;
    }
    if (data.type) {
      tagsHtml += `<span style="background:rgba(16,185,129,0.2);color:#6ee7b7;font-size:10px;padding:2px 6px;border-radius:4px;">${data.type}</span>`;
    }
    if (data.grammarTags && data.grammarTags.length > 0) {
      data.grammarTags.forEach(gt => {
        tagsHtml += `<span style="background:rgba(234,88,12,0.2);color:#fb923c;font-size:10px;padding:2px 6px;border-radius:4px;">${gt}</span>`;
      });
    }

    let grammarHtml = '';
    if (data.onKunRule && data.onKunRule.rule) {
      grammarHtml += `<div style="margin-top:6px;background:rgba(245,158,11,0.1);border-left:2px solid #f59e0b;padding:3px 6px;font-size:9.5px;color:#fcd34d;">💡 ${data.onKunRule.rule}</div>`;
    }

    let kanjiHtml = '';
    if (currentSettings.showKanjiBreakdown && data.kanjiList && data.kanjiList.length > 0) {
      kanjiHtml = '<div style="margin-top:6px;border-top:1px dashed rgba(255,255,255,0.1);padding-top:4px;font-size:10px;color:#94a3b8;">';
      kanjiHtml += '<div>🏮 Kanji: ' + data.kanjiList.map(k => `<strong>${k.char}</strong> (${k.hv} - ${k.m})`).join(' | ') + '</div>';
      kanjiHtml += '</div>';
    }

    const pitchStr = (currentSettings.showPitchAccent && data.pitch !== null) ? `<span style="color:#f472b6;font-size:10px;margin-left:4px;">[Trọng âm ⓪]</span>` : '';

    testPreview.innerHTML = `
      <div class="preview-result">
        <div class="preview-head">
          <div>
            ${currentSettings.showReading && data.reading ? `<span class="preview-reading">${data.reading}</span>` : ''}
            ${pitchStr}
            <div class="preview-word">${data.word}</div>
          </div>
          <div style="display:flex;gap:6px;">
            <button class="preview-action-btn" id="preview-lookup-btn" title="Tra cứu trên Mazii">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button class="preview-action-btn" id="preview-audio-btn" title="Nghe phát âm">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="preview-tags">${tagsHtml}</div>
        ${currentSettings.showMeaning && data.meaning ? `<div class="preview-meaning">💡 ${data.meaning}</div>` : ''}
        ${grammarHtml}
        ${kanjiHtml}
      </div>
    `;

    const lookupBtn = testPreview.querySelector('#preview-lookup-btn');
    if (lookupBtn) {
      lookupBtn.addEventListener('click', () => {
        const isSingleKanji = data.word.length === 1 && typeof isKanji === 'function' && isKanji(data.word);
        const url = isSingleKanji
          ? `https://mazii.net/vi-VN/search/kanji/javi/${encodeURIComponent(data.word)}`
          : `https://mazii.net/vi-VN/search/word/javi/${encodeURIComponent(data.word)}`;
        window.open(url, '_blank');
      });
    }

    const audioBtn = testPreview.querySelector('#preview-audio-btn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        if (typeof japaneseEngine !== 'undefined') {
          japaneseEngine.speak(data.reading || data.word, currentSettings.speechRate);
        }
      });
    }
  }

  // 7. Mở trang cài đặt phím tắt
  const openShortcutsBtn = document.getElementById('open-shortcuts-btn');
  if (openShortcutsBtn) {
    openShortcutsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.create) {
        const isEdge = navigator.userAgent.indexOf('Edg/') !== -1;
        const targetUrl = isEdge ? 'edge://extensions/shortcuts' : 'chrome://extensions/shortcuts';
        chrome.tabs.create({ url: targetUrl }).catch(() => {
          chrome.tabs.create({ url: isEdge ? 'edge://extensions' : 'chrome://extensions' }).catch(() => {});
        });
      }
    });
  }
});
