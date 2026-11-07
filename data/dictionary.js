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
  "部屋": {
    "r": "へや",
    "m": "Căn phòng, gian phòng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "本屋": {
    "r": "ほんや",
    "m": "Hiệu sách, tiệm sách",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "場所": {
    "r": "ばしょ",
    "m": "Địa điểm, nơi chốn, chỗ",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
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
  "子ども": {
    "r": "こども",
    "m": "Trẻ con, con cái",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "お菓子": {
    "r": "おかし",
    "m": "Bánh kẹo, đồ ngọt",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "買い物": {
    "r": "かいもの",
    "m": "Mua sắm",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "乗り物": {
    "r": "のりもの",
    "m": "Phương tiện giao thông, xe cộ",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "建物": {
    "r": "たてもの",
    "m": "Tòa nhà, công trình kiến trúc",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
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

// Bổ sung các quy tắc biến hình Ngữ pháp Nhóm 1 (Causative, Passive, Potential, Volitional)
const EXTRA_DEINFLECT_RULES = [
  // Nhóm 1 Thể Sai khiến (〜せる)
  { suffix: 'かせる', replace: ['く'], tag: 'Thể Sai khiến (〜せる)', form: 'Sai khiến' },
  { suffix: 'がせる', replace: ['ぐ'], tag: 'Thể Sai khiến (〜せる)', form: 'Sai khiến' },
  { suffix: 'わせる', replace: ['う'], tag: 'Thể Sai khiến (〜せる)', form: 'Sai khiến' },
  { suffix: 'たせる', replace: ['つ'], tag: 'Thể Sai khiến (〜せる)', form: 'Sai khiến' },
  { suffix: 'なせる', replace: ['ぬ'], tag: 'Thể Sai khiến (〜せる)', form: 'Sai khiến' },
  { suffix: 'ばせる', replace: ['ぶ'], tag: 'Thể Sai khiến (〜せる)', form: 'Sai khiến' },
  { suffix: 'ませる', replace: ['む'], tag: 'Thể Sai khiến (〜せる)', form: 'Sai khiến' },
  { suffix: 'らせる', replace: ['る'], tag: 'Thể Sai khiến (〜せる)', form: 'Sai khiến' },

  // Nhóm 1 Thể Sai khiến Bị động rút gọn [Bị bắt làm]
  { suffix: 'かされる', replace: ['く'], tag: 'Thể Sai khiến Bị động [Bị bắt làm]', form: 'Sai khiến + Bị động' },
  { suffix: 'がされる', replace: ['ぐ'], tag: 'Thể Sai khiến Bị động [Bị bắt làm]', form: 'Sai khiến + Bị động' },
  { suffix: 'わされる', replace: ['う'], tag: 'Thể Sai khiến Bị động [Bị bắt làm]', form: 'Sai khiến + Bị động' },
  { suffix: 'たされる', replace: ['つ'], tag: 'Thể Sai khiến Bị động [Bị bắt làm]', form: 'Sai khiến + Bị động' },
  { suffix: 'ばされる', replace: ['ぶ'], tag: 'Thể Sai khiến Bị động [Bị bắt làm]', form: 'Sai khiến + Bị động' },
  { suffix: 'まされる', replace: ['む'], tag: 'Thể Sai khiến Bị động [Bị bắt làm]', form: 'Sai khiến + Bị động' },
  { suffix: 'らされる', replace: ['る'], tag: 'Thể Sai khiến Bị động [Bị bắt làm]', form: 'Sai khiến + Bị động' },

  // Nhóm 1 Thể Bị động / Khả năng (〜れる)
  { suffix: 'かれる', replace: ['く'], tag: 'Thể Bị động / Khả năng (〜れる)', form: 'Bị động' },
  { suffix: 'がれる', replace: ['ぐ'], tag: 'Thể Bị động / Khả năng (〜れる)', form: 'Bị động' },
  { suffix: 'われる', replace: ['う'], tag: 'Thể Bị động / Khả năng (〜れる)', form: 'Bị động' },
  { suffix: 'たれる', replace: ['つ'], tag: 'Thể Bị động / Khả năng (〜れる)', form: 'Bị động' },
  { suffix: 'なれる', replace: ['ぬ'], tag: 'Thể Bị động / Khả năng (〜れる)', form: 'Bị động' },
  { suffix: 'ばれる', replace: ['ぶ'], tag: 'Thể Bị động / Khả năng (〜れる)', form: 'Bị động' },
  { suffix: 'まれる', replace: ['む'], tag: 'Thể Bị động / Khả năng (〜れる)', form: 'Bị động' },

  // Nhóm 1 Thể Khả năng (〜える)
  { suffix: 'ける', replace: ['く'], tag: 'Thể Khả năng (〜える)', form: 'Khả năng' },
  { suffix: 'げる', replace: ['ぐ'], tag: 'Thể Khả năng (〜える)', form: 'Khả năng' },
  { suffix: 'える', replace: ['う'], tag: 'Thể Khả năng (〜える)', form: 'Khả năng' },
  { suffix: 'てる', replace: ['つ'], tag: 'Thể Khả năng (〜える)', form: 'Khả năng' },
  { suffix: 'ねる', replace: ['ぬ'], tag: 'Thể Khả năng (〜える)', form: 'Khả năng' },
  { suffix: 'べる', replace: ['ぶ'], tag: 'Thể Khả năng (〜える)', form: 'Khả năng' },
  { suffix: 'める', replace: ['む'], tag: 'Thể Khả năng (〜える)', form: 'Khả năng' },
  { suffix: 'れる', replace: ['る'], tag: 'Thể Khả năng (〜える)', form: 'Khả năng' },

  // Nhóm 1 Thể Ý chí (〜おう)
  { suffix: 'こう', replace: ['く'], tag: 'Thể Ý chí (〜おう)', form: 'Ý chí' },
  { suffix: 'ごう', replace: ['ぐ'], tag: 'Thể Ý chí (〜おう)', form: 'Ý chí' },
  { suffix: 'おう', replace: ['う'], tag: 'Thể Ý chí (〜おう)', form: 'Ý chí' },
  { suffix: 'とう', replace: ['つ'], tag: 'Thể Ý chí (〜おう)', form: 'Ý chí' },
  { suffix: 'のう', replace: ['ぬ'], tag: 'Thể Ý chí (〜おう)', form: 'Ý chí' },
  { suffix: 'ぼう', replace: ['ぶ'], tag: 'Thể Ý chí (〜おう)', form: 'Ý chí' },
  { suffix: 'もう', replace: ['む'], tag: 'Thể Ý chí (〜おう)', form: 'Ý chí' },
  { suffix: 'ろう', replace: ['る'], tag: 'Thể Ý chí (〜おう)', form: 'Ý chí' },

  // Động từ Nhóm 1 (Godan) - Thể Lịch sự (〜ます, 〜ません, 〜ました, 〜ませんでした, 〜ましょう)
  { suffix: 'きます', replace: ['く'], tag: 'Thể Lịch sự (〜ます)', form: 'Khẳng định Lịch sự' },
  { suffix: 'ぎます', replace: ['ぐ'], tag: 'Thể Lịch sự (〜ます)', form: 'Khẳng định Lịch sự' },
  { suffix: 'します', replace: ['す'], tag: 'Thể Lịch sự (〜ます)', form: 'Khẳng định Lịch sự' },
  { suffix: 'ちます', replace: ['つ'], tag: 'Thể Lịch sự (〜ます)', form: 'Khẳng định Lịch sự' },
  { suffix: 'にます', replace: ['ぬ'], tag: 'Thể Lịch sự (〜ます)', form: 'Khẳng định Lịch sự' },
  { suffix: 'びます', replace: ['ぶ'], tag: 'Thể Lịch sự (〜ます)', form: 'Khẳng định Lịch sự' },
  { suffix: 'みます', replace: ['む'], tag: 'Thể Lịch sự (〜ます)', form: 'Khẳng định Lịch sự' },
  { suffix: 'います', replace: ['う'], tag: 'Thể Lịch sự (〜ます)', form: 'Khẳng định Lịch sự' },
  { suffix: 'ります', replace: ['る'], tag: 'Thể Lịch sự (〜ます)', form: 'Khẳng định Lịch sự' },

  { suffix: 'きません', replace: ['く'], tag: 'Thể Lịch sự Phủ định (〜ません)', form: 'Phủ định Lịch sự' },
  { suffix: 'ぎません', replace: ['ぐ'], tag: 'Thể Lịch sự Phủ định (〜ません)', form: 'Phủ định Lịch sự' },
  { suffix: 'しません', replace: ['す'], tag: 'Thể Lịch sự Phủ định (〜ません)', form: 'Phủ định Lịch sự' },
  { suffix: 'ちません', replace: ['つ'], tag: 'Thể Lịch sự Phủ định (〜ません)', form: 'Phủ định Lịch sự' },
  { suffix: 'にません', replace: ['ぬ'], tag: 'Thể Lịch sự Phủ định (〜ません)', form: 'Phủ định Lịch sự' },
  { suffix: 'びません', replace: ['ぶ'], tag: 'Thể Lịch sự Phủ định (〜ません)', form: 'Phủ định Lịch sự' },
  { suffix: 'みません', replace: ['む'], tag: 'Thể Lịch sự Phủ định (〜ません)', form: 'Phủ định Lịch sự' },
  { suffix: 'いません', replace: ['う'], tag: 'Thể Lịch sự Phủ định (〜ません)', form: 'Phủ định Lịch sự' },
  { suffix: 'りません', replace: ['る'], tag: 'Thể Lịch sự Phủ định (〜ません)', form: 'Phủ định Lịch sự' },

  { suffix: 'きました', replace: ['く'], tag: 'Thể Lịch sự Quá khứ (〜ました)', form: 'Quá khứ Lịch sự' },
  { suffix: 'ぎました', replace: ['ぐ'], tag: 'Thể Lịch sự Quá khứ (〜ました)', form: 'Quá khứ Lịch sự' },
  { suffix: 'しました', replace: ['す'], tag: 'Thể Lịch sự Quá khứ (〜ました)', form: 'Quá khứ Lịch sự' },
  { suffix: 'ちました', replace: ['つ'], tag: 'Thể Lịch sự Quá khứ (〜ました)', form: 'Quá khứ Lịch sự' },
  { suffix: 'にました', replace: ['ぬ'], tag: 'Thể Lịch sự Quá khứ (〜ました)', form: 'Quá khứ Lịch sự' },
  { suffix: 'びました', replace: ['ぶ'], tag: 'Thể Lịch sự Quá khứ (〜ました)', form: 'Quá khứ Lịch sự' },
  { suffix: 'みました', replace: ['む'], tag: 'Thể Lịch sự Quá khứ (〜ました)', form: 'Quá khứ Lịch sự' },
  { suffix: 'いました', replace: ['う'], tag: 'Thể Lịch sự Quá khứ (〜ました)', form: 'Quá khứ Lịch sự' },
  { suffix: 'りました', replace: ['る'], tag: 'Thể Lịch sự Quá khứ (〜ました)', form: 'Quá khứ Lịch sự' },

  { suffix: 'きませんでした', replace: ['く'], tag: 'Thể Lịch sự Phủ định Quá khứ (〜ませんでした)', form: 'Quá khứ Phủ định Lịch sự' },
  { suffix: 'ぎませんでした', replace: ['ぐ'], tag: 'Thể Lịch sự Phủ định Quá khứ (〜ませんでした)', form: 'Quá khứ Phủ định Lịch sự' },
  { suffix: 'しませんでした', replace: ['す'], tag: 'Thể Lịch sự Phủ định Quá khứ (〜ませんでした)', form: 'Quá khứ Phủ định Lịch sự' },
  { suffix: 'ちませんでした', replace: ['つ'], tag: 'Thể Lịch sự Phủ định Quá khứ (〜ませんでした)', form: 'Quá khứ Phủ định Lịch sự' },
  { suffix: 'にませんでした', replace: ['ぬ'], tag: 'Thể Lịch sự Phủ định Quá khứ (〜ませんでした)', form: 'Quá khứ Phủ định Lịch sự' },
  { suffix: 'びませんでした', replace: ['ぶ'], tag: 'Thể Lịch sự Phủ định Quá khứ (〜ませんでした)', form: 'Quá khứ Phủ định Lịch sự' },
  { suffix: 'みませんでした', replace: ['む'], tag: 'Thể Lịch sự Phủ định Quá khứ (〜ませんでした)', form: 'Quá khứ Phủ định Lịch sự' },
  { suffix: 'いませんでした', replace: ['う'], tag: 'Thể Lịch sự Phủ định Quá khứ (〜ませんでした)', form: 'Quá khứ Phủ định Lịch sự' },
  { suffix: 'りませんでした', replace: ['る'], tag: 'Thể Lịch sự Phủ định Quá khứ (〜ませんでした)', form: 'Quá khứ Phủ định Lịch sự' },

  { suffix: 'きましょう', replace: ['く'], tag: 'Thể Lịch sự Ý chí / Rủ rê (〜ましょう)', form: 'Rủ rê Lịch sự' },
  { suffix: 'ぎましょう', replace: ['ぐ'], tag: 'Thể Lịch sự Ý chí / Rủ rê (〜ましょう)', form: 'Rủ rê Lịch sự' },
  { suffix: 'しましょう', replace: ['す'], tag: 'Thể Lịch sự Ý chí / Rủ rê (〜ましょう)', form: 'Rủ rê Lịch sự' },
  { suffix: 'ちましょう', replace: ['つ'], tag: 'Thể Lịch sự Ý chí / Rủ rê (〜ましょう)', form: 'Rủ rê Lịch sự' },
  { suffix: 'にましょう', replace: ['ぬ'], tag: 'Thể Lịch sự Ý chí / Rủ rê (〜ましょう)', form: 'Rủ rê Lịch sự' },
  { suffix: 'びましょう', replace: ['ぶ'], tag: 'Thể Lịch sự Ý chí / Rủ rê (〜ましょう)', form: 'Rủ rê Lịch sự' },
  { suffix: 'みましょう', replace: ['む'], tag: 'Thể Lịch sự Ý chí / Rủ rê (〜ましょう)', form: 'Rủ rê Lịch sự' },
  { suffix: 'いましょう', replace: ['う'], tag: 'Thể Lịch sự Ý chí / Rủ rê (〜ましょう)', form: 'Rủ rê Lịch sự' },
  { suffix: 'りましょう', replace: ['る'], tag: 'Thể Lịch sự Ý chí / Rủ rê (〜ましょう)', form: 'Rủ rê Lịch sự' },

  // Động từ Nhóm 1 (Godan) - Thể Phủ định (〜ない, 〜なかった)
  { suffix: 'かない', replace: ['く'], tag: 'Thể Phủ định (〜ない)', form: 'Phủ định' },
  { suffix: 'がない', replace: ['ぐ'], tag: 'Thể Phủ định (〜ない)', form: 'Phủ định' },
  { suffix: 'さない', replace: ['す'], tag: 'Thể Phủ định (〜ない)', form: 'Phủ định' },
  { suffix: 'たない', replace: ['つ'], tag: 'Thể Phủ định (〜ない)', form: 'Phủ định' },
  { suffix: 'なない', replace: ['ぬ'], tag: 'Thể Phủ định (〜ない)', form: 'Phủ định' },
  { suffix: 'ばない', replace: ['ぶ'], tag: 'Thể Phủ định (〜ない)', form: 'Phủ định' },
  { suffix: 'まない', replace: ['む'], tag: 'Thể Phủ định (〜ない)', form: 'Phủ định' },
  { suffix: 'わない', replace: ['う'], tag: 'Thể Phủ định (〜ない)', form: 'Phủ định' },
  { suffix: 'らない', replace: ['る'], tag: 'Thể Phủ định (〜ない)', form: 'Phủ định' },

  { suffix: 'かなかった', replace: ['く'], tag: 'Thể Phủ định Quá khứ (〜なかった)', form: 'Phủ định Quá khứ' },
  { suffix: 'がなかった', replace: ['ぐ'], tag: 'Thể Phủ định Quá khứ (〜なかった)', form: 'Phủ định Quá khứ' },
  { suffix: 'さなかった', replace: ['す'], tag: 'Thể Phủ định Quá khứ (〜なかった)', form: 'Phủ định Quá khứ' },
  { suffix: 'たなかった', replace: ['つ'], tag: 'Thể Phủ định Quá khứ (〜なかった)', form: 'Phủ định Quá khứ' },
  { suffix: 'ななかった', replace: ['ぬ'], tag: 'Thể Phủ định Quá khứ (〜なかった)', form: 'Phủ định Quá khứ' },
  { suffix: 'ばなかった', replace: ['ぶ'], tag: 'Thể Phủ định Quá khứ (〜なかった)', form: 'Phủ định Quá khứ' },
  { suffix: 'まなかった', replace: ['む'], tag: 'Thể Phủ định Quá khứ (〜なかった)', form: 'Phủ định Quá khứ' },
  { suffix: 'わなかった', replace: ['う'], tag: 'Thể Phủ định Quá khứ (〜なかった)', form: 'Phủ định Quá khứ' },
  { suffix: 'らなかった', replace: ['る'], tag: 'Thể Phủ định Quá khứ (〜なかった)', form: 'Phủ định Quá khứ' },

  // Động từ Nhóm 1 (Godan) - Thể Điều kiện (〜ば)
  { suffix: 'けば', replace: ['く'], tag: 'Thể Điều kiện (〜ば)', form: 'Điều kiện' },
  { suffix: 'げば', replace: ['ぐ'], tag: 'Thể Điều kiện (〜ば)', form: 'Điều kiện' },
  { suffix: 'せば', replace: ['す'], tag: 'Thể Điều kiện (〜ば)', form: 'Điều kiện' },
  { suffix: 'てば', replace: ['つ'], tag: 'Thể Điều kiện (〜ば)', form: 'Điều kiện' },
  { suffix: 'ねば', replace: ['ぬ'], tag: 'Thể Điều kiện (〜ば)', form: 'Điều kiện' },
  { suffix: 'べば', replace: ['ぶ'], tag: 'Thể Điều kiện (〜ば)', form: 'Điều kiện' },
  { suffix: 'めば', replace: ['む'], tag: 'Thể Điều kiện (〜ば)', form: 'Điều kiện' },
  { suffix: 'えば', replace: ['う'], tag: 'Thể Điều kiện (〜ば)', form: 'Điều kiện' },
  { suffix: 'れば', replace: ['る'], tag: 'Thể Điều kiện (〜ば)', form: 'Điều kiện' },

  // Động từ Bất quy tắc 来る
  { suffix: '来ます', replace: ['来る'], tag: 'Thể Lịch sự (〜ます)', form: 'Khẳng định Lịch sự' },
  { suffix: '来ません', replace: ['来る'], tag: 'Thể Lịch sự Phủ định (〜ません)', form: 'Phủ định Lịch sự' },
  { suffix: '来ました', replace: ['来る'], tag: 'Thể Lịch sự Quá khứ (〜ました)', form: 'Quá khứ Lịch sự' },
  { suffix: '来ませんでした', replace: ['来る'], tag: 'Thể Lịch sự Phủ định Quá khứ (〜ませんでした)', form: 'Quá khứ Phủ định Lịch sự' },
  { suffix: '来ない', replace: ['来る'], tag: 'Thể Phủ định (〜ない)', form: 'Phủ định' },
  { suffix: '来なかった', replace: ['来る'], tag: 'Thể Phủ định Quá khứ (〜なかった)', form: 'Phủ định Quá khứ' },
  { suffix: '来れば', replace: ['来る'], tag: 'Thể Điều kiện (〜ば)', form: 'Điều kiện' },
  { suffix: '来よう', replace: ['来る'], tag: 'Thể Ý chí (〜よう)', form: 'Ý chí' },
  { suffix: '来てください', replace: ['来る'], tag: 'Thể Yêu cầu Lịch sự (〜てください)', form: 'Yêu cầu Lịch sự' },
  { suffix: '来て', replace: ['来る'], tag: 'Thể て', form: 'Liên kết Thể て' },
  { suffix: '来た', replace: ['来る'], tag: 'Thể Quá khứ (〜た)', form: 'Quá khứ' },

  // Tính từ đuôi -i (Adjectives) biến hình
  { suffix: 'そう', replace: ['い'], tag: 'Thể Có vẻ như (〜そう)', form: 'Phỏng đoán / Trông có vẻ' },
  { suffix: 'すぎる', replace: ['い'], tag: 'Thể Quá mức (〜すぎる)', form: 'Quá mức' },
  { suffix: 'すぎた', replace: ['い'], tag: 'Thể Quá mức Quá khứ (〜すぎた)', form: 'Quá mức Quá khứ' },
  { suffix: 'く', replace: ['い'], tag: 'Thể Phó từ hóa (〜く)', form: 'Phó từ' },
  { suffix: 'くて', replace: ['い'], tag: 'Thể Liên kết (〜くて)', form: 'Liên kết Thể て' },
  { suffix: 'かった', replace: ['い'], tag: 'Thể Quá khứ (〜かった)', form: 'Quá khứ' },
  { suffix: 'くない', replace: ['い'], tag: 'Thể Phủ định (〜くない)', form: 'Phủ định' },
  { suffix: 'くなかった', replace: ['い'], tag: 'Thể Phủ định Quá khứ (〜くなかった)', form: 'Phủ định Quá khứ' },
  { suffix: 'ければ', replace: ['い'], tag: 'Thể Điều kiện (〜ければ)', form: 'Điều kiện' },

  // Tính từ đặc biệt 良い (いい / よい)
  { suffix: 'よくない', replace: ['良い'], tag: 'Thể Phủ định (〜くない)', form: 'Phủ định' },
  { suffix: 'よかった', replace: ['良い'], tag: 'Thể Quá khứ (〜かった)', form: 'Quá khứ' },
  { suffix: 'よければ', replace: ['良い'], tag: 'Thể Điều kiện (〜ければ)', form: 'Điều kiện' },
  { suffix: 'よく', replace: ['良い'], tag: 'Thể Phó từ hóa (〜く)', form: 'Phó từ' },
  { suffix: 'よさそう', replace: ['良い'], tag: 'Thể Trông có vẻ (〜そう)', form: 'Phỏng đoán' },

  // Động từ dạng văn nói & liên kết rút gọn
  { suffix: 'ちゃう', replace: ['る', 'く', 'す'], tag: 'Thể Lỡ làm / Làm xong mất (〜てしまう)', form: 'Hoàn thành / Nuối tiếc (Văn nói)' },
  { suffix: 'ちゃった', replace: ['る', 'く', 'す'], tag: 'Thể Lỡ làm Quá khứ (〜てしまった)', form: 'Hoàn thành Quá khứ (Văn nói)' },
  { suffix: 'ちゃって', replace: ['る', 'く', 'す'], tag: 'Thể Lỡ làm Thể て (〜てしまって)', form: 'Hoàn thành Thể て (Văn nói)' },
  { suffix: 'じゃう', replace: ['ぐ', 'ぶ', 'む'], tag: 'Thể Lỡ làm / Làm xong mất (〜でしまう)', form: 'Hoàn thành / Nuối tiếc (Văn nói)' },
  { suffix: 'じゃった', replace: ['ぐ', 'ぶ', 'む'], tag: 'Thể Lỡ làm Quá khứ (〜でしまった)', form: 'Hoàn thành Quá khứ (Văn nói)' },
  { suffix: 'じゃって', replace: ['ぐ', 'ぶ', 'む'], tag: 'Thể Lỡ làm Thể て (〜でしまって)', form: 'Hoàn thành Thể て (Văn nói)' },
  { suffix: 'とく', replace: ['る', 'く', 'う'], tag: 'Thể Làm sẵn (〜ておく)', form: 'Chuẩn bị trước (Văn nói)' },
  { suffix: 'といた', replace: ['る', 'く', 'う'], tag: 'Thể Làm sẵn Quá khứ (〜ておいた)', form: 'Chuẩn bị trước Quá khứ' },
  { suffix: 'といて', replace: ['る', 'く', 'つ', 'う'], tag: 'Văn nói (〜といて) [Làm sẵn]', form: 'Chuẩn bị trước (Văn nói)' },
  { suffix: 'とかない', replace: ['る', 'く', 'つ', 'う'], tag: 'Văn nói (〜とかない) [Không làm sẵn]', form: 'Chuẩn bị trước Phủ định' },
  { suffix: 'とこう', replace: ['る', 'く', 'つ', 'う'], tag: 'Văn nói (〜とこう) [Hãy làm sẵn nào]', form: 'Chuẩn bị trước Ý chí' },
  { suffix: 'んどく', replace: ['む', 'ぶ', 'ぐ'], tag: 'Văn nói (〜んどく) [Làm sẵn]', form: 'Chuẩn bị trước (Văn nói)' },
  { suffix: 'んどいた', replace: ['む', 'ぶ', 'ぐ'], tag: 'Văn nói (〜んどいた) [Đã làm sẵn]', form: 'Chuẩn bị trước Quá khứ' },
  { suffix: 'んどいて', replace: ['む', 'ぶ', 'ぐ'], tag: 'Văn nói (〜んどいて) [Làm sẵn]', form: 'Chuẩn bị trước (Văn nói)' },
  { suffix: 'んどかない', replace: ['む', 'ぶ', 'ぐ'], tag: 'Văn nói (〜んどかない) [Không làm sẵn]', form: 'Chuẩn bị trước Phủ định' },
  { suffix: 'んどこう', replace: ['む', 'ぶ', 'ぐ'], tag: 'Văn nói (〜んどこう) [Hãy làm sẵn nào]', form: 'Chuẩn bị trước Ý chí' },
  { suffix: 'やすい', replace: ['る', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'う'], tag: 'Thể Dễ làm (〜やすい)', form: 'Dễ thực hiện' },
  { suffix: 'にくい', replace: ['る', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'う'], tag: 'Thể Khó làm (〜にくい)', form: 'Khó thực hiện' },

  // Văn nói bắt buộc (〜なくちゃ / 〜なきゃ / 〜なくっちゃ)
  { suffix: 'かなくちゃ', replace: ['く'], tag: 'Văn nói (〜なくちゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'がなくちゃ', replace: ['ぐ'], tag: 'Văn nói (〜なくちゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'さなくちゃ', replace: ['す'], tag: 'Văn nói (〜なくちゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'たなくちゃ', replace: ['つ'], tag: 'Văn nói (〜なくちゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'ななくちゃ', replace: ['ぬ'], tag: 'Văn nói (〜なくちゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'ばなくちゃ', replace: ['ぶ'], tag: 'Văn nói (〜なくちゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'まなくちゃ', replace: ['む'], tag: 'Văn nói (〜なくちゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'らなくちゃ', replace: ['る'], tag: 'Văn nói (〜なくちゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'わなくちゃ', replace: ['う'], tag: 'Văn nói (〜なくちゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'なくちゃ', replace: ['る'], tag: 'Văn nói (〜なくちゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'しなくちゃ', replace: ['する'], tag: 'Văn nói (〜なくちゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: '来なくちゃ', replace: ['来る'], tag: 'Văn nói (〜なくちゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'こなくちゃ', replace: ['来る'], tag: 'Văn nói (〜なくちゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },

  { suffix: 'かなきゃ', replace: ['く'], tag: 'Văn nói (〜なきゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'がなきゃ', replace: ['ぐ'], tag: 'Văn nói (〜なきゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'さなきゃ', replace: ['す'], tag: 'Văn nói (〜なきゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'たなきゃ', replace: ['つ'], tag: 'Văn nói (〜なきゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'ななきゃ', replace: ['ぬ'], tag: 'Văn nói (〜なきゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'ばなきゃ', replace: ['ぶ'], tag: 'Văn nói (〜なきゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'まなきゃ', replace: ['む'], tag: 'Văn nói (〜なきゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'らなきゃ', replace: ['る'], tag: 'Văn nói (〜なきゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'わなきゃ', replace: ['う'], tag: 'Văn nói (〜なきゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'なきゃ', replace: ['る'], tag: 'Văn nói (〜なきゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'しなきゃ', replace: ['する'], tag: 'Văn nói (〜なきゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: '来なきゃ', replace: ['来る'], tag: 'Văn nói (〜なきゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },
  { suffix: 'こなきゃ', replace: ['来る'], tag: 'Văn nói (〜なきゃ) [Phải làm]', form: 'Bắt buộc (Văn nói)' },

  // Văn nói chuyển động & tiếp diễn (〜てく / 〜てくる)
  { suffix: 'てく', replace: ['る', 'つ', 'う', 'く'], tag: 'Văn nói (〜てく) [Làm rồi đi]', form: 'Hướng đi / Tiếp diễn' },
  { suffix: 'てった', replace: ['る', 'つ', 'う', 'く'], tag: 'Văn nói (〜てった) [Đã đi mất]', form: 'Hướng đi Quá khứ' },
  { suffix: 'てって', replace: ['る', 'つ', 'う', 'く', 'す'], tag: 'Văn nói (〜てって) [Làm rồi đi]', form: 'Hướng đi Thể て' },
  { suffix: 'でく', replace: ['む', 'ぶ', 'ぐ'], tag: 'Văn nói (〜でく) [Làm rồi đi]', form: 'Hướng đi / Tiếp diễn' },
  { suffix: 'でった', replace: ['む', 'ぶ', 'ぐ'], tag: 'Văn nói (〜でった) [Đã đi mất]', form: 'Hướng đi Quá khứ' },
  { suffix: 'でって', replace: ['む', 'ぶ', 'ぐ'], tag: 'Văn nói (〜でって) [Làm rồi đi]', form: 'Hướng đi Thể て' },
  { suffix: 'てきて', replace: ['る', 'つ', 'う', 'く', 'す'], tag: 'Thể Làm rồi lại đây (〜てきて)', form: 'Hướng lại / Khởi phát' },
  { suffix: 'てきた', replace: ['る', 'つ', 'う', 'く', 'す'], tag: 'Thể Làm rồi lại đây (〜てきた)', form: 'Hướng lại Quá khứ' },
  { suffix: 'てくる', replace: ['る', 'つ', 'う', 'く', 'す'], tag: 'Thể Làm rồi lại đây (〜てくる)', form: 'Hướng lại' },

  // Khả năng dạng nói (Ra-nuki)
  { suffix: 'れる', replace: ['る'], tag: 'Thể Khả năng Văn nói (Ra-nuki)', form: 'Khả năng (Văn nói)' },
  { suffix: 'れない', replace: ['る'], tag: 'Thể Khả năng Phủ định (Ra-nuki)', form: 'Khả năng Phủ định' },
  { suffix: 'れた', replace: ['る'], tag: 'Thể Khả năng Quá khứ (Ra-nuki)', form: 'Khả năng Quá khứ' },

  // Sai khiến rút gọn (Godan Causative-Passive)
  { suffix: 'かされる', replace: ['く'], tag: 'Thể Bị ép làm (〜される)', form: 'Bị động Sai khiến rút gọn' },
  { suffix: 'がされる', replace: ['ぐ'], tag: 'Thể Bị ép làm (〜される)', form: 'Bị động Sai khiến rút gọn' },
  { suffix: 'たされる', replace: ['つ'], tag: 'Thể Bị ép làm (〜される)', form: 'Bị động Sai khiến rút gọn' },
  { suffix: 'ばされる', replace: ['ぶ'], tag: 'Thể Bị ép làm (〜される)', form: 'Bị động Sai khiến rút gọn' },
  { suffix: 'まされる', replace: ['む'], tag: 'Thể Bị ép làm (〜される)', form: 'Bị động Sai khiến rút gọn' },
  { suffix: 'わされる', replace: ['う'], tag: 'Thể Bị ép làm (〜される)', form: 'Bị động Sai khiến rút gọn' },
  { suffix: 'らされる', replace: ['る'], tag: 'Thể Bị ép làm (〜される)', form: 'Bị động Sai khiến rút gọn' },

  // Dở dang / Suýt nữa
  { suffix: 'かけ', replace: ['る', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'う'], tag: 'Thể Dở dang (〜かけ)', form: 'Đang dở dang' },
  { suffix: 'かけた', replace: ['る', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'う'], tag: 'Thể Suýt nữa / Dở dang (〜かけた)', form: 'Suýt nữa / Dở dang' },

  // Cụm động từ chuyển động liên kết (〜てくる / 〜ていく)
  { suffix: 'てきて', replace: ['てくる', 'て来る'], tag: 'Thể Làm rồi lại đây (〜てきて)', form: 'Hướng lại Thể て' },
  { suffix: 'てきた', replace: ['てくる', 'て来る'], tag: 'Thể Làm rồi lại đây (〜てきた)', form: 'Hướng lại Quá khứ' },
  { suffix: 'てって', replace: ['ていく', 'て行く'], tag: 'Văn nói (〜てって) [Làm rồi đi]', form: 'Hướng đi Thể て (Văn nói)' },
  { suffix: 'てった', replace: ['ていく', 'て行く'], tag: 'Văn nói (〜てった) [Làm rồi đi]', form: 'Hướng đi Quá khứ (Văn nói)' },
  { suffix: 'てく', replace: ['ていく', 'て行く'], tag: 'Văn nói (〜てく) [Làm rồi đi]', form: 'Hướng đi (Văn nói)' }
];

GRAMMAR_DEINFLECT_PATTERNS.push(...EXTRA_DEINFLECT_RULES);
// Sắp xếp quy tắc theo độ dài đuôi giảm dần (Greedy Longest-Suffix Match) để ưu tiên nhận diện chuẩn xác nhất
GRAMMAR_DEINFLECT_PATTERNS.sort((a, b) => b.suffix.length - a.suffix.length);


// Kho từ vựng mở rộng bổ sung các từ thông dụng JLPT N5 - N2, thành ngữ & cụm quán ngữ
const JP_DICTIONARY_EXTENSIONS = {
  // Trợ từ thông dụng trong câu (tránh bị map nhầm sang từ đồng âm như 歯, 二, 蚊)
  "は": { r: "わ", speechText: "わ", m: "Trợ từ Chủ đề / Chủ ngữ câu (phát âm là [wa])", t: "Trợ từ N5", pos: "prt", p: 0 },
  "へ": { r: "え", speechText: "え", m: "Trợ từ chỉ Hướng di chuyển 'Tới / Đến' (phát âm là [e])", t: "Trợ từ N5", pos: "prt", p: 0 },
  "を": { r: "お", speechText: "お", m: "Trợ từ Tân ngữ trực tiếp chịu tác động của hành động", t: "Trợ từ N5", pos: "prt", p: 0 },
  "に": { r: "に", speechText: "に", m: "Trợ từ chỉ Nơi chốn, thời gian, mục đích, đối tượng", t: "Trợ từ N5", pos: "prt", p: 0 },
  "で": { r: "で", speechText: "で", m: "Trợ từ chỉ Nơi diễn ra hành động, phương tiện, phương pháp, nguyên nhân", t: "Trợ từ N5", pos: "prt", p: 0 },
  "が": { r: "が", speechText: "が", m: "Trợ từ Chủ ngữ trực tiếp / Nhưng, tuy nhiên", t: "Trợ từ N5", pos: "prt", p: 0 },
  "と": { r: "と", speechText: "と", m: "Trợ từ 'Và', 'Cùng với' / Đánh dấu trích dẫn lời nói", t: "Trợ từ N5", pos: "prt", p: 0 },
  "も": { r: "も", speechText: "も", m: "Trợ từ 'Cũng' (đồng nhất tính chất)", t: "Trợ từ N5", pos: "prt", p: 0 },
  "か": { r: "か", speechText: "か", m: "Trợ từ Nghi vấn cuối câu 'Có phải không?' / Hoặc là", t: "Trợ từ N5", pos: "prt", p: 0 },
  "の": { r: "の", speechText: "の", m: "Trợ từ Sở hữu 'Của' / Danh từ hóa", t: "Trợ từ N5", pos: "prt", p: 0 },
  "から": { r: "から", speechText: "から", m: "Trợ từ 'Từ' (điểm bắt đầu) / Vì vậy, bởi vì", t: "Trợ từ N5", pos: "prt", p: 1 },
  "まで": { r: "まで", speechText: "まで", m: "Trợ từ 'Đến tận' (điểm kết thúc, giới hạn)", t: "Trợ từ N5", pos: "prt", p: 1 },
  "より": { r: "より", speechText: "より", m: "Trợ từ So sánh 'Hơn so với'", t: "Trợ từ N5", pos: "prt", p: 0 },
  "日": { r: "ひ", speechText: "ひ", m: "Mặt trời, ban ngày, ngày", t: "Danh từ N5", pos: "n", p: 0 },
  "時": { r: "とき", speechText: "とき", m: "Thời gian, lúc, khi (子供の時: lúc còn nhỏ)", t: "Danh từ N5", pos: "n", p: 2 },
  "年": { r: "とし", speechText: "とし", m: "Năm, tuổi tác (年を取る: thêm tuổi)", t: "Danh từ N5", pos: "n", p: 2 },
  "分": { r: "ぶん", speechText: "ぶん", m: "Phần, tỷ lệ, bổn phận (自分の分: phần của mình)", t: "Danh từ N4", pos: "n", p: 1 },
  "方": { r: "ほう", speechText: "ほう", m: "Phía, bên, phương diện so sánh / Vị (ngài - đọc kata)", t: "Danh từ N5", pos: "n", p: 1 },
  "何": { r: "なに", speechText: "なに", m: "Cái gì? Gì? (khi đứng trước です, だ hoặc Lượng từ đọc là [なん])", t: "Nghi vấn từ N5", pos: "pn", p: 1 },
  "仕事": { r: "しごと", m: "Công việc, nghề nghiệp", t: "Danh từ N5", pos: "n", p: 0 },
  "問題": { r: "もんだい", m: "Vấn đề, câu hỏi, sự phiền toái", t: "Danh từ N4", pos: "n", p: 0 },
  "世界": { r: "せかい", m: "Thế giới, vũ trụ", t: "Danh từ N4", pos: "n", p: 1 },
  "将来": { r: "しょうらい", m: "Tương lai (gần, tiền đồ)", t: "Danh từ N4", pos: "n", p: 1 },
  "未来": { r: "みらい", m: "Tương lai (xa)", t: "Danh từ N3", pos: "n", p: 1 },
  "方法": { r: "ほうほう", m: "Phương pháp, cách thức", t: "Danh từ N4", pos: "n", p: 0 },
  "関係": { r: "かんけい", m: "Quan hệ, liên quan", t: "Danh từ N4", pos: "n", p: 0 },
  "結果": { r: "けっか", m: "Kết quả, chung cuộc", t: "Danh từ N4", pos: "n", p: 0 },
  "成功": { r: "せいこう", m: "Thành công", t: "Danh từ N3", pos: "n,vs", p: 0 },
  "失敗": { r: "しっぱい", m: "Thất bại", t: "Danh từ N4", pos: "n,vs", p: 0 },
  "約束": { r: "やくそく", m: "Lời hứa, cuộc hẹn", t: "Danh từ N4", pos: "n,vs", p: 0 },
  "連絡": { r: "れんらく", m: "Liên lạc, thông báo", t: "Danh từ N4", pos: "n,vs", p: 0 },
  "相談": { r: "そうだん", m: "Thảo luận, trao đổi ý kiến", t: "Danh từ N4", pos: "n,vs", p: 0 },
  "準備": { r: "じゅんび", m: "Chuẩn bị, sắp xếp", t: "Danh từ N4", pos: "n,vs", p: 1 },
  "注意": { r: "ちゅうい", m: "Chú ý, nhắc nhở, cẩn thận", t: "Danh từ N4", pos: "n,vs", p: 1 },
  "生活": { r: "せいかつ", m: "Đời sống, sinh hoạt", t: "Danh từ N4", pos: "n,vs", p: 0 },
  "最近": { r: "さいきん", m: "Gần đây, dạo này", t: "Phó từ / Danh từ N4", pos: "n,adv", p: 0 },
  "最初": { r: "さいしょ", m: "Đầu tiên, lúc đầu", t: "Danh từ N4", pos: "n", p: 0 },
  "最後": { r: "さいご", m: "Cuối cùng, sau chót", t: "Danh từ N4", pos: "n", p: 1 },
  "経験": { r: "けいけん", m: "Kinh nghiệm, trải nghiệm", t: "Danh từ N4", pos: "n,vs", p: 0 },
  "質問": { r: "しつもん", m: "Câu hỏi, thắc mắc", t: "Danh từ N5", pos: "n,vs", p: 0 },
  "理由": { r: "りゆう", m: "Lý do, nguyên nhân", t: "Danh từ N4", pos: "n", p: 0 },
  "意味": { r: "いみ", m: "Ý nghĩa", t: "Danh từ N4", pos: "n,vs", p: 1 },
  "計画": { r: "けいかく", m: "Kế hoạch, dự định", t: "Danh từ N4", pos: "n,vs", p: 0 },
  "意見": { r: "いけん", m: "Ý kiến, quan điểm", t: "Danh từ N4", pos: "n", p: 1 },
  "説明": { r: "せつめい", m: "Giải thích, thuyết minh", t: "Danh từ N4", pos: "n,vs", p: 0 },
  "案内": { r: "あんない", m: "Hướng dẫn, dẫn đường", t: "Danh từ N4", pos: "n,vs", p: 0 },
  "紹介": { r: "しょうかい", m: "Giới thiệu", t: "Danh từ N4", pos: "n,vs", p: 0 },
  "参加": { r: "さんか", m: "Tham gia", t: "Danh từ N4", pos: "n,vs", p: 0 },
  "利用": { r: "りよう", m: "Sử dụng, tận dụng", t: "Danh từ N4", pos: "n,vs", p: 0 },
  "研究": { r: "けんきゅう", m: "Nghiên cứu", t: "Danh từ N4", pos: "n,vs", p: 0 },
  "変化": { r: "へんか", m: "Biến hóa, sự thay đổi", t: "Danh từ N3", pos: "n,vs", p: 1 },
  "簡単": { r: "かんたん", m: "Đơn giản, dễ dàng", t: "Tính từ -na N4", pos: "adj-na", p: 0 },
  "複雑": { r: "ふくざつ", m: "Phức tạp, rắc rối", t: "Tính từ -na N4", pos: "adj-na", p: 0 },
  "安全": { r: "あんぜん", m: "An toàn", t: "Tính từ -na N4", pos: "adj-na", p: 0 },
  "危険": { r: "きけん", m: "Nguy hiểm", t: "Tính từ -na N4", pos: "adj-na", p: 0 },
  "自由": { r: "じゆう", m: "Tự do", t: "Tính từ -na N4", pos: "adj-na", p: 2 },
  "親切": { r: "しんせつ", m: "Tốt bụng, thân thiện, tử tế", t: "Tính từ -na N5", pos: "adj-na", p: 1 },
  "丁寧": { r: "ていねい", m: "Lịch sự, cẩn thận, chu đáo", t: "Tính từ -na N4", pos: "adj-na", p: 1 },
  "大切": { r: "たいせつ", m: "Quan trọng, quý giá", t: "Tính từ -na N5", pos: "adj-na", p: 0 },
  "大事": { r: "だいじ", m: "Hệ trọng, quan trọng", t: "Tính từ -na N4", pos: "adj-na", p: 3 },
  "有名": { r: "ゆうめい", m: "Nổi tiếng", t: "Tính từ -na N5", pos: "adj-na", p: 0 },
  "便利": { r: "べんり", m: "Tiện lợi, thuận tiện", t: "Tính từ -na N5", pos: "adj-na", p: 1 },
  "不便": { r: "ふべん", m: "Bất tiện", t: "Tính từ -na N4", pos: "adj-na", p: 1 },
  "静か": { r: "しずか", m: "Yên tĩnh, thanh bình", t: "Tính từ -na N5", pos: "adj-na", p: 1 },
  "賑やか": { r: "にぎやか", m: "Náo nhiệt, sôi động", t: "Tính từ -na N5", pos: "adj-na", p: 2 },
  "必要": { r: "ひつよう", m: "Cần thiết", t: "Tính từ -na N4", pos: "adj-na", p: 0 },
  "特別": { r: "とくべつ", m: "Đặc biệt", t: "Tính từ -na N4", pos: "adj-na", p: 0 },
  "嬉しい": { r: "うれしい", m: "Vui mừng, sung sướng", t: "Tính từ -i N4", pos: "adj-i", p: 3 },
  "悲しい": { r: "かなしい", m: "Đau buồn, thương tâm", t: "Tính từ -i N4", pos: "adj-i", p: 3 },
  "寂しい": { r: "さびしい", m: "Cô đơn, buồn bã", t: "Tính từ -i N4", pos: "adj-i", p: 3 },
  "優しい": { r: "やさしい", m: "Dịu dàng, hiền lành, nhân hậu", t: "Tính từ -i N5", pos: "adj-i", p: 0 },
  "易しい": { r: "やさしい", m: "Dễ, đơn giản", t: "Tính từ -i N5", pos: "adj-i", p: 0 },
  "忙しい": { r: "いそがしい", m: "Bận rộn", t: "Tính từ -i N5", pos: "adj-i", p: 4 },
  "可愛い": { r: "かわいい", m: "Dễ thương, đáng yêu", t: "Tính từ -i N4", pos: "adj-i", p: 3 },
  "綺麗": { r: "きれい", m: "Đẹp, sạch sẽ", t: "Tính từ -na N5", pos: "adj-na", p: 1 },
  "痛い": { r: "いたい", m: "Đau, nhức", t: "Tính từ -i N5", pos: "adj-i", p: 2 },
  "暑い": { r: "あつい", m: "Nóng (thời tiết)", t: "Tính từ -i N5", pos: "adj-i", p: 2 },
  "熱い": { r: "あつい", m: "Nóng (nhiệt độ đồ vật, nước)", t: "Tính từ -i N5", pos: "adj-i", p: 2 },
  "寒い": { r: "さむい", m: "Lạnh (thời tiết)", t: "Tính từ -i N5", pos: "adj-i", p: 2 },
  "冷たい": { r: "つめたい", m: "Lạnh (đồ vật, nước, tính cách)", t: "Tính từ -i N5", pos: "adj-i", p: 0 },
  "早い": { r: "はやい", m: "Sớm (thời gian)", t: "Tính từ -i N5", pos: "adj-i", p: 2 },
  "速い": { r: "はやい", m: "Nhanh (tốc độ)", t: "Tính từ -i N5", pos: "adj-i", p: 2 },
  "遅い": { r: "おそい", m: "Chậm chạp, muộn", t: "Tính từ -i N5", pos: "adj-i", p: 2 },
  "狭い": { r: "せまい", m: "Hẹp, chật chội", t: "Tính từ -i N5", pos: "adj-i", p: 2 },
  "広い": { r: "ひろい", m: "Rộng rãi", t: "Tính từ -i N5", pos: "adj-i", p: 2 },
  "暗い": { r: "くらい", m: "Tối tăm, u ám", t: "Tính từ -i N5", pos: "adj-i", p: 0 },
  "明るい": { r: "あかるい", m: "Sáng sủa, tươi vui", t: "Tính từ -i N5", pos: "adj-i", p: 0 },

  // Thành ngữ 4 chữ (Yojijukugo) & Cụm quán ngữ tiếng Nhật
  "一期一会": { r: "いちごいちえ", m: "Nhất kỳ nhất hội: Đời người chỉ gặp một lần, hãy trân trọng khoảnh khắc", t: "Thành ngữ 4 chữ", pos: "exp,yoji", p: 0 },
  "手に入れる": { r: "てにいれる", m: "Đạt được, sở hữu trong tay", t: "Cụm quán ngữ", pos: "exp", p: 0 },
  "気にする": { r: "きにする", m: "Để ý, bận tâm, lo nghĩ", t: "Cụm quán ngữ", pos: "exp", p: 0 },
  "気になる": { r: "きになる", m: "Tò mò, lo lắng, băn khoăn", t: "Cụm quán ngữ", pos: "exp", p: 0 },
  "役に立つ": { r: "やくにたつ", m: "Có ích, hữu dụng", t: "Cụm quán ngữ", pos: "exp", p: 0 },
  "世話をする": { r: "せわをする", m: "Chăm sóc, giúp đỡ", t: "Cụm quán ngữ", pos: "exp", p: 0 },
  "思い切って": { r: "おもいきって", m: "Dứt khoát, quyết tâm, đánh bạo làm", t: "Phó từ quán ngữ", pos: "adv", p: 3 },
  "言うまでもない": { r: "いうまでもない", m: "Không cần phải nói cũng biết, dĩ nhiên", t: "Cụm quán ngữ", pos: "exp", p: 0 },
  "お疲れ様": { r: "おつかれさま", m: "Bạn đã vất vả rồi (lời chào sau giờ làm việc)", t: "Chào hỏi thông dụng", pos: "exp", p: 0 },
  "お世話になります": { r: "おせわになります", m: "Cảm ơn vì đã luôn chiếu cố, giúp đỡ", t: "Kính ngữ thông dụng", pos: "exp", p: 0 },
  "よろしくお願いいたします": { r: "よろしくおねがいいたします", m: "Rất mong nhận được sự giúp đỡ của quý vị (kính ngữ cao)", t: "Kính ngữ thông dụng", pos: "exp", p: 0 },

  // Từ lặp chữ Hán (Rendaku - Biến âm lặp từ 々)
  "人々": { r: "ひとびと", speechText: "ひとびと", m: "Mọi người, con người, quần chúng", t: "Danh từ N4", pos: "n", p: 2 },
  "日々": { r: "ひび", speechText: "ひび", m: "Mỗi ngày, ngày qua ngày, chuỗi ngày", t: "Danh từ N3", pos: "n", p: 1 },
  "島々": { r: "しまじま", speechText: "しまじま", m: "Các hòn đảo, quần đảo", t: "Danh từ N3", pos: "n", p: 2 },
  "国々": { r: "くにぐに", speechText: "くにぐに", m: "Các quốc gia, các nước", t: "Danh từ N3", pos: "n", p: 2 },
  "木々": { r: "きぎ", speechText: "きぎ", m: "Các hàng cây, cây cối", t: "Danh từ N3", pos: "n", p: 1 },
  "様々": { r: "さまざま", speechText: "さまざま", m: "Đa dạng, phong phú, nhiều vẻ", t: "Tính từ -na N4", pos: "adj-na,n", p: 2 },
  "近々": { r: "ちかぢか", speechText: "ちかぢか", m: "Sắp tới, trong tương lai gần", t: "Phó từ N3", pos: "adv", p: 1 },
  "山々": { r: "やまやま", speechText: "やまやま", m: "Các dãy núi, nhiều núi / Rất muốn (yếu tố tâm lý)", t: "Danh từ N3", pos: "n", p: 2 },
  "色々": { r: "いろいろ", speechText: "いろいろ", m: "Nhiều loại, phong phú, đủ thứ", t: "Tính từ -na N5", pos: "adj-na,adv", p: 0 },

  // Từ nghi vấn và Lượng từ đặc biệt thường gặp
  "何人": { r: "なんにん", speechText: "なんにん", m: "Mấy người? (Đọc là [なんにん] khi hỏi số lượng người; đọc là [なにじん] khi hỏi quốc tịch)", t: "Nghi vấn từ N5", pos: "num", p: 1 },
  "何時": { r: "なんじ", speechText: "なんじ", m: "Mấy giờ?", t: "Nghi vấn từ N5", pos: "num", p: 1 },
  "何分": { r: "なんぷん", speechText: "なんぷん", m: "Mấy phút?", t: "Nghi vấn từ N5", pos: "num", p: 1 },
  "何月": { r: "なんがつ", speechText: "なんがつ", m: "Tháng mấy?", t: "Nghi vấn từ N5", pos: "num", p: 1 },
  "何日": { r: "なんにち", speechText: "なんにち", m: "Ngày mấy? Mấy ngày?", t: "Nghi vấn từ N5", pos: "num", p: 1 },
  "何年": { r: "なんねん", speechText: "なんねん", m: "Năm mấy? Mấy năm?", t: "Nghi vấn từ N5", pos: "num", p: 1 },
  "何歳": { r: "なんさい", speechText: "なんさい", m: "Mấy tuổi?", t: "Nghi vấn từ N5", pos: "num", p: 1 },
  "一日": { r: "ついたち", speechText: "ついたち", m: "Ngày mùng 1 đầu tháng (Đọc [ついたち]); Khoảng thời gian 1 ngày (Đọc [いちにち])", t: "Danh từ / Số từ N5", pos: "n,num", p: 4 },
  "一人": { r: "ひとり", speechText: "ひとり", m: "1 người, một mình (Đặc biệt thuần Nhật)", t: "Số từ N5", pos: "n,num", p: 2 },
  "二人": { r: "ふたり", speechText: "ふたり", m: "2 người, hai người (Đặc biệt thuần Nhật)", t: "Số từ N5", pos: "n,num", p: 3 },
  "四人": { r: "よにん", speechText: "よにん", m: "4 người (Đọc chuẩn là [よにん])", t: "Số từ N5", pos: "num", p: 2 },
  "二十日": { r: "はつか", speechText: "はつか", m: "Ngày 20 trong tháng (Đặc biệt: [はつか])", t: "Số từ N5", pos: "n,num", p: 0 },
  "二十歳": { r: "はたち", speechText: "はたち", m: "20 tuổi (Tuổi trưởng thành - Đặc biệt: [はたち])", t: "Số từ N5", pos: "n,num", p: 1 },

  // Các từ đa âm, từ ghép phổ biến dễ bị phát âm sai
  "何故": { r: "なぜ", speechText: "なぜ", m: "Tại sao? Vì sao?", t: "Phó từ N4", pos: "adv", p: 1 },
  "何で": { r: "なんで", speechText: "なんで", m: "Tại sao? / Bằng phương tiện gì?", t: "Phó từ N5", pos: "adv", p: 0 },
  "何と": { r: "なんと", speechText: "なんと", m: "Cái gì / Xiết bao, biết bao (thán từ)", t: "Phó từ N3", pos: "adv", p: 1 },
  "何曜日": { r: "なんようび", speechText: "なんようび", m: "Thứ mấy?", t: "Nghi vấn từ N5", pos: "num", p: 3 },
  "日本人": { r: "にほんじん", speechText: "にほんじん", m: "Người Nhật Bản", t: "Danh từ N5", pos: "n", p: 4 },
  "外国人": { r: "がいこくじん", speechText: "がいこくじん", m: "Người nước ngoài", t: "Danh từ N5", pos: "n", p: 4 },
  "アメリカ人": { r: "あめりかじん", speechText: "あめりかじん", m: "Người Mỹ", t: "Danh từ N5", pos: "n", p: 4 },
  "ベトナム人": { r: "べとなむじん", speechText: "べとなむじん", m: "Người Việt Nam", t: "Danh từ N5", pos: "n", p: 4 },
  "誕生日": { r: "たんじょうび", speechText: "たんじょうび", m: "Ngày sinh nhật", t: "Danh từ N5", pos: "n", p: 3 },
  "生ビール": { r: "なまビール", speechText: "なまビール", m: "Bia tươi", t: "Danh từ N4", pos: "n", p: 3 },
  "一方": { r: "いっぽう", speechText: "いっぽう", m: "Một mặt, một phía / Ngày càng", t: "Danh từ N3", pos: "n,adv", p: 0 },
  "味方": { r: "みかた", speechText: "みかた", m: "Đồng minh, người cùng phe", t: "Danh từ N3", pos: "n", p: 0 },
  "あの方": { r: "あのかた", speechText: "あのかた", m: "Vị ấy, ngài ấy (kính ngữ của あの人)", t: "Đại từ N5", pos: "pn", p: 0 },
  "読み方": { r: "よみかた", speechText: "よみかた", m: "Cách đọc, cách phát âm", t: "Danh từ N5", pos: "n", p: 3 },
  "書き方": { r: "かきかた", speechText: "かきかた", m: "Cách viết", t: "Danh từ N5", pos: "n", p: 3 },
  "使い方": { r: "つかいかた", speechText: "つかいかた", m: "Cách dùng, cách sử dụng", t: "Danh từ N5", pos: "n", p: 3 },
  "見方": { r: "みかた", speechText: "みかた", m: "Cách nhìn, quan điểm", t: "Danh từ N3", pos: "n", p: 3 },
  "話し方": { r: "はなしかた", speechText: "はなしかた", m: "Cách nói chuyện", t: "Danh từ N4", pos: "n", p: 3 },
  "作り方": { r: "つくりかた", speechText: "つくりかた", m: "Cách làm, cách nấu", t: "Danh từ N5", pos: "n", p: 3 },
  "やり方": { r: "やりかた", speechText: "やりかた", m: "Cách làm, phương pháp", t: "Danh từ N4", pos: "n", p: 0 },
  "食べ物": { r: "たべもの", speechText: "たべもの", m: "Đồ ăn, thức ăn", t: "Danh từ N5", pos: "n", p: 3 },
  "飲み物": { r: "のみもの", speechText: "のみもの", m: "Đồ uống, nước giải khát", t: "Danh từ N5", pos: "n", p: 2 },
  "買い物": { r: "かいもの", speechText: "かいもの", m: "Mua sắm", t: "Danh từ N5", pos: "n", p: 0 },
  "乗り物": { r: "のりもの", speechText: "のりもの", m: "Phương tiện giao thông", t: "Danh từ N4", pos: "n", p: 0 },
  "一生": { r: "いっしょう", speechText: "いっしょう", m: "Cả đời, một đời", t: "Danh từ N3", pos: "n,adv", p: 0 },
  "半分": { r: "はんぶん", speechText: "はんぶん", m: "Một nửa", t: "Danh từ N5", pos: "n", p: 0 },
  "素人": { r: "しろうと", speechText: "しろうと", m: "Người nghiệp dư, chưa có kinh nghiệm", t: "Danh từ N3", pos: "n", p: 1 },
  "玄人": { r: "くろうと", speechText: "くろうと", m: "Chuyên gia, người trong nghề", t: "Danh từ N1", pos: "n", p: 1 },
  "人気": { r: "にんき", speechText: "にんき", m: "Được yêu thích, nổi tiếng", t: "Danh từ N4", pos: "n,adj-na", p: 0 },
  "行列": { r: "ぎょうれつ", speechText: "ぎょうれつ", m: "Hàng người, đám rước", t: "Danh từ N3", pos: "n", p: 0 }
};

// Gộp từ vựng mở rộng vào từ điển chính
Object.assign(JP_DICTIONARY, JP_DICTIONARY_EXTENSIONS);

if (typeof JP_DICTIONARY_EXPANDED !== 'undefined') {
  Object.assign(JP_DICTIONARY, JP_DICTIONARY_EXPANDED);
} else if (typeof require !== 'undefined') {
  try {
    const ext = require('./dictionary_expanded.js');
    if (ext && ext.JP_DICTIONARY_EXPANDED) {
      Object.assign(JP_DICTIONARY, ext.JP_DICTIONARY_EXPANDED);
    }
  } catch (_) {}
}

// 3. Xây dựng Bảng Chỉ mục Tra chéo Kana -> Kanji (Bidirectional Reading Index)
const READING_TO_WORDS_MAP = new Map();

function buildReadingIndex() {
  for (const [w, item] of Object.entries(JP_DICTIONARY)) {
    if (item && item.r && item.r !== w) {
      if (!READING_TO_WORDS_MAP.has(item.r)) {
        READING_TO_WORDS_MAP.set(item.r, []);
      }
      READING_TO_WORDS_MAP.get(item.r).push(w);
    }
  }
}
buildReadingIndex();

// Bộ nhớ đệm tra cứu nhanh LRU Cache
const LOOKUP_CACHE = new Map();

/**
 * Tìm kiếm mục từ điển theo từ viết bằng Kanji hoặc đọc bằng Kana
 */
function findDictionaryEntry(text) {
  if (JP_DICTIONARY[text]) {
    return { baseWord: text, item: JP_DICTIONARY[text], isKanaMatch: false };
  }
  if (READING_TO_WORDS_MAP.has(text)) {
    const kanjiKey = READING_TO_WORDS_MAP.get(text)[0];
    return { baseWord: kanjiKey, item: JP_DICTIONARY[kanjiKey], isKanaMatch: true };
  }
  return null;
}

/**
 * Tính toán cách đọc Furigana / Kana chính xác cho từ bề mặt sau khi biến hình chia đuôi (Surface Reading)
 * Tránh lỗi hiển thị thể nguyên mẫu (như [起きます] bị hiển thị nhầm thành [おきる] thay vì [おきます])
 * @param {string} surfaceWord Từ đang hiển thị trên web (ví dụ: 起きます, 食べた, 美しかった, 連れて来ます)
 * @param {string} baseWord Từ gốc nguyên mẫu (ví dụ: 起きる, 食べる, 美しい, 連れて来る)
 * @param {string} baseReading Cách đọc từ gốc (ví dụ: おきる, たべる, うつくしい, つれてくる)
 * @returns {string} Cách đọc chính xác của từ bề mặt (ví dụ: おきます, たべた, うつくしかった, つれてきます)
 */
/**
 * Tách và căn chỉnh cách đọc Kana tương ứng cho từng khối Kanji trong từ gốc
 * Dựa trên các mỏ neo Hiragana (Okurigana) bất biến
 */
function alignKanjiReading(baseWord, baseReading) {
  const blocks = [];
  let i = 0;
  while (i < baseWord.length) {
    const isK = /[一-龯]/.test(baseWord[i]);
    let j = i + 1;
    while (j < baseWord.length && (/[一-龯]/.test(baseWord[j]) === isK)) {
      j++;
    }
    blocks.push({ text: baseWord.slice(i, j), isKanji: isK });
    i = j;
  }

  // Nếu baseWord gồm 1 Kanji block và 1 Kana block ở cuối (ví dụ: 良い, 食べる, 行く, 美しい...)
  if (blocks.length === 2 && blocks[0].isKanji && !blocks[1].isKanji) {
    const okurigana = blocks[1].text;
    if (baseReading.endsWith(okurigana)) {
      blocks[0].reading = baseReading.slice(0, baseReading.length - okurigana.length);
      blocks[1].reading = okurigana;
      const m = new Map();
      m.set(blocks[0].text, blocks[0].reading);
      return m;
    }
  }

  // Căn chỉnh 2 đầu (Right-to-Left cho Okurigana đuôi và Left-to-Right cho tiền tố)
  let rEnd = baseReading.length;
  let bEnd = blocks.length - 1;
  while (bEnd >= 0 && !blocks[bEnd].isKanji) {
    const ok = blocks[bEnd].text;
    if (baseReading.slice(0, rEnd).endsWith(ok)) {
      blocks[bEnd].reading = ok;
      rEnd -= ok.length;
      bEnd--;
    } else {
      break;
    }
  }

  let rStart = 0;
  let bStart = 0;
  while (bStart <= bEnd && !blocks[bStart].isKanji) {
    const pre = blocks[bStart].text;
    if (baseReading.slice(rStart, rEnd).startsWith(pre)) {
      blocks[bStart].reading = pre;
      rStart += pre.length;
      bStart++;
    } else {
      break;
    }
  }

  if (bStart === bEnd && blocks[bStart].isKanji) {
    blocks[bStart].reading = baseReading.slice(rStart, rEnd);
  } else {
    let rIdx = rStart;
    for (let b = bStart; b <= bEnd; b++) {
      const block = blocks[b];
      if (!block.isKanji) {
        const foundPos = baseReading.lastIndexOf(block.text, rEnd);
        if (foundPos !== -1 && foundPos >= rIdx) {
          if (b > bStart && blocks[b - 1].isKanji && !blocks[b - 1].reading) {
            blocks[b - 1].reading = baseReading.slice(rIdx, foundPos);
          }
          block.reading = block.text;
          rIdx = foundPos + block.text.length;
        }
      } else if (b === bEnd) {
        block.reading = baseReading.slice(rIdx, rEnd);
      }
    }
  }

  const kanjiMap = new Map();
  for (const b of blocks) {
    if (b.isKanji && b.reading) {
      kanjiMap.set(b.text, b.reading);
    }
  }
  return kanjiMap;
}

/**
 * Tính toán cách đọc Furigana / Kana chính xác cho từ bề mặt sau khi biến hình chia đuôi (Surface Reading)
 * Tránh lỗi hiển thị thể nguyên mẫu (như [起きます] bị hiển thị nhầm thành [おきる] thay vì [おきます])
 * @param {string} surfaceWord Từ đang hiển thị trên web (ví dụ: 連れてって, 立ち上がった, 食べた, 美しかった)
 * @param {string} baseWord Từ gốc nguyên mẫu (ví dụ: 連れて行く, 立ち上がる, 食べる, 美しい)
 * @param {string} baseReading Cách đọc từ gốc (ví dụ: つれていく, たちあがる, たべる, うつくしい)
 * @returns {string} Cách đọc chính xác của từ bề mặt (ví dụ: つれてって, たちあがった, たべた, うつくしかった)
 */
function computeSurfaceReading(surfaceWord, baseWord, baseReading) {
  if (!surfaceWord || !baseWord || !baseReading) return baseReading || surfaceWord || '';
  if (surfaceWord === baseWord) return baseReading;
  if (/^[\u3040-\u309Fー]+$/.test(surfaceWord)) return surfaceWord;

  // Xử lý động từ đặc biệt 来る (kuru / ki / ko)
  let workingSurface = surfaceWord;
  if (baseWord === '来る' || baseWord.endsWith('来る')) {
    if (/来(ま|た|て|ち)/.test(workingSurface)) {
      workingSurface = workingSurface.replace(/来/g, 'き');
    } else if (/来(な|よ|ら|さ|せ)/.test(workingSurface)) {
      workingSurface = workingSurface.replace(/来/g, 'こ');
    } else {
      workingSurface = workingSurface.replace(/来/g, 'く');
    }
  }

  // Căn chỉnh Kanji và bóc tách thay thế chính xác từng chữ Hán
  const kanjiMap = alignKanjiReading(baseWord, baseReading);
  let res = workingSurface;
  for (const [kText, kReading] of kanjiMap.entries()) {
    res = res.split(kText).join(kReading);
  }

  // Fallback: nếu vẫn còn Kanji chưa chuyển đổi (ví dụ cụm từ đặc biệt)
  if (/[一-龯]/.test(res)) {
    let commonPrefixLen = 0;
    while (commonPrefixLen < surfaceWord.length && commonPrefixLen < baseWord.length && surfaceWord[commonPrefixLen] === baseWord[commonPrefixLen]) {
      commonPrefixLen++;
    }
    const baseSuffix = baseWord.slice(commonPrefixLen);
    const surfaceSuffix = surfaceWord.slice(commonPrefixLen);
    if (baseReading.endsWith(baseSuffix) && baseSuffix.length > 0) {
      const readingStem = baseReading.slice(0, baseReading.length - baseSuffix.length);
      return readingStem + surfaceSuffix;
    }
  }

  return res;
}

/**
 * Tra từ điển tiếng Nhật với giải thuật De-inflection Đệ quy Đa tầng (Recursive Multi-pass BFS)
 * @param {string} word 
 * @returns {object|null} { word, baseWord, reading, baseReading, meaning, type, pos, pitch, grammarTags, grammarForm }
 */
function lookupJapaneseWord(word) {
  if (!word || typeof word !== 'string') return null;
  const cleanWord = word.trim();
  if (!cleanWord) return null;

  if (LOOKUP_CACHE.has(cleanWord)) {
    return LOOKUP_CACHE.get(cleanWord);
  }

  // 1. Khớp từ điển trực tiếp (Kanji hoặc Kana)
  const direct = findDictionaryEntry(cleanWord);
  if (direct) {
    const result = {
      word: cleanWord,
      baseWord: direct.baseWord,
      reading: direct.item.r,
      baseReading: direct.item.r,
      meaning: direct.item.m,
      type: direct.item.t,
      pos: direct.item.pos || '',
      pitch: typeof direct.item.p !== 'undefined' ? direct.item.p : null,
      grammarTags: [],
      grammarForm: 'Nguyên mẫu (辞書形)'
    };
    cacheLookup(cleanWord, result);
    return result;
  }

  // 2. Tra cứu đệ quy BFS qua cây biến hình ngữ pháp (tối đa 4 tầng de-inflection)
  const queue = [{ text: cleanWord, tags: [], forms: [], depth: 0 }];
  const visited = new Set([cleanWord]);

  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur.depth >= 4) continue;

    for (const rule of GRAMMAR_DEINFLECT_PATTERNS) {
      if (cur.text.endsWith(rule.suffix)) {
        const stem = cur.text.slice(0, -rule.suffix.length);
        for (const rep of rule.replace) {
          const candidate = stem + rep;
          if (visited.has(candidate)) continue;
          visited.add(candidate);

          const nextTags = [...cur.tags, rule.tag];
          const nextForms = [...cur.forms, rule.form];

          const found = findDictionaryEntry(candidate);
          if (found) {
            const surfaceReading = computeSurfaceReading(cleanWord, found.baseWord, found.item.r);
            const result = {
              word: cleanWord,
              baseWord: found.baseWord,
              reading: surfaceReading,
              baseReading: found.item.r,
              meaning: `[Gốc: ${found.baseWord}]: ${found.item.m}`,
              type: found.item.t,
              pos: found.item.pos || '',
              pitch: typeof found.item.p !== 'undefined' ? found.item.p : null,
              grammarTags: nextTags,
              grammarForm: nextForms.join(' + ')
            };
            cacheLookup(cleanWord, result);
            return result;
          }

          if (cur.depth + 1 < 4) {
            queue.push({
              text: candidate,
              tags: nextTags,
              forms: nextForms,
              depth: cur.depth + 1
            });
          }
        }
      }
    }
  }

  cacheLookup(cleanWord, null);
  return null;
}

function cacheLookup(word, result) {
  if (LOOKUP_CACHE.size > 500) {
    const oldest = LOOKUP_CACHE.keys().next().value;
    LOOKUP_CACHE.delete(oldest);
  }
  LOOKUP_CACHE.set(word, result);
}

// Xuất ra môi trường
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { JP_DICTIONARY, lookupJapaneseWord, GRAMMAR_DEINFLECT_PATTERNS, READING_TO_WORDS_MAP, computeSurfaceReading };
}

