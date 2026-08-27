import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog Lists',
    description: 'Danh sách blog của bạn',
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}
