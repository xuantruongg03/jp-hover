/**
 * YouTube & Netflix Japanese Subtitle Hover & Interactive Player Controller
 * Cho phép rê chuột tra từ trực tiếp trên phụ đề tiếng Nhật, tự động tạm dừng khi xem nghĩa
 * và tua lại từng câu thoại để luyện nghe (Immersion Learning).
 */

class SubtitleController {
  constructor() {
    this.enabled = true;
    this.autoPause = false;
    this.currentVideo = null;
    this.lastSubtitleText = '';
    this.isHoveringSubtitle = false;
    this.initSubtitleStyles();
    this.initObserver();
    this.initKeyListeners();
  }

  /**
   * Tiêm CSS toàn cục cho phụ đề YouTube & Netflix để chuột luôn bắt được chữ
   */
  initSubtitleStyles() {
    if (typeof document === 'undefined') return;
    const attach = () => {
      if (document.getElementById('jp-sub-enhancer-styles')) return;
      const style = document.createElement('style');
      style.id = 'jp-sub-enhancer-styles';
      style.textContent = `
        .caption-window,
        .ytp-caption-window-container,
        .ytp-caption-window-bottom,
        .ytp-caption-window-rollup,
        .captions-text,
        .ytp-caption-segment,
        .player-timedtext,
        .player-timedtext-text-container,
        .timed-text-container {
          pointer-events: auto !important;
          user-select: text !important;
          -webkit-user-select: text !important;
          z-index: 2147483640 !important;
        }
        .ytp-caption-segment {
          cursor: pointer !important;
          transition: background 0.15s ease !important;
        }
        .ytp-caption-segment:hover {
          background: rgba(56, 189, 248, 0.28) !important;
          border-radius: 4px !important;
        }
      `;
      const target = document.head || document.documentElement || document.body;
      if (target) target.appendChild(style);
    };

    if (document.head || document.documentElement) {
      attach();
    } else {
      document.addEventListener('DOMContentLoaded', attach);
    }
  }

  /**
   * Tìm phần tử HTML5 Video đang phát trên trang
   */
  findActiveVideo() {
    const videos = Array.from(document.querySelectorAll('video'));
    if (!videos.length) return null;
    const playing = videos.find(v => !v.paused && v.currentTime > 0);
    if (playing) return playing;
    return videos.sort((a, b) => (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight))[0];
  }

  /**
   * Lắng nghe các thay đổi phụ đề trên DOM (YouTube, Netflix, HTML5 Video)
   */
  initObserver() {
    const attach = () => {
      const target = document.body || document.documentElement;
      if (!target) return;

      const observer = new MutationObserver(() => {
        if (!this.enabled) return;

        const segments = document.querySelectorAll(
          '.ytp-caption-segment, .player-timedtext-text-container span, .timed-text-container span'
        );

        segments.forEach(seg => {
          if (!seg.hasAttribute('data-jp-sub-enhanced')) {
            this.enhanceSubtitleElement(seg);
          }
        });
      });

      try {
        observer.observe(target, { childList: true, subtree: true });
      } catch (_) {}
    };

    if (document.body || document.documentElement) {
      attach();
    } else {
      document.addEventListener('DOMContentLoaded', attach);
    }
  }

  /**
   * Tăng cường tương tác cho phần tử phụ đề
   */
  enhanceSubtitleElement(element) {
    element.setAttribute('data-jp-sub-enhanced', 'true');
    element.style.cursor = 'pointer';
    element.style.userSelect = 'text';
    element.style.pointerEvents = 'auto';

    const parentWindow = element.closest('.caption-window, .ytp-caption-window-container, .ytp-caption-window-bottom, .player-timedtext');
    if (parentWindow) {
      parentWindow.style.pointerEvents = 'auto';
      parentWindow.style.zIndex = '2147483640';
    }

    element.addEventListener('mouseenter', () => {
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
      }
    });
  }

  /**
   * Lắng nghe phím tắt điều khiển phụ đề video (Phím A: tua lại câu)
   */
  initKeyListeners() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable) return;

      // Phím 'A' hoặc 'Shift + Left': Tua lại 3.5 giây để nghe lại câu
      if ((e.key === 'a' || e.key === 'A') && !e.ctrlKey && !e.altKey && !e.metaKey) {
        // Chỉ tua khi trang có video
        if (document.querySelector('video')) {
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
