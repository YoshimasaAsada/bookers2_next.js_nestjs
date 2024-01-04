import * as React from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <div className="container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
          <div className="relative z-10 flex flex-col items-start lg:w-3/5 xl:w-2/5">
            <h1 className="mt-4 text-6xl font-bold leading-tight text-white sm:text-7xl">
              Welcome to Bookers2
              <br />
              ↓get start!
            </h1>
            <Link
              href="log-in"
              className="relative mt-10 text-lg font-bold uppercase inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Lgoin or SignIn
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
