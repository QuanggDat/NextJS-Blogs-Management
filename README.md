# NextJS Blogs Management

Front-end Next.js 13 (App Router) gọi API back-end NestJS.

## Kiến trúc

| Thành phần | Đường dẫn | Port |
|---|---|---|
| Front-end (Next.js) | `NextJS-Blogs-Management` | **3001** |
| Back-end (NestJS)   | `NestJS-RestAPI`          | **3000** |
| Database (Postgres) | docker `dev-database`     | 5434 |

Front-end chạy port 3001 để không đụng port 3000 của back-end.

## Cách chạy

**1. Bật database** (nếu chưa chạy):
```bash
cd D:/WeCareDoc/react/NestJS-RestAPI
npm run db:dev:create
```

**2. Bật back-end** (cửa sổ terminal riêng):
```bash
cd D:/WeCareDoc/react/NestJS-RestAPI
npm run start:dev
```

**3. Bật front-end** (cửa sổ terminal riêng):
```bash
cd D:/WeCareDoc/react/NextJS-Blogs-Management
npm install
npm run dev
```

Mở trình duyệt: http://localhost:3001

## Luồng sử dụng

1. Vào `/auth/register` đăng ký tài khoản (mật khẩu tối thiểu 6 ký tự).
2. Vào `/auth/login` đăng nhập, `accessToken` được lưu vào `localStorage`.
3. Vào `/blogs` để Thêm / Sửa / Xoá / Xem blog.

> Token do back-end ký chỉ sống **10 phút** (`expiresIn: '10m'` trong `auth.service.ts`).
> Hết hạn thì đăng nhập lại.

## API back-end được sử dụng

| Chức năng | Method | Endpoint | Cần token |
|---|---|---|---|
| Đăng ký | POST | `/auth/register` | Không |
| Đăng nhập | POST | `/auth/login` | Không |
| Thông tin user | GET | `/users/me` | Có |
| Danh sách blog | GET | `/notes` | Có |
| Chi tiết blog | GET | `/notes/:id` | Có |
| Tạo blog | POST | `/notes` | Có |
| Sửa blog | PATCH | `/notes/:id` | Có |
| Xoá blog | DELETE | `/notes/:id` | Có |

## Cấu trúc thư mục

```
src/
├── app/
│   ├── layout.tsx              # layout gốc: header + container + footer
│   ├── page.tsx                # trang chủ
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   └── blogs/
│       ├── layout.tsx
│       ├── page.tsx            # danh sách blog (SWR)
│       └── [id]/page.tsx       # chi tiết blog
├── components/
│   ├── app.header.tsx          # navbar + trạng thái đăng nhập
│   ├── app.footer.tsx
│   ├── app.container.tsx       # Container + ToastContainer
│   ├── app.table.tsx           # bảng blog + nút CRUD
│   ├── create.modal.tsx
│   ├── update.modal.tsx
│   ├── login.form.tsx
│   ├── register.form.tsx
│   └── homepage.tsx
├── types/backend.d.ts          # IBlog, IUser, ILogin
└── utils/api.ts                # sendRequest + quản lý token
```

## Lưu ý về field của Blog

Bảng `notes` ở back-end có 3 field bắt buộc: **title**, **description**, **url**.
Field `url` được back-end validate bằng `@IsUrl()` nên phải nhập đúng dạng
`https://example.com`, nếu không sẽ bị trả lỗi 400.
