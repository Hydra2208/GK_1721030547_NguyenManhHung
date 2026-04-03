---
title: Báo Cáo Sản Phẩm AI Travel Agent
author: Nguyễn Mạnh Hùng - 1721030547
---

# BÁO CÁO DỰ ÁN: AI TRAVEL AGENT

**Họ và tên:** Nguyễn Mạnh Hùng  
**MSSV:** 1721030547  

---

## 1. Mô tả sản phẩm
**AI Travel Agent** là một nền tảng lập trình web thông minh, đóng vai trò như một chuyên gia tư vấn du lịch trực tuyến 24/7. 
Thông qua việc kết nối với các mô hình ngôn ngữ lớn (LLM API) có tốc độ cao, ứng dụng cho phép người dùng dễ dàng tạo ra một lịch trình du lịch trong mơ và hoàn toàn cá nhân hóa. Người dùng chỉ cần cung cấp sơ bộ: *Điểm đến, Thời gian, Ngân sách* và *Phong cách du lịch*, hệ thống sẽ trả về một bộ tài liệu bao gồm chi tiết từng hoạt động, chi phí ước tính, bản đồ tham chiếu và những lời khuyên hữu ích khi đi du lịch. Ngoài ra trang web còn cung cấp hệ thống quản lý tài khoản để thành viên bảo lưu lại các lộ trình cực kỳ tiện lợi.

## 2. Cách thực hiện
Dự án được xây dựng dưới dạng Full-stack Web Application (Client-Server kết hợp).
- **Xây dựng Giao diện (Frontend):**  
  Ứng dụng Framework Next.js, xây dựng hệ thống form nhập liệu đa năng có tích hợp thuật toán "Predictive Text - Autocomplete" thông minh. Thêm các tính năng "Quick Suggestions Chips" nhằm tối ưu hoá thời gian gõ tương tự Google. Toàn bộ hình ảnh và bố cục được làm đẹp mượt mà thông qua TailwindCSS và Framer Motion.
  
- **Tích hợp Trí Tuệ Nhân Tạo (AI Agent Core):**  
  Sử dụng sức mạnh của Groq API (với mô hình `llama-3.3-70b-versatile`). Quá trình giao tiếp với AI được áp dụng kỹ thuật System Prompt Engineering bằng Tiếng Việt nghiêm ngặt, yêu cầu model phải cấu trúc toàn bộ câu trả lời dưới định dạng JSON nguyên thủy để Frontend dễ dàng bóc tách nội dung hiển thị mà không bị lỗi layout.
  
- **Quản lý Dữ liệu và Phân Quyền (Database & Auth):**  
  Khởi tạo Prisma với hệ quản trị cơ sở dữ liệu siêu tối giản SQLite (File Base). Xây dựng cấu trúc biểu đồ dữ liệu bao gồm bảng `User` và `SavedItinerary`. Tích hợp thư viện bảo mật `next-auth` và `bcryptjs` để vận hành quy trình đăng nhập, đăng ký bằng mã hóa mật khẩu một chiều, đồng thời thiết lập Route Protection bảo vệ phiên làm việc của người dùng.

- **Tối ưu Tính Năng (UX Enhancements):**  
  Thiết kế Modal/Popup Overlay hiển thị lịch trình cũ nhanh chóng trong Dashboard `/saved`. Xử lý chức năng chuyển hướng Google Maps chính xác tuyệt đối nhờ thuật toán nối chuỗi vị trí và mã hóa bằng `encodeURIComponent`.

## 3. Kết quả đạt được
- Hệ thống chạy mượt mà ngay lập tức dựa trên máy ảo cục bộ (`npm run dev`).
- Gọi API AI tự động tạo được lộ trình siêu tốc, không gặp lỗi Parse JSON.
- Có sự ràng buộc bảo mật tốt, mỗi tài khoản sẽ chỉ nhìn thấy được những bản nháp (drafts) hoặc hành trình đã thả tim của riêng mình.
- Khả năng linh hoạt hỗ trợ thao tác tự điền cực nhanh hơn 80 danh thắng Việt Nam với UI tối (Dark mode) sang trọng.
- Ứng dụng đã hoàn toàn sẵn sàng như một nguyên mẫu (MVP) để thuyết trình môn học.

---
*Báo cáo được hoàn thiện tự động dựa theo sự phát triển của dự án trên máy trạm.*
