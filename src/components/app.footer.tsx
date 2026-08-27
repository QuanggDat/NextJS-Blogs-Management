'use client'
import Container from 'react-bootstrap/Container';

const AppFooter = () => {
    return (
        <div className='bg-body-tertiary py-3 mt-3'>
            <Container>
                <span className='text-muted'>
                    Blogs Management &copy; Next.js + NestJS
                </span>
            </Container>
        </div>
    );
}

export default AppFooter;
