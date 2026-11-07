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
  translationEngine: 'google',
  geminiApiKey: '',

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
});
