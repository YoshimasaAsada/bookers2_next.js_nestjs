// rafce
"use client";
import BookTable from "@/components/BookTable";
import CreateBookForm from "@/components/CreateBookForm";
import UserInfo from "@/components/UserInfo";
import useMutateBook from "@/hooks/useMutateBook";
import { useQueryBookById } from "@/hooks/useQueryBook";
import { useQueryUser } from "@/hooks/useQueryUser";
import { CircularProgress } from "@mui/material";
import { Book, User } from "@prisma/client";
import axios from "axios";
import { stat } from "fs";
import { useParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

const page = () => {
  const params = useParams();
  const { createBookMutation, deleteBookMutation } = useMutateBook();
  const { data, status } = useQueryBookById(params.id);
  const { queryLoginUser } = useQueryUser();
  const { data: loginUserData, status: userstatus } = queryLoginUser();

  const loginUser = loginUserData ?? "";
  const book = data ?? "";

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
            {book?.user && <UserInfo user={book.user} loginUser={loginUser} />}
            <CreateBookForm />
          </div>
          <div className="col-start-5 col-span-10">
            {book && (
              <BookTable
                loginUser={loginUser}
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
