// Logic tương tác Popup Extension, Sổ tay từ vựng & Live Playground (v1.4.0)

document.addEventListener('DOMContentLoaded', () => {
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

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

  // NEW Reading Format & Katakana Elements
  const selectReadingFormat = document.getElementById('select-reading-format');
  const optKatakana = document.getElementById('opt-katakana');
  const optOnKunRule = document.getElementById('opt-onkun-rule');

  // NEW Tooltip Action Button Toggles
  const optShowAnkiBtn = document.getElementById('opt-show-anki-btn');
  const optShowCopyBtn = document.getElementById('opt-show-copy-btn');
  const optShowLookupBtn = document.getElementById('opt-show-lookup-btn');
  const optShowPinBtn = document.getElementById('opt-show-pin-btn');

  // NEW Settings Elements
  const optSubtitleHover = document.getElementById('opt-subtitle-hover');
  const optAutoPauseHover = document.getElementById('opt-auto-pause-hover');
  const optAnkiEnabled = document.getElementById('opt-anki-enabled');
  const ankiDeckName = document.getElementById('anki-deck-name');
  const ankiModelName = document.getElementById('anki-model-name');
  const ankiStatusBadge = document.getElementById('anki-status-badge');
  const btnTestAnki = document.getElementById('btn-test-anki');
  const btnSyncAllAnki = document.getElementById('btn-sync-all-anki');

  const btnOpenQuickSearch = document.getElementById('btn-open-quick-search');
  const dueWordsBanner = document.getElementById('due-words-banner');
  const dueWordsCount = document.getElementById('due-words-count');
  const btnReviewDueNow = document.getElementById('btn-review-due-now');

  const voiceSelect = document.getElementById('voice-select');
  const optgroupFemale = document.getElementById('optgroup-female');
  const optgroupMale = document.getElementById('optgroup-male');
  const previewVoiceBtn = document.getElementById('preview-voice-btn');
  const speedSlider = document.getElementById('speech-rate-slider');
  const speedBadge = document.getElementById('speed-badge');
  const pitchSlider = document.getElementById('speech-pitch-slider');
  const pitchBadge = document.getElementById('pitch-badge');
  const presetButtons = document.querySelectorAll('.preset-btn');

  // AI Engine DOM Elements
  const selectAiProvider = document.getElementById('select-ai-provider');
  const aiApiKey = document.getElementById('ai-api-key');
  const aiModelName = document.getElementById('ai-model-name');
  const aiModelPresets = document.getElementById('ai-model-presets');
  const aiCustomEndpoint = document.getElementById('ai-custom-endpoint');
  const aiCustomEndpointGroup = document.getElementById('ai-custom-endpoint-group');
  const aiConfigContainer = document.getElementById('ai-config-container');
  const btnTestAi = document.getElementById('btn-test-ai');
  const aiStatusBadge = document.getElementById('ai-status-badge');
  const btnToggleAiKey = document.getElementById('btn-toggle-ai-key');
  const aiGetKeyLink = document.getElementById('ai-get-key-link');
  const optAiTranslate = document.getElementById('opt-ai-translate');
  const optAiGrammar = document.getElementById('opt-ai-grammar');
  const optAiExplain = document.getElementById('opt-ai-explain');

  // Danh mục Presets của từng nhà cung cấp AI
  const AI_PROVIDER_PRESETS = {
    gemini: {
      models: [
        { id: 'gemini-1.5-flash', label: '1.5 Flash (Nhanh, mặc định)' },
        { id: 'gemini-2.0-flash', label: '2.0 Flash (Mới nhất)' },
        { id: 'gemini-1.5-pro', label: '1.5 Pro (Mạnh mẽ)' }
      ],
      defaultModel: 'gemini-1.5-flash',
      keyLink: 'https://aistudio.google.com/app/apikey',
      placeholder: 'Nhập Google Gemini API Key (AI Studio)...'
    },
    openai: {
      models: [
        { id: 'gpt-4o-mini', label: 'GPT-4o-mini (Nhanh & Rẻ)' },
        { id: 'gpt-4o', label: 'GPT-4o (Thông minh cao cấp)' },
        { id: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
      ],
      defaultModel: 'gpt-4o-mini',
      keyLink: 'https://platform.openai.com/api-keys',
      placeholder: 'Nhập OpenAI API Key (sk-...)...'
    },
    claude: {
      models: [
        { id: 'claude-3-5-haiku-20241022', label: '3.5 Haiku (Siêu nhanh)' },
        { id: 'claude-3-5-sonnet-20241022', label: '3.5 Sonnet (Chính xác cao)' },
        { id: 'claude-3-haiku-20240307', label: '3 Haiku' }
      ],
      defaultModel: 'claude-3-5-haiku-20241022',
      keyLink: 'https://console.anthropic.com/settings/keys',
      placeholder: 'Nhập Anthropic Claude API Key (sk-ant-...)...'
    },
    deepseek: {
      models: [
        { id: 'deepseek-chat', label: 'DeepSeek-V3 (Chat)' },
        { id: 'deepseek-reasoner', label: 'DeepSeek-R1 (Suy luận)' }
      ],
      defaultModel: 'deepseek-chat',
      keyLink: 'https://platform.deepseek.com/api_keys',
      placeholder: 'Nhập DeepSeek API Key (sk-...)...'
    },
    groq: {
      models: [
        { id: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B (Khuyên dùng)' },
        { id: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B (Tức thì)' },
        { id: 'mixtral-8x7b-32768', label: 'Mixtral 8x7B' }
      ],
      defaultModel: 'llama-3.3-70b-versatile',
      keyLink: 'https://console.groq.com/keys',
      placeholder: 'Nhập Groq API Key (gsk_...)...'
    },
    custom: {
      models: [
        { id: 'qwen2.5:7b', label: 'Qwen 2.5 (Ollama)' },
        { id: 'llama3', label: 'Llama 3 (Ollama)' },
        { id: 'mistral', label: 'Mistral' }
      ],
      defaultModel: 'qwen2.5:7b',
      keyLink: 'https://openrouter.ai/keys',
      placeholder: 'Nhập API Key (để trống nếu dùng Ollama nội bộ)...'
    }
  };

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
    enableVisualHighlight: false,
    enableSelectionTranslate: true,
    enableOnlineFallback: true,
    autoPlayAudio: false,
    speechRate: 0.95,
    speechPitch: 1.0,
    voiceUri: '',
    translationEngine: 'google',
    geminiApiKey: '',
    aiProvider: 'gemini',
    aiApiKey: '',
    aiModel: 'gemini-1.5-flash',
    aiCustomEndpoint: '',
    aiEnableSentenceTranslate: true,
    aiEnableGrammarAnalysis: true,
    aiEnableWordExplain: true,
    // Mới
    readingFormat: 'hiragana', // 'hiragana' | 'katakana' | 'both'
    showKatakana: true,
    showOnKunRule: true,
    showAnkiBtn: false,
    showCopyBtn: false,
    showLookupBtn: false,
    showPinBtn: true,
    enableSubtitleHover: true,
    autoPauseVideoOnHover: false,
    ankiEnabled: true,
    ankiHost: 'http://127.0.0.1:8765',
    ankiDeckName: 'JP Hover Notebook',
    ankiModelName: 'Basic'
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
        checkDueWords();
      }
    });

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes.jpSavedWords) {
        savedWordsList = changes.jpSavedWords.newValue || [];
        updateSavedCountBadge();
        checkDueWords();
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
    optVisualHighlight.checked = currentSettings.enableVisualHighlight === true;
    if (optSelectionTranslate) {
      optSelectionTranslate.checked = currentSettings.enableSelectionTranslate !== false;
    }
    optOnlineFallback.checked = currentSettings.enableOnlineFallback !== false;
    optAutoAudio.checked = currentSettings.autoPlayAudio === true;

    // Cài đặt mới
    if (selectReadingFormat) selectReadingFormat.value = currentSettings.readingFormat || 'hiragana';
    if (optKatakana) optKatakana.checked = currentSettings.showKatakana !== false;
    if (optOnKunRule) optOnKunRule.checked = currentSettings.showOnKunRule !== false;
    if (optShowAnkiBtn) optShowAnkiBtn.checked = currentSettings.showAnkiBtn === true;
    if (optShowCopyBtn) optShowCopyBtn.checked = currentSettings.showCopyBtn === true;
    if (optShowLookupBtn) optShowLookupBtn.checked = currentSettings.showLookupBtn === true;
    if (optShowPinBtn) optShowPinBtn.checked = currentSettings.showPinBtn !== false;
    if (optSubtitleHover) optSubtitleHover.checked = currentSettings.enableSubtitleHover !== false;
    if (optAutoPauseHover) optAutoPauseHover.checked = currentSettings.autoPauseVideoOnHover === true;
    if (optAnkiEnabled) optAnkiEnabled.checked = currentSettings.ankiEnabled !== false;
    if (ankiDeckName) ankiDeckName.value = currentSettings.ankiDeckName || 'JP Hover Notebook';
    if (ankiModelName) ankiModelName.value = currentSettings.ankiModelName || 'Basic';

    // Cập nhật tốc độ & cao độ đọc
    const rate = currentSettings.speechRate || 0.95;
    speedSlider.value = rate;
    updateSpeedBadge(rate);

    if (pitchSlider) {
      const pitch = currentSettings.speechPitch || 1.0;
      pitchSlider.value = pitch;
      if (pitchBadge) pitchBadge.textContent = `${parseFloat(pitch).toFixed(2)}x`;
    }

    populateVoiceOptions();

    // Cấu hình AI Engine đa nền tảng
    const currentProvider = currentSettings.aiProvider || 'gemini';
    if (selectAiProvider) selectAiProvider.value = currentProvider;
    updateAiPresetsUI(currentProvider);

    const apiKeyVal = currentSettings.aiApiKey || currentSettings.geminiApiKey || '';
    if (aiApiKey) aiApiKey.value = apiKeyVal;
    const legacyGeminiInput = document.getElementById('gemini-api-key');
    if (legacyGeminiInput) legacyGeminiInput.value = apiKeyVal;

    if (aiModelName) aiModelName.value = currentSettings.aiModel || 'gemini-1.5-flash';
    if (aiModelPresets && currentSettings.aiModel) aiModelPresets.value = currentSettings.aiModel;
    if (aiCustomEndpoint) aiCustomEndpoint.value = currentSettings.aiCustomEndpoint || '';

    if (optAiTranslate) optAiTranslate.checked = currentSettings.aiEnableSentenceTranslate !== false;
    if (optAiGrammar) optAiGrammar.checked = currentSettings.aiEnableGrammarAnalysis !== false;
    if (optAiExplain) optAiExplain.checked = currentSettings.aiEnableWordExplain !== false;

    // Dịch câu & Tác vụ AI (API bên ngoài)
    const isAiEngine = (currentSettings.translationEngine === 'ai' || currentSettings.translationEngine === 'gemini');
    const transRadios = document.querySelectorAll('input[name="trans-engine"]');
    transRadios.forEach(r => {
      r.checked = isAiEngine ? (r.value === 'ai') : (r.value === 'google');
    });
    if (aiConfigContainer) aiConfigContainer.style.display = isAiEngine ? 'block' : 'none';

    // Kiểm tra Anki status
    checkAnkiStatus();
  }

  // Cập nhật giao diện Presets theo Provider AI
  function updateAiPresetsUI(provider) {
    const info = AI_PROVIDER_PRESETS[provider] || AI_PROVIDER_PRESETS.gemini;
    if (aiModelPresets) {
      aiModelPresets.innerHTML = '';
      info.models.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = m.label;
        aiModelPresets.appendChild(opt);
      });
      if (currentSettings.aiModel) {
        aiModelPresets.value = currentSettings.aiModel;
      }
    }
    if (aiApiKey) {
      aiApiKey.placeholder = info.placeholder;
    }
    if (aiGetKeyLink) {
      aiGetKeyLink.href = info.keyLink;
    }
    if (aiCustomEndpointGroup) {
      aiCustomEndpointGroup.style.display = (provider === 'custom') ? 'block' : 'none';
    }
  }

  // Kiểm tra kết nối AI API Key & Model (Ping Test)
  function checkAiStatus() {
    if (!aiStatusBadge) return;
    const provider = selectAiProvider ? selectAiProvider.value : 'gemini';
    const key = aiApiKey ? aiApiKey.value.trim() : '';
    const model = aiModelName ? aiModelName.value.trim() : '';
    const endpoint = aiCustomEndpoint ? aiCustomEndpoint.value.trim() : '';

    aiStatusBadge.textContent = '🔄 Đang kiểm tra...';
    aiStatusBadge.className = 'anki-status-badge';
    aiStatusBadge.style.color = '#38bdf8';
    if (btnTestAi) btnTestAi.disabled = true;

    chrome.runtime.sendMessage({
      action: 'AI_CHAT_REQUEST',
      task: 'test_connection',
      provider: provider,
      apiKey: key,
      model: model,
      customEndpoint: endpoint
    }, (res) => {
      if (btnTestAi) btnTestAi.disabled = false;
      if (res && res.success) {
        aiStatusBadge.textContent = `🟢 Hoạt động tốt (${res.providerName || provider}: ${res.model || model})`;
        aiStatusBadge.style.color = '#10b981';
        saveSettings();
      } else {
        const err = res?.error || 'Không kết nối được';
        aiStatusBadge.textContent = `🔴 Thất bại: ${err.slice(0, 42)}${err.length > 42 ? '...' : ''}`;
        aiStatusBadge.title = err;
        aiStatusBadge.style.color = '#ef4444';
      }
    });
  }

  function populateVoiceOptions() {
    if (!voiceSelect || typeof japaneseAudio === 'undefined') return;

    const voices = japaneseAudio.getJapaneseVoices();
    if (optgroupFemale) optgroupFemale.innerHTML = '';
    if (optgroupMale) optgroupMale.innerHTML = '';

    voices.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.uri;
      opt.textContent = v.label;

      if (v.gender === 'male') {
        if (optgroupMale) optgroupMale.appendChild(opt);
      } else {
        if (optgroupFemale) optgroupFemale.appendChild(opt);
      }
    });

    if (currentSettings.voiceUri) {
      voiceSelect.value = currentSettings.voiceUri;
    } else {
      voiceSelect.value = '';
    }
  }

  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => {
      populateVoiceOptions();
    };
  }

  function updateStatusDisplay(enabled) {
    if (enabled) {
      statusDot.classList.remove('disabled');
      statusText.textContent = 'Đang hoạt động';
      statusText.style.color = '#10b981';
      if (paneSettings) paneSettings.classList.remove('is-disabled');
    } else {
      statusDot.classList.add('disabled');
      statusText.textContent = 'Đã tắt';
      statusText.style.color = '#64748b';
      if (paneSettings) paneSettings.classList.add('is-disabled');
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

  function checkDueWords() {
    const now = Date.now();
    const dueList = savedWordsList.filter(w => w.srs && w.srs.nextReview && w.srs.nextReview <= now);
    if (dueWordsBanner && dueWordsCount) {
      if (dueList.length > 0) {
        dueWordsCount.textContent = dueList.length;
        dueWordsBanner.style.display = 'flex';
      } else {
        dueWordsBanner.style.display = 'none';
      }
    }
  }

  // Kiểm tra kết nối AnkiConnect
  async function checkAnkiStatus() {
    if (!ankiStatusBadge) return;
    ankiStatusBadge.textContent = '⏳ Đang kiểm tra...';
    ankiStatusBadge.style.color = '#94a3b8';

    if (typeof ankiConnect !== 'undefined') {
      const res = await ankiConnect.checkConnection();
      if (res && res.connected) {
        ankiStatusBadge.textContent = `🟢 Đã kết nối Anki v${res.version}`;
        ankiStatusBadge.style.color = '#10b981';
      } else {
        ankiStatusBadge.textContent = '🔴 Chưa mở Anki hoặc thiếu AnkiConnect';
        ankiStatusBadge.style.color = '#ef4444';
      }
    }
  }

  if (btnTestAnki) {
    btnTestAnki.addEventListener('click', checkAnkiStatus);
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
      speechRate: parseFloat(speedSlider.value) || 0.95,
      speechPitch: pitchSlider ? (parseFloat(pitchSlider.value) || 1.0) : 1.0,
      voiceUri: voiceSelect ? voiceSelect.value : '',
      translationEngine: document.querySelector('input[name="trans-engine"]:checked')?.value || 'google',
      geminiApiKey: (aiApiKey?.value || document.getElementById('gemini-api-key')?.value || '').trim(),
      aiProvider: selectAiProvider ? selectAiProvider.value : 'gemini',
      aiApiKey: (aiApiKey ? aiApiKey.value : '').trim(),
      aiModel: (aiModelName ? aiModelName.value : '').trim(),
      aiCustomEndpoint: (aiCustomEndpoint ? aiCustomEndpoint.value : '').trim(),
      aiEnableSentenceTranslate: optAiTranslate ? optAiTranslate.checked : true,
      aiEnableGrammarAnalysis: optAiGrammar ? optAiGrammar.checked : true,
      aiEnableWordExplain: optAiExplain ? optAiExplain.checked : true,
      // Mới
      readingFormat: selectReadingFormat ? selectReadingFormat.value : 'hiragana',
      showKatakana: optKatakana ? optKatakana.checked : true,
      showOnKunRule: optOnKunRule ? optOnKunRule.checked : true,
      showAnkiBtn: optShowAnkiBtn ? optShowAnkiBtn.checked : false,
      showCopyBtn: optShowCopyBtn ? optShowCopyBtn.checked : false,
      showLookupBtn: optShowLookupBtn ? optShowLookupBtn.checked : false,
      showPinBtn: optShowPinBtn ? optShowPinBtn.checked : true,
      enableSubtitleHover: optSubtitleHover ? optSubtitleHover.checked : true,
      autoPauseVideoOnHover: optAutoPauseHover ? optAutoPauseHover.checked : false,
      ankiEnabled: optAnkiEnabled ? optAnkiEnabled.checked : true,
      ankiHost: 'http://127.0.0.1:8765',
      ankiDeckName: ankiDeckName ? ankiDeckName.value.trim() : 'JP Hover Notebook',
      ankiModelName: ankiModelName ? ankiModelName.value.trim() : 'Basic'
    };

    updateStatusDisplay(currentSettings.enabled);

    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ jpSettings: currentSettings }, () => {
        if (typeof chrome.tabs !== 'undefined' && chrome.tabs.query) {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs[0] && tabs[0].id) {
              chrome.tabs.sendMessage(tabs[0].id, {
                action: 'SET_STATE',
                enabled: currentSettings.enabled,
                settings: currentSettings
              }).catch(() => {});
            }
          });
        }
      });
    }
  }

  // Gắn sự kiện thay đổi cài đặt
  masterToggle.addEventListener('change', saveSettings);
  activationRadios.forEach(r => r.addEventListener('change', saveSettings));
  if (selectReadingFormat) selectReadingFormat.addEventListener('change', saveSettings);
  [
    optReading, optKatakana, optRomaji, optHanviet, optMeaning, optKanjiBreakdown, optOnKunRule,
    optPitchAccent, optVisualHighlight, optSelectionTranslate, optOnlineFallback, optAutoAudio,
    optSubtitleHover, optAutoPauseHover, optAnkiEnabled,
    optShowAnkiBtn, optShowCopyBtn, optShowLookupBtn, optShowPinBtn
  ].forEach(cb => {
    if (cb) cb.addEventListener('change', saveSettings);
  });

  if (ankiDeckName) ankiDeckName.addEventListener('change', saveSettings);
  if (ankiModelName) ankiModelName.addEventListener('change', saveSettings);

  const transRadios = document.querySelectorAll('input[name="trans-engine"]');
  transRadios.forEach(r => {
    r.addEventListener('change', () => {
      const isAi = (r.value === 'ai' || r.value === 'gemini');
      if (aiConfigContainer) aiConfigContainer.style.display = isAi ? 'block' : 'none';
      saveSettings();
    });
  });

  // AI Provider thay đổi
  if (selectAiProvider) {
    selectAiProvider.addEventListener('change', () => {
      const p = selectAiProvider.value;
      updateAiPresetsUI(p);
      const info = AI_PROVIDER_PRESETS[p];
      if (info && aiModelName) {
        aiModelName.value = info.defaultModel;
      }
      if (aiStatusBadge) {
        aiStatusBadge.textContent = '⚪ Chưa kiểm tra';
        aiStatusBadge.style.color = '#94a3b8';
      }
      saveSettings();
    });
  }

  // AI Model Presets chọn nhanh
  if (aiModelPresets) {
    aiModelPresets.addEventListener('change', () => {
      if (aiModelName) aiModelName.value = aiModelPresets.value;
      saveSettings();
    });
  }

  // Ẩn / Hiện API key
  if (btnToggleAiKey && aiApiKey) {
    btnToggleAiKey.addEventListener('click', () => {
      const isPwd = aiApiKey.type === 'password';
      aiApiKey.type = isPwd ? 'text' : 'password';
      btnToggleAiKey.textContent = isPwd ? '🙈 Ẩn key' : '👁️ Hiện key';
    });
  }

  // Kiểm tra kết nối AI
  if (btnTestAi) {
    btnTestAi.addEventListener('click', checkAiStatus);
  }

  // Lưu khi thay đổi các trường AI
  if (aiApiKey) aiApiKey.addEventListener('change', saveSettings);
  if (aiModelName) aiModelName.addEventListener('change', saveSettings);
  if (aiCustomEndpoint) aiCustomEndpoint.addEventListener('change', saveSettings);
  [optAiTranslate, optAiGrammar, optAiExplain].forEach(cb => {
    if (cb) cb.addEventListener('change', saveSettings);
  });

  speedSlider.addEventListener('input', (e) => {
    updateSpeedBadge(e.target.value);
    saveSettings();
  });

  if (pitchSlider) {
    pitchSlider.addEventListener('input', (e) => {
      if (pitchBadge) pitchBadge.textContent = `${parseFloat(e.target.value).toFixed(2)}x`;
      saveSettings();
    });
  }

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sp = btn.dataset.speed;
      speedSlider.value = sp;
      updateSpeedBadge(sp);
      saveSettings();
    });
  });

  if (voiceSelect) voiceSelect.addEventListener('change', saveSettings);

  if (previewVoiceBtn) {
    previewVoiceBtn.addEventListener('click', () => {
      if (typeof japaneseAudio !== 'undefined') {
        japaneseAudio.speak('こんにちは、日本語の勉強を頑張りましょう！', {
          rate: parseFloat(speedSlider.value) || 0.95,
          pitch: pitchSlider ? parseFloat(pitchSlider.value) : 1.0,
          voiceUri: voiceSelect.value
        });
      }
    });
  }

  // Quick Action Buttons
  if (btnOpenQuickSearch) {
    btnOpenQuickSearch.addEventListener('click', () => {
      chrome.storage.local.get(['jpSettings'], (res) => {
        const isEnabled = res && res.jpSettings ? res.jpSettings.enabled !== false : true;
        if (!isEnabled) {
          showToastNotification('⚠️ Tiện ích đang TẮT. Hãy bật công tắc chính trước.');
          return;
        }
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs && tabs[0]) chrome.tabs.sendMessage(tabs[0].id, { action: 'TOGGLE_QUICK_SEARCH' });
          window.close();
        });
      });
    });
  }

  if (btnReviewDueNow) {
    btnReviewDueNow.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'OPEN_FLASHCARDS' });
    });
  }

  // Mở trang Flashcards & JLPT Luyện nghe / Thi thử
  const openFlashcardsBtn = document.getElementById('open-flashcards-page-btn');
  if (openFlashcardsBtn) {
    openFlashcardsBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'OPEN_FLASHCARDS' });
    });
  }

  const openListeningBtn = document.getElementById('open-listening-page-btn');
  if (openListeningBtn) {
    openListeningBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'OPEN_FLASHCARDS' });
    });
  }

  const openExamBtn = document.getElementById('open-exam-page-btn');
  if (openExamBtn) {
    openExamBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'OPEN_FLASHCARDS' });
    });
  }

  // 5. Quản lý Sổ tay Từ vựng
  function loadSavedWords() {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['jpSavedWords'], (res) => {
        savedWordsList = Array.isArray(res.jpSavedWords) ? res.jpSavedWords : [];
        updateSavedCountBadge();
        renderSavedWordsList(savedSearchInput.value);
        checkDueWords();
      });
    }
  }

  function renderSavedWordsList(filterQuery = '') {
    savedWordsContainer.innerHTML = '';
    const q = filterQuery.toLowerCase().trim();
    const qNoTone = typeof removeVietnameseTones === 'function' ? removeVietnameseTones(q) : q;

    const filtered = savedWordsList.filter(item => {
      if (!q) return true;
      const wLower = item.word.toLowerCase();
      const rLower = (item.reading || '').toLowerCase();
      const mLower = (item.meaning || '').toLowerCase();
      const hvLower = (item.hanviet || '').toLowerCase();
      const mNoTone = typeof removeVietnameseTones === 'function' ? removeVietnameseTones(mLower) : mLower;

      return (
        wLower.includes(q) ||
        rLower.includes(q) ||
        mLower.includes(q) ||
        (qNoTone && mNoTone.includes(qNoTone)) ||
        hvLower.includes(q)
      );
    });

    if (filtered.length === 0) {
      savedEmptyState.style.display = 'flex';
      savedWordsContainer.style.display = 'none';
      return;
    }

    savedEmptyState.style.display = 'none';
    savedWordsContainer.style.display = 'flex';

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'saved-word-card';
      const isDue = item.srs && item.srs.nextReview && item.srs.nextReview <= Date.now();

      card.innerHTML = `
        <div class="saved-word-main">
          <div class="saved-word-header">
            <span class="saved-word-text">${escapeHtml(item.word)}</span>
            <span class="saved-word-reading">${escapeHtml(item.reading || '')}</span>
            ${item.hanviet ? `<span class="saved-word-hv">${escapeHtml(item.hanviet)}</span>` : ''}
            ${isDue ? `<span style="background:rgba(245,158,11,0.2);color:#fbbf24;font-size:10px;padding:1px 5px;border-radius:4px;font-weight:bold;">Đến hạn ôn</span>` : ''}
          </div>
          <div class="saved-word-meaning">${escapeHtml(item.meaning || '')}</div>
          ${item.sentence ? `<div style="font-size:11px;color:#94a3b8;margin-top:2px;"><em>${escapeHtml(item.sentence)}</em></div>` : ''}
        </div>
        <div class="saved-word-actions">
          <button type="button" class="btn-item-action btn-item-anki" title="Đẩy từ này sang Anki Desktop">📥</button>
          <button type="button" class="btn-item-action btn-item-speak" title="Nghe phát âm">🔊</button>
          <button type="button" class="btn-item-action btn-item-delete" title="Xóa từ">🗑️</button>
        </div>
      `;

      card.querySelector('.btn-item-speak').addEventListener('click', () => {
        if (typeof japaneseAudio !== 'undefined') {
          japaneseAudio.speak(item.reading || item.word, { rate: currentSettings.speechRate });
        }
      });

      card.querySelector('.btn-item-anki').addEventListener('click', async (e) => {
        const btn = e.target;
        btn.textContent = '⏳';
        try {
          if (typeof ankiConnect !== 'undefined') {
            await ankiConnect.addWordNote({
              word: item.word,
              reading: item.reading,
              hanviet: item.hanviet,
              meaning: item.meaning,
              sentence: item.sentence,
              deckName: currentSettings.ankiDeckName,
              modelName: currentSettings.ankiModelName
            });
            btn.textContent = '✅';
            btn.style.color = '#10b981';
          }
        } catch (err) {
          alert('Lỗi AnkiConnect: ' + err.message);
          btn.textContent = '❌';
        }
      });

      card.querySelector('.btn-item-delete').addEventListener('click', () => {
        savedWordsList = savedWordsList.filter(w => w.word !== item.word);
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
          chrome.storage.local.set({ jpSavedWords: savedWordsList }, () => {
            renderSavedWordsList(savedSearchInput.value);
            updateSavedCountBadge();
          });
        }
      });

      savedWordsContainer.appendChild(card);
    });
  }

  savedSearchInput.addEventListener('input', (e) => {
    renderSavedWordsList(e.target.value);
  });

  // Đồng bộ tất cả từ vựng sang Anki
  if (btnSyncAllAnki) {
    btnSyncAllAnki.addEventListener('click', async () => {
      if (savedWordsList.length === 0) {
        alert('Sổ tay đang trống!');
        return;
      }
      btnSyncAllAnki.innerHTML = '<span>⏳ Đang đồng bộ...</span>';
      let successCount = 0;
      let errorCount = 0;

      for (const item of savedWordsList) {
        try {
          if (typeof ankiConnect !== 'undefined') {
            await ankiConnect.addWordNote({
              word: item.word,
              reading: item.reading,
              hanviet: item.hanviet,
              meaning: item.meaning,
              sentence: item.sentence,
              deckName: currentSettings.ankiDeckName,
              modelName: currentSettings.ankiModelName
            });
            successCount++;
          }
        } catch (_) {
          errorCount++;
        }
      }

      btnSyncAllAnki.innerHTML = '<span>📥 Anki Desktop</span>';
      alert(`Đã hoàn tất đồng bộ Anki!\nThành công: ${successCount} từ\nThất bại hoặc trùng lặp: ${errorCount} từ`);
    });
  }

  // Xuất file CSV Anki
  exportAnkiBtn.addEventListener('click', () => {
    if (savedWordsList.length === 0) {
      alert('Sổ tay chưa có từ nào để xuất!');
      return;
    }

    let csvContent = '\uFEFF';
    csvContent += 'Expression\tReading\tHanViet\tMeaning\tSentence\n';

    savedWordsList.forEach(item => {
      const word = (item.word || '').replace(/\t/g, ' ');
      const reading = (item.reading || '').replace(/\t/g, ' ');
      const hanviet = (item.hanviet || '').replace(/\t/g, ' ');
      const meaning = (item.meaning || '').replace(/\t/g, ' ');
      const sentence = (item.sentence || '').replace(/\t/g, ' ');
      csvContent += `${word}\t${reading}\t${hanviet}\t${meaning}\t${sentence}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `JP_Notebook_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Xóa toàn bộ từ đã lưu
  clearSavedBtn.addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ từ vựng trong sổ tay không?')) {
      savedWordsList = [];
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ jpSavedWords: [] }, () => {
          renderSavedWordsList('');
          updateSavedCountBadge();
        });
      }
    }
  });

  // 6. Live Testing Playground
  testWords.forEach(w => {
    w.addEventListener('mouseenter', () => {
      showLivePreview(w.textContent.trim());
    });
  });

  function showLivePreview(word) {
    if (!word) return;
    let data = null;
    const isVi = typeof isVietnameseQuery === 'function' && isVietnameseQuery(word);
    if (isVi && typeof lookupVietnameseToJapanese === 'function') {
      const rev = lookupVietnameseToJapanese(word, 1);
      if (rev && rev.words && rev.words.length > 0) {
        const top = rev.words[0];
        data = {
          word: top.word,
          reading: top.r || top.reading || top.word,
          meaning: `[Khớp tiếng Việt "${word}"]: ${top.m || top.meaning}`,
          type: top.t || top.type || ''
        };
      }
    }
    if (!data && typeof lookupJapaneseWord !== 'undefined') {
      data = lookupJapaneseWord(word);
    }
    if (!data) {
      data = { word, reading: word, meaning: 'Từ vựng tiếng Nhật' };
    }

    let tagsHtml = '';
    if (currentSettings.showRomaji && data.romaji) {
      tagsHtml += `<span class="preview-tag-ro">Romaji: ${escapeHtml(data.romaji)}</span>`;
    }
    if (currentSettings.showHanViet && data.hanviet) {
      tagsHtml += `<span class="preview-tag-hv">Âm HV: ${escapeHtml(data.hanviet)}</span>`;
    }
    if (data.type) {
      tagsHtml += `<span style="background:rgba(16,185,129,0.2);color:#6ee7b7;font-size:10px;padding:2px 6px;border-radius:4px;">${escapeHtml(data.type)}</span>`;
    }

    testPreview.innerHTML = `
      <div class="preview-result">
        <div class="preview-head">
          <div>
            ${currentSettings.showReading !== false && data.reading ? `<span class="preview-reading">${escapeHtml(data.reading)}</span>` : ''}
            <div class="preview-word">${escapeHtml(data.word)}</div>
          </div>
          <button class="preview-action-btn" id="preview-audio-btn" title="Nghe phát âm">🔊</button>
        </div>
        <div class="preview-tags">${tagsHtml}</div>
        ${currentSettings.showMeaning && data.meaning ? `<div class="preview-meaning">💡 ${escapeHtml(data.meaning)}</div>` : ''}
      </div>
    `;

    const audioBtn = testPreview.querySelector('#preview-audio-btn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        if (typeof japaneseAudio !== 'undefined') {
          japaneseAudio.speak(data.reading || data.word, { rate: currentSettings.speechRate });
        }
      });
    }
  }

  // 7. Đổi phím tắt
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
