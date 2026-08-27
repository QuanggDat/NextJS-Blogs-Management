"use client";
import AppTable from "@/components/app.table";
import { API_URL, getToken, sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

const BlogsPage = () => {
  const router = useRouter();

  //route /notes ở back-end có @UseGuards -> chưa đăng nhập thì không gọi được
  useEffect(() => {
    if (!getToken()) {
      router.replace("/auth/login");
    }
  }, [router]);

  //fetcher tự gắn accessToken vào header Authorization
  const fetcher = (url: string) => sendRequest<IBlog[]>({ url, method: "GET" });

  const { data, error, isLoading } = useSWR(
    `${API_URL}/notes`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  if (isLoading) {
    return <div className="mt-3">loading...</div>;
  }

  if (error) {
    return (
      <div className="mt-3 alert alert-danger">
        Không lấy được danh sách blog: {error.message}
      </div>
    );
  }

  return (
    <div className="mt-3">
      <AppTable blogs={data?.sort((a, b) => b.id - a.id) ?? []} />
    </div>
  );
};

export default BlogsPage;
