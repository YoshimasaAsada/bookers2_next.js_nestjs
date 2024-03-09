import { useQueryLoginUser } from "@/hooks/useQueryUser";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  // ログイン時とそうでない時でヘッダーを分けるためにログインユーザーとってる
  const { data } = useQueryLoginUser();

  const onClickLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
      queryClient.setQueryData(["login-user"], null);
      // ログインユーザーのキャッシュをリセット
      queryClient.invalidateQueries(["login-user"]);
      // キャッシュを無効化して再取得をトリガー
      router.push("/log-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="shadow-md py-4 px-4 sm:px-10 bg-dark font-[sans-serif] min-h-[70px]">
      <div className="flex flex-wrap items-center justify-between gap-5 relative">
        <img className="w-36" />
        <div className="flex lg:order-1 max-sm:ml-auto">
          {data ? (
            <>
              <Link
                className="px-4 py-2 lg:hover:text-indigo-600 text-gray-500 block font-semibold text-[15px]"
                href={`/user/${data.id}`}>
                Home
              </Link>
              <Link
                className="px-4 py-2 lg:hover:text-indigo-600 text-gray-500 block font-semibold text-[15px]"
                href="/user">
                Users
              </Link>
              <Link
                className="px-4 py-2 lg:hover:text-indigo-600 text-gray-500 block font-semibold text-[15px]"
                href="/book">
                Books
              </Link>
              <button
                onClick={onClickLogout}
                className="px-4 py-2 text-sm rounded-full font-bold text-white bg-indigo-600 transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[indigo-600] ml-3">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="px-4 py-2 lg:hover:text-indigo-600 text-gray-500 block font-semibold text-[15px]"
                href="/">
                Top
              </Link>
              <Link
                className="px-4 py-2 text-sm rounded-full font-bold text-white bg-indigo-600 transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[indigo-600] ml-3"
                href="log-in">
                Login
              </Link>
              <Link
                className="px-4 py-2 text-sm rounded-full font-bold text-white bg-indigo-600 transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[indigo-600] ml-3"
                href="sign-up">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
