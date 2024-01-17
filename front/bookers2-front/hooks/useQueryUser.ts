import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

/* 全ユーザーの取得 */
export const useQueryAllUsers = () => {
  const router = useRouter();
  const getAllUsers = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`);
    return res.data;
  };

  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push("/log-in");
    },
  });
};

/* showページ行った時のユーザー取得 */
export const useQueryUserById = (userId: any) => {
  const router = useRouter();
  const getUserById = async () => {
    const { data: userData } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`
    );
    // 本にuserプロパティを追加
    const booksWithUser = userData.books.map((book: any) => ({
      ...book,
      user: userData,
    }));
    return { ...userData, books: booksWithUser };
  };

  return useQuery({
    queryKey: ["user", userId],
    queryFn: getUserById,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push("/log-in");
    },
  });
};

/* ログインユーザーの取得 */
export const useQueryLoginUser = () => {
  const router = useRouter();
  const getLoginUser = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/login-user`
    );
    return res.data;
  };

  return useQuery({
    queryKey: ["login-user"],
    queryFn: getLoginUser,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        console.log("errorchatch");
      router.push("/log-in");
    },
  });
};
