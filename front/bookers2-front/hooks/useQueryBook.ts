import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

/* 本全部取った時のキャッシュ */
export const useQueryAllBook = () => {
  const router = useRouter();
  const getBookAll = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/book`);
      console.log(res);
      return res.data;
    } catch (error: any) {
      console.log("test");
      router.push("log-in");
      console.log("bbbbbb");
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
export const useQueryBookById = (bookId: any) => {
  const router = useRouter();
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
