import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog Detail',
    description: 'Xem chi tiết blog',
}

export default function BlogDetailLayout({
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
