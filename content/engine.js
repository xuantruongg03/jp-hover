// Engine phân tích tiếng Nhật, tách từ, nhận diện quy tắc Âm On/Kun & phân tích Ngữ pháp chuyên sâu

class JapaneseEngine {
  constructor() {
    // Khởi tạo Intl.Segmenter tiếng Nhật (chuẩn Chromium)
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      this.segmenter = new Intl.Segmenter('ja', { granularity: 'word' });
    } else {
      this.segmenter = null;
    }

    this.onlineCache = new Map();
    this.voices = [];
    this.currentAudio = null;

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        this.voices = window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => {
          this.voices = window.speechSynthesis.getVoices();
        };
      } catch (_) {}
    }
  }

  /**
   * Tách và tìm từ tiếng Nhật tại vị trí con trỏ trong đoạn văn bản (hỗ trợ cả Số đếm + Lượng từ như 3人, 100円, 5本)
   */
  getWordAtOffset(text, offset, scanExtend = 0) {
    if (!text || offset < 0) return null;
    if (offset >= text.length) {
      if (text.length > 0) offset = text.length - 1;
      else return null;
    }

    const charAtOffset = text[offset];
    const isDigit = /[0-9０-９]/.test(charAtOffset);
    if (!isJapaneseText(charAtOffset) && !isDigit) {
      return null;
    }

    // Danh sách các hậu tố lượng từ thông dụng
    const counterRegex = /^(つ|人|日|月|年|時|分|秒|歳|才|本|枚|冊|台|匹|頭|階|杯|足|回|番|円|個|軒|着|通)/;

    // 1. Sử dụng Intl.Segmenter
    if (this.segmenter) {
      const segments = Array.from(this.segmenter.segment(text));
      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        const segStart = seg.index;
        const segEnd = seg.index + seg.segment.length;

        if (offset >= segStart && offset < segEnd) {
          let currentWord = seg.segment.trim();
          let wordStartIdx = i;
          let wordEndIdx = i;

          // Nếu đang trỏ vào chữ số: kiểm tra xem token tiếp theo có phải lượng từ không (ví dụ: "3" + "人", "100" + "円")
          if (/^[0-9０-９]+$/.test(currentWord) && i + 1 < segments.length) {
            const nextSeg = segments[i + 1].segment;
            if (counterRegex.test(nextSeg) || isJapaneseText(nextSeg)) {
              currentWord += nextSeg;
              wordEndIdx = i + 1;
            }
          }
          // Nếu đang trỏ vào lượng từ: kiểm tra xem token trước đó có phải chữ số không (ví dụ: "3" trước "人", "100" trước "円")
          else if (counterRegex.test(currentWord) && i > 0) {
            const prevSeg = segments[i - 1].segment;
            if (/^[0-9０-９]+$/.test(prevSeg)) {
              currentWord = prevSeg + currentWord;
              wordStartIdx = i - 1;
            }
          }

          // Mở rộng thêm n từ sang phải nếu có scanExtend (Phím D)
          if (scanExtend > 0) {
            for (let step = 1; step <= scanExtend && wordEndIdx + step < segments.length; step++) {
              currentWord += segments[wordEndIdx + step].segment;
            }
            return currentWord.trim();
          }

          if (isJapaneseText(currentWord) || (/^[0-9０-９]+/.test(currentWord) && counterRegex.test(currentWord))) {
            // Thuật toán quét cửa sổ hai chiều (Bidirectional Window Scanner)
            // Nhận diện chuẩn xác mọi cụm từ ghép, động từ chia đuôi & mẫu ngữ pháp dài
            // kể cả khi người dùng rê chuột vào giữa hoặc cuối từ (ví dụ: 手に入れる, 立ち上がった, てはいけない)
            let bestMatch = currentWord;
            let maxMatchLen = currentWord.length;

            const minBack = Math.max(0, wordStartIdx - 3);
            const maxFwd = Math.min(segments.length - 1, wordEndIdx + 5);

            for (let b = minBack; b <= wordStartIdx; b++) {
              for (let f = wordEndIdx; f <= maxFwd; f++) {
                if (b === wordStartIdx && f === wordEndIdx) continue;

                let candidate = '';
                for (let k = b; k <= f; k++) {
                  candidate += segments[k].segment;
                }
                candidate = candidate.trim();

                // Không tự ý nuốt copula phán đoán [です, だ, でした] vào danh từ/đại từ đơn lẻ
                // (Ví dụ: [何ですか] phải giữ từ chính là [何] để nhận diện đúng âm đọc [なん], không nuốt thành [何です])
                if (f > wordEndIdx && /^(です|だ|でした)$/.test(segments[f].segment)) {
                  const baseWithoutCopula = candidate.replace(/(です|だ|でした)$/, '');
                  if (/^[0-9０-９一-龯a-zA-Z]+$/.test(baseWithoutCopula) || ['何', 'いくら', 'どこ', 'だれ', 'いつ', 'どう'].includes(baseWithoutCopula)) {
                    continue;
                  }
                }

                // Ưu tiên từ vựng/thành ngữ/động từ chia đuôi trong từ điển trước, sau đó tới mẫu ngữ pháp JLPT
                if (typeof lookupJapaneseWord === 'function' && lookupJapaneseWord(candidate)) {
                  if (candidate.length > maxMatchLen) {
                    bestMatch = candidate;
                    maxMatchLen = candidate.length;
                  }
                } else if (typeof lookupGrammarPattern === 'function' && lookupGrammarPattern(candidate)) {
                  if (candidate.length > maxMatchLen) {
                    bestMatch = candidate;
                    maxMatchLen = candidate.length;
                  }
                }
              }
            }

            return bestMatch;
          }
        }
      }
    }

    // 2. Thuật toán fallback quét mở rộng (hỗ trợ cả chữ số + tiếng Nhật)
    let start = offset;
    let end = offset;

    while (start > 0 && (isJapaneseText(text[start - 1]) || /[0-9０-９]/.test(text[start - 1])) && (offset - start < 12)) {
      start--;
    }
    while (end < text.length - 1 && (isJapaneseText(text[end + 1]) || /[0-9０-９]/.test(text[end + 1])) && (end - offset < 12)) {
      end++;
    }

    const candidate = text.substring(start, end + 1).trim();
    if (isJapaneseText(candidate) || (/^[0-9０-９]+/.test(candidate) && counterRegex.test(candidate))) {
      return candidate;
    }

    return null;
  }

  /**
   * Nhận diện quy tắc sử dụng Âm On (Hán) hoặc Âm Kun (Thuần Nhật)
   * @param {string} word Từ đang xét
   * @param {Array} kanjiList Danh sách Kanji cấu thành
   * @param {string} contextText Đoạn văn bản ngữ cảnh xung quanh
   */
  /**
   * Nhận diện quy tắc sử dụng Âm On (Hán) hoặc Âm Kun (Thuần Nhật) dựa trên âm đọc thực tế và chữ Hán
   * @param {string} word Từ đang xét (ví dụ: 友達, 勉強, 食べる)
   * @param {string} reading Cách đọc Hiragana thực tế của từ (ví dụ: ともだち, べんきょう, たべる)
   * @param {Array} kanjiList Danh sách Kanji cấu thành kèm On/Kun từ từ điển
   * @param {string} contextText Đoạn văn bản ngữ cảnh xung quanh
   */
  classifyOnKunRule(word, reading = '', kanjiList = [], contextText = '') {
    if (!word || !kanjiList || kanjiList.length === 0) {
      return null;
    }

    // 1. Nhóm từ đọc theo âm đặc biệt cả cụm (熟字訓 - Jukujikun)
    const JUKUJIKUN = {
      '今日': 'きょう', '明日': 'あした', '昨日': 'きのう', '大人': 'おとな',
      '時計': 'とけい', '眼鏡': 'めがね', '田舎': 'いなか', '煙草': 'たばこ',
      '景色': 'けしき', '土産': 'みやげ', '素人': 'しろうと', '玄人': 'くろうと',
      '部屋': 'へや', '八百屋': 'やおや', '紅葉': 'もみじ', '吹雪': 'ふぶき',
      '果物': 'くだもの', '足袋': 'たび', '浴衣': 'ゆかた'
    };

    if (JUKUJIKUN[word] && (!reading || reading === JUKUJIKUN[word])) {
      return {
        type: 'jukujikun',
        badge: '🏮 Âm đặc biệt (熟字訓)',
        rule: `Âm đọc đặc biệt cả cụm (熟字訓 - Jukujikun): Cả từ [${word}] có cách đọc thuần Nhật riêng [${JUKUJIKUN[word]}], không tách âm lẻ từng chữ.`
      };
    }

    const hasKatakana = /[\u30A0-\u30FFー]/.test(word);
    const hasHiragana = /[\u3040-\u309F]/.test(word);
    const kanjiCount = kanjiList.length;
    const toHira = (s) => (typeof katakanaToHiragana === 'function' ? katakanaToHiragana(s) : s);

    // 2. Từ lai ghép giữa từ ngoại lai Katakana và chữ Hán (混種語 - Konshugo)
    // Ví dụ: フランス語, ベトナム語, アメリカ人, ビール瓶, チーズ味, ラーメン屋
    if (hasKatakana && kanjiCount >= 1) {
      // Xác định âm đọc của phần chữ Hán
      let kanjiPartReading = '';
      if (reading) {
        // Tách phần Katakana ở đầu ra khỏi reading để lấy âm đọc của hậu tố chữ Hán
        const kataPrefixMatch = word.match(/^([\u30A0-\u30FFー]+)/);
        if (kataPrefixMatch && kataPrefixMatch[1]) {
          const kataAsHira = toHira(kataPrefixMatch[1]);
          if (reading.startsWith(kataAsHira)) {
            kanjiPartReading = reading.slice(kataAsHira.length);
          }
        }
      }

      // Kiểm tra chữ Hán đại diện (thường là hậu tố đơn như 語, 人, 屋, 瓶, 缶...)
      const k = kanjiList[kanjiList.length - 1];
      const kData = (typeof KANJI_DATA !== 'undefined' && KANJI_DATA[k.char]) ? KANJI_DATA[k.char] : null;

      if (kData) {
        const onList = (kData.on || '').split(',').map(s => toHira(s.trim())).filter(Boolean);
        const kunList = (kData.kun || '').split(',').map(s => s.split('・')[0].trim().replace(/^-|-$/g, '')).filter(Boolean);

        if (kanjiPartReading) {
          if (onList.includes(kanjiPartReading) || onList.some(o => kanjiPartReading.startsWith(o))) {
            return {
              type: 'on',
              badge: '📖 Âm On (Hán Nhật)',
              rule: `Từ ngoại lai Katakana kết hợp hậu tố chữ Hán [${k.char}: ${kanjiPartReading}] → Chữ Hán đọc theo âm On (Hán - Nhật).`
            };
          }
          if (kunList.includes(kanjiPartReading) || kunList.some(ku => kanjiPartReading.startsWith(ku))) {
            return {
              type: 'kun',
              badge: '🌸 Âm Kun (Thuần Nhật)',
              rule: `Từ ngoại lai Katakana kết hợp hậu tố chữ Hán [${k.char}: ${kanjiPartReading}] → Chữ Hán đọc theo âm Kun (Thuần Nhật).`
            };
          }
        }
      }

      // Nhận diện theo nhóm hậu tố phổ biến
      if (word.endsWith('語')) {
        return {
          type: 'on',
          badge: '📖 Âm On (Hán Nhật)',
          rule: 'Hậu tố chỉ ngôn ngữ [語: ご] gắn sau tên quốc gia luôn đọc theo âm On (Hán - Nhật).'
        };
      }
      if (word.endsWith('人')) {
        return {
          type: 'on',
          badge: '📖 Âm On (Hán Nhật)',
          rule: 'Hậu tố chỉ người/quốc tịch [人: じん] gắn sau tên quốc gia luôn đọc theo âm On (Hán - Nhật).'
        };
      }
      if (/(化|的|製|産|式|界|場|街|線|便|缶|瓶)$/.test(word)) {
        return {
          type: 'on',
          badge: '📖 Âm On (Hán Nhật)',
          rule: 'Hậu tố Hán - Nhật đi kèm từ mượn Katakana thường đọc theo âm On.'
        };
      }
      if (/(屋|味|箱|窓)$/.test(word)) {
        return {
          type: 'kun',
          badge: '🌸 Âm Kun (Thuần Nhật)',
          rule: 'Hậu tố thuần Nhật đi kèm từ Katakana đọc theo âm Kun.'
        };
      }

      return {
        type: 'on',
        badge: '📖 Âm On (Hán Nhật)',
        rule: 'Chữ Hán đóng vai trò hậu tố ghép sau từ Katakana thường đọc theo âm On (Hán - Nhật).'
      };
    }

    // 3. Kanji đi kèm đuôi biến đổi Hiragana (Okurigana) thực thụ (ví dụ: 食べる, 読み方, 美しい)
    // Okurigana là chữ Hiragana đi liền sau chữ Hán: /[一-龯][\u3040-\u309F]/
    const hasOkurigana = /[一-龯][\u3040-\u309F]/.test(word);
    if (hasOkurigana && kanjiCount >= 1) {
      if (/する$|した$|して$/.test(word)) {
        return {
          type: 'on',
          badge: '📖 Âm On (Hán Nhật)',
          rule: 'Động từ gốc Hán kết hợp trợ động từ biến đổi [する] → Chữ Hán đọc theo âm On.'
        };
      }
      return {
        type: 'kun',
        badge: '🌸 Âm Kun (Thuần Nhật)',
        rule: 'Kanji kèm đuôi biến đổi Hiragana (Okurigana) → Chữ Hán đọc theo âm Kun.'
      };
    }

    // 4. Kanji có tiền tố Hiragana đứng trước (ví dụ: お茶, ご案内, お酒, みそ汁)
    const hasHiraganaPrefix = /^[\u3040-\u309F]+[一-龯]/.test(word);
    if (hasHiraganaPrefix && kanjiCount >= 1 && reading) {
      const prefixMatch = word.match(/^([\u3040-\u309F]+)/);
      const prefix = prefixMatch ? prefixMatch[1] : '';
      let kanjiPartReading = reading;
      if (prefix && reading.startsWith(prefix)) {
        kanjiPartReading = reading.slice(prefix.length);
      }
      const k = kanjiList[0];
      const kData = (typeof KANJI_DATA !== 'undefined' && KANJI_DATA[k.char]) ? KANJI_DATA[k.char] : null;
      if (kData && kanjiPartReading) {
        const onList = (kData.on || '').split(',').map(s => toHira(s.trim())).filter(Boolean);
        const kunList = (kData.kun || '').split(',').map(s => s.split('・')[0].trim().replace(/^-|-$/g, '')).filter(Boolean);
        if (onList.includes(kanjiPartReading) || onList.some(o => kanjiPartReading.startsWith(o))) {
          return {
            type: 'on',
            badge: '📖 Âm On (Hán Nhật)',
            rule: `Chữ Hán kèm tiền tố kính ngữ [${word}] đọc theo âm On [${k.char}: ${kanjiPartReading}].`
          };
        }
        if (kunList.includes(kanjiPartReading) || kunList.some(ku => kanjiPartReading.startsWith(ku))) {
          return {
            type: 'kun',
            badge: '🌸 Âm Kun (Thuần Nhật)',
            rule: `Chữ Hán kèm tiền tố kính ngữ [${word}] đọc theo âm Kun [${k.char}: ${kanjiPartReading}].`
          };
        }
      }
    }

    // 3. Chữ Kanji đơn lẻ đứng một mình (1 chữ)
    if (kanjiCount === 1) {
      if (contextText && /[きいくるいたたてない]/.test(contextText)) {
        return {
          type: 'kun',
          badge: '🌸 Âm Kun (Thuần Nhật)',
          rule: 'Kanji gốc có phần đuôi biến đổi Hiragana (Tính từ/Động từ) → Dùng âm Kun.'
        };
      }

      const k = kanjiList[0];
      const kData = (typeof KANJI_DATA !== 'undefined' && KANJI_DATA[k.char]) ? KANJI_DATA[k.char] : null;
      if (kData && reading) {
        const onList = (kData.on || '').split(',').map(s => typeof katakanaToHiragana === 'function' ? katakanaToHiragana(s.trim()) : s.trim());
        const kunList = (kData.kun || '').split(',').map(s => s.split('・')[0].trim().replace(/^-|-$/g, ''));

        if (kunList.includes(reading)) {
          return {
            type: 'kun',
            badge: '🌸 Âm Kun (Thuần Nhật)',
            rule: `Chữ Hán đứng đơn lẻ đọc theo âm Kun [${k.char}: ${reading}].`
          };
        }
        if (onList.includes(reading)) {
          return {
            type: 'on',
            badge: '📖 Âm On (Hán)',
            rule: `Chữ Hán đọc theo âm On [${k.char}: ${reading}].`
          };
        }
      }

      return {
        type: 'kun',
        badge: '🌸 Âm Kun (Thuần Nhật)',
        rule: 'Danh từ đơn đứng độc lập một mình thường dùng âm Kun.'
      };
    }

    // 4. Từ ghép 2 chữ Kanji (Phân loại chính xác On-On, Kun-Kun, Jubako, Yuto)
    if (kanjiCount === 2 && reading && typeof KANJI_DATA !== 'undefined') {
      const char1 = kanjiList[0].char;
      const char2 = kanjiList[1].char;
      const k1 = KANJI_DATA[char1];
      const k2 = KANJI_DATA[char2];

      if (k1 && k2) {
        const toHira = (s) => (typeof katakanaToHiragana === 'function' ? katakanaToHiragana(s) : s);

        const rendaku = (hira) => {
          if (!hira) return [];
          const res = [hira];
          const map = {
            'か': 'が', 'き': 'ぎ', 'く': 'ぐ', 'け': 'げ', 'こ': 'ご',
            'さ': 'ざ', 'し': 'じ', 'す': 'ず', 'せ': 'ぜ', 'そ': 'ぞ',
            'た': 'だ', 'ち': 'ぢ', 'つ': 'づ', 'て': 'で', 'と': 'ど',
            'は': 'ば', 'ひ': 'び', 'ふ': 'ぶ', 'へ': 'べ', 'ほ': 'ぼ'
          };
          const mapPa = { 'は': 'ぱ', 'ひ': 'ぴ', 'ふ': 'ぷ', 'へ': 'ぺ', 'ほ': 'ぽ' };
          const first = hira[0];
          const rest = hira.slice(1);
          if (map[first]) res.push(map[first] + rest);
          if (mapPa[first]) res.push(mapPa[first] + rest);
          return res;
        };

        const sokuon = (hira) => {
          if (!hira) return [];
          const res = [hira];
          if (hira.endsWith('つ') || hira.endsWith('く') || hira.endsWith('ち')) {
            res.push(hira.slice(0, -1) + 'っ');
          }
          return res;
        };

        const k1On = (k1.on || '').split(',').flatMap(s => sokuon(toHira(s.trim()))).filter(Boolean);
        const k1Kun = (k1.kun || '').split(',').flatMap(s => rendaku(s.split('・')[0].trim().replace(/^-|-$/g, ''))).filter(Boolean);

        const k2On = (k2.on || '').split(',').flatMap(s => rendaku(toHira(s.trim()))).filter(Boolean);
        const k2Kun = (k2.kun || '').split(',').flatMap(s => rendaku(s.split('・')[0].trim().replace(/^-|-$/g, ''))).filter(Boolean);

        for (let splitIdx = 1; splitIdx < reading.length; splitIdx++) {
          const p1 = reading.slice(0, splitIdx);
          const p2 = reading.slice(splitIdx);

          const p1IsOn = k1On.includes(p1);
          const p1IsKun = k1Kun.includes(p1);
          const p2IsOn = k2On.includes(p2);
          const p2IsKun = k2Kun.includes(p2);

          // Kun + Kun (Thuần Nhật - Wago) -> VÍ DỤ: 友達 (とも + だち), 手紙 (て + がみ), 花火 (はな + び)
          if (p1IsKun && p2IsKun) {
            return {
              type: 'kun',
              badge: '🌸 Âm Kun (Thuần Nhật)',
              rule: `Từ ghép thuần Nhật (和語): Cả 2 chữ Hán đều đọc theo âm Kun [${char1}: ${p1} + ${char2}: ${p2}].`
            };
          }

          // On + On (Hán Nhật - Kango) -> VÍ DỤ: 勉強 (べん + きょう), 学校 (がっ + こう), 日本 (に + ほん)
          if (p1IsOn && p2IsOn) {
            return {
              type: 'on',
              badge: '📖 Âm On (Hán Nhật)',
              rule: `Từ Hán-Nhật (漢語): Cả 2 chữ Hán đều đọc theo âm On [${char1}: ${p1} + ${char2}: ${p2}].`
            };
          }

          // On + Kun (Jūbako) -> VÍ DỤ: 本屋 (ほん + や), 役場 (やく + ば)
          if (p1IsOn && p2IsKun) {
            return {
              type: 'jubako',
              badge: '🔀 Ghép On - Kun (重箱)',
              rule: `Quy tắc Jūbako (重箱読み): Chữ đầu [${char1}] đọc âm On, chữ sau [${char2}] đọc âm Kun.`
            };
          }

          // Kun + On (Yutō) -> VÍ DỤ: 場所 (ば + しょ), 夕刊 (ゆう + かん)
          if (p1IsKun && p2IsOn) {
            return {
              type: 'yuto',
              badge: '🔀 Ghép Kun - On (湯桶)',
              rule: `Quy tắc Yutō (湯桶読み): Chữ đầu [${char1}] đọc âm Kun, chữ sau [${char2}] đọc âm On.`
            };
          }
        }
      }
    }

    // 5. Mặc định cho từ ghép nhiều Kanji chưa xác định
    if (!hasKana && kanjiCount >= 2) {
      return {
        type: 'on',
        badge: '📖 Âm On (Hán Nhật)',
        rule: 'Từ ghép nhiều chữ Kanji đứng liền nhau thường đọc theo âm On (Hán).'
      };
    }

    return null;
  }

  /**
   * Phân tích Ngữ pháp chi tiết theo ngữ cảnh từ và trợ từ đi kèm
   */
  analyzeGrammarContext(word, dictEntry, contextAfter = '') {
    let partOfSpeech = '';
    let form = '';
    const tags = [];

    if (dictEntry) {
      partOfSpeech = dictEntry.type || '';
      form = dictEntry.grammarForm || 'Nguyên mẫu (辞書形)';
      if (dictEntry.grammarTags && dictEntry.grammarTags.length > 0) {
        tags.push(...dictEntry.grammarTags);
      }
    }

    // Nhận diện trợ từ hoặc đuôi câu đi liền sau từ trong ngữ cảnh
    if (contextAfter) {
      const matchPrt = contextAfter.match(/^\s*(は|が|を|に|で|へ|と|から|まで|より|ので|のに|です|でした|だ|だった)/);
      if (matchPrt && matchPrt[1]) {
        const prt = matchPrt[1];
        const particleMap = {
          'は': 'Trợ từ [は]: Đánh dấu Chủ ngữ / Chủ đề câu',
          'が': 'Trợ từ [が]: Đánh dấu Chủ ngữ trực tiếp',
          'を': 'Trợ từ [を]: Đánh dấu Tân ngữ nhận hành động',
          'に': 'Trợ từ [に]: Chỉ Nơi chốn / Thời gian / Mục đích',
          'で': 'Trợ từ [で]: Chỉ Nơi diễn ra hành động / Phương tiện',
          'へ': 'Trợ từ [へ]: Chỉ Hướng di chuyển',
          'と': 'Trợ từ [と]: Mang nghĩa "Và" / "Cùng với"',
          'から': 'Trợ từ [から]: Điểm bắt đầu / "Vì vậy"',
          'まで': 'Trợ từ [まで]: Giới hạn "Đến tận"',
          'です': 'Đuôi câu [+ です]: Khẳng định lịch sự',
          'でした': 'Đuôi câu [+ でした]: Khẳng định quá khứ lịch sự'
        };
        if (particleMap[prt]) {
          tags.push(particleMap[prt]);
        }
      }
    }

    return {
      partOfSpeech: partOfSpeech,
      form: form,
      grammarTags: tags
    };
  }

  /**
   * Chuyển đổi số nguyên sang phiên âm Hiragana chuẩn xác (hỗ trợ số từ 0 đến 99.999.999)
   */
  numberToHiragana(num) {
    num = parseInt(num, 10);
    if (isNaN(num) || num < 0) return '';
    if (num === 0) return 'れい';

    const units = ['', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
    const tens = ['', 'じゅう', 'にじゅう', 'さんじゅう', 'よんじゅう', 'ごじゅう', 'ろくじゅう', 'ななじゅう', 'はちじゅう', 'きゅうじゅう'];
    const hundreds = ['', 'ひゃく', 'にひゃく', 'さんびゃく', 'よんひゃく', 'ごひゃく', 'ろっぴゃく', 'ななひゃく', 'はっぴゃく', 'きゅうひゃく'];
    const thousands = ['', 'せん', 'にせん', 'さんぜん', 'よんせん', 'ごせん', 'ろくせん', 'ななせん', 'はっせん', 'きゅうせん'];

    if (num < 10) return units[num];
    if (num < 100) {
      const t = Math.floor(num / 10);
      const u = num % 10;
      return tens[t] + units[u];
    }
    if (num < 1000) {
      const h = Math.floor(num / 100);
      const rem = num % 100;
      return hundreds[h] + (rem > 0 ? this.numberToHiragana(rem) : '');
    }
    if (num < 10000) {
      const th = Math.floor(num / 1000);
      const rem = num % 1000;
      return thousands[th] + (rem > 0 ? this.numberToHiragana(rem) : '');
    }
    if (num < 100000000) {
      const man = Math.floor(num / 10000);
      const rem = num % 10000;
      return (man === 1 ? 'いちまん' : this.numberToHiragana(man) + 'まん') + (rem > 0 ? this.numberToHiragana(rem) : '');
    }
    return String(num);
  }

  /**
   * Phân tích và đọc số đếm & lượng từ động kèm cách đọc Kana chính xác (Dynamic Japanese Number & Counter Parser)
   */
  parseNumberAndCounter(word, fullText = '', offset = 0) {
    if (!word) return null;

    // Pattern: [Số] + [Lượng từ]
    const match = word.match(/^(\d+|[一二三四五六七八九十百千万億兆]+)(つ|人|日|月|年|時|分|秒|歳|才|本|枚|冊|台|匹|頭|階|杯|足|回|番|円|個|軒|着|通)?$/);
    if (!match) return null;

    const numRaw = match[1];
    const counter = match[2] || '';

    // Chuyển đổi số sang số nguyên
    const kanjiDigitMap = { '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 10, '百': 100, '千': 1000, '万': 10000 };
    let numVal = parseInt(numRaw, 10);
    if (isNaN(numVal)) {
      if (kanjiDigitMap[numRaw]) numVal = kanjiDigitMap[numRaw];
      else if (numRaw.startsWith('十') && numRaw.length === 2) numVal = 10 + (kanjiDigitMap[numRaw[1]] || 0);
      else if (numRaw.endsWith('十') && numRaw.length === 2) numVal = (kanjiDigitMap[numRaw[0]] || 1) * 10;
      else numVal = 1;
    }

    const contextBefore = fullText ? fullText.slice(0, offset).trim() : '';
    const contextAfter = fullText ? fullText.slice(offset + word.length).trim() : '';

    let reading = '';
    let speechText = '';
    let pronunciationNote = '';

    // Bảng xử lý âm đọc chuyên sâu cho Lượng từ & Số đếm thuần Hiragana
    if (counter === '円') {
      reading = this.numberToHiragana(numVal) + 'えん';
      speechText = reading;
    } else if (counter === '年') {
      reading = (numVal === 4 ? 'よねん' : this.numberToHiragana(numVal) + 'ねん');
      speechText = reading;
    } else if (counter === '月') {
      const monthMap = {
        1: 'いちがつ', 2: 'にがつ', 3: 'さんがつ', 4: 'しがつ', 5: 'ごがつ', 6: 'ろくがつ',
        7: 'しちがつ', 8: 'はちがつ', 9: 'くがつ', 10: 'じゅうがつ', 11: 'じゅういちがつ', 12: 'じゅうにがつ'
      };
      reading = monthMap[numVal] || (this.numberToHiragana(numVal) + 'がつ');
      speechText = reading;
      if (numVal === 4) pronunciationNote = '💡 Tháng 4 phát âm chuẩn là [しがつ] (shigatsu), KHÔNG đọc là [よんがつ].';
      if (numVal === 7) pronunciationNote = '💡 Tháng 7 phát âm chuẩn là [しちがつ] (shichigatsu), KHÔNG đọc là [なながつ].';
      if (numVal === 9) pronunciationNote = '💡 Tháng 9 phát âm chuẩn là [くがつ] (kugatsu), KHÔNG đọc là [きゅうがつ].';
    } else if (counter === '日') {
      const dayMap = {
        1: 'ついたち', 2: 'ふつか', 3: 'みっか', 4: 'よっか', 5: 'いつか', 6: 'むいか',
        7: 'なのか', 8: 'ようか', 9: 'ここのか', 10: 'とおか', 14: 'じゅうよっか',
        20: 'はつか', 24: 'にじゅうよっか'
      };
      if (numVal === 1) {
        const isDuration = /^[間中で]|^[0-9０-９一二三四五六七八九十]+(回|度|杯|個)|^あたり|^おき/.test(contextAfter) || /(丸|この|その|あと|もう)$/.test(contextBefore);
        const isMonthDate = /(月|がつき|毎月|今月|来月)$/.test(contextBefore) || /^(の朝|の夜|の午前|の午後|から)/.test(contextAfter);

        if (isDuration) {
          reading = 'いちにち';
          speechText = 'いちにち';
          pronunciationNote = '💡 Khoảng thời gian một ngày (đo lường, tần suất) đọc chuẩn là [いちにち] (ichinichi).';
        } else if (isMonthDate) {
          reading = 'ついたち';
          speechText = 'ついたち';
          pronunciationNote = '💡 Ngày mùng 1 trong tháng đọc chuẩn là [ついたち] (tsuitachi).';
        } else {
          reading = 'ついたち';
          speechText = 'ついたち';
          pronunciationNote = '💡 [1日 / 一日]: Đọc là [ついたち] (tsuitachi) khi chỉ ngày mùng 1 đầu tháng. Khi chỉ khoảng thời gian (1 ngày) đọc là [いちにち] (ichinichi).';
        }
      } else if (dayMap[numVal]) {
        reading = dayMap[numVal];
        speechText = reading;
        if (numVal === 4 || numVal === 14 || numVal === 24) {
          pronunciationNote = `💡 Ngày ${numVal} đọc chuẩn theo quy tắc ngày tháng là [${reading}], KHÔNG đọc là [にち].`;
        } else if (numVal === 20) {
          pronunciationNote = '💡 Ngày 20 trong tháng đọc đặc biệt là [はつか] (hatsuka).';
        }
      } else {
        reading = `${this.numberToHiragana(numVal)}にち`;
        speechText = reading;
      }
    } else if (counter === '時') {
      const hourMap = {
        1: 'いちじ', 2: 'にじ', 3: 'さんじ', 4: 'よじ', 5: 'ごじ', 6: 'ろくじ',
        7: 'しちじ', 8: 'はちじ', 9: 'くじ', 10: 'じゅうじ', 11: 'じゅういちじ', 12: 'じゅうにじ'
      };
      reading = hourMap[numVal] || `${this.numberToHiragana(numVal)}じ`;
      speechText = reading;
      if (numVal === 4) pronunciationNote = '💡 4 giờ phát âm chuẩn là [よじ] (yoji), KHÔNG đọc là [よんじ] hay [しじ].';
      if (numVal === 9) pronunciationNote = '💡 9 giờ phát âm chuẩn là [くじ] (kuji), KHÔNG đọc là [きゅうじ].';
    } else if (counter === '人') {
      if (numVal === 1) {
        reading = 'ひとり';
        speechText = 'ひとり';
        pronunciationNote = '💡 1 người đọc đặc biệt là [ひとり] (hitori).';
      } else if (numVal === 2) {
        reading = 'ふたり';
        speechText = 'ふたり';
        pronunciationNote = '💡 2 người đọc đặc biệt là [ふたり] (futari).';
      } else if (numVal === 4) {
        reading = 'よにん';
        speechText = 'よにん';
        pronunciationNote = '💡 4 người phát âm chuẩn là [よにん] (yonin), KHÔNG đọc là [よんにん] hay [しにん].';
      } else {
        reading = `${this.numberToHiragana(numVal)}にん`;
        speechText = reading;
      }
    } else if (counter === '歳' || counter === '才') {
      if (numVal === 20) {
        reading = 'はたち';
        speechText = 'はたち';
        pronunciationNote = '💡 20 tuổi (tuổi trưởng thành) trong tiếng Nhật đọc đặc biệt là [はたち] (hatachi).';
      } else if (numVal === 1) {
        reading = 'いっさい';
        speechText = reading;
      } else if (numVal === 8) {
        reading = 'はっさい';
        speechText = reading;
      } else if (numVal === 10) {
        reading = 'じゅっさい';
        speechText = reading;
      } else {
        reading = `${this.numberToHiragana(numVal)}さい`;
        speechText = reading;
      }
    } else if (counter === 'つ') {
      const tsuMap = {
        1: 'ひとつ', 2: 'ふたつ', 3: 'みっつ', 4: 'よっつ', 5: 'いつつ',
        6: 'むっつ', 7: 'ななつ', 8: 'やっつ', 9: 'ここのつ', 10: 'とお'
      };
      if (tsuMap[numVal]) {
        reading = tsuMap[numVal];
        speechText = reading;
        pronunciationNote = `💡 Đếm đồ vật thuần Nhật: [${reading}] (${numVal} cái).`;
      }
    } else if (counter === '分') {
      const punMap = { 1: 'いっぷん', 2: 'にふん', 3: 'さんぷん', 4: 'よんぷん', 5: 'ごふん', 6: 'ろっぷん', 7: 'ななふん', 8: 'はっぷん', 9: 'きゅうふん', 10: 'じゅっぷん' };
      if (punMap[numVal]) {
        reading = punMap[numVal];
        speechText = reading;
      } else {
        reading = `${this.numberToHiragana(numVal)}ふん`;
        speechText = reading;
      }
    } else if (counter === '本') {
      const honMap = { 1: 'いっぽん', 2: 'にほん', 3: 'さんぼん', 4: 'よんほん', 5: 'ごほん', 6: 'ろっぽん', 7: 'ななほん', 8: 'はっぽん', 9: 'きゅうほん', 10: 'じゅっぽん' };
      if (honMap[numVal]) {
        reading = honMap[numVal];
        speechText = reading;
      } else {
        reading = `${this.numberToHiragana(numVal)}ほん`;
        speechText = reading;
      }
    } else if (counter === '杯') {
      const haiMap = { 1: 'いっぱい', 2: 'にはい', 3: 'さんばい', 6: 'ろっぱい', 8: 'はっぱい', 10: 'じゅっぱい' };
      if (haiMap[numVal]) {
        reading = haiMap[numVal];
        speechText = reading;
      } else {
        reading = `${this.numberToHiragana(numVal)}はい`;
        speechText = reading;
      }
    } else if (counter === '匹') {
      const hikiMap = { 1: 'いっぴき', 2: 'にひき', 3: 'さんびき', 6: 'ろっぴき', 8: 'はっぴき', 10: 'じゅっぴき' };
      if (hikiMap[numVal]) {
        reading = hikiMap[numVal];
        speechText = reading;
      } else {
        reading = `${this.numberToHiragana(numVal)}ひき`;
        speechText = reading;
      }
    } else if (counter === '秒') {
      reading = `${this.numberToHiragana(numVal)}びょう`;
      speechText = reading;
    } else if (counter === '枚') {
      reading = `${this.numberToHiragana(numVal)}まい`;
      speechText = reading;
    } else if (counter === '台') {
      reading = `${this.numberToHiragana(numVal)}だい`;
      speechText = reading;
    } else if (counter === '冊') {
      if (numVal === 1) reading = 'いっさつ';
      else if (numVal === 8) reading = 'はっさつ';
      else if (numVal === 10) reading = 'じゅっさつ';
      else reading = `${this.numberToHiragana(numVal)}さつ`;
      speechText = reading;
    } else if (counter === '階') {
      if (numVal === 1) reading = 'いっかい';
      else if (numVal === 3) reading = 'さんがい';
      else if (numVal === 6) reading = 'ろっかい';
      else if (numVal === 8) reading = 'はっかい';
      else if (numVal === 10) reading = 'じゅっかい';
      else reading = `${this.numberToHiragana(numVal)}かい`;
      speechText = reading;
    } else if (counter === '個') {
      if (numVal === 1) reading = 'いっこ';
      else if (numVal === 6) reading = 'ろっこ';
      else if (numVal === 8) reading = 'はっこ';
      else if (numVal === 10) reading = 'じゅっこ';
      else reading = `${this.numberToHiragana(numVal)}こ`;
      speechText = reading;
    } else if (counter === '回') {
      if (numVal === 1) reading = 'いっかい';
      else if (numVal === 6) reading = 'ろっかい';
      else if (numVal === 8) reading = 'はっかい';
      else if (numVal === 10) reading = 'じゅっかい';
      else reading = `${this.numberToHiragana(numVal)}かい`;
      speechText = reading;
    } else if (counter === '番') {
      reading = `${this.numberToHiragana(numVal)}ばん`;
      speechText = reading;
    } else if (counter) {
      reading = `${this.numberToHiragana(numVal)}${counter}`;
      speechText = reading;
    } else {
      reading = this.numberToHiragana(numVal);
      speechText = reading;
    }

    // Bảng lượng từ và ý nghĩa
    const counterDescriptions = {
      'つ': { unit: 'cái / chiếc', desc: 'Đếm đồ vật tổng quát (Thuần Nhật)' },
      '人': { unit: 'người', desc: 'Đếm số lượng người' },
      '日': { unit: 'ngày / mùng', desc: 'Đếm ngày trong tháng hoặc số ngày' },
      '月': { unit: 'tháng', desc: 'Tháng trong năm' },
      '年': { unit: 'năm', desc: 'Năm / Số năm' },
      '時': { unit: 'giờ', desc: 'Thời gian (giờ)' },
      '分': { unit: 'phút', desc: 'Thời gian (phút)' },
      '秒': { unit: 'giây', desc: 'Thời gian (giây)' },
      '歳': { unit: 'tuổi', desc: 'Đếm tuổi' },
      '才': { unit: 'tuổi', desc: 'Đếm tuổi' },
      '本': { unit: 'chai / cây / que', desc: 'Đếm vật thon dài (bút, chai, cây)' },
      '枚': { unit: 'tờ / chiếc / đĩa', desc: 'Đếm vật mỏng phẳng (giấy, áo, vé)' },
      '冊': { unit: 'cuốn / quyển', desc: 'Đếm sách, vở, tạp chí' },
      '台': { unit: 'chiếc / cái', desc: 'Đếm xe cộ, máy móc, đồ điện tử' },
      '匹': { unit: 'con', desc: 'Đếm động vật nhỏ, cá, côn trùng' },
      '頭': { unit: 'con', desc: 'Đếm động vật lớn (bò, voi, ngựa)' },
      '階': { unit: 'tầng', desc: 'Đếm tầng lầu tòa nhà' },
      '杯': { unit: 'cốc / ly / bát', desc: 'Đếm đồ uống đựng trong cốc/chén' },
      '足': { unit: 'đôi', desc: 'Đếm giày, dép, tất' },
      '回': { unit: 'lần', desc: 'Đếm số lần thực hiện hành động' },
      '番': { unit: 'số / thứ tự', desc: 'Số thứ tự' },
      '円': { unit: 'Yên', desc: 'Đơn vị tiền tệ Nhật Bản' },
      '個': { unit: 'cái / quả', desc: 'Đếm đồ vật nhỏ, quả' },
      '軒': { unit: 'căn / ngôi', desc: 'Đếm nhà, quán xá' },
      '着': { unit: 'bộ', desc: 'Đếm bộ quần áo' },
      '通': { unit: 'lá / bức', desc: 'Đếm thư từ, email' }
    };

    if (counter && counterDescriptions[counter]) {
      const cInfo = counterDescriptions[counter];
      return {
        word: word,
        reading: reading || word,
        speechText: speechText || reading || word,
        pronunciationNote: pronunciationNote,
        type: `Số từ (Đếm ${cInfo.unit})`,
        meaning: `${numRaw} ${cInfo.unit} [${cInfo.desc}]`,
        grammarForm: `Số từ + Lượng từ [${counter}]`
      };
    } else if (!counter) {
      return {
        word: word,
        reading: reading || word,
        speechText: speechText || reading || word,
        pronunciationNote: pronunciationNote,
        type: 'Số đếm',
        meaning: `Số ${numRaw}`,
        grammarForm: 'Số đếm cơ bản'
      };
    }

    return null;
  }

  /**
   * Phân tích và giải quyết cách đọc & phát âm chuẩn theo ngữ cảnh câu (Contextual Heteronyms & Pronunciation)
   */
  resolveContextualPronunciation(cleanWord, fullText = '', offset = 0, dictEntry = null) {
    const contextBefore = fullText ? fullText.slice(0, offset).trim() : '';
    const contextAfter = fullText ? fullText.slice(offset + cleanWord.length).trim() : '';

    // 1. Chữ 何 (なに vs なん) và các cụm từ phổ biến
    if (cleanWord === '何です') {
      return {
        reading: 'なんです',
        romaji: 'nandesu',
        speechText: 'なんです',
        pronunciationNote: '💡 [何]: Đứng trước [です], phát âm chuẩn là [なん] (nan).'
      };
    }
    if (cleanWord === '何で') {
      return {
        reading: 'なんで',
        romaji: 'nande',
        speechText: 'なんで',
        type: 'Phó từ / Nghi vấn từ N5',
        meaning: 'Tại sao? / Bằng phương tiện gì?',
        pronunciationNote: '💡 [何で]: Phát âm chuẩn là [なんで] (nande), mang nghĩa Tại sao hoặc Bằng cái gì.'
      };
    }
    if (cleanWord === '何と') {
      return {
        reading: 'なんと',
        romaji: 'nanto',
        speechText: 'なんと',
        type: 'Phó từ N3',
        meaning: 'Cái gì / Xiết bao, biết bao (thán từ nhấn mạnh)'
      };
    }
    if (cleanWord === '何故') {
      return {
        reading: 'なぜ',
        romaji: 'naze',
        speechText: 'なぜ',
        type: 'Phó từ N4',
        meaning: 'Tại sao? Vì sao?',
        pronunciationNote: '💡 [何故]: Đọc chuẩn là [なぜ] (naze), không đọc theo âm ghép đơn lẻ.'
      };
    }
    if (cleanWord === '何') {
      if (/^(で|だ|です|と|の|に|様|よう|気|故)/.test(contextAfter) || /^[人時分日月年歳才回本枚冊台匹個番円階度着杯足軒曜日]/.test(contextAfter)) {
        return {
          reading: 'なん',
          romaji: 'nan',
          speechText: 'なん',
          pronunciationNote: '💡 Trong câu đi trước [です/だ/で/と/の] hoặc Lượng từ, từ [何] phát âm chuẩn là [なん] (nan), không đọc là [なに].'
        };
      }
      if (/^[をがもか]/.test(contextAfter) || !contextAfter || /[、。！？!?\s]/.test(contextAfter[0])) {
        return {
          reading: 'なに',
          romaji: 'nani',
          speechText: 'なに',
          pronunciationNote: '💡 Khi đi trước trợ từ [を/が/も/か] hoặc đứng độc lập, từ [何] phát âm chuẩn là [なに] (nani).'
        };
      }
      return {
        reading: 'なん',
        romaji: 'nan',
        speechText: 'なん'
      };
    }

    // 2. Trợ từ は (wa vs ha)
    if (cleanWord === 'は') {
      if (contextBefore && !/[、。！？!?\s]$/.test(contextBefore)) {
        return {
          reading: 'わ',
          romaji: 'wa',
          speechText: 'わ',
          type: 'Trợ từ N5',
          meaning: 'Trợ từ đánh dấu Chủ đề / Chủ ngữ câu (phát âm là [wa])',
          pronunciationNote: '💡 Trong tiếng Nhật, trợ từ [は] luôn được phát âm là [wa], viết bằng ký tự [ha].'
        };
      }
    }

    // 3. Trợ từ へ (e vs he)
    if (cleanWord === 'へ') {
      if (contextBefore && !/[、。！？!?\s]$/.test(contextBefore)) {
        return {
          reading: 'え',
          romaji: 'e',
          speechText: 'え',
          type: 'Trợ từ N5',
          meaning: 'Trợ từ chỉ Hướng di chuyển "Tới / Đến" (phát âm là [e])',
          pronunciationNote: '💡 Khi đóng vai trò trợ từ chỉ hướng, chữ [へ] luôn được phát âm là [e], không đọc là [he].'
        };
      }
    }

    // 4. Trợ từ を (o vs wo)
    if (cleanWord === 'を') {
      return {
        reading: 'お',
        romaji: 'o',
        speechText: 'お',
        type: 'Trợ từ N5',
        meaning: 'Trợ từ đánh dấu Tân ngữ trực tiếp chịu tác động của hành động',
        pronunciationNote: '💡 Trợ từ [を] được phát âm chuẩn là [o] trong tiếng Nhật hiện đại.'
      };
    }

    // 5. Chữ 方 (かた vs ほう vs がた)
    if (cleanWord === '方') {
      if (/[いきしちにひみりえけせてねへめれ]/.test(contextBefore.slice(-1))) {
        return {
          reading: 'かた',
          romaji: 'kata',
          speechText: 'かた',
          type: 'Hậu tố N4',
          meaning: 'Cách thức thực hiện (Ví dụ: やり方 = cách làm, 読み方 = cách đọc)',
          pronunciationNote: '💡 Đi sau động từ thể ます (bỏ ます), chữ [方] đọc là [かた] (kata) mang nghĩa "Cách làm gì".'
        };
      }
      if (/(先生|皆様|親|友人|親族|ご両親)$/.test(contextBefore)) {
        return {
          reading: 'がた',
          romaji: 'gata',
          speechText: 'がた',
          type: 'Hậu tố kính ngữ N3',
          meaning: 'Các vị, quý vị (hậu tố số nhiều tôn kính)',
          pronunciationNote: '💡 Đứng sau danh từ chỉ người kính cẩn, chữ [方] biến âm thành [がた] (gata).'
        };
      }
      if (/^[がはの]/.test(contextAfter) || /(の|より)$/.test(contextBefore)) {
        return {
          reading: 'ほう',
          romaji: 'hou',
          speechText: 'ほう',
          type: 'Danh từ N5',
          meaning: 'Phía, bên, phương diện so sánh (Ví dụ: こちらの方, リンゴの方が好き)',
          pronunciationNote: '💡 Trong cấu trúc so sánh hoặc chỉ phương hướng, chữ [方] đọc là [ほう] (hou).'
        };
      }
      return {
        reading: 'かた',
        romaji: 'kata',
        speechText: 'かた',
        type: 'Danh từ N5',
        meaning: 'Vị này, ngài ấy (cách gọi người tôn kính)',
        pronunciationNote: '💡 Khi chỉ người một cách lịch sự, chữ [方] đọc là [かた] (kata).'
      };
    }

    // 6. Chữ 時 (とき vs じ)
    if (cleanWord === '時') {
      if (/(た|る|ない|い|だ|の)$/.test(contextBefore)) {
        return {
          reading: 'とき',
          romaji: 'toki',
          speechText: 'とき',
          type: 'Danh từ N5',
          meaning: 'Thời gian, khi, lúc (Ví dụ: 子供の時, 行った時)',
          pronunciationNote: '💡 Đứng sau mệnh đề động từ hoặc danh từ + の, chữ [時] đọc là [とき] (toki).'
        };
      }
      if (/^[0-9０-９一二三四五六七八九十]+$/.test(contextBefore.slice(-1))) {
        return {
          reading: 'じ',
          romaji: 'ji',
          speechText: 'じ',
          type: 'Lượng từ N5',
          meaning: 'Giờ (đơn vị thời gian)'
        };
      }
    }

    // 7. Chữ 日 (ひ vs にち vs ついたち)
    if (cleanWord === '日') {
      if (/(月|がつき)$/.test(contextBefore) && /1$/.test(contextBefore)) {
        return {
          reading: 'ついたち',
          romaji: 'tsuitachi',
          speechText: 'ついたち',
          pronunciationNote: '💡 Ngày mùng 1 trong tháng đọc là [ついたち] (tsuitachi).'
        };
      }
      if (/(その|ある|この|あの日)$/.test(contextBefore + cleanWord) || !contextBefore) {
        return {
          reading: 'ひ',
          romaji: 'hi',
          speechText: 'ひ',
          meaning: 'Ngày, ban ngày, mặt trời'
        };
      }
    }

    // 8. Chữ 行く (いく vs ゆく)
    if (cleanWord === '行く') {
      return {
        reading: 'いく',
        romaji: 'iku',
        speechText: 'いく',
        pronunciationNote: '💡 Trong khẩu ngữ và văn viết hiện đại, [行く] phát âm chuẩn là [いく] (iku), trong văn thơ / trang trọng có thể đọc là [ゆく] (yuku).'
      };
    }

    // 9. Nghi vấn từ 何人 (なんにん vs なにじん)
    if (cleanWord === '何人') {
      const isNationality = /(国|国籍|外国人|ベトナム|アメリカ|中国|韓国|フランス|イギリス|ロシア|(彼|彼女|あの人|あの方|方|誰|だれ|出身)[はが]?)$/.test(contextBefore) || /^[のな]/.test(contextAfter);
      if (isNationality) {
        return {
          reading: 'なにじん',
          romaji: 'nanijin',
          speechText: 'なにじん',
          type: 'Nghi vấn từ N5',
          meaning: 'Người nước nào? Quốc tịch nào?',
          pronunciationNote: '💡 [何人]: Khi hỏi về quốc tịch đọc là [なにじん] (nani-jin). Khi hỏi về số lượng người đọc là [なんにん] (nan-nin).'
        };
      } else {
        return {
          reading: 'なんにん',
          romaji: 'nannin',
          speechText: 'なんにん',
          type: 'Nghi vấn từ N5',
          meaning: 'Mấy người? Bao nhiêu người?',
          pronunciationNote: '💡 [何人]: Khi hỏi về số lượng người phát âm chuẩn là [なんにん] (nan-nin). Khi hỏi quốc tịch đọc là [なにじん] (nani-jin).'
        };
      }
    }

    // 10. Chữ 一日 / 1日 (ついたち vs いちにち)
    if (cleanWord === '一日' || cleanWord === '1日') {
      const isDuration = /^[間中で]|^[0-9０-９一二三四五六七八九十]+(回|度|杯|個)|^あたり|^おき/.test(contextAfter) || /(丸|この|その|あと|もう)$/.test(contextBefore);
      const isMonthDate = /(月|がつき|毎月|今月|来月)$/.test(contextBefore) || /^(の朝|の夜|の午前|の午後|から)/.test(contextAfter);

      if (isDuration) {
        return {
          reading: 'いちにち',
          romaji: 'ichinichi',
          speechText: 'いちにち',
          type: 'Số từ N5',
          meaning: 'Khoảng thời gian 1 ngày / Một ngày',
          pronunciationNote: '💡 [一日]: Khoảng thời gian một ngày (đo lường, tần suất) đọc chuẩn là [いちにち] (ichinichi).'
        };
      } else if (isMonthDate) {
        return {
          reading: 'ついたち',
          romaji: 'tsuitachi',
          speechText: 'ついたち',
          type: 'Số từ N5',
          meaning: 'Ngày mùng 1 đầu tháng',
          pronunciationNote: '💡 [一日]: Ngày mùng 1 trong tháng đọc chuẩn là [ついたち] (tsuitachi).'
        };
      } else {
        return {
          reading: 'ついたち',
          romaji: 'tsuitachi',
          speechText: 'ついたち',
          type: 'Số từ N5',
          meaning: 'Ngày mùng 1 đầu tháng / Khoảng thời gian 1 ngày',
          pronunciationNote: '💡 [一日]: Đọc là [ついたち] (tsuitachi) khi chỉ ngày mùng 1 đầu tháng. Khi chỉ khoảng thời gian (1 ngày) đọc là [いちにち] (ichinichi).'
        };
      }
    }

    // 11. Từ chỉ thời gian thông dụng (明日, 昨日, 今日)
    if (cleanWord === '明日') {
      return {
        reading: 'あした',
        romaji: 'ashita',
        speechText: 'あした',
        pronunciationNote: '💡 [明日]: Khẩu ngữ thường ngày phát âm chuẩn là [あした] (ashita); trong bản tin thời tiết hoặc văn phong trang trọng đọc là [あす] (asu) hoặc [みょうにち] (myounichi).'
      };
    }
    if (cleanWord === '昨日') {
      return {
        reading: 'きのう',
        romaji: 'kinou',
        speechText: 'きのう',
        pronunciationNote: '💡 [昨日]: Khẩu ngữ thường ngày phát âm là [きのう] (kinou); trong văn phong công sở/lịch sự đọc là [さくじつ] (sakujitsu).'
      };
    }
    if (cleanWord === '今日') {
      return {
        reading: 'きょう',
        romaji: 'kyou',
        speechText: 'きょう',
        pronunciationNote: '💡 [今日]: Thường ngày phát âm là [きょう] (kyou); trong chào hỏi nghi thức đọc là [こんにち] (konnichi) hoặc [ほんじつ] (honjitsu).'
      };
    }

    // 12. Từ lặp 々 (Rendaku - Biến âm lặp từ)
    const rendakuMap = {
      '人々': { r: 'ひとびと', note: '💡 Từ lặp chữ Hán: biến âm [ひと] + [ひと] ➔ [ひとびと] (hitobito).' },
      '時々': { r: 'ときどき', note: '💡 Từ lặp chữ Hán: biến âm [とき] + [とき] ➔ [ときどき] (tokidoki).' },
      '日々': { r: 'ひび', note: '💡 Từ lặp chữ Hán: biến âm [ひ] + [ひ] ➔ [ひび] (hibi).' },
      '島々': { r: 'しまじま', note: '💡 Từ lặp chữ Hán: biến âm [しま] + [しま] ➔ [しまじま] (shimajima).' },
      '国々': { r: 'くにぐに', note: '💡 Từ lặp chữ Hán: biến âm [くに] + [くに] ➔ [くにぐに] (kuniguni).' },
      '木々': { r: 'きぎ', note: '💡 Từ lặp chữ Hán: biến âm [き] + [き] ➔ [きぎ] (kigi).' },
      '様々': { r: 'さまざま', note: '💡 Từ lặp: [さまざま] (samazama).' },
      '山々': { r: 'やまやま', note: '💡 Từ lặp: [やまやま] (yamayama).' },
      '近々': { r: 'ちかぢか', note: '💡 Từ lặp: biến âm [ちか] + [ちか] ➔ [ちかぢか] (chikadjika).' },
      '色々': { r: 'いろいろ', note: '💡 Từ lặp: [いろいろ] (iroiro).' }
    };
    if (rendakuMap[cleanWord]) {
      return {
        reading: rendakuMap[cleanWord].r,
        speechText: rendakuMap[cleanWord].r,
        pronunciationNote: rendakuMap[cleanWord].note
      };
    }

    return null;
  }

  /**
   * Phân tích toàn diện từ tiếng Nhật
   * @param {string} word Từ tiếng Nhật
   * @param {string} fullText Đoạn văn bản đầy đủ chứa từ
   * @param {number} offset Vị trí con trỏ
   */
  analyze(word, fullText = '', offset = 0) {
    if (!word) return null;
    const clean = word.trim();
    if (!isJapaneseText(clean)) return null;

    let reading = '';
    let meaning = '';
    let type = '';
    let pitch = null;
    let grammarForm = 'Nguyên mẫu (辞書形)';
    let grammarTags = [];
    const hanviet = typeof getHanViet === 'function' ? getHanViet(clean) : '';
    const kanjiList = typeof decomposeKanji === 'function' ? decomposeKanji(clean) : [];

    let isGrammarPattern = false;
    let grammarBadge = '';
    let speechText = '';
    let pronunciationNote = '';

    // 1. Tra cứu Từ điển nội bộ trước để lấy cách đọc chuẩn xác của toàn bộ từ
    const dictEntry = typeof lookupJapaneseWord === 'function' ? lookupJapaneseWord(clean) : null;
    const grammarMatch = typeof lookupGrammarPattern === 'function' ? lookupGrammarPattern(clean) : null;

    if (dictEntry) {
      reading = dictEntry.reading;
      meaning = dictEntry.meaning;
      type = dictEntry.type || '';
      pitch = dictEntry.pitch;
      grammarForm = dictEntry.grammarForm || 'Nguyên mẫu (辞書形)';
      grammarTags = dictEntry.grammarTags || [];
      if (dictEntry.speechText) speechText = dictEntry.speechText;

      // Nếu từ đồng thời gắn với mẫu ngữ pháp (ví dụ: 飲みやすい có ngữ pháp 〜やすい)
      if (grammarMatch) {
        grammarTags.push(grammarMatch.badge);
        grammarTags.push(`[${grammarMatch.pattern}]: ${grammarMatch.meaning}`);
      }
    } else if (grammarMatch) {
      isGrammarPattern = true;
      reading = grammarMatch.reading || clean;
      meaning = `${grammarMatch.meaning} (${grammarMatch.usage})`;
      type = grammarMatch.badge;
      grammarBadge = grammarMatch.badge;
      grammarForm = `Ngữ pháp ${grammarMatch.level}`;
      grammarTags = [`Mẫu ngữ pháp ${grammarMatch.level}`];
    } else {
      // 1b. Thử phân tích Số đếm & Lượng từ động (Ví dụ: 3人, 100円, 5本, 10分, 20歳, 4日)
      const numInfo = this.parseNumberAndCounter(clean, fullText, offset);
      if (numInfo) {
        meaning = numInfo.meaning;
        type = numInfo.type;
        grammarForm = numInfo.grammarForm;
        reading = numInfo.reading || clean;
        speechText = numInfo.speechText || reading;
        if (numInfo.pronunciationNote) pronunciationNote = numInfo.pronunciationNote;
      } else if (clean.length === 1 && isKanji(clean) && kanjiList.length > 0) {
        // 1c. Xử lý chuẩn cho 1 chữ Kanji đơn lẻ
        const k = kanjiList[0];
        const primaryKun = k.kun ? k.kun.split(',')[0].replace(/[・\s]/g, '').trim() : '';
        const primaryOn = k.on && k.on !== '—' ? katakanaToHiragana(k.on.split(',')[0].trim()) : '';
        
        reading = primaryKun || primaryOn;
        meaning = k.m ? `[Chữ Hán: ${k.hv}]: ${k.m}` : '';
        type = 'Kanji';
      } else {
        // 2. Không có trong từ điển
        const isPureKana = /^[\u3040-\u309F\u30A0-\u30FFー]+$/.test(clean);
        if (isPureKana) {
          reading = typeof katakanaToHiragana === 'function' ? katakanaToHiragana(clean) : clean;
          meaning = '';
          type = (typeof isKatakana === 'function' && isKatakana(clean)) ? 'Katakana' : 'Kana';
        } else {
          // Xử lý từ ghép có cả Kanji và Kana (ví dụ: 子ども, お菓子, 買い物, 乗り物, 読み方, 美しい, フランス語, アメリカ人)
          // Duy trì đúng vị trí của các chữ Kana, không bao giờ được nuốt mất Kana!
          let reconstructed = '';
          const hasHiraganaInside = /[\u3040-\u309F]/.test(clean);
          for (let i = 0; i < clean.length; i++) {
            const ch = clean[i];
            if (typeof isKanji === 'function' && isKanji(ch)) {
              const kData = (typeof KANJI_DATA !== 'undefined' && KANJI_DATA[ch]) ? KANJI_DATA[ch] : null;
              if (kData) {
                const prevChars = clean.slice(0, i);
                const isPrecededByKatakana = /[\u30A0-\u30FFー]$/.test(prevChars);
                const nextChar = (i + 1 < clean.length) ? clean[i + 1] : '';
                const isNextHiragana = nextChar && /[\u3040-\u309F]/.test(nextChar);

                let chosenReading = '';
                if (isNextHiragana && kData.kun) {
                  // Phân tích okurigana stem trước dấu ・ để không bị lặp âm (như 美しい -> うつくしい, không thành うつくしいしい)
                  const kunEntries = kData.kun.split(',').map(s => s.trim());
                  for (const entry of kunEntries) {
                    if (entry.includes('・')) {
                      const [stem, okurigana] = entry.split('・');
                      const cleanStem = stem.replace(/[\s\-]/g, '');
                      const cleanOkuri = okurigana.replace(/[\s\-]/g, '');
                      if (nextChar === cleanOkuri[0] ||
                          (cleanOkuri === 'む' && nextChar === 'み') ||
                          (cleanOkuri === 'く' && nextChar === 'き') ||
                          (cleanOkuri === 'う' && nextChar === 'い') ||
                          (cleanOkuri === 'る' && (nextChar === 'り' || nextChar === 'れ' || nextChar === 'ろ' || nextChar === 'ら')) ||
                          (cleanOkuri === 'す' && nextChar === 'し') ||
                          (cleanOkuri === 'つ' && nextChar === 'ち')) {
                        chosenReading = cleanStem;
                        break;
                      }
                    }
                  }
                  if (!chosenReading) {
                    const firstKun = kunEntries[0];
                    chosenReading = firstKun.includes('・') ? firstKun.split('・')[0].replace(/[\s\-]/g, '') : firstKun.replace(/[\s\-]/g, '');
                  }
                } else if (isPrecededByKatakana) {
                  // Hậu tố gắn sau từ mượn Katakana: phần lớn là hậu tố Hán-Nhật dùng âm On (〜語, 〜人, 〜化, 〜的, 〜製, 〜産...)
                  if (ch === '語') {
                    chosenReading = 'ご';
                  } else if (ch === '人') {
                    chosenReading = 'じん';
                  } else if (ch === '屋') {
                    chosenReading = 'や';
                  } else if (ch === '味') {
                    chosenReading = 'あじ';
                  } else if (ch === '箱') {
                    chosenReading = 'ばこ';
                  } else if (ch === '窓') {
                    chosenReading = 'まど';
                  } else if (kData.on && kData.on !== '—') {
                    chosenReading = typeof katakanaToHiragana === 'function' ? katakanaToHiragana(kData.on.split(',')[0].trim()) : '';
                  } else if (kData.kun) {
                    chosenReading = kData.kun.split(',')[0].replace(/[・\s\-]/g, '').trim();
                  }
                } else if (hasHiraganaInside && kData.kun) {
                  const firstKun = kData.kun.split(',')[0].trim();
                  chosenReading = firstKun.replace(/[・\s\-]/g, '');
                } else if (kData.on && kData.on !== '—') {
                  chosenReading = typeof katakanaToHiragana === 'function' ? katakanaToHiragana(kData.on.split(',')[0].trim()) : '';
                } else if (kData.kun) {
                  chosenReading = kData.kun.split(',')[0].replace(/[・\s\-]/g, '').trim();
                }

                reconstructed += chosenReading || ch;
              } else {
                reconstructed += ch;
              }
            } else {
              reconstructed += typeof katakanaToHiragana === 'function' ? katakanaToHiragana(ch) : ch;
            }
          }

          // Áp dụng các quy tắc biến âm và mẫu hậu tố phổ biến
          if (clean.endsWith('語') && clean.length >= 2) {
            reconstructed = reconstructed.replace(/(かたる|ご)$/, 'ご');
          }
          if (clean.endsWith('方') && /[いきしちにひみりえけせてねへめれべげぜで]/.test(clean[clean.length - 2])) {
            reconstructed = reconstructed.replace(/ほう$/, 'かた');
          }
          if (clean.endsWith('物') && /[いきしちにひみりえけせてねへめれべげぜで]/.test(clean[clean.length - 2])) {
            reconstructed = reconstructed.replace(/(ぶつ|もつ)$/, 'もの');
          }
          if (clean.endsWith('人') && (clean.length >= 2) && (/[\u30A0-\u30FFー]人$/.test(clean) || /^(日本|中国|韓国|英国|米国|露国|仏国|独国)/.test(clean.slice(0, -1)))) {
            reconstructed = reconstructed.replace(/(ひと|びと|にん)$/, 'じん');
          }
          if (clean.endsWith('製') && clean.length >= 2) {
            reconstructed = reconstructed.replace(/(つくる|せい)$/, 'せい');
          }
          if (clean.endsWith('産') && clean.length >= 2) {
            reconstructed = reconstructed.replace(/(うむ|さん)$/, 'さん');
          }
          if (clean.endsWith('化') && clean.length >= 2) {
            reconstructed = reconstructed.replace(/(ばける|か)$/, 'か');
          }
          if (clean.endsWith('的') && clean.length >= 2) {
            reconstructed = reconstructed.replace(/(まと|てき)$/, 'てき');
          }
          if (clean.startsWith('日本')) {
            reconstructed = reconstructed.replace(/^にちほん/, 'にほん');
          }

          if (reconstructed) {
            reading = reconstructed;
          }
        }
      }
    }

    // 1d. Giải quyết cách đọc & phát âm chuẩn theo ngữ cảnh câu (Contextual Heteronyms)
    const contextual = this.resolveContextualPronunciation(clean, fullText, offset, dictEntry);
    if (contextual) {
      if (contextual.reading) reading = contextual.reading;
      if (contextual.speechText) speechText = contextual.speechText;
      if (contextual.pronunciationNote) pronunciationNote = contextual.pronunciationNote;
      if (contextual.type && (!type || type === 'Kana' || type === 'Kanji' || type === 'Danh từ N5')) type = contextual.type;
      if (contextual.meaning && !dictEntry) meaning = contextual.meaning;
    }

    // Đảm bảo speechText luôn có giá trị phát âm chuẩn cho TTS
    if (!speechText) {
      speechText = reading || clean;
    }

    // 3. Phân loại Quy tắc Âm On / Kun
    const contextAfter = fullText ? fullText.slice(offset + clean.length) : '';
    const onKunRule = this.classifyOnKunRule(clean, reading, kanjiList, contextAfter);

    // 4. Phân tích Ngữ pháp theo ngữ cảnh
    const grammarContext = this.analyzeGrammarContext(clean, dictEntry, contextAfter);
    if (grammarContext.grammarTags.length > 0) {
      grammarTags = Array.from(new Set([...grammarTags, ...grammarContext.grammarTags]));
    }

    // 5. Chuyển đổi Romaji
    let romaji = (contextual && contextual.romaji) ? contextual.romaji : '';
    if (!romaji) {
      const romajiKana = reading || (isJapaneseText(clean) && !/[一-龯]/.test(clean) ? clean : '');
      if (romajiKana && typeof toRomaji === 'function') {
        const converted = toRomaji(romajiKana);
        if (!isKanji(converted) && !/[一-龯]/.test(converted)) {
          romaji = converted;
        }
      }
    }

    return {
      word: clean,
      reading: reading || clean,
      speechText: speechText,
      pronunciationNote: pronunciationNote,
      romaji: romaji,
      hanviet: hanviet,
      meaning: meaning,
      type: type,
      pitch: pitch,
      grammarForm: grammarForm,
      grammarTags: grammarTags,
      kanjiList: kanjiList,
      onKunRule: onKunRule,
      hasOfflineMeaning: !!meaning,
      isGrammar: isGrammarPattern,
      grammarBadge: grammarBadge
    };
  }

  /**
   * Chuẩn hóa văn bản tiếng Nhật trước khi gửi tới API dịch (xử lý số đếm Hiragana & ngoặc furigana)
   */
  normalizeTextForTranslation(text) {
    if (!text) return text;

    // 1. Loại bỏ Furigana trong ngoặc đơn đi kèm chữ Hán (ví dụ: 時計（とけい） -> 時計)
    let cleaned = text.replace(/([一-龯]+)\s*[（\(][\u3040-\u309F\u30A0-\u30FFー]+[）\)]/g, '$1');

    // 2. Chuyển đổi số đếm viết bằng Hiragana sang chữ số chuẩn để API dịch chính xác
    const thousands = [
      ['きゅうせん', 9000], ['はっせん', 8000], ['ななせん', 7000], ['ろくせん', 6000],
      ['ごせん', 5000], ['よんせん', 4000], ['さんぜん', 3000], ['にせん', 2000],
      ['いっせん', 1000], ['せん', 1000]
    ];
    const hundreds = [
      ['きゅうひゃく', 900], ['はっぴゃく', 800], ['ななひゃく', 700], ['ろっぴゃく', 600],
      ['ごひゃく', 500], ['よんひゃく', 400], ['さんびゃく', 300], ['にひゃく', 200],
      ['びゃく', 100], ['ぴゃく', 100], ['ひゃく', 100]
    ];
    const tens = [
      ['きゅうじゅう', 90], ['はちじゅう', 80], ['ななじゅう', 70], ['ろくじゅう', 60],
      ['ごじゅう', 50], ['よんじゅう', 40], ['さんじゅう', 30], ['にじゅう', 20],
      ['じゅう', 10]
    ];
    const ones = [
      ['きゅう', 9], ['く', 9], ['はち', 8], ['なな', 7], ['しち', 7],
      ['ろく', 6], ['ご', 5], ['よん', 4], ['し', 4], ['さん', 3],
      ['に', 2], ['いち', 1]
    ];

    function parseUnder10000(s) {
      if (!s) return 0;
      let sum = 0;
      let rem = s;
      for (const [k, v] of thousands) { if (rem.startsWith(k)) { sum += v; rem = rem.slice(k.length); break; } }
      for (const [k, v] of hundreds) { if (rem.startsWith(k)) { sum += v; rem = rem.slice(k.length); break; } }
      for (const [k, v] of tens) { if (rem.startsWith(k)) { sum += v; rem = rem.slice(k.length); break; } }
      for (const [k, v] of ones) { if (rem === k) { sum += v; rem = ''; break; } }
      return rem.length === 0 ? sum : null;
    }

    function parseHiraNum(hira) {
      if (!hira) return null;
      if (hira.includes('まん')) {
        const parts = hira.split('まん');
        const high = parseUnder10000(parts[0]) || 1;
        const low = parseUnder10000(parts[1]) || 0;
        return high * 10000 + low;
      }
      return parseUnder10000(hira);
    }

    const numRegex = /([ぜれいいちにつっさんよんしごろくななしちはちきゅうくじゅうひゃくびゃくぴゃくせんぜんまん]+)(えん|にん|さい|かい|じ|ふん|ぷん|ほん|ぼん|ぽん|こ|さつ|まい|台|個|本|枚|人|歳|円|回|時|分)?/g;

    const counterMap = {
      'えん': '円', 'にん': '人', 'さい': '歳', 'かい': '回',
      'じ': '時', 'ふん': '分', 'ぷん': '分', 'ほん': '本',
      'ぼん': '本', 'ぽん': '本', 'こ': '個', 'さつ': '冊', 'まい': '枚'
    };

    const blacklist = new Set(['にほん', 'にほんご', 'さんぽ', 'じぶん', 'きぶん', 'いっしょ', 'たいへん']);

    cleaned = cleaned.replace(numRegex, (match, numPart, counterPart) => {
      if (blacklist.has(match)) return match;
      const val = parseHiraNum(numPart);
      if (val !== null && val > 0) {
        if (!counterPart && val < 10) return match;
        const c = counterPart ? (counterMap[counterPart] || counterPart) : '';
        return ' ' + val + c + ' ';
      }
      return match;
    });

    return cleaned.replace(/\s+/g, ' ').trim();
  }

  /**
   * Khử khuẩn (Sanitize) chuỗi văn bản từ API từ xa
   * Loại bỏ triệt để mọi thẻ HTML hoặc ký tự điều khiển để đảm bảo là plain text 100% an toàn
   */
  sanitizeRemoteText(text) {
    if (!text || typeof text !== 'string') return '';
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
      .trim();
  }

  /**
   * Gọi API Google Translate thông qua Background Service Worker để vượt CSP/CORS
   * Tự động dự phòng gọi fetch trực tiếp nếu background proxy không phản hồi
   */
  async callGoogleTranslateAPI(text, sl = 'ja', tl = 'vi', signal = null) {
    if (!text || typeof text !== 'string') return null;
    const clean = text.trim();
    if (!clean) return null;

    // 1. Gửi qua background proxy (vượt CSP trên ChatGPT, YouTube, Facebook, Twitter...)
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      try {
        const bgRes = await new Promise((resolve) => {
          chrome.runtime.sendMessage(
            { action: 'GOOGLE_TRANSLATE_API', text: clean, sl, tl },
            (response) => {
              if (chrome.runtime.lastError || !response || !response.success) {
                resolve(null);
              } else {
                resolve(response.data);
              }
            }
          );
        });
        if (bgRes) return bgRes;
      } catch (_) {}
    }

    // 2. Dự phòng gọi trực tiếp nếu chạy ngoài Chrome Extension context
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(tl)}&dt=t&dt=bd&dt=rm&q=${encodeURIComponent(clean)}`;
      const response = await fetch(url, { signal });
      if (response && response.ok) {
        return await response.json();
      }
    } catch (_) {}

    return null;
  }

  /**
   * Tra cứu dự phòng Trực tuyến (Online Fallback)
   */
  async fetchOnlineData(word, signal) {
    if (!word) return null;
    const cleanWord = word.trim();

    if (this.onlineCache.has(cleanWord)) {
      return this.onlineCache.get(cleanWord);
    }

    try {
      const queryText = this.normalizeTextForTranslation(cleanWord);
      const data = await this.callGoogleTranslateAPI(queryText, 'ja', 'vi', signal);
      if (!data) return null;

      let translation = '';
      let onlineRomaji = '';
      const synonyms = [];

      if (data && data[0] && Array.isArray(data[0])) {
        const rawTrans = data[0].map(item => item[0]).filter(Boolean).join(' ').trim();
        translation = this.sanitizeRemoteText(rawTrans);
        const romajiItem = data[0].find(item => item && item[3]);
        if (romajiItem && romajiItem[3]) {
          onlineRomaji = this.sanitizeRemoteText(romajiItem[3]);
        }
      }

      // Khắc phục lỗi Google Translate dịch nhầm hậu tố ngôn ngữ 〜語 thành "người ..."
      if (cleanWord.endsWith('語') && /^[Nn]gười\s+/.test(translation)) {
        translation = translation.replace(/^[Nn]gười\s+/, 'Tiếng ');
      }
      if (cleanWord.endsWith('人') && /^[Tt]iếng\s+/.test(translation)) {
        translation = translation.replace(/^[Tt]iếng\s+/, 'Người ');
      }
      if (cleanWord.endsWith('語') && /kataru$/i.test(onlineRomaji)) {
        onlineRomaji = onlineRomaji.replace(/kataru$/i, 'go');
      }
      if (cleanWord.endsWith('人') && /(hito|bito)$/i.test(onlineRomaji)) {
        onlineRomaji = onlineRomaji.replace(/(hito|bito)$/i, 'jin');
      }

      if (data && data[1] && Array.isArray(data[1])) {
        for (const posGroup of data[1]) {
          if (posGroup && Array.isArray(posGroup[1])) {
            posGroup[1].slice(0, 3).forEach(syn => {
              const cleanSyn = this.sanitizeRemoteText(syn);
              if (cleanSyn && !synonyms.includes(cleanSyn) && cleanSyn !== translation) {
                synonyms.push(cleanSyn);
              }
            });
          }
        }
      }

      let onlineReading = '';
      // Chỉ tạo online reading cho từ đơn ngắn (dưới 8 ký tự và không chứa dấu câu), tránh tạo phiên âm hỏng cho cả câu dài
      const isSingleWord = cleanWord.length <= 8 && !/[\s、。！？!?]/.test(cleanWord);
      if (isSingleWord && onlineRomaji && typeof romajiToHiragana === 'function') {
        onlineReading = romajiToHiragana(onlineRomaji);
      }
      if (cleanWord.endsWith('語') && onlineReading) {
        onlineReading = onlineReading.replace(/(かたる|ご)$/, 'ご');
      }
      if (cleanWord.endsWith('人') && onlineReading) {
        onlineReading = onlineReading.replace(/(ひと|びと|にん)$/, 'じん');
      }

      if (translation || onlineReading) {
        const result = {
          meaning: translation,
          romaji: onlineRomaji,
          reading: onlineReading,
          synonyms: synonyms,
          fromOnline: true
        };
        if (this.onlineCache.size > 200) {
          const firstKey = this.onlineCache.keys().next().value;
          this.onlineCache.delete(firstKey);
        }
        this.onlineCache.set(cleanWord, result);
        return result;
      }
    } catch (err) {
      if (err.name === 'AbortError') return null;
    }

    return null;
  }

  /**
   * Kiểm tra xem chuỗi có phải tiếng Việt hay không (để tự động đổi hướng dịch)
   */
  isVietnameseText(text) {
    if (!text || typeof text !== 'string') return false;
    const s = text.trim();
    if (!s) return false;
    if (typeof isVietnameseQuery === 'function') return isVietnameseQuery(s);
    if (/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(s)) return false;
    if (/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(s)) return true;
    return false;
  }

  /**
   * Tra cứu dịch ngược từ tiếng Việt sang tiếng Nhật (Reverse Lookup / Translation)
   * Sử dụng Google Translate API qua background proxy với khử khuẩn dữ liệu đầu ra nghiêm ngặt
   * @param {string} text - Từ hoặc câu tiếng Việt cần tra cứu
   * @param {AbortSignal} [signal] - Signal hủy request khi người dùng gõ tiếp
   * @returns {Promise<object|null>}
   */
  async translateVietnameseToJapanese(text, signal) {
    if (!text || typeof text !== 'string') return null;
    const cleanText = text.trim();
    if (!cleanText) return null;

    const cacheKey = `rev_vi_ja_${cleanText.toLowerCase()}`;
    if (this.onlineCache.has(cacheKey)) {
      return this.onlineCache.get(cacheKey);
    }

    try {
      const data = await this.callGoogleTranslateAPI(cleanText, 'vi', 'ja', signal);
      if (!data) return null;

      let translation = '';
      let onlineRomaji = '';
      const synonyms = [];

      if (data && data[0] && Array.isArray(data[0])) {
        const rawTrans = data[0].map(item => item[0]).filter(Boolean).join('').trim();
        translation = this.sanitizeRemoteText(rawTrans);
        const romajiItem = data[0].find(item => item && item[3]);
        if (romajiItem && romajiItem[3]) {
          onlineRomaji = this.sanitizeRemoteText(romajiItem[3]);
        }
      }

      if (data && data[1] && Array.isArray(data[1])) {
        for (const posGroup of data[1]) {
          if (posGroup && Array.isArray(posGroup[1])) {
            posGroup[1].slice(0, 4).forEach(syn => {
              const cleanSyn = this.sanitizeRemoteText(syn);
              if (cleanSyn && !synonyms.includes(cleanSyn) && cleanSyn !== translation) {
                synonyms.push(cleanSyn);
              }
            });
          }
        }
      }

      let onlineReading = '';
      if (onlineRomaji && typeof romajiToHiragana === 'function') {
        onlineReading = romajiToHiragana(onlineRomaji);
      }

      // Nếu từ điển có sẵn từ tiếng Nhật này, lấy reading chuẩn từ từ điển
      if (translation && typeof lookupJapaneseWord === 'function') {
        const dictEntry = lookupJapaneseWord(translation);
        if (dictEntry && dictEntry.reading) {
          onlineReading = dictEntry.reading;
        }
      }

      if (translation) {
        const result = {
          japanese: translation,
          word: translation,
          reading: onlineReading,
          romaji: onlineRomaji,
          synonyms: synonyms,
          sourceText: cleanText,
          fromOnline: true,
          provider: 'Google Translate'
        };
        if (this.onlineCache.size > 200) {
          const firstKey = this.onlineCache.keys().next().value;
          this.onlineCache.delete(firstKey);
        }
        this.onlineCache.set(cacheKey, result);
        return result;
      }
    } catch (err) {
      if (err.name === 'AbortError') return null;
    }
    return null;
  }

  /**
   * Dịch câu hoàn chỉnh sử dụng API bên ngoài (Google Translate API hoặc AI Engine đa nền tảng)
   * Tự động nhận diện hướng dịch Việt ➔ Nhật hoặc Nhật ➔ Việt
   * @param {string} text - Câu tiếng Nhật hoặc tiếng Việt cần dịch
   * @param {object} [options] - Tuỳ chọn { engine: 'google' | 'ai' | 'gemini', apiKey: string, direction: 'auto' | 'ja-vi' | 'vi-ja' }
   */
  async translateSentence(text, options = {}) {
    if (!text || typeof text !== 'string') return null;
    const cleanText = text.trim();
    if (!cleanText) return null;

    const engineType = options.engine || 'google';
    const isVi = options.direction === 'vi-ja' || (options.direction !== 'ja-vi' && this.isVietnameseText(cleanText));
    const sl = isVi ? 'vi' : 'ja';
    const tl = isVi ? 'ja' : 'vi';

    const cacheKey = `sent_${sl}_${tl}_${engineType}_${cleanText}`;
    if (this.onlineCache.has(cacheKey)) {
      return this.onlineCache.get(cacheKey);
    }

    // 1. Tùy chọn: Gọi AI Engine đa nền tảng (Gemini, OpenAI, Claude, DeepSeek, Groq, Custom)
    if (engineType === 'ai' || engineType === 'gemini') {
      try {
        const aiService = window.japaneseAiService || (typeof japaneseAiService !== 'undefined' ? japaneseAiService : null);
        if (aiService) {
          const aiRes = await aiService.translate(cleanText, {
            direction: isVi ? 'vi-ja' : 'ja-vi',
            apiKey: options.apiKey,
            provider: options.provider,
            model: options.model,
            customEndpoint: options.customEndpoint
          });

          if (aiRes && aiRes.success && aiRes.result) {
            const cleanOut = this.sanitizeRemoteText(aiRes.result);
            const providerLabel = `✨ ${aiRes.providerName || 'AI'} (${aiRes.model || ''})`;
            const result = {
              meaning: cleanOut,
              provider: providerLabel,
              direction: isVi ? 'vi-ja' : 'ja-vi',
              isAi: true
            };
            this.onlineCache.set(cacheKey, result);
            return result;
          }
        }
      } catch (err) {
        console.warn('AI translate failed, falling back to Google Translate API:', err);
      }
    }

    // 2. Mặc định / Dự phòng: Gọi API Google Translate (translate.googleapis.com)
    try {
      const queryText = this.normalizeTextForTranslation(cleanText);
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(queryText)}`;
      const response = await fetch(url);
      if (!response.ok) return null;

      const data = await response.json();
      let translation = '';
      if (data && data[0] && Array.isArray(data[0])) {
        const rawTrans = data[0].map(item => item[0]).filter(Boolean).join('').trim();
        translation = this.sanitizeRemoteText(rawTrans);
      }

      if (translation) {
        const result = { meaning: translation, provider: 'Google Translate API', direction: isVi ? 'vi-ja' : 'ja-vi' };
        this.onlineCache.set(cacheKey, result);
        return result;
      }
    } catch (err) {
      console.error('Google Translate API error:', err);
    }

    return null;
  }

  /**
   * Phân tích ngữ pháp câu tiếng Nhật chuyên sâu qua AI
   * @param {string} text - Câu tiếng Nhật cần phân tích
   */
  async explainGrammar(text) {
    if (!text || typeof text !== 'string') return null;
    const aiService = window.japaneseAiService || (typeof japaneseAiService !== 'undefined' ? japaneseAiService : null);
    if (!aiService) return { success: false, error: 'AI Service chưa được tải.' };
    return await aiService.explainGrammar(text.trim());
  }

  /**
   * Giải thích chuyên sâu từ vựng & Ví dụ thực tế qua AI
   * @param {string} word - Từ vựng cần giải thích
   */
  async explainWord(word) {
    if (!word || typeof word !== 'string') return null;
    const aiService = window.japaneseAiService || (typeof japaneseAiService !== 'undefined' ? japaneseAiService : null);
    if (!aiService) return { success: false, error: 'AI Service chưa được tải.' };
    return await aiService.explainWord(word.trim());
  }

  /**
   * Phát âm tiếng Nhật chuẩn (Web Speech API + Trực tuyến fallback cho Windows)
   */
  speak(text, optionsOrRate = 0.95, onStart = null, onEnd = null) {
    if (!text || typeof window === 'undefined') return;

    // 1. Ưu tiên sử dụng JapaneseAudioEngine nếu đã nạp
    if (typeof japaneseAudio !== 'undefined' && japaneseAudio.speak) {
      const opts = typeof optionsOrRate === 'object' ? optionsOrRate : { rate: optionsOrRate };
      japaneseAudio.speak(text, opts, onStart, onEnd);
      return;
    }

    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio = null;
      } catch (_) {}
    }

    const rate = (typeof optionsOrRate === 'object' && optionsOrRate.rate) ? optionsOrRate.rate : optionsOrRate;

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();

      const voices = (this.voices && this.voices.length > 0) ? this.voices : window.speechSynthesis.getVoices();
      const jaVoice = voices.find(v => v.lang === 'ja-JP' || v.lang.startsWith('ja'));

      if (jaVoice) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.voice = jaVoice;
        
        const numRate = parseFloat(rate);
        const validRate = (!isNaN(numRate) && numRate >= 0.25 && numRate <= 2.5) ? numRate : 1.0;
        utterance.rate = validRate;
        utterance.pitch = (typeof optionsOrRate === 'object' && optionsOrRate.pitch) ? optionsOrRate.pitch : 1.0;

        if (onStart) utterance.onstart = onStart;
        if (optionsOrRate && typeof optionsOrRate === 'object') {
          if (optionsOrRate.onStart) utterance.onstart = optionsOrRate.onStart;
          if (optionsOrRate.onBoundary) utterance.onboundary = optionsOrRate.onBoundary;
        }
        if (onEnd) {
          utterance.onend = onEnd;
          utterance.onerror = onEnd;
        }

        window.speechSynthesis.speak(utterance);
        return;
      }
    }

    // Fallback sang Google TTS Audio Stream nếu trình duyệt không có Japanese voice
    try {
      const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ja&q=${encodeURIComponent(text)}`;
      const audio = new Audio(audioUrl);
      const numRate = parseFloat(rate);
      const validRate = (!isNaN(numRate) && numRate >= 0.25 && numRate <= 2.5) ? numRate : 1.0;
      const applyRate = () => {
        try {
          audio.playbackRate = validRate;
          audio.defaultPlaybackRate = validRate;
        } catch (_) {}
      };
      applyRate();
      audio.addEventListener('play', applyRate);
      audio.addEventListener('playing', applyRate);
      audio.addEventListener('loadedmetadata', applyRate);

      this.currentAudio = audio;
      if (onStart) onStart();
      audio.onended = () => { this.currentAudio = null; if (onEnd) onEnd(); };
      audio.onerror = () => { this.currentAudio = null; if (onEnd) onEnd(); };
      audio.play().catch(() => { this.currentAudio = null; if (onEnd) onEnd(); });
    } catch (_) {
      if (onEnd) onEnd();
    }
  }
}

// Khởi tạo instance toàn cục
const japaneseEngine = new JapaneseEngine();
if (typeof window !== 'undefined') {
  window.japaneseEngine = japaneseEngine;
}
if (typeof globalThis !== 'undefined') {
  globalThis.japaneseEngine = japaneseEngine;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { JapaneseEngine, japaneseEngine };
}
