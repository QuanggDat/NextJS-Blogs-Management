'use client'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { API_URL, clearToken, getToken, sendRequest } from '@/utils/api';

const AppHeader = () => {
    const router = useRouter();
    //pathname đổi mỗi khi chuyển trang -> dùng để kiểm tra lại token
    const pathname = usePathname();
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            setUser(null);
            return;
        }
        //gọi GET /users/me để lấy thông tin user đang đăng nhập
        sendRequest<IUser>({
            url: `${API_URL}/users/me`,
            method: "GET"
        })
            .then(res => setUser(res))
            //token hết hạn (back-end ký token chỉ sống 10 phút) thì coi như đã đăng xuất
            .catch(() => {
                clearToken();
                setUser(null);
            });
    }, [pathname]);

    const handleLogout = () => {
        clearToken();
        setUser(null);
        toast.success("Đăng xuất thành công !");
        router.push("/auth/login");
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    <Link href={"/"} className="navbar-brand">
                        Blogs Management
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link href={"/blogs"} className='nav-link'>
                            Blogs
                        </Link>
                    </Nav>
                    <Nav>
                        {user
                            ?
                            <>
                                <Navbar.Text className='me-3'>
                                    Xin chào, <b>{user.email}</b>
                                </Navbar.Text>
                                <Button variant='outline-danger' size='sm'
                                    onClick={() => handleLogout()}
                                >Đăng xuất</Button>
                            </>
                            :
                            <>
                                <Link href={"/auth/login"} className='nav-link'>
                                    Đăng nhập
                                </Link>
                                <Link href={"/auth/register"} className='nav-link'>
                                    Đăng ký
                                </Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppHeader;
