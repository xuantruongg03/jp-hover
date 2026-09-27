# 🇯🇵 JP Furigana Hover - Tiện ích Tra cứu & Phiên âm Tiếng Nhật khi Rê chuột

Tiện ích mở rộng Chrome (Manifest V3) hiện đại, mượt mà, giúp bạn vừa duyệt web vừa học tiếng Nhật dễ dàng: **chỉ cần rê chuột vào bất kỳ từ tiếng Nhật nào để xem ngay phiên âm Hiragana, Romaji, Âm Hán-Việt, Giải nghĩa và Nghe phát âm chuẩn**.

---

## ✨ Tính năng nổi bật

1. **Rê chuột (Hover) tức thì**:
   - Tự động nhận diện từ vựng dưới con trỏ chuột (bao gồm Kanji, từ ghép Kanji, động từ chia đuôi, Katakana, Hiragana).
   - Hiển thị Tooltip **Shadow DOM** biệt lập — không bao giờ bị ảnh hưởng hay vỡ layout bởi CSS của trang web đang xem.

2. **Đầy đủ thông tin hữu ích**:
   - 🎌 **Cách đọc (Furigana / Hiragana)**: Hiển thị cách phát âm chính xác của từ.
   - 🔤 **Phiên âm Romaji**: Tự động chuyển đổi chuẩn Hepburn (ví dụ: `gakkou`, `nihongo`, `tabemasu`).
   - 🏮 **Âm Hán-Việt**: Tra cứu âm Hán-Việt cho từng chữ Kanji (ví dụ: `日本語` → `NHẬT BẢN NGỮ`, `学校` → `HỌC HIỆU`).
   - 💡 **Giải nghĩa tiếng Việt**: Dữ liệu từ vựng phong phú từ N5 đến N1.
   - 🔊 **Phát âm tiếng Nhật (TTS)**: Bấm vào biểu tượng loa để nghe giọng đọc tự nhiên của trình duyệt.

3. **Phím tắt Bật / Tắt siêu nhanh**:
   - Bấm **`Alt + J`** bất cứ lúc nào để BẬT hoặc TẮT chế độ phiên âm.
   - Hiển thị huy hiệu **`ON`** (xanh) hoặc **`OFF`** (xám) trên biểu tượng tiện ích.
   - Thông báo Toast hiển thị nhanh góc màn hình khi chuyển đổi trạng thái.

4. **Chế độ kích hoạt linh hoạt (Trong Popup cài đặt)**:
   - 🚀 *Luôn hiển thị*: Tự động hiện khi rê chuột.
   - ⌨️ *Giữ phím Shift*: Chỉ hiện khi vừa giữ phím `Shift` vừa rê chuột (tránh vướng mắt khi đọc nhanh).
   - ⌥ *Giữ phím Alt*: Chỉ hiện khi vừa giữ phím `Alt` vừa rê chuột.

5. **Khung thử nghiệm (Live Playground)**:
   - Thử nghiệm ngay trong giao diện Popup với các câu mẫu tiếng Nhật trước khi duyệt web.

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

5. Sau khi nạp thành công, hãy ghim (Pin 📌) icon **JP Furigana Hover** lên thanh công cụ trình duyệt để tiện theo dõi trạng thái.

---

## ⚡ Tùy chỉnh phím tắt (Shortcuts)

Mặc định phím tắt là **`Alt + J`**. Nếu muốn thay đổi thành phím tắt khác:
1. Mở `chrome://extensions/shortcuts` trên thanh địa chỉ trình duyệt.
2. Tìm tiện ích **JP Furigana Hover - Phiên âm Tiếng Nhật**.
3. Nhấp vào biểu tượng bút chì ✏️ và gán tổ hợp phím mong muốn (Ví dụ: `Ctrl + Shift + J` hoặc `Alt + K`).

---

## 🧪 Kiểm thử tiện ích

Bạn có thể mở trực tiếp file `test.html` trong thư mục bằng trình duyệt để kiểm tra:
```
file:///d:/Github/ext/JP/test.html
```
Hoặc mở các trang tin tức / mạng xã hội tiếng Nhật như:
- [NHK News Web Easy](https://www3.nhk.or.jp/news/easy/)
- [Yahoo! Japan](https://www.yahoo.co.jp/)
- [Wikipedia Tiếng Nhật](https://ja.wikipedia.org/)

---

## 📁 Cấu trúc thư mục

```
d:\Github\ext\JP\
├── manifest.json            # Cấu hình Manifest V3 & phím tắt Alt+J
├── background.js           # Service Worker quản lý phím tắt & Badge
├── test.html               # Trang HTML kiểm thử toàn diện
├── README.md               # Hướng dẫn chi tiết
├── create_icons.ps1        # Script PowerShell vẽ icon
├── icons/                  # Bộ icon độ phân giải 16, 32, 48, 128
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── data/
│   ├── kanji_hanviet.js    # Bảng tra cứu Âm Hán-Việt Joyo Kanji
│   └── dictionary.js       # Từ điển tiếng Nhật N5-N1 & De-inflection
├── content/
│   ├── romaji.js           # Bộ chuyển đổi Hiragana/Katakana sang Romaji Hepburn
│   ├── engine.js           # Tách từ Intl.Segmenter, Furigana & Web Speech API
│   ├── content.js          # Lắng nghe chuột, Shadow DOM tooltip & Toast
│   └── tooltip.css         # Styling Glassmorphic cách ly trong Shadow DOM
└── popup/
    ├── popup.html          # Giao diện cài đặt & Khung thử nghiệm trực tiếp
    ├── popup.css           # CSS giao diện Popup tối hiện đại
    └── popup.js            # Lưu cài đặt Chrome Storage & Live Test
```
