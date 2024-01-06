/* Bookの非同期処理はここに書いていく。
　　create, delete, updateの処理はここに書く
*/
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useMutateBook = () => {
  const router = useRouter();

  /* 本の投稿機能動かす */
  const createBookMutation = useMutation(
    async (data: CreateBookForm) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/book`,
        data
      );
      return res.data;
    },
    {
      onSuccess: () => {
        router.push("/book");
      },
      onError: (error: any) => {
        console.log(error);
      },
    }
  );

  /* 本の削除機能動かす */
  const deleteBookMutation = useMutation(
    async (bookId: number) => {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/book/${bookId}`);
    },
    {
      onSuccess: () => {
        router.push("/book");
      },
    }
  );

  return { createBookMutation, deleteBookMutation };
};

export default useMutateBook;
