/**
 * Kanji Stroke Order Engine & SVG Animator
 * Hỗ trợ hiển thị thứ tự nét viết chuẩn chữ Hán (KanjiVG)
 * Điều khiển phát động: Play, Pause, Tua từng nét, Ẩn/Hiện số thứ tự nét
 */

class KanjiStrokeAnimator {
  constructor() {
    this.cache = new Map();
    this.currentKanji = '';
    this.totalStrokes = 0;
    this.currentStep = 0;
    this.isPlaying = false;
    this.playTimer = null;
  }

  /**
   * Lấy mã hex unicode 5 ký tự của ký tự Kanji (Ví dụ: '日' -> '065e5')
   */
  getKanjiHex(char) {
    if (!char) return null;
    const code = char.codePointAt(0);
    return code.toString(16).padStart(5, '0');
  }

  /**
   * Tải dữ liệu SVG nét chữ từ KanjiVG (qua CDN tốc độ cao) kèm Fallback
   */
  async fetchKanjiSvg(char) {
    const hex = this.getKanjiHex(char);
    if (!hex) return null;

    if (this.cache.has(char)) {
      return this.cache.get(char);
    }

    // 1. Thử tải qua Background Service Worker (Vượt CSP trên ChatGPT, GitHub, X...)
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      try {
        const bgRes = await new Promise((resolve) => {
          chrome.runtime.sendMessage({ action: 'FETCH_KANJI_SVG', hex }, (res) => {
            if (chrome.runtime.lastError || !res || !res.success) resolve(null);
            else resolve(res.svg);
          });
        });
        if (bgRes) {
          this.cache.set(char, bgRes);
          return bgRes;
        }
      } catch (_) {}
    }

    // 2. Tải trực tiếp qua CDN (nếu trang web không chặn fetch)
    const cdnUrls = [
      `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg/kanji/${hex}.svg`,
      `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${hex}.svg`
    ];

    for (const url of cdnUrls) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 2500);
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timer);

        if (res.ok) {
          const svgText = await res.text();
          this.cache.set(char, svgText);
          return svgText;
        }
      } catch (_) {}
    }

    // Fallback: Nếu không có mạng hoặc lỗi, sinh SVG mô phỏng nét với font chuẩn & lưới mễ tự điền (Tian Zi Ge)
    return this.generateFallbackSvg(char);
  }

  /**
   * Sinh SVG hiển thị chữ Kanji rõ nét trên lưới tập viết (田字格 / 米字格)
   */
  generateFallbackSvg(char) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109 109" width="100%" height="100%" class="kanji-stroke-svg">
        <defs>
          <style>
            .grid-line { stroke: #cbd5e1; stroke-width: 0.8; stroke-dasharray: 2 2; }
            .grid-border { stroke: #94a3b8; stroke-width: 1.5; fill: none; }
            .kanji-char { font-family: "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif; font-size: 82px; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
          </style>
        </defs>
        <!-- Lưới Mễ tự -->
        <rect x="2" y="2" width="105" height="105" class="grid-border" />
        <line x1="54.5" y1="2" x2="54.5" y2="107" class="grid-line" />
        <line x1="2" y1="54.5" x2="107" y2="54.5" class="grid-line" />
        <line x1="2" y1="2" x2="107" y2="107" class="grid-line" />
        <line x1="107" y1="2" x2="2" y2="107" class="grid-line" />
        <!-- Chữ Kanji -->
        <text x="54.5" y="54.5" class="kanji-char">${char}</text>
      </svg>
    `;
  }

  /**
   * Khử khuẩn (Sanitize) cấu trúc SVG, loại bỏ triệt để các thẻ thực thi hoặc thuộc tính nguy hiểm
   */
  sanitizeSvgDoc(doc) {
    if (!doc) return;
    try {
      // 1. Loại bỏ các phần tử tiềm ẩn rủi ro
      const dangerousTags = doc.querySelectorAll('script, foreignObject, iframe, embed, object, link, meta, style');
      dangerousTags.forEach(el => el.remove());

      // 2. Loại bỏ các thuộc tính thực thi (onclick, onload...) và href chứa javascript:
      const allElements = doc.querySelectorAll('*');
      allElements.forEach(el => {
        const toRemove = [];
        for (let i = 0; i < el.attributes.length; i++) {
          const attr = el.attributes[i];
          if (/^on/i.test(attr.name) || /javascript:/i.test(attr.value)) {
            toRemove.push(attr.name);
          }
        }
        toRemove.forEach(name => el.removeAttribute(name));
      });
    } catch (_) {}
  }

  /**
   * Cấu hình các nét vẽ và lưới Mễ tự trên thẻ SVG đã chuẩn hóa
   */
  configureSvgElement(svg, doc, options = {}) {
    const showNumbers = options.showNumbers !== false;
    const strokeColor = options.strokeColor || '#0284c7';

    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('class', 'kanji-stroke-animated-svg');

    // Tìm tất cả các nét (path)
    const paths = svg.querySelectorAll('path');
    paths.forEach((p, idx) => {
      p.setAttribute('data-stroke-idx', idx + 1);
      p.style.stroke = strokeColor;
      p.style.strokeWidth = '3.5';
      p.style.strokeLinecap = 'round';
      p.style.strokeLinejoin = 'round';
      p.style.fill = 'none';
      p.style.transition = 'stroke-dashoffset 0.6s ease, stroke 0.3s ease';
    });

    // Ẩn/hiện số thứ tự nét
    const textGroup = svg.querySelector('g[id^="kvg:StrokeNumbers_"]');
    if (textGroup) {
      if (!showNumbers) {
        textGroup.style.display = 'none';
      } else {
        textGroup.style.fontSize = '8px';
        textGroup.style.fill = '#64748b';
        textGroup.style.fontFamily = 'monospace';
      }
    }

    // Thêm khung lưới tập viết vào nền
    const gridG = doc.createElementNS('http://www.w3.org/2000/svg', 'g');
    gridG.setAttribute('class', 'tian-zi-ge');
    gridG.innerHTML = `
      <rect x="2" y="2" width="105" height="105" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
      <line x1="54.5" y1="2" x2="54.5" y2="107" stroke="#cbd5e1" stroke-width="0.8" stroke-dasharray="3 3" />
      <line x1="2" y1="54.5" x2="107" y2="54.5" stroke="#cbd5e1" stroke-width="0.8" stroke-dasharray="3 3" />
    `;
    svg.insertBefore(gridG, svg.firstChild);
    return svg;
  }

  /**
   * Xử lý và làm đẹp SVG của KanjiVG để chạy animation mượt mà
   */
  prepareAnimatedSvg(rawSvg, options = {}) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawSvg, 'image/svg+xml');
      this.sanitizeSvgDoc(doc);
      const svg = doc.querySelector('svg');
      if (!svg) return rawSvg;
      this.configureSvgElement(svg, doc, options);
      return svg.outerHTML;
    } catch (_) {
      return rawSvg;
    }
  }

  /**
   * Render trực tiếp SVG nét chữ vào DOM node một cách an toàn (không dùng innerHTML)
   */
  renderAnimatedSvg(containerElement, rawSvg, options = {}) {
    if (!containerElement || !rawSvg) return false;
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawSvg, 'image/svg+xml');
      this.sanitizeSvgDoc(doc);
      const svg = doc.querySelector('svg');
      if (!svg) return false;
      this.configureSvgElement(svg, doc, options);
      containerElement.replaceChildren(svg);
      return true;
    } catch (_) {
      return false;
    }
  }

  /**
   * Kích hoạt hiệu ứng vẽ hoạt ảnh từng nét trên container
   */
  startAnimation(containerElement, speedMs = 700) {
    if (!containerElement) return;
    const paths = Array.from(containerElement.querySelectorAll('path[data-stroke-idx]'));
    if (!paths.length) return;

    this.isPlaying = true;
    this.totalStrokes = paths.length;

    // Chuẩn bị stroke-dasharray
    paths.forEach(p => {
      const len = p.getTotalLength ? p.getTotalLength() : 120;
      p.style.strokeDasharray = `${len} ${len}`;
      p.style.strokeDashoffset = len;
      p.style.opacity = '0.15';
      p.style.stroke = '#94a3b8';
    });

    let current = 0;
    if (this.playTimer) clearInterval(this.playTimer);

    const step = () => {
      if (current >= paths.length) {
        // Hoàn thành: highlight lại toàn bộ chữ
        paths.forEach(p => {
          p.style.stroke = '#0284c7';
          p.style.opacity = '1';
          p.style.strokeDashoffset = '0';
        });
        this.isPlaying = false;
        clearInterval(this.playTimer);
        return;
      }

      const p = paths[current];
      p.style.opacity = '1';
      p.style.stroke = '#ef4444'; // Nét đang viết có màu đỏ nổi bật
      p.style.strokeDashoffset = '0';

      if (current > 0) {
        paths[current - 1].style.stroke = '#0284c7'; // Nét đã xong chuyển sang xanh
      }

      current++;
      this.currentStep = current;
    };

    step();
    this.playTimer = setInterval(step, speedMs);
  }

  /**
   * Dừng hoạt ảnh
   */
  stopAnimation() {
    this.isPlaying = false;
    if (this.playTimer) {
      clearInterval(this.playTimer);
      this.playTimer = null;
    }
  }
}

// Global instance
const kanjiStrokeAnimator = new KanjiStrokeAnimator();
if (typeof window !== 'undefined') {
  window.kanjiStrokeAnimator = kanjiStrokeAnimator;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KanjiStrokeAnimator, kanjiStrokeAnimator };
}

