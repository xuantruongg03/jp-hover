/**
 * AI Service Module for JP Furigana Hover Pro (v1.7.0)
 * Hỗ trợ đa nền tảng AI: Google Gemini, OpenAI, Claude, DeepSeek, Groq, và Custom/Ollama/OpenRouter
 * Cung cấp dịch câu ngữ cảnh, phân tích ngữ pháp JLPT chuyên sâu, giải thích từ vựng & sửa câu.
 */

const JP_AI_PROVIDERS = {
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    badge: 'Gemini',
    models: ['gemini-flash-latest', 'gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-2.5-pro', 'gemini-pro-latest'],
    defaultModel: 'gemini-flash-latest',
    keyLink: 'https://aistudio.google.com/app/apikey',
    keyPlaceholder: 'Nhập Google Gemini API Key (AI Studio)...',
    requiresKey: true
  },
  openai: {
    id: 'openai',
    name: 'OpenAI',
    badge: 'GPT',
    models: ['gpt-4o-mini', 'gpt-4o', 'gpt-3.5-turbo'],
    defaultModel: 'gpt-4o-mini',
    keyLink: 'https://platform.openai.com/api-keys',
    keyPlaceholder: 'Nhập OpenAI API Key (sk-...)...',
    requiresKey: true
  },
  claude: {
    id: 'claude',
    name: 'Anthropic Claude',
    badge: 'Claude',
    models: ['claude-3-5-haiku-20241022', 'claude-3-5-sonnet-20241022', 'claude-3-haiku-20240307'],
    defaultModel: 'claude-3-5-haiku-20241022',
    keyLink: 'https://console.anthropic.com/settings/keys',
    keyPlaceholder: 'Nhập Anthropic Claude API Key (sk-ant-...)...',
    requiresKey: true
  },
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    badge: 'DeepSeek',
    models: ['deepseek-chat', 'deepseek-reasoner'],
    defaultModel: 'deepseek-chat',
    keyLink: 'https://platform.deepseek.com/api_keys',
    keyPlaceholder: 'Nhập DeepSeek API Key (sk-...)...',
    requiresKey: true
  },
  groq: {
    id: 'groq',
    name: 'Groq (Siêu tốc)',
    badge: 'Groq',
    models: ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768'],
    defaultModel: 'llama-3.3-70b-versatile',
    keyLink: 'https://console.groq.com/keys',
    keyPlaceholder: 'Nhập Groq API Key (gsk_...)...',
    requiresKey: true
  },
  custom: {
    id: 'custom',
    name: 'Tùy chỉnh (OpenAI-compatible / Ollama / OpenRouter)',
    badge: 'Custom AI',
    models: ['qwen2.5:7b', 'llama3', 'mistral', 'custom-model'],
    defaultModel: 'qwen2.5:7b',
    keyLink: 'https://openrouter.ai/keys',
    keyPlaceholder: 'Nhập API Key (để trống nếu dùng Ollama nội bộ)...',
    requiresKey: false
  }
};

class JapaneseAiService {
  constructor() {
    this.providers = JP_AI_PROVIDERS;
  }

  /**
   * Lấy thông tin cấu hình nhà cung cấp
   */
  getProviderInfo(providerId) {
    return this.providers[providerId] || this.providers.gemini;
  }

  /**
   * Gửi yêu cầu AI thông qua Background Service Worker để tránh CORS và CSP
   * @param {object} options
   */
  async request(options = {}) {
    return new Promise((resolve) => {
      if (typeof chrome === 'undefined' || !chrome.runtime || !chrome.runtime.sendMessage) {
        resolve({
          success: false,
          error: 'Extension runtime không khả dụng trên trang này.'
        });
        return;
      }

      chrome.runtime.sendMessage(
        {
          action: 'AI_CHAT_REQUEST',
          ...options
        },
        (res) => {
          if (chrome.runtime.lastError) {
            resolve({
              success: false,
              error: chrome.runtime.lastError.message
            });
          } else {
            resolve(res || { success: false, error: 'Không nhận được phản hồi từ AI service worker.' });
          }
        }
      );
    });
  }

  /**
   * Dịch câu hoặc văn bản thông minh bằng AI
   */
  async translate(text, options = {}) {
    return this.request({
      task: 'translate',
      text: text,
      direction: options.direction || 'auto',
      ...options
    });
  }

  /**
   * Phân tích ngữ pháp câu tiếng Nhật chuyên sâu JLPT
   */
  async explainGrammar(text, options = {}) {
    return this.request({
      task: 'grammar',
      text: text,
      ...options
    });
  }

  /**
   * Giải thích chuyên sâu từ vựng, sắc thái và 2 câu ví dụ kèm Furigana
   */
  async explainWord(word, options = {}) {
    return this.request({
      task: 'explain_word',
      text: word,
      ...options
    });
  }

  /**
   * Sửa câu và gợi ý cách diễn đạt tiếng Nhật tự nhiên
   */
  async proofread(text, options = {}) {
    return this.request({
      task: 'proofread',
      text: text,
      ...options
    });
  }

  /**
   * Kiểm tra kết nối API Key và Model (Ping test)
   */
  async testConnection(config = {}) {
    return this.request({
      task: 'test_connection',
      ...config
    });
  }

  /**
   * Format văn bản Markdown trả về từ AI sang HTML an toàn tuyệt đối chống XSS
   */
  formatMarkdown(rawText) {
    if (!rawText) return '';
    const escaped = String(rawText)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return escaped
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#38bdf8;font-weight:700;">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em style="color:#cbd5e1;">$1</em>')
      .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.08);color:#f472b6;padding:1px 5px;border-radius:4px;font-family:monospace;font-size:11.5px;">$1</code>')
      .replace(/^### (.*$)/gim, '<div style="font-weight:700;color:#38bdf8;margin:10px 0 4px;font-size:12.5px;letter-spacing:0.2px;">$1</div>')
      .replace(/^## (.*$)/gim, '<div style="font-weight:700;color:#60a5fa;margin:12px 0 4px;font-size:13.5px;">$1</div>')
      .replace(/^# (.*$)/gim, '<div style="font-weight:700;color:#93c5fd;margin:14px 0 6px;font-size:14.5px;">$1</div>')
      .replace(/^\s*[-*]\s+(.*$)/gim, '<div style="display:flex;gap:7px;margin:3px 0;padding-left:6px;line-height:1.5;"><span style="color:#38bdf8;flex-shrink:0;">•</span><span>$1</span></div>')
      .replace(/^\s*(\d+)\.\s+(.*$)/gim, '<div style="display:flex;gap:6px;margin:5px 0 2px;padding-left:4px;line-height:1.5;"><span style="font-weight:700;color:#a855f7;flex-shrink:0;">$1.</span><span>$2</span></div>')
      .replace(/\n\n+/g, '<div style="height:8px;"></div>')
      .replace(/\n/g, '<br/>');
  }
}

// Khởi tạo Singleton
const japaneseAiService = new JapaneseAiService();

if (typeof window !== 'undefined') {
  window.japaneseAiService = japaneseAiService;
  window.JP_AI_PROVIDERS = JP_AI_PROVIDERS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { japaneseAiService, JP_AI_PROVIDERS };
}

