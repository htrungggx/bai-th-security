- Nội dung đã thực hiện
  Cài đặt Cookie bằng cookie-parser.
  Cài đặt Session bằng express-session.
  Xây dựng API đăng ký username và password.
  Tạo Entity User gồm username, password và role.
  Mã hóa password bằng bcrypt trước khi lưu vào cơ sở dữ liệu.
  Lưu dữ liệu người dùng vào CSDL SQLite thông qua TypeORM.
  Xây dựng chức năng đăng nhập bằng JWT.
  Bảo vệ API bằng JwtAuthGuard.
  Thực hiện phân quyền đơn giản theo role.

Các API chính
// Register:
POST /users/register

{
"username": "dung",
"password": "123456"
}
//

// Login

POST /auth/login
{
"username": "dung",
"password": "123456"
}
//

// Profile có JWT
GET /auth/profile
Header:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiZHVuZyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzgyMzUxMTk3LCJleHAiOjE3ODIzNTQ3OTd9.TocozvkEZgz7QWlm5BeqNzU_OxL0K6YVu9qOqkKtc7c
//

// Cookie :
GET /auth/set-cookie
GET /auth/get-cookie
GET /auth/clear-cookie

// Session:
GET /auth/set-session
GET /auth/get-session

// Authorization: GET /auth/admin
