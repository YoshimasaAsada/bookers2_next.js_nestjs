"use client";
import BookTable from "@/components/BookTable";
import CreateBookForm from "@/components/CreateBookForm";
import UserInfo from "@/components/UserInfo";
import UserTable from "@/components/UserTable";
import { Book, User } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

const page = () => {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User & { books: Book[] }>();

  /* このコード多分修正必要
  user.booksが取れなかったからこれに修正したが、もうちょいいい書き方あるんじゃないかと思っている
  */
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/${params.id}`)
      .then((res) => {
        // ユーザー情報とそのユーザーが持つ書籍情報を取得
        const userData = res.data;
        // 書籍情報にuserプロパティを追加
        const booksWithUser = userData.books.map((book: Book) => {
          return {
            ...book,
            user: {
              ...userData,
            },
          };
        });
        // ユーザー情報とbooksWithUserをセット
        setUser({ ...userData, books: booksWithUser });
      });
  }, []);

  const onClickDelete = (id: number) => {
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/book/${id}`);
    router.push("/book");
  };

  const onSubmit: SubmitHandler<CreateBookForm> = async (data) => {
    axios.post(`http://localhost:3000/book`, data);
    // setBooks((books) => [...books, data]);
    router.push("/book");
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-10">
        <div className="col-start-1 col-span-3">
          {/* <UserInfo currentUser={book?.user} /> */}
          {user && <UserInfo user={user} />}
          {/* useStateが非同期処理でうまくいかないのでこうしてる。たぶん最適じゃない */}
          <CreateBookForm onSubmit={onSubmit} />
        </div>
        <div className="col-start-5 col-span-10">
          {user?.books && (
            <BookTable allBooks={user.books} onClickDelete={onClickDelete} />
          )}
          {/* これも最適じゃない気がする */}
        </div>
      </div>
    </div>
  );
};

export default page;
