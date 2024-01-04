"use client";
import CreateBookForm from "@/components/CreateBookForm";
import EditBookForm from "@/components/EditBookForm";
import { Book } from "@prisma/client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const params = useParams();
  const [book, setBook] = useState<Book>();
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/book/${params.id}/edit`)
      .then((res) => {
        setBook(res.data);
      });
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-10">
          <div className="col-start-3 col-span-6">
            {book && <EditBookForm book={book} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
