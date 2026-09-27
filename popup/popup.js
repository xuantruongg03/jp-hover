// Logic tương tác Popup Extension và Live Playground

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
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
  const optOnlineFallback = document.getElementById('opt-online-fallback');
  const optAutoAudio = document.getElementById('opt-auto-audio');

  const speedSlider = document.getElementById('speech-rate-slider');
  const speedBadge = document.getElementById('speed-badge');
  const presetButtons = document.querySelectorAll('.preset-btn');

  const testPreview = document.getElementById('test-preview');
  const testWords = document.querySelectorAll('.test-word');

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
    enableOnlineFallback: true,
    autoPlayAudio: false,
    speechRate: 0.95
  };

  // 1. Tải cài đặt hiện tại
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['jpSettings'], (res) => {
      if (res && res.jpSettings) {
        currentSettings = { ...currentSettings, ...res.jpSettings };
      }
      applySettingsToUI();
    });
  } else {
    applySettingsToUI();
  }

  // 2. Cập nhật UI theo dữ liệu settings
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
    optOnlineFallback.checked = currentSettings.enableOnlineFallback !== false;
    optAutoAudio.checked = currentSettings.autoPlayAudio === true;

    // Cập nhật tốc độ đọc
    const rate = currentSettings.speechRate || 0.95;
    speedSlider.value = rate;
    updateSpeedBadge(rate);
  }

  // 3. Cập nhật trạng thái hiển thị
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
      enableOnlineFallback: optOnlineFallback.checked,
      autoPlayAudio: optAutoAudio.checked,
      speechRate: parseFloat(speedSlider.value) || 0.95
    };

    updateStatusDisplay(currentSettings.enabled);

    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ jpSettings: currentSettings });
    }
  }

  // 5. Gắn sự kiện thay đổi
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
  optOnlineFallback.addEventListener('change', saveSettings);
  optAutoAudio.addEventListener('change', saveSettings);

  // Xử lý thanh trượt tốc độ
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

  // 7. Mở trang cài đặt phím tắt an toàn qua chrome.tabs.create
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
