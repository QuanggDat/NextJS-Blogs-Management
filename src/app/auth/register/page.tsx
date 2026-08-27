import RegisterForm from '@/components/register.form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Đăng ký',
    description: 'Đăng ký tài khoản mới',
}

const RegisterPage = () => {
    return (
        <RegisterForm />
    )
}

export default RegisterPage;
