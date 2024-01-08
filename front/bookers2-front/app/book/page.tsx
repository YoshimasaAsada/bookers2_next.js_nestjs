"use client";
import BookTable from "@/components/BookTable";
import CreateBookForm from "@/components/CreateBookForm";
import UserInfo from "@/components/UserInfo";
import useMutateBook from "@/hooks/useMutateBook";
import { useQueryBook } from "@/hooks/useQueryBook";
import { useQueryUser } from "@/hooks/useQueryUser";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

const page = () => {
  const { createBookMutation, deleteBookMutation } = useMutateBook();
  const { queryAllBook } = useQueryBook();
  const { data: booksData, status } = queryAllBook();
  const { queryLoginUser } = useQueryUser();
  const { data: loginUserData, status: user } = queryLoginUser();

  // data?.currentUserの?消すと死ぬ
  const books = booksData ?? [];
  const loginUser = loginUserData ?? "";

  if (status === "loading")
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
            <BookTable
              loginUser={loginUser}
              allBooks={books}
              onClickDelete={deleteBookMutation.mutate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
