'use client'
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';

//Container + ToastContainer phải nằm trong Client Component
//vì react-bootstrap và react-toastify dùng hook của React
const AppContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Container style={{ minHeight: 'calc(100vh - 106px)' }}>
                {children}
            </Container>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default AppContainer;
