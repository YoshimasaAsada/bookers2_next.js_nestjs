import { Link } from "@mui/material";
import { User } from "@prisma/client";

import React from "react";

type Props = {
  allUsers: User[];
};

const UserTable = (props: Props) => {
  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-gray-700 dark:text-gray-400 border-b">
            <tr>
              <th scope="col" className="px-6 py-3">
                name
              </th>
              <th scope="col" className="px-6 py-3">
                email
              </th>
            </tr>
          </thead>
          <tbody className="">
            {props.allUsers.map((user: User, index: number) => {
              return (
                <tr className="border-b dark:border-gray-700" key={index}>
                  <td className="px-6 py-4">
                    <Link href={`/user/${user.id}`}>{user.name}</Link>
                  </td>

                  <td className="px-6 py-4">{user.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
