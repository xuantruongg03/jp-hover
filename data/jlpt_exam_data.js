/**
 * Cơ sở dữ liệu Câu hỏi Luyện nghe (Choukai), Luyện viết & Đề thi thử JLPT (N5, N4, N3)
 * Tích hợp cùng JapaneseAudioEngine & JapaneseEngine để phát âm bản xứ và chấm điểm tự động
 */

const JLPT_EXAM_DATA = {
  // =========================================================================
  // 1. PHẦN LUYỆN NGHE JLPT (聴解 - CHOUKAI)
  // =========================================================================
  listening: [
    // --- JLPT N5 ---
    {
      id: 'lis_n5_01',
      level: 'N5',
      category: 'Thời gian & Lịch trình',
      title: 'Hỏi giờ thức dậy ngày mai',
      situation: 'Người nam và người nữ đang nói chuyện về lịch trình hàng ngày.',
      audioText: '男の人と女の人が話しています。男の人は明日、何時に起きますか。女：田中さんは毎朝何時に起きますか。男：平日は6時に起きますが、休日は8時に起きます。女：明日は土曜日ですね。男：ええ、だから8時に起きます。男の人は明日何時に起きますか。',
      questionAudio: '男の人は明日、何時に起きますか。',
      question: '男の人は明日、何時に起きますか？ (Người nam ngày mai thức dậy lúc mấy giờ?)',
      options: [
        { text: '6時 (6 giờ)', isCorrect: false },
        { text: '7時 (7 giờ)', isCorrect: false },
        { text: '8時 (8 giờ)', isCorrect: true },
        { text: '9時 (9 giờ)', isCorrect: false }
      ],
      script: '女：田中さんは毎朝何時（なんじ）に起（お）きますか。\n男：平日（へいじつ）は6時（ろくじ）に起きますが、休日（きゅうじつ）は8時（はちじ）に起きます。\n女：明日は土曜日（どようび）ですね。\n男：ええ、だから8時に起きます。',
      scriptVi: 'Nữ: Anh Tanaka mỗi sáng thức dậy lúc mấy giờ?\nNam: Ngày thường tôi dậy lúc 6 giờ, nhưng ngày nghỉ tôi dậy lúc 8 giờ.\nNữ: Ngày mai là thứ Bảy nhỉ.\nNam: Vâng, nên ngày mai tôi sẽ dậy lúc 8 giờ.\nCâu hỏi: Ngày mai người nam thức dậy lúc mấy giờ?',
      explanation: 'Người nam nói: "平日 (ngày thường) dậy lúc 6時, còn 休日 (ngày nghỉ) dậy lúc 8時". Ngày mai là thứ Bảy (土曜日 = ngày nghỉ cuối tuần), do đó anh ấy dậy lúc 8 giờ (8時). Đáp án đúng là 8時.',
      dictationAnswer: '8時に起きます',
      dictationAccepted: ['8時', 'はちじ', '8じ', '8じにおきます', '8時に起きます', 'はちじにおきます']
    },
    {
      id: 'lis_n5_02',
      level: 'N5',
      category: 'Mua sắm & Số đếm',
      title: 'Mua hoa quả ở cửa hàng',
      situation: 'Một cô gái đang mua hoa quả tại cửa hàng.',
      audioText: '女の人が店の人と話しています。女の人は何をいくつ買いますか。女：すみません、このリンゴを2つと、みかんを3つください。店員：はい、リンゴ2つとみかん3つですね。全部で500円です。女の人は何をいくつ買いますか。',
      questionAudio: '女の人は何をいくつ買いますか。',
      question: '女の人は何をいくつ買いますか？ (Người phụ nữ mua những gì và số lượng bao nhiêu?)',
      options: [
        { text: 'リンゴ3つ と みかん2つ (3 táo, 2 quýt)', isCorrect: false },
        { text: 'リンゴ2つ と みかん3つ (2 táo, 3 quýt)', isCorrect: true },
        { text: 'リンゴ2つ だけ (Chỉ 2 táo)', isCorrect: false },
        { text: 'みかん5つ (5 quýt)', isCorrect: false }
      ],
      script: '女：すみません、このリンゴを2つ（ふたつ）と、みかんを3つ（みっつ）ください。\n店員：はい、リンゴ2つとみかん3つですね。全部（ぜんぶ）で500円（ごひゃくえん）です。',
      scriptVi: 'Nữ: Xin lỗi, cho tôi 2 quả táo và 3 quả quýt này nhé.\nNhân viên: Vâng, 2 táo và 3 quýt đúng không ạ. Tổng cộng là 500 Yên.',
      explanation: 'Người mua nói rõ: "リンゴを2つ (2 quả táo: futatsu)" và "みかんを3つ (3 quả quýt: mittsu)". Đáp án chính xác là phương án 2.',
      dictationAnswer: 'リンゴを2つとみかんを3つ',
      dictationAccepted: ['リンゴ2つとみかん3つ', 'りんごふたつとみかんみっつ', 'リンゴ2つとみかん3つください', 'りんご2つとみかん3つ']
    },
    {
      id: 'lis_n5_03',
      level: 'N5',
      category: 'Địa điểm & Phương hướng',
      title: 'Đi đâu bây giờ?',
      situation: 'Hai bạn sinh viên đang bàn xem sẽ đi đâu.',
      audioText: '男の人と女の人が話しています。2人は今からどこへ行きますか。男：今から図書館へ行きますか。女：いいえ、今日図書館は休みですよ。駅前のカフェに行きましょう。男：そうですね、そうしましょう。2人は今からどこへ行きますか。',
      questionAudio: '2人は今からどこへ行きますか。',
      question: '2人は今からどこへ行きますか？ (Hai người bây giờ sẽ đi đâu?)',
      options: [
        { text: '図書館 (Thư viện)', isCorrect: false },
        { text: '駅前のカフェ (Quán cà phê trước ga)', isCorrect: true },
        { text: '学校 (Trường học)', isCorrect: false },
        { text: '家 (Về nhà)', isCorrect: false }
      ],
      script: '男：今（いま）から図書館（としょかん）へ行（い）きますか。\n女：いいえ、今日（きょう）図書館は休（やす）みですよ。駅前（えきまえ）のカフェに行きましょう。\n男：そうですね、そうしましょう。',
      scriptVi: 'Nam: Bây giờ tụi mình đi thư viện nhé?\nNữ: Không được, hôm nay thư viện nghỉ rồi. Tụi mình ra quán cà phê trước ga đi!\nNam: Ừ, làm thế đi.\nCâu hỏi: Hai người bây giờ đi đâu?',
      explanation: 'Thư viện hôm nay nghỉ (今日図書館は休み), bạn nữ đề nghị ra quán cà phê trước ga (駅前のカフェに行きましょう) và bạn nam đồng ý. Đáp án đúng là 駅前のカフェ.',
      dictationAnswer: '駅前のカフェ',
      dictationAccepted: ['駅前のカフェ', 'えきまえのカフェ', 'カフェ', 'えきまえのかふぇ']
    },
    {
      id: 'lis_n5_04',
      level: 'N5',
      category: 'Thời tiết',
      title: 'Dự báo thời tiết ngày mai',
      situation: 'Bản tin dự báo thời tiết buổi tối trên radio.',
      audioText: '明日の天気予報です。明日の午前中は晴れますが、午後からは雨が降るでしょう。傘を持って出かけてください。明日の午後の天気はどうですか。',
      questionAudio: '明日の午後の天気はどうですか。',
      question: '明日の午後の天気はどうですか？ (Thời tiết chiều mai thế nào?)',
      options: [
        { text: '晴れ (Nắng ráo)', isCorrect: false },
        { text: '雨 (Có mưa)', isCorrect: true },
        { text: '雪 (Tuyết rơi)', isCorrect: false },
        { text: '曇り (Nhiều mây)', isCorrect: false }
      ],
      script: '明日（あした）の午前中（ごぜんちゅう）は晴（は）れますが、午後（ごご）からは雨（あめ）が降（ふ）るでしょう。傘（かさ）を持（も）って出（で）かけてください。',
      scriptVi: 'Sáng mai trời sẽ nắng ráo, nhưng từ buổi chiều sẽ có mưa. Quý vị vui lòng mang theo ô khi ra ngoài.',
      explanation: 'Câu hỏi hỏi về thời tiết buổi chiều (午後). Bản tin thông báo: "午後からは雨が降るでしょう" (từ chiều trời sẽ mưa). Đáp án đúng là 雨.',
      dictationAnswer: '雨が降る',
      dictationAccepted: ['雨', 'あめ', '雨が降る', 'あめがふる', '雨です']
    },
    {
      id: 'lis_n5_05',
      level: 'N5',
      category: 'Chỉ đường & Nơi chốn',
      title: 'Hỏi đường tới ngân hàng',
      situation: 'Một người phụ nữ hỏi thăm đường đi tới ngân hàng gần đây.',
      audioText: '女の人が男の人に道を尋ねています。銀行はどこにありますか。女：すみません、この近くに銀行はありますか。男：あそこの交差点を右に曲がって、まっすぐ行くと、郵便局の隣にありますよ。女：郵便局の隣ですね。ありがとうございます。銀行はどこにありますか。',
      questionAudio: '銀行はどこにありますか。',
      question: '銀行はどこにありますか？ (Ngân hàng nằm ở vị trí nào?)',
      options: [
        { text: '交差点の角 (Góc ngã tư)', isCorrect: false },
        { text: '駅の中 (Bên trong nhà ga)', isCorrect: false },
        { text: '郵便局の隣 (Bên cạnh bưu điện)', isCorrect: true },
        { text: '学校の前 (Trước cổng trường)', isCorrect: false }
      ],
      script: '女：すみません、この近（ちか）くに銀行（ぎんこう）はありますか。\n男：あそこの交差点（こうさてん）を右（みぎ）に曲（ま）がって、まっすぐ行くと、郵便局（ゆうびんきょく）の隣（となり）にありますよ。\n女：郵便局の隣ですね。ありがとうございます。',
      scriptVi: 'Nữ: Xin lỗi, gần đây có ngân hàng nào không ạ?\nNam: Bạn rẽ phải ở ngã tư đằng kia, đi thẳng tiếp là ngân hàng ở ngay cạnh bưu điện nhé.\nNữ: Ở cạnh bưu điện đúng không ạ. Cảm ơn bạn.',
      explanation: 'Người chỉ đường nói: "郵便局の隣にありますよ" (Nằm ở ngay cạnh bưu điện). Đáp án chính xác là 郵便局の隣.',
      dictationAnswer: '郵便局の隣',
      dictationAccepted: ['郵便局の隣', 'ゆうびんきょくのとなり', '郵便局のとなり']
    },

    // --- JLPT N4 ---
    {
      id: 'lis_n4_01',
      level: 'N4',
      category: 'Công việc & Nhờ vả',
      title: 'Nhiệm vụ cần ưu tiên làm trước',
      situation: 'Tại văn phòng công ty, trưởng phòng giao việc cho nhân viên nữ.',
      audioText: '会社で男の人と女の人が話しています。女の人はこれからまず、何をしますか。男：佐藤さん、さっきの会議の資料、コピーしてもらえますか。女：はい、何部必要ですか。男：10部お願いします。あ、その前に部長にお茶を出してください。女：わかりました。すぐにお茶をお持ちします。女の人はこれからまず、何をしますか。',
      questionAudio: '女の人はこれからまず、何をしますか。',
      question: '女の人はこれからまず、何をしますか？ (Người nữ việc đầu tiên cần làm tiếp theo là gì?)',
      options: [
        { text: '資料を10部コピーする (Copy 10 bộ tài liệu)', isCorrect: false },
        { text: '部長にお茶を出す (Rót trà mời trưởng phòng)', isCorrect: true },
        { text: '会議室を片付ける (Dọn phòng họp)', isCorrect: false },
        { text: '午後の予定を確認する (Kiểm tra lịch chiều)', isCorrect: false }
      ],
      script: '男：佐藤（さとう）さん、さっきの会議（かいぎ）の資料（しりょう）、コピーしてもらえますか。\n女：はい、何部（なんぶ）必要（ひつよう）ですか。\n男：10部お願いします。あ、その前（まえ）に部長（ぶちょう）にお茶（ちゃ）を出（だ）してください。\n女：わかりました。すぐにお茶をお持（も）ちします。',
      scriptVi: 'Nam: Cô Sato, cô photo giúp tôi tài liệu cuộc họp vừa nãy được không?\nNữ: Vâng, cần mấy bộ ạ?\nNam: 10 bộ nhé. À, trước khi làm việc đó, cô rót trà mang vào cho trưởng phòng giúp tôi nhé.\nNữ: Vâng tôi hiểu rồi. Tôi sẽ mang trà vào ngay ạ.\nCâu hỏi: Người nữ việc đầu tiên cần làm là gì?',
      explanation: 'Bẫy nghe hiểu N4: Người nam ban đầu nhờ photo 10 bộ tài liệu, nhưng sau đó dùng cấu trúc "あ、その前に..." (À, trước đó hãy...). Do đó hành động cần làm TRƯỚC TIÊN (まず) là mang trà cho trưởng phòng (部長にお茶を出す).',
      dictationAnswer: '部長にお茶を出す',
      dictationAccepted: ['部長にお茶を出す', 'お茶を出す', 'ぶちょうにおちゃをだす', 'おちゃをだす']
    },
    {
      id: 'lis_n4_02',
      level: 'N4',
      category: 'Sức khỏe & Đơn thuốc',
      title: 'Bác sĩ dặn dò giờ uống thuốc',
      situation: 'Bác sĩ đang dặn dò bệnh nhân cách uống thuốc tại phòng khám.',
      audioText: '医者と男の人が話しています。男の人は薬をいつ飲みますか。医者：熱がありますね。この薬を朝と晩、ご飯を食べた後に飲んでください。男：昼は飲まなくてもいいですか。医者：はい、昼は飲まないでください。1日2回です。男の人は薬をいつ飲みますか。',
      questionAudio: '男の人は薬をいつ飲みますか。',
      question: '男の人は薬をいつ飲みますか？ (Người nam uống thuốc vào thời điểm nào?)',
      options: [
        { text: '毎食後（1日3回）(Sau mỗi bữa ăn - 3 lần/ngày)', isCorrect: false },
        { text: '朝と晩の食後（1日2回）(Sau bữa sáng và tối - 2 lần/ngày)', isCorrect: true },
        { text: '昼と夜（1日2回）(Trưa và tối - 2 lần/ngày)', isCorrect: false },
        { text: '朝ご飯の前（1日1回）(Trước bữa sáng - 1 lần/ngày)', isCorrect: false }
      ],
      script: '医者（いしゃ）：熱（ねつ）がありますね。この薬（くすり）を朝（あさ）と晩（ばん）、ご飯（はん）を食（た）べた後（あと）に飲（の）んでください。\n男：昼（ひる）は飲まなくてもいいですか。\n医者：はい、昼は飲まないでください。1日（いちにち）2回（にかい）です。',
      scriptVi: 'Bác sĩ: Anh bị sốt rồi đấy. Hãy uống thuốc này vào buổi sáng và buổi tối, sau khi ăn cơm nhé.\nNam: Buổi trưa không cần uống đúng không ạ?\nBác sĩ: Đúng vậy, buổi trưa đừng uống nhé. Ngày 2 lần thôi.',
      explanation: 'Bác sĩ dặn: "朝と晩、ご飯を食べた後に" (buổi sáng và tối sau khi ăn), và khẳng định "昼は飲まないでください、1日2回" (buổi trưa không uống, ngày 2 lần). Do đó đáp án đúng là "朝と晩の食後".',
      dictationAnswer: '朝と晩の食後',
      dictationAccepted: ['朝と晩', 'あさとばん', 'あさとばんのしょくご', '朝と晩の食後']
    },
    {
      id: 'lis_n4_03',
      level: 'N4',
      category: 'Cuộc hẹn & Thời gian',
      title: 'Hẹn ngày đi xem phim',
      situation: 'Hai bạn trẻ đang sắp xếp lịch rảnh để cùng đi xem phim.',
      audioText: '男の人と女の人が話しています。2人は何曜日に映画を見に行きますか。男：今週の金曜日に映画に行かない？女：金曜日はアルバイトがあるの。土曜日はどう？男：土曜日は予定があるんだ。日曜日なら一日中空いてるよ。女：じゃあ、日曜日にしましょう。2人は何曜日に映画を見に行きますか。',
      questionAudio: '2人は何曜日に映画を見に行きますか。',
      question: '2人は何曜日に映画を見に行きますか？ (Hai người sẽ đi xem phim vào thứ mấy?)',
      options: [
        { text: '金曜日 (Thứ Sáu)', isCorrect: false },
        { text: '土曜日 (Thứ Bảy)', isCorrect: false },
        { text: '日曜日 (Chủ Nhật)', isCorrect: true },
        { text: '来週の月曜日 (Thứ Hai tuần sau)', isCorrect: false }
      ],
      script: '男：今週（こんしゅう）の金曜日（きんようび）に映画（えいが）に行かない？\n女：金曜日はアルバイトがあるの。土曜日（どようび）はどう？\n男：土曜日は予定（よてい）があるんだ。日曜日（にちようび）なら一日中（いちにちじゅう）空（あ）いてるよ。\n女：じゃあ、日曜日にしましょう。',
      scriptVi: 'Nam: Thứ Sáu tuần này đi xem phim không?\nNữ: Thứ Sáu tớ bận làm thêm mất rồi. Thứ Bảy thì sao?\nNam: Thứ Bảy tớ lại có lịch hẹn rồi. Chủ Nhật thì tớ rảnh cả ngày đấy.\nNữ: Thế thì chốt Chủ Nhật nhé!\nCâu hỏi: Hai người sẽ đi xem phim vào thứ mấy?',
      explanation: 'Thứ Sáu bạn nữ bận đi làm thêm (アルバイト). Thứ Bảy bạn nam bận lịch trình (予定がある). Chủ Nhật bạn nam rảnh cả ngày (日曜日なら一日中空いてる) và bạn nữ chốt: "じゃあ、日曜日にしましょう". Đáp án là 日曜日.',
      dictationAnswer: '日曜日',
      dictationAccepted: ['日曜日', 'にちようび', 'にちよう']
    },

    // --- JLPT N3 ---
    {
      id: 'lis_n3_01',
      level: 'N3',
      category: 'Thương mại & Báo cáo',
      title: 'Hạn nộp bản thảo thuyết trình',
      situation: 'Trong văn phòng, cấp trên đang trao đổi tiến độ với cấp dưới.',
      audioText: '職場で上司と部下が話しています。部下は今日中に何をしなければなりませんか。上司：山田くん、明日のプレゼンの企画書、どこまで進んでる？部下：データ分析は完了していまして、スライドの作成が半分終わったところです。上司：そうか。明日の午前中の会議で使うから、今日中にスライドを完成させて僕にメールで送っておいてくれ。部下：承知いたしました。本日中に送付いたします。部下は今日中に何をしなければなりませんか。',
      questionAudio: '部下は今日中に何をしなければなりませんか。',
      question: '部下は今日中に何をしなければなりませんか？ (Cấp dưới phải làm xong việc gì trong ngày hôm nay?)',
      options: [
        { text: 'データ分析を最初からやり直す (Làm lại phân tích dữ liệu)', isCorrect: false },
        { text: 'スライドを完成させて上司にメールする (Hoàn thành slide và gửi email cho sếp)', isCorrect: true },
        { text: '明日の会議室を予約する (Đặt phòng họp ngày mai)', isCorrect: false },
        { text: 'プレゼンの練習を1人で行う (Một mình tập thuyết trình)', isCorrect: false }
      ],
      script: '上司（じょうし）：山田（やまだ）くん、明日（あした）のプレゼンの企画書（きかくしょ）、どこまで進（すす）んでる？\n部下（ぶか）：データ分析（ぶんせき）は完了（かんりょう）していまして、スライドの作成（さくせい）が半分（はんぶん）終（お）わったところです。\n上司：そうか。明日の午前中（ごぜんちゅう）の会議で使（つか）うから、今日中（きょうじゅう）にスライドを完成（かんせい）させて僕（ぼく）にメールで送（おく）っておいてくれ。\n部下：承知（しょうち）いたしました。本日中（ほんじつちゅう）に送付（そうふ）いたします。',
      scriptVi: 'Sếp: Yamada này, bản kế hoạch thuyết trình cho ngày mai tiến hành đến đâu rồi?\nCấp dưới: Dạ phần phân tích số liệu đã hoàn thành, còn slide trình chiếu em đã làm xong được một nửa rồi ạ.\nSếp: Vậy à. Vì cuộc họp sáng mai sẽ dùng tới, nên nội trong hôm nay cậu hoàn thành nốt slide rồi gửi email trước cho tôi nhé.\nCấp dưới: Vâng em đã rõ. Em sẽ gửi cho anh trong ngày hôm nay ạ.',
      explanation: 'Sếp yêu cầu cụ thể: "今日中にスライドを完成させて僕にメールで送っておいてくれ" (hôm nay hoàn thành slide và gửi email cho tôi). Đáp án chính xác là "スライドを完成させて上司にメールする".',
      dictationAnswer: 'スライドを完成させて送る',
      dictationAccepted: ['スライドを完成させてメールで送る', 'スライドを完成させる', 'すらいどをかんせいさせる', 'スライドを完成させて送る']
    },
    {
      id: 'lis_n3_02',
      level: 'N3',
      category: 'Dịch vụ & Đặt phòng',
      title: 'Đổi phòng khách sạn nâng hạng',
      situation: 'Khách hàng gọi điện cho lễ tân khách sạn để xác nhận phòng nghỉ.',
      audioText: 'ホテルのフロントと客が話しています。客は結局、どの部屋に泊まることになりましたか。客：明日予約しているスズキですが、禁煙シングルを眺めの良い高層階に変更できますか。フロント：確認いたします。あいにく高層階のシングルは満室ですが、8階のツインでしたら追加料金なしでご案内可能ですがいかがでしょうか。客：本当ですか！ぜひそれでお願いします。客は結局、どの部屋に泊まることになりましたか。',
      questionAudio: '客は結局、どの部屋に泊まることになりましたか。',
      question: '客は結局、どの部屋に泊まることになりましたか？ (Khách hàng cuối cùng sẽ nghỉ ở loại phòng nào?)',
      options: [
        { text: '元の禁煙シングル (Phòng đơn không hút thuốc ban đầu)', isCorrect: false },
        { text: '8階のツインルーム (Phòng đôi 2 giường ở tầng 8)', isCorrect: true },
        { text: '高層階のシングル (Phòng đơn tầng cao)', isCorrect: false },
        { text: '予約をキャンセルした (Hủy bỏ đặt phòng)', isCorrect: false }
      ],
      script: '客（きゃく）：明日（あした）予約（よやく）しているスズキですが、禁煙（きんえん）シングルを眺（なが）めの良（よ）い高層階（こうそうかい）に変更（へんこう）できますか。\nフロント：確認（かくにん）いたします。あいにく高層階のシングルは満室（まんしつ）ですが、8階（はちかい）のツインでしたら追加料金（ついかりょうきん）なしでご案内可能（あんないかのう）ですがいかがでしょうか。\n客：本当（ほんとう）ですか！ぜひそれでお願いします。',
      scriptVi: 'Khách: Tôi là Suzuki có đặt phòng ngày mai, tôi muốn đổi phòng đơn không hút thuốc sang phòng tầng cao có view đẹp được không?\nLễ tân: Dạ để em kiểm tra... Rất tiếc phòng đơn tầng cao đã kín chỗ, nhưng tầng 8 bên em có phòng đôi 2 giường (Twin) có thể nâng hạng miễn phí cho anh, anh thấy thế nào ạ?\nKhách: Thật thế ạ! Tuyệt quá, cho tôi đổi sang phòng đó nhé.',
      explanation: 'Phòng đơn tầng cao đã kín (満室), lễ tân gợi ý phòng đôi tầng 8 không phụ thu phí (8階のツイン、追加料金なし) và khách đồng ý ngay ("ぜひそれでお願いします"). Do đó phòng cuối cùng là 8階のツイン.',
      dictationAnswer: '8階のツイン',
      dictationAccepted: ['8階のツイン', '8階のツインルーム', 'はちかいのついん', '8かいのついん']
    }
  ],

  // =========================================================================
  // 2. PHẦN LUYỆN VIẾT CHỮ HÁN & TỪ VỰNG (WRITING & KANJI)
  // =========================================================================
  writing: [
    // --- N5 Writing ---
    {
      id: 'wri_n5_01',
      level: 'N5',
      type: 'kanji',
      prompt: 'Viết từ Kanji mang nghĩa: "Trường học" (HỌC HIỆU - đọc là: がっこう)',
      hint: 'Chữ Hán: 学 (Học) + 校 (Hiệu)',
      kana: 'がっこう',
      romaji: 'gakkou',
      answers: ['学校', 'がっこう', 'gakkou'],
      meaning: 'Trường học',
      sampleSentence: '私 は 毎日 【学校】 へ 行きます。'
    },
    {
      id: 'wri_n5_02',
      level: 'N5',
      type: 'kanji',
      prompt: 'Viết từ Kanji mang nghĩa: "Ăn" (THỰC - đọc là: たべる)',
      hint: 'Chữ Hán: 食 (Thực) + べる',
      kana: 'たべる',
      romaji: 'taberu',
      answers: ['食べる', 'たべる', 'taberu'],
      meaning: 'Ăn',
      sampleSentence: '朝ご飯 を 【食べる】。'
    },
    {
      id: 'wri_n5_03',
      level: 'N5',
      type: 'sentence_fill',
      prompt: 'Điền trợ từ thích hợp vào câu: 「私 ( ) 日本語を勉強します。」 (Tôi học tiếng Nhật - Chủ đề câu)',
      hint: 'Trợ từ đánh dấu chủ đề (viết bằng ký tự ha, phát âm là wa)',
      kana: 'は',
      romaji: 'wa',
      answers: ['は', 'wa', 'ha'],
      meaning: 'Trợ từ [は] đánh dấu chủ ngữ / chủ đề',
      sampleSentence: '私 【は】 日本語を勉強します。'
    },
    {
      id: 'wri_n5_04',
      level: 'N5',
      type: 'sentence_fill',
      prompt: 'Điền trợ từ thích hợp vào câu: 「毎日 本 ( ) 読みます。」 (Đọc sách - Tân ngữ trực tiếp)',
      hint: 'Trợ từ đánh dấu đối tượng chịu tác động của hành động',
      kana: 'を',
      romaji: 'o',
      answers: ['を', 'o', 'wo'],
      meaning: 'Trợ từ [を] chỉ tân ngữ',
      sampleSentence: '毎日 本 【を】 読みます。'
    },
    {
      id: 'wri_n5_05',
      level: 'N5',
      type: 'kanji',
      prompt: 'Viết chữ Hán chỉ "Ngày mai" (đọc là: あした)',
      hint: 'Chữ Hán: 明 (Minh) + 日 (Nhật)',
      kana: 'あした',
      romaji: 'ashita',
      answers: ['明日', 'あした', 'ashita', 'あす'],
      meaning: 'Ngày mai',
      sampleSentence: '【明日】 は 雨 が 降る でしょう。'
    },

    // --- N4 Writing ---
    {
      id: 'wri_n4_01',
      level: 'N4',
      type: 'kanji',
      prompt: 'Viết từ Kanji mang nghĩa: "Lời hứa, cuộc hẹn" (ƯỚC THÚC - đọc là: やくそく)',
      hint: 'Chữ Hán: 約 (Ước) + 束 (Thúc)',
      kana: 'やくそく',
      romaji: 'yakusoku',
      answers: ['約束', 'やくそく', 'yakusoku'],
      meaning: 'Lời hứa, cuộc hẹn',
      sampleSentence: '友達 と 【約束】 を しました。'
    },
    {
      id: 'wri_n4_02',
      level: 'N4',
      type: 'kanji',
      prompt: 'Viết từ Kanji mang nghĩa: "Tiện lợi, thuận tiện" (TIỆN LỢI - đọc là: べんり)',
      hint: 'Chữ Hán: 便 (Tiện) + 利 (Lợi)',
      kana: 'べんり',
      romaji: 'benri',
      answers: ['便利', 'べんり', 'benri'],
      meaning: 'Tiện lợi, thuận tiện',
      sampleSentence: '地下鉄 は とても 【便利】 です。'
    },
    {
      id: 'wri_n4_03',
      level: 'N4',
      type: 'sentence_fill',
      prompt: 'Hoàn thành đuôi cấm chỉ: 「ここでタバコを吸っ ( ) いけません。」 (Không được hút thuốc ở đây)',
      hint: 'Mẫu ngữ pháp cấm chỉ: 〜てはいけない (ở đây 吸っ + ては)',
      kana: 'ては',
      romaji: 'tewa',
      answers: ['ては', 'tewa', 'teha'],
      meaning: 'Cấm chỉ [〜てはいけない]',
      sampleSentence: 'ここでタバコを吸っ 【ては】 いけません。'
    },
    {
      id: 'wri_n4_04',
      level: 'N4',
      type: 'kanji',
      prompt: 'Viết từ ghép mang nghĩa: "Cách làm" (đọc là: やりかた)',
      hint: 'Động từ やる thể masu bỏ masu + 方 (Phương - đọc kata)',
      kana: 'やりかた',
      romaji: 'yarikata',
      answers: ['やり方', 'やりかた', 'yarikata'],
      meaning: 'Cách làm, phương pháp làm',
      sampleSentence: 'この機械の 【やり方】 を 教えてください。'
    },

    // --- N3 Writing ---
    {
      id: 'wri_n3_01',
      level: 'N3',
      type: 'kanji',
      prompt: 'Viết từ Kanji mang nghĩa: "Nghiên cứu" (NGHIÊN CỨU - đọc là: けんきゅう)',
      hint: 'Chữ Hán: 研 (Nghiên) + 究 (Cứu)',
      kana: 'けんきゅう',
      romaji: 'kenkyuu',
      answers: ['研究', 'けんきゅう', 'kenkyuu', 'kenkyu'],
      meaning: 'Nghiên cứu khoa học / học thuật',
      sampleSentence: '大学 で AI技術 を 【研究】 しています。'
    },
    {
      id: 'wri_n3_02',
      level: 'N3',
      type: 'kanji',
      prompt: 'Viết từ lặp chữ Hán mang nghĩa: "Mọi người, quần chúng" (đọc là: ひとびと)',
      hint: 'Chữ Hán: 人 (Nhân) + ký tự lặp 々',
      kana: 'ひとびと',
      romaji: 'hitobito',
      answers: ['人々', 'ひとびと', 'hitobito'],
      meaning: 'Mọi người, quần chúng',
      sampleSentence: '多く の 【人々】 が 公園 に 集まった。'
    }
  ],

  // =========================================================================
  // 3. BỘ ĐỀ THI THỬ TRẮC NGHIỆM CHUẨN JLPT (MOCK EXAMS)
  // =========================================================================
  mockExams: [
    // --- ĐỀ THI JLPT N5 ---
    {
      id: 'exam_n5',
      level: 'N5',
      title: 'Đề thi Thử Tiếng Nhật JLPT N5 Chuẩn Hóa',
      timeLimitMinutes: 15,
      passScore: 60, // >= 60% là Đỗ
      questions: [
        // Mondai 1: 漢字読み (Cách đọc Kanji)
        {
          mondai: 'Mondai 1: 漢字読み (Cách đọc chữ Hán)',
          prompt: '___ の 言葉 は ひらがな で どう 書きますか。',
          sentence: '毎朝、<span class="exam-target">新聞</span> を 読みます。',
          target: '新聞',
          options: ['しんぶん', 'しんもん', 'きんぶん', 'しんぷん'],
          correct: 0,
          explanation: 'Chữ Hán: 新 (Tân - しん) + 聞 (Văn - ぶん) ➔ 新聞 (しんぶん: tờ báo).'
        },
        {
          mondai: 'Mondai 1: 漢字読み (Cách đọc chữ Hán)',
          prompt: '___ の 言葉 は ひらがな で どう 書きますか。',
          sentence: '駅 の <span class="exam-target">近く</span> に レストラン が あります。',
          target: '近く',
          options: ['とおく', 'ちかく', 'みち', 'となり'],
          correct: 1,
          explanation: 'Chữ Hán: 近 (Cận) ➔ 近く (ちかく: ở gần).'
        },
        {
          mondai: 'Mondai 1: 漢字読み (Cách đọc chữ Hán)',
          prompt: '___ の 言葉 は ひらがな で どう 書きますか。',
          sentence: '誕生日 に <span class="exam-target">時計</span> を もらいました。',
          target: '時計',
          options: ['じけい', 'ときけい', 'とけい', 'とげい'],
          correct: 2,
          explanation: 'Chữ Hán: 時 (Thời) + 計 (Kế) ➔ 時計 (とけい: đồng hồ).'
        },

        // Mondai 2: 表記 (Cách viết Kanji từ Hiragana)
        {
          mondai: 'Mondai 2: 表記 (Viết chữ Hán)',
          prompt: '___ の 言葉 は 漢字 で どう 書きますか。',
          sentence: 'きのう、本 を <span class="exam-target">かいました</span>。',
          target: 'かいました',
          options: ['売いました', '買いました', '貝いました', '見いました'],
          correct: 1,
          explanation: 'Mua = 買 (Mãi) ➔ 買いました (かいました).'
        },
        {
          mondai: 'Mondai 2: 表記 (Viết chữ Hán)',
          prompt: '___ の 言葉 は 漢字 で どう 書きますか。',
          sentence: 'この 川 の 水 は とても <span class="exam-target">つめたい</span> です。',
          target: 'つめたい',
          options: ['冷たい', '熱い', '寒い', '温たい'],
          correct: 0,
          explanation: 'Lạnh (nước, đồ vật) dùng chữ 冷 (Lãnh) ➔ 冷たい (つめたい).'
        },

        // Mondai 3: 文脈規定 (Điền từ vựng ngữ cảnh)
        {
          mondai: 'Mondai 3: 文脈規定 (Từ vựng ngữ cảnh)',
          prompt: '( ) に 何 を 入れますか。一番 いい もの を 一つ 選んで ください。',
          sentence: '部屋 が 暗い ですから、電気 を ( ) ください。',
          target: '( )',
          options: ['消して', 'つけて', 'あけて', 'しめて'],
          correct: 1,
          explanation: 'Phòng tối (部屋が暗い) nên hãy "bật đèn" (電気をつけてください). つける = bật đèn, 消す = tắt đèn.'
        },
        {
          mondai: 'Mondai 3: 文脈規定 (Từ vựng ngữ cảnh)',
          prompt: '( ) に 何 を 入れますか。一番 いい もの を 一つ 選んで ください。',
          sentence: 'お腹 が すきましたから、何か ( ) を 食べたい です。',
          target: '( )',
          options: ['ご飯', 'お茶', '水', '薬'],
          correct: 0,
          explanation: 'Bụng đói (お腹がすきました) nên muốn ăn "cơm/thức ăn" (ご飯).'
        },

        // Mondai 4: 文法・助詞 (Ngữ pháp & Trợ từ)
        {
          mondai: 'Mondai 4: 文法・助詞 (Ngữ pháp & Trợ từ)',
          prompt: '( ) に 何 を 入れますか。一番 いい もの を 一つ 選んで ください。',
          sentence: 'わたし は 日曜日 ( ) どこへも 行きませんでした。',
          target: '( )',
          options: ['に', 'で', 'を', 'は'],
          correct: 0,
          explanation: 'Chỉ mốc thời gian cụ thể trong tuần (日曜日) đi kèm trợ từ に ➔ 日曜日に.'
        },
        {
          mondai: 'Mondai 4: 文法・助詞 (Ngữ pháp & Trợ từ)',
          prompt: '( ) に 何 を 入れますか。一番 いい もの を 一つ 選んで ください。',
          sentence: 'ここで 写真 を ( ) は いけません。',
          target: '( )',
          options: ['撮る', '撮った', '撮って', '撮らない'],
          correct: 2,
          explanation: 'Cấu trúc cấm chỉ N5: Động từ thể て + はいけない ➔ 撮ってはいけません (không được chụp ảnh).'
        },
        {
          mondai: 'Mondai 4: 文法・助詞 (Ngữ pháp & Trợ từ)',
          prompt: '( ) に 何 を 入れますか。一番 いい もの を 一つ 選んで ください。',
          sentence: '図書館 で 静か に ( ) ください。',
          target: '( )',
          options: ['して', 'する', 'した', 'します'],
          correct: 0,
          explanation: 'Yêu cầu lịch sự: Tính từ đuôi na + に ➔ 静かに + してください (hãy giữ yên lặng).'
        }
      ]
    },

    // --- ĐỀ THI JLPT N4 ---
    {
      id: 'exam_n4',
      level: 'N4',
      title: 'Đề thi Thử Tiếng Nhật JLPT N4 Chuẩn Hóa',
      timeLimitMinutes: 20,
      passScore: 60,
      questions: [
        {
          mondai: 'Mondai 1: 漢字読み (Cách đọc chữ Hán)',
          prompt: '___ の 言葉 は ひらがな で どう 書きますか。',
          sentence: '来週 の 旅行 の <span class="exam-target">計画</span> を 立てています。',
          target: '計画',
          options: ['けいかく', 'けいがく', 'きかく', 'けいかっ'],
          correct: 0,
          explanation: 'Chữ Hán: 計 (Kế - けい) + 画 (Họa - かく) ➔ 計画 (けいかく: kế hoạch).'
        },
        {
          mondai: 'Mondai 1: 漢字読み (Cách đọc chữ Hán)',
          prompt: '___ の 言葉 は ひらがな で どう 書きますか。',
          sentence: '先生 に 日本 の 文化 について <span class="exam-target">質問</span> しました。',
          target: '質問',
          options: ['しつもん', 'しつぶん', 'じつもん', 'ちつもん'],
          correct: 0,
          explanation: 'Chữ Hán: 質 (Chất - しつ) + 問 (Vấn - もん) ➔ 質問 (しつもん: câu hỏi).'
        },
        {
          mondai: 'Mondai 2: 表記 (Viết chữ Hán)',
          prompt: '___ の 言葉 は 漢字 で どう 書きますか。',
          sentence: 'テスト の 前 に しっかり <span class="exam-target">じゅんび</span> を します。',
          target: 'じゅんび',
          options: ['準備', '準借', '進備', '準昔'],
          correct: 0,
          explanation: 'Chuẩn bị = 準 (Chuẩn) + 備 (Bị) ➔ 準備 (じゅんび).'
        },
        {
          mondai: 'Mondai 3: 文脈規定 (Từ vựng ngữ cảnh)',
          prompt: '( ) に 何 を 入れますか。一番 いい もの を 一つ 選んで ください。',
          sentence: '約束 の 時間 に ( ) しまいました。申し訳ありません。',
          target: '( )',
          options: ['遅刻', '出発', '到着', '中止'],
          correct: 0,
          explanation: 'Muộn giờ hẹn dùng từ 遅刻 (ちこく: đi muộn, trễ hẹn).'
        },
        {
          mondai: 'Mondai 4: 文法・助詞 (Ngữ pháp & Trợ từ)',
          prompt: '( ) に 何 を 入れますか。一番 いい もの を 一つ 選んで ください。',
          sentence: '薬 を 飲んだ ( )、熱 が 下がりました。',
          target: '( )',
          options: ['ので', 'のに', 'ても', 'ながら'],
          correct: 0,
          explanation: 'Chỉ nguyên nhân khách quan: Thể ngắn + ので (Vì đã uống thuốc nên cơn sốt đã hạ).'
        },
        {
          mondai: 'Mondai 4: 文法・助詞 (Ngữ pháp & Trợ từ)',
          prompt: '( ) に 何 を 入れますか。一番 いい もの を 一つ 選んで ください。',
          sentence: 'この 料理 は 美味しくて、とても ( ) です。',
          target: '( )',
          options: ['食べやすい', '食べるやすい', '食べたやすい', '食べたいやすい'],
          correct: 0,
          explanation: 'Cấu trúc dễ làm gì: Động từ thể ます bỏ ます + やすい ➔ 食べやすい (dễ ăn).'
        },
        {
          mondai: 'Mondai 4: 文法・助詞 (Ngữ pháp & Trợ từ)',
          prompt: '( ) に 何 を 入れますか。一番 いい もの を 一つ 選んで ください。',
          sentence: '明日 は 雨 が 降る ( ) しれません。傘 を 持って いきましょう。',
          target: '( )',
          options: ['かも', 'でも', 'ほど', 'しか'],
          correct: 0,
          explanation: 'Cấu trúc phỏng đoán N4: 〜かもしれない (Có lẽ là / biết đâu chừng).'
        },
        {
          mondai: 'Mondai 2: 表記 (Viết chữ Hán)',
          prompt: '___ の 言葉 は 漢字 で どう 書きますか。',
          sentence: '毎晩、日記 を <span class="exam-target">かいて</span> います。',
          target: 'かいて',
          options: ['書いて', '描いて', '読いて', '話いて'],
          correct: 0,
          explanation: 'Viết nhật ký dùng chữ 書 (Thư) ➔ 書いて (かいて).'
        },
        {
          mondai: 'Mondai 3: 文脈規定 (Từ vựng ngữ cảnh)',
          prompt: '( ) に 何 を 入れますか。一番 いい もの を 一つ 選んで ください。',
          sentence: 'この パソコン は 古い ですが、まだ 十分 ( ) ます。',
          target: '( )',
          options: ['使え', '直し', '壊れ', '捨て'],
          correct: 0,
          explanation: 'Động từ khả năng của 使う: 使える (có thể dùng được) ➔ まだ十分使えます (vẫn dùng tốt).'
        },
        {
          mondai: 'Mondai 4: 文法・助詞 (Ngữ pháp & Trợ từ)',
          prompt: '( ) に 何 を 入れますか。一番 いい もの を 一つ 選んで ください。',
          sentence: '母 に 部屋 を 掃除 ( ) られた。',
          target: '( )',
          options: ['さ', 'せ', 'れ', 'ら'],
          correct: 0,
          explanation: 'Thể bị động / sai bảo gián tiếp: する ➔ された (hoặc 掃除させられた).'
        }
      ]
    },

    // --- ĐỀ THI JLPT N3 ---
    {
      id: 'exam_n3',
      level: 'N3',
      title: 'Đề thi Thử Tiếng Nhật JLPT N3 Chuẩn Hóa',
      timeLimitMinutes: 25,
      passScore: 60,
      questions: [
        {
          mondai: 'Mondai 1: 漢字読み (Cách đọc chữ Hán)',
          prompt: '___ の 言葉 は ひらがな で どう 書きますか。',
          sentence: '彼 は 自分 の 意見 を <span class="exam-target">率直</span> に 述（の）べた。',
          target: '率直',
          options: ['そっちょく', 'しつちょく', 'りつちょく', 'すっちょく'],
          correct: 0,
          explanation: 'Chữ Hán: 率 (Suất - そつ) + 直 (Trực - ちょく) ➔ 率直 (そっちょく: thẳng thắn, bộc trực).'
        },
        {
          mondai: 'Mondai 1: 漢字読み (Cách đọc chữ Hán)',
          prompt: '___ の 言葉 は ひらがな で どう 書きますか。',
          sentence: 'この 仕事 は 専門的 な <span class="exam-target">知識</span> が 必要 です。',
          target: '知識',
          options: ['ちしき', 'ちしち', 'しき', 'ちりき'],
          correct: 0,
          explanation: 'Chữ Hán: 知 (Tri - ち) + 識 (Thức - しき) ➔ 知識 (ちしき: tri thức, kiến thức chuyên môn).'
        },
        {
          mondai: 'Mondai 1: 漢字読み (Cách đọc chữ Hán)',
          prompt: '___ の 言葉 は ひらがな で どう 書きますか。',
          sentence: '会議 の 日程 を <span class="exam-target">調整</span> しています。',
          target: '調整',
          options: ['ちょうせい', 'ちょうしょう', 'ていせい', 'ちょうさい'],
          correct: 0,
          explanation: 'Chữ Hán: 調 (Điệu - ちょう) + 整 (Chỉnh - せい) ➔ 調整 (ちょうせい: điều chỉnh, thu xếp).'
        },
        {
          mondai: 'Mondai 2: 表記 (Viết chữ Hán)',
          prompt: '___ の 言葉 は 漢字 で どう 書きますか。',
          sentence: '自然環境 の <span class="exam-target">ほご</span> に 努（つと）める。',
          target: 'ほご',
          options: ['保護', '保誤', '補護', '保後'],
          correct: 0,
          explanation: 'Bảo hộ / Bảo vệ môi trường = 保 (Bảo) + 護 (Hộ) ➔ 保護 (ほご).'
        },
        {
          mondai: 'Mondai 2: 表記 (Viết chữ Hán)',
          prompt: '___ の 言葉 は 漢字 で どう 書きますか。',
          sentence: '彼 の 主張 に は 明らか に <span class="exam-target">むじゅん</span> が ある。',
          target: 'むじゅん',
          options: ['矛盾', '務盾', '無循', '矛順'],
          correct: 0,
          explanation: 'Mâu thuẫn = 矛 (Mâu - ngọn giáo) + 盾 (Thuẫn - cái khiên) ➔ 矛盾 (むじゅん).'
        },
        {
          mondai: 'Mondai 3: 文脈規定 (Từ vựng ngữ cảnh)',
          prompt: '( ) に 何 を 入れますか。一番 いい もの を 一つ 選んで ください。',
          sentence: '経済 が 急速 に ( ) して、人々の 生活 水準 が 向上した。',
          target: '( )',
          options: ['発展', '拡大', '増加', '延長'],
          correct: 0,
          explanation: 'Kinh tế phát triển nhanh chóng dùng từ 発展 (はってん: phát triển).'
        },
        {
          mondai: 'Mondai 3: 文脈規定 (Từ vựng ngữ cảnh)',
          prompt: '( ) に 何 を 入れますか。一番 いい もの を 一つ 選んで ください。',
          sentence: '先生 の 熱心 な ご指導 の ( )、N3 に 合格 できました。',
          target: '( )',
          options: ['おかげで', 'せいで', 'わりに', '反面'],
          correct: 0,
          explanation: 'Biểu thị sự biết ơn vì kết quả tốt: 〜おかげで (Nhờ có sự chỉ dạy nhiệt tình của thầy).'
        },
        {
          mondai: 'Mondai 4: 文法・助詞 (Ngữ pháp & Trợ từ)',
          prompt: '( ) に 何 を 入れますか。一番 いい もの を 一つ 選んで ください。',
          sentence: '大事 な 試験 の 前 だから、遊んで いる ( ) には いかない。',
          target: '( )',
          options: ['わけ', 'はず', 'もの', 'こと'],
          correct: 0,
          explanation: 'Cấu trúc N3: 〜わけにはいかない (Về mặt đạo lý/trách nhiệm không thể nào làm việc đó).'
        },
        {
          mondai: 'Mondai 4: 文法・助詞 (Ngữ pháp & Trợ từ)',
          prompt: '( ) に 何 を 入れますか。一番 いい もの を 一つ 選んで ください。',
          sentence: 'どんなに 忙しく ( )、睡眠 だけ は しっかり とる べきだ。',
          target: '( )',
          options: ['ても', 'たら', 'のに', 'ので'],
          correct: 0,
          explanation: 'Cấu trúc nhượng bộ: どんなに 〜 ても (Dù có bận rộn đến mức nào đi nữa).'
        },
        {
          mondai: 'Mondai 4: 文法・助詞 (Ngữ pháp & Trợ từ)',
          prompt: '( ) に 何 を 入れますか。一番 いい もの を 一つ 選んで ください。',
          sentence: 'お客様、こちらの 資料 を ( ) ください。',
          target: '( )',
          options: ['ご覧になって', '拝見して', 'お見せして', '聞かれて'],
          correct: 0,
          explanation: 'Kính ngữ tôn kính (Sonkeigo): 見る ➔ ご覧になる ➔ ご覧になってください (Xin mời quý khách xem).'
        }
      ]
    }
  ]
};

// Xuất ra môi trường
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { JLPT_EXAM_DATA };
}
