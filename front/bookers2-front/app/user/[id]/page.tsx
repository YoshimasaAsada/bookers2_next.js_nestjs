"use client";
import BookTable from "@/components/BookTable";
import CreateBookForm from "@/components/CreateBookForm";
import UserInfo from "@/components/UserInfo";
import useMutateBook from "@/hooks/useMutateBook";
import { useQueryUser } from "@/hooks/useQueryUser";
import { CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  const { createBookMutation, deleteBookMutation } = useMutateBook();

  const { queryUserById } = useQueryUser();
  const { data: user, status } = queryUserById(params.id);

  const { queryLoginUser } = useQueryUser();
  const { data: loginUserData, status: userstatus } = queryLoginUser();

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
    <div className="container mx-auto">
      <div className="grid grid-cols-10">
        <div className="col-start-1 col-span-3">
          {loginUser && <UserInfo user={user} loginUser={loginUser} />}
          <CreateBookForm />
        </div>
        <div className="col-start-5 col-span-10">
          <BookTable
            loginUser={loginUser}
            allBooks={user.books}
            onClickDelete={deleteBookMutation.mutate}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
