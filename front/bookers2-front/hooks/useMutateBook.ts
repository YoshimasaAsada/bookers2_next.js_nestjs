/* Bookの非同期処理はここに書いていく。
　　create, delete, updateの処理はここに書く
*/
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
// import { useForm } from "react-hook-form";

const useMutateBook = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

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
      onSuccess: (res) => {
        const previosBooks: any = queryClient.getQueryData(["books"]);
        const previosLoginUser: any = queryClient.getQueryData(["login-user"]);
        const createdBookWithUser = {
          ...res,
          user: previosLoginUser,
        };

        if (previosBooks) {
          queryClient.setQueryData(
            ["books"],
            [createdBookWithUser, ...previosBooks]
          );
        }
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
      onSuccess: (_, variables) => {
        const previosBooks: any = queryClient.getQueryData(["books"]);
        console.log(previosBooks);
        if (previosBooks) {
          queryClient.setQueryData(
            ["books"],
            previosBooks.filter((book: any) => book.id !== variables)
          );
        }
        router.push("/book");
      },
    }
  );

  return { createBookMutation, deleteBookMutation };
};

export default useMutateBook;
