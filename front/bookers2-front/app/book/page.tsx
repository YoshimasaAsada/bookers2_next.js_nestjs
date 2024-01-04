"use client";
import BookTable from "@/components/BookTable";
import CreateBookForm from "@/components/CreateBookForm";
import UserInfo from "@/components/UserInfo";
import { Book } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/book`).then((res) => {
      setCurrentUser(res.data.currentUser);
      setBooks(res.data.allBooks);
    });
  }, []);
  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-10">
          <div className="col-start-1 col-span-3">
            <UserInfo user={currentUser} />
            <CreateBookForm />
          </div>
          <div className="col-start-5 col-span-10">
            <BookTable allBooks={books} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
