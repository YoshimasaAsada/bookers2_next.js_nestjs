"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import axios from "axios";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/Hheader";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const inter = Inter({ subsets: ["latin"] });

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

  /* tanstac使う時必要 */
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
        </body>
        {/* <ReactQueryDevtools /> */}
      </html>
    </QueryClientProvider>
  );
}
