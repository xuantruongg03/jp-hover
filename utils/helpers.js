/**
 * Các hàm tiện ích dùng chung cho JP Furigana Hover
 */

// Kiểm tra ký tự là Kanji
function isKanji(char) {
  if (!char) return false;
  const code = char.charCodeAt(0);
  return (code >= 0x4e00 && code <= 0x9faf) || (code >= 0x3400 && code <= 0x4dbf);
}

// Kiểm tra chuỗi có chứa ít nhất 1 chữ Kanji
function hasKanji(str) {
  if (!str) return false;
  return /[一-龯]/.test(str);
}

// Kiểm tra chuỗi thuần Hiragana
function isHiragana(str) {
  if (!str) return false;
  return /^[\u3040-\u309Fー]+$/.test(str);
}

// Kiểm tra chuỗi thuần Katakana
function isKatakana(str) {
  if (!str) return false;
  return /^[\u30A0-\u30FFー]+$/.test(str);
}

// Chuyển đổi Katakana sang Hiragana
function katakanaToHiragana(text) {
  if (!text) return '';
  return text.replace(/[\u30A1-\u30F6]/g, match => {
    const code = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(code);
  });
}

// Chuẩn hóa văn bản tiếng Nhật (loại bỏ ký tự đặc biệt, chuẩn hóa khoảng trắng)
function normalizeJapaneseText(text) {
  if (!text) return '';
  return text.trim()
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Zero-width spaces
    .replace(/[　\s]+/g, ' ');
}

// Escape HTML an toàn
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Hàm Debounce giới hạn tần suất gọi hàm
function debounce(func, delay = 75) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isKanji,
    hasKanji,
    isHiragana,
    isKatakana,
    katakanaToHiragana,
    normalizeJapaneseText,
    escapeHtml,
    debounce
  };
}
