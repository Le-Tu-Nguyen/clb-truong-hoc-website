# Website CLB Trường Học

## Thông tin người triển khai

- Lac Hong University
- Họ và tên: Lê Tú Nguyên
- MSSV: 124001481
- Lớp: 24CT111

 ## Mô tả dự án

 Website CLB trường học là một dự án được xây dựng bằng next.js. Dự án này hướng đến trải nghiệm người dùng thân thiện, tạo ra một giao diện hiện đại.
 Website cung cấp các chức năng cơ bản:
 - Mô tả, giới thiệu thông tin về CLB
 - Hiển thị những sự kiện, hoạt động nổi bật
 - Cho phép sinh viên đăng ký và lên lịch tham gia CLB
 - Cung cấp thông tin liên lạc giữa sinh viên và quản lí CLB

## Các Module chính

### Trang chủ (Home)
- Hiển thị tên CLB, Slogan, Banner giới thiệu
- Giới thiệu sơ lược về CLB
- Hiển thị các hoạt động nổi bật trong CLB
- Nút điều hướng sang trang các chức năng khác
### Trang giới thiệu (About)
- Lịch sử hình thành CLB
- Mục tiêu và sứ mệnh
- Tầm nhìn phát triển
- Thông tin người điều hành
### Trang sự kiện/ hoạt động (Events)
- Hiển thị danh sách các sự kiện đang và sắp diễn ra
- Tên sự kiện, thời gian, địa điểm và mô tả ngắn về sự kiện
- Hỗ trợ trình bày dưới dạng thẻ (card)
### Trang đăng kí thành viên (Register)
- From đăng kí tham gia CLB
- Thu thập các thông tin cơ bản
- Kiểm tra dữ liệu đầu vào
### Trang liên hệ (Contact)
- Thông tin liên hệ CLB
- Liên kết mạng xã hội
### Module giao diện dùng chung
- Navbar: Thanh điều hướng giữa các trang
- Footer: thong tin cuối trang
- EventCard: component hiển thị sự kiện
- HeroSection: phần banner nổi bật ở trang chủ

## Công nghệ sử dụng
Dự án sử dụng các công nghệ sau:

### Frontend Framework
- **Next.js**  
  Framework dựa trên React, hỗ trợ tổ chức dự án hiện đại, routing rõ ràng và dễ mở rộng.

### UI Library
- **React.js**  
  Sử dụng để xây dựng giao diện theo hướng component-based.

### Ngôn ngữ lập trình
- **JavaScript (ES6+)**

### Styling
- **CSS / CSS Global**
- Có thể mở rộng với:
  - CSS Modules
  - Tailwind CSS (nếu phát triển nâng cao)

### Công cụ quản lý package
- **npm**

### Công cụ quản lý mã nguồn
- **Git**
- **GitHub**


## Yêu cầu hệ thống

Để chạy dự án trên máy tính, cần đảm bảo hệ thống có các yêu cầu sau:

### Phần mềm cần thiết
- **Node.js** (khuyến nghị phiên bản từ `18.x` trở lên)
- **npm** (đi kèm khi cài Node.js)
- **Git** (để clone source code từ GitHub)
- **Visual Studio Code** (khuyến nghị để chỉnh sửa mã nguồn)

### Kiểm tra phiên bản cài đặt

Mở Terminal / Command Prompt và chạy:

```bash
node -v
npm -v
git --version
```

## Hướng dẫn cài đặt và chạy dự án

1. Clone và di chuyển vào thư mục dự án
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
   ```

2. Cài đặt toàn bộ dependencies
   ```bash
   npm install
   ```
   
3. Chạy dự án ở môi trường phát triển
   ```bash
   npm run dev
   ```
   
4. Build dự án
   ```bash
   npm run build
   ```
   
5. Chạy bản production sau khi build
   ```bash
   npm run start
   ```

