import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useQueryUser = () => {
  const router = useRouter();

  /* 全ユーザーの取得 */
  const queryAllUsers = () => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`);
        return res.data;
      } catch (error: any) {
        router.push("/log-in");
      }
    };

    return useQuery({
      queryKey: ["users"],
      queryFn: getAllUsers,
      onError: (err: any) => {
        console.log(err);
      },
    });
  };

  /* showページ行った時のユーザー取得 */
  const queryUserById = (userId: any) => {
    const getUserById = async () => {
      try {
        const { data: userData } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`
        );
        // 本にuserプロパティを追加
        const booksWithUser = userData.books.map((book: any) => ({
          ...book,
          user: userData,
        }));
        return { ...userData, books: booksWithUser };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          router.push("/log-in");
        } else {
          throw error;
        }
      }
    };

    return useQuery({
      queryKey: ["user", userId],
      queryFn: getUserById,
      onError: (err) => {
        console.log(err);
      },
    });
  };

  /* ログインユーザーの取得 */
  const queryLoginUser = () => {
    const getLoginUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/login-user`
        );
        console.log("test");
        return res.data;
      } catch (error: any) {
        router.push("/log-in");
      }
    };

    return useQuery({
      queryKey: ["login-user"],
      queryFn: getLoginUser,
      onError: (err: any) => {
        console.log(err);
      },
    });
  };

  return { queryAllUsers, queryUserById, queryLoginUser };
};
