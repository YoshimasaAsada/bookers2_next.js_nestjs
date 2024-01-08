"use client";

import { EditUserForm } from "@/components/EditUserForm";
import { useQueryBook } from "@/hooks/useQueryBook";
import { useQueryUser } from "@/hooks/useQueryUser";
import { CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const page = () => {
  const params = useParams();
  const { queryUserById } = useQueryUser();
  const { data, status } = queryUserById(params.id);
  const user = data ?? "";

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
            {user && <EditUserForm user={user} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
