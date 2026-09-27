// Bảng tra cứu Âm Hán-Việt & Âm On/Kun toàn diện cho Kanji (Joyo & thông dụng)
// Hỗ trợ bóc tách từng chữ Hán trong từ ghép (Kanji Decomposition)

const KANJI_DATA = {
  // 1. Số lượng, Kích thước & Tính chất cơ bản
  '大': { hv: 'ĐẠI', on: 'ダイ, タイ', kun: 'おお, おお・きい, おお・いに', m: 'To lớn, vĩ đại, quan trọng' },
  '小': { hv: 'TIỂU', on: 'ショウ', kun: 'ちい・さい, こ, お', m: 'Nhỏ bé, ít ỏi' },
  '中': { hv: 'TRUNG', on: 'チュウ', kun: 'なか', m: 'Trong, giữa, trung tâm' },
  '長': { hv: 'TRƯỜNG', on: 'チョウ', kun: 'なが・い, おさ', m: 'Dài, trưởng, đứng đầu' },
  '短': { hv: 'ĐOẢN', on: 'タン', kun: 'みじか・い', m: 'Ngắn, đoản' },
  '高': { hv: 'CAO', on: 'コウ', kun: 'たか・い, たか・まる', m: 'Cao, đắt tiền' },
  '低': { hv: 'ĐÊ', on: 'テイ', kun: 'ひく・い, ひく・める', m: 'Thấp, kém' },
  '多': { hv: 'ĐA', on: 'タ', kun: 'おお・い', m: 'Nhiều, đa dạng' },
  '少': { hv: 'THIỂU', on: 'ショウ', kun: 'すく・ない, すこ・し', m: 'Ít, một chút' },
  '新': { hv: 'TÂN', on: 'シン', kun: 'あたら・しい, あら・た', m: 'Mới, mới mẻ' },
  '古': { hv: 'CỔ', on: 'コ', kun: 'ふる・い', m: 'Cũ, cổ kính' },
  '安': { hv: 'AN', on: 'アン', kun: 'やす・い', m: 'Rẻ, an toàn, yên ổn' },
  '重': { hv: 'TRỌNG', on: 'ジュウ, チョウ', kun: 'おも・い, かさ・なる', m: 'Nặng, quan trọng, chồng chất' },
  '軽': { hv: 'KHINH', on: 'ケイ', kun: 'かる・い', m: 'Nhẹ, nhẹ nhàng' },
  '早': { hv: 'TẢO', on: 'ソウ, サッ', kun: 'はや・い', m: 'Sớm, nhanh' },
  '速': { hv: 'TỐC', on: 'ソク', kun: 'はや・い', m: 'Nhanh chóng, tốc độ' },
  '遅': { hv: 'TRÌ', on: 'チ', kun: 'おそ・い,おく・れる', m: 'Chậm, muộn' },
  '広': { hv: 'QUẢNG', on: 'コウ', kun: 'ひろ・い', m: 'Rộng, rộng rãi' },
  '狭': { hv: 'HIỆP', on: 'キョウ', kun: 'せま・い', m: 'Hẹp' },
  '明': { hv: 'MINH', on: 'メイ, ミョウ', kun: 'あか・るい, あ・ける', m: 'Sáng sủa, rõ ràng' },
  '暗': { hv: 'ÁM', on: 'アン', kun: 'くら・い', m: 'Tối, u ám' },
  '良': { hv: 'LƯƠNG', on: 'リョウ', kun: 'よ・い, い・い', m: 'Tốt, đẹp, lương thiện' },
  '悪': { hv: 'ÁC', on: 'アク, オ', kun: 'わる・い', m: 'Xấu, ác, tồi tệ' },
  '美': { hv: 'MỸ', on: 'ビ, ミ', kun: 'うつく・しい', m: 'Đẹp, mỹ lệ' },
  '正': { hv: 'CHÍNH', on: 'セイ, ショウ', kun: 'ただ・しい, まさ', m: 'Đúng đắn, chính xác' },
  '難': { hv: 'NAN', on: 'ナン', kun: 'むずか・しい', m: 'Khó khăn, gian nan' },
  '易': { hv: 'DỊ', on: 'エキ, イ', kun: 'やさ・しい', m: 'Dễ dàng, đơn giản' },
  '強': { hv: 'CƯỜNG', on: 'キョウ, ゴウ', kun: 'つよ・い', m: 'Mạnh mẽ, kiên cường' },
  '弱': { hv: 'NHƯỢC', on: 'ジャク', kun: 'よわ・い', m: 'Yếu ớt' },
  '静': { hv: 'TĨNH', on: 'セイ, ジョウ', kun: 'しず・か', m: 'Yên tĩnh, thanh tịnh' },
  '忙': { hv: 'MANG', on: 'ボウ', kun: 'いそが・しい', m: 'Bận rộn' },

  // 2. Số đếm
  '一': { hv: 'NHẤT', on: 'イチ, イツ', kun: 'ひと, ひと・つ', m: 'Một, đầu tiên' },
  '二': { hv: 'NHỊ', on: 'ニ, ジ', kun: 'ふた, ふた・つ', m: 'Hai' },
  '三': { hv: 'TAM', on: 'サン', kun: 'み, み・つ', m: 'Ba' },
  '四': { hv: 'TỨ', on: 'シ', kun: 'よ, よ・つ, よん', m: 'Bốn' },
  '五': { hv: 'NGŨ', on: 'ゴ', kun: 'いつ, いつ・つ', m: 'Năm' },
  '六': { hv: 'LỤC', on: 'ロク', kun: 'む, む・つ', m: 'Sáu' },
  '七': { hv: 'THẤT', on: 'シチ', kun: 'なな, なな・つ', m: 'Bảy' },
  '八': { hv: 'BÁT', on: 'ハチ', kun: 'や, や・つ', m: 'Tám' },
  '九': { hv: 'CỬU', on: 'キュウ, ク', kun: 'ここの, ここの・つ', m: 'Chín' },
  '十': { hv: 'THẬP', on: 'ジュウ, ジッ', kun: 'とお, と', m: 'Mười' },
  '百': { hv: 'BÁCH', on: 'ヒャク', kun: 'もも', m: 'Trăm' },
  '千': { hv: 'THIÊN', on: 'セン', kun: 'ち', m: 'Nghìn' },
  '万': { hv: 'VẠN', on: 'マン, バン', kun: '', m: 'Mười nghìn, vô số' },
  '億': { hv: 'ỨC', on: 'オク', kun: '', m: 'Trăm triệu' },
  '円': { hv: 'VIÊN', on: 'エン', kun: 'まる・い', m: 'Tròn, đồng Yên' },

  // 3. Thời gian & Thiên nhiên
  '年': { hv: 'NIÊN', on: 'ネン', kun: 'とし', m: 'Năm, tuổi' },
  '月': { hv: 'NGUYỆT', on: 'ゲツ, ガツ', kun: 'つき', m: 'Mặt trăng, tháng' },
  '日': { hv: 'NHẬT', on: 'ニチ, ジツ', kun: 'ひ, か', m: 'Mặt trời, ngày, nước Nhật' },
  '時': { hv: 'THỜI', on: 'ジ', kun: 'とき', m: 'Thời gian, giờ' },
  '分': { hv: 'PHÂN', on: 'フン, ブン, ブ', kun: 'わ・ける, わ・かる', m: 'Phút, phân chia, hiểu' },
  '秒': { hv: 'GIÂY', on: 'ビョウ', kun: '', m: 'Giây' },
  '週': { hv: 'CHU', on: 'シュウ', kun: '', m: 'Tuần lễ' },
  '曜': { hv: 'DIỆU', on: 'ヨウ', kun: '', m: 'Thứ trong tuần' },
  '今': { hv: 'KIM', on: 'コン, キン', kun: 'いま', m: 'Bây giờ, hiện tại' },
  '昨': { hv: 'TÁC', on: 'サク', kun: '', m: 'Hôm qua, trước đây' },
  '先': { hv: 'TIÊN', on: 'セン', kun: 'さき, ま・ず', m: 'Trước, đi trước' },
  '来': { hv: 'LAI', on: 'ライ', kun: 'く・る, きた・る', m: 'Đến, tương lai' },
  '毎': { hv: 'MỖI', on: 'マイ', kun: 'ごと', m: 'Mỗi, từng' },
  '前': { hv: 'TIỀN', on: 'ゼン', kun: 'まえ', m: 'Trước, phía trước' },
  '後': { hv: 'HẬU', on: 'ゴ, コウ', kun: 'のち, うし・ろ, あと', m: 'Sau, phía sau' },
  '午': { hv: 'NGỌ', on: 'ゴ', kun: '', m: 'Buổi trưa, giờ Ngọ' },
  '朝': { hv: 'TRIÊU', on: 'チョウ', kun: 'あさ', m: 'Buổi sáng' },
  '昼': { hv: 'TRÚ', on: 'チュウ', kun: 'ひる', m: 'Ban ngày, buổi trưa' },
  '夜': { hv: 'DẠ', on: 'ヤ', kun: 'よ, よる', m: 'Ban đêm, tối' },
  '晩': { hv: 'VÃN', on: 'バン', kun: '', m: 'Buổi tối' },
  '夕': { hv: 'TỊCH', on: 'セキ', kun: 'ゆう', m: 'Chiều tối, hoàng hôn' },
  '春': { hv: 'XUÂN', on: 'シュン', kun: 'はる', m: 'Mùa xuân' },
  '夏': { hv: 'HẠ', on: 'カ, ゲ', kun: 'なつ', m: 'Mùa hè' },
  '秋': { hv: 'THU', on: 'シュウ', kun: 'あき', m: 'Mùa thu' },
  '冬': { hv: 'ĐÔNG', on: 'トウ', kun: 'ふゆ', m: 'Mùa đông' },
  '天': { hv: 'THIÊN', on: 'テン', kun: 'あめ, あま', m: 'Trời, thiên đàng, thời tiết' },
  '気': { hv: 'KHÍ', on: 'キ, ケ', kun: '', m: 'Khí hậu, tinh thần, tâm trạng' },
  '雨': { hv: 'VŨ', on: 'ウ', kun: 'あめ, あま', m: 'Mưa' },
  '雪': { hv: 'TUYẾT', on: 'セツ', kun: 'ゆき', m: 'Tuyết' },
  '風': { hv: 'PHONG', on: 'フウ, フ', kun: 'かぜ', m: 'Gió, phong cách' },
  '空': { hv: 'KHÔNG', on: 'クウ', kun: 'そら, あ・く, から', m: 'Bầu trời, trống rỗng' },
  '山': { hv: 'SƠN', on: 'サン, セン', kun: 'やま', m: 'Núi' },
  '川': { hv: 'XUYÊN', on: 'セン', kun: 'かわ', m: 'Sông' },
  '海': { hv: 'HẢI', on: 'カイ', kun: 'うみ', m: 'Biển' },
  '花': { hv: 'HOA', on: 'カ, ケ', kun: 'はな', m: 'Bông hoa' },
  '木': { hv: 'MỘC', on: 'ボク, モク', kun: 'き, こ', m: 'Cây cối, gỗ' },

  // 4. Con người & Xã hội
  '人': { hv: 'NHÂN', on: 'ジン, ニン', kun: 'ひと', m: 'Người, nhân loại' },
  '男': { hv: 'NAM', on: 'ダン, ナン', kun: 'おとこ', m: 'Đàn ông, con trai' },
  '女': { hv: 'NỮ', on: 'ジョ, ニョ', kun: 'おんな, め', m: 'Phụ nữ, con gái' },
  '子': { hv: 'TỬ', on: 'シ, ス', kun: 'こ', m: 'Con cái, đứa trẻ' },
  '父': { hv: 'PHỤ', on: 'フ', kun: 'ちち, とう', m: 'Bố, cha' },
  '母': { hv: 'MẪU', on: 'ボ', kun: 'はは, かあ', m: 'Mẹ' },
  '友': { hv: 'HỮU', on: 'ユウ', kun: 'とも', m: 'Bạn bè, thân hữu' },
  '私': { hv: 'TƯ', on: 'シ', kun: 'わたくし, わたし', m: 'Tôi, cá nhân' },
  '誰': { hv: 'THÙY', on: 'スイ', kun: 'だれ', m: 'Ai, người nào' },
  '何': { hv: 'HÀ', on: 'カ', kun: 'なに, なん', m: 'Cái gì, hà cớ' },
  '学': { hv: 'HỌC', on: 'ガク', kun: 'まな・ぶ', m: 'Học tập, trường học, khoa học' },
  '校': { hv: 'HIỆU', on: 'コウ', kun: '', m: 'Trường học, hiệu đính' },
  '生': { hv: 'SINH', on: 'セイ, ショウ', kun: 'い・きる, う・まれる, なま', m: 'Sống, sinh ra, học sinh, tươi sống' },
  '先': { hv: 'TIÊN', on: 'セン', kun: 'さき', m: 'Trước, đi trước, giáo viên' },
  '師': { hv: 'SƯ', on: 'シ', kun: '', m: 'Thầy giáo, kỹ sư, bác sĩ' },
  '語': { hv: 'NGỮ', on: 'ゴ', kun: 'かた・る', m: 'Ngôn ngữ, từ ngữ, nói' },
  '言': { hv: 'NGÔN', on: 'ゲン, ゴン', kun: 'い・う, こと', m: 'Nói, lời nói' },
  '本': { hv: 'BẢN', on: 'ホン', kun: 'もと', m: 'Sách, nguồn gốc, Nhật Bản' },
  '文': { hv: 'VĂN', on: 'ブン, モン', kun: 'ふみ', m: 'Văn bản, câu cú, văn hóa' },
  '字': { hv: 'TỰ', on: 'ジ', kun: 'あざ', m: 'Chữ viết, ký tự' },
  '漢': { hv: 'HÁN', on: 'カン', kun: '', m: 'Chữ Hán, nước Hán' },
  '辞': { hv: 'TỪ', on: 'ジ', kun: 'や・める', m: 'Từ điển, từ ngữ, từ chức' },
  '書': { hv: 'THƯ', on: 'ショ', kun: 'か・く', m: 'Viết, sách, thư từ' },
  '読': { hv: 'ĐỘC', on: 'ドク, トク', kun: 'よ・む', m: 'Đọc' },
  '聞': { hv: 'VĂN', on: 'ブン, モン', kun: 'き・く', m: 'Nghe, hỏi' },
  '見': { hv: 'KIẾN', on: 'ケン', kun: 'み・る, み・える', m: 'Nhìn, xem, ý kiến' },
  '話': { hv: 'THOẠI', on: 'ワ', kun: 'はな・す, はなし', m: 'Nói chuyện, câu chuyện' },
  '会': { hv: 'HỘI', on: 'カイ, エ', kun: 'あ・う', m: 'Gặp gỡ, hội họp, công ty' },
  '社': { hv: 'XÃ', on: 'シャ', kun: 'やしろ', m: 'Công ty, xã hội' },
  '員': { hv: 'VIÊN', on: 'イン', kun: '', m: 'Thành viên, nhân viên' },
  '仕': { hv: 'SĨ', on: 'シ, ジ', kun: 'つか・える', m: 'Công việc, phục vụ' },
  '事': { hv: 'SỰ', on: 'ジ, ズ', kun: 'こと', m: 'Sự việc, công việc, sự tình' },

  // 5. Đời sống, Địa điểm, Đồ vật & Hành động
  '家': { hv: 'GIA', on: 'カ, ケ', kun: 'いえ, や, うち', m: 'Nhà, gia đình, chuyên gia' },
  '屋': { hv: 'ỐC', on: 'オク', kun: 'や', m: 'Căn phòng, quán, mái nhà' },
  '室': { hv: 'THẤT', on: 'シツ', kun: 'むろ', m: 'Căn phòng' },
  '店': { hv: 'ĐIẾM', on: 'テン', kun: 'みせ', m: 'Cửa hàng, quán xá' },
  '駅': { hv: 'DỊCH', on: 'エキ', kun: '', m: 'Nhà ga tàu điện' },
  '車': { hv: 'XA', on: 'シャ', kun: 'くるま', m: 'Xe cộ, ô tô' },
  '電': { hv: 'ĐIỆN', on: 'デン', kun: '', m: 'Điện, tàu điện, điện thoại' },
  '道': { hv: 'ĐẠO', on: 'ドウ, トウ', kun: 'みち', m: 'Con đường, đạo đức' },
  '路': { hv: 'LỘ', on: 'ロ', kun: 'じ, みち', m: 'Đường lộ, lối đi' },
  '地': { hv: 'ĐỊA', on: 'チ, ジ', kun: '', m: 'Đất đai, địa điểm' },
  '所': { hv: 'SỞ', on: 'ショ', kun: 'ところ', m: 'Nơi chốn, địa điểm' },
  '場': { hv: 'TRƯỜNG', on: 'ジョウ', kun: 'ば', m: 'Nơi chốn, hội trường' },
  '物': { hv: 'VẬT', on: 'ブツ, モツ', kun: 'もの', m: 'Đồ vật, sự vật' },
  '食': { hv: 'THỰC', on: 'ショク, ジキ', kun: 'た・べる, く・う', m: 'Ăn, thức ăn, ẩm thực' },
  '飲': { hv: 'ẨM', on: 'イン', kun: 'の・む', m: 'Uống' },
  '買': { hv: 'MÃI', on: 'バイ', kun: 'か・う', m: 'Mua' },
  '売': { hv: 'MẠI', on: 'バイ', kun: 'う・る', m: 'Bán' },
  '行': { hv: 'HÀNH', on: 'コウ, ギョウ', kun: 'い・く, おこな・う', m: 'Đi, tiến hành, ngân hàng' },
  '来': { hv: 'LAI', on: 'ライ', kun: 'く・る', m: 'Đến' },
  '帰': { hv: 'QUY', on: 'キ', kun: 'かえ・る', m: 'Trở về nhà' },
  '歩': { hv: 'BỘ', on: 'ホ, ブ', kun: 'ある・く', m: 'Đi bộ, bước' },
  '走': { hv: 'TẨU', on: 'ソウ', kun: 'はし・る', m: 'Chạy' },
  '止': { hv: 'CHỈ', on: 'シ', kun: 'と・まる, と・める', m: 'Dừng lại' },
  '立': { hv: 'LẬP', on: 'リツ, リュウ', kun: 'た・つ', m: 'Đứng lên, thành lập' },
  '座': { hv: 'TỌA', on: 'ザ', kun: 'すわ・る', m: 'Ngồi, chỗ ngồi' },
  '思': { hv: 'TƯ', on: 'シ', kun: 'おも・う', m: 'Suy nghĩ, cảm thấy' },
  '考': { hv: 'KHẢO', on: 'コウ', kun: 'かんが・える', m: 'Suy nghĩ, cân nhắc' },
  '知': { hv: 'TRI', on: 'チ', kun: 'し・る', m: 'Biết, nhận biết, tri thức' },
  '使': { hv: 'SỬ', on: 'シ', kun: 'つか・う', m: 'Sử dụng, đại sứ' },
  '作': { hv: 'TÁC', on: 'サク, サ', kun: 'つく・る', m: 'Làm, chế tác, sáng tác' },
  '持': { hv: 'TRÌ', on: 'ジ', kun: 'も・つ', m: 'Cầm, nắm, sở hữu' },
  '待': { hv: 'ĐÃI', on: 'タイ', kun: 'ま・つ', m: 'Chờ đợi' },
  '開': { hv: 'KHAI', on: 'カイ', kun: 'あ・ける, ひら・く', m: 'Mở cửa, khai mạc' },
  '閉': { hv: 'BẾ', on: 'ヘイ', kun: 'し・める, と・じる', m: 'Đóng lại, bế mạc' },
  '始': { hv: 'THỦY', on: 'シ', kun: 'はじ・まる, はじ・める', m: 'Bắt đầu, nguyên thủy' },
  '終': { hv: 'CHUNG', on: 'シュウ', kun: 'お・わる, お・える', m: 'Kết thúc, chung kết' },

  // 6. Kinh tế, Khoa học, Chính trị & Xã hội
  '経': { hv: 'KINH', on: 'ケイ, キョウ', kun: 'へ・る', m: 'Kinh tế, kinh nghiệm' },
  '済': { hv: 'TẾ', on: 'サイ, ザイ', kun: 'す・む', m: 'Kinh tế, cứu tế, xong' },
  '政': { hv: 'CHÍNH', on: 'セイ, ショウ', kun: 'まつりごと', m: 'Chính trị, chính phủ' },
  '治': { hv: 'TRỊ', on: 'ジ, チ', kun: 'おさ・める, なお・る', m: 'Chính trị, chữa lành' },
  '法': { hv: 'PHÁP', on: 'ホウ, ハッ', kun: '', m: 'Pháp luật, phương pháp' },
  '律': { hv: 'LUẬT', on: 'リツ', kun: '', m: 'Luật lệ, quy tắc' },
  '情': { hv: 'TÌNH', on: 'ジョウ, セイ', kun: 'なさ・け', m: 'Thông tin, tình cảm' },
  '報': { hv: 'BÁO', on: 'ホウ', kun: 'むく・いる', m: 'Báo cáo, thông báo' },
  '技': { hv: 'KĨ', on: 'ギ', kun: 'わざ', m: 'Kỹ thuật, tay nghề' },
  '術': { hv: 'THUẬT', on: 'ジュツ', kun: 'すべ', m: 'Kỹ thuật, mỹ thuật' },
  '科': { hv: 'KHOA', on: 'カ', kun: '', m: 'Khoa học, chuyên khoa' },
  '理': { hv: 'LÝ', on: 'リ', kun: 'ことわり', m: 'Lý do, đạo lý, xử lý' },
  '由': { hv: 'DO', on: 'ユ, ユウ', kun: 'よし', m: 'Lý do, tự do' },
  '問': { hv: 'VẤN', on: 'モン', kun: 'と・う, と・い', m: 'Hỏi, câu hỏi, vấn đề' },
  '題': { hv: 'ĐỀ', on: 'ダイ', kun: '', m: 'Chủ đề, vấn đề' },
  '答': { hv: 'ĐÁP', on: 'トウ', kun: 'こた・える', m: 'Trả lời, đáp án' },
  '意': { hv: 'Ý', on: 'イ', kun: '', m: 'Ý nghĩa, chú ý, ý kiến' },
  '味': { hv: 'VỊ', on: 'ミ', kun: 'あじ', m: 'Ý vị, mùi vị' },
  '勉': { hv: 'MIỄN', on: 'ベン', kun: 'つと・める', m: 'Cố gắng, học tập' },
  '習': { hv: 'TẬP', on: 'シュウ', kun: 'なら・う', m: 'Học tập, tập quán' },
  '練': { hv: 'LUYỆN', on: 'レン', kun: 'ね・る', m: 'Luyện tập, rèn luyện' },
  '研': { hv: 'NGHIÊN', on: 'ケン', kun: 'と・ぐ', m: 'Nghiên cứu' },
  '究': { hv: 'CỨU', on: 'キュウ', kun: 'きわ・める', m: 'Nghiên cứu sâu' },
  '発': { hv: 'PHÁT', on: 'ハツ, ホツ', kun: '', m: 'Phát triển, xuất phát' },
  '保': { hv: 'BẢO', on: 'ホ', kun: 'たも・つ', m: 'Bảo vệ, bảo hiểm' },
  '護': { hv: 'HỘ', on: 'ゴ', kun: '', m: 'Bảo hộ, che chở' },
  '環': { hv: 'HOÀN', on: 'カン', kun: 'わ', m: 'Môi trường, tuần hoàn' },
  '境': { hv: 'CẢNH', on: 'キョウ, ケイ', kun: 'さかい', m: 'Môi trường, ranh giới' },
  '自': { hv: 'TỰ', on: 'ジ, シ', kun: 'みずか・ら', m: 'Tự mình, tự do' },
  '然': { hv: 'NHIÊN', on: 'ゼン, ネン', kun: '', m: 'Tự nhiên, tất nhiên' },
  '世': { hv: 'THẾ', on: 'セイ, セ', kun: 'よ', m: 'Thế giới, thế kỷ' },
  '界': { hv: 'GIỚI', on: 'カイ', kun: '', m: 'Thế giới, biên giới' },
  '国': { hv: 'QUỐC', on: 'コク', kun: 'くに', m: 'Quốc gia, đất nước' },
  '際': { hv: 'TẾ', on: 'サイ', kun: 'きわ', m: 'Quốc tế, dịp' },
  '図': { hv: 'ĐỒ', on: 'ズ, ト', kun: 'はか・る', m: 'Bản đồ, ý đồ' },
  '館': { hv: 'QUÁN', on: 'カン', kun: 'やかた', m: 'Nhà lớn, thư viện' },
  '病': { hv: 'BỆNH', on: 'ビョウ', kun: 'や・む', m: 'Bệnh tật' },
  '院': { hv: 'VIỆN', on: 'イン', kun: '', m: 'Bệnh viện, học viện' },
  '薬': { hv: 'DƯỢC', on: 'ヤク', kun: 'くすり', m: 'Thuốc men' },
  '医': { hv: 'Y', on: 'イ', kun: '', m: 'Y học, bác sĩ' },
  '要': { hv: 'YẾU', on: 'ヨウ', kun: 'い・る', m: 'Quan trọng, cần thiết' },
  '責': { hv: 'TRÁCH', on: 'セキ', kun: 'せ・める', m: 'Trách nhiệm' },
  '任': { hv: 'NHIỆM', on: 'ニン', kun: 'まか・せる', m: 'Nhiệm vụ, gánh vác' },
  '東': { hv: 'ĐÔNG', on: 'トウ', kun: 'ひがし', m: 'Phía Đông' },
  '西': { hv: 'TÂY', on: 'セイ, サイ', kun: 'にし', m: 'Phía Tây' },
  '南': { hv: 'NAM', on: 'ナン', kun: 'みなみ', m: 'Phía Nam' },
  '北': { hv: 'BẮC', on: 'ホク', kun: 'きた', m: 'Phía Bắc' },
  '京': { hv: 'KINH', on: 'キョウ, ケイ', kun: 'みやこ', m: 'Kinh đô, thủ đô' },
  '都': { hv: 'ĐÔ', on: 'ト, ツ', kun: 'みやこ', m: 'Đô thị, thủ đô' }
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
      result.push(`[${char}]`);
      hasKanji = true;
    }
  }

  return hasKanji ? result.join(' ') : '';
}

/**
 * Bóc tách chi tiết từng chữ Kanji trong từ ghép (Kanji Decomposition)
 * @param {string} word Từ ghép tiếng Nhật (ví dụ: "日本語", "経済学", "大")
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
          hv: `[${char}]`,
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
