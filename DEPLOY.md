# 🚀 Hướng Dẫn Deploy Lên GitHub

## Bước 1: Chuẩn Bị GitHub Repository

1. **Truy cập GitHub:** https://github.com
2. **Đăng nhập** vào tài khoản của bạn
3. Click **New Repository** (nút xanh lá)
4. Đặt tên repository: `learn-math-app` (hoặc tên khác bạn muốn)
5. Chọn **Public** (để có thể deploy GitHub Pages miễn phí)
6. **KHÔNG** chọn "Initialize with README" (vì project đã có sẵn files)
7. Click **Create Repository**

## Bước 2: Khởi Tạo Git Repository Local

Mở terminal trong thư mục project và chạy:

```bash
cd "c:\Users\acer\.gemini\antigravity\scratch\New folder\learn math app"

# Khởi tạo git
git init

# Thêm tất cả files
git add .

# Commit lần đầu
git commit -m "Initial commit - Vietnamese math learning website for 5-year-olds"
```

## Bước 3: Kết Nối Với GitHub Repository

Thay `YOUR_USERNAME` và `learn-math-app` bằng thông tin thực tế:

```bash
git remote add origin https://github.com/YOUR_USERNAME/learn-math-app.git

# Push code lên GitHub
git branch -M main
git push -u origin main
```

## Bước 4: Deploy Lên GitHub Pages

### Option 1: Frontend Only (Không cần Backend)

Nếu chỉ muốn deploy frontend (không có database/backend):

1. Vào **Settings** của repository
2. Chọn **Pages** ở sidebar bên trái
3. Trong **Source**, chọn **main branch**
4. Click **Save**
5. Đợi vài phút, website sẽ có tại: `https://YOUR_USERNAME.github.io/learn-math-app`

**Lưu ý:** Với option này, bạn cần sửa practice.html để load exercises trực tiếp từ JSON files thay vì từ API.

### Option 2: Full Stack (Với Backend)

Để deploy full backend + database, bạn cần dùng hosting service khác như:
- **Vercel** (miễn phí, dễ dùng)
- **Railway** (miễn phí tier)
- **Render** (miễn phí tier)
- **Heroku** (trả phí)

#### Deploy Lên Vercel (Khuyến nghị):

1. Truy cập: https://vercel.com
2. Đăng nhập bằng GitHub
3. Click **Import Project**
4. Chọn repository `learn-math-app`
5. Vercel sẽ tự động detect Node.js project
6. Click **Deploy**
7. Đợi vài phút → Website sẽ live!

## Bước 5: Cập Nhật Code Sau Này

Mỗi khi có thay đổi:

```bash
git add .
git commit -m "Mô tả thay đổi"
git push
```

GitHub Pages/Vercel sẽ tự động deploy lại!

---

## 📝 Lưu Ý Quan Trọng

### Nếu Deploy Frontend Only:
- Bỏ tính năng lưu kết quả (không có database)
- HOẶC dùng localStorage để lưu kết quả local trên browser

### Nếu Deploy Full Stack:
- Database SQLite sẽ reset mỗi khi deploy (do Vercel/Render)
- Khuyến nghị: Chuyển sang PostgreSQL hoặc MongoDB cho production

## 🎯 Quick Start Commands

```bash
# Bước 1: Khởi tạo Git
git init
git add .
git commit -m "Initial commit"

# Bước 2: Kết nối GitHub (thay YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/learn-math-app.git
git branch -M main
git push -u origin main

# Bước 3: Mỗi lần update
git add .
git commit -m "Update features"
git push
```

---

**Chúc bạn deploy thành công! 🎉**
