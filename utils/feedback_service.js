/**
 * Feedback & Custom Word Fix Service for JP Furigana Hover Pro
 * Cho phép người dùng báo lỗi từ sai, góp ý tính năng, đồng bộ bản sửa cục bộ ngay lập tức
 * và gửi báo cáo qua GitHub Issues, Webhook (Discord/Formspree/Google Script) hoặc Clipboard/Export.
 */

const JP_FEEDBACK_REPO_URL = 'https://github.com/xuantruongg03/jp-hover';
const JP_FEEDBACK_EMAIL = 'lexuantruong098@gmail.com';

const JP_FEEDBACK_CATEGORIES = {
  wrong_reading: {
    id: 'wrong_reading',
    label: '🔤 Sai phiên âm (Furigana / Romaji / Audio)',
    githubLabel: 'word-fix',
    isWordIssue: true
  },
  wrong_meaning: {
    id: 'wrong_meaning',
    label: '💡 Sai nghĩa / Thiếu nghĩa tiếng Việt',
    githubLabel: 'word-fix',
    isWordIssue: true
  },
  wrong_onkun: {
    id: 'wrong_onkun',
    label: '📖 Sai quy tắc On/Kun / Hán-Việt',
    githubLabel: 'word-fix',
    isWordIssue: true
  },
  wrong_segment: {
    id: 'wrong_segment',
    label: '✂️ Sai tách từ / Chia thể ngữ pháp',
    githubLabel: 'word-fix',
    isWordIssue: true
  },
  bug: {
    id: 'bug',
    label: '🐛 Lỗi giao diện / Chức năng',
    githubLabel: 'bug',
    isWordIssue: false
  },
  suggestion: {
    id: 'suggestion',
    label: '✨ Góp ý / Đề xuất tính năng mới',
    githubLabel: 'enhancement',
    isWordIssue: false
  }
};

class JapaneseFeedbackService {
  constructor() {
    this.repoUrl = JP_FEEDBACK_REPO_URL;
    this.supportEmail = JP_FEEDBACK_EMAIL;
    this.categories = JP_FEEDBACK_CATEGORIES;
  }

  getSupportEmail() {
    return this.supportEmail;
  }

  getCategoriesList() {
    return Object.values(this.categories);
  }

  getCategoryInfo(categoryId) {
    return this.categories[categoryId] || this.categories.suggestion;
  }

  getExtensionVersion() {
    try {
      if (typeof chrome !== 'undefined' && chrome.runtime && typeof chrome.runtime.getManifest === 'function') {
        return chrome.runtime.getManifest().version || '1.6.4';
      }
    } catch (_) {}
    return '1.6.4';
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  _getStorage(keys) {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(keys, (res) => resolve(res || {}));
      } else {
        const res = {};
        const keyList = Array.isArray(keys) ? keys : [keys];
        keyList.forEach((k) => {
          try {
            const raw = localStorage.getItem(k);
            if (raw) res[k] = JSON.parse(raw);
          } catch (_) {}
        });
        resolve(res);
      }
    });
  }

  _setStorage(data) {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set(data, () => resolve());
      } else {
        Object.keys(data).forEach((k) => {
          try {
            localStorage.setItem(k, JSON.stringify(data[k]));
          } catch (_) {}
        });
        resolve();
      }
    });
  }

  /**
   * Lấy danh sách từ điển cá nhân do người dùng tự sửa
   */
  async getCustomDictionary() {
    const res = await this._getStorage(['jpCustomDictionary']);
    return (res && res.jpCustomDictionary && typeof res.jpCustomDictionary === 'object')
      ? res.jpCustomDictionary
      : {};
  }

  /**
   * Lưu bản sửa từ vựng vào từ điển cá nhân và áp dụng ngay lập tức
   */
  async saveCustomWord(word, patch = {}) {
    const cleanWord = (word || '').trim();
    if (!cleanWord) return null;

    const dict = await this.getCustomDictionary();
    const existing = dict[cleanWord] || {};

    const nextReading = (patch.reading !== undefined ? patch.reading : existing.r || '').trim();
    const nextMeaning = (patch.meaning !== undefined ? patch.meaning : existing.m || '').trim();

    if (!nextReading && !nextMeaning) return null;

    dict[cleanWord] = {
      r: nextReading,
      speechText: nextReading,
      m: nextMeaning,
      t: patch.type || existing.t || 'Đã tùy chỉnh',
      isCustomOverride: true,
      updatedAt: Date.now()
    };

    await this._setStorage({ jpCustomDictionary: dict });
    this._syncDictionaryRuntime(dict);
    return dict[cleanWord];
  }

  /**
   * Xóa một từ khỏi từ điển cá nhân để khôi phục dữ liệu gốc
   */
  async deleteCustomWord(word) {
    const cleanWord = (word || '').trim();
    if (!cleanWord) return false;

    const dict = await this.getCustomDictionary();
    if (dict[cleanWord]) {
      delete dict[cleanWord];
      await this._setStorage({ jpCustomDictionary: dict });
      this._syncDictionaryRuntime(dict);
      return true;
    }
    return false;
  }

  _syncDictionaryRuntime(dict) {
    try {
      if (typeof setCustomDictionaryOverrides === 'function') {
        setCustomDictionaryOverrides(dict);
      } else if (typeof window !== 'undefined' && typeof window.setCustomDictionaryOverrides === 'function') {
        window.setCustomDictionaryOverrides(dict);
      }
      if (typeof japaneseEngine !== 'undefined' && japaneseEngine && japaneseEngine.onlineCache) {
        japaneseEngine.onlineCache.clear();
      }
    } catch (_) {}
  }

  /**
   * Lấy lịch sử báo cáo lỗi / góp ý đã lưu
   */
  async getReports() {
    const res = await this._getStorage(['jpFeedbackReports']);
    return Array.isArray(res.jpFeedbackReports) ? res.jpFeedbackReports : [];
  }

  async saveReportRecord(report) {
    const list = await this.getReports();
    const updated = [report, ...list.filter(r => r.id !== report.id)].slice(0, 100);
    await this._setStorage({ jpFeedbackReports: updated });
    return report;
  }

  async updateReportStatus(reportId, status) {
    if (!reportId) return false;
    const list = await this.getReports();
    const idx = list.findIndex(r => r.id === reportId);
    if (idx === -1) return false;
    list[idx] = { ...list[idx], status, updatedAt: Date.now() };
    await this._setStorage({ jpFeedbackReports: list });
    return true;
  }

  async deleteReport(reportId) {
    const list = await this.getReports();
    const next = list.filter(r => r.id !== reportId);
    await this._setStorage({ jpFeedbackReports: next });
    return next;
  }

  async clearReports() {
    await this._setStorage({ jpFeedbackReports: [] });
  }

  /**
   * Chuẩn hóa dữ liệu báo cáo thành bản ghi đầy đủ
   */
  createReportRecord(input = {}) {
    const cat = this.getCategoryInfo(input.category);
    const cleanWord = (input.word || '').trim();
    const customTitle = (input.title || '').trim();

    let title = customTitle;
    if (!title) {
      if (cat.isWordIssue && cleanWord) {
        title = `[${cat.label.replace(/^[^\s]+\s/, '')}] ${cleanWord}`;
      } else {
        title = `[${cat.label.replace(/^[^\s]+\s/, '')}] Phản hồi từ người dùng`;
      }
    }

    return {
      id: input.id || `rep_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: input.createdAt || Date.now(),
      version: this.getExtensionVersion(),
      category: cat.id,
      categoryLabel: cat.label,
      githubLabel: cat.githubLabel,
      title,
      word: cleanWord,
      currentReading: (input.currentReading || '').trim(),
      currentRomaji: (input.currentRomaji || '').trim(),
      currentMeaning: (input.currentMeaning || '').trim(),
      currentHanViet: (input.currentHanViet || '').trim(),
      currentOnKun: (input.currentOnKun || '').trim(),
      contextSentence: (input.contextSentence || '').trim().slice(0, 240),
      suggestedReading: (input.suggestedReading || '').trim(),
      suggestedMeaning: (input.suggestedMeaning || '').trim(),
      note: (input.note || '').trim(),
      source: (input.source || 'Tooltip').trim(),
      pageDomain: input.includeDomain && input.pageDomain ? String(input.pageDomain).trim() : '',
      status: input.status || 'saved',
      overrideApplied: !!input.overrideApplied
    };
  }

  /**
   * Định dạng báo cáo thành Markdown sạch đẹp
   */
  formatReportMarkdown(report) {
    const lines = [];
    lines.push(`### ${report.title}`);
    lines.push(`- **Phân loại:** ${report.categoryLabel}`);
    lines.push(`- **Phiên bản Extension:** v${report.version}`);
    lines.push(`- **Nguồn gửi:** ${report.source}`);
    if (report.pageDomain) {
      lines.push(`- **Trang web:** \`${report.pageDomain}\``);
    }

    if (report.word) {
      lines.push('');
      lines.push('#### 🔍 Thông tin từ hiện tại');
      lines.push(`- **Từ vựng:** \`${report.word}\``);
      if (report.currentReading) lines.push(`- **Phiên âm hiện tại:** ${report.currentReading}`);
      if (report.currentRomaji) lines.push(`- **Romaji hiện tại:** ${report.currentRomaji}`);
      if (report.currentHanViet) lines.push(`- **Âm Hán-Việt:** ${report.currentHanViet}`);
      if (report.currentMeaning) lines.push(`- **Nghĩa hiện tại:** ${report.currentMeaning}`);
      if (report.currentOnKun) lines.push(`- **Quy tắc On/Kun:** ${report.currentOnKun}`);
      if (report.contextSentence) lines.push(`- **Câu ngữ cảnh:** ${report.contextSentence}`);
    }

    if (report.suggestedReading || report.suggestedMeaning) {
      lines.push('');
      lines.push('#### ✏️ Đề xuất chỉnh sửa');
      if (report.suggestedReading) lines.push(`- **Phiên âm đúng:** ${report.suggestedReading}`);
      if (report.suggestedMeaning) lines.push(`- **Nghĩa đúng:** ${report.suggestedMeaning}`);
    }

    if (report.note) {
      lines.push('');
      lines.push('#### 📝 Mô tả chi tiết / Góp ý');
      lines.push(report.note);
    }

    return lines.join('\n');
  }

  /**
   * Tạo URL GitHub New Issue đã điền sẵn tiêu đề, nhãn và nội dung
   */
  buildGitHubIssueUrl(report, customRepoUrl = '') {
    const base = (customRepoUrl || this.repoUrl).replace(/\/+$/, '');
    let body = this.formatReportMarkdown(report);
    if (body.length > 4500) {
      body = body.slice(0, 4500) + '\n\n...(đã rút gọn nội dung cho vừa độ dài URL)';
    }

    const params = new URLSearchParams({
      title: report.title,
      body,
      labels: report.githubLabel || 'bug'
    });

    return `${base}/issues/new?${params.toString()}`;
  }

  /**
   * Định dạng báo cáo dạng văn bản thuần sạch đẹp để gửi qua Email
   */
  formatReportEmailText(report) {
    const lines = [];
    lines.push(report.title || 'Góp ý / Báo lỗi JP Hover Pro');
    lines.push(`Phân loại: ${report.categoryLabel}`);
    lines.push(`Phiên bản Extension: v${report.version}`);
    lines.push(`Nguồn gửi: ${report.source}`);
    if (report.pageDomain) {
      lines.push(`Trang web: ${report.pageDomain}`);
    }

    if (report.word) {
      lines.push('');
      lines.push('--- Thông tin từ hiện tại ---');
      lines.push(`Từ vựng: ${report.word}`);
      if (report.currentReading) lines.push(`Phiên âm hiện tại: ${report.currentReading}`);
      if (report.currentRomaji) lines.push(`Romaji hiện tại: ${report.currentRomaji}`);
      if (report.currentHanViet) lines.push(`Âm Hán-Việt: ${report.currentHanViet}`);
      if (report.currentMeaning) lines.push(`Nghĩa hiện tại: ${report.currentMeaning}`);
      if (report.currentOnKun) lines.push(`Quy tắc On/Kun: ${report.currentOnKun}`);
      if (report.contextSentence) lines.push(`Câu ngữ cảnh: ${report.contextSentence}`);
    }

    if (report.suggestedReading || report.suggestedMeaning) {
      lines.push('');
      lines.push('--- Đề xuất chỉnh sửa ---');
      if (report.suggestedReading) lines.push(`Phiên âm đúng: ${report.suggestedReading}`);
      if (report.suggestedMeaning) lines.push(`Nghĩa đúng: ${report.suggestedMeaning}`);
    }

    if (report.note) {
      lines.push('');
      lines.push('--- Mô tả chi tiết / Góp ý ---');
      lines.push(report.note);
    }

    return lines.join('\n');
  }

  /**
   * Tạo liên kết mailto: gửi góp ý / báo lỗi qua Email mặc định
   */
  buildMailtoUrl(report, customEmail = '') {
    const to = (customEmail || this.supportEmail || JP_FEEDBACK_EMAIL).trim();
    const subject = `[JP Hover Pro v${report.version}] ${report.title || 'Góp ý / Báo lỗi'}`.slice(0, 180);
    let body = this.formatReportEmailText(report);
    if (body.length > 1500) {
      body = body.slice(0, 1500) + '\n\n...(đã rút gọn cho vừa giới hạn độ dài email)';
    }
    return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  /**
   * Tạo liên kết mở trình soạn thảo Gmail Web đã điền sẵn người nhận, tiêu đề & nội dung
   */
  buildGmailComposeUrl(report, customEmail = '') {
    const to = (customEmail || this.supportEmail || JP_FEEDBACK_EMAIL).trim();
    const subject = `[JP Hover Pro v${report.version}] ${report.title || 'Góp ý / Báo lỗi'}`.slice(0, 180);
    let body = this.formatReportEmailText(report);
    if (body.length > 1500) {
      body = body.slice(0, 1500) + '\n\n...(đã rút gọn cho vừa giới hạn URL)';
    }
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  /**
   * Mở trình gửi Email mặc định với mailto URL an toàn trên mọi môi trường (Popup / Web / Flashcards)
   */
  openMailto(mailtoUrl) {
    if (!mailtoUrl) return false;
    try {
      const isExtPopup = typeof location !== 'undefined' &&
        location.protocol === 'chrome-extension:' &&
        String(location.pathname || '').endsWith('popup.html');
      if (isExtPopup && typeof chrome !== 'undefined' && chrome.tabs && typeof chrome.tabs.create === 'function') {
        chrome.tabs.create({ url: mailtoUrl });
        return true;
      }
      if (typeof document !== 'undefined' && typeof document.createElement === 'function') {
        const a = document.createElement('a');
        a.href = mailtoUrl;
        a.rel = 'noopener noreferrer';
        a.style.display = 'none';
        (document.body || document.documentElement).appendChild(a);
        a.click();
        a.remove();
        return true;
      }
      if (typeof window !== 'undefined' && typeof window.open === 'function') {
        window.open(mailtoUrl, '_blank', 'noopener,noreferrer');
        return true;
      }
    } catch (_) {}
    return false;
  }

  /**
   * Kiểm tra tính hợp lệ của Webhook URL (chỉ cho phép HTTP/HTTPS)
   */
  isValidWebhookUrl(url) {
    if (!url || typeof url !== 'string') return false;
    try {
      const parsed = new URL(url.trim());
      return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch (_) {
      return false;
    }
  }

  /**
   * Đóng gói payload tương thích Discord, Slack hoặc Webhook JSON tùy chỉnh
   */
  buildWebhookPayload(webhookUrl, report) {
    const cleanUrl = (webhookUrl || '').toLowerCase();
    const markdown = this.formatReportMarkdown(report);

    // Discord Webhook Format
    if (cleanUrl.includes('discord.com/api/webhooks/') || cleanUrl.includes('discordapp.com/api/webhooks/')) {
      const fields = [];
      if (report.word) fields.push({ name: 'Từ vựng', value: report.word, inline: true });
      if (report.currentReading) fields.push({ name: 'Đọc hiện tại', value: report.currentReading, inline: true });
      if (report.suggestedReading) fields.push({ name: 'Đọc đề xuất', value: report.suggestedReading, inline: true });
      if (report.currentMeaning) fields.push({ name: 'Nghĩa hiện tại', value: report.currentMeaning.slice(0, 300), inline: false });
      if (report.suggestedMeaning) fields.push({ name: 'Nghĩa đề xuất', value: report.suggestedMeaning.slice(0, 300), inline: false });
      if (report.contextSentence) fields.push({ name: 'Ngữ cảnh', value: report.contextSentence.slice(0, 300), inline: false });
      if (report.note) fields.push({ name: 'Mô tả / Góp ý', value: report.note.slice(0, 800), inline: false });

      return {
        username: 'JP Hover Feedback',
        embeds: [{
          title: report.title,
          description: `Phân loại: **${report.categoryLabel}** | Phiên bản: \`v${report.version}\``,
          color: report.githubLabel === 'bug' ? 0xef4444 : (report.githubLabel === 'word-fix' ? 0xf59e0b : 0x38bdf8),
          fields: fields.slice(0, 10),
          footer: { text: report.pageDomain ? `Domain: ${report.pageDomain}` : `Source: ${report.source}` },
          timestamp: new Date(report.createdAt).toISOString()
        }]
      };
    }

    // Slack Webhook Format
    if (cleanUrl.includes('hooks.slack.com/')) {
      return { text: markdown };
    }

    // Generic JSON Webhook / Formspree / Google Apps Script
    return {
      source: 'jp-hover-extension',
      ...report,
      markdown
    };
  }

  /**
   * Gửi báo cáo tới Webhook thông qua Background Service Worker để tránh CORS/CSP
   */
  async sendWebhook(webhookUrl, report) {
    if (!this.isValidWebhookUrl(webhookUrl)) {
      return { success: false, error: 'Webhook URL không hợp lệ (chỉ hỗ trợ http/https).' };
    }

    const payload = this.buildWebhookPayload(webhookUrl, report);

    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      return new Promise((resolve) => {
        chrome.runtime.sendMessage(
          { action: 'SUBMIT_FEEDBACK_WEBHOOK', url: webhookUrl.trim(), payload },
          (res) => {
            if (chrome.runtime.lastError) {
              resolve({ success: false, error: chrome.runtime.lastError.message });
              return;
            }
            resolve(res || { success: false, error: 'Không nhận được phản hồi từ Background.' });
          }
        );
      });
    }

    try {
      const response = await fetch(webhookUrl.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        return { success: false, error: `HTTP ${response.status}` };
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  /**
   * Quy trình hoàn chỉnh khi người dùng bấm Gửi / Lưu báo cáo
   */
  async submitReport(input = {}, options = {}) {
    const record = this.createReportRecord(input);
    let overrideApplied = false;

    // 1. Áp dụng bản sửa ngay cho từ điển cá nhân nếu người dùng chọn
    if (options.applyLocalOverride && record.word && (record.suggestedReading || record.suggestedMeaning)) {
      const savedOverride = await this.saveCustomWord(record.word, {
        reading: record.suggestedReading || record.currentReading,
        meaning: record.suggestedMeaning || record.currentMeaning
      });
      if (savedOverride) {
        overrideApplied = true;
        record.overrideApplied = true;
      }
    }

    // 2. Gửi qua Webhook nếu người dùng / dev đã cấu hình
    let webhookResult = null;
    const webhookUrl = (options.webhookUrl || '').trim();
    if (webhookUrl) {
      webhookResult = await this.sendWebhook(webhookUrl, record);
      if (webhookResult && webhookResult.success) {
        record.status = 'webhook_sent';
      }
    }

    // 3. Lưu lại lịch sử cục bộ
    await this.saveReportRecord(record);

    const markdown = this.formatReportMarkdown(record);
    const githubUrl = this.buildGitHubIssueUrl(record);
    const mailtoUrl = this.buildMailtoUrl(record);
    const gmailUrl = this.buildGmailComposeUrl(record);

    return {
      success: true,
      report: record,
      markdown,
      githubUrl,
      supportEmail: this.supportEmail,
      mailtoUrl,
      gmailUrl,
      overrideApplied,
      webhookResult
    };
  }

  /**
   * Xuất toàn bộ báo cáo thành văn bản Markdown tổng hợp
   */
  exportReportsMarkdown(reports = []) {
    if (!Array.isArray(reports) || reports.length === 0) {
      return '# JP Hover Pro - Chưa có báo cáo nào';
    }
    const header = `# Tổng hợp Báo lỗi & Góp ý (JP Hover Pro)\nNgày xuất: ${new Date().toLocaleString('vi-VN')}\nTổng số: ${reports.length} mục\n\n---\n\n`;
    const body = reports.map((r, i) => {
      const dateStr = new Date(r.createdAt || Date.now()).toLocaleString('vi-VN');
      return `## #${i + 1} (${dateStr})\n` + this.formatReportMarkdown(r);
    }).join('\n\n---\n\n');
    return header + body;
  }
}

const japaneseFeedbackService = new JapaneseFeedbackService();

if (typeof window !== 'undefined') {
  window.japaneseFeedbackService = japaneseFeedbackService;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    JapaneseFeedbackService,
    japaneseFeedbackService,
    JP_FEEDBACK_REPO_URL,
    JP_FEEDBACK_EMAIL,
    JP_FEEDBACK_CATEGORIES
  };
}

