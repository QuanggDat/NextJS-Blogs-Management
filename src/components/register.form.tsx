'use client'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { API_URL, sendRequest } from '@/utils/api';

const RegisterForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSubmit = async () => {
        if (!email) {
            toast.error("Email không được để trống !");
            return;
        }
        //back-end validate @MinLength(6), kiểm tra trước ở đây cho đỡ mất công gọi API
        if (password.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự !");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Mật khẩu nhập lại không khớp !");
            return;
        }

        try {
            //POST /auth/register -> back-end trả về { id, email, createdAt }
            const res = await sendRequest<IUser>({
                url: `${API_URL}/auth/register`,
                method: "POST",
                body: { email, password }
            });

            if (res?.id) {
                toast.success("Đăng ký thành công, mời bạn đăng nhập !");
                router.push("/auth/login");
            }
        } catch (error: any) {
            //email đã tồn tại thì back-end trả 403 "Email already exists"
            toast.error(error.message);
        }
    }

    return (
        <Card className='mt-4 mx-auto' style={{ maxWidth: 480 }}>
            <Card.Header>Đăng ký tài khoản</Card.Header>
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
                        <Form.Control type="password" placeholder="ít nhất 6 ký tự"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nhập lại mật khẩu</Form.Label>
                        <Form.Control type="password" placeholder="..."
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSubmit();
                            }}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Đăng ký
                    </Button>
                </Form>
            </Card.Body>
            <Card.Footer className='text-muted'>
                Đã có tài khoản ? <Link href={"/auth/login"}>Đăng nhập</Link>
            </Card.Footer>
        </Card>
    )
}

export default RegisterForm;
