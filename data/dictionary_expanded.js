// Kho từ vựng Tiếng Nhật Mở Rộng Toàn Diện Cao Cấp (JLPT N5 - N1)
// Tích hợp từ vựng cốt lõi, Động từ ghép (複合動詞), Katakana IT & Đời sống, Quán ngữ cơ thể & Thành ngữ 4 chữ Yojijukugo

const JP_DICTIONARY_EXPANDED = {
  "家族": {
    "r": "かぞく",
    "m": "Gia đình",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "両親": {
    "r": "りょうしん",
    "m": "Bố mẹ, phụ huynh",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "親": {
    "r": "おや",
    "m": "Bố mẹ, cha mẹ",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "父親": {
    "r": "ちちおや",
    "m": "Người cha, bố",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "母親": {
    "r": "ははおや",
    "m": "Người mẹ, má",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "兄弟": {
    "r": "きょうだい",
    "m": "Anh em, anh chị em",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
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
    "m": "Anh trai (của người khác / xưng hô)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "弟": {
    "r": "おとうと",
    "m": "Em trai (của mình)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 4
  },
  "弟さん": {
    "r": "おとうとさん",
    "m": "Em trai (của người khác)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
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
    "m": "Chị gái (của người khác / xưng hô)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "妹": {
    "r": "いもうと",
    "m": "Em gái (của mình)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 4
  },
  "妹さん": {
    "r": "いもうとさん",
    "m": "Em gái (của người khác)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "祖父": {
    "r": "そふ",
    "m": "Ông (của mình)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "おじいさん": {
    "r": "おじいさん",
    "m": "Ông cụ, ông (người khác)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "祖母": {
    "r": "そぼ",
    "m": "Bà (của mình)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "おばあさん": {
    "r": "おばあさん",
    "m": "Bà cụ, bà (người khác)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "叔父": {
    "r": "おじ",
    "m": "Chú, bác, cậu (của mình)",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "叔母": {
    "r": "おば",
    "m": "Cô, dì, thím (của mình)",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
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
  "ご主人": {
    "r": "ごしゅじん",
    "m": "Chồng (người khác)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "奥さん": {
    "r": "おくさん",
    "m": "Vợ (người khác)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "息子": {
    "r": "むすこ",
    "m": "Con trai (của mình)",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "娘": {
    "r": "むすめ",
    "m": "Con gái (của mình)",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 3
  },
  "赤ちゃん": {
    "r": "あかちゃん",
    "m": "Em bé sơ sinh",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "大人": {
    "r": "おとな",
    "m": "Người lớn, người trưởng thành",
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
  "友達": {
    "r": "ともだち",
    "m": "Bạn bè",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "友人": {
    "r": "ゆうじん",
    "m": "Bạn thân, bạn bè",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "親友": {
    "r": "しんゆう",
    "m": "Bạn thân, tri kỷ",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "仲間": {
    "r": "なかま",
    "m": "Đồng đội, nhóm bạn, bạn cùng hội",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "彼": {
    "r": "かれ",
    "m": "Anh ấy, bạn trai",
    "t": "Đại từ N5",
    "pos": "pn",
    "p": 1
  },
  "彼女": {
    "r": "かのじょ",
    "m": "Cô ấy, bạn gái",
    "t": "Đại từ N5",
    "pos": "pn",
    "p": 1
  },
  "彼ら": {
    "r": "かれら",
    "m": "Họ, bọn họ",
    "t": "Đại từ N4",
    "pos": "pn",
    "p": 1
  },
  "僕": {
    "r": "ぼく",
    "m": "Tôi, tớ (nam giới thân mật)",
    "t": "Đại từ N5",
    "pos": "pn",
    "p": 1
  },
  "俺": {
    "r": "おれ",
    "m": "Tao, tớ (nam giới suồng sã)",
    "t": "Đại từ N3",
    "pos": "pn",
    "p": 0
  },
  "自分": {
    "r": "じぶん",
    "m": "Bản thân, chính mình",
    "t": "Đại từ N5",
    "pos": "pn",
    "p": 0
  },
  "自身": {
    "r": "じしん",
    "m": "Tự thân, chính mình",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "誰": {
    "r": "だれ",
    "m": "Ai (nghi vấn từ)",
    "t": "Đại từ N5",
    "pos": "pn",
    "p": 1
  },
  "どなた": {
    "r": "どなた",
    "m": "Vị nào, ai (kính ngữ)",
    "t": "Đại từ N5",
    "pos": "pn",
    "p": 1
  },
  "皆様": {
    "r": "みなさま",
    "m": "Quý vị, mọi người (kính cẩn)",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "昨日": {
    "r": "きのう",
    "m": "Hôm qua",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
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
  "一昨日": {
    "r": "おととい",
    "m": "Hôm kia",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "明後日": {
    "r": "あさって",
    "m": "Ngày kia",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "先週": {
    "r": "せんしゅう",
    "m": "Tuần trước",
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
  "来週": {
    "r": "らいしゅう",
    "m": "Tuần sau",
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
  "今月": {
    "r": "こんげつ",
    "m": "Tháng này",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "来月": {
    "r": "らいげつ",
    "m": "Tháng sau",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "去年": {
    "r": "きょねん",
    "m": "Năm ngoái",
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
  "来年": {
    "r": "らいねん",
    "m": "Năm sau",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "毎日": {
    "r": "まいにち",
    "m": "Mỗi ngày, hàng ngày",
    "t": "Phó từ / Danh từ N5",
    "pos": "adv,n",
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
  "夕方": {
    "r": "ゆうがた",
    "m": "Hoàng hôn, chiều tối",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "晩": {
    "r": "ばん",
    "m": "Buổi tối, đêm",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "夜": {
    "r": "よる",
    "m": "Ban đêm",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "今夜": {
    "r": "こんや",
    "m": "Tối nay, đêm nay",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "昨夜": {
    "r": "ゆうべ",
    "m": "Tối hôm qua",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "昼間": {
    "r": "ひるま",
    "m": "Ban ngày, giữa ban ngày",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 3
  },
  "夜中": {
    "r": "よなか",
    "m": "Nửa đêm",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "春": {
    "r": "はる",
    "m": "Mùa xuân",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "夏": {
    "r": "なつ",
    "m": "Mùa hè",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "秋": {
    "r": "あき",
    "m": "Mùa thu",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "冬": {
    "r": "ふゆ",
    "m": "Mùa đông",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "平日": {
    "r": "へいじつ",
    "m": "Ngày thường trong tuần",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "休日": {
    "r": "きゅうじつ",
    "m": "Ngày nghỉ",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "祝日": {
    "r": "しゅくじつ",
    "m": "Ngày lễ quốc gia",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "週末": {
    "r": "しゅうまつ",
    "m": "Cuối tuần",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "月末": {
    "r": "げつまつ",
    "m": "Cuối tháng",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "年末": {
    "r": "ねんまつ",
    "m": "Cuối năm",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "時代": {
    "r": "じだい",
    "m": "Thời đại, thời kỳ",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "期間": {
    "r": "きかん",
    "m": "Giai đoạn, thời hạn",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 2
  },
  "締め切り": {
    "r": "しめきり",
    "m": "Hạn chót, deadline",
    "t": "Danh từ N4",
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
  "朝食": {
    "r": "ちょうしょく",
    "m": "Bữa ăn sáng",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "昼食": {
    "r": "ちゅうしょく",
    "m": "Bữa ăn trưa",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "夕食": {
    "r": "ゆうしょく",
    "m": "Bữa ăn tối",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "料理": {
    "r": "りょうり",
    "m": "Món ăn, nấu ăn",
    "t": "Danh từ N5",
    "pos": "n,vs",
    "p": 1
  },
  "肉": {
    "r": "にく",
    "m": "Thịt",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "牛肉": {
    "r": "ぎゅうにく",
    "m": "Thịt bò",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "豚肉": {
    "r": "ぶたにく",
    "m": "Thịt lợn, thịt heo",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "鶏肉": {
    "r": "とりにく",
    "m": "Thịt gà",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "魚": {
    "r": "さかな",
    "m": "Con cá",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "野菜": {
    "r": "やさい",
    "m": "Rau củ quả",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "果物": {
    "r": "くだもの",
    "m": "Hoa quả, trái cây",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "米": {
    "r": "こめ",
    "m": "Gạo",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "卵": {
    "r": "たまご",
    "m": "Trứng (gà, vịt)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "砂糖": {
    "r": "さとう",
    "m": "Đường ăn",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "塩": {
    "r": "しお",
    "m": "Muối ăn",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "醤油": {
    "r": "しょうゆ",
    "m": "Nước tương Nhật Bản",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "油": {
    "r": "あぶら",
    "m": "Dầu ăn, mỡ",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "お茶": {
    "r": "おちゃ",
    "m": "Trà xanh, nước chè",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "紅茶": {
    "r": "こうちゃ",
    "m": "Hồng trà, trà đen",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "水": {
    "r": "みず",
    "m": "Nước lọc, nước lã",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "お湯": {
    "r": "おゆ",
    "m": "Nước nóng, nước sôi",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "酒": {
    "r": "さけ",
    "m": "Rượu Nhật, đồ uống có cồn",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "乾杯": {
    "r": "かんぱい",
    "m": "Cạn ly! Nâng ly!",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "外食": {
    "r": "がいしょく",
    "m": "Ăn ngoài tiệm",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "定食": {
    "r": "ていしょく",
    "m": "Suất ăn cơm phần theo set",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "弁当": {
    "r": "べんとう",
    "m": "Cơm hộp bento",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "味": {
    "r": "あじ",
    "m": "Hương vị",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "匂い": {
    "r": "におい",
    "m": "Mùi hương, mùi vị",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "家": {
    "r": "いえ",
    "m": "Ngôi nhà, nhà ở",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "部屋": {
    "r": "へや",
    "m": "Căn phòng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "台所": {
    "r": "だいどころ",
    "m": "Nhà bếp, gian bếp",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "玄関": {
    "r": "げんかん",
    "m": "Tiền sảnh, cửa vào nhà",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "風呂": {
    "r": "ふろ",
    "m": "Bồn tắm, việc tắm bồn",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "病院": {
    "r": "びょういん",
    "m": "Bệnh viện",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
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
    "m": "Đồn cảnh sát nhỏ khu phố (Koban)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "駅": {
    "r": "えき",
    "m": "Nhà ga xe điện",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "空港": {
    "r": "くうこう",
    "m": "Sân bay, phi trường",
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
  "図書館": {
    "r": "としょかん",
    "m": "Thư viện",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "映画館": {
    "r": "えいがかん",
    "m": "Rạp chiếu phim",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "美術館": {
    "r": "びじゅつかん",
    "m": "Bảo tàng mỹ thuật",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 3
  },
  "博物館": {
    "r": "はくぶつかん",
    "m": "Bảo tàng lịch sử",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 4
  },
  "水族館": {
    "r": "すいぞくかん",
    "m": "Thủy cung",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 4
  },
  "大使館": {
    "r": "たいしかん",
    "m": "Đại sứ quán",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 3
  },
  "市役所": {
    "r": "しやくしょ",
    "m": "Ủy ban thành phố",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "警察署": {
    "r": "けいさつしょ",
    "m": "Sở cảnh sát",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 4
  },
  "消防署": {
    "r": "しょうぼうしょ",
    "m": "Trạm cứu hỏa",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 4
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
    "m": "Tàu siêu tốc Shinkansen",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
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
    "m": "Tàu thuyền",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "自転車": {
    "r": "じてんしゃ",
    "m": "Xe đạp",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "自動車": {
    "r": "じどうしゃ",
    "m": "Xe ô tô",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "切符": {
    "r": "きっぷ",
    "m": "Vé tàu, vé xe",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "定期券": {
    "r": "ていきけん",
    "m": "Vé tháng, vé định kỳ",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "案内所": {
    "r": "あんないじょ",
    "m": "Quầy hướng dẫn thông tin",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "出発": {
    "r": "しゅっぱつ",
    "m": "Xuất phát, khởi hành",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "到着": {
    "r": "とうちゃく",
    "m": "Đến nơi, cập bến",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "乗り換え": {
    "r": "のりかえ",
    "m": "Chuyển tàu, đổi tuyến",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "事故": {
    "r": "じこ",
    "m": "Tai nạn, sự cố va chạm",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "渋滞": {
    "r": "じゅうたい",
    "m": "Kẹt xe, tắc đường",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
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
  "社長": {
    "r": "しゃちょう",
    "m": "Giám đốc, tổng giám đốc",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "部長": {
    "r": "ぶちょう",
    "m": "Trưởng phòng",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "課長": {
    "r": "かちょう",
    "m": "Trưởng nhóm, trưởng khoa",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "同僚": {
    "r": "どうりょう",
    "m": "Đồng nghiệp",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "先輩": {
    "r": "せんぱい",
    "m": "Tiền bối, đàn anh đàn chị",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "後輩": {
    "r": "こうはい",
    "m": "Hậu bối, đàn em",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "上司": {
    "r": "じょうし",
    "m": "Cấp trên, sếp",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "部下": {
    "r": "ぶか",
    "m": "Cấp dưới",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "面接": {
    "r": "めんせつ",
    "m": "Phỏng vấn xin việc",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "履歴書": {
    "r": "りれきしょ",
    "m": "Sơ yếu lý lịch, CV",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "給料": {
    "r": "きゅうりょう",
    "m": "Tiền lương",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "残業": {
    "r": "ざんぎょう",
    "m": "Làm thêm giờ (OT)",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "出張": {
    "r": "しゅっちょう",
    "m": "Đi công tác",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "有給": {
    "r": "ゆうきゅう",
    "m": "Nghỉ phép có lương",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "退職": {
    "r": "たいしょく",
    "m": "Nghỉ việc, thôi việc",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "転職": {
    "r": "てんしょく",
    "m": "Chuyển việc",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "就職": {
    "r": "しゅうしょく",
    "m": "Tìm việc, vào làm",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "会議": {
    "r": "かいぎ",
    "m": "Cuộc họp, hội nghị",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 1
  },
  "資料": {
    "r": "しりょう",
    "m": "Tài liệu, dữ liệu",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "書類": {
    "r": "しょるい",
    "m": "Hồ sơ, giấy tờ văn bản",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "営業": {
    "r": "えいぎょう",
    "m": "Kinh doanh, bán hàng",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "契約": {
    "r": "けいやく",
    "m": "Hợp đồng, thỏa thuận",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "授業": {
    "r": "じゅぎょう",
    "m": "Giờ học, buổi học",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "講義": {
    "r": "こうぎ",
    "m": "Bài giảng đại học",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 1
  },
  "試験": {
    "r": "しけん",
    "m": "Kỳ thi, bài kiểm tra",
    "t": "Danh từ N5",
    "pos": "n,vs",
    "p": 2
  },
  "成績": {
    "r": "せいせき",
    "m": "Thành tích, bảng điểm",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "合格": {
    "r": "ごうかく",
    "m": "Thi đỗ, trúng tuyển",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "不合格": {
    "r": "ふごうかく",
    "m": "Thi trượt",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "宿題": {
    "r": "しゅくだい",
    "m": "Bài tập về nhà",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "予習": {
    "r": "よしゅう",
    "m": "Chuẩn bị bài trước",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "復習": {
    "r": "ふくしゅう",
    "m": "Ôn tập bài cũ",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "専門": {
    "r": "せんもん",
    "m": "Chuyên ngành, chuyên môn",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "知識": {
    "r": "ちしき",
    "m": "Kiến thức, tri thức",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "技術": {
    "r": "ぎじゅつ",
    "m": "Kỹ thuật, công nghệ",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "留学": {
    "r": "りゅうがく",
    "m": "Du học",
    "t": "Danh từ N5",
    "pos": "n,vs",
    "p": 0
  },
  "奨学金": {
    "r": "しょうがくきん",
    "m": "Học bổng",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "頭": {
    "r": "あたま",
    "m": "Đầu",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "顔": {
    "r": "かお",
    "m": "Khuôn mặt",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "目": {
    "r": "め",
    "m": "Mắt",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "鼻": {
    "r": "はな",
    "m": "Mũi",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
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
  "首": {
    "r": "くび",
    "m": "Cổ",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "肩": {
    "r": "かた",
    "m": "Vai",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "腕": {
    "r": "うで",
    "m": "Cánh tay",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "手": {
    "r": "て",
    "m": "Bàn tay",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "指": {
    "r": "ゆび",
    "m": "Ngón tay",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "胸": {
    "r": "むね",
    "m": "Ngực, lòng",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "背中": {
    "r": "せなか",
    "m": "Lưng",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "腰": {
    "r": "こし",
    "m": "Hông, eo, thắt lưng",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "腹": {
    "r": "はら",
    "m": "Bụng",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "胃": {
    "r": "い",
    "m": "Dạ dày",
    "t": "Danh từ N4",
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
  "膝": {
    "r": "ひざ",
    "m": "Đầu gối",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "心臓": {
    "r": "しんぞう",
    "m": "Trái tim",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
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
    "m": "Cảm cúm, trúng gió",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "熱": {
    "r": "ねつ",
    "m": "Cơn sốt / Nhiệt độ đồ vật",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "咳": {
    "r": "せき",
    "m": "Cơn ho",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "痛み": {
    "r": "いたみ",
    "m": "Cơn đau",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 3
  },
  "怪我": {
    "r": "けが",
    "m": "Vết thương, thương tích",
    "t": "Danh từ / Động từ N4",
    "pos": "n,vs",
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
  "看護師": {
    "r": "かんごし",
    "m": "Y tá, điều dưỡng",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 3
  },
  "患者": {
    "r": "かんじゃ",
    "m": "Bệnh nhân",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "救急車": {
    "r": "きゅうきゅうしゃ",
    "m": "Xe cứu thương",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 3
  },
  "健康": {
    "r": "けんこう",
    "m": "Sức khỏe, lành mạnh",
    "t": "Danh từ N4",
    "pos": "n,adj-na",
    "p": 0
  },
  "空": {
    "r": "そら",
    "m": "Bầu trời",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "雲": {
    "r": "くも",
    "m": "Đám mây",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "雨": {
    "r": "あめ",
    "m": "Cơn mưa",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "雪": {
    "r": "ゆき",
    "m": "Tuyết rơi",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "風": {
    "r": "かぜ",
    "m": "Cơn gió thổi",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "雷": {
    "r": "かみなり",
    "m": "Sấm sét, sấm chớp",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 3
  },
  "台風": {
    "r": "たいふう",
    "m": "Cơn bão nhiệt đới",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "地震": {
    "r": "じしん",
    "m": "Động đất địa chấn",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "津波": {
    "r": "つなみ",
    "m": "Sóng thần đại dương",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "景色": {
    "r": "けしき",
    "m": "Phong cảnh, cảnh sắc",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "自然": {
    "r": "しぜん",
    "m": "Tự nhiên, thiên nhiên",
    "t": "Danh từ N4",
    "pos": "n,adj-na",
    "p": 0
  },
  "環境": {
    "r": "かんきょう",
    "m": "Môi trường",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "太陽": {
    "r": "たいよう",
    "m": "Mặt trời",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "月": {
    "r": "つき",
    "m": "Mặt trăng / Tháng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "星": {
    "r": "ほし",
    "m": "Ngôi sao trên trời",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "海": {
    "r": "うみ",
    "m": "Biển cả, đại dương",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "山": {
    "r": "やま",
    "m": "Ngọn núi",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "川": {
    "r": "かわ",
    "m": "Con sông",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "森": {
    "r": "もり",
    "m": "Rừng cây rậm rạp",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "林": {
    "r": "はやし",
    "m": "Khu rừng nhỏ, rừng thưa",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 3
  },
  "木": {
    "r": "き",
    "m": "Cây cối, gỗ",
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
  "桜": {
    "r": "さくら",
    "m": "Hoa anh đào Sakura",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "会う": {
    "r": "あう",
    "m": "Gặp gỡ",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 1
  },
  "開く": {
    "r": "あく",
    "m": "Mở ra (tự động từ)",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "開ける": {
    "r": "あける",
    "m": "Mở (tha động từ)",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 0
  },
  "閉まる": {
    "r": "しまる",
    "m": "Đóng lại (tự động từ)",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 2
  },
  "閉める": {
    "r": "しめる",
    "m": "Đóng (tha động từ)",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 2
  },
  "あげる": {
    "r": "あげる",
    "m": "Tặng, cho",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 0
  },
  "もらう": {
    "r": "もらう",
    "m": "Nhận được",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "くれる": {
    "r": "くれる",
    "m": "Cho tôi, tặng tôi",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 0
  },
  "遊ぶ": {
    "r": "あそぶ",
    "m": "Chơi, vui chơi",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "洗う": {
    "r": "あらう",
    "m": "Rửa, giặt",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "歩く": {
    "r": "あるく",
    "m": "Đi bộ",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 2
  },
  "走る": {
    "r": "はしる",
    "m": "Chạy",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 2
  },
  "言う": {
    "r": "いう",
    "m": "Nói",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "話す": {
    "r": "はなす",
    "m": "Nói chuyện, trò chuyện",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 2
  },
  "聞く": {
    "r": "きく",
    "m": "Nghe, hỏi",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "行く": {
    "r": "いく",
    "m": "Đi",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "帰る": {
    "r": "かえる",
    "m": "Về (nhà, nước)",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 1
  },
  "歌う": {
    "r": "うたう",
    "m": "Hát",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "売る": {
    "r": "うる",
    "m": "Bán",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "買う": {
    "r": "かう",
    "m": "Mua",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "置く": {
    "r": "おく",
    "m": "Đặt, để",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "送る": {
    "r": "おくる",
    "m": "Gửi, tiễn",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "押す": {
    "r": "おす",
    "m": "Ấn, đẩy",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "引く": {
    "r": "ひく",
    "m": "Kéo, tra từ",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "泳ぐ": {
    "r": "およぐ",
    "m": "Bơi",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 2
  },
  "降りる": {
    "r": "おりる",
    "m": "Xuống (xe, núi)",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 2
  },
  "降る": {
    "r": "ふる",
    "m": "Rơi (mưa, tuyết)",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 1
  },
  "終わる": {
    "r": "おわる",
    "m": "Kết thúc (tự động từ)",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "始める": {
    "r": "はじめる",
    "m": "Bắt đầu (tha động từ)",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 0
  },
  "始まる": {
    "r": "はじまる",
    "m": "Bắt đầu (tự động từ)",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "返す": {
    "r": "かえす",
    "m": "Trả lại",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 1
  },
  "書く": {
    "r": "かく",
    "m": "Viết, vẽ",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 1
  },
  "貸す": {
    "r": "かす",
    "m": "Cho vay, cho mượn",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "借りる": {
    "r": "かりる",
    "m": "Vay, mượn",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 0
  },
  "消す": {
    "r": "けす",
    "m": "Xóa, tắt (đèn)",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "消える": {
    "r": "きえる",
    "m": "Tắt, biến mất",
    "t": "Động từ Nhóm 2 N4",
    "pos": "v2",
    "p": 0
  },
  "つける": {
    "r": "つける",
    "m": "Bật (đèn, máy)",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 2
  },
  "つく": {
    "r": "つく",
    "m": "Bật sáng, dính",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 1
  },
  "答える": {
    "r": "こたえる",
    "m": "Trả lời",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 2
  },
  "困る": {
    "r": "こまる",
    "m": "Khốn đốn, bối rối",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 2
  },
  "咲く": {
    "r": "さく",
    "m": "Nở hoa",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "死ぬ": {
    "r": "しぬ",
    "m": "Chết",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "知る": {
    "r": "しる",
    "m": "Biết",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "住む": {
    "r": "すむ",
    "m": "Sinh sống, trú ngụ",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 1
  },
  "出す": {
    "r": "だす",
    "m": "Lấy ra, nộp bài",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 1
  },
  "出る": {
    "r": "でる",
    "m": "Rời khỏi, xuất hiện",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 1
  },
  "立つ": {
    "r": "たつ",
    "m": "Đứng dậy",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 1
  },
  "座る": {
    "r": "すわる",
    "m": "Ngồi xuống",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "頼む": {
    "r": "たのむ",
    "m": "Nhờ vả, yêu cầu",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 2
  },
  "食べる": {
    "r": "たべる",
    "m": "Ăn",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 2
  },
  "飲む": {
    "r": "のむ",
    "m": "Uống",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 1
  },
  "使う": {
    "r": "つかう",
    "m": "Sử dụng, dùng",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "作る": {
    "r": "つくる",
    "m": "Chế tạo, nấu, làm",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 2
  },
  "着く": {
    "r": "つく",
    "m": "Đến nơi",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 1
  },
  "着る": {
    "r": "きる",
    "m": "Mặc (áo)",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 0
  },
  "履く": {
    "r": "はく",
    "m": "Đi (giày, quần)",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "脱ぐ": {
    "r": "ぬぐ",
    "m": "Cởi (quần áo, giày)",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 1
  },
  "泊まる": {
    "r": "とまる",
    "m": "Trọ lại, nghỉ đêm",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 0
  },
  "止まる": {
    "r": "とまる",
    "m": "Dừng lại (tự động từ)",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "止める": {
    "r": "とめる",
    "m": "Dừng lại (tha động từ)",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 0
  },
  "取る": {
    "r": "とる",
    "m": "Lấy, cầm",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 1
  },
  "撮る": {
    "r": "とる",
    "m": "Chụp (ảnh)",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 1
  },
  "並ぶ": {
    "r": "ならぶ",
    "m": "Xếp hàng (tự động từ)",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "並べる": {
    "r": "ならべる",
    "m": "Sắp xếp (tha động từ)",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 0
  },
  "習う": {
    "r": "ならう",
    "m": "Học (có người dạy)",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 2
  },
  "教える": {
    "r": "おしえる",
    "m": "Dạy, chỉ bảo",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 0
  },
  "寝る": {
    "r": "ねる",
    "m": "Ngủ, đi ngủ",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 0
  },
  "登る": {
    "r": "のぼる",
    "m": "Leo núi, trèo",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "乗る": {
    "r": "のる",
    "m": "Lên xe, cưỡi",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "入る": {
    "r": "はいる",
    "m": "Đi vào, bước vào",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 1
  },
  "入れる": {
    "r": "いれる",
    "m": "Bỏ vào, cho vào",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 0
  },
  "働く": {
    "r": "はたらく",
    "m": "Làm việc, lao động",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "待つ": {
    "r": "まつ",
    "m": "Chờ đợi",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 1
  },
  "磨く": {
    "r": "みがく",
    "m": "Đánh răng, đánh bóng",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "見せる": {
    "r": "みせる",
    "m": "Cho xem, trình ra",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 2
  },
  "見る": {
    "r": "みる",
    "m": "Nhìn, xem",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 1
  },
  "持つ": {
    "r": "もつ",
    "m": "Cầm, nắm, sở hữu",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 1
  },
  "呼ぶ": {
    "r": "よぶ",
    "m": "Gọi, kêu",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "読む": {
    "r": "よむ",
    "m": "Đọc",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 1
  },
  "わかる": {
    "r": "わかる",
    "m": "Hiểu, nắm rõ",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 2
  },
  "渡す": {
    "r": "わたす",
    "m": "Trao cho, đưa cho",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "渡る": {
    "r": "わたる",
    "m": "Băng qua (đường, cầu)",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "思い出す": {
    "r": "おもいだす",
    "m": "Nhớ ra, hồi tưởng lại",
    "t": "Động từ Ghép N4",
    "pos": "v1",
    "p": 4
  },
  "思いつく": {
    "r": "おもいつく",
    "m": "Nảy ra ý tưởng, nghĩ ra sáng kiến",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 4
  },
  "思い込む": {
    "r": "おもいこむ",
    "m": "Đinh ninh, mặc định, cả nghĩ, ngộ nhận",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 4
  },
  "立ち上がる": {
    "r": "たちあがる",
    "m": "Đứng dậy, vùng dậy",
    "t": "Động từ Ghép N4",
    "pos": "v1",
    "p": 4
  },
  "立ち止まる": {
    "r": "たちどまる",
    "m": "Dừng bước, đứng khựng lại",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 4
  },
  "見つける": {
    "r": "みつける",
    "m": "Tìm thấy, phát hiện ra (tha)",
    "t": "Động từ Ghép N4",
    "pos": "v2",
    "p": 0
  },
  "見つかる": {
    "r": "みつかる",
    "m": "Được tìm thấy, bị phát hiện",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 0
  },
  "見上げる": {
    "r": "みあげる",
    "m": "Ngước nhìn lên, kính trọng",
    "t": "Động từ Ghép N3",
    "pos": "v2",
    "p": 0
  },
  "見下ろす": {
    "r": "みおろす",
    "m": "Nhìn xuống từ trên cao, coi thường",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 3
  },
  "見直す": {
    "r": "みなおす",
    "m": "Xem lại, đánh giá lại",
    "t": "Động từ Ghép N3",
    "pos": "v1",
    "p": 0
  },
  "見送る": {
    "r": "みおくる",
    "m": "Tiễn đưa ai đó, hoãn lại kế hoạch",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 0
  },
  "引き受ける": {
    "r": "ひきうける",
    "m": "Nhận lời, đảm nhận (công việc, trách nhiệm)",
    "t": "Động từ Nhóm 2 N3",
    "pos": "v2",
    "p": 4
  },
  "引き出す": {
    "r": "ひきだす",
    "m": "Rút tiền, kéo ra, phát huy (tiềm năng)",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 3
  },
  "受け取る": {
    "r": "うけとる",
    "m": "Nhận lấy, tiếp nhận",
    "t": "Động từ Ghép N4",
    "pos": "v1",
    "p": 3
  },
  "受け入れる": {
    "r": "うけいれる",
    "m": "Tiếp nhận, chấp nhận, dung nạp",
    "t": "Động từ Nhóm 2 N2",
    "pos": "v2",
    "p": 4
  },
  "乗り換える": {
    "r": "のりかえる",
    "m": "Đổi tàu xe, chuyển hướng",
    "t": "Động từ Ghép N4",
    "pos": "v2",
    "p": 4
  },
  "乗り越える": {
    "r": "のりこえる",
    "m": "Vượt qua (khó khăn, thử thách, rào cản)",
    "t": "Động từ Nhóm 2 N2",
    "pos": "v2",
    "p": 5
  },
  "話し合う": {
    "r": "はなしあう",
    "m": "Bàn bạc, trao đổi ý kiến với nhau",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 4
  },
  "話し掛ける": {
    "r": "はなしかける",
    "m": "Bắt chuyện, gợi chuyện",
    "t": "Động từ Ghép N3",
    "pos": "v2",
    "p": 5
  },
  "助け合う": {
    "r": "たすけあう",
    "m": "Giúp đỡ lẫn nhau, tương trợ",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 4
  },
  "付き合う": {
    "r": "つきあう",
    "m": "Hẹn hò, giao lưu, đi cùng nhau",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 3
  },
  "申し込む": {
    "r": "もうしこむ",
    "m": "Đăng ký, xin phép",
    "t": "Động từ Ghép N4",
    "pos": "v1",
    "p": 3
  },
  "締め切る": {
    "r": "しめきる",
    "m": "Đóng cửa, hết hạn đăng ký",
    "t": "Động từ Ghép N3",
    "pos": "v1",
    "p": 3
  },
  "売り切れる": {
    "r": "うりきれる",
    "m": "Bán hết sạch hàng (sold out)",
    "t": "Động từ Nhóm 2 N4",
    "pos": "v2",
    "p": 4
  },
  "片付ける": {
    "r": "かたづける",
    "m": "Dọn dẹp, thu xếp gọn gàng",
    "t": "Động từ Ghép N4",
    "pos": "v2",
    "p": 4
  },
  "落ち着く": {
    "r": "おちつく",
    "m": "Bình tĩnh, lắng dịu, định cư",
    "t": "Động từ Ghép N3",
    "pos": "v1",
    "p": 0
  },
  "追いかける": {
    "r": "おいかける",
    "m": "Đuổi theo, rượt đuổi",
    "t": "Động từ Ghép N3",
    "pos": "v2",
    "p": 4
  },
  "追いつく": {
    "r": "おいつく",
    "m": "Đuổi kịp, bắt kịp",
    "t": "Động từ Ghép N3",
    "pos": "v1",
    "p": 3
  },
  "通り過ぎる": {
    "r": "とおりすぎる",
    "m": "Đi ngang qua, vượt quá",
    "t": "Động từ Ghép N3",
    "pos": "v2",
    "p": 5
  },
  "通りかかる": {
    "r": "とおりかかる",
    "m": "Tình cờ đi ngang qua",
    "t": "Động từ Ghép N3",
    "pos": "v1",
    "p": 5
  },
  "生き残る": {
    "r": "いきのこる",
    "m": "Sống sót, tồn tại qua khó khăn",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 4
  },
  "生き返る": {
    "r": "いきかえる",
    "m": "Hồi sinh, tỉnh lại",
    "t": "Động từ Ghép N3",
    "pos": "v1",
    "p": 4
  },
  "飛び出す": {
    "r": "とびだす",
    "m": "Lao vút ra ngoài, phóng ra đường bất thình lình",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 3
  },
  "飛び乗る": {
    "r": "とびのる",
    "m": "Nhảy vọt lên xe",
    "t": "Động từ Ghép N3",
    "pos": "v1",
    "p": 3
  },
  "取り組む": {
    "r": "とりくむ",
    "m": "Chuyên tâm nỗ lực, giải quyết (vấn đề, đề án)",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 3
  },
  "取り消す": {
    "r": "とりけす",
    "m": "Hủy bỏ, thu hồi lại",
    "t": "Động từ Ghép N4",
    "pos": "v1",
    "p": 3
  },
  "取り入れる": {
    "r": "とりいれる",
    "m": "Áp dụng, thu nạp ý kiến",
    "t": "Động từ Ghép N3",
    "pos": "v2",
    "p": 4
  },
  "取り出す": {
    "r": "とりだす",
    "m": "Lấy ra, móc ra",
    "t": "Động từ Ghép N4",
    "pos": "v1",
    "p": 3
  },
  "問い合わせる": {
    "r": "といあわせる",
    "m": "Hỏi thăm, liên hệ tra hỏi",
    "t": "Động từ Ghép N3",
    "pos": "v2",
    "p": 5
  },
  "やり直す": {
    "r": "やりなおす",
    "m": "Làm lại từ đầu, bắt đầu lại",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 4
  },
  "書き直す": {
    "r": "かきなおす",
    "m": "Viết lại cho chuẩn, chép lại",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 4
  },
  "作り直す": {
    "r": "つくりなおす",
    "m": "Chế tạo lại, làm lại món đồ",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 5
  },
  "出迎える": {
    "r": "でむかえる",
    "m": "Đón tiếp nồng hậu",
    "t": "Động từ Ghép N3",
    "pos": "v2",
    "p": 4
  },
  "持ち上げる": {
    "r": "もちあげる",
    "m": "Nâng lên, ca tụng",
    "t": "Động từ Ghép N3",
    "pos": "v2",
    "p": 4
  },
  "差し上げる": {
    "r": "さしあげる",
    "m": "Kính tặng, dâng lên (khiêm nhường)",
    "t": "Động từ Ghép N4",
    "pos": "v2",
    "p": 0
  },
  "差し出す": {
    "r": "さしだす",
    "m": "Đưa tay ra, nộp trình",
    "t": "Động từ Ghép N3",
    "pos": "v1",
    "p": 3
  },
  "抱きしめる": {
    "r": "だきしめる",
    "m": "Ôm chặt vào lòng",
    "t": "Động từ Ghép N3",
    "pos": "v2",
    "p": 4
  },
  "引き止める": {
    "r": "ひきとめる",
    "m": "Giữ lại, níu kéo, can ngăn",
    "t": "Động từ Nhóm 2 N2",
    "pos": "v2",
    "p": 4
  },
  "美しい": {
    "r": "うつくしい",
    "m": "Đẹp đẽ, mỹ lệ, tuyệt trần",
    "t": "Tính từ -i N4",
    "pos": "adj-i",
    "p": 4
  },
  "優しい": {
    "r": "やさしい",
    "m": "Hiền lành, dịu dàng, chu đáo",
    "t": "Tính từ -i N5",
    "pos": "adj-i",
    "p": 0
  },
  "易しい": {
    "r": "やさしい",
    "m": "Dễ dàng, không khó",
    "t": "Tính từ -i N5",
    "pos": "adj-i",
    "p": 0
  },
  "厳しい": {
    "r": "きびしい",
    "m": "Nghiêm khắc, khắc nghiệt",
    "t": "Tính từ -i N4",
    "pos": "adj-i",
    "p": 3
  },
  "激しい": {
    "r": "はげしい",
    "m": "Dữ dội, mãnh liệt, kịch liệt",
    "t": "Tính từ -i N3",
    "pos": "adj-i",
    "p": 3
  },
  "詳しい": {
    "r": "くわしい",
    "m": "Chi tiết, tường tận, am hiểu",
    "t": "Tính từ -i N4",
    "pos": "adj-i",
    "p": 3
  },
  "貧しい": {
    "r": "まずしい",
    "m": "Nghèo khó, túng thiếu",
    "t": "Tính từ -i N3",
    "pos": "adj-i",
    "p": 3
  },
  "怪しい": {
    "r": "あやしい",
    "m": "Đáng ngờ, khả nghi",
    "t": "Tính từ -i N3",
    "pos": "adj-i",
    "p": 0
  },
  "恥ずかしい": {
    "r": "はずかしい",
    "m": "Xấu hổ, ngượng ngùng",
    "t": "Tính từ -i N4",
    "pos": "adj-i",
    "p": 4
  },
  "恐ろしい": {
    "r": "おそろしい",
    "m": "Đáng sợ, ghê gớm, kinh hoàng",
    "t": "Tính từ -i N4",
    "pos": "adj-i",
    "p": 4
  },
  "素晴らしい": {
    "r": "すばらしい",
    "m": "Tuyệt vời, xuất sắc",
    "t": "Tính từ -i N4",
    "pos": "adj-i",
    "p": 4
  },
  "懐かしい": {
    "r": "なつかしい",
    "m": "Hoài niệm, nhớ nhung kỷ niệm",
    "t": "Tính từ -i N3",
    "pos": "adj-i",
    "p": 4
  },
  "悔しい": {
    "r": "くやしい",
    "m": "Tiếc nuối, cay đắng, ấm ức",
    "t": "Tính từ -i N4",
    "pos": "adj-i",
    "p": 3
  },
  "羨ましい": {
    "r": "うらやましい",
    "m": "Ghen tị, thèm muốn như người ta",
    "t": "Tính từ -i N3",
    "pos": "adj-i",
    "p": 5
  },
  "険しい": {
    "r": "けわしい",
    "m": "Hiểm trở, hiểm hóc, dốc đứng",
    "t": "Tính từ -i N3",
    "pos": "adj-i",
    "p": 3
  },
  "眩しい": {
    "r": "まぶしい",
    "m": "Chói chang, chói mắt",
    "t": "Tính từ -i N3",
    "pos": "adj-i",
    "p": 3
  },
  "痒い": {
    "r": "かゆい",
    "m": "Ngứa ngáy",
    "t": "Tính từ -i N3",
    "pos": "adj-i",
    "p": 2
  },
  "臭い": {
    "r": "くさい",
    "m": "Hôi hám, có mùi khó chịu",
    "t": "Tính từ -i N4",
    "pos": "adj-i",
    "p": 2
  },
  "鈍い": {
    "r": "にぶい",
    "m": "Chậm chạp, cùn, đần độn",
    "t": "Tính từ -i N3",
    "pos": "adj-i",
    "p": 2
  },
  "鋭い": {
    "r": "するどい",
    "m": "Sắc bén, nhạy bén",
    "t": "Tính từ -i N3",
    "pos": "adj-i",
    "p": 3
  },
  "幼い": {
    "r": "おさない",
    "m": "Ngây thơ, non nớt, trẻ con",
    "t": "Tính từ -i N3",
    "pos": "adj-i",
    "p": 3
  },
  "尊い": {
    "r": "とうとい",
    "m": "Cao quý, tôn quý, đáng trân trọng",
    "t": "Tính từ -i N3",
    "pos": "adj-i",
    "p": 3
  },
  "醜い": {
    "r": "みにくい",
    "m": "Xấu xí, xấu hổ",
    "t": "Tính từ -i N3",
    "pos": "adj-i",
    "p": 3
  },
  "情けない": {
    "r": "なさけない",
    "m": "Đáng thương hại, hổ thẹn",
    "t": "Tính từ -i N3",
    "pos": "adj-i",
    "p": 4
  },
  "みっともない": {
    "r": "みっともない",
    "m": "Khó coi, xấu xí, mất thể diện",
    "t": "Tính từ -i N3",
    "pos": "adj-i",
    "p": 5
  },
  "面倒くさい": {
    "r": "めんどうくさい",
    "m": "Phiền toái, lười biếng, ngại làm",
    "t": "Tính từ -i N3",
    "pos": "adj-i",
    "p": 6
  },
  "もったいない": {
    "r": "もったいない",
    "m": "Lãng phí, uổng phí, quý giá",
    "t": "Tính từ -i N3",
    "pos": "adj-i",
    "p": 5
  },
  "仕方がない": {
    "r": "しかたがない",
    "m": "Không còn cách nào khác, đành vậy",
    "t": "Cụm quán ngữ N4",
    "pos": "exp",
    "p": 0
  },
  "つまらない": {
    "r": "つまらない",
    "m": "Buồn chán, vô vị",
    "t": "Tính từ -i N5",
    "pos": "adj-i",
    "p": 3
  },
  "くだらない": {
    "r": "くだらない",
    "m": "Vô lý, nhảm nhí, tầm phào",
    "t": "Tính từ -i N3",
    "pos": "adj-i",
    "p": 4
  },
  "便利": {
    "r": "べんり",
    "m": "Thuận tiện, tiện lợi",
    "t": "Tính từ -na N5",
    "pos": "adj-na",
    "p": 1
  },
  "不便": {
    "r": "ふべん",
    "m": "Bất tiện",
    "t": "Tính từ -na N5",
    "pos": "adj-na",
    "p": 1
  },
  "有名": {
    "r": "ゆうめい",
    "m": "Nổi tiếng",
    "t": "Tính từ -na N5",
    "pos": "adj-na",
    "p": 0
  },
  "親切": {
    "r": "しんせつ",
    "m": "Tử tế, thân thiện, ân cần",
    "t": "Tính từ -na N5",
    "pos": "adj-na",
    "p": 1
  },
  "大切": {
    "r": "たいせつ",
    "m": "Quan trọng, quý giá",
    "t": "Tính từ -na N5",
    "pos": "adj-na",
    "p": 0
  },
  "重要": {
    "r": "じゅうよう",
    "m": "Trọng yếu, cốt yếu",
    "t": "Tính từ -na N4",
    "pos": "adj-na",
    "p": 0
  },
  "複雑": {
    "r": "ふくざつ",
    "m": "Phức tạp, rắc rối",
    "t": "Tính từ -na N4",
    "pos": "adj-na",
    "p": 0
  },
  "必要": {
    "r": "ひつよう",
    "m": "Cần thiết, tất yếu",
    "t": "Tính từ -na N4",
    "pos": "adj-na",
    "p": 0
  },
  "邪魔": {
    "r": "じゃま",
    "m": "Cản trở, quấy rầy, phiền hà",
    "t": "Tính từ -na N4",
    "pos": "adj-na,n",
    "p": 0
  },
  "丁寧": {
    "r": "ていねい",
    "m": "Lịch sự, cẩn thận, chu đáo",
    "t": "Tính từ -na N4",
    "pos": "adj-na",
    "p": 1
  },
  "特別": {
    "r": "とくべつ",
    "m": "Đặc biệt",
    "t": "Tính từ -na N4",
    "pos": "adj-na,adv",
    "p": 0
  },
  "真面目": {
    "r": "まじめ",
    "m": "Chăm chỉ, nghiêm túc, đứng đắn",
    "t": "Tính từ -na N4",
    "pos": "adj-na",
    "p": 0
  },
  "正直": {
    "r": "しょうじき",
    "m": "Thành thật, trung thực",
    "t": "Tính từ -na N3",
    "pos": "adj-na,adv",
    "p": 3
  },
  "積極的": {
    "r": "せっきょくてき",
    "m": "Tích cực, chủ động",
    "t": "Tính từ -na N3",
    "pos": "adj-na",
    "p": 0
  },
  "消極的": {
    "r": "しょうきょくてき",
    "m": "Tiêu cực, thụ động",
    "t": "Tính từ -na N3",
    "pos": "adj-na",
    "p": 0
  },
  "具体的": {
    "r": "ぐたいてき",
    "m": "Cụ thể, rõ ràng",
    "t": "Tính từ -na N3",
    "pos": "adj-na",
    "p": 0
  },
  "抽象的": {
    "r": "ちゅうしょうてき",
    "m": "Trừu tượng",
    "t": "Tính từ -na N3",
    "pos": "adj-na",
    "p": 0
  },
  "熱心": {
    "r": "ねっしん",
    "m": "Nhiệt tình, hăng hái",
    "t": "Tính từ -na N4",
    "pos": "adj-na",
    "p": 1
  },
  "適当": {
    "r": "てきとう",
    "m": "Thích hợp / qua loa, đại khái",
    "t": "Tính từ -na N4",
    "pos": "adj-na",
    "p": 0
  },
  "適切": {
    "r": "てきせつ",
    "m": "Thỏa đáng, xác đáng, phù hợp",
    "t": "Tính từ -na N3",
    "pos": "adj-na",
    "p": 0
  },
  "明確": {
    "r": "めいかく",
    "m": "Rõ ràng, rành mạch",
    "t": "Tính từ -na N3",
    "pos": "adj-na",
    "p": 0
  },
  "正確": {
    "r": "せいかく",
    "m": "Chính xác",
    "t": "Tính từ -na N4",
    "pos": "adj-na",
    "p": 0
  },
  "豊富": {
    "r": "ほうふ",
    "m": "Phong phú, dồi dào",
    "t": "Tính từ -na N3",
    "pos": "adj-na",
    "p": 0
  },
  "貴重": {
    "r": "きちょう",
    "m": "Quý giá, trân quý",
    "t": "Tính từ -na N3",
    "pos": "adj-na",
    "p": 0
  },
  "豪華": {
    "r": "ごうか",
    "m": "Xa hoa, lộng lẫy, tráng lệ",
    "t": "Tính từ -na N3",
    "pos": "adj-na",
    "p": 1
  },
  "穏やか": {
    "r": "おだやか",
    "m": "Ôn hòa, điềm đạm, êm ả",
    "t": "Tính từ -na N3",
    "pos": "adj-na",
    "p": 2
  },
  "爽やか": {
    "r": "さわやか",
    "m": "Sảng khoái, tươi tắn, thanh thoát",
    "t": "Tính từ -na N3",
    "pos": "adj-na",
    "p": 2
  },
  "鮮やか": {
    "r": "あざやか",
    "m": "Rực rỡ, sống động, khéo léo",
    "t": "Tính từ -na N3",
    "pos": "adj-na",
    "p": 2
  },
  "賑やか": {
    "r": "にぎやか",
    "m": "Náo nhiệt, nhộn nhịp",
    "t": "Tính từ -na N5",
    "pos": "adj-na",
    "p": 2
  },
  "静か": {
    "r": "しずか",
    "m": "Yên tĩnh, thanh bình",
    "t": "Tính từ -na N5",
    "pos": "adj-na",
    "p": 1
  },
  "危険": {
    "r": "きけん",
    "m": "Nguy hiểm",
    "t": "Tính từ -na N5",
    "pos": "adj-na,n",
    "p": 0
  },
  "安全": {
    "r": "あんぜん",
    "m": "An toàn",
    "t": "Tính từ -na N4",
    "pos": "adj-na,n",
    "p": 0
  },
  "新鮮": {
    "r": "しんせん",
    "m": "Tươi ngon, tươi mới",
    "t": "Tính từ -na N4",
    "pos": "adj-na",
    "p": 0
  },
  "優秀": {
    "r": "ゆうしゅう",
    "m": "Ưu tú, xuất sắc",
    "t": "Tính từ -na N3",
    "pos": "adj-na",
    "p": 0
  },
  "器用": {
    "r": "きよう",
    "m": "Khéo léo, đảm đang",
    "t": "Tính từ -na N3",
    "pos": "adj-na",
    "p": 1
  },
  "不器用": {
    "r": "ぶきよう",
    "m": "Vụng về, không khéo",
    "t": "Tính từ -na N3",
    "pos": "adj-na",
    "p": 2
  },
  "上品": {
    "r": "じょうひん",
    "m": "Quý phái, trang nhã, lịch thiệp",
    "t": "Tính từ -na N3",
    "pos": "adj-na",
    "p": 0
  },
  "下品": {
    "r": "げひん",
    "m": "Thô thiển, tục tĩu, kém sang",
    "t": "Tính từ -na N3",
    "pos": "adj-na",
    "p": 0
  },
  "自由": {
    "r": "じゆう",
    "m": "Tự do",
    "t": "Tính từ -na N4",
    "pos": "adj-na,n",
    "p": 2
  },
  "平等": {
    "r": "びょうどう",
    "m": "Bình đẳng",
    "t": "Tính từ -na N3",
    "pos": "adj-na,n",
    "p": 0
  },
  "スマホ": {
    "r": "すまほ",
    "m": "Điện thoại thông minh (smartphone)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 0
  },
  "スマートフォン": {
    "r": "すまーとふぉん",
    "m": "Điện thoại thông minh",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 4
  },
  "パソコン": {
    "r": "ぱそこん",
    "m": "Máy vi tính cá nhân (PC)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 0
  },
  "コンピュータ": {
    "r": "こんぴゅーた",
    "m": "Máy vi tính (computer)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 3
  },
  "インターネット": {
    "r": "いんたーねっと",
    "m": "Mạng Internet toàn cầu",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 5
  },
  "ウェブサイト": {
    "r": "うぇぶさいと",
    "m": "Trang web, website",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 4
  },
  "ホームページ": {
    "r": "ほーむぺーじ",
    "m": "Trang chủ, homepage",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 4
  },
  "アプリ": {
    "r": "あぷり",
    "m": "Ứng dụng di động (app)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "アプリケーション": {
    "r": "あぷりけーしょん",
    "m": "Ứng dụng phần mềm",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 4
  },
  "メール": {
    "r": "めーる",
    "m": "Thư điện tử, email",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 0
  },
  "メッセージ": {
    "r": "めっせーじ",
    "m": "Tin nhắn, thông điệp",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "チャット": {
    "r": "ちゃっと",
    "m": "Trò chuyện trực tuyến (chat)",
    "t": "Từ ngoại lai",
    "pos": "n,vs",
    "p": 1
  },
  "アカウント": {
    "r": "あかうんと",
    "m": "Tài khoản người dùng (Account)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 0
  },
  "パスワード": {
    "r": "ぱすわーど",
    "m": "Mật khẩu bảo mật (Password)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 3
  },
  "ログイン": {
    "r": "ろぐいん",
    "m": "Đăng nhập tài khoản (Log in)",
    "t": "Danh từ / Động từ Katakana",
    "pos": "n,vs",
    "p": 0
  },
  "ログアウト": {
    "r": "ろぐあうと",
    "m": "Đăng xuất tài khoản (Log out)",
    "t": "Danh từ / Động từ Katakana",
    "pos": "n,vs",
    "p": 3
  },
  "クリック": {
    "r": "くりっく",
    "m": "Nhấp chuột (click)",
    "t": "Từ ngoại lai",
    "pos": "n,vs",
    "p": 1
  },
  "ダウンロード": {
    "r": "だうんろーど",
    "m": "Tải tệp tin về máy (Download)",
    "t": "Danh từ / Động từ Katakana",
    "pos": "n,vs",
    "p": 4
  },
  "アップロード": {
    "r": "あっぷろーど",
    "m": "Tải tệp tin lên máy chủ (Upload)",
    "t": "Danh từ / Động từ Katakana",
    "pos": "n,vs",
    "p": 4
  },
  "インストール": {
    "r": "いんすとーる",
    "m": "Cài đặt phần mềm vào máy (Install)",
    "t": "Danh từ / Động từ Katakana",
    "pos": "n,vs",
    "p": 3
  },
  "ソフトウェア": {
    "r": "そふとうぇあ",
    "m": "Phần mềm (software)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 4
  },
  "ハードウェア": {
    "r": "はーどうぇあ",
    "m": "Phần cứng (hardware)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 4
  },
  "データ": {
    "r": "でーた",
    "m": "Dữ liệu (data)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "データベース": {
    "r": "でーたべーす",
    "m": "Cơ sở dữ liệu lưu trữ (Database)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 4
  },
  "ファイル": {
    "r": "ふぁいる",
    "m": "Tệp tin, file",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "フォルダ": {
    "r": "ふぉるだ",
    "m": "Thư mục (folder)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "サーバー": {
    "r": "さーばー",
    "m": "Máy chủ dịch vụ (Server)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 1
  },
  "ネットワーク": {
    "r": "ねっとわーく",
    "m": "Mạng lưới kết nối viễn thông (Network)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 4
  },
  "スクリーン": {
    "r": "すくりーん",
    "m": "Màn hình chiếu (screen)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 2
  },
  "ディスプレイ": {
    "r": "でぃすぷれい",
    "m": "Màn hình hiển thị, bài trí (Display)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 3
  },
  "キーボード": {
    "r": "きーぼーど",
    "m": "Bàn phím gõ chữ hoặc phím đàn (Keyboard)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 3
  },
  "マウス": {
    "r": "まうす",
    "m": "Chuột máy tính (Mouse)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 1
  },
  "プリンター": {
    "r": "ぷりんたー",
    "m": "Máy in ấn",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 2
  },
  "オンライン": {
    "r": "おんらいん",
    "m": "Trực tuyến trên mạng (Online)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 3
  },
  "オフライン": {
    "r": "おふらいん",
    "m": "Ngoại tuyến, đời sống thực (Offline)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 3
  },
  "バグ": {
    "r": "ばぐ",
    "m": "Lỗi phần mềm (bug)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "エラー": {
    "r": "えらー",
    "m": "Lỗi hệ thống (error)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "アップデート": {
    "r": "あっぷでーと",
    "m": "Cập nhật phiên bản mới (Update)",
    "t": "Danh từ / Động từ Katakana",
    "pos": "n,vs",
    "p": 3
  },
  "クラウド": {
    "r": "くらうど",
    "m": "Điện toán đám mây (Cloud)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 2
  },
  "セキュリティ": {
    "r": "せきゅりてぃ",
    "m": "Bảo mật, an ninh",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 2
  },
  "プライバシー": {
    "r": "ぷらいばしー",
    "m": "Quyền riêng tư cá nhân (Privacy)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 2
  },
  "アイコン": {
    "r": "あいこん",
    "m": "Biểu tượng hình ảnh đại diện (Icon)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 1
  },
  "ボタン": {
    "r": "ぼたん",
    "m": "Nút bấm, khuy áo",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 0
  },
  "メニュー": {
    "r": "めにゅー",
    "m": "Thực đơn, menu điều hướng",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "リンク": {
    "r": "りんく",
    "m": "Đường dẫn liên kết (link)",
    "t": "Từ ngoại lai",
    "pos": "n,vs",
    "p": 1
  },
  "コンビニ": {
    "r": "こんびに",
    "m": "Cửa hàng tiện lợi 24/7",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 0
  },
  "スーパー": {
    "r": "すーぱー",
    "m": "Siêu thị (supermarket)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "デパート": {
    "r": "でぱーと",
    "m": "Trung tâm thương mại bách hóa",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 2
  },
  "レストラン": {
    "r": "れすとらん",
    "m": "Nhà hàng, quán ăn sang",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "カフェ": {
    "r": "かふぇ",
    "m": "Quán cà phê",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "ホテル": {
    "r": "ほてる",
    "m": "Khách sạn",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "チケット": {
    "r": "ちけっと",
    "m": "Vé vào cổng, vé xem phim",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "アルバイト": {
    "r": "あるばいと",
    "m": "Công việc làm thêm (part-time)",
    "t": "Từ ngoại lai",
    "pos": "n,vs",
    "p": 3
  },
  "サービス": {
    "r": "さーびす",
    "m": "Dịch vụ, khuyến mãi miễn phí",
    "t": "Từ ngoại lai",
    "pos": "n,vs",
    "p": 1
  },
  "システム": {
    "r": "しすてむ",
    "m": "Hệ thống (system)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "プロジェクト": {
    "r": "ぷろじぇくと",
    "m": "Dự án phát triển kinh doanh / kỹ thuật (Project)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 2
  },
  "スケジュール": {
    "r": "すけじゅーる",
    "m": "Lịch trình công việc, thời gian biểu (Schedule)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 2
  },
  "ミーティング": {
    "r": "みーてぃんぐ",
    "m": "Cuộc họp mặt trao đổi nhóm (Meeting)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 3
  },
  "プレゼンテーション": {
    "r": "ぷれぜんてーしょん",
    "m": "Bài thuyết trình báo cáo (Presentation)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 5
  },
  "マネージャー": {
    "r": "まねーじゃー",
    "m": "Quản lý trưởng nhóm (Manager)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 3
  },
  "スタッフ": {
    "r": "すたっふ",
    "m": "Đội ngũ nhân viên (staff)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 2
  },
  "クライアント": {
    "r": "くらいあんと",
    "m": "Khách hàng doanh nghiệp",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 2
  },
  "キャンセル": {
    "r": "きゃんせる",
    "m": "Hủy bỏ đơn hàng / cuộc hẹn (Cancel)",
    "t": "Danh từ / Động từ Katakana",
    "pos": "n,vs",
    "p": 1
  },
  "チェック": {
    "r": "ちぇっく",
    "m": "Kiểm tra, rà soát",
    "t": "Từ ngoại lai",
    "pos": "n,vs",
    "p": 1
  },
  "ストレス": {
    "r": "すとれす",
    "m": "Căng thẳng tinh thần, áp lực (Stress)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 2
  },
  "リラックス": {
    "r": "りらっくす",
    "m": "Thả lỏng cơ thể, thư thái (Relax)",
    "t": "Danh từ / Động từ Katakana",
    "pos": "n,vs",
    "p": 2
  },
  "エネルギー": {
    "r": "えねるぎー",
    "m": "Năng lượng (energy)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 2
  },
  "ボランティア": {
    "r": "ぼらんてぃあ",
    "m": "Hoạt động tình nguyện",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 2
  },
  "リサイクル": {
    "r": "りさいくる",
    "m": "Tái chế rác thải",
    "t": "Từ ngoại lai",
    "pos": "n,vs",
    "p": 2
  },
  "すっきり": {
    "r": "すっきり",
    "m": "Khoan khoái dễ chịu, gọn gàng thông suốt",
    "t": "Phó từ tượng hình N3",
    "pos": "adv,vs",
    "p": 3
  },
  "がっかり": {
    "r": "がっかり",
    "m": "Thất vọng tràn trề, tiu nghỉu ỉu xìu",
    "t": "Phó từ tượng hình N4",
    "pos": "adv,vs",
    "p": 3
  },
  "ぴったり": {
    "r": "ぴったり",
    "m": "Vừa vặn khít khao, ăn khớp hoàn hảo",
    "t": "Phó từ tượng hình N4",
    "pos": "adv,vs",
    "p": 3
  },
  "びっくり": {
    "r": "びっくり",
    "m": "Giật mình, bất ngờ, kinh ngạc",
    "t": "Từ tượng thanh/hình",
    "pos": "adv,vs",
    "p": 3
  },
  "うっかり": {
    "r": "うっかり",
    "m": "Lỡ đễnh, đãng trí vô ý sơ suất",
    "t": "Phó từ tượng hình N3",
    "pos": "adv,vs",
    "p": 3
  },
  "ぎっしり": {
    "r": "ぎっしり",
    "m": "Chật ních, lèn chặt đầy ắp",
    "t": "Từ tượng thanh/hình",
    "pos": "adv",
    "p": 3
  },
  "すっかり": {
    "r": "すっかり",
    "m": "Hoàn toàn, sạch bách, hết cả",
    "t": "Từ tượng thanh/hình",
    "pos": "adv",
    "p": 3
  },
  "しっかり": {
    "r": "しっかり",
    "m": "Chắc chắn, vững vàng, chín chắn đĩnh đạc",
    "t": "Phó từ tượng hình N4",
    "pos": "adv,vs",
    "p": 3
  },
  "のんびり": {
    "r": "のんびり",
    "m": "Thong dong nhàn nhã, an nhàn tự tại",
    "t": "Phó từ tượng hình N4",
    "pos": "adv,vs",
    "p": 3
  },
  "ぐっすり": {
    "r": "ぐっすり",
    "m": "Ngủ say sưa, ngủ say như chết",
    "t": "Phó từ tượng hình N4",
    "pos": "adv",
    "p": 3
  },
  "ばったり": {
    "r": "ばったり",
    "m": "Tình cờ đụng độ, ngã lăn ra",
    "t": "Từ tượng thanh/hình",
    "pos": "adv",
    "p": 3
  },
  "はっきり": {
    "r": "はっきり",
    "m": "Rõ ràng, rành mạch",
    "t": "Từ tượng thanh/hình",
    "pos": "adv,vs",
    "p": 3
  },
  "あっさり": {
    "r": "あっさり",
    "m": "Thanh đạm nhẹ nhàng (món ăn) / Thẳng thắn dễ dàng",
    "t": "Phó từ tượng hình N3",
    "pos": "adv,vs",
    "p": 3
  },
  "さっぱり": {
    "r": "さっぱり",
    "m": "Sảng khoái / hoàn toàn không hiểu",
    "t": "Từ tượng thanh/hình",
    "pos": "adv,vs",
    "p": 3
  },
  "こっそり": {
    "r": "こっそり",
    "m": "Lén lút, thậm thụt làm điều vụng trộm",
    "t": "Phó từ tượng hình N3",
    "pos": "adv",
    "p": 3
  },
  "そっと": {
    "r": "そっと",
    "m": "Nhẹ nhàng, rón rén",
    "t": "Từ tượng thanh/hình",
    "pos": "adv,vs",
    "p": 0
  },
  "じっと": {
    "r": "じっと",
    "m": "Chăm chú, bất động, chịu đựng",
    "t": "Từ tượng thanh/hình",
    "pos": "adv,vs",
    "p": 0
  },
  "ふと": {
    "r": "ふと",
    "m": "Đột nhiên, tình cờ, bất giác",
    "t": "Phó từ N3",
    "pos": "adv",
    "p": 0
  },
  "ずっと": {
    "r": "ずっと",
    "m": "Suốt, từ đầu đến cuối / hơn hẳn",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 0
  },
  "もっと": {
    "r": "もっと",
    "m": "Hơn nữa, thêm nữa",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 1
  },
  "やっと": {
    "r": "やっと",
    "m": "Cuối cùng thì (sau bao nỗ lực)",
    "t": "Phó từ N4",
    "pos": "adv",
    "p": 0
  },
  "とうとう": {
    "r": "とうとう",
    "m": "Rốt cuộc là, cuối cùng thì",
    "t": "Phó từ N4",
    "pos": "adv",
    "p": 1
  },
  "ついに": {
    "r": "ついに",
    "m": "Cuối cùng thì (kết quả trọng đại)",
    "t": "Phó từ N3",
    "pos": "adv",
    "p": 1
  },
  "いよいよ": {
    "r": "いよいよ",
    "m": "Càng ngày càng, cuối cùng giờ G đã đến",
    "t": "Phó từ N3",
    "pos": "adv",
    "p": 2
  },
  "ますます": {
    "r": "ますます",
    "m": "Ngày càng, càng ngày càng nhiều hơn",
    "t": "Phó từ N4",
    "pos": "adv",
    "p": 1
  },
  "だんだん": {
    "r": "だんだん",
    "m": "Dần dần, từng bước một biến chuyển",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 0
  },
  "どんどん": {
    "r": "どんどん",
    "m": "Nhanh chóng dồn dập, liên tục tiến bước",
    "t": "Phó từ tượng hình N4",
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
  "ほとんど": {
    "r": "ほとんど",
    "m": "Hầu hết, gần như toàn bộ",
    "t": "Phó từ N4",
    "pos": "adv",
    "p": 2
  },
  "たいてい": {
    "r": "たいてい",
    "m": "Thông thường, phần lớn thời gian",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 0
  },
  "いつも": {
    "r": "いつも",
    "m": "Lúc nào cũng, luôn luôn",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 1
  },
  "たまに": {
    "r": "たまに",
    "m": "Thỉnh thoảng, hiếm khi",
    "t": "Phó từ N4",
    "pos": "adv",
    "p": 0
  },
  "ときどき": {
    "r": "ときどき",
    "m": "Đôi khi, thỉnh thoảng",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 0
  },
  "しばしば": {
    "r": "しばしば",
    "m": "Thường xuyên, lặp đi lặp lại",
    "t": "Phó từ N3",
    "pos": "adv",
    "p": 1
  },
  "めったに": {
    "r": "めったに",
    "m": "Hiếm khi (đi với phủ định)",
    "t": "Phó từ N3",
    "pos": "adv",
    "p": 1
  },
  "けっして": {
    "r": "けっして",
    "m": "Tuyệt đối không bao giờ",
    "t": "Phó từ N4",
    "pos": "adv",
    "p": 0
  },
  "ぜんぜん": {
    "r": "ぜんぜん",
    "m": "Hoàn toàn không (đi với phủ định)",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 0
  },
  "あまり": {
    "r": "あまり",
    "m": "Không... lắm (đi với phủ định)",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 0
  },
  "なかなか": {
    "r": "なかなか",
    "m": "Khá là, mãi mà không...",
    "t": "Phó từ N4",
    "pos": "adv",
    "p": 0
  },
  "かなり": {
    "r": "かなり",
    "m": "Tương đối, khá là",
    "t": "Phó từ N4",
    "pos": "adv",
    "p": 1
  },
  "たいへん": {
    "r": "たいへん",
    "m": "Rất, vô cùng / vất vả cực nhọc",
    "t": "Phó từ N5",
    "pos": "adv,adj-na",
    "p": 0
  },
  "非常に": {
    "r": "ひじょうに",
    "m": "Cực kỳ, hết sức, vô cùng",
    "t": "Phó từ N4",
    "pos": "adv",
    "p": 0
  },
  "極めて": {
    "r": "きわめて",
    "m": "Cực kỳ, tột cùng (văn viết)",
    "t": "Phó từ N3",
    "pos": "adv",
    "p": 2
  },
  "特に": {
    "r": "とくに",
    "m": "Đặc biệt là",
    "t": "Phó từ N4",
    "pos": "adv",
    "p": 1
  },
  "主に": {
    "r": "おもに",
    "m": "Chủ yếu là, phần lớn",
    "t": "Phó từ N3",
    "pos": "adv",
    "p": 1
  },
  "例えば": {
    "r": "たとえば",
    "m": "Ví dụ như, chẳng hạn",
    "t": "Phó từ N4",
    "pos": "adv",
    "p": 2
  },
  "つまり": {
    "r": "つまり",
    "m": "Tóm lại là, tức là",
    "t": "Phó từ N4",
    "pos": "adv",
    "p": 1
  },
  "要するに": {
    "r": "ようするに",
    "m": "Nói tóm lại là, chung quy là",
    "t": "Phó từ N3",
    "pos": "adv",
    "p": 0
  },
  "なぜなら": {
    "r": "なぜなら",
    "m": "Lý do là vì, bởi vì",
    "t": "Liên từ N3",
    "pos": "conj",
    "p": 1
  },
  "したがって": {
    "r": "したがって",
    "m": "Do đó, vì vậy cho nên",
    "t": "Liên từ N3",
    "pos": "conj",
    "p": 0
  },
  "その上": {
    "r": "そのうえ",
    "m": "Hơn nữa, thêm vào đó",
    "t": "Liên từ N3",
    "pos": "conj",
    "p": 0
  },
  "それとも": {
    "r": "それとも",
    "m": "Hoặc là, hay là",
    "t": "Liên từ N5",
    "pos": "conj",
    "p": 3
  },
  "あるいは": {
    "r": "あるいは",
    "m": "Hoặc là, có lẽ",
    "t": "Liên từ N3",
    "pos": "conj",
    "p": 2
  },
  "ただし": {
    "r": "ただし",
    "m": "Tuy nhiên, nhưng kèm điều kiện",
    "t": "Liên từ N3",
    "pos": "conj",
    "p": 1
  },
  "一期一会": {
    "r": "いちごいちえ",
    "m": "Đời người chỉ gặp một lần, trân quý từng khoảnh khắc",
    "t": "Thành ngữ 4 chữ (Yojijukugo)",
    "pos": "exp",
    "p": 4
  },
  "一石二鳥": {
    "r": "いっせきにちょう",
    "m": "Một mũi tên trúng hai đích, nhất cử lưỡng tiện",
    "t": "Thành ngữ 4 chữ",
    "pos": "exp,yoji",
    "p": 0
  },
  "十人十色": {
    "r": "じゅうにんといろ",
    "m": "Mười người mười ý, mỗi người một cá tính",
    "t": "Thành ngữ 4 chữ",
    "pos": "exp,yoji",
    "p": 0
  },
  "自業自得": {
    "r": "じごうじとく",
    "m": "Gieo gió gặt bão, tự làm tự chịu",
    "t": "Thành ngữ 4 chữ",
    "pos": "exp,yoji",
    "p": 0
  },
  "臨機応変": {
    "r": "りんきおうへん",
    "m": "Tùy cơ ứng biến, linh hoạt xoay chuyển theo tình thế",
    "t": "Thành ngữ 4 chữ",
    "pos": "exp,yoji",
    "p": 0
  },
  "四面楚歌": {
    "r": "しめんそか",
    "m": "Bốn bề thọ địch, cô lập không ai giúp đỡ",
    "t": "Thành ngữ 4 chữ (Yojijukugo)",
    "pos": "exp",
    "p": 4
  },
  "以心伝心": {
    "r": "いしんでんしん",
    "m": "Tâm đầu ý hợp, hiểu nhau không cần nói ra",
    "t": "Thành ngữ 4 chữ (Yojijukugo)",
    "pos": "exp",
    "p": 4
  },
  "試行錯誤": {
    "r": "しこうさくご",
    "m": "Thử nghiệm và sai lầm, mò mẫm rút kinh nghiệm",
    "t": "Thành ngữ 4 chữ",
    "pos": "exp,yoji",
    "p": 0
  },
  "危機一髪": {
    "r": "ききいっぱつ",
    "m": "Nghìn cân treo sợi tóc, trong gang tấc",
    "t": "Thành ngữ 4 chữ",
    "pos": "exp,yoji",
    "p": 0
  },
  "油断大敵": {
    "r": "ゆだんたいてき",
    "m": "Cẩu thả lơ là là kẻ thù lớn nhất",
    "t": "Thành ngữ 4 chữ (Yojijukugo)",
    "pos": "exp",
    "p": 4
  },
  "自画自賛": {
    "r": "じがじさん",
    "m": "Mèo khen mèo dài đuôi, tự khen chính mình",
    "t": "Thành ngữ 4 chữ (Yojijukugo)",
    "pos": "exp",
    "p": 4
  },
  "本末転倒": {
    "r": "ほんまつてんとう",
    "m": "Đảo lộn đầu cuối, đặt cái phụ lên trên cái chính",
    "t": "Thành ngữ 4 chữ",
    "pos": "exp,yoji",
    "p": 0
  },
  "針小棒大": {
    "r": "しんしょうぼうだい",
    "m": "Chuyện bé xé ra to, phóng đại sự việc",
    "t": "Thành ngữ 4 chữ (Yojijukugo)",
    "pos": "exp",
    "p": 4
  },
  "千差万別": {
    "r": "せんそばんばんべつ",
    "m": "Muôn hình vạn trạng, vô số điều khác biệt",
    "t": "Thành ngữ 4 chữ (Yojijukugo)",
    "pos": "exp",
    "p": 4
  },
  "起死回生": {
    "r": "きしかいせい",
    "m": "Cải tử hoàn sinh, lật ngược thế cờ ngoạn mục",
    "t": "Thành ngữ 4 chữ",
    "pos": "exp,yoji",
    "p": 0
  },
  "悪戦苦闘": {
    "r": "あくせんくとう",
    "m": "Chiến đấu gian khổ, vật lộn khó khăn vất vả",
    "t": "Thành ngữ 4 chữ",
    "pos": "exp,yoji",
    "p": 0
  },
  "無我夢中": {
    "r": "むがむちゅう",
    "m": "Mải mê quên hết sự đời, say sưa hết mình",
    "t": "Thành ngữ 4 chữ (Yojijukugo)",
    "pos": "exp",
    "p": 4
  },
  "喜怒哀楽": {
    "r": "きどあいらく",
    "m": "Hỉ nộ ái ố, bốn sắc thái cảm xúc con người",
    "t": "Thành ngữ 4 chữ (Yojijukugo)",
    "pos": "exp",
    "p": 4
  },
  "温故知新": {
    "r": "おんこちしん",
    "m": "Ôn cố tri tân, học cái cũ để hiểu cái mới",
    "t": "Thành ngữ 4 chữ",
    "pos": "exp,yoji",
    "p": 0
  },
  "半信半疑": {
    "r": "はんしんはんぎ",
    "m": "Bán tín bán nghi, nửa tin nửa ngờ",
    "t": "Thành ngữ 4 chữ (Yojijukugo)",
    "pos": "exp",
    "p": 4
  },
  "単刀直入": {
    "r": "たんとうちょくにゅう",
    "m": "Đơn đao trực nhập, đi thẳng vào vấn đề",
    "t": "Thành ngữ 4 chữ (Yojijukugo)",
    "pos": "exp",
    "p": 4
  },
  "異口同音": {
    "r": "いくどうおん",
    "m": "Đồng thanh một lời, mọi người đều nhất trí nói giống nhau",
    "t": "Thành ngữ 4 chữ",
    "pos": "exp,yoji",
    "p": 0
  },
  "順風満帆": {
    "r": "じゅんぷうまんぱん",
    "m": "Thuận buồm xuôi gió, mọi sự êm đẹp",
    "t": "Thành ngữ 4 chữ (Yojijukugo)",
    "pos": "exp",
    "p": 4
  },
  "百発百中": {
    "r": "ひゃっぱつひゃくちゅう",
    "m": "Bách phát bách trúng, trăm lần trúng cả trăm",
    "t": "Thành ngữ 4 chữ (Yojijukugo)",
    "pos": "exp",
    "p": 4
  },
  "日進月歩": {
    "r": "にっしんげっぽ",
    "m": "Tiến bộ vượt bậc từng ngày, phát triển thần tốc",
    "t": "Thành ngữ 4 chữ",
    "pos": "exp,yoji",
    "p": 0
  },
  "自給自足": {
    "r": "じきゅうじそく",
    "m": "Tự cung tự cấp",
    "t": "Thành ngữ 4 chữ (Yojijukugo)",
    "pos": "exp",
    "p": 4
  },
  "一長一短": {
    "r": "いっちょういったん",
    "m": "Có mặt tốt cũng có mặt xấu, sở trường kèm sở đoản",
    "t": "Thành ngữ 4 chữ",
    "pos": "exp,yoji",
    "p": 0
  },
  "絶体絶命": {
    "r": "ぜったいぜつめい",
    "m": "Đường cùng bế tắc, tiến thoái lưỡng nan",
    "t": "Thành ngữ 4 chữ",
    "pos": "exp,yoji",
    "p": 0
  },
  "気になる": {
    "r": "きになる",
    "m": "Băn khoăn, tò mò, để ý",
    "t": "Quán ngữ N4",
    "pos": "exp",
    "p": 0
  },
  "気にする": {
    "r": "きにする",
    "m": "Bận tâm, lo lắng để trong lòng",
    "t": "Quán ngữ N4",
    "pos": "exp",
    "p": 0
  },
  "気に入る": {
    "r": "きにいる",
    "m": "Ưa thích, vừa ý, hài lòng",
    "t": "Quán ngữ N4",
    "pos": "exp",
    "p": 0
  },
  "気をつける": {
    "r": "きをつける",
    "m": "Cẩn thận, chú ý bảo trọng",
    "t": "Quán ngữ N5",
    "pos": "exp",
    "p": 0
  },
  "気がつく": {
    "r": "きがつく",
    "m": "Nhận ra, để ý thấy",
    "t": "Cụm quán ngữ N4",
    "pos": "exp",
    "p": 0
  },
  "気を落とす": {
    "r": "きをおとす",
    "m": "Nản lòng thoái chí, thất vọng nản chí",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "気がする": {
    "r": "きがする",
    "m": "Có cảm giác là, dường như",
    "t": "Quán ngữ N4",
    "pos": "exp",
    "p": 0
  },
  "頭に来る": {
    "r": "あたまにくる",
    "m": "Phát điên lên, tức lộn ruột",
    "t": "Quán ngữ N3",
    "pos": "exp",
    "p": 0
  },
  "目を通す": {
    "r": "めをとおす",
    "m": "Đọc lướt qua, xem sơ qua",
    "t": "Quán ngữ N3",
    "pos": "exp",
    "p": 0
  },
  "目を配る": {
    "r": "めをくばる",
    "m": "Để mắt quan sát xung quanh",
    "t": "Quán ngữ N3",
    "pos": "exp",
    "p": 0
  },
  "耳を傾ける": {
    "r": "みみをかたむける",
    "m": "Lắng nghe chăm chú, tiếp thu ý kiến chân thành",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "手を抜く": {
    "r": "てをぬく",
    "m": "Làm qua loa lấy lệ, làm ẩu",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "手を打つ": {
    "r": "てをうつ",
    "m": "Đưa ra biện pháp xử lý kịp thời",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "手を借りる": {
    "r": "てをかりる",
    "m": "Nhờ người khác giúp một tay",
    "t": "Quán ngữ N3",
    "pos": "exp",
    "p": 0
  },
  "足を引っ張る": {
    "r": "あしをひっぱる",
    "m": "Ngáng chân cản trở người khác, làm chậm bước tiến",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "足が棒になる": {
    "r": "あしがぼうになる",
    "m": "Chân mỏi nhừ như khúc gỗ",
    "t": "Quán ngữ N3",
    "pos": "exp",
    "p": 0
  },
  "腰を据える": {
    "r": "こしをすえる",
    "m": "Ngồi yên tĩnh tâm, định cư gắn bó làm lâu dài",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "腰が低い": {
    "r": "こしがひくい",
    "m": "Khiêm tốn, nhún nhường",
    "t": "Quán ngữ N3",
    "pos": "exp",
    "p": 0
  },
  "腹が立つ": {
    "r": "はらがたつ",
    "m": "Tức giận sôi gan, phẫn nộ trong lòng",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "腹を決める": {
    "r": "はらをきめる",
    "m": "Hạ quyết tâm dứt khoát, can trường",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "顔を立てる": {
    "r": "かおをたてる",
    "m": "Giữ thể diện cho ai",
    "t": "Quán ngữ N3",
    "pos": "exp",
    "p": 0
  },
  "口が軽い": {
    "r": "くちがかるい",
    "m": "Mau mồm mau miệng, không biết giữ bí mật",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "口が重い": {
    "r": "くちがおもい",
    "m": "Kín mồm kín miệng, ít nói trầm tính",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "口を出す": {
    "r": "くちをだす",
    "m": "Xía mũi vào, xen vào chuyện người khác",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "鼻が高い": {
    "r": "はながたかい",
    "m": "Hãnh diện, tự hào nở mũi",
    "t": "Quán ngữ N3",
    "pos": "exp",
    "p": 0
  },
  "目がない": {
    "r": "めがない",
    "m": "Cực kỳ mê, say đắm món gì",
    "t": "Quán ngữ N3",
    "pos": "exp",
    "p": 0
  },
  "耳が痛い": {
    "r": "みみがいたい",
    "m": "Nghe rát tai (lời chê đúng tim đen)",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "息をのむ": {
    "r": "いきをのむ",
    "m": "Nín thở vì kinh ngạc / cảm động",
    "t": "Quán ngữ N3",
    "pos": "exp",
    "p": 0
  },
  "背を向ける": {
    "r": "せをむける",
    "m": "Quay lưng lại, ngoảnh mặt làm ngơ",
    "t": "Quán ngữ N3",
    "pos": "exp",
    "p": 0
  },
  "手が出ない": {
    "r": "てがでない",
    "m": "Bó tay chịu trói, không với tới nổi",
    "t": "Quán ngữ N3",
    "pos": "exp",
    "p": 0
  },
  "手に入れる": {
    "r": "てにいれる",
    "m": "Đoạt được, có được trong tay",
    "t": "Quán ngữ N3",
    "pos": "exp",
    "p": 0
  },
  "役に立つ": {
    "r": "やくにたつ",
    "m": "Có ích, hữu dụng",
    "t": "Quán ngữ N4",
    "pos": "exp",
    "p": 0
  },
  "動物": {
    "r": "どうぶつ",
    "m": "Động vật",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
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
  "鳥": {
    "r": "とり",
    "m": "Con chim",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "馬": {
    "r": "うま",
    "m": "Con ngựa",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "牛": {
    "r": "うし",
    "m": "Con bò",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "豚": {
    "r": "ぶた",
    "m": "Con lợn, heo",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "羊": {
    "r": "ひつじ",
    "m": "Con cừu",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "象": {
    "r": "ぞう",
    "m": "Con voi",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "猿": {
    "r": "さる",
    "m": "Con khỉ",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "熊": {
    "r": "くま",
    "m": "Con gấu",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 2
  },
  "虎": {
    "r": "とら",
    "m": "Con hổ",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "鹿": {
    "r": "しか",
    "m": "Con hươu, nai",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 2
  },
  "兎": {
    "r": "うさぎ",
    "m": "Con thỏ",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "虫": {
    "r": "むし",
    "m": "Côn trùng, sâu bọ",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "蚊": {
    "r": "か",
    "m": "Con muỗi",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "蜂": {
    "r": "はち",
    "m": "Con ong",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "蛇": {
    "r": "へび",
    "m": "Con rắn",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "机": {
    "r": "つくえ",
    "m": "Bàn học, bàn làm việc",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "椅子": {
    "r": "いす",
    "m": "Ghế ngồi",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "窓": {
    "r": "まど",
    "m": "Cửa sổ",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "ドア": {
    "r": "どあ",
    "m": "Cánh cửa (door)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "扉": {
    "r": "とびら",
    "m": "Cánh cửa, then chốt",
    "t": "Danh từ N3",
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
  "ベッド": {
    "r": "べっど",
    "m": "Giường ngủ",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "布団": {
    "r": "ふとん",
    "m": "Nệm, chăn đệm kiểu Nhật",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "毛布": {
    "r": "もうふ",
    "m": "Chăn bông, chăn dạ",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "枕": {
    "r": "まくら",
    "m": "Cái gối",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "鏡": {
    "r": "かがみ",
    "m": "Gương soi",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 3
  },
  "時計": {
    "r": "とけい",
    "m": "Đồng hồ treo tường / đeo tay",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "カレンダー": {
    "r": "かれんだー",
    "m": "Tờ lịch treo tường",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 2
  },
  "ゴミ箱": {
    "r": "ごみばこ",
    "m": "Thùng rác",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "傘": {
    "r": "かさ",
    "m": "Chiếc ô, dù",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "財布": {
    "r": "さいふ",
    "m": "Cái ví tiền",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "鞄": {
    "r": "かばん",
    "m": "Cặp xách, túi xách",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "眼鏡": {
    "r": "めがね",
    "m": "Kính đeo mắt",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "タオル": {
    "r": "たおる",
    "m": "Khăn tắm, khăn mặt",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "石鹸": {
    "r": "せっけん",
    "m": "Xà phòng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "シャンプー": {
    "r": "しゃんぷー",
    "m": "Dầu gội đầu",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "掃除機": {
    "r": "そうじき",
    "m": "Máy hút bụi",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 3
  },
  "洗濯機": {
    "r": "せんたくき",
    "m": "Máy giặt quần áo",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 4
  },
  "冷蔵庫": {
    "r": "れいぞうこ",
    "m": "Tủ lạnh",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "電子レンジ": {
    "r": "でんしれんじ",
    "m": "Lò vi sóng",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 4
  },
  "炊飯器": {
    "r": "すいはんき",
    "m": "Nồi cơm điện",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 3
  },
  "エアコン": {
    "r": "えあこん",
    "m": "Điều hòa máy lạnh không khí",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "扇風機": {
    "r": "せんぷうき",
    "m": "Quạt máy điện",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 3
  },
  "服": {
    "r": "ふく",
    "m": "Quần áo",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "洋服": {
    "r": "ようふく",
    "m": "Âu phục, quần áo phương Tây",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "和服": {
    "r": "わふく",
    "m": "Quần áo truyền thống Nhật",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "着物": {
    "r": "きもの",
    "m": "Áo Kimono truyền thống",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "浴衣": {
    "r": "ゆかた",
    "m": "Áo Yukata mùa hè",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "スーツ": {
    "r": "すーつ",
    "m": "Bộ âu phục com-lê (suit)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "シャツ": {
    "r": "しゃつ",
    "m": "Áo sơ mi",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "セーター": {
    "r": "せーたー",
    "m": "Áo len (sweater)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "ジャケット": {
    "r": "じゃけっと",
    "m": "Áo khoác jacket",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "コート": {
    "r": "こーと",
    "m": "Áo khoác dài măng-tô",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "ズボン": {
    "r": "ずぼん",
    "m": "Quần dài",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "スカート": {
    "r": "すかーと",
    "m": "Váy ngắn (skirt)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 2
  },
  "ワンピース": {
    "r": "わんぴーす",
    "m": "Váy liền thân (one-piece)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 3
  },
  "制服": {
    "r": "せいふく",
    "m": "Đồng phục",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "靴": {
    "r": "くつ",
    "m": "Giày dép",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "靴下": {
    "r": "くつした",
    "m": "Tất, vớ chân",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "帽子": {
    "r": "ぼうし",
    "m": "Cái mũ, nón",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "手袋": {
    "r": "てぶくろ",
    "m": "Găng tay, bao tay",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "マフラー": {
    "r": "まふらー",
    "m": "Khăn quàng cổ mùa đông",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "ネクタイ": {
    "r": "ねくたい",
    "m": "Cà vạt (necktie)",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "ベルト": {
    "r": "べると",
    "m": "Thắt lưng, dây nịt",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "指輪": {
    "r": "ゆびわ",
    "m": "Nhẫn đeo tay",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "色": {
    "r": "いろ",
    "m": "Màu sắc",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "赤": {
    "r": "あか",
    "m": "Màu đỏ",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "青": {
    "r": "あお",
    "m": "Màu xanh da trời, xanh lam",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "黄色": {
    "r": "きいろ",
    "m": "Màu vàng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "白": {
    "r": "しろ",
    "m": "Màu trắng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "黒": {
    "r": "くろ",
    "m": "Màu đen",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "緑": {
    "r": "みどり",
    "m": "Màu xanh lá cây",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "茶色": {
    "r": "ちゃいろ",
    "m": "Màu nâu trà",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "紫": {
    "r": "むらさき",
    "m": "Màu tím",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 2
  },
  "灰色": {
    "r": "はいいろ",
    "m": "Màu xám tro",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "ピンク": {
    "r": "ぴんく",
    "m": "Màu hồng",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 1
  },
  "オレンジ": {
    "r": "おれんじ",
    "m": "Màu da cam",
    "t": "Từ ngoại lai",
    "pos": "n",
    "p": 2
  },
  "上": {
    "r": "うえ",
    "m": "Bên trên",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "下": {
    "r": "した",
    "m": "Bên dưới",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "前": {
    "r": "まえ",
    "m": "Phía trước",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "後ろ": {
    "r": "うしろ",
    "m": "Phía sau",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "右": {
    "r": "みぎ",
    "m": "Bên phải",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "左": {
    "r": "ひだり",
    "m": "Bên trái",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "中": {
    "r": "なか",
    "m": "Bên trong",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "外": {
    "r": "そと",
    "m": "Bên ngoài",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "隣": {
    "r": "となり",
    "m": "Bên cạnh (cùng loại)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "近く": {
    "r": "ちかく",
    "m": "Gần đây, lân cận",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "間": {
    "r": "あいだ",
    "m": "Ở giữa, khoảng cách",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "東": {
    "r": "ひがし",
    "m": "Hướng Đông",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "西": {
    "r": "にし",
    "m": "Hướng Tây",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "南": {
    "r": "みなみ",
    "m": "Hướng Nam",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "北": {
    "r": "きた",
    "m": "Hướng Bắc",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "向こう": {
    "r": "むこう",
    "m": "Phía đằng kia, bên đối diện",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "真ん中": {
    "r": "まんなか",
    "m": "Ngay chính giữa",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "ありがとう": {
    "r": "ありがとう",
    "m": "Cảm ơn bạn",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 2
  },
  "ありがとうございます": {
    "r": "ありがとうございます",
    "m": "Xin chân thành cảm ơn (lịch sự)",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 6
  },
  "どういたしまして": {
    "r": "どういたしまして",
    "m": "Không có chi, đừng khách sáo",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 1
  },
  "すみません": {
    "r": "すみません",
    "m": "Xin lỗi / làm phiền một chút",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 4
  },
  "ごめんなさい": {
    "r": "ごめんなさい",
    "m": "Tôi xin lỗi (chân thành)",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 4
  },
  "失礼します": {
    "r": "しつれいします",
    "m": "Tôi xin phép (thất lễ)",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 6
  },
  "よろしくお願いします": {
    "r": "よろしくおねがいします",
    "m": "Rất mong được giúp đỡ, nhờ cậy",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 9
  },
  "おはようございます": {
    "r": "おはようございます",
    "m": "Chào buổi sáng tốt lành",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 7
  },
  "こんにちは": {
    "r": "こんにちは",
    "m": "Xin chào (ban ngày)",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 0
  },
  "こんばんは": {
    "r": "こんばんは",
    "m": "Chào buổi tối",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 0
  },
  "おやすみなさい": {
    "r": "おやすみなさい",
    "m": "Chúc ngủ ngon",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 6
  },
  "さようなら": {
    "r": "さようなら",
    "m": "Tạm biệt (chào xa)",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 4
  },
  "いただきます": {
    "r": "いただきます",
    "m": "Mời dùng bữa (tôi xin nhận)",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 5
  },
  "ごちそうさまでした": {
    "r": "ごちそうさまでした",
    "m": "Cảm ơn vì bữa ăn ngon",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 8
  },
  "行ってきます": {
    "r": "いってきます",
    "m": "Tôi đi đây (sẽ về)",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 5
  },
  "行ってらっしゃい": {
    "r": "いってらっしゃい",
    "m": "Bạn đi nhé (bảo trọng)",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 6
  },
  "ただいま": {
    "r": "ただいま",
    "m": "Tôi đã về rồi đây!",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 4
  },
  "おかえりなさい": {
    "r": "おかえりなさい",
    "m": "Bạn đã về rồi đấy à!",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 6
  },
  "お疲れ様でした": {
    "r": "おつかれさまでした",
    "m": "Bạn đã vất vả rồi (chào tan sở)",
    "t": "Câu giao tiếp N4",
    "pos": "exp",
    "p": 8
  },
  "おめでとうございます": {
    "r": "おめでとうございます",
    "m": "Xin chúc mừng!",
    "t": "Câu giao tiếp N5",
    "pos": "exp",
    "p": 8
  },
  "大丈夫": {
    "r": "だいじょうぶ",
    "m": "Không sao, ổn thỏa, an toàn",
    "t": "Tính từ -na N5",
    "pos": "adj-na,adv",
    "p": 3
  },
  "もちろん": {
    "r": "もちろん",
    "m": "Đương nhiên, tất nhiên rồi",
    "t": "Phó từ N4",
    "pos": "adv",
    "p": 2
  },
  "なるほど": {
    "r": "なるほど",
    "m": "Hóa ra là vậy, thảo nào!",
    "t": "Phó từ N4",
    "pos": "adv",
    "p": 0
  },
  "どうぞ": {
    "r": "どうぞ",
    "m": "Xin mời, cứ tự nhiên",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 1
  },
  "どうも": {
    "r": "どうも",
    "m": "Cảm ơn / chào / không hiểu sao",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 1
  },
  "経済": {
    "r": "けいざい",
    "m": "Kinh tế",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "景気": {
    "r": "けいき",
    "m": "Tình hình kinh tế, thị trường",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "利益": {
    "r": "りえき",
    "m": "Lợi nhuận, tiền lãi",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "損失": {
    "r": "そんしつ",
    "m": "Tổn thất, thua lỗ",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "予算": {
    "r": "よさん",
    "m": "Dự toán, ngân sách",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "経費": {
    "r": "けいひ",
    "m": "Chi phí, kinh phí",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "投資": {
    "r": "とうし",
    "m": "Đầu tư",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "株": {
    "r": "かぶ",
    "m": "Cổ phiếu, chứng khoán",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "税金": {
    "r": "ぜいきん",
    "m": "Tiền thuế nhà nước",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "消費税": {
    "r": "しょうひぜい",
    "m": "Thuế tiêu thụ (VAT)",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 3
  },
  "領収書": {
    "r": "りょうしゅうしょ",
    "m": "Hóa đơn biên nhận",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "請求書": {
    "r": "せいきゅうしょ",
    "m": "Hóa đơn yêu cầu thanh toán",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "見積もり": {
    "r": "みつもり",
    "m": "Bản báo giá ước tính",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "取引": {
    "r": "とりひき",
    "m": "Giao dịch buôn bán",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 2
  },
  "顧客": {
    "r": "こきゃく",
    "m": "Khách hàng thân thiết",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "売上": {
    "r": "うりあげ",
    "m": "Doanh thu bán ra",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "価格": {
    "r": "かかく",
    "m": "Giá cả, mức giá",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "値段": {
    "r": "ねだん",
    "m": "Giá tiền",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "割引": {
    "r": "わりびき",
    "m": "Giảm giá, chiết khấu",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "無料": {
    "r": "むりょう",
    "m": "Miễn phí (0 đồng)",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "有料": {
    "r": "ゆうりょう",
    "m": "Có tính phí",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "現金": {
    "r": "げんきん",
    "m": "Tiền mặt",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "小銭": {
    "r": "こぜに",
    "m": "Tiền lẻ",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "貯金": {
    "r": "ちょきん",
    "m": "Tiền tiết kiệm gửi ngân hàng",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "教育": {
    "r": "きょういく",
    "m": "Giáo dục",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "大学院": {
    "r": "だいがくいん",
    "m": "Viện cao học, sau đại học",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 4
  },
  "学部": {
    "r": "がくぶ",
    "m": "Khoa đại học",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "学科": {
    "r": "がっか",
    "m": "Ngành học, môn thi lý thuyết",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "教授": {
    "r": "きょうじゅ",
    "m": "Giáo sư đại học",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "論文": {
    "r": "ろんぶん",
    "m": "Luận văn, bài báo khoa học",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "卒業論文": {
    "r": "そつぎょうろんぶん",
    "m": "Khóa luận tốt nghiệp",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 5
  },
  "単位": {
    "r": "たんい",
    "m": "Tín chỉ học tập / Đơn vị đo",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "討論": {
    "r": "とうろん",
    "m": "Thảo luận, tranh luận",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 1
  },
  "法律": {
    "r": "ほうりつ",
    "m": "Pháp luật quy phạm",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "政府": {
    "r": "せいふ",
    "m": "Chính phủ nhà nước",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "政治": {
    "r": "せいじ",
    "m": "Chính trị",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "選挙": {
    "r": "せんきょ",
    "m": "Bầu cử đại biểu",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 1
  },
  "平和": {
    "r": "へいわ",
    "m": "Hòa bình",
    "t": "Danh từ N4",
    "pos": "n,adj-na",
    "p": 0
  },
  "戦争": {
    "r": "せんそう",
    "m": "Chiến tranh",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "地球": {
    "r": "ちきゅう",
    "m": "Trái đất",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "人口": {
    "r": "じんこう",
    "m": "Dân số",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "文化": {
    "r": "ぶんか",
    "m": "Văn hóa",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "歴史": {
    "r": "れきし",
    "m": "Lịch sử",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "伝統": {
    "r": "でんとう",
    "m": "Truyền thống",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "祭り": {
    "r": "まつり",
    "m": "Lễ hội",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "検索": {
    "r": "けんさく",
    "m": "Tìm kiếm tra cứu (search)",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "画面": {
    "r": "がめん",
    "m": "Màn hình hiển thị",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "設定": {
    "r": "せってい",
    "m": "Cài đặt, thiết lập (settings)",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "更新": {
    "r": "こうしん",
    "m": "Cập nhật, làm mới (update/renew)",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "保存": {
    "r": "ほぞん",
    "m": "Lưu lại, bảo tồn (save)",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "削除": {
    "r": "さくじょ",
    "m": "Xóa bỏ (delete)",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 1
  },
  "共有": {
    "r": "きょうゆう",
    "m": "Chia sẻ tài liệu, dùng chung (share)",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "通知": {
    "r": "つうち",
    "m": "Thông báo tin nhắn, chuông báo",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "接続": {
    "r": "せつぞく",
    "m": "Kết nối mạng (connection)",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "通信": {
    "r": "つうしん",
    "m": "Viễn thông, truyền thông tin",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "端末": {
    "r": "たんまつ",
    "m": "Thiết bị đầu cuối, smartphone/tablet",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "携帯": {
    "r": "けいたい",
    "m": "Điện thoại di động / mang theo người",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "電池": {
    "r": "でんち",
    "m": "Pin năng lượng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "充電": {
    "r": "じゅうでん",
    "m": "Sạc pin, nạp điện",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "録音": {
    "r": "ろくおん",
    "m": "Ghi âm giọng nói",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "録画": {
    "r": "ろくが",
    "m": "Ghi hình, quay video",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "再生": {
    "r": "さいせい",
    "m": "Phát lại video/nhạc, tái sinh",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "停止": {
    "r": "ていし",
    "m": "Dừng lại, tạm ngưng",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "音量": {
    "r": "おんりょう",
    "m": "Âm lượng loa",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "広告": {
    "r": "こうこく",
    "m": "Quảng cáo, banner",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "動画": {
    "r": "どうが",
    "m": "Video clip chuyển động",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "画像": {
    "r": "がぞう",
    "m": "Hình ảnh đồ họa, bức ảnh",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "写真": {
    "r": "しゃしん",
    "m": "Bức ảnh chụp",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "投稿": {
    "r": "とうこう",
    "m": "Đăng bài, đăng status (post)",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "コメント": {
    "r": "こめんと",
    "m": "Bình luận (comment)",
    "t": "Từ ngoại lai",
    "pos": "n,vs",
    "p": 1
  },
  "返信": {
    "r": "へんしん",
    "m": "Hồi âm, nhắn tin trả lời",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "登録": {
    "r": "とうろく",
    "m": "Đăng ký tài khoản (register)",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "解除": {
    "r": "かいじょ",
    "m": "Hủy bỏ, giải trừ",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 1
  },
  "規約": {
    "r": "きやく",
    "m": "Điều khoản thỏa thuận sử dụng dịch vụ",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 0
  },
  "同意": {
    "r": "どうい",
    "m": "Đồng ý, chấp thuận",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "社会": {
    "r": "しゃかい",
    "m": "Xã hội, cộng đồng",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "住民": {
    "r": "じゅうみん",
    "m": "Cư dân địa phương",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "市民": {
    "r": "しみん",
    "m": "Người dân thị trấn / công dân",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "国民": {
    "r": "こくみん",
    "m": "Quốc dân, người dân cả nước",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "規則": {
    "r": "きそく",
    "m": "Quy tắc, nội quy",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "違反": {
    "r": "いはん",
    "m": "Vi phạm luật lệ",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "権利": {
    "r": "けんり",
    "m": "Quyền lợi, quyền hạn",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "義務": {
    "r": "ぎむ",
    "m": "Nghĩa vụ, bổn phận",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "保険": {
    "r": "ほけん",
    "m": "Bảo hiểm y tế, nhân thọ",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "年金": {
    "r": "ねんきん",
    "m": "Lương hưu, tiền hưu trí",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "手続き": {
    "r": "てつづき",
    "m": "Thủ tục giấy tờ",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 2
  },
  "申請": {
    "r": "しんせい",
    "m": "Nộp đơn xin cấp, đăng ký",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "許可": {
    "r": "きょか",
    "m": "Sự cho phép, cấp phép",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 1
  },
  "禁止": {
    "r": "きんし",
    "m": "Cấm chỉ, nghiêm cấm",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "受付": {
    "r": "うけつけ",
    "m": "Quầy lễ tân, tiếp đón",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "窓口": {
    "r": "まどぐち",
    "m": "Cửa tiếp nhận hồ sơ, quầy giao dịch",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 2
  },
  "苦情": {
    "r": "くじょう",
    "m": "Khiếu nại, phàn nàn",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "解決": {
    "r": "かいけつ",
    "m": "Giải quyết vấn đề ổn thỏa",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "対策": {
    "r": "たいさく",
    "m": "Biện pháp đối phó, đối sách",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "予防": {
    "r": "よぼう",
    "m": "Phòng ngừa, ngăn chặn bệnh",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "支援": {
    "r": "しえん",
    "m": "Hỗ trợ, chi viện, tiếp sức",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "協力": {
    "r": "きょうりょく",
    "m": "Hợp tác, chung sức, chung lòng",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "気持ち": {
    "r": "きもち",
    "m": "Tâm trạng, cảm giác, tấm lòng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "気分": {
    "r": "きぶん",
    "m": "Khí sắc, tâm trạng lúc này",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "感情": {
    "r": "かんじょう",
    "m": "Cảm xúc, tình cảm",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "不安": {
    "r": "ふあん",
    "m": "Bất an, lo âu",
    "t": "Tính từ -na N4",
    "pos": "adj-na,n",
    "p": 0
  },
  "心配": {
    "r": "しんぱい",
    "m": "Lo lắng",
    "t": "Tính từ -na N5",
    "pos": "adj-na,n,vs",
    "p": 0
  },
  "緊張": {
    "r": "きんちょう",
    "m": "Căng thẳng, hồi hộp",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "安心": {
    "r": "あんしん",
    "m": "An tâm, nhẹ nhõm",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "満足": {
    "r": "まんぞく",
    "m": "Mãn nguyện, thỏa mãn",
    "t": "Danh từ N4",
    "pos": "n,vs",
    "p": 1
  },
  "不満": {
    "r": "ふまん",
    "m": "Bất mãn, không hài lòng",
    "t": "Tính từ -na N3",
    "pos": "adj-na,n",
    "p": 0
  },
  "後悔": {
    "r": "こうかい",
    "m": "Hối hận, ân hận",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "感謝": {
    "r": "かんしゃ",
    "m": "Biết ơn, cảm tạ",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 1
  },
  "尊敬": {
    "r": "そんけい",
    "m": "Tôn kính, kính trọng",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "信頼": {
    "r": "しんらい",
    "m": "Tin cậy, tín nhiệm",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "期待": {
    "r": "きたい",
    "m": "Kỳ vọng, mong đợi",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "失望": {
    "r": "しつぼう",
    "m": "Thất vọng tràn trề",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "孤独": {
    "r": "こどく",
    "m": "Cô độc, lẻ loi",
    "t": "Tính từ -na N3",
    "pos": "adj-na,n",
    "p": 0
  },
  "焦り": {
    "r": "あせり",
    "m": "Sốt ruột, hấp tấp, sốt sắng",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "怒り": {
    "r": "いかり",
    "m": "Cơn thịnh nộ, tức giận",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 3
  },
  "恐怖": {
    "r": "きょうふ",
    "m": "Nỗi sợ hãi, kinh hoàng",
    "t": "Danh từ N3",
    "pos": "n,vs",
    "p": 1
  },
  "幸福": {
    "r": "こうふく",
    "m": "Hạnh phúc ngập tràn",
    "t": "Tính từ -na N3",
    "pos": "adj-na,n",
    "p": 0
  },
  "考える": {
    "r": "かんがえる",
    "m": "Suy nghĩ, cân nhắc",
    "t": "Động từ Nhóm 2 N5",
    "pos": "v2",
    "p": 3
  },
  "決める": {
    "r": "きめる",
    "m": "Quyết định (tha động từ)",
    "t": "Động từ Nhóm 2 N4",
    "pos": "v2",
    "p": 0
  },
  "決まる": {
    "r": "きまる",
    "m": "Được ấn định, giải quyết (tự)",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 0
  },
  "迷う": {
    "r": "まよう",
    "m": "Phân vân, lạc đường, do dự",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 2
  },
  "悩む": {
    "r": "なやむ",
    "m": "Trăn trở, khổ não, lo nghĩ",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 2
  },
  "諦める": {
    "r": "あきらめる",
    "m": "Từ bỏ, bỏ cuộc",
    "t": "Động từ Nhóm 2 N3",
    "pos": "v2",
    "p": 4
  },
  "信じる": {
    "r": "しんじる",
    "m": "Tin tưởng, tín thác",
    "t": "Động từ Nhóm 2 N4",
    "pos": "v2",
    "p": 3
  },
  "疑う": {
    "r": "うたがう",
    "m": "Nghi ngờ, ngờ vực",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 0
  },
  "驚く": {
    "r": "おどろく",
    "m": "Kinh ngạc, giật mình sửng sốt",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 3
  },
  "怒る": {
    "r": "おこる",
    "m": "Tức giận, cáu giận",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 2
  },
  "泣く": {
    "r": "なく",
    "m": "Khóc",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "笑う": {
    "r": "わらう",
    "m": "Cười, mỉm cười",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "楽しむ": {
    "r": "たのしむ",
    "m": "Tận hưởng, thưởng thức",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 3
  },
  "喜ぶ": {
    "r": "よろこぶ",
    "m": "Vui mừng, hoan hỉ",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 3
  },
  "嫌う": {
    "r": "きらう",
    "m": "Ghét, chán ghét",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 0
  },
  "好む": {
    "r": "このむ",
    "m": "Yêu thích, ưa chuộng",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 2
  },
  "祈る": {
    "r": "いのる",
    "m": "Cầu nguyện, chúc phúc",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 2
  },
  "望む": {
    "r": "のぞむ",
    "m": "Kỳ vọng, mong mỏi",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 0
  },
  "応援する": {
    "r": "おうえんする",
    "m": "Cổ vũ, tiếp sức ủng hộ",
    "t": "Động từ Nhóm 3 N4",
    "pos": "v3",
    "p": 0
  },
  "参加する": {
    "r": "さんかする",
    "m": "Tham gia vào sự kiện",
    "t": "Động từ Nhóm 3 N4",
    "pos": "v3",
    "p": 0
  },
  "断る": {
    "r": "ことわる",
    "m": "Từ chối, khước từ",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 3
  },
  "見当たる": {
    "r": "みあたる",
    "m": "Tìm thấy, nhìn thấy (thường dùng phủ định: không thấy đâu)",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 0
  },
  "飛び降りる": {
    "r": "とびおりる",
    "m": "Nhảy xuống (từ trên cao)",
    "t": "Động từ Nhóm 2 N3",
    "pos": "v2",
    "p": 4
  },
  "飛び上がる": {
    "r": "とびあがる",
    "m": "Nhảy cẫng lên (vì vui sướng, giật mình)",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 4
  },
  "持ち歩く": {
    "r": "もちあるく",
    "m": "Mang theo bên mình, mang đi khắp nơi",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 4
  },
  "持ち帰る": {
    "r": "もちかえる",
    "m": "Mang về nhà, mua mang về (takeaway)",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 3
  },
  "振り返る": {
    "r": "ふりかえる",
    "m": "Ngoái đầu lại, nhìn lại quá khứ/chặng đường đã qua",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 3
  },
  "振り向く": {
    "r": "ふりむく",
    "m": "Ngoảnh mặt lại, quay đầu nhìn lại",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 3
  },
  "立ち去る": {
    "r": "たちさる",
    "m": "Rời đi, bỏ đi khỏi nơi đó",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 3
  },
  "受け止める": {
    "r": "うけとめる",
    "m": "Đón nhận, hứng lấy, đối diện với sự thật",
    "t": "Động từ Nhóm 2 N2",
    "pos": "v2",
    "p": 4
  },
  "受け継ぐ": {
    "r": "うけつぐ",
    "m": "Kế thừa, nối dõi, tiếp quản",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 3
  },
  "引き返す": {
    "r": "ひきかえす",
    "m": "Quay trở lại, quay đầu xe",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 3
  },
  "引っ越す": {
    "r": "ひっこす",
    "m": "Chuyển nhà, chuyển chỗ ở",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 3
  },
  "引っかかる": {
    "r": "ひっかかる",
    "m": "Bị mắc kẹt, vướng vào, dính bẫy",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 4
  },
  "引っ張る": {
    "r": "ひっぱる",
    "m": "Kéo, lôi kéo, dẫn dắt đội ngũ",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 3
  },
  "擦れ違う": {
    "r": "すれちがう",
    "m": "Đi lướt qua nhau, ngược hướng nhau, bất đồng ý kiến",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 4
  },
  "すれ違う": {
    "r": "すれちがう",
    "m": "Đi lướt qua nhau, bất đồng quan điểm, lỡ mất nhau",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 4
  },
  "乗り遅れる": {
    "r": "のりおくれる",
    "m": "Lỡ chuyến tàu, xe; tụt hậu so với thời đại",
    "t": "Động từ Nhóm 2 N3",
    "pos": "v2",
    "p": 5
  },
  "乗り込む": {
    "r": "のりこむ",
    "m": "Bước lên xe/tàu, xông vào địa bàn",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 4
  },
  "買い換える": {
    "r": "かいかえる",
    "m": "Mua đổi mới, thay thế đồ cũ",
    "t": "Động từ Nhóm 2 N3",
    "pos": "v2",
    "p": 4
  },
  "見落とす": {
    "r": "みおとす",
    "m": "Bỏ sót, nhìn sót, xem nhẹ",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 3
  },
  "見逃す": {
    "r": "みのがす",
    "m": "Bỏ lỡ cơ hội, làm ngơ bỏ qua",
    "t": "Động tự Nhóm 1 N2",
    "pos": "v1",
    "p": 3
  },
  "見つめる": {
    "r": "みつめる",
    "m": "Nhìn chằm chằm, dõi theo, nhìn thẳng vào",
    "t": "Động từ Nhóm 2 N3",
    "pos": "v2",
    "p": 0
  },
  "見守る": {
    "r": "みまもる",
    "m": "Dõi theo, quan sát bảo bọc, trông nom",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 0
  },
  "思いやる": {
    "r": "おもいやる",
    "m": "Quan tâm, thấu hiểu, cảm thông cho người khác",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 4
  },
  "信じ込む": {
    "r": "しんじこむ",
    "m": "Tin sái cổ, tin tưởng tuyệt đối",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 4
  },
  "落ち込む": {
    "r": "おちこむ",
    "m": "Buồn bã, suy sụp, giảm sút (kinh tế)",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 0
  },
  "飛び込む": {
    "r": "とびこむ",
    "m": "Lao mình vào, nhảy vào dòng nước/sự kiện",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 3
  },
  "駆け込む": {
    "r": "かけこむ",
    "m": "Chạy vội vào trong (tàu xe, phòng thi)",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 3
  },
  "入り込む": {
    "r": "はいりこむ",
    "m": "Chui vào, thâm nhập vào sâu bên trong",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 4
  },
  "踏み込む": {
    "r": "ふみこむ",
    "m": "Bước chân vào, can thiệp sâu vào vấn đề",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 3
  },
  "割り込む": {
    "r": "わりこむ",
    "m": "Chen ngang, chen hàng, ngắt lời người khác",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 3
  },
  "溶け込む": {
    "r": "とけこむ",
    "m": "Hòa tan vào, hòa nhập vào môi trường mới",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 3
  },
  "吸い込む": {
    "r": "すいこむ",
    "m": "Hít vào, hút vào (bụi, khói)",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 3
  },
  "埋め込む": {
    "r": "うめこむ",
    "m": "Nhúng vào, chôn vào, cấy vào",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 4
  },
  "当てはまる": {
    "r": "あてはまる",
    "m": "Phù hợp, ứng nghiệm, đúng với tiêu chí",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 5
  },
  "当てはめる": {
    "r": "あてはめる",
    "m": "Áp dụng, vận dụng vào thực tế",
    "t": "Động từ Nhóm 2 N2",
    "pos": "v2",
    "p": 5
  },
  "支え合う": {
    "r": "ささえあう",
    "m": "Nâng đỡ lẫn nhau, tương trợ vượt khó",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 4
  },
  "励まし合う": {
    "r": "はげましあう",
    "m": "Động viên, khích lệ lẫn nhau",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 5
  },
  "譲り合う": {
    "r": "ゆずりあう",
    "m": "Nhường nhịn lẫn nhau (chỗ ngồi, đường đi)",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 4
  },
  "分かり合う": {
    "r": "わかりあう",
    "m": "Thấu hiểu lẫn nhau",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 4
  },
  "愛し合う": {
    "r": "あいしあう",
    "m": "Yêu thương nhau say đắm",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 4
  },
  "奪い合う": {
    "r": "うばいあう",
    "m": "Tranh giành nhau, giằng xé",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 4
  },
  "寄り添う": {
    "r": "よりそう",
    "m": "Ở bên cạnh sẻ chia, sát cánh, dựa vào nhau",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 3
  },
  "寄り道する": {
    "r": "よりみちする",
    "m": "La cà, tạt ngang tạt ngửa trên đường",
    "t": "Động từ Nhóm 3 N3",
    "pos": "v3",
    "p": 0
  },
  "読み直す": {
    "r": "よみなおす",
    "m": "Đọc lại lần nữa, rà soát lại văn bản",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 4
  },
  "考え直す": {
    "r": "かんがえなおす",
    "m": "Suy nghĩ lại, cân nhắc lại quyết định",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 5
  },
  "出直す": {
    "r": "でなおす",
    "m": "Quay lại sau, làm lại từ bước khởi đầu",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 3
  },
  "使い切る": {
    "r": "つかいきる",
    "m": "Dùng hết sạch, sử dụng trọn vẹn",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 4
  },
  "疲れ切る": {
    "r": "つかれきる",
    "m": "Kiệt sức hoàn toàn, mệt lả",
    "t": "Động từ Nhóm 1 N2",
    "pos": "v1",
    "p": 4
  },
  "泣き出す": {
    "r": "なきだす",
    "m": "Bật khóc, òa khóc",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 3
  },
  "笑い出す": {
    "r": "わらいだす",
    "m": "Phì cười, bật cười to",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 4
  },
  "怒り出す": {
    "r": "おこりだす",
    "m": "Nổi giận đùng đùng, cáu gắt",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 4
  },
  "言い出す": {
    "r": "いいだす",
    "m": "Mở lời, đề xuất, bắt đầu nói",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 3
  },
  "走り出す": {
    "r": "はしりだす",
    "m": "Bắt đầu chạy, phóng xe đi",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 4
  },
  "降り出す": {
    "r": "ふりだす",
    "m": "Trời bắt đầu đổ mưa, tuyết rơi",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 3
  },
  "維持": {
    "r": "いじ",
    "m": "Duy trì, giữ gìn trạng thái",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 1
  },
  "意識": {
    "r": "いしき",
    "m": "Ý thức, nhận thức, tỉnh táo",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 1
  },
  "異常": {
    "r": "いじょう",
    "m": "Bất thường, khác lạ, dị thường",
    "t": "Tính từ -na / Danh từ N3",
    "pos": "adj-na,n",
    "p": 0
  },
  "依頼": {
    "r": "いらい",
    "m": "Nhờ vả, ủy thác, yêu cầu hỗ trợ",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "意図": {
    "r": "いと",
    "m": "Ý đồ, mục đích, chủ định",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 1
  },
  "隠蔽": {
    "r": "いんぺい",
    "m": "Che đậy, bưng bít, che giấu sự thật",
    "t": "Danh từ / Động từ N1",
    "pos": "n,vs",
    "p": 0
  },
  "運営": {
    "r": "うんえい",
    "m": "Vận hành, điều hành, quản lý tổ chức",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "影響": {
    "r": "えいきょう",
    "m": "Ảnh hưởng, tác động",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "延期": {
    "r": "えんき",
    "m": "Trì hoãn, hoãn lại lịch trình",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "応用": {
    "r": "おうよう",
    "m": "Ứng dụng vào thực tiễn",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "改革": {
    "r": "かいかく",
    "m": "Cải cách, đổi mới quy chế",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "改善": {
    "r": "かいぜん",
    "m": "Cải tiến, làm cho tốt hơn (Kaizen)",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "概念": {
    "r": "がいねん",
    "m": "Khái niệm, ý niệm chung",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 1
  },
  "開発": {
    "r": "かいはつ",
    "m": "Phát triển (phần mềm, công nghệ, bất động sản)",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "拡大": {
    "r": "かくだい",
    "m": "Mở rộng, phóng to quy mô",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "確保": {
    "r": "かくほ",
    "m": "Bảo đảm, chắc chắn có được, giữ chỗ",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 1
  },
  "確認": {
    "r": "かくにん",
    "m": "Xác nhận, kiểm tra lại",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "獲得": {
    "r": "かくとく",
    "m": "Thu được, gặt hái, giành được (thắng lợi)",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "格差": {
    "r": "かくさ",
    "m": "Khoảng cách chênh lệch (giàu nghèo, trình độ)",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 1
  },
  "革新": {
    "r": "かくしん",
    "m": "Đổi mới, cách tân, cải cách",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "過剰": {
    "r": "かじょう",
    "m": "Dư thừa, vượt quá mức cần thiết",
    "t": "Tính từ -na / Danh từ N2",
    "pos": "adj-na,n",
    "p": 0
  },
  "課題": {
    "r": "かだい",
    "m": "Thách thức, vấn đề nan giải cần giải quyết",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 0
  },
  "価値": {
    "r": "かち",
    "m": "Giá trị, phẩm giá",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "活動": {
    "r": "かつどう",
    "m": "Hoạt động, sinh hoạt",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "活用": {
    "r": "かつよう",
    "m": "Vận dụng, tận dụng tối đa",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "基準": {
    "r": "きじゅん",
    "m": "Tiêu chuẩn, chuẩn mực đánh giá",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "基礎": {
    "r": "きそ",
    "m": "Nền tảng, căn bản, cơ sở",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 2
  },
  "機能": {
    "r": "きのう",
    "m": "Chức năng, tính năng",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 1
  },
  "寄付": {
    "r": "きふ",
    "m": "Quyên góp, ủng hộ tiền từ thiện",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 1
  },
  "共感": {
    "r": "きょうかん",
    "m": "Đồng cảm, thấu cảm",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "供給": {
    "r": "きょうきゅう",
    "m": "Cung cấp, tiếp tế (nguồn hàng, năng lượng)",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "脅威": {
    "r": "きょうい",
    "m": "Mối đe dọa, hiểm họa",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 1
  },
  "業績": {
    "r": "ぎょうせき",
    "m": "Thành tích, kết quả kinh doanh",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 0
  },
  "局面": {
    "r": "きょくめん",
    "m": "Cục diện, tình thế",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 0
  },
  "拒否": {
    "r": "きょひ",
    "m": "Cự tuyệt, từ chối thẳng thừng",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 1
  },
  "金融": {
    "r": "きんゆう",
    "m": "Tài chính, tiền tệ",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "契機": {
    "r": "けいき",
    "m": "Thời cơ, duyên cớ, bước ngoặt",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 1
  },
  "傾向": {
    "r": "けいこう",
    "m": "Xu hướng, chiều hướng",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "警告": {
    "r": "けいこく",
    "m": "Cảnh báo, nhắc nhở nghiêm khắc",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "計算": {
    "r": "けいさん",
    "m": "Tính toán, số liệu",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "結論": {
    "r": "けつろん",
    "m": "Kết luận, phán quyết cuối cùng",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "決断": {
    "r": "けつだん",
    "m": "Quyết đoán, đưa ra quyết định hệ trọng",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "欠陥": {
    "r": "けっかん",
    "m": "Khuyết điểm, tì vết, lỗi kỹ thuật",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 0
  },
  "見解": {
    "r": "けんかい",
    "m": "Quan điểm, cách nhìn nhận sự việc",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 0
  },
  "限界": {
    "r": "げんかい",
    "m": "Giới hạn, điểm kịch trần",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "現象": {
    "r": "げんしょう",
    "m": "Hiện tượng thiên nhiên / xã hội",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "現場": {
    "r": "げんば",
    "m": "Hiện trường, nơi diễn ra công việc thực tế",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "効率": {
    "r": "こうりつ",
    "m": "Hiệu suất, năng suất làm việc",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "公平": {
    "r": "こうへい",
    "m": "Công bằng, chí công vô tư",
    "t": "Tính từ -na / Danh từ N3",
    "pos": "adj-na,n",
    "p": 0
  },
  "克服": {
    "r": "こくふく",
    "m": "Khắc phục, vượt qua bệnh tật/khó khăn",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "根拠": {
    "r": "こんきょ",
    "m": "Căn cứ, cơ sở vững chắc",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 1
  },
  "困難": {
    "r": "こんなん",
    "m": "Gian nan, khó khăn trở ngại",
    "t": "Tính từ -na / Danh từ N3",
    "pos": "adj-na,n",
    "p": 1
  },
  "削減": {
    "r": "さくげん",
    "m": "Cắt giảm (chi phí, nhân sự, khí thải)",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "差別": {
    "r": "さべつ",
    "m": "Phân biệt đối xử, kỳ thị",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 1
  },
  "指揮": {
    "r": "しき",
    "m": "Chỉ huy, điều khiển dàn nhạc / quân đội",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 1
  },
  "指摘": {
    "r": "してき",
    "m": "Chỉ trích, vạch rõ, chỉ ra lỗi sai",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "持続": {
    "r": "じぞく",
    "m": "Duy trì liên tục, bền vững",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "執着": {
    "r": "しゅうちゃく",
    "m": "Chấp niệm, gắn bó cố chấp, quyến luyến",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "主張": {
    "r": "しゅちょう",
    "m": "Chủ trương, khẳng định lập trường",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "需要": {
    "r": "じゅよう",
    "m": "Nhu cầu tiêu dùng (đối với nguồn cung)",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "充実": {
    "r": "じゅうじつ",
    "m": "Sung túc, đủ đầy, phong phú viên mãn",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "循環": {
    "r": "じゅんかん",
    "m": "Tuần hoàn, luân chuyển theo chu kỳ",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "状況": {
    "r": "じょうきょう",
    "m": "Tình hình, trạng thái hiện tại",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "情勢": {
    "r": "じょうせい",
    "m": "Tình thế xã hội, chính trị, thời cuộc",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 0
  },
  "条約": {
    "r": "じょうやく",
    "m": "Hiệp ước quốc tế",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 0
  },
  "処理": {
    "r": "しょり",
    "m": "Xử lý, giải quyết rác thải / dữ liệu",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 1
  },
  "措置": {
    "r": "そち",
    "m": "Biện pháp xử trí kịp thời",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 1
  },
  "妥協": {
    "r": "だきょう",
    "m": "Thỏa hiệp, nhượng bộ lẫn nhau",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "対応": {
    "r": "たいおう",
    "m": "Đối ứng, xử lý tình huống, phản hồi khách",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "対象": {
    "r": "たいしょう",
    "m": "Đối tượng hướng tới",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "達成": {
    "r": "たっせい",
    "m": "Đạt được, hoàn thành mục tiêu",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "妥当": {
    "r": "だとう",
    "m": "Hợp lý, thỏa đáng, đúng mực",
    "t": "Tính từ -na / Danh từ N2",
    "pos": "adj-na,n",
    "p": 0
  },
  "蓄積": {
    "r": "ちくせき",
    "m": "Tích lũy, tích tụ (kiến thức, mệt mỏi)",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "調査": {
    "r": "ちょうさ",
    "m": "Khảo sát, điều tra số liệu",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 1
  },
  "提携": {
    "r": "ていけい",
    "m": "Hợp tác kinh doanh, liên minh đối tác",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "提案": {
    "r": "ていあん",
    "m": "Đề xuất, kiến nghị sáng kiến",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "提示": {
    "r": "ていじ",
    "m": "Xuất trình, đưa ra (giấy tờ, bằng chứng)",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "展望": {
    "r": "てんぼう",
    "m": "Triển vọng tương lai, tầm nhìn xa",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "統合": {
    "r": "とうごう",
    "m": "Hợp nhất, tích hợp hệ thống",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "導入": {
    "r": "どうにゅう",
    "m": "Áp dụng đưa vào, triển khai công nghệ mới",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "特有": {
    "r": "とくゆう",
    "m": "Đặc thù, vốn có, riêng biệt",
    "t": "Tính từ -na / Danh từ N2",
    "pos": "adj-na,n",
    "p": 0
  },
  "独創": {
    "r": "どくそう",
    "m": "Độc đáo, sáng tạo nguyên bản",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "把握": {
    "r": "はあく",
    "m": "Nắm bắt tường tận, thấu hiểu tình hình",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "背景": {
    "r": "はいけい",
    "m": "Bối cảnh đằng sau, phông nền",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 0
  },
  "配慮": {
    "r": "はいりょ",
    "m": "Quan tâm chu đáo, để tâm tới cảm xúc",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 1
  },
  "破綻": {
    "r": "はたん",
    "m": "Phá sản, sụp đổ hoàn toàn",
    "t": "Danh từ / Động từ N1",
    "pos": "n,vs",
    "p": 0
  },
  "反映": {
    "r": "はんえい",
    "m": "Phản ánh, soi chiếu thực tế",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "範囲": {
    "r": "はんい",
    "m": "Phạm vi, giới hạn khoanh vùng",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "評価": {
    "r": "ひょうか",
    "m": "Đánh giá, chấm điểm chất lượng",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 1
  },
  "普及": {
    "r": "ふきゅう",
    "m": "Phổ cập, lan rộng ra toàn dân",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "崩壊": {
    "r": "ほうかい",
    "m": "Sụp đổ, tan rã cấu trúc",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "包括": {
    "r": "ほうかつ",
    "m": "Bao quát, tổng thể toàn diện",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "保障": {
    "r": "ほしょう",
    "m": "Bảo đảm quyền lợi, an sinh xã hội",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "方針": {
    "r": "ほうしん",
    "m": "Phương châm, định hướng chính sách",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "防止": {
    "r": "ぼうし",
    "m": "Đề phòng, ngăn chặn hiểm họa",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "模索": {
    "r": "もさく",
    "m": "Mò mẫm, tìm kiếm giải pháp",
    "t": "Danh từ / Động từ N1",
    "pos": "n,vs",
    "p": 0
  },
  "矛盾": {
    "r": "むじゅん",
    "m": "Mâu thuẫn, trái ngược nhau",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "連携": {
    "r": "れんけい",
    "m": "Liên kết, phối hợp tác chiến",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "論理": {
    "r": "ろんり",
    "m": "Logic, lý lẽ, luận lý học",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 1
  },
  "サブスク": {
    "r": "さぶすく",
    "m": "Dịch vụ đăng ký định kỳ trả phí (Subscription)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 0
  },
  "ストリーミング": {
    "r": "すとりーみんぐ",
    "m": "Phát trực tuyến video/âm nhạc (Streaming)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 3
  },
  "キャッシュレス": {
    "r": "きゃっしゅれす",
    "m": "Thanh toán không dùng tiền mặt (Cashless)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 4
  },
  "インフルエンサー": {
    "r": "いんふるえんさー",
    "m": "Người có sức ảnh hưởng trên mạng xã hội (Influencer)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 5
  },
  "コンテンツ": {
    "r": "こんてんつ",
    "m": "Nội dung số, ấn phẩm truyền thông (Content)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 3
  },
  "プラットフォーム": {
    "r": "ぷらっとふぉーむ",
    "m": "Nền tảng công nghệ, sân ga (Platform)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 4
  },
  "アルゴリズム": {
    "r": "あるごりずむ",
    "m": "Thuật toán máy tính (Algorithm)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 4
  },
  "フレームワーク": {
    "r": "ふれーむわーく",
    "m": "Khung lập trình, khuôn khổ tư duy (Framework)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 5
  },
  "ライブラリ": {
    "r": "らいぶらり",
    "m": "Thư viện mã nguồn / kho tư liệu (Library)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 3
  },
  "デバッグ": {
    "r": "でばっぐ",
    "m": "Tìm và sửa lỗi phần mềm (Debug)",
    "t": "Danh từ / Động từ Katakana",
    "pos": "n,vs",
    "p": 0
  },
  "リファクタリング": {
    "r": "りふぁくたりんぐ",
    "m": "Tối ưu và tái cấu trúc mã nguồn (Refactoring)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 4
  },
  "デプロイ": {
    "r": "でぷろい",
    "m": "Phát hành, đưa ứng dụng lên máy chủ (Deploy)",
    "t": "Danh từ / Động từ Katakana",
    "pos": "n,vs",
    "p": 0
  },
  "バックエンド": {
    "r": "ばっくえんど",
    "m": "Phần xử lý máy chủ, hậu đài (Backend)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 4
  },
  "フロントエンド": {
    "r": "ふろんとえんど",
    "m": "Giao diện người dùng mặt trước (Frontend)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 5
  },
  "サイバーセキュリティ": {
    "r": "さいばーせきゅりてぃ",
    "m": "An ninh mạng máy tính (Cybersecurity)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 5
  },
  "デバイス": {
    "r": "でばいす",
    "m": "Thiết bị điện tử cầm tay (Device)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 2
  },
  "タッチパネル": {
    "r": "たっちぱねる",
    "m": "Màn hình cảm ứng chạm (Touch panel)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 4
  },
  "インターフェース": {
    "r": "いんたーふぇーす",
    "m": "Giao diện tương tác người dùng (Interface)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 4
  },
  "ショートカット": {
    "r": "しょーとかっと",
    "m": "Phím tắt thao tác nhanh, đường tắt (Shortcut)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 4
  },
  "デフォルト": {
    "r": "でふぉると",
    "m": "Mặc định hệ thống cài sẵn (Default)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 2
  },
  "オプション": {
    "r": "おぷしょん",
    "m": "Tùy chọn bổ sung thêm (Option)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 1
  },
  "アップグレード": {
    "r": "あっぷぐれーど",
    "m": "Nâng cấp phần cứng/phần mềm (Upgrade)",
    "t": "Danh từ / Động từ Katakana",
    "pos": "n,vs",
    "p": 4
  },
  "アンインストール": {
    "r": "あんいんすとーる",
    "m": "Gỡ cài đặt phần mềm ra khỏi máy (Uninstall)",
    "t": "Danh từ / Động từ Katakana",
    "pos": "n,vs",
    "p": 4
  },
  "プロフィール": {
    "r": "ぷろふぃーる",
    "m": "Hồ sơ cá nhân, tiểu sử (Profile)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 3
  },
  "ガイドライン": {
    "r": "がいどらいん",
    "m": "Nguyên tắc chỉ dẫn, quy tắc cộng đồng (Guideline)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 4
  },
  "ポリシー": {
    "r": "ぽりしー",
    "m": "Chính sách quy định, quan điểm lập trường (Policy)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 1
  },
  "ライセンス": {
    "r": "らいせんす",
    "m": "Giấy phép bản quyền, chứng chỉ hành nghề (License)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 1
  },
  "クレジット": {
    "r": "くれじっと",
    "m": "Tín dụng ngân hàng, ghi công tác giả (Credit)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 2
  },
  "デビットカード": {
    "r": "でびっとかーど",
    "m": "Thẻ ghi nợ thanh toán trực tiếp (Debit card)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 5
  },
  "テレワーク": {
    "r": "てれわーく",
    "m": "Làm việc từ xa qua mạng (Telework)",
    "t": "Danh từ / Động từ Katakana",
    "pos": "n,vs",
    "p": 3
  },
  "リモートワーク": {
    "r": "りもーとわーく",
    "m": "Làm việc từ xa ngoài văn phòng (Remote work)",
    "t": "Danh từ / Động từ Katakana",
    "pos": "n,vs",
    "p": 4
  },
  "タスク": {
    "r": "たすく",
    "m": "Đầu mục công việc cần hoàn thành (Task)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 1
  },
  "エンジニア": {
    "r": "えんじにあ",
    "m": "Kỹ sư công nghệ / lập trình viên (Engineer)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 3
  },
  "デザイナー": {
    "r": "でざいなー",
    "m": "Nhà thiết kế mỹ thuật / đồ họa (Designer)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 3
  },
  "フリーランス": {
    "r": "ふりーらんす",
    "m": "Người làm việc tự do (Freelance)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 3
  },
  "スタートアップ": {
    "r": "すたーとあっぷ",
    "m": "Doanh nghiệp khởi nghiệp sáng tạo (Startup)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 4
  },
  "ベンチャー": {
    "r": "べんちゃー",
    "m": "Doanh nghiệp mạo hiểm đổi mới công nghệ (Venture)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 1
  },
  "マーケティング": {
    "r": "まーけてぃんぐ",
    "m": "Tiếp thị quảng bá thương mại (Marketing)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 3
  },
  "ブランディング": {
    "r": "ぶらんでぃんぐ",
    "m": "Xây dựng bản sắc thương hiệu (Branding)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 3
  },
  "コストパフォーマンス": {
    "r": "こすとぱふぉーまんす",
    "m": "Tỷ lệ hiệu quả trên chi phí (Cost-performance/Cospa)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 6
  },
  "クオリティ": {
    "r": "くおりてぃ",
    "m": "Chất lượng sản phẩm / dịch vụ (Quality)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 2
  },
  "フィードバック": {
    "r": "ふぃーどばっく",
    "m": "Ý kiến phản hồi góp ý (Feedback)",
    "t": "Danh từ / Động từ Katakana",
    "pos": "n,vs",
    "p": 4
  },
  "アンケート": {
    "r": "あんけーと",
    "m": "Bảng phiếu khảo sát ý kiến (Enquête)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 0
  },
  "クレーム": {
    "r": "くれーむ",
    "m": "Khiếu nại, phàn nàn của khách hàng (Claim)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 0
  },
  "トラブル": {
    "r": "とらぶる",
    "m": "Sự cố rắc rối, mâu thuẫn trục trặc (Trouble)",
    "t": "Danh từ / Động từ Katakana",
    "pos": "n,vs",
    "p": 1
  },
  "リフレッシュ": {
    "r": "りふれっしゅ",
    "m": "Nạp lại năng lượng thư giãn tinh thần (Refresh)",
    "t": "Danh từ / Động từ Katakana",
    "pos": "n,vs",
    "p": 3
  },
  "メンタル": {
    "r": "めんたる",
    "m": "Tâm lý, tinh thần nội tại (Mental)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 1
  },
  "モチベーション": {
    "r": "もちべーしょん",
    "m": "Động lực thúc đẩy cố gắng (Motivation)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 4
  },
  "コミュニケーション": {
    "r": "こみゅにけーしょん",
    "m": "Giao tiếp, truyền đạt gắn kết (Communication)",
    "t": "Danh từ Katakana",
    "pos": "n",
    "p": 4
  },
  "頭が痛い": {
    "r": "あたまがいたい",
    "m": "Đau đầu (nghĩa đen hoặc nghĩa bóng vì nan giải, lo lắng)",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "頭が下がる": {
    "r": "あたまがさがる",
    "m": "Khâm phục, cúi đầu kính nể sự hy sinh/tài năng",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "首を長くする": {
    "r": "くびをながくする",
    "m": "Dài cổ ngóng trông, chờ đợi mong mỏi mỏi mòn",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "首をかしげる": {
    "r": "くびをかしげる",
    "m": "Nghiêng đầu thắc mắc, băn khoăn nghi hoặc",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "首になる": {
    "r": "くびになる",
    "m": "Bị sa thải, bị đuổi việc",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "耳を疑う": {
    "r": "みみをうたがう",
    "m": "Không tin vào tai mình, ngỡ ngàng khi nghe thấy",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "口が滑る": {
    "r": "くちがすべる",
    "m": "Lỡ lời, buột miệng nói ra điều không nên",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "目を丸くする": {
    "r": "めをまるくする",
    "m": "Tròn xoe mắt vì quá đỗi kinh ngạc",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "目をつぶる": {
    "r": "めをつぶる",
    "m": "Nhắm mắt làm ngơ, bỏ qua lỗi lầm",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "目に浮かぶ": {
    "r": "めにうかぶ",
    "m": "Hiện rõ mồn một trước mắt, mường tượng ra",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "目が回る": {
    "r": "めがまわる",
    "m": "Chóng mặt, bận túi bụi tối tăm mặt mũi",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "手を引く": {
    "r": "てをひく",
    "m": "Rút tay khỏi, từ bỏ không can dự nữa",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "手につかない": {
    "r": "てにつかない",
    "m": "Không thể tập trung làm việc vì tâm trí rối bời",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "足が出る": {
    "r": "あしがでる",
    "m": "Bội chi, vượt quá ngân sách dự trù",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "足を洗う": {
    "r": "あしをあらう",
    "m": "Rửa tay gác kiếm, hoàn lương từ bỏ việc xấu",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "腹を割る": {
    "r": "はらをわる",
    "m": "Mở lòng thành thật, thẳng thắn dốc bầu tâm sự",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "胸を張る": {
    "r": "むねをはる",
    "m": "Ưỡn ngực tự hào, tự tin ngẩng cao đầu",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "胸が痛む": {
    "r": "むねがいたむ",
    "m": "Đau lòng xót xa, thương cảm sâu sắc",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "胸を打つ": {
    "r": "むねをうつ",
    "m": "Chạm tới trái tim, gây xúc động nghẹn ngào",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "気が気でない": {
    "r": "きがきでない",
    "m": "Bồn chồn đứng ngồi không yên, lo lắng tột cùng",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "気を配る": {
    "r": "きをくばる",
    "m": "Chu đáo, quan tâm để ý tới mọi người xung quanh",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "気が利く": {
    "r": "きがきく",
    "m": "Nhanh nhạy, tinh tế, biết việc chu toàn",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "気を取り直す": {
    "r": "きをとりなおす",
    "m": "Lấy lại tinh thần, xốc lại tâm trạng",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "息が詰まる": {
    "r": "いきがつまる",
    "m": "Ngột ngạt nghẹt thở (do không khí căng thẳng)",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "身につける": {
    "r": "みにつける",
    "m": "Tiếp thu trau dồi (kỹ năng, tri thức), mặc lên người",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "背中を押す": {
    "r": "せなかをおす",
    "m": "Tiếp thêm động lực, cổ vũ động viên ai đó hành động",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "骨を折る": {
    "r": "ほねをおる",
    "m": "Gãy xương / Nhọc công gắng sức hết mình giúp người khác",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "猫の手も借りたい": {
    "r": "ねこのてもかりたい",
    "m": "Bận ngập đầu ngập cổ đến mức muốn mượn cả chân mèo",
    "t": "Cụm quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "犬猿の仲": {
    "r": "けんえんのなか",
    "m": "Mối quan hệ như chó với mèo, không đội trời chung",
    "t": "Thành ngữ",
    "pos": "exp",
    "p": 0
  },
  "千載一遇": {
    "r": "せんざいいちぐう",
    "m": "Ngàn năm có một, cơ hội hiếm hoi khó gặp",
    "t": "Thành ngữ 4 chữ",
    "pos": "exp,yoji",
    "p": 0
  },
  "八方美人": {
    "r": "はっぽうびじん",
    "m": "Người khéo mồm lấy lòng mọi người, ai cũng chiều",
    "t": "Thành ngữ 4 chữ",
    "pos": "exp,yoji",
    "p": 0
  },
  "弱肉強食": {
    "r": "じゃくにくきょうしょく",
    "m": "Cá lớn nuốt cá bé, mạnh được yếu thua",
    "t": "Thành ngữ 4 chữ",
    "pos": "exp,yoji",
    "p": 0
  },
  "百聞は一見に如かず": {
    "r": "ひゃくぶんはいっけんにしかず",
    "m": "Trăm nghe không bằng một thấy",
    "t": "Tục ngữ quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "猿も木から落ちる": {
    "r": "さるもきからおちる",
    "m": "Khỉ cũng có lúc ngã cây (người tài hoa cũng có lúc sơ sẩy)",
    "t": "Tục ngữ quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "蛙の子は蛙": {
    "r": "かえるのこはかえる",
    "m": "Con ếch lại đẻ con ếch (cha nào con nấy)",
    "t": "Tục ngữ quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "石の上にも三年": {
    "r": "いしのうえにもさんねん",
    "m": "Ngồi trên đá ba năm cũng ấm (kiên trì nhẫn nại ắt sẽ thành công)",
    "t": "Tục ngữ quán ngữ",
    "pos": "exp",
    "p": 0
  },
  "三日坊主": {
    "r": "みっかぼうず",
    "m": "Thầy chùa ba ngày (cả thèm chóng chán, thiếu bền chí)",
    "t": "Thành ngữ thông dụng",
    "pos": "exp",
    "p": 0
  },
  "ドキドキ": {
    "r": "どきどき",
    "m": "Hồi hộp thót tim, tim đập thình thịch",
    "t": "Từ tượng thanh N3",
    "pos": "adv,vs",
    "p": 1
  },
  "ワクワク": {
    "r": "わくわく",
    "m": "Háo hức mong chờ, phấn khích",
    "t": "Từ tượng thanh N3",
    "pos": "adv,vs",
    "p": 1
  },
  "ペコペコ": {
    "r": "ぺこぺこ",
    "m": "Bụng đói cồn cào / Cúi gập người khúm núm",
    "t": "Từ tượng thanh N4",
    "pos": "adv,vs",
    "p": 0
  },
  "ピカピカ": {
    "r": "ぴかぴか",
    "m": "Lấp lánh, sáng loáng bóng bẩy",
    "t": "Từ tượng hình N4",
    "pos": "adv,adj-na",
    "p": 0
  },
  "イライラ": {
    "r": "いらいら",
    "m": "Sốt ruột, bực bội khó chịu trong người",
    "t": "Từ tượng hình N3",
    "pos": "adv,vs",
    "p": 1
  },
  "ウロウロ": {
    "r": "うろうろ",
    "m": "Lảng vảng đi đi lại lại quanh quẩn",
    "t": "Từ tượng hình N3",
    "pos": "adv,vs",
    "p": 1
  },
  "ギリギリ": {
    "r": "ぎりぎり",
    "m": "Sát nút, suýt soát vừa kịp giờ",
    "t": "Từ tượng hình N3",
    "pos": "adv,adj-na",
    "p": 0
  },
  "サラサラ": {
    "r": "さらさら",
    "m": "Mượt mà (mái tóc, dòng nước chảy róc rách)",
    "t": "Từ tượng hình N3",
    "pos": "adv,vs",
    "p": 1
  },
  "ツルツル": {
    "r": "つるつる",
    "m": "Nhẵn bóng, trơn tuột (da dẻ mượt mà, mì ramen)",
    "t": "Từ tượng hình N3",
    "pos": "adv,adj-na",
    "p": 1
  },
  "ネバネバ": {
    "r": "ねばねば",
    "m": "Nhơm nhớp, dính dính (đậu natto, đậu bắp)",
    "t": "Từ tượng hình N3",
    "pos": "adv,vs",
    "p": 1
  },
  "バラバラ": {
    "r": "ばらばら",
    "m": "Rời rạc, tan tác từng mảnh, lộp độp mưa rơi",
    "t": "Từ tượng hình N3",
    "pos": "adv,adj-na",
    "p": 0
  },
  "ボロボロ": {
    "r": "ぼろぼろ",
    "m": "Rách nát, tơi tả, kiệt quệ thân tàn ma dại",
    "t": "Từ tượng hình N3",
    "pos": "adv,adj-na",
    "p": 0
  },
  "モグモグ": {
    "r": "もぐもぐ",
    "m": "Nhai nhồm nhoàm, ậm ừ trong miệng",
    "t": "Từ tượng thanh N3",
    "pos": "adv,vs",
    "p": 1
  },
  "フラフラ": {
    "r": "ふらふら",
    "m": "Lảo đảo choáng váng, đứng không vững",
    "t": "Từ tượng hình N3",
    "pos": "adv,vs",
    "p": 1
  },
  "ヘトヘト": {
    "r": "へとへと",
    "m": "Mệt rã rời, mệt lả không ra hơi",
    "t": "Từ tượng hình N3",
    "pos": "adv,adj-na",
    "p": 0
  },
  "ニコニコ": {
    "r": "にこにこ",
    "m": "Mỉm cười tươi tắn hiền hậu",
    "t": "Từ tượng hình N4",
    "pos": "adv,vs",
    "p": 1
  },
  "ニヤニヤ": {
    "r": "にやにや",
    "m": "Cười toe toét mỉa mai, cười tủm tỉm ranh mãnh",
    "t": "Từ tượng hình N3",
    "pos": "adv,vs",
    "p": 1
  },
  "ゲラゲラ": {
    "r": "げらげら",
    "m": "Cười sằng sặc, cười ha hả sảng khoái",
    "t": "Từ tượng thanh N3",
    "pos": "adv",
    "p": 1
  },
  "シトシト": {
    "r": "しとしと",
    "m": "Mưa rơi tí tách, mưa phùn êm đềm",
    "t": "Từ tượng thanh N3",
    "pos": "adv",
    "p": 1
  },
  "ザーザー": {
    "r": "ざーざー",
    "m": "Mưa rơi xối xả ào ào",
    "t": "Từ tượng thanh N4",
    "pos": "adv",
    "p": 1
  },
  "ゴロゴロ": {
    "r": "ごろごろ",
    "m": "Sấm nổ ầm ầm / Nằm lười ườn ẹo ở nhà",
    "t": "Từ tượng thanh N4",
    "pos": "adv,vs",
    "p": 1
  },
  "バタバタ": {
    "r": "ばたばた",
    "m": "Bận rộn túi bụi / Tiếng đập chân huỳnh huỵch",
    "t": "Từ tượng hình N3",
    "pos": "adv,vs",
    "p": 1
  },
  "ソワソワ": {
    "r": "そわそわ",
    "m": "Bồn chồn nhấp nhổm, đứng ngồi không yên",
    "t": "Từ tượng hình N3",
    "pos": "adv,vs",
    "p": 1
  },
  "サクサク": {
    "r": "さくさく",
    "m": "Giòn tan (bánh kẹo) / Trơn tru mau lẹ (công việc)",
    "t": "Từ tượng hình N3",
    "pos": "adv,vs",
    "p": 1
  },
  "バリバリ": {
    "r": "ばりばり",
    "m": "Làm việc hăng say nhiệt huyết / Giòn rụm",
    "t": "Từ tượng hình N3",
    "pos": "adv",
    "p": 1
  },
  "ぼんやり": {
    "r": "ぼんやり",
    "m": "Mờ ảo lơ đãng, thẫn thờ mất tập trung",
    "t": "Phó từ tượng hình N3",
    "pos": "adv,vs",
    "p": 3
  },
  "そろそろ": {
    "r": "そろそろ",
    "m": "Sắp sửa, chuẩn bị đến lúc phải đi",
    "t": "Phó từ N5",
    "pos": "adv",
    "p": 1
  },
  "承知": {
    "r": "しょうち",
    "m": "Hiểu rõ, nhận lệnh thấu suốt (承知いたしました)",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "了解": {
    "r": "りょうかい",
    "m": "Đã rõ, đồng ý tiếp nhận thông tin",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "拝見": {
    "r": "はいけん",
    "m": "Kính cẩn xem, nhìn (khiêm nhường ngữ của 見る)",
    "t": "Danh từ / Động từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "拝読": {
    "r": "はいどく",
    "m": "Kính cẩn đọc thư/văn bản (khiêm nhường ngữ của 読む)",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "拝聴": {
    "r": "はいちょう",
    "m": "Kính cẩn lắng nghe (khiêm nhường ngữ của 聞く)",
    "t": "Danh từ / Động từ N2",
    "pos": "n,vs",
    "p": 0
  },
  "お目にかかる": {
    "r": "おめにかかる",
    "m": "Gặp mặt quý vị (khiêm nhường ngữ của 会う)",
    "t": "Cụm quán ngữ N4",
    "pos": "exp",
    "p": 0
  },
  "存じる": {
    "r": "ぞんじる",
    "m": "Biết, nghĩ (khiêm nhường ngữ của 知る, 思う)",
    "t": "Động từ Nhóm 2 N3",
    "pos": "v2",
    "p": 0
  },
  "存じ上げる": {
    "r": "ぞんじあげる",
    "m": "Biết quý vị, biết rõ sự tình (khiêm nhường ngữ)",
    "t": "Động từ Nhóm 2 N2",
    "pos": "v2",
    "p": 0
  },
  "申し伝える": {
    "r": "もうしつたえる",
    "m": "Truyền đạt lại lời nhắn (khiêm nhường ngữ)",
    "t": "Động từ Nhóm 2 N3",
    "pos": "v2",
    "p": 5
  },
  "伺う": {
    "r": "うかがう",
    "m": "Đến thăm / Hỏi thăm / Nghe ngóng (khiêm nhường)",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 0
  },
  "ご無沙汰": {
    "r": "ごぶさた",
    "m": "Đã lâu không liên lạc hỏi thăm (ご無沙汰しております)",
    "t": "Kính ngữ thông dụng",
    "pos": "exp",
    "p": 0
  },
  "ご配慮": {
    "r": "ごはいりょ",
    "m": "Sự quan tâm chu đáo của quý khách/đối tác",
    "t": "Kính ngữ N2",
    "pos": "n",
    "p": 0
  },
  "ご指導": {
    "r": "ごしどう",
    "m": "Sự chỉ bảo, dẫn dắt tận tình",
    "t": "Kính ngữ N3",
    "pos": "n",
    "p": 0
  },
  "ご検討": {
    "r": "ごけんとう",
    "m": "Sự xem xét, cân nhắc phương án",
    "t": "Kính ngữ N3",
    "pos": "n",
    "p": 0
  },
  "ご容赦": {
    "r": "ごようしゃ",
    "m": "Xin lượng thứ, thứ lỗi bỏ qua cho sơ suất",
    "t": "Kính ngữ N2",
    "pos": "n",
    "p": 0
  },
  "ご愛顧": {
    "r": "ごあいこ",
    "m": "Sự ủng hộ, tín nhiệm yêu mến của quý khách",
    "t": "Kính ngữ N2",
    "pos": "n",
    "p": 0
  },
  "各位": {
    "r": "かくい",
    "m": "Kính gửi toàn thể quý vị / các bên liên quan",
    "t": "Kính ngữ kinh doanh",
    "pos": "n",
    "p": 1
  },
  "御中": {
    "r": "おんちゅう",
    "m": "Kính gửi quý công ty / tổ chức (ghi trên phong bì thư)",
    "t": "Kính ngữ kinh doanh",
    "pos": "n",
    "p": 0
  },
  "朝ご飯": {
    "r": "あさごはん",
    "m": "Bữa sáng, điểm tâm",
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
    "m": "Bữa tối, cơm tối",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "おにぎり": {
    "r": "おにぎり",
    "m": "Cơm nắm Nhật Bản",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "刺身": {
    "r": "さしみ",
    "m": "Món cá sống sashimi",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "寿司": {
    "r": "すし",
    "m": "Món sushi",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "天ぷら": {
    "r": "てんぷら",
    "m": "Món chiên tempura",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "うどん": {
    "r": "うどん",
    "m": "Mì sợi dày udon",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "そば": {
    "r": "そば",
    "m": "Mì kiều mạch soba / Bên cạnh",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "ラーメン": {
    "r": "らーめん",
    "m": "Mì ramen",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "林檎": {
    "r": "りんご",
    "m": "Quả táo tây",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "蜜柑": {
    "r": "みかん",
    "m": "Quả quýt",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "西瓜": {
    "r": "すいか",
    "m": "Dưa hấu",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "バナナ": {
    "r": "ばなな",
    "m": "Quả chuối",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "苺": {
    "r": "いちご",
    "m": "Quả dâu tây",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "牛乳": {
    "r": "ぎゅうにゅう",
    "m": "Sữa bò tươi",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "珈琲": {
    "r": "コーヒー",
    "m": "Cà phê",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "味噌": {
    "r": "みそ",
    "m": "Tương miso",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "調味料": {
    "r": "ちょうみりょう",
    "m": "Gia vị nêm nếm",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 3
  },
  "材料": {
    "r": "ざいりょう",
    "m": "Nguyên liệu nấu ăn / Vật liệu chế tạo",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 3
  },
  "献立": {
    "r": "こんだて",
    "m": "Thực đơn món ăn",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 0
  },
  "味付け": {
    "r": "あじつけ",
    "m": "Nêm nếm gia vị",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 0
  },
  "煮る": {
    "r": "にる",
    "m": "Nấu, kho, hầm kỹ",
    "t": "Động từ Nhóm 2 N4",
    "pos": "v2",
    "p": 0
  },
  "焼く": {
    "r": "やく",
    "m": "Nướng, rán, thiêu đốt",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "揚げる": {
    "r": "あげる",
    "m": "Chiên ngập dầu, rán giòn",
    "t": "Động từ Nhóm 2 N3",
    "pos": "v2",
    "p": 0
  },
  "炒める": {
    "r": "いためる",
    "m": "Xào lăn, phi thơm",
    "t": "Động từ Nhóm 2 N3",
    "pos": "v2",
    "p": 3
  },
  "蒸す": {
    "r": "むす",
    "m": "Hấp cách thủy, đồ chín",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 2
  },
  "茹でる": {
    "r": "ゆでる",
    "m": "Luộc chín trong nước sôi",
    "t": "Động từ Nhóm 2 N3",
    "pos": "v2",
    "p": 2
  },
  "切る": {
    "r": "きる",
    "m": "Cắt, thái lát",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 1
  },
  "刻む": {
    "r": "きざむ",
    "m": "Thái nhỏ, băm nhuyễn",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 0
  },
  "混ぜる": {
    "r": "まぜる",
    "m": "Khuấy trộn, đảo đều",
    "t": "Động từ Nhóm 2 N3",
    "pos": "v2",
    "p": 2
  },
  "注ぐ": {
    "r": "そそぐ",
    "m": "Rót nước, đổ vào cốc",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 0
  },
  "居間": {
    "r": "いま",
    "m": "Phòng khách sinh hoạt gia đình",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "寝室": {
    "r": "しんしつ",
    "m": "Phòng ngủ",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "お手洗い": {
    "r": "おてあらい",
    "m": "Nhà vệ sinh (cách nói lịch sự)",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 3
  },
  "廊下": {
    "r": "ろうか",
    "m": "Hành lang lối đi",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "階段": {
    "r": "かいだん",
    "m": "Cầu thang",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "庭": {
    "r": "にわ",
    "m": "Khu vườn, sân vườn",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "ベランダ": {
    "r": "べらんだ",
    "m": "Ban công, hiên nhà ngoài trời",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "屋根": {
    "r": "やね",
    "m": "Mái nhà",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "天井": {
    "r": "てんじょう",
    "m": "Trần nhà",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "床": {
    "r": "ゆか",
    "m": "Sàn nhà",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "畳": {
    "r": "たたみ",
    "m": "Chiếu cói tatami truyền thống",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "家具": {
    "r": "かぐ",
    "m": "Đồ gỗ gia dụng, nội thất",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "棚": {
    "r": "たな",
    "m": "Kệ, giá để đồ",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "本棚": {
    "r": "ほんだな",
    "m": "Kệ sách, giá sách",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "カーテン": {
    "r": "かーてん",
    "m": "Rèm cửa",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 1
  },
  "電気": {
    "r": "でんき",
    "m": "Điện, đèn điện chiếu sáng",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 1
  },
  "水道": {
    "r": "すいどう",
    "m": "Nước máy sinh hoạt",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "ごみ箱": {
    "r": "ごみばこ",
    "m": "Thùng rác",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "医院": {
    "r": "いいん",
    "m": "Phòng khám tư, viện nhỏ",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "歯科": {
    "r": "しか",
    "m": "Nha khoa, phòng khám răng",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "内科": {
    "r": "ないか",
    "m": "Khoa nội y tế",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "外科": {
    "r": "げか",
    "m": "Khoa ngoại phẫu thuật",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "薬局": {
    "r": "やっきょく",
    "m": "Hiệu thuốc tây",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "頭痛": {
    "r": "ずつう",
    "m": "Chứng đau đầu",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "腹痛": {
    "r": "ふくつう",
    "m": "Chứng đau bụng",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "火傷": {
    "r": "やけど",
    "m": "Vết bỏng nước sôi/lửa",
    "t": "Danh từ / Động từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "骨折": {
    "r": "こっせつ",
    "m": "Gãy xương cơ thể",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "注射": {
    "r": "ちゅうしゃ",
    "m": "Mũi tiêm thuốc",
    "t": "Danh từ / Động từ N4",
    "pos": "n,vs",
    "p": 0
  },
  "手術": {
    "r": "しゅじゅつ",
    "m": "Ca mổ phẫu thuật",
    "t": "Danh từ / Động từ N4",
    "pos": "n,vs",
    "p": 1
  },
  "処方箋": {
    "r": "しょほうせん",
    "m": "Đơn thuốc bác sĩ kê",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 0
  },
  "診察": {
    "r": "しんさつ",
    "m": "Khám bệnh lâm sàng",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "治療": {
    "r": "ちりょう",
    "m": "Điều trị bệnh tật",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "衛生": {
    "r": "えいせい",
    "m": "Vệ sinh sạch sẽ",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "健康保険": {
    "r": "けんこうほけん",
    "m": "Bảo hiểm y tế sức khỏe",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 5
  },
  "症状": {
    "r": "しょうじょう",
    "m": "Triệu chứng bệnh lý",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "花粉症": {
    "r": "かふんしょう",
    "m": "Dị ứng phấn hoa",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 2
  },
  "虹": {
    "r": "にじ",
    "m": "Cầu vồng bảy sắc",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "洪水": {
    "r": "こうずい",
    "m": "Lũ lụt, ngập úng",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "湖": {
    "r": "みずうみ",
    "m": "Hồ nước thiên nhiên",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 3
  },
  "池": {
    "r": "いけ",
    "m": "Ao nước",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 2
  },
  "島": {
    "r": "しま",
    "m": "Hòn đảo",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "海岸": {
    "r": "かいがん",
    "m": "Bờ biển, bãi biển",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "砂浜": {
    "r": "すなはま",
    "m": "Bãi cát ven biển",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "温泉": {
    "r": "おんせん",
    "m": "Suối nước nóng khoáng",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "季節": {
    "r": "きせつ",
    "m": "Mùa trong năm",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 2
  },
  "梅雨": {
    "r": "つゆ",
    "m": "Mùa mưa dầm đầu hè tại Nhật",
    "t": "Danh từ N4",
    "pos": "n",
    "p": 0
  },
  "首相": {
    "r": "しゅしょう",
    "m": "Thủ tướng chính phủ",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "大統領": {
    "r": "だいとうりょう",
    "m": "Tổng thống nước cộng hòa",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 3
  },
  "警察": {
    "r": "けいさつ",
    "m": "Cảnh sát, công an",
    "t": "Danh từ N5",
    "pos": "n",
    "p": 0
  },
  "裁判": {
    "r": "さいばん",
    "m": "Xét xử tòa án, phiên tòa",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "事件": {
    "r": "じけん",
    "m": "Vụ án hình sự, sự vụ",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "犯罪": {
    "r": "はんざい",
    "m": "Tội phạm, hành vi vi phạm",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 0
  },
  "被害": {
    "r": "ひがい",
    "m": "Thiệt hại gánh chịu",
    "t": "Danh từ N3",
    "pos": "n",
    "p": 1
  },
  "投票": {
    "r": "とうひょう",
    "m": "Bỏ phiếu bầu cử",
    "t": "Danh từ / Động từ N3",
    "pos": "n,vs",
    "p": 0
  },
  "少子化": {
    "r": "しょうしか",
    "m": "Hiện tượng già hóa dân số, tỷ lệ sinh giảm",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 0
  },
  "高齢化": {
    "r": "こうれいか",
    "m": "Tình trạng dân số già hóa",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 0
  },
  "格差社会": {
    "r": "かくさしゃかい",
    "m": "Xã hội phân hóa giàu nghèo sâu sắc",
    "t": "Danh từ N1",
    "pos": "n",
    "p": 4
  },
  "地球温暖化": {
    "r": "ちきゅうおんだんか",
    "m": "Hiện tượng Trái Đất nóng lên toàn cầu",
    "t": "Danh từ N2",
    "pos": "n",
    "p": 0
  },
  "連れて行く": {
    "r": "つれていく",
    "m": "Dẫn đi cùng, dắt ai đó cùng đi",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 0
  },
  "連れていく": {
    "r": "つれていく",
    "m": "Dẫn đi cùng, dắt ai đó cùng đi (cách viết Kana)",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 0
  },
  "連れて来る": {
    "r": "つれてくる",
    "m": "Dẫn tới, dắt theo đến đây",
    "t": "Động từ Nhóm 3 N4",
    "pos": "vk",
    "p": 0
  },
  "連れてくる": {
    "r": "つれてくる",
    "m": "Dẫn tới, dắt theo đến đây (cách viết Kana)",
    "t": "Động từ Nhóm 3 N4",
    "pos": "vk",
    "p": 0
  },
  "持っていく": {
    "r": "もっていく",
    "m": "Mang theo đi, cầm đi",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "持って行く": {
    "r": "もっていく",
    "m": "Mang theo đi, cầm đi (viết Kanji)",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 0
  },
  "持ってくる": {
    "r": "もってくる",
    "m": "Mang đến, đem lại đây",
    "t": "Động từ Nhóm 3 N5",
    "pos": "vk",
    "p": 0
  },
  "持って来る": {
    "r": "もってくる",
    "m": "Mang đến, đem lại đây (viết Kanji)",
    "t": "Động từ Nhóm 3 N5",
    "pos": "vk",
    "p": 0
  },
  "買ってくる": {
    "r": "かってくる",
    "m": "Đi mua rồi mang về/lại đây",
    "t": "Động từ Nhóm 3 N4",
    "pos": "vk",
    "p": 0
  },
  "帰ってくる": {
    "r": "かえってくる",
    "m": "Trở về lại, quay trở về chốn cũ",
    "t": "Động từ Nhóm 3 N4",
    "pos": "vk",
    "p": 0
  },
  "やってくる": {
    "r": "やってくる",
    "m": "Kéo tới, ập tới, đi tới đây",
    "t": "Động từ Nhóm 3 N3",
    "pos": "vk",
    "p": 0
  },
  "ついていく": {
    "r": "ついていく",
    "m": "Đi theo sau, bắt kịp tiến độ",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 0
  },
  "ついてくる": {
    "r": "ついてくる",
    "m": "Đi theo sau đến đây",
    "t": "Động từ Nhóm 3 N3",
    "pos": "vk",
    "p": 0
  },
  "生きていく": {
    "r": "いきていく",
    "m": "Tiếp tục sống, sinh tồn về sau",
    "t": "Động từ Nhóm 1 N3",
    "pos": "v1",
    "p": 0
  },
  "歩いていく": {
    "r": "あるいていく",
    "m": "Đi bộ tới nơi",
    "t": "Động từ Nhóm 1 N4",
    "pos": "v1",
    "p": 0
  },
  "間に合う": {
    "r": "まにあう",
    "m": "Kịp giờ, vừa vặn thời gian",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 3
  },
  "間に合わない": {
    "r": "まにあわない",
    "m": "Không kịp giờ, trễ hẹn",
    "t": "Động từ Nhóm 1 N5",
    "pos": "v1",
    "p": 4
  },
  "気が散る": {
    "r": "きがちる",
    "m": "Xao nhãng, mất tập trung",
    "t": "Cụm quán ngữ N3",
    "pos": "exp",
    "p": 0
  },
  "気を失う": {
    "r": "きをうしなう",
    "m": "Bất tỉnh nhân sự, ngất xỉu",
    "t": "Cụm quán ngữ N2",
    "pos": "exp",
    "p": 0
  }
};

// Xuất ra môi trường
if (typeof window !== 'undefined') {
  window.JP_DICTIONARY_EXPANDED = JP_DICTIONARY_EXPANDED;
}
if (typeof globalThis !== 'undefined') {
  globalThis.JP_DICTIONARY_EXPANDED = JP_DICTIONARY_EXPANDED;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { JP_DICTIONARY_EXPANDED };
}
