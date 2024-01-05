"use client";
import BookTable from "@/components/BookTable";
import CreateBookForm from "@/components/CreateBookForm";
import UserInfo from "@/components/UserInfo";
import { Book } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

const page = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState("");
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/book`).then((res) => {
      setCurrentUser(res.data.currentUser);
      setBooks(res.data.allBooks);
    });
  }, []);

  const onClickDelete = (id: number) => {
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/book/${id}`);
    setBooks(books.filter((book: Book) => book.id !== id));
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
            <UserInfo user={currentUser} />
            <CreateBookForm onSubmit={onSubmit} />
          </div>
          <div className="col-start-5 col-span-10">
            <BookTable allBooks={books} onClickDelete={onClickDelete} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
