import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import AppHeader from '@/components/app.header';
import AppFooter from '@/components/app.footer';
import AppContainer from '@/components/app.container';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blogs Management',
  description: 'Next.js gọi API NestJS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppHeader />
        <AppContainer>
          {children}
        </AppContainer>
        <AppFooter />
      </body>
    </html>
  )
}
