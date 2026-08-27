'use client'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import CreateModal from './create.modal';
import { useState } from 'react';
import UpdateModal from './update.modal';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { mutate } from "swr";
import { API_URL, sendRequest } from '@/utils/api';

interface IProps {
    blogs: IBlog[]
}

const AppTable = (props: IProps) => {
    const { blogs } = props;

    const [blog, setBlog] = useState<IBlog | null>(null);
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);

    const handleDeleteBlog = async (id: number) => {
        if (confirm(`Bạn có chắc muốn xoá blog này (id = ${id}) ?`)) {
            try {
                //DELETE /notes/:id -> back-end trả về 204 No Content
                await sendRequest({
                    url: `${API_URL}/notes/${id}`,
                    method: "DELETE"
                });
                toast.success("Xoá blog thành công !");
                //gọi lại GET /notes để làm mới bảng
                mutate(`${API_URL}/notes`);
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    }

    return (
        <>
            <div
                className='mb-3'
                style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Blogs</h3>
                <Button variant="secondary"
                    onClick={() => setShowModalCreate(true)}
                >Add New</Button>
            </div>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>
                                    <Link
                                        className='btn btn-primary'
                                        href={`/blogs/${item.id}`}>View</Link>

                                    <Button variant='warning' className='mx-3'
                                        onClick={() => {
                                            setBlog(item);
                                            setShowModalUpdate(true);
                                        }}
                                    >Edit</Button>
                                    <Button variant='danger'
                                        onClick={() => handleDeleteBlog(item.id)}
                                    >Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <CreateModal
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate}
            />
            <UpdateModal
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                blog={blog}
                setBlog={setBlog}
            />
        </>
    )
}

export default AppTable;
