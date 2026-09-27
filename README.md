# 🇯🇵 JP Furigana Hover (v1.2.0) - Tiện ích Tra cứu, Phiên âm, Sổ tay & Flashcards Tiếng Nhật

Tiện ích mở rộng Chrome (Manifest V3) hiện đại, mượt mà, giúp bạn vừa duyệt web vừa học tiếng Nhật đỉnh cao: **chỉ cần rê chuột vào bất kỳ từ tiếng Nhật nào để xem ngay phiên âm Hiragana, Romaji, Âm Hán-Việt, Giải nghĩa, Nghe phát âm chuẩn, Lưu vào Sổ tay từ vựng, Luyện tập Flashcards 3D và Dịch câu khi bôi đen**.

---

## ✨ Tính năng nổi bật (v1.2.0)

### 1. 🎴 Trang Luyện tập Flashcards 3D & Sổ tay Từ vựng Toàn màn hình (Mới trong v1.2.0)
- **Mở giao diện chuyên biệt**: Truy cập trang Flashcards toàn màn hình chỉ với 1 click từ Tooltip (`🎴`) hoặc từ Popup tiện ích (`flashcards.html`).
- **Thẻ Flashcard 3D sinh động**:
  - Lật thẻ 3D mượt mà (`Space` hoặc nhấp chuột) để kiểm tra khả năng nhớ từ.
  - Chuyển đổi linh hoạt giữa 2 chế độ: `🇯🇵 Tiếng Nhật ➔ 🇻🇳 Tiếng Việt` hoặc `🇻🇳 Tiếng Việt ➔ 🇯🇵 Tiếng Nhật`.
  - Phát âm giọng đọc chuẩn bản ngữ trực tiếp trên thẻ (Phím `S`).
  - Đánh giá nhanh: `❌ Chưa nhớ (Phím 1 hoặc ←)` hoặc `✅ Đã thuộc (Phím 2 hoặc →)`.
  - Thanh tiến độ động theo thời gian thực kèm màn hình tổng kết phiên học sau khi hoàn thành.
  - Phím tắt bàn phím toàn diện: `Space` (Lật), `1` (Chưa nhớ), `2` (Đã nhớ), `S` (Phát âm), `R` (Xáo trộn).
- **Quản lý & Tra cứu Sổ tay chuyên sâu**:
  - Tra cứu thời gian thực theo Kanji, Hiragana, Romaji, Hán-Việt hoặc nghĩa tiếng Việt.
  - Chuyển đổi linh hoạt giữa Dạng lưới (Grid Cards) và Dạng bảng (Table List).
  - Thêm từ vựng thủ công với tính năng **Tự điền thông minh**: Nhập từ tiếng Nhật, hệ thống tự động phân tích Hán-Việt, phiên âm Hiragana, Romaji và nghĩa từ kho 2,683 Kanji & từ điển.
  - Chỉnh sửa từ vựng, ghi chú cá nhân và xóa từ nhanh chóng.
  - Đổi trạng thái học tập trực tiếp bằng 1 click (`🧠 Đang học` ⟷ `✅ Đã thuộc`).
  - **Sao lưu & Phục hồi JSON**: Tải file sao lưu hoặc khôi phục dữ liệu sổ tay giữa các máy tính.

### 2. 🔍 Rê chuột (Hover) tức thì & Thông minh
- **Nhận diện chính xác**: Tự động tách từ bằng `Intl.Segmenter` kết hợp quét từ ghép đa phân đoạn (compound words) và bộ giải mã chia đuôi động từ/tính từ (**109 quy tắc de-inflection**: `〜ば`, `〜たら`, `〜なさい`, `〜やすい`, `〜にくい`, `〜すぎる`, `〜ちゃう`, `〜とく`, `〜ず`, v.v.).
- **Shadow DOM biệt lập**: Giao diện Tooltip Glassmorphic tối màu siêu đẹp, cách ly 100% — không bao giờ bị vỡ layout bởi CSS của trang web đang xem. Hỗ trợ dự phòng CSS nội tuyến chạy mượt mà ngay cả trên các trang có chính sách bảo mật khắt khe (CSP) như GitHub, X/Twitter.
- **Tự động căn lề màn hình**: Tự động nhận diện mép màn hình và tính toán lại vị trí ngay cả khi dữ liệu nghĩa được tải bất đồng bộ, chống tràn viền (off-screen clipping).

### 3. 📚 Dữ liệu tra cứu toàn diện & Chuyên sâu
- 🎌 **Cách đọc (Furigana / Hiragana)**: Hiển thị cách đọc Hiragana chuẩn xác, hỗ trợ chuyển đổi từ Romaji sang Hiragana cho cả từ tra cứu online.
- 🔤 **Phiên âm Romaji chuẩn Hepburn**: Hỗ trợ nguyên âm dài (`ō`, `ū`) và phụ âm kép âm ngắt `っ`.
- 🏮 **Âm Hán-Việt toàn diện (2,683 Kanji)**: Bao phủ 100% của 2,136 chữ **Joyo Kanji** thường dùng + chữ Hán JLPT N5 đến N1 (ví dụ: `学校` → `HỌC HIỆU`, `電車` → `ĐIỆN XA`, `先生` → `TIÊN SINH`, `日本語` → `NHẬT BẢN NGỮ`).
- 💡 **Giải nghĩa phong phú & Tra cứu thông minh**: Tích hợp sẵn 546+ từ vựng cốt lõi offline, tự động gọi API tra cứu tiếng Việt bổ sung khi gặp từ vựng mới.
- 🔊 **Phát âm tiếng Nhật kép (Dual-Engine Audio)**: Sử dụng Web Speech API tích hợp sẵn. Nếu máy tính Windows chưa cài gói ngôn ngữ tiếng Nhật, tiện ích **tự động chuyển sang luồng phát âm trực tuyến Google TTS**, đảm bảo nghe phát âm 100% mọi lúc. Biểu tượng loa có hiệu ứng sóng âm động khi đang phát.

### 4. ⭐ Sổ tay từ vựng & Xuất dữ liệu Anki
- ⭐ **Lưu từ vựng 1-click**: Bấm vào ngôi sao trên tooltip để lưu từ vựng vào Sổ tay. Ngôi sao sẽ sáng vàng và đồng bộ tức thì với bộ nhớ trình duyệt (`chrome.storage.local`).
- 📋 **Sao chép nhanh (Quick Copy)**: Bấm nút sao chép trên tooltip để lấy nhanh định dạng chuẩn: `Từ [Cách đọc] (Hán-Việt) - Nghĩa` kèm hiệu ứng tích xanh.
- 📖 **Quản lý Sổ tay trong Popup**:
  - Xem danh sách từ đã lưu kèm huy hiệu đếm số lượng trực tiếp trên tab.
  - Ô tìm kiếm từ vựng theo thời gian thực (hỗ trợ tìm cả tiếng Nhật, Hán-Việt lẫn tiếng Việt).
  - Nghe lại phát âm hoặc xóa từng từ nhanh chóng.
- 📥 **Xuất file Anki CSV**: Chỉ 1 bấm nút để tải file `.csv` chuẩn định dạng UTF-8 có BOM (không lo lỗi font tiếng Việt/tiếng Nhật) để nhập ngay vào ứng dụng học thẻ nhớ Flashcard **Anki**.

### 5. 💬 Dịch câu khi bôi đen (Selection Translate)
- Bôi đen (highlight) bất kỳ câu hoặc đoạn văn tiếng Nhật nào trên trang web.
- Một nút huy hiệu nhỏ gọn **"Dịch câu"** sẽ xuất hiện tinh tế ngay phía trên đoạn chọn.
- Nhấp vào để mở thẻ dịch câu tiếng Việt sắc nét, mượt mà mà không cần chuyển qua Google Dịch. Có thể bật/tắt tính năng này tùy ý trong cài đặt.

### 6. ⚡ Phím tắt & Trải nghiệm tiện lợi
- **`Alt + J`**: Bật hoặc Tắt nhanh toàn bộ tiện ích bất cứ lúc nào.
- Hiển thị huy hiệu trạng thái **`ON`** (xanh ngọc) hoặc **`OFF`** (xám) trực tiếp trên icon tiện ích.
- Thông báo Toast hiển thị nhanh góc màn hình khi bấm phím tắt.
- **Chế độ kích hoạt tùy chọn**:
  - 🚀 *Luôn hiển thị*: Rê chuột là hiện.
  - ⌨️ *Giữ phím Shift*: Chỉ hiện khi vừa giữ phím `Shift` vừa rê chuột (tránh vướng mắt).
  - ⌥ *Giữ phím Alt*: Chỉ hiện khi vừa giữ phím `Alt` vừa rê chuột.

---

## 📦 Hướng dẫn cài đặt vào trình duyệt (Chrome, Edge, Brave, Cốc Cốc)

1. Mở trình duyệt và truy cập vào trang quản lý tiện ích:
   - **Google Chrome**: `chrome://extensions`
   - **Microsoft Edge**: `edge://extensions`
   - **Cốc Cốc**: `coccoc://extensions`
   - **Brave**: `brave://extensions`

2. Bật công tắc **Chế độ dành cho nhà phát triển (Developer mode)** ở góc trên bên phải.

3. Nhấn vào nút **Tải tiện ích đã giải nén (Load unpacked)** ở góc trên bên trái.

4. Chọn thư mục dự án này:
   ```
   d:\Github\ext\JP
   ```

5. Sau khi nạp thành công, hãy ghim (Pin 📌) icon **JP Furigana Hover** lên thanh công cụ trình duyệt để tiện mở popup và theo dõi trạng thái.

---

## ⚡ Tùy chỉnh phím tắt (Shortcuts)

Mặc định phím tắt là **`Alt + J`**. Nếu muốn thay đổi thành phím tắt khác:
1. Mở `chrome://extensions/shortcuts` trên thanh địa chỉ trình duyệt.
2. Tìm tiện ích **JP Furigana Hover - Phiên âm Tiếng Nhật**.
3. Nhấp vào biểu tượng bút chì ✏️ và gán tổ hợp phím mong muốn (Ví dụ: `Ctrl + Shift + J` hoặc `Alt + K`).

---

## 🧪 Kiểm thử tiện ích & Flashcards

- Mở trực tiếp trang Flashcards & Sổ tay:
  ```
  file:///d:/Github/ext/JP/flashcards.html
  ```
- Mở trực tiếp file kiểm thử `test.html`:
  ```
  file:///d:/Github/ext/JP/test.html
  ```
- Hoặc mở các trang tin tức / mạng xã hội tiếng Nhật thực tế:
  - [NHK News Web Easy](https://www3.nhk.or.jp/news/easy/)
  - [Yahoo! Japan](https://www.yahoo.co.jp/)
  - [Wikipedia Tiếng Nhật](https://ja.wikipedia.org/)

---

## 📁 Cấu trúc thư mục

```
d:\Github\ext\JP\
├── manifest.json            # Cấu hình Manifest V3, permissions & commands
├── background.js           # Service Worker quản lý phím tắt Alt+J & icon badge
├── flashcards.html         # Trang Luyện tập Flashcards 3D & Sổ tay toàn màn hình
├── flashcards.css          # CSS thiết kế giao diện Flashcards hiện đại
├── flashcards.js           # Logic lật thẻ 3D, thống kê ghi nhớ, Anki & JSON backup
├── test.html               # Bộ kiểm thử 6 phần tương tác trực tiếp
├── README.md               # Hướng dẫn chi tiết dự án v1.2.0
├── create_icons.ps1        # Script PowerShell tự động tạo bộ icon PNG
├── icons/                  # Bộ icon độ phân giải 16, 32, 48, 128
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── data/
│   ├── kanji_hanviet.js    # Cơ sở dữ liệu 2,683 chữ Kanji Joyo + JLPT N5-N1
│   └── dictionary.js       # Từ điển 546 từ vựng & 109 quy tắc De-inflection
├── content/
│   ├── romaji.js           # Bộ chuyển đổi Hiragana/Katakana sang Romaji Hepburn
│   ├── engine.js           # Tách từ, De-inflector, Furigana & Dual TTS Audio
│   ├── content.js          # Shadow DOM Tooltip, Bookmark, Copy & Dịch câu bôi đen
│   └── tooltip.css         # Styling Glassmorphic cách ly trong Shadow DOM
└── popup/
    ├── popup.html          # Giao diện 2 Tab: Cài đặt & Sổ tay từ vựng ⭐
    ├── popup.css           # CSS giao diện Popup tối hiện đại
    └── popup.js            # Lưu cài đặt, tìm kiếm từ, phát âm & Xuất Anki CSV
```
