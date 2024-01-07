import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useQueryBook = () => {
  const router = useRouter();

  /* 本全部取った時のキャッシュ */
  const queryAllBook = () => {
    const getBookAll = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/book`);
        console.log(res);
        return res.data;
      } catch (error: any) {
        router.push("log-in");
      }
    };

    return useQuery({
      queryKey: ["books"],
      queryFn: getBookAll,
      onError: (error: any) => {
        console.log(error);
      },
    });
  };

  /* 特定の本のキャッシュ */
  const queryBookById = (bookId: any) => {
    // bookIdを引数として受け取る
    const getBookById = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/book/${bookId}`
        );
        console.log(res);
        return res.data;
      } catch (error: any) {
        router.push("log-in");
      }
    };

    return useQuery({
      queryKey: ["book", bookId],
      queryFn: getBookById, // queryFnは引数を受け取らないので、getBookByIdを直接呼び出す
      onError: (error: any) => {
        console.log(error);
      },
    });
  };

  return { queryAllBook, queryBookById };
};
