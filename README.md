# AI Travel Agent 🌍✈️

AI Travel Agent là một ứng dụng web thông minh giúp người dùng tự động lập kế hoạch du lịch chi tiết và cá nhân hóa. Bằng cách sử dụng sức mạnh của AI (mô hình Llama 3 thông qua Groq API), ứng dụng tạo ra các lịch trình du lịch tối ưu, bao gồm địa điểm, nhà hàng, khách sạn và các hoạt động vui chơi dựa trên sở thích, ngân sách và thời gian của người dùng.

## Tính năng nổi bật ✨

- 🤖 **Lập kế hoạch tự động với AI**: Sử dụng mô hình `llama-3.3-70b-versatile` qua Groq SDK để sinh lịch trình du lịch chi tiết.
- 🔐 **Xác thực người dùng**: Đăng ký và đăng nhập bảo mật sử dụng `Next-Auth` (Credentials provider) kết hợp với JWT và `bcryptjs`.
- 💾 **Lưu trữ hành trình**: Cho phép người dùng đăng nhập để "lưu lại" (thả tim) các lịch trình yêu thích vào cơ sở dữ liệu và xem lại sau.
- 🗺️ **Tích hợp Google Maps**: Các địa điểm trong lịch trình được tự động liên kết với Google Maps qua tính năng Text Search, giúp người dùng dễ dàng định vị.
- ⚡ **Gợi ý thông minh (Autocomplete)**: Hỗ trợ tự động điền (autocomplete) với hơn 80 điểm du lịch nổi bật tại Việt Nam và các bộ lọc gợi ý nhanh (Quick Suggestions) cho thời gian, ngân sách.
- 🎨 **UI/UX hiện đại**: Giao diện đẹp mắt, thân thiện với người dùng, kết hợp các hiệu ứng mượt mà từ `framer-motion` và icon từ `lucide-react`.

## Công nghệ sử dụng 🛠️

- **Frontend**: Next.js 16 (App Router), React 19, TailwindCSS v4, Framer Motion, Lucide React.
- **Backend**: Next.js API Routes.
- **Database**: SQLite (qua Prisma ORM).
- **Authentication**: Next-Auth v5.
- **AI Integration**: Groq SDK.

## Hướng dẫn cài đặt và chạy dự án 🚀

### 1. Yêu cầu hệ thống
- Node.js (phiên bản 18 trở lên)
- npm, yarn, pnpm, hoặc bun

### 2. Cài đặt các thư viện (Dependencies)
Clone dự án về máy, di chuyển vào thư mục dự án và chạy lệnh:
```bash
npm install
```

### 3. Thiết lập biến môi trường (.env)
Tạo file `.env` ở thư mục gốc của dự án và cấu hình các biến sau dựa trên file `.env.example` (nếu có):

```env
# Database connection (SQLite)
DATABASE_URL="file:./dev.db"

# Next Auth Secrets (có thể generate bằng lệnh `npx auth secret`)
AUTH_SECRET="your_random_auth_secret_here"

# Groq API Key (Lấy tại https://console.groq.com/keys)
GROQ_API_KEY="your_groq_api_key_here"
```

### 4. Thiết lập Database (Prisma)
Khởi tạo cơ sở dữ liệu SQLite và cập nhật schema bằng lệnh:
```bash
npx prisma db push
```

### 5. Chạy môi trường phát triển (Development)
Sau khi hoàn tất cấu hình, khởi động server lên:
```bash
npm run dev
```
Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000) để sử dụng ứng dụng.

## Cấu trúc thư mục chính 📂

- `/src/app`: Chứa các trang giao diện (Pages) và API Routes của Next.js (App Router).
- `/src/components`: Các thành phần UI có thể tái sử dụng (Navbar, Form, Modal...).
- `/src/lib`: Chứa các hàm hỗ trợ chung và cấu hình (như cấu hình Next-Auth).
- `/prisma`: Định nghĩa Schema cơ sở dữ liệu.

## Tác giả ✍️
- **Nguyễn Mạnh Hùng** - *Mã sinh viên: 1721030547*
