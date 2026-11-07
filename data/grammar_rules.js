/**
 * Cơ sở dữ liệu mẫu ngữ pháp tiếng Nhật JLPT (N5 -> N1)
 * Hỗ trợ nhận diện cụm ngữ pháp khi rê chuột
 */

const JLPT_GRAMMAR_PATTERNS = [
  // === JLPT N5 ===
  {
    pattern: 'てはいけない',
    display: '〜てはいけない',
    level: 'N5',
    meaning: 'Không được làm gì (cấm chỉ)',
    usage: 'Động từ thể て + はいけない'
  },
  {
    pattern: 'ちゃいけない',
    display: '〜ちゃいけない',
    level: 'N5',
    meaning: 'Không được làm gì (văn nói thân mật của 〜てはいけない)',
    usage: 'Động từ thể て (bỏ て) + ちゃいけない'
  },
  {
    pattern: 'なければならない',
    display: '〜なければならない',
    level: 'N5',
    meaning: 'Phải làm gì (bắt buộc)',
    usage: 'Động từ thể ない (bỏ い) + ければならない'
  },
  {
    pattern: 'なきゃいけない',
    display: '〜なきゃいけない',
    level: 'N5',
    meaning: 'Phải làm gì (văn nói thân mật)',
    usage: 'Động từ thể ない (bỏ ない) + なきゃいけない'
  },
  {
    pattern: 'なきゃ',
    display: '〜なきゃ',
    level: 'N5',
    meaning: 'Phải làm gì (văn nói rút gọn)',
    usage: 'Động từ thể ない (bỏ ない) + なきゃ'
  },
  {
    pattern: 'なくてもいい',
    display: '〜なくてもいい',
    level: 'N5',
    meaning: 'Không cần làm gì cũng được',
    usage: 'Động từ thể ない (bỏ い) + くてもいい'
  },
  {
    pattern: 'てもいい',
    display: '〜てもいい',
    level: 'N5',
    meaning: 'Làm gì cũng được (cho phép)',
    usage: 'Động từ thể て + もいい'
  },
  {
    pattern: 'たことがある',
    display: '〜たことがある',
    level: 'N5',
    meaning: 'Đã từng làm gì (trải nghiệm quá khứ)',
    usage: 'Động từ thể た + ことがある'
  },
  {
    pattern: 'たことがない',
    display: '〜たことがない',
    level: 'N5',
    meaning: 'Chưa từng làm gì',
    usage: 'Động từ thể た + ことがない'
  },
  {
    pattern: 'ほうがいい',
    display: '〜ほうがいい',
    level: 'N5',
    meaning: 'Nên làm gì (khuyên nhủ)',
    usage: 'Động từ thể た / ない + ほうがいい'
  },
  {
    pattern: 'つもりだ',
    display: '〜つもりだ',
    level: 'N5',
    meaning: 'Dự định làm gì',
    usage: 'Động từ thể từ điển / thể ない + つもりだ'
  },
  {
    pattern: 'ことができる',
    display: '〜ことができる',
    level: 'N5',
    meaning: 'Có thể làm gì (khả năng)',
    usage: 'Động từ thể từ điển + ことができる'
  },
  {
    pattern: 'まえに',
    display: '〜まえに (前に)',
    level: 'N5',
    meaning: 'Trước khi làm gì',
    usage: 'Động từ thể từ điển / Danh từ の + まえに'
  },
  {
    pattern: 'あとで',
    display: '〜あとで (後で)',
    level: 'N5',
    meaning: 'Sau khi làm gì',
    usage: 'Động từ thể た / Danh từ の + あとで'
  },

  // === JLPT N4 ===
  {
    pattern: 'かもしれない',
    display: '〜かもしれない (〜かも)',
    level: 'N4',
    meaning: 'Có lẽ, có thể là (xác suất khoảng 50%)',
    usage: 'Thể thông thường + かもしれない'
  },
  {
    pattern: 'てしまう',
    display: '〜てしまう (〜ちゃう)',
    level: 'N4',
    meaning: 'Lỡ làm gì (nuối tiếc) / Làm xong hoàn toàn',
    usage: 'Động từ thể て + しまう'
  },
  {
    pattern: 'ておく',
    display: '〜ておく (〜とく)',
    level: 'N4',
    meaning: 'Làm sẵn trước cái gì để chuẩn bị',
    usage: 'Động từ thể て + おく'
  },
  {
    pattern: 'てみる',
    display: '〜てみる',
    level: 'N4',
    meaning: 'Thử làm gì',
    usage: 'Động từ thể て + みる'
  },
  {
    pattern: 'そうだ',
    display: '〜そうだ (Trông có vẻ)',
    level: 'N4',
    meaning: 'Trông có vẻ, sắp sửa (phỏng đoán qua thị giác)',
    usage: 'Động từ bỏ ます / Tính từ bỏ い, な + そうだ'
  },
  {
    pattern: 'やすい',
    display: '〜やすい',
    level: 'N4',
    meaning: 'Dễ làm gì',
    usage: 'Động từ thể ます (bỏ ます) + やすい'
  },
  {
    pattern: 'にくい',
    display: '〜にくい',
    level: 'N4',
    meaning: 'Khó làm gì',
    usage: 'Động từ thể ます (bỏ ます) + にくい'
  },
  {
    pattern: 'すぎる',
    display: '〜すぎる',
    level: 'N4',
    meaning: 'Làm gì quá mức (quá đáng)',
    usage: 'Động từ bỏ ます / Tính từ bỏ い, な + すぎる'
  },
  {
    pattern: 'ようにする',
    display: '〜ようにする',
    level: 'N4',
    meaning: 'Cố gắng, nỗ lực tạo thói quen làm gì',
    usage: 'Động từ thể từ điển / thể ない + ようにする'
  },
  {
    pattern: 'ようになる',
    display: '〜ようになる',
    level: 'N4',
    meaning: 'Trở nên có thể làm gì (sự thay đổi trạng thái/khả năng)',
    usage: 'Động từ thể khả năng / thể từ điển + ようになる'
  },
  {
    pattern: 'はずだ',
    display: '〜はずだ',
    level: 'N4',
    meaning: 'Chắc chắn là, thảo nào (dựa trên căn cứ hợp lý)',
    usage: 'Thể thông thường + はずだ'
  },
  {
    pattern: 'はずがない',
    display: '〜はずがない',
    level: 'N4',
    meaning: 'Chắc chắn không thể nào có chuyện đó',
    usage: 'Thể thông thường + はずがない'
  },
  {
    pattern: 'たらどうですか',
    display: '〜たらどうですか',
    level: 'N4',
    meaning: 'Thử làm... xem sao? (gợi ý, khuyên bảo nhẹ nhàng)',
    usage: 'Động từ thể たら + どうですか'
  },
  {
    pattern: 'だけでなく',
    display: '〜だけでなく',
    level: 'N4',
    meaning: 'Không chỉ... mà còn...',
    usage: 'Thể thông thường + だけでなく'
  },

  // === JLPT N3 ===
  {
    pattern: 'わけにはいかない',
    display: '〜わけにはいかない',
    level: 'N3',
    meaning: 'Không thể làm (vì đạo lý, lương tâm, hoàn cảnh xã hội không cho phép)',
    usage: 'Động từ thể từ điển + わけにはいかない'
  },
  {
    pattern: 'ないわけにはいかない',
    display: '〜ないわけにはいかない',
    level: 'N3',
    meaning: 'Đành phải làm, không thể không làm',
    usage: 'Động từ thể ない + わけにはいかない'
  },
  {
    pattern: 'わけがない',
    display: '〜わけがない',
    level: 'N3',
    meaning: 'Tuyệt đối không có lý nào như vậy',
    usage: 'Thể thông thường + わけがない'
  },
  {
    pattern: 'わけではない',
    display: '〜わけではない',
    level: 'N3',
    meaning: 'Không hẳn là, không có nghĩa là...',
    usage: 'Thể thông thường + わけではない'
  },
  {
    pattern: 'てたまらない',
    display: '〜てたまらない',
    level: 'N3',
    meaning: '...vô cùng, không chịu nổi (cảm xúc, ham muốn tột cùng)',
    usage: 'Động từ thể て / Tính từ thể て + たまらない'
  },
  {
    pattern: 'てならない',
    display: '〜てならない',
    level: 'N3',
    meaning: 'Cảm thấy hết sức... (cảm giác tự nhiên trào dâng)',
    usage: 'Động từ thể て / Tính từ thể て + ならない'
  },
  {
    pattern: 'おかげで',
    display: '〜おかげで (〜お陰で)',
    level: 'N3',
    meaning: 'Nhờ có... (kết quả tích cực)',
    usage: 'Thể thông thường / Danh từ の + おかげで'
  },
  {
    pattern: 'せいで',
    display: '〜せいで (〜所為で)',
    level: 'N3',
    meaning: 'Tại vì, do... (kết quả tiêu cực, đổ lỗi)',
    usage: 'Thể thông thường / Danh từ の + せいで'
  },
  {
    pattern: 'にちがいない',
    display: '〜にちがいない (〜に違いない)',
    level: 'N3',
    meaning: 'Chắc chắn là, không thể sai được',
    usage: 'Thể thông thường (bỏ だ) + に違いない'
  },
  {
    pattern: 'に違いない',
    display: '〜に違いない',
    level: 'N3',
    meaning: 'Chắc chắn là, không thể sai được',
    usage: 'Thể thông thường (bỏ だ) + に違いない'
  },
  {
    pattern: 'によると',
    display: '〜によると',
    level: 'N3',
    meaning: 'Theo như... (nguồn thông tin)',
    usage: 'Danh từ + によると'
  },
  {
    pattern: 'によれば',
    display: '〜によれば',
    level: 'N3',
    meaning: 'Căn cứ theo... (nguồn thông tin)',
    usage: 'Danh từ + によれば'
  },
  {
    pattern: 'について',
    display: '〜について',
    level: 'N3',
    meaning: 'Về vấn đề...',
    usage: 'Danh từ + について'
  },
  {
    pattern: 'にかんして',
    display: '〜にかんして (〜に関して)',
    level: 'N3',
    meaning: 'Liên quan đến, về...',
    usage: 'Danh từ + に関して'
  },
  {
    pattern: 'に関して',
    display: '〜に関して',
    level: 'N3',
    meaning: 'Liên quan đến, về...',
    usage: 'Danh từ + に関して'
  },
  {
    pattern: 'にたいして',
    display: '〜にたいして (〜に対して)',
    level: 'N3',
    meaning: 'Đối với... / Trái ngược với...',
    usage: 'Danh từ + に対して'
  },
  {
    pattern: 'に対して',
    display: '〜に対して',
    level: 'N3',
    meaning: 'Đối với... / Trái ngược với...',
    usage: 'Danh từ + に対して'
  },
  {
    pattern: 'にとって',
    display: '〜にとって',
    level: 'N3',
    meaning: 'Đối với (đứng trên lập trường của ai đó để đánh giá)',
    usage: 'Danh từ (chỉ người) + にとって'
  },
  {
    pattern: 'たとたん',
    display: '〜たとたん (〜たとたんに)',
    level: 'N3',
    meaning: 'Vừa mới... thì ngay lập tức...',
    usage: 'Động từ thể た + とたん(に)'
  },
  {
    pattern: 'たびに',
    display: '〜たびに (〜度に)',
    level: 'N3',
    meaning: 'Mỗi lần... thì luôn luôn...',
    usage: 'Động từ thể từ điển / Danh từ の + たびに'
  },
  {
    pattern: 'うちに',
    display: '〜うちに',
    level: 'N3',
    meaning: 'Trong lúc còn... (nếu không làm thì sau sẽ lỡ mất)',
    usage: 'Động từ thể từ điển / thể ない / Tính từ / Danh từ の + うちに'
  },
  {
    pattern: 'あいだに',
    display: '〜あいだに (〜間に)',
    level: 'N3',
    meaning: 'Trong khi hành động A đang diễn ra thì hành động B xảy ra',
    usage: 'Động từ thể ている / Danh từ の + 間に'
  },
  {
    pattern: 'ことにする',
    display: '〜ことにする',
    level: 'N3',
    meaning: 'Quyết định làm gì (quyết định của bản thân)',
    usage: 'Động từ thể từ điển / thể ない + ことにする'
  },
  {
    pattern: 'ことになる',
    display: '〜ことになる',
    level: 'N3',
    meaning: 'Được quyết định là... (quyết định từ ngoại cảnh, tập thể)',
    usage: 'Động từ thể từ điển / thể ない + ことになる'
  },
  {
    pattern: 'っけ',
    display: '〜っけ',
    level: 'N3',
    meaning: '...có phải vậy không nhỉ? (xác nhận lại điều mình quên)',
    usage: 'Thể thông thường + っけ'
  },
  {
    pattern: 'っぽい',
    display: '〜っぽい',
    level: 'N3',
    meaning: 'Có vẻ như, mang nhiều tính chất của... (hơi hướng tiêu cực)',
    usage: 'Danh từ / Động từ bỏ ます / Tính từ bỏ い + っぽい'
  },

  // === JLPT N2 ===
  {
    pattern: 'にもかかわらず',
    display: '〜にもかかわらず (〜にも拘らず)',
    level: 'N2',
    meaning: 'Mặc dù... thế nhưng mà (bất chấp hoàn cảnh)',
    usage: 'Thể thông thường / Danh từ + にもかかわらず'
  },
  {
    pattern: 'をめぐって',
    display: '〜をめぐって (〜を巡って)',
    level: 'N2',
    meaning: 'Xoay quanh (tranh luận, mâu thuẫn về vấn đề gì)',
    usage: 'Danh từ + をめぐって'
  },
  {
    pattern: 'を巡って',
    display: '〜を巡って',
    level: 'N2',
    meaning: 'Xoay quanh (tranh luận, mâu thuẫn về vấn đề gì)',
    usage: 'Danh từ + を巡って'
  },
  {
    pattern: 'をきっかけに',
    display: '〜をきっかけに (〜を契機に)',
    level: 'N2',
    meaning: 'Nhân dịp, lấy cớ, từ bước ngoặt...',
    usage: 'Danh từ + をきっかけに'
  },
  {
    pattern: 'をこめて',
    display: '〜をこめて (〜を込めて)',
    level: 'N2',
    meaning: 'Gửi gắm trọn vẹn (tình cảm, tâm tư, sự biết ơn)',
    usage: 'Danh từ (tâm tư, tình cảm) + をこめて'
  },
  {
    pattern: 'を込めて',
    display: '〜を込めて',
    level: 'N2',
    meaning: 'Gửi gắm trọn vẹn (tình cảm, tâm tư, sự biết ơn)',
    usage: 'Danh từ (tâm tư, tình cảm) + を込めて'
  },
  {
    pattern: 'をはじめ',
    display: '〜をはじめ (〜を始め)',
    level: 'N2',
    meaning: 'Trước tiên phải kể đến... (đại diện tiêu biểu)',
    usage: 'Danh từ + をはじめ'
  },
  {
    pattern: 'にわたって',
    display: '〜にわたって (〜に渡って)',
    level: 'N2',
    meaning: 'Trải suốt, trên khắp (không gian rộng, thời gian dài)',
    usage: 'Danh từ (thời gian, địa điểm, phạm vi) + にわたって'
  },
  {
    pattern: 'に渡って',
    display: '〜に渡って',
    level: 'N2',
    meaning: 'Trải suốt, trên khắp (không gian rộng, thời gian dài)',
    usage: 'Danh từ (thời gian, địa điểm, phạm vi) + に渡って'
  },
  {
    pattern: 'にともなって',
    display: '〜にともなって (〜に伴って)',
    level: 'N2',
    meaning: 'Cùng với, đi kèm với sự thay đổi của...',
    usage: 'Động từ thể từ điển / Danh từ + に伴って'
  },
  {
    pattern: 'に伴って',
    display: '〜に伴って',
    level: 'N2',
    meaning: 'Cùng với, đi kèm với sự thay đổi của...',
    usage: 'Động từ thể từ điển / Danh từ + に伴って'
  },
  {
    pattern: 'につれて',
    display: '〜につれて (〜に連れて)',
    level: 'N2',
    meaning: 'Càng... thì càng kéo theo sự biến đổi...',
    usage: 'Động từ thể từ điển / Danh từ + につれて'
  },
  {
    pattern: 'にしたがって',
    display: '〜にしたがって (〜に従って)',
    level: 'N2',
    meaning: 'Thuận theo, cùng với sự tiến triển của...',
    usage: 'Động từ thể từ điển / Danh từ + に従って'
  },
  {
    pattern: 'に従って',
    display: '〜に従って',
    level: 'N2',
    meaning: 'Thuận theo, cùng với sự tiến triển của...',
    usage: 'Động từ thể từ điển / Danh từ + に従って'
  },
  {
    pattern: 'にほかならない',
    display: '〜にほかならない (〜に他ならない)',
    level: 'N2',
    meaning: 'Chính là, không gì khác ngoài...',
    usage: 'Thể thông thường / Danh từ + に他ならない'
  },
  {
    pattern: 'に他ならない',
    display: '〜に他ならない',
    level: 'N2',
    meaning: 'Chính là, không gì khác ngoài...',
    usage: 'Thể thông thường / Danh từ + に他ならない'
  },
  {
    pattern: 'ざるを得ない',
    display: '〜ざるをえない (〜ざるを得ない)',
    level: 'N2',
    meaning: 'Đành phải, buộc phải làm (dù không muốn)',
    usage: 'Động từ thể ない (bỏ ない) + ざるを得ない (する -> せざるを得ない)'
  },
  {
    pattern: 'ざるをえない',
    display: '〜ざるをえない',
    level: 'N2',
    meaning: 'Đành phải, buộc phải làm (dù không muốn)',
    usage: 'Động từ thể ない (bỏ ない) + ざるを得ない'
  }
];

/**
 * Tra cứu mẫu ngữ pháp trong chuỗi văn bản
 * @param {string} text 
 * @returns {object|null}
 */
function lookupGrammarPattern(text) {
  if (!text || typeof text !== 'string') return null;
  const clean = text.trim();

  // Ưu tiên khớp chính xác hoặc pattern dài nhất
  const sorted = [...JLPT_GRAMMAR_PATTERNS].sort((a, b) => b.pattern.length - a.pattern.length);

  // 1. Khớp chính xác hoàn toàn (e.g. "てはいけない", "かもしれない", "わけにはいかない")
  for (const item of sorted) {
    if (clean === item.pattern) {
      return {
        isGrammar: true,
        isExact: true,
        word: clean,
        baseWord: item.display,
        pattern: item.pattern,
        level: item.level,
        badge: `📚 Ngữ pháp ${item.level}`,
        meaning: item.meaning,
        usage: item.usage,
        reading: item.pattern
      };
    }
  }

  // 2. Khớp bắt đầu hoặc đuôi pattern (e.g. "てはいけません", "わけにはいかないでしょう")
  for (const item of sorted) {
    if (clean.startsWith(item.pattern) || (clean.endsWith(item.pattern) && item.pattern.length >= 3)) {
      return {
        isGrammar: true,
        isExact: false,
        word: clean,
        baseWord: item.display,
        pattern: item.pattern,
        level: item.level,
        badge: `📚 Ngữ pháp ${item.level}`,
        meaning: item.meaning,
        usage: item.usage,
        reading: clean
      };
    }
  }

  return null;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { JLPT_GRAMMAR_PATTERNS, lookupGrammarPattern };
}
