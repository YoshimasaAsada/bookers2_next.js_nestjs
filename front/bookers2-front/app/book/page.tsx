"use client";
import BookTable from "@/components/BookTable";
import CreateBookForm from "@/components/CreateBookForm";
import UserInfo from "@/components/UserInfo";
import useMutateBook from "@/hooks/useMutateBook";
import { useQueryBook } from "@/hooks/useQueryBook";
import React, { useEffect, useState } from "react";

const page = () => {
  const { createBookMutation, deleteBookMutation } = useMutateBook();
  const { data, status } = useQueryBook();
  const currentUser = data?.currentUser ?? {};
  // data?.currentUserの?消すと死ぬ
  const books = data?.allBooks ?? [];

  if (status === "loading") return <p>Loading...</p>;
  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-10">
          <div className="col-start-1 col-span-3">
            <UserInfo user={currentUser} />
            <CreateBookForm onSubmit={createBookMutation.mutate} />
          </div>
          <div className="col-start-5 col-span-10">
            <BookTable
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
