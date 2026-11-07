/**
 * AnkiConnect Client Library
 * Kết nối trực tiếp Anki Desktop qua localhost:8765
 * Hỗ trợ 1-click thêm từ vựng, tự động tạo Deck, phát hiện Fields của Model
 */

class AnkiConnectClient {
  constructor(host = 'http://127.0.0.1:8765') {
    this.host = host;
    this.version = 6;
  }

  /**
   * Gửi request tới AnkiConnect
   */
  async invoke(action, params = {}) {
    const payload = {
      action,
      version: this.version,
      params
    };

    // Thử gửi trực tiếp trước
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(this.host, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data.result;
    } catch (err) {
      // Nếu chạy trong Content script và bị chặn CORS / Mixed content, gửi qua Background Service Worker
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
        try {
          const bgResponse = await new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(
              { action: 'ANKI_PROXY_REQUEST', payload, host: this.host },
              (res) => {
                if (chrome.runtime.lastError) {
                  return reject(new Error(chrome.runtime.lastError.message));
                }
                if (!res || !res.success) {
                  return reject(new Error(res ? res.error : 'Không nhận được phản hồi từ Anki'));
                }
                resolve(res.result);
              }
            );
          });
          return bgResponse;
        } catch (bgErr) {
          throw new Error('Không thể kết nối đến Anki Desktop. Hãy mở Anki và đảm bảo đã cài add-on AnkiConnect (Mã: 2055492159).');
        }
      }
      throw new Error('Không thể kết nối đến Anki Desktop (' + err.message + ')');
    }
  }

  /**
   * Kiểm tra xem Anki Desktop có đang bật và AnkiConnect có hoạt động không
   */
  async checkConnection() {
    try {
      const ver = await this.invoke('version');
      return { connected: true, version: ver };
    } catch (err) {
      return { connected: false, error: err.message };
    }
  }

  /**
   * Lấy danh sách Decks hiện có
   */
  async getDeckNames() {
    return await this.invoke('deckNames');
  }

  /**
   * Tạo Deck mới nếu chưa có
   */
  async createDeck(deckName) {
    if (!deckName) return null;
    return await this.invoke('createDeck', { deck: deckName });
  }

  /**
   * Lấy danh sách tên Models (Note Types)
   */
  async getModelNames() {
    return await this.invoke('modelNames');
  }

  /**
   * Lấy danh sách các trường (Fields) của một Model
   */
  async getModelFieldNames(modelName) {
    return await this.invoke('modelFieldNames', { modelName });
  }

  /**
   * Thêm thẻ từ vựng vào Anki
   * @param {Object} cardData
   * {
   *   word: '約束',
   *   reading: 'やくそく',
   *   romaji: 'yakusoku',
   *   hanviet: 'ƯỚC THÚC',
   *   meaning: 'Lời hứa, hẹn ước',
   *   pitchAccent: '0 (Heiban)',
   *   sentence: '約束を守る。',
   *   sentenceVi: 'Giữ lời hứa.',
   *   deckName: 'JP Hover Deck',
   *   modelName: 'Basic',
   *   tags: ['jp_hover', 'n4']
   * }
   */
  async addWordNote(cardData) {
    const deckName = cardData.deckName || 'JP Hover Notebook';
    let modelName = cardData.modelName || 'Basic';

    // Đảm bảo deck tồn tại
    try {
      await this.createDeck(deckName);
    } catch (_) {}

    // Lấy fields của model
    let fieldsInModel = ['Front', 'Back'];
    try {
      const modelFields = await this.getModelFieldNames(modelName);
      if (Array.isArray(modelFields) && modelFields.length > 0) {
        fieldsInModel = modelFields;
      }
    } catch (_) {
      // Dùng fallback Basic
      modelName = 'Basic';
    }

    // Xây dựng nội dung các trường thông minh
    const word = cardData.word || '';
    const reading = cardData.reading || '';
    const hanviet = cardData.hanviet ? `[${cardData.hanviet}]` : '';
    const meaning = cardData.meaning || '';
    const pitch = cardData.pitchAccent ? `<div><small style="color:#64748b;">Pitch: ${cardData.pitchAccent}</small></div>` : '';
    const sentence = cardData.sentence ? `<div style="margin-top:10px;padding:8px;background:#f8fafc;border-left:3px solid #38bdf8;font-size:14px;"><strong>Ngữ cảnh:</strong> ${cardData.sentence}</div>` : '';

    const fieldsPayload = {};

    // Nếu model là Basic chuẩn: Front / Back
    if (fieldsInModel.includes('Front') && fieldsInModel.includes('Back')) {
      fieldsPayload['Front'] = `<div style="font-size: 28px; font-weight: bold; text-align: center;">${word}</div>` +
        (cardData.sentence ? `<div style="margin-top: 12px; font-size: 14px; color: #475569; text-align: center;">${cardData.sentence}</div>` : '');

      fieldsPayload['Back'] = `<div style="font-size: 22px; color: #0284c7; text-align: center;">${reading}</div>` +
        (hanviet ? `<div style="font-size: 15px; color: #ea580c; text-align: center; margin-top:4px;">${hanviet}</div>` : '') +
        `<div style="font-size: 17px; margin-top: 10px; font-weight: 500;">${meaning}</div>` +
        pitch + sentence;
    } else {
      // Nếu là Model chuyên biệt cho tiếng Nhật (e.g., Japanese, Mining, Core2k/6k)
      fieldsInModel.forEach(f => {
        const fLower = f.toLowerCase();
        if (fLower.includes('expression') || fLower.includes('kanji') || fLower.includes('vocab') || fLower.includes('word')) {
          fieldsPayload[f] = word;
        } else if (fLower.includes('reading') || fLower.includes('furigana') || fLower.includes('kana')) {
          fieldsPayload[f] = reading;
        } else if (fLower.includes('meaning') || fLower.includes('definition') || fLower.includes('glossary')) {
          fieldsPayload[f] = meaning + (hanviet ? ` (${hanviet})` : '');
        } else if (fLower.includes('sentence') || fLower.includes('context') || fLower.includes('example')) {
          fieldsPayload[f] = cardData.sentence || '';
        } else if (fLower.includes('notes') || fLower.includes('hanviet')) {
          fieldsPayload[f] = hanviet;
        } else {
          // Gán mặc định vào trường đầu tiên nếu chưa gán
          if (f === fieldsInModel[0] && !fieldsPayload[f]) {
            fieldsPayload[f] = word;
          } else if (f === fieldsInModel[1] && !fieldsPayload[f]) {
            fieldsPayload[f] = `${reading} - ${meaning}`;
          }
        }
      });
    }

    const notePayload = {
      deckName,
      modelName,
      fields: fieldsPayload,
      options: {
        allowDuplicate: false,
        duplicateScope: 'deck'
      },
      tags: Array.isArray(cardData.tags) ? cardData.tags : ['jp_hover_extension']
    };

    const noteId = await this.invoke('addNote', { note: notePayload });
    return { success: true, noteId, deckName };
  }
}

// Khởi tạo instance toàn cục
const ankiConnect = new AnkiConnectClient();
if (typeof window !== 'undefined') {
  window.ankiConnect = ankiConnect;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AnkiConnectClient, ankiConnect };
}

