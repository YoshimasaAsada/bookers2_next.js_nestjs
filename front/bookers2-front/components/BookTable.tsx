import { Link } from "@mui/material";
import { Book, User } from "@prisma/client";
import axios from "axios";
import React, { useState } from "react";

type Props = {
  allBooks: any;
};

const BookTable = (props: Props) => {
  console.log(props);
  const onClickDelete = (id: number) => {
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/book/${id}`);
  };

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-gray-700 dark:text-gray-400 border-b">
            <tr>
              <th scope="col" className="px-6 py-3">
                user name
              </th>
              <th scope="col" className="px-6 py-3">
                title
              </th>
              <th scope="col" className="px-6 py-3">
                body
              </th>
            </tr>
          </thead>
          <tbody className="">
            {props.allBooks.map(
              (book: Book & { user: User }, index: number) => {
                // なんかきもいから後で直す
                return (
                  <tr className="border-b dark:border-gray-700" key={index}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Link href={`/user/${book.user.id}`}>
                        {book.user.name}
                      </Link>
                    </th>
                    <td className="px-6 py-4">
                      <Link href={`/book/${book.id}`}>{book.title}</Link>
                    </td>
                    <td className="px-6 py-4">{book.body}</td>
                    <td className="px-6 py-4">
                      <Link
                        style={{ color: "white" }}
                        href={`/book/${book.id}/edit`}
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        style={{ color: "white" }}
                        // href={`/book/${book.id}/edit`}
                        type="button"
                        onClick={() => onClickDelete(book.id)}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookTable;
