// rafce
"use client";
import BookTable from "@/components/BookTable";
import CreateBookForm from "@/components/CreateBookForm";
import UserInfo from "@/components/UserInfo";
import { Book, User } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

const page = () => {
  const router = useRouter();
  const params = useParams();
  // const [currentUser, setCurrentUser] = useState();
  const [book, setBook] = useState<Book & { user: User }>();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/book/${params.id}`)
      .then((res) => {
        setBook(res.data);
      });
  }, [params.id, setBook]);

  const onClickDelete = (id: number) => {
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/book/${id}`);
    router.push("/book");
  };

  const onSubmit: SubmitHandler<createBookForm> = async (data) => {
    axios.post(`http://localhost:3000/book`, data);
    // setBooks((books) => [...books, data]);
    router.push("/book");
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-10">
          <div className="col-start-1 col-span-3">
            {/* <UserInfo currentUser={book?.user} /> */}
            {book?.user && <UserInfo user={book.user} />}
            {/* useStateが非同期処理でうまくいかないのでこうしてる。たぶん最適じゃない */}
            <CreateBookForm onSubmit={onSubmit} />
          </div>
          <div className="col-start-5 col-span-10">
            {book && (
              <BookTable allBooks={[book]} onClickDelete={onClickDelete} />
            )}
            {/* これも最適じゃない気がする */}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
