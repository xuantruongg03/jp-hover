/**
 * YouTube & Netflix Japanese Subtitle Hover & Interactive Player Controller
 * Cho phép rê chuột tra từ trực tiếp trên phụ đề tiếng Nhật, tự động tạm dừng khi xem nghĩa
 * và tua lại từng câu thoại để luyện nghe (Immersion Learning).
 * 
 * Đã khắc phục triệt để lỗi chặn thao tác chuột trên thẻ video & thanh điều khiển (player controls).
 */

class SubtitleController {
  constructor() {
    this.enabled = true;
    this.enableSubtitleHover = true;
    this.autoPause = false;
    this.currentVideo = null;
    this.lastSubtitleText = '';
    this.isHoveringSubtitle = false;
    this.wasPausedByHover = false;
    this._scanScheduled = false;
    this.observer = null;
    this.styleElement = null;
    this.toastTimer = null;

    this.loadSettings();
    this.initObserver();
    this.initKeyListeners();
  }

  /**
   * Tải cài đặt từ Chrome Storage & lắng nghe thay đổi cấu hình
   */
  loadSettings() {
    const handleSettings = (res) => {
      const s = (res && res.jpSettings && typeof res.jpSettings === 'object') ? res.jpSettings : {};
      this.enabled = s.enabled !== false;
      this.enableSubtitleHover = s.enableSubtitleHover !== false;
      this.autoPause = s.autoPauseVideoOnHover === true;
      this.applyState();
    };

    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['jpSettings'], handleSettings);
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local' && changes.jpSettings) {
          handleSettings({ jpSettings: changes.jpSettings.newValue });
        }
      });
    } else {
      try {
        const val = localStorage.getItem('jpSettings');
        if (val) handleSettings({ jpSettings: JSON.parse(val) });
      } catch (_) {}
    }
  }

  /**
   * Cập nhật trạng thái cài đặt từ Content Script chính
   */
  updateSettings(settings) {
    if (!settings || typeof settings !== 'object') return;
    this.enabled = settings.enabled !== false;
    this.enableSubtitleHover = settings.enableSubtitleHover !== false;
    this.autoPause = settings.autoPauseVideoOnHover === true;
    this.applyState();
  }

  /**
   * Áp dụng trạng thái Bật/Tắt CSS và lớp can thiệp phụ đề
   */
  applyState() {
    const shouldBeActive = this.enabled && this.enableSubtitleHover;
    if (shouldBeActive) {
      this.initSubtitleStyles();
      this.scheduleScan();
    } else {
      this.removeSubtitleStyles();
      this.cleanupEnhancedElements();
    }
  }

  /**
   * Tiêm CSS an toàn cho phụ đề YouTube & Netflix:
   * - TUYỆT ĐỐI KHÔNG set pointer-events: auto trên các container bao ngoài (.ytp-caption-window-container, .player-timedtext,...)
   *   vì các container này trải rộng 100% diện tích video, nếu auto sẽ nuốt trọn mọi thao tác click/drag chuột của video & controls.
   * - Container cha PHẢI có pointer-events: none để sự kiện chuột lọt qua video và controls bình thường.
   * - CHỈ gán pointer-events: auto trên chính xác các thẻ span chứa chữ phụ đề (.ytp-caption-segment).
   */
  initSubtitleStyles() {
    if (typeof document === 'undefined') return;
    if (document.getElementById('jp-sub-enhancer-styles')) return;

    const style = document.createElement('style');
    style.id = 'jp-sub-enhancer-styles';
    style.textContent = `
      /* Các container bao bọc phụ đề PHẢI luôn xuyên thấu chuột (pointer-events: none)
         để người dùng thao tác click dừng/phát, tua timeline, chỉnh volume, fullscreen mượt mà */
      .caption-window,
      .ytp-caption-window-container,
      .ytp-caption-window-bottom,
      .ytp-caption-window-rollup,
      .captions-text,
      .player-timedtext,
      .player-timedtext-text-container,
      .timed-text-container {
        pointer-events: none !important;
      }

      /* Chỉ duy nhất phần tử chứa chữ phụ đề mới nhận chuột để rê tra từ Furigana / bôi đen */
      .ytp-caption-segment,
      .player-timedtext-text-container span,
      .timed-text-container span {
        pointer-events: auto !important;
        user-select: text !important;
        -webkit-user-select: text !important;
        cursor: pointer !important;
        display: inline-block !important;
      }

      .ytp-caption-segment:hover,
      .player-timedtext-text-container span:hover,
      .timed-text-container span:hover {
        background: rgba(56, 189, 248, 0.28) !important;
        border-radius: 4px !important;
      }
    `;

    const target = document.head || document.documentElement || document.body;
    if (target) {
      target.appendChild(style);
      this.styleElement = style;
    }
  }

  /**
   * Gỡ bỏ CSS khi tắt tiện ích hoặc tắt tính năng phụ đề
   */
  removeSubtitleStyles() {
    const style = document.getElementById('jp-sub-enhancer-styles');
    if (style) {
      try {
        style.remove();
      } catch (_) {}
    }
    this.styleElement = null;
  }

  /**
   * Khôi phục các phần tử phụ đề về trạng thái mặc định khi tắt
   */
  cleanupEnhancedElements() {
    const enhanced = document.querySelectorAll('[data-jp-sub-enhanced]');
    for (let i = 0; i < enhanced.length; i++) {
      const el = enhanced[i];
      el.removeAttribute('data-jp-sub-enhanced');
      el.style.cursor = '';
      el.style.userSelect = '';
      el.style.pointerEvents = '';
    }
  }

  /**
   * Tìm phần tử HTML5 Video đang phát hoặc lớn nhất trên trang
   */
  findActiveVideo() {
    const videos = Array.from(document.querySelectorAll('video'));
    if (!videos.length) return null;
    const playing = videos.find(v => !v.paused && v.currentTime > 0);
    if (playing) return playing;
    return videos.sort((a, b) => (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight))[0];
  }

  /**
   * Lên lịch quét DOM (gộp theo requestAnimationFrame)
   */
  scheduleScan() {
    if (this._scanScheduled || !this.enabled || !this.enableSubtitleHover) return;
    this._scanScheduled = true;
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => this.runScan());
    } else {
      setTimeout(() => this.runScan(), 80);
    }
  }

  /**
   * Quét và tăng cường tương tác cho các đoạn chữ phụ đề
   */
  runScan() {
    this._scanScheduled = false;
    if (!this.enabled || !this.enableSubtitleHover) return;

    // Bỏ qua nhanh trên các trang không có thẻ video hay container phụ đề
    const host = (typeof location !== 'undefined' && location.hostname) ? location.hostname : '';
    const isKnownVideoSite = /(youtube\.com|youtu\.be|netflix\.com)/i.test(host);
    if (!isKnownVideoSite && !document.querySelector('video, .ytp-caption-segment, .player-timedtext-text-container, .timed-text-container, .simulated-video-container')) {
      return;
    }

    const segments = document.querySelectorAll(
      '.ytp-caption-segment, .player-timedtext-text-container span, .timed-text-container span'
    );

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      if (!seg.hasAttribute('data-jp-sub-enhanced')) {
        this.enhanceSubtitleElement(seg);
      }
    }
  }

  /**
   * Lắng nghe các thay đổi phụ đề trên DOM (YouTube, Netflix, HTML5 Video)
   */
  initObserver() {
    const attach = () => {
      const target = document.body || document.documentElement;
      if (!target || typeof MutationObserver === 'undefined') return;

      const observer = new MutationObserver((mutations) => {
        if (!this.enabled || !this.enableSubtitleHover || this._scanScheduled) return;
        let hasAddedNodes = false;
        for (let i = 0; i < mutations.length; i++) {
          if (mutations[i].addedNodes && mutations[i].addedNodes.length > 0) {
            hasAddedNodes = true;
            break;
          }
        }
        if (hasAddedNodes) {
          this.scheduleScan();
        }
      });

      this.observer = observer;
      try {
        observer.observe(target, { childList: true, subtree: true });
      } catch (_) {}
      this.scheduleScan();
    };

    if (document.body || document.documentElement) {
      attach();
    } else {
      document.addEventListener('DOMContentLoaded', attach);
    }
  }

  /**
   * Tăng cường tương tác cho phần tử phụ đề:
   * Cho phép hover tra từ, bôi đen dịch câu, tự động dừng/tiếp tục khi xem nghĩa
   * và click vào phụ đề vẫn dừng/phát video bình thường như khi click lên video.
   */
  enhanceSubtitleElement(element) {
    if (!element || element.hasAttribute('data-jp-sub-enhanced')) return;
    element.setAttribute('data-jp-sub-enhanced', 'true');
    element.style.cursor = 'pointer';
    element.style.userSelect = 'text';
    element.style.pointerEvents = 'auto';

    // Đảm bảo tuyệt đối container bao quanh KHÔNG chặn thao tác chuột
    const parentContainer = element.closest(
      '.caption-window, .ytp-caption-window-container, .ytp-caption-window-bottom, .player-timedtext, .timed-text-container'
    );
    if (parentContainer) {
      parentContainer.style.pointerEvents = 'none';
      if (parentContainer.style.zIndex === '2147483640') {
        parentContainer.style.zIndex = '';
      }
    }

    element.addEventListener('mouseenter', () => {
      if (!this.enabled || !this.enableSubtitleHover) return;
      this.isHoveringSubtitle = true;
      this.currentVideo = this.findActiveVideo();
      this.lastSubtitleText = element.textContent || '';

      if (this.autoPause && this.currentVideo && !this.currentVideo.paused) {
        this.currentVideo.pause();
        this.wasPausedByHover = true;
      }
    });

    element.addEventListener('mouseleave', () => {
      this.isHoveringSubtitle = false;
      if (this.wasPausedByHover && this.currentVideo && this.currentVideo.paused) {
        this.wasPausedByHover = false;
        this.currentVideo.play().catch(() => {});
      }
    });

    // Khi người dùng click vào phụ đề: nếu không phải đang bôi đen văn bản thì toggle Play/Pause video
    element.addEventListener('click', (e) => {
      if (!this.enabled || !this.enableSubtitleHover) return;
      const sel = window.getSelection ? window.getSelection() : null;
      if (sel && sel.toString().trim().length > 0) return;

      const video = this.findActiveVideo();
      if (video) {
        if (video.paused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }

  /**
   * Lắng nghe phím tắt điều khiển phụ đề video (Phím A: tua lại 3.5s để nghe lại)
   */
  initKeyListeners() {
    window.addEventListener('keydown', (e) => {
      if (!this.enabled || !this.enableSubtitleHover) return;
      if (!e.target) return;

      const tag = e.target.tagName;
      if (['INPUT', 'TEXTAREA'].includes(tag) || e.target.isContentEditable) return;
      if (typeof e.target.getAttribute === 'function' && (e.target.getAttribute('role') === 'textbox' || e.target.getAttribute('contenteditable') === 'true')) return;

      // Phím 'A': Tua lại 3.5 giây để nghe lại câu (chỉ kích hoạt khi đang hover phụ đề hoặc đang tương tác với video)
      if ((e.key === 'a' || e.key === 'A') && !e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
        const video = this.findActiveVideo();
        const isInteractingWithVideo = this.isHoveringSubtitle || Boolean(
          document.activeElement && document.activeElement.closest && document.activeElement.closest('#movie_player, .html5-video-player, video, .player-timedtext, .simulated-video-container')
        );

        if (video && isInteractingWithVideo) {
          e.preventDefault();
          this.replayLastSentence();
        }
      }
    }, true);
  }

  /**
   * Tua lại câu phụ đề vừa nói
   */
  replayLastSentence(seconds = 3.5) {
    const video = this.findActiveVideo();
    if (!video) return;

    video.currentTime = Math.max(0, video.currentTime - seconds);
    if (video.paused) {
      video.play().catch(() => {});
    }

    this.showToast(`⏪ Đã tua lại ${seconds}s để nghe lại`);
  }

  /**
   * Hiển thị thông báo Toast nhanh
   */
  showToast(msg) {
    let toast = document.getElementById('jp-sub-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'jp-sub-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(15, 23, 42, 0.88);
        color: #38bdf8;
        padding: 8px 18px;
        border-radius: 20px;
        font-family: -apple-system, sans-serif;
        font-size: 14px;
        font-weight: 500;
        z-index: 9999999;
        pointer-events: none;
        box-shadow: 0 4px 15px rgba(0,0,0,0.4);
        backdrop-filter: blur(8px);
        transition: opacity 0.3s ease;
      `;
      (document.body || document.documentElement).appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.style.opacity = '0';
    }, 1800);
  }
}

// Khởi tạo instance toàn cục
const subtitleController = new SubtitleController();
if (typeof window !== 'undefined') {
  window.subtitleController = subtitleController;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SubtitleController, subtitleController };
}
