// Từ điển tiếng Nhật phong phú kèm Phân loại Từ loại, Trọng âm (Pitch Accent) & Bộ phân tích Ngữ pháp đa tầng

const JP_DICTIONARY = {
  "一": {
    "r": "いち",
    "m": "Một (Số 1)",
    "t": "Số từ N5",
    "pos": "num",
    "p": 2
  },
  "二": {
    "r": "に",
    "m": "Hai (Số 2)",
    "t": "Số từ N5",
    "pos": "num",
    "p": 1
  },
  "三": {
    "r": "さん",
    "m": "Ba (Số 3)",
    "t": "Số từ N5",
    "pos": "num",
    "p": 0
  },
  "四": {
    "r": "よん",
    "m": "Bốn (Số 4) [đọc: yon/shi]",
    "t": "Số từ N5",
    "pos": "num",
    "p": 1
  },
  "五": {
    "r": "ご",
    "m": "Năm (Số 5)",
    "t": "Số từ N5",
    "pos": "num",
    "p": 1
  },
  "六": {
    "r": "ろく",
    "m": "Sáu (Số 6)",
    "t": "Số từ N5",
    "pos": "num",
    "p": 2
  },
  "七": {
    "r": "なな",
    "m": "Bảy (Số 7) [đọc: nana/shichi]",
    "t": "Số từ N5",
    "pos": "num",
    "p": 1
  },
  "八": {
    "r": "はち",
    "m": "Tám (Số 8)",
    "t": "Số từ N5",
    "pos": "num",
    "p": 2
  },
  "九": {
    "r": "きゅう",
    "m": "Chín (Số 9) [đọc: kyuu/ku]",
    "t": "Số từ N5",
    "pos": "num",
    "p": 1
  },
  "十": {
    "r": "じゅう",
    "m": "Mười (Số 10)",
    "t": "Số từ N5",
    "pos": "num",
    "p": 1
  },
  "百": {
    "r": "ひゃく",
    "m": "Một trăm (100)",
    "t": "Số từ N5",
    "pos": "num",
    "p": 2
  },
  "千": {
    "r": "せん",
    "m": "Một nghìn (1,000)",
    "t": "Số từ N5",
    "pos": "num",
    "p": 1
  },
  "万": {
    "r": "まん",
    "m": "Một vạn / Mười nghìn (10,000)",
    "t": "Số từ N5",
    "pos": "num",
    "p": 1
  },
  "一万": {
    "r": "いちまん",
    "m": "Một vạn (10,000 Yên/người)",
    "t": "Số từ N5",
    "pos": "num",
    "p": 2
  },
  "億": {
    "r": "おく",
    "m": "Một trăm triệu (100,000,000)",
    "t": "Số từ N4",
    "pos": "num",
    "p": 1
  },
  "零": {
    "r": "れい",
    "m": "Số không (0)",
    "t": "Số từ N5",
    "pos": "num",
    "p": 1
  },
  "ゼロ": {
    "r": "ゼロ",
    "m": "Số không (0)",
    "t": "Số từ N5",
    "pos": "num",
    "p": 1
  },
  "一つ": {
    "r": "ひとつ",
    "m": "1 cái, 1 chiếc (Đếm tổng quát)",
    "t": "Lượng từ N5",
    "pos": "num",
    "p": 2
  },
  "二つ": {
    "r": "ふたつ",
    "m": "2 cái, 2 chiếc",
    "t": "Lượng từ N5",
    "pos": "num",
    "p": 3
  },
  "三つ": {
    "r": "みっつ",
    "m": "3 cái, 3 chiếc",
    "t": "Lượng từ N5",
    "pos": "num",
    "p": 3
  },
  "四つ": {
    "r": "よっつ",
    "m": "4 cái, 4 chiếc",
    "t": "Lượng từ N5",
    "pos": "num",
    "p": 3
  },
  "五つ": {
    "r": "いつつ",
    "m": "5 cái, 5 chiếc",
    "t": "Lượng từ N5",
    "pos": "num",
    "p": 2
  },
  "六つ": {
    "r": "むっつ",
    "m": "6 cái, 6 chiếc",
    "t": "Lượng từ N5",
    "pos": "num",
    "p": 3
  },
  "七つ": {
    "r": "ななつ",
    "m": "7 cái, 7 chiếc",
    "t": "Lượng từ N5",
    "pos": "num",
    "p": 2
  },
  "八つ": {
    "r": "やっつ",
    "m": "8 cái, 8 chiếc",
    "t": "Lượng từ N5",
    "pos": "num",
    "p": 3
  },
  "九つ": {
    "r": "ここのつ",
    "m": "9 cái, 9 chiếc",
    "t": "Lượng từ N5",
    "pos": "num",
    "p": 2
  },
  "幾つ": {
    "r": "いくつ",
    "m": "Bao nhiêu cái? Mấy cái?",
    "t": "Nghi vấn từ N5",
    "pos": "num",
    "p": 1
  },
  "いくつ": {
    "r": "いくつ",
    "m": "Bao nhiêu cái? Mấy cái?",
    "t": "Nghi vấn từ N5",
    "pos": "num",
    "p": 1
  },
  "一人": {
    "r": "ひとり",
    "m": "1 người (Đặc biệt: hitori)",
    "t": "Đếm người N5",
    "pos": "num",
    "p": 2
  },
  "二人": {
    "r": "ふたり",
    "m": "2 người (Đặc biệt: futari)",
    "t": "Đếm người N5",
    "pos": "num",
    "p": 3
  },
  "三人": {
    "r": "さんにん",
    "m": "3 người",
    "t": "Đếm người N5",
    "pos": "num",
    "p": 3
  },
  "四人": {
    "r": "よにん",
    "m": "4 người (Đặc biệt: yonin)",
    "t": "Đếm người N5",
    "pos": "num",
    "p": 2
  },
  "五人": {
    "r": "ごにん",
    "m": "5 người",
    "t": "Đếm người N5",
    "pos": "num",
    "p": 2
  },
  "六人": {
    "r": "ろくにん",
    "m": "6 người",
    "t": "Đếm người N5",
    "pos": "num",
    "p": 2
  },
  "何人": {
    "r": "なんにん",
    "m": "Mấy người? Bao nhiêu người?",
    "t": "Nghi vấn từ N5",
    "pos": "num",
    "p": 3
  },
  "一日": {
    "r": "ついたち",
    "m": "Mùng 1 (ngày đầu tháng) / いちにち: 1 ngày",
    "t": "Đếm ngày N5",
    "pos": "num",
    "p": 4
  },
  "二日": {
    "r": "ふつか",
    "m": "Mùng 2 / 2 ngày",
    "t": "Đếm ngày N5",
    "pos": "num",
    "p": 0
  },
  "三日": {
    "r": "みっか",
    "m": "Mùng 3 / 3 ngày",
    "t": "Đếm ngày N5",
    "pos": "num",
    "p": 0
  },
  "四日": {
    "r": "よっか",
    "m": "Mùng 4 / 4 ngày",
    "t": "Đếm ngày N5",
    "pos": "num",
    "p": 0
  },
  "五日": {
    "r": "いつか",
    "m": "Mùng 5 / 5 ngày",
    "t": "Đếm ngày N5",
    "pos": "num",
    "p": 0
  },
  "六日": {
    "r": "むいか",
    "m": "Mùng 6 / 6 ngày",
    "t": "Đếm ngày N5",
    "pos": "num",
    "p": 0
  },
  "七日": {
    "r": "なのか",
    "m": "Mùng 7 / 7 ngày",
    "t": "Đếm ngày N5",
    "pos": "num",
    "p": 0
  },
  "八日": {
    "r": "ようか",
    "m": "Mùng 8 / 8 ngày",
    "t": "Đếm ngày N5",
    "pos": "num",
    "p": 0
  },
  "九日": {
    "r": "ここのか",
    "m": "Mùng 9 / 9 ngày",
    "t": "Đếm ngày N5",
    "pos": "num",
    "p": 0
  },
  "十日": {
    "r": "とおか",
    "m": "Mùng 10 / 10 ngày",
    "t": "Đếm ngày N5",
    "pos": "num",
    "p": 0
  },
  "十四日": {
    "r": "じゅうよっか",
    "m": "Ngày 14 / 14 ngày (Đặc biệt)",
    "t": "Đếm ngày N5",
    "pos": "num",
    "p": 0
  },
  "二十日": {
    "r": "はつか",
    "m": "Ngày 20 / 20 ngày (Đặc biệt: hatsuka)",
    "t": "Đếm ngày N5",
    "pos": "num",
    "p": 0
  },
  "二十四日": {
    "r": "にじゅうよっか",
    "m": "Ngày 24 / 24 ngày (Đặc biệt)",
    "t": "Đếm ngày N5",
    "pos": "num",
    "p": 0
  },
  "何日": {
    "r": "なんにち",
    "m": "Ngày mấy? Bao nhiêu ngày?",
    "t": "Nghi vấn từ N5",
    "pos": "num",
    "p": 1
  },
  "一歳": {
    "r": "いっさい",
    "m": "1 tuổi",
    "t": "Đếm tuổi N5",
    "pos": "num",
    "p": 1
  },
  "八歳": {
    "r": "はっさい",
    "m": "8 tuổi",
    "t": "Đếm tuổi N5",
    "pos": "num",
    "p": 1
  },
  "十歳": {
    "r": "じゅっさい",
    "m": "10 tuổi",
    "t": "Đếm tuổi N5",
    "pos": "num",
    "p": 1
  },
  "二十歳": {
    "r": "はたち",
    "m": "20 tuổi (Đặc biệt: hatachi)",
    "t": "Đếm tuổi N5",
    "pos": "num",
    "p": 1
  },
  "何歳": {
    "r": "なんさい",
    "m": "Mấy tuổi? Bao nhiêu tuổi?",
    "t": "Nghi vấn từ N5",
    "pos": "num",
    "p": 1
  },
  "おいくつ": {
    "r": "おいくつ",
    "m": "Bao nhiêu tuổi? (Lịch sự)",
    "t": "Giao tiếp N5",
    "pos": "num",
    "p": 2
  },
  "一時": {
    "r": "いちじ",
    "m": "1 giờ",
    "t": "Thời gian N5",
    "pos": "num",
    "p": 2
  },
  "四時": {
    "r": "よじ",
    "m": "4 giờ (Đặc biệt: yoji)",
    "t": "Thời gian N5",
    "pos": "num",
    "p": 1
  },
  "七時": {
    "r": "しちじ",
    "m": "7 giờ (Đặc biệt: shichiji)",
    "t": "Thời gian N5",
    "pos": "num",
    "p": 2
  },
  "九時": {
    "r": "くじ",
    "m": "9 giờ (Đặc biệt: kuji)",
    "t": "Thời gian N5",
    "pos": "num",
    "p": 1
  },
  "何時": {
    "r": "なんじ",
    "m": "Mấy giờ?",
    "t": "Nghi vấn từ N5",
    "pos": "num",
    "p": 1
  },
  "一分": {
    "r": "いっぷん",
    "m": "1 phút",
    "t": "Thời gian N5",
    "pos": "num",
    "p": 1
  },
  "二分": {
    "r": "にふん",
    "m": "2 phút",
    "t": "Thời gian N5",
    "pos": "num",
    "p": 1
  },
  "三分": {
    "r": "さんぷん",
    "m": "3 phút",
    "t": "Thời gian N5",
    "pos": "num",
    "p": 1
  },
  "四分": {
    "r": "よんぷん",
    "m": "4 phút",
    "t": "Thời gian N5",
    "pos": "num",
    "p": 1
  },
  "五分": {
    "r": "ごふん",
    "m": "5 phút",
    "t": "Thời gian N5",
    "pos": "num",
    "p": 1
  },
  "六分": {
    "r": "ろっぷん",
    "m": "6 phút",
    "t": "Thời gian N5",
    "pos": "num",
    "p": 1
  },
  "十分": {
    "r": "じゅっぷん",
    "m": "10 phút",
    "t": "Thời gian N5",
    "pos": "num",
    "p": 1
  },
  "何分": {
    "r": "なんぷん",
    "m": "Mấy phút?",
    "t": "Nghi vấn từ N5",
    "pos": "num",
    "p": 1
  },
  "半": {
    "r": "はん",
    "m": "Rưỡi, một nửa (Ví dụ: 3時半 = 3 rưỡi)",
    "t": "Thời gian N5",
    "pos": "num",
    "p": 1
  },
  "円": {
    "r": "えん",
    "m": "Đồng Yên Nhật (¥)",
    "t": "Đơn vị tiền N5",
    "pos": "num",
    "p": 1
  },
  "百円": {
    "r": "ひゃくえん",
    "m": "100 Yên",
    "t": "Đơn vị tiền N5",
    "pos": "num",
    "p": 2
  },
  "千円": {
    "r": "せんえん",
    "m": "1,000 Yên",
    "t": "Đơn vị tiền N5",
    "pos": "num",
    "p": 0
  },
  "一万円": {
    "r": "いちまんえん",
    "m": "10,000 Yên (1 Man)",
    "t": "Đơn vị tiền N5",
    "pos": "num",
    "p": 3
  },
  "いくら": {
    "r": "いくら",
    "m": "Bao nhiêu tiền?",
    "t": "Nghi vấn từ N5",
    "pos": "num",
    "p": 1
  },
  "一本": {
    "r": "いっぽん",
    "m": "1 chai / 1 cây / 1 que (Vật thon dài)",
    "t": "Lượng từ N5",
    "pos": "num",
    "p": 1
  },
  "二本": {
    "r": "にほん",
    "m": "2 chai / 2 cây (Vật thon dài)",
    "t": "Lượng từ N5",
    "pos": "num",
    "p": 1
  },
  "三本": {
    "r": "さんぼん",
    "m": "3 chai / 3 cây (Đặc biệt: sambon)",
    "t": "Lượng từ N5",
    "pos": "num",
    "p": 0
  },
  "何本": {
    "r": "なんぼん",
    "m": "Mấy chai? Mấy cây?",
    "t": "Nghi vấn từ N5",
    "pos": "num",
    "p": 1
  },
  "一枚": {
    "r": "いちまい",
    "m": "1 tờ / 1 chiếc (Vật phẳng mỏng: giấy, áo, đĩa)",
    "t": "Lượng từ N5",
    "pos": "num",
    "p": 2
  },
  "何枚": {
    "r": "なんまい",
    "m": "Mấy tờ? Mấy chiếc?",
    "t": "Nghi vấn từ N5",
    "pos": "num",
    "p": 1
  },
  "一冊": {
    "r": "いっさつ",
    "m": "1 cuốn / 1 quyển (Sách, vở, tạp chí)",
    "t": "Lượng từ N5",
    "pos": "num",
    "p": 1
  },
  "何冊": {
    "r": "なんさつ",
    "m": "Mấy cuốn? Mấy quyển?",
    "t": "Nghi vấn từ N5",
    "pos": "num",
    "p": 1
  },
  "一台": {
    "r": "いちだい",
    "m": "1 chiếc / 1 cái (Xe cộ, máy móc, PC)",
    "t": "Lượng từ N5",
    "pos": "num",
    "p": 2
  },
  "何台": {
    "r": "なんだい",
    "m": "Mấy chiếc máy / xe?",
    "t": "Nghi vấn từ N5",
    "pos": "num",
    "p": 1
  },
  "一匹": {
    "r": "いっぴき",
    "m": "1 con (Động vật nhỏ, cá, côn trùng)",
    "t": "Lượng từ N5",
    "pos": "num",
    "p": 1
  },
  "何匹": {
    "r": "なんびき",
    "m": "Mấy con vật?",
    "t": "Nghi vấn từ N5",
    "pos": "num",
    "p": 1
  },
  "一回": {
    "r": "いっかい",
    "m": "1 lần",
    "t": "Lượng từ N5",
    "pos": "num",
    "p": 1
  },
  "何回": {
    "r": "なんかい",
    "m": "Mấy lần? Bao nhiêu lần?",
    "t": "Nghi vấn từ N5",
    "pos": "num",
    "p": 1
  },
  "一番": {
    "r": "いちばん",
    "m": "Nhất, trước tiên",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 2
  },
  "大": {
    "r": "だい",
    "m": "To lớn, quy mô lớn, quan trọng",
    "t": "Kanji N5",
    "pos": "n",
    "p": 1
  },
  "小": {
    "r": "しょう",
    "m": "Nhỏ bé, ít ỏi",
    "t": "Kanji N5",
    "pos": "n",
    "p": 1
  },
  "中": {
    "r": "ちゅう",
    "m": "Ở giữa, bên trong, trung bình",
    "t": "Kanji N5",
    "pos": "n",
    "p": 1
  },
  "高": {
    "r": "こう",
    "m": "Cao, cao cấp",
    "t": "Kanji N5",
    "pos": "n",
    "p": 1
  },
  "低": {
    "r": "てい",
    "m": "Thấp, kém",
    "t": "Kanji N5",
    "pos": "n",
    "p": 1
  },
  "新": {
    "r": "しん",
    "m": "Mới mẻ",
    "t": "Kanji N5",
    "pos": "n",
    "p": 1
  },
  "古": {
    "r": "こ",
    "m": "Cũ, cổ xưa",
    "t": "Kanji N5",
    "pos": "n",
    "p": 1
  },
  "長": {
    "r": "ちょう",
    "m": "Dài, đứng đầu, sở trường",
    "t": "Kanji N5",
    "pos": "n",
    "p": 1
  },
  "短": {
    "r": "たん",
    "m": "Ngắn, đoản",
    "t": "Kanji N5",
    "pos": "n",
    "p": 1
  },
  "大きい": {
    "r": "おおきい",
    "m": "To lớn, rộng lớn",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 3
  },
  "小さい": {
    "r": "ちいさい",
    "m": "Nhỏ bé, bé tí",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 3
  },
  "高い": {
    "r": "たかい",
    "m": "Cao / Đắt tiền",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "安い": {
    "r": "やすい",
    "m": "Rẻ tiền / Bình an",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "新しい": {
    "r": "あたらしい",
    "m": "Mới mẻ",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 4
  },
  "古い": {
    "r": "ふるい",
    "m": "Cũ kỹ, cổ kính",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "長い": {
    "r": "ながい",
    "m": "Dài, lâu",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "短い": {
    "r": "みじかい",
    "m": "Ngắn, ngắn ngủi",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 3
  },
  "多い": {
    "r": "おおい",
    "m": "Nhiều",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 1
  },
  "少ない": {
    "r": "すくない",
    "m": "Ít ỏi, hiếm",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 3
  },
  "良い": {
    "r": "いい",
    "m": "Tốt, đẹp, hay",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 1
  },
  "いい": {
    "r": "いい",
    "m": "Tốt, được, đẹp",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 1
  },
  "悪い": {
    "r": "わるい",
    "m": "Xấu, tồi tệ",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "美味しい": {
    "r": "おいしい",
    "m": "Ngon miệng",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 3
  },
  "忙しい": {
    "r": "いそがしい",
    "m": "Bận rộn",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 4
  },
  "楽しい": {
    "r": "たのしい",
    "m": "Vui vẻ, hào hứng",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 3
  },
  "嬉しい": {
    "r": "うれしい",
    "m": "Vui mừng, sung sướng",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 3
  },
  "早い": {
    "r": "はやい",
    "m": "Sớm (thời gian)",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "遅い": {
    "r": "おそい",
    "m": "Chậm chạp, muộn màng",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 0
  },
  "暑い": {
    "r": "あつい",
    "m": "Nóng (thời tiết)",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "寒い": {
    "r": "さむい",
    "m": "Lạnh (thời tiết)",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "面白い": {
    "r": "おもしろい",
    "m": "Thú vị, hay ho",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 4
  },
  "難しい": {
    "r": "むずかしい",
    "m": "Khó khăn, phức tạp",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 4
  },
  "易しい": {
    "r": "やさしい",
    "m": "Dễ dàng, đơn giản",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 0
  },
  "綺麗": {
    "r": "きれい",
    "m": "Đẹp đẽ, sạch sẽ",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 1
  },
  "きれい": {
    "r": "きれい",
    "m": "Đẹp đẽ, sạch sẽ",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 1
  },
  "簡単": {
    "r": "かんたん",
    "m": "Đơn giản, dễ dàng",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 0
  },
  "便利": {
    "r": "べんり",
    "m": "Tiện lợi, thuận tiện",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 1
  },
  "有名": {
    "r": "ゆうめい",
    "m": "Nổi tiếng",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 0
  },
  "静か": {
    "r": "しずか",
    "m": "Yên tĩnh, thanh bình",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 1
  },
  "親切": {
    "r": "しんせつ",
    "m": "Tốt bụng, ân cần",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 1
  },
  "好き": {
    "r": "すき",
    "m": "Thích, yêu mến",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 2
  },
  "嫌い": {
    "r": "きらい",
    "m": "Ghét, không thích",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 0
  },
  "大丈夫": {
    "r": "だいじょうぶ",
    "m": "Ổn thỏa, không sao",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 3
  },
  "重要": {
    "r": "じゅうよう",
    "m": "Quan trọng, trọng yếu",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 0
  },
  "行く": {
    "r": "いく",
    "m": "Đi",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "帰る": {
    "r": "かえる",
    "m": "Trở về nhà",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 1
  },
  "飲む": {
    "r": "のむ",
    "m": "Uống",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 1
  },
  "聞く": {
    "r": "きく",
    "m": "Nghe, hỏi thăm",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "読む": {
    "r": "よむ",
    "m": "Đọc",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 1
  },
  "書く": {
    "r": "かく",
    "m": "Viết, vẽ",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 1
  },
  "話す": {
    "r": "はなす",
    "m": "Nói chuyện, kể",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 2
  },
  "言う": {
    "r": "いう",
    "m": "Nói, bảo",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "買う": {
    "r": "かう",
    "m": "Mua sắm",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "会う": {
    "r": "あう",
    "m": "Gặp gỡ",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 1
  },
  "待つ": {
    "r": "まつ",
    "m": "Chờ đợi",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 1
  },
  "走る": {
    "r": "はしる",
    "m": "Chạy",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 2
  },
  "歩く": {
    "r": "あるく",
    "m": "Đi bộ",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 2
  },
  "休む": {
    "r": "やすむ",
    "m": "Nghỉ ngơi, vắng mặt",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 2
  },
  "働く": {
    "r": "はたらく",
    "m": "Làm việc, lao động",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "ある": {
    "r": "ある",
    "m": "Có (đồ vật, sự kiện)",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 1
  },
  "分かる": {
    "r": "わかる",
    "m": "Hiểu, nắm rõ",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 2
  },
  "知る": {
    "r": "しる",
    "m": "Biết, nắm rõ",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "思う": {
    "r": "おもう",
    "m": "Nghĩ, cảm thấy",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 2
  },
  "作る": {
    "r": "つくる",
    "m": "Làm, chế tạo, nấu",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 2
  },
  "食べる": {
    "r": "たべる",
    "m": "Ăn",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 2
  },
  "見る": {
    "r": "みる",
    "m": "Xem, nhìn, trông thấy",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 1
  },
  "起きる": {
    "r": "おきる",
    "m": "Thức dậy, thức giấc",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 2
  },
  "寝る": {
    "r": "ねる",
    "m": "Đi ngủ, ngủ",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 0
  },
  "教える": {
    "r": "おしえる",
    "m": "Dạy bảo, chỉ dạy",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 0
  },
  "いる": {
    "r": "いる",
    "m": "Có, ở (người / động vật)",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 0
  },
  "考える": {
    "r": "かんがえる",
    "m": "Suy nghĩ, cân nhắc",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 4
  },
  "与える": {
    "r": "あたえる",
    "m": "Đem lại, trao cho, gây ra",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 0
  },
  "する": {
    "r": "する",
    "m": "Làm, thực hiện",
    "t": "Động từ Nhóm 3",
    "pos": "v3",
    "p": 0
  },
  "来る": {
    "r": "くる",
    "m": "Đến, tới",
    "t": "Động từ Nhóm 3",
    "pos": "v3",
    "p": 1
  },
  "勉強する": {
    "r": "べんきょうする",
    "m": "Học tập",
    "t": "Động từ Nhóm 3",
    "pos": "v3",
    "p": 0
  },
  "研究する": {
    "r": "けんきゅうする",
    "m": "Nghiên cứu",
    "t": "Động từ Nhóm 3",
    "pos": "v3",
    "p": 0
  },
  "保護する": {
    "r": "ほごする",
    "m": "Bảo vệ, gìn giữ",
    "t": "Động từ Nhóm 3",
    "pos": "v3",
    "p": 1
  },
  "日本語": {
    "r": "にほんご",
    "m": "Tiếng Nhật",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "日本": {
    "r": "にほん",
    "m": "Nhật Bản",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "英語": {
    "r": "えいご",
    "m": "Tiếng Anh",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "学生": {
    "r": "がくせい",
    "m": "Học sinh, sinh viên",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "先生": {
    "r": "せんせい",
    "m": "Thầy/Cô giáo, bác sĩ",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "留学生": {
    "r": "りゅうがくせい",
    "m": "Du học sinh",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "会社": {
    "r": "かいしゃ",
    "m": "Công ty",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "会社員": {
    "r": "かいしゃいん",
    "m": "Nhân viên công ty",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "学校": {
    "r": "がっこう",
    "m": "Trường học",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "大学": {
    "r": "だいがく",
    "m": "Trường đại học",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "東京大学": {
    "r": "とうきょうだいがく",
    "m": "Đại học Tokyo",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 5
  },
  "病院": {
    "r": "びょういん",
    "m": "Bệnh viện",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "図書館": {
    "r": "としょかん",
    "m": "Thư viện",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "経済": {
    "r": "けいざい",
    "m": "Kinh tế",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "経済学": {
    "r": "けいざいがく",
    "m": "Kinh tế học",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 3
  },
  "情報": {
    "r": "じょうほう",
    "m": "Thông tin",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "技術": {
    "r": "ぎじゅつ",
    "m": "Kỹ thuật, công nghệ",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "情報技術": {
    "r": "じょうほうぎじゅつ",
    "m": "Công nghệ thông tin (IT)",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 4
  },
  "自然": {
    "r": "しぜん",
    "m": "Tự nhiên, thiên nhiên",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "環境": {
    "r": "かんきょう",
    "m": "Môi trường",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "自然環境": {
    "r": "しぜんかんきょう",
    "m": "Môi trường tự nhiên",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 4
  },
  "保護": {
    "r": "ほご",
    "m": "Bảo vệ, bảo hộ",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "責任": {
    "r": "せきにん",
    "m": "Trách nhiệm",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "部屋": {
    "r": "へや",
    "m": "Căn phòng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "机": {
    "r": "つくえ",
    "m": "Bàn làm việc / bàn học",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "パソコン": {
    "r": "パソコン",
    "m": "Máy vi tính cá nhân (PC)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "読み物": {
    "r": "よみもの",
    "m": "Tài liệu đọc, bài đọc hiểu",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "言葉": {
    "r": "ことば",
    "m": "Từ vựng, ngôn từ, lời nói",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "友達": {
    "r": "ともだち",
    "m": "Bạn bè",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "家族": {
    "r": "かぞく",
    "m": "Gia đình",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "今日": {
    "r": "きょう",
    "m": "Hôm nay",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "明日": {
    "r": "あした",
    "m": "Ngày mai",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "昨日": {
    "r": "きのう",
    "m": "Hôm qua",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "水": {
    "r": "みず",
    "m": "Nước lọc",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "お茶": {
    "r": "おちゃ",
    "m": "Trà, nước chè",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "ご飯": {
    "r": "ごはん",
    "m": "Cơm, bữa ăn",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "ラーメン": {
    "r": "ラーメン",
    "m": "Mì Ramen",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "こんにちは": {
    "r": "こんにちは",
    "m": "Xin chào (ban ngày)",
    "t": "Chào hỏi",
    "pos": "exp",
    "p": 0
  },
  "こんばんは": {
    "r": "こんばんは",
    "m": "Chào buổi tối",
    "t": "Chào hỏi",
    "pos": "exp",
    "p": 0
  },
  "おはよう": {
    "r": "おはよう",
    "m": "Chào buổi sáng (thân mật)",
    "t": "Chào hỏi",
    "pos": "exp",
    "p": 0
  },
  "おはようございます": {
    "r": "おはようございます",
    "m": "Chào buổi sáng (lịch sự)",
    "t": "Chào hỏi",
    "pos": "exp",
    "p": 0
  },
  "ありがとう": {
    "r": "ありがとう",
    "m": "Cảm ơn (thân mật)",
    "t": "Chào hỏi",
    "pos": "exp",
    "p": 2
  },
  "ありがとうございます": {
    "r": "ありがとうございます",
    "m": "Xin chân thành cảm ơn (lịch sự)",
    "t": "Chào hỏi",
    "pos": "exp",
    "p": 2
  },
  "すみません": {
    "r": "すみません",
    "m": "Xin lỗi / Cảm ơn / Làm phiền",
    "t": "Giao tiếp",
    "pos": "exp",
    "p": 4
  },
  "お疲れ様でした": {
    "r": "おつかれさまでした",
    "m": "Bạn đã vất vả rồi (sau giờ làm/học)",
    "t": "Giao tiếp",
    "pos": "exp",
    "p": 6
  },
  "初めまして": {
    "r": "はじめまして",
    "m": "Rất hân hạnh được gặp bạn",
    "t": "Chào hỏi",
    "pos": "exp",
    "p": 4
  },
  "よろしくお願いします": {
    "r": "よろしくおねがいします",
    "m": "Xin nhờ giúp đỡ (lịch sự)",
    "t": "Chào hỏi",
    "pos": "exp",
    "p": 0
  },
  "私": {
    "r": "わたし",
    "m": "Tôi (ngôi thứ nhất)",
    "t": "Đại từ N5",
    "pos": "pn",
    "p": 0
  },
  "僕": {
    "r": "ぼく",
    "m": "Tôi, tớ (nam giới, thân mật)",
    "t": "Đại từ N5",
    "pos": "pn",
    "p": 1
  },
  "俺": {
    "r": "おれ",
    "m": "Tao, tớ (nam giới, suồng sã)",
    "t": "Đại từ N4",
    "pos": "pn",
    "p": 0
  },
  "あなた": {
    "r": "あなた",
    "m": "Bạn, anh, chị (ngôi thứ hai)",
    "t": "Đại từ N5",
    "pos": "pn",
    "p": 2
  },
  "彼": {
    "r": "かれ",
    "m": "Anh ấy, bạn trai",
    "t": "Đại từ N4",
    "pos": "pn",
    "p": 1
  },
  "彼女": {
    "r": "かのじょ",
    "m": "Cô ấy, bạn gái",
    "t": "Đại từ N4",
    "pos": "pn",
    "p": 1
  },
  "私たち": {
    "r": "わたしたち",
    "m": "Chúng tôi, chúng ta",
    "t": "Đại từ N5",
    "pos": "pn",
    "p": 3
  },
  "彼ら": {
    "r": "かれら",
    "m": "Họ, bọn họ",
    "t": "Đại từ N4",
    "pos": "pn",
    "p": 1
  },
  "これ": {
    "r": "これ",
    "m": "Cái này (gần người nói)",
    "t": "Chỉ từ N5",
    "pos": "pn",
    "p": 0
  },
  "それ": {
    "r": "それ",
    "m": "Cái đó (gần người nghe)",
    "t": "Chỉ từ N5",
    "pos": "pn",
    "p": 0
  },
  "あれ": {
    "r": "あれ",
    "m": "Cái kia (xa cả hai)",
    "t": "Chỉ từ N5",
    "pos": "pn",
    "p": 0
  },
  "どれ": {
    "r": "どれ",
    "m": "Cái nào? (nghi vấn)",
    "t": "Nghi vấn từ N5",
    "pos": "pn",
    "p": 1
  },
  "この": {
    "r": "この",
    "m": "Này (+ danh từ)",
    "t": "Liên thể từ N5",
    "pos": "adj-pn",
    "p": 0
  },
  "その": {
    "r": "その",
    "m": "Đó (+ danh từ)",
    "t": "Liên thể từ N5",
    "pos": "adj-pn",
    "p": 0
  },
  "あの": {
    "r": "あの",
    "m": "Kia (+ danh từ)",
    "t": "Liên thể từ N5",
    "pos": "adj-pn",
    "p": 0
  },
  "どの": {
    "r": "どの",
    "m": "Nào (+ danh từ)",
    "t": "Nghi vấn từ N5",
    "pos": "adj-pn",
    "p": 1
  },
  "ここ": {
    "r": "ここ",
    "m": "Chỗ này, ở đây",
    "t": "Chỉ vị trí N5",
    "pos": "pn",
    "p": 0
  },
  "そこ": {
    "r": "そこ",
    "m": "Chỗ đó, ở đó",
    "t": "Chỉ vị trí N5",
    "pos": "pn",
    "p": 0
  },
  "あそこ": {
    "r": "あそこ",
    "m": "Chỗ kia, ở kia",
    "t": "Chỉ vị trí N5",
    "pos": "pn",
    "p": 0
  },
  "どこ": {
    "r": "どこ",
    "m": "Ở đâu? Chỗ nào?",
    "t": "Nghi vấn từ N5",
    "pos": "pn",
    "p": 1
  },
  "こちら": {
    "r": "こちら",
    "m": "Phía này, đây (lịch sự)",
    "t": "Chỉ vị trí N5",
    "pos": "pn",
    "p": 0
  },
  "そちら": {
    "r": "そちら",
    "m": "Phía đó (lịch sự)",
    "t": "Chỉ vị trí N5",
    "pos": "pn",
    "p": 0
  },
  "あちら": {
    "r": "あちら",
    "m": "Phía kia (lịch sự)",
    "t": "Chỉ vị trí N5",
    "pos": "pn",
    "p": 0
  },
  "どちら": {
    "r": "どちら",
    "m": "Phía nào? Đâu? (lịch sự)",
    "t": "Nghi vấn từ N5",
    "pos": "pn",
    "p": 1
  },
  "だれ": {
    "r": "だれ",
    "m": "Ai? Người nào?",
    "t": "Nghi vấn từ N5",
    "pos": "pn",
    "p": 1
  },
  "誰": {
    "r": "だれ",
    "m": "Ai? Người nào?",
    "t": "Nghi vấn từ N5",
    "pos": "pn",
    "p": 1
  },
  "どなた": {
    "r": "どなた",
    "m": "Vị nào? Ai? (kính ngữ)",
    "t": "Nghi vấn từ N5",
    "pos": "pn",
    "p": 1
  },
  "何": {
    "r": "なに",
    "m": "Cái gì? Gì?",
    "t": "Nghi vấn từ N5",
    "pos": "pn",
    "p": 1
  },
  "なん": {
    "r": "なん",
    "m": "Cái gì? (đứng trước d, t, n)",
    "t": "Nghi vấn từ N5",
    "pos": "pn",
    "p": 1
  },
  "いつ": {
    "r": "いつ",
    "m": "Khi nào? Bao giờ?",
    "t": "Nghi vấn từ N5",
    "pos": "adv",
    "p": 1
  },
  "どうして": {
    "r": "どうして",
    "m": "Tại sao? Vì sao?",
    "t": "Nghi vấn từ N5",
    "pos": "adv",
    "p": 1
  },
  "なぜ": {
    "r": "なぜ",
    "m": "Tại sao? Vì cớ gì?",
    "t": "Nghi vấn từ N4",
    "pos": "adv",
    "p": 1
  },
  "どう": {
    "r": "どう",
    "m": "Thế nào? Ra sao?",
    "t": "Nghi vấn từ N5",
    "pos": "adv",
    "p": 1
  },
  "いかが": {
    "r": "いかが",
    "m": "Thế nào? (lịch sự của どう)",
    "t": "Nghi vấn từ N5",
    "pos": "adv",
    "p": 0
  },
  "人": {
    "r": "ひと",
    "m": "Người, con người",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "男": {
    "r": "おとこ",
    "m": "Đàn ông, nam giới",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "女": {
    "r": "おんな",
    "m": "Phụ nữ, nữ giới",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "男の人": {
    "r": "おとこのひと",
    "m": "Người đàn ông",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 6
  },
  "女の人": {
    "r": "おんなのひと",
    "m": "Người phụ nữ",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 6
  },
  "男の子": {
    "r": "おとこのこ",
    "m": "Bé trai, cậu bé",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "女の子": {
    "r": "おんなのこ",
    "m": "Bé gái, cô bé",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "子": {
    "r": "こ",
    "m": "Đứa trẻ, con cái",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "子供": {
    "r": "こども",
    "m": "Trẻ con, con cái",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "父": {
    "r": "ちち",
    "m": "Bố (của mình)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "母": {
    "r": "はは",
    "m": "Mẹ (của mình)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "お父さん": {
    "r": "おとうさん",
    "m": "Bố (người khác hoặc gọi thân mật)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "お母さん": {
    "r": "おかあさん",
    "m": "Mẹ (người khác hoặc gọi thân mật)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "兄": {
    "r": "あに",
    "m": "Anh trai (của mình)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "お兄さん": {
    "r": "おにいさん",
    "m": "Anh trai (người khác)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "姉": {
    "r": "あね",
    "m": "Chị gái (của mình)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "お姉さん": {
    "r": "おねえさん",
    "m": "Chị gái (người khác)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "弟": {
    "r": "おとうと",
    "m": "Em trai",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 4
  },
  "妹": {
    "r": "いもうと",
    "m": "Em gái",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 4
  },
  "兄弟": {
    "r": "きょうだい",
    "m": "Anh em, huynh đệ",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "夫": {
    "r": "おっと",
    "m": "Chồng (của mình)",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "妻": {
    "r": "つま",
    "m": "Vợ (của mình)",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "主人": {
    "r": "しゅじん",
    "m": "Chồng (mình), chủ nhân",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "家内": {
    "r": "かない",
    "m": "Vợ (mình)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "時間": {
    "r": "じかん",
    "m": "Thời gian, tiếng đồng hồ",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "今": {
    "r": "いま",
    "m": "Bây giờ, hiện tại",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "朝": {
    "r": "あさ",
    "m": "Buổi sáng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "昼": {
    "r": "ひる",
    "m": "Buổi trưa, ban ngày",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "晩": {
    "r": "ばん",
    "m": "Buổi tối",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "夜": {
    "r": "よる",
    "m": "Ban đêm, tối",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "夕方": {
    "r": "ゆうがた",
    "m": "Hoàng hôn, chiều tối",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "午前": {
    "r": "ごぜん",
    "m": "Buổi sáng (AM)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "午後": {
    "r": "ごご",
    "m": "Buổi chiều (PM)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "毎日": {
    "r": "まいにち",
    "m": "Mỗi ngày, hàng ngày",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "毎朝": {
    "r": "まいあさ",
    "m": "Mỗi sáng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "毎晩": {
    "r": "まいばん",
    "m": "Mỗi tối",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "毎週": {
    "r": "まいしゅう",
    "m": "Mỗi tuần",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "毎月": {
    "r": "まいつき",
    "m": "Mỗi tháng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "毎年": {
    "r": "まいとし",
    "m": "Mỗi năm, hàng năm",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "今週": {
    "r": "こんしゅう",
    "m": "Tuần này",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "先週": {
    "r": "せんしゅう",
    "m": "Tuần trước",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "来週": {
    "r": "らいしゅう",
    "m": "Tuần sau, tuần tới",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "今月": {
    "r": "こんげつ",
    "m": "Tháng này",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "先月": {
    "r": "せんげつ",
    "m": "Tháng trước",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "来月": {
    "r": "らいげつ",
    "m": "Tháng sau",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "今年": {
    "r": "ことし",
    "m": "Năm nay",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "去年": {
    "r": "きょねん",
    "m": "Năm ngoái",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "来年": {
    "r": "らいねん",
    "m": "Năm sau, năm tới",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "おととい": {
    "r": "おととい",
    "m": "Hôm kia",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "あさって": {
    "r": "あさって",
    "m": "Ngày kia",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "月曜日": {
    "r": "げつようび",
    "m": "Thứ hai",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "火曜日": {
    "r": "かようび",
    "m": "Thứ ba",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "水曜日": {
    "r": "すいようび",
    "m": "Thứ tư",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "木曜日": {
    "r": "もくようび",
    "m": "Thứ năm",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "金曜日": {
    "r": "きんようび",
    "m": "Thứ sáu",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "土曜日": {
    "r": "どようび",
    "m": "Thứ bảy",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "日曜日": {
    "r": "にちようび",
    "m": "Chủ nhật",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "家": {
    "r": "いえ",
    "m": "Ngôi nhà",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "うち": {
    "r": "うち",
    "m": "Nhà (của mình), tổ ấm",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "駅": {
    "r": "えき",
    "m": "Nhà ga",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "店": {
    "r": "みせ",
    "m": "Cửa hàng, tiệm quán",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "道": {
    "r": "みち",
    "m": "Con đường, lối đi",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "空港": {
    "r": "くうこう",
    "m": "Sân bay",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "電車": {
    "r": "でんしゃ",
    "m": "Tàu điện",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "地下鉄": {
    "r": "ちかてつ",
    "m": "Tàu điện ngầm",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "新幹線": {
    "r": "しんかんせん",
    "m": "Tàu cao tốc Shinkansen",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "車": {
    "r": "くるま",
    "m": "Xe hơi, ô tô",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "自動車": {
    "r": "じどうしゃ",
    "m": "Xe ô tô",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "自転車": {
    "r": "じてんしゃ",
    "m": "Xe đạp",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "バス": {
    "r": "バス",
    "m": "Xe buýt",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "タクシー": {
    "r": "タクシー",
    "m": "Xe taxi",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "飛行機": {
    "r": "ひこうき",
    "m": "Máy bay",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "船": {
    "r": "ふね",
    "m": "Thuyền, tàu thủy",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "国": {
    "r": "くに",
    "m": "Đất nước, quốc gia",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "町": {
    "r": "まち",
    "m": "Thị trấn, thành phố",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "村": {
    "r": "むら",
    "m": "Làng mạc, thôn xóm",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "銀行": {
    "r": "ぎんこう",
    "m": "Ngân hàng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "郵便局": {
    "r": "ゆうびんきょく",
    "m": "Bưu điện",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "交番": {
    "r": "こうばん",
    "m": "Đồn cảnh sát nhỏ",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "公園": {
    "r": "こうえん",
    "m": "Công viên",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "教室": {
    "r": "きょうしつ",
    "m": "Phòng học, lớp học",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "食堂": {
    "r": "しょくどう",
    "m": "Nhà ăn, căng tin",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "事務所": {
    "r": "じむしょ",
    "m": "Văn phòng làm việc",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "会議室": {
    "r": "かいぎしつ",
    "m": "Phòng họp",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "受付": {
    "r": "うけつけ",
    "m": "Quầy tiếp tân, lễ tân",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "トイレ": {
    "r": "トイレ",
    "m": "Nhà vệ sinh",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "お手洗い": {
    "r": "おてあらい",
    "m": "Nhà vệ sinh (lịch sự)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "階段": {
    "r": "かいだん",
    "m": "Cầu thang bộ",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "エレベーター": {
    "r": "エレベーター",
    "m": "Thang máy",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "食べ物": {
    "r": "たべもの",
    "m": "Đồ ăn, thức ăn",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "飲み物": {
    "r": "のみもの",
    "m": "Đồ uống, thức uống",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "肉": {
    "r": "にく",
    "m": "Thịt",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "魚": {
    "r": "さかな",
    "m": "Cá",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "野菜": {
    "r": "やさい",
    "m": "Rau củ",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "果物": {
    "r": "くだもの",
    "m": "Trái cây, hoa quả",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "パン": {
    "r": "パン",
    "m": "Bánh mì",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "卵": {
    "r": "たまご",
    "m": "Trứng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "牛乳": {
    "r": "ぎゅうにゅう",
    "m": "Sữa bò tươi",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "ミルク": {
    "r": "ミルク",
    "m": "Sữa",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "コーヒー": {
    "r": "コーヒー",
    "m": "Cà phê",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "紅茶": {
    "r": "こうちゃ",
    "m": "Trà đen, hồng trà",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "ビール": {
    "r": "ビール",
    "m": "Bia",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "お酒": {
    "r": "おさけ",
    "m": "Rượu, đồ uống có cồn",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "料理": {
    "r": "りょうり",
    "m": "Món ăn, nấu ăn",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "朝ご飯": {
    "r": "あさごはん",
    "m": "Bữa sáng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "昼ご飯": {
    "r": "ひるごはん",
    "m": "Bữa trưa",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "晩ご飯": {
    "r": "ばんごはん",
    "m": "Bữa tối",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "本": {
    "r": "ほん",
    "m": "Sách",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "辞書": {
    "r": "じしょ",
    "m": "Từ điển",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "雑誌": {
    "r": "ざっし",
    "m": "Tạp chí",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "新聞": {
    "r": "しんぶん",
    "m": "Báo chí",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "ノート": {
    "r": "ノート",
    "m": "Vở ghi, sổ tay",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "手帳": {
    "r": "てちょう",
    "m": "Sổ tay cá nhân",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "名刺": {
    "r": "めいし",
    "m": "Danh thiếp",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "カード": {
    "r": "カード",
    "m": "Thẻ, card",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "鉛筆": {
    "r": "えんぴつ",
    "m": "Bút chì",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "ボールペン": {
    "r": "ボールペン",
    "m": "Bút bi",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "鍵": {
    "r": "かぎ",
    "m": "Chìa khóa",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "時計": {
    "r": "とけい",
    "m": "Đồng hồ",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "傘": {
    "r": "かさ",
    "m": "Cái ô, cái dù",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "鞄": {
    "r": "かばん",
    "m": "Cặp sách, túi xách",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "テレビ": {
    "r": "テレビ",
    "m": "Tivi, truyền hình",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "ラジオ": {
    "r": "ラジオ",
    "m": "Đài radio",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "カメラ": {
    "r": "カメラ",
    "m": "Máy ảnh",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "電話": {
    "r": "でんわ",
    "m": "Điện thoại, cuộc gọi",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "携帯": {
    "r": "けいたい",
    "m": "Điện thoại di động",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "スマホ": {
    "r": "スマホ",
    "m": "Điện thoại thông minh (smartphone)",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "手紙": {
    "r": "てがみ",
    "m": "Bức thư",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "切手": {
    "r": "きって",
    "m": "Tem thư",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "荷物": {
    "r": "にもつ",
    "m": "Hành lý, đồ đạc",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "お金": {
    "r": "おかね",
    "m": "Tiền bạc",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "財布": {
    "r": "さいふ",
    "m": "Ví tiền, bóp tiền",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "服": {
    "r": "ふく",
    "m": "Quần áo",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "靴": {
    "r": "くつ",
    "m": "Giày dép",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "眼鏡": {
    "r": "めがね",
    "m": "Kính mắt",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "体": {
    "r": "からだ",
    "m": "Cơ thể, thân thể",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "頭": {
    "r": "あたま",
    "m": "Đầu óc, cái đầu",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "目": {
    "r": "め",
    "m": "Mắt",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "耳": {
    "r": "みみ",
    "m": "Tai",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "口": {
    "r": "くち",
    "m": "Miệng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "歯": {
    "r": "は",
    "m": "Răng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "手": {
    "r": "て",
    "m": "Tay, bàn tay",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "足": {
    "r": "あし",
    "m": "Chân, bàn chân",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "お腹": {
    "r": "おなか",
    "m": "Bụng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "声": {
    "r": "こえ",
    "m": "Giọng nói, tiếng kêu",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "病気": {
    "r": "びょうき",
    "m": "Bệnh tật, ốm đau",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "風邪": {
    "r": "かぜ",
    "m": "Cảm cúm",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "熱": {
    "r": "ねつ",
    "m": "Sốt, nhiệt độ",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "薬": {
    "r": "くすり",
    "m": "Thuốc men",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "医者": {
    "r": "いしゃ",
    "m": "Bác sĩ",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "天気": {
    "r": "てんき",
    "m": "Thời tiết",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "雨": {
    "r": "あめ",
    "m": "Mưa",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "雪": {
    "r": "ゆき",
    "m": "Tuyết",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "風": {
    "r": "かぜ",
    "m": "Gió",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "空": {
    "r": "そら",
    "m": "Bầu trời",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "山": {
    "r": "やま",
    "m": "Núi",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "川": {
    "r": "かわ",
    "m": "Sông ngòi",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "海": {
    "r": "うみ",
    "m": "Biển, đại dương",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "花": {
    "r": "はな",
    "m": "Bông hoa",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "木": {
    "r": "き",
    "m": "Cây cối, gỗ",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "犬": {
    "r": "いぬ",
    "m": "Con chó",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "猫": {
    "r": "ねこ",
    "m": "Con mèo",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "終わる": {
    "r": "おわる",
    "m": "Kết thúc, chấm dứt",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "始まる": {
    "r": "はじまる",
    "m": "Bắt đầu, mở đầu",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "売る": {
    "r": "うる",
    "m": "Bán",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "撮る": {
    "r": "とる",
    "m": "Chụp (ảnh), quay (phim)",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 1
  },
  "切る": {
    "r": "きる",
    "m": "Cắt, thái",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 1
  },
  "送る": {
    "r": "おくる",
    "m": "Gửi (hàng, thư), tiễn",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "あげる": {
    "r": "あげる",
    "m": "Cho, tặng (người khác)",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 0
  },
  "もらう": {
    "r": "もらう",
    "m": "Nhận được (từ ai đó)",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "貸す": {
    "r": "かす",
    "m": "Cho vay, cho mượn",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "借りる": {
    "r": "かりる",
    "m": "Vay, mượn",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 0
  },
  "習う": {
    "r": "ならう",
    "m": "Học tập (từ thầy cô/người khác)",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 2
  },
  "かける": {
    "r": "かける",
    "m": "Gọi (điện thoại), đeo (kính), treo",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 2
  },
  "遊ぶ": {
    "r": "あそぶ",
    "m": "Chơi, vui chơi",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "泳ぐ": {
    "r": "およぐ",
    "m": "Bơi lội",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 2
  },
  "迎える": {
    "r": "むかえる",
    "m": "Đón rước, nghênh đón",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 0
  },
  "疲れる": {
    "r": "つかれる",
    "m": "Mệt mỏi",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 3
  },
  "出す": {
    "r": "だす",
    "m": "Nộp (bài), gửi, lấy ra",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 1
  },
  "入る": {
    "r": "はいる",
    "m": "Đi vào, bước vào",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 1
  },
  "出る": {
    "r": "でる",
    "m": "Rời khỏi, xuất hiện",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 1
  },
  "乗る": {
    "r": "のる",
    "m": "Lên xe, cưỡi, đi tàu",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "降りる": {
    "r": "おりる",
    "m": "Xuống xe, xuống tàu",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 2
  },
  "乗り換える": {
    "r": "のりかえる",
    "m": "Đổi tàu, chuyển xe",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 4
  },
  "浴びる": {
    "r": "あびる",
    "m": "Tắm (vòi sen)",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 0
  },
  "洗う": {
    "r": "あらう",
    "m": "Rửa, giặt giũ",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "弾く": {
    "r": "ひく",
    "m": "Chơi (đàn piano, guitar)",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "歌う": {
    "r": "うたう",
    "m": "Hát",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "集める": {
    "r": "あつめる",
    "m": "Thu thập, sưu tầm",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 3
  },
  "捨てる": {
    "r": "すてる",
    "m": "Vứt bỏ, từ bỏ",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 0
  },
  "変える": {
    "r": "かえる",
    "m": "Thay đổi, đổi mới",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 0
  },
  "運転する": {
    "r": "うんてんする",
    "m": "Lái xe, vận hành máy",
    "t": "Động từ Nhóm 3",
    "pos": "v3",
    "p": 0
  },
  "予約する": {
    "r": "よやくする",
    "m": "Đặt trước, hẹn trước",
    "t": "Động từ Nhóm 3",
    "pos": "v3",
    "p": 0
  },
  "見学する": {
    "r": "けんがくする",
    "m": "Tham quan học tập",
    "t": "Động từ Nhóm 3",
    "pos": "v3",
    "p": 0
  },
  "登る": {
    "r": "のぼる",
    "m": "Leo (núi), trèo",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "泊まる": {
    "r": "とまる",
    "m": "Trọ lại, ở lại khách sạn",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "掃除する": {
    "r": "そうじする",
    "m": "Dọn dẹp, quét tước",
    "t": "Động từ Nhóm 3",
    "pos": "v3",
    "p": 0
  },
  "洗濯する": {
    "r": "せんたくする",
    "m": "Giặt giũ quần áo",
    "t": "Động từ Nhóm 3",
    "pos": "v3",
    "p": 0
  },
  "練習する": {
    "r": "れんしゅうする",
    "m": "Luyện tập",
    "t": "Động từ Nhóm 3",
    "pos": "v3",
    "p": 0
  },
  "なる": {
    "r": "なる",
    "m": "Trở thành, biến thành",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 1
  },
  "要る": {
    "r": "いる",
    "m": "Cần thiết",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "調べる": {
    "r": "しらべる",
    "m": "Tra cứu, điều tra",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 3
  },
  "直す": {
    "r": "なおす",
    "m": "Sửa chữa, đính chính",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 2
  },
  "修理する": {
    "r": "しゅうりする",
    "m": "Sửa chữa thiết bị",
    "t": "Động từ Nhóm 3",
    "pos": "v3",
    "p": 1
  },
  "着る": {
    "r": "きる",
    "m": "Mặc (áo)",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 0
  },
  "履く": {
    "r": "はく",
    "m": "Mặc (quần), xỏ (giày/tất)",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "かぶる": {
    "r": "かぶる",
    "m": "Đội (mũ)",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 2
  },
  "脱ぐ": {
    "r": "ぬぐ",
    "m": "Cởi (quần áo, giày)",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 1
  },
  "生まれる": {
    "r": "うまれる",
    "m": "Sinh ra, ra đời",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 0
  },
  "回す": {
    "r": "まわす",
    "m": "Vặn, xoay quanh",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "引く": {
    "r": "ひく",
    "m": "Kéo, rút",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "押す": {
    "r": "おす",
    "m": "Nhấn nút, đẩy",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "動く": {
    "r": "うごく",
    "m": "Chuyển động, hoạt động",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 2
  },
  "止まる": {
    "r": "とまる",
    "m": "Dừng lại, đỗ lại",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "渡る": {
    "r": "わたる",
    "m": "Băng qua (đường, cầu)",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "曲がる": {
    "r": "まがる",
    "m": "Rẽ, quẹo",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "置く": {
    "r": "おく",
    "m": "Đặt, để",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "住む": {
    "r": "すむ",
    "m": "Sinh sống, cư ngụ",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 1
  },
  "覚える": {
    "r": "おぼえる",
    "m": "Ghi nhớ, nhớ",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 3
  },
  "忘れる": {
    "r": "わすれる",
    "m": "Quên, bỏ quên",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 0
  },
  "なくす": {
    "r": "なくす",
    "m": "Làm mất, đánh rơi",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 0
  },
  "払う": {
    "r": "はらう",
    "m": "Thanh toán, trả tiền",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 2
  },
  "返す": {
    "r": "かえす",
    "m": "Trả lại (đồ đã mượn)",
    "t": "Động từ Nhóm 1",
    "pos": "v1",
    "p": 1
  },
  "出かける": {
    "r": "でかける",
    "m": "Đi ra ngoài",
    "t": "Động từ Nhóm 2",
    "pos": "v2",
    "p": 0
  },
  "残業する": {
    "r": "ざんぎょうする",
    "m": "Làm thêm giờ (OT)",
    "t": "Động từ Nhóm 3",
    "pos": "v3",
    "p": 0
  },
  "出張する": {
    "r": "しゅっちょうする",
    "m": "Đi công tác",
    "t": "Động từ Nhóm 3",
    "pos": "v3",
    "p": 0
  },
  "心配する": {
    "r": "しんぱいする",
    "m": "Lo lắng",
    "t": "Động từ Nhóm 3",
    "pos": "v3",
    "p": 0
  },
  "熱い": {
    "r": "あつい",
    "m": "Nóng (nhiệt độ đồ vật, thức uống)",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "冷たい": {
    "r": "つめたい",
    "m": "Lạnh (đồ uống, cảm xúc)",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 0
  },
  "優しい": {
    "r": "やさしい",
    "m": "Hiền lành, dịu dàng, tốt bụng",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 0
  },
  "遠い": {
    "r": "とおい",
    "m": "Xa xôi",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 0
  },
  "近い": {
    "r": "ちかい",
    "m": "Gần gũi",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "速い": {
    "r": "はやい",
    "m": "Nhanh chóng (tốc độ)",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "暖かい": {
    "r": "あたたかい",
    "m": "Ấm áp (thời tiết)",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 4
  },
  "涼しい": {
    "r": "すずしい",
    "m": "Mát mẻ",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 3
  },
  "甘い": {
    "r": "あまい",
    "m": "Ngọt ngào, chiều chuộng",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 0
  },
  "辛い": {
    "r": "からい",
    "m": "Cay nồng",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "苦い": {
    "r": "にがい",
    "m": "Đắng ngắt",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "塩辛い": {
    "r": "しおからい",
    "m": "Mặn chát",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 4
  },
  "すっぱい": {
    "r": "すっぱい",
    "m": "Chua",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 3
  },
  "重い": {
    "r": "おもい",
    "m": "Nặng nề, quan trọng",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 0
  },
  "軽い": {
    "r": "かるい",
    "m": "Nhẹ nhàng",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 0
  },
  "広い": {
    "r": "ひろい",
    "m": "Rộng rãi",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "狭い": {
    "r": "せまい",
    "m": "Chật hẹp",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "明るい": {
    "r": "あかるい",
    "m": "Sáng sủa, tươi vui",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 0
  },
  "暗い": {
    "r": "くらい",
    "m": "Tối tăm, u ám",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 0
  },
  "寂しい": {
    "r": "さびしい",
    "m": "Buồn bã, cô đơn",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 3
  },
  "つまらない": {
    "r": "つまらない",
    "m": "Nhàm chán, vô vị",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 3
  },
  "欲しい": {
    "r": "ほしい",
    "m": "Muốn có (vật gì đó)",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "危ない": {
    "r": "あぶない",
    "m": "Nguy hiểm, coi chừng",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 0
  },
  "痛い": {
    "r": "いたい",
    "m": "Đau đớn",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "眠い": {
    "r": "ねむい",
    "m": "Buồn ngủ",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "強い": {
    "r": "つよい",
    "m": "Mạnh mẽ, kiên cường",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "弱い": {
    "r": "よわい",
    "m": "Yếu ớt, non kém",
    "t": "Tính từ -i",
    "pos": "adj-i",
    "p": 2
  },
  "上手": {
    "r": "じょうず",
    "m": "Giỏi giang, khéo léo",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 3
  },
  "下手": {
    "r": "へた",
    "m": "Kém cỏi, vụng về",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 2
  },
  "不便": {
    "r": "ふべん",
    "m": "Bất tiện",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 1
  },
  "元気": {
    "r": "げんき",
    "m": "Khỏe mạnh, tràn đầy năng lượng",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 1
  },
  "暇": {
    "r": "ひま",
    "m": "Rảnh rỗi",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 0
  },
  "賑やか": {
    "r": "にぎやか",
    "m": "Náo nhiệt, đông vui",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 2
  },
  "複雑": {
    "r": "ふくざつ",
    "m": "Phức tạp, rắc rối",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 0
  },
  "大切": {
    "r": "たいせつ",
    "m": "Quan trọng, quý giá",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 0
  },
  "危険": {
    "r": "きけん",
    "m": "Nguy hiểm",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 0
  },
  "安全": {
    "r": "あんぜん",
    "m": "An toàn",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 0
  },
  "必要": {
    "r": "ひつよう",
    "m": "Cần thiết",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 0
  },
  "無理": {
    "r": "むり",
    "m": "Vô lý, quá sức, không thể",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 1
  },
  "熱心": {
    "r": "ねっしん",
    "m": "Nhiệt tình, hăng hái",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 1
  },
  "真面目": {
    "r": "まじめ",
    "m": "Chăm chỉ, nghiêm túc",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 0
  },
  "特別": {
    "r": "とくべつ",
    "m": "Đặc biệt",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 0
  },
  "普通": {
    "r": "ふつう",
    "m": "Bình thường, thông thường",
    "t": "Tính từ -na",
    "pos": "adj-na",
    "p": 0
  },
  "いつも": {
    "r": "いつも",
    "m": "Luôn luôn, lúc nào cũng",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 1
  },
  "ときどき": {
    "r": "ときどき",
    "m": "Thỉnh thoảng, đôi khi",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 0
  },
  "時々": {
    "r": "ときどき",
    "m": "Thỉnh thoảng, đôi khi",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 0
  },
  "よく": {
    "r": "よく",
    "m": "Thường xuyên, giỏi, rõ",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 1
  },
  "だいたい": {
    "r": "だいたい",
    "m": "Đại khái, khoảng chừng",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 0
  },
  "たくさん": {
    "r": "たくさん",
    "m": "Nhiều, phong phú",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 3
  },
  "少し": {
    "r": "すこし",
    "m": "Một chút, một ít",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 2
  },
  "ちょっと": {
    "r": "ちょっと",
    "m": "Một chút, một lát (văn nói)",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 1
  },
  "全然": {
    "r": "ぜんぜん",
    "m": "Hoàn toàn không (+ phủ định)",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 0
  },
  "あまり": {
    "r": "あまり",
    "m": "Không lắm (+ phủ định)",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 0
  },
  "とても": {
    "r": "とても",
    "m": "Rất, vô cùng",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 0
  },
  "大変": {
    "r": "たいへん",
    "m": "Rất / Vất vả, khó khăn",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 0
  },
  "ずっと": {
    "r": "ずっと",
    "m": "Hơn hẳn, suốt từ đó",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 0
  },
  "もう": {
    "r": "もう",
    "m": "Đã... rồi / Thêm nữa",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 1
  },
  "まだ": {
    "r": "まだ",
    "m": "Vẫn, vẫn chưa (+ phủ định)",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 1
  },
  "これから": {
    "r": "これから",
    "m": "Từ bây giờ, sau đây",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 4
  },
  "すぐに": {
    "r": "すぐに",
    "m": "Ngay lập tức",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 1
  },
  "ゆっくり": {
    "r": "ゆっくり",
    "m": "Từ từ, thong thả",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 3
  },
  "また": {
    "r": "また",
    "m": "Lại, hẹn gặp lại",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 0
  },
  "初めて": {
    "r": "はじめて",
    "m": "Lần đầu tiên",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 2
  },
  "多分": {
    "r": "たぶん",
    "m": "Có lẽ, chắc là",
    "t": "Phó từ N4",
    "pos": "adv",
    "p": 1
  },
  "ぜひ": {
    "r": "ぜひ",
    "m": "Nhất định, rất muốn",
    "t": "Phó từ N4",
    "pos": "adv",
    "p": 1
  },
  "必ず": {
    "r": "かならず",
    "m": "Chắc chắn, nhất định",
    "t": "Phó từ N4",
    "pos": "adv",
    "p": 0
  },
  "絶対": {
    "r": "ぜったい",
    "m": "Tuyệt đối",
    "t": "Phó từ N4",
    "pos": "adv",
    "p": 0
  },
  "そして": {
    "r": "そして",
    "m": "Và, rồi thì",
    "t": "Liên từ N5",
    "pos": "conj",
    "p": 0
  },
  "それから": {
    "r": "それから",
    "m": "Sau đó, tiếp theo",
    "t": "Liên từ N5",
    "pos": "conj",
    "p": 0
  },
  "しかし": {
    "r": "しかし",
    "m": "Tuy nhiên, nhưng mà",
    "t": "Liên từ N5",
    "pos": "conj",
    "p": 1
  },
  "でも": {
    "r": "でも",
    "m": "Nhưng, tuy thế (văn nói)",
    "t": "Liên từ N5",
    "pos": "conj",
    "p": 1
  },
  "だから": {
    "r": "だから",
    "m": "Vì vậy, cho nên",
    "t": "Liên từ N5",
    "pos": "conj",
    "p": 1
  }
};

/**
 * Quy tắc bóc tách ngữ pháp chia đuôi đa tầng (Multi-layer De-inflection & Grammar Details)
 */
const GRAMMAR_DEINFLECT_PATTERNS = [
  {
    "suffix": "ませんでした",
    "replace": [
      "る",
      "く",
      "ぐ",
      "す",
      "つ",
      "ぬ",
      "ぶ",
      "む",
      "う",
      "する"
    ],
    "tag": "Thể Lịch sự Phủ định Quá khứ (〜ませんでした)",
    "form": "Quá khứ Phủ định Lịch sự"
  },
  {
    "suffix": "ました",
    "replace": [
      "る",
      "く",
      "ぐ",
      "す",
      "つ",
      "ぬ",
      "ぶ",
      "む",
      "う",
      "する"
    ],
    "tag": "Thể Lịch sự Quá khứ (〜ました)",
    "form": "Quá khứ Lịch sự"
  },
  {
    "suffix": "ません",
    "replace": [
      "る",
      "く",
      "ぐ",
      "す",
      "つ",
      "ぬ",
      "ぶ",
      "む",
      "う",
      "する"
    ],
    "tag": "Thể Lịch sự Phủ định (〜ません)",
    "form": "Phủ định Lịch sự"
  },
  {
    "suffix": "ます",
    "replace": [
      "る",
      "く",
      "ぐ",
      "す",
      "つ",
      "ぬ",
      "ぶ",
      "む",
      "う",
      "する"
    ],
    "tag": "Thể Lịch sự (〜ます)",
    "form": "Khẳng định Lịch sự"
  },
  {
    "suffix": "でした",
    "replace": [
      "だ",
      "です",
      ""
    ],
    "tag": "Quá khứ Lịch sự (〜でした)",
    "form": "Quá khứ Lịch sự"
  },
  {
    "suffix": "です",
    "replace": [
      "だ",
      ""
    ],
    "tag": "Lịch sự (〜です)",
    "form": "Khẳng định Lịch sự"
  },
  {
    "suffix": "させられた",
    "replace": [
      "る",
      "する"
    ],
    "tag": "Thể Sai khiến Bị động Quá khứ [Bị bắt làm]",
    "form": "Sai khiến + Bị động + Quá khứ"
  },
  {
    "suffix": "させられる",
    "replace": [
      "る",
      "する"
    ],
    "tag": "Thể Sai khiến Bị động [Bị bắt làm]",
    "form": "Sai khiến + Bị động"
  },
  {
    "suffix": "させる",
    "replace": [
      "る",
      "する"
    ],
    "tag": "Thể Sai khiến [Bắt / Cho phép làm]",
    "form": "Sai khiến"
  },
  {
    "suffix": "させた",
    "replace": [
      "る",
      "する"
    ],
    "tag": "Thể Sai khiến Quá khứ",
    "form": "Sai khiến Quá khứ"
  },
  {
    "suffix": "られた",
    "replace": [
      "る"
    ],
    "tag": "Thể Bị động / Khả năng Quá khứ [Được / Bị làm]",
    "form": "Bị động Quá khứ"
  },
  {
    "suffix": "られる",
    "replace": [
      "る"
    ],
    "tag": "Thể Bị động / Khả năng [Được / Bị / Có thể]",
    "form": "Bị động / Khả năng"
  },
  {
    "suffix": "れない",
    "replace": [
      "る"
    ],
    "tag": "Thể Phủ định Khả năng [Không thể làm]",
    "form": "Phủ định Khả năng"
  },
  {
    "suffix": "たくなかった",
    "replace": [
      "る",
      "く",
      "ぐ",
      "す",
      "つ",
      "ぬ",
      "ぶ",
      "む",
      "う",
      "する"
    ],
    "tag": "Thể Muốn Phủ định Quá khứ [Đã không muốn]",
    "form": "Muốn + Phủ định + Quá khứ"
  },
  {
    "suffix": "たくない",
    "replace": [
      "る",
      "く",
      "ぐ",
      "す",
      "つ",
      "ぬ",
      "ぶ",
      "む",
      "う",
      "する"
    ],
    "tag": "Thể Muốn Phủ định [Không muốn làm]",
    "form": "Muốn + Phủ định"
  },
  {
    "suffix": "たかった",
    "replace": [
      "る",
      "く",
      "ぐ",
      "す",
      "つ",
      "ぬ",
      "ぶ",
      "む",
      "う",
      "する"
    ],
    "tag": "Thể Muốn Quá khứ [Đã muốn làm]",
    "form": "Muốn Quá khứ"
  },
  {
    "suffix": "たい",
    "replace": [
      "る",
      "く",
      "ぐ",
      "す",
      "つ",
      "ぬ",
      "ぶ",
      "む",
      "う",
      "する"
    ],
    "tag": "Thể Mong muốn (〜たい) [Muốn làm]",
    "form": "Mong muốn"
  },
  {
    "suffix": "なかった",
    "replace": [
      "ない",
      "る",
      "く",
      "ぐ",
      "す",
      "つ",
      "ぬ",
      "ぶ",
      "む",
      "う",
      "い"
    ],
    "tag": "Thể Phủ định Quá khứ (〜なかった) [Đã không]",
    "form": "Phủ định Quá khứ"
  },
  {
    "suffix": "ない",
    "replace": [
      "る",
      "く",
      "ぐ",
      "す",
      "つ",
      "ぬ",
      "ぶ",
      "む",
      "う"
    ],
    "tag": "Thể Phủ định (〜ない) [Không làm]",
    "form": "Phủ định"
  },
  {
    "suffix": "ずに",
    "replace": [
      "る",
      "く",
      "ぐ",
      "す",
      "つ",
      "ぬ",
      "ぶ",
      "む",
      "う",
      "する"
    ],
    "tag": "Thể Phủ định (〜ずに) [Không làm gì mà...]",
    "form": "Phủ định 〜ずに"
  },
  {
    "suffix": "ず",
    "replace": [
      "る",
      "く",
      "ぐ",
      "す",
      "つ",
      "ぬ",
      "ぶ",
      "む",
      "う",
      "する"
    ],
    "tag": "Thể Phủ định văn viết (〜ず)",
    "form": "Phủ định 〜ず"
  },
  {
    "suffix": "ています",
    "replace": [
      "て",
      "る",
      "く",
      "つ",
      "う"
    ],
    "tag": "Thể Đang diễn ra Lịch sự (〜ています)",
    "form": "Tiếp diễn Lịch sự"
  },
  {
    "suffix": "ていた",
    "replace": [
      "て",
      "る",
      "く",
      "つ",
      "う"
    ],
    "tag": "Thể Đã đang diễn ra (〜ていた)",
    "form": "Tiếp diễn Quá khứ"
  },
  {
    "suffix": "ている",
    "replace": [
      "て",
      "る",
      "く",
      "つ",
      "う"
    ],
    "tag": "Thể Đang diễn ra (〜ている)",
    "form": "Tiếp diễn"
  },
  {
    "suffix": "てる",
    "replace": [
      "て",
      "る",
      "く",
      "つ",
      "う"
    ],
    "tag": "Thể Tiếp diễn văn nói (〜てる)",
    "form": "Tiếp diễn văn nói"
  },
  {
    "suffix": "でいる",
    "replace": [
      "で",
      "む",
      "ぶ",
      "ぬ"
    ],
    "tag": "Thể Đang diễn ra (〜でいる)",
    "form": "Tiếp diễn"
  },
  {
    "suffix": "でる",
    "replace": [
      "で",
      "む",
      "ぶ",
      "ぬ"
    ],
    "tag": "Thể Tiếp diễn văn nói (〜でる)",
    "form": "Tiếp diễn văn nói"
  },
  {
    "suffix": "て",
    "replace": [
      "る",
      "く",
      "つ",
      "う"
    ],
    "tag": "Thể Nối / Mệnh lệnh nhẹ (〜て)",
    "form": "Thể て"
  },
  {
    "suffix": "た",
    "replace": [
      "る",
      "く",
      "つ",
      "う"
    ],
    "tag": "Thể Quá khứ / Đã xong (〜た)",
    "form": "Quá khứ"
  },
  {
    "suffix": "んで",
    "replace": [
      "む",
      "ぶ",
      "ぬ"
    ],
    "tag": "Thể Nối (〜んで)",
    "form": "Thể て"
  },
  {
    "suffix": "んだ",
    "replace": [
      "む",
      "ぶ",
      "ぬ"
    ],
    "tag": "Thể Quá khứ (〜んだ)",
    "form": "Quá khứ"
  },
  {
    "suffix": "いて",
    "replace": [
      "く"
    ],
    "tag": "Thể Nối (〜いて)",
    "form": "Thể て"
  },
  {
    "suffix": "いた",
    "replace": [
      "く"
    ],
    "tag": "Thể Quá khứ (〜いた)",
    "form": "Quá khứ"
  },
  {
    "suffix": "いで",
    "replace": [
      "ぐ"
    ],
    "tag": "Thể Nối (〜いで)",
    "form": "Thể て"
  },
  {
    "suffix": "いだ",
    "replace": [
      "ぐ"
    ],
    "tag": "Thể Quá khứ (〜いだ)",
    "form": "Quá khứ"
  },
  {
    "suffix": "して",
    "replace": [
      "す",
      "する"
    ],
    "tag": "Thể Nối (〜して)",
    "form": "Thể て"
  },
  {
    "suffix": "した",
    "replace": [
      "す",
      "する"
    ],
    "tag": "Thể Quá khứ (〜した)",
    "form": "Quá khứ"
  },
  {
    "suffix": "って",
    "replace": [
      "る",
      "つ",
      "う",
      "く"
    ],
    "tag": "Thể Nối (〜って)",
    "form": "Thể て"
  },
  {
    "suffix": "った",
    "replace": [
      "る",
      "つ",
      "う",
      "く"
    ],
    "tag": "Thể Quá khứ (〜った)",
    "form": "Quá khứ"
  },
  {
    "suffix": "ったら",
    "replace": [
      "る",
      "つ",
      "う",
      "く"
    ],
    "tag": "Thể Điều kiện (〜たら) [Nếu / Sau khi]",
    "form": "Điều kiện 〜たら"
  },
  {
    "suffix": "んだら",
    "replace": [
      "む",
      "ぶ",
      "ぬ"
    ],
    "tag": "Thể Điều kiện (〜んだら) [Nếu / Sau khi]",
    "form": "Điều kiện 〜たら"
  },
  {
    "suffix": "いたら",
    "replace": [
      "く"
    ],
    "tag": "Thể Điều kiện (〜いたら) [Nếu / Sau khi]",
    "form": "Điều kiện 〜たら"
  },
  {
    "suffix": "いだら",
    "replace": [
      "ぐ"
    ],
    "tag": "Thể Điều kiện (〜いだら) [Nếu / Sau khi]",
    "form": "Điều kiện 〜たら"
  },
  {
    "suffix": "したら",
    "replace": [
      "す",
      "する"
    ],
    "tag": "Thể Điều kiện (〜したら) [Nếu / Sau khi]",
    "form": "Điều kiện 〜たら"
  },
  {
    "suffix": "たら",
    "replace": [
      "る",
      ""
    ],
    "tag": "Thể Điều kiện (〜たら) [Nếu / Sau khi]",
    "form": "Điều kiện 〜たら"
  },
  {
    "suffix": "れば",
    "replace": [
      "る"
    ],
    "tag": "Thể Điều kiện (〜れば) [Nếu]",
    "form": "Điều kiện 〜ば"
  },
  {
    "suffix": "えば",
    "replace": [
      "う"
    ],
    "tag": "Thể Điều kiện (〜えば) [Nếu]",
    "form": "Điều kiện 〜ば"
  },
  {
    "suffix": "けば",
    "replace": [
      "く"
    ],
    "tag": "Thể Điều kiện (〜けば) [Nếu]",
    "form": "Điều kiện 〜ば"
  },
  {
    "suffix": "げば",
    "replace": [
      "ぐ"
    ],
    "tag": "Thể Điều kiện (〜げば) [Nếu]",
    "form": "Điều kiện 〜ば"
  },
  {
    "suffix": "せば",
    "replace": [
      "す"
    ],
    "tag": "Thể Điều kiện (〜せば) [Nếu]",
    "form": "Điều kiện 〜ば"
  },
  {
    "suffix": "てば",
    "replace": [
      "つ"
    ],
    "tag": "Thể Điều kiện (〜てば) [Nếu]",
    "form": "Điều kiện 〜ば"
  },
  {
    "suffix": "ねば",
    "replace": [
      "ぬ"
    ],
    "tag": "Thể Điều kiện (〜ねば) [Nếu]",
    "form": "Điều kiện 〜ば"
  },
  {
    "suffix": "べば",
    "replace": [
      "ぶ"
    ],
    "tag": "Thể Điều kiện (〜べば) [Nếu]",
    "form": "Điều kiện 〜ば"
  },
  {
    "suffix": "めば",
    "replace": [
      "む"
    ],
    "tag": "Thể Điều kiện (〜めば) [Nếu]",
    "form": "Điều kiện 〜ば"
  },
  {
    "suffix": "よう",
    "replace": [
      "る",
      "する",
      "くる"
    ],
    "tag": "Thể Ý chí / Rủ rê (〜よう) [Hãy / Định]",
    "form": "Ý chí / Rủ rê"
  },
  {
    "suffix": "おう",
    "replace": [
      "う"
    ],
    "tag": "Thể Ý chí / Rủ rê (〜おう)",
    "form": "Ý chí / Rủ rê"
  },
  {
    "suffix": "こう",
    "replace": [
      "く"
    ],
    "tag": "Thể Ý chí / Rủ rê (〜こう)",
    "form": "Ý chí / Rủ rê"
  },
  {
    "suffix": "ごう",
    "replace": [
      "ぐ"
    ],
    "tag": "Thể Ý chí / Rủ rê (〜ごう)",
    "form": "Ý chí / Rủ rê"
  },
  {
    "suffix": "そう",
    "replace": [
      "す"
    ],
    "tag": "Thể Ý chí / Rủ rê (〜そう)",
    "form": "Ý chí / Rủ rê"
  },
  {
    "suffix": "とう",
    "replace": [
      "つ"
    ],
    "tag": "Thể Ý chí / Rủ rê (〜とう)",
    "form": "Ý chí / Rủ rê"
  },
  {
    "suffix": "ぼう",
    "replace": [
      "ぶ"
    ],
    "tag": "Thể Ý chí / Rủ rê (〜ぼう)",
    "form": "Ý chí / Rủ rê"
  },
  {
    "suffix": "もう",
    "replace": [
      "む"
    ],
    "tag": "Thể Ý chí / Rủ rê (〜もう)",
    "form": "Ý chí / Rủ rê"
  },
  {
    "suffix": "ろう",
    "replace": [
      "る"
    ],
    "tag": "Thể Ý chí / Rủ rê (〜ろう)",
    "form": "Ý chí / Rủ rê"
  },
  {
    "suffix": "みなさい",
    "replace": [
      "む"
    ],
    "tag": "Thể Mệnh lệnh lịch sự (〜なさい)",
    "form": "Mệnh lệnh 〜なさい"
  },
  {
    "suffix": "きなさい",
    "replace": [
      "く"
    ],
    "tag": "Thể Mệnh lệnh lịch sự (〜なさい)",
    "form": "Mệnh lệnh 〜なさい"
  },
  {
    "suffix": "ぎなさい",
    "replace": [
      "ぐ"
    ],
    "tag": "Thể Mệnh lệnh lịch sự (〜なさい)",
    "form": "Mệnh lệnh 〜なさい"
  },
  {
    "suffix": "しなさい",
    "replace": [
      "す",
      "する"
    ],
    "tag": "Thể Mệnh lệnh lịch sự (〜なさい)",
    "form": "Mệnh lệnh 〜なさい"
  },
  {
    "suffix": "ちなさい",
    "replace": [
      "つ"
    ],
    "tag": "Thể Mệnh lệnh lịch sự (〜なさい)",
    "form": "Mệnh lệnh 〜なさい"
  },
  {
    "suffix": "びなさい",
    "replace": [
      "ぶ"
    ],
    "tag": "Thể Mệnh lệnh lịch sự (〜なさい)",
    "form": "Mệnh lệnh 〜なさい"
  },
  {
    "suffix": "いなさい",
    "replace": [
      "う"
    ],
    "tag": "Thể Mệnh lệnh lịch sự (〜なさい)",
    "form": "Mệnh lệnh 〜なさい"
  },
  {
    "suffix": "りなさい",
    "replace": [
      "る"
    ],
    "tag": "Thể Mệnh lệnh lịch sự (〜なさい)",
    "form": "Mệnh lệnh 〜なさい"
  },
  {
    "suffix": "なさい",
    "replace": [
      "る"
    ],
    "tag": "Thể Mệnh lệnh lịch sự (〜なさい)",
    "form": "Mệnh lệnh 〜なさい"
  },
  {
    "suffix": "みやすい",
    "replace": [
      "む"
    ],
    "tag": "Thể Dễ làm (〜やすい)",
    "form": "Dễ làm 〜やすい"
  },
  {
    "suffix": "きやすい",
    "replace": [
      "く"
    ],
    "tag": "Thể Dễ làm (〜やすい)",
    "form": "Dễ làm 〜やすい"
  },
  {
    "suffix": "ぎやすい",
    "replace": [
      "ぐ"
    ],
    "tag": "Thể Dễ làm (〜やすい)",
    "form": "Dễ làm 〜やすい"
  },
  {
    "suffix": "しやすい",
    "replace": [
      "す",
      "する"
    ],
    "tag": "Thể Dễ làm (〜やすい)",
    "form": "Dễ làm 〜やすい"
  },
  {
    "suffix": "ちやすい",
    "replace": [
      "つ"
    ],
    "tag": "Thể Dễ làm (〜やすい)",
    "form": "Dễ làm 〜やすい"
  },
  {
    "suffix": "びやすい",
    "replace": [
      "ぶ"
    ],
    "tag": "Thể Dễ làm (〜やすい)",
    "form": "Dễ làm 〜やすい"
  },
  {
    "suffix": "いやすい",
    "replace": [
      "う"
    ],
    "tag": "Thể Dễ làm (〜やすい)",
    "form": "Dễ làm 〜やすい"
  },
  {
    "suffix": "りやすい",
    "replace": [
      "る"
    ],
    "tag": "Thể Dễ làm (〜やすい)",
    "form": "Dễ làm 〜やすい"
  },
  {
    "suffix": "やすい",
    "replace": [
      "る"
    ],
    "tag": "Thể Dễ làm (〜やすい)",
    "form": "Dễ làm 〜やすい"
  },
  {
    "suffix": "みにくい",
    "replace": [
      "む"
    ],
    "tag": "Thể Khó làm (〜にくい)",
    "form": "Khó làm 〜にくい"
  },
  {
    "suffix": "きにくい",
    "replace": [
      "く"
    ],
    "tag": "Thể Khó làm (〜にくい)",
    "form": "Khó làm 〜にくい"
  },
  {
    "suffix": "ぎにくい",
    "replace": [
      "ぐ"
    ],
    "tag": "Thể Khó làm (〜にくい)",
    "form": "Khó làm 〜にくい"
  },
  {
    "suffix": "しにくい",
    "replace": [
      "す",
      "する"
    ],
    "tag": "Thể Khó làm (〜にくい)",
    "form": "Khó làm 〜にくい"
  },
  {
    "suffix": "ちにくい",
    "replace": [
      "つ"
    ],
    "tag": "Thể Khó làm (〜にくい)",
    "form": "Khó làm 〜にくい"
  },
  {
    "suffix": "びにくい",
    "replace": [
      "ぶ"
    ],
    "tag": "Thể Khó làm (〜にくい)",
    "form": "Khó làm 〜にくい"
  },
  {
    "suffix": "いにくい",
    "replace": [
      "う"
    ],
    "tag": "Thể Khó làm (〜にくい)",
    "form": "Khó làm 〜にくい"
  },
  {
    "suffix": "りにくい",
    "replace": [
      "る"
    ],
    "tag": "Thể Khó làm (〜にくい)",
    "form": "Khó làm 〜にくい"
  },
  {
    "suffix": "にくい",
    "replace": [
      "る"
    ],
    "tag": "Thể Khó làm (〜にくい)",
    "form": "Khó làm 〜にくい"
  },
  {
    "suffix": "みすぎた",
    "replace": [
      "む"
    ],
    "tag": "Thể Quá mức Quá khứ (〜すぎた)",
    "form": "Quá mức"
  },
  {
    "suffix": "きすぎた",
    "replace": [
      "く"
    ],
    "tag": "Thể Quá mức Quá khứ (〜すぎた)",
    "form": "Quá mức"
  },
  {
    "suffix": "しすぎた",
    "replace": [
      "す",
      "する"
    ],
    "tag": "Thể Quá mức Quá khứ (〜すぎた)",
    "form": "Quá mức"
  },
  {
    "suffix": "すぎた",
    "replace": [
      "る",
      "い"
    ],
    "tag": "Thể Quá mức Quá khứ (〜すぎた)",
    "form": "Quá mức"
  },
  {
    "suffix": "みすぎる",
    "replace": [
      "む"
    ],
    "tag": "Thể Quá mức (〜すぎる)",
    "form": "Quá mức"
  },
  {
    "suffix": "きすぎる",
    "replace": [
      "く"
    ],
    "tag": "Thể Quá mức (〜すぎる)",
    "form": "Quá mức"
  },
  {
    "suffix": "しすぎる",
    "replace": [
      "す",
      "する"
    ],
    "tag": "Thể Quá mức (〜すぎる)",
    "form": "Quá mức"
  },
  {
    "suffix": "すぎる",
    "replace": [
      "る",
      "い"
    ],
    "tag": "Thể Quá mức (〜すぎる)",
    "form": "Quá mức"
  },
  {
    "suffix": "ちゃった",
    "replace": [
      "る",
      "く",
      "つ",
      "う"
    ],
    "tag": "Văn nói (〜ちゃった) [Lỡ làm mất rồi]",
    "form": "Thể てしまう"
  },
  {
    "suffix": "ちゃう",
    "replace": [
      "る",
      "く",
      "つ",
      "う"
    ],
    "tag": "Văn nói (〜ちゃう) [Lỡ làm / Làm hết]",
    "form": "Thể てしまう"
  },
  {
    "suffix": "じゃった",
    "replace": [
      "む",
      "ぶ",
      "ぐ"
    ],
    "tag": "Văn nói (〜じゃった) [Lỡ làm mất rồi]",
    "form": "Thể でしまう"
  },
  {
    "suffix": "じゃう",
    "replace": [
      "む",
      "ぶ",
      "ぐ"
    ],
    "tag": "Văn nói (〜じゃう) [Lỡ làm / Làm hết]",
    "form": "Thể でしまう"
  },
  {
    "suffix": "といた",
    "replace": [
      "る",
      "く",
      "つ",
      "う"
    ],
    "tag": "Văn nói (〜といた) [Đã làm sẵn trước]",
    "form": "Thể ておく"
  },
  {
    "suffix": "とく",
    "replace": [
      "る",
      "く",
      "つ",
      "う"
    ],
    "tag": "Văn nói (〜とく) [Làm sẵn trước]",
    "form": "Thể ておく"
  },
  {
    "suffix": "くなかった",
    "replace": [
      "い"
    ],
    "tag": "Tính từ Phủ định Quá khứ (〜くなかった)",
    "form": "Phủ định Quá khứ"
  },
  {
    "suffix": "くない",
    "replace": [
      "い"
    ],
    "tag": "Tính từ Phủ định (〜くない)",
    "form": "Phủ định"
  },
  {
    "suffix": "かった",
    "replace": [
      "い"
    ],
    "tag": "Tính từ Quá khứ (〜かった)",
    "form": "Quá khứ"
  },
  {
    "suffix": "くて",
    "replace": [
      "い"
    ],
    "tag": "Tính từ Thể Nối (〜くて)",
    "form": "Thể Nối"
  },
  {
    "suffix": "く",
    "replace": [
      "い"
    ],
    "tag": "Phó từ hóa tính từ (〜く)",
    "form": "Phó từ"
  }
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
