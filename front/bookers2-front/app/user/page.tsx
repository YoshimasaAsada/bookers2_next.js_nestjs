"use client";
import CreateBookForm from "@/components/CreateBookForm";
import UserInfo from "@/components/UserInfo";
import UserTable from "@/components/UserTable";
import { useQueryAllUsers, useQueryLoginUser } from "@/hooks/useQueryUser";
import { CircularProgress } from "@mui/material";
import React from "react";

const page = () => {
  const { data: allUsers, status: allUsersStatus } = useQueryAllUsers();
  const { data: loginUser, status: loginUserStatus } = useQueryLoginUser();

  if (allUsersStatus === "loading" || loginUserStatus === "loading")
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
            {loginUser && <UserInfo user={loginUser} loginUser={loginUser} />}
            <CreateBookForm />
          </div>
          <div className="col-start-5 col-span-10">
            {allUsers && <UserTable allUsers={allUsers} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
