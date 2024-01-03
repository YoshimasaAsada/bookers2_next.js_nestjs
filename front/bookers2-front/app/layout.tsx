"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Header } from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

/* use client使うから消した */
// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* cookieのやりとりをバックエンドとする時必須のやつ */
  axios.defaults.withCredentials = true;

  /* csrfトークンの設定 */
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
      );
      axios.defaults.headers.common["csrf-token"] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onClickLogout = () => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
