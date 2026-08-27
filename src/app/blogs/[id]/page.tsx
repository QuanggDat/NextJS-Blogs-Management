'use client'
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import useSWR, { Fetcher } from 'swr';
import { API_URL, sendRequest } from '@/utils/api';

const ViewDetailBlog = ({ params }: { params: { id: string } }) => {

    const fetcher: Fetcher<IBlog, string> = (url: string) =>
        sendRequest<IBlog>({ url, method: "GET" });

    const { data, error, isLoading } = useSWR(
        `${API_URL}/notes/${params.id}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    if (isLoading) {
        return <div className='mt-3'>loading...</div>
    }

    if (error) {
        return (
            <div className='mt-3'>
                <div className='alert alert-danger'>{error.message}</div>
                <Link href={"/blogs"}>Go Back</Link>
            </div>
        )
    }

    return (
        <div>
            <div className='my-3'>
                <Link href={"/blogs"}> Go Back</Link>
            </div>
            <Card className="text-center">
                <Card.Header>Title: {data?.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {data?.description}
                    </Card.Text>
                    <a href={data?.url} target='_blank' rel='noreferrer'>
                        {data?.url}
                    </a>
                </Card.Body>
                <Card.Footer className="text-muted">
                    Ngày tạo: {data?.createdAt}
                </Card.Footer>
            </Card>
        </div>
    )
}

export default ViewDetailBlog;
