"use client";
import BookTable from "@/components/BookTable";
import CreateBookForm from "@/components/CreateBookForm";
import UserInfo from "@/components/UserInfo";
import { useQueryBookById } from "@/hooks/useQueryBook";
import { useQueryLoginUser } from "@/hooks/useQueryUser";
import { CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const { data: book, status } = useQueryBookById(params.id);
  const { data: loginUser, status: userstatus } = useQueryLoginUser();

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
            {book?.user && loginUser && (
              <UserInfo user={book.user} loginUser={loginUser} />
            )}
            <CreateBookForm />
          </div>
          <div className="col-start-5 col-span-10">
            {book && loginUser && (
              <BookTable loginUser={loginUser} allBooks={[book]} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
