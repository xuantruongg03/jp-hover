// Background Service Worker (Manifest V3 - v1.4.0)
// Quản lý phím tắt Alt+J, Alt+F, Alt+S, AnkiConnect Proxy, Badge icon trạng thái và đồng bộ cài đặt

const DEFAULT_SETTINGS = {
  enabled: true,
  activationMode: 'always', // 'always' | 'shift' | 'alt'
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
  speechRate: 0.95,
  speechPitch: 1.0,
  voiceUri: '',
  translationEngine: 'google', // 'google' | 'ai' | 'gemini'
  geminiApiKey: '',

  // AI Engine Settings (Hỗ trợ Gemini, OpenAI, Claude, DeepSeek, Groq, Custom)
  aiProvider: 'gemini',
  aiApiKey: '',
  aiModel: 'gemini-1.5-flash',
  aiCustomEndpoint: '',
  aiEnableSentenceTranslate: true,
  aiEnableGrammarAnalysis: true,
  aiEnableWordExplain: true,

  // AnkiConnect
  ankiEnabled: true,
  ankiHost: 'http://127.0.0.1:8765',
  ankiDeckName: 'JP Hover Notebook',
  ankiModelName: 'Basic',

  // Subtitles
  enableSubtitleHover: true,
  autoPauseVideoOnHover: false,

  // SRS & Decks
  activeDeck: 'Mặc định'
};

// Cập nhật Badge trên biểu tượng Extension
function updateBadge(enabled) {
  if (enabled) {
    // Kiểm tra xem có bao nhiêu từ đến hạn ôn tập hôm nay
    chrome.storage.local.get(['jpSavedWords'], (res) => {
      const words = Array.isArray(res.jpSavedWords) ? res.jpSavedWords : [];
      const now = Date.now();
      const dueCount = words.filter(w => w.srs && w.srs.nextReview && w.srs.nextReview <= now).length;

      if (dueCount > 0) {
        chrome.action.setBadgeText({ text: `${dueCount}` });
        chrome.action.setBadgeBackgroundColor({ color: '#f59e0b' }); // Màu cam báo có từ cần ôn
      } else {
        chrome.action.setBadgeText({ text: 'ON' });
        chrome.action.setBadgeBackgroundColor({ color: '#10b981' }); // Màu xanh lục tươi
      }
    });
  } else {
    chrome.action.setBadgeText({ text: 'OFF' });
    chrome.action.setBadgeBackgroundColor({ color: '#64748b' }); // Màu xám
  }
}

// Khi cài đặt hoặc cập nhật Extension
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['jpSettings'], (res) => {
    if (!res || !res.jpSettings) {
      chrome.storage.local.set({ jpSettings: DEFAULT_SETTINGS });
      updateBadge(true);
    } else {
      updateBadge(res.jpSettings.enabled !== false);
    }
  });
});

// Lắng nghe khi khởi động Chrome
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get(['jpSettings'], (res) => {
    const enabled = res && res.jpSettings ? res.jpSettings.enabled !== false : true;
    updateBadge(enabled);
  });
});

// Lắng nghe thay đổi storage để cập nhật badge kịp thời
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local') {
    if (changes.jpSettings || changes.jpSavedWords) {
      chrome.storage.local.get(['jpSettings'], (res) => {
        const enabled = res && res.jpSettings ? res.jpSettings.enabled !== false : true;
        updateBadge(enabled);
      });
    }
  }
});

// Lắng nghe phím tắt toàn cục
chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs[0] || !tabs[0].id) return;
    const tabId = tabs[0].id;

    if (command === 'toggle-hover') {
      chrome.storage.local.get(['jpSettings'], (res) => {
        const current = res && res.jpSettings ? res.jpSettings : DEFAULT_SETTINGS;
        const newEnabled = current.enabled === false ? true : false;
        const updated = { ...current, enabled: newEnabled };

        chrome.storage.local.set({ jpSettings: updated }, () => {
          updateBadge(newEnabled);
          chrome.tabs.sendMessage(tabId, { action: 'SET_STATE', enabled: newEnabled }).catch(() => {});
        });
      });
    } else if (command === 'quick-search') {
      chrome.storage.local.get(['jpSettings'], (res) => {
        const isEnabled = res && res.jpSettings ? res.jpSettings.enabled !== false : true;
        if (!isEnabled) return; // Tiện ích đang TẮT -> Không mở thanh tìm kiếm
        chrome.tabs.sendMessage(tabId, { action: 'TOGGLE_QUICK_SEARCH' }).catch(() => {});
      });
    }
  });
});

// Lắng nghe yêu cầu từ Content Scripts & Popups
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // 1. Mở trang Flashcards & Sổ tay toàn màn hình
  if (msg.action === 'OPEN_FLASHCARDS') {
    chrome.tabs.create({ url: chrome.runtime.getURL('flashcards.html') });
    sendResponse({ success: true });
    return true;
  }

  // 2. AnkiConnect Proxy Request (vượt qua CORS và Mixed Content)
  if (msg.action === 'ANKI_PROXY_REQUEST') {
    const host = msg.host || 'http://127.0.0.1:8765';
    fetch(host, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg.payload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          sendResponse({ success: false, error: data.error });
        } else {
          sendResponse({ success: true, result: data.result });
        }
      })
      .catch(err => {
        sendResponse({ success: false, error: err.message });
      });
    return true; // Cho biết phản hồi bất đồng bộ
  }

  // 3. Tải SVG Nét viết Kanji (Vượt CSP trên ChatGPT, GitHub, X...)
  if (msg.action === 'FETCH_KANJI_SVG') {
    const hex = msg.hex;
    const cdnUrls = [
      `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg/kanji/${hex}.svg`,
      `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${hex}.svg`
    ];

    (async () => {
      for (const url of cdnUrls) {
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 3500);
          const res = await fetch(url, { signal: controller.signal });
          clearTimeout(timer);
          if (res.ok) {
            const svgText = await res.text();
            sendResponse({ success: true, svg: svgText });
            return;
          }
        } catch (_) {}
      }
      sendResponse({ success: false });
    })();
    return true;
  }

  // 4. Google Translate Proxy (Vượt CSP & CORS trên ChatGPT, YouTube, Facebook, Twitter...)
  if (msg.action === 'GOOGLE_TRANSLATE_API') {
    const text = (msg.text || '').trim();
    const sl = msg.sl || 'ja';
    const tl = msg.tl || 'vi';

    if (!text) {
      sendResponse({ success: false, error: 'Empty query' });
      return false;
    }

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(tl)}&dt=t&dt=bd&dt=rm&q=${encodeURIComponent(text)}`;
    
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    fetch(url, { signal: controller.signal })
      .then(res => {
        clearTimeout(timer);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(data => {
        sendResponse({ success: true, data: data });
      })
      .catch(err => {
        clearTimeout(timer);
        sendResponse({ success: false, error: err.message });
      });

    return true;
  }

  // 5. Universal AI Chat Request Proxy (Hỗ trợ Gemini, OpenAI, Claude, DeepSeek, Groq, Custom API)
  // Xử lý vượt CORS và Content Security Policy trên mọi trang web
  if (msg.action === 'AI_CHAT_REQUEST') {
    (async () => {
      try {
        const settingsRes = await new Promise(r => chrome.storage.local.get(['jpSettings'], r));
        const currentSettings = settingsRes?.jpSettings || DEFAULT_SETTINGS;

        const provider = (msg.provider || currentSettings.aiProvider || (currentSettings.translationEngine === 'gemini' ? 'gemini' : 'gemini')).toLowerCase();
        let apiKey = (msg.apiKey !== undefined ? msg.apiKey : (currentSettings.aiApiKey || currentSettings.geminiApiKey || '')).trim();
        let model = (msg.model || currentSettings.aiModel || '').trim();
        const customEndpoint = (msg.customEndpoint !== undefined ? msg.customEndpoint : (currentSettings.aiCustomEndpoint || '')).trim();
        const task = msg.task || 'translate';
        const text = (msg.text || '').trim();
        const direction = msg.direction || 'auto';

        // Gán model mặc định theo provider nếu chưa có
        if (!model) {
          if (provider === 'gemini') model = 'gemini-1.5-flash';
          else if (provider === 'openai') model = 'gpt-4o-mini';
          else if (provider === 'claude') model = 'claude-3-5-haiku-20241022';
          else if (provider === 'deepseek') model = 'deepseek-chat';
          else if (provider === 'groq') model = 'llama-3.3-70b-versatile';
          else model = 'qwen2.5:7b';
        }

        // Kiểm tra API Key (trừ khi dùng Ollama localhost)
        const isLocalHost = provider === 'custom' && (customEndpoint.includes('localhost') || customEndpoint.includes('127.0.0.1'));
        if (!apiKey && !isLocalHost) {
          sendResponse({
            success: false,
            error: `Chưa cấu hình API Key cho ${provider.toUpperCase()}. Vui lòng vào Cài đặt để nhập key.`
          });
          return;
        }

        // Xây dựng Prompts theo từng tác vụ học tiếng Nhật
        let systemPrompt = '';
        let userPrompt = '';

        if (task === 'test_connection') {
          systemPrompt = 'You are an AI assistant in JP Furigana Hover Chrome Extension.';
          userPrompt = 'Respond with "OK: Connection successful" in 6 words or less.';
        } else if (task === 'translate') {
          const isVi = direction === 'vi-ja' || (direction !== 'ja-vi' && /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i.test(text));
          systemPrompt = 'Bạn là chuyên gia dịch thuật Nhật - Việt xuất sắc, am hiểu sâu sắc văn hóa Nhật, sắc thái trợ từ và kính ngữ (Sonkeigo, Kenjougo, Teineigo).';
          userPrompt = isVi
            ? `Hãy dịch chính xác câu/đoạn tiếng Việt sau sang tiếng Nhật tự nhiên, chuẩn xác và đúng ngữ cảnh nhất. Chỉ trả về duy nhất nội dung câu dịch tiếng Nhật, không kèm giải thích hay thêm dấu ngoặc kép:\n\n${text}`
            : `Hãy dịch chính xác câu tiếng Nhật sau sang tiếng Việt tự nhiên và chuẩn nghĩa nhất (chú ý số đếm, lượng từ, Hiragana/Katakana và kính ngữ). Chỉ trả về duy nhất nội dung câu dịch tiếng Việt, không kèm giải thích hay thêm dấu ngoặc kép:\n\n${text}`;
        } else if (task === 'grammar') {
          systemPrompt = 'Bạn là giảng viên chuyên ngữ tiếng Nhật và chuyên gia luyện thi JLPT hàng đầu.';
          userPrompt = `Hãy phân tích chi tiết ngữ pháp, cấu trúc và sắc thái cho câu tiếng Nhật sau:\n"${text}"\n\nĐịnh dạng trả về rõ ràng bằng tiếng Việt theo các phần sau:\n1. 🎯 Dịch nghĩa hoàn chỉnh\n2. 🧩 Bóc tách thành phần & Trợ từ (Chủ ngữ, Vị ngữ, phân tích vai trò từng trợ từ は, が, を, に, で, と, も...)\n3. 📚 Điểm ngữ pháp JLPT trọng tâm (Nêu tên mẫu ngữ pháp, cấp độ JLPT nếu có, và thể chia của động từ/tính từ)\n4. 💡 Sắc thái văn phong (Lịch sự Desu/Masu, thân mật Tameguchi, hay kính ngữ...)`;
        } else if (task === 'explain_word') {
          systemPrompt = 'Bạn là từ điển sống tiếng Nhật chuyên sâu JLPT.';
          userPrompt = `Hãy giải thích chi tiết từ vựng/cụm từ tiếng Nhật sau: "${text}"\n\nĐịnh dạng trả về súc tích bằng tiếng Việt:\n1. 🎌 Cách đọc (Hiragana/Katakana) & Âm Hán-Việt & Cấp độ JLPT (nếu có)\n2. 💡 Ý nghĩa chính xác & Sắc thái sử dụng (Khi nào nên dùng, từ đồng nghĩa hoặc phân biệt nếu có)\n3. 🔗 Cụm từ thông dụng đi kèm (Collocations)\n4. 📝 2 câu ví dụ thực tế kèm cách đọc Hiragana và dịch tiếng Việt`;
        } else if (task === 'proofread') {
          systemPrompt = 'Bạn là chuyên gia hiệu đính tiếng Nhật bản xứ.';
          userPrompt = `Hãy kiểm tra, sửa lỗi ngữ pháp, trợ từ và tối ưu hóa câu tiếng Nhật sau để tự nhiên nhất như người Nhật bản xứ:\n"${text}"\n\nĐịnh dạng trả về:\n1. ✅ Câu chuẩn tự nhiên\n2. 🔍 Nhận xét & Sửa lỗi cụ thể\n3. 💡 Cách diễn đạt thay thế (Lịch sự hoặc Thân mật)`;
        } else {
          systemPrompt = msg.systemPrompt || 'Bạn là trợ lý AI học tiếng Nhật thông minh.';
          userPrompt = msg.prompt || text;
        }

        let resultText = '';
        let providerName = provider;

        // 1. Google Gemini API
        if (provider === 'gemini') {
          providerName = 'Google Gemini';
          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
          const fullText = systemPrompt ? `${systemPrompt}\n\n${userPrompt}` : userPrompt;

          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 20000);

          const res = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: fullText }] }],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: task === 'translate' ? 400 : 1200
              }
            }),
            signal: controller.signal
          });
          clearTimeout(timer);

          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            const errMsg = errData?.error?.message || `HTTP ${res.status}`;
            throw new Error(`Gemini: ${errMsg}`);
          }
          const data = await res.json();
          resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

        // 2. Anthropic Claude API
        } else if (provider === 'claude') {
          providerName = 'Anthropic Claude';
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 20000);

          const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
              'anthropic-version': '2023-06-01',
              'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
              model: model,
              system: systemPrompt,
              messages: [{ role: 'user', content: userPrompt }],
              max_tokens: task === 'translate' ? 400 : 1200,
              temperature: 0.2
            }),
            signal: controller.signal
          });
          clearTimeout(timer);

          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            const errMsg = errData?.error?.message || `HTTP ${res.status}`;
            throw new Error(`Claude: ${errMsg}`);
          }
          const data = await res.json();
          resultText = data?.content?.[0]?.text?.trim() || '';

        // 3. OpenAI / DeepSeek / Groq / Custom (OpenAI-compatible)
        } else {
          let endpoint = '';
          if (provider === 'openai') {
            providerName = 'OpenAI';
            endpoint = 'https://api.openai.com/v1/chat/completions';
          } else if (provider === 'deepseek') {
            providerName = 'DeepSeek';
            endpoint = 'https://api.deepseek.com/chat/completions';
          } else if (provider === 'groq') {
            providerName = 'Groq';
            endpoint = 'https://api.groq.com/openai/v1/chat/completions';
          } else {
            providerName = 'Custom AI';
            endpoint = customEndpoint || 'https://openrouter.ai/api/v1/chat/completions';
            if (endpoint.endsWith('/')) endpoint = endpoint.slice(0, -1);
            if (!endpoint.endsWith('/chat/completions')) {
              endpoint += endpoint.endsWith('/v1') ? '/chat/completions' : '/v1/chat/completions';
            }
          }

          const headers = { 'Content-Type': 'application/json' };
          if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;
          if (endpoint.includes('openrouter.ai')) {
            headers['HTTP-Referer'] = 'https://github.com/ext/JP';
            headers['X-Title'] = 'JP Furigana Hover Pro';
          }

          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 20000);

          const res = await fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              model: model,
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
              ],
              temperature: 0.2,
              max_tokens: task === 'translate' ? 400 : 1200
            }),
            signal: controller.signal
          });
          clearTimeout(timer);

          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            const errMsg = errData?.error?.message || errData?.message || `HTTP ${res.status}`;
            throw new Error(`${providerName}: ${errMsg}`);
          }
          const data = await res.json();
          resultText = data?.choices?.[0]?.message?.content?.trim() || data?.response?.trim() || '';
        }

        if (!resultText) {
          throw new Error('Mô hình AI không trả về phản hồi hoặc nội dung rỗng.');
        }

        sendResponse({
          success: true,
          result: resultText,
          provider: provider,
          providerName: providerName,
          model: model,
          task: task
        });

      } catch (err) {
        sendResponse({
          success: false,
          error: err.message || 'Lỗi không xác định khi kết nối với AI API.'
        });
      }
    })();
    return true;
  }
});
