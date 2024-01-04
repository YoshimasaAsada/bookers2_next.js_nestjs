import React from "react";
type Props = {
  user: any;
};

const UserInfo = ({ user }: Props) => {
  return (
    <>
      <h1>User Info</h1>
      <table className="w-full text-sm text-left rtl:text-right">
        <tbody className="">
          <tr className="border-b dark:border-gray-700">
            <th
              scope="row"
              className="text-gray-900 whitespace-nowrap dark:text-white"
            >
              name
            </th>
            <td className="px-6 py-4">{user.name}</td>
          </tr>
          <tr className="border-b dark:border-gray-700">
            <th
              scope="row"
              className="text-gray-900 whitespace-nowrap dark:text-white"
            >
              introduction
            </th>
            <td className="px-6 py-4">{user.introduction}</td>
          </tr>
          <tr className="border-b dark:border-gray-700">
            <th
              scope="row"
              className="text-gray-900 whitespace-nowrap dark:text-white"
            >
              email
            </th>
            <td className="px-6 py-4">{user.email}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default UserInfo;
