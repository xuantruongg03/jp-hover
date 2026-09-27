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
    if (!text || offset < 0 || offset >= text.length) return null;

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
            // Kiểm tra ghép từ điển (hỗ trợ từ ghép nhiều token)
            if (typeof lookupJapaneseWord === 'function') {
              let compoundCandidate = currentWord;
              for (let step = 1; step <= 3 && wordEndIdx + step < segments.length; step++) {
                compoundCandidate += segments[wordEndIdx + step].segment;
                if (lookupJapaneseWord(compoundCandidate)) {
                  currentWord = compoundCandidate;
                }
              }
            }
            return currentWord;
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
  classifyOnKunRule(word, kanjiList, contextText = '') {
    if (!word || !kanjiList || kanjiList.length === 0) {
      return null;
    }

    const hasKana = /[\u3040-\u309F\u30A0-\u30FF]/.test(word);
    const kanjiCount = kanjiList.length;

    // 1. Kanji đi kèm đuôi Hiragana (Okurigana) -> Chắc chắn là Âm KUN (Động từ / Tính từ)
    if (hasKana && kanjiCount >= 1) {
      return {
        type: 'kun',
        badge: '🌸 Âm Kun (Thuần Nhật)',
        rule: 'Kanji kèm đuôi Hiragana (Động từ / Tính từ) → Dùng âm Kun.'
      };
    }

    // 2. Từ ghép 2 hoặc nhiều chữ Kanji không có Kana -> Dùng Âm ON (Từ Hán Nhật)
    if (!hasKana && kanjiCount >= 2) {
      return {
        type: 'on',
        badge: '📖 Âm On (Hán)',
        rule: 'Từ ghép nhiều chữ Kanji đứng liền nhau → Dùng âm On.'
      };
    }

    // 3. Chữ Kanji đơn lẻ đứng một mình (1 chữ)
    if (kanjiCount === 1) {
      // Kiểm tra xem trong câu ngay sau đó có đuôi Okurigana bị tách không (như 大 (おお) きい)
      if (contextText && /[きいくるいたたてない]/.test(contextText)) {
        return {
          type: 'kun',
          badge: '🌸 Âm Kun (Thuần Nhật)',
          rule: 'Kanji gốc có phần đuôi biến đổi Hiragana (Tính từ/Động từ) → Dùng âm Kun.'
        };
      }

      // Danh từ thuần Nhật đứng 1 mình (như 水, 山, 人, 雨, 花)
      const pureKunNouns = new Set(['水', '山', '人', '雨', '花', '木', '車', '道', '部屋', '机']);
      if (pureKunNouns.has(word)) {
        return {
          type: 'kun',
          badge: '🌸 Âm Kun (Thuần Nhật)',
          rule: 'Danh từ đơn đứng độc lập một mình → Dùng âm Kun.'
        };
      }

      return {
        type: 'on_kun_single',
        badge: '🏮 Hán tự đơn',
        rule: 'Đứng 1 mình dùng âm Kun (gốc thuần Nhật), khi ghép từ dùng âm On (Hán).'
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
   * Bộ phân tích và đọc số đếm & lượng từ động (Dynamic Japanese Number & Counter Parser)
   */
  parseNumberAndCounter(word) {
    if (!word) return null;

    // Pattern: [Số] + [Lượng từ]
    const match = word.match(/^(\d+|[一二三四五六七八九十百千万億兆]+)(つ|人|日|月|年|時|分|秒|歳|才|本|枚|冊|台|匹|頭|階|杯|足|回|番|円|個|軒|着|通)?$/);
    if (!match) return null;

    const numStr = match[1];
    const counter = match[2] || '';

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
        type: `Số từ (Đếm ${cInfo.unit})`,
        meaning: `${numStr} ${cInfo.unit} [${cInfo.desc}]`,
        grammarForm: `Số từ + Lượng từ [${counter}]`
      };
    } else if (!counter) {
      return {
        word: word,
        type: 'Số đếm',
        meaning: `Số ${numStr}`,
        grammarForm: 'Số đếm cơ bản'
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

    // 1. Tra cứu Từ điển nội bộ
    const dictEntry = typeof lookupJapaneseWord === 'function' ? lookupJapaneseWord(clean) : null;

    if (dictEntry) {
      reading = dictEntry.reading;
      meaning = dictEntry.meaning;
      type = dictEntry.type || '';
      pitch = dictEntry.pitch;
      grammarForm = dictEntry.grammarForm || 'Nguyên mẫu (辞書形)';
      grammarTags = dictEntry.grammarTags || [];
    } else {
      // 1b. Thử phân tích Số đếm & Lượng từ động (Ví dụ: 3人, 100円, 5本, 10分, 20歳, 4日)
      const numInfo = this.parseNumberAndCounter(clean);
      if (numInfo) {
        meaning = numInfo.meaning;
        type = numInfo.type;
        grammarForm = numInfo.grammarForm;
        reading = numInfo.reading || clean;
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
          reading = clean;
          meaning = '';
          type = 'Kana';
        } else {
          const kanjiParts = [];
          for (const k of kanjiList) {
            if (k.on && k.on !== '—') {
              const firstOn = k.on.split(',')[0].trim();
              kanjiParts.push(firstOn);
            }
          }
          if (kanjiParts.length > 0) {
            reading = katakanaToHiragana(kanjiParts.join(''));
          }
        }
      }
    }

    // 3. Phân loại Quy tắc Âm On / Kun
    const contextAfter = fullText ? fullText.slice(offset + clean.length) : '';
    const onKunRule = this.classifyOnKunRule(clean, kanjiList, contextAfter);

    // 4. Phân tích Ngữ pháp theo ngữ cảnh
    const grammarContext = this.analyzeGrammarContext(clean, dictEntry, contextAfter);
    if (grammarContext.grammarTags.length > 0) {
      grammarTags = Array.from(new Set([...grammarTags, ...grammarContext.grammarTags]));
    }

    // 5. Chuyển đổi Romaji
    let romaji = '';
    const romajiKana = reading || (isJapaneseText(clean) && !/[一-龯]/.test(clean) ? clean : '');
    if (romajiKana && typeof toRomaji === 'function') {
      const converted = toRomaji(romajiKana);
      if (!isKanji(converted) && !/[一-龯]/.test(converted)) {
        romaji = converted;
      }
    }

    return {
      word: clean,
      reading: reading || clean,
      romaji: romaji,
      hanviet: hanviet,
      meaning: meaning,
      type: type,
      pitch: pitch,
      grammarForm: grammarForm,
      grammarTags: grammarTags,
      kanjiList: kanjiList,
      onKunRule: onKunRule,
      hasOfflineMeaning: !!meaning
    };
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
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ja&tl=vi&dt=t&dt=bd&dt=rm&q=${encodeURIComponent(cleanWord)}`;
      const response = await fetch(url, { signal });
      if (!response.ok) return null;

      const data = await response.json();
      let translation = '';
      let onlineRomaji = '';
      const synonyms = [];

      if (data && data[0] && Array.isArray(data[0])) {
        translation = data[0].map(item => item[0]).filter(Boolean).join(' ').trim();
        const romajiItem = data[0].find(item => item && item[3]);
        if (romajiItem && romajiItem[3]) {
          onlineRomaji = romajiItem[3].trim();
        }
      }

      if (data && data[1] && Array.isArray(data[1])) {
        for (const posGroup of data[1]) {
          if (posGroup && Array.isArray(posGroup[1])) {
            posGroup[1].slice(0, 3).forEach(syn => {
              if (syn && !synonyms.includes(syn) && syn !== translation) {
                synonyms.push(syn);
              }
            });
          }
        }
      }

      let onlineReading = '';
      if (onlineRomaji && typeof romajiToHiragana === 'function') {
        onlineReading = romajiToHiragana(onlineRomaji);
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
   * Phát âm tiếng Nhật chuẩn (Web Speech API + Trực tuyến fallback cho Windows)
   */
  speak(text, rate = 0.95, onStart = null, onEnd = null) {
    if (!text || typeof window === 'undefined') return;

    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio = null;
      } catch (_) {}
    }

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();

      const voices = (this.voices && this.voices.length > 0) ? this.voices : window.speechSynthesis.getVoices();
      const jaVoice = voices.find(v => v.lang === 'ja-JP' || v.lang.startsWith('ja'));

      if (jaVoice) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.voice = jaVoice;
        
        const numRate = parseFloat(rate);
        utterance.rate = (!isNaN(numRate) && numRate >= 0.4 && numRate <= 2.0) ? numRate : 0.95;
        utterance.pitch = 1.0;

        if (onStart) utterance.onstart = onStart;
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
      this.currentAudio = audio;
      if (onStart) onStart();
      audio.onended = () => { if (onEnd) onEnd(); };
      audio.onerror = () => { if (onEnd) onEnd(); };
      audio.play().catch(() => { if (onEnd) onEnd(); });
    } catch (_) {
      if (onEnd) onEnd();
    }
  }
}

// Khởi tạo instance toàn cục
const japaneseEngine = new JapaneseEngine();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { JapaneseEngine, japaneseEngine };
}
