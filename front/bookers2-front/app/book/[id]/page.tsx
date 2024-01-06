// rafce
"use client";
import BookTable from "@/components/BookTable";
import CreateBookForm from "@/components/CreateBookForm";
import UserInfo from "@/components/UserInfo";
import useMutateBook from "@/hooks/useMutateBook";
import { Book, User } from "@prisma/client";
import axios from "axios";
import { useParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

const page = () => {
  const params = useParams();
  const [book, setBook] = useState<Book & { user: User }>();
  const { createBookMutation, deleteBookMutation } = useMutateBook();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/book/${params.id}`)
      .then((res) => {
        setBook(res.data);
      });
  }, [params.id, setBook]);

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-10">
          <div className="col-start-1 col-span-3">
            {book?.user && <UserInfo user={book.user} />}
            <CreateBookForm onSubmit={createBookMutation.mutate} />
          </div>
          <div className="col-start-5 col-span-10">
            {book && (
              <BookTable
                allBooks={[book]}
                onClickDelete={deleteBookMutation.mutate}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
