// Bảng tra cứu Âm Hán-Việt & Âm On/Kun toàn diện cho Kanji (Toàn bộ 2.136 Joyo Kanji & Thường dụng)
// Hỗ trợ bóc tách từng chữ Hán trong từ ghép (Kanji Decomposition)

const KANJI_DATA = {
  "大": {
    "hv": "ĐẠI",
    "on": "ダイ, タイ",
    "kun": "おお, おお・きい, おお・いに",
    "m": "To lớn, vĩ đại, quan trọng"
  },
  "小": {
    "hv": "TIỂU",
    "on": "ショウ",
    "kun": "ちい・さい, こ, お",
    "m": "Nhỏ bé, ít ỏi"
  },
  "中": {
    "hv": "TRUNG",
    "on": "チュウ",
    "kun": "なか",
    "m": "Trong, giữa, trung tâm"
  },
  "長": {
    "hv": "TRƯỜNG",
    "on": "チョウ",
    "kun": "なが・い, おさ",
    "m": "Dài, trưởng, đứng đầu"
  },
  "短": {
    "hv": "ĐOẢN",
    "on": "タン",
    "kun": "みじか・い",
    "m": "Ngắn, đoản"
  },
  "高": {
    "hv": "CAO",
    "on": "コウ",
    "kun": "たか・い, たか・まる",
    "m": "Cao, đắt tiền"
  },
  "低": {
    "hv": "ĐÊ",
    "on": "テイ",
    "kun": "ひく・い, ひく・める",
    "m": "Thấp, kém"
  },
  "多": {
    "hv": "ĐA",
    "on": "タ",
    "kun": "おお・い",
    "m": "Nhiều, đa dạng"
  },
  "少": {
    "hv": "THIỂU",
    "on": "ショウ",
    "kun": "すく・ない, すこ・し",
    "m": "Ít, một chút"
  },
  "新": {
    "hv": "TÂN",
    "on": "シン",
    "kun": "あたら・しい, あら・た",
    "m": "Mới, mới mẻ"
  },
  "古": {
    "hv": "CỔ",
    "on": "コ",
    "kun": "ふる・い",
    "m": "Cũ, cổ kính"
  },
  "安": {
    "hv": "AN",
    "on": "アン",
    "kun": "やす・い",
    "m": "Rẻ, an toàn, yên ổn"
  },
  "重": {
    "hv": "TRỌNG",
    "on": "ジュウ, チョウ",
    "kun": "おも・い, かさ・なる",
    "m": "Nặng, quan trọng, chồng chất"
  },
  "軽": {
    "hv": "KHINH",
    "on": "ケイ",
    "kun": "かる・い",
    "m": "Nhẹ, nhẹ nhàng"
  },
  "早": {
    "hv": "TẢO",
    "on": "ソウ, サッ",
    "kun": "はや・い",
    "m": "Sớm, nhanh"
  },
  "速": {
    "hv": "TỐC",
    "on": "ソク",
    "kun": "はや・い",
    "m": "Nhanh chóng, tốc độ"
  },
  "遅": {
    "hv": "TRÌ",
    "on": "チ",
    "kun": "おそ・い,おく・れる",
    "m": "Chậm, muộn"
  },
  "広": {
    "hv": "QUẢNG",
    "on": "コウ",
    "kun": "ひろ・い",
    "m": "Rộng, rộng rãi"
  },
  "狭": {
    "hv": "HIỆP",
    "on": "キョウ",
    "kun": "せま・い",
    "m": "Hẹp"
  },
  "明": {
    "hv": "MINH",
    "on": "メイ, ミョウ",
    "kun": "あか・るい, あ・ける",
    "m": "Sáng sủa, rõ ràng"
  },
  "暗": {
    "hv": "ÁM",
    "on": "アン",
    "kun": "くら・い",
    "m": "Tối, u ám"
  },
  "良": {
    "hv": "LƯƠNG",
    "on": "リョウ",
    "kun": "よ・い, い・い",
    "m": "Tốt, đẹp, lương thiện"
  },
  "悪": {
    "hv": "ÁC",
    "on": "アク, オ",
    "kun": "わる・い",
    "m": "Xấu, ác, tồi tệ"
  },
  "美": {
    "hv": "MỸ",
    "on": "ビ, ミ",
    "kun": "うつく・しい",
    "m": "Đẹp, mỹ lệ"
  },
  "正": {
    "hv": "CHÍNH",
    "on": "セイ, ショウ",
    "kun": "ただ・しい, まさ",
    "m": "Đúng đắn, chính xác"
  },
  "難": {
    "hv": "NAN",
    "on": "ナン",
    "kun": "むずか・しい",
    "m": "Khó khăn, gian nan"
  },
  "易": {
    "hv": "DỊ",
    "on": "エキ, イ",
    "kun": "やさ・しい",
    "m": "Dễ dàng, đơn giản"
  },
  "強": {
    "hv": "CƯỜNG",
    "on": "キョウ, ゴウ",
    "kun": "つよ・い",
    "m": "Mạnh mẽ, kiên cường"
  },
  "弱": {
    "hv": "NHƯỢC",
    "on": "ジャク",
    "kun": "よわ・い",
    "m": "Yếu ớt"
  },
  "静": {
    "hv": "TĨNH",
    "on": "セイ, ジョウ",
    "kun": "しず・か",
    "m": "Yên tĩnh, thanh tịnh"
  },
  "忙": {
    "hv": "MANG",
    "on": "ボウ",
    "kun": "いそが・しい",
    "m": "Bận rộn"
  },
  "一": {
    "hv": "NHẤT",
    "on": "イチ, イツ",
    "kun": "ひと, ひと・つ",
    "m": "Một, đầu tiên"
  },
  "二": {
    "hv": "NHỊ",
    "on": "ニ, ジ",
    "kun": "ふた, ふた・つ",
    "m": "Hai"
  },
  "三": {
    "hv": "TAM",
    "on": "サン",
    "kun": "み, み・つ",
    "m": "Ba"
  },
  "四": {
    "hv": "TỨ",
    "on": "シ",
    "kun": "よ, よ・つ, よん",
    "m": "Bốn"
  },
  "五": {
    "hv": "NGŨ",
    "on": "ゴ",
    "kun": "いつ, いつ・つ",
    "m": "Năm"
  },
  "六": {
    "hv": "LỤC",
    "on": "ロク",
    "kun": "む, む・つ",
    "m": "Sáu"
  },
  "七": {
    "hv": "THẤT",
    "on": "シチ",
    "kun": "なな, なな・つ",
    "m": "Bảy"
  },
  "八": {
    "hv": "BÁT",
    "on": "ハチ",
    "kun": "や, や・つ",
    "m": "Tám"
  },
  "九": {
    "hv": "CỬU",
    "on": "キュウ, ク",
    "kun": "ここの, ここの・つ",
    "m": "Chín"
  },
  "十": {
    "hv": "THẬP",
    "on": "ジュウ, ジッ",
    "kun": "とお, と",
    "m": "Mười"
  },
  "百": {
    "hv": "BÁCH",
    "on": "ヒャク",
    "kun": "もも",
    "m": "Trăm"
  },
  "千": {
    "hv": "THIÊN",
    "on": "セン",
    "kun": "ち",
    "m": "Nghìn"
  },
  "万": {
    "hv": "VẠN",
    "on": "マン, バン",
    "kun": "",
    "m": "Mười nghìn, vô số"
  },
  "億": {
    "hv": "ỨC",
    "on": "オク",
    "kun": "",
    "m": "Trăm triệu"
  },
  "円": {
    "hv": "VIÊN",
    "on": "エン",
    "kun": "まる・い",
    "m": "Tròn, đồng Yên"
  },
  "年": {
    "hv": "NIÊN",
    "on": "ネン",
    "kun": "とし",
    "m": "Năm, tuổi"
  },
  "月": {
    "hv": "NGUYỆT",
    "on": "ゲツ, ガツ",
    "kun": "つき",
    "m": "Mặt trăng, tháng"
  },
  "日": {
    "hv": "NHẬT",
    "on": "ニチ, ジツ",
    "kun": "ひ, か",
    "m": "Mặt trời, ngày, nước Nhật"
  },
  "時": {
    "hv": "THỜI",
    "on": "ジ",
    "kun": "とき",
    "m": "Thời gian, giờ"
  },
  "分": {
    "hv": "PHÂN",
    "on": "フン, ブン, ブ",
    "kun": "わ・ける, わ・かる",
    "m": "Phút, phân chia, hiểu"
  },
  "秒": {
    "hv": "GIÂY",
    "on": "ビョウ",
    "kun": "",
    "m": "Giây"
  },
  "週": {
    "hv": "CHU",
    "on": "シュウ",
    "kun": "",
    "m": "Tuần lễ"
  },
  "曜": {
    "hv": "DIỆU",
    "on": "ヨウ",
    "kun": "",
    "m": "Thứ trong tuần"
  },
  "今": {
    "hv": "KIM",
    "on": "コン, キン",
    "kun": "いま",
    "m": "Bây giờ, hiện tại"
  },
  "昨": {
    "hv": "TÁC",
    "on": "サク",
    "kun": "",
    "m": "Hôm qua, trước đây"
  },
  "先": {
    "hv": "TIÊN",
    "on": "セン",
    "kun": "さき",
    "m": "Trước, đi trước, giáo viên"
  },
  "来": {
    "hv": "LAI",
    "on": "ライ",
    "kun": "く・る",
    "m": "Đến"
  },
  "毎": {
    "hv": "MỖI",
    "on": "マイ",
    "kun": "ごと",
    "m": "Mỗi, từng"
  },
  "前": {
    "hv": "TIỀN",
    "on": "ゼン",
    "kun": "まえ",
    "m": "Trước, phía trước"
  },
  "後": {
    "hv": "HẬU",
    "on": "ゴ, コウ",
    "kun": "のち, うし・ろ, あと",
    "m": "Sau, phía sau"
  },
  "午": {
    "hv": "NGỌ",
    "on": "ゴ",
    "kun": "",
    "m": "Buổi trưa, giờ Ngọ"
  },
  "朝": {
    "hv": "TRIÊU",
    "on": "チョウ",
    "kun": "あさ",
    "m": "Buổi sáng"
  },
  "昼": {
    "hv": "TRÚ",
    "on": "チュウ",
    "kun": "ひる",
    "m": "Ban ngày, buổi trưa"
  },
  "夜": {
    "hv": "DẠ",
    "on": "ヤ",
    "kun": "よ, よる",
    "m": "Ban đêm, tối"
  },
  "晩": {
    "hv": "VÃN",
    "on": "バン",
    "kun": "",
    "m": "Buổi tối"
  },
  "夕": {
    "hv": "TỊCH",
    "on": "セキ",
    "kun": "ゆう",
    "m": "Chiều tối, hoàng hôn"
  },
  "春": {
    "hv": "XUÂN",
    "on": "シュン",
    "kun": "はる",
    "m": "Mùa xuân"
  },
  "夏": {
    "hv": "HẠ",
    "on": "カ, ゲ",
    "kun": "なつ",
    "m": "Mùa hè"
  },
  "秋": {
    "hv": "THU",
    "on": "シュウ",
    "kun": "あき",
    "m": "Mùa thu"
  },
  "冬": {
    "hv": "ĐÔNG",
    "on": "トウ",
    "kun": "ふゆ",
    "m": "Mùa đông"
  },
  "天": {
    "hv": "THIÊN",
    "on": "テン",
    "kun": "あめ, あま",
    "m": "Trời, thiên đàng, thời tiết"
  },
  "気": {
    "hv": "KHÍ",
    "on": "キ, ケ",
    "kun": "",
    "m": "Khí hậu, tinh thần, tâm trạng"
  },
  "雨": {
    "hv": "VŨ",
    "on": "ウ",
    "kun": "あめ, あま",
    "m": "Mưa"
  },
  "雪": {
    "hv": "TUYẾT",
    "on": "セツ",
    "kun": "ゆき",
    "m": "Tuyết"
  },
  "風": {
    "hv": "PHONG",
    "on": "フウ, フ",
    "kun": "かぜ",
    "m": "Gió, phong cách"
  },
  "空": {
    "hv": "KHÔNG",
    "on": "クウ",
    "kun": "そら, あ・く, から",
    "m": "Bầu trời, trống rỗng"
  },
  "山": {
    "hv": "SƠN",
    "on": "サン, セン",
    "kun": "やま",
    "m": "Núi"
  },
  "川": {
    "hv": "XUYÊN",
    "on": "セン",
    "kun": "かわ",
    "m": "Sông"
  },
  "海": {
    "hv": "HẢI",
    "on": "カイ",
    "kun": "うみ",
    "m": "Biển"
  },
  "花": {
    "hv": "HOA",
    "on": "カ, ケ",
    "kun": "はな",
    "m": "Bông hoa"
  },
  "木": {
    "hv": "MỘC",
    "on": "ボク, モク",
    "kun": "き, こ",
    "m": "Cây cối, gỗ"
  },
  "人": {
    "hv": "NHÂN",
    "on": "ジン, ニン",
    "kun": "ひと",
    "m": "Người, nhân loại"
  },
  "男": {
    "hv": "NAM",
    "on": "ダン, ナン",
    "kun": "おとこ",
    "m": "Đàn ông, con trai"
  },
  "女": {
    "hv": "NỮ",
    "on": "ジョ, ニョ",
    "kun": "おんな, め",
    "m": "Phụ nữ, con gái"
  },
  "子": {
    "hv": "TỬ",
    "on": "シ, ス",
    "kun": "こ",
    "m": "Con cái, đứa trẻ"
  },
  "父": {
    "hv": "PHỤ",
    "on": "フ",
    "kun": "ちち, とう",
    "m": "Bố, cha"
  },
  "母": {
    "hv": "MẪU",
    "on": "ボ",
    "kun": "はは, かあ",
    "m": "Mẹ"
  },
  "友": {
    "hv": "HỮU",
    "on": "ユウ",
    "kun": "とも",
    "m": "Bạn bè, thân hữu"
  },
  "私": {
    "hv": "TƯ",
    "on": "シ",
    "kun": "わたくし, わたし",
    "m": "Tôi, cá nhân"
  },
  "誰": {
    "hv": "THÙY",
    "on": "スイ",
    "kun": "だれ",
    "m": "Ai, người nào"
  },
  "何": {
    "hv": "HÀ",
    "on": "カ",
    "kun": "なに, なん",
    "m": "Cái gì, hà cớ"
  },
  "学": {
    "hv": "HỌC",
    "on": "ガク",
    "kun": "まな・ぶ",
    "m": "Học tập, trường học, khoa học"
  },
  "校": {
    "hv": "HIỆU",
    "on": "コウ",
    "kun": "",
    "m": "Trường học, hiệu đính"
  },
  "生": {
    "hv": "SINH",
    "on": "セイ, ショウ",
    "kun": "い・きる, う・まれる, なま",
    "m": "Sống, sinh ra, học sinh, tươi sống"
  },
  "師": {
    "hv": "SƯ",
    "on": "シ",
    "kun": "",
    "m": "Thầy giáo, kỹ sư, bác sĩ"
  },
  "語": {
    "hv": "NGỮ",
    "on": "ゴ",
    "kun": "かた・る",
    "m": "Ngôn ngữ, từ ngữ, nói"
  },
  "言": {
    "hv": "NGÔN",
    "on": "ゲン, ゴン",
    "kun": "い・う, こと",
    "m": "Nói, lời nói"
  },
  "本": {
    "hv": "BẢN",
    "on": "ホン",
    "kun": "もと",
    "m": "Sách, nguồn gốc, Nhật Bản"
  },
  "文": {
    "hv": "VĂN",
    "on": "ブン, モン",
    "kun": "ふみ",
    "m": "Văn bản, câu cú, văn hóa"
  },
  "字": {
    "hv": "TỰ",
    "on": "ジ",
    "kun": "あざ",
    "m": "Chữ viết, ký tự"
  },
  "漢": {
    "hv": "HÁN",
    "on": "カン",
    "kun": "",
    "m": "Chữ Hán, nước Hán"
  },
  "辞": {
    "hv": "TỪ",
    "on": "ジ",
    "kun": "や・める",
    "m": "Từ điển, từ ngữ, từ chức"
  },
  "書": {
    "hv": "THƯ",
    "on": "ショ",
    "kun": "か・く",
    "m": "Viết, sách, thư từ"
  },
  "読": {
    "hv": "ĐỘC",
    "on": "ドク, トク",
    "kun": "よ・む",
    "m": "Đọc"
  },
  "聞": {
    "hv": "VĂN",
    "on": "ブン, モン",
    "kun": "き・く",
    "m": "Nghe, hỏi"
  },
  "見": {
    "hv": "KIẾN",
    "on": "ケン",
    "kun": "み・る, み・える",
    "m": "Nhìn, xem, ý kiến"
  },
  "話": {
    "hv": "THOẠI",
    "on": "ワ",
    "kun": "はな・す, はなし",
    "m": "Nói chuyện, câu chuyện"
  },
  "会": {
    "hv": "HỘI",
    "on": "カイ, エ",
    "kun": "あ・う",
    "m": "Gặp gỡ, hội họp, công ty"
  },
  "社": {
    "hv": "XÃ",
    "on": "シャ",
    "kun": "やしろ",
    "m": "Công ty, xã hội"
  },
  "員": {
    "hv": "VIÊN",
    "on": "イン",
    "kun": "",
    "m": "Thành viên, nhân viên"
  },
  "仕": {
    "hv": "SĨ",
    "on": "シ, ジ",
    "kun": "つか・える",
    "m": "Công việc, phục vụ"
  },
  "事": {
    "hv": "SỰ",
    "on": "ジ, ズ",
    "kun": "こと",
    "m": "Sự việc, công việc, sự tình"
  },
  "家": {
    "hv": "GIA",
    "on": "カ, ケ",
    "kun": "いえ, や, うち",
    "m": "Nhà, gia đình, chuyên gia"
  },
  "屋": {
    "hv": "ỐC",
    "on": "オク",
    "kun": "や",
    "m": "Căn phòng, quán, mái nhà"
  },
  "室": {
    "hv": "THẤT",
    "on": "シツ",
    "kun": "むろ",
    "m": "Căn phòng"
  },
  "店": {
    "hv": "ĐIẾM",
    "on": "テン",
    "kun": "みせ",
    "m": "Cửa hàng, quán xá"
  },
  "駅": {
    "hv": "DỊCH",
    "on": "エキ",
    "kun": "",
    "m": "Nhà ga tàu điện"
  },
  "車": {
    "hv": "XA",
    "on": "シャ",
    "kun": "くるま",
    "m": "Xe cộ, ô tô"
  },
  "電": {
    "hv": "ĐIỆN",
    "on": "デン",
    "kun": "",
    "m": "Điện, tàu điện, điện thoại"
  },
  "道": {
    "hv": "ĐẠO",
    "on": "ドウ, トウ",
    "kun": "みち",
    "m": "Con đường, đạo đức"
  },
  "路": {
    "hv": "LỘ",
    "on": "ロ",
    "kun": "じ, みち",
    "m": "Đường lộ, lối đi"
  },
  "地": {
    "hv": "ĐỊA",
    "on": "チ, ジ",
    "kun": "",
    "m": "Đất đai, địa điểm"
  },
  "所": {
    "hv": "SỞ",
    "on": "ショ",
    "kun": "ところ",
    "m": "Nơi chốn, địa điểm"
  },
  "場": {
    "hv": "TRƯỜNG",
    "on": "ジョウ",
    "kun": "ば",
    "m": "Nơi chốn, hội trường"
  },
  "物": {
    "hv": "VẬT",
    "on": "ブツ, モツ",
    "kun": "もの",
    "m": "Đồ vật, sự vật"
  },
  "食": {
    "hv": "THỰC",
    "on": "ショク, ジキ",
    "kun": "た・べる, く・う",
    "m": "Ăn, thức ăn, ẩm thực"
  },
  "飲": {
    "hv": "ẨM",
    "on": "イン",
    "kun": "の・む",
    "m": "Uống"
  },
  "買": {
    "hv": "MÃI",
    "on": "バイ",
    "kun": "か・う",
    "m": "Mua"
  },
  "売": {
    "hv": "MẠI",
    "on": "バイ",
    "kun": "う・る",
    "m": "Bán"
  },
  "行": {
    "hv": "HÀNH",
    "on": "コウ, ギョウ",
    "kun": "い・く, おこな・う",
    "m": "Đi, tiến hành, ngân hàng"
  },
  "帰": {
    "hv": "QUY",
    "on": "キ",
    "kun": "かえ・る",
    "m": "Trở về nhà"
  },
  "歩": {
    "hv": "BỘ",
    "on": "ホ, ブ",
    "kun": "ある・く",
    "m": "Đi bộ, bước"
  },
  "走": {
    "hv": "TẨU",
    "on": "ソウ",
    "kun": "はし・る",
    "m": "Chạy"
  },
  "止": {
    "hv": "CHỈ",
    "on": "シ",
    "kun": "と・まる, と・める",
    "m": "Dừng lại"
  },
  "立": {
    "hv": "LẬP",
    "on": "リツ, リュウ",
    "kun": "た・つ",
    "m": "Đứng lên, thành lập"
  },
  "座": {
    "hv": "TỌA",
    "on": "ザ",
    "kun": "すわ・る",
    "m": "Ngồi, chỗ ngồi"
  },
  "思": {
    "hv": "TƯ",
    "on": "シ",
    "kun": "おも・う",
    "m": "Suy nghĩ, cảm thấy"
  },
  "考": {
    "hv": "KHẢO",
    "on": "コウ",
    "kun": "かんが・える",
    "m": "Suy nghĩ, cân nhắc"
  },
  "知": {
    "hv": "TRI",
    "on": "チ",
    "kun": "し・る",
    "m": "Biết, nhận biết, tri thức"
  },
  "使": {
    "hv": "SỬ",
    "on": "シ",
    "kun": "つか・う",
    "m": "Sử dụng, đại sứ"
  },
  "作": {
    "hv": "TÁC",
    "on": "サク, サ",
    "kun": "つく・る",
    "m": "Làm, chế tác, sáng tác"
  },
  "持": {
    "hv": "TRÌ",
    "on": "ジ",
    "kun": "も・つ",
    "m": "Cầm, nắm, sở hữu"
  },
  "待": {
    "hv": "ĐÃI",
    "on": "タイ",
    "kun": "ま・つ",
    "m": "Chờ đợi"
  },
  "開": {
    "hv": "KHAI",
    "on": "カイ",
    "kun": "あ・ける, ひら・く",
    "m": "Mở cửa, khai mạc"
  },
  "閉": {
    "hv": "BẾ",
    "on": "ヘイ",
    "kun": "し・める, と・じる",
    "m": "Đóng lại, bế mạc"
  },
  "始": {
    "hv": "THỦY",
    "on": "シ",
    "kun": "はじ・まる, はじ・める",
    "m": "Bắt đầu, nguyên thủy"
  },
  "終": {
    "hv": "CHUNG",
    "on": "シュウ",
    "kun": "お・わる, お・える",
    "m": "Kết thúc, chung kết"
  },
  "経": {
    "hv": "KINH",
    "on": "ケイ, キョウ",
    "kun": "へ・る",
    "m": "Kinh tế, kinh nghiệm"
  },
  "済": {
    "hv": "TẾ",
    "on": "サイ, ザイ",
    "kun": "す・む",
    "m": "Kinh tế, cứu tế, xong"
  },
  "政": {
    "hv": "CHÍNH",
    "on": "セイ, ショウ",
    "kun": "まつりごと",
    "m": "Chính trị, chính phủ"
  },
  "治": {
    "hv": "TRỊ",
    "on": "ジ, チ",
    "kun": "おさ・める, なお・る",
    "m": "Chính trị, chữa lành"
  },
  "法": {
    "hv": "PHÁP",
    "on": "ホウ, ハッ",
    "kun": "",
    "m": "Pháp luật, phương pháp"
  },
  "律": {
    "hv": "LUẬT",
    "on": "リツ",
    "kun": "",
    "m": "Luật lệ, quy tắc"
  },
  "情": {
    "hv": "TÌNH",
    "on": "ジョウ, セイ",
    "kun": "なさ・け",
    "m": "Thông tin, tình cảm"
  },
  "報": {
    "hv": "BÁO",
    "on": "ホウ",
    "kun": "むく・いる",
    "m": "Báo cáo, thông báo"
  },
  "技": {
    "hv": "KĨ",
    "on": "ギ",
    "kun": "わざ",
    "m": "Kỹ thuật, tay nghề"
  },
  "術": {
    "hv": "THUẬT",
    "on": "ジュツ",
    "kun": "すべ",
    "m": "Kỹ thuật, mỹ thuật"
  },
  "科": {
    "hv": "KHOA",
    "on": "カ",
    "kun": "",
    "m": "Khoa học, chuyên khoa"
  },
  "理": {
    "hv": "LÝ",
    "on": "リ",
    "kun": "ことわり",
    "m": "Lý do, đạo lý, xử lý"
  },
  "由": {
    "hv": "DO",
    "on": "ユ, ユウ",
    "kun": "よし",
    "m": "Lý do, tự do"
  },
  "問": {
    "hv": "VẤN",
    "on": "モン",
    "kun": "と・う, と・い",
    "m": "Hỏi, câu hỏi, vấn đề"
  },
  "題": {
    "hv": "ĐỀ",
    "on": "ダイ",
    "kun": "",
    "m": "Chủ đề, vấn đề"
  },
  "答": {
    "hv": "ĐÁP",
    "on": "トウ",
    "kun": "こた・える",
    "m": "Trả lời, đáp án"
  },
  "意": {
    "hv": "Ý",
    "on": "イ",
    "kun": "",
    "m": "Ý nghĩa, chú ý, ý kiến"
  },
  "味": {
    "hv": "VỊ",
    "on": "ミ",
    "kun": "あじ",
    "m": "Ý vị, mùi vị"
  },
  "勉": {
    "hv": "MIỄN",
    "on": "ベン",
    "kun": "つと・める",
    "m": "Cố gắng, học tập"
  },
  "習": {
    "hv": "TẬP",
    "on": "シュウ",
    "kun": "なら・う",
    "m": "Học tập, tập quán"
  },
  "練": {
    "hv": "LUYỆN",
    "on": "レン",
    "kun": "ね・る",
    "m": "Luyện tập, rèn luyện"
  },
  "研": {
    "hv": "NGHIÊN",
    "on": "ケン",
    "kun": "と・ぐ",
    "m": "Nghiên cứu"
  },
  "究": {
    "hv": "CỨU",
    "on": "キュウ",
    "kun": "きわ・める",
    "m": "Nghiên cứu sâu"
  },
  "発": {
    "hv": "PHÁT",
    "on": "ハツ, ホツ",
    "kun": "",
    "m": "Phát triển, xuất phát"
  },
  "保": {
    "hv": "BẢO",
    "on": "ホ",
    "kun": "たも・つ",
    "m": "Bảo vệ, bảo hiểm"
  },
  "護": {
    "hv": "HỘ",
    "on": "ゴ",
    "kun": "",
    "m": "Bảo hộ, che chở"
  },
  "環": {
    "hv": "HOÀN",
    "on": "カン",
    "kun": "わ",
    "m": "Môi trường, tuần hoàn"
  },
  "境": {
    "hv": "CẢNH",
    "on": "キョウ, ケイ",
    "kun": "さかい",
    "m": "Môi trường, ranh giới"
  },
  "自": {
    "hv": "TỰ",
    "on": "ジ, シ",
    "kun": "みずか・ら",
    "m": "Tự mình, tự do"
  },
  "然": {
    "hv": "NHIÊN",
    "on": "ゼン, ネン",
    "kun": "",
    "m": "Tự nhiên, tất nhiên"
  },
  "世": {
    "hv": "THẾ",
    "on": "セイ, セ",
    "kun": "よ",
    "m": "Thế giới, thế kỷ"
  },
  "界": {
    "hv": "GIỚI",
    "on": "カイ",
    "kun": "",
    "m": "Thế giới, biên giới"
  },
  "国": {
    "hv": "QUỐC",
    "on": "コク",
    "kun": "くに",
    "m": "Quốc gia, đất nước"
  },
  "際": {
    "hv": "TẾ",
    "on": "サイ",
    "kun": "きわ",
    "m": "Quốc tế, dịp"
  },
  "図": {
    "hv": "ĐỒ",
    "on": "ズ, ト",
    "kun": "はか・る",
    "m": "Bản đồ, ý đồ"
  },
  "館": {
    "hv": "QUÁN",
    "on": "カン",
    "kun": "やかた",
    "m": "Nhà lớn, thư viện"
  },
  "病": {
    "hv": "BỆNH",
    "on": "ビョウ",
    "kun": "や・む",
    "m": "Bệnh tật"
  },
  "院": {
    "hv": "VIỆN",
    "on": "イン",
    "kun": "",
    "m": "Bệnh viện, học viện"
  },
  "薬": {
    "hv": "DƯỢC",
    "on": "ヤク",
    "kun": "くすり",
    "m": "Thuốc men"
  },
  "医": {
    "hv": "Y",
    "on": "イ",
    "kun": "",
    "m": "Y học, bác sĩ"
  },
  "要": {
    "hv": "YẾU",
    "on": "ヨウ",
    "kun": "い・る",
    "m": "Quan trọng, cần thiết"
  },
  "責": {
    "hv": "TRÁCH",
    "on": "セキ",
    "kun": "せ・める",
    "m": "Trách nhiệm"
  },
  "任": {
    "hv": "NHIỆM",
    "on": "ニン",
    "kun": "まか・せる",
    "m": "Nhiệm vụ, gánh vác"
  },
  "東": {
    "hv": "ĐÔNG",
    "on": "トウ",
    "kun": "ひがし",
    "m": "Phía Đông"
  },
  "西": {
    "hv": "TÂY",
    "on": "セイ, サイ",
    "kun": "にし",
    "m": "Phía Tây"
  },
  "南": {
    "hv": "NAM",
    "on": "ナン",
    "kun": "みなみ",
    "m": "Phía Nam"
  },
  "北": {
    "hv": "BẮC",
    "on": "ホク",
    "kun": "きた",
    "m": "Phía Bắc"
  },
  "京": {
    "hv": "KINH",
    "on": "キョウ, ケイ",
    "kun": "みやこ",
    "m": "Kinh đô, thủ đô"
  },
  "都": {
    "hv": "ĐÔ",
    "on": "ト, ツ",
    "kun": "みやこ",
    "m": "Đô thị, thủ đô"
  },
  "亜": {
    "hv": "Á",
    "on": "ア",
    "kun": "つ・ぐ",
    "m": "thứ hai, châu Á"
  },
  "阿": {
    "hv": "A",
    "on": "ア, オ",
    "kun": "おもね・る, くま",
    "m": "đống, gò, nương tựa, a dua theo"
  },
  "哀": {
    "hv": "AI",
    "on": "アイ",
    "kun": "あわ・れ, あわ・れむ, かな・しい",
    "m": "buồn, thương cảm, tưởng nhớ"
  },
  "愛": {
    "hv": "ÁI",
    "on": "アイ",
    "kun": "いと・しい, かな・しい, め・でる, お・しむ, まな",
    "m": "yêu, thích, quý, hay, thường xuyên"
  },
  "挨": {
    "hv": "AI",
    "on": "アイ",
    "kun": "ひら・く",
    "m": "sát, liền, kề, lần lượt, từng cái một, chạm vào, sờ vào"
  },
  "逢": {
    "hv": "PHÙNG",
    "on": "ホウ",
    "kun": "あ・う, むか・える",
    "m": "gặp gỡ"
  },
  "葵": {
    "hv": "QUỲ",
    "on": "キ",
    "kun": "あおい",
    "m": "hoa quỳ"
  },
  "茜": {
    "hv": "THIẾN",
    "on": "セン",
    "kun": "あかね",
    "m": "cỏ thiến (dùng để nhuộm đỏ), màu đỏ"
  },
  "握": {
    "hv": "ÁC",
    "on": "アク",
    "kun": "にぎ・る",
    "m": "cầm, nắm"
  },
  "渥": {
    "hv": "ÁC",
    "on": "アク",
    "kun": "あつ・い, うるお・う",
    "m": "thấm ướt, bôi, phết"
  },
  "旭": {
    "hv": "HÚC",
    "on": "キョク",
    "kun": "あさひ",
    "m": "ánh sáng lúc mặt trời mới mọc"
  },
  "葦": {
    "hv": "VY",
    "on": "イ",
    "kun": "あし, よし, しお・れる, しな・びる, しぼ・む, な・える",
    "m": "cây sậy, cây lau"
  },
  "芦": {
    "hv": "LÔ",
    "on": "ロ",
    "kun": "あし, よし",
    "m": "cây lau, cây lau"
  },
  "梓": {
    "hv": "TỬ",
    "on": "シ",
    "kun": "あずさ",
    "m": "cây tử (dùng để đóng đàn; tượng trưng cho con), khắc chữ lên bản gỗ, quê cha đất tổ"
  },
  "圧": {
    "hv": "ÁP",
    "on": "アツ, エン, オウ",
    "kun": "お・す, へ・す, おさ・える, お・さえる",
    "m": "pressure, push, overwhelm"
  },
  "扱": {
    "hv": "TRÁP",
    "on": "ソウ, キュウ",
    "kun": "あつか・い, あつか・う, あつか・る, こ・く",
    "m": "lượm nhặt"
  },
  "宛": {
    "hv": "UYỂN",
    "on": "エン",
    "kun": "あ・てる, -あて, -づつ, あたか・も",
    "m": "nhỏ bé"
  },
  "絢": {
    "hv": "HUYẾN",
    "on": "ケン",
    "kun": "—",
    "m": "trang sức sặc sỡ"
  },
  "綾": {
    "hv": "LĂNG",
    "on": "リン",
    "kun": "あや",
    "m": "lụa mỏng"
  },
  "鮎": {
    "hv": "NIÊM",
    "on": "デン, ネン",
    "kun": "あゆ, なまず",
    "m": "cá măng, cá ngát, cá nheo, cá niêm"
  },
  "或": {
    "hv": "HOẶC",
    "on": "ワク, コク, イキ",
    "kun": "あ・る, あるい, あるいは",
    "m": "hoặc, hay"
  },
  "粟": {
    "hv": "TÚC",
    "on": "ゾク, ショク, ソク",
    "kun": "あわ, もみ",
    "m": "cây ngô, thóc lúa"
  },
  "庵": {
    "hv": "AM",
    "on": "アン",
    "kun": "いおり, いお",
    "m": "cái am (nhà tranh nhỏ), nhà nhỏ để thờ Phật"
  },
  "案": {
    "hv": "ÁN",
    "on": "アン",
    "kun": "つくえ",
    "m": "cái bàn dài, bản án"
  },
  "闇": {
    "hv": "ÁM",
    "on": "アン, オン",
    "kun": "やみ, くら・い",
    "m": "tối, mờ, không rõ, không tỏ, thẫm, sẫm màu, ngầm, âm thầm, bí mật, mờ ám"
  },
  "鞍": {
    "hv": "AN",
    "on": "アン",
    "kun": "くら",
    "m": "yên cương ngựa, yên cương ngựa"
  },
  "杏": {
    "hv": "HẠNH",
    "on": "キョウ, アン, コウ",
    "kun": "あんず",
    "m": "cây hạnh (một loại cây như cây mận)"
  },
  "以": {
    "hv": "DĨ",
    "on": "イ",
    "kun": "もっ・て",
    "m": "dùng, sử dụng, bởi vì, lý do"
  },
  "伊": {
    "hv": "Y",
    "on": "イ",
    "kun": "かれ",
    "m": "y, hắn, anh ta, chị ta"
  },
  "位": {
    "hv": "VỊ",
    "on": "イ",
    "kun": "くらい, ぐらい",
    "m": "vị trí"
  },
  "依": {
    "hv": "Y",
    "on": "イ, エ",
    "kun": "よ・る",
    "m": "giống, như, dựa vào, nương vào"
  },
  "偉": {
    "hv": "VĨ",
    "on": "イ",
    "kun": "えら・い",
    "m": "cao to"
  },
  "囲": {
    "hv": "VY",
    "on": "イ",
    "kun": "かこ・む, かこ・う, かこ・い",
    "m": "surround, besiege, store"
  },
  "夷": {
    "hv": "DI",
    "on": "イ",
    "kun": "えびす, えみし, ころ・す, たい・らげる",
    "m": "mọi rợ, công bằng, bị thương"
  },
  "委": {
    "hv": "UỶ",
    "on": "イ",
    "kun": "ゆだ・ねる",
    "m": "uỷ thác, phó thác, dịu dàng, ỉu xìu, rơi rụng, rã rời"
  },
  "威": {
    "hv": "UY",
    "on": "イ",
    "kun": "おど・す, おど・し, おど・かす",
    "m": "oai, uy"
  },
  "尉": {
    "hv": "UÝ",
    "on": "イ, ジョウ",
    "kun": "—",
    "m": "cấp uý"
  },
  "惟": {
    "hv": "DUY",
    "on": "イ, ユイ",
    "kun": "おも・んみる, これ, おも・うに",
    "m": "chỉ có"
  },
  "慰": {
    "hv": "UÝ",
    "on": "イ",
    "kun": "なぐさ・める, なぐさ・む",
    "m": "an ủi, yên lòng, an ủi"
  },
  "椅": {
    "hv": "KỶ",
    "on": "イ",
    "kun": "—",
    "m": "cái ghế tựa, cái ghế tựa"
  },
  "為": {
    "hv": "VỊ",
    "on": "イ",
    "kun": "ため, な・る, な・す, す・る, たり, つく・る, なり",
    "m": "làm, gây nên, bởi vì, giúp cho"
  },
  "畏": {
    "hv": "UÝ",
    "on": "イ",
    "kun": "おそ・れる, かしこま・る, かしこ, かしこ・し",
    "m": "sợ sệt"
  },
  "異": {
    "hv": "DỊ",
    "on": "イ",
    "kun": "こと, こと・なる, け",
    "m": "khác nhau"
  },
  "移": {
    "hv": "DI",
    "on": "イ",
    "kun": "うつ・る, うつ・す",
    "m": "di chuyển, khen ngợi, rộng rãi"
  },
  "維": {
    "hv": "DUY",
    "on": "イ",
    "kun": "—",
    "m": "nối liền, gìn giữ"
  },
  "緯": {
    "hv": "VĨ",
    "on": "イ",
    "kun": "よこいと, ぬき",
    "m": "sợi ngang, vĩ tuyến"
  },
  "胃": {
    "hv": "VỊ",
    "on": "イ",
    "kun": "—",
    "m": "dạ dày, mề (gà, chim)"
  },
  "萎": {
    "hv": "NUY",
    "on": "イ",
    "kun": "な, しお・れる, しな・びる, しぼ・む, な・える",
    "m": "khô héo, (xem: nuy nhuy 萎蕤), khô héo"
  },
  "衣": {
    "hv": "Y",
    "on": "イ, エ",
    "kun": "ころも, きぬ, -ぎ",
    "m": "cái áo, mặc áo"
  },
  "違": {
    "hv": "VY",
    "on": "イ",
    "kun": "ちが・う, ちが・い, ちが・える, -ちが・える, たが・う, たが・える",
    "m": "không theo, không nghe, không tuân, làm trái, xa nhau"
  },
  "遺": {
    "hv": "DI",
    "on": "イ, ユイ",
    "kun": "のこ・す",
    "m": "mất, thất lạc"
  },
  "井": {
    "hv": "TĨNH",
    "on": "セイ, ショウ",
    "kun": "い",
    "m": "cái giếng, sao Tỉnh (một trong Nhị thập bát tú), cái giếng"
  },
  "亥": {
    "hv": "HỢI",
    "on": "ガイ, カイ",
    "kun": "い",
    "m": "Hợi (ngôi thứ 12 hàng Chi)"
  },
  "域": {
    "hv": "VỰC",
    "on": "イキ",
    "kun": "—",
    "m": "vùng, phạm vi, bờ cõi"
  },
  "育": {
    "hv": "DỤC",
    "on": "イク",
    "kun": "そだ・つ, そだ・ち, そだ・てる, はぐく・む",
    "m": "nuôi nấng"
  },
  "郁": {
    "hv": "UẤT",
    "on": "イク",
    "kun": "—",
    "m": "buồn bã, uất ức, hơi thối, sum suê, rậm rạp"
  },
  "磯": {
    "hv": "KY",
    "on": "キ",
    "kun": "いそ",
    "m": "hòn đá ngăn nước"
  },
  "壱": {
    "hv": "NHẤT",
    "on": "イチ, イツ",
    "kun": "ひとつ",
    "m": "one (in documents)"
  },
  "溢": {
    "hv": "DẬT",
    "on": "イツ",
    "kun": "こぼ・れる, あふ・れる, み・ちる",
    "m": "đầy tràn, phóng túng"
  },
  "逸": {
    "hv": "DẬT",
    "on": "イツ",
    "kun": "そ・れる, そ・らす, はぐ・れる",
    "m": "lầm lỗi, ẩn dật, nhàn rỗi"
  },
  "稲": {
    "hv": "ĐẠO",
    "on": "トウ, テ",
    "kun": "いね, いな-",
    "m": "rice plant"
  },
  "茨": {
    "hv": "TỲ",
    "on": "シ, ジ",
    "kun": "いばら, かや, くさぶき",
    "m": "lợp cỏ tranh, cỏ tật lê (một thứ cỏ có gai), chất chứa"
  },
  "芋": {
    "hv": "DỤ",
    "on": "ウ",
    "kun": "いも",
    "m": "ở, cư trú, to lớn, cây khoai nước, cây khoai sọ"
  },
  "允": {
    "hv": "DUẪN",
    "on": "イン",
    "kun": "じょう, まこと・に, ゆるす",
    "m": "thành thực, xứng đáng, phải chăng"
  },
  "印": {
    "hv": "ẤN",
    "on": "イン",
    "kun": "しるし, -じるし, しる・す",
    "m": "in ấn, cái ấn"
  },
  "咽": {
    "hv": "YẾN",
    "on": "イン, エン, エツ",
    "kun": "むせ・ぶ, むせ・る, のど, の・む",
    "m": "nuốt xuống, cuống họng, cổ họng, nghẹn cổ không nói được"
  },
  "因": {
    "hv": "NHÂN",
    "on": "イン",
    "kun": "よ・る, ちな・む",
    "m": "nguyên nhân, nhân tiện, tuỳ theo"
  },
  "姻": {
    "hv": "NHÂN",
    "on": "イン",
    "kun": "—",
    "m": "nhà trai (trong đám cưới), bố chồng"
  },
  "引": {
    "hv": "DẪN",
    "on": "イン",
    "kun": "ひ・く, ひ・ける",
    "m": "dương cung, dẫn, dắt, gây ra"
  },
  "淫": {
    "hv": "DÂM",
    "on": "イン",
    "kun": "ひた・す, ほしいまま, みだ・ら, みだ・れる, みだり",
    "m": "quá mức, quá thừa, buông thả, bừa bãi"
  },
  "胤": {
    "hv": "DẬN",
    "on": "イン",
    "kun": "たね",
    "m": "nối dõi"
  },
  "蔭": {
    "hv": "ÂM",
    "on": "イン, オン",
    "kun": "かげ",
    "m": "bóng râm, che chở, bóng râm"
  },
  "陰": {
    "hv": "ÂM",
    "on": "イン",
    "kun": "かげ, かげ・る",
    "m": "bóng mát, mặt trái, mặt sau, số âm"
  },
  "隠": {
    "hv": "ẨN",
    "on": "イン, オン",
    "kun": "かく・す, かく・し, かく・れる, よ・る",
    "m": "ẩn, kín, giấu, nấp, trốn"
  },
  "韻": {
    "hv": "VẬN",
    "on": "イン",
    "kun": "—",
    "m": "vần, phong nhã"
  },
  "右": {
    "hv": "HỮU",
    "on": "ウ, ユウ",
    "kun": "みぎ",
    "m": "bên phải"
  },
  "宇": {
    "hv": "VŨ",
    "on": "ウ",
    "kun": "—",
    "m": "mái hiên, toà nhà"
  },
  "烏": {
    "hv": "Ô",
    "on": "ウ, オ",
    "kun": "からす, いずくんぞ, なんぞ",
    "m": "con quạ"
  },
  "羽": {
    "hv": "VŨ",
    "on": "ウ",
    "kun": "は, わ, はね",
    "m": "lông chim"
  },
  "卯": {
    "hv": "MÃO",
    "on": "ボウ, モウ",
    "kun": "う",
    "m": "Mão (ngôi thứ 4 hàng Chi)"
  },
  "鵜": {
    "hv": "ĐỀ",
    "on": "テイ, ダイ",
    "kun": "う",
    "m": "(xem: đề hồ 鵜鶘,鹈鹕)"
  },
  "丑": {
    "hv": "SỬU",
    "on": "チュウ",
    "kun": "うし",
    "m": "Sửu (ngôi thứ 2 hàng Chi), vai hề trong vở tuồng, xấu xa"
  },
  "碓": {
    "hv": "ĐỐI",
    "on": "カク, タイ",
    "kun": "たし・か, かく・たる",
    "m": "cái cối giã gạo"
  },
  "臼": {
    "hv": "CỮU",
    "on": "キュウ, グ",
    "kun": "うす, うすづ・く",
    "m": "cái cối để giã"
  },
  "渦": {
    "hv": "OA",
    "on": "カ",
    "kun": "うず",
    "m": "nước xoáy, sông Qua (ở tỉnh An Huy của Trung Quốc)"
  },
  "嘘": {
    "hv": "HƯ",
    "on": "キョ, コ",
    "kun": "うそ, ふ・く",
    "m": "thở ra từ từ, hà hơi, than thở, thở dài"
  },
  "唄": {
    "hv": "BÁI",
    "on": "バイ",
    "kun": "うた, うた・う",
    "m": "tụng kinh"
  },
  "浦": {
    "hv": "PHỐ",
    "on": "ホ",
    "kun": "うら",
    "m": "bến sông, cửa sông, ven sông"
  },
  "瓜": {
    "hv": "QUA",
    "on": "カ, ケ",
    "kun": "うり",
    "m": "cây dưa"
  },
  "噂": {
    "hv": "TỖN",
    "on": "ソン",
    "kun": "うわさ",
    "m": "(xem: tỗn đạp 噂沓)"
  },
  "運": {
    "hv": "VẬN",
    "on": "ウン",
    "kun": "はこ・ぶ",
    "m": "sự may mắn, vận may, sự chuyên trở"
  },
  "雲": {
    "hv": "VÂN",
    "on": "ウン",
    "kun": "くも, -ぐも",
    "m": "mây"
  },
  "荏": {
    "hv": "NHẪM",
    "on": "ジン, ニン",
    "kun": "—",
    "m": "thứ đậu to, nhu mì, nhu nhược"
  },
  "餌": {
    "hv": "NHỊ",
    "on": "ジ, ニ",
    "kun": "え, えば, えさ, もち",
    "m": "bánh bột, mồi câu cá"
  },
  "叡": {
    "hv": "DUỆ",
    "on": "エイ",
    "kun": "あき・らか",
    "m": "sáng suốt, hiểu thấu"
  },
  "営": {
    "hv": "DINH",
    "on": "エイ",
    "kun": "いとな・む, いとな・み",
    "m": "nơi đóng quân, mưu sự, doanh (gồm 500 lính)"
  },
  "影": {
    "hv": "ẢNH",
    "on": "エイ",
    "kun": "かげ",
    "m": "bóng, tấm ảnh"
  },
  "映": {
    "hv": "ÁNH",
    "on": "エイ",
    "kun": "うつ・る, うつ・す, は・える, -ば・え",
    "m": "ánh sáng"
  },
  "栄": {
    "hv": "VINH",
    "on": "エイ, ヨウ",
    "kun": "さか・える, は・え, -ば・え, は・える, え",
    "m": "vinh, vinh dự, vinh hoa"
  },
  "永": {
    "hv": "VĨNH",
    "on": "エイ",
    "kun": "なが・い",
    "m": "lâu dài"
  },
  "泳": {
    "hv": "VỊNH",
    "on": "エイ",
    "kun": "およ・ぐ",
    "m": "lặn dưới nước"
  },
  "瑛": {
    "hv": "ANH",
    "on": "エイ",
    "kun": "—",
    "m": "ánh sáng của viên ngọc, viên ngọc trong suốt"
  },
  "英": {
    "hv": "ANH",
    "on": "エイ",
    "kun": "はなぶさ",
    "m": "hoa, người tài giỏi, nước Anh"
  },
  "衛": {
    "hv": "VỆ",
    "on": "エイ, エ",
    "kun": "—",
    "m": "bảo vệ, phòng giữ, nước Vệ"
  },
  "詠": {
    "hv": "VỊNH",
    "on": "エイ",
    "kun": "よ・む, うた・う",
    "m": "vịnh thơ"
  },
  "鋭": {
    "hv": "NHUỆ",
    "on": "エイ",
    "kun": "するど・い",
    "m": "sắc, nhọn, mũi nhọn"
  },
  "液": {
    "hv": "DỊCH",
    "on": "エキ",
    "kun": "—",
    "m": "chất lỏng"
  },
  "疫": {
    "hv": "DỊCH",
    "on": "エキ, ヤク",
    "kun": "—",
    "m": "bệnh ôn dịch, bệnh lây được"
  },
  "益": {
    "hv": "ÍCH",
    "on": "エキ, ヤク",
    "kun": "ま・す",
    "m": "thêm nhiều lên, ích lợi, châu Ích (Trung Quốc)"
  },
  "悦": {
    "hv": "DUYỆT",
    "on": "エツ",
    "kun": "よろこ・ぶ, よろこ・ばす",
    "m": "đẹp lòng, vui thích"
  },
  "謁": {
    "hv": "YẾT",
    "on": "エツ",
    "kun": "—",
    "m": "yết kiến, hầu chuyện, bảo, cáo, danh thiếp"
  },
  "越": {
    "hv": "VIỆT",
    "on": "エツ, オツ",
    "kun": "こ・す, -こ・す, -ご・し, こ・える, -ご・え",
    "m": "vượt quá, nước Việt, họ Việt"
  },
  "閲": {
    "hv": "DUYỆT",
    "on": "エツ",
    "kun": "けみ・する",
    "m": "review, inspection, revision"
  },
  "榎": {
    "hv": "GIẢ",
    "on": "カ",
    "kun": "えのき",
    "m": "lotus tree, nettle tree, hackberry"
  },
  "園": {
    "hv": "VIÊN",
    "on": "エン",
    "kun": "その",
    "m": "cái vườn"
  },
  "堰": {
    "hv": "YỂN",
    "on": "エン",
    "kun": "せき, せ・く",
    "m": "đập đất"
  },
  "奄": {
    "hv": "YỂM",
    "on": "エン",
    "kun": "おお・う, たちまち",
    "m": "bao la, bị hoạn, bỗng, chợt"
  },
  "宴": {
    "hv": "YẾN",
    "on": "エン",
    "kun": "うたげ",
    "m": "yến tiệc"
  },
  "延": {
    "hv": "DIÊN",
    "on": "エン",
    "kun": "の・びる, の・べる, の・べ, の・ばす",
    "m": "kéo dài, chậm, kéo dài"
  },
  "怨": {
    "hv": "OÁN",
    "on": "エン, オン, ウン",
    "kun": "うら・む, うらみ, うら・めしい",
    "m": "oán trách, giận"
  },
  "援": {
    "hv": "VIỆN",
    "on": "エン",
    "kun": "—",
    "m": "bám, víu, viện ra, dẫn ra, viện trợ"
  },
  "沿": {
    "hv": "DIÊN",
    "on": "エン",
    "kun": "そ・う, -ぞ・い",
    "m": "ven, mép, đi men theo, noi theo"
  },
  "演": {
    "hv": "DIỄN",
    "on": "エン",
    "kun": "—",
    "m": "diễn ra, diễn thuyết, diễn giảng, nói rõ, làm thử, mô phỏng, tập trước"
  },
  "炎": {
    "hv": "VIÊM",
    "on": "エン",
    "kun": "ほのお",
    "m": "bốc cháy, nóng"
  },
  "煙": {
    "hv": "YÊN",
    "on": "エン",
    "kun": "けむ・る, けむり, けむ・い",
    "m": "khói, thuốc lá"
  },
  "燕": {
    "hv": "YÊN",
    "on": "エン",
    "kun": "つばめ, つばくら, つばくろ",
    "m": "(tên đất), con chim én"
  },
  "猿": {
    "hv": "VIÊN",
    "on": "エン",
    "kun": "さる",
    "m": "con vượn"
  },
  "縁": {
    "hv": "DUYÊN",
    "on": "エン, -ネン",
    "kun": "ふち, ふち・どる, ゆかり, よすが, へり, えにし",
    "m": "affinity, relation, connection"
  },
  "艶": {
    "hv": "DIỄM",
    "on": "エン",
    "kun": "つや, なま・めかしい, あで・やか, つや・めく, なま・めく",
    "m": "đẹp đẽ, tươi đẹp, con gái đẹp, chuyện tình yêu"
  },
  "苑": {
    "hv": "UYỂN",
    "on": "エン, オン",
    "kun": "その, う・つ",
    "m": "vườn hoa"
  },
  "遠": {
    "hv": "VIỄN",
    "on": "エン, オン",
    "kun": "とお・い",
    "m": "xa xôi"
  },
  "鉛": {
    "hv": "DUYÊN",
    "on": "エン",
    "kun": "なまり",
    "m": "kim loại chì, Pb"
  },
  "塩": {
    "hv": "DIÊM",
    "on": "エン",
    "kun": "しお",
    "m": "muối ăn"
  },
  "於": {
    "hv": "Ư",
    "on": "オ, ヨ",
    "kun": "おい・て, お・ける, ああ, より",
    "m": "ở, tại, vào lúc"
  },
  "汚": {
    "hv": "Ô",
    "on": "オ",
    "kun": "けが・す, けが・れる, けが・らわしい, よご・す, よご・れる, きたな・い",
    "m": "bẩn thỉu, bẩn thỉu"
  },
  "凹": {
    "hv": "AO",
    "on": "オウ",
    "kun": "くぼ・む, へこ・む, ぼこ",
    "m": "lõm vào"
  },
  "央": {
    "hv": "ƯƠNG",
    "on": "オウ",
    "kun": "—",
    "m": "ở giữa, trung tâm, dừng, ngớt"
  },
  "奥": {
    "hv": "ÁO",
    "on": "オウ",
    "kun": "おく, おく・まる, くま",
    "m": "sâu xa, khó hiểu, nước Áo"
  },
  "往": {
    "hv": "VÃNG",
    "on": "オウ",
    "kun": "い・く, いにしえ, さき・に, ゆ・く",
    "m": "đi, theo hướng, đã qua"
  },
  "応": {
    "hv": "ƯNG",
    "on": "オウ, ヨウ, -ノウ",
    "kun": "あた・る, まさに, こた・える",
    "m": "ưng, thích, xưa dùng như 應"
  },
  "押": {
    "hv": "ÁP",
    "on": "オウ",
    "kun": "お・す, お・し-, お・っ-, お・さえる, おさ・える",
    "m": "cầm cố, nợ, cược, đặt cọc, ký tên, đóng dấu, áp giải"
  },
  "旺": {
    "hv": "VƯỢNG",
    "on": "オウ",
    "kun": "さかん",
    "m": "thịnh vượng, nở rộ (hoa)"
  },
  "横": {
    "hv": "HOÀNH",
    "on": "オウ",
    "kun": "よこ",
    "m": "ngang"
  },
  "欧": {
    "hv": "ÂU",
    "on": "オウ",
    "kun": "うた・う, は・く",
    "m": "châu Âu"
  },
  "殴": {
    "hv": "ẨU",
    "on": "オウ",
    "kun": "なぐ・る",
    "m": "đánh nhau bằng gậy"
  },
  "王": {
    "hv": "VƯƠNG",
    "on": "オウ, -ノウ",
    "kun": "—",
    "m": "vua"
  },
  "翁": {
    "hv": "ÔNG",
    "on": "オウ",
    "kun": "おきな",
    "m": "ông cụ"
  },
  "鴎": {
    "hv": "ÂU",
    "on": "オウ",
    "kun": "かもめ",
    "m": "seagull"
  },
  "黄": {
    "hv": "HOÀNG",
    "on": "コウ, オウ",
    "kun": "き, こ-",
    "m": "vàng, màu vàng, vàng, màu vàng"
  },
  "岡": {
    "hv": "CƯƠNG",
    "on": "コウ",
    "kun": "おか",
    "m": "sườn núi"
  },
  "沖": {
    "hv": "TRÙNG",
    "on": "チュウ",
    "kun": "おき, おきつ, ちゅう・する, わく",
    "m": "khoẻ, mạnh, xung đột, đụng chạm"
  },
  "荻": {
    "hv": "ĐỊCH",
    "on": "テキ",
    "kun": "おぎ",
    "m": "cỏ địch (một loại có giống lau)"
  },
  "憶": {
    "hv": "ỨC",
    "on": "オク",
    "kun": "—",
    "m": "nhớ"
  },
  "臆": {
    "hv": "ỨC",
    "on": "オク, ヨク",
    "kun": "むね, おくする",
    "m": "ngực"
  },
  "桶": {
    "hv": "DÕNG",
    "on": "ヨウ, トウ",
    "kun": "おけ",
    "m": "cái thùng, cái thùng"
  },
  "牡": {
    "hv": "MẪU",
    "on": "ボ, ボウ",
    "kun": "おす, お-, おん-",
    "m": "giống đực, con đực thuộc các loài chim muông"
  },
  "乙": {
    "hv": "ẤT",
    "on": "オツ, イツ",
    "kun": "おと-, きのと",
    "m": "Ất (ngôi thứ hai thuộc hàng Can), bộ ất"
  },
  "俺": {
    "hv": "YÊM",
    "on": "エン",
    "kun": "おれ, われ",
    "m": "ta, tôi"
  },
  "卸": {
    "hv": "TÁ",
    "on": "シャ",
    "kun": "おろ・す, おろし, おろ・し",
    "m": "tháo, cởi"
  },
  "恩": {
    "hv": "ÂN",
    "on": "オン",
    "kun": "—",
    "m": "ơn huệ"
  },
  "温": {
    "hv": "ÔN",
    "on": "オン",
    "kun": "あたた・か, あたた・かい, あたた・まる, あたた・める, ぬく",
    "m": "nhắc lại, xem lại, ấm áp"
  },
  "穏": {
    "hv": "ỔN",
    "on": "オン",
    "kun": "おだ・やか",
    "m": "calm, quiet, moderation"
  },
  "音": {
    "hv": "ÂM",
    "on": "オン, イン, -ノン",
    "kun": "おと, ね",
    "m": "âm, tiếng"
  },
  "下": {
    "hv": "HÁ",
    "on": "カ, ゲ",
    "kun": "した, しも, もと, さ・げる, さ・がる, くだ・る, くだ・り, くだ・す, -くだ・す, くだ・さる, お・ろす, お・りる",
    "m": "đi xuống, ở bên dưới, đi xuống"
  },
  "化": {
    "hv": "HOÁ",
    "on": "カ, ケ",
    "kun": "ば・ける, ば・かす, ふ・ける, け・する",
    "m": "biến hoá, biến đổi"
  },
  "仮": {
    "hv": "GIÁ",
    "on": "カ, ケ",
    "kun": "かり, かり-",
    "m": "dối trá, mượn, vay, nghỉ tắm gội"
  },
  "伽": {
    "hv": "GIÀ",
    "on": "カ, ガ, キャ, ギャ",
    "kun": "とぎ",
    "m": "(xem: già lam 伽藍)"
  },
  "価": {
    "hv": "GIÁ",
    "on": "カ, ケ",
    "kun": "あたい",
    "m": "giá trị, giá cả"
  },
  "佳": {
    "hv": "GIAI",
    "on": "カ",
    "kun": "—",
    "m": "đẹp, tốt"
  },
  "加": {
    "hv": "GIA",
    "on": "カ",
    "kun": "くわ・える, くわ・わる",
    "m": "thêm vào, tăng thêm"
  },
  "可": {
    "hv": "KHẢ",
    "on": "カ, コク",
    "kun": "-べ・き, -べ・し",
    "m": "có thể"
  },
  "嘉": {
    "hv": "GIA",
    "on": "カ",
    "kun": "よみ・する, よい",
    "m": "khen ngợi"
  },
  "嫁": {
    "hv": "GIÁ",
    "on": "カ",
    "kun": "よめ, とつ・ぐ, い・く, ゆ・く",
    "m": "lấy chồng, gieo rắc"
  },
  "寡": {
    "hv": "QUẢ",
    "on": "カ",
    "kun": "—",
    "m": "ít, suông, nhạt nhẽo, goá chồng, quả phụ"
  },
  "暇": {
    "hv": "HẠ",
    "on": "カ",
    "kun": "ひま, いとま",
    "m": "rảnh rỗi, thôi, nghỉ, rảnh rỗi"
  },
  "果": {
    "hv": "QUẢ",
    "on": "カ",
    "kun": "は・たす, はた・す, -は・たす, は・てる, -は・てる, は・て",
    "m": "quả, trái, quả nhiên, kết quả"
  },
  "架": {
    "hv": "GIÁ",
    "on": "カ",
    "kun": "か・ける, か・かる",
    "m": "cái giá, gác (để đặt đồ vật)"
  },
  "歌": {
    "hv": "CA",
    "on": "カ",
    "kun": "うた, うた・う",
    "m": "hát, bài hát, khúc ca"
  },
  "河": {
    "hv": "HÀ",
    "on": "カ",
    "kun": "かわ",
    "m": "sông"
  },
  "火": {
    "hv": "HOẢ",
    "on": "カ",
    "kun": "ひ, -び, ほ-",
    "m": "lửa"
  },
  "珂": {
    "hv": "KHA",
    "on": "カ",
    "kun": "—",
    "m": "ngọc kha"
  },
  "禍": {
    "hv": "HOẠ",
    "on": "カ",
    "kun": "わざわい",
    "m": "tai hoạ, tai vạ"
  },
  "稼": {
    "hv": "GIÁ",
    "on": "カ",
    "kun": "かせ・ぐ",
    "m": "cấy lúa"
  },
  "箇": {
    "hv": "CÁ",
    "on": "カ, コ",
    "kun": "—",
    "m": "cái, quả, con"
  },
  "苛": {
    "hv": "HÀ",
    "on": "カ",
    "kun": "いじ・める, さいな・む, いらだ・つ, からい, こまかい",
    "m": "khắt khe"
  },
  "茄": {
    "hv": "GIA",
    "on": "カ",
    "kun": "—",
    "m": "cây cà, cuống sen, giò sen"
  },
  "荷": {
    "hv": "HÀ",
    "on": "カ",
    "kun": "に",
    "m": "hoa sen, vác trên vai"
  },
  "華": {
    "hv": "HOA",
    "on": "カ, ケ",
    "kun": "はな",
    "m": "đẹp, quầng trăng, quầng mặt trời, người Trung Quốc"
  },
  "菓": {
    "hv": "QUẢ",
    "on": "カ",
    "kun": "—",
    "m": "quả, trái, quả nhiên, kết quả"
  },
  "蝦": {
    "hv": "HÀ",
    "on": "カ, ゲ",
    "kun": "えび",
    "m": "con tôm"
  },
  "課": {
    "hv": "KHOÁ",
    "on": "カ",
    "kun": "—",
    "m": "bài học"
  },
  "貨": {
    "hv": "HOÁ",
    "on": "カ",
    "kun": "たから",
    "m": "tiền tệ, hàng hoá"
  },
  "迦": {
    "hv": "CA",
    "on": "カ, ケ",
    "kun": "—",
    "m": "(xem: thích ca 釋迦), (xem: thích ca 釋迦)"
  },
  "過": {
    "hv": "QUA",
    "on": "カ",
    "kun": "す・ぎる, す・ごす, あやま・ち, あやま・つ, よぎ・る, よ・ぎる",
    "m": "qua, vượt, hơn, quá, đã từng"
  },
  "霞": {
    "hv": "HÀ",
    "on": "カ, ゲ",
    "kun": "かすみ, かす・む",
    "m": "ráng mặt trời hoặc ráng mây mù"
  },
  "蚊": {
    "hv": "VĂN",
    "on": "ブン",
    "kun": "か",
    "m": "con muỗi"
  },
  "峨": {
    "hv": "NGA",
    "on": "ガ",
    "kun": "けわ・しい",
    "m": "cao lớn, (tên núi)"
  },
  "我": {
    "hv": "NGÃ",
    "on": "ガ",
    "kun": "われ, わ, わ・が-, わが-",
    "m": "tôi, tao"
  },
  "牙": {
    "hv": "NHA",
    "on": "ガ, ゲ",
    "kun": "きば, は",
    "m": "cái răng, ngà voi"
  },
  "画": {
    "hv": "HOẠ",
    "on": "ガ, カク, エ, カイ",
    "kun": "えが・く, かく・する, かぎ・る, はかりごと, はか・る",
    "m": "vẽ, bức tranh"
  },
  "芽": {
    "hv": "NHA",
    "on": "ガ",
    "kun": "め",
    "m": "mầm, chồi"
  },
  "賀": {
    "hv": "HẠ",
    "on": "ガ",
    "kun": "—",
    "m": "đưa đồ mừng, chúc tụng"
  },
  "雅": {
    "hv": "NHÃ",
    "on": "ガ",
    "kun": "みや・び",
    "m": "thường, hay, luôn, thanh nhã, tao nhã (trái với tục)"
  },
  "餓": {
    "hv": "NGÃ",
    "on": "ガ",
    "kun": "う・える",
    "m": "đói quá"
  },
  "介": {
    "hv": "GIỚI",
    "on": "カイ",
    "kun": "—",
    "m": "khoảng giữa, vẩy (cá), bậm bực, bứt rứt"
  },
  "解": {
    "hv": "GIẢI",
    "on": "カイ, ゲ",
    "kun": "と・く, と・かす, と・ける, ほど・く, ほぐ・す, わか・る, さと・る",
    "m": "cởi (áo), giải phóng, giải toả, giảng giải"
  },
  "回": {
    "hv": "HỒI",
    "on": "カイ, エ",
    "kun": "まわ・る, -まわ・る, -まわ・り, まわ・す, -まわ・す, まわ・し-, -まわ・し, もとお・る, か・える",
    "m": "về, đạo Hồi, Hồi giáo"
  },
  "塊": {
    "hv": "KHỐI",
    "on": "カイ, ケ",
    "kun": "かたまり, つちくれ",
    "m": "hòn, khối, đống"
  },
  "壊": {
    "hv": "BÔI",
    "on": "カイ, エ",
    "kun": "こわ・す, こわ・れる, やぶ・る",
    "m": "demolition, break, destroy"
  },
  "快": {
    "hv": "KHOÁI",
    "on": "カイ",
    "kun": "こころよ・い",
    "m": "nhanh nhẹn, sắp sửa, sướng, thích"
  },
  "怪": {
    "hv": "QUÁI",
    "on": "カイ, ケ",
    "kun": "あや・しい, あや・しむ",
    "m": "kỳ lạ, yêu quái"
  },
  "悔": {
    "hv": "HỐI",
    "on": "カイ",
    "kun": "く・いる, く・やむ, くや・しい",
    "m": "hối hận, nuối tiếc"
  },
  "懐": {
    "hv": "HOÀI",
    "on": "カイ, エ",
    "kun": "ふところ, なつ・かしい, なつ・かしむ, なつ・く, なつ・ける, なず・ける, いだ・く, おも・う",
    "m": "feelings, heart, yearn"
  },
  "戒": {
    "hv": "GIỚI",
    "on": "カイ",
    "kun": "いまし・める",
    "m": "phòng, tránh, cấm đoán, điều răn"
  },
  "拐": {
    "hv": "QUẢI",
    "on": "カイ",
    "kun": "—",
    "m": "kẻ dụ dỗ, cái gậy"
  },
  "改": {
    "hv": "CẢI",
    "on": "カイ",
    "kun": "あらた・める, あらた・まる",
    "m": "sửa đổi, thay đổi"
  },
  "魁": {
    "hv": "KHÔI",
    "on": "カイ",
    "kun": "さきがけ, かしら",
    "m": "đứng đầu, đầu sỏ, cái muôi múc canh, sao Khôi"
  },
  "械": {
    "hv": "GIỚI",
    "on": "カイ",
    "kun": "かせ",
    "m": "đồ khí giới"
  },
  "灰": {
    "hv": "HÔI",
    "on": "カイ",
    "kun": "はい",
    "m": "tro"
  },
  "皆": {
    "hv": "GIAI",
    "on": "カイ",
    "kun": "みな, みんな",
    "m": "cùng, đồng thời"
  },
  "絵": {
    "hv": "HỘI",
    "on": "カイ, エ",
    "kun": "—",
    "m": "picture, drawing, painting"
  },
  "芥": {
    "hv": "GIỚI",
    "on": "カイ, ケ",
    "kun": "からし, ごみ, あくた",
    "m": "hạt cải, nhỏ bé"
  },
  "蟹": {
    "hv": "GIẢI",
    "on": "カイ",
    "kun": "かに",
    "m": "con cua"
  },
  "階": {
    "hv": "GIAI",
    "on": "カイ",
    "kun": "きざはし",
    "m": "cấp bậc, bậc thềm"
  },
  "貝": {
    "hv": "BỐI",
    "on": "バイ",
    "kun": "かい",
    "m": "con sò, hến, vật quý, tiền tệ"
  },
  "凱": {
    "hv": "KHẢI",
    "on": "ガイ, カイ",
    "kun": "かちどき, やわらぐ",
    "m": "sự thắng lợi"
  },
  "劾": {
    "hv": "HẶC",
    "on": "ガイ",
    "kun": "—",
    "m": "hạch tội"
  },
  "外": {
    "hv": "NGOẠI",
    "on": "ガイ, ゲ",
    "kun": "そと, ほか, はず・す, はず・れる, と-",
    "m": "bên ngoài"
  },
  "害": {
    "hv": "HẠI",
    "on": "ガイ",
    "kun": "—",
    "m": "hãm hại, hại, có hại"
  },
  "崖": {
    "hv": "NHAI",
    "on": "ガイ, ゲ, ギ",
    "kun": "がけ, きし, はて",
    "m": "ven núi, cạnh núi, vách núi"
  },
  "慨": {
    "hv": "KHÁI",
    "on": "ガイ",
    "kun": "なげ・く",
    "m": "tức giận, căm phẫn, than thở, hào hiệp, khảng khái"
  },
  "概": {
    "hv": "KHÁI",
    "on": "ガイ",
    "kun": "おおむ・ね",
    "m": "gạt phẳng, gạt bằng, đo đạc, bao quát, tóm tắt"
  },
  "涯": {
    "hv": "NHAI",
    "on": "ガイ",
    "kun": "はて",
    "m": "bờ, bến"
  },
  "蓋": {
    "hv": "CÁI",
    "on": "ガイ, カイ, コウ",
    "kun": "ふた, けだ・し, おお・う, かさ, かこう",
    "m": "che, đậy, trùm lên"
  },
  "街": {
    "hv": "NHAI",
    "on": "ガイ, カイ",
    "kun": "まち",
    "m": "ngã tư, đường phố"
  },
  "該": {
    "hv": "CAI",
    "on": "ガイ",
    "kun": "—",
    "m": "bao quát hết thảy, còn thiếu"
  },
  "骸": {
    "hv": "HÀI",
    "on": "ガイ, カイ",
    "kun": "むくろ",
    "m": "xương đùi, hình hài"
  },
  "馨": {
    "hv": "HINH",
    "on": "ケイ, キョウ",
    "kun": "かお・る, かおり",
    "m": "thơm lừng, hương bay ngát ra"
  },
  "垣": {
    "hv": "VIÊN",
    "on": "エン",
    "kun": "かき",
    "m": "tường thấp"
  },
  "柿": {
    "hv": "THỊ",
    "on": "シ",
    "kun": "かき",
    "m": "cây hồng, quả hồng, cây thị"
  },
  "嚇": {
    "hv": "HÁCH",
    "on": "カク",
    "kun": "おど・す",
    "m": "dọa nạt, đe doạ"
  },
  "各": {
    "hv": "CÁC",
    "on": "カク",
    "kun": "おのおの",
    "m": "mỗi một, đều, cùng"
  },
  "拡": {
    "hv": "KHOÁC",
    "on": "カク, コウ",
    "kun": "ひろ・がる, ひろ・げる, ひろ・める",
    "m": "broaden, extend, expand"
  },
  "格": {
    "hv": "CÁCH",
    "on": "カク, コウ, キャク, ゴウ",
    "kun": "—",
    "m": "cách thức"
  },
  "核": {
    "hv": "HẠCH",
    "on": "カク",
    "kun": "—",
    "m": "hạt, hột, nhân, hạt, hột, nhân"
  },
  "殻": {
    "hv": "XÁC",
    "on": "カク, コク, バイ",
    "kun": "から, がら",
    "m": "vỏ cứng"
  },
  "獲": {
    "hv": "HOẠCH",
    "on": "カク",
    "kun": "え・る",
    "m": "bắt được, có được, gặt hái, đầy tớ, nô tỳ"
  },
  "確": {
    "hv": "XÁC",
    "on": "カク, コウ",
    "kun": "たし・か, たし・かめる",
    "m": "bền lâu, đúng, trúng, chính xác"
  },
  "穫": {
    "hv": "HOẠCH",
    "on": "カク",
    "kun": "—",
    "m": "gặt lúa"
  },
  "覚": {
    "hv": "GIÁC",
    "on": "カク",
    "kun": "おぼ・える, さ・ます, さ・める, さと・る",
    "m": "biết, phát hiện, tỉnh dậy"
  },
  "角": {
    "hv": "GIÁC",
    "on": "カク",
    "kun": "かど, つの",
    "m": "cái sừng, góc, cái sừng"
  },
  "較": {
    "hv": "GIÁC",
    "on": "カク, コウ",
    "kun": "くら・べる",
    "m": "tay xe, càng xe, so với"
  },
  "郭": {
    "hv": "QUÁCH",
    "on": "カク",
    "kun": "くるわ",
    "m": "phía ngoài thành"
  },
  "閣": {
    "hv": "CÁC",
    "on": "カク",
    "kun": "—",
    "m": "cái lầu"
  },
  "隔": {
    "hv": "CÁCH",
    "on": "カク",
    "kun": "へだ・てる, へだ・たる",
    "m": "ngăn ra"
  },
  "革": {
    "hv": "CÁCH",
    "on": "カク",
    "kun": "かわ",
    "m": "thay đổi, da thú đã cạo lông, bỏ đi, bãi đi"
  },
  "岳": {
    "hv": "NHẠC",
    "on": "ガク",
    "kun": "たけ",
    "m": "thuộc về vợ (xem: nhạc trượng 岳丈)"
  },
  "楽": {
    "hv": "LẠC",
    "on": "ガク, ラク, ゴウ",
    "kun": "たの・しい, たの・しむ, この・む",
    "m": "sung sướng"
  },
  "額": {
    "hv": "NGẠCH",
    "on": "ガク",
    "kun": "ひたい",
    "m": "trán (trên đầu), hạn chế số lượng nhất định"
  },
  "顎": {
    "hv": "NGẠC",
    "on": "ガク",
    "kun": "あご, あぎと",
    "m": "hàm, quai hàm"
  },
  "掛": {
    "hv": "QUẢI",
    "on": "カイ, ケイ",
    "kun": "か・ける, -か・ける, か・け, -か・け, -が・け, か・かる, -か・かる, -が・かる, か・かり, -が・かり, かかり, -がかり",
    "m": "treo lên"
  },
  "笠": {
    "hv": "LẠP",
    "on": "リュウ",
    "kun": "かさ",
    "m": "cái nón, cái lồng bàn"
  },
  "樫": {
    "hv": "[樫]",
    "on": "—",
    "kun": "かし",
    "m": "evergreen oak, (kokuji)"
  },
  "橿": {
    "hv": "CƯƠNG",
    "on": "キョウ",
    "kun": "かし, もちのき",
    "m": "oak"
  },
  "梶": {
    "hv": "[梶]",
    "on": "ビ",
    "kun": "かじ, こずえ",
    "m": "sculling oar"
  },
  "潟": {
    "hv": "TÍCH",
    "on": "セキ",
    "kun": "かた, -がた",
    "m": "đất mặn"
  },
  "割": {
    "hv": "CÁT",
    "on": "カツ",
    "kun": "わ・る, わり, わ・り, わ・れる, さ・く",
    "m": "cắt đứt"
  },
  "喝": {
    "hv": "HÁT",
    "on": "カツ",
    "kun": "—",
    "m": "quát mắng, uống"
  },
  "括": {
    "hv": "QUÁT",
    "on": "カツ",
    "kun": "くく・る",
    "m": "bao quát, buộc lại, bó lại"
  },
  "活": {
    "hv": "HOẠT",
    "on": "カツ",
    "kun": "い・きる, い・かす, い・ける",
    "m": "hoạt động"
  },
  "渇": {
    "hv": "HẠT",
    "on": "カツ",
    "kun": "かわ・く",
    "m": "thirst, dry up, parch"
  },
  "滑": {
    "hv": "HOẠT",
    "on": "カツ, コツ",
    "kun": "すべ・る, なめ・らか",
    "m": "lưu thông, không ngừng, trơn, nhẵn, khôi hài, hài hước"
  },
  "葛": {
    "hv": "CÁT",
    "on": "カツ, カチ",
    "kun": "つづら, くず",
    "m": "cây sắn dây, vải dệt bằng vỏ sắn dây, bối rối"
  },
  "褐": {
    "hv": "CÁT",
    "on": "カツ",
    "kun": "—",
    "m": "áo vải to, áo vải to"
  },
  "轄": {
    "hv": "HẠT",
    "on": "カツ",
    "kun": "くさび",
    "m": "cái chốt cho bánh xe không rời ra, cai quản"
  },
  "且": {
    "hv": "THẢ",
    "on": "ショ, ソ, ショウ",
    "kun": "か・つ",
    "m": "vừa, cứ"
  },
  "叶": {
    "hv": "DIỆP",
    "on": "キョウ",
    "kun": "かな・える, かな・う",
    "m": "lá cây"
  },
  "樺": {
    "hv": "HOA",
    "on": "カ",
    "kun": "かば, かんば",
    "m": "(một loại hoa)"
  },
  "株": {
    "hv": "CHÂU",
    "on": "シュ",
    "kun": "かぶ",
    "m": "gốc cây, gốc (chữ dùng để đếm cây)"
  },
  "兜": {
    "hv": "ĐÂU",
    "on": "トウ, ト",
    "kun": "かぶと",
    "m": "đứng đằng sau ôm, (xem: đâu mâu 兜鍪)"
  },
  "蒲": {
    "hv": "BỒ",
    "on": "ホ, ボ, フ, ブ",
    "kun": "がま, かば, かま",
    "m": "cỏ bồ"
  },
  "釜": {
    "hv": "PHỦ",
    "on": "フ",
    "kun": "かま",
    "m": "cái nồi, chảo"
  },
  "鎌": {
    "hv": "LIÊM",
    "on": "レン, ケン",
    "kun": "かま",
    "m": "cái liềm, lưỡi liềm"
  },
  "噛": {
    "hv": "GIẢO",
    "on": "コウ, ゴウ",
    "kun": "か・む, か・じる",
    "m": "chew, bite, gnaw"
  },
  "鴨": {
    "hv": "ÁP",
    "on": "オウ",
    "kun": "かも, あひる",
    "m": "con vịt"
  },
  "茅": {
    "hv": "MAO",
    "on": "ボウ, ミョウ",
    "kun": "かや, ちがや",
    "m": "cỏ lợp nhà, cỏ tranh, họ Mao, núi Mao"
  },
  "萱": {
    "hv": "HUYÊN",
    "on": "ケン",
    "kun": "かや, かんぞう",
    "m": "cỏ huyên"
  },
  "粥": {
    "hv": "CHÚC",
    "on": "イク, シュク, ジュク",
    "kun": "かゆ, かい, ひさ・ぐ",
    "m": "cháo loãng"
  },
  "刈": {
    "hv": "NGẢI",
    "on": "ガイ, カイ",
    "kun": "か・る",
    "m": "cắt cỏ"
  },
  "苅": {
    "hv": "NGẢI",
    "on": "ガイ, カイ",
    "kun": "か・る",
    "m": "cắt cỏ"
  },
  "瓦": {
    "hv": "NGOÃ",
    "on": "ガ",
    "kun": "かわら, ぐらむ",
    "m": "ngói"
  },
  "乾": {
    "hv": "CAN",
    "on": "カン, ケン",
    "kun": "かわ・く, かわ・かす, ほ・す, ひ・る, いぬい",
    "m": "khô, cạn kiệt, tiếng hão gọi mà không có thực sự, quẻ Càn (tam liên) trong Kinh Dịch (có 3 vạch liền, tượng Thiên (trời), tượng trưng người cha, hành Kim, tuổi Tuất và Hợi, hướng Tây Bắc)"
  },
  "侃": {
    "hv": "KHẢN",
    "on": "カン",
    "kun": "つよ・い",
    "m": "cứng thẳng"
  },
  "冠": {
    "hv": "QUAN",
    "on": "カン",
    "kun": "かんむり",
    "m": "mũ, nón, cầm đầu mọi người"
  },
  "寒": {
    "hv": "HÀN",
    "on": "カン",
    "kun": "さむ・い",
    "m": "lạnh"
  },
  "刊": {
    "hv": "SAN",
    "on": "カン",
    "kun": "—",
    "m": "chặt, chạm khắc, xuất bản, in ấn"
  },
  "勘": {
    "hv": "KHÁM",
    "on": "カン",
    "kun": "—",
    "m": "so sánh, tra hỏi phạm nhân"
  },
  "勧": {
    "hv": "CẦN",
    "on": "カン, ケン",
    "kun": "すす・める",
    "m": "cố hết sức, chăm chỉ, cần cù"
  },
  "巻": {
    "hv": "QUYỂN",
    "on": "カン, ケン",
    "kun": "ま・く, まき, ま・き",
    "m": "scroll, volume, book"
  },
  "喚": {
    "hv": "HOÁN",
    "on": "カン",
    "kun": "わめ・く",
    "m": "kêu, gọi"
  },
  "堪": {
    "hv": "KHAM",
    "on": "カン, タン",
    "kun": "た・える, たま・る, こら・える, こた・える",
    "m": "chịu đựng, chịu được"
  },
  "完": {
    "hv": "HOÀN",
    "on": "カン",
    "kun": "—",
    "m": "hết, xong, vẹn, đủ"
  },
  "官": {
    "hv": "QUAN",
    "on": "カン",
    "kun": "—",
    "m": "quan, người làm việc cho nhà nước"
  },
  "寛": {
    "hv": "KHOAN",
    "on": "カン",
    "kun": "くつろ・ぐ, ひろ・い, ゆる・やか",
    "m": "tolerant, leniency, generosity"
  },
  "干": {
    "hv": "CAN",
    "on": "カン",
    "kun": "ほ・す, ほ・し-, -ぼ・し, ひ・る",
    "m": "phạm đến, cầu, mong, can thiệp"
  },
  "幹": {
    "hv": "CÁN",
    "on": "カン",
    "kun": "みき",
    "m": "mình, thân, gốc cây, cán, chuôi"
  },
  "患": {
    "hv": "HOẠN",
    "on": "カン",
    "kun": "わずら・う",
    "m": "hoạn nạn"
  },
  "感": {
    "hv": "CẢM",
    "on": "カン",
    "kun": "—",
    "m": "cảm thấy, cảm động, tình cảm"
  },
  "慣": {
    "hv": "QUÁN",
    "on": "カン",
    "kun": "な・れる, な・らす",
    "m": "quen, nuông chiều"
  },
  "憾": {
    "hv": "HÁM",
    "on": "カン",
    "kun": "うら・む",
    "m": "ăn năn, hối hận"
  },
  "換": {
    "hv": "HOÁN",
    "on": "カン",
    "kun": "か・える, -か・える, か・わる",
    "m": "hoán đổi, trao đổi"
  },
  "敢": {
    "hv": "CẢM",
    "on": "カン",
    "kun": "あ・えて, あ・えない, あ・えず",
    "m": "gan dạ, dám, bạo dạn"
  },
  "棺": {
    "hv": "QUAN",
    "on": "カン",
    "kun": "—",
    "m": "áo quan (cho người chết)"
  },
  "款": {
    "hv": "KHOẢN",
    "on": "カン",
    "kun": "—",
    "m": "thành thực, thết đãi, đón tiếp, khoản mục"
  },
  "歓": {
    "hv": "HOAN",
    "on": "カン",
    "kun": "よろこ・ぶ",
    "m": "vui vẻ, mừng"
  },
  "汗": {
    "hv": "HÃN",
    "on": "カン",
    "kun": "あせ",
    "m": "mồ hôi, mồ hôi"
  },
  "甘": {
    "hv": "CAM",
    "on": "カン",
    "kun": "あま・い, あま・える, あま・やかす, うま・い",
    "m": "ngọt, cam chịu"
  },
  "監": {
    "hv": "GIAM",
    "on": "カン",
    "kun": "—",
    "m": "giam cầm, nhà tù, xem, coi"
  },
  "看": {
    "hv": "KHAN",
    "on": "カン",
    "kun": "み・る",
    "m": "xem, nhìn, đọc, xem, nhìn"
  },
  "竿": {
    "hv": "CAN",
    "on": "カン",
    "kun": "さお",
    "m": "cái cần câu"
  },
  "管": {
    "hv": "QUẢN",
    "on": "カン",
    "kun": "くだ",
    "m": "cai quản, trông nom, cái bút, ống tròn"
  },
  "簡": {
    "hv": "GIẢN",
    "on": "カン, ケン",
    "kun": "えら・ぶ, ふだ",
    "m": "lược bớt, đơn giản hoá, thẻ tre để viết"
  },
  "緩": {
    "hv": "HOÃN",
    "on": "カン",
    "kun": "ゆる・い, ゆる・やか, ゆる・む, ゆる・める",
    "m": "chậm chạp"
  },
  "缶": {
    "hv": "PHŨ",
    "on": "カン",
    "kun": "かま",
    "m": "bộ phũ, bộ phũ, bộ phũ"
  },
  "肝": {
    "hv": "CAN",
    "on": "カン",
    "kun": "きも",
    "m": "lá gan, buồng gan"
  },
  "艦": {
    "hv": "HẠM",
    "on": "カン",
    "kun": "—",
    "m": "tàu chiến"
  },
  "莞": {
    "hv": "HOÀN",
    "on": "カン",
    "kun": "い",
    "m": "cỏ cói (dùng dệt chiếu), (tên huyện), mỉm cười"
  },
  "観": {
    "hv": "QUAN",
    "on": "カン",
    "kun": "み・る, しめ・す",
    "m": "xem, quan sát, xem, quan sát"
  },
  "諌": {
    "hv": "GIÁN",
    "on": "カン",
    "kun": "いさ・め, いさ・める",
    "m": "admonish, dissuade"
  },
  "貫": {
    "hv": "QUÁN",
    "on": "カン",
    "kun": "つらぬ・く, ぬ・く, ぬき",
    "m": "xâu tiền, xuyên qua, chọc thủng, thông xuốt"
  },
  "還": {
    "hv": "HOÀN",
    "on": "カン",
    "kun": "かえ・る",
    "m": "trở về, trả lại, vẫn còn, vẫn chưa"
  },
  "鑑": {
    "hv": "GIÁM",
    "on": "カン",
    "kun": "かんが・みる, かがみ",
    "m": "cái gương soi bằng đồng"
  },
  "間": {
    "hv": "GIAN",
    "on": "カン, ケン",
    "kun": "あいだ, ま, あい",
    "m": "khoảng không gian, kẽ hở, lỗ hổng, chia rẽ"
  },
  "閑": {
    "hv": "NHÀN",
    "on": "カン",
    "kun": "—",
    "m": "nhàn hạ, rảnh rỗi"
  },
  "関": {
    "hv": "QUAN",
    "on": "カン",
    "kun": "せき, -ぜき, かか・わる, からくり, かんぬき",
    "m": "cửa ải, cửa ô, đóng (cửa), quan hệ, liên quan"
  },
  "陥": {
    "hv": "HÃM",
    "on": "カン",
    "kun": "おちい・る, おとしい・れる",
    "m": "collapse, fall into, cave in"
  },
  "韓": {
    "hv": "HÀN",
    "on": "カン",
    "kun": "から, いげた",
    "m": "nước Hàn, Triều Tiên"
  },
  "舘": {
    "hv": "QUÁN",
    "on": "カン",
    "kun": "やかた, たて",
    "m": "nhà, nơi ở, quán trọ"
  },
  "丸": {
    "hv": "HOÀN",
    "on": "ガン",
    "kun": "まる, まる・める, まる・い",
    "m": "viên, vật nhỏ và tròn"
  },
  "含": {
    "hv": "HÀM",
    "on": "ガン",
    "kun": "ふく・む, ふく・める",
    "m": "cằm, nuốt, chứa đựng"
  },
  "岸": {
    "hv": "NGẠN",
    "on": "ガン",
    "kun": "きし",
    "m": "bờ, biên"
  },
  "巌": {
    "hv": "NHAM",
    "on": "ガン",
    "kun": "いわ, いわお, けわ・しい",
    "m": "rock, crag, boulder"
  },
  "玩": {
    "hv": "NGOẠN",
    "on": "ガン",
    "kun": "もちあそ・ぶ, もてあそ・ぶ",
    "m": "chơi đùa"
  },
  "癌": {
    "hv": "NHAM",
    "on": "ガン",
    "kun": "—",
    "m": "bệnh lên nhọt, bệnh ung thư"
  },
  "眼": {
    "hv": "NHÃN",
    "on": "ガン, ゲン",
    "kun": "まなこ, め",
    "m": "cái mắt"
  },
  "岩": {
    "hv": "NHAM",
    "on": "ガン",
    "kun": "いわ",
    "m": "núi cao ngất, nơi hiểm yếu, hang núi"
  },
  "翫": {
    "hv": "NGOẠN",
    "on": "ガン",
    "kun": "もてあそ・ぶ",
    "m": "chơi đùa"
  },
  "贋": {
    "hv": "NHẠN",
    "on": "ガン",
    "kun": "にせ",
    "m": "đồ giả, hàng giả"
  },
  "雁": {
    "hv": "NHẠN",
    "on": "ガン",
    "kun": "かり, かりがね",
    "m": "chim nhạn"
  },
  "頑": {
    "hv": "NGOAN",
    "on": "ガン",
    "kun": "かたく・な",
    "m": "dốt nát, ngu xuẩn, ngoan cố, bảo thủ"
  },
  "顔": {
    "hv": "NHAN",
    "on": "ガン",
    "kun": "かお",
    "m": "dáng mặt, vẻ mặt"
  },
  "願": {
    "hv": "NGUYỆN",
    "on": "ガン",
    "kun": "ねが・う, -ねがい",
    "m": "mong muốn"
  },
  "企": {
    "hv": "XÍ",
    "on": "キ",
    "kun": "くわだ・てる, たくら・む",
    "m": "kiễng chân, mong ngóng"
  },
  "伎": {
    "hv": "KỸ",
    "on": "ギ, キ",
    "kun": "わざ, わざおぎ",
    "m": "tài, khéo"
  },
  "危": {
    "hv": "NGUY",
    "on": "キ",
    "kun": "あぶ・ない, あや・うい, あや・ぶむ",
    "m": "cao mà không vững, nguy khốn, sao Nguy (một trong Nhị thập bát tú)"
  },
  "喜": {
    "hv": "HÝ",
    "on": "キ",
    "kun": "よろこ・ぶ, よろこ・ばす",
    "m": "thích, ưa thích, vui vẻ"
  },
  "器": {
    "hv": "KHÍ",
    "on": "キ",
    "kun": "うつわ",
    "m": "đồ dùng"
  },
  "基": {
    "hv": "CƠ",
    "on": "キ",
    "kun": "もと, もとい",
    "m": "nền, móng, gây dựng, đồ làm ruộng"
  },
  "奇": {
    "hv": "CƠ",
    "on": "キ",
    "kun": "く・しき, あや・しい, くし, めずら・しい",
    "m": "số lẻ (không chia hết cho 2), số thừa, số dư, số lẻ, kỳ lạ, lạ lùng"
  },
  "嬉": {
    "hv": "HY",
    "on": "キ",
    "kun": "うれ・しい, たの・しむ",
    "m": "đùa bỡn, chơi đùa"
  },
  "寄": {
    "hv": "KÝ",
    "on": "キ",
    "kun": "よ・る, -よ・り, よ・せる",
    "m": "phó thác, gửi"
  },
  "岐": {
    "hv": "KỲ",
    "on": "キ, ギ",
    "kun": "—",
    "m": "kỳ, đường rẽ"
  },
  "希": {
    "hv": "HY",
    "on": "キ, ケ",
    "kun": "まれ, こいねが・う",
    "m": "ít, mong muốn"
  },
  "幾": {
    "hv": "KY",
    "on": "キ",
    "kun": "いく-, いく・つ, いく・ら",
    "m": "hầu như, gần như, bao nhiêu"
  },
  "忌": {
    "hv": "KỴ",
    "on": "キ",
    "kun": "い・む, い・み, い・まわしい",
    "m": "ghét"
  },
  "揮": {
    "hv": "HUY",
    "on": "キ",
    "kun": "ふる・う",
    "m": "xua, huơ, múa"
  },
  "机": {
    "hv": "CƠ",
    "on": "キ",
    "kun": "つくえ",
    "m": "công việc, máy móc, công việc"
  },
  "旗": {
    "hv": "KỲ",
    "on": "キ",
    "kun": "はた",
    "m": "lá cờ"
  },
  "既": {
    "hv": "KÝ",
    "on": "キ",
    "kun": "すで・に",
    "m": "đã (đã ... lại còn ..., xem: vưu 尤)"
  },
  "期": {
    "hv": "KỲ",
    "on": "キ, ゴ",
    "kun": "—",
    "m": "thời kỳ, lúc, hẹn"
  },
  "棋": {
    "hv": "KỲ",
    "on": "キ",
    "kun": "ご",
    "m": "cờ (chơi)"
  },
  "棄": {
    "hv": "KHÍ",
    "on": "キ",
    "kun": "す・てる",
    "m": "bỏ đi, vứt đi"
  },
  "機": {
    "hv": "CƠ",
    "on": "キ",
    "kun": "はた",
    "m": "công việc, máy móc, công việc"
  },
  "毅": {
    "hv": "NGHỊ",
    "on": "キ, ギ",
    "kun": "つよ・い",
    "m": "quả quyết, cứng cỏi"
  },
  "汽": {
    "hv": "KHÍ",
    "on": "キ",
    "kun": "—",
    "m": "hơi nước"
  },
  "畿": {
    "hv": "KỲ",
    "on": "キ",
    "kun": "みやこ",
    "m": "ở trong cửa"
  },
  "祈": {
    "hv": "KỲ",
    "on": "キ",
    "kun": "いの・る",
    "m": "cầu phúc, cầu cúng, báo đền"
  },
  "季": {
    "hv": "QUÝ",
    "on": "キ",
    "kun": "—",
    "m": "tháng cuối một quý, mùa, nhỏ, út (em)"
  },
  "稀": {
    "hv": "HY",
    "on": "キ, ケ",
    "kun": "まれ, まばら",
    "m": "thưa thớt, loãng, lỏng"
  },
  "紀": {
    "hv": "KỶ",
    "on": "キ",
    "kun": "—",
    "m": "gỡ mối rối, 12 năm, kỷ cương, kỷ luật"
  },
  "規": {
    "hv": "QUY",
    "on": "キ",
    "kun": "—",
    "m": "quy tắc, quy chế, khuyến khích, khích lệ, cái compa"
  },
  "記": {
    "hv": "KÝ",
    "on": "キ",
    "kun": "しる・す",
    "m": "nhớ, ghi chép, viết"
  },
  "貴": {
    "hv": "QUÝ",
    "on": "キ",
    "kun": "たっと・い, とうと・い, たっと・ぶ, とうと・ぶ",
    "m": "sang, quý giá, quý trọng"
  },
  "起": {
    "hv": "KHỈ",
    "on": "キ",
    "kun": "お・きる, お・こる, お・こす, おこ・す, た・つ",
    "m": "bắt đầu, đứng dậy, bắt đầu"
  },
  "軌": {
    "hv": "QUỸ",
    "on": "キ",
    "kun": "—",
    "m": "cỡ bánh xe, vết bánh xe, đường sắt, đường ray"
  },
  "輝": {
    "hv": "HUY",
    "on": "キ",
    "kun": "かがや・く",
    "m": "ánh sáng, soi, chiếu"
  },
  "飢": {
    "hv": "CƠ",
    "on": "キ",
    "kun": "う・える",
    "m": "đói, mất mùa, đói"
  },
  "騎": {
    "hv": "KỴ",
    "on": "キ",
    "kun": "—",
    "m": "ngựa đã đóng cương, cưỡi ngựa"
  },
  "鬼": {
    "hv": "QUỶ",
    "on": "キ",
    "kun": "おに, おに-",
    "m": "ma quỷ, sao Quỷ (một trong Nhị thập bát tú)"
  },
  "亀": {
    "hv": "QUY",
    "on": "キ, キュウ, キン",
    "kun": "かめ",
    "m": "con rùa"
  },
  "偽": {
    "hv": "NGUỴ",
    "on": "ギ, カ",
    "kun": "いつわ・る, にせ, いつわ・り",
    "m": "giả, nguỵ"
  },
  "儀": {
    "hv": "NGHI",
    "on": "ギ",
    "kun": "—",
    "m": "dáng bên ngoài, lễ nghi, nghi thức"
  },
  "宜": {
    "hv": "NGHI",
    "on": "ギ",
    "kun": "よろ・しい, よろ・しく",
    "m": "thích đáng, phù hợp, nên"
  },
  "戯": {
    "hv": "HÍ",
    "on": "ギ, ゲ",
    "kun": "たわむ・れる, ざ・れる, じゃ・れる",
    "m": "frolic, play, sport"
  },
  "擬": {
    "hv": "NGHĨ",
    "on": "ギ",
    "kun": "まが・い, もど・き",
    "m": "định, phỏng theo"
  },
  "欺": {
    "hv": "KHI",
    "on": "ギ",
    "kun": "あざむ・く",
    "m": "lừa dối, bắt nạt, ức hiếp"
  },
  "犠": {
    "hv": "HY",
    "on": "ギ, キ",
    "kun": "いけにえ",
    "m": "con vật tế thần"
  },
  "疑": {
    "hv": "NGHI",
    "on": "ギ",
    "kun": "うたが・う",
    "m": "nghi ngờ, ngỡ là"
  },
  "祇": {
    "hv": "KỲ",
    "on": "ギ, キ, シ",
    "kun": "くにつかみ, ただ, まさに",
    "m": "chỉ, vừa vặn, thần đất, làm cho yên lòng"
  },
  "義": {
    "hv": "NGHĨA",
    "on": "ギ",
    "kun": "—",
    "m": "nghĩa khí"
  },
  "誼": {
    "hv": "NGHỊ",
    "on": "ギ",
    "kun": "よしみ, よい",
    "m": "tình bạn bè"
  },
  "議": {
    "hv": "NGHỊ",
    "on": "ギ",
    "kun": "—",
    "m": "bàn bạc"
  },
  "菊": {
    "hv": "CÚC",
    "on": "キク",
    "kun": "—",
    "m": "hoa cúc"
  },
  "鞠": {
    "hv": "CÚC",
    "on": "キク, キュウ",
    "kun": "まり",
    "m": "quả bóng da, nuôi nấng, cong, khom"
  },
  "吉": {
    "hv": "CÁT",
    "on": "キチ, キツ",
    "kun": "よし",
    "m": "tốt lành"
  },
  "喫": {
    "hv": "KHIẾT",
    "on": "キツ",
    "kun": "の・む",
    "m": "ăn uống"
  },
  "橘": {
    "hv": "QUẤT",
    "on": "キツ",
    "kun": "たちばな",
    "m": "cây quít, cây quất"
  },
  "詰": {
    "hv": "CẬT",
    "on": "キツ, キチ",
    "kun": "つ・める, つ・め, -づ・め, つ・まる, つ・む",
    "m": "hỏi vặn"
  },
  "杵": {
    "hv": "CHỬ",
    "on": "ショ, ソ",
    "kun": "きね",
    "m": "cái chầy, cái chày, cái chầy, cái chày"
  },
  "却": {
    "hv": "KHƯỚC",
    "on": "キャク",
    "kun": "かえ・って, しりぞ・く, しりぞ・ける",
    "m": "lùi bước, từ chối, mất đi"
  },
  "客": {
    "hv": "KHÁCH",
    "on": "キャク, カク",
    "kun": "—",
    "m": "khách, người ngoài"
  },
  "脚": {
    "hv": "CƯỚC",
    "on": "キャク, キャ, カク",
    "kun": "あし",
    "m": "chân"
  },
  "虐": {
    "hv": "NGƯỢC",
    "on": "ギャク",
    "kun": "しいた・げる",
    "m": "ác nghiệt, tai ngược"
  },
  "逆": {
    "hv": "NGHỊCH",
    "on": "ギャク, ゲキ",
    "kun": "さか, さか・さ, さか・らう",
    "m": "trái ngược"
  },
  "丘": {
    "hv": "KHÂU",
    "on": "キュウ",
    "kun": "おか",
    "m": "gò, đống, thửa (ruộng)"
  },
  "久": {
    "hv": "CỬU",
    "on": "キュウ, ク",
    "kun": "ひさ・しい",
    "m": "lâu, chờ đợi"
  },
  "仇": {
    "hv": "CỪU",
    "on": "キュウ, グ",
    "kun": "あだ, あた, かたき, つれあい",
    "m": "kẻ thù"
  },
  "休": {
    "hv": "HƯU",
    "on": "キュウ",
    "kun": "やす・む, やす・まる, やす・める",
    "m": "nghỉ ngơi, thôi, dừng, tốt lành"
  },
  "及": {
    "hv": "CẬP",
    "on": "キュウ",
    "kun": "およ・ぶ, およ・び, および, およ・ぼす",
    "m": "tới, đến, kịp, bằng, cùng với, và"
  },
  "吸": {
    "hv": "HẤP",
    "on": "キュウ",
    "kun": "す・う",
    "m": "hấp thụ, hút vào"
  },
  "宮": {
    "hv": "CUNG",
    "on": "キュウ, グウ, ク, クウ",
    "kun": "みや",
    "m": "cung điện"
  },
  "弓": {
    "hv": "CUNG",
    "on": "キュウ",
    "kun": "ゆみ",
    "m": "cong, cái cung, cung (đơn vị đo, bằng 10 xích)"
  },
  "急": {
    "hv": "CẤP",
    "on": "キュウ",
    "kun": "いそ・ぐ, いそ・ぎ, せ・く",
    "m": "vội vàng, kíp, nóng nảy"
  },
  "救": {
    "hv": "CỨU",
    "on": "キュウ",
    "kun": "すく・う",
    "m": "cứu giúp"
  },
  "朽": {
    "hv": "HỦ",
    "on": "キュウ",
    "kun": "く・ちる",
    "m": "gỗ mục"
  },
  "求": {
    "hv": "CẦU",
    "on": "キュウ, グ",
    "kun": "もと・める",
    "m": "cầu xin"
  },
  "泣": {
    "hv": "KHẤP",
    "on": "キュウ",
    "kun": "な・く",
    "m": "khóc không thành tiếng"
  },
  "球": {
    "hv": "CẦU",
    "on": "キュウ",
    "kun": "たま",
    "m": "cái khánh bằng ngọc, hình cầu, quả cầu, quả bóng"
  },
  "窮": {
    "hv": "CÙNG",
    "on": "キュウ, キョウ",
    "kun": "きわ・める, きわ・まる, きわ・まり, きわ・み",
    "m": "cuối, hết"
  },
  "級": {
    "hv": "CẤP",
    "on": "キュウ",
    "kun": "—",
    "m": "cấp bậc"
  },
  "糾": {
    "hv": "CỦ",
    "on": "キュウ",
    "kun": "ただ・す",
    "m": "dây chập ba lần, thu lại, gộp lại"
  },
  "給": {
    "hv": "CẤP",
    "on": "キュウ",
    "kun": "たま・う, たも・う, -たま・え",
    "m": "đủ dùng, cấp, phát"
  },
  "旧": {
    "hv": "CỰU",
    "on": "キュウ",
    "kun": "ふる・い, もと",
    "m": "cũ, lâu"
  },
  "牛": {
    "hv": "NGƯU",
    "on": "ギュウ",
    "kun": "うし",
    "m": "con trâu, sao Ngưu"
  },
  "去": {
    "hv": "KHỨ",
    "on": "キョ, コ",
    "kun": "さ・る, -さ・る",
    "m": "đi, bỏ, đã qua"
  },
  "居": {
    "hv": "CƯ",
    "on": "キョ, コ",
    "kun": "い・る, -い, お・る",
    "m": "ở, cư trú"
  },
  "巨": {
    "hv": "CỰ",
    "on": "キョ",
    "kun": "—",
    "m": "lớn, to"
  },
  "拒": {
    "hv": "CỰ",
    "on": "キョ, ゴ",
    "kun": "こば・む",
    "m": "đánh trả, chống cự"
  },
  "拠": {
    "hv": "CỨ",
    "on": "キョ, コ",
    "kun": "よ・る",
    "m": "foothold, based on, follow"
  },
  "挙": {
    "hv": "CỬ",
    "on": "キョ",
    "kun": "あ・げる, あ・がる, こぞ・る",
    "m": "raise, plan, project"
  },
  "虚": {
    "hv": "HƯ",
    "on": "キョ, コ",
    "kun": "むな・しい, うつ・ろ",
    "m": "không có thực, trống rỗng"
  },
  "許": {
    "hv": "HỨA",
    "on": "キョ",
    "kun": "ゆる・す, もと",
    "m": "khen, hứa hẹn, rất, lắm"
  },
  "距": {
    "hv": "CỰ",
    "on": "キョ",
    "kun": "へだ・たる, けづめ",
    "m": "khoảng cách"
  },
  "漁": {
    "hv": "NGƯ",
    "on": "ギョ, リョウ",
    "kun": "あさ・る",
    "m": "người đánh cá, đánh cá"
  },
  "魚": {
    "hv": "NGƯ",
    "on": "ギョ",
    "kun": "うお, さかな, -ざかな",
    "m": "con cá"
  },
  "亨": {
    "hv": "HANH",
    "on": "コウ, キョウ, ホウ",
    "kun": "とお・る",
    "m": "thông"
  },
  "享": {
    "hv": "HƯỞNG",
    "on": "キョウ, コウ",
    "kun": "う・ける",
    "m": "dâng đồ, hưởng thụ"
  },
  "供": {
    "hv": "CUNG",
    "on": "キョウ, ク, クウ, グ",
    "kun": "そな・える, とも, -ども",
    "m": "cung cấp, tặng, lời khai, khẩu cung"
  },
  "侠": {
    "hv": "HIỆP",
    "on": "キョウ",
    "kun": "きゃん, おとこだて",
    "m": "hào hiệp, hiệp sĩ"
  },
  "僑": {
    "hv": "KIỀU",
    "on": "キョウ",
    "kun": "—",
    "m": "ở nhờ, đi ở nơi khác, kiều dân"
  },
  "競": {
    "hv": "CẠNH",
    "on": "キョウ, ケイ",
    "kun": "きそ・う, せ・る, くら・べる",
    "m": "mạnh, khỏe, ganh đua"
  },
  "共": {
    "hv": "CỘNG",
    "on": "キョウ",
    "kun": "とも, とも・に, -ども",
    "m": "cùng, chung, cộng"
  },
  "凶": {
    "hv": "HUNG",
    "on": "キョウ",
    "kun": "—",
    "m": "hung ác, dữ tợn, sợ hãi"
  },
  "協": {
    "hv": "HIỆP",
    "on": "キョウ",
    "kun": "—",
    "m": "hoà hợp, giúp đỡ"
  },
  "匡": {
    "hv": "KHUÔNG",
    "on": "キョウ, オウ",
    "kun": "すく・う, ただ・す",
    "m": "sửa lại, chỉnh lại"
  },
  "卿": {
    "hv": "KHANH",
    "on": "ケイ, キョウ",
    "kun": "きみ",
    "m": "quan khanh, tiếng vua gọi bầy tôi"
  },
  "叫": {
    "hv": "KHIẾU",
    "on": "キョウ",
    "kun": "さけ・ぶ",
    "m": "kêu, gọi"
  },
  "喬": {
    "hv": "KIỀU",
    "on": "キョウ",
    "kun": "たか・い",
    "m": "cao, giả trang"
  },
  "峡": {
    "hv": "GIÁP",
    "on": "キョウ, コウ",
    "kun": "はざま",
    "m": "eo đất, eo biển, eo đất, eo biển"
  },
  "恐": {
    "hv": "KHỦNG",
    "on": "キョウ",
    "kun": "おそ・れる, おそ・る, おそ・ろしい, こわ・い, こわ・がる",
    "m": "sợ hãi, doạ nạt"
  },
  "恭": {
    "hv": "CUNG",
    "on": "キョウ",
    "kun": "うやうや・しい",
    "m": "kính cẩn, cung kính"
  },
  "挟": {
    "hv": "HIỆP",
    "on": "キョウ, ショウ",
    "kun": "はさ・む, はさ・まる, わきばさ・む, さしはさ・む",
    "m": "cắp, xách, xốc, gắp, cậy, nhờ, dựa vào, cái đũa"
  },
  "教": {
    "hv": "GIAO",
    "on": "キョウ",
    "kun": "おし・える, おそ・わる",
    "m": "dạy dỗ, truyền thụ, tôn giáo, đạo, sai bảo, khiến"
  },
  "橋": {
    "hv": "KIỀU",
    "on": "キョウ",
    "kun": "はし",
    "m": "cái cầu"
  },
  "況": {
    "hv": "HUỐNG",
    "on": "キョウ",
    "kun": "まし・て, いわ・んや, おもむき",
    "m": "huống chi, huống hồ"
  },
  "狂": {
    "hv": "CUỒNG",
    "on": "キョウ",
    "kun": "くる・う, くる・おしい, くるお・しい",
    "m": "điên cuồng"
  },
  "矯": {
    "hv": "KIỂU",
    "on": "キョウ",
    "kun": "た・める",
    "m": "nắn thẳng ra"
  },
  "胸": {
    "hv": "HUNG",
    "on": "キョウ",
    "kun": "むね, むな-",
    "m": "ngực, bụng"
  },
  "脅": {
    "hv": "HIẾP",
    "on": "キョウ",
    "kun": "おびや・かす, おど・す, おど・かす",
    "m": "sườn, hai bên ngực, bức hiếp"
  },
  "興": {
    "hv": "HƯNG",
    "on": "コウ, キョウ",
    "kun": "おこ・る, おこ・す",
    "m": "thức dậy, hưng thịnh, dấy lên"
  },
  "郷": {
    "hv": "HƯƠNG",
    "on": "キョウ, ゴウ",
    "kun": "さと",
    "m": "home town, village, native place"
  },
  "鏡": {
    "hv": "CẢNH",
    "on": "キョウ, ケイ",
    "kun": "かがみ",
    "m": "gương, kính, gương, kính"
  },
  "響": {
    "hv": "HƯỞNG",
    "on": "キョウ",
    "kun": "ひび・く",
    "m": "vọng lại, tiếng vọng tiếng vang, điểm (giờ)"
  },
  "饗": {
    "hv": "HƯỞNG",
    "on": "キョウ",
    "kun": "う・ける, もてな・す",
    "m": "thết đãi long trọng, tế tập thể"
  },
  "驚": {
    "hv": "KINH",
    "on": "キョウ",
    "kun": "おどろ・く, おどろ・かす",
    "m": "kinh động, kinh sợ"
  },
  "仰": {
    "hv": "NGƯỠNG",
    "on": "ギョウ, コウ",
    "kun": "あお・ぐ, おお・せ, お・っしゃる, おっしゃ・る",
    "m": "ngẩng lên, kính mến"
  },
  "凝": {
    "hv": "NGƯNG",
    "on": "ギョウ",
    "kun": "こ・る, こ・らす, こご・らす, こご・らせる, こご・る",
    "m": "ngưng đọng"
  },
  "尭": {
    "hv": "NGHIÊU",
    "on": "ギョウ",
    "kun": "たか・い",
    "m": "high, far"
  },
  "暁": {
    "hv": "HIỂU",
    "on": "ギョウ, キョウ",
    "kun": "あかつき, さと・る",
    "m": "daybreak, dawn, in the event"
  },
  "業": {
    "hv": "NGHIỆP",
    "on": "ギョウ, ゴウ",
    "kun": "わざ",
    "m": "nghề nghiệp, sự nghiệp"
  },
  "局": {
    "hv": "CỤC",
    "on": "キョク",
    "kun": "つぼね",
    "m": "ván (cờ), cuộc, bữa, phần, bộ phận"
  },
  "曲": {
    "hv": "KHÚC",
    "on": "キョク",
    "kun": "ま・がる, ま・げる, くま",
    "m": "cong queo, khúc, đoạn"
  },
  "極": {
    "hv": "CỰC",
    "on": "キョク, ゴク",
    "kun": "きわ・める, きわ・まる, きわ・まり, きわ・み, き・める, -ぎ・め, き・まる",
    "m": "cực, tột cùng"
  },
  "玉": {
    "hv": "NGỌC",
    "on": "ギョク",
    "kun": "たま, たま-, -だま",
    "m": "viên ngọc, đá quý, đẹp"
  },
  "桐": {
    "hv": "ĐỒNG",
    "on": "トウ, ドウ",
    "kun": "きり",
    "m": "(xem: ngô đồng 梧桐)"
  },
  "僅": {
    "hv": "CẨN",
    "on": "キン, ゴン",
    "kun": "わず・か",
    "m": "chỉ, ít ỏi, vẻn vẹn, chỉ, ít ỏi, vẻn vẹn"
  },
  "勤": {
    "hv": "CẦN",
    "on": "キン, ゴン",
    "kun": "つと・める, -づと・め, つと・まる, いそ・しむ",
    "m": "cố hết sức, chăm chỉ, cần cù"
  },
  "均": {
    "hv": "QUÂN",
    "on": "キン",
    "kun": "なら・す",
    "m": "đều, bằng nhau"
  },
  "巾": {
    "hv": "CÂN",
    "on": "キン, フク",
    "kun": "おお・い, ちきり, きれ",
    "m": "cái khăn"
  },
  "錦": {
    "hv": "CẨM",
    "on": "キン",
    "kun": "にしき",
    "m": "gấm"
  },
  "斤": {
    "hv": "CÂN",
    "on": "キン",
    "kun": "—",
    "m": "cái rìu, cân (đơn vị khối lượng)"
  },
  "欣": {
    "hv": "HÂN",
    "on": "キン, ゴン, コン",
    "kun": "よろこ・ぶ, よろこ・び",
    "m": "sung sướng, mừng, vui vẻ"
  },
  "欽": {
    "hv": "KHÂM",
    "on": "キン, コン",
    "kun": "つつし・む",
    "m": "của vua, thuộc về vua"
  },
  "琴": {
    "hv": "CẦM",
    "on": "キン, ゴン",
    "kun": "こと",
    "m": "cái đàn cầm"
  },
  "禁": {
    "hv": "CẤM",
    "on": "キン",
    "kun": "—",
    "m": "cấm đoán (không cho phép), kiêng kị, tránh, cấm đoán (không cho phép)"
  },
  "筋": {
    "hv": "CÂN",
    "on": "キン",
    "kun": "すじ",
    "m": "gân (thớ thịt)"
  },
  "緊": {
    "hv": "KHẨN",
    "on": "キン",
    "kun": "し・める, し・まる",
    "m": "căng (dây)"
  },
  "芹": {
    "hv": "CẦN",
    "on": "キン",
    "kun": "せり",
    "m": "rau cần"
  },
  "菌": {
    "hv": "KHUẨN",
    "on": "キン",
    "kun": "—",
    "m": "cây nấm, vi khuẩn"
  },
  "衿": {
    "hv": "KHÂM",
    "on": "キン, コン",
    "kun": "えり",
    "m": "cổ áo, vạt áo"
  },
  "襟": {
    "hv": "KHÂM",
    "on": "キン",
    "kun": "えり",
    "m": "cổ áo, vạt áo"
  },
  "謹": {
    "hv": "CẨN",
    "on": "キン",
    "kun": "つつし・む",
    "m": "cẩn thận, không sơ suất"
  },
  "近": {
    "hv": "CẬN",
    "on": "キン, コン",
    "kun": "ちか・い",
    "m": "gần, bên cạnh"
  },
  "金": {
    "hv": "KIM",
    "on": "キン, コン, ゴン",
    "kun": "かね, かな-, -がね",
    "m": "vàng, tiền, sao Kim, nước Kim"
  },
  "吟": {
    "hv": "NGÂM",
    "on": "ギン",
    "kun": "—",
    "m": "ngâm thơ"
  },
  "銀": {
    "hv": "NGÂN",
    "on": "ギン",
    "kun": "しろがね",
    "m": "bạc, Ag"
  },
  "倶": {
    "hv": "CÂU",
    "on": "グ, ク",
    "kun": "とも・に",
    "m": "như chữ 俱"
  },
  "句": {
    "hv": "CÚ",
    "on": "ク",
    "kun": "—",
    "m": "câu nói"
  },
  "区": {
    "hv": "ÂU",
    "on": "ク, オウ, コウ",
    "kun": "—",
    "m": "khu vực, vùng, cái âu, âu (đơn vị đo khối lượng, bằng bốn đấu)"
  },
  "玖": {
    "hv": "CỬU",
    "on": "キュウ, ク",
    "kun": "—",
    "m": "đá đen giống ngọc, 9, chín (như: 九, dùng viết trong văn tự)"
  },
  "矩": {
    "hv": "CỦ",
    "on": "ク",
    "kun": "かね, かねざし, さしがね",
    "m": "cái khuôn, khuôn phép"
  },
  "苦": {
    "hv": "KHỔ",
    "on": "ク",
    "kun": "くる・しい, -ぐる・しい, くる・しむ, くる・しめる, にが・い, にが・る",
    "m": "khổ cực, cố gắng hết sức"
  },
  "駆": {
    "hv": "KHU",
    "on": "ク",
    "kun": "か・ける, か・る",
    "m": "drive, run, gallop"
  },
  "駒": {
    "hv": "CÂU",
    "on": "ク",
    "kun": "こま",
    "m": "ngựa non, khoẻ"
  },
  "具": {
    "hv": "CỤ",
    "on": "グ",
    "kun": "そな・える, つぶさ・に",
    "m": "đồ dùng"
  },
  "愚": {
    "hv": "NGU",
    "on": "グ",
    "kun": "おろ・か",
    "m": "ngu đần"
  },
  "虞": {
    "hv": "NGU",
    "on": "グ",
    "kun": "おそれ, おもんぱか・る, はか・る, うれ・える, あざむ・く, あやま・る, のぞ・む, たの・しむ",
    "m": "dự liệu, tính toán trước, yên vui, họ Ngu, nước Ngu, đời nhà Ngu"
  },
  "偶": {
    "hv": "NGẪU",
    "on": "グウ",
    "kun": "たま",
    "m": "tình cờ, đôi, chẵn, tượng gỗ"
  },
  "寓": {
    "hv": "NGỤ",
    "on": "グウ, グ, ドウ",
    "kun": "ぐう・する, かこつ・ける, よ・せる, よ・る, かりずまい",
    "m": "nhờ cậy, nói bóng gió"
  },
  "遇": {
    "hv": "NGỘ",
    "on": "グウ",
    "kun": "あ・う",
    "m": "gặp gỡ"
  },
  "隅": {
    "hv": "NGUNG",
    "on": "グウ",
    "kun": "すみ",
    "m": "đất ngoài ven, cạnh góc"
  },
  "串": {
    "hv": "XUYẾN",
    "on": "カン, ケン, セン",
    "kun": "くし, つらぬ・く",
    "m": "suốt, xâu, chuỗi"
  },
  "櫛": {
    "hv": "TRẤT",
    "on": "シツ",
    "kun": "くし, くしけず・る",
    "m": "cái lược, chải tóc"
  },
  "釧": {
    "hv": "XUYẾN",
    "on": "セン",
    "kun": "くしろ, うでわ",
    "m": "cái xuyến, cái vòng tay"
  },
  "屈": {
    "hv": "KHUẤT",
    "on": "クツ",
    "kun": "かが・む, かが・める",
    "m": "cong, khuất phục, (xem: quật cường 屈彊)"
  },
  "掘": {
    "hv": "QUẬT",
    "on": "クツ",
    "kun": "ほ・る",
    "m": "đào lên"
  },
  "窟": {
    "hv": "QUẬT",
    "on": "クツ, コツ",
    "kun": "いわや, いはや, あな",
    "m": "cái hang, nhà hầm"
  },
  "靴": {
    "hv": "NGOA",
    "on": "カ",
    "kun": "くつ",
    "m": "giày ủng"
  },
  "窪": {
    "hv": "OA",
    "on": "ワ, ア",
    "kun": "くぼ・む, くぼ・み, くぼ・まる, くぼ",
    "m": "chỗ trũng"
  },
  "熊": {
    "hv": "HÙNG",
    "on": "ユウ",
    "kun": "くま",
    "m": "con gấu"
  },
  "隈": {
    "hv": "ÔI",
    "on": "ワイ, エ",
    "kun": "くま, すみ",
    "m": "khúc cong của sông hay núi"
  },
  "栗": {
    "hv": "LẬT",
    "on": "リツ, リ",
    "kun": "くり, おののく",
    "m": "cây lật, cây dẻ, bền chắc"
  },
  "繰": {
    "hv": "SÀO",
    "on": "ソウ",
    "kun": "く・る",
    "m": "ươm tơ (kéo tơ ở kén ra), ươm tơ (kéo tơ ở kén ra)"
  },
  "桑": {
    "hv": "TANG",
    "on": "ソウ",
    "kun": "くわ",
    "m": "cây dâu"
  },
  "勲": {
    "hv": "HUÂN",
    "on": "クン",
    "kun": "いさお",
    "m": "công lao, huân chương"
  },
  "君": {
    "hv": "QUÂN",
    "on": "クン",
    "kun": "きみ, -ぎみ",
    "m": "chỉ người con trai, vua, chồng"
  },
  "薫": {
    "hv": "HUÂN",
    "on": "クン",
    "kun": "かお・る",
    "m": "send forth fragrance, fragrant, be scented"
  },
  "訓": {
    "hv": "HUẤN",
    "on": "クン, キン",
    "kun": "おし・える, よ・む, くん・ずる",
    "m": "dạy dỗ, răn bảo"
  },
  "群": {
    "hv": "QUẦN",
    "on": "グン",
    "kun": "む・れる, む・れ, むら, むら・がる",
    "m": "chòm (sao), nhóm, tụ họp, bè bạn"
  },
  "軍": {
    "hv": "QUÂN",
    "on": "グン",
    "kun": "いくさ",
    "m": "quân, binh lính"
  },
  "郡": {
    "hv": "QUẬN",
    "on": "グン",
    "kun": "こおり",
    "m": "quận (đơn vị hành chính)"
  },
  "袈": {
    "hv": "CA",
    "on": "ケ, カ",
    "kun": "—",
    "m": "(xem: ca sa 袈裟)"
  },
  "係": {
    "hv": "HỆ",
    "on": "ケイ",
    "kun": "かか・る, かかり, -がかり, かか・わる",
    "m": "buộc, bó, nối"
  },
  "傾": {
    "hv": "KHUYNH",
    "on": "ケイ",
    "kun": "かたむ・く, かたむ・ける, かたぶ・く, かた・げる, かし・げる",
    "m": "nghiêng, đè úp, dốc hết"
  },
  "刑": {
    "hv": "HÌNH",
    "on": "ケイ",
    "kun": "—",
    "m": "hình phạt"
  },
  "兄": {
    "hv": "HUYNH",
    "on": "ケイ, キョウ",
    "kun": "あに",
    "m": "anh trai"
  },
  "啓": {
    "hv": "KHẢI",
    "on": "ケイ",
    "kun": "ひら・く, さと・す",
    "m": "mở ra, bắt đầu, mở ra"
  },
  "圭": {
    "hv": "KHUÊ",
    "on": "ケイ, ケ",
    "kun": "—",
    "m": "ngọc khuê, nguyên tố silic, Si"
  },
  "型": {
    "hv": "HÌNH",
    "on": "ケイ",
    "kun": "かた, -がた",
    "m": "cái khuôn đất để đúc, làm gương, làm mẫu"
  },
  "契": {
    "hv": "KHIẾT",
    "on": "ケイ",
    "kun": "ちぎ・る",
    "m": "xa cách, (xem: khiết đan 契丹), văn tự để làm tin, hợp đồng"
  },
  "形": {
    "hv": "HÌNH",
    "on": "ケイ, ギョウ",
    "kun": "かた, -がた, かたち, なり",
    "m": "dáng vẻ, hình dáng"
  },
  "径": {
    "hv": "KÍNH",
    "on": "ケイ",
    "kun": "みち, こみち, さしわたし, ただちに",
    "m": "đường tắt, lối tắt, thẳng"
  },
  "恵": {
    "hv": "HUỆ",
    "on": "ケイ, エ",
    "kun": "めぐ・む, めぐ・み",
    "m": "favor, blessing, grace"
  },
  "慶": {
    "hv": "KHÁNH",
    "on": "ケイ",
    "kun": "よろこ・び",
    "m": "mừng, chúc mừng"
  },
  "慧": {
    "hv": "TUỆ",
    "on": "ケイ, エ",
    "kun": "さとい",
    "m": "(trong trí tuệ)"
  },
  "憩": {
    "hv": "KHẾ",
    "on": "ケイ",
    "kun": "いこ・い, いこ・う",
    "m": "nghỉ ngơi"
  },
  "掲": {
    "hv": "KHẾ",
    "on": "ケイ",
    "kun": "かか・げる",
    "m": "put up (a notice), put up, hoist"
  },
  "携": {
    "hv": "HUỀ",
    "on": "ケイ",
    "kun": "たずさ・える, たずさ・わる",
    "m": "xách, chống, dắt"
  },
  "敬": {
    "hv": "KÍNH",
    "on": "ケイ, キョウ",
    "kun": "うやま・う",
    "m": "tôn trọng, kính trọng"
  },
  "景": {
    "hv": "CẢNH",
    "on": "ケイ",
    "kun": "—",
    "m": "cảnh vật, phong cảnh"
  },
  "桂": {
    "hv": "QUẾ",
    "on": "ケイ",
    "kun": "かつら",
    "m": "cây quế"
  },
  "渓": {
    "hv": "HOÁT",
    "on": "ケイ",
    "kun": "たに, たにがわ",
    "m": "mountain stream, valley"
  },
  "稽": {
    "hv": "KÊ",
    "on": "ケイ",
    "kun": "かんが・える, とど・める",
    "m": "lạy, dập đầu, xem xét, suy xét, cãi cọ"
  },
  "系": {
    "hv": "HỆ",
    "on": "ケイ",
    "kun": "—",
    "m": "buộc, bó, nối"
  },
  "継": {
    "hv": "KẾ",
    "on": "ケイ",
    "kun": "つ・ぐ, まま-",
    "m": "inherit, succeed, continue"
  },
  "茎": {
    "hv": "HÀNH",
    "on": "ケイ, キョウ",
    "kun": "くき",
    "m": "thân cây cỏ, cái chuôi"
  },
  "蛍": {
    "hv": "HUỲNH",
    "on": "ケイ",
    "kun": "ほたる",
    "m": "lightning-bug, firefly"
  },
  "計": {
    "hv": "KẾ",
    "on": "ケイ",
    "kun": "はか・る, はか・らう",
    "m": "mưu kế, kế sách"
  },
  "詣": {
    "hv": "NGHỆ",
    "on": "ケイ, ゲイ",
    "kun": "けい・する, まい・る, いた・る, もう・でる",
    "m": "đến tận nơi"
  },
  "警": {
    "hv": "CẢNH",
    "on": "ケイ",
    "kun": "いまし・める",
    "m": "đề phòng, phòng ngừa"
  },
  "頚": {
    "hv": "CẢNH",
    "on": "ケイ",
    "kun": "くび",
    "m": "neck, head"
  },
  "鶏": {
    "hv": "KÊ",
    "on": "ケイ",
    "kun": "にわとり, とり",
    "m": "chicken"
  },
  "芸": {
    "hv": "VÂN",
    "on": "ゲイ, ウン",
    "kun": "う・える, のり, わざ",
    "m": "gieo, rắc"
  },
  "迎": {
    "hv": "NGHINH",
    "on": "ゲイ",
    "kun": "むか・える",
    "m": "đón tiếp, đón tiếp"
  },
  "鯨": {
    "hv": "KÌNH",
    "on": "ゲイ",
    "kun": "くじら",
    "m": "cá kình, cá voi"
  },
  "劇": {
    "hv": "KỊCH",
    "on": "ゲキ",
    "kun": "—",
    "m": "quá mức, trò đùa, vở kịch"
  },
  "撃": {
    "hv": "KÍCH",
    "on": "ゲキ",
    "kun": "う・つ",
    "m": "đánh mạnh, gõ mạnh"
  },
  "激": {
    "hv": "KHÍCH",
    "on": "ゲキ",
    "kun": "はげ・しい",
    "m": "nước bắn lên, mau, xiết, khích lệ, kích"
  },
  "隙": {
    "hv": "KHÍCH",
    "on": "ゲキ, キャク, ケキ",
    "kun": "すき, す・く, す・かす, ひま",
    "m": "khe hở, khoảng"
  },
  "桁": {
    "hv": "HÀNH",
    "on": "コウ",
    "kun": "けた",
    "m": "cái dầm gỗ, cái cùm to"
  },
  "傑": {
    "hv": "KIỆT",
    "on": "ケツ",
    "kun": "すぐ・れる",
    "m": "giỏi giang (trong tuấn kiệt)"
  },
  "欠": {
    "hv": "KHIẾM",
    "on": "ケツ, ケン",
    "kun": "か・ける, か・く",
    "m": "thiếu thốn, nợ, ngáp"
  },
  "決": {
    "hv": "QUYẾT",
    "on": "ケツ",
    "kun": "き・める, -ぎ・め, き・まる, さ・く",
    "m": "khơi, tháo, vỡ đê, quyết tâm, nhất định"
  },
  "潔": {
    "hv": "KHIẾT",
    "on": "ケツ",
    "kun": "いさぎよ・い",
    "m": "trong sạch"
  },
  "穴": {
    "hv": "HUYỆT",
    "on": "ケツ",
    "kun": "あな",
    "m": "hang, lỗ, hố"
  },
  "結": {
    "hv": "KẾT",
    "on": "ケツ, ケチ",
    "kun": "むす・ぶ, ゆ・う, ゆ・わえる",
    "m": "thắt nút, kết, bó, liên kết"
  },
  "血": {
    "hv": "HUYẾT",
    "on": "ケツ",
    "kun": "ち",
    "m": "máu"
  },
  "件": {
    "hv": "KIỆN",
    "on": "ケン",
    "kun": "くだん",
    "m": "phân biệt, từ chỉ đồ đựng trong bồ hay sọt"
  },
  "倹": {
    "hv": "KIỆM",
    "on": "ケン",
    "kun": "つま・しい, つづまやか",
    "m": "tiết kiệm"
  },
  "健": {
    "hv": "KIỆN",
    "on": "ケン",
    "kun": "すこ・やか",
    "m": "khoẻ mạnh, sức khoẻ, giỏi giang"
  },
  "兼": {
    "hv": "KIÊM",
    "on": "ケン",
    "kun": "か・ねる, -か・ねる",
    "m": "gấp đôi, kiêm nhiệm"
  },
  "券": {
    "hv": "KHOÁN",
    "on": "ケン",
    "kun": "—",
    "m": "văn tự để làm tin"
  },
  "剣": {
    "hv": "KIẾM",
    "on": "ケン",
    "kun": "つるぎ",
    "m": "cái kiếm"
  },
  "喧": {
    "hv": "HUYÊN",
    "on": "ケン",
    "kun": "やかま・しい, かまびす・しい",
    "m": "ồn ào, ầm ĩ"
  },
  "圏": {
    "hv": "KHUYÊN",
    "on": "ケン",
    "kun": "かこ・い",
    "m": "cái vòng, vành, vòng tròn, chuồng nuôi gia súc"
  },
  "堅": {
    "hv": "KIÊN",
    "on": "ケン",
    "kun": "かた・い, -がた・い",
    "m": "bền vững, cố sức, không lo sợ"
  },
  "嫌": {
    "hv": "HIỀM",
    "on": "ケン, ゲン",
    "kun": "きら・う, きら・い, いや",
    "m": "sự nghi ngờ"
  },
  "建": {
    "hv": "KIẾN",
    "on": "ケン, コン",
    "kun": "た・てる, た・て, -だ・て, た・つ",
    "m": "xây dựng"
  },
  "憲": {
    "hv": "HIẾN",
    "on": "ケン",
    "kun": "—",
    "m": "pháp luật, hiến pháp, quan trên"
  },
  "懸": {
    "hv": "HUYỀN",
    "on": "ケン, ケ",
    "kun": "か・ける, か・かる",
    "m": "còn lại, tồn lại, sai, cách biệt, treo lên"
  },
  "拳": {
    "hv": "QUYỀN",
    "on": "ケン, ゲン",
    "kun": "こぶし",
    "m": "nắm tay, quả đấm, quyền thuật"
  },
  "検": {
    "hv": "KIỂM",
    "on": "ケン",
    "kun": "しら・べる",
    "m": "examination, investigate"
  },
  "権": {
    "hv": "QUYỀN",
    "on": "ケン, ゴン",
    "kun": "おもり, かり, はか・る",
    "m": "quả cân, quyền lợi"
  },
  "犬": {
    "hv": "KHUYỂN",
    "on": "ケン",
    "kun": "いぬ, いぬ-",
    "m": "con chó"
  },
  "献": {
    "hv": "HIẾN",
    "on": "ケン, コン",
    "kun": "たてまつ・る",
    "m": "dâng, tặng, hiến, dâng biểu, bày tỏ"
  },
  "硯": {
    "hv": "NGHIỄN",
    "on": "ケン, ゲン",
    "kun": "すずり",
    "m": "cái bát, cái nghiên mực"
  },
  "絹": {
    "hv": "QUYÊN",
    "on": "ケン",
    "kun": "きぬ",
    "m": "vải lụa"
  },
  "県": {
    "hv": "HUYỆN",
    "on": "ケン",
    "kun": "か・ける",
    "m": "prefecture"
  },
  "肩": {
    "hv": "KHIÊN",
    "on": "ケン",
    "kun": "かた",
    "m": "cái vai, gánh vác, cái vai"
  },
  "謙": {
    "hv": "KHIÊM",
    "on": "ケン",
    "kun": "へりくだ・る",
    "m": "nhún nhường"
  },
  "賢": {
    "hv": "HIỀN",
    "on": "ケン",
    "kun": "かしこ・い",
    "m": "người có đức hạnh, tài năng"
  },
  "軒": {
    "hv": "HIÊN",
    "on": "ケン",
    "kun": "のき",
    "m": "xe có mái che, mái hiên bằng phẳng"
  },
  "遣": {
    "hv": "KHIỂN",
    "on": "ケン",
    "kun": "つか・う, -つか・い, -づか・い, つか・わす, や・る",
    "m": "phái, sai, đưa đi, tiêu trừ, giải bỏ"
  },
  "鍵": {
    "hv": "KIỆN",
    "on": "ケン",
    "kun": "かぎ",
    "m": "cái chìa khoá"
  },
  "険": {
    "hv": "HIỂM",
    "on": "ケン",
    "kun": "けわ・しい",
    "m": "precipitous, inaccessible place, impregnable position"
  },
  "顕": {
    "hv": "HIỂN",
    "on": "ケン",
    "kun": "あきらか, あらわ・れる",
    "m": "appear, existing"
  },
  "験": {
    "hv": "NGHIỆM",
    "on": "ケン, ゲン",
    "kun": "あかし, しるし, ため・す, ためし",
    "m": "chứng nghiệm, kiểm nghiệm, hiệu nghiệm"
  },
  "元": {
    "hv": "NGUYÊN",
    "on": "ゲン, ガン",
    "kun": "もと",
    "m": "bắt đầu, thứ nhất, chủ yếu, căn bản, nguyên tố, đơn vị tiền tệ"
  },
  "原": {
    "hv": "NGUYÊN",
    "on": "ゲン",
    "kun": "はら",
    "m": "cánh đồng, gốc, vốn (từ trước)"
  },
  "厳": {
    "hv": "NGHIÊM",
    "on": "ゲン, ゴン",
    "kun": "おごそ・か, きび・しい, いか・めしい, いつくし",
    "m": "kín, chặt chẽ, nghiêm khắc, rất"
  },
  "幻": {
    "hv": "HUYỄN",
    "on": "ゲン",
    "kun": "まぼろし",
    "m": "hư ảo, không có thực, hư ảo, không có thực"
  },
  "弦": {
    "hv": "HUYỀN",
    "on": "ゲン",
    "kun": "つる",
    "m": "dây đàn, dây cung, trăng non"
  },
  "減": {
    "hv": "GIẢM",
    "on": "ゲン",
    "kun": "へ・る, へ・らす",
    "m": "giảm bớt"
  },
  "源": {
    "hv": "NGUYÊN",
    "on": "ゲン",
    "kun": "みなもと",
    "m": "nguồn (nước), nguồn gốc"
  },
  "玄": {
    "hv": "HUYỀN",
    "on": "ゲン",
    "kun": "くろ, くろ・い",
    "m": "màu đen"
  },
  "現": {
    "hv": "HIỆN",
    "on": "ゲン",
    "kun": "あらわ・れる, あらわ・す, うつつ, うつ・つ",
    "m": "xuất hiện, tồn tại, bây giờ"
  },
  "絃": {
    "hv": "HUYỀN",
    "on": "ゲン",
    "kun": "いと",
    "m": "dây đàn, dây cung, trăng non"
  },
  "舷": {
    "hv": "HUYỀN",
    "on": "ゲン",
    "kun": "ふなばた, ふなべり",
    "m": "mạn thuyền"
  },
  "限": {
    "hv": "HẠN",
    "on": "ゲン",
    "kun": "かぎ・る, かぎ・り, -かぎ・り",
    "m": "giới hạn, bậc cửa"
  },
  "個": {
    "hv": "CÁ",
    "on": "コ, カ",
    "kun": "—",
    "m": "cái, quả, con"
  },
  "呼": {
    "hv": "HÔ",
    "on": "コ",
    "kun": "よ・ぶ",
    "m": "gọi to"
  },
  "固": {
    "hv": "CỐ",
    "on": "コ",
    "kun": "かた・める, かた・まる, かた・まり, かた・い",
    "m": "vững chắc, vốn có"
  },
  "姑": {
    "hv": "CÔ",
    "on": "コ",
    "kun": "しゅうとめ, しゅうと, おば, しばらく",
    "m": "mẹ chồng, mẹ vợ, cô ruột, con gái chưa chồng"
  },
  "孤": {
    "hv": "CÔ",
    "on": "コ",
    "kun": "—",
    "m": "cô đơn, lẻ loi, cô độc, mồ côi"
  },
  "己": {
    "hv": "KỶ",
    "on": "コ, キ",
    "kun": "おのれ, つちのと, な",
    "m": "mình, riêng, Kỷ (ngôi thứ 6 hàng Can)"
  },
  "庫": {
    "hv": "KHỐ",
    "on": "コ, ク",
    "kun": "くら",
    "m": "kho chứa đồ vật"
  },
  "弧": {
    "hv": "HỒ",
    "on": "コ",
    "kun": "—",
    "m": "cái cung gỗ"
  },
  "戸": {
    "hv": "HỘ",
    "on": "コ",
    "kun": "と",
    "m": "cửa một cánh, nhà"
  },
  "故": {
    "hv": "CỐ",
    "on": "コ",
    "kun": "ゆえ, ふる・い, もと",
    "m": "cũ, cho nên, lý do"
  },
  "枯": {
    "hv": "KHÔ",
    "on": "コ",
    "kun": "か・れる, か・らす",
    "m": "héo hon (cây), khô, cạn"
  },
  "湖": {
    "hv": "HỒ",
    "on": "コ",
    "kun": "みずうみ",
    "m": "hồ nước"
  },
  "狐": {
    "hv": "HỒ",
    "on": "コ",
    "kun": "きつね",
    "m": "con hồ ly, con cáo"
  },
  "袴": {
    "hv": "KHỐ",
    "on": "コ, ク",
    "kun": "はかま, ずぼん",
    "m": "cái khố, cái quần đùi"
  },
  "股": {
    "hv": "CỔ",
    "on": "コ",
    "kun": "また, もも",
    "m": "nét dọc"
  },
  "胡": {
    "hv": "HỒ",
    "on": "ウ, コ, ゴ",
    "kun": "なんぞ",
    "m": "yếm cổ (thịt dưới cổ), nào, sao, thế nào, xứ Hồ, người Hồ"
  },
  "虎": {
    "hv": "HỔ",
    "on": "コ",
    "kun": "とら",
    "m": "con hổ"
  },
  "誇": {
    "hv": "KHOA",
    "on": "コ",
    "kun": "ほこ・る",
    "m": "khoe khoang, nói khoác"
  },
  "雇": {
    "hv": "CỐ",
    "on": "コ",
    "kun": "やと・う",
    "m": "(một loài chim)"
  },
  "顧": {
    "hv": "CỐ",
    "on": "コ",
    "kun": "かえり・みる",
    "m": "ngoảnh, ngoái nhìn, đoái"
  },
  "鼓": {
    "hv": "CỔ",
    "on": "コ",
    "kun": "つづみ",
    "m": "cái trống, gảy đàn"
  },
  "互": {
    "hv": "HỖ",
    "on": "ゴ",
    "kun": "たが・い, かたみ・に",
    "m": "lẫn nhau"
  },
  "伍": {
    "hv": "NGŨ",
    "on": "ゴ",
    "kun": "いつつ",
    "m": "hàng ngũ (hàng gồm 5 lính), bằng hàng, 5, năm (như: 五, dùng viết trong văn tự)"
  },
  "呉": {
    "hv": "NGÔ",
    "on": "ゴ",
    "kun": "く・れる, くれ",
    "m": "nước Ngô, họ Ngô, rầm rĩ"
  },
  "吾": {
    "hv": "NGÔ",
    "on": "ゴ",
    "kun": "われ, わが-, あ-",
    "m": "ta (ngôi thứ nhất)"
  },
  "娯": {
    "hv": "NGU",
    "on": "ゴ",
    "kun": "—",
    "m": "vui vẻ"
  },
  "御": {
    "hv": "NGỰ",
    "on": "ギョ, ゴ",
    "kun": "おん-, お-, み-",
    "m": "ngăn lại, chống lại"
  },
  "悟": {
    "hv": "NGỘ",
    "on": "ゴ",
    "kun": "さと・る",
    "m": "hiểu"
  },
  "梧": {
    "hv": "NGÔ",
    "on": "ゴ",
    "kun": "あおぎり",
    "m": "cây vông"
  },
  "瑚": {
    "hv": "HÔ",
    "on": "コ, ゴ",
    "kun": "—",
    "m": "(xem: san hô 珊瑚)"
  },
  "碁": {
    "hv": "KỲ",
    "on": "ゴ",
    "kun": "—",
    "m": "cờ (chơi)"
  },
  "誤": {
    "hv": "NGỘ",
    "on": "ゴ",
    "kun": "あやま・る, -あやま・る",
    "m": "nhầm, làm mê hoặc"
  },
  "乞": {
    "hv": "KHẤT",
    "on": "コツ, キツ, キ, キケ, コチ",
    "kun": "こ・う",
    "m": "kẻ ăn mày, người ăn xin"
  },
  "鯉": {
    "hv": "LÝ",
    "on": "リ",
    "kun": "こい",
    "m": "con cá chép"
  },
  "交": {
    "hv": "GIAO",
    "on": "コウ",
    "kun": "まじ・わる, まじ・える, ま・じる, まじ・る, ま・ざる, ま・ぜる, -か・う, か・わす, かわ・す, こもごも",
    "m": "trao cho, giao cho, tiếp giáp"
  },
  "侯": {
    "hv": "HẦU",
    "on": "コウ",
    "kun": "—",
    "m": "tước Hầu"
  },
  "候": {
    "hv": "HẬU",
    "on": "コウ",
    "kun": "そうろう",
    "m": "thời gian, tình hình, tình trạng, khí hậu"
  },
  "倖": {
    "hv": "HÃNH",
    "on": "コウ",
    "kun": "しあわ・せ, さいわ・い",
    "m": "may mắn"
  },
  "光": {
    "hv": "QUANG",
    "on": "コウ",
    "kun": "ひか・る, ひかり",
    "m": "sáng"
  },
  "公": {
    "hv": "CÔNG",
    "on": "コウ, ク",
    "kun": "おおやけ",
    "m": "cân bằng, chung, cụ, ông"
  },
  "功": {
    "hv": "CÔNG",
    "on": "コウ, ク",
    "kun": "いさお",
    "m": "công lao, thành tích"
  },
  "効": {
    "hv": "HIỆU",
    "on": "コウ",
    "kun": "き・く, ききめ, なら・う",
    "m": "bắt chước, ví với, công hiệu"
  },
  "勾": {
    "hv": "CÂU",
    "on": "コウ, ク",
    "kun": "かぎ, ま・がる",
    "m": "cong, móc, đánh dấu móc"
  },
  "厚": {
    "hv": "HẬU",
    "on": "コウ",
    "kun": "あつ・い, あか",
    "m": "dày dặn, chiều dày, hậu hĩnh"
  },
  "口": {
    "hv": "KHẨU",
    "on": "コウ, ク",
    "kun": "くち",
    "m": "mồm, miệng, cửa"
  },
  "向": {
    "hv": "HƯỚNG",
    "on": "コウ",
    "kun": "む・く, む・い, -む・き, む・ける, -む・け, む・かう, む・かい, む・こう, む・こう-, むこ, むか・い",
    "m": "hướng, phía, hướng vào, nhằm vào"
  },
  "后": {
    "hv": "HẬU",
    "on": "コウ, ゴ",
    "kun": "きさき",
    "m": "sau, phía sau, hoàng hậu, vợ vua"
  },
  "喉": {
    "hv": "HẦU",
    "on": "コウ",
    "kun": "のど",
    "m": "hầu, họng"
  },
  "坑": {
    "hv": "KHANH",
    "on": "コウ",
    "kun": "—",
    "m": "cái hố, đường hầm, hãm hại"
  },
  "好": {
    "hv": "HẢO",
    "on": "コウ",
    "kun": "この・む, す・く, よ・い, い・い",
    "m": "ham, thích, tốt, hay, đẹp, sung sướng"
  },
  "孔": {
    "hv": "KHỔNG",
    "on": "コウ, ク",
    "kun": "あな",
    "m": "rất, lắm, cái lỗ, hang nhỏ, thông suốt"
  },
  "孝": {
    "hv": "HIẾU",
    "on": "コウ, キョウ",
    "kun": "—",
    "m": "lòng biết ơn cha mẹ"
  },
  "宏": {
    "hv": "HOÀNH",
    "on": "コウ",
    "kun": "ひろ・い",
    "m": "to tát, rộng rãi, to tát, rộng rãi"
  },
  "工": {
    "hv": "CÔNG",
    "on": "コウ, ク, グ",
    "kun": "—",
    "m": "công việc, người thợ"
  },
  "巧": {
    "hv": "XẢO",
    "on": "コウ",
    "kun": "たく・み, たく・む, うま・い",
    "m": "khéo léo"
  },
  "巷": {
    "hv": "HẠNG",
    "on": "コウ",
    "kun": "ちまた",
    "m": "đường hẻm, ngõ hẻm"
  },
  "幸": {
    "hv": "HẠNH",
    "on": "コウ",
    "kun": "さいわ・い, さち, しあわ・せ",
    "m": "may mắn, yêu dấu"
  },
  "康": {
    "hv": "KHANG",
    "on": "コウ",
    "kun": "—",
    "m": "khoẻ mạnh"
  },
  "弘": {
    "hv": "HOẰNG",
    "on": "コウ, グ",
    "kun": "ひろ・い",
    "m": "lớn, mở rộng ra"
  },
  "恒": {
    "hv": "HẰNG",
    "on": "コウ",
    "kun": "つね, つねに",
    "m": "thường, lâu bền"
  },
  "慌": {
    "hv": "HOANG",
    "on": "コウ",
    "kun": "あわ・てる, あわ・ただしい",
    "m": "vội vã, vội vàng, hoảng sợ, vội vã, vội vàng"
  },
  "抗": {
    "hv": "KHÁNG",
    "on": "コウ",
    "kun": "あらが・う",
    "m": "vác, chống lại"
  },
  "拘": {
    "hv": "CÂU",
    "on": "コウ",
    "kun": "かか・わる",
    "m": "câu nệ, hay tin nhảm"
  },
  "控": {
    "hv": "KHỐNG",
    "on": "コウ",
    "kun": "ひか・える, ひか・え",
    "m": "tố giác, tố cáo, điều khiển, khống chế"
  },
  "攻": {
    "hv": "CÔNG",
    "on": "コウ",
    "kun": "せ・める",
    "m": "đánh, tấn công"
  },
  "昂": {
    "hv": "NGANG",
    "on": "コウ, ゴウ",
    "kun": "あ・がる, たか・い, たか・ぶる",
    "m": "ngẩng cao đầu, giơ cao, giá cao, đắt"
  },
  "晃": {
    "hv": "HOẢNG",
    "on": "コウ",
    "kun": "あきらか",
    "m": "loá mắt, chói mắt"
  },
  "更": {
    "hv": "CANH",
    "on": "コウ",
    "kun": "さら, さら・に, ふ・ける, ふ・かす",
    "m": "canh giờ, càng, hơn, càng, hơn"
  },
  "杭": {
    "hv": "HÀNG",
    "on": "コウ",
    "kun": "くい",
    "m": "cái xuồng (như: 航), châu Hàng (Trung Quốc)"
  },
  "梗": {
    "hv": "NGẠNH",
    "on": "コウ, キョウ",
    "kun": "ふさぐ, やまにれ, おおむね",
    "m": "(xem: kết cánh 桔梗), cành cây, cánh bèo"
  },
  "構": {
    "hv": "CẤU",
    "on": "コウ",
    "kun": "かま・える, かま・う",
    "m": "làm ra, tạo ra, xây dựng, tác phẩm"
  },
  "江": {
    "hv": "GIANG",
    "on": "コウ",
    "kun": "え",
    "m": "sông lớn"
  },
  "洪": {
    "hv": "HỒNG",
    "on": "コウ",
    "kun": "—",
    "m": "lớn lao, mưa to, nước lũ"
  },
  "浩": {
    "hv": "HẠO",
    "on": "コウ",
    "kun": "おおき・い, ひろ・い",
    "m": "to lớn, đồ sộ, khổng lồ"
  },
  "港": {
    "hv": "CẢNG",
    "on": "コウ",
    "kun": "みなと",
    "m": "bến cảng"
  },
  "溝": {
    "hv": "CÂU",
    "on": "コウ",
    "kun": "みぞ",
    "m": "trong (nước), rãnh, cống, ngòi, lạch, khe, cái hào"
  },
  "甲": {
    "hv": "GIÁP",
    "on": "コウ, カン",
    "kun": "きのえ",
    "m": "vỏ cứng của động vật, áo giáp mặc khi chiến trận, Giáp (ngôi thứ nhất hàng Can)"
  },
  "皇": {
    "hv": "HOÀNG",
    "on": "コウ, オウ",
    "kun": "—",
    "m": "ông vua, to lớn"
  },
  "硬": {
    "hv": "NGẠNH",
    "on": "コウ",
    "kun": "かた・い",
    "m": "cứng, rắn"
  },
  "稿": {
    "hv": "CẢO",
    "on": "コウ",
    "kun": "わら, したがき",
    "m": "rơm rạ, bản thảo, bản nháp"
  },
  "紅": {
    "hv": "HỒNG",
    "on": "コウ, ク",
    "kun": "べに, くれない, あか・い",
    "m": "màu hồng, màu đỏ"
  },
  "紘": {
    "hv": "HOÀNH",
    "on": "コウ",
    "kun": "おおづな, つな, つなぐ",
    "m": "tua quai mũ"
  },
  "絞": {
    "hv": "GIẢO",
    "on": "コウ",
    "kun": "しぼ・る, し・める, し・まる",
    "m": "vặn, xoắn, treo cổ"
  },
  "綱": {
    "hv": "CƯƠNG",
    "on": "コウ",
    "kun": "つな",
    "m": "dây cáp"
  },
  "耕": {
    "hv": "CANH",
    "on": "コウ",
    "kun": "たがや・す",
    "m": "cày ruộng"
  },
  "肯": {
    "hv": "KHẲNG",
    "on": "コウ",
    "kun": "がえんじ・る",
    "m": "được, đồng ý, há, há sao (như khởi 豈)"
  },
  "航": {
    "hv": "HÀNG",
    "on": "コウ",
    "kun": "—",
    "m": "cái xuồng, thuyền, vượt qua"
  },
  "荒": {
    "hv": "HOANG",
    "on": "コウ",
    "kun": "あ・らす, あ・れる, あら・い, すさ・ぶ, すさ・む, あ・らし",
    "m": "không có người"
  },
  "衡": {
    "hv": "HÀNH",
    "on": "コウ",
    "kun": "—",
    "m": "cái cân, cân đồ vật"
  },
  "講": {
    "hv": "GIẢNG",
    "on": "コウ",
    "kun": "—",
    "m": "giảng giải"
  },
  "貢": {
    "hv": "CỐNG",
    "on": "コウ, ク",
    "kun": "みつ・ぐ",
    "m": "cống nạp, dâng, tiến cử, sông Cống"
  },
  "購": {
    "hv": "CẤU",
    "on": "コウ",
    "kun": "—",
    "m": "mua sắm, mưu bàn"
  },
  "郊": {
    "hv": "GIAO",
    "on": "コウ",
    "kun": "—",
    "m": "ngoại thành, ngoại ô"
  },
  "酵": {
    "hv": "DIẾU",
    "on": "コウ",
    "kun": "—",
    "m": "men rượu"
  },
  "鉱": {
    "hv": "KHOÁNG",
    "on": "コウ",
    "kun": "あらがね",
    "m": "mineral, ore"
  },
  "鋼": {
    "hv": "CƯƠNG",
    "on": "コウ",
    "kun": "はがね",
    "m": "thép"
  },
  "降": {
    "hv": "GIÁNG",
    "on": "コウ, ゴ",
    "kun": "お・りる, お・ろす, ふ・る, ふ・り, くだ・る, くだ・す",
    "m": "sa xuống, rớt xuống, hàng phục, đầu hàng"
  },
  "項": {
    "hv": "HẠNG",
    "on": "コウ",
    "kun": "うなじ",
    "m": "cổ sau, thứ, hạng, to, lớn"
  },
  "香": {
    "hv": "HƯƠNG",
    "on": "コウ, キョウ",
    "kun": "か, かお・り, かお・る",
    "m": "hương, mùi"
  },
  "鴻": {
    "hv": "HỒNG",
    "on": "コウ, ゴウ",
    "kun": "おおとり, ひしくい, おおがり",
    "m": "chim hồng, chữ, thư tín, to, lớn"
  },
  "剛": {
    "hv": "CƯƠNG",
    "on": "ゴウ",
    "kun": "—",
    "m": "cứng, rắn, vừa mới qua, vừa xong"
  },
  "号": {
    "hv": "HIỆU",
    "on": "ゴウ",
    "kun": "さけ・ぶ, よびな",
    "m": "hiệu (phù hiệu, biển hiệu, ...), làm hiệu, dấu hiệu, gào khóc, kêu gào"
  },
  "合": {
    "hv": "HIỆP",
    "on": "ゴウ, ガッ, カッ",
    "kun": "あ・う, -あ・う, あ・い, あい-, -あ・い, -あい, あ・わす, あ・わせる, -あ・わせる",
    "m": "cửa ngách - giản thể của chữ 閤, hợp, vừa ý, nhắm mắt"
  },
  "壕": {
    "hv": "HÀO",
    "on": "コウ, ゴウ",
    "kun": "ほり",
    "m": "hào xây quanh thành"
  },
  "拷": {
    "hv": "KHẢO",
    "on": "ゴウ",
    "kun": "—",
    "m": "đánh tra khảo, tra tấn"
  },
  "豪": {
    "hv": "HÀO",
    "on": "ゴウ",
    "kun": "えら・い",
    "m": "người có tài, phóng khoáng, con hào (giống lợn)"
  },
  "轟": {
    "hv": "HOANH",
    "on": "ゴウ, コウ",
    "kun": "とどろ・かす, とどろ・く",
    "m": "nổ (sấm), thuốc nổ, quát"
  },
  "麹": {
    "hv": "KHÚC",
    "on": "キク",
    "kun": "こうじ",
    "m": "men rượu"
  },
  "克": {
    "hv": "KHẮC",
    "on": "コク",
    "kun": "か・つ",
    "m": "làm được, hiếu thắng, khắc phục, phục hồi"
  },
  "刻": {
    "hv": "KHẮC",
    "on": "コク",
    "kun": "きざ・む, きざ・み",
    "m": "chạm, khắc, khắc giờ"
  },
  "告": {
    "hv": "CÁO",
    "on": "コク",
    "kun": "つ・げる",
    "m": "bảo cho biết, báo cáo"
  },
  "穀": {
    "hv": "CỐC",
    "on": "コク",
    "kun": "—",
    "m": "cây lương thực, thóc lúa, kê"
  },
  "酷": {
    "hv": "KHỐC",
    "on": "コク",
    "kun": "ひど・い",
    "m": "tàn khốc, tàn ác, rượu nồng"
  },
  "鵠": {
    "hv": "HỘC",
    "on": "コク, コウ",
    "kun": "くぐい, まと",
    "m": "chim hộc, ngỗng trời"
  },
  "黒": {
    "hv": "HẮC",
    "on": "コク",
    "kun": "くろ, くろ・ずむ, くろ・い",
    "m": "black"
  },
  "獄": {
    "hv": "NGỤC",
    "on": "ゴク",
    "kun": "—",
    "m": "tù ngục"
  },
  "腰": {
    "hv": "YÊU",
    "on": "ヨウ",
    "kun": "こし",
    "m": "cái lưng"
  },
  "惚": {
    "hv": "DỊCH",
    "on": "コツ",
    "kun": "ほけ・る, ぼ・ける, ほ・れる",
    "m": "không rõ ràng, phảng phất"
  },
  "骨": {
    "hv": "CỐT",
    "on": "コツ",
    "kun": "ほね",
    "m": "xương cốt"
  },
  "狛": {
    "hv": "[狛]",
    "on": "ハク",
    "kun": "こま",
    "m": "archaic part of Korea, lion-dog shrine guards"
  },
  "込": {
    "hv": "VU",
    "on": "—",
    "kun": "-こ・む, こ・む, こ・み, -こ・み, こ・める",
    "m": "crowded, mixture, in bulk"
  },
  "此": {
    "hv": "THỬ",
    "on": "シ",
    "kun": "これ, この, ここ",
    "m": "này, bên này"
  },
  "頃": {
    "hv": "KHOẢNH",
    "on": "ケイ, キョウ",
    "kun": "ころ, ごろ, しばら・く",
    "m": "mảnh đất, phúc chốc, nhanh chóng, nửa bước chân"
  },
  "困": {
    "hv": "KHỐN",
    "on": "コン",
    "kun": "こま・る",
    "m": "khốn cùng, khốn khổ, khốn đốn, vây hãm, mỏi mệt"
  },
  "墾": {
    "hv": "KHẨN",
    "on": "コン",
    "kun": "は・る, ひら・く",
    "m": "khai khẩn, vỡ đất hoang"
  },
  "婚": {
    "hv": "HÔN",
    "on": "コン",
    "kun": "—",
    "m": "cưới, lễ cưới, bố vợ"
  },
  "恨": {
    "hv": "HẬN",
    "on": "コン",
    "kun": "うら・む, うら・めしい",
    "m": "giận, ghét"
  },
  "懇": {
    "hv": "KHẨN",
    "on": "コン",
    "kun": "ねんご・ろ",
    "m": "thành khẩn"
  },
  "昆": {
    "hv": "CÔN",
    "on": "コン",
    "kun": "—",
    "m": "(xem: côn lôn 崑崙,昆仑), nhiều nhung nhúc, em trai"
  },
  "根": {
    "hv": "CĂN",
    "on": "コン",
    "kun": "ね, -ね",
    "m": "rễ cây"
  },
  "混": {
    "hv": "HỖN",
    "on": "コン",
    "kun": "ま・じる, -ま・じり, ま・ざる, ま・ぜる, こ・む",
    "m": "lẫn lộn, hỗn tạp"
  },
  "痕": {
    "hv": "NGÂN",
    "on": "コン",
    "kun": "あと",
    "m": "hoen ra (nước mắt), vết sẹo, dấu vết"
  },
  "紺": {
    "hv": "CÁM",
    "on": "コン",
    "kun": "—",
    "m": "xanh biếc"
  },
  "魂": {
    "hv": "HỒN",
    "on": "コン",
    "kun": "たましい, たま",
    "m": "linh hồn"
  },
  "佐": {
    "hv": "TÁ",
    "on": "サ",
    "kun": "—",
    "m": "giúp đỡ"
  },
  "唆": {
    "hv": "TOA",
    "on": "サ",
    "kun": "そそ・る, そそのか・す",
    "m": "xui, xúi giục, bú, mút"
  },
  "嵯": {
    "hv": "THA",
    "on": "サ, シ",
    "kun": "—",
    "m": "(xem: tha nga 嵯峨)"
  },
  "左": {
    "hv": "TẢ",
    "on": "サ, シャ",
    "kun": "ひだり",
    "m": "bên trái"
  },
  "差": {
    "hv": "SOA",
    "on": "サ",
    "kun": "さ・す, さ・し",
    "m": "sai khiến, không đều, so le, hiệu số"
  },
  "査": {
    "hv": "TRA",
    "on": "サ",
    "kun": "—",
    "m": "investigate"
  },
  "沙": {
    "hv": "SA",
    "on": "サ, シャ",
    "kun": "すな, よなげる",
    "m": "cát, bãi cát, khàn, đục, tiếng rè rè, tiếng khàn"
  },
  "瑳": {
    "hv": "THA",
    "on": "サ",
    "kun": "みが・く",
    "m": "vẻ lộng lẫy tinh khiết của ngọc bích, đẹp rực rỡ, vẻ sáng trắng của răng"
  },
  "砂": {
    "hv": "SA",
    "on": "サ, シャ",
    "kun": "すな",
    "m": "đá vụn, sỏi vụn, cát, sạn"
  },
  "詐": {
    "hv": "TRÁ",
    "on": "サ",
    "kun": "いつわ・る",
    "m": "lừa dối, giả dối"
  },
  "鎖": {
    "hv": "TOẢ",
    "on": "サ",
    "kun": "くさり, とざ・す",
    "m": "giam, nhốt, khoá chặt"
  },
  "裟": {
    "hv": "SA",
    "on": "サ, シャ",
    "kun": "—",
    "m": "(xem: ca sa 袈裟)"
  },
  "坐": {
    "hv": "TOẠ",
    "on": "ザ, サ",
    "kun": "すわ・る, おわす, そぞろに, まします",
    "m": "ngồi, ngồi xuống"
  },
  "挫": {
    "hv": "TOẢ",
    "on": "ザ, サ",
    "kun": "くじ・く, くじ・ける",
    "m": "bẻ gãy"
  },
  "債": {
    "hv": "TRÁI",
    "on": "サイ",
    "kun": "—",
    "m": "nợ nần"
  },
  "催": {
    "hv": "THÔI",
    "on": "サイ",
    "kun": "もよう・す, もよお・す",
    "m": "thúc giục, suy nghĩ"
  },
  "再": {
    "hv": "TÁI",
    "on": "サイ, サ",
    "kun": "ふたた・び",
    "m": "lại, lần nữa, làm lại"
  },
  "最": {
    "hv": "TỐI",
    "on": "サイ, シュ",
    "kun": "もっと・も, つま",
    "m": "cực kỳ, hơn nhất, chót"
  },
  "哉": {
    "hv": "TAI",
    "on": "サイ",
    "kun": "かな, や",
    "m": "rất, lắm (ý nhấn mạnh), vừa mới, sao, đâu (trong câu hỏi)"
  },
  "塞": {
    "hv": "TÁI",
    "on": "ソク, サイ",
    "kun": "ふさ・ぐ, とりで, み・ちる",
    "m": "chỗ canh phòng ngoài biên ải, nhét, nhồi, nút, bịt"
  },
  "妻": {
    "hv": "THÊ",
    "on": "サイ",
    "kun": "つま",
    "m": "vợ cả"
  },
  "宰": {
    "hv": "TỂ",
    "on": "サイ",
    "kun": "—",
    "m": "chúa tể, người đứng đầu, một chức quan thời phong kiến, làm thịt, mổ thịt, giết thịt"
  },
  "彩": {
    "hv": "THÁI",
    "on": "サイ",
    "kun": "いろど・る",
    "m": "tia sáng, rực rỡ, nhiều màu, tiếng hoan hô, reo hò"
  },
  "才": {
    "hv": "TÀI",
    "on": "サイ",
    "kun": "—",
    "m": "tài năng, mới, vừa mới"
  },
  "採": {
    "hv": "THÁI",
    "on": "サイ",
    "kun": "と・る",
    "m": "hái, ngắt, chọn nhặt"
  },
  "栽": {
    "hv": "TÀI",
    "on": "サイ",
    "kun": "—",
    "m": "trồng trọt, cây"
  },
  "歳": {
    "hv": "TUẾ",
    "on": "サイ, セイ",
    "kun": "とし, とせ, よわい",
    "m": "năm, tuổi"
  },
  "災": {
    "hv": "TAI",
    "on": "サイ",
    "kun": "わざわ・い",
    "m": "cháy nhà, tai ương"
  },
  "采": {
    "hv": "THÁI",
    "on": "サイ",
    "kun": "と・る, いろどり",
    "m": "màu mỡ, đẹp đẽ, hái, ngắt, chọn nhặt"
  },
  "犀": {
    "hv": "TÊ",
    "on": "サイ, セイ",
    "kun": "—",
    "m": "con tê giác"
  },
  "砕": {
    "hv": "TOÁI",
    "on": "サイ",
    "kun": "くだ・く, くだ・ける",
    "m": "smash, break, crush"
  },
  "砦": {
    "hv": "TRẠI",
    "on": "サイ",
    "kun": "とりで",
    "m": "(chỗ ở núi, lấy gỗ rào chung quanh để ở)"
  },
  "祭": {
    "hv": "SÁI",
    "on": "サイ",
    "kun": "まつ・る, まつ・り, まつり",
    "m": "họ Sái, cúng tế"
  },
  "斎": {
    "hv": "TRAI",
    "on": "サイ",
    "kun": "とき, つつし・む, ものいみ, い・む, いわ・う, いつ・く",
    "m": "ăn chay, nhà học"
  },
  "細": {
    "hv": "TẾ",
    "on": "サイ",
    "kun": "ほそ・い, ほそ・る, こま・か, こま・かい",
    "m": "nhỏ bé, tinh xảo, mịn"
  },
  "菜": {
    "hv": "THÁI",
    "on": "サイ",
    "kun": "な",
    "m": "rau ăn"
  },
  "裁": {
    "hv": "TÀI",
    "on": "サイ",
    "kun": "た・つ, さば・く",
    "m": "cắt áo, rọc, xén, thể chế"
  },
  "載": {
    "hv": "TÁI",
    "on": "サイ",
    "kun": "の・せる, の・る",
    "m": "năm, tuổi, chở đồ, nâng"
  },
  "剤": {
    "hv": "TỄ",
    "on": "ザイ, スイ, セイ",
    "kun": "かる, けず・る",
    "m": "do nhiều thứ hợp thành, thuốc"
  },
  "在": {
    "hv": "TẠI",
    "on": "ザイ",
    "kun": "あ・る",
    "m": "ở, tại"
  },
  "材": {
    "hv": "TÀI",
    "on": "ザイ",
    "kun": "—",
    "m": "những thứ có sẵn trong tự nhiên mà dùng được"
  },
  "罪": {
    "hv": "TỘI",
    "on": "ザイ",
    "kun": "つみ",
    "m": "tội lỗi"
  },
  "財": {
    "hv": "TÀI",
    "on": "ザイ, サイ, ゾク",
    "kun": "たから",
    "m": "của cải"
  },
  "冴": {
    "hv": "NHẠ",
    "on": "ゴ, コ",
    "kun": "さ・える, こお・る, ひ・える",
    "m": "be clear, serene, cold"
  },
  "坂": {
    "hv": "PHẢN",
    "on": "ハン",
    "kun": "さか",
    "m": "sườn núi"
  },
  "阪": {
    "hv": "BẢN",
    "on": "ハン",
    "kun": "さか",
    "m": "sườn núi, sườn núi"
  },
  "堺": {
    "hv": "GIỚI",
    "on": "カイ",
    "kun": "さかい",
    "m": "world"
  },
  "榊": {
    "hv": "[榊]",
    "on": "—",
    "kun": "さかき",
    "m": "sacred Shinto tree, (kokuji)"
  },
  "咲": {
    "hv": "TIẾU",
    "on": "ショウ",
    "kun": "さ・く, -ざき",
    "m": "cười"
  },
  "崎": {
    "hv": "KHI",
    "on": "キ",
    "kun": "さき, さい, みさき",
    "m": "(xem: khi khu 崎嶇,崎岖)"
  },
  "埼": {
    "hv": "KỲ",
    "on": "キ",
    "kun": "さき, さい, みさき",
    "m": "bờ cong"
  },
  "鷺": {
    "hv": "LỘ",
    "on": "ロ",
    "kun": "さぎ",
    "m": "con cò"
  },
  "削": {
    "hv": "TƯỚC",
    "on": "サク",
    "kun": "けず・る, はつ・る, そ・ぐ",
    "m": "vót, nạo, đoạt mất"
  },
  "搾": {
    "hv": "TRÁ",
    "on": "サク",
    "kun": "しぼ・る",
    "m": "bàn ép, chiết xuất"
  },
  "朔": {
    "hv": "SÓC",
    "on": "サク",
    "kun": "ついたち",
    "m": "ngày đầu tiên của chu kỳ trăng, ngày mùng 1, phương Bắc"
  },
  "柵": {
    "hv": "SÁCH",
    "on": "サク, サン",
    "kun": "しがら・む, しがらみ, とりで, やらい",
    "m": "hàng rào, rào chắn"
  },
  "策": {
    "hv": "SÁCH",
    "on": "サク",
    "kun": "—",
    "m": "thẻ tre để viết, sách lược, mưu kế, roi ngựa"
  },
  "索": {
    "hv": "SÁCH",
    "on": "サク",
    "kun": "—",
    "m": "dây tơ, tìm tòi, lục, tan tác, chia lìa"
  },
  "錯": {
    "hv": "THÁC",
    "on": "サク, シャク",
    "kun": "—",
    "m": "hòn đá mài, lẫn lộn, nhầm lẫn"
  },
  "桜": {
    "hv": "ANH",
    "on": "オウ, ヨウ",
    "kun": "さくら",
    "m": "cherry"
  },
  "鮭": {
    "hv": "KHUÊ",
    "on": "カイ, ケイ",
    "kun": "さけ, しゃけ, ふぐ",
    "m": "con cá hồi"
  },
  "笹": {
    "hv": "THẾ",
    "on": "—",
    "kun": "ささ",
    "m": "bamboo grass, (kokuji)"
  },
  "冊": {
    "hv": "SÁCH",
    "on": "サツ, サク",
    "kun": "ふみ",
    "m": "quyển sách, sổ"
  },
  "刷": {
    "hv": "LOÁT",
    "on": "サツ",
    "kun": "す・る, -ず・り, -ずり, は・く",
    "m": "tẩy sạch, cái bàn chải"
  },
  "察": {
    "hv": "SÁT",
    "on": "サツ",
    "kun": "—",
    "m": "xem kỹ"
  },
  "拶": {
    "hv": "TẠT",
    "on": "サツ",
    "kun": "せま・る",
    "m": "bức bách, đè nén"
  },
  "撮": {
    "hv": "TOÁT",
    "on": "サツ",
    "kun": "と・る, つま・む, -ど・り",
    "m": "dúm (đơn vị đo, bằng 256 hạt thóc), rút lại, tụ họp"
  },
  "擦": {
    "hv": "SÁT",
    "on": "サツ",
    "kun": "す・る, す・れる, -ず・れ, こす・る, こす・れる",
    "m": "xoa, xát"
  },
  "札": {
    "hv": "TRÁT",
    "on": "サツ",
    "kun": "ふだ",
    "m": "thẻ tre để viết, công văn"
  },
  "殺": {
    "hv": "SÁT",
    "on": "サツ, サイ, セツ",
    "kun": "ころ・す, -ごろ・し, そ・ぐ, あや・める",
    "m": "giết chết"
  },
  "薩": {
    "hv": "TÁT",
    "on": "サツ, サチ",
    "kun": "—",
    "m": "(xem: bồ tát 菩薩)"
  },
  "雑": {
    "hv": "TẠP",
    "on": "ザツ, ゾウ",
    "kun": "まじ・える, まじ・る",
    "m": "miscellaneous"
  },
  "皐": {
    "hv": "CAO",
    "on": "コウ",
    "kun": "さつき",
    "m": "khấn, vái, bờ, bãi"
  },
  "鮫": {
    "hv": "GIAO",
    "on": "コウ",
    "kun": "さめ, みずち",
    "m": "cá giao"
  },
  "皿": {
    "hv": "MÃNH",
    "on": "ベイ",
    "kun": "さら",
    "m": "cái mâm, cái mâm"
  },
  "傘": {
    "hv": "TẢN",
    "on": "サン",
    "kun": "かさ",
    "m": "cái tán, (tên núi)"
  },
  "参": {
    "hv": "SÂM",
    "on": "サン, シン",
    "kun": "まい・る, まい-, まじわる, みつ",
    "m": "tua cờ, cỏ sâm (thứ cỏ quý, lá như bàn tay, hoa trắng, dùng làm thuốc), sao Sâm (một trong Nhị thập bát tú)"
  },
  "惨": {
    "hv": "THẢM",
    "on": "サン, ザン",
    "kun": "みじ・め, いた・む, むご・い",
    "m": "bi thảm"
  },
  "散": {
    "hv": "TÁN",
    "on": "サン",
    "kun": "ち・る, ち・らす, -ち・らす, ち・らかす, ち・らかる, ち・らばる, ばら, ばら・ける",
    "m": "tan nhỏ ra, tan nhỏ ra"
  },
  "桟": {
    "hv": "CHĂN",
    "on": "サン, セン",
    "kun": "かけはし",
    "m": "scaffold, cleat, frame"
  },
  "燦": {
    "hv": "XÁN",
    "on": "サン",
    "kun": "さん・たる, あき・らか, きらめ・く, きら・めく",
    "m": "(xem: xán lạn 燦爛)"
  },
  "産": {
    "hv": "SẢN",
    "on": "サン",
    "kun": "う・む, う・まれる, うぶ-, む・す",
    "m": "sinh đẻ"
  },
  "算": {
    "hv": "TOÁN",
    "on": "サン",
    "kun": "そろ",
    "m": "tính toán"
  },
  "蚕": {
    "hv": "TÀM",
    "on": "サン, テン",
    "kun": "かいこ, こ",
    "m": "con tằm, con tằm"
  },
  "讃": {
    "hv": "TÁN",
    "on": "サン",
    "kun": "ほ・める, たた・える",
    "m": "praise, title on a picture"
  },
  "賛": {
    "hv": "TÁN",
    "on": "サン",
    "kun": "たす・ける, たた・える",
    "m": "khen ngợi, văn tán dương công đức, giúp đỡ"
  },
  "酸": {
    "hv": "TOAN",
    "on": "サン",
    "kun": "す・い",
    "m": "vị chua, đau ê ẩm, axít"
  },
  "斬": {
    "hv": "TRẢM",
    "on": "ザン, サン, セン, ゼン",
    "kun": "き・る",
    "m": "chém, chặt"
  },
  "暫": {
    "hv": "TẠM",
    "on": "ザン",
    "kun": "しばら・く",
    "m": "tạm thời"
  },
  "残": {
    "hv": "TÀN",
    "on": "ザン, サン",
    "kun": "のこ・る, のこ・す, そこな・う, のこ・り",
    "m": "thiếu, tàn, còn sót lại"
  },
  "伺": {
    "hv": "TÝ",
    "on": "シ",
    "kun": "うかが・う",
    "m": "chờ đợi, dò xét, thăm dò"
  },
  "刺": {
    "hv": "THÍCH",
    "on": "シ",
    "kun": "さ・す, さ・さる, さ・し, さし, とげ",
    "m": "tiêm, chích, châm, chọc, danh thiếp (âm thứ), tiêm, chích, châm, chọc"
  },
  "司": {
    "hv": "TY",
    "on": "シ",
    "kun": "つかさど・る",
    "m": "chủ trì, quản lý, quan sở, chủ trì, quản lý"
  },
  "史": {
    "hv": "SỬ",
    "on": "シ",
    "kun": "—",
    "m": "lịch sử"
  },
  "嗣": {
    "hv": "TỰ",
    "on": "シ",
    "kun": "—",
    "m": "nối tiếp, thừa hưởng, hậu duệ"
  },
  "士": {
    "hv": "SĨ",
    "on": "シ",
    "kun": "さむらい",
    "m": "học trò, quan"
  },
  "姉": {
    "hv": "TỶ",
    "on": "シ",
    "kun": "あね, はは",
    "m": "chị gái"
  },
  "姿": {
    "hv": "TƯ",
    "on": "シ",
    "kun": "すがた",
    "m": "dáng dấp thuỳ mị, dáng vẻ, điệu bộ, tư thế"
  },
  "市": {
    "hv": "THỊ",
    "on": "シ",
    "kun": "いち",
    "m": "thị xã, cái chợ"
  },
  "志": {
    "hv": "CHÍ",
    "on": "シ",
    "kun": "シリング, こころざ・す, こころざし",
    "m": "ý chí, chí hướng, cân, đo, đong, ghi chép"
  },
  "指": {
    "hv": "CHỈ",
    "on": "シ",
    "kun": "ゆび, さ・す, -さ・し",
    "m": "ngón tay, chỉ, trỏ"
  },
  "支": {
    "hv": "CHI",
    "on": "シ",
    "kun": "ささ・える, つか・える, か・う",
    "m": "cấp cho, chi cấp"
  },
  "孜": {
    "hv": "TƯ",
    "on": "シ",
    "kun": "つと・める",
    "m": "làm không mệt mỏi"
  },
  "施": {
    "hv": "THI",
    "on": "シ, セ",
    "kun": "ほどこ・す",
    "m": "thực hiện, tiến hành"
  },
  "旨": {
    "hv": "CHỈ",
    "on": "シ",
    "kun": "むね, うま・い",
    "m": "ngon, ý chỉ, chỉ dụ"
  },
  "枝": {
    "hv": "CHI",
    "on": "シ",
    "kun": "えだ",
    "m": "cành cây"
  },
  "死": {
    "hv": "TỬ",
    "on": "シ",
    "kun": "し・ぬ, し・に-",
    "m": "chết"
  },
  "氏": {
    "hv": "THỊ",
    "on": "シ",
    "kun": "うじ, -うじ",
    "m": "họ"
  },
  "獅": {
    "hv": "SƯ",
    "on": "シ",
    "kun": "しし",
    "m": "con sư tử"
  },
  "祉": {
    "hv": "CHỈ",
    "on": "シ",
    "kun": "—",
    "m": "phúc"
  },
  "糸": {
    "hv": "MỊCH",
    "on": "シ",
    "kun": "いと",
    "m": "bộ mịch"
  },
  "紙": {
    "hv": "CHỈ",
    "on": "シ",
    "kun": "かみ",
    "m": "giấy viết"
  },
  "紫": {
    "hv": "TỬ",
    "on": "シ",
    "kun": "むらさき",
    "m": "đỏ tía, tím"
  },
  "肢": {
    "hv": "CHI",
    "on": "シ",
    "kun": "—",
    "m": "chân tay"
  },
  "脂": {
    "hv": "CHI",
    "on": "シ",
    "kun": "あぶら",
    "m": "mỡ tảng, sáp, nhựa, mỡ tảng"
  },
  "至": {
    "hv": "CHÍ",
    "on": "シ",
    "kun": "いた・る",
    "m": "đến, tới, rất, cực kỳ"
  },
  "視": {
    "hv": "THỊ",
    "on": "シ",
    "kun": "み・る",
    "m": "nhìn kỹ"
  },
  "詞": {
    "hv": "TỪ",
    "on": "シ",
    "kun": "ことば",
    "m": "lời văn, từ khúc, bài từ"
  },
  "詩": {
    "hv": "THI",
    "on": "シ",
    "kun": "うた",
    "m": "thơ"
  },
  "試": {
    "hv": "THÍ",
    "on": "シ",
    "kun": "こころ・みる, ため・す",
    "m": "thử, thử nghiệm, thi tài"
  },
  "誌": {
    "hv": "CHÍ",
    "on": "シ",
    "kun": "—",
    "m": "ghi chép, văn ký sự"
  },
  "諮": {
    "hv": "TƯ",
    "on": "シ",
    "kun": "はか・る",
    "m": "bàn bạc, tư vấn, tường trình"
  },
  "資": {
    "hv": "TƯ",
    "on": "シ",
    "kun": "—",
    "m": "của cải, vốn, giúp đỡ, cung cấp, tư chất, tư cách"
  },
  "賜": {
    "hv": "TỨ",
    "on": "シ",
    "kun": "たまわ・る, たま・う, たも・う",
    "m": "ban ơn"
  },
  "雌": {
    "hv": "THƯ",
    "on": "シ",
    "kun": "め-, めす, めん",
    "m": "con chim mái"
  },
  "飼": {
    "hv": "TỰ",
    "on": "シ",
    "kun": "か・う",
    "m": "cho ăn, chăn nuôi"
  },
  "歯": {
    "hv": "XỈ",
    "on": "シ",
    "kun": "よわい, は, よわ・い, よわい・する",
    "m": "răng, tuổi tác"
  },
  "似": {
    "hv": "TỰ",
    "on": "ジ",
    "kun": "に・る, ひ・る",
    "m": "như, giống như"
  },
  "侍": {
    "hv": "THỊ",
    "on": "ジ, シ",
    "kun": "さむらい, はべ・る",
    "m": "thân cận, gần gũi"
  },
  "児": {
    "hv": "NHI",
    "on": "ジ, ニ, ゲイ",
    "kun": "こ, -こ, -っこ",
    "m": "đứa trẻ, con (từ xưng hô với cha mẹ)"
  },
  "寺": {
    "hv": "TỰ",
    "on": "ジ",
    "kun": "てら",
    "m": "ngôi chùa"
  },
  "慈": {
    "hv": "TỪ",
    "on": "ジ",
    "kun": "いつく・しむ",
    "m": "hiền, thiện, nhân từ"
  },
  "次": {
    "hv": "THỨ",
    "on": "ジ, シ",
    "kun": "つ・ぐ, つぎ",
    "m": "sau (không phải đầu tiên), tiếp theo, thứ bậc, lần, lượt"
  },
  "滋": {
    "hv": "TƯ",
    "on": "ジ, シ",
    "kun": "—",
    "m": "nảy nở, tăng thêm, phun, tưới"
  },
  "爾": {
    "hv": "NHĨ",
    "on": "ジ, ニ",
    "kun": "なんじ, しかり, その, のみ, おれ, しか",
    "m": "anh, bạn, mày, vậy (dùng để kết thúc câu), vậy (tiếng dứt câu)"
  },
  "璽": {
    "hv": "TỶ",
    "on": "ジ",
    "kun": "—",
    "m": "cái ấn của vua, con dấu chính thức của quốc gia, quốc huy"
  },
  "磁": {
    "hv": "TỪ",
    "on": "ジ",
    "kun": "—",
    "m": "từ tính, từ trường, nam châm"
  },
  "示": {
    "hv": "KỲ",
    "on": "ジ, シ",
    "kun": "しめ・す",
    "m": "thần đất, làm cho yên lòng, cả, lớn"
  },
  "耳": {
    "hv": "NHĨ",
    "on": "ジ",
    "kun": "みみ",
    "m": "cái tai, cái quai cầm, vậy, thôi (tiếng dứt câu)"
  },
  "蒔": {
    "hv": "THÌ",
    "on": "シ, ジ",
    "kun": "う・える, ま・く",
    "m": "(xem: thì la 蒔蘿,莳萝), trồng, trồng lại, cấy lại"
  },
  "汐": {
    "hv": "TỊCH",
    "on": "セキ",
    "kun": "しお, うしお, せい",
    "m": "nước thuỷ triều buổi tối"
  },
  "鹿": {
    "hv": "LỘC",
    "on": "ロク",
    "kun": "しか, か",
    "m": "con hươu"
  },
  "式": {
    "hv": "THỨC",
    "on": "シキ",
    "kun": "—",
    "m": "phép tắc, cách thức"
  },
  "識": {
    "hv": "CHÍ",
    "on": "シキ",
    "kun": "し・る, しる・す",
    "m": "ghi chép, văn ký sự, biết"
  },
  "軸": {
    "hv": "TRỤC",
    "on": "ジク",
    "kun": "—",
    "m": "cái trục xe"
  },
  "宍": {
    "hv": "NHỤC",
    "on": "ニク, ジク",
    "kun": "しし",
    "m": "thịt, cùi quả"
  },
  "雫": {
    "hv": "[雫]",
    "on": "ダ",
    "kun": "しずく",
    "m": "drop, trickle, dripping"
  },
  "叱": {
    "hv": "SẤT",
    "on": "シツ, シチ, カ",
    "kun": "しか・る",
    "m": "quát, thét"
  },
  "執": {
    "hv": "CHẤP",
    "on": "シツ, シュウ",
    "kun": "と・る",
    "m": "cầm, giữ, thi hành, thực hiện"
  },
  "失": {
    "hv": "THẤT",
    "on": "シツ",
    "kun": "うしな・う, う・せる",
    "m": "lỡ, sai lầm, mất"
  },
  "嫉": {
    "hv": "TẬT",
    "on": "シツ",
    "kun": "そね・む, ねた・む, にく・む",
    "m": "căm ghét, ghen ghét, đố kỵ, ganh tị"
  },
  "湿": {
    "hv": "THẤP",
    "on": "シツ, シュウ",
    "kun": "しめ・る, しめ・す, うるお・う, うるお・す",
    "m": "ẩm ướt"
  },
  "漆": {
    "hv": "TẤT",
    "on": "シツ",
    "kun": "うるし",
    "m": "sông Tất, quét sơn, cây sơn"
  },
  "疾": {
    "hv": "TẬT",
    "on": "シツ",
    "kun": "はや・い",
    "m": "bệnh tật"
  },
  "質": {
    "hv": "CHẤT",
    "on": "シツ, シチ, チ",
    "kun": "たち, ただ・す, もと, わりふ",
    "m": "thể chất (rắn, lỏng, khí), tư chất, chất phác, mộc mạc"
  },
  "実": {
    "hv": "CHÍ",
    "on": "ジツ, シツ",
    "kun": "み, みの・る, まこと, みの, みち・る",
    "m": "reality, truth, seed"
  },
  "篠": {
    "hv": "TIỂU",
    "on": "ゾウ, ショウ",
    "kun": "しの, ささ, すず",
    "m": "tre nhỏ"
  },
  "偲": {
    "hv": "TY",
    "on": "サイ, シ",
    "kun": "しの・ぶ",
    "m": "có tài, có khiếu, khẩn cấp"
  },
  "柴": {
    "hv": "SÀI",
    "on": "サイ, シ",
    "kun": "しば",
    "m": "củi đun"
  },
  "芝": {
    "hv": "CHI",
    "on": "シ",
    "kun": "しば",
    "m": "một loại cỏ thơm"
  },
  "縞": {
    "hv": "CẢO",
    "on": "コウ",
    "kun": "しま, しろぎぬ",
    "m": "tre thuộc mỏng"
  },
  "舎": {
    "hv": "XÁ",
    "on": "シャ, セキ",
    "kun": "やど・る",
    "m": "quán trọ, nghỉ trọ"
  },
  "写": {
    "hv": "TẢ",
    "on": "シャ, ジャ",
    "kun": "うつ・す, うつ・る, うつ-, うつ・し",
    "m": "viết, chép, dốc hết ra, tháo ra, đúc tượng"
  },
  "射": {
    "hv": "XẠ",
    "on": "シャ",
    "kun": "い・る, さ・す, う・つ",
    "m": "bắn tên, bắn nỏ, tìm kiếm, soi sáng"
  },
  "捨": {
    "hv": "XẢ",
    "on": "シャ",
    "kun": "す・てる",
    "m": "vứt bỏ, bỏ đi, rời bỏ, bố thí"
  },
  "赦": {
    "hv": "XÁ",
    "on": "シャ",
    "kun": "ゆる・す",
    "m": "tha tội"
  },
  "斜": {
    "hv": "TÀ",
    "on": "シャ",
    "kun": "なな・め, はす",
    "m": "lệch, vẹo, nghiêng, xiên, chéo"
  },
  "煮": {
    "hv": "CHỬ",
    "on": "シャ",
    "kun": "に・る, -に, に・える, に・やす",
    "m": "nấu (cơm)"
  },
  "紗": {
    "hv": "SA",
    "on": "サ, シャ",
    "kun": "うすぎぬ",
    "m": "sợi vải, lụa mỏng, the, rèm"
  },
  "者": {
    "hv": "GIẢ",
    "on": "シャ",
    "kun": "もの",
    "m": "người, một đại từ thay thế"
  },
  "謝": {
    "hv": "TẠ",
    "on": "シャ",
    "kun": "あやま・る",
    "m": "cảm tạ, cảm ơn, nhận lỗi, xin lỗi, tạ lỗi, rụng, tàn, rã"
  },
  "遮": {
    "hv": "GIÀ",
    "on": "シャ",
    "kun": "さえぎ・る",
    "m": "che lấp, ngăn trở"
  },
  "蛇": {
    "hv": "XÀ",
    "on": "ジャ, ダ, イ, ヤ",
    "kun": "へび",
    "m": "con rắn"
  },
  "邪": {
    "hv": "TÀ",
    "on": "ジャ",
    "kun": "よこし・ま",
    "m": "không ngay thẳng, bất chính"
  },
  "借": {
    "hv": "TÁ",
    "on": "シャク",
    "kun": "か・りる",
    "m": "vay mượn"
  },
  "勺": {
    "hv": "CHƯỚC",
    "on": "シャク",
    "kun": "—",
    "m": "múc lấy, cái muôi múc canh, chước (đơn vị đo, bằng 1/100 của thăng)"
  },
  "尺": {
    "hv": "XÍCH",
    "on": "シャク, セキ",
    "kun": "さし",
    "m": "thước (10 tấc)"
  },
  "爵": {
    "hv": "TƯỚC",
    "on": "シャク",
    "kun": "—",
    "m": "cái chén rượu, chức tước"
  },
  "酌": {
    "hv": "CHƯỚC",
    "on": "シャク",
    "kun": "く・む",
    "m": "rót rượu, uống rượu"
  },
  "釈": {
    "hv": "DỊCH",
    "on": "シャク, セキ",
    "kun": "とく, す・てる, ゆる・す",
    "m": "explanation"
  },
  "錫": {
    "hv": "TÍCH",
    "on": "セキ, シャク",
    "kun": "すず, たま・う",
    "m": "thiếc, Sn"
  },
  "若": {
    "hv": "NHƯỢC",
    "on": "ジャク, ニャク, ニャ",
    "kun": "わか・い, わか-, も・しくわ, も・し, も・しくは, ごと・し",
    "m": "giống như, nếu"
  },
  "寂": {
    "hv": "TỊCH",
    "on": "ジャク, セキ",
    "kun": "さび, さび・しい, さび・れる, さみ・しい",
    "m": "yên tĩnh, hoang vắng"
  },
  "主": {
    "hv": "CHÚA",
    "on": "シュ, ス, シュウ",
    "kun": "ぬし, おも, あるじ",
    "m": "người đứng đầu, người đứng đầu"
  },
  "取": {
    "hv": "THỦ",
    "on": "シュ",
    "kun": "と・る, と・り, と・り-, とり, -ど・り",
    "m": "lấy"
  },
  "守": {
    "hv": "THÚ",
    "on": "シュ, ス",
    "kun": "まも・る, まも・り, もり, -もり, かみ",
    "m": "giữ, coi, đợi, giữ, coi"
  },
  "手": {
    "hv": "THỦ",
    "on": "シュ, ズ",
    "kun": "て, て-, -て, た-",
    "m": "cái tay"
  },
  "朱": {
    "hv": "CHU",
    "on": "シュ",
    "kun": "あけ",
    "m": "màu đỏ, màu đỏ"
  },
  "殊": {
    "hv": "THÙ",
    "on": "シュ",
    "kun": "こと",
    "m": "chấm dứt, xong hết, khác biệt, rất, lắm"
  },
  "狩": {
    "hv": "THÚ",
    "on": "シュ",
    "kun": "か・る, か・り, -が・り",
    "m": "lễ đi săn vào mùa đông"
  },
  "珠": {
    "hv": "CHÂU",
    "on": "シュ",
    "kun": "たま",
    "m": "châu, ngọc trai"
  },
  "種": {
    "hv": "CHỦNG",
    "on": "シュ",
    "kun": "たね, -ぐさ",
    "m": "thóc giống, chủng loại, giống"
  },
  "腫": {
    "hv": "THŨNG",
    "on": "シュ, ショウ",
    "kun": "は・れる, は・れ, は・らす, はれもの",
    "m": "sưng, nề, phù"
  },
  "趣": {
    "hv": "THÚ",
    "on": "シュ",
    "kun": "おもむき, おもむ・く",
    "m": "thú vui, ham thích"
  },
  "酒": {
    "hv": "TỬU",
    "on": "シュ",
    "kun": "さけ, さか-",
    "m": "rượu"
  },
  "首": {
    "hv": "THỦ",
    "on": "シュ",
    "kun": "くび",
    "m": "thú tội, đầu thú, đầu, chúa, chủ, trùm"
  },
  "儒": {
    "hv": "NHO",
    "on": "ジュ",
    "kun": "—",
    "m": "học trò, nho nhã, đạo Nho"
  },
  "受": {
    "hv": "THỤ",
    "on": "ジュ",
    "kun": "う・ける, -う・け, う・かる",
    "m": "chịu đựng, được, bị, mắc phải"
  },
  "呪": {
    "hv": "CHÚ",
    "on": "ジュ, シュ, シュウ, ズ",
    "kun": "まじな・う, のろ・い, まじな・い, のろ・う",
    "m": "nguyền rủa, thần chú"
  },
  "寿": {
    "hv": "THỌ",
    "on": "ジュ, ス, シュウ",
    "kun": "ことぶき, ことぶ・く, ことほ・ぐ",
    "m": "thọ, sống lâu"
  },
  "授": {
    "hv": "THỤ",
    "on": "ジュ",
    "kun": "さず・ける, さず・かる",
    "m": "trao cho, truyền thụ, dạy"
  },
  "樹": {
    "hv": "THỤ",
    "on": "ジュ",
    "kun": "き",
    "m": "cái cây"
  },
  "需": {
    "hv": "NHU",
    "on": "ジュ",
    "kun": "—",
    "m": "đợi, đồ dùng, nhu cầu, cần thiết"
  },
  "囚": {
    "hv": "TÙ",
    "on": "シュウ",
    "kun": "とら・われる",
    "m": "tù, giam giữ"
  },
  "収": {
    "hv": "THÂU",
    "on": "シュウ",
    "kun": "おさ・める, おさ・まる",
    "m": "income, obtain, reap"
  },
  "周": {
    "hv": "CHU",
    "on": "シュウ",
    "kun": "まわ・り",
    "m": "vòng quanh, đời nhà Chu, vòng quanh"
  },
  "宗": {
    "hv": "TÔNG",
    "on": "シュウ, ソウ",
    "kun": "むね",
    "m": "dòng họ"
  },
  "就": {
    "hv": "TỰU",
    "on": "シュウ, ジュ",
    "kun": "つ・く, つ・ける",
    "m": "nên, hay là, tới, theo"
  },
  "州": {
    "hv": "CHÂU",
    "on": "シュウ, ス",
    "kun": "す",
    "m": "châu (đơn vị hành chính)"
  },
  "修": {
    "hv": "TU",
    "on": "シュウ, シュ",
    "kun": "おさ・める, おさ・まる",
    "m": "tu hành, tu sửa"
  },
  "愁": {
    "hv": "SẦU",
    "on": "シュウ",
    "kun": "うれ・える, うれ・い",
    "m": "buồn bã"
  },
  "拾": {
    "hv": "THẬP",
    "on": "シュウ, ジュウ",
    "kun": "ひろ・う",
    "m": "nhặt lấy"
  },
  "洲": {
    "hv": "CHÂU",
    "on": "シュウ, ス",
    "kun": "しま",
    "m": "bãi, cù lao, châu lục"
  },
  "秀": {
    "hv": "TÚ",
    "on": "シュウ",
    "kun": "ひい・でる",
    "m": "ra hoa, nở hoa, đẹp đẽ, giỏi, xuất sắc"
  },
  "臭": {
    "hv": "XÚ",
    "on": "シュウ",
    "kun": "くさ・い, -くさ・い, にお・う, にお・い",
    "m": "mùi, hôi thối, khai, khét, tiếng xấu"
  },
  "舟": {
    "hv": "CHU",
    "on": "シュウ",
    "kun": "ふね, ふな-, -ぶね",
    "m": "cái thuyền, cái thuyền"
  },
  "衆": {
    "hv": "CHÚNG",
    "on": "シュウ, シュ",
    "kun": "おお・い",
    "m": "nhiều, đông"
  },
  "襲": {
    "hv": "TẬP",
    "on": "シュウ",
    "kun": "おそ・う, かさ・ね",
    "m": "áo liệm người chết, tập kích, lẻn đánh, đánh úp, bắt chước"
  },
  "蹴": {
    "hv": "XÚC",
    "on": "シュク, シュウ",
    "kun": "け・る",
    "m": "bước xéo gót, rảo bước, đá lật đi, vẻ kính cần"
  },
  "酬": {
    "hv": "THÙ",
    "on": "シュウ, シュ, トウ",
    "kun": "むく・いる",
    "m": "mời rượu, đền đáp lại"
  },
  "集": {
    "hv": "TẬP",
    "on": "シュウ",
    "kun": "あつ・まる, あつ・める, つど・う",
    "m": "tập (sách), tụ hợp lại"
  },
  "醜": {
    "hv": "XÚ",
    "on": "シュウ",
    "kun": "みにく・い, しこ",
    "m": "xấu xa"
  },
  "住": {
    "hv": "TRÚ",
    "on": "ジュウ, ヂュウ, チュウ",
    "kun": "す・む, す・まう, -ず・まい",
    "m": "ở, thôi, dừng, còn đấy"
  },
  "充": {
    "hv": "SUNG",
    "on": "ジュウ",
    "kun": "あ・てる, み・たす",
    "m": "đầy đủ, làm đầy"
  },
  "従": {
    "hv": "TÒNG",
    "on": "ジュウ, ショウ, ジュ",
    "kun": "したが・う, したが・える, より",
    "m": "đi theo"
  },
  "柔": {
    "hv": "NHU",
    "on": "ジュウ, ニュウ",
    "kun": "やわ・らか, やわ・らかい, やわ, やわ・ら",
    "m": "mềm dẻo"
  },
  "汁": {
    "hv": "HIỆP",
    "on": "ジュウ",
    "kun": "しる, -しる, つゆ",
    "m": "hoà hợp, giúp đỡ, nhựa, chất lỏng"
  },
  "渋": {
    "hv": "SÁP",
    "on": "ジュウ, シュウ",
    "kun": "しぶ, しぶ・い, しぶ・る",
    "m": "astringent, hesitate, reluctant"
  },
  "獣": {
    "hv": "THÚ",
    "on": "ジュウ",
    "kun": "けもの, けだもの",
    "m": "animal, beast"
  },
  "縦": {
    "hv": "TÚNG",
    "on": "ジュウ",
    "kun": "たて",
    "m": "vertical, length, height"
  },
  "銃": {
    "hv": "SÚNG",
    "on": "ジュウ",
    "kun": "つつ",
    "m": "cái lỗ rìu búa để cho cán vào, cái súng (vũ khí đời xưa)"
  },
  "叔": {
    "hv": "THÚC",
    "on": "シュク",
    "kun": "—",
    "m": "chú ruột, cậu ruột, tiếng anh gọi em trai"
  },
  "宿": {
    "hv": "TÚC",
    "on": "シュク",
    "kun": "やど, やど・る, やど・す",
    "m": "trú đêm, ở qua đêm, lưu lại"
  },
  "淑": {
    "hv": "THỤC",
    "on": "シュク",
    "kun": "しと・やか",
    "m": "hiền lành"
  },
  "祝": {
    "hv": "CHÚC",
    "on": "シュク, シュウ",
    "kun": "いわ・う",
    "m": "khấn, chúc tụng, mong muốn, mừng"
  },
  "縮": {
    "hv": "SÚC",
    "on": "シュク",
    "kun": "ちぢ・む, ちぢ・まる, ちぢ・める, ちぢ・れる, ちぢ・らす",
    "m": "co lại"
  },
  "粛": {
    "hv": "TÚC",
    "on": "シュク, スク",
    "kun": "つつし・む",
    "m": "solemn, quietly, softly"
  },
  "塾": {
    "hv": "THỤC",
    "on": "ジュク",
    "kun": "—",
    "m": "lớp học tại nhà"
  },
  "熟": {
    "hv": "THỤC",
    "on": "ジュク",
    "kun": "う・れる",
    "m": "chín, đã quen, kỹ càng"
  },
  "出": {
    "hv": "XUẤT",
    "on": "シュツ, スイ",
    "kun": "で・る, -で, だ・す, -だ・す, い・でる, い・だす",
    "m": "ra ngoài, đi ra, một tấn (một đoạn) trong vở tuồng, một tấn (một đoạn) trong vở tuồng"
  },
  "述": {
    "hv": "THUẬT",
    "on": "ジュツ",
    "kun": "の・べる",
    "m": "thuật lại, kể lại, noi theo"
  },
  "俊": {
    "hv": "TUẤN",
    "on": "シュン",
    "kun": "—",
    "m": "xinh, đẹp, kháu, tài giỏi"
  },
  "峻": {
    "hv": "TUẤN",
    "on": "シュン",
    "kun": "けわ・しい, たか・い",
    "m": "cao (núi)"
  },
  "瞬": {
    "hv": "THUẤN",
    "on": "シュン",
    "kun": "またた・く, まじろ・ぐ",
    "m": "nháy mắt"
  },
  "竣": {
    "hv": "THUÂN",
    "on": "ドウ, シュン",
    "kun": "わらわ, わらべ, おわ・る",
    "m": "thôi, xong việc"
  },
  "舜": {
    "hv": "THUẤN",
    "on": "シュン",
    "kun": "—",
    "m": "vua Thuấn (đời nhà Ngu)"
  },
  "駿": {
    "hv": "TUẤN",
    "on": "シュン, スン",
    "kun": "すぐ・れる",
    "m": "ngựa hay"
  },
  "准": {
    "hv": "CHUẨN",
    "on": "ジュン",
    "kun": "—",
    "m": "chuẩn mực, theo như, cứ như (trích dẫn)"
  },
  "循": {
    "hv": "TUẦN",
    "on": "ジュン",
    "kun": "—",
    "m": "noi, tuân theo"
  },
  "旬": {
    "hv": "TUẦN",
    "on": "ジュン, シュン",
    "kun": "—",
    "m": "sự lặp lại, tuần tuổi, 10 ngày"
  },
  "殉": {
    "hv": "TUẪN",
    "on": "ジュン",
    "kun": "—",
    "m": "chết theo người khác"
  },
  "淳": {
    "hv": "THUẦN",
    "on": "ジュン, シュン",
    "kun": "あつ・い",
    "m": "thuần, trong sạch, mộc mạc, tưới, thấm"
  },
  "準": {
    "hv": "CHUẨN",
    "on": "ジュン",
    "kun": "じゅん・じる, じゅん・ずる, なぞら・える, のり, ひと・しい, みずもり",
    "m": "chuẩn mực, theo như, cứ như (trích dẫn)"
  },
  "潤": {
    "hv": "NHUẬN",
    "on": "ジュン",
    "kun": "うるお・う, うるお・す, うる・む",
    "m": "nhuần nhị, thấm ướt, lời, lãi"
  },
  "盾": {
    "hv": "THUẪN",
    "on": "ジュン",
    "kun": "たて",
    "m": "lông mày, cái khiên, cái mộc, thanh gỗ ngang ở lan can"
  },
  "純": {
    "hv": "THUẦN",
    "on": "ジュン",
    "kun": "—",
    "m": "thuần tuý, không  có loại khác"
  },
  "巡": {
    "hv": "TUẦN",
    "on": "ジュン",
    "kun": "めぐ・る, めぐ・り",
    "m": "đi lại xem xét, đi hết một vòng"
  },
  "遵": {
    "hv": "TUÂN",
    "on": "ジュン",
    "kun": "—",
    "m": "lần theo, noi theo, tuân theo"
  },
  "醇": {
    "hv": "THUẦN",
    "on": "ジュン, シュン",
    "kun": "もっぱら, こい, あつい",
    "m": "rượu ngon, thuần hậu"
  },
  "順": {
    "hv": "THUẬN",
    "on": "ジュン",
    "kun": "—",
    "m": "suôn sẻ, thuận theo, hàng phục, thuận, xuôi"
  },
  "処": {
    "hv": "XỨ",
    "on": "ショ",
    "kun": "ところ, -こ, お・る",
    "m": "dispose, manage, deal with"
  },
  "初": {
    "hv": "SƠ",
    "on": "ショ",
    "kun": "はじ・め, はじ・めて, はつ, はつ-, うい-, -そ・める, -ぞ・め",
    "m": "lần đầu, vừa mới, bắt đầu"
  },
  "暑": {
    "hv": "THỬ",
    "on": "ショ",
    "kun": "あつ・い",
    "m": "nóng bức, nắng, mùa hè"
  },
  "曙": {
    "hv": "THỰ",
    "on": "ショ",
    "kun": "あけぼの",
    "m": "rạng sáng"
  },
  "渚": {
    "hv": "CHỬ",
    "on": "ショ",
    "kun": "なぎさ",
    "m": "bến nước"
  },
  "庶": {
    "hv": "THỨ",
    "on": "ショ",
    "kun": "—",
    "m": "nhiều, chi thứ (trong dòng họ), con thứ"
  },
  "緒": {
    "hv": "TỰ",
    "on": "ショ, チョ",
    "kun": "お, いとぐち",
    "m": "đầu dây, đầu mối"
  },
  "署": {
    "hv": "THỬ",
    "on": "ショ",
    "kun": "—",
    "m": "ký tên, tạm giữ chức, chức vụ lâm thời, nơi làm việc"
  },
  "諸": {
    "hv": "CHƯ",
    "on": "ショ",
    "kun": "もろ",
    "m": "(là hợp thanh của 2 chữ \"chi ư\")"
  },
  "助": {
    "hv": "TRỢ",
    "on": "ジョ",
    "kun": "たす・ける, たす・かる, す・ける, すけ",
    "m": "trợ giúp"
  },
  "叙": {
    "hv": "TỰ",
    "on": "ジョ",
    "kun": "つい・ず, ついで",
    "m": "thuật lại, kể lại"
  },
  "序": {
    "hv": "TỰ",
    "on": "ジョ",
    "kun": "つい・で, ついで",
    "m": "thứ tự, bài tựa, bài mở đầu"
  },
  "徐": {
    "hv": "TỪ",
    "on": "ジョ",
    "kun": "おもむ・ろに",
    "m": "từ từ, chầm chậm, đi thong thả"
  },
  "恕": {
    "hv": "THỨ",
    "on": "ジョ, ショ",
    "kun": "ゆる・す",
    "m": "tha thứ, thứ tội"
  },
  "除": {
    "hv": "TRỪ",
    "on": "ジョ, ジ",
    "kun": "のぞ・く, -よ・け",
    "m": "thềm, loại bỏ, phép trừ"
  },
  "傷": {
    "hv": "THƯƠNG",
    "on": "ショウ",
    "kun": "きず, いた・む, いた・める",
    "m": "đau đớn"
  },
  "償": {
    "hv": "THƯỜNG",
    "on": "ショウ",
    "kun": "つぐな・う",
    "m": "đền lại"
  },
  "勝": {
    "hv": "THĂNG",
    "on": "ショウ",
    "kun": "か・つ, -が・ち, まさ・る, すぐ・れる, かつ",
    "m": "được, thắng lợi, hơn, giỏi, tốt đẹp"
  },
  "匠": {
    "hv": "TƯỢNG",
    "on": "ショウ",
    "kun": "たくみ",
    "m": "người thợ, khéo, lành nghề"
  },
  "升": {
    "hv": "THĂNG",
    "on": "ショウ",
    "kun": "ます",
    "m": "bay lên, cái thưng, thưng, thăng (đơn vị đo)"
  },
  "召": {
    "hv": "CHIÊU",
    "on": "ショウ",
    "kun": "め・す",
    "m": "kêu gọi, mời đến, kêu gọi, mời đến"
  },
  "哨": {
    "hv": "TIÊU",
    "on": "ショウ",
    "kun": "みはり",
    "m": "chòi canh, trạm gác, chim kêu, thổi còi"
  },
  "商": {
    "hv": "THƯƠNG",
    "on": "ショウ",
    "kun": "あきな・う",
    "m": "buôn bán"
  },
  "唱": {
    "hv": "XƯỚNG",
    "on": "ショウ",
    "kun": "とな・える",
    "m": "kêu lên"
  },
  "奨": {
    "hv": "TƯỞNG",
    "on": "ショウ, ソウ",
    "kun": "すす・める",
    "m": "exhort, urge, encourage"
  },
  "娼": {
    "hv": "XƯỚNG",
    "on": "ショウ",
    "kun": "あそびめ",
    "m": "con hát"
  },
  "宵": {
    "hv": "TIÊU",
    "on": "ショウ",
    "kun": "よい",
    "m": "đêm, nhỏ bé"
  },
  "将": {
    "hv": "TƯƠNG",
    "on": "ショウ, ソウ",
    "kun": "まさ・に, はた, まさ, ひきい・る, もって",
    "m": "sẽ, sắp, đem, đưa, cầm, cấp tướng, chỉ huy"
  },
  "尚": {
    "hv": "THƯỢNG",
    "on": "ショウ",
    "kun": "なお",
    "m": "vẫn còn, ưa chuộng"
  },
  "庄": {
    "hv": "TRANG",
    "on": "ショウ, ソ, ソウ, ホウ",
    "kun": "—",
    "m": "trang trại, gia trang, họ Trang"
  },
  "床": {
    "hv": "SÀNG",
    "on": "ショウ",
    "kun": "とこ, ゆか",
    "m": "cái giường"
  },
  "彰": {
    "hv": "CHƯƠNG",
    "on": "ショウ",
    "kun": "—",
    "m": "rực rỡ, rõ rệt"
  },
  "承": {
    "hv": "THỪA",
    "on": "ショウ, ジョウ",
    "kun": "うけたまわ・る, う・ける",
    "m": "vâng theo, hứng, đón lấy, nhận lấy"
  },
  "抄": {
    "hv": "SAO",
    "on": "ショウ",
    "kun": "—",
    "m": "sao, chép lại, sao (đơn vị đo, bằng 1/1000 của thăng)"
  },
  "招": {
    "hv": "CHIÊU",
    "on": "ショウ",
    "kun": "まね・く",
    "m": "mời, vẫy tay gọi"
  },
  "掌": {
    "hv": "CHƯỞNG",
    "on": "ショウ",
    "kun": "てのひら, たなごころ",
    "m": "lòng bàn tay, tát, vả"
  },
  "捷": {
    "hv": "TIỆP",
    "on": "ショウ, ソウ",
    "kun": "はや・い",
    "m": "thắng trận"
  },
  "昇": {
    "hv": "THĂNG",
    "on": "ショウ",
    "kun": "のぼ・る",
    "m": "bay lên, cái thưng, thưng, thăng (đơn vị đo)"
  },
  "昌": {
    "hv": "XƯƠNG",
    "on": "ショウ",
    "kun": "さかん",
    "m": "sáng sủa, thịnh, tốt đẹp"
  },
  "昭": {
    "hv": "CHIÊU",
    "on": "ショウ",
    "kun": "—",
    "m": "sáng sủa, rõ rệt"
  },
  "晶": {
    "hv": "TINH",
    "on": "ショウ",
    "kun": "—",
    "m": "sáng sủa"
  },
  "松": {
    "hv": "TÙNG",
    "on": "ショウ",
    "kun": "まつ",
    "m": "cây tùng, cây thông, tóc rối bù, bờm cổ"
  },
  "梢": {
    "hv": "SAO",
    "on": "ショウ",
    "kun": "こずえ, くすのき",
    "m": "ngọn cây, mốc, dấu hiệu, nhãn hiệu"
  },
  "樟": {
    "hv": "CHƯƠNG",
    "on": "ショウ",
    "kun": "くす",
    "m": "cây long não"
  },
  "沼": {
    "hv": "CHIỂU",
    "on": "ショウ",
    "kun": "ぬま",
    "m": "cái ao hình cong"
  },
  "消": {
    "hv": "TIÊU",
    "on": "ショウ",
    "kun": "き・える, け・す",
    "m": "tiêu tan, tiêu biến"
  },
  "渉": {
    "hv": "THIỆP",
    "on": "ショウ",
    "kun": "わた・る",
    "m": "ford, go cross, transit"
  },
  "湘": {
    "hv": "TƯƠNG",
    "on": "ショウ",
    "kun": "—",
    "m": "sông Tương"
  },
  "焼": {
    "hv": "THIÊU",
    "on": "ショウ",
    "kun": "や・く, や・き, や・き-, -や・き, や・ける",
    "m": "bake, burning"
  },
  "焦": {
    "hv": "TIÊU",
    "on": "ショウ",
    "kun": "こ・げる, こ・がす, こ・がれる, あせ・る, じ・れる, じ・らす",
    "m": "cháy, nỏ, giòn, bỏng rát"
  },
  "照": {
    "hv": "CHIẾU",
    "on": "ショウ",
    "kun": "て・る, て・らす, て・れる",
    "m": "chiếu, soi, rọi"
  },
  "症": {
    "hv": "CHỨNG",
    "on": "ショウ",
    "kun": "—",
    "m": "chứng bệnh, bệnh hòn (tích hòn rắn chắc trong bụng)"
  },
  "省": {
    "hv": "TỈNH",
    "on": "セイ, ショウ",
    "kun": "かえり・みる, はぶ・く",
    "m": "coi xét, tiết kiệm, tỉnh lị"
  },
  "硝": {
    "hv": "TIÊU",
    "on": "ショウ",
    "kun": "—",
    "m": "đá tiêu (trong suốt, đốt cháy, dùng làm thuốc pháo)"
  },
  "礁": {
    "hv": "TIÊU",
    "on": "ショウ",
    "kun": "—",
    "m": "đá ngầm, san hô, đá ngầm"
  },
  "祥": {
    "hv": "TƯỜNG",
    "on": "ショウ",
    "kun": "さいわ・い, きざ・し, よ・い, つまび・らか",
    "m": "điềm xấu tốt, điềm lành"
  },
  "称": {
    "hv": "XƯNG",
    "on": "ショウ",
    "kun": "たた・える, とな・える, あ・げる, かな・う, はか・り, はか・る, ほめ・る",
    "m": "gọi bằng, gọi là, xưng là"
  },
  "章": {
    "hv": "CHƯƠNG",
    "on": "ショウ",
    "kun": "—",
    "m": "chương (sách), trật tự mạch lạc, điều lệ"
  },
  "笑": {
    "hv": "TIẾU",
    "on": "ショウ",
    "kun": "わら・う, え・む",
    "m": "cười"
  },
  "粧": {
    "hv": "TRANG",
    "on": "ショウ",
    "kun": "—",
    "m": "đồ trang điểm, trang sức"
  },
  "紹": {
    "hv": "THIỆU",
    "on": "ショウ",
    "kun": "—",
    "m": "tiếp nối"
  },
  "肖": {
    "hv": "TIÊU",
    "on": "ショウ",
    "kun": "あやか・る",
    "m": "suy vong, mất, thất tán"
  },
  "菖": {
    "hv": "XƯƠNG",
    "on": "ショウ",
    "kun": "—",
    "m": "(xem: xương bồ 菖蒲)"
  },
  "蒋": {
    "hv": "TƯỞNG",
    "on": "ショウ, ソウ",
    "kun": "まこも, はげ・ます",
    "m": "(một loài nấm), họ Tưởng, nước Tưởng"
  },
  "蕉": {
    "hv": "TIÊU",
    "on": "ショウ",
    "kun": "—",
    "m": "cây chuối"
  },
  "衝": {
    "hv": "XUNG",
    "on": "ショウ",
    "kun": "つ・く",
    "m": "đường cái, dội, xối (nước), bay lên"
  },
  "訟": {
    "hv": "TỤNG",
    "on": "ショウ",
    "kun": "—",
    "m": "kiện tụng, tranh cãi"
  },
  "証": {
    "hv": "CHỨNG",
    "on": "ショウ",
    "kun": "あかし",
    "m": "bằng cứ, can gián"
  },
  "詔": {
    "hv": "CHIẾU",
    "on": "ショウ",
    "kun": "みことのり",
    "m": "chiếu chỉ"
  },
  "詳": {
    "hv": "TƯỜNG",
    "on": "ショウ",
    "kun": "くわ・しい, つまび・らか",
    "m": "rõ ràng, tường tận"
  },
  "象": {
    "hv": "TƯỢNG",
    "on": "ショウ, ゾウ",
    "kun": "かたど・る",
    "m": "hình dáng, giống như, con voi"
  },
  "賞": {
    "hv": "THƯỞNG",
    "on": "ショウ",
    "kun": "ほ・める",
    "m": "xem, ngắm, khen thưởng, thưởng công"
  },
  "醤": {
    "hv": "TƯƠNG",
    "on": "ショウ",
    "kun": "ひしお",
    "m": "a kind of miso"
  },
  "鍾": {
    "hv": "CHUNG",
    "on": "ショウ, シュ",
    "kun": "あつ・める, さかずき, かね",
    "m": "cái chén uống rượu, tụ hợp lại, họ Chung"
  },
  "鐘": {
    "hv": "CHUNG",
    "on": "ショウ",
    "kun": "かね",
    "m": "cái chuông, phút thời gian"
  },
  "障": {
    "hv": "CHƯỚNG",
    "on": "ショウ",
    "kun": "さわ・る",
    "m": "che, ngăn, cản, lấp, thành đóng ở nơi hiểm yếu"
  },
  "上": {
    "hv": "THƯỚNG",
    "on": "ジョウ, ショウ, シャン",
    "kun": "うえ, -うえ, うわ-, かみ, あ・げる, -あ・げる, あ・がる, -あ・がる, あ・がり, -あ・がり, のぼ・る, のぼ・り, のぼ・せる, のぼ・す, たてまつ・る",
    "m": "đi lên, ở phía trên, đi lên"
  },
  "丈": {
    "hv": "TRƯỢNG",
    "on": "ジョウ",
    "kun": "たけ, だけ",
    "m": "đơn vị đo (bằng 10 thước), già cả, dượng"
  },
  "丞": {
    "hv": "THỪA",
    "on": "ジョウ, ショウ",
    "kun": "すく・う, たす・ける",
    "m": "giúp đỡ"
  },
  "乗": {
    "hv": "THẶNG",
    "on": "ジョウ, ショウ",
    "kun": "の・る, -の・り, の・せる",
    "m": "cỗ xe, sách ghi chép, cưỡi"
  },
  "冗": {
    "hv": "NHŨNG",
    "on": "ジョウ",
    "kun": "—",
    "m": "vô tích sự, phiền nhiễu"
  },
  "剰": {
    "hv": "THẶNG",
    "on": "ジョウ",
    "kun": "あまつさえ, あま・り, あま・る",
    "m": "còn, thừa ra, tặng thêm"
  },
  "城": {
    "hv": "THÀNH",
    "on": "ジョウ, セイ",
    "kun": "しろ",
    "m": "thành trì, xây thành"
  },
  "壌": {
    "hv": "NHƯỠNG",
    "on": "ジョウ",
    "kun": "つち",
    "m": "lot, earth, soil"
  },
  "嬢": {
    "hv": "NƯƠNG",
    "on": "ジョウ",
    "kun": "むすめ",
    "m": "lass, girl, Miss"
  },
  "常": {
    "hv": "THƯỜNG",
    "on": "ジョウ",
    "kun": "つね, とこ-",
    "m": "thông thường, bình thường"
  },
  "条": {
    "hv": "ĐIỀU",
    "on": "ジョウ, チョウ, デキ",
    "kun": "えだ, すじ",
    "m": "điều khoản, khoản mục, sọc, vằn, sợi, cành cây"
  },
  "杖": {
    "hv": "TRƯỢNG",
    "on": "ジョウ",
    "kun": "つえ",
    "m": "cái gậy chống, gậy, que, người chống gậy"
  },
  "浄": {
    "hv": "TỊNH",
    "on": "ジョウ, セイ",
    "kun": "きよ・める, きよ・い",
    "m": "sạch sẽ, đóng vai hề"
  },
  "状": {
    "hv": "TRẠNG",
    "on": "ジョウ",
    "kun": "—",
    "m": "hình dáng, trạng (người đỗ đầu kỳ thi)"
  },
  "畳": {
    "hv": "ĐIỆP",
    "on": "ジョウ, チョウ",
    "kun": "たた・む, たたみ, かさ・なる",
    "m": "tatami mat, counter for tatami mats, fold"
  },
  "穣": {
    "hv": "NHƯƠNG",
    "on": "ジョウ",
    "kun": "わら, ゆたか",
    "m": "good crops, prosperity, 10**28"
  },
  "蒸": {
    "hv": "CHƯNG",
    "on": "ジョウ, セイ",
    "kun": "む・す, む・れる, む・らす",
    "m": "lũ, bọn, hơi nóng bốc lên, hương lên, đùn đùn"
  },
  "譲": {
    "hv": "NHƯỢNG",
    "on": "ジョウ",
    "kun": "ゆず・る",
    "m": "defer, turnover, transfer"
  },
  "醸": {
    "hv": "NHƯỠNG",
    "on": "ジョウ",
    "kun": "かも・す",
    "m": "brew, cause"
  },
  "錠": {
    "hv": "ĐĨNH",
    "on": "ジョウ",
    "kun": "—",
    "m": "thoi vàng, thoi bạc, con thoi dệt vải"
  },
  "嘱": {
    "hv": "CHÚC",
    "on": "ショク",
    "kun": "しょく・する, たの・む",
    "m": "dặn dò"
  },
  "埴": {
    "hv": "THỰC",
    "on": "ショク",
    "kun": "はに, へな",
    "m": "đất thó, đất sét"
  },
  "飾": {
    "hv": "SỨC",
    "on": "ショク",
    "kun": "かざ・る, かざ・り",
    "m": "trang sức, mệnh lệnh"
  },
  "拭": {
    "hv": "THỨC",
    "on": "ショク, シキ",
    "kun": "ぬぐ・う, ふ・く",
    "m": "lau chùi"
  },
  "植": {
    "hv": "THỰC",
    "on": "ショク",
    "kun": "う・える, う・わる",
    "m": "thực vật"
  },
  "殖": {
    "hv": "THỰC",
    "on": "ショク",
    "kun": "ふ・える, ふ・やす",
    "m": "sinh sôi, nảy nở, nhiều, đông"
  },
  "織": {
    "hv": "CHỨC",
    "on": "ショク, シキ",
    "kun": "お・る, お・り, おり, -おり, -お・り",
    "m": "dệt vải"
  },
  "職": {
    "hv": "CHỨC",
    "on": "ショク, ソク",
    "kun": "—",
    "m": "phần việc về mình"
  },
  "色": {
    "hv": "SẮC",
    "on": "ショク, シキ",
    "kun": "いろ",
    "m": "màu sắc, vẻ"
  },
  "触": {
    "hv": "XÚC",
    "on": "ショク",
    "kun": "ふ・れる, さわ・る, さわ",
    "m": "húc, đâm, chạm vào, sờ vào, cảm động"
  },
  "辱": {
    "hv": "NHỤC",
    "on": "ジョク",
    "kun": "はずかし・める",
    "m": "nhục, xấu hổ, làm nhục, chịu khuất"
  },
  "尻": {
    "hv": "CỪU",
    "on": "コウ",
    "kun": "しり",
    "m": "xương cùng sau đít"
  },
  "伸": {
    "hv": "THÂN",
    "on": "シン",
    "kun": "の・びる, の・ばす, の・べる, の・す",
    "m": "duỗi ra, bày tỏ, kể rõ"
  },
  "信": {
    "hv": "TÍN",
    "on": "シン",
    "kun": "—",
    "m": "tin tưởng, tin theo, lòng tin, đức tin"
  },
  "侵": {
    "hv": "XÂM",
    "on": "シン",
    "kun": "おか・す",
    "m": "chiếm lấy"
  },
  "唇": {
    "hv": "THẦN",
    "on": "シン",
    "kun": "くちびる",
    "m": "môi"
  },
  "娠": {
    "hv": "THẦN",
    "on": "シン",
    "kun": "—",
    "m": "đàn bà có chửa"
  },
  "寝": {
    "hv": "TẨM",
    "on": "シン",
    "kun": "ね・る, ね・かす, い・ぬ, みたまや, や・める",
    "m": "ngủ, lăng mộ"
  },
  "審": {
    "hv": "THẨM",
    "on": "シン",
    "kun": "つまび・らか, つぶさ・に",
    "m": "tỉ mỉ, thẩm tra, xét hỏi kỹ"
  },
  "心": {
    "hv": "TÂM",
    "on": "シン",
    "kun": "こころ, -ごころ",
    "m": "lòng, tim"
  },
  "慎": {
    "hv": "THẬN",
    "on": "シン",
    "kun": "つつし・む, つつ・ましい, つつし, つつし・み",
    "m": "thận trọng, cẩn thận"
  },
  "振": {
    "hv": "CHẤN",
    "on": "シン",
    "kun": "ふ・る, ふ・れる, ふ・るう",
    "m": "rung động"
  },
  "晋": {
    "hv": "TẤN",
    "on": "シン",
    "kun": "すす・む",
    "m": "tiến lên, đời nhà Tấn, nước Tấn"
  },
  "森": {
    "hv": "SÂM",
    "on": "シン",
    "kun": "もり",
    "m": "sum suê, rậm rạp"
  },
  "榛": {
    "hv": "TRĂN",
    "on": "シン, ハン",
    "kun": "はしばみ, はり",
    "m": "cây trăn, bụi cây, vướng vít"
  },
  "浸": {
    "hv": "TẨM",
    "on": "シン",
    "kun": "ひた・す, ひた・る, つ・かる",
    "m": "ngâm, thấm (nước), dần dần"
  },
  "深": {
    "hv": "THÂM",
    "on": "シン",
    "kun": "ふか・い, -ぶか・い, ふか・まる, ふか・める, み-",
    "m": "sâu, khuya (đêm)"
  },
  "申": {
    "hv": "THÂN",
    "on": "シン",
    "kun": "もう・す, もう・し-, さる",
    "m": "nói, trình bày, Thân (ngôi thứ 9 hàng Chi)"
  },
  "真": {
    "hv": "CHÂN",
    "on": "シン",
    "kun": "ま, ま-, まこと",
    "m": "thật, thực, người tu hành"
  },
  "神": {
    "hv": "THẦN",
    "on": "シン, ジン",
    "kun": "かみ, かん-, こう-",
    "m": "thần linh, thánh"
  },
  "秦": {
    "hv": "TẦN",
    "on": "シン",
    "kun": "はた",
    "m": "đời nhà Tần, nước Tần"
  },
  "紳": {
    "hv": "THÂN",
    "on": "シン",
    "kun": "—",
    "m": "cái đai áo, dải áo"
  },
  "臣": {
    "hv": "THẦN",
    "on": "シン, ジン",
    "kun": "—",
    "m": "bề tôi"
  },
  "芯": {
    "hv": "TÂM",
    "on": "シン",
    "kun": "—",
    "m": "bấc đèn, (xem: đăng tâm 燈芯,灯芯)"
  },
  "薪": {
    "hv": "TÂN",
    "on": "シン",
    "kun": "たきぎ, まき",
    "m": "củi đun, tiền lương"
  },
  "親": {
    "hv": "THÂN",
    "on": "シン",
    "kun": "おや, おや-, した・しい, した・しむ",
    "m": "cha mẹ, ruột thịt, thân cận, gần gũi"
  },
  "診": {
    "hv": "CHẨN",
    "on": "シン",
    "kun": "み・る",
    "m": "xem xét"
  },
  "身": {
    "hv": "THÂN",
    "on": "シン",
    "kun": "み",
    "m": "thân thể"
  },
  "辛": {
    "hv": "TÂN",
    "on": "シン",
    "kun": "から・い, つら・い, -づら・い, かのと",
    "m": "Tân (ngôi thứ 8 hàng Can), cay, nhọc nhằn"
  },
  "進": {
    "hv": "TIẾN",
    "on": "シン",
    "kun": "すす・む, すす・める",
    "m": "đi lên, tiến lên"
  },
  "針": {
    "hv": "CHÂM",
    "on": "シン",
    "kun": "はり",
    "m": "cái kim, cái kim"
  },
  "震": {
    "hv": "CHẤN",
    "on": "シン",
    "kun": "ふる・う, ふる・える, ふる・わせる, ふる・わす",
    "m": "1. sét đánh\n 2. quẻ Chấn (ngưỡng bồn) trong Kinh Dịch:\n - 2 vạch trên đứt, tượng Lôi (sấm)\n - tượng trưng: con trai trưởng, hành Mộc, tuổi Mão, hướng Đông"
  },
  "仁": {
    "hv": "NHÂN",
    "on": "ジン, ニ, ニン",
    "kun": "—",
    "m": "lòng thương người, nhân trong hạt, tê liệt"
  },
  "刃": {
    "hv": "NHẪN",
    "on": "ジン, ニン",
    "kun": "は, やいば, き・る",
    "m": "mũi nhọn, mũi nhọn"
  },
  "壬": {
    "hv": "NHÂM",
    "on": "ニン, ジン, イ",
    "kun": "みずのえ",
    "m": "Nhâm (ngôi thứ 9 hàng Can), to lớn, gian nịnh"
  },
  "尋": {
    "hv": "TẦM",
    "on": "ジン",
    "kun": "たず・ねる, ひろ",
    "m": "tìm kiếm, đơn vị đo độ dài (bằng 8 thước Tàu cũ)"
  },
  "甚": {
    "hv": "THẬM",
    "on": "ジン",
    "kun": "はなは・だ, はなは・だしい",
    "m": "rất"
  },
  "尽": {
    "hv": "TẪN",
    "on": "ジン, サン",
    "kun": "つ・きる, つ・くす, つ・かす, -づ・く, -ず・く, ことごと・く",
    "m": "hết, nhất, lớn nhất, to nhất, hết"
  },
  "腎": {
    "hv": "THẬN",
    "on": "ジン",
    "kun": "—",
    "m": "quả thận"
  },
  "迅": {
    "hv": "TẤN",
    "on": "ジン",
    "kun": "—",
    "m": "nhanh chóng"
  },
  "陣": {
    "hv": "TRẬN",
    "on": "ジン",
    "kun": "—",
    "m": "trận đánh, trận, cơn"
  },
  "諏": {
    "hv": "TƯU",
    "on": "シュ, ス",
    "kun": "そう, はか・る",
    "m": "chọn ngày tốt"
  },
  "須": {
    "hv": "TU",
    "on": "ス, シュ",
    "kun": "すべから・く, すべし, ひげ, まつ, もち・いる, もと・める",
    "m": "râu cằm, đợi, nên làm, cần thiết"
  },
  "酢": {
    "hv": "TẠC",
    "on": "サク",
    "kun": "す",
    "m": "khách rót rượu cho chủ"
  },
  "厨": {
    "hv": "TRÙ",
    "on": "シュウ, ズ, チュ, チュウ",
    "kun": "くりや",
    "m": "cái bếp, cái hòm"
  },
  "逗": {
    "hv": "ĐẬU",
    "on": "トウ, ズ",
    "kun": "とど・まる",
    "m": "đậu lại, đỗ lại, dừng lại"
  },
  "吹": {
    "hv": "XUY",
    "on": "スイ",
    "kun": "ふ・く",
    "m": "thổi, thổi"
  },
  "垂": {
    "hv": "THUỲ",
    "on": "スイ",
    "kun": "た・れる, た・らす, た・れ, -た・れ, なんなんと・す",
    "m": "rủ xuống"
  },
  "帥": {
    "hv": "SOÁI",
    "on": "スイ",
    "kun": "—",
    "m": "tướng cầm đầu, thống suất, làm gương, tướng cầm đầu, thống suất"
  },
  "推": {
    "hv": "SUY",
    "on": "スイ",
    "kun": "お・す",
    "m": "đẩy, đấm, lựa chọn, chọn lọc"
  },
  "水": {
    "hv": "THUỶ",
    "on": "スイ",
    "kun": "みず, みず-",
    "m": "nước, sao Thuỷ"
  },
  "炊": {
    "hv": "XUY",
    "on": "スイ",
    "kun": "た・く, -だ・き",
    "m": "nấu chín"
  },
  "睡": {
    "hv": "THUỴ",
    "on": "スイ",
    "kun": "ねむ・る, ねむ・い",
    "m": "giấc ngủ"
  },
  "粋": {
    "hv": "TUÝ",
    "on": "スイ",
    "kun": "いき",
    "m": "thuần khiết, tinh tuý"
  },
  "翠": {
    "hv": "THUÝ",
    "on": "スイ",
    "kun": "かわせみ, みどり",
    "m": "xanh biếc"
  },
  "衰": {
    "hv": "SUY",
    "on": "スイ",
    "kun": "おとろ・える",
    "m": "giảm bớt, suy vong, áo tang"
  },
  "遂": {
    "hv": "TOẠI",
    "on": "スイ",
    "kun": "と・げる, つい・に",
    "m": "bèn (trợ từ)"
  },
  "酔": {
    "hv": "TUÝ",
    "on": "スイ",
    "kun": "よ・う, よ・い, よ",
    "m": "say rượu"
  },
  "錘": {
    "hv": "CHUÝ",
    "on": "スイ",
    "kun": "つむ, おもり",
    "m": "quả cân, nặng, cái búa lớn"
  },
  "随": {
    "hv": "TUỲ",
    "on": "ズイ",
    "kun": "まにま・に, したが・う",
    "m": "tuỳ theo, đời nhà Tuỳ"
  },
  "瑞": {
    "hv": "THUỴ",
    "on": "ズイ, スイ",
    "kun": "みず-, しるし",
    "m": "viên ngọc, tốt lành"
  },
  "髄": {
    "hv": "TUỶ",
    "on": "ズイ",
    "kun": "—",
    "m": "marrow, pith, essence"
  },
  "崇": {
    "hv": "SÙNG",
    "on": "スウ",
    "kun": "あが・める",
    "m": "cao, tôn sùng"
  },
  "嵩": {
    "hv": "TUNG",
    "on": "スウ, シュウ",
    "kun": "かさ, かさ・む, たか・い",
    "m": "cao sừng sững, núi Tung"
  },
  "数": {
    "hv": "SỔ",
    "on": "スウ, ス, サク, ソク, シュ",
    "kun": "かず, かぞ・える, しばしば, せ・める, わずらわ・しい",
    "m": "số lượng, một vài, đếm"
  },
  "枢": {
    "hv": "XU",
    "on": "スウ, シュ",
    "kun": "とぼそ, からくり",
    "m": "cái then cửa, cây xu, sao Xu"
  },
  "雛": {
    "hv": "SỒ",
    "on": "スウ, ス, ジュ",
    "kun": "ひな, ひよこ",
    "m": "con chim non"
  },
  "据": {
    "hv": "CỨ",
    "on": "キョ",
    "kun": "す・える, す・わる",
    "m": "chiếm giữ, căn cứ, bằng cứ"
  },
  "杉": {
    "hv": "SAM",
    "on": "サン",
    "kun": "すぎ",
    "m": "cây sam (một loài giống cây thông)"
  },
  "椙": {
    "hv": "[椙]",
    "on": "—",
    "kun": "すぎ",
    "m": "Japanese cedar, cryptomeria, (kokuji)"
  },
  "菅": {
    "hv": "GIAN",
    "on": "カン, ケン",
    "kun": "すげ",
    "m": "cỏ gian, cỏ may"
  },
  "雀": {
    "hv": "TƯỚC",
    "on": "ジャク, ジャン, サク, シャク",
    "kun": "すずめ",
    "m": "con chim sẻ"
  },
  "裾": {
    "hv": "CƯ",
    "on": "キョ, コ",
    "kun": "すそ",
    "m": "vạt áo, vạt áo"
  },
  "澄": {
    "hv": "TRỪNG",
    "on": "チョウ",
    "kun": "す・む, す・ます, -す・ます",
    "m": "trong (nước), lọc"
  },
  "寸": {
    "hv": "THỐN",
    "on": "スン",
    "kun": "—",
    "m": "tấc (đơn vị đo chiều dài)"
  },
  "瀬": {
    "hv": "LAI",
    "on": "ライ",
    "kun": "せ",
    "m": "rapids, current, torrent"
  },
  "畝": {
    "hv": "MẪU",
    "on": "ボウ, ホ, モ, ム",
    "kun": "せ, うね",
    "m": "mẫu (đơn vị đo, bằng 60 trượng vuông)"
  },
  "是": {
    "hv": "THỊ",
    "on": "ゼ, シ",
    "kun": "これ, この, ここ",
    "m": "là, đúng"
  },
  "凄": {
    "hv": "THÊ",
    "on": "セイ, サイ",
    "kun": "さむ・い, すご・い, すさ・まじい",
    "m": "lạnh, thê lương, thê thảm"
  },
  "制": {
    "hv": "CHẾ",
    "on": "セイ",
    "kun": "—",
    "m": "làm, chế tạo, chế độ, hạn chế, ngăn cấm"
  },
  "勢": {
    "hv": "THẾ",
    "on": "セイ, ゼイ",
    "kun": "いきお・い, はずみ",
    "m": "thế lực, tình hình, tình thế, hột dái"
  },
  "姓": {
    "hv": "TÍNH",
    "on": "セイ, ショウ",
    "kun": "—",
    "m": "họ"
  },
  "征": {
    "hv": "TRƯNG",
    "on": "セイ",
    "kun": "—",
    "m": "người trên đem binh đánh kẻ dưới, đi xa, trưng tập, gọi đến"
  },
  "性": {
    "hv": "TÍNH",
    "on": "セイ, ショウ",
    "kun": "さが",
    "m": "tính tình, tính cách, tính chất, giới tính, mạng sống"
  },
  "成": {
    "hv": "THÀNH",
    "on": "セイ, ジョウ",
    "kun": "な・る, な・す, -な・す",
    "m": "làm xong, hoàn thành"
  },
  "整": {
    "hv": "CHỈNH",
    "on": "セイ",
    "kun": "ととの・える, ととの・う",
    "m": "đều, ngay ngắn, còn nguyên vẹn, sửa sang, chỉnh đốn"
  },
  "星": {
    "hv": "TINH",
    "on": "セイ, ショウ",
    "kun": "ほし, -ぼし",
    "m": "ngôi sao, sao Tinh (một trong Nhị thập bát tú)"
  },
  "晴": {
    "hv": "TÌNH",
    "on": "セイ",
    "kun": "は・れる, は・れ, は・れ-, -ば・れ, は・らす",
    "m": "tạnh (trời không mưa)"
  },
  "清": {
    "hv": "THANH",
    "on": "セイ, ショウ, シン",
    "kun": "きよ・い, きよ・まる, きよ・める",
    "m": "trong sạch (nước), đời nhà Thanh, họ Thanh"
  },
  "牲": {
    "hv": "SINH",
    "on": "セイ",
    "kun": "—",
    "m": "súc vật dùng để cúng tế"
  },
  "盛": {
    "hv": "THỊNH",
    "on": "セイ, ジョウ",
    "kun": "も・る, さか・る, さか・ん",
    "m": "có nhiều, đầy đủ"
  },
  "精": {
    "hv": "TINH",
    "on": "セイ, ショウ",
    "kun": "しら・げる, くわ・しい",
    "m": "gạo đã giã, tinh tuý"
  },
  "聖": {
    "hv": "THÁNH",
    "on": "セイ, ショウ",
    "kun": "ひじり",
    "m": "thần thánh"
  },
  "声": {
    "hv": "THANH",
    "on": "セイ, ショウ",
    "kun": "こえ, こわ-",
    "m": "tiếng, âm thanh"
  },
  "製": {
    "hv": "CHẾ",
    "on": "セイ",
    "kun": "—",
    "m": "làm, chế tạo, chế độ, hạn chế, ngăn cấm"
  },
  "誠": {
    "hv": "THÀNH",
    "on": "セイ",
    "kun": "まこと",
    "m": "thật thà, thành thật"
  },
  "誓": {
    "hv": "THỆ",
    "on": "セイ",
    "kun": "ちか・う",
    "m": "thề, hứa"
  },
  "請": {
    "hv": "THỈNH",
    "on": "セイ, シン, ショウ",
    "kun": "こ・う, う・ける",
    "m": "mời mọc"
  },
  "逝": {
    "hv": "THỆ",
    "on": "セイ",
    "kun": "ゆ・く, い・く",
    "m": "trôi qua, đi không trở lại, chết, tạ thế"
  },
  "醒": {
    "hv": "TỈNH",
    "on": "セイ",
    "kun": "さ・ます, さ・める",
    "m": "tỉnh lại, thức, đánh thức"
  },
  "青": {
    "hv": "THANH",
    "on": "セイ, ショウ",
    "kun": "あお, あお-, あお・い",
    "m": "xanh, màu xanh"
  },
  "斉": {
    "hv": "TỀ",
    "on": "セイ, サイ",
    "kun": "そろ・う, ひと・しい, ひと・しく, あたる, はやい",
    "m": "đều, không so le, nước Tề, đất Tề"
  },
  "税": {
    "hv": "THUẾ",
    "on": "ゼイ",
    "kun": "—",
    "m": "tô thuế"
  },
  "隻": {
    "hv": "CHÍCH",
    "on": "セキ",
    "kun": "—",
    "m": "chiếc, cái, đơn chiếc, lẻ loi"
  },
  "席": {
    "hv": "TỊCH",
    "on": "セキ",
    "kun": "むしろ",
    "m": "cái chiếu, chỗ ngồi"
  },
  "惜": {
    "hv": "TÍCH",
    "on": "セキ",
    "kun": "お・しい, お・しむ",
    "m": "tiếc nuối"
  },
  "戚": {
    "hv": "THÍCH",
    "on": "ソク, セキ",
    "kun": "いた・む, うれ・える, みうち",
    "m": "thương, xót, thân thích"
  },
  "斥": {
    "hv": "XÍCH",
    "on": "セキ",
    "kun": "しりぞ・ける",
    "m": "bác bỏ, bài xích, ruồng đuổi"
  },
  "昔": {
    "hv": "TÍCH",
    "on": "セキ, シャク",
    "kun": "むかし",
    "m": "xưa, cũ, trước kia, đêm"
  },
  "析": {
    "hv": "TÍCH",
    "on": "セキ",
    "kun": "—",
    "m": "gỡ, tách, tẽ, chẻ"
  },
  "石": {
    "hv": "THẠCH",
    "on": "セキ, シャク, コク",
    "kun": "いし",
    "m": "đá, tạ (đơn vị đo, bằng 120 cân)"
  },
  "積": {
    "hv": "TÍCH",
    "on": "セキ",
    "kun": "つ・む, -づ・み, つ・もる, つ・もり",
    "m": "chứa chất, tích, dồn lại, tích (kết quả phép nhân)"
  },
  "籍": {
    "hv": "TỊCH",
    "on": "セキ",
    "kun": "—",
    "m": "ghi chép vào sổ, liệt kê"
  },
  "績": {
    "hv": "TÍCH",
    "on": "セキ",
    "kun": "—",
    "m": "đánh sợi, xe chỉ, tích luỹ"
  },
  "脊": {
    "hv": "TÍCH",
    "on": "セキ",
    "kun": "せ, せい",
    "m": "xương sống, cao và bằng"
  },
  "赤": {
    "hv": "XÍCH",
    "on": "セキ, シャク",
    "kun": "あか, あか-, あか・い, あか・らむ, あか・らめる",
    "m": "đỏ, màu đỏ, trần truồng"
  },
  "跡": {
    "hv": "TÍCH",
    "on": "セキ",
    "kun": "あと",
    "m": "dấu vết, dấu tích"
  },
  "碩": {
    "hv": "THẠC",
    "on": "セキ",
    "kun": "おお・きい",
    "m": "to lớn"
  },
  "切": {
    "hv": "THIẾT",
    "on": "セツ, サイ",
    "kun": "き・る, -き・る, き・り, -き・り, -ぎ・り, き・れる, -き・れる, き・れ, -き・れ, -ぎ・れ",
    "m": "cắt, chạm khắc, cần kíp"
  },
  "拙": {
    "hv": "CHUYẾT",
    "on": "セツ",
    "kun": "つたな・い",
    "m": "vụng về"
  },
  "接": {
    "hv": "TIẾP",
    "on": "セツ, ショウ",
    "kun": "つ・ぐ",
    "m": "tiếp tục, nối tiếp, tiếp theo"
  },
  "摂": {
    "hv": "NHIẾP",
    "on": "セツ, ショウ",
    "kun": "おさ・める, かね・る, と・る",
    "m": "vicarious, surrogate, act in addition to"
  },
  "折": {
    "hv": "CHIẾT",
    "on": "セツ, シャク",
    "kun": "お・る, おり, お・り, -お・り, お・れる",
    "m": "bẻ gãy, gấp lại, gập lại, lộn nhào"
  },
  "設": {
    "hv": "THIẾT",
    "on": "セツ",
    "kun": "もう・ける",
    "m": "sắp đặt, bày, đặt"
  },
  "窃": {
    "hv": "THIẾT",
    "on": "セツ",
    "kun": "ぬす・む, ひそ・か",
    "m": "ăn cắp, ăn trộm"
  },
  "節": {
    "hv": "TIẾT",
    "on": "セツ, セチ",
    "kun": "ふし, -ぶし, のっと",
    "m": "đốt, đoạn, tiết trời, một khoảng thời gian"
  },
  "説": {
    "hv": "THUYẾT",
    "on": "セツ, ゼイ",
    "kun": "と・く",
    "m": "nói, giảng"
  },
  "絶": {
    "hv": "TUYỆT",
    "on": "ゼツ",
    "kun": "た・える, た・やす, た・つ",
    "m": "discontinue, sever, cut off"
  },
  "舌": {
    "hv": "THIỆT",
    "on": "ゼツ",
    "kun": "した",
    "m": "cái lưỡi"
  },
  "仙": {
    "hv": "TIÊN",
    "on": "セン, セント",
    "kun": "—",
    "m": "tiên, người đã tu luyện, đồng xu"
  },
  "占": {
    "hv": "CHIÊM",
    "on": "セン",
    "kun": "し・める, うらな・う",
    "m": "xem điềm để biết tốt xấu, chiếm đoạt của người khác"
  },
  "宣": {
    "hv": "TUYÊN",
    "on": "セン",
    "kun": "のたま・う",
    "m": "bộc lộ, bày tỏ, tuyên bố, nói ra"
  },
  "専": {
    "hv": "CHUYÊN",
    "on": "セン",
    "kun": "もっぱ・ら",
    "m": "chú ý hết cả vào một việc, chỉ có một, duy nhất"
  },
  "尖": {
    "hv": "TIÊM",
    "on": "セン",
    "kun": "とが・る, さき, するど・い",
    "m": "nhọn"
  },
  "戦": {
    "hv": "CHIẾN",
    "on": "セン",
    "kun": "いくさ, たたか・う, おのの・く, そよ・ぐ, わなな・く",
    "m": "war, battle, match"
  },
  "扇": {
    "hv": "PHIẾN",
    "on": "セン",
    "kun": "おうぎ",
    "m": "cánh cửa, cái quạt"
  },
  "栓": {
    "hv": "XUYÊN",
    "on": "セン",
    "kun": "—",
    "m": "cái then cài cửa"
  },
  "泉": {
    "hv": "TUYỀN",
    "on": "セン",
    "kun": "いずみ",
    "m": "dòng suối"
  },
  "浅": {
    "hv": "THIỂN",
    "on": "セン",
    "kun": "あさ・い",
    "m": "cạn, nông"
  },
  "洗": {
    "hv": "TẨY",
    "on": "セン",
    "kun": "あら・う",
    "m": "rửa"
  },
  "染": {
    "hv": "NHIỄM",
    "on": "セン",
    "kun": "そ・める, そ・まる, し・みる, し・み",
    "m": "nhiễm, mắc, lây, nhuộm"
  },
  "潜": {
    "hv": "TIỀM",
    "on": "セン",
    "kun": "ひそ・む, もぐ・る, かく・れる, くぐ・る, ひそ・める",
    "m": "giấu kín, ở ẩn, ngầm, không cho người khác biết"
  },
  "煎": {
    "hv": "TIÊN",
    "on": "セン",
    "kun": "せん・じる, い・る, に・る",
    "m": "nấu, sắc, cất, ngâm, nấu, sắc, cất"
  },
  "旋": {
    "hv": "TOÀN",
    "on": "セン",
    "kun": "め・ぐる, いばり",
    "m": "trở lại, quay lại, quay, xoay, xoáy, đi tiểu, tiểu tiện"
  },
  "線": {
    "hv": "TUYẾN",
    "on": "セン",
    "kun": "すじ",
    "m": "đường, tia"
  },
  "繊": {
    "hv": "TIÊM",
    "on": "セン",
    "kun": "—",
    "m": "nhỏ nhặt"
  },
  "羨": {
    "hv": "TIỆN",
    "on": "セン, エン",
    "kun": "うらや・む, あまり",
    "m": "ham muốn, thích"
  },
  "腺": {
    "hv": "TUYẾN",
    "on": "セン",
    "kun": "—",
    "m": "tuyến dịch trong cơ thể"
  },
  "舛": {
    "hv": "SUYỄN",
    "on": "ブ, セン",
    "kun": "まい, そむ・く",
    "m": "ngang trái, lẫn lộn"
  },
  "船": {
    "hv": "THUYỀN",
    "on": "セン",
    "kun": "ふね, ふな-",
    "m": "cái thuyền"
  },
  "薦": {
    "hv": "TIẾN",
    "on": "セン",
    "kun": "すす・める",
    "m": "hai lần, tiến cử, cỏ cho súc vật"
  },
  "詮": {
    "hv": "THUYÊN",
    "on": "セン",
    "kun": "せん・ずる, かい, あき・らか",
    "m": "giải thích kỹ càng"
  },
  "践": {
    "hv": "TIỄN",
    "on": "セン",
    "kun": "ふ・む",
    "m": "giẫm lên, thực hiện, thi hành"
  },
  "選": {
    "hv": "TUYỂN",
    "on": "セン",
    "kun": "えら・ぶ, え・る, よ・る",
    "m": "chọn lựa"
  },
  "遷": {
    "hv": "THIÊN",
    "on": "セン",
    "kun": "うつ・る, うつ・す, みやこがえ",
    "m": "thay đổi, di dời"
  },
  "銭": {
    "hv": "TIỀN",
    "on": "セン, ゼン",
    "kun": "ぜに, すき",
    "m": "coin, .01 yen, money"
  },
  "銑": {
    "hv": "TIỂN",
    "on": "セン",
    "kun": "—",
    "m": "gang (hợp kim của sắt và carbon)"
  },
  "鮮": {
    "hv": "TIÊN",
    "on": "セン",
    "kun": "あざ・やか",
    "m": "cá tươi, sáng sủa, ngon lành"
  },
  "善": {
    "hv": "THIỆN",
    "on": "ゼン",
    "kun": "よ・い, い・い, よ・く, よし・とする",
    "m": "người tài giỏi, thiện, lành"
  },
  "漸": {
    "hv": "TIỀM",
    "on": "ゼン",
    "kun": "ようや・く, やや, ようよ・う, すす・む",
    "m": "nhúng vào nước, thấm, tẩm, dần dần"
  },
  "全": {
    "hv": "TOÀN",
    "on": "ゼン",
    "kun": "まった・く, すべ・て",
    "m": "tất cả, toàn bộ"
  },
  "禅": {
    "hv": "THIỀN",
    "on": "ゼン, セン",
    "kun": "しずか, ゆず・る",
    "m": "lặng nghĩ suy xét, thiền, quét đất để tế"
  },
  "繕": {
    "hv": "THIỆN",
    "on": "ゼン",
    "kun": "つくろ・う",
    "m": "sửa chữa"
  },
  "膳": {
    "hv": "THIỆN",
    "on": "ゼン, セン",
    "kun": "かしわ, すす・める, そな・える",
    "m": "cỗ ăn"
  },
  "塑": {
    "hv": "TỐ",
    "on": "ソ",
    "kun": "でく",
    "m": "đắp tượng, nặn tượng"
  },
  "措": {
    "hv": "THỐ",
    "on": "ソ",
    "kun": "お・く",
    "m": "thi thố ra, bãi bỏ, bắt tay vào làm, lo liệu"
  },
  "曽": {
    "hv": "TẰNG",
    "on": "ソウ, ソ, ゾウ",
    "kun": "かつ, かつて, すなわち",
    "m": "formerly, once, before"
  },
  "狙": {
    "hv": "THƯ",
    "on": "ソ, ショ",
    "kun": "ねら・う, ねら・い",
    "m": "một giống vượn rất xảo quyệt"
  },
  "疎": {
    "hv": "SƠ",
    "on": "ソ, ショ",
    "kun": "うと・い, うと・む, まば・ら",
    "m": "thông suốt, không thân thiết, họ xa, sơ xuất, xao nhãng"
  },
  "礎": {
    "hv": "SỞ",
    "on": "ソ",
    "kun": "いしずえ",
    "m": "đá tảng"
  },
  "祖": {
    "hv": "TỔ",
    "on": "ソ",
    "kun": "—",
    "m": "ông, tổ sư"
  },
  "租": {
    "hv": "TÔ",
    "on": "ソ",
    "kun": "—",
    "m": "tô thuế, cho thuê"
  },
  "粗": {
    "hv": "THÔ",
    "on": "ソ",
    "kun": "あら・い, あら-",
    "m": "to, thô, sơ sài"
  },
  "素": {
    "hv": "TỐ",
    "on": "ソ, ス",
    "kun": "もと",
    "m": "tơ trắng, trắng nõn, chất"
  },
  "組": {
    "hv": "TỔ",
    "on": "ソ",
    "kun": "く・む, くみ, -ぐみ",
    "m": "dây tơ mỏng và to bản, liên lạc"
  },
  "蘇": {
    "hv": "TÔ",
    "on": "ソ, ス",
    "kun": "よみがえ・る",
    "m": "(xem: tử tô 紫蘇), sống lại, tái thế, kiếm cỏ"
  },
  "訴": {
    "hv": "TỐ",
    "on": "ソ",
    "kun": "うった・える",
    "m": "kể, thuật, tố giác, mách"
  },
  "阻": {
    "hv": "TRỞ",
    "on": "ソ",
    "kun": "はば・む",
    "m": "cản trở, hiểm trở"
  },
  "遡": {
    "hv": "TỐ",
    "on": "ソ, サク",
    "kun": "さかのぼ・る",
    "m": "ngoi lên, bơi ngược dòng"
  },
  "僧": {
    "hv": "TĂNG",
    "on": "ソウ",
    "kun": "—",
    "m": "nam sư"
  },
  "創": {
    "hv": "SANG",
    "on": "ソウ, ショウ",
    "kun": "つく・る, はじ・める, きず, けず・しける",
    "m": "đau, bị thương, mới"
  },
  "双": {
    "hv": "SONG",
    "on": "ソウ",
    "kun": "ふた, たぐい, ならぶ, ふたつ",
    "m": "đôi, cặp"
  },
  "叢": {
    "hv": "TÙNG",
    "on": "ソウ, ス",
    "kun": "くさむら, むら・がる, むら",
    "m": "hợp, nhiều, rậm rạp"
  },
  "倉": {
    "hv": "THƯƠNG",
    "on": "ソウ",
    "kun": "くら",
    "m": "kho, vựa, (xem: thảng thốt 倉猝), kho, vựa"
  },
  "喪": {
    "hv": "TÁNG",
    "on": "ソウ",
    "kun": "も",
    "m": "việc tang, tang lễ, đánh mất, rơi mất, làm mất, lễ tang"
  },
  "壮": {
    "hv": "TRÁNG",
    "on": "ソウ",
    "kun": "さかん",
    "m": "mạnh mẽ, người đến 30 tuổi"
  },
  "奏": {
    "hv": "TẤU",
    "on": "ソウ",
    "kun": "かな・でる",
    "m": "tâu lên, tấu nhạc"
  },
  "爽": {
    "hv": "SẢNG",
    "on": "ソウ",
    "kun": "あき・らか, さわ・やか, たがう",
    "m": "sáng suốt, sảng khoái, chỗ cao ráo sáng sủa"
  },
  "宋": {
    "hv": "TỐNG",
    "on": "ソウ",
    "kun": "—",
    "m": "đời nhà Tống, họ Tống"
  },
  "層": {
    "hv": "TẰNG",
    "on": "ソウ",
    "kun": "—",
    "m": "tầng, lớp"
  },
  "惣": {
    "hv": "TỔNG",
    "on": "ソウ",
    "kun": "すべ・て",
    "m": "all"
  },
  "想": {
    "hv": "TƯỞNG",
    "on": "ソウ, ソ",
    "kun": "おも・う",
    "m": "nhớ, nghĩ tới"
  },
  "捜": {
    "hv": "SẢO",
    "on": "ソウ, シュ, シュウ",
    "kun": "さが・す",
    "m": "search, look for, locate"
  },
  "掃": {
    "hv": "TẢO",
    "on": "ソウ, シュ",
    "kun": "は・く",
    "m": "quét, cái chổi"
  },
  "挿": {
    "hv": "SÁP",
    "on": "ソウ",
    "kun": "さ・す, はさ・む",
    "m": "insert, put in, graft"
  },
  "操": {
    "hv": "THAO",
    "on": "ソウ, サン",
    "kun": "みさお, あやつ・る",
    "m": "cầm, nắm, giữ gìn, nói"
  },
  "曹": {
    "hv": "TÀO",
    "on": "ソウ, ゾウ",
    "kun": "—",
    "m": "hai bên nguyên bị (trong vụ kiện), nước Tào"
  },
  "巣": {
    "hv": "SÀO",
    "on": "ソウ",
    "kun": "す, す・くう",
    "m": "tổ chim, ổ"
  },
  "槍": {
    "hv": "SANG",
    "on": "ソウ, ショウ",
    "kun": "やり",
    "m": "cái thương (binh khí), khẩu súng, cái thương (binh khí)"
  },
  "槽": {
    "hv": "TÀO",
    "on": "ソウ",
    "kun": "ふね",
    "m": "cái máng cho muông thú ăn, cái gác dây đàn tỳ bà, cao hai bên, trũng ở giữa"
  },
  "漕": {
    "hv": "TÀO",
    "on": "ソウ",
    "kun": "こ・ぐ, はこ・ぶ",
    "m": "vận tải đường thuỷ"
  },
  "燥": {
    "hv": "TÁO",
    "on": "ソウ",
    "kun": "はしゃ・ぐ",
    "m": "khô ráo, hanh"
  },
  "争": {
    "hv": "TRANH",
    "on": "ソウ",
    "kun": "あらそ・う, いか・でか",
    "m": "tranh giành, bàn luận, sai khác, khác biệt"
  },
  "痩": {
    "hv": "SẤU",
    "on": "ソウ, チュウ, シュウ, シュ",
    "kun": "や・せる",
    "m": "get thin"
  },
  "相": {
    "hv": "TƯƠNG",
    "on": "ソウ, ショウ",
    "kun": "あい-",
    "m": "qua lại lẫn nhau, tự mình xem xét, vẻ mặt, tướng mạo"
  },
  "窓": {
    "hv": "SONG",
    "on": "ソウ, ス",
    "kun": "まど, てんまど, けむだし",
    "m": "cửa sổ"
  },
  "総": {
    "hv": "TỔNG",
    "on": "ソウ",
    "kun": "す・べて, すべ・て, ふさ",
    "m": "tổng quát, thâu tóm, chung, toàn bộ, buộc túm lại"
  },
  "綜": {
    "hv": "TỐNG",
    "on": "ソウ",
    "kun": "おさ・める, す・べる",
    "m": "dệt lẫn lộn với nhau, hợp cả lại"
  },
  "聡": {
    "hv": "THÔNG",
    "on": "ソウ",
    "kun": "さと・い, みみざと・い",
    "m": "thính (tai), sáng suốt"
  },
  "草": {
    "hv": "THẢO",
    "on": "ソウ",
    "kun": "くさ, くさ-, -ぐさ",
    "m": "cỏ, thảo mộc"
  },
  "荘": {
    "hv": "TRANG",
    "on": "ソウ, ショウ, チャン",
    "kun": "ほうき, おごそ・か",
    "m": "trang trại, gia trang, họ Trang"
  },
  "葬": {
    "hv": "TÁNG",
    "on": "ソウ",
    "kun": "ほうむ・る",
    "m": "chôn, vùi, mai táng"
  },
  "蒼": {
    "hv": "THƯƠNG",
    "on": "ソウ",
    "kun": "あお・い",
    "m": "xanh, nhợt nhạt"
  },
  "藻": {
    "hv": "TẢO",
    "on": "ソウ",
    "kun": "も",
    "m": "rong, rêu"
  },
  "装": {
    "hv": "TRANG",
    "on": "ソウ, ショウ",
    "kun": "よそお・う, よそお・い",
    "m": "quần áo, trang phục, giả làm, đóng giả, giả bộ, trang điểm, trang sức, hoá trang"
  },
  "送": {
    "hv": "TỐNG",
    "on": "ソウ",
    "kun": "おく・る",
    "m": "đưa, cho, biếu, đưa tiễn"
  },
  "遭": {
    "hv": "TAO",
    "on": "ソウ",
    "kun": "あ・う, あ・わせる",
    "m": "không hẹn mà gặp, vòng, lượt"
  },
  "霜": {
    "hv": "SƯƠNG",
    "on": "ソウ",
    "kun": "しも",
    "m": "sương"
  },
  "騒": {
    "hv": "TAO",
    "on": "ソウ",
    "kun": "さわ・ぐ, うれい, さわ・がしい",
    "m": "boisterous, make noise, clamor"
  },
  "像": {
    "hv": "TƯƠNG",
    "on": "ゾウ",
    "kun": "—",
    "m": "hình dáng, giống như, hình dáng"
  },
  "増": {
    "hv": "TĂNG",
    "on": "ゾウ",
    "kun": "ま・す, ま・し, ふ・える, ふ・やす",
    "m": "tăng thêm lên"
  },
  "憎": {
    "hv": "TĂNG",
    "on": "ゾウ",
    "kun": "にく・む, にく・い, にく・らしい, にく・しみ",
    "m": "ghét, không thích"
  },
  "臓": {
    "hv": "TẠNG",
    "on": "ゾウ",
    "kun": "はらわた",
    "m": "entrails, viscera, bowels"
  },
  "蔵": {
    "hv": "TÀNG",
    "on": "ゾウ, ソウ",
    "kun": "くら, おさ・める, かく・れる",
    "m": "storehouse, hide, own"
  },
  "贈": {
    "hv": "TẶNG",
    "on": "ゾウ, ソウ",
    "kun": "おく・る",
    "m": "tặng, biếu"
  },
  "造": {
    "hv": "TẠO",
    "on": "ゾウ",
    "kun": "つく・る, つく・り, -づく・り",
    "m": "làm, chế tạo, bịa đặt"
  },
  "促": {
    "hv": "XÚC",
    "on": "ソク",
    "kun": "うなが・す",
    "m": "vội vã, gấp"
  },
  "側": {
    "hv": "TRẮC",
    "on": "ソク",
    "kun": "かわ, がわ, そば",
    "m": "một bên"
  },
  "則": {
    "hv": "TẮC",
    "on": "ソク",
    "kun": "のっと・る, のり, すなわち",
    "m": "quy tắc, bắt chước"
  },
  "即": {
    "hv": "TỨC",
    "on": "ソク",
    "kun": "つ・く, つ・ける, すなわ・ち",
    "m": "tới gần, ngay, tức thì, chính là"
  },
  "息": {
    "hv": "TỨC",
    "on": "ソク",
    "kun": "いき",
    "m": "hơi thở, than vãn"
  },
  "捉": {
    "hv": "TRÓC",
    "on": "ソク, サク",
    "kun": "とら・える",
    "m": "bắt giữ"
  },
  "束": {
    "hv": "THÚC",
    "on": "ソク",
    "kun": "たば, たば・ねる, つか, つか・ねる",
    "m": "bó, buộc"
  },
  "測": {
    "hv": "TRẮC",
    "on": "ソク",
    "kun": "はか・る",
    "m": "lường trước"
  },
  "足": {
    "hv": "TÚC",
    "on": "ソク",
    "kun": "あし, た・りる, た・る, た・す",
    "m": "chân thú, đầy đủ"
  },
  "俗": {
    "hv": "TỤC",
    "on": "ゾク",
    "kun": "—",
    "m": "thói quen, người phàm tục"
  },
  "属": {
    "hv": "THUỘC",
    "on": "ゾク, ショク",
    "kun": "さかん, つく, やから",
    "m": "liền, nối, loại, loài, thuộc về"
  },
  "賊": {
    "hv": "TẶC",
    "on": "ゾク",
    "kun": "—",
    "m": "giặc, kẻ trộm"
  },
  "族": {
    "hv": "TỘC",
    "on": "ゾク",
    "kun": "—",
    "m": "loài, dòng dõi, họ"
  },
  "続": {
    "hv": "TỤC",
    "on": "ゾク, ショク, コウ, キョウ",
    "kun": "つづ・く, つづ・ける, つぐ・ない",
    "m": "Hán văn Nhật Bản dùng như chữ 續"
  },
  "卒": {
    "hv": "TỐT",
    "on": "ソツ, シュツ",
    "kun": "そっ・する, お・える, お・わる, ついに, にわか",
    "m": "cuối cùng"
  },
  "袖": {
    "hv": "TỤ",
    "on": "シュウ",
    "kun": "そで",
    "m": "tay áo"
  },
  "其": {
    "hv": "KỲ",
    "on": "キ, ギ, ゴ",
    "kun": "それ, その",
    "m": "ấy, đó (đại từ thay thế)"
  },
  "揃": {
    "hv": "TIÊN",
    "on": "セン",
    "kun": "そろ・える, そろ・う, そろ・い, き・る",
    "m": "ghi chép"
  },
  "存": {
    "hv": "TỒN",
    "on": "ソン, ゾン",
    "kun": "ながら・える, あ・る, たも・つ, と・う",
    "m": "còn, xét tới, đang, còn"
  },
  "孫": {
    "hv": "TÔN",
    "on": "ソン",
    "kun": "まご",
    "m": "cháu gọi bằng ông, nhún nhường"
  },
  "尊": {
    "hv": "TÔN",
    "on": "ソン",
    "kun": "たっと・い, とうと・い, たっと・ぶ, とうと・ぶ",
    "m": "tôn trọng, kính, cái chén (như chữ 樽)"
  },
  "損": {
    "hv": "TỔN",
    "on": "ソン",
    "kun": "そこ・なう, そこな・う, -そこ・なう, そこ・ねる, -そこ・ねる",
    "m": "tốn, mất"
  },
  "村": {
    "hv": "THÔN",
    "on": "ソン",
    "kun": "むら",
    "m": "thôn xóm, nhà quê"
  },
  "遜": {
    "hv": "TỐN",
    "on": "ソン",
    "kun": "したが・う, へりくだ・る, ゆず・る",
    "m": "trốn lẩn, lánh đi, kém"
  },
  "他": {
    "hv": "THA",
    "on": "タ",
    "kun": "ほか",
    "m": "nó, khác"
  },
  "太": {
    "hv": "THÁI",
    "on": "タイ, タ",
    "kun": "ふと・い, ふと・る",
    "m": "cao, to, rất"
  },
  "汰": {
    "hv": "THÁI",
    "on": "タ, タイ",
    "kun": "おご・る, にご・る, よな・げる",
    "m": "quá mức, thải đi, bỏ đi, quá mức"
  },
  "唾": {
    "hv": "THOÁ",
    "on": "ダ, タ",
    "kun": "つば, つばき",
    "m": "nước bọt, phỉ nhổ"
  },
  "堕": {
    "hv": "ĐOẠ",
    "on": "ダ",
    "kun": "お・ちる, くず・す, くず・れる",
    "m": "rơi xuống, đổ, đổ nát"
  },
  "妥": {
    "hv": "THOẢ",
    "on": "ダ",
    "kun": "—",
    "m": "thoả đáng, ổn, yên"
  },
  "惰": {
    "hv": "NOẠ",
    "on": "ダ",
    "kun": "—",
    "m": "ngây ngô, dốt"
  },
  "打": {
    "hv": "TÁ",
    "on": "ダ, ダース",
    "kun": "う・つ, う・ち-, ぶ・つ",
    "m": "tá, 12, đánh, đập"
  },
  "舵": {
    "hv": "ĐÀ",
    "on": "ダ, タ",
    "kun": "かじ",
    "m": "bánh lái thuyền"
  },
  "楕": {
    "hv": "THOẢ",
    "on": "ダ, タ",
    "kun": "—",
    "m": "ellipse"
  },
  "駄": {
    "hv": "ĐÀ",
    "on": "ダ, タ",
    "kun": "—",
    "m": "burdensome, pack horse, horse load"
  },
  "体": {
    "hv": "THỂ",
    "on": "タイ, テイ",
    "kun": "からだ, かたち",
    "m": "thân, mình, hình thể, dạng"
  },
  "堆": {
    "hv": "ĐÔI",
    "on": "タイ, ツイ",
    "kun": "うずたか・い",
    "m": "đắp, đống, đắp, đống"
  },
  "対": {
    "hv": "ĐỐI",
    "on": "タイ, ツイ",
    "kun": "あいて, こた・える, そろ・い, つれあ・い, なら・ぶ, むか・う",
    "m": "vis-a-vis, opposite, even"
  },
  "耐": {
    "hv": "NẠI",
    "on": "タイ",
    "kun": "た・える",
    "m": "chịu đựng, nhịn, ria mép"
  },
  "帯": {
    "hv": "ĐÁI",
    "on": "タイ",
    "kun": "お・びる, おび",
    "m": "đều, đai, dây, dải, thắt lưng, mang, đeo"
  },
  "怠": {
    "hv": "ĐÃI",
    "on": "タイ",
    "kun": "おこた・る, なま・ける",
    "m": "lười biếng"
  },
  "態": {
    "hv": "THÁI",
    "on": "タイ",
    "kun": "わざ・と",
    "m": "vẻ, thái độ, hình dạng, trạng thái"
  },
  "戴": {
    "hv": "ĐÁI",
    "on": "タイ",
    "kun": "いただ・く",
    "m": "đội (mũ), đội (mũ)"
  },
  "替": {
    "hv": "THẾ",
    "on": "タイ",
    "kun": "か・える, か・え-, か・わる",
    "m": "thay thế"
  },
  "泰": {
    "hv": "THÁI",
    "on": "タイ",
    "kun": "—",
    "m": "bình yên, thản nhiên, rất, một quẻ trong Kinh Dịch tượng trưng cho vận tốt"
  },
  "滞": {
    "hv": "TRỆ",
    "on": "タイ, テイ",
    "kun": "とどこお・る",
    "m": "chậm, trễ"
  },
  "胎": {
    "hv": "THAI",
    "on": "タイ",
    "kun": "—",
    "m": "cái thai, bào thai, có thai, có mang, có chửa"
  },
  "袋": {
    "hv": "ĐẠI",
    "on": "タイ, ダイ",
    "kun": "ふくろ",
    "m": "cái đẫy, túi, bao, bị"
  },
  "貸": {
    "hv": "THẢI",
    "on": "タイ",
    "kun": "か・す, か・し-, かし-",
    "m": "vay mượn, cho vay"
  },
  "退": {
    "hv": "THOÁI",
    "on": "タイ",
    "kun": "しりぞ・く, しりぞ・ける, ひ・く, の・く, の・ける, ど・く",
    "m": "lui, lùi lại, lui, lùi lại"
  },
  "逮": {
    "hv": "ĐÃI",
    "on": "タイ",
    "kun": "—",
    "m": "theo kịp, đuổi"
  },
  "隊": {
    "hv": "ĐỘI",
    "on": "タイ",
    "kun": "—",
    "m": "đội quân, dàn thành hàng"
  },
  "黛": {
    "hv": "ĐẠI",
    "on": "タイ",
    "kun": "まゆずみ",
    "m": "thuốc vẽ lông mày (trang điểm)"
  },
  "鯛": {
    "hv": "ĐIÊU",
    "on": "チョウ",
    "kun": "たい",
    "m": "con cá điêu"
  },
  "代": {
    "hv": "ĐẠI",
    "on": "ダイ, タイ",
    "kun": "か・わる, かわ・る, かわ・り, か・わり, -がわ・り, -が・わり, か・える, よ, しろ",
    "m": "triều đại, thay thế cho, đại diện"
  },
  "台": {
    "hv": "THAI",
    "on": "ダイ, タイ",
    "kun": "うてな, われ, つかさ",
    "m": "sao Thai, cái đài, lầu, cái đài, lầu"
  },
  "第": {
    "hv": "ĐỆ",
    "on": "ダイ, テイ",
    "kun": "—",
    "m": "thứ bậc, nhà của vương công hoặc đại thần, khoa thi"
  },
  "醍": {
    "hv": "THỂ",
    "on": "ダイ, タイ, テイ",
    "kun": "—",
    "m": "rượu đỏ, (xem: đề hồ 醍醐)"
  },
  "鷹": {
    "hv": "ƯNG",
    "on": "ヨウ, オウ",
    "kun": "たか",
    "m": "chim cú mèo"
  },
  "滝": {
    "hv": "LONG",
    "on": "ロウ, ソウ",
    "kun": "たき",
    "m": "Như chữ 瀧."
  },
  "卓": {
    "hv": "TRÁC",
    "on": "タク",
    "kun": "—",
    "m": "cao chót"
  },
  "啄": {
    "hv": "TRÁC",
    "on": "タク, ツク, トク",
    "kun": "ついば・む, つつ・く",
    "m": "mổ (chim)"
  },
  "宅": {
    "hv": "TRẠCH",
    "on": "タク",
    "kun": "—",
    "m": "nhà ở"
  },
  "択": {
    "hv": "TRẠCH",
    "on": "タク",
    "kun": "えら・ぶ",
    "m": "chọn lựa"
  },
  "拓": {
    "hv": "THÁC",
    "on": "タク",
    "kun": "ひら・く",
    "m": "nâng, nhấc, bày ra, cái khay để bưng đồ"
  },
  "沢": {
    "hv": "DỊCH",
    "on": "タク",
    "kun": "さわ, うるお・い, うるお・す, つや",
    "m": "swamp, marsh, brilliance"
  },
  "濯": {
    "hv": "TRẠC",
    "on": "タク",
    "kun": "すす・ぐ, ゆす・ぐ",
    "m": "giặt giũ, rửa"
  },
  "琢": {
    "hv": "TRÁC",
    "on": "タク",
    "kun": "みが・く",
    "m": "mài giũa"
  },
  "託": {
    "hv": "THÁC",
    "on": "タク",
    "kun": "かこつ・ける, かこ・つ, かこ・つける",
    "m": "nhờ cậy, phó thác"
  },
  "濁": {
    "hv": "TRỌC",
    "on": "ダク, ジョク",
    "kun": "にご・る, にご・す",
    "m": "đục (nước)"
  },
  "諾": {
    "hv": "NẶC",
    "on": "ダク",
    "kun": "—",
    "m": "vâng, bằng lòng"
  },
  "凧": {
    "hv": "[凧]",
    "on": "—",
    "kun": "いかのぼり, たこ",
    "m": "kite, (kokuji)"
  },
  "只": {
    "hv": "CHÍCH",
    "on": "シ",
    "kun": "ただ",
    "m": "chiếc, cái, đơn chiếc, lẻ loi, chỉ, mỗi một"
  },
  "叩": {
    "hv": "KHẤU",
    "on": "コウ",
    "kun": "たた・く, はた・く, すぎ",
    "m": "gõ (cửa), lạy, rập đầu"
  },
  "但": {
    "hv": "ĐÁN",
    "on": "タン",
    "kun": "ただ・し",
    "m": "chỉ, song, những, nhưng mà, hễ, nếu như"
  },
  "達": {
    "hv": "ĐẠT",
    "on": "タツ, ダ",
    "kun": "-たち",
    "m": "qua, thông"
  },
  "辰": {
    "hv": "THÌN",
    "on": "シン, ジン",
    "kun": "たつ",
    "m": "Thìn (ngôi thứ 5 của hàng Chi), Thìn (ngôi thứ 5 của hàng Chi)"
  },
  "奪": {
    "hv": "ĐOẠT",
    "on": "ダツ",
    "kun": "うば・う",
    "m": "cướp lấy, quyết định, đường hẹp"
  },
  "脱": {
    "hv": "THOÁT",
    "on": "ダツ",
    "kun": "ぬ・ぐ, ぬ・げる",
    "m": "róc, lóc, bóc, sơ lược, rơi mất"
  },
  "巽": {
    "hv": "TỐN",
    "on": "ソン",
    "kun": "たつみ",
    "m": "quẻ Tốn (hạ đoạn) trong Kinh Dịch (chỉ có vạch dưới đứt, tượng Phong (gió), tượng trưng cho con gái trưởng, hành Mộc, tuổi Thìn và Tỵ, hướng Đông Nam)"
  },
  "竪": {
    "hv": "THỤ",
    "on": "ジュ",
    "kun": "たて, た・てる, こども",
    "m": "dựng đứng, chiều dọc, nét dọc"
  },
  "棚": {
    "hv": "BẰNG",
    "on": "ホウ",
    "kun": "たな, -だな",
    "m": "gác, nhà rạp, đơn vị quân gồm 14 lính"
  },
  "谷": {
    "hv": "CỐC",
    "on": "コク",
    "kun": "たに, きわ・まる",
    "m": "hang núi, khe núi, cây lương thực, thóc lúa, kê"
  },
  "狸": {
    "hv": "LY",
    "on": "リ, ライ",
    "kun": "たぬき",
    "m": "con cáo, con chồn, mùi hôi thối"
  },
  "樽": {
    "hv": "TÔN",
    "on": "ソン",
    "kun": "たる",
    "m": "cái chén"
  },
  "丹": {
    "hv": "ĐAN",
    "on": "タン",
    "kun": "に",
    "m": "đỏ, thuốc viên, đỏ"
  },
  "単": {
    "hv": "ĐAN",
    "on": "タン",
    "kun": "ひとえ",
    "m": "simple, one, single"
  },
  "嘆": {
    "hv": "THÁN",
    "on": "タン",
    "kun": "なげ・く, なげ・かわしい",
    "m": "kêu, than thở, tấm tắc khen, ngân dài giọng"
  },
  "担": {
    "hv": "ĐAM",
    "on": "タン",
    "kun": "かつ・ぐ, にな・う",
    "m": "khiêng, mang, vác, đồ để mang vác, khiêng, mang, vác"
  },
  "探": {
    "hv": "THÁM",
    "on": "タン",
    "kun": "さぐ・る, さが・す",
    "m": "thăm"
  },
  "旦": {
    "hv": "ĐÁN",
    "on": "タン, ダン",
    "kun": "あき・らか, あきら, ただし, あさ, あした",
    "m": "buổi sớm"
  },
  "淡": {
    "hv": "ĐẠM",
    "on": "タン",
    "kun": "あわ・い",
    "m": "nhạt (màu), hơi hơi"
  },
  "湛": {
    "hv": "TRẠM",
    "on": "タン, チン, ジン, セン",
    "kun": "しず・む, たた・える",
    "m": "sâu, trong, sạch"
  },
  "炭": {
    "hv": "THÁN",
    "on": "タン",
    "kun": "すみ",
    "m": "than củi"
  },
  "端": {
    "hv": "ĐOAN",
    "on": "タン",
    "kun": "はし, は, はた, -ばた, はな",
    "m": "đầu, mối"
  },
  "綻": {
    "hv": "TRÁN",
    "on": "タン",
    "kun": "ほころ・びる",
    "m": "đường khâu áo"
  },
  "胆": {
    "hv": "ĐẢM",
    "on": "タン",
    "kun": "きも",
    "m": "quả mật"
  },
  "蛋": {
    "hv": "ĐẢN",
    "on": "タン",
    "kun": "—",
    "m": "quả trứng, một tộc Mán ở phương Nam (Trung Quốc)"
  },
  "誕": {
    "hv": "ĐẢN",
    "on": "タン",
    "kun": "—",
    "m": "nói toáng lên, nói xằng bậy, ngông nghênh"
  },
  "鍛": {
    "hv": "ĐOÀN",
    "on": "タン",
    "kun": "きた・える",
    "m": "rèn (kim loại), rèn (kim loại)"
  },
  "団": {
    "hv": "ĐOÀN",
    "on": "ダン, トン",
    "kun": "かたまり, まる・い",
    "m": "group, association"
  },
  "壇": {
    "hv": "ĐÀN",
    "on": "ダン, タン",
    "kun": "—",
    "m": "đàn cúng tế"
  },
  "弾": {
    "hv": "ĐÀN",
    "on": "ダン, タン",
    "kun": "ひ・く, -ひ・き, はず・む, たま, はじ・く, はじ・ける, ただ・す, はじ・きゆみ",
    "m": "đàn hồi, bật, búng, gảy, đánh đàn"
  },
  "断": {
    "hv": "ĐOÁN",
    "on": "ダン",
    "kun": "た・つ, ことわ・る, さだ・める",
    "m": "phán đoán, quyết đoán, đứt"
  },
  "暖": {
    "hv": "NOÃN",
    "on": "ダン, ノン",
    "kun": "あたた・か, あたた・かい, あたた・まる, あたた・める",
    "m": "ấm áp"
  },
  "檀": {
    "hv": "ĐÀN",
    "on": "ダン, タン",
    "kun": "まゆみ",
    "m": "cây đàn"
  },
  "段": {
    "hv": "ĐOÀN",
    "on": "ダン, タン",
    "kun": "—",
    "m": "đoạn, khúc, quãng, khoảng, họ Đoàn (âm Đoàn)"
  },
  "談": {
    "hv": "ĐÀM",
    "on": "ダン",
    "kun": "—",
    "m": "bàn bạc"
  },
  "値": {
    "hv": "TRỊ",
    "on": "チ",
    "kun": "ね, あたい",
    "m": "trị giá, đáng giá"
  },
  "弛": {
    "hv": "THỈ",
    "on": "チ, シ",
    "kun": "たる・む, たる・める, たゆ・む, ゆる・む, ゆる・み",
    "m": "buông dây cung"
  },
  "恥": {
    "hv": "SỈ",
    "on": "チ",
    "kun": "は・じる, はじ, は・じらう, は・ずかしい",
    "m": "xấu hổ, thẹn"
  },
  "智": {
    "hv": "TRÍ",
    "on": "チ",
    "kun": "—",
    "m": "trí tuệ"
  },
  "池": {
    "hv": "TRÌ",
    "on": "チ",
    "kun": "いけ",
    "m": "cái ao"
  },
  "痴": {
    "hv": "SI",
    "on": "チ",
    "kun": "し・れる, おろか",
    "m": "ngây ngô, ngớ ngẩn, bị điên, si, mê"
  },
  "稚": {
    "hv": "TRĨ",
    "on": "チ, ジ",
    "kun": "いとけない, おさない, おくて, おでる",
    "m": "lúa non, trẻ con"
  },
  "置": {
    "hv": "TRÍ",
    "on": "チ",
    "kun": "お・く, -お・き",
    "m": "đặt, để, bày"
  },
  "致": {
    "hv": "TRÍ",
    "on": "チ",
    "kun": "いた・す",
    "m": "suy cho đến cùng, đem lại, đưa đến, tỉ mỉ, kỹ, kín"
  },
  "築": {
    "hv": "TRÚC",
    "on": "チク",
    "kun": "きず・く",
    "m": "xây cất"
  },
  "畜": {
    "hv": "SÚC",
    "on": "チク",
    "kun": "—",
    "m": "súc vật, nuôi nấng"
  },
  "竹": {
    "hv": "TRÚC",
    "on": "チク",
    "kun": "たけ",
    "m": "cây trúc, cây tre, cây tiêu, cây sáo"
  },
  "筑": {
    "hv": "TRÚC",
    "on": "チク",
    "kun": "—",
    "m": "xây cất, (một loại đàn)"
  },
  "蓄": {
    "hv": "SÚC",
    "on": "チク",
    "kun": "たくわ・える",
    "m": "tích, chứa, trữ"
  },
  "逐": {
    "hv": "TRỤC",
    "on": "チク",
    "kun": "—",
    "m": "đuổi đi, đuổi theo"
  },
  "秩": {
    "hv": "DẬT",
    "on": "チツ",
    "kun": "—",
    "m": "thứ tự, trật (10 năm), thứ tự"
  },
  "窒": {
    "hv": "TRẤT",
    "on": "チツ",
    "kun": "—",
    "m": "tắc nghẽn, trở ngại"
  },
  "茶": {
    "hv": "TRÀ",
    "on": "チャ, サ",
    "kun": "—",
    "m": "chè"
  },
  "嫡": {
    "hv": "ĐÍCH",
    "on": "チャク, テキ",
    "kun": "—",
    "m": "vợ cả"
  },
  "着": {
    "hv": "TRƯỚC",
    "on": "チャク, ジャク",
    "kun": "き・る, き・せる, つ・く, つ・ける",
    "m": "mặc áo, biên soạn sách, nước cờ"
  },
  "仲": {
    "hv": "TRỌNG",
    "on": "チュウ",
    "kun": "なか",
    "m": "giữa, đương lúc"
  },
  "宙": {
    "hv": "TRỤ",
    "on": "チュウ",
    "kun": "—",
    "m": "từ xưa tới nay"
  },
  "忠": {
    "hv": "TRUNG",
    "on": "チュウ",
    "kun": "—",
    "m": "trung thành, làm hết bổn phận"
  },
  "抽": {
    "hv": "TRỪU",
    "on": "チュウ",
    "kun": "ひき-",
    "m": "rút ra, rút lại"
  },
  "柱": {
    "hv": "TRỤ",
    "on": "チュウ",
    "kun": "はしら",
    "m": "cái cột"
  },
  "注": {
    "hv": "CHÚ",
    "on": "チュウ",
    "kun": "そそ・ぐ, さ・す, つ・ぐ",
    "m": "rót nước, chú thích, giải nghĩa, chú ý"
  },
  "虫": {
    "hv": "TRÙNG",
    "on": "チュウ, キ",
    "kun": "むし",
    "m": "loài sâu bọ"
  },
  "衷": {
    "hv": "TRUNG",
    "on": "チュウ",
    "kun": "—",
    "m": "vừa phải, tốt, lành, ngay thẳng"
  },
  "酎": {
    "hv": "TRỮU",
    "on": "チュウ, チュ",
    "kun": "かも・す",
    "m": "rượu ngon, rượu nặng"
  },
  "鋳": {
    "hv": "CHÚ",
    "on": "チュウ, イ, シュ, シュウ",
    "kun": "い・る",
    "m": "casting, mint"
  },
  "駐": {
    "hv": "TRÚ",
    "on": "チュウ",
    "kun": "—",
    "m": "nghỉ lại, lưu lại"
  },
  "猪": {
    "hv": "TRƯ",
    "on": "チョ",
    "kun": "い, いのしし",
    "m": "con lợn"
  },
  "著": {
    "hv": "TRƯỚC",
    "on": "チョ, チャク",
    "kun": "あらわ・す, いちじる・しい",
    "m": "mặc áo, biên soạn sách, nước cờ"
  },
  "貯": {
    "hv": "TRỮ",
    "on": "チョ",
    "kun": "た・める, たくわ・える",
    "m": "chứa cất"
  },
  "丁": {
    "hv": "ĐINH",
    "on": "チョウ, テイ, チン, トウ, チ",
    "kun": "ひのと",
    "m": "con trai, họ Đinh"
  },
  "兆": {
    "hv": "TRIỆU",
    "on": "チョウ",
    "kun": "きざ・す, きざ・し",
    "m": "điềm, triệu chứng, một triệu"
  },
  "喋": {
    "hv": "ĐIỆP",
    "on": "チョウ, トウ",
    "kun": "しゃべ・る, ついば・む",
    "m": "dòng chảy, láu lỉnh, nói lem lém"
  },
  "帖": {
    "hv": "THIẾP",
    "on": "チョウ, ジョウ",
    "kun": "かきもの",
    "m": "tấm thiếp, tấm thiệp, tấm thiếp, tấm thiệp"
  },
  "帳": {
    "hv": "TRƯỚNG",
    "on": "チョウ",
    "kun": "とばり",
    "m": "căng lên, dương lên, trướng (lều dựng tạm khi hành binh)"
  },
  "庁": {
    "hv": "SẢNH",
    "on": "チョウ, テイ",
    "kun": "やくしょ",
    "m": "phòng khách, chỗ quan ngồi làm việc, phòng khách"
  },
  "弔": {
    "hv": "ĐIẾU",
    "on": "チョウ",
    "kun": "とむら・う, とぶら・う",
    "m": "viếng người chết, treo ngược, đến"
  },
  "張": {
    "hv": "TRƯƠNG",
    "on": "チョウ",
    "kun": "は・る, -は・り, -ば・り",
    "m": "treo lên, giương lên, sao Trương (một trong Nhị thập bát tú)"
  },
  "彫": {
    "hv": "ĐIÊU",
    "on": "チョウ",
    "kun": "ほ・る, -ぼ・り",
    "m": "tàn rạc, héo rụng, chim diều hâu, con kên kên"
  },
  "徴": {
    "hv": "TRƯNG",
    "on": "チョウ, チ",
    "kun": "しるし",
    "m": "trưng tập, gọi đến, thu, chứng minh"
  },
  "懲": {
    "hv": "TRỪNG",
    "on": "チョウ",
    "kun": "こ・りる, こ・らす, こ・らしめる",
    "m": "trừng trị, răn đe"
  },
  "挑": {
    "hv": "KHIÊU",
    "on": "チョウ",
    "kun": "いど・む",
    "m": "chọn lựa, kén chọn, gánh, gồng, khều, chọc"
  },
  "暢": {
    "hv": "SƯỚNG",
    "on": "チョウ",
    "kun": "のび・る",
    "m": "sướng, thích"
  },
  "潮": {
    "hv": "TRIỀU",
    "on": "チョウ",
    "kun": "しお, うしお",
    "m": "thuỷ triều, thuỷ triều"
  },
  "町": {
    "hv": "ĐINH",
    "on": "チョウ",
    "kun": "まち",
    "m": "bờ ruộng, đinh (đơn vị đo, bằng 100 mẫu)"
  },
  "眺": {
    "hv": "DIỂU",
    "on": "チョウ",
    "kun": "なが・める",
    "m": "trông, ngắm từ xa, lườm, lễ họp chư hầu"
  },
  "聴": {
    "hv": "THÍNH",
    "on": "チョウ, テイ",
    "kun": "き・く, ゆる・す",
    "m": "nghe"
  },
  "脹": {
    "hv": "TRƯỚNG",
    "on": "チョウ",
    "kun": "は・れる, ふく・らむ, ふく・れる",
    "m": "phình ra, trương ra, tăng giá, nước dâng lên"
  },
  "腸": {
    "hv": "TRÀNG",
    "on": "チョウ",
    "kun": "はらわた, わた",
    "m": "ruột, ruột"
  },
  "蝶": {
    "hv": "ĐIỆP",
    "on": "チョウ",
    "kun": "—",
    "m": "con bươm bướm"
  },
  "調": {
    "hv": "ĐIỀU",
    "on": "チョウ",
    "kun": "しら・べる, しら・べ, ととの・う, ととの・える",
    "m": "chuyển, thay đổi, điều chỉnh, lên dây (đàn)"
  },
  "諜": {
    "hv": "ĐIỆP",
    "on": "チョウ",
    "kun": "ちょう・ずる, うかが・う, しめ・す",
    "m": "gián điệp, điệp viên"
  },
  "超": {
    "hv": "SIÊU",
    "on": "チョウ",
    "kun": "こ・える, こ・す",
    "m": "vượt mức, siêu việt"
  },
  "跳": {
    "hv": "KHIÊU",
    "on": "チョウ",
    "kun": "は・ねる, と・ぶ, -と・び",
    "m": "nhảy"
  },
  "銚": {
    "hv": "DIÊU",
    "on": "チョウ, ヨウ",
    "kun": "なべ",
    "m": "cái thuổng, cái soong, cái siêu, cái ấm, cái mác (vũ khí)"
  },
  "頂": {
    "hv": "ĐÍNH",
    "on": "チョウ",
    "kun": "いただ・く, いただき",
    "m": "đỉnh đầu, chỗ cao nhất, đỉnh đầu"
  },
  "鳥": {
    "hv": "ĐIỂU",
    "on": "チョウ",
    "kun": "とり",
    "m": "con chim"
  },
  "勅": {
    "hv": "SẮC",
    "on": "チョク",
    "kun": "いまし・める, みことのり",
    "m": "sắc lệnh, răn bảo"
  },
  "捗": {
    "hv": "DUỆ",
    "on": "チョク, ホ",
    "kun": "はかど・る",
    "m": "make progress"
  },
  "直": {
    "hv": "TRỰC",
    "on": "チョク, ジキ, ジカ",
    "kun": "ただ・ちに, なお・す, -なお・す, なお・る, なお・き, す・ぐ",
    "m": "thẳng"
  },
  "朕": {
    "hv": "TRẪM",
    "on": "チン",
    "kun": "—",
    "m": "ta đây (tự xưng)"
  },
  "沈": {
    "hv": "THẨM",
    "on": "チン, ジン",
    "kun": "しず・む, しず・める",
    "m": "chìm, lặn, ném xuống nước"
  },
  "珍": {
    "hv": "TRÂN",
    "on": "チン",
    "kun": "めずら・しい, たから",
    "m": "quý báu"
  },
  "賃": {
    "hv": "NHẪM",
    "on": "チン",
    "kun": "—",
    "m": "làm thuê, thuê mướn"
  },
  "鎮": {
    "hv": "TRẤN",
    "on": "チン",
    "kun": "しず・める, しず・まる, おさえ",
    "m": "canh giữ"
  },
  "陳": {
    "hv": "TRẦN",
    "on": "チン",
    "kun": "ひ・ねる",
    "m": "xếp đặt, bày biện, cũ kỹ, lâu năm, họ Trần"
  },
  "津": {
    "hv": "TÂN",
    "on": "シン",
    "kun": "つ",
    "m": "bờ, bến nước, gần, ven"
  },
  "墜": {
    "hv": "TRUỴ",
    "on": "ツイ",
    "kun": "お・ちる, お・つ",
    "m": "rơi, ngã xuống"
  },
  "椎": {
    "hv": "TRUỲ",
    "on": "ツイ, スイ",
    "kun": "つち, う・つ",
    "m": "nện, đánh"
  },
  "槌": {
    "hv": "CHUỲ",
    "on": "ツイ",
    "kun": "つち",
    "m": "cái vồ lớn, đánh đập"
  },
  "追": {
    "hv": "TRUY",
    "on": "ツイ",
    "kun": "お・う",
    "m": "đuổi theo, truy tìm, truy cứu, hồi tưởng, nhớ lại"
  },
  "痛": {
    "hv": "THỐNG",
    "on": "ツウ",
    "kun": "いた・い, いた・む, いた・ましい, いた・める",
    "m": "đau đớn, quá mức"
  },
  "通": {
    "hv": "THÔNG",
    "on": "ツウ, ツ",
    "kun": "とお・る, とお・り, -とお・り, -どお・り, とお・す, とお・し, -どお・し, かよ・う",
    "m": "xuyên qua"
  },
  "塚": {
    "hv": "TRŨNG",
    "on": "チョウ",
    "kun": "つか, -づか",
    "m": "mồ, mả đắp cao, lớn nhất, cao nhất, mồ, mả đắp cao"
  },
  "槻": {
    "hv": "QUY",
    "on": "キ",
    "kun": "つき",
    "m": "cây quy (gỗ có thể dùng làm cung)"
  },
  "佃": {
    "hv": "ĐIỀN",
    "on": "テン, デン",
    "kun": "つくだ",
    "m": "làm ruộng"
  },
  "漬": {
    "hv": "TÝ",
    "on": "シ",
    "kun": "つ・ける, つ・かる, -づ・け, -づけ",
    "m": "ngâm, tẩm, thấm"
  },
  "辻": {
    "hv": "[辻]",
    "on": "—",
    "kun": "つじ",
    "m": "crossing, crossroad, street corners"
  },
  "蔦": {
    "hv": "ĐIỂU",
    "on": "チョウ",
    "kun": "つた",
    "m": "cây điểu (một thứ cây mọc từng bụi như cỏ thố ty)"
  },
  "綴": {
    "hv": "CHUẾ",
    "on": "テイ, テツ, テチ, ゲツ",
    "kun": "と・じる, つづ・る, つづり, すみ・やか",
    "m": "nối liền, khâu lại"
  },
  "椿": {
    "hv": "XUÂN",
    "on": "チン, チュン",
    "kun": "つばき",
    "m": "cây xuân"
  },
  "潰": {
    "hv": "HỘI",
    "on": "カイ, エ",
    "kun": "つぶ・す, つぶ・れる, つい・える",
    "m": "vỡ ngang, tan lở, thua trận"
  },
  "坪": {
    "hv": "BÌNH",
    "on": "ヘイ",
    "kun": "つぼ",
    "m": "chỗ đất bằng phẳng"
  },
  "壷": {
    "hv": "HỒ",
    "on": "コ",
    "kun": "つぼ",
    "m": "jar, pot, hinge knuckle"
  },
  "紬": {
    "hv": "TRỪU",
    "on": "チュウ",
    "kun": "つむぎ, つむ・ぐ",
    "m": "quấn sợi, xe sợi"
  },
  "爪": {
    "hv": "TRẢO",
    "on": "ソウ",
    "kun": "つめ, つま-",
    "m": "móng chân thú"
  },
  "吊": {
    "hv": "ĐIẾU",
    "on": "チョウ",
    "kun": "つ・る, つる・す",
    "m": "viếng người chết, treo ngược"
  },
  "釣": {
    "hv": "ĐIẾU",
    "on": "チョウ",
    "kun": "つ・る, つ・り, つ・り-",
    "m": "câu cá"
  },
  "鶴": {
    "hv": "HẠC",
    "on": "カク",
    "kun": "つる",
    "m": "chim hạc, con sếu"
  },
  "亭": {
    "hv": "ĐÌNH",
    "on": "テイ, チン",
    "kun": "—",
    "m": "cái nhà nhỏ"
  },
  "停": {
    "hv": "ĐÌNH",
    "on": "テイ",
    "kun": "と・める, と・まる",
    "m": "dừng lại"
  },
  "偵": {
    "hv": "TRINH",
    "on": "テイ",
    "kun": "—",
    "m": "thăm dò, do thám, điều tra"
  },
  "剃": {
    "hv": "THẾ",
    "on": "テイ",
    "kun": "まい, そ・る, す・る",
    "m": "cắt tóc, cạo trọc"
  },
  "貞": {
    "hv": "TRINH",
    "on": "テイ, ジョウ",
    "kun": "ただし・い, さだ",
    "m": "trong trắng, tiết hạnh, trung thành"
  },
  "呈": {
    "hv": "TRÌNH",
    "on": "テイ",
    "kun": "—",
    "m": "trình ra, đưa ra, dâng lên"
  },
  "堤": {
    "hv": "ĐÊ",
    "on": "テイ",
    "kun": "つつみ",
    "m": "con đê ngăn nước"
  },
  "定": {
    "hv": "ĐỊNH",
    "on": "テイ, ジョウ",
    "kun": "さだ・める, さだ・まる, さだ・か",
    "m": "định, yên lặng"
  },
  "帝": {
    "hv": "ĐẾ",
    "on": "テイ",
    "kun": "みかど",
    "m": "vua"
  },
  "底": {
    "hv": "ĐỂ",
    "on": "テイ",
    "kun": "そこ",
    "m": "đáy (bình, ao, ...), đạt đến, đạt tới"
  },
  "庭": {
    "hv": "ĐÌNH",
    "on": "テイ",
    "kun": "にわ",
    "m": "sân trước"
  },
  "廷": {
    "hv": "ĐÌNH",
    "on": "テイ",
    "kun": "—",
    "m": "triều đình"
  },
  "弟": {
    "hv": "ĐỆ",
    "on": "テイ, ダイ, デ",
    "kun": "おとうと",
    "m": "em trai, dễ dãi"
  },
  "悌": {
    "hv": "ĐỄ",
    "on": "テイ, ダイ",
    "kun": "—",
    "m": "thuận theo"
  },
  "抵": {
    "hv": "ĐỂ",
    "on": "テイ",
    "kun": "—",
    "m": "mạo phạm, chống cự"
  },
  "挺": {
    "hv": "ĐĨNH",
    "on": "チョウ, テイ",
    "kun": "ぬ・く",
    "m": "ưỡn ra, trương ra"
  },
  "提": {
    "hv": "ĐỀ",
    "on": "テイ, チョウ, ダイ",
    "kun": "さ・げる",
    "m": "bày ra, kể ra, nắm lấy, mang"
  },
  "梯": {
    "hv": "THÊ",
    "on": "テイ, タイ",
    "kun": "はしご",
    "m": "cái thang"
  },
  "汀": {
    "hv": "ĐINH",
    "on": "テイ",
    "kun": "みぎわ, なぎさ",
    "m": "bãi sông, châu Đinh (Trung Quốc)"
  },
  "禎": {
    "hv": "TRINH",
    "on": "テイ",
    "kun": "さいわ・い",
    "m": "điều tốt lành"
  },
  "程": {
    "hv": "TRÌNH",
    "on": "テイ",
    "kun": "ほど, -ほど",
    "m": "đường đi, đoạn đường, đo, lường, trật tự"
  },
  "締": {
    "hv": "ĐẾ",
    "on": "テイ",
    "kun": "し・まる, し・まり, し・める, -し・め, -じ・め",
    "m": "ràng buộc"
  },
  "艇": {
    "hv": "ĐĨNH",
    "on": "テイ",
    "kun": "—",
    "m": "cái thoi (thứ thuyền nhỏ và dài)"
  },
  "訂": {
    "hv": "ĐÍNH",
    "on": "テイ",
    "kun": "ただ・す",
    "m": "thoả thuận hai bên"
  },
  "諦": {
    "hv": "ĐẾ",
    "on": "テイ, タイ",
    "kun": "あきら・める, つまびらか, まこと",
    "m": "xét kỹ"
  },
  "蹄": {
    "hv": "ĐỀ",
    "on": "テイ",
    "kun": "ひづめ",
    "m": "móng, vó (ngựa)"
  },
  "逓": {
    "hv": "ĐÁI",
    "on": "テイ",
    "kun": "かわ・る, たがいに",
    "m": "relay, in turn, sending"
  },
  "邸": {
    "hv": "ĐỂ",
    "on": "テイ",
    "kun": "やしき",
    "m": "nhà cho sứ các nước chư hầu đến chầu ở, bức bình phong"
  },
  "鄭": {
    "hv": "TRỊNH",
    "on": "テイ, ジョウ",
    "kun": "—",
    "m": "nước Trịnh, họ Trịnh"
  },
  "釘": {
    "hv": "ĐINH",
    "on": "テイ, チョウ",
    "kun": "くぎ",
    "m": "cái đinh, đóng đinh"
  },
  "泥": {
    "hv": "NỄ",
    "on": "デイ, ナイ, デ, ニ",
    "kun": "どろ, なず・む",
    "m": "bùn đất, kiềm chế, trì trệ"
  },
  "摘": {
    "hv": "TRÍCH",
    "on": "テキ",
    "kun": "つ・む",
    "m": "trích ra, ngắt, hái, vặt"
  },
  "敵": {
    "hv": "ĐỊCH",
    "on": "テキ",
    "kun": "かたき, あだ, かな・う",
    "m": "kẻ thù, giặc, ngang nhau, chống cự"
  },
  "滴": {
    "hv": "CHÍCH",
    "on": "テキ",
    "kun": "しずく, したた・る",
    "m": "giọt nước, giọt nước, giọt nước"
  },
  "的": {
    "hv": "ĐÍCH",
    "on": "テキ",
    "kun": "まと",
    "m": "của, thuộc về, đúng, chính xác, mục tiêu"
  },
  "笛": {
    "hv": "ĐỊCH",
    "on": "テキ",
    "kun": "ふえ",
    "m": "cái sáo (để thổi)"
  },
  "適": {
    "hv": "THÍCH",
    "on": "テキ",
    "kun": "かな・う",
    "m": "đang lúc"
  },
  "溺": {
    "hv": "NỊCH",
    "on": "デキ, ジョウ, ニョウ",
    "kun": "いばり, おぼ・れる",
    "m": "đi tiểu, đi đái, chết đuối, chìm đắm, say mê"
  },
  "哲": {
    "hv": "TRIẾT",
    "on": "テツ",
    "kun": "さとい, あきらか",
    "m": "khôn, trí tuệ, triết học"
  },
  "徹": {
    "hv": "TRIỆT",
    "on": "テツ",
    "kun": "—",
    "m": "suốt, thấu, đến tận cùng"
  },
  "撤": {
    "hv": "TRIỆT",
    "on": "テツ",
    "kun": "—",
    "m": "rút đi, rút lui, giảm bớt, lược bớt"
  },
  "轍": {
    "hv": "TRIỆT",
    "on": "テツ",
    "kun": "わだちい, わだち",
    "m": "vết bánh xe"
  },
  "迭": {
    "hv": "ĐIỆT",
    "on": "テツ",
    "kun": "—",
    "m": "thay phiên, lần lượt, xân lấn"
  },
  "鉄": {
    "hv": "THIẾT",
    "on": "テツ",
    "kun": "くろがね",
    "m": "sắt, Fe"
  },
  "典": {
    "hv": "ĐIỂN",
    "on": "テン, デン",
    "kun": "ふみ, のり",
    "m": "chuẩn mực, mẫu mực"
  },
  "展": {
    "hv": "TRIỂN",
    "on": "テン",
    "kun": "—",
    "m": "mở ra, trải ra, kéo dài, triển lãm, trưng bày"
  },
  "添": {
    "hv": "THIÊM",
    "on": "テン",
    "kun": "そ・える, そ・う",
    "m": "thêm, đẻ con, sinh con"
  },
  "貼": {
    "hv": "THIẾP",
    "on": "テン, チョウ",
    "kun": "は・る, つ・く",
    "m": "dán, áp sát, men theo, cho thêm, trợ cấp, bù thêm"
  },
  "転": {
    "hv": "CHUYỂN",
    "on": "テン",
    "kun": "ころ・がる, ころ・げる, ころ・がす, ころ・ぶ, まろ・ぶ, うたた, うつ・る, くる・めく",
    "m": "quay vòng, chuyển, đổi"
  },
  "点": {
    "hv": "ĐIỂM",
    "on": "テン",
    "kun": "つ・ける, つ・く, た・てる, さ・す, とぼ・す, とも・す, ぼち",
    "m": "điểm, chấm, nốt, giờ"
  },
  "伝": {
    "hv": "TRUYỀN",
    "on": "デン, テン",
    "kun": "つた・わる, つた・える, つた・う, つだ・う, -づた・い, つて",
    "m": "truyền, truyện"
  },
  "殿": {
    "hv": "ĐIỆN",
    "on": "デン, テン",
    "kun": "との, -どの",
    "m": "cung điện"
  },
  "田": {
    "hv": "ĐIỀN",
    "on": "デン",
    "kun": "た",
    "m": "ruộng, đồng"
  },
  "吐": {
    "hv": "THỔ",
    "on": "ト",
    "kun": "は・く, つ・く",
    "m": "nhả ra, nở (hoa)"
  },
  "塗": {
    "hv": "ĐỒ",
    "on": "ト",
    "kun": "ぬ・る, ぬ・り, まみ・れる",
    "m": "bôi, phết, quết, sơn"
  },
  "妬": {
    "hv": "ĐỐ",
    "on": "ト, ツ",
    "kun": "ねた・む, そね・む, つも・る, ふさ・ぐ",
    "m": "ghét, ghen tỵ"
  },
  "徒": {
    "hv": "ĐỒ",
    "on": "ト",
    "kun": "いたずら, あだ",
    "m": "đi bộ, không, trống, đồ đệ, học trò"
  },
  "斗": {
    "hv": "ĐẤU",
    "on": "ト, トウ",
    "kun": "—",
    "m": "tranh đấu, cái đấu (để đong), một đấu"
  },
  "杜": {
    "hv": "ĐỖ",
    "on": "ト, トウ, ズ",
    "kun": "もり, ふさ・ぐ, やまなし",
    "m": "cây đỗ (còn gọi là cây đường lê), ngăn chặn"
  },
  "渡": {
    "hv": "ĐỘ",
    "on": "ト",
    "kun": "わた・る, -わた・る, わた・す",
    "m": "vượt qua, cứu giúp, bến đò"
  },
  "登": {
    "hv": "ĐĂNG",
    "on": "トウ, ト, ドウ, ショウ, チョウ",
    "kun": "のぼ・る, あ・がる",
    "m": "lên, leo lên"
  },
  "賭": {
    "hv": "ĐỔ",
    "on": "ト",
    "kun": "か・ける, かけ",
    "m": "đánh bạc"
  },
  "途": {
    "hv": "ĐỒ",
    "on": "ト",
    "kun": "みち",
    "m": "đường lối"
  },
  "努": {
    "hv": "NỖ",
    "on": "ド",
    "kun": "つと・める",
    "m": "cố gắng"
  },
  "度": {
    "hv": "ĐẠC",
    "on": "ド, ト, タク",
    "kun": "たび, -た・い",
    "m": "đo lường, mức độ, lần"
  },
  "土": {
    "hv": "THỔ",
    "on": "ド, ト",
    "kun": "つち",
    "m": "đất, sao Thổ"
  },
  "奴": {
    "hv": "NÔ",
    "on": "ド",
    "kun": "やつ, やっこ",
    "m": "đày tớ, đứa ở"
  },
  "怒": {
    "hv": "NỘ",
    "on": "ド, ヌ",
    "kun": "いか・る, おこ・る",
    "m": "giận, nổi cáu"
  },
  "倒": {
    "hv": "ĐẢO",
    "on": "トウ",
    "kun": "たお・れる, -だお・れ, たお・す, さかさま, さかさ, さかしま",
    "m": "lật ngược, đổ, ngã, đổi"
  },
  "党": {
    "hv": "ĐẢNG",
    "on": "トウ",
    "kun": "なかま, むら",
    "m": "bè, đảng"
  },
  "凍": {
    "hv": "ĐÔNG",
    "on": "トウ",
    "kun": "こお・る, こご・える, こご・る, い・てる, し・みる",
    "m": "đóng băng, nước đá"
  },
  "刀": {
    "hv": "ĐAO",
    "on": "トウ",
    "kun": "かたな, そり",
    "m": "con dao, cái đao"
  },
  "唐": {
    "hv": "ĐƯỜNG",
    "on": "トウ",
    "kun": "から",
    "m": "đời nhà Đường (Trung Quốc), khoác, hoang đường"
  },
  "塔": {
    "hv": "THÁP",
    "on": "トウ",
    "kun": "—",
    "m": "toà tháp"
  },
  "宕": {
    "hv": "ĐÃNG",
    "on": "トウ",
    "kun": "すぎる",
    "m": "bỏ lửng việc không làm xong"
  },
  "島": {
    "hv": "ĐẢO",
    "on": "トウ",
    "kun": "しま",
    "m": "hòn đảo, gò"
  },
  "嶋": {
    "hv": "ĐẢO",
    "on": "トウ",
    "kun": "しま",
    "m": "hòn đảo, gò"
  },
  "悼": {
    "hv": "ĐIỆU",
    "on": "トウ",
    "kun": "いた・む",
    "m": "thương tiếc, viếng người chết"
  },
  "投": {
    "hv": "ĐẦU",
    "on": "トウ",
    "kun": "な・げる, -な・げ",
    "m": "ném, quẳng, đưa vào, bỏ vào, hợp với nhau"
  },
  "搭": {
    "hv": "ĐÁP",
    "on": "トウ",
    "kun": "—",
    "m": "phụ vào, treo lên, để lẫn lộn"
  },
  "桃": {
    "hv": "ĐÀO",
    "on": "トウ",
    "kun": "もも",
    "m": "cây hoa đào, lễ cưới"
  },
  "棟": {
    "hv": "ĐỐNG",
    "on": "トウ",
    "kun": "むね, むな-",
    "m": "cái cột"
  },
  "盗": {
    "hv": "ĐẠO",
    "on": "トウ",
    "kun": "ぬす・む, ぬす・み",
    "m": "ăm trộm, ăm cắp, kẻ trộm"
  },
  "淘": {
    "hv": "ĐÀO",
    "on": "トウ",
    "kun": "よな・げる",
    "m": "vo, đãi (gạo), giặt bằng cái rây (sàng)"
  },
  "湯": {
    "hv": "THANG",
    "on": "トウ",
    "kun": "ゆ",
    "m": "nước nóng, vua Thang"
  },
  "灯": {
    "hv": "ĐĂNG",
    "on": "トウ",
    "kun": "ひ, ほ-, ともしび, とも・す, あかり",
    "m": "cái đèn"
  },
  "燈": {
    "hv": "ĐĂNG",
    "on": "トウ",
    "kun": "ひ, ほ-, ともしび, とも・す, あかり",
    "m": "cái đèn"
  },
  "当": {
    "hv": "ĐANG",
    "on": "トウ",
    "kun": "あ・たる, あ・たり, あ・てる, あ・て, まさ・に, まさ・にべし",
    "m": "xứng nhau, ngang nhau, tương đương, tương ứng, nên, đáng, thẳng, trực tiếp"
  },
  "痘": {
    "hv": "ĐẬU",
    "on": "トウ",
    "kun": "—",
    "m": "bệnh đậu mùa"
  },
  "等": {
    "hv": "ĐẲNG",
    "on": "トウ",
    "kun": "ひと・しい, など, -ら",
    "m": "bằng nhau, thứ bậc, chờ đợi"
  },
  "筒": {
    "hv": "ĐỒNG",
    "on": "トウ",
    "kun": "つつ",
    "m": "ống tre, ống"
  },
  "糖": {
    "hv": "ĐƯỜNG",
    "on": "トウ",
    "kun": "—",
    "m": "đường ăn, chất ngọt"
  },
  "統": {
    "hv": "THỐNG",
    "on": "トウ",
    "kun": "す・べる",
    "m": "mối tơ, dòng, hệ thống, thống trị"
  },
  "到": {
    "hv": "ĐÁO",
    "on": "トウ",
    "kun": "いた・る",
    "m": "đến nơi"
  },
  "藤": {
    "hv": "ĐẰNG",
    "on": "トウ, ドウ",
    "kun": "ふじ",
    "m": "bụi cây, dây buộc"
  },
  "討": {
    "hv": "THẢO",
    "on": "トウ",
    "kun": "う・つ",
    "m": "đánh, trừng phạt người có tội, dò xét, đòi lại của cải"
  },
  "謄": {
    "hv": "ĐẰNG",
    "on": "トウ",
    "kun": "—",
    "m": "sao chép cho rõ ràng hơn"
  },
  "豆": {
    "hv": "ĐẬU",
    "on": "トウ, ズ",
    "kun": "まめ, まめ-",
    "m": "cây đậu"
  },
  "踏": {
    "hv": "ĐẠP",
    "on": "トウ",
    "kun": "ふ・む, ふ・まえる",
    "m": "đạp, dẫm lên, tại chỗ, hiên trường"
  },
  "逃": {
    "hv": "ĐÀO",
    "on": "トウ",
    "kun": "に・げる, に・がす, のが・す, のが・れる",
    "m": "bỏ trốn"
  },
  "透": {
    "hv": "THẤU",
    "on": "トウ",
    "kun": "す・く, す・かす, す・ける, とう・る, とう・す",
    "m": "xuyên qua"
  },
  "陶": {
    "hv": "ĐÀO",
    "on": "トウ",
    "kun": "すえ",
    "m": "đồ gốm, họ Đào"
  },
  "頭": {
    "hv": "ĐẦU",
    "on": "トウ, ズ, ト",
    "kun": "あたま, かしら, -がしら, かぶり",
    "m": "cái đầu"
  },
  "騰": {
    "hv": "ĐẰNG",
    "on": "トウ",
    "kun": "あが・る, のぼ・る",
    "m": "ngựa nhảy chồm lên, bốc lên, chạy, nhảy"
  },
  "闘": {
    "hv": "ĐẤU",
    "on": "トウ",
    "kun": "たたか・う, あらそ・う",
    "m": "tranh đấu"
  },
  "働": {
    "hv": "ĐỘNG",
    "on": "ドウ",
    "kun": "はたら・く",
    "m": "động đậy, cử động, hoạt động"
  },
  "動": {
    "hv": "ĐỘNG",
    "on": "ドウ",
    "kun": "うご・く, うご・かす",
    "m": "động đậy, cử động, hoạt động"
  },
  "同": {
    "hv": "ĐỒNG",
    "on": "ドウ",
    "kun": "おな・じ",
    "m": "cùng nhau"
  },
  "堂": {
    "hv": "ĐÀNG",
    "on": "ドウ",
    "kun": "—",
    "m": "nhà chính, gian nhà giữa, nhà chính, gian nhà giữa"
  },
  "導": {
    "hv": "ĐẠO",
    "on": "ドウ",
    "kun": "みちび・く",
    "m": "dẫn, đưa, chỉ đạo"
  },
  "憧": {
    "hv": "SUNG",
    "on": "ショウ, トウ, ドウ",
    "kun": "あこが・れる",
    "m": "phân vân"
  },
  "洞": {
    "hv": "ĐỘNG",
    "on": "ドウ",
    "kun": "ほら",
    "m": "hang động"
  },
  "瞳": {
    "hv": "ĐỒNG",
    "on": "ドウ, トウ",
    "kun": "ひとみ",
    "m": "con ngươi mắt"
  },
  "童": {
    "hv": "ĐỒNG",
    "on": "ドウ",
    "kun": "わらべ",
    "m": "đứa trẻ"
  },
  "胴": {
    "hv": "ĐỖNG",
    "on": "ドウ",
    "kun": "—",
    "m": "thân người, ruột già"
  },
  "銅": {
    "hv": "ĐỒNG",
    "on": "ドウ",
    "kun": "あかがね",
    "m": "đồng, Cu"
  },
  "峠": {
    "hv": "CA",
    "on": "—",
    "kun": "とうげ",
    "m": "mountain peak, mountain pass, climax"
  },
  "匿": {
    "hv": "NẶC",
    "on": "トク",
    "kun": "かくま・う",
    "m": "giấu kín"
  },
  "得": {
    "hv": "ĐẮC",
    "on": "トク",
    "kun": "え・る, う・る",
    "m": "được, trúng, đúng"
  },
  "徳": {
    "hv": "ĐỨC",
    "on": "トク",
    "kun": "—",
    "m": "đạo đức, thiện, ơn, ân, nước Đức"
  },
  "特": {
    "hv": "ĐẶC",
    "on": "トク",
    "kun": "—",
    "m": "con trâu đực, riêng biệt, đặc biệt, khác hẳn mọi thứ"
  },
  "督": {
    "hv": "ĐỐC",
    "on": "トク",
    "kun": "—",
    "m": "thúc giục, đốc thúc"
  },
  "篤": {
    "hv": "ĐỐC",
    "on": "トク",
    "kun": "あつ・い",
    "m": "dốc sức, dốc lòng"
  },
  "毒": {
    "hv": "ĐỘC",
    "on": "ドク",
    "kun": "—",
    "m": "độc hại"
  },
  "独": {
    "hv": "ĐỘC",
    "on": "ドク, トク",
    "kun": "ひと・り",
    "m": "một mình, con độc (một giống vượn)"
  },
  "栃": {
    "hv": "LỆ",
    "on": "—",
    "kun": "とち",
    "m": "horse chestnut, (kokuji)"
  },
  "凸": {
    "hv": "ĐỘT",
    "on": "トツ",
    "kun": "でこ",
    "m": "lồi, nhô ra, gồ lên"
  },
  "突": {
    "hv": "ĐỘT",
    "on": "トツ, カ",
    "kun": "つ・く",
    "m": "phá tung, đột ngột, bỗng nhiên, ống khói"
  },
  "届": {
    "hv": "GIỚI",
    "on": "カイ",
    "kun": "とど・ける, -とど・け, とど・く",
    "m": "đến lúc, tới lúc, đến giờ, lần, khoá, kỳ"
  },
  "苫": {
    "hv": "THIÊM",
    "on": "セン",
    "kun": "とま",
    "m": "một loại cỏ như cỏ tranh"
  },
  "寅": {
    "hv": "DẦN",
    "on": "イン",
    "kun": "とら",
    "m": "Dần (chi thứ 3 hàng Chi)"
  },
  "酉": {
    "hv": "DẬU",
    "on": "ユウ",
    "kun": "とり",
    "m": "Dậu (ngôi thứ 10 hàng Chi)"
  },
  "屯": {
    "hv": "ĐỒN",
    "on": "トン",
    "kun": "たむろ",
    "m": "khó khăn, gian nan, truân chuyên, đồn bốt, đống đất"
  },
  "惇": {
    "hv": "ĐÔN",
    "on": "シュン, ジュン, トン",
    "kun": "あつ・い",
    "m": "đôn đốc, tin tưởng"
  },
  "敦": {
    "hv": "ĐÔN",
    "on": "トン, タイ, ダン, チョウ",
    "kun": "あつ・い",
    "m": "đốc thúc, thúc giục, (xem: hỗn độn 渾敦)"
  },
  "豚": {
    "hv": "ĐỒN",
    "on": "トン",
    "kun": "ぶた",
    "m": "con lợn con, đi lê gót chân"
  },
  "頓": {
    "hv": "ĐỐN",
    "on": "トン, トツ",
    "kun": "にわか・に, とん・と, つまず・く, とみ・に, ぬかずく",
    "m": "ngưng lại, dừng lại, đình đốn"
  },
  "呑": {
    "hv": "THÔN",
    "on": "トン, ドン",
    "kun": "の・む",
    "m": "nuốt, tiêu diệt"
  },
  "曇": {
    "hv": "ĐÀM",
    "on": "ドン",
    "kun": "くも・る",
    "m": "mây chùm"
  },
  "鈍": {
    "hv": "ĐỘN",
    "on": "ドン",
    "kun": "にぶ・い, にぶ・る, にぶ-, なま・る, なまく・ら",
    "m": "cùn, nhụt (không sắc)"
  },
  "奈": {
    "hv": "NẠI",
    "on": "ナ, ナイ, ダイ",
    "kun": "いかん, からなし",
    "m": "tự nhiên, vốn có, sẵn có"
  },
  "那": {
    "hv": "NA",
    "on": "ナ, ダ",
    "kun": "なに, なんぞ, いかん",
    "m": "nhiều, an nhàn, nào, gì (câu hỏi)"
  },
  "内": {
    "hv": "NỘI",
    "on": "ナイ, ダイ",
    "kun": "うち",
    "m": "bên trong"
  },
  "凪": {
    "hv": "[凪]",
    "on": "—",
    "kun": "なぎ, な・ぐ",
    "m": "lull, calm, (kokuji)"
  },
  "謎": {
    "hv": "MÊ",
    "on": "メイ, ベイ",
    "kun": "なぞ",
    "m": "câu đố"
  },
  "灘": {
    "hv": "THAN",
    "on": "タン, ダン",
    "kun": "なだ, せ",
    "m": "thác nước"
  },
  "捺": {
    "hv": "NẠI",
    "on": "ナツ, ダツ",
    "kun": "さ・す, お・す",
    "m": "đè ép, ấn, nét phảy"
  },
  "鍋": {
    "hv": "OA",
    "on": "カ",
    "kun": "なべ",
    "m": "cái nồi"
  },
  "楢": {
    "hv": "DO",
    "on": "シュウ, ユウ",
    "kun": "なら",
    "m": "cây gỗ mềm"
  },
  "縄": {
    "hv": "MẪN",
    "on": "ジョウ",
    "kun": "なわ, ただ・す",
    "m": "straw rope, cord"
  },
  "楠": {
    "hv": "NAM",
    "on": "ナン, ダン, ゼン, ネン",
    "kun": "くす, くすのき",
    "m": "cây nam, cây chò"
  },
  "軟": {
    "hv": "NHUYỄN",
    "on": "ナン",
    "kun": "やわ・らか, やわ・らかい",
    "m": "mềm, dẻo"
  },
  "尼": {
    "hv": "NI",
    "on": "ニ",
    "kun": "あま",
    "m": "nữ sư"
  },
  "弐": {
    "hv": "NHỊ",
    "on": "ニ, ジ",
    "kun": "ふた・つ, そえ",
    "m": "II, two, second"
  },
  "匂": {
    "hv": "CÁI",
    "on": "—",
    "kun": "にお・う, にお・い, にお・わせる",
    "m": "fragrant, stink, glow"
  },
  "肉": {
    "hv": "NHỤC",
    "on": "ニク",
    "kun": "しし",
    "m": "thịt, cùi quả"
  },
  "虹": {
    "hv": "HỒNG",
    "on": "コウ",
    "kun": "にじ",
    "m": "cầu vồng"
  },
  "乳": {
    "hv": "NHŨ",
    "on": "ニュウ",
    "kun": "ちち, ち",
    "m": "sinh, đẻ, vú, sữa"
  },
  "入": {
    "hv": "NHẬP",
    "on": "ニュウ, ジュ",
    "kun": "い・る, -い・る, -い・り, い・れる, -い・れ, はい・る",
    "m": "vào trong"
  },
  "如": {
    "hv": "NHƯ",
    "on": "ジョ, ニョ",
    "kun": "ごと・し",
    "m": "bằng, giống, như"
  },
  "尿": {
    "hv": "NIỆU",
    "on": "ニョウ",
    "kun": "ゆばり, いばり, しと",
    "m": "nước giải, nước đái"
  },
  "韮": {
    "hv": "CỬU",
    "on": "キュウ, ク",
    "kun": "にら",
    "m": "rau hẹ"
  },
  "妊": {
    "hv": "NHÂM",
    "on": "ニン, ジン",
    "kun": "はら・む, みごも・る",
    "m": "có mang, có bầu, có thai, mang thai"
  },
  "忍": {
    "hv": "NHẪN",
    "on": "ニン",
    "kun": "しの・ぶ, しの・ばせる",
    "m": "chịu đựng, nhẫn nhịn, nỡ, đành"
  },
  "認": {
    "hv": "NHẬN",
    "on": "ニン",
    "kun": "みと・める, したた・める",
    "m": "nhận ra, nhận biết, chấp thuận, nhận, bằng lòng"
  },
  "濡": {
    "hv": "NHU",
    "on": "ジュ, ニュ",
    "kun": "ぬれ・る, ぬら・す, ぬ・れる, ぬ・らす, うるお・い, うるお・う, うるお・す",
    "m": "sông Nhu, thấm ướt"
  },
  "寧": {
    "hv": "NINH",
    "on": "ネイ",
    "kun": "むし・ろ",
    "m": "an toàn, thà, nên, há nào, lẽ nào"
  },
  "猫": {
    "hv": "MIÊU",
    "on": "ビョウ",
    "kun": "ねこ",
    "m": "con mèo"
  },
  "熱": {
    "hv": "NHIỆT",
    "on": "ネツ",
    "kun": "あつ・い",
    "m": "nóng, bị sốt"
  },
  "念": {
    "hv": "NIỆM",
    "on": "ネン",
    "kun": "—",
    "m": "mong mỏi, nhớ"
  },
  "捻": {
    "hv": "NIỆP",
    "on": "ネン, ジョウ",
    "kun": "ね・じる, ねじ・る, ひね・くる, ひね・る",
    "m": "nắn, rút lấy"
  },
  "撚": {
    "hv": "NHIÊN",
    "on": "ネン",
    "kun": "よ・る, よ・れる, より, ひね・る",
    "m": "cầm, xoe, gảy, xéo, dẫm, cầm, xoe, gảy, xéo, dẫm, cầm, xoe, gảy, xéo, dẫm"
  },
  "燃": {
    "hv": "NHIÊN",
    "on": "ネン",
    "kun": "も・える, も・やす, も・す",
    "m": "đốt"
  },
  "粘": {
    "hv": "NIÊM",
    "on": "ネン",
    "kun": "ねば・る",
    "m": "chất dính, dán vào"
  },
  "乃": {
    "hv": "NÃI",
    "on": "ナイ, ダイ, ノ, アイ",
    "kun": "の, すなわ・ち, なんじ",
    "m": "bèn (trợ từ)"
  },
  "之": {
    "hv": "CHI",
    "on": "シ",
    "kun": "の, これ, ゆく, この",
    "m": "đã, rồi, thuộc về, (đại từ thay thế)"
  },
  "悩": {
    "hv": "NÃO",
    "on": "ノウ",
    "kun": "なや・む, なや・ます, なや・ましい, なやみ",
    "m": "trouble, worry, in pain"
  },
  "濃": {
    "hv": "NÙNG",
    "on": "ノウ",
    "kun": "こ・い",
    "m": "dày, đặc, đậm (màu) (ý nhấn mạnh, trái với đạm)"
  },
  "納": {
    "hv": "NẠP",
    "on": "ノウ, ナッ, ナ, ナン, トウ",
    "kun": "おさ・める, -おさ・める, おさ・まる",
    "m": "thu vào, giao nộp"
  },
  "能": {
    "hv": "NĂNG",
    "on": "ノウ",
    "kun": "よ・く, あた・う",
    "m": "khả năng, có thể"
  },
  "脳": {
    "hv": "NÃO",
    "on": "ノウ, ドウ",
    "kun": "のうずる",
    "m": "brain, memory"
  },
  "農": {
    "hv": "NÔNG",
    "on": "ノウ",
    "kun": "—",
    "m": "người làm ruộng"
  },
  "巴": {
    "hv": "BA",
    "on": "ハ",
    "kun": "ともえ, うずまき",
    "m": "mong ngóng, dính, bén, sát, bám, liền, ở cạnh"
  },
  "把": {
    "hv": "BẢ",
    "on": "ハ, ワ",
    "kun": "—",
    "m": "cầm, nắm, giữ, canh giữ, gác trông, chuôi, cán, tay cầm, tay nắm"
  },
  "播": {
    "hv": "BÁ",
    "on": "ハ, バン, ハン",
    "kun": "ま・く",
    "m": "gieo ra, vung ra, làm lan rộng, trốn"
  },
  "覇": {
    "hv": "BÁ",
    "on": "ハ, ハク",
    "kun": "はたがしら",
    "m": "bá, chùm xỏ, bá quyền, chiếm giữ, cát cứ"
  },
  "波": {
    "hv": "BA",
    "on": "ハ",
    "kun": "なみ",
    "m": "sóng nhỏ"
  },
  "派": {
    "hv": "PHÁI",
    "on": "ハ",
    "kun": "—",
    "m": "dòng nước, phái, phe, ngành nhánh"
  },
  "琶": {
    "hv": "BÀ",
    "on": "ハ, ベ, ワ",
    "kun": "—",
    "m": "(xem: tỳ bà 琵琶)"
  },
  "破": {
    "hv": "PHÁ",
    "on": "ハ",
    "kun": "やぶ・る, やぶ・れる, わ・れる",
    "m": "rách nát, phá vỡ, bổ ra"
  },
  "婆": {
    "hv": "BÀ",
    "on": "バ",
    "kun": "ばば, ばあ",
    "m": "bà già, mẹ chồng"
  },
  "罵": {
    "hv": "MẠ",
    "on": "バ",
    "kun": "ののし・る",
    "m": "mắng mỏ, chửi bới"
  },
  "芭": {
    "hv": "BA",
    "on": "バ, ハ",
    "kun": "—",
    "m": "(xem: ba tiêu 芭蕉)"
  },
  "馬": {
    "hv": "MÃ",
    "on": "バ",
    "kun": "うま, うま-, ま",
    "m": "con ngựa"
  },
  "俳": {
    "hv": "BÀI",
    "on": "ハイ",
    "kun": "—",
    "m": "do dự, phân vân"
  },
  "廃": {
    "hv": "PHẾ",
    "on": "ハイ",
    "kun": "すた・れる, すた・る",
    "m": "abolish, obsolete, cessation"
  },
  "拝": {
    "hv": "BÁI",
    "on": "ハイ",
    "kun": "おが・む, おろが・む",
    "m": "lạy, vái, chúc mừng, tôn kính"
  },
  "排": {
    "hv": "BÀI",
    "on": "ハイ",
    "kun": "—",
    "m": "xếp hàng, bè (thuyền bè), tháo ra"
  },
  "敗": {
    "hv": "BẠI",
    "on": "ハイ",
    "kun": "やぶ・れる",
    "m": "hỏng, đổ nát, thua, thất bại, phá"
  },
  "杯": {
    "hv": "BÔI",
    "on": "ハイ",
    "kun": "さかずき",
    "m": "cái cốc, cái chén"
  },
  "牌": {
    "hv": "BÀI",
    "on": "ハイ",
    "kun": "ぱい, ふだ",
    "m": "cái biển yết thị, thẻ bài, cỗ bài (chơi)"
  },
  "背": {
    "hv": "BỐI",
    "on": "ハイ",
    "kun": "せ, せい, そむ・く, そむ・ける",
    "m": "lưng, mặt trái, mặt sau, mu bàn tay"
  },
  "肺": {
    "hv": "PHẾ",
    "on": "ハイ",
    "kun": "—",
    "m": "lá phổi"
  },
  "輩": {
    "hv": "BỐI",
    "on": "ハイ",
    "kun": "-ばら, やから, やかい, ともがら",
    "m": "lũ, bọn, chúng, hàng xe, dãy xe, ví, so sánh"
  },
  "配": {
    "hv": "PHỐI",
    "on": "ハイ",
    "kun": "くば・る",
    "m": "kết hợp, giao hợp, pha, hoà"
  },
  "倍": {
    "hv": "BỘI",
    "on": "バイ",
    "kun": "—",
    "m": "gấp nhiều lần"
  },
  "培": {
    "hv": "BỒI",
    "on": "バイ",
    "kun": "つちか・う",
    "m": "vun xới, bón"
  },
  "媒": {
    "hv": "MÔI",
    "on": "バイ",
    "kun": "なこうど",
    "m": "người làm mối, môi giới"
  },
  "梅": {
    "hv": "MAI",
    "on": "バイ",
    "kun": "うめ",
    "m": "cây hoa mai"
  },
  "賠": {
    "hv": "BỒI",
    "on": "バイ",
    "kun": "—",
    "m": "đền bù, đền trả"
  },
  "陪": {
    "hv": "BỒI",
    "on": "バイ",
    "kun": "—",
    "m": "theo bên, tiếp khách"
  },
  "萩": {
    "hv": "THU",
    "on": "シュウ",
    "kun": "はぎ",
    "m": "một loài ngải"
  },
  "伯": {
    "hv": "BÁ",
    "on": "ハク",
    "kun": "—",
    "m": "bác ruột, anh của bố, tước Bá"
  },
  "剥": {
    "hv": "BÁC",
    "on": "ハク, ホク",
    "kun": "へ・ぐ, へず・る, む・く, む・ける, は・がれる, は・ぐ, は・げる, は・がす",
    "m": "bóc vỏ, lột"
  },
  "博": {
    "hv": "BÁC",
    "on": "ハク, バク",
    "kun": "—",
    "m": "rộng, thống suốt, đánh bạc"
  },
  "拍": {
    "hv": "PHÁCH",
    "on": "ハク, ヒョウ",
    "kun": "—",
    "m": "vỗ, đập, tát, vả"
  },
  "柏": {
    "hv": "BÁCH",
    "on": "ハク, ヒャク, ビャク",
    "kun": "かしわ",
    "m": "cây bách, cây tuyết tùng"
  },
  "泊": {
    "hv": "BẠC",
    "on": "ハク",
    "kun": "と・まる, と・める",
    "m": "ghé thuyền, đỗ thuyền, đạm bạc"
  },
  "白": {
    "hv": "BẠCH",
    "on": "ハク, ビャク",
    "kun": "しろ, しら-, しろ・い",
    "m": "trắng, màu trắng, bạc (tóc), sạch sẽ"
  },
  "粕": {
    "hv": "PHÁCH",
    "on": "ハク",
    "kun": "かす",
    "m": "(xem: tao phách 糟粕)"
  },
  "舶": {
    "hv": "BẠC",
    "on": "ハク",
    "kun": "—",
    "m": "thuyền lớn, thuyền lớn"
  },
  "薄": {
    "hv": "BẠC",
    "on": "ハク",
    "kun": "うす・い, うす-, -うす, うす・める, うす・まる, うす・らぐ, うす・ら-, うす・れる, すすき",
    "m": "mỏng manh, nhẹ, nhạt nhẽo"
  },
  "迫": {
    "hv": "BÁCH",
    "on": "ハク",
    "kun": "せま・る",
    "m": "gần, sát, bức bách, đè ép, thúc giục"
  },
  "漠": {
    "hv": "MẠC",
    "on": "バク",
    "kun": "—",
    "m": "sa mạc, thờ ơ, lạnh nhạt"
  },
  "爆": {
    "hv": "BỘC",
    "on": "バク",
    "kun": "は・ぜる",
    "m": "nổ, toé lửa"
  },
  "縛": {
    "hv": "PHƯỢC",
    "on": "バク",
    "kun": "しば・る",
    "m": "trói buộc, ràng buộc"
  },
  "麦": {
    "hv": "MẠCH",
    "on": "バク",
    "kun": "むぎ",
    "m": "lúa tẻ"
  },
  "函": {
    "hv": "HÀM",
    "on": "カン",
    "kun": "はこ, い・れる",
    "m": "cái tráp, bao, hộp, thư từ"
  },
  "箱": {
    "hv": "TƯƠNG",
    "on": "ソウ",
    "kun": "はこ",
    "m": "cái hòm, rương, vali"
  },
  "箸": {
    "hv": "TRỢ",
    "on": "チョ, チャク",
    "kun": "はし",
    "m": "cái đũa"
  },
  "肇": {
    "hv": "TRIỆU",
    "on": "チョウ, ジョウ, トウ",
    "kun": "はじ・める, はじめ",
    "m": "bắt đầu, phát sinh, sửa cho ngay, mưu loạn"
  },
  "幡": {
    "hv": "PHIÊN",
    "on": "マン, ハン, バン, ホン",
    "kun": "はた",
    "m": "cờ hiệu, lật mặt"
  },
  "肌": {
    "hv": "CƠ",
    "on": "キ",
    "kun": "はだ",
    "m": "bắp thịt"
  },
  "畑": {
    "hv": "[畑]",
    "on": "—",
    "kun": "はた, はたけ, -ばたけ",
    "m": "farm, field, garden"
  },
  "畠": {
    "hv": "TAI",
    "on": "—",
    "kun": "はたけ, はた",
    "m": "field, farm, garden"
  },
  "鉢": {
    "hv": "BÁT",
    "on": "ハチ, ハツ",
    "kun": "—",
    "m": "cái bát xin ăn của sư"
  },
  "髪": {
    "hv": "PHÁT",
    "on": "ハツ",
    "kun": "かみ",
    "m": "tóc, một phần nghìn của một tấc"
  },
  "伐": {
    "hv": "PHẠT",
    "on": "バツ, ハツ, カ, ボチ",
    "kun": "き・る, そむ・く, う・つ",
    "m": "chinh phạt, chặt"
  },
  "罰": {
    "hv": "PHẠT",
    "on": "バツ, バチ, ハツ",
    "kun": "ばっ・する",
    "m": "trừng phạt, hình phạt, đánh đập"
  },
  "抜": {
    "hv": "BẠT",
    "on": "バツ, ハツ, ハイ",
    "kun": "ぬ・く, -ぬ・く, ぬ・き, ぬ・ける, ぬ・かす, ぬ・かる",
    "m": "slip out, extract, pull out"
  },
  "閥": {
    "hv": "PHIỆT",
    "on": "バツ",
    "kun": "—",
    "m": "tờ ghi công trạng"
  },
  "鳩": {
    "hv": "CƯU",
    "on": "キュウ, ク",
    "kun": "はと, あつ・める",
    "m": "chim tu hú"
  },
  "噺": {
    "hv": "[噺]",
    "on": "—",
    "kun": "はなし",
    "m": "talk, (kokuji)"
  },
  "塙": {
    "hv": "XÁC",
    "on": "カク, コウ",
    "kun": "はなわ, かた・い",
    "m": "bền lâu, đúng, trúng, chính xác"
  },
  "隼": {
    "hv": "CHUẨN",
    "on": "シュン, ジュン",
    "kun": "はやぶさ",
    "m": "một loài chim cắt nhỏ"
  },
  "伴": {
    "hv": "BẠN",
    "on": "ハン, バン",
    "kun": "ともな・う",
    "m": "bạn bè, người đồng sự"
  },
  "判": {
    "hv": "PHÁN",
    "on": "ハン, バン",
    "kun": "わか・る",
    "m": "chia rẽ, phán quyết, sử kiện"
  },
  "半": {
    "hv": "BÁN",
    "on": "ハン",
    "kun": "なか・ば",
    "m": "một nửa, ở giữa, lưng chừng, nhỏ bé"
  },
  "反": {
    "hv": "PHIÊN",
    "on": "ハン, ホン, タン, ホ",
    "kun": "そ・る, そ・らす, かえ・す, かえ・る, -かえ・る",
    "m": "ngược, sai trái, trở lại"
  },
  "帆": {
    "hv": "PHÀM",
    "on": "ハン",
    "kun": "ほ",
    "m": "cánh buồm"
  },
  "搬": {
    "hv": "BAN",
    "on": "ハン",
    "kun": "—",
    "m": "trừ hết, dọn sạch, chuyển đi, dời đi, trừ hết, dọn sạch"
  },
  "斑": {
    "hv": "BAN",
    "on": "ハン",
    "kun": "ふ, まだら",
    "m": "lốm đốm, sắc lẫn lộn, có pha màu khác"
  },
  "板": {
    "hv": "BẢN",
    "on": "ハン, バン",
    "kun": "いた",
    "m": "tấm, miếng, gỗ đóng quan tài, cứng, rắn"
  },
  "氾": {
    "hv": "PHIẾM",
    "on": "ハン",
    "kun": "ひろ・がる",
    "m": "giàn giụa, mênh mông"
  },
  "汎": {
    "hv": "PHIẾM",
    "on": "ハン, ブ, フウ, ホウ, ホン",
    "kun": "ただよ・う, ひろ・い",
    "m": "phù phiếm, chèo thuyền"
  },
  "版": {
    "hv": "BẢN",
    "on": "ハン",
    "kun": "—",
    "m": "bản in, lần xuất bản"
  },
  "犯": {
    "hv": "PHẠM",
    "on": "ハン, ボン",
    "kun": "おか・す",
    "m": "xâm phạm, phạm phải, mắc phải, phạm nhân"
  },
  "班": {
    "hv": "BAN",
    "on": "ハン",
    "kun": "—",
    "m": "lớp học, ca làm việc, buổi làm việc, toán, tốp, đoàn"
  },
  "畔": {
    "hv": "BẠN",
    "on": "ハン",
    "kun": "あぜ, くろ, ほとり",
    "m": "bờ"
  },
  "繁": {
    "hv": "PHỒN",
    "on": "ハン",
    "kun": "しげ・る, しげ・く",
    "m": "nhiều, đông, sinh, đẻ"
  },
  "般": {
    "hv": "BAN",
    "on": "ハン",
    "kun": "—",
    "m": "quanh co, quay về, chủng loại"
  },
  "藩": {
    "hv": "PHIÊN",
    "on": "ハン",
    "kun": "—",
    "m": "bờ rào"
  },
  "販": {
    "hv": "PHIẾN",
    "on": "ハン",
    "kun": "—",
    "m": "mua rẻ bán đắt, buôn bán, mua rẻ bán đắt"
  },
  "範": {
    "hv": "PHẠM",
    "on": "ハン",
    "kun": "—",
    "m": "phép tắc, khuôn mẫu"
  },
  "煩": {
    "hv": "PHIỀN",
    "on": "ハン, ボン",
    "kun": "わずら・う, わずら・わす, うるさ・がる, うるさ・い",
    "m": "buồn rầu, phiền muộn"
  },
  "頒": {
    "hv": "BAN",
    "on": "ハン",
    "kun": "わ・かつ, わ・ける",
    "m": "ban bố ra, ban phát"
  },
  "飯": {
    "hv": "PHÃN",
    "on": "ハン",
    "kun": "めし",
    "m": "cơm, ăn cơm, cơm"
  },
  "番": {
    "hv": "PHIÊN",
    "on": "バン",
    "kun": "つが・い",
    "m": "khoẻ mạnh, phiên, lượt, lần, người Phiên"
  },
  "盤": {
    "hv": "BÀN",
    "on": "バン",
    "kun": "—",
    "m": "cái mâm, cái chậu"
  },
  "磐": {
    "hv": "BÀN",
    "on": "バン, ハン",
    "kun": "いわ",
    "m": "tảng đá lớn"
  },
  "蕃": {
    "hv": "PHIỀN",
    "on": "バン, ハン",
    "kun": "—",
    "m": "cỏ tốt, sinh sôi, nghỉ ngơi"
  },
  "蛮": {
    "hv": "MAN",
    "on": "バン",
    "kun": "えびす",
    "m": "thô lỗ, ngang ngạnh, rất, lắm"
  },
  "卑": {
    "hv": "TY",
    "on": "ヒ",
    "kun": "いや・しい, いや・しむ, いや・しめる",
    "m": "thấp, hèn kém"
  },
  "否": {
    "hv": "BĨ",
    "on": "ヒ",
    "kun": "いな, いや",
    "m": "khổ cực, một quẻ trong Kinh Dịch tượng trưng cho vận xấu, không"
  },
  "妃": {
    "hv": "PHI",
    "on": "ヒ",
    "kun": "きさき",
    "m": "phi (vợ vua), sánh đôi cùng nhau"
  },
  "彼": {
    "hv": "BỈ",
    "on": "ヒ",
    "kun": "かれ, かの, か・の",
    "m": "kia, nọ, phía bên kia, đối phương"
  },
  "悲": {
    "hv": "BI",
    "on": "ヒ",
    "kun": "かな・しい, かな・しむ",
    "m": "buồn, thương cảm"
  },
  "扉": {
    "hv": "PHI",
    "on": "ヒ",
    "kun": "とびら",
    "m": "cánh cửa"
  },
  "批": {
    "hv": "PHÊ",
    "on": "ヒ",
    "kun": "—",
    "m": "bán buôn, bán sỉ, phê phán, phê bình"
  },
  "披": {
    "hv": "PHI",
    "on": "ヒ",
    "kun": "—",
    "m": "cái giá kèm theo áo quan để khỏi nghiêng đổ, rẽ ra, vạch ra, mở ra, khoác áo"
  },
  "斐": {
    "hv": "PHỈ",
    "on": "ヒ, イ",
    "kun": "—",
    "m": "văn vẻ"
  },
  "比": {
    "hv": "BỈ",
    "on": "ヒ",
    "kun": "くら・べる",
    "m": "so sánh, đọ, bì, thi đua, ngang bằng, như"
  },
  "泌": {
    "hv": "BÍ",
    "on": "ヒツ, ヒ",
    "kun": "—",
    "m": "sông Bí"
  },
  "疲": {
    "hv": "BÌ",
    "on": "ヒ",
    "kun": "つか・れる, -づか・れ, つか・らす",
    "m": "mỏi mệt, mệt nhọc"
  },
  "皮": {
    "hv": "BÌ",
    "on": "ヒ",
    "kun": "かわ",
    "m": "da, bề ngoài, vỏ bọc"
  },
  "碑": {
    "hv": "BI",
    "on": "ヒ",
    "kun": "いしぶみ",
    "m": "cái bia, đài bia, cột mốc, ca tụng"
  },
  "秘": {
    "hv": "BÍ",
    "on": "ヒ",
    "kun": "ひ・める, ひそ・か, かく・す",
    "m": "bí mật, thần"
  },
  "緋": {
    "hv": "PHI",
    "on": "ヒ",
    "kun": "あけ, あか",
    "m": "lụa đào, lụa đỏ"
  },
  "罷": {
    "hv": "BÃI",
    "on": "ヒ",
    "kun": "まか・り-, や・める",
    "m": "ngừng, thôi, nghỉ, bãi, bỏ, xong"
  },
  "肥": {
    "hv": "PHÌ",
    "on": "ヒ",
    "kun": "こ・える, こえ, こ・やす, こ・やし, ふと・る",
    "m": "béo"
  },
  "被": {
    "hv": "BỊ",
    "on": "ヒ",
    "kun": "こうむ・る, おお・う, かぶ・る, かぶ・せる",
    "m": "áo ngủ, chăn, mền, phủ lấp, che kín"
  },
  "費": {
    "hv": "PHÍ",
    "on": "ヒ",
    "kun": "つい・やす, つい・える",
    "m": "chi phí, lệ phí, tiêu phí, phí phạm"
  },
  "避": {
    "hv": "TỴ",
    "on": "ヒ",
    "kun": "さ・ける, よ・ける",
    "m": "tránh né, lánh, trốn, phòng"
  },
  "非": {
    "hv": "PHI",
    "on": "ヒ",
    "kun": "あら・ず",
    "m": "không phải, châu Phi"
  },
  "飛": {
    "hv": "PHI",
    "on": "ヒ",
    "kun": "と・ぶ, と・ばす, -と・ばす",
    "m": "bay"
  },
  "樋": {
    "hv": "[樋]",
    "on": "トウ",
    "kun": "ひ, とい",
    "m": "water pipe, gutter, downspout"
  },
  "備": {
    "hv": "BỊ",
    "on": "ビ",
    "kun": "そな・える, そな・わる, つぶさ・に",
    "m": "có đủ, hoàn toàn, sửa soạn, sắp sẵn, đề phòng, phòng trước"
  },
  "尾": {
    "hv": "VĨ",
    "on": "ビ",
    "kun": "お",
    "m": "cái đuôi, theo sau"
  },
  "微": {
    "hv": "VY",
    "on": "ビ",
    "kun": "かす・か",
    "m": "nhỏ bé, nhạt (màu)"
  },
  "琵": {
    "hv": "TỲ",
    "on": "ビ, ヒ",
    "kun": "—",
    "m": "(xem: tỳ bà 琵琶)"
  },
  "眉": {
    "hv": "MY",
    "on": "ビ, ミ",
    "kun": "まゆ",
    "m": "lông mày"
  },
  "鼻": {
    "hv": "TỴ",
    "on": "ビ",
    "kun": "はな",
    "m": "cái mũi, khuyết, lỗ, núm"
  },
  "柊": {
    "hv": "CHUNG",
    "on": "シュ, シュウ",
    "kun": "ひいらぎ",
    "m": "holly"
  },
  "匹": {
    "hv": "THẤT",
    "on": "ヒツ",
    "kun": "ひき",
    "m": "tấm (vải), đơn lẻ"
  },
  "彦": {
    "hv": "NGẠN",
    "on": "ゲン",
    "kun": "ひこ",
    "m": "kẻ sĩ gồm cả tài đức"
  },
  "膝": {
    "hv": "TẤT",
    "on": "シツ",
    "kun": "ひざ",
    "m": "đầu gối"
  },
  "菱": {
    "hv": "LĂNG",
    "on": "リョウ",
    "kun": "ひし",
    "m": "cây ấu"
  },
  "肘": {
    "hv": "TRỬU",
    "on": "チュウ",
    "kun": "ひじ",
    "m": "khuỷu tay"
  },
  "必": {
    "hv": "TẤT",
    "on": "ヒツ",
    "kun": "かなら・ず",
    "m": "tất yếu, ắt, nhất định, cần phải"
  },
  "筆": {
    "hv": "BÚT",
    "on": "ヒツ",
    "kun": "ふで",
    "m": "cái bút (để viết), viết bằng bút, nét trong chữ Hán"
  },
  "桧": {
    "hv": "CỐI",
    "on": "カイ",
    "kun": "ひのき, ひ",
    "m": "cây cối (một loài thông), nước cối"
  },
  "姫": {
    "hv": "CƠ",
    "on": "キ",
    "kun": "ひめ, ひめ-",
    "m": "tiếng gọi đàn bà quý phái"
  },
  "媛": {
    "hv": "VIÊN",
    "on": "エン",
    "kun": "ひめ",
    "m": "con gái đẹp, con gái đẹp"
  },
  "俵": {
    "hv": "BIỂU",
    "on": "ヒョウ",
    "kun": "たわら",
    "m": "ban phát, phân chia"
  },
  "彪": {
    "hv": "BƯU",
    "on": "ヒョウ, ヒュウ",
    "kun": "あや",
    "m": "vằn con hổ, con hổ con"
  },
  "標": {
    "hv": "TIÊU",
    "on": "ヒョウ",
    "kun": "しるべ, しるし",
    "m": "ngọn nguồn, cái nêu, nêu lên"
  },
  "氷": {
    "hv": "BĂNG",
    "on": "ヒョウ",
    "kun": "こおり, ひ, こお・る",
    "m": "nước đá, băng, lạnh, buốt, ướp lạnh"
  },
  "漂": {
    "hv": "PHIẾU",
    "on": "ヒョウ",
    "kun": "ただよ・う",
    "m": "trôi nổi, tẩy vải cho trắng, thanh lịch, lịch sự"
  },
  "票": {
    "hv": "PHIÊU",
    "on": "ヒョウ",
    "kun": "—",
    "m": "nhẹ nhàng, nhanh nhẹn, tấm vé, tem, phiếu"
  },
  "表": {
    "hv": "BIỂU",
    "on": "ヒョウ",
    "kun": "おもて, -おもて, あらわ・す, あらわ・れる, あら・わす",
    "m": "bên ngoài, tỏ rõ, tuyên bố, tiêu biểu, tờ biểu"
  },
  "評": {
    "hv": "BÌNH",
    "on": "ヒョウ",
    "kun": "—",
    "m": "phê bình, bình phẩm"
  },
  "廟": {
    "hv": "MIẾU",
    "on": "ビョウ, ミョウ",
    "kun": "たまや, みたまや, やしろ",
    "m": "cái miếu thờ"
  },
  "描": {
    "hv": "MIÊU",
    "on": "ビョウ",
    "kun": "えが・く, か・く",
    "m": "phỏng vẽ, miêu tả"
  },
  "苗": {
    "hv": "MIÊU",
    "on": "ビョウ, ミョウ",
    "kun": "なえ, なわ-",
    "m": "lúa mạch, lúa non, mầm"
  },
  "蛭": {
    "hv": "ĐIỆT",
    "on": "シツ, チツ",
    "kun": "ひる",
    "m": "con đỉa"
  },
  "品": {
    "hv": "PHẨM",
    "on": "ヒン, ホン",
    "kun": "しな",
    "m": "đồ vật, chủng loại, phẩm hàm, hạng quan, hạng, cấp"
  },
  "彬": {
    "hv": "BÂN",
    "on": "ヒン, フン",
    "kun": "うるわ・しい, あき・らか",
    "m": "vẻ đẹp mộc mạc"
  },
  "浜": {
    "hv": "BANH",
    "on": "ヒン",
    "kun": "はま",
    "m": "kênh cho tàu bè đỗ"
  },
  "瀕": {
    "hv": "TẦN",
    "on": "ヒン",
    "kun": "ほとり",
    "m": "gần, bên cạnh, sắp, chuẩn bị, đất gần nước"
  },
  "貧": {
    "hv": "BẦN",
    "on": "ヒン, ビン",
    "kun": "まず・しい",
    "m": "nghèo"
  },
  "賓": {
    "hv": "TÂN",
    "on": "ヒン",
    "kun": "まろうど, したがう",
    "m": "khách quý"
  },
  "頻": {
    "hv": "TẦN",
    "on": "ヒン",
    "kun": "しき・りに",
    "m": "thường, sự lặp lại"
  },
  "敏": {
    "hv": "MẪN",
    "on": "ビン",
    "kun": "さとい",
    "m": "nhanh nhẹn, sáng suốt, ngón chân cái"
  },
  "瓶": {
    "hv": "BÌNH",
    "on": "ビン, ヘイ",
    "kun": "かめ",
    "m": "cái bình, cái lọ"
  },
  "不": {
    "hv": "BẤT",
    "on": "フ, ブ",
    "kun": "—",
    "m": "không, chẳng"
  },
  "付": {
    "hv": "PHÓ",
    "on": "フ",
    "kun": "つ・ける, -つ・ける, -づ・ける, つ・け, つ・け-, -つ・け, -づ・け, -づけ, つ・く, -づ・く, つ・き, -つ・き, -つき, -づ・き, -づき",
    "m": "giao phó"
  },
  "夫": {
    "hv": "PHU",
    "on": "フ, フウ, ブ",
    "kun": "おっと, それ",
    "m": "chồng, đàn ông, (thán từ dùng để bắt đầu hoặc kết thúc câu)"
  },
  "婦": {
    "hv": "PHỤ",
    "on": "フ",
    "kun": "よめ",
    "m": "đàn bà, vợ"
  },
  "富": {
    "hv": "PHÚ",
    "on": "フ, フウ",
    "kun": "と・む, とみ",
    "m": "giàu có, dồi dào"
  },
  "冨": {
    "hv": "PHÚ",
    "on": "フ, フウ",
    "kun": "と・む, とみ",
    "m": "giàu có, dồi dào"
  },
  "布": {
    "hv": "BỐ",
    "on": "フ, ホ",
    "kun": "ぬの, し・く, きれ",
    "m": "vải vóc, bày ra"
  },
  "府": {
    "hv": "PHỦ",
    "on": "フ",
    "kun": "—",
    "m": "mình, ta (ngôi thứ nhất), phủ (đơn vị hành chính), phủ quan"
  },
  "怖": {
    "hv": "BỐ",
    "on": "フ, ホ",
    "kun": "こわ・い, こわ・がる, お・じる, おそ・れる",
    "m": "sợ hãi, doạ nạt, sợ hãi"
  },
  "扶": {
    "hv": "PHÙ",
    "on": "フ",
    "kun": "たす・ける",
    "m": "nâng đỡ, giúp đỡ"
  },
  "敷": {
    "hv": "PHU",
    "on": "フ",
    "kun": "し・く, -し・き",
    "m": "bày, mở rộng ra"
  },
  "普": {
    "hv": "PHỔ",
    "on": "フ",
    "kun": "あまね・く, あまねし",
    "m": "rộng, lớn, khắp"
  },
  "浮": {
    "hv": "PHÙ",
    "on": "フ",
    "kun": "う・く, う・かれる, う・かぶ, う・かべる",
    "m": "nổi"
  },
  "符": {
    "hv": "BỒ",
    "on": "フ",
    "kun": "—",
    "m": "phù hiệu, thẻ bài, cái bùa trừ ma, phù hiệu, thẻ bài"
  },
  "腐": {
    "hv": "HỦ",
    "on": "フ",
    "kun": "くさ・る, -くさ・る, くさ・れる, くさ・れ, くさ・らす, くさ・す",
    "m": "rữa, nát, thối, mục, đậu phụ"
  },
  "膚": {
    "hv": "PHU",
    "on": "フ",
    "kun": "はだ",
    "m": "da ngoài, ở ngoài vào, to lớn"
  },
  "芙": {
    "hv": "PHÙ",
    "on": "フ",
    "kun": "—",
    "m": "(xem: phù dung 芙蓉)"
  },
  "譜": {
    "hv": "PHẢ",
    "on": "フ",
    "kun": "—",
    "m": "phả chép phân chia thứ tự, khúc nhạc, phả chép phân chia thứ tự"
  },
  "負": {
    "hv": "PHỤ",
    "on": "フ",
    "kun": "ま・ける, ま・かす, お・う",
    "m": "cậy thế, ỷ thế người khác, vác, cõng, làm trái ngược"
  },
  "賦": {
    "hv": "PHÚ",
    "on": "フ, ブ",
    "kun": "—",
    "m": "cho, ban cho, thuế, bài phú"
  },
  "赴": {
    "hv": "PHÓ",
    "on": "フ",
    "kun": "おもむ・く",
    "m": "đi đến, đến nơi"
  },
  "阜": {
    "hv": "PHỤ",
    "on": "フ, フウ",
    "kun": "—",
    "m": "gò đất, to lớn, béo"
  },
  "附": {
    "hv": "PHỤ",
    "on": "フ",
    "kun": "つ・ける, つ・く",
    "m": "bám, nương cậy, phụ thêm, góp vào"
  },
  "侮": {
    "hv": "VŨ",
    "on": "ブ",
    "kun": "あなど・る, あなず・る",
    "m": "khinh nhờn, kẻ lấn áp"
  },
  "撫": {
    "hv": "PHỦ",
    "on": "ブ, フ",
    "kun": "な・でる",
    "m": "phủ dụ"
  },
  "武": {
    "hv": "VÕ",
    "on": "ブ, ム",
    "kun": "たけ, たけ・し",
    "m": "võ thuật, quân sự, võ thuật"
  },
  "舞": {
    "hv": "VŨ",
    "on": "ブ",
    "kun": "ま・う, -ま・う, まい",
    "m": "múa"
  },
  "部": {
    "hv": "BỘ",
    "on": "ブ",
    "kun": "-べ",
    "m": "bộ, khoa, ngành, ban, bộ (sách, phim,...)"
  },
  "封": {
    "hv": "PHONG",
    "on": "フウ, ホウ",
    "kun": "—",
    "m": "bì đóng kín, đậy lại, phong cấp"
  },
  "楓": {
    "hv": "PHONG",
    "on": "フウ",
    "kun": "かえで",
    "m": "cây phong"
  },
  "蕗": {
    "hv": "[蕗]",
    "on": "ロ, ル",
    "kun": "ふき",
    "m": "butterbur, bog rhubarb"
  },
  "伏": {
    "hv": "PHỤC",
    "on": "フク",
    "kun": "ふ・せる, ふ・す",
    "m": "áp mặt vào, ẩn nấp, bái phục, tuân theo"
  },
  "副": {
    "hv": "PHÓ",
    "on": "フク",
    "kun": "—",
    "m": "phụ, phó, thứ 2"
  },
  "復": {
    "hv": "PHÚC",
    "on": "フク",
    "kun": "また",
    "m": "khôi phục, phục hồi, trở lại, làm lại, lặp lại"
  },
  "幅": {
    "hv": "BỨC",
    "on": "フク",
    "kun": "はば",
    "m": "khổ rộng của vải, bức, tấm (từ dùng để đếm số vải)"
  },
  "服": {
    "hv": "PHỤC",
    "on": "フク",
    "kun": "—",
    "m": "quần áo, phục tùng, phục dịch, làm việc"
  },
  "福": {
    "hv": "PHÚC",
    "on": "フク",
    "kun": "—",
    "m": "phúc, may mắn"
  },
  "腹": {
    "hv": "PHÚC",
    "on": "フク",
    "kun": "はら",
    "m": "bụng"
  },
  "複": {
    "hv": "PHỨC",
    "on": "フク",
    "kun": "—",
    "m": "áo kép, kép, ghép, phức"
  },
  "覆": {
    "hv": "PHÚC",
    "on": "フク",
    "kun": "おお・う, くつがえ・す, くつがえ・る",
    "m": "che, đậy, lật lại, đổ, dốc"
  },
  "淵": {
    "hv": "UYÊN",
    "on": "エン, カク, コウ",
    "kun": "ふち, かた・い, はなわ",
    "m": "vực sâu"
  },
  "払": {
    "hv": "BẬT",
    "on": "フツ, ヒツ, ホツ",
    "kun": "はら・う, -はら・い, -ばら・い",
    "m": "pay, clear out, prune"
  },
  "沸": {
    "hv": "PHÍ",
    "on": "フツ",
    "kun": "わ・く, わ・かす",
    "m": "sôi (nước)"
  },
  "仏": {
    "hv": "PHẬT",
    "on": "ブツ, フツ",
    "kun": "ほとけ",
    "m": "đức Phật, đạo Phật, Phật giáo"
  },
  "噴": {
    "hv": "PHÚN",
    "on": "フン",
    "kun": "ふ・く",
    "m": "phun, vọt, phì ra, xì ra"
  },
  "墳": {
    "hv": "PHẦN",
    "on": "フン",
    "kun": "—",
    "m": "mồ mả"
  },
  "憤": {
    "hv": "PHẪN",
    "on": "フン",
    "kun": "いきどお・る",
    "m": "tức giận, cáu"
  },
  "奮": {
    "hv": "PHẤN",
    "on": "フン",
    "kun": "ふる・う",
    "m": "chim dang cánh bay, hăng say, ráng sức, phấn khích"
  },
  "粉": {
    "hv": "PHẤN",
    "on": "フン",
    "kun": "デシメートル, こ, こな",
    "m": "bột, phấn, son phấn"
  },
  "糞": {
    "hv": "PHÂN",
    "on": "フン",
    "kun": "くそ",
    "m": "phân, cứt, bón phân, phân, cứt"
  },
  "紛": {
    "hv": "PHÂN",
    "on": "フン",
    "kun": "まぎ・れる, -まぎ・れ, まぎ・らす, まぎ・らわす, まぎ・らわしい",
    "m": "rối rắm"
  },
  "雰": {
    "hv": "PHÂN",
    "on": "フン",
    "kun": "—",
    "m": "khí sương mù"
  },
  "丙": {
    "hv": "BÍNH",
    "on": "ヘイ",
    "kun": "ひのえ",
    "m": "Bính (ngôi thứ 3 của hàng Can)"
  },
  "併": {
    "hv": "TÍNH",
    "on": "ヘイ",
    "kun": "あわ・せる",
    "m": "hợp lại, gộp lại, dồn lại, chặt, ăn (cờ)"
  },
  "兵": {
    "hv": "BINH",
    "on": "ヘイ, ヒョウ",
    "kun": "つわもの",
    "m": "vũ khí, quân lính, quân sự"
  },
  "塀": {
    "hv": "BÍNH",
    "on": "ヘイ, ベイ",
    "kun": "—",
    "m": "fence, wall, (kokuji)"
  },
  "幣": {
    "hv": "TỆ",
    "on": "ヘイ",
    "kun": "ぬさ",
    "m": "vải lụa, tiền"
  },
  "平": {
    "hv": "BÌNH",
    "on": "ヘイ, ビョウ, ヒョウ",
    "kun": "たい・ら, たい・らげる, ひら",
    "m": "bằng, âm bằng"
  },
  "弊": {
    "hv": "TỆ",
    "on": "ヘイ",
    "kun": "—",
    "m": "giả mạo, dối trá, có hại"
  },
  "柄": {
    "hv": "BÍNH",
    "on": "ヘイ",
    "kun": "がら, え, つか",
    "m": "cán, báng, tay cầm, người cầm quyền"
  },
  "並": {
    "hv": "TINH",
    "on": "ヘイ, ホウ",
    "kun": "な・み, なみ, なら・べる, なら・ぶ, なら・びに",
    "m": "hợp, gồm, châu Tinh (Trung Quốc), bằng nhau, ngang nhau, đều"
  },
  "蔽": {
    "hv": "TẾ",
    "on": "ヘイ, ヘツ, フツ",
    "kun": "おお・う, おお・い",
    "m": "che lấp"
  },
  "陛": {
    "hv": "BỆ",
    "on": "ヘイ",
    "kun": "—",
    "m": "sân hè"
  },
  "米": {
    "hv": "MỄ",
    "on": "ベイ, マイ, メエトル",
    "kun": "こめ, よね",
    "m": "gạo, mét (đơn vị đo chiều dài)"
  },
  "壁": {
    "hv": "BÍCH",
    "on": "ヘキ",
    "kun": "かべ",
    "m": "bức tường, bức vách, thành, dựng đứng, thẳng đứng, sao Bích (một trong Nhị thập bát tú)"
  },
  "癖": {
    "hv": "TÍCH",
    "on": "ヘキ",
    "kun": "くせ, くせ・に",
    "m": "bệnh hòn (tích thành hòn trong bụng)"
  },
  "碧": {
    "hv": "BÍCH",
    "on": "ヘキ, ヒャク",
    "kun": "—",
    "m": "màu xanh biếc, ngọc bích"
  },
  "別": {
    "hv": "BIỆT",
    "on": "ベツ",
    "kun": "わか・れる, わ・ける",
    "m": "chia tay, xa cách, khác biệt, quay, ngoảnh, chuyển"
  },
  "蔑": {
    "hv": "MIỆT",
    "on": "ベツ",
    "kun": "ないがしろ, なみ・する, くらい, さげす・む",
    "m": "máu bẩn, tất (đi vào chân)"
  },
  "偏": {
    "hv": "THIÊN",
    "on": "ヘン",
    "kun": "かたよ・る",
    "m": "nghiêng, lệch, vẫn, cứ, lại, không ngờ, chẳng may"
  },
  "変": {
    "hv": "BIẾN",
    "on": "ヘン",
    "kun": "か・わる, か・わり, か・える",
    "m": "unusual, change, strange"
  },
  "片": {
    "hv": "PHIẾN",
    "on": "ヘン",
    "kun": "かた-, かた",
    "m": "tấm"
  },
  "篇": {
    "hv": "THIÊN",
    "on": "ヘン",
    "kun": "—",
    "m": "thiên (sách)"
  },
  "編": {
    "hv": "BIÊN",
    "on": "ヘン",
    "kun": "あ・む, -あ・み",
    "m": "đan, bện, tết, sắp xếp, tổ chức, biên soạn, biên tập"
  },
  "辺": {
    "hv": "BIÊN",
    "on": "ヘン",
    "kun": "あた・り, ほと・り, -べ",
    "m": "bên, phía, bờ, rịa, ven, mép, vệ, viền, cạnh, biên giới"
  },
  "返": {
    "hv": "PHIÊN",
    "on": "ヘン",
    "kun": "かえ・す, -かえ・す, かえ・る, -かえ・る",
    "m": "ngược, sai trái, trở lại"
  },
  "遍": {
    "hv": "BIẾN",
    "on": "ヘン",
    "kun": "あまね・く",
    "m": "khắp nơi, lần, lượt, bận"
  },
  "便": {
    "hv": "TIỆN",
    "on": "ベン, ビン",
    "kun": "たよ・り",
    "m": "thuận lợi, thuận tiện, ỉa, đái, phân, nước giải"
  },
  "弁": {
    "hv": "BIỆN",
    "on": "ベン, ヘン",
    "kun": "かんむり, わきま・える, わ・ける, はなびら, あらそ・う",
    "m": "mũ lớn của quan văn và quan võ"
  },
  "舗": {
    "hv": "PHÔ",
    "on": "ホ",
    "kun": "—",
    "m": "shop, store, pave"
  },
  "捕": {
    "hv": "BỘ",
    "on": "ホ",
    "kun": "と・らえる, と・らわれる, と・る, とら・える, とら・われる, つか・まえる, つか・まる",
    "m": "bắt"
  },
  "甫": {
    "hv": "PHỦ",
    "on": "ホ, フ",
    "kun": "はじ・めて",
    "m": "(tiếng mỹ xưng của đàn ông)"
  },
  "補": {
    "hv": "BỔ",
    "on": "ホ",
    "kun": "おぎな・う",
    "m": "thêm vào, chắp, vá, bổ (thuốc)"
  },
  "輔": {
    "hv": "PHỤ",
    "on": "ホ, フ",
    "kun": "たす・ける",
    "m": "xương má, giúp đỡ, giáp, gần kề"
  },
  "穂": {
    "hv": "TOẠI",
    "on": "スイ",
    "kun": "ほ",
    "m": "ear, ear (grain), head"
  },
  "募": {
    "hv": "MỘ",
    "on": "ボ",
    "kun": "つの・る",
    "m": "tuyển mộ"
  },
  "墓": {
    "hv": "MỘ",
    "on": "ボ",
    "kun": "はか",
    "m": "nấm mồ, ngôi mộ"
  },
  "慕": {
    "hv": "MỘ",
    "on": "ボ",
    "kun": "した・う",
    "m": "yêu mến"
  },
  "暮": {
    "hv": "MỘ",
    "on": "ボ",
    "kun": "く・れる, く・らす",
    "m": "buổi chiều tối"
  },
  "簿": {
    "hv": "BẠ",
    "on": "ボ",
    "kun": "—",
    "m": "sổ sách, sổ sách"
  },
  "菩": {
    "hv": "BỒ",
    "on": "ボ",
    "kun": "—",
    "m": "người tốt bụng"
  },
  "倣": {
    "hv": "PHỎNG",
    "on": "ホウ",
    "kun": "なら・う",
    "m": "bắt chước, làm theo, làm giống"
  },
  "俸": {
    "hv": "BỔNG",
    "on": "ホウ",
    "kun": "—",
    "m": "bổng lộc"
  },
  "包": {
    "hv": "BAO",
    "on": "ホウ",
    "kun": "つつ・む, くる・む",
    "m": "bao, túi, gói, bao bọc, vây quanh, quây quanh"
  },
  "呆": {
    "hv": "NGAI",
    "on": "ホウ",
    "kun": "ほけ・る, ぼ・ける, あき・れる, おろか",
    "m": "ngây ngô, ngớ ngẩn, ngu đần, ngây ngô, ngớ ngẩn, ngu đần"
  },
  "奉": {
    "hv": "PHỤNG",
    "on": "ホウ, ブ",
    "kun": "たてまつ・る, まつ・る, ほう・ずる",
    "m": "vâng chịu"
  },
  "宝": {
    "hv": "BẢO",
    "on": "ホウ",
    "kun": "たから",
    "m": "quý giá, quý giá"
  },
  "峰": {
    "hv": "PHONG",
    "on": "ホウ",
    "kun": "みね, ね",
    "m": "đỉnh núi, cái bướu"
  },
  "峯": {
    "hv": "PHONG",
    "on": "ホウ",
    "kun": "みね, ね",
    "m": "đỉnh núi, cái bướu"
  },
  "崩": {
    "hv": "BĂNG",
    "on": "ホウ",
    "kun": "くず・れる, -くず・れ, くず・す",
    "m": "núi lở, đổ, vỡ, gãy, vua chết"
  },
  "抱": {
    "hv": "BÃO",
    "on": "ホウ",
    "kun": "だ・く, いだ・く, かか・える",
    "m": "ôm ấp, bế, ấp ủ, vừa khít, khớp"
  },
  "捧": {
    "hv": "BỔNG",
    "on": "ホウ",
    "kun": "ささ・げる",
    "m": "nâng bổng, nhấc bổng, bưng, mang"
  },
  "放": {
    "hv": "PHÓNG",
    "on": "ホウ",
    "kun": "はな・す, -っぱな・し, はな・つ, はな・れる, こ・く, ほう・る",
    "m": "phóng, phi (ngựa)"
  },
  "方": {
    "hv": "PHƯƠNG",
    "on": "ホウ",
    "kun": "かた, -かた, -がた",
    "m": "phía, vuông, hình vuông, trái lời, không tuân theo"
  },
  "朋": {
    "hv": "BẰNG",
    "on": "ホウ",
    "kun": "とも",
    "m": "bạn bè"
  },
  "泡": {
    "hv": "BÀO",
    "on": "ホウ",
    "kun": "あわ",
    "m": "ngâm nước, bọt nước, bong bóng"
  },
  "砲": {
    "hv": "PHÁO",
    "on": "ホウ",
    "kun": "—",
    "m": "máy bắn đá, pháo, mìn"
  },
  "縫": {
    "hv": "PHÙNG",
    "on": "ホウ",
    "kun": "ぬ・う",
    "m": "may áo"
  },
  "胞": {
    "hv": "BÀO",
    "on": "ホウ",
    "kun": "—",
    "m": "vật tròn có vỏ bọc ngoài, bao bọc"
  },
  "芳": {
    "hv": "PHƯƠNG",
    "on": "ホウ",
    "kun": "かんば・しい",
    "m": "thơm ngát"
  },
  "萌": {
    "hv": "MANH",
    "on": "ホウ",
    "kun": "も・える, きざ・す, めばえ, きざ・し",
    "m": "mầm cỏ, bừa cỏ"
  },
  "蜂": {
    "hv": "PHONG",
    "on": "ホウ",
    "kun": "はち",
    "m": "con ong, đông, nhiều"
  },
  "褒": {
    "hv": "BAO",
    "on": "ホウ",
    "kun": "ほ・める",
    "m": "khen ngợi, biểu dương, áo rộng"
  },
  "訪": {
    "hv": "PHÓNG",
    "on": "ホウ",
    "kun": "おとず・れる, たず・ねる, と・う",
    "m": "thăm viếng, hỏi thăm, dò xét, thăm viếng, hỏi thăm"
  },
  "豊": {
    "hv": "PHONG",
    "on": "ホウ, ブ",
    "kun": "ゆた・か, とよ",
    "m": "đầy, thịnh, được mùa"
  },
  "邦": {
    "hv": "BANG",
    "on": "ホウ",
    "kun": "くに",
    "m": "bang, nước"
  },
  "飽": {
    "hv": "BÃO",
    "on": "ホウ",
    "kun": "あ・きる, あ・かす, あ・く",
    "m": "no bụng, hạt gạo mẩy, đủ, nhiều, từng trải"
  },
  "鳳": {
    "hv": "PHƯỢNG",
    "on": "ホウ, フウ",
    "kun": "—",
    "m": "chim phượng hoàng (con đực), chim phượng hoàng (con đực)"
  },
  "鵬": {
    "hv": "BẰNG",
    "on": "ホウ",
    "kun": "おおとり",
    "m": "chim đại bàng"
  },
  "乏": {
    "hv": "PHẠP",
    "on": "ボウ",
    "kun": "とぼ・しい, とも・しい",
    "m": "thiếu, không đủ"
  },
  "亡": {
    "hv": "VONG",
    "on": "ボウ, モウ",
    "kun": "な・い, な・き-, ほろ・びる, ほろ・ぶ, ほろ・ぼす",
    "m": "mất đi, chết, mất"
  },
  "傍": {
    "hv": "BÀNG",
    "on": "ボウ",
    "kun": "かたわ・ら, わき, おか-, はた, そば",
    "m": "một bên, bên cạnh, một bên"
  },
  "剖": {
    "hv": "PHẪU",
    "on": "ボウ",
    "kun": "—",
    "m": "mổ, giải phẫu, trình bày rõ ràng"
  },
  "坊": {
    "hv": "PHƯỜNG",
    "on": "ボウ, ボッ",
    "kun": "—",
    "m": "phường hội, cái đê ngăn nước"
  },
  "妨": {
    "hv": "PHƯƠNG",
    "on": "ボウ",
    "kun": "さまた・げる",
    "m": "hại, trở ngại, ngăn trở"
  },
  "帽": {
    "hv": "MẠO",
    "on": "ボウ, モウ",
    "kun": "ずきん, おお・う",
    "m": "nón, mũ"
  },
  "忘": {
    "hv": "VONG",
    "on": "ボウ",
    "kun": "わす・れる",
    "m": "quên"
  },
  "房": {
    "hv": "PHÒNG",
    "on": "ボウ",
    "kun": "ふさ",
    "m": "căn phòng"
  },
  "暴": {
    "hv": "BẠO",
    "on": "ボウ, バク",
    "kun": "あば・く, あば・れる",
    "m": "giông bão, to, mạnh, tàn ác"
  },
  "望": {
    "hv": "VỌNG",
    "on": "ボウ, モウ",
    "kun": "のぞ・む, もち",
    "m": "trông ngóng, xem, mong ước, ngày rằm"
  },
  "某": {
    "hv": "MỖ",
    "on": "ボウ",
    "kun": "それがし, なにがし",
    "m": "(dùng làm tiếng đệm khi xưng hô)"
  },
  "棒": {
    "hv": "BỔNG",
    "on": "ボウ",
    "kun": "—",
    "m": "cái gậy ngắn, côn, cừ, giỏi"
  },
  "冒": {
    "hv": "MẠO",
    "on": "ボウ",
    "kun": "おか・す",
    "m": "xông lên, hấp tấp, giả mạo"
  },
  "紡": {
    "hv": "PHƯỞNG",
    "on": "ボウ",
    "kun": "つむ・ぐ",
    "m": "xe thành sợi"
  },
  "肪": {
    "hv": "PHƯƠNG",
    "on": "ボウ",
    "kun": "—",
    "m": "mỡ lá"
  },
  "膨": {
    "hv": "BÀNH",
    "on": "ボウ",
    "kun": "ふく・らむ, ふく・れる",
    "m": "(xem: bành hanh 膨脝)"
  },
  "謀": {
    "hv": "MƯU",
    "on": "ボウ, ム",
    "kun": "はか・る, たばか・る, はかりごと",
    "m": "lo liệu"
  },
  "貌": {
    "hv": "MẠO",
    "on": "ボウ, バク",
    "kun": "かたち, かたどる",
    "m": "vẻ ngoài, sắc mặt"
  },
  "貿": {
    "hv": "MẬU",
    "on": "ボウ",
    "kun": "—",
    "m": "mậu dịch, trao đổi"
  },
  "鉾": {
    "hv": "MÂU",
    "on": "ボウ, ム",
    "kun": "ほこ",
    "m": "halberd, arms, festival float"
  },
  "防": {
    "hv": "PHÒNG",
    "on": "ボウ",
    "kun": "ふせ・ぐ",
    "m": "phòng ngừa, giữ gìn, cái đê ngăn nước"
  },
  "頬": {
    "hv": "GIÁP",
    "on": "キョウ",
    "kun": "ほお, ほほ",
    "m": "cheeks, jaw"
  },
  "僕": {
    "hv": "BỘC",
    "on": "ボク",
    "kun": "しもべ",
    "m": "người đầy tớ, người cầm cương ngựa"
  },
  "墨": {
    "hv": "MẶC",
    "on": "ボク",
    "kun": "すみ",
    "m": "mực viết"
  },
  "撲": {
    "hv": "PHÁC",
    "on": "ボク",
    "kun": "—",
    "m": "đánh, dập tắt, đánh trượng, phẩy qua"
  },
  "朴": {
    "hv": "PHÁC",
    "on": "ボク",
    "kun": "ほう, ほお, えのき",
    "m": "cây phác (vỏ dùng làm thuốc), chất phác"
  },
  "牧": {
    "hv": "MỤC",
    "on": "ボク",
    "kun": "まき",
    "m": "chăn nuôi, người chăn gia súc"
  },
  "睦": {
    "hv": "MỤC",
    "on": "ボク, モク",
    "kun": "むつ・まじい, むつ・む, むつ・ぶ",
    "m": "hoà kính, tin, thân"
  },
  "勃": {
    "hv": "BỘT",
    "on": "ボツ, ホツ",
    "kun": "おこ・る, にわかに",
    "m": "đột nhiên, bừng bừng, ùn ùn"
  },
  "没": {
    "hv": "MỘT",
    "on": "ボツ, モツ",
    "kun": "おぼ・れる, しず・む, ない",
    "m": "chìm mất, lặn (mặt trời), không"
  },
  "堀": {
    "hv": "QUẬT",
    "on": "クツ",
    "kun": "ほり",
    "m": "cao ngất"
  },
  "幌": {
    "hv": "HOẢNG",
    "on": "コウ",
    "kun": "ほろ, とばり",
    "m": "cái màn dũng"
  },
  "奔": {
    "hv": "BÔN",
    "on": "ホン",
    "kun": "はし・る",
    "m": "lồng lên, chạy vội, thua chạy, chạy trốn, vội vàng"
  },
  "翻": {
    "hv": "PHIÊN",
    "on": "ホン, ハン",
    "kun": "ひるがえ・る, ひるがえ・す",
    "m": "lật lại, phiên dịch từ tiếng này sang tiếng khác"
  },
  "凡": {
    "hv": "PHÀM",
    "on": "ボン, ハン",
    "kun": "およ・そ, おうよ・そ, すべ・て",
    "m": "thường, bình thường, tục, đại khái, chung"
  },
  "盆": {
    "hv": "BỒN",
    "on": "ボン",
    "kun": "—",
    "m": "cái chậu sành"
  },
  "摩": {
    "hv": "MA",
    "on": "マ",
    "kun": "ま・する, さす・る, す・る",
    "m": "xoa, xát"
  },
  "磨": {
    "hv": "MA",
    "on": "マ",
    "kun": "みが・く, す・る",
    "m": "mài, xay (gạo)"
  },
  "魔": {
    "hv": "MA",
    "on": "マ",
    "kun": "—",
    "m": "ma quỷ"
  },
  "麻": {
    "hv": "MA",
    "on": "マ, マア",
    "kun": "あさ",
    "m": "cây gai"
  },
  "埋": {
    "hv": "MAI",
    "on": "マイ",
    "kun": "う・める, う・まる, う・もれる, うず・める, うず・まる, い・ける",
    "m": "chôn, vùi, che lấp"
  },
  "妹": {
    "hv": "MUỘI",
    "on": "マイ",
    "kun": "いもうと",
    "m": "em gái"
  },
  "昧": {
    "hv": "MUỘI",
    "on": "マイ, バイ",
    "kun": "くら・い, むさぼ・る",
    "m": "mờ mờ, tối tăm, ngu dốt"
  },
  "枚": {
    "hv": "MAI",
    "on": "マイ, バイ",
    "kun": "—",
    "m": "cây, quả, trái, cái núm quả chuông"
  },
  "槙": {
    "hv": "ĐIÊN",
    "on": "テン, シン",
    "kun": "まき, こずえ",
    "m": "twig, ornamental evergreen"
  },
  "幕": {
    "hv": "MÁN",
    "on": "マク, バク",
    "kun": "とばり",
    "m": "mặt trái của đồng tiền, cái màn che trên sân khấu"
  },
  "膜": {
    "hv": "MÔ",
    "on": "マク",
    "kun": "—",
    "m": "màng da, cúng bái, màng da"
  },
  "枕": {
    "hv": "CHẨM",
    "on": "チン, シン",
    "kun": "まくら",
    "m": "xương trong óc cá, cái gối đầu"
  },
  "柾": {
    "hv": "CỮU",
    "on": "—",
    "kun": "まさ, まさめ, まさき",
    "m": "straight grain, spindle tree, (kokuji)"
  },
  "鱒": {
    "hv": "TÔN",
    "on": "ソン, セン, ザン",
    "kun": "ます",
    "m": "cá chầy, cá rói"
  },
  "桝": {
    "hv": "[桝]",
    "on": "—",
    "kun": "ます",
    "m": "measuring box, (kokuji)"
  },
  "亦": {
    "hv": "DIỆC",
    "on": "エキ, ヤク",
    "kun": "また",
    "m": "cũng, lại"
  },
  "俣": {
    "hv": "VŨ",
    "on": "—",
    "kun": "また",
    "m": "cao lớn, to lớn"
  },
  "又": {
    "hv": "HỰU",
    "on": "ユウ",
    "kun": "また, また-, また・の-",
    "m": "cũng, lại còn"
  },
  "抹": {
    "hv": "MẠT",
    "on": "マツ",
    "kun": "—",
    "m": "bôi, xoa, trát, vòng qua"
  },
  "末": {
    "hv": "MẠT",
    "on": "マツ, バツ",
    "kun": "すえ, うら, うれ",
    "m": "cuối cùng, ngọn"
  },
  "繭": {
    "hv": "KIỂN",
    "on": "ケン",
    "kun": "まゆ, きぬ",
    "m": "cái kén tằm, mạng nhện, phồng da chân"
  },
  "麿": {
    "hv": "MI",
    "on": "—",
    "kun": "まろ",
    "m": "I, you, (kokuji)"
  },
  "慢": {
    "hv": "MẠN",
    "on": "マン",
    "kun": "—",
    "m": "chậm chạp, khoan, trì hoãn"
  },
  "満": {
    "hv": "MÃN",
    "on": "マン, バン",
    "kun": "み・ちる, み・つ, み・たす",
    "m": "full, fullness, enough"
  },
  "漫": {
    "hv": "MẠN",
    "on": "マン",
    "kun": "みだり・に, そぞ・ろ",
    "m": "đầy tràn, ngập"
  },
  "未": {
    "hv": "MÙI",
    "on": "ミ, ビ",
    "kun": "いま・だ, ま・だ, ひつじ",
    "m": "Mùi (ngôi thứ 8 hàng Chi), chưa"
  },
  "魅": {
    "hv": "MỊ",
    "on": "ミ",
    "kun": "—",
    "m": "ma quỷ"
  },
  "巳": {
    "hv": "TỴ",
    "on": "シ",
    "kun": "み",
    "m": "Tỵ (ngôi thứ 6 hàng Chi)"
  },
  "箕": {
    "hv": "CƠ",
    "on": "キ",
    "kun": "み",
    "m": "hoa tay, vằn tay, sọt rác, sao Ky (một trong Nhị thập bát tú)"
  },
  "岬": {
    "hv": "GIÁP",
    "on": "コウ",
    "kun": "みさき",
    "m": "vệ núi, mũi đất (ở biển)"
  },
  "密": {
    "hv": "MẬT",
    "on": "ミツ",
    "kun": "ひそ・か",
    "m": "đông đúc, giữ kín"
  },
  "蜜": {
    "hv": "MẬT",
    "on": "ミツ, ビツ",
    "kun": "—",
    "m": "mật ong, ngọt"
  },
  "湊": {
    "hv": "THẤU",
    "on": "ソウ",
    "kun": "みなと, あつ・まる",
    "m": "gần, cùng"
  },
  "稔": {
    "hv": "NHẪM",
    "on": "ネン, ジン, ニン",
    "kun": "みの・る, みのり",
    "m": "lúa chín, được mùa, năm, tội ác"
  },
  "脈": {
    "hv": "MẠCH",
    "on": "ミャク",
    "kun": "すじ",
    "m": "mạch máu, mạch, thớ, gân, liền nhau"
  },
  "妙": {
    "hv": "DIỆU",
    "on": "ミョウ, ビョウ",
    "kun": "たえ",
    "m": "hay, đẹp, tuyệt, kỳ diệu, tài tình"
  },
  "民": {
    "hv": "DÂN",
    "on": "ミン",
    "kun": "たみ",
    "m": "người dân, người, dân"
  },
  "眠": {
    "hv": "MIÊN",
    "on": "ミン",
    "kun": "ねむ・る, ねむ・い",
    "m": "ngủ"
  },
  "務": {
    "hv": "VỤ",
    "on": "ム",
    "kun": "つと・める",
    "m": "công việc"
  },
  "夢": {
    "hv": "MỘNG",
    "on": "ム, ボウ",
    "kun": "ゆめ, ゆめ・みる, くら・い",
    "m": "mơ, mộng, chiêm bao, mơ tưởng, ao ước, họ Mộng"
  },
  "無": {
    "hv": "VÔ",
    "on": "ム, ブ",
    "kun": "な・い",
    "m": "không có"
  },
  "牟": {
    "hv": "MƯU",
    "on": "ボウ, ム",
    "kun": "—",
    "m": "cướp lấy"
  },
  "矛": {
    "hv": "MÂU",
    "on": "ム, ボウ",
    "kun": "ほこ",
    "m": "xà mâu (binh khí)"
  },
  "霧": {
    "hv": "VỤ",
    "on": "ム, ボウ, ブ",
    "kun": "きり",
    "m": "sương mù"
  },
  "椋": {
    "hv": "[椋]",
    "on": "リョウ",
    "kun": "むく",
    "m": "type of deciduous tree, grey starling"
  },
  "婿": {
    "hv": "TẾ",
    "on": "セイ",
    "kun": "むこ",
    "m": "con rể"
  },
  "娘": {
    "hv": "NƯƠNG",
    "on": "ジョウ",
    "kun": "むすめ, こ",
    "m": "cô, chị, mẹ"
  },
  "冥": {
    "hv": "MINH",
    "on": "メイ, ミョウ",
    "kun": "くら・い",
    "m": "mù mịt, ngu dốt"
  },
  "名": {
    "hv": "DANH",
    "on": "メイ, ミョウ",
    "kun": "な, -な",
    "m": "tên, danh, danh tiếng"
  },
  "命": {
    "hv": "MỆNH",
    "on": "メイ, ミョウ",
    "kun": "いのち",
    "m": "mạng, lời sai khiến"
  },
  "盟": {
    "hv": "MINH",
    "on": "メイ",
    "kun": "—",
    "m": "uống máu thề, liên minh"
  },
  "迷": {
    "hv": "MÊ",
    "on": "メイ",
    "kun": "まよ・う",
    "m": "lạc, mất, mê, say, ham, lầm mê, mê tín"
  },
  "銘": {
    "hv": "MINH",
    "on": "メイ",
    "kun": "—",
    "m": "bài minh (khắc chữ vào bia để tự răn mình hoặc ghi chép công đức), ghi nhớ"
  },
  "鳴": {
    "hv": "MINH",
    "on": "メイ",
    "kun": "な・く, な・る, な・らす",
    "m": "hót (chim), gáy (gà)"
  },
  "牝": {
    "hv": "TẪN",
    "on": "ヒン",
    "kun": "めす, め-, めん",
    "m": "con cái (loài chim)"
  },
  "滅": {
    "hv": "DIỆT",
    "on": "メツ",
    "kun": "ほろ・びる, ほろ・ぶ, ほろ・ぼす",
    "m": "giết, dập tắt (lửa)"
  },
  "免": {
    "hv": "MIỄN",
    "on": "メン",
    "kun": "まぬか・れる, まぬが・れる",
    "m": "bỏ, miễn, khỏi"
  },
  "綿": {
    "hv": "MIÊN",
    "on": "メン",
    "kun": "わた",
    "m": "tơ tằm, kéo dài, liền, mềm mại"
  },
  "面": {
    "hv": "DIỆN",
    "on": "メン, ベン",
    "kun": "おも, おもて, つら",
    "m": "mặt, bề mặt, bột gạo, sợi miến"
  },
  "麺": {
    "hv": "MIẾN",
    "on": "メン, ベン",
    "kun": "むぎこ",
    "m": "bột gạo, sợi miến"
  },
  "模": {
    "hv": "MÔ",
    "on": "モ, ボ",
    "kun": "—",
    "m": "cái khuôn bằng gỗ, mô phỏng, gương mẫu"
  },
  "茂": {
    "hv": "MẬU",
    "on": "モ",
    "kun": "しげ・る",
    "m": "tươi tốt"
  },
  "妄": {
    "hv": "VỌNG",
    "on": "モウ, ボウ",
    "kun": "みだ・りに",
    "m": "viển vông, xa vời, ngông, lung tung, ẩu, sằng bậy"
  },
  "孟": {
    "hv": "MẠNH",
    "on": "モウ, ボウ, ミョウ",
    "kun": "かしら",
    "m": "bộp chộp, lỗ mãng, tháng đầu một quý, cả, lớn (anh)"
  },
  "毛": {
    "hv": "MAO",
    "on": "モウ",
    "kun": "け",
    "m": "sợi lông"
  },
  "猛": {
    "hv": "MÃNH",
    "on": "モウ",
    "kun": "—",
    "m": "mạnh, khoẻ"
  },
  "盲": {
    "hv": "MANH",
    "on": "モウ",
    "kun": "めくら",
    "m": "mù loà"
  },
  "網": {
    "hv": "VÕNG",
    "on": "モウ",
    "kun": "あみ",
    "m": "cái lưới, vu khống, lừa"
  },
  "耗": {
    "hv": "HÁO",
    "on": "モウ, コウ",
    "kun": "—",
    "m": "hao, sút, giảm, tin tức, không, hết"
  },
  "蒙": {
    "hv": "MÔNG",
    "on": "モウ, ボウ",
    "kun": "こうむ・る, おお・う, くら・い",
    "m": "không rõ ràng, lừa lọc, trùm lên"
  },
  "儲": {
    "hv": "TRỪ",
    "on": "チョ",
    "kun": "もう・ける, もう・かる, もうけ, たくわ・える",
    "m": "chứa, cất, lưu giữ"
  },
  "黙": {
    "hv": "MẶC",
    "on": "モク, ボク",
    "kun": "だま・る, もだ・す",
    "m": "silence, become silent, stop speaking"
  },
  "目": {
    "hv": "MỤC",
    "on": "モク, ボク",
    "kun": "め, -め, ま-",
    "m": "mắt, khoản mục"
  },
  "餅": {
    "hv": "BÍNH",
    "on": "ヘイ, ヒョウ",
    "kun": "もち, もちい",
    "m": "bánh làm bằng bột"
  },
  "戻": {
    "hv": "LỆ",
    "on": "レイ",
    "kun": "もど・す, もど・る",
    "m": "re-, return, revert"
  },
  "貰": {
    "hv": "THẾ",
    "on": "セイ, シャ",
    "kun": "もら・う",
    "m": "cho vay, cho thuê, tha thứ, xá tội"
  },
  "紋": {
    "hv": "VĂN",
    "on": "モン",
    "kun": "—",
    "m": "đường, vết, vằn, nếp nhăn"
  },
  "門": {
    "hv": "MÔN",
    "on": "モン",
    "kun": "かど, と",
    "m": "cái cửa, loài, loại, thứ, môn"
  },
  "匁": {
    "hv": "LẠNG",
    "on": "—",
    "kun": "もんめ, め",
    "m": "monme, 3.75 grams, (kokuji)"
  },
  "也": {
    "hv": "DÃ",
    "on": "ヤ, エ",
    "kun": "なり, か, また",
    "m": "cũng, vậy, cũng"
  },
  "冶": {
    "hv": "DÃ",
    "on": "ヤ",
    "kun": "い・る",
    "m": "đúc (tạo hình cho kim loại nóng chảy rồi để đông lại), con gái đẹp"
  },
  "耶": {
    "hv": "DA",
    "on": "ヤ, ジャ",
    "kun": "か",
    "m": "vậy ư (chỉ sự còn ngờ vực), vậy ư (chỉ sự còn ngờ vực)"
  },
  "野": {
    "hv": "DÃ",
    "on": "ヤ, ショ",
    "kun": "の, の-",
    "m": "đồng nội, không thuần, rất, vô cùng"
  },
  "弥": {
    "hv": "MY",
    "on": "ミ, ビ",
    "kun": "や, いや, いよ・いよ, わた・る",
    "m": "nước đầy, khắp, tràn đầy"
  },
  "矢": {
    "hv": "THI",
    "on": "シ",
    "kun": "や",
    "m": "tên (bắn cung), tên (bắn cung)"
  },
  "厄": {
    "hv": "ÁCH",
    "on": "ヤク",
    "kun": "—",
    "m": "khốn ách, hẹp"
  },
  "役": {
    "hv": "DỊCH",
    "on": "ヤク, エキ",
    "kun": "—",
    "m": "đi thú ngoài biên thuỳ, việc quân"
  },
  "約": {
    "hv": "ƯỚC",
    "on": "ヤク",
    "kun": "つづ・まる, つづ・める, つづま・やか",
    "m": "thắt, bó, đại lược, chừng, khoảng, giao ước, ước hẹn"
  },
  "訳": {
    "hv": "DỊCH",
    "on": "ヤク",
    "kun": "わけ",
    "m": "translate, reason, circumstance"
  },
  "躍": {
    "hv": "DƯỢC",
    "on": "ヤク",
    "kun": "おど・る",
    "m": "nhảy lên, háo hức, hăm hở"
  },
  "靖": {
    "hv": "TĨNH",
    "on": "セイ, ジョウ",
    "kun": "やす・んじる",
    "m": "yên lặng, yên ổn"
  },
  "柳": {
    "hv": "LIỄU",
    "on": "リュウ",
    "kun": "やなぎ",
    "m": "cây liễu, sao Liễu (một trong Nhị thập bát tú)"
  },
  "薮": {
    "hv": "TẨU",
    "on": "ソウ",
    "kun": "やぶ",
    "m": "chằm lớn, cái đầm, nơi tụ tập, nơi thôn dã"
  },
  "愉": {
    "hv": "DU",
    "on": "ユ",
    "kun": "たの・しい, たの・しむ",
    "m": "hài lòng"
  },
  "油": {
    "hv": "DU",
    "on": "ユ, ユウ",
    "kun": "あぶら",
    "m": "tinh dầu"
  },
  "癒": {
    "hv": "DŨ",
    "on": "ユ",
    "kun": "い・える, いや・す, い・やす",
    "m": "ốm khỏi"
  },
  "諭": {
    "hv": "DỤ",
    "on": "ユ",
    "kun": "さと・す",
    "m": "chỉ bảo, hiểu dụ, tỏ rõ"
  },
  "輸": {
    "hv": "THÂU",
    "on": "ユ, シュ",
    "kun": "—",
    "m": "chở đồ đi, nộp, đưa đồ, thua bạc"
  },
  "唯": {
    "hv": "DUY",
    "on": "ユイ, イ",
    "kun": "ただ",
    "m": "chỉ có"
  },
  "佑": {
    "hv": "HỮU",
    "on": "ユウ, ウ",
    "kun": "たす・ける",
    "m": "giúp đỡ"
  },
  "優": {
    "hv": "ƯU",
    "on": "ユウ, ウ",
    "kun": "やさ・しい, すぐ・れる, まさ・る",
    "m": "hơn, xuất sắc, nhiều, thừa thãi"
  },
  "勇": {
    "hv": "DŨNG",
    "on": "ユウ",
    "kun": "いさ・む",
    "m": "dũng mãnh"
  },
  "宥": {
    "hv": "HỰU",
    "on": "ユウ",
    "kun": "なだ・める, ゆる・す",
    "m": "rộng thứ, tha thứ"
  },
  "幽": {
    "hv": "U",
    "on": "ユウ",
    "kun": "ふか・い, かす・か, くら・い, しろ・い",
    "m": "ẩn núp, sâu xa, tối tăm, cầm tù"
  },
  "悠": {
    "hv": "DU",
    "on": "ユウ",
    "kun": "—",
    "m": "xa vời"
  },
  "憂": {
    "hv": "ƯU",
    "on": "ユウ",
    "kun": "うれ・える, うれ・い, う・い, う・き",
    "m": "lo âu, lo lắng"
  },
  "有": {
    "hv": "HỮU",
    "on": "ユウ, ウ",
    "kun": "あ・る",
    "m": "có, sỡ hữu"
  },
  "柚": {
    "hv": "DỮU",
    "on": "ユ, ユウ, ジク",
    "kun": "ゆず",
    "m": "cây bưởi, con thoi (để dệt vải)"
  },
  "湧": {
    "hv": "DŨNG",
    "on": "ユウ, ヨウ, ユ",
    "kun": "わ・く",
    "m": "sóng lớn"
  },
  "猶": {
    "hv": "DO",
    "on": "ユウ, ユ",
    "kun": "なお",
    "m": "con do (giống khỉ), vẫn còn"
  },
  "猷": {
    "hv": "DU",
    "on": "ユウ, ヨウ",
    "kun": "はかりごと, はか・る",
    "m": "mưu kế, đạo, vẽ"
  },
  "祐": {
    "hv": "HỮU",
    "on": "ユウ, ウ",
    "kun": "たす・ける",
    "m": "thần giúp"
  },
  "裕": {
    "hv": "DỤ",
    "on": "ユウ",
    "kun": "—",
    "m": "nhiều đồ đạc, giàu có, thong thả"
  },
  "誘": {
    "hv": "DỤ",
    "on": "ユウ",
    "kun": "さそ・う, いざな・う",
    "m": "dỗ dành, dẫn dụ"
  },
  "遊": {
    "hv": "DU",
    "on": "ユウ, ユ",
    "kun": "あそ・ぶ, あそ・ばす",
    "m": "đi chơi"
  },
  "邑": {
    "hv": "ẤP",
    "on": "ユウ",
    "kun": "むら",
    "m": "vùng đất nhỏ"
  },
  "郵": {
    "hv": "BƯU",
    "on": "ユウ",
    "kun": "—",
    "m": "nhà trạm (truyền tin)"
  },
  "雄": {
    "hv": "HÙNG",
    "on": "ユウ",
    "kun": "お-, おす, おん",
    "m": "con chim trống, mạnh, khoẻ"
  },
  "融": {
    "hv": "DUNG",
    "on": "ユウ",
    "kun": "と・ける, と・かす",
    "m": "tan ra, hoà tan, lưu thông"
  },
  "予": {
    "hv": "DƯ",
    "on": "ヨ, シャ",
    "kun": "あらかじ・め",
    "m": "ta, tôi (tiếng xưng hô), cho"
  },
  "余": {
    "hv": "DƯ",
    "on": "ヨ",
    "kun": "あま・る, あま・り, あま・す, あんま・り",
    "m": "thừa, ngoài ra, thừa ra, nhàn rỗi"
  },
  "与": {
    "hv": "DỮ",
    "on": "ヨ",
    "kun": "あた・える, あずか・る, くみ・する, ともに",
    "m": "cho, đi lại chơi bời, thân thiện, khen ngợi, tán thưởng"
  },
  "誉": {
    "hv": "DỰ",
    "on": "ヨ",
    "kun": "ほま・れ, ほ・める",
    "m": "khen ngợi"
  },
  "預": {
    "hv": "DỰ",
    "on": "ヨ",
    "kun": "あず・ける, あず・かる",
    "m": "sẵn, có trước, làm trước, tham gia, dự"
  },
  "幼": {
    "hv": "ẤU",
    "on": "ヨウ",
    "kun": "おさな・い",
    "m": "bé, nhỏ tuổi"
  },
  "妖": {
    "hv": "YÊU",
    "on": "ヨウ",
    "kun": "あや・しい, なま・めく, わざわ・い",
    "m": "đẹp mĩ miều, quái lạ"
  },
  "容": {
    "hv": "DONG",
    "on": "ヨウ",
    "kun": "い・れる",
    "m": "chứa đựng, dáng dấp, hình dong, chứa đựng"
  },
  "庸": {
    "hv": "DONG",
    "on": "ヨウ",
    "kun": "—",
    "m": "dùng, thường, ngu hèn"
  },
  "揚": {
    "hv": "DƯƠNG",
    "on": "ヨウ",
    "kun": "あ・げる, -あ・げ, あ・がる",
    "m": "dơ lên, giương lên, bay lên, Dương Châu 揚州"
  },
  "揺": {
    "hv": "DAO",
    "on": "ヨウ",
    "kun": "ゆ・れる, ゆ・る, ゆ・らぐ, ゆ・るぐ, ゆ・する, ゆ・さぶる, ゆ・すぶる, うご・く",
    "m": "lay động, quấy nhiễu, lay động"
  },
  "擁": {
    "hv": "ỦNG",
    "on": "ヨウ",
    "kun": "—",
    "m": "ủng hộ, giúp đỡ"
  },
  "楊": {
    "hv": "DƯƠNG",
    "on": "ヨウ",
    "kun": "やなぎ",
    "m": "cây dương liễu"
  },
  "様": {
    "hv": "DẠNG",
    "on": "ヨウ, ショウ",
    "kun": "さま, さん",
    "m": "hình dạng, dáng vẻ, mẫu"
  },
  "洋": {
    "hv": "DƯƠNG",
    "on": "ヨウ",
    "kun": "—",
    "m": "tràn trề, phong phú, biển"
  },
  "溶": {
    "hv": "DUNG",
    "on": "ヨウ",
    "kun": "と・ける, と・かす, と・く",
    "m": "tan ra, hoà tan, lưu thông"
  },
  "用": {
    "hv": "DỤNG",
    "on": "ヨウ",
    "kun": "もち・いる",
    "m": "dùng, sử dụng"
  },
  "窯": {
    "hv": "DIÊU",
    "on": "ヨウ",
    "kun": "かま",
    "m": "cái lò nung, đồ sành sứ"
  },
  "羊": {
    "hv": "DƯƠNG",
    "on": "ヨウ",
    "kun": "ひつじ",
    "m": "con dê"
  },
  "耀": {
    "hv": "DIỆU",
    "on": "ヨウ",
    "kun": "かがや・く, ひかり",
    "m": "soi, rọi, chói sáng"
  },
  "葉": {
    "hv": "DIỆP",
    "on": "ヨウ",
    "kun": "は",
    "m": "lá cây"
  },
  "蓉": {
    "hv": "DUNG",
    "on": "ヨウ",
    "kun": "—",
    "m": "(xem: phù dung 芙蓉)"
  },
  "謡": {
    "hv": "DAO",
    "on": "ヨウ",
    "kun": "うた・い, うた・う",
    "m": "tin đồn, lời đồn đại, ca dao"
  },
  "踊": {
    "hv": "DŨNG",
    "on": "ヨウ",
    "kun": "おど・る",
    "m": "nhảy nhót, hăng hái làm việc"
  },
  "遥": {
    "hv": "DAO",
    "on": "ヨウ",
    "kun": "はる・か",
    "m": "xa, dài"
  },
  "陽": {
    "hv": "DƯƠNG",
    "on": "ヨウ",
    "kun": "ひ",
    "m": "mặt trời, dương"
  },
  "養": {
    "hv": "DƯỠNG",
    "on": "ヨウ, リョウ",
    "kun": "やしな・う",
    "m": "nuôi dưỡng, dâng biếu, nuôi dưỡng"
  },
  "抑": {
    "hv": "ỨC",
    "on": "ヨク",
    "kun": "おさ・える",
    "m": "đè, nén"
  },
  "欲": {
    "hv": "DỤC",
    "on": "ヨク",
    "kun": "ほっ・する, ほ・しい",
    "m": "ham muốn"
  },
  "沃": {
    "hv": "ỐC",
    "on": "ヨウ, ヨク, オク",
    "kun": "そそ・ぐ",
    "m": "bón, tưới, tốt, màu mỡ"
  },
  "浴": {
    "hv": "DỤC",
    "on": "ヨク",
    "kun": "あ・びる, あ・びせる",
    "m": "tắm"
  },
  "翌": {
    "hv": "DỰC",
    "on": "ヨク",
    "kun": "—",
    "m": "ngày mai"
  },
  "翼": {
    "hv": "DỰC",
    "on": "ヨク",
    "kun": "つばさ",
    "m": "cánh chim, vây cá, sao Dực"
  },
  "淀": {
    "hv": "ĐIẾN",
    "on": "テン, デン",
    "kun": "よど・む",
    "m": "nước nông"
  },
  "羅": {
    "hv": "LA",
    "on": "ラ",
    "kun": "うすもの",
    "m": "vải lụa, cái lưới, bày biện"
  },
  "裸": {
    "hv": "KHOẢ",
    "on": "ラ",
    "kun": "はだか",
    "m": "lộ ra, hiện ra, trần truồng, lộ ra, hiện ra"
  },
  "頼": {
    "hv": "LẠI",
    "on": "ライ",
    "kun": "たの・む, たの・もしい, たよ・る",
    "m": "trust, request"
  },
  "雷": {
    "hv": "LÔI",
    "on": "ライ",
    "kun": "かみなり, いかずち, いかづち",
    "m": "sấm"
  },
  "洛": {
    "hv": "LẠC",
    "on": "ラク",
    "kun": "—",
    "m": "sông Lạc"
  },
  "絡": {
    "hv": "LẠC",
    "on": "ラク",
    "kun": "から・む, から・まる",
    "m": "quấn quanh, ràng buộc"
  },
  "落": {
    "hv": "LẠC",
    "on": "ラク",
    "kun": "お・ちる, お・ち, お・とす",
    "m": "rơi, rụng, xóm (đơn vị hành chính)"
  },
  "酪": {
    "hv": "LẠC",
    "on": "ラク",
    "kun": "—",
    "m": "cô đặc sữa"
  },
  "乱": {
    "hv": "LOẠN",
    "on": "ラン, ロン",
    "kun": "みだ・れる, みだ・る, みだ・す, みだ, おさ・める, わた・る",
    "m": "lẫn lộn, rối, phá hoại"
  },
  "卵": {
    "hv": "NOÃN",
    "on": "ラン",
    "kun": "たまご",
    "m": "quả trứng, hột dái"
  },
  "嵐": {
    "hv": "LAM",
    "on": "ラン",
    "kun": "あらし",
    "m": "khí núi bốc lên"
  },
  "欄": {
    "hv": "LAN",
    "on": "ラン",
    "kun": "てすり",
    "m": "lan can"
  },
  "濫": {
    "hv": "LẠM",
    "on": "ラン",
    "kun": "みだ・りに, みだ・りがましい",
    "m": "giàn giụa, nước tràn, nước ngập, lạm, quá"
  },
  "藍": {
    "hv": "LAM",
    "on": "ラン",
    "kun": "あい",
    "m": "màu xanh lam, cây chàm"
  },
  "蘭": {
    "hv": "LAN",
    "on": "ラン, ラ",
    "kun": "—",
    "m": "hoa lan"
  },
  "覧": {
    "hv": "LÃM",
    "on": "ラン",
    "kun": "み・る",
    "m": "xem, ngắm"
  },
  "利": {
    "hv": "LỢI",
    "on": "リ",
    "kun": "き・く",
    "m": "lợi ích, công dụng, sắc, nhọn"
  },
  "吏": {
    "hv": "LẠI",
    "on": "リ",
    "kun": "—",
    "m": "viên quan, người làm việc cho nhà nước"
  },
  "履": {
    "hv": "LÝ",
    "on": "リ",
    "kun": "は・く",
    "m": "giày da, giày xéo"
  },
  "李": {
    "hv": "LÝ",
    "on": "リ",
    "kun": "すもも",
    "m": "cây mận"
  },
  "梨": {
    "hv": "LÊ",
    "on": "リ",
    "kun": "なし",
    "m": "cây lê, quả lê"
  },
  "璃": {
    "hv": "LY",
    "on": "リ",
    "kun": "—",
    "m": "(xem: pha ly 玻璃, lưu ly 琉璃), (xem: pha ly 玻璃, lưu ly 琉璃)"
  },
  "痢": {
    "hv": "LỊ",
    "on": "リ",
    "kun": "—",
    "m": "bệnh kiết lị"
  },
  "裏": {
    "hv": "LÝ",
    "on": "リ",
    "kun": "うら",
    "m": "ở trong, lần lót áo"
  },
  "里": {
    "hv": "LÝ",
    "on": "リ",
    "kun": "さと",
    "m": "làng xóm, dặm, ở trong"
  },
  "離": {
    "hv": "LY",
    "on": "リ",
    "kun": "はな・れる, はな・す",
    "m": "dời xa, chia lìa, dời khỏi, quẻ Ly (trung hư) trong Kinh Dịch (chỉ có vạch giữa đứt, tượng Hoả (lửa), trượng trưng cho con gái giữa, hành Hoả, tuổi Ngọ, hướng Nam)"
  },
  "陸": {
    "hv": "LỤC",
    "on": "リク, ロク",
    "kun": "おか",
    "m": "đất liền, đường bộ, sao Lục"
  },
  "率": {
    "hv": "LÔ",
    "on": "ソツ, リツ, シュツ",
    "kun": "ひき・いる",
    "m": "noi theo, quản lãnh, noi theo"
  },
  "略": {
    "hv": "LƯỢC",
    "on": "リャク",
    "kun": "ほぼ, はぶ・く, おか・す, おさ・める, はかりごと, はか・る",
    "m": "qua loa, sơ sài, mưu lược"
  },
  "劉": {
    "hv": "LƯU",
    "on": "リュウ, ル",
    "kun": "ころ・す",
    "m": "giết, giãi bày, họ Lưu"
  },
  "流": {
    "hv": "LƯU",
    "on": "リュウ, ル",
    "kun": "なが・れる, なが・れ, なが・す, -なが・す",
    "m": "dòng nước, trôi, chảy"
  },
  "溜": {
    "hv": "LƯU",
    "on": "リュウ",
    "kun": "た・まる, たま・る, た・める, したた・る, たまり, ため",
    "m": "trượt, lướt, nhẵn"
  },
  "琉": {
    "hv": "LƯU",
    "on": "リュウ, ル",
    "kun": "—",
    "m": "(xem: lưu ly 琉璃)"
  },
  "留": {
    "hv": "LƯU",
    "on": "リュウ, ル",
    "kun": "と・める, と・まる, とど・める, とど・まる, るうぶる",
    "m": "lưu giữ, ở lại"
  },
  "硫": {
    "hv": "LƯU",
    "on": "リュウ",
    "kun": "—",
    "m": "(xem: lưu hoàng, lưu huỳnh 硫黃)"
  },
  "粒": {
    "hv": "LẠP",
    "on": "リュウ",
    "kun": "つぶ",
    "m": "hạt gạo, hạt thóc"
  },
  "隆": {
    "hv": "LONG",
    "on": "リュウ",
    "kun": "—",
    "m": "long trọng, hưng thịnh"
  },
  "竜": {
    "hv": "LONG",
    "on": "リュウ, リョウ, ロウ",
    "kun": "たつ, いせ",
    "m": "dragon, imperial"
  },
  "龍": {
    "hv": "LONG",
    "on": "リュウ, リョウ, ロウ",
    "kun": "たつ",
    "m": "con rồng"
  },
  "侶": {
    "hv": "LỮ",
    "on": "リョ, ロ",
    "kun": "とも",
    "m": "bạn bè"
  },
  "慮": {
    "hv": "LỰ",
    "on": "リョ",
    "kun": "おもんぱく・る, おもんぱか・る",
    "m": "lo âu"
  },
  "旅": {
    "hv": "LỮ",
    "on": "リョ",
    "kun": "たび",
    "m": "quán trọ, lang thang, du lịch, lữ (gồm 500 lính)"
  },
  "虜": {
    "hv": "LỖ",
    "on": "リョ, ロ",
    "kun": "とりこ, とりく",
    "m": "giặc giã, tù binh"
  },
  "了": {
    "hv": "LIỄU",
    "on": "リョウ",
    "kun": "—",
    "m": "xong, hết, đã, rồi"
  },
  "亮": {
    "hv": "LƯỢNG",
    "on": "リョウ",
    "kun": "あきらか",
    "m": "xinh, sáng, thanh cao"
  },
  "僚": {
    "hv": "LIÊU",
    "on": "リョウ",
    "kun": "—",
    "m": "bạn cùng làm việc, người cùng làm quan"
  },
  "両": {
    "hv": "LƯỠNG",
    "on": "リョウ",
    "kun": "てる, ふたつ",
    "m": "hai, 2"
  },
  "凌": {
    "hv": "LĂNG",
    "on": "リョウ",
    "kun": "しの・ぐ",
    "m": "xâm phạm, tảng băng"
  },
  "寮": {
    "hv": "LIÊU",
    "on": "リョウ",
    "kun": "—",
    "m": "cửa sổ nhỏ"
  },
  "料": {
    "hv": "LIỆU",
    "on": "リョウ",
    "kun": "—",
    "m": "đo, lường tính, liệu đoán, vuốt ve"
  },
  "梁": {
    "hv": "LƯƠNG",
    "on": "リョウ",
    "kun": "はり, うつばり, うちばり, やな, はし",
    "m": "nước Lương, đời nhà Lương của Trung Quốc, cầu"
  },
  "涼": {
    "hv": "LƯƠNG",
    "on": "リョウ",
    "kun": "すず・しい, すず・む, すず・やか, うす・い, ひや・す, まことに",
    "m": "mát mẻ"
  },
  "猟": {
    "hv": "LIỆP",
    "on": "リョウ",
    "kun": "かり, か・る",
    "m": "bắt, săn thú, thổi phất"
  },
  "療": {
    "hv": "LIỆU",
    "on": "リョウ",
    "kun": "—",
    "m": "chữa bệnh, điều trị"
  },
  "瞭": {
    "hv": "LIỄU",
    "on": "リョウ",
    "kun": "あきらか",
    "m": "xong, hết, đã, rồi, mắt sáng, mắt trong"
  },
  "稜": {
    "hv": "LĂNG",
    "on": "リョウ, ロウ",
    "kun": "いつ, かど",
    "m": "oai linh, góc, cạnh"
  },
  "糧": {
    "hv": "LƯƠNG",
    "on": "リョウ, ロウ",
    "kun": "かて",
    "m": "cơm, lương thực"
  },
  "諒": {
    "hv": "LƯỢNG",
    "on": "リョウ",
    "kun": "あきら・か, まことに",
    "m": "tha thứ, ước đoán, (tên đất)"
  },
  "遼": {
    "hv": "LIÊU",
    "on": "リョウ",
    "kun": "—",
    "m": "xa xôi"
  },
  "量": {
    "hv": "LƯỜNG",
    "on": "リョウ",
    "kun": "はか・る",
    "m": "đong, đo, bao dung, khả năng, dung lượng"
  },
  "陵": {
    "hv": "LĂNG",
    "on": "リョウ",
    "kun": "みささぎ",
    "m": "gò, đồi, mộ của vua, bỏ nát"
  },
  "領": {
    "hv": "LÃNH",
    "on": "リョウ",
    "kun": "えり",
    "m": "cổ áo, lĩnh, nhận, cổ áo"
  },
  "力": {
    "hv": "LỰC",
    "on": "リョク, リキ, リイ",
    "kun": "ちから",
    "m": "sức lực"
  },
  "緑": {
    "hv": "LỤC",
    "on": "リョク, ロク",
    "kun": "みどり",
    "m": "green"
  },
  "倫": {
    "hv": "LUÂN",
    "on": "リン",
    "kun": "—",
    "m": "luân thường, đạo lý, loài, bực"
  },
  "厘": {
    "hv": "LY",
    "on": "リン",
    "kun": "—",
    "m": "sửa sang, tỷ lệ lãi, cai trị"
  },
  "林": {
    "hv": "LÂM",
    "on": "リン",
    "kun": "はやし",
    "m": "rừng cây"
  },
  "琳": {
    "hv": "LÂM",
    "on": "リン",
    "kun": "—",
    "m": "ngọc lâm"
  },
  "臨": {
    "hv": "LÂM",
    "on": "リン",
    "kun": "のぞ・む",
    "m": "ở trên soi xuống, sát, gần kề, kịp"
  },
  "輪": {
    "hv": "LUÂN",
    "on": "リン",
    "kun": "わ",
    "m": "cái bánh xe, vòng, vầng, vành"
  },
  "隣": {
    "hv": "LÂN",
    "on": "リン",
    "kun": "とな・る, となり",
    "m": "gần, kề, láng giềng"
  },
  "鱗": {
    "hv": "LÂN",
    "on": "リン",
    "kun": "うろこ, こけ, こけら",
    "m": "vẩy cá, vảy cá, xếp hàng lần lượt"
  },
  "麟": {
    "hv": "LÂN",
    "on": "リン",
    "kun": "—",
    "m": "con kỳ lân (như: kỳ lân 麒麟)"
  },
  "瑠": {
    "hv": "LƯU",
    "on": "ル, リュウ",
    "kun": "—",
    "m": "(xem: lưu ly 琉璃)"
  },
  "塁": {
    "hv": "LỖI",
    "on": "ルイ, ライ, スイ",
    "kun": "とりで",
    "m": "bases, fort, rampart"
  },
  "涙": {
    "hv": "LỆ",
    "on": "ルイ, レイ",
    "kun": "なみだ",
    "m": "tears, sympathy"
  },
  "累": {
    "hv": "LUY",
    "on": "ルイ",
    "kun": "—",
    "m": "xâu liền, nối liền, dây to, bắt giam"
  },
  "類": {
    "hv": "LOẠI",
    "on": "ルイ",
    "kun": "たぐ・い",
    "m": "chủng loại, loài"
  },
  "令": {
    "hv": "LINH",
    "on": "レイ",
    "kun": "—",
    "m": "lệnh, chỉ thị, viên quan, tốt đẹp, hiền lành"
  },
  "伶": {
    "hv": "LINH",
    "on": "レイ, リョウ",
    "kun": "わざおぎ",
    "m": "diễn viên, người diễn, đào kép, lẻ loi, cô độc, nhanh nhẹn, lanh lợi"
  },
  "例": {
    "hv": "LỆ",
    "on": "レイ",
    "kun": "たと・える",
    "m": "lệ thường"
  },
  "冷": {
    "hv": "LÃNH",
    "on": "レイ",
    "kun": "つめ・たい, ひ・える, ひ・や, ひ・ややか, ひ・やす, ひ・やかす, さ・める, さ・ます",
    "m": "lạnh lẽo, lặng lẽ"
  },
  "励": {
    "hv": "LỆ",
    "on": "レイ",
    "kun": "はげ・む, はげ・ます",
    "m": "gắng sức, khích lệ"
  },
  "嶺": {
    "hv": "LĨNH",
    "on": "レイ, リョウ",
    "kun": "みね",
    "m": "đỉnh núi"
  },
  "怜": {
    "hv": "LIÊN",
    "on": "レイ, レン, リョウ",
    "kun": "あわ・れむ, さと・い",
    "m": "thương xót"
  },
  "玲": {
    "hv": "LINH",
    "on": "レイ",
    "kun": "—",
    "m": "bóng lộn"
  },
  "礼": {
    "hv": "LỄ",
    "on": "レイ, ライ",
    "kun": "—",
    "m": "lễ nghi"
  },
  "鈴": {
    "hv": "LINH",
    "on": "レイ, リン",
    "kun": "すず",
    "m": "cái chuông"
  },
  "隷": {
    "hv": "LỆ",
    "on": "レイ",
    "kun": "したが・う, しもべ",
    "m": "phụ thuộc, lối chữ lệ"
  },
  "零": {
    "hv": "LINH",
    "on": "レイ",
    "kun": "ぜろ, こぼ・す, こぼ・れる",
    "m": "mưa lác đác, vụn vặt, lẻ, linh, héo rụng"
  },
  "霊": {
    "hv": "LINH",
    "on": "レイ, リョウ",
    "kun": "たま",
    "m": "spirits, soul"
  },
  "麗": {
    "hv": "LỆ",
    "on": "レイ",
    "kun": "うるわ・しい, うら・らか",
    "m": "(xem: cao ly 高麗,高丽), đẹp đẽ, dính, bám"
  },
  "齢": {
    "hv": "LINH",
    "on": "レイ",
    "kun": "よわい, とし",
    "m": "age"
  },
  "暦": {
    "hv": "LỊCH",
    "on": "レキ, リャク",
    "kun": "こよみ",
    "m": "trải qua, vượt qua, lịch (như: lịch 曆)"
  },
  "歴": {
    "hv": "LỊCH",
    "on": "レキ, レッキ",
    "kun": "—",
    "m": "trải qua, vượt qua, lịch (như: lịch 曆)"
  },
  "列": {
    "hv": "LIỆT",
    "on": "レツ, レ",
    "kun": "—",
    "m": "bày ra, xếp theo hàng ngang"
  },
  "劣": {
    "hv": "LIỆT",
    "on": "レツ",
    "kun": "おと・る",
    "m": "kém, ít hơn"
  },
  "烈": {
    "hv": "LIỆT",
    "on": "レツ",
    "kun": "はげ・しい",
    "m": "cháy mạnh, nồng (mùi, hương)"
  },
  "裂": {
    "hv": "LIỆT",
    "on": "レツ",
    "kun": "さ・く, さ・ける, -ぎ・れ",
    "m": "xé ra, rách"
  },
  "廉": {
    "hv": "LIÊM",
    "on": "レン",
    "kun": "—",
    "m": "góc, cạnh, thanh liêm"
  },
  "恋": {
    "hv": "LUYẾN",
    "on": "レン",
    "kun": "こ・う, こい, こい・しい",
    "m": "yêu, thương mến, tiếc nuối"
  },
  "聯": {
    "hv": "LIÊN",
    "on": "レン",
    "kun": "つら・なる, つら・ねる",
    "m": "liên minh, liên kết, câu đối"
  },
  "蓮": {
    "hv": "LIÊN",
    "on": "レン",
    "kun": "はす, はちす",
    "m": "hoa sen"
  },
  "連": {
    "hv": "LIÊN",
    "on": "レン",
    "kun": "つら・なる, つら・ねる, つ・れる, -づ・れ",
    "m": "liền nối"
  },
  "錬": {
    "hv": "LUYỆN",
    "on": "レン",
    "kun": "ね・る",
    "m": "tempering, refine, drill"
  },
  "呂": {
    "hv": "LÃ",
    "on": "ロ, リョ",
    "kun": "せぼね",
    "m": "xương sống, họ Lã, họ Lữ, xương sống"
  },
  "魯": {
    "hv": "LỖ",
    "on": "ロ",
    "kun": "おろか",
    "m": "chậm chạp, thô lỗ, đần độn"
  },
  "炉": {
    "hv": "LÔ",
    "on": "ロ",
    "kun": "いろり",
    "m": "lò lửa, lò lửa"
  },
  "賂": {
    "hv": "LỘ",
    "on": "ロ",
    "kun": "まいな・い, まいな・う",
    "m": "đem của đút lót"
  },
  "露": {
    "hv": "LỘ",
    "on": "ロ, ロウ",
    "kun": "つゆ",
    "m": "sương, hạt móc, lộ ra"
  },
  "労": {
    "hv": "LAO",
    "on": "ロウ",
    "kun": "ろう・する, いたわ・る, いた・ずき, ねぎら, つか・れる, ねぎら・う",
    "m": "nặng nhọc"
  },
  "廊": {
    "hv": "LANG",
    "on": "ロウ",
    "kun": "—",
    "m": "mái hiên, hành lang"
  },
  "弄": {
    "hv": "LỘNG",
    "on": "ロウ, ル",
    "kun": "いじく・る, ろう・する, いじ・る, ひねく・る, たわむ・れる, もてあそ・ぶ",
    "m": "mân mê ngắm nghía, đùa dỡn, bỡn cợt, trêu chọc, thổi sáo, thổi tiêu"
  },
  "朗": {
    "hv": "LÃNG",
    "on": "ロウ",
    "kun": "ほが・らか, あき・らか",
    "m": "sáng"
  },
  "楼": {
    "hv": "LÂU",
    "on": "ロウ",
    "kun": "たかどの",
    "m": "cái lầu"
  },
  "浪": {
    "hv": "LANG",
    "on": "ロウ",
    "kun": "—",
    "m": "con sóng, con sóng"
  },
  "漏": {
    "hv": "LẬU",
    "on": "ロウ",
    "kun": "も・る, も・れる, も・らす",
    "m": "rò rỉ, dột"
  },
  "牢": {
    "hv": "LAO",
    "on": "ロウ",
    "kun": "かた・い, ひとや",
    "m": "chuồng nuôi súc vật, nhà lao"
  },
  "狼": {
    "hv": "LANG",
    "on": "ロウ",
    "kun": "おおかみ",
    "m": "con chó sói, sao Lang"
  },
  "篭": {
    "hv": "LỘNG",
    "on": "ロウ, ル",
    "kun": "かご, こ・める, こも・る, こ・む",
    "m": "seclude oneself, cage, coop"
  },
  "老": {
    "hv": "LÃO",
    "on": "ロウ",
    "kun": "お・いる, ふ・ける",
    "m": "già, nhiều tuổi"
  },
  "郎": {
    "hv": "LANG",
    "on": "ロウ, リョウ",
    "kun": "おとこ",
    "m": "chàng trai, một chức quan"
  },
  "麓": {
    "hv": "LỘC",
    "on": "ロク",
    "kun": "ふもと",
    "m": "chân núi"
  },
  "禄": {
    "hv": "LỘC",
    "on": "ロク",
    "kun": "さいわ・い, ふち",
    "m": "phúc, tốt lành, bổng lộc"
  },
  "録": {
    "hv": "LỤC",
    "on": "ロク",
    "kun": "しる・す, と・る",
    "m": "ghi chép"
  },
  "論": {
    "hv": "LUẬN",
    "on": "ロン",
    "kun": "あげつら・う",
    "m": "bàn bạc"
  },
  "倭": {
    "hv": "OA",
    "on": "ワ, イ",
    "kun": "やまと, したが・う",
    "m": "lùn, thấp, người Nhật Bản"
  },
  "和": {
    "hv": "HOÀ",
    "on": "ワ, オ, カ",
    "kun": "やわ・らぐ, やわ・らげる, なご・む, なご・やか, あ・える",
    "m": "cùng, và, trộn lẫn, hoạ theo, hoà theo (thơ, nhạc)"
  },
  "歪": {
    "hv": "OA",
    "on": "ワイ, エ",
    "kun": "いが・む, いびつ, ひず・む, ゆが・む",
    "m": "méo, lệch, méo, lệch"
  },
  "賄": {
    "hv": "HỐI",
    "on": "ワイ",
    "kun": "まかな・う",
    "m": "của cải, hối lộ, đút lót"
  },
  "脇": {
    "hv": "HIẾP",
    "on": "キョウ",
    "kun": "わき, わけ",
    "m": "sườn, hai bên ngực, bức hiếp"
  },
  "惑": {
    "hv": "HOẶC",
    "on": "ワク",
    "kun": "まど・う",
    "m": "mê hoặc, ngờ hoặc"
  },
  "枠": {
    "hv": "HOA",
    "on": "—",
    "kun": "わく",
    "m": "frame, framework, spindle"
  },
  "鷲": {
    "hv": "THỨU",
    "on": "シュウ, ジュ",
    "kun": "わし",
    "m": "chim kên kên"
  },
  "亘": {
    "hv": "TUYÊN",
    "on": "コウ, カン, セン",
    "kun": "わた・る, もと・める",
    "m": "phô bày"
  },
  "詫": {
    "hv": "SÁ",
    "on": "タ",
    "kun": "わび, わび・しい, かこつ, わ・びる, わび・る",
    "m": "khoe, lạ lùng, lừa dối"
  },
  "藁": {
    "hv": "CẢO",
    "on": "コウ",
    "kun": "わら",
    "m": "khô, gỗ khô"
  },
  "蕨": {
    "hv": "QUYẾT",
    "on": "ケツ",
    "kun": "わらび",
    "m": "rau (để ăn)"
  },
  "湾": {
    "hv": "LOAN",
    "on": "ワン",
    "kun": "いりえ",
    "m": "vịnh biển, chỗ ngoặt trên sông, khuỷu sông"
  },
  "腕": {
    "hv": "OẢN",
    "on": "ワン",
    "kun": "うで",
    "m": "cổ tay"
  },
  "丼": {
    "hv": "ĐẢM",
    "on": "トン, タン, ショウ, セイ",
    "kun": "どんぶり",
    "m": "tiếng đồ vật quăng xuống giếng"
  },
  "侑": {
    "hv": "HỰU",
    "on": "ユウ, ウ",
    "kun": "すす・める, たす・ける",
    "m": "mời ăn thêm"
  },
  "偕": {
    "hv": "GIAI",
    "on": "カイ",
    "kun": "ともに",
    "m": "đều, cùng"
  },
  "傲": {
    "hv": "NGẠO",
    "on": "ゴウ",
    "kun": "おご・る, あなど・る",
    "m": "kiêu ngạo, ngạo nghễ, hỗn láo"
  },
  "冤": {
    "hv": "OAN",
    "on": "エン",
    "kun": "—",
    "m": "oan uổng, oan khuất"
  },
  "刹": {
    "hv": "SÁT",
    "on": "セチ, セツ, サツ",
    "kun": "—",
    "m": "cái tháp thờ Phật, ngôi chùa, (xem: sát na 刹那)"
  },
  "勁": {
    "hv": "KÌNH",
    "on": "ケイ",
    "kun": "つよ・い",
    "m": "sức mạnh, cứng"
  },
  "厦": {
    "hv": "HẠ",
    "on": "カ, サ",
    "kun": "いえ",
    "m": "từ gọi chung chỉ nhà ở"
  },
  "曼": {
    "hv": "MẠN",
    "on": "マン, バン",
    "kun": "なが・い",
    "m": "(xem: man man 曼曼), nhỏ nhắn, xinh đẹp, dài rộng"
  },
  "咸": {
    "hv": "HÀM",
    "on": "カン, ゲン",
    "kun": "—",
    "m": "mặn, vị mặn, đều (chỉ tất cả đều sao đó)"
  },
  "哺": {
    "hv": "BÔ",
    "on": "ホ",
    "kun": "はぐく・む, ふく・む",
    "m": "bú sữa, bữa ăn quá trưa, xế chiều"
  },
  "喘": {
    "hv": "SUYỄN",
    "on": "ゼン, セン",
    "kun": "あえ・ぐ, せき",
    "m": "hổn hển, thở, bệnh suyễn"
  },
  "喩": {
    "hv": "DỤ",
    "on": "ユ",
    "kun": "たと・える, さと・す",
    "m": "metaphor, compare"
  },
  "嗅": {
    "hv": "KHỨU",
    "on": "キュウ",
    "kun": "か・ぐ",
    "m": "ngửi (mùi)"
  },
  "嗜": {
    "hv": "THỊ",
    "on": "シ",
    "kun": "たしな・む, たしな・み, この・む, この・み",
    "m": "ham thích"
  },
  "嘲": {
    "hv": "TRÀO",
    "on": "チョウ, トウ",
    "kun": "あざけ・る",
    "m": "chế nhạo, cười nhạo"
  },
  "囃": {
    "hv": "TRÁ",
    "on": "サツ, ソウ",
    "kun": "はや・す, はやし",
    "m": "play (music), accompany, beat time"
  },
  "毀": {
    "hv": "HUỶ",
    "on": "キ",
    "kun": "こぼ・つ, こわ・す, こぼ・れる, こわ・れる, そし・る, やぶ・る",
    "m": "huỷ hoại, nát, chê, diễu, mỉa mai"
  },
  "奎": {
    "hv": "KHUÊ",
    "on": "ケイ, キ",
    "kun": "—",
    "m": "sao Khuê (một trong Nhị thập bát tú, tượng trưng cho văn chương)"
  },
  "姜": {
    "hv": "KHƯƠNG",
    "on": "キョウ, ガ",
    "kun": "こう",
    "m": "cây gừng, họ Khương"
  },
  "姚": {
    "hv": "DIÊU",
    "on": "ヨウ, チョウ",
    "kun": "うつく・しい",
    "m": "vẻ mặt đẹp"
  },
  "尹": {
    "hv": "DOÃN",
    "on": "イン",
    "kun": "おさ, ただ・す",
    "m": "ngôi thứ hai, lôi cuốn, viên quan, chức trưởng, tên chùm"
  },
  "屏": {
    "hv": "BÌNH",
    "on": "ヘイ, ビョウ",
    "kun": "おお・う, しりぞ・く, びょう・ぶ",
    "m": "bức bình phong"
  },
  "峙": {
    "hv": "TRÌ",
    "on": "ジ",
    "kun": "そばだ・つ",
    "m": "đứng trơ trọi, sắm đủ, súc tích"
  },
  "嶌": {
    "hv": "ĐẢO",
    "on": "トウ",
    "kun": "しま",
    "m": "hòn đảo, gò"
  },
  "崔": {
    "hv": "THÔI",
    "on": "ガイ, サイ, スイ",
    "kun": "がけ",
    "m": "cao lớn"
  },
  "崚": {
    "hv": "LĂNG",
    "on": "リョウ",
    "kun": "—",
    "m": "(xem: lăng tằng 崚嶒)"
  },
  "嶽": {
    "hv": "NHẠC",
    "on": "ガク",
    "kun": "たけ",
    "m": "thuộc về vợ (xem: nhạc trượng 岳丈)"
  },
  "已": {
    "hv": "DĨ",
    "on": "イ",
    "kun": "や・む, すで・に, のみ, はなはだ",
    "m": "ngừng, thôi, đã, rồi"
  },
  "廣": {
    "hv": "QUẢNG",
    "on": "コウ",
    "kun": "ひろ・い, ひろ・まる, ひろ・める, ひろ・がる, ひろ・げる",
    "m": "rộng lớn, rộng về phương Đông Tây (xem: mậu 袤)"
  },
  "彗": {
    "hv": "TUỆ",
    "on": "スイ, エ, ケイ, セイ",
    "kun": "ほうき",
    "m": "sao chổi, cái chổi, quét"
  },
  "彙": {
    "hv": "VỊ",
    "on": "イ",
    "kun": "はりねずみ",
    "m": "loài, loại, phân loại, tập hợp, thu thập"
  },
  "彭": {
    "hv": "BÀNH",
    "on": "ホウ",
    "kun": "—",
    "m": "lực lưỡng"
  },
  "徘": {
    "hv": "BỒI",
    "on": "ハイ",
    "kun": "さまよ・う",
    "m": "do dự"
  },
  "恣": {
    "hv": "TỨ",
    "on": "シ",
    "kun": "ほしいまま",
    "m": "phóng túng"
  },
  "惧": {
    "hv": "CỤ",
    "on": "ク, グ",
    "kun": "おそ・れる",
    "m": "sợ hãi, kính cẩn, khép nép"
  },
  "慄": {
    "hv": "LẬT",
    "on": "リツ",
    "kun": "ふる・える, おそ・れる, おのの・く",
    "m": "run sợ"
  },
  "憬": {
    "hv": "CẢNH",
    "on": "ケイ",
    "kun": "あこが・れる",
    "m": "hiểu biết, tỉnh ngộ"
  },
  "抒": {
    "hv": "TRỮ",
    "on": "ジョ, ショ",
    "kun": "く・む, の・べる",
    "m": "thảo ra, tuôn ra, cởi ra"
  },
  "拉": {
    "hv": "LẠP",
    "on": "ラツ, ラ, ロウ",
    "kun": "らっ・する, ひし・ぐ, くだ・く",
    "m": "bẻ gãy, kéo, lôi, chuyên chở hàng hoá"
  },
  "搜": {
    "hv": "SƯU",
    "on": "ソウ, シュ, シュウ",
    "kun": "さが・す",
    "m": "tìm, lục, soát"
  },
  "摯": {
    "hv": "CHÍ",
    "on": "シ",
    "kun": "いた・る, つか・む, にえ",
    "m": "họ Chí, thành thật"
  },
  "旛": {
    "hv": "PHAN",
    "on": "ヘン, ハン",
    "kun": "はた",
    "m": "cánh phan (cờ có lụa rủ xuống)"
  },
  "昴": {
    "hv": "MÃO",
    "on": "コウ, ボウ",
    "kun": "すばる",
    "m": "sao Mão (một trong Nhị thập bát tú)"
  },
  "晏": {
    "hv": "YẾN",
    "on": "アン",
    "kun": "おそ・い",
    "m": "trời trong, muộn, yên"
  },
  "晨": {
    "hv": "THẦN",
    "on": "シン",
    "kun": "あした, とき, あさ",
    "m": "buổi sáng sớm"
  },
  "晟": {
    "hv": "THẠNH",
    "on": "セイ, ジョウ",
    "kun": "あきらか",
    "m": "sự rực rỡ của mặt trời, sự chói lọi, sáng, lửa cháy rần rật"
  },
  "暉": {
    "hv": "HUY",
    "on": "キ",
    "kun": "かが・やく",
    "m": "bóng (tà huy: bóng chiều)"
  },
  "曖": {
    "hv": "ÁI",
    "on": "アイ",
    "kun": "くら・い",
    "m": "u ám, mờ mịt, việc gì không rõ ràng"
  },
  "杞": {
    "hv": "KỶ",
    "on": "コ, キ",
    "kun": "—",
    "m": "cây kỷ"
  },
  "檜": {
    "hv": "CỐI",
    "on": "カイ",
    "kun": "ひのき, ひ",
    "m": "cây cối (một loài thông), nước cối"
  },
  "栞": {
    "hv": "SAN",
    "on": "カン",
    "kun": "しおり",
    "m": "xuất bản, in ấn, báo, tạp chí, hao mòn"
  },
  "楷": {
    "hv": "GIAI",
    "on": "カイ",
    "kun": "—",
    "m": "cây giai, khuôn phép, chữ viết ngay ngắn"
  },
  "椰": {
    "hv": "DA",
    "on": "ヤ",
    "kun": "やし",
    "m": "cây dừa, quả dừa"
  },
  "檄": {
    "hv": "HỊCH",
    "on": "ケキ",
    "kun": "げき・する, ふれぶみ",
    "m": "chiếu hịch, lời kêu gọi dân chúng"
  },
  "鬱": {
    "hv": "UẤT",
    "on": "ウツ",
    "kun": "うっ・する, ふさ・ぐ, しげ・る",
    "m": "buồn bã, uất ức, hơi thối, sum suê, rậm rạp"
  },
  "毬": {
    "hv": "CẦU",
    "on": "キュウ",
    "kun": "いが, まり",
    "m": "quả cầu, quả bóng"
  },
  "汪": {
    "hv": "UÔNG",
    "on": "オウ",
    "kun": "—",
    "m": "sâu và rộng"
  },
  "洸": {
    "hv": "QUANG",
    "on": "コウ",
    "kun": "—",
    "m": "ánh nước sóng sánh, vũ dũng"
  },
  "洵": {
    "hv": "TUÂN",
    "on": "ジュン, シュン",
    "kun": "の・ぶ, まこと・に",
    "m": "tin thực, xoáy nước"
  },
  "洒": {
    "hv": "SÁI",
    "on": "シャ, ソン, サイ, セン, セイ",
    "kun": "すす・ぐ, あら・う",
    "m": "rảy nước"
  },
  "浙": {
    "hv": "CHIẾT",
    "on": "セツ",
    "kun": "—",
    "m": "sông Chiết Giang (tỉnh Chiết Giang)"
  },
  "渕": {
    "hv": "UYÊN",
    "on": "エン, カク, コウ",
    "kun": "ふち, かた・い, はなわ",
    "m": "edge"
  },
  "滉": {
    "hv": "HOẢNG",
    "on": "コウ",
    "kun": "ひろ・い",
    "m": "deep and broad (water)"
  },
  "溥": {
    "hv": "PHỔ",
    "on": "フ, ハク",
    "kun": "あまねし",
    "m": "to lớn, khắp nơi"
  },
  "漱": {
    "hv": "SẤU",
    "on": "ソウ, シュウ, ス",
    "kun": "くちすす・ぐ, くちそそ・ぐ, うがい, すす・ぐ",
    "m": "súc miệng, xói mòn, giặt"
  },
  "澤": {
    "hv": "TRẠCH",
    "on": "タク",
    "kun": "さわ, うるお・い, うるお・す, つや",
    "m": "cái đầm (hồ đầm)"
  },
  "澪": {
    "hv": "LINH",
    "on": "レイ",
    "kun": "みお",
    "m": "water route, shipping channel"
  },
  "瀋": {
    "hv": "THẨM",
    "on": "シン",
    "kun": "—",
    "m": "nước ép ra, nước"
  },
  "炒": {
    "hv": "SAO",
    "on": "ソウ, ショウ",
    "kun": "い・る, いた・める",
    "m": "sào (rau), tráng (trứng), rang (cơm), sao (thuốc)"
  },
  "焉": {
    "hv": "YÊN",
    "on": "エン",
    "kun": "いずく・んぞ, ここに, これ",
    "m": "chim yên, sao, thế nào (trợ từ)"
  },
  "煥": {
    "hv": "HOÁN",
    "on": "カン",
    "kun": "あきらか",
    "m": "sáng sủa, rực rỡ"
  },
  "煕": {
    "hv": "HY",
    "on": "キ",
    "kun": "たのし・む, ひか・る, ひろ・い, よろこ・ぶ, かわ・く, あきらか, ひろ・める, ひろ・まる",
    "m": "sáng sủa, quang minh, vui vẻ nhộn nhịp, rộng"
  },
  "燎": {
    "hv": "LIỆU",
    "on": "リョウ",
    "kun": "かがりび",
    "m": "cháy lan ra"
  },
  "燿": {
    "hv": "DIỆU",
    "on": "ヨウ",
    "kun": "かがや・く, ひかり",
    "m": "soi, rọi, chói sáng"
  },
  "瑶": {
    "hv": "DAO",
    "on": "ヨウ",
    "kun": "たま",
    "m": "ngọc dao"
  },
  "璧": {
    "hv": "BÍCH",
    "on": "ヘキ",
    "kun": "たま",
    "m": "ngọc bích"
  },
  "甕": {
    "hv": "UNG",
    "on": "オウ",
    "kun": "かめ, みか",
    "m": "vò, chum, vại, hũ, vò, chum, vại, hũ"
  },
  "甦": {
    "hv": "TÔ",
    "on": "ソ, コウ",
    "kun": "よみがえ・る",
    "m": "sống lại"
  },
  "瘍": {
    "hv": "DƯƠNG",
    "on": "ヨウ",
    "kun": "かさ",
    "m": "bệnh mụn nhọt"
  },
  "瘤": {
    "hv": "LƯU",
    "on": "リュウ, ル",
    "kun": "こぶ",
    "m": "nổi cục máu, khối u, nổi cục máu"
  },
  "皓": {
    "hv": "HẠO",
    "on": "コウ",
    "kun": "しろ・い, ひか・る",
    "m": "trắng, sạch sẽ"
  },
  "盧": {
    "hv": "LÔ",
    "on": "ロ",
    "kun": "—",
    "m": "màu đen, màu đen"
  },
  "眞": {
    "hv": "CHÂN",
    "on": "シン",
    "kun": "ま, まこと",
    "m": "thật, thực, người tu hành"
  },
  "眸": {
    "hv": "MÂU",
    "on": "ボウ, ム",
    "kun": "ひとみ",
    "m": "con ngươi mắt"
  },
  "瞑": {
    "hv": "MINH",
    "on": "メイ, ベン, ミョウ, ミン, メン",
    "kun": "めい・する, つぶ・る, つむ・る, くら・い",
    "m": "nhắm mắt"
  },
  "礒": {
    "hv": "NGHỊ",
    "on": "ギ, ガ",
    "kun": "いそ, いわお",
    "m": "rock, beach, shore"
  },
  "笏": {
    "hv": "HỐT",
    "on": "コツ",
    "kun": "しゃく",
    "m": "cái hốt (các quan dùng khi vào trầu)"
  },
  "笘": {
    "hv": "THIÊM",
    "on": "セン, チョウ",
    "kun": "—",
    "m": "whip, cane, wooden writing slate"
  },
  "笙": {
    "hv": "SANH",
    "on": "ショウ, ソウ",
    "kun": "ふえ",
    "m": "sinh (một nhạc cụ như sáo), cái sênh, cái chiếu"
  },
  "箋": {
    "hv": "TIÊN",
    "on": "セン",
    "kun": "ふだ",
    "m": "sách có chỉ dẫn, kiến giải tỉ mỉ"
  },
  "箏": {
    "hv": "TRANH",
    "on": "ソウ, ショウ",
    "kun": "こと",
    "m": "đàn tranh (13 dây)"
  },
  "篆": {
    "hv": "TRIỆN",
    "on": "テン",
    "kun": "—",
    "m": "chữ triện"
  },
  "簑": {
    "hv": "THOA",
    "on": "サ, サイ",
    "kun": "みの",
    "m": "áo tơi, áo tơi"
  },
  "籠": {
    "hv": "LUNG",
    "on": "ロウ, ル",
    "kun": "かご, こ・める, こも・る, こ・む",
    "m": "cái lồng, lồng nhau"
  },
  "簗": {
    "hv": "TRÚC",
    "on": "リョウ",
    "kun": "やな",
    "m": "weir, fish trap, (kokuji)"
  },
  "絆": {
    "hv": "BÁN",
    "on": "ハン",
    "kun": "きずな, ほだ・す, つな・ぐ",
    "m": "cùm lại, giữ lại, vướng, vấp, vật cản trở, chướng ngại vật"
  },
  "綺": {
    "hv": "Ỷ",
    "on": "キ",
    "kun": "あや",
    "m": "vải lụa"
  },
  "綸": {
    "hv": "LUÂN",
    "on": "リン, カン",
    "kun": "いと",
    "m": "cái quạt"
  },
  "緻": {
    "hv": "TRÍ",
    "on": "チ",
    "kun": "こまか・い",
    "m": "suy cho đến cùng, đem lại, đưa đến, tỉ mỉ, kỹ, kín"
  },
  "羞": {
    "hv": "TU",
    "on": "シュウ",
    "kun": "はじ・る, すすめ・る, は・ずかしい",
    "m": "xấu hổ, nhút nhát, đồ ăn ngon"
  },
  "翔": {
    "hv": "TƯỜNG",
    "on": "ショウ",
    "kun": "かけ・る, と・ぶ",
    "m": "liệng quanh, đi vung tay"
  },
  "胚": {
    "hv": "PHÔI",
    "on": "ハイ",
    "kun": "はらみ, はら・む",
    "m": "bào thai, vật chưa làm xong"
  },
  "脩": {
    "hv": "TU",
    "on": "シュウ",
    "kun": "おさ・める, なが・い, ほじし",
    "m": "nem thịt"
  },
  "膠": {
    "hv": "GIAO",
    "on": "コウ, キョウ",
    "kun": "にかわ, にべ",
    "m": "keo, nhựa, dán, dính, cao su"
  },
  "舩": {
    "hv": "THUYỀN",
    "on": "セン",
    "kun": "ふね, ふな-",
    "m": "cái thuyền"
  },
  "茉": {
    "hv": "MẠT",
    "on": "マツ, バツ, マ",
    "kun": "—",
    "m": "cây hoa nhài trắng"
  },
  "茗": {
    "hv": "MINH",
    "on": "ミョウ, メイ",
    "kun": "ちゃ",
    "m": "nõn chè, mầm chè, chè, trà, nõn chè, mầm chè"
  },
  "莉": {
    "hv": "LỊ",
    "on": "リ, ライ, レイ",
    "kun": "—",
    "m": "cây hoa nhài"
  },
  "菫": {
    "hv": "CẬN",
    "on": "キン",
    "kun": "すみれ",
    "m": "râu cần cạn"
  },
  "萬": {
    "hv": "VẠN",
    "on": "マン, バン",
    "kun": "よろず",
    "m": "vạn, mười nghìn"
  },
  "蔡": {
    "hv": "SÁI",
    "on": "サイ",
    "kun": "—",
    "m": "nước Thái"
  },
  "蓼": {
    "hv": "LIỆU",
    "on": "シン, リク, リョウ",
    "kun": "たで",
    "m": "rau đắng (làm đồ gia vị), cao lớn, tốt um (cây)"
  },
  "薔": {
    "hv": "TƯỜNG",
    "on": "バ, ショウ, ショク, ソウ",
    "kun": "みずたで",
    "m": "(xem: tường vi 薔薇)"
  },
  "藏": {
    "hv": "TÀNG",
    "on": "ゾウ, ソウ",
    "kun": "くら, おさ・める, かく・れる",
    "m": "chứa, trữ, giấu, kho chứa đồ"
  },
  "藝": {
    "hv": "NGHỆ",
    "on": "ゲイ, ウン",
    "kun": "う・える, のり, わざ",
    "m": "trồng cây, tài năng"
  },
  "蜷": {
    "hv": "QUYỀN",
    "on": "ケン",
    "kun": "にな",
    "m": "bò ngoằn nghoèo, bò uốn éo"
  },
  "袁": {
    "hv": "VIÊN",
    "on": "エン, オン",
    "kun": "—",
    "m": "áo dài lê thê"
  },
  "襄": {
    "hv": "TƯƠNG",
    "on": "ジョウ, ショウ",
    "kun": "はら・う",
    "m": "sửa trị giúp, ngựa kéo xe, sao đổi ngôi"
  },
  "訃": {
    "hv": "PHÓ",
    "on": "フ",
    "kun": "しらせ",
    "m": "tin buồn, báo tin có tang"
  },
  "詢": {
    "hv": "TUÂN",
    "on": "ジュン, シュン",
    "kun": "はか・る, まこと",
    "m": "hỏi ý kiến mọi người để quyết định"
  },
  "諄": {
    "hv": "TRUÂN",
    "on": "シュン",
    "kun": "ひちくど・い, くど・い, くどくど, ねんご・ろ",
    "m": "chăm dạy, giúp"
  },
  "諧": {
    "hv": "HÀI",
    "on": "カイ",
    "kun": "かな・う, やわ・らぐ",
    "m": "hoà hợp, hài hoà"
  },
  "謳": {
    "hv": "ÂU",
    "on": "オウ, ウ",
    "kun": "うた・う",
    "m": "cùng hát, tiếng trẻ con"
  },
  "貪": {
    "hv": "THAM",
    "on": "タン, ドン, トン",
    "kun": "むさぼ・る",
    "m": "ăn của đút, tham, ham"
  },
  "贅": {
    "hv": "CHUẾ",
    "on": "ゼイ, セイ",
    "kun": "いぼ",
    "m": "thừa ra, rườm rà, ở rể, kén rể"
  },
  "赳": {
    "hv": "CỦ",
    "on": "キュウ",
    "kun": "—",
    "m": "hùng dũng"
  },
  "趙": {
    "hv": "TRIỆU",
    "on": "チョウ, ジョウ, キョウ",
    "kun": "—",
    "m": "họ Triệu, nước Triệu, trả lại"
  },
  "踪": {
    "hv": "TUNG",
    "on": "ソウ, ショウ",
    "kun": "あと",
    "m": "vết chân, tung tích, dấu vết"
  },
  "辣": {
    "hv": "LẠT",
    "on": "ラツ",
    "kun": "から・い",
    "m": "cay xé, nham hiểm, độc ác"
  },
  "迪": {
    "hv": "ĐỊCH",
    "on": "テキ",
    "kun": "みち, みちび・く, すす・む, いた・る",
    "m": "tới, đến, dẫn dắt"
  },
  "鄒": {
    "hv": "TRÂU",
    "on": "スウ, シュ, シュウ",
    "kun": "—",
    "m": "nước Trâu đời nhà Chu (nay thuộc tỉnh Sơn Đông của Trung Quốc), họ Trâu"
  },
  "銕": {
    "hv": "THIẾT",
    "on": "テツ",
    "kun": "くろがね",
    "m": "sắt, Fe"
  },
  "錮": {
    "hv": "CỐ",
    "on": "コ",
    "kun": "ふさ・ぐ",
    "m": "hàn (gắn bằng kim loại)"
  },
  "鍼": {
    "hv": "CHÂM",
    "on": "シン",
    "kun": "はり, さ・す",
    "m": "cái kim, cái kim"
  },
  "闊": {
    "hv": "KHOÁT",
    "on": "カツ",
    "kun": "ひろ・い",
    "m": "rộng rãi, xa vắng, sơ suất"
  },
  "頌": {
    "hv": "TỤNG",
    "on": "ショウ, ジュ, ヨウ",
    "kun": "かたち, たた・える, ほめ・る",
    "m": "khen ngợi, ca tụng"
  },
  "颯": {
    "hv": "TÁP",
    "on": "サツ, ソウ",
    "kun": "さっ・と",
    "m": "tiếng gió thổi vù vù, suy, tàn, rụng"
  },
  "魏": {
    "hv": "NGUỴ",
    "on": "ギ",
    "kun": "たか・い",
    "m": "nước Nguỵ, đời nhà Nguỵ"
  },
  "鴈": {
    "hv": "NHẠN",
    "on": "ガン",
    "kun": "かり, かりがね",
    "m": "chim nhạn"
  },
  "黎": {
    "hv": "LÊ",
    "on": "レイ, リ",
    "kun": "くろ・い",
    "m": "đám đông, họ Lê"
  },
  "凜": {
    "hv": "LẪM",
    "on": "リン",
    "kun": "きびし・い",
    "m": "giá rét, nghiêm nghị"
  },
  "熙": {
    "hv": "HY",
    "on": "キ",
    "kun": "たのし・む, ひか・る, ひろ・い, よろこ・ぶ, かわ・く, あきらか, ひろ・める, ひろ・まる",
    "m": "sáng sủa, quang minh, vui vẻ nhộn nhịp, rộng"
  },
  "塡": {
    "hv": "ĐIỀN",
    "on": "テン, チン",
    "kun": "はま・る, うず・める, は・める, ふさ・ぐ",
    "m": "lấp đầy, điền vào tờ khai, tiếng trống ầm ầm"
  },
  "頰": {
    "hv": "GIÁP",
    "on": "キョウ",
    "kun": "ほお, ほほ",
    "m": "má"
  },
  "𠮟": {
    "hv": "SẤT",
    "on": "シツ, シチ, カ",
    "kun": "しか・る",
    "m": "scold, reprove"
  },
  "剝": {
    "hv": "BÁC",
    "on": "ハク, ホク",
    "kun": "へ・ぐ, へず・る, む・く, む・ける, は・がれる, は・ぐ, は・げる, は・がす",
    "m": "bóc vỏ, lột"
  }
};

/**
 * Lấy âm Hán-Việt cơ bản cho một từ hoặc chuỗi Kanji
 */
function getHanViet(text) {
  if (!text) return '';
  const result = [];
  let hasKanji = false;

  for (const char of text) {
    if (KANJI_DATA[char]) {
      result.push(KANJI_DATA[char].hv);
      hasKanji = true;
    } else if (isKanji(char)) {
      result.push('[' + char + ']');
      hasKanji = true;
    }
  }

  return hasKanji ? result.join(' ') : '';
}

/**
 * Bóc tách chi tiết từng chữ Kanji trong từ ghép (Kanji Decomposition)
 * @param {string} word Từ ghép tiếng Nhật (ví dụ: "日本語", "経済学", "学校")
 * @returns {Array<object>} Danh sách thông tin chi tiết từng Kanji
 */
function decomposeKanji(word) {
  if (!word) return [];
  const list = [];
  const seen = new Set();

  for (const char of word) {
    if (isKanji(char) && !seen.has(char)) {
      seen.add(char);
      if (KANJI_DATA[char]) {
        list.push({
          char: char,
          hv: KANJI_DATA[char].hv,
          on: KANJI_DATA[char].on,
          kun: KANJI_DATA[char].kun,
          m: KANJI_DATA[char].m
        });
      } else {
        list.push({
          char: char,
          hv: '[' + char + ']',
          on: '—',
          kun: '—',
          m: 'Chữ Hán bổ sung'
        });
      }
    }
  }

  return list;
}

/**
 * Kiểm tra ký tự có phải là Kanji
 */
function isKanji(char) {
  if (!char) return false;
  const code = char.charCodeAt(0);
  return (code >= 0x4e00 && code <= 0x9faf) || (code >= 0x3400 && code <= 0x4dbf);
}

// Xuất ra môi trường
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KANJI_DATA, getHanViet, decomposeKanji, isKanji };
}
