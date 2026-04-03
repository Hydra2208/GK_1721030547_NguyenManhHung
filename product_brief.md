# Product Brief: AI Travel Agent

## 1. Product Overview (Tổng quan sản phẩm)
**AI Travel Agent** là một nền tảng website ứng dụng trí tuệ nhân tạo (Generative AI) để tự động hóa việc lên kế hoạch và sắp xếp lịch trình du lịch cá nhân hóa cho người dùng tại Việt Nam. Thay vì phải tự tra cứu trên Google hoặc các diễn đàn, người dùng chỉ cần nhập các yêu cầu như "Điểm đến", "Thời gian", "Ngân sách", và "Phong cách", AI sẽ trả về một lộ trình hoàn mỹ từng giờ, từng ngày, kèm theo chi phí dự kiến, gợi ý và tích hợp trỏ thẳng tới Google Maps.

## 2. Target Audience (Đối tượng mục tiêu)
- Những người yêu thích du lịch (Solo, Gia đình, Nghỉ dưỡng cao cấp hay Phượt bụi) nhưng không có nhiều thời gian lên kế hoạch.
- Khách du lịch mong muốn trải nghiệm những địa danh mới mà chưa biết bắt đầu từ đâu.

## 3. Key Features (Tính năng chính)
1. **Dynamic Trip Generation (Sinh lịch trình tự động)**: 
   - Điền form với các thẻ gợi ý (Quick suggestions) cực tiện lợi.
   - Ô nhập Điểm đến được trang bị tính năng Predictive Text (Auto-complete) với cơ sở dữ liệu hơn 80 tỉnh thành và hải đảo nổi tiếng.
   - Kết nối với sức mạnh của Groq AI (`llama-3.3-70b-versatile`) để xử lý văn bản tiếng Việt cực kì mượt mà và xuất ra định dạng chuẩn JSON siêu tốc.
2. **Interactive UI/UX**:
   - Giao diện thân thiện, sử dụng TailwindCSS, hiệu ứng động (Framer Motion).
   - Tích hợp liên kết `Google Maps Search` bằng thuật toán Encode tự động chuẩn xác nhất.
3. **Favorites & Authentication (Lưu trữ và Thông tin Tài khoản)**:
   - Hệ thống xác thực danh tính bằng **NextAuth (Auth.js)** chuẩn doanh nghiệp.
   - Cho phép Đăng ký/Đăng nhập và bấm "Lưu chuyến đi" vào bộ sưu tập cá nhân.
   - Dashboard quản trị chuyến đi, hỗ trợ xem lại bản chi tiết bằng Popup / Modal sang trọng, không cần tải lại trang.
   - Cơ sở dữ liệu cực kỳ độc lập bằng **Prisma + SQLite**.

## 4. Tech Stack (Công nghệ sử dụng)
- **Frontend**: Next.js 16 (App Router), React, TailwindCSS, Framer Motion, Lucide Icons.
- **Backend & API**: Next.js Serverless Route Handlers.
- **Database & Auth**: Prisma ORM, SQLite, NextAuth, bcryptjs.
- **AI Core**: Groq SDK (`llama-3.3-70b-versatile`).

## 5. Future Roadmap (Định hướng nâng cấp)
- Thêm tính năng thay đổi/kéo thả lịch trình các ngày.
- Quản lý ngân sách nâng cao qua biểu đồ (Charts).
- Hỗ trợ Booking phòng và phương tiện trực tiếp.
