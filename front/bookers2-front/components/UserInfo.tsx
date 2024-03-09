import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  user?: User;
  loginUser?: User;
};

const UserInfo = ({ user, loginUser }: Props) => {
  return (
    <>
      <h1>User Info</h1>
      <table className="w-full text-sm text-left rtl:text-right">
        <tbody className="">
          <tr className="border-b dark:border-gray-700">
            <th
              scope="row"
              className="text-gray-900 whitespace-nowrap dark:text-white">
              name
            </th>
            <td className="px-6 py-4">{user?.name}</td>
          </tr>
          <tr className="border-b dark:border-gray-700">
            <th
              scope="row"
              className="text-gray-900 whitespace-nowrap dark:text-white">
              introduction
            </th>
            <td className="px-6 py-4">{user?.introduction}</td>
          </tr>
          <tr className="border-b dark:border-gray-700">
            <th
              scope="row"
              className="text-gray-900 whitespace-nowrap dark:text-white">
              email
            </th>
            <td className="px-6 py-4">{user?.email}</td>
          </tr>
        </tbody>
      </table>
      {user?.id === loginUser?.id && (
        <Link
          className="mb-2 block w-full rounded border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 text-center"
          href={`/user/${loginUser?.id}/edit`}>
          プロフィール編集
        </Link>
      )}
    </>
  );
};

export default UserInfo;
