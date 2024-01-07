"use client";
import EditBookForm from "@/components/EditBookForm";
import { useQueryBook } from "@/hooks/useQueryBook";
import { CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const params = useParams();
  const { queryBookById } = useQueryBook();
  const { data, status } = queryBookById(params.id);

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
          <div className="col-start-3 col-span-6">
            {book && <EditBookForm book={book} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
