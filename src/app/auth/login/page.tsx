import LoginForm from '@/components/login.form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Đăng nhập',
    description: 'Đăng nhập vào hệ thống',
}

const LoginPage = () => {
    return (
        <LoginForm />
    )
}

export default LoginPage;
