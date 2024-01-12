"use client";
import BookTable from "@/components/BookTable";
import CreateBookForm from "@/components/CreateBookForm";
import UserInfo from "@/components/UserInfo";
import { useQueryBook } from "@/hooks/useQueryBook";
import { useQueryUser } from "@/hooks/useQueryUser";
import { CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  const { queryBookById } = useQueryBook();
  const { data: bookById, status: bookByIdStatus } = queryBookById(params.id);
  const { queryLoginUser } = useQueryUser();
  const { data: loginUser, status: loginUserStatus } = queryLoginUser();

  if (loginUserStatus === "loading" || bookByIdStatus === "loading")
    return (
      <>
        <div className="h-screen w-screen flex justify-center items-center">
          <CircularProgress />
        </div>
      </>
    );

  if (!bookById) {
    return <div>Book not found.</div>;
  }

  
  
  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-10">
          <div className="col-start-1 col-span-3">
            <UserInfo user={bookById.user} loginUser={loginUser} />
            <CreateBookForm />
          </div>
          <div className="col-start-5 col-span-10">
            <BookTable loginUser={loginUser} books={[bookById]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
