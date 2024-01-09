"use client";
import CreateBookForm from "@/components/CreateBookForm";
import UserInfo from "@/components/UserInfo";
import UserTable from "@/components/UserTable";
import useMutateBook from "@/hooks/useMutateBook";
import { useQueryUser } from "@/hooks/useQueryUser";
import { CircularProgress } from "@mui/material";
import React from "react";

const page = () => {
  const { createBookMutation } = useMutateBook();
  const { queryAllUsers } = useQueryUser();
  /* user一覧をとってくる */
  const { data, isError, error, status } = queryAllUsers();
  // ここのdata, isError, errorは固定値
  /* とってきたユーザー一覧がdataに格納されているので、これを変数に入れる */
  const users = data?.allUsers ?? [];
  const currentUser = data?.currentUser ?? "";

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
            <UserInfo user={currentUser} loginUser={currentUser} />
            <CreateBookForm />
          </div>
          <div className="col-start-5 col-span-10">
            <UserTable allUsers={users} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
