// Background Service Worker (Manifest V3)
// Quản lý phím tắt Alt+J, Badge icon trạng thái và đồng bộ cài đặt

const DEFAULT_SETTINGS = {
  enabled: true,
  activationMode: 'always', // 'always' | 'shift' | 'alt'
  showReading: true,
  showRomaji: true,
  showHanViet: true,
  showMeaning: true,
  autoPlayAudio: false,
  speechRate: 0.95
};

// Cập nhật Badge trên biểu tượng Extension
function updateBadge(enabled) {
  if (enabled) {
    chrome.action.setBadgeText({ text: 'ON' });
    chrome.action.setBadgeBackgroundColor({ color: '#10b981' }); // Màu xanh lục tươi
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
  if (area === 'local' && changes.jpSettings) {
    const newSettings = changes.jpSettings.newValue;
    if (newSettings && typeof newSettings.enabled !== 'undefined') {
      updateBadge(newSettings.enabled);
    }
  }
});

// Lắng nghe phím tắt toàn cục (Định nghĩa trong manifest commands: toggle-hover)
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-hover') {
    chrome.storage.local.get(['jpSettings'], (res) => {
      const current = res && res.jpSettings ? res.jpSettings : DEFAULT_SETTINGS;
      const newEnabled = current.enabled === false ? true : false;
      const updated = { ...current, enabled: newEnabled };

      chrome.storage.local.set({ jpSettings: updated }, () => {
        updateBadge(newEnabled);

        // Gửi trạng thái chính xác tuyệt đối (SET_STATE) đến tab đang hoạt động
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs && tabs[0] && tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, { 
              action: 'SET_STATE', 
              enabled: newEnabled 
            }).catch(() => {
              // Bỏ qua lỗi nếu tab không cho phép content script (e.g. chrome://)
            });
          }
        });
      });
    });
  }
});

// Lắng nghe yêu cầu mở trang Flashcards & Sổ tay toàn màn hình
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'OPEN_FLASHCARDS') {
    chrome.tabs.create({ url: chrome.runtime.getURL('flashcards.html') });
    sendResponse({ success: true });
  }
});
