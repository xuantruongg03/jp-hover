/**
 * Module quản lý Âm thanh & Giọng đọc Tiếng Nhật chuẩn bản xứ (Audio & TTS Engine)
 * Tối ưu hóa phản hồi tức thì 0ms, không độ trễ, hỗ trợ lựa chọn các giọng người Nhật:
 * - 🌸 Microsoft Haruka (Nữ chuẩn Tokyo)
 * - 🌸 Microsoft Ayumi (Nữ trẻ trung)
 * - 🌸 Microsoft Sayaka (Nữ thanh lịch)
 * - 👔 Microsoft Ichiro (Nam trầm ấm)
 * - 🌸 Microsoft Nanami (Nữ AI Tự nhiên)
 * - 👔 Microsoft Keita (Nam AI Tự nhiên)
 * - 🎌 Google 日本語 (Nữ chuẩn Google)
 * - 🍎 Apple Kyoko / Otoya (macOS)
 * - 🌐 Google TTS (Trực tuyến)
 */

class JapaneseAudioEngine {
  constructor() {
    this.voices = [];
    this.currentAudio = null;
    this.isVoicesLoaded = false;
    this.initVoices();
  }

  initVoices() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const load = () => {
      try {
        const allVoices = window.speechSynthesis.getVoices();
        if (allVoices && allVoices.length > 0) {
          this.voices = allVoices;
          this.isVoicesLoaded = true;
        }
      } catch (_) {}
    };

    load();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = load;
    }
  }

  /**
   * Lấy danh sách toàn bộ giọng tiếng Nhật kèm phân loại chất lượng & giới tính
   */
  getJapaneseVoices() {
    const all = (this.voices && this.voices.length > 0) 
      ? this.voices 
      : (typeof window !== 'undefined' && window.speechSynthesis ? window.speechSynthesis.getVoices() : []);

    const jaVoices = all.filter(v => v.lang === 'ja-JP' || v.lang.startsWith('ja') || v.lang === 'jpn');

    return jaVoices.map(v => {
      const name = v.name;
      const lowerName = name.toLowerCase();

      // Nhận diện giọng tự nhiên (Natural / Neural / Online)
      const isNatural = lowerName.includes('natural') || 
                        lowerName.includes('online') || 
                        lowerName.includes('neural') ||
                        lowerName.includes('google 日本語') ||
                        lowerName.includes('kyoko') ||
                        lowerName.includes('otoya') ||
                        lowerName.includes('haruka') ||
                        lowerName.includes('ayumi') ||
                        lowerName.includes('sayaka');

      let gender = 'female';
      if (lowerName.includes('keita') || lowerName.includes('ichiro') || lowerName.includes('otoya') || lowerName.includes('male') || lowerName.includes('daichi')) {
        gender = 'male';
      }

      let label = name;
      if (lowerName.includes('nanami')) {
        label = '🌸 Microsoft Nanami (Nữ AI Tự nhiên)';
      } else if (lowerName.includes('keita')) {
        label = '👔 Microsoft Keita (Nam AI Tự nhiên)';
      } else if (lowerName.includes('google 日本語')) {
        label = '🎌 Google 日本語 (Nữ chuẩn - Tự nhiên)';
      } else if (lowerName.includes('haruka')) {
        label = '🌸 Microsoft Haruka (Nữ chuẩn Tokyo - Rõ ràng)';
      } else if (lowerName.includes('ayumi')) {
        label = '🌸 Microsoft Ayumi (Nữ trẻ trung - Tự nhiên)';
      } else if (lowerName.includes('sayaka')) {
        label = '🌸 Microsoft Sayaka (Nữ thanh lịch - Nhẹ nhàng)';
      } else if (lowerName.includes('ichiro')) {
        label = '👔 Microsoft Ichiro (Nam chuẩn - Trầm ấm)';
      } else if (lowerName.includes('kyoko')) {
        label = '🍎 Apple Kyoko (Nữ bản xứ macOS)';
      } else if (lowerName.includes('otoya')) {
        label = '🍎 Apple Otoya (Nam bản xứ macOS)';
      }

      return {
        voice: v,
        name: v.name,
        uri: v.voiceURI || v.name,
        label: label,
        lang: v.lang,
        isNatural: isNatural,
        gender: gender,
        isDefault: v.default || false
      };
    });
  }

  /**
   * Tự động tìm giọng đọc tốt nhất hiện có trên hệ thống theo cấu hình người dùng
   */
  getBestNaturalVoice(preferredUri = '') {
    const list = this.getJapaneseVoices();
    if (list.length === 0) return null;

    if (preferredUri && preferredUri !== 'google-tts' && preferredUri !== 'auto') {
      const match = list.find(v => v.uri === preferredUri || v.name === preferredUri);
      if (match) return match.voice;
    }

    // Thứ tự ưu tiên giọng tự nhiên chuẩn bản xứ
    const priorities = [
      v => v.name.includes('Nanami'),
      v => v.name.includes('Haruka'),
      v => v.name.includes('Ayumi'),
      v => v.name.includes('Sayaka'),
      v => v.name.includes('Google 日本語'),
      v => v.name.includes('Keita'),
      v => v.name.includes('Kyoko'),
      v => v.name.includes('Otoya'),
      v => v.name.includes('Ichiro'),
      v => v.isNatural,
      v => v.isDefault,
      () => true
    ];

    for (const test of priorities) {
      const found = list.find(test);
      if (found) return found.voice;
    }

    return list[0].voice;
  }

  /**
   * Dừng toàn bộ âm thanh đang phát ngay lập tức
   */
  stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio = null;
      } catch (_) {}
    }

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (_) {}
    }
  }

  /**
   * Phát trực tiếp bằng Web Speech API (0ms độ trễ, không phụ thuộc mạng ngoài)
   */
  speakSpeechSynthesis(text, options = {}, onStart, onEnd, onError) {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      if (onError) onError();
      return;
    }

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel();

      const chosenVoice = this.getBestNaturalVoice(options.voiceUri);
      // QUAN TRỌNG: Nếu thiết bị không có giọng tiếng Nhật bản địa nào,
      // tuyệt đối KHÔNG để trình duyệt tự ý dùng giọng mặc định (tiếng Anh/Việt) để đọc tiếng Nhật
      // vì sẽ phát âm thành tiếng rác hoàn toàn không liên quan.
      // Thay vào đó, kích hoạt onError ngay để chuyển sang Google TTS bản ngữ.
      if (!chosenVoice) {
        if (onError) onError(new Error('No Japanese voice available'));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.voice = chosenVoice;

      const rate = parseFloat(options.rate);
      utterance.rate = (!isNaN(rate) && rate >= 0.4 && rate <= 2.0) ? rate : 0.95;

      const pitch = parseFloat(options.pitch);
      utterance.pitch = (!isNaN(pitch) && pitch >= 0.5 && pitch <= 1.5) ? pitch : 1.0;

      let started = false;
      utterance.onstart = () => {
        started = true;
        if (onStart) onStart();
      };

      utterance.onend = () => {
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        if (!started && onError) {
          onError(e);
        } else if (onEnd) {
          onEnd();
        }
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      if (onError) onError(err);
    }
  }

  /**
   * Fallback sang Google Translate TTS Stream khi thiết bị không có Japanese voice
   */
  playGoogleTtsAudio(text, onStart, onEnd) {
    this.stop();
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ja&q=${encodeURIComponent(text)}`;
    const audio = new Audio(url);
    this.currentAudio = audio;

    if (onStart) onStart();
    audio.onended = () => {
      this.currentAudio = null;
      if (onEnd) onEnd();
    };
    audio.onerror = () => {
      this.currentAudio = null;
      if (onEnd) onEnd();
    };
    audio.play().catch(() => {
      this.currentAudio = null;
      if (onEnd) onEnd();
    });
  }

  /**
   * Phương thức phát âm chính: phản hồi tức thì 0ms, không độ trễ
   * @param {string} text - Từ hoặc câu tiếng Nhật cần phát âm
   * @param {object} options - { voiceUri, rate, pitch }
   * @param {function} onStart 
   * @param {function} onEnd 
   */
  speak(text, options = {}, onStart = null, onEnd = null) {
    if (!text) return;
    const cleanText = text.trim();
    if (!cleanText) return;

    // Nếu người dùng chọn giọng trực tuyến Google TTS hoặc thiết bị hoàn toàn không có giọng tiếng Nhật
    const jaVoices = this.getJapaneseVoices();
    if (options.voiceUri === 'google-tts' || jaVoices.length === 0) {
      this.playGoogleTtsAudio(cleanText, onStart, onEnd);
      return;
    }

    // Mặc định: Phát trực tiếp tức thì bằng giọng người Nhật trong hệ thống (0ms delay)
    this.speakSpeechSynthesis(cleanText, options, onStart, onEnd, () => {
      // Fallback duy nhất khi máy hoàn toàn không có giọng tiếng Nhật
      this.playGoogleTtsAudio(cleanText, onStart, onEnd);
    });
  }

  /**
   * Phát thử giọng mẫu (Preview Voice) trong Cài đặt
   */
  preview(voiceUri = '', rate = 0.95, pitch = 1.0, onStart = null, onEnd = null) {
    const sampleText = 'こんにちは！日本語の学習を応援します。';
    this.speak(sampleText, { voiceUri, rate, pitch }, onStart, onEnd);
  }
}

// Instance toàn cục
const japaneseAudio = new JapaneseAudioEngine();

if (typeof window !== 'undefined') {
  window.japaneseAudio = japaneseAudio;
  window.JapaneseAudioEngine = JapaneseAudioEngine;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { JapaneseAudioEngine, japaneseAudio };
}
