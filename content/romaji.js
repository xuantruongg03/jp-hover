// Bộ chuyển đổi Hiragana / Katakana sang Romaji (Chuẩn Hepburn)
const KANA_TO_ROMAJI_MAP = {
  // Hiragana cơ bản
  'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
  'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
  'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
  'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
  'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
  'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
  'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
  'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
  'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
  'わ': 'wa', 'を': 'o', 'ん': 'n',

  // Hiragana biến âm (Dakuten & Handakuten)
  'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
  'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
  'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
  'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
  'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',

  // Hiragana âm ghép (Yoon)
  'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
  'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
  'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
  'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
  'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
  'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
  'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
  'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
  'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
  'ぢゃ': 'ja', 'ぢゅ': 'ju', 'ぢょ': 'jo',
  'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
  'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',

  // Katakana cơ bản
  'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
  'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
  'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
  'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
  'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
  'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
  'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
  'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
  'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
  'ワ': 'wa', 'ヲ': 'o', 'ン': 'n',

  // Katakana biến âm
  'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
  'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
  'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do',
  'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
  'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',

  // Katakana âm ghép
  'キャ': 'kya', 'キュ': 'kyu', 'キョ': 'kyo',
  'シャ': 'sha', 'シュ': 'shu', 'ショ': 'sho',
  'チャ': 'cha', 'チュ': 'chu', 'チョ': 'cho',
  'ニャ': 'nya', 'ニュ': 'nyu', 'ニョ': 'nyo',
  'ヒャ': 'hya', 'ヒュ': 'hyu', 'ヒョ': 'hyo',
  'ミャ': 'mya', 'ミュ': 'myu', 'ミョ': 'myo',
  'リャ': 'rya', 'リュ': 'ryu', 'リョ': 'ryo',
  'ギャ': 'gya', 'ギュ': 'gyu', 'ギョ': 'gyo',
  'ジャ': 'ja', 'ジュ': 'ju', 'ジョ': 'jo',
  'ビャ': 'bya', 'ビュ': 'byu', 'ビョ': 'byo',
  'ピャ': 'pya', 'ピュ': 'pyu', 'ピョ': 'pyo',

  // Katakana mở rộng cho từ mượn ngoại lai (Loanwords)
  'ティ': 'ti', 'ディ': 'di', 'トゥ': 'tu', 'ドゥ': 'du',
  'ファ': 'fa', 'フィ': 'fi', 'フェ': 'fe', 'フォ': 'fo',
  'ウィ': 'wi', 'ウェ': 'we', 'ウォ': 'wo',
  'ヴァ': 'va', 'ヴィ': 'vi', 'ヴ': 'vu', 'ヴェ': 've', 'ヴォ': 'vo',
  'チェ': 'che', 'シェ': 'she', 'ジェ': 'je', 'ツァ': 'tsa', 'ツィ': 'tsi', 'ツェ': 'tse', 'ツォ': 'tso'
};

/**
 * Chuyển đổi chuỗi Hiragana / Katakana sang Romaji (Hepburn)
 * @param {string} text 
 * @returns {string} Romaji tương ứng
 */
function toRomaji(text) {
  if (!text) return '';
  let res = '';
  let i = 0;

  while (i < text.length) {
    const char = text[i];
    const nextChar = text[i + 1] || '';
    const twoChars = char + nextChar;

    // 1. Kiểm tra âm ghép 2 ký tự (きゃ, しゃ, ティ, etc.)
    if (KANA_TO_ROMAJI_MAP[twoChars]) {
      res += KANA_TO_ROMAJI_MAP[twoChars];
      i += 2;
      continue;
    }

    // 2. Xử lý âm ngắt (Sokuon: っ hoặc ッ)
    if (char === 'っ' || char === 'ッ') {
      if (nextChar) {
        // Kiểm tra xem âm tiếp theo có phải âm ghép 2 ký tự không
        const nextTwo = nextChar + (text[i + 2] || '');
        const nextRomaji = KANA_TO_ROMAJI_MAP[nextTwo] || KANA_TO_ROMAJI_MAP[nextChar];
        if (nextRomaji) {
          // Xử lý trường hợp đặc biệt: ch -> cch (ví dụ: まっちゃ -> maccha thay vì ccha)
          if (nextRomaji.startsWith('ch')) {
            res += 't';
          } else {
            res += nextRomaji[0];
          }
          i += 1;
          continue;
        }
      }
      res += "'";
      i += 1;
      continue;
    }

    // 3. Xử lý trường âm Katakana (ー)
    if (char === 'ー') {
      const lastChar = res[res.length - 1];
      if (lastChar && /[aeiou]/i.test(lastChar)) {
        res += lastChar; // Kéo dài nguyên âm trước đó (hoặc có thể dùng macron)
      } else {
        res += '-';
      }
      i += 1;
      continue;
    }

    // 4. Xử lý 1 ký tự cơ bản
    if (KANA_TO_ROMAJI_MAP[char]) {
      res += KANA_TO_ROMAJI_MAP[char];
      i += 1;
      continue;
    }

    // Ký tự khác (chữ cái, dấu cách, số, ký tự đặc biệt)
    res += char;
    i += 1;
  }

  return res;
}

/**
 * Kiểm tra xem chuỗi có chứa ký tự tiếng Nhật (Hiragana, Katakana, Kanji) không
 */
function isJapaneseText(str) {
  if (!str) return false;
  // Ranges: Hiragana (3040-309F), Katakana (30A0-30FF), Kanji (4E00-9FAF, 3400-4DBF), Fullwidth Kana
  return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBF]/.test(str);
}

/**
 * Chuyển Katakana thành Hiragana
 */
function katakanaToHiragana(str) {
  return str.replace(/[\u30a1-\u30f6]/g, match => {
    const code = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(code);
  });
}

// Xuất ra môi trường browser hoặc module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { toRomaji, isJapaneseText, katakanaToHiragana };
}
