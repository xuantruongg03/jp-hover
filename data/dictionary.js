// Từ điển tiếng Nhật phong phú kèm Phân loại Từ loại, Trọng âm (Pitch Accent) & Bộ phân tích Ngữ pháp đa tầng

const JP_DICTIONARY = {
  // 1. Chữ Hán đơn lẻ & Số đếm cơ bản (Numbers)
  "一": { r: "いち", m: "Một (Số 1)", t: "Số từ N5", pos: "num", p: 2 },
  "二": { r: "に", m: "Hai (Số 2)", t: "Số từ N5", pos: "num", p: 1 },
  "三": { r: "さん", m: "Ba (Số 3)", t: "Số từ N5", pos: "num", p: 0 },
  "四": { r: "よん", m: "Bốn (Số 4) [đọc: yon/shi]", t: "Số từ N5", pos: "num", p: 1 },
  "五": { r: "ご", m: "Năm (Số 5)", t: "Số từ N5", pos: "num", p: 1 },
  "六": { r: "ろく", m: "Sáu (Số 6)", t: "Số từ N5", pos: "num", p: 2 },
  "七": { r: "なな", m: "Bảy (Số 7) [đọc: nana/shichi]", t: "Số từ N5", pos: "num", p: 1 },
  "八": { r: "はち", m: "Tám (Số 8)", t: "Số từ N5", pos: "num", p: 2 },
  "九": { r: "きゅう", m: "Chín (Số 9) [đọc: kyuu/ku]", t: "Số từ N5", pos: "num", p: 1 },
  "十": { r: "じゅう", m: "Mười (Số 10)", t: "Số từ N5", pos: "num", p: 1 },
  "百": { r: "ひゃく", m: "Một trăm (100)", t: "Số từ N5", pos: "num", p: 2 },
  "千": { r: "せん", m: "Một nghìn (1,000)", t: "Số từ N5", pos: "num", p: 1 },
  "万": { r: "まん", m: "Một vạn / Mười nghìn (10,000)", t: "Số từ N5", pos: "num", p: 1 },
  "一万": { r: "いちまん", m: "Một vạn (10,000 Yên/người)", t: "Số từ N5", pos: "num", p: 2 },
  "億": { r: "おく", m: "Một trăm triệu (100,000,000)", t: "Số từ N4", pos: "num", p: 1 },
  "零": { r: "れい", m: "Số không (0)", t: "Số từ N5", pos: "num", p: 1 },
  "ゼロ": { r: "ゼロ", m: "Số không (0)", t: "Số từ N5", pos: "num", p: 1 },

  // Số đếm đồ vật thuần Nhật (1 cái, 2 cái...)
  "一つ": { r: "ひとつ", m: "1 cái, 1 chiếc (Đếm tổng quát)", t: "Lượng từ N5", pos: "num", p: 2 },
  "二つ": { r: "ふたつ", m: "2 cái, 2 chiếc", t: "Lượng từ N5", pos: "num", p: 3 },
  "三つ": { r: "みっつ", m: "3 cái, 3 chiếc", t: "Lượng từ N5", pos: "num", p: 3 },
  "四つ": { r: "よっつ", m: "4 cái, 4 chiếc", t: "Lượng từ N5", pos: "num", p: 3 },
  "五つ": { r: "いつつ", m: "5 cái, 5 chiếc", t: "Lượng từ N5", pos: "num", p: 2 },
  "六つ": { r: "むっつ", m: "6 cái, 6 chiếc", t: "Lượng từ N5", pos: "num", p: 3 },
  "七つ": { r: "ななつ", m: "7 cái, 7 chiếc", t: "Lượng từ N5", pos: "num", p: 2 },
  "八つ": { r: "やっつ", m: "8 cái, 8 chiếc", t: "Lượng từ N5", pos: "num", p: 3 },
  "九つ": { r: "ここのつ", m: "9 cái, 9 chiếc", t: "Lượng từ N5", pos: "num", p: 2 },
  "幾つ": { r: "いくつ", m: "Bao nhiêu cái? Mấy cái?", t: "Nghi vấn từ N5", pos: "num", p: 1 },
  "いくつ": { r: "いくつ", m: "Bao nhiêu cái? Mấy cái?", t: "Nghi vấn từ N5", pos: "num", p: 1 },

  // Đếm người (〜人)
  "一人": { r: "ひとり", m: "1 người (Đặc biệt: hitori)", t: "Đếm người N5", pos: "num", p: 2 },
  "二人": { r: "ふたり", m: "2 người (Đặc biệt: futari)", t: "Đếm người N5", pos: "num", p: 3 },
  "三人": { r: "さんにん", m: "3 người", t: "Đếm người N5", pos: "num", p: 3 },
  "四人": { r: "よにん", m: "4 người (Đặc biệt: yonin)", t: "Đếm người N5", pos: "num", p: 2 },
  "五人": { r: "ごにん", m: "5 người", t: "Đếm người N5", pos: "num", p: 2 },
  "六人": { r: "ろくにん", m: "6 người", t: "Đếm người N5", pos: "num", p: 2 },
  "何人": { r: "なんにん", m: "Mấy người? Bao nhiêu người?", t: "Nghi vấn từ N5", pos: "num", p: 3 },

  // Đếm ngày trong tháng (〜日)
  "一日": { r: "ついたち", m: "Mùng 1 (ngày đầu tháng) / いちにち: 1 ngày", t: "Đếm ngày N5", pos: "num", p: 4 },
  "二日": { r: "ふつか", m: "Mùng 2 / 2 ngày", t: "Đếm ngày N5", pos: "num", p: 0 },
  "三日": { r: "みっか", m: "Mùng 3 / 3 ngày", t: "Đếm ngày N5", pos: "num", p: 0 },
  "四日": { r: "よっか", m: "Mùng 4 / 4 ngày", t: "Đếm ngày N5", pos: "num", p: 0 },
  "五日": { r: "いつか", m: "Mùng 5 / 5 ngày", t: "Đếm ngày N5", pos: "num", p: 0 },
  "六日": { r: "むいか", m: "Mùng 6 / 6 ngày", t: "Đếm ngày N5", pos: "num", p: 0 },
  "七日": { r: "なのか", m: "Mùng 7 / 7 ngày", t: "Đếm ngày N5", pos: "num", p: 0 },
  "八日": { r: "ようか", m: "Mùng 8 / 8 ngày", t: "Đếm ngày N5", pos: "num", p: 0 },
  "九日": { r: "ここのか", m: "Mùng 9 / 9 ngày", t: "Đếm ngày N5", pos: "num", p: 0 },
  "十日": { r: "とおか", m: "Mùng 10 / 10 ngày", t: "Đếm ngày N5", pos: "num", p: 0 },
  "十四日": { r: "じゅうよっか", m: "Ngày 14 / 14 ngày (Đặc biệt)", t: "Đếm ngày N5", pos: "num", p: 0 },
  "二十日": { r: "はつか", m: "Ngày 20 / 20 ngày (Đặc biệt: hatsuka)", t: "Đếm ngày N5", pos: "num", p: 0 },
  "二十四日": { r: "にじゅうよっか", m: "Ngày 24 / 24 ngày (Đặc biệt)", t: "Đếm ngày N5", pos: "num", p: 0 },
  "何日": { r: "なんにち", m: "Ngày mấy? Bao nhiêu ngày?", t: "Nghi vấn từ N5", pos: "num", p: 1 },

  // Đếm tuổi (〜歳 / 〜才)
  "一歳": { r: "いっさい", m: "1 tuổi", t: "Đếm tuổi N5", pos: "num", p: 1 },
  "八歳": { r: "はっさい", m: "8 tuổi", t: "Đếm tuổi N5", pos: "num", p: 1 },
  "十歳": { r: "じゅっさい", m: "10 tuổi", t: "Đếm tuổi N5", pos: "num", p: 1 },
  "二十歳": { r: "はたち", m: "20 tuổi (Đặc biệt: hatachi)", t: "Đếm tuổi N5", pos: "num", p: 1 },
  "何歳": { r: "なんさい", m: "Mấy tuổi? Bao nhiêu tuổi?", t: "Nghi vấn từ N5", pos: "num", p: 1 },
  "おいくつ": { r: "おいくつ", m: "Bao nhiêu tuổi? (Lịch sự)", t: "Giao tiếp N5", pos: "num", p: 2 },

  // Đếm thời gian (Giờ & Phút)
  "一時": { r: "いちじ", m: "1 giờ", t: "Thời gian N5", pos: "num", p: 2 },
  "四時": { r: "よじ", m: "4 giờ (Đặc biệt: yoji)", t: "Thời gian N5", pos: "num", p: 1 },
  "七時": { r: "しちじ", m: "7 giờ (Đặc biệt: shichiji)", t: "Thời gian N5", pos: "num", p: 2 },
  "九時": { r: "くじ", m: "9 giờ (Đặc biệt: kuji)", t: "Thời gian N5", pos: "num", p: 1 },
  "何時": { r: "なんじ", m: "Mấy giờ?", t: "Nghi vấn từ N5", pos: "num", p: 1 },
  "一分": { r: "いっぷん", m: "1 phút", t: "Thời gian N5", pos: "num", p: 1 },
  "二分": { r: "にふん", m: "2 phút", t: "Thời gian N5", pos: "num", p: 1 },
  "三分": { r: "さんぷん", m: "3 phút", t: "Thời gian N5", pos: "num", p: 1 },
  "四分": { r: "よんぷん", m: "4 phút", t: "Thời gian N5", pos: "num", p: 1 },
  "五分": { r: "ごふん", m: "5 phút", t: "Thời gian N5", pos: "num", p: 1 },
  "六分": { r: "ろっぷん", m: "6 phút", t: "Thời gian N5", pos: "num", p: 1 },
  "十分": { r: "じゅっぷん", m: "10 phút", t: "Thời gian N5", pos: "num", p: 1 },
  "何分": { r: "なんぷん", m: "Mấy phút?", t: "Nghi vấn từ N5", pos: "num", p: 1 },
  "半": { r: "はん", m: "Rưỡi, một nửa (Ví dụ: 3時半 = 3 rưỡi)", t: "Thời gian N5", pos: "num", p: 1 },

  // Đếm tiền Yên & Lượng từ đồ vật
  "円": { r: "えん", m: "Đồng Yên Nhật (¥)", t: "Đơn vị tiền N5", pos: "num", p: 1 },
  "百円": { r: "ひゃくえん", m: "100 Yên", t: "Đơn vị tiền N5", pos: "num", p: 2 },
  "千円": { r: "せんえん", m: "1,000 Yên", t: "Đơn vị tiền N5", pos: "num", p: 0 },
  "一万円": { r: "いちまんえん", m: "10,000 Yên (1 Man)", t: "Đơn vị tiền N5", pos: "num", p: 3 },
  "いくら": { r: "いくら", m: "Bao nhiêu tiền?", t: "Nghi vấn từ N5", pos: "num", p: 1 },
  "一本": { r: "いっぽん", m: "1 chai / 1 cây / 1 que (Vật thon dài)", t: "Lượng từ N5", pos: "num", p: 1 },
  "二本": { r: "にほん", m: "2 chai / 2 cây (Vật thon dài)", t: "Lượng từ N5", pos: "num", p: 1 },
  "三本": { r: "さんぼん", m: "3 chai / 3 cây (Đặc biệt: sambon)", t: "Lượng từ N5", pos: "num", p: 0 },
  "何本": { r: "なんぼん", m: "Mấy chai? Mấy cây?", t: "Nghi vấn từ N5", pos: "num", p: 1 },
  "一枚": { r: "いちまい", m: "1 tờ / 1 chiếc (Vật phẳng mỏng: giấy, áo, đĩa)", t: "Lượng từ N5", pos: "num", p: 2 },
  "何枚": { r: "なんまい", m: "Mấy tờ? Mấy chiếc?", t: "Nghi vấn từ N5", pos: "num", p: 1 },
  "一冊": { r: "いっさつ", m: "1 cuốn / 1 quyển (Sách, vở, tạp chí)", t: "Lượng từ N5", pos: "num", p: 1 },
  "何冊": { r: "なんさつ", m: "Mấy cuốn? Mấy quyển?", t: "Nghi vấn từ N5", pos: "num", p: 1 },
  "一台": { r: "いちだい", m: "1 chiếc / 1 cái (Xe cộ, máy móc, PC)", t: "Lượng từ N5", pos: "num", p: 2 },
  "何台": { r: "なんだい", m: "Mấy chiếc máy / xe?", t: "Nghi vấn từ N5", pos: "num", p: 1 },
  "一匹": { r: "いっぴき", m: "1 con (Động vật nhỏ, cá, côn trùng)", t: "Lượng từ N5", pos: "num", p: 1 },
  "何匹": { r: "なんびき", m: "Mấy con vật?", t: "Nghi vấn từ N5", pos: "num", p: 1 },
  "一回": { r: "いっかい", m: "1 lần", t: "Lượng từ N5", pos: "num", p: 1 },
  "何回": { r: "なんかい", m: "Mấy lần? Bao nhiêu lần?", t: "Nghi vấn từ N5", pos: "num", p: 1 },
  "一番": { r: "いちばん", m: "Số 1, nhất, trước tiên", t: "Thứ tự N5", pos: "num", p: 2 },

  // Chữ Hán đơn lẻ khác
  "大": { r: "だい", m: "To lớn, quy mô lớn, quan trọng", t: "Kanji N5", pos: "n", p: 1 },
  "小": { r: "しょう", m: "Nhỏ bé, ít ỏi", t: "Kanji N5", pos: "n", p: 1 },
  "中": { r: "ちゅう", m: "Ở giữa, bên trong, trung bình", t: "Kanji N5", pos: "n", p: 1 },
  "高": { r: "こう", m: "Cao, cao cấp", t: "Kanji N5", pos: "n", p: 1 },
  "低": { r: "てい", m: "Thấp, kém", t: "Kanji N5", pos: "n", p: 1 },
  "新": { r: "しん", m: "Mới mẻ", t: "Kanji N5", pos: "n", p: 1 },
  "古": { r: "こ", m: "Cũ, cổ xưa", t: "Kanji N5", pos: "n", p: 1 },
  "長": { r: "ちょう", m: "Dài, đứng đầu, sở trường", t: "Kanji N5", pos: "n", p: 1 },
  "短": { r: "たん", m: "Ngắn, đoản", t: "Kanji N5", pos: "n", p: 1 },

  // 2. Tính từ đuôi -i (い)
  "大きい": { r: "おおきい", m: "To lớn, rộng lớn", t: "Tính từ -i", pos: "adj-i", p: 3 },
  "小さい": { r: "ちいさい", m: "Nhỏ bé, ít", t: "Tính từ -i", pos: "adj-i", p: 3 },
  "高い": { r: "たかい", m: "Cao / Đắt tiền", t: "Tính từ -i", pos: "adj-i", p: 2 },
  "安い": { r: "やすい", m: "Rẻ, bình an", t: "Tính từ -i", pos: "adj-i", p: 2 },
  "新しい": { r: "あたらしい", m: "Mới, mới mẻ", t: "Tính từ -i", pos: "adj-i", p: 4 },
  "古い": { r: "ふるい", m: "Cũ, cổ kính", t: "Tính từ -i", pos: "adj-i", p: 2 },
  "長い": { r: "ながい", m: "Dài, lâu", t: "Tính từ -i", pos: "adj-i", p: 2 },
  "短い": { r: "みじかい", m: "Ngắn, ngắn ngủi", t: "Tính từ -i", pos: "adj-i", p: 3 },
  "多い": { r: "おおい", m: "Nhiều", t: "Tính từ -i", pos: "adj-i", p: 1 },
  "少ない": { r: "すくない", m: "Ít, hiếm", t: "Tính từ -i", pos: "adj-i", p: 3 },
  "良い": { r: "いい", m: "Tốt, đẹp, hay", t: "Tính từ -i", pos: "adj-i", p: 1 },
  "いい": { r: "いい", m: "Tốt, được, đẹp", t: "Tính từ -i", pos: "adj-i", p: 1 },
  "悪い": { r: "わるい", m: "Xấu, tồi tệ, có lỗi", t: "Tính từ -i", pos: "adj-i", p: 2 },
  "美味しい": { r: "おいしい", m: "Ngon miệng", t: "Tính từ -i", pos: "adj-i", p: 3 },
  "忙しい": { r: "いそがしい", m: "Bận rộn", t: "Tính từ -i", pos: "adj-i", p: 4 },
  "楽しい": { r: "たのしい", m: "Vui vẻ, thú vị", t: "Tính từ -i", pos: "adj-i", p: 3 },
  "嬉しい": { r: "うれしい", m: "Vui sướng, hạnh phúc", t: "Tính từ -i", pos: "adj-i", p: 3 },
  "早い": { r: "はやい", m: "Sớm, nhanh", t: "Tính từ -i", pos: "adj-i", p: 2 },
  "遅い": { r: "おそい", m: "Chậm, muộn", t: "Tính từ -i", pos: "adj-i", p: 0 },
  "暑い": { r: "あつい", m: "Nóng (thời tiết)", t: "Tính từ -i", pos: "adj-i", p: 2 },
  "寒い": { r: "さむい", m: "Lạnh (thời tiết)", t: "Tính từ -i", pos: "adj-i", p: 2 },
  "面白い": { r: "おもしろい", m: "Thú vị, hấp dẫn", t: "Tính từ -i", pos: "adj-i", p: 4 },
  "難しい": { r: "むずかしい", m: "Khó khăn, phức tạp", t: "Tính từ -i", pos: "adj-i", p: 4 },
  "易しい": { r: "やさしい", m: "Dễ dàng, đơn giản", t: "Tính từ -i", pos: "adj-i", p: 0 },

  // 3. Tính từ đuôi -na (な)
  "綺麗": { r: "きれい", m: "Đẹp đẽ, sạch sẽ", t: "Tính từ -na", pos: "adj-na", p: 1 },
  "きれい": { r: "きれい", m: "Đẹp đẽ, sạch sẽ", t: "Tính từ -na", pos: "adj-na", p: 1 },
  "簡単": { r: "かんたん", m: "Đơn giản, dễ làm", t: "Tính từ -na", pos: "adj-na", p: 0 },
  "便利": { r: "べんり", m: "Tiện lợi, thuận tiện", t: "Tính từ -na", pos: "adj-na", p: 1 },
  "有名": { r: "ゆうめい", m: "Nổi tiếng", t: "Tính từ -na", pos: "adj-na", p: 0 },
  "静か": { r: "しずか", m: "Yên tĩnh, thanh bình", t: "Tính từ -na", pos: "adj-na", p: 1 },
  "親切": { r: "しんせつ", m: "Tốt bụng, thân thiện", t: "Tính từ -na", pos: "adj-na", p: 1 },
  "好き": { r: "すき", m: "Thích, yêu thích", t: "Tính từ -na", pos: "adj-na", p: 2 },
  "嫌い": { r: "きらい", m: "Ghét, không thích", t: "Tính từ -na", pos: "adj-na", p: 0 },
  "大丈夫": { r: "だいじょうぶ", m: "Ổn thỏa, không sao", t: "Tính từ -na", pos: "adj-na", p: 3 },
  "重要": { r: "じゅうよう", m: "Quan trọng, trọng yếu", t: "Tính từ -na", pos: "adj-na", p: 0 },

  // 4. Động từ Nhóm 1 (Godan)
  "行く": { r: "いく", m: "Đi", t: "Động từ Nhóm 1", pos: "v1", p: 0 },
  "帰る": { r: "かえる", m: "Trở về nhà", t: "Động từ Nhóm 1", pos: "v1", p: 1 },
  "飲む": { r: "のむ", m: "Uống", t: "Động từ Nhóm 1", pos: "v1", p: 1 },
  "聞く": { r: "きく", m: "Nghe, hỏi", t: "Động từ Nhóm 1", pos: "v1", p: 0 },
  "読む": { r: "よむ", m: "Đọc", t: "Động từ Nhóm 1", pos: "v1", p: 1 },
  "書く": { r: "かく", m: "Viết, vẽ", t: "Động từ Nhóm 1", pos: "v1", p: 1 },
  "話す": { r: "はなす", m: "Nói chuyện, kể", t: "Động từ Nhóm 1", pos: "v1", p: 2 },
  "言う": { r: "いう", m: "Nói, bảo", t: "Động từ Nhóm 1", pos: "v1", p: 0 },
  "買う": { r: "かう", m: "Mua", t: "Động từ Nhóm 1", pos: "v1", p: 0 },
  "会う": { r: "あう", m: "Gặp gỡ", t: "Động từ Nhóm 1", pos: "v1", p: 1 },
  "待つ": { r: "まつ", m: "Chờ đợi", t: "Động từ Nhóm 1", pos: "v1", p: 1 },
  "走る": { r: "はしる", m: "Chạy", t: "Động từ Nhóm 1", pos: "v1", p: 2 },
  "歩く": { r: "あるく", m: "Đi bộ", t: "Động từ Nhóm 1", pos: "v1", p: 2 },
  "休む": { r: "やすむ", m: "Nghỉ ngơi, vắng mặt", t: "Động từ Nhóm 1", pos: "v1", p: 2 },
  "働く": { r: "はたらく", m: "Làm việc, lao động", t: "Động từ Nhóm 1", pos: "v1", p: 0 },
  "ある": { r: "ある", m: "Có (đồ vật, sự kiện)", t: "Động từ Nhóm 1", pos: "v1", p: 1 },
  "分かる": { r: "わかる", m: "Hiểu, nắm rõ", t: "Động từ Nhóm 1", pos: "v1", p: 2 },
  "知る": { r: "しる", m: "Biết, nhận biết", t: "Động từ Nhóm 1", pos: "v1", p: 0 },
  "思う": { r: "おもう", m: "Nghĩ, cảm thấy", t: "Động từ Nhóm 1", pos: "v1", p: 2 },
  "作る": { r: "つくる", m: "Làm, chế tạo, nấu", t: "Động từ Nhóm 1", pos: "v1", p: 2 },

  // 5. Động từ Nhóm 2 (Ichidan)
  "食べる": { r: "たべる", m: "Ăn", t: "Động từ Nhóm 2", pos: "v2", p: 2 },
  "見る": { r: "みる", m: "Xem, nhìn, trông thấy", t: "Động từ Nhóm 2", pos: "v2", p: 1 },
  "起きる": { r: "おきる", m: "Thức dậy, xảy ra", t: "Động từ Nhóm 2", pos: "v2", p: 2 },
  "寝る": { r: "ねる", m: "Ngủ, đi ngủ", t: "Động từ Nhóm 2", pos: "v2", p: 0 },
  "教える": { r: "おしえる", m: "Dạy học, chỉ bảo", t: "Động từ Nhóm 2", pos: "v2", p: 0 },
  "いる": { r: "いる", m: "Có, ở (người / động vật)", t: "Động từ Nhóm 2", pos: "v2", p: 0 },
  "考える": { r: "かんがえる", m: "Suy nghĩ, cân nhắc", t: "Động từ Nhóm 2", pos: "v2", p: 4 },
  "与える": { r: "あたえる", m: "Đem lại, trao cho, gây ra", t: "Động từ Nhóm 2", pos: "v2", p: 0 },

  // 6. Động từ Nhóm 3 (Bất quy tắc)
  "する": { r: "する", m: "Làm, thực hiện", t: "Động từ Nhóm 3", pos: "v3", p: 0 },
  "来る": { r: "くる", m: "Đến, tới", t: "Động từ Nhóm 3", pos: "v3", p: 1 },
  "勉強する": { r: "べんきょうする", m: "Học tập", t: "Động từ Nhóm 3", pos: "v3", p: 0 },
  "研究する": { r: "けんきゅうする", m: "Nghiên cứu", t: "Động từ Nhóm 3", pos: "v3", p: 0 },
  "保護する": { r: "ほごする", m: "Bảo vệ, gìn giữ", t: "Động từ Nhóm 3", pos: "v3", p: 1 },

  // 7. Danh từ & Từ ghép Kanji (Âm On)
  "日本語": { r: "にほんご", m: "Tiếng Nhật", t: "Danh từ N5", pos: "n", p: 0 },
  "日本": { r: "にほん", m: "Nhật Bản", t: "Danh từ N5", pos: "n", p: 2 },
  "英語": { r: "えいご", m: "Tiếng Anh", t: "Danh từ N5", pos: "n", p: 0 },
  "学生": { r: "がくせい", m: "Học sinh, sinh viên", t: "Danh từ N5", pos: "n", p: 0 },
  "先生": { r: "せんせい", m: "Thầy/Cô giáo, bác sĩ", t: "Danh từ N5", pos: "n", p: 3 },
  "留学生": { r: "りゅうがくせい", m: "Du học sinh", t: "Danh từ N5", pos: "n", p: 3 },
  "会社": { r: "かいしゃ", m: "Công ty", t: "Danh từ N5", pos: "n", p: 0 },
  "会社員": { r: "かいしゃいん", m: "Nhân viên công ty", t: "Danh từ N5", pos: "n", p: 3 },
  "学校": { r: "がっこう", m: "Trường học", t: "Danh từ N5", pos: "n", p: 0 },
  "大学": { r: "だいがく", m: "Trường đại học", t: "Danh từ N5", pos: "n", p: 0 },
  "東京大学": { r: "とうきょうだいがく", m: "Đại học Tokyo", t: "Danh từ N3", pos: "n", p: 5 },
  "病院": { r: "びょういん", m: "Bệnh viện", t: "Danh từ N5", pos: "n", p: 0 },
  "図書館": { r: "としょかん", m: "Thư viện", t: "Danh từ N5", pos: "n", p: 2 },
  "経済": { r: "けいざい", m: "Kinh tế", t: "Danh từ N3", pos: "n", p: 1 },
  "経済学": { r: "けいざいがく", m: "Kinh tế học", t: "Danh từ N2", pos: "n", p: 3 },
  "情報": { r: "じょうほう", m: "Thông tin", t: "Danh từ N3", pos: "n", p: 0 },
  "技術": { r: "ぎじゅつ", m: "Kỹ thuật, công nghệ", t: "Danh từ N3", pos: "n", p: 1 },
  "情報技術": { r: "じょうほうぎじゅつ", m: "Công nghệ thông tin (IT)", t: "Danh từ N2", pos: "n", p: 4 },
  "自然": { r: "しぜん", m: "Tự nhiên, thiên nhiên", t: "Danh từ N4", pos: "n", p: 0 },
  "環境": { r: "かんきょう", m: "Môi trường", t: "Danh từ N3", pos: "n", p: 0 },
  "自然環境": { r: "しぜんかんきょう", m: "Môi trường tự nhiên", t: "Danh từ N2", pos: "n", p: 4 },
  "保護": { r: "ほご", m: "Bảo vệ, bảo hộ", t: "Danh từ N3", pos: "n", p: 1 },
  "責任": { r: "せきにん", m: "Trách nhiệm", t: "Danh từ N3", pos: "n", p: 0 },
  "部屋": { r: "へや", m: "Căn phòng", t: "Danh từ N5", pos: "n", p: 2 },
  "机": { r: "つくえ", m: "Bàn làm việc / bàn học", t: "Danh từ N5", pos: "n", p: 0 },
  "パソコン": { r: "パソコン", m: "Máy vi tính cá nhân (PC)", t: "Danh từ N5", pos: "n", p: 0 },
  "読み物": { r: "よみもの", m: "Tài liệu đọc, bài đọc hiểu", t: "Danh từ N4", pos: "n", p: 0 },
  "言葉": { r: "ことば", m: "Từ vựng, ngôn từ, lời nói", t: "Danh từ N5", pos: "n", p: 3 },
  "友達": { r: "ともだち", m: "Bạn bè", t: "Danh từ N5", pos: "n", p: 0 },
  "家族": { r: "かぞく", m: "Gia đình", t: "Danh từ N5", pos: "n", p: 1 },
  "今日": { r: "きょう", m: "Hôm nay", t: "Danh từ N5", pos: "n", p: 1 },
  "明日": { r: "あした", m: "Ngày mai", t: "Danh từ N5", pos: "n", p: 3 },
  "昨日": { r: "きのう", m: "Hôm qua", t: "Danh từ N5", pos: "n", p: 2 },
  "水": { r: "みず", m: "Nước lọc", t: "Danh từ N5", pos: "n", p: 0 },
  "お茶": { r: "おちゃ", m: "Trà, nước chè", t: "Danh từ N5", pos: "n", p: 0 },
  "ご飯": { r: "ごはん", m: "Cơm, bữa ăn", t: "Danh từ N5", pos: "n", p: 1 },
  "ラーメン": { r: "ラーメン", m: "Mì Ramen", t: "Danh từ N5", pos: "n", p: 1 },

  // Giao tiếp
  "こんにちは": { r: "こんにちは", m: "Xin chào (ban ngày)", t: "Chào hỏi", pos: "exp", p: 0 },
  "こんばんは": { r: "こんばんは", m: "Chào buổi tối", t: "Chào hỏi", pos: "exp", p: 0 },
  "おはよう": { r: "おはよう", m: "Chào buổi sáng (thân mật)", t: "Chào hỏi", pos: "exp", p: 0 },
  "おはようございます": { r: "おはようございます", m: "Chào buổi sáng (lịch sự)", t: "Chào hỏi", pos: "exp", p: 0 },
  "ありがとう": { r: "ありがとう", m: "Cảm ơn (thân mật)", t: "Chào hỏi", pos: "exp", p: 2 },
  "ありがとうございます": { r: "ありがとうございます", m: "Xin chân thành cảm ơn (lịch sự)", t: "Chào hỏi", pos: "exp", p: 2 },
  "すみません": { r: "すみません", m: "Xin lỗi / Cảm ơn / Làm phiền", t: "Giao tiếp", pos: "exp", p: 4 },
  "お疲れ様でした": { r: "おつかれさまでした", m: "Bạn đã vất vả rồi (sau giờ làm/học)", t: "Giao tiếp", pos: "exp", p: 6 },
  "初めまして": { r: "はじめまして", m: "Rất hân hạnh được gặp bạn", t: "Chào hỏi", pos: "exp", p: 4 },
  "よろしくお願いします": { r: "よろしくおねがいします", m: "Xin nhờ giúp đỡ (lịch sự)", t: "Chào hỏi", pos: "exp", p: 0 }
};

/**
 * Quy tắc bóc tách ngữ pháp chia đuôi đa tầng (Multi-layer De-inflection & Grammar Details)
 */
const GRAMMAR_DEINFLECT_PATTERNS = [
  // 1. Thể Lịch sự / Quá khứ / Phủ định
  { suffix: 'ませんでした', replace: ['る', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'う', 'する'], tag: 'Thể Lịch sự Phủ định Quá khứ (〜ませんでした)', form: 'Quá khứ Phủ định Lịch sự' },
  { suffix: 'ました', replace: ['る', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'う', 'する'], tag: 'Thể Lịch sự Quá khứ (〜ました)', form: 'Quá khứ Lịch sự' },
  { suffix: 'ません', replace: ['る', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'う', 'する'], tag: 'Thể Lịch sự Phủ định (〜ません)', form: 'Phủ định Lịch sự' },
  { suffix: 'ます', replace: ['る', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'う', 'する'], tag: 'Thể Lịch sự (〜ます)', form: 'Khẳng định Lịch sự' },
  { suffix: 'でした', replace: ['だ', 'です', ''], tag: 'Quá khứ Lịch sự (〜でした)', form: 'Quá khứ Lịch sự' },
  { suffix: 'です', replace: ['だ', ''], tag: 'Lịch sự (〜です)', form: 'Khẳng định Lịch sự' },
  
  // 2. Sai khiến + Bị động
  { suffix: 'させられた', replace: ['る', 'する'], tag: 'Thể Sai khiến Bị động Quá khứ [Bị bắt làm]', form: 'Sai khiến + Bị động + Quá khứ' },
  { suffix: 'させられる', replace: ['る', 'する'], tag: 'Thể Sai khiến Bị động [Bị bắt làm]', form: 'Sai khiến + Bị động' },
  { suffix: 'させる', replace: ['る', 'する'], tag: 'Thể Sai khiến [Bắt / Cho phép làm]', form: 'Sai khiến' },
  { suffix: 'させた', replace: ['る', 'する'], tag: 'Thể Sai khiến Quá khứ', form: 'Sai khiến Quá khứ' },
  { suffix: 'られた', replace: ['る'], tag: 'Thể Bị động / Khả năng Quá khứ [Được / Bị làm]', form: 'Bị động Quá khứ' },
  { suffix: 'られる', replace: ['る'], tag: 'Thể Bị động / Khả năng [Được / Bị / Có thể]', form: 'Bị động / Khả năng' },
  { suffix: 'れない', replace: ['る'], tag: 'Thể Phủ định Khả năng [Không thể làm]', form: 'Phủ định Khả năng' },

  // 3. Mong muốn (〜たい)
  { suffix: 'たくなかった', replace: ['る', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'う', 'する'], tag: 'Thể Muốn Phủ định Quá khứ [Đã không muốn]', form: 'Muốn + Phủ định + Quá khứ' },
  { suffix: 'たくない', replace: ['る', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'う', 'する'], tag: 'Thể Muốn Phủ định [Không muốn làm]', form: 'Muốn + Phủ định' },
  { suffix: 'たかった', replace: ['る', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'う', 'する'], tag: 'Thể Muốn Quá khứ [Đã muốn làm]', form: 'Muốn Quá khứ' },
  { suffix: 'たい', replace: ['る', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'う', 'する'], tag: 'Thể Mong muốn (〜たい) [Muốn làm]', form: 'Mong muốn' },

  // 4. Phủ định ない
  { suffix: 'なかった', replace: ['ない', 'る', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'う', 'い'], tag: 'Thể Phủ định Quá khứ (〜なかった) [Đã không]', form: 'Phủ định Quá khứ' },
  { suffix: 'ない', replace: ['る', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'う'], tag: 'Thể Phủ định (〜ない) [Không làm]', form: 'Phủ định' },

  // 5. Thể Tiếp diễn (〜ている) / Thể て / Thể た
  { suffix: 'ています', replace: ['て', 'る', 'く', 'つ', 'う'], tag: 'Thể Đang diễn ra Lịch sự (〜ています)', form: 'Tiếp diễn Lịch sự' },
  { suffix: 'ていた', replace: ['て', 'る', 'く', 'つ', 'う'], tag: 'Thể Đã đang diễn ra (〜ていた)', form: 'Tiếp diễn Quá khứ' },
  { suffix: 'ている', replace: ['て', 'る', 'く', 'つ', 'う'], tag: 'Thể Đang diễn ra (〜ている)', form: 'Tiếp diễn' },
  { suffix: 'て', replace: ['る', 'く', 'つ', 'う'], tag: 'Thể Nối / Mệnh lệnh nhẹ (〜て)', form: 'Thể て' },
  { suffix: 'た', replace: ['る', 'く', 'つ', 'う'], tag: 'Thể Quá khứ / Đã xong (〜た)', form: 'Quá khứ' },
  { suffix: 'んで', replace: ['む', 'ぶ', 'ぬ'], tag: 'Thể Nối (〜んで)', form: 'Thể て' },
  { suffix: 'んだ', replace: ['む', 'ぶ', 'ぬ'], tag: 'Thể Quá khứ (〜んだ)', form: 'Quá khứ' },
  { suffix: 'いて', replace: ['く'], tag: 'Thể Nối (〜いて)', form: 'Thể て' },
  { suffix: 'いた', replace: ['く'], tag: 'Thể Quá khứ (〜いた)', form: 'Quá khứ' },
  { suffix: 'して', replace: ['す', 'する'], tag: 'Thể Nối (〜して)', form: 'Thể て' },
  { suffix: 'した', replace: ['す', 'する'], tag: 'Thể Quá khứ (〜した)', form: 'Quá khứ' },

  // 6. Tính từ đuôi -i (い)
  { suffix: 'くなかった', replace: ['い'], tag: 'Tính từ Phủ định Quá khứ (〜くなかった)', form: 'Phủ định Quá khứ' },
  { suffix: 'くない', replace: ['い'], tag: 'Tính từ Phủ định (〜くない)', form: 'Phủ định' },
  { suffix: 'かった', replace: ['い'], tag: 'Tính từ Quá khứ (〜かった)', form: 'Quá khứ' },
  { suffix: 'くて', replace: ['い'], tag: 'Tính từ Thể Nối (〜くて)', form: 'Thể Nối' },
  { suffix: 'く', replace: ['い'], tag: 'Phó từ hóa tính từ (〜く)', form: 'Phó từ' }
];

/**
 * Tra từ điển tiếng Nhật với giải thuật de-inflection ngữ pháp sâu
 * @param {string} word 
 * @returns {object|null} { word, baseWord, reading, meaning, type, pos, pitch, grammarTags, grammarForm }
 */
function lookupJapaneseWord(word) {
  if (!word) return null;
  const cleanWord = word.trim();

  // 1. Khớp từ điển trực tiếp
  if (JP_DICTIONARY[cleanWord]) {
    const item = JP_DICTIONARY[cleanWord];
    return {
      word: cleanWord,
      baseWord: cleanWord,
      reading: item.r,
      meaning: item.m,
      type: item.t,
      pos: item.pos || '',
      pitch: typeof item.p !== 'undefined' ? item.p : null,
      grammarTags: [],
      grammarForm: 'Nguyên mẫu (辞書形)'
    };
  }

  // 2. Tra cứu qua De-inflection
  for (const rule of GRAMMAR_DEINFLECT_PATTERNS) {
    if (cleanWord.endsWith(rule.suffix)) {
      const stem = cleanWord.slice(0, -rule.suffix.length);
      for (const rep of rule.replace) {
        const candidate = stem + rep;
        if (JP_DICTIONARY[candidate]) {
          const item = JP_DICTIONARY[candidate];
          return {
            word: cleanWord,
            baseWord: candidate,
            reading: item.r,
            meaning: `[Gốc: ${candidate}]: ${item.m}`,
            type: item.t,
            pos: item.pos || '',
            pitch: typeof item.p !== 'undefined' ? item.p : null,
            grammarTags: [rule.tag],
            grammarForm: rule.form
          };
        }
      }
    }
  }

  return null;
}

// Xuất ra môi trường
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { JP_DICTIONARY, lookupJapaneseWord, GRAMMAR_DEINFLECT_PATTERNS };
}
