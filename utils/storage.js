/**
 * Module quản lý lưu trữ tập trung cho JP Furigana Hover (v1.4.0)
 * Hỗ trợ chrome.storage.local với fallback localStorage khi test
 * Tích hợp Spaced Repetition System (SRS SuperMemo SM-2) & Quản lý Thư mục Decks
 */

const JP_DEFAULT_SETTINGS = {
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
  voiceUri: '', // Tên/URI giọng đọc đã chọn
  translationEngine: 'google', // 'google' | 'ai' | 'gemini'
  geminiApiKey: '',

  // === Cấu hình Trí tuệ Nhân tạo Đa nền tảng (AI Engine) ===
  aiProvider: 'gemini', // 'gemini' | 'openai' | 'claude' | 'deepseek' | 'groq' | 'custom'
  aiApiKey: '',
  aiModel: 'gemini-1.5-flash',
  aiCustomEndpoint: '',
  aiEnableSentenceTranslate: true,
  aiEnableGrammarAnalysis: true,
  aiEnableWordExplain: true,

  // === AnkiConnect Settings ===
  ankiEnabled: true,
  ankiHost: 'http://127.0.0.1:8765',
  ankiDeckName: 'JP Hover Notebook',
  ankiModelName: 'Basic',

  // === Video Subtitle Hover Settings ===
  enableSubtitleHover: true,
  autoPauseVideoOnHover: false,

  // === SRS & Decks ===
  activeDeck: 'Mặc định',
  decks: ['Mặc định', 'Từ vựng JLPT', 'IT & Công nghệ', 'Đời sống & Manga']
};

// Đọc dữ liệu từ chrome.storage.local dạng Promise
function getStorage(keys) {
  return new Promise((resolve) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(keys, (res) => {
        resolve(res || {});
      });
    } else {
      const result = {};
      const keyList = Array.isArray(keys) ? keys : (typeof keys === 'string' ? [keys] : Object.keys(keys || {}));
      keyList.forEach(k => {
        try {
          const val = localStorage.getItem(k);
          if (val) result[k] = JSON.parse(val);
        } catch (_) {}
      });
      resolve(result);
    }
  });
}

// Lưu dữ liệu vào chrome.storage.local dạng Promise
function setStorage(data) {
  return new Promise((resolve, reject) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set(data, () => {
        if (chrome.runtime && chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    } else {
      try {
        Object.keys(data).forEach(k => {
          localStorage.setItem(k, JSON.stringify(data[k]));
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    }
  });
}

// Lấy toàn bộ Settings
async function loadJpSettings() {
  const data = await getStorage(['jpSettings']);
  const s = { ...JP_DEFAULT_SETTINGS, ...(data.jpSettings || {}) };

  // Tương thích ngược: Nếu người dùng đã nhập Gemini API Key cũ
  if (s.geminiApiKey && !s.aiApiKey) {
    s.aiApiKey = s.geminiApiKey;
    s.aiProvider = 'gemini';
  }
  if (s.translationEngine === 'gemini') {
    s.translationEngine = 'ai';
    if (!s.aiProvider) s.aiProvider = 'gemini';
  }

  return s;
}

// Lưu Settings
async function saveJpSettings(newSettings) {
  const current = await loadJpSettings();
  const merged = { ...current, ...newSettings };
  await setStorage({ jpSettings: merged });
  return merged;
}

// Lấy danh sách từ vựng đã lưu trong Sổ tay
async function getSavedWords() {
  const data = await getStorage(['jpSavedWords']);
  const list = Array.isArray(data.jpSavedWords) ? data.jpSavedWords : [];
  
  // Tự động chuẩn hóa dữ liệu cũ sang chuẩn SRS mới nếu chưa có
  return list.map(item => {
    if (!item.srs) {
      item.srs = {
        interval: item.status === 'mastered' ? 14 : 1,
        repetition: item.status === 'mastered' ? 3 : 0,
        easeFactor: 2.5,
        nextReview: Date.now() - (item.status === 'mastered' ? 0 : 1000),
        history: []
      };
    }
    if (!item.deck) {
      item.deck = 'Mặc định';
    }
    return item;
  });
}

// Lưu danh sách từ vựng
async function saveSavedWordsList(list) {
  await setStorage({ jpSavedWords: list });
  return list;
}

// Lưu thêm từ mới vào Sổ tay
async function saveWordToNotebook(wordData) {
  if (!wordData || !wordData.word) return false;
  const list = await getSavedWords();
  const exists = list.some(item => item.word === wordData.word);
  if (!exists) {
    const item = {
      ...wordData,
      savedAt: Date.now(),
      status: 'learning', // 'learning' | 'mastered'
      deck: wordData.deck || 'Mặc định',
      tags: wordData.tags || [],
      srs: {
        interval: 1, // 1 ngày
        repetition: 0,
        easeFactor: 2.5,
        nextReview: Date.now(), // Cần ôn ngay trong phiên tới
        history: []
      }
    };
    list.unshift(item);
    await saveSavedWordsList(list);
    return true;
  }
  return false;
}

// Xóa từ khỏi Sổ tay
async function removeWordFromNotebook(wordText) {
  if (!wordText) return false;
  const list = await getSavedWords();
  const filtered = list.filter(item => item.word !== wordText);
  if (filtered.length !== list.length) {
    await saveSavedWordsList(filtered);
    return true;
  }
  return false;
}

// Kiểm tra xem từ đã được lưu trong Sổ tay chưa
async function isWordSavedInNotebook(wordText) {
  if (!wordText) return false;
  const list = await getSavedWords();
  return list.some(item => item.word === wordText);
}

/**
 * Thuật toán tính toán chu kỳ Lặp lại ngắt quãng SM-2 (SuperMemo 2)
 * @param {Object} currentSrs - Trạng thái SRS hiện tại của từ
 * @param {number} quality - 1 (Again), 2 (Hard), 3 (Good), 4 (Easy)
 * @returns {Object} srs mới cập nhật
 */
function calculateSM2(currentSrs, quality) {
  let { interval = 1, repetition = 0, easeFactor = 2.5, history = [] } = (currentSrs || {});

  // Giới hạn quality từ 1 đến 4
  quality = Math.max(1, Math.min(4, quality));

  if (quality === 1) {
    // Again: quên, làm lại từ đầu
    repetition = 0;
    interval = 1;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  } else if (quality === 2) {
    // Hard: nhớ nhưng chật vật
    interval = Math.max(1, Math.round(interval * 1.2));
    easeFactor = Math.max(1.3, easeFactor - 0.15);
  } else if (quality === 3) {
    // Good: nhớ đúng
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 3;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetition += 1;
  } else if (quality === 4) {
    // Easy: rất dễ
    if (repetition === 0) {
      interval = 2;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor * 1.3);
    }
    repetition += 1;
    easeFactor = Math.min(3.0, easeFactor + 0.15);
  }

  const nextReview = Date.now() + (interval * 24 * 60 * 60 * 1000);
  const updatedHistory = [...history, { time: Date.now(), quality, interval }];

  return {
    interval,
    repetition,
    easeFactor: parseFloat(easeFactor.toFixed(2)),
    nextReview,
    lastReviewed: Date.now(),
    history: updatedHistory.slice(-10) // Giữ tối đa 10 lần gần nhất
  };
}

// Cập nhật kết quả ôn tập SRS cho một từ
async function reviewWordSRS(wordText, quality) {
  const list = await getSavedWords();
  const wordItem = list.find(w => w.word === wordText);
  if (!wordItem) return null;

  const newSrs = calculateSM2(wordItem.srs, quality);
  wordItem.srs = newSrs;

  // Cập nhật trạng thái thuần thục
  if (newSrs.interval >= 21) {
    wordItem.status = 'mastered';
  } else {
    wordItem.status = 'learning';
  }

  await saveSavedWordsList(list);
  return wordItem;
}

// Lấy danh sách các từ đến hạn ôn tập hôm nay
async function getDueWords() {
  const list = await getSavedWords();
  const now = Date.now();
  return list.filter(item => {
    if (!item.srs || !item.srs.nextReview) return true;
    return item.srs.nextReview <= now;
  });
}

if (typeof window !== 'undefined') {
  window.saveWordToNotebook = saveWordToNotebook;
  window.isWordSavedInNotebook = isWordSavedInNotebook;
  window.removeWordFromNotebook = removeWordFromNotebook;
  window.getSavedWords = getSavedWords;
  window.loadJpSettings = loadJpSettings;
  window.saveJpSettings = saveJpSettings;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    JP_DEFAULT_SETTINGS,
    getStorage,
    setStorage,
    loadJpSettings,
    saveJpSettings,
    getSavedWords,
    saveSavedWordsList,
    saveWordToNotebook,
    removeWordFromNotebook,
    isWordSavedInNotebook,
    calculateSM2,
    reviewWordSRS,
    getDueWords
  };
}
