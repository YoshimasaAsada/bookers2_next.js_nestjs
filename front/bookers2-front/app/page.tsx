import * as React from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-25"></div>
        <div className="container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
          <div className="relative z-10 flex flex-col items-start lg:w-3/5 xl:w-2/5">
            <h1 className="mt-4 text-6xl font-bold leading-tight text-white sm:text-7xl">
              Welcome to Bookers2
              <br />
              ↓get start!
            </h1>
            <Link
              href="log-in"
              className="block px-4 py-3 mt-10 text-lg font-bold text-gray-800 uppercase bg-white rounded-lg hover:bg-gray-100"
            >
              Lgoin or SignIn
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
