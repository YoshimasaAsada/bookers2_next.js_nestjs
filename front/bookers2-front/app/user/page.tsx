"use client";
import CreateBookForm from "@/components/CreateBookForm";
import UserInfo from "@/components/UserInfo";
import UserTable from "@/components/UserTable";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

const page = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`).then((res) => {
      setUsers(res.data.allUsers);
      setCurrentUser(res.data.currentUser);
      // console.log(users);
    });
  }, []);

  const onSubmit: SubmitHandler<createBookForm> = async (data) => {
    axios.post(`http://localhost:3000/book`, data);
    // setBooks((books) => [...books, data]);
    router.push("/book");
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-10">
          <div className="col-start-1 col-span-3">
            <UserInfo user={currentUser} />
            <CreateBookForm onSubmit={onSubmit} />
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
