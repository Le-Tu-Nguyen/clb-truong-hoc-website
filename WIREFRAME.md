# Wireframe dự án website CLB Trường Học

## Màn hình chính
1. Trang chủ (`/`)
   - Navbar (Home/About/Events/Dashboard/Contact/Register + theme + dark mode)
   - Hero banner (tiêu đề, subtitle, CTA)
   - Section giới thiệu
   - Section sự kiện nổi bật (EventCard)
   - Footer

2. Giới thiệu (`/about`)
   - Sứ mệnh, giá trị
   - 2 cột thông tin (nội dung + danh sách)

3. Sự kiện (`/events`)
   - Filter nâng cao (Type + search)
   - Skeleton loading (Ant Design)
   - Danh sách event động lấy từ `/api/events`

4. Đăng ký (`/register`)
   - Form đăng ký
   - Lưu draft localStorage tự động
   - validation cơ bản

5. Liên hệ (`/contact`)
   - Thông tin liên hệ và mạng xã hội

6. Dashboard (`/dashboard`) - extra
   - Thống kê: thành viên, sự kiện, sắp tới, top danh mục, team
   - Biểu đồ/Pie đơn giản bằng Progress + Table

## API động
- `/api/events`
- `/api/stats`

## Tính năng thêm
- Dark mode (localStorage)
- Theme tùy biến (mặc định/sunset/forest) bằng CSS variable
- Responsive mobile/desktop bằng Tailwind CSS
- Hoạt cảnh nhẹ bằng CSS animation
- Skeleton loading đẹp bằng AntD
