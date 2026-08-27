'use client'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { API_URL, saveToken, sendRequest } from '@/utils/api';

const LoginForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async () => {
        if (!email) {
            toast.error("Email không được để trống !");
            return;
        }
        if (!password) {
            toast.error("Mật khẩu không được để trống !");
            return;
        }

        try {
            //POST /auth/login -> back-end trả về { accessToken: "..." }
            const res = await sendRequest<ILogin>({
                url: `${API_URL}/auth/login`,
                method: "POST",
                body: { email, password }
            });

            if (res?.accessToken) {
                //lưu token lại để các request sau gắn vào header Authorization
                saveToken(res.accessToken);
                toast.success("Đăng nhập thành công !");
                router.push("/blogs");
                //làm mới header để hiện email user vừa đăng nhập
                router.refresh();
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <Card className='mt-4 mx-auto' style={{ maxWidth: 480 }}>
            <Card.Header>Đăng nhập</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control type="password" placeholder="..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            //cho phép nhấn Enter để đăng nhập
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSubmit();
                            }}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Đăng nhập
                    </Button>
                </Form>
            </Card.Body>
            <Card.Footer className='text-muted'>
                Chưa có tài khoản ? <Link href={"/auth/register"}>Đăng ký ngay</Link>
            </Card.Footer>
        </Card>
    )
}

export default LoginForm;
