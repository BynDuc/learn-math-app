# 🎓 Học Toán Vui - Website Học Toán Tiền Tiểu Học

Website học toán cho trẻ 5 tuổi tại Việt Nam với 400+ bài tập và hệ thống lưu kết quả.

## ✨ Tính Năng

- 🔢 4 chương trình học: Số 0-10, Đếm & So sánh, Cộng Trừ, Hình Học
- 📚 400 bài tập độc đáo (100 bài/chương trình)
- 💾 Lưu kết quả bài tập vào database
- 📊 Theo dõi tiến độ học tập
- 📱 Responsive design cho mobile/tablet

## 🚀 Cài Đặt Backend

### Yêu Cầu

- Node.js (phiên bản 14.x trở lên)
- npm (đi kèm với Node.js)

### Cài Đặt Node.js

1. Tải Node.js tại: https://nodejs.org/
2. Cài đặt phiên bản LTS (Long Term Support)
3. Kiểm tra cài đặt:
   ```bash
   node --version
   npm --version
   ```

### Cài Đặt Dependencies

Mở terminal/command prompt trong thư mục dự án và chạy:

```bash
npm install
```

Lệnh này sẽ cài đặt:
- `express` - Web framework
- `sqlite3` - SQLite database
- `cors` - Cross-Origin Resource Sharing
- `body-parser` - Parse request bodies

## 🎮 Chạy Ứng Dụng

### 1. Khởi Động Backend Server

```bash
npm start
```

hoặc

```bash
node server.js
```

Server sẽ chạy tại: `http://localhost:3000`

### 2. Mở Website

Mở trình duyệt và truy cập:
```
http://localhost:3000
```

## 📖 Sử Dụng

### Dành Cho Học Sinh

1. Truy cập trang chủ
2. Chọn "Làm Bài Tập" hoặc chọn chương trình học
3. Nhập tên để bắt đầu (lần đầu tiên)
4. Làm bài tập và xem kết quả ngay lập tức
5. Kết quả được lưu tự động

### Dành Cho Phụ Huynh/Giáo Viên

- Xem tiến độ học tập của trẻ qua API endpoints
- API Documentation: Xem phần API Reference bên dưới

## 📁 Cấu Trúc Dự Án

```
learn-math-app/
├── data/                      # Exercise data files
│   ├── exercises-module1.json # 100 bài tập Module 1
│   ├── exercises-module2.json # 100 bài tập Module 2
│   ├── exercises-module3.json # 100 bài tập Module 3
│   └── exercises-module4.json # 100 bài tập Module 4
├── index.html                 # Trang chủ
├── curriculum.html            # Trang chương trình học
├── lesson-numbers.html        # Bài học số 0-10
├── lesson-counting.html       # Bài học đếm & so sánh
├── lesson-arithmetic.html     # Bài học cộng trừ
├── lesson-geometry.html       # Bài học hình học
├── practice.html              # Trang làm bài tập (TẠO SAU)
├── styles.css                 # Stylesheet chính
├── script.js                  # JavaScript cho UI
├── api-client.js              # API client
├── server.js                  # Express server
├── database.js                # SQLite database module
├── package.json               # Node.js dependencies
├── mathapp.db                 # SQLite database (tự động tạo)
└── README.md                  # File này

```

## 🔌 API Reference

### Exercises

- `GET /api/exercises/:module` - Lấy tất cả bài tập của module (1-4)
- `GET /api/exercises/:module/:id` - Lấy bài tập cụ thể

### Students

- `POST /api/students` - Tạo học sinh mới
  ```json
  { "name": "Bé Minh" }
  ```
- `GET /api/students` - Lấy danh sách tất cả học sinh
- `GET /api/students/:id` - Lấy thông tin học sinh

### Results

- `POST /api/results` - Lưu kết quả bài tập
  ```json
  {
    "studentId": 1,
    "module": 1,
    "exerciseId": 5,
    "answer": "3",
    "isCorrect": true
  }
  ```
- `GET /api/results/:studentId` - Lấy tất cả kết quả của học sinh
- `GET /api/results/:studentId/:module` - Lấy kết quả theo module

### Progress

- `GET /api/progress/:studentId/:module` - Lấy tiến độ theo module
- `GET /api/progress/:studentId` - Lấy tổng tiến độ

## 💾 Database Schema

### Table: students
```sql
id INTEGER PRIMARY KEY
name TEXT NOT NULL
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
```

### Table: results
```sql
id INTEGER PRIMARY KEY
student_id INTEGER NOT NULL
module INTEGER NOT NULL
exercise_id INTEGER NOT NULL
answer TEXT NOT NULL
is_correct BOOLEAN NOT NULL
completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
```

## 🛠️ Troubleshooting

### Port đang được sử dụng
Nếu port 3000 đang được sử dụng, bạn có thể thay đổi trong `server.js`:
```javascript
const PORT = process.env.PORT || 3001; // Đổi sang 3001
```

### Database bị lỗi
Xóa file `mathapp.db` và khởi động lại server để tạo database mới.

### CORS errors
Đảm bảo rằng CORS middleware đã được cấu hình đúng trong `server.js`.

## 📝 License

MIT License - Tự do sử dụng cho mục đích giáo dục

## 👨‍💻 Phát Triển Thêm

Các tính năng có thể thêm:
- [ ] User authentication
- [ ] Parent dashboard
- [ ] Exercise generator
- [ ] Gamification (badges, rewards)
- [ ] Print worksheets
- [ ] Multi-language support
- [ ] Voice instructions

## 📞 Hỗ Trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra console log
2. Xem file README.md
3. Kiểm tra kết nối database

---

**Được thiết kế với ❤️ để giúp các bé yêu toán học hơn mỗi ngày**
