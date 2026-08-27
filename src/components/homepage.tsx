'use client'
import Link from 'next/link';

const HomePage = () => {
    return (
        <div className='mt-4'>
            <h2>Quản lý Blogs</h2>
            <p className='text-muted'>
                Front-end Next.js gọi API của back-end NestJS ở <b>http://localhost:3000</b>
            </p>
            <ul>
                <li>Đăng ký / Đăng nhập dùng bảng <b>users</b> (API <code>/auth</code>)</li>
                <li>Thêm / Sửa / Xoá Blog dùng bảng <b>notes</b> (API <code>/notes</code>)</li>
            </ul>
            <Link href={"/blogs"} className='btn btn-primary'>
                Xem danh sách Blogs
            </Link>
        </div>
    )
}

export default HomePage;
