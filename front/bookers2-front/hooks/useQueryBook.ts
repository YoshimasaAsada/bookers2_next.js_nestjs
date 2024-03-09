import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

/* 本全部取った時のキャッシュ */
export const useQueryAllBook = () => {
  const router = useRouter();
  const getBookAll = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/book`);
    return res.data;
  };

  return useQuery({
    queryKey: ["books"],
    queryFn: getBookAll,
    onError: (error: any) => {
      router.push("log-in");
    },
  });
};

/* 特定の本のキャッシュ */
export const useQueryBookById = (bookId: any) => {
  const router = useRouter();
  const getBookById = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/book/${bookId}`
    );
    return res.data;
  };

  return useQuery({
    queryKey: ["book", bookId],
    queryFn: getBookById, // queryFnは引数を受け取らないので、getBookByIdを直接呼び出す
    onError: (error: any) => {
      router.push("log-in");
    },
  });
};
