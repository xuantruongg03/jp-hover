# 🇯🇵 JP Furigana Hover Pro (v1.4.0) - Tiện ích Tra cứu, Phiên âm, Nét vẽ Kanji, Phụ đề Video, AnkiConnect & SRS Flashcards

Tiện ích mở rộng Chrome / Edge (Manifest V3) toàn diện nhất dành cho người học tiếng Nhật: **Rê chuột hiển thị Furigana, Romaji, Hán-Việt, Xem thứ tự nét viết chữ Hán SVG, Chèn Furigana toàn trang (Alt+F), Tra từ trên phụ đề YouTube & Netflix, Đồng bộ 1-Click Anki Desktop (Phím E), Thanh tra cứu nhanh (Alt+S) và Hệ thống ôn tập Lặp lại ngắt quãng (SRS SM-2)**.

---

## ✨ Tính năng đột phá mới trong phiên bản 1.4.0

### 1. 📥 Tích hợp AnkiConnect 1-Click Sync (`localhost:8765`)
- **Đẩy từ vựng vào Anki siêu tốc**: Không còn phải xuất file CSV rồi nhập thủ công. Khi rê chuột trên web, chỉ cần bấm **phím `E`** hoặc nút **`📥 Anki`** trên tooltip:
  - Tự động nạp Kanji, Furigana, Hán-Việt, Giải nghĩa, Trọng âm (Pitch Accent) và **câu ngữ cảnh thực tế trên web** (Sentence Mining).
  - Tự động tạo Deck nếu chưa có, hỗ trợ tùy biến Deck Name và Model Type trong Popup cài đặt.
  - Hỗ trợ nút **"Đồng bộ tất cả từ vựng sang Anki"** trong Popup và trang Flashcards.

### 2. ✍️ Hoạt ảnh Thứ tự Nét viết Chữ Hán (Kanji Stroke Order SVG)
- **Xem cách viết chuẩn chữ Hán**: Click vào bất kỳ chữ Kanji nào trên bảng bóc tách của Tooltip, trang Flashcards hoặc Thanh tra cứu nhanh để mở cửa sổ hoạt ảnh nét viết.
- **Tính năng điều khiển mượt mà**:
  - Tự động chạy animation mô phỏng ngòi bút vẽ từng nét theo đúng quy tắc thuận bút (trên xuống dưới, trái sang phải, trong trước đóng sau).
  - Nút **▶️ Phát lại nét** và **🔢 Bật/Tắt số thứ tự nét**.
  - Hiển thị đầy đủ bộ thủ, số nét, âm On, âm Kun và cấp độ JLPT tương ứng.

### 3. ✨ Chế độ Chèn Furigana Toàn trang Web (Smart Furigana - `Alt + R` / `Alt + F`)
- **Đọc báo & tin tức không còn rào cản**: Bấm phím tắt **`Alt + R`** (hoặc `Alt + F` / nút bấm trong Popup) để tự động chèn phiên âm `<ruby>` lên toàn bộ chữ Kanji trên bất kỳ trang web nào (NHK, Yahoo News, Wikipedia, blog cá nhân).
- **Bộ lọc cấp độ JLPT chống rối mắt**:
  - `Tất cả chữ Hán` (All)
  - `Từ N4 trở lên` (Ẩn Furigana của các chữ N5 quá quen thuộc như 日, 本, 人, 学校)
  - `Từ N3 trở lên` (Chỉ hiện chữ Trung cấp trở lên)
  - `Từ N2 / N1` (Dành cho người học Cao cấp)
- **Hoàn trả DOM sạch 100%**: Bấm lại `Alt + F` để gỡ bỏ toàn bộ Furigana, khôi phục nguyên trạng trang web.

### 4. 🎬 Tra từ trên Phụ đề Video YouTube & Netflix (Immersion Learning)
- **Học tiếng Nhật qua Anime & Phim ảnh**: Tự động nhận diện phụ đề tiếng Nhật trên YouTube và Netflix.
- Rê chuột vào bất kỳ từ nào trên phụ đề để tra cứu nghĩa và lưu vào sổ tay.
- **Tự động tạm dừng**: Tùy chọn tự động dừng video khi rê chuột tra từ để không bị lỡ khung hình.
- **Phím tắt `A`**: Bấm phím `A` khi đang xem video để **tua lại 3.5 giây**, nghe lại trọn vẹn câu thoại vừa phát.

### 5. 🔍 Thanh Tra cứu nhanh nổi (Command Palette - `Alt + S`)
- Bấm **`Alt + S`** trên bất kỳ tab web nào để mở thanh tìm kiếm Spotlight giữa màn hình.
- Tra cứu tức thì theo **Kanji, Hiragana, Katakana, Romaji hoặc tiếng Việt**.
- Kết quả trực quan kèm phát âm, xem nét vẽ chữ Hán và nạp trực tiếp vào Anki Desktop.

### 6. 🧠 Hệ thống Lặp lại Ngắt quãng (SRS SuperMemo SM-2)
- Trang Flashcards 3D toàn màn hình được nâng cấp toàn diện với thuật toán **SRS SM-2**:
  - **4 nút đánh giá chuẩn khoa học**: `❌ 1. Quên (Again)`, `⚠️ 2. Khó (Hard)`, `👍 3. Tốt (Good)`, `⭐ 4. Dễ (Easy)`.
  - Tự động tính toán khoảng cách ngày ôn tập tối ưu (1 ngày, 3 ngày, 7 ngày, 16 ngày, 35 ngày...) đưa từ vựng vào trí nhớ vĩnh viễn.
  - **Bộ lọc "Đến hạn ôn hôm nay (Due)"**: Giúp người học hoàn thành mục tiêu học tập hàng ngày.
  - **Huy hiệu thông báo trên Icon Extension**: Hiển thị số lượng thẻ cần ôn tập trực tiếp trên thanh công cụ trình duyệt.

---

## ⚡ Bảng Phím tắt Toàn diện (Shortcuts Cheat Sheet)

| Phím tắt | Phạm vi | Chức năng |
| :--- | :--- | :--- |
| **`Alt + J`** | Toàn trình duyệt | Bật / Tắt nhanh tiện ích phiên âm tiếng Nhật |
| **`Alt + R` / `Alt + F`** | Toàn trình duyệt / Trang web | Bật / Tắt chèn Furigana toàn trang web |
| **`Alt + S`** | Trang web | Mở thanh tra cứu nhanh Spotlight (Command Palette) |
| **`E`** | Khi Tooltip đang hiện | **Đẩy ngay từ vựng và câu ngữ cảnh vào Anki Desktop** |
| **`S`** | Khi Tooltip đang hiện | Phát âm từ vựng bằng giọng đọc chuẩn bản ngữ |
| **`A`** | Khi xem Video YouTube/Netflix | Tua lại 3.5 giây để nghe lại câu thoại phụ đề |
| **`Space`** | Trang Flashcards | Lật thẻ Flashcard 3D xem đáp án |
| **`1` / `2` / `3` / `4`** | Trang Flashcards | Đánh giá mức độ nhớ SRS (1: Quên, 2: Khó, 3: Tốt, 4: Dễ) |
| **`R`** | Trang Flashcards | Xáo trộn thứ tự các thẻ |

---

## 📦 Hướng dẫn cài đặt vào trình duyệt (Chrome, Edge, Brave, Cốc Cốc)

1. Mở trình duyệt và truy cập vào trang quản lý tiện ích:
   - **Google Chrome**: `chrome://extensions`
   - **Microsoft Edge**: `edge://extensions`
   - **Cốc Cốc**: `coccoc://extensions`
   - **Brave**: `brave://extensions`

2. Bật công tắc **Chế độ dành cho nhà phát triển (Developer mode)** ở góc trên bên phải.

3. Nhấn vào nút **Tải tiện ích đã giải nén (Load unpacked)** ở góc trên bên trái.

4. Chọn thư mục dự án:
   ```
   d:\Github\ext\JP
   ```

5. Ghim (Pin 📌) icon **JP Furigana Hover Pro** lên thanh công cụ trình duyệt.

---

## 🧪 Kiểm thử tiện ích

- Mở trực tiếp file kiểm thử bộ tính năng:
  ```
  file:///d:/Github/ext/JP/test.html
  ```
- Mở trang Flashcards SRS toàn màn hình:
  ```
  file:///d:/Github/ext/JP/flashcards.html
  ```

---

## 📁 Cấu trúc thư mục dự án

```
d:\Github\ext\JP\
├── manifest.json            # Cấu hình Manifest V3, permissions & commands
├── background.js           # Service Worker quản lý phím tắt, Anki proxy & Badge SRS
├── flashcards.html         # Trang Luyện tập Flashcards SRS 3D, Luyện nghe & Thi thử JLPT
├── flashcards.css          # CSS thiết kế giao diện Flashcards hiện đại
├── flashcards.js           # Logic SRS SM-2, lật thẻ 3D, Anki sync & Stroke order
├── test.html               # Bộ kiểm thử 7 phần toàn diện
├── README.md               # Hướng dẫn chi tiết dự án v1.4.0
├── icons/                  # Bộ icon độ phân giải 16, 32, 48, 128
├── utils/
│   ├── anki.js             # Thư viện AnkiConnect Client (localhost:8765)
│   ├── kanji_strokes.js    # Engine thứ tự nét viết Kanji SVG & Animator
│   ├── storage.js          # Quản lý lưu trữ tập trung & thuật toán SM-2 SRS
│   ├── audio.js            # Dual-engine TTS (Web Speech API + Google TTS)
│   └── helpers.js          # Các hàm tiện ích bổ trợ
├── content/
│   ├── subtitles.js        # Tra từ trên phụ đề YouTube/Netflix & tua lại câu
│   ├── quick_search.js     # Thanh tra cứu nhanh Spotlight (Alt+S)
│   ├── romaji.js           # Bộ chuyển đổi Hiragana/Katakana sang Romaji Hepburn
│   ├── engine.js           # Tách từ, De-inflector 109 quy tắc, Furigana & Audio
│   ├── content.js          # Shadow DOM Tooltip, Anki 1-click & Stroke order modal
│   └── tooltip.css         # Styling Glassmorphic, Stroke Modal & Quick Search
├── data/
│   ├── kanji_hanviet.js    # Dữ liệu 2,683 Kanji Joyo + JLPT N5-N1
│   ├── dictionary.js       # Từ điển 546 từ vựng & 109 quy tắc De-inflection
│   ├── dictionary_expanded.js # Kho từ vựng mở rộng cao cấp (JLPT N5-N1)
│   ├── grammar_rules.js    # Dữ liệu mẫu ngữ pháp tiếng Nhật JLPT N5-N1
│   └── jlpt_exam_data.js   # Đề thi thử JLPT, bài tập luyện nghe & luyện viết
└── popup/
    ├── popup.html          # Giao diện Popup: Cài đặt, Anki, Furigana & Sổ từ SRS
    ├── popup.css           # CSS giao diện Popup tối hiện đại
    └── popup.js            # Lưu cài đặt, kiểm tra Anki, đồng bộ & tra cứu
```
