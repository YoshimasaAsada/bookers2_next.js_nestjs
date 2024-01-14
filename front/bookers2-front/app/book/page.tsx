"use client";
import BookTable from "@/components/BookTable";
import CreateBookForm from "@/components/CreateBookForm";
import UserInfo from "@/components/UserInfo";
import { useQueryBook } from "@/hooks/useQueryBook";
import { useQueryUser } from "@/hooks/useQueryUser";
import { CircularProgress } from "@mui/material";
import React from "react";

const page = () => {
  const { queryAllBook } = useQueryBook();
  const { data: allBooks, status: allBooksStatus } = queryAllBook();
  const { queryLoginUser } = useQueryUser();
  const { data: loginUser, status: loginUserStatus } = queryLoginUser();

  if (allBooksStatus === "loading" || loginUserStatus == "loading")
    return (
      <>
        <div className="h-screen w-screen flex justify-center items-center">
          <CircularProgress />
        </div>
      </>
    );
  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-10">
          <div className="col-start-1 col-span-3">
            <UserInfo user={loginUser} loginUser={loginUser} />
            <CreateBookForm />
          </div>
          <div className="col-start-5 col-span-10">
            <BookTable loginUser={loginUser} allBooks={allBooks} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
