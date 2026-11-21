# 🚀 Hướng Dẫn & Nội Dung Upload ZYNO Nihon Lên Chrome Web Store

Tài liệu này chuẩn bị sẵn toàn bộ nội dung bạn chỉ cần **Copy & Paste** trực tiếp vào trang quản trị **Chrome Web Store Developer Dashboard** (`https://chrome.google.com/webstore/devconsole`).

---

## 📋 1. THÔNG TIN CƠ BẢN (STORE LISTING INFORMATION)

### Tên Tiện Ích (Extension Name - Tối đa 45 ký tự)
```text
ZYNO Nihon - Free Japanese Furigana & SRS
```

### Tên Ngắn Gọn (Short Name - Tối đa 12 ký tự)
```text
ZYNO Nihon
```

### Thông Tin Tóm Tắt (Summary / Short Description - Tối đa 132 ký tự)
```text
Free Japanese immersion suite: Zero-latency Furigana hover, stroke order, YouTube/Netflix subtitles, Anki export & SRS flashcards.
```

### Trang Web Chính Thức (Official Product URL)
```text
https://zyno.top/products/zyno-nihon
```

### Danh Mục Cửa Hàng (Store Category)
- **Primary Category:** Education / Năng suất học tập (Education)
- **Secondary Category:** Accessibility / Tiện ích mở rộng công cụ (Tools)

---

## 📝 2. MÔ TẢ CHI TIẾT CHO CHROME WEB STORE (STORE LISTING DESCRIPTION)
> **HƯỚNG DẪN:** Copy toàn bộ đoạn văn bản Tiếng Anh dưới đây và dán vào ô **Mô tả (Description)** trên Chrome Developer Dashboard (hỗ trợ tối đa 16.000 ký tự).

```text
🌸 ZYNO NIHON — FREE JAPANESE IMMERSION, FURIGANA HOVER & SRS FLASHCARDS SUITE
Technology, Made Simpler. 100% Free Forever • Zero Ads • No Paywalls • Local-First Privacy.

Mastering Japanese is one of the most rewarding journeys, but looking up unfamiliar Kanji, memorizing complex stroke orders, and breaking down sentences on web pages often halts your reading momentum.

ZYNO Nihon transforms the entire internet into your personal Japanese immersion playground. Hover over any Japanese word, article, manga dialogue, or video subtitle to reveal instant Furigana readings, Sino-Vietnamese roots, stroke order animations, and accurate context meanings—with zero latency and zero distraction.

============================================================
🌟 WHY JAPANESE LEARNERS LOVE ZYNO NIHON
============================================================

1. ⚡ ZERO-LATENCY FURIGANA & INSTANT LOOKUP
Hover over any Japanese text across the web to immediately inspect Furigana (Hiragana or Katakana), Romaji, Pitch Accents, and definitions. Powered by a high-speed offline dictionary engine, ZYNO Nihon responds in under 5 milliseconds with no external server delays.

2. ✍️ ANIMATED KANJI STROKE ORDER VISUALIZER
Deconstruct complex Kanji into radicals, stroke counts, and animated vector drawing sequences. Master correct stroke orders and reinforce muscle memory effortlessly right within the hover card.

3. 🎬 YOUTUBE & NETFLIX IMMERSION & SMART SHADOWING
Turn anime, dramas, and YouTube videos into authentic listening practice!
- Hover directly on Japanese subtitles to inspect vocabulary without switching tabs.
- Smart Shadowing Auto-pause: Automatically pauses at sentence ends so you can repeat and perfect your pronunciation.
- Instant replay shortcuts: Press 'A' to jump back 3.5 seconds to hear dialogue again.

4. 📥 1-CLICK MULTIMEDIA ANKI DESKTOP EXPORT
Forget tedious manual flashcard creation. Connect seamlessly to Anki Desktop via AnkiConnect:
- Press 'E' or click the Anki button to export the word, Furigana reading, definition, and context sentence.
- Multimedia Capture: Automatically records the audio snippet and captures the video scene snapshot directly onto your Anki card!

5. 🧠 BUILT-IN SPACED REPETITION (SRS) FLASHCARDS
Review vocabulary using the scientifically proven SuperMemo SM-2 Spaced Repetition algorithm. Organize your words into multiple custom decks (JLPT N5-N1, IT & Tech, Everyday Life) and review due cards daily in full screen.

6. 🔍 QUICK SEARCH PALETTE (ALT + S)
Need a quick bilingual dictionary lookup? Press Alt+S (or Alt+J to toggle hover) to bring up a sleek search palette anywhere on the web, even when the hover mode is turned off.

7. 🤖 OPTIONAL BRING-YOUR-OWN-KEY AI ASSISTANT
Need help with dense reading comprehension (Dokkai) or tricky JLPT grammar nuances? Connect your own free Google Gemini API key or OpenAI key for instant sentence breakdowns, grammatical analysis, and contextual explanations.

============================================================
🛡️ COMMITTED TO LOCAL-FIRST PRIVACY & ETHICS
============================================================

Unlike bloated tools loaded with invasive trackers and paywalls:
- 100% Free Forever: Every single feature is unlocked out of the box. No "Pro" subscriptions.
- Zero Ads & Zero Bloat: Clean, quiet dark-glassmorphism interface that respects your attention.
- Local-First Architecture: Your saved words, study stats, and dictionary queries remain strictly on your local computer.
- Safe & Lightweight: Manifest V3 compliant, memory-efficient, and optimized for battery life.

============================================================
⌨️ ESSENTIAL KEYBOARD SHORTCUTS
============================================================
- Alt + J: Quick Toggle Furigana Hover Mode
- Alt + S: Open Quick Search Palette
- S: Play Native Audio Pronunciation
- P: Pin Tooltip in Place
- W: Save Word to Notebook
- E: 1-Click Export to Anki Desktop
- C: Copy Word to Clipboard
- Esc: Close Tooltip

Take your Japanese reading, listening, and vocabulary retention to fluency. Install ZYNO Nihon today!

Official Website: https://zyno.top
Developer Support: lexuantruong098@gmail.com
Part of the ZYNO Product Ecosystem.
```

---

## 🎨 3. DANH MỤC ẢNH STORE ASSETS ĐÃ XUẤT XƯỞNG (CHROME WEB STORE)

Toàn bộ ảnh quảng bá chuẩn kích thước của Google đã được thiết kế và xuất sẵn trong thư mục `store_assets/`:

1. **Bộ Icon Tiện ích:**
   - `icons/icon16.png` (16x16 px)
   - `icons/icon32.png` (32x32 px)
   - `icons/icon48.png` (48x48 px)
   - `icons/icon128.png` (128x128 px - Bắt buộc)
   - `icons/icon256.png` (256x256 px)

2. **Ảnh Bìa Quảng Bá Nhỏ (Small Promotional Tile - Bắt buộc):**
   - File: `store_assets/small_promo_440x280.png` (Kích thước: 440 × 280 px)
   - Thiết kế: Nền Cyber Grid tối, logo 3D Cổng Torii + Ribbon N, typography ZYNO NIHON và 3 feature pills.

3. **Ảnh Bìa Quảng Bá Lớn (Marquee Promotional Tile - Khuyên dùng):**
   - File: `store_assets/marquee_promo_1400x560.png` (Kích thước: 1400 × 560 px)
   - Thiết kế: Banner hiển thị toàn diện các tính năng Free Community Edition và thẻ chứng thực.

4. **Bộ 5 Ảnh Chụp Màn Hình Tính Năng (Screenshots - 1280 × 800 px):**
   - `store_assets/screenshot1_furigana_hover_1280x800.png`: Rê chuột Furigana, Hán-Việt & Nét vẽ Kanji
   - `store_assets/screenshot2_video_immersion_1280x800.png`: Phụ đề YouTube/Netflix & Luyện Shadowing
   - `store_assets/screenshot3_anki_export_1280x800.png`: 1-Click xuất thẻ Anki đa phương tiện (Audio & Ảnh)
   - `store_assets/screenshot4_srs_flashcards_1280x800.png`: Sổ tay từ vựng & Flashcards SRS SuperMemo SM-2
   - `store_assets/screenshot5_ai_grammar_1280x800.png`: Trợ lý AI phân tích Dokkai & Tra cứu nhanh Alt+S
