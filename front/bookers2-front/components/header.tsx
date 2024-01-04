import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const onClickLogout = () => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    router.push("/");
  };

  return (
    <header className="shadow-md py-4 px-4 sm:px-10 bg-dark font-[sans-serif] min-h-[70px]">
      <div className="flex flex-wrap items-center justify-between gap-5 relative">
        <img className="w-36" />

        <div className="flex lg:order-1 max-sm:ml-auto">
          <Link
            className="px-4 py-2 text-sm rounded-full font-bold text-white bg-indigo-600 transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[indigo-600] ml-3"
            href="log-in"
          >
            Login
          </Link>
          <Link
            className="px-4 py-2 text-sm rounded-full font-bold text-white bg-indigo-600 transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[indigo-600] ml-3"
            href="sign-up"
          >
            Sign up
          </Link>
          <button
            onClick={onClickLogout}
            className="px-4 py-2 text-sm rounded-full font-bold text-white bg-indigo-600 transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[indigo-600] ml-3"
          >
            Logout
          </button>
        </div>
        <ul
          id="collapseMenu"
          className="lg:!flex lg:space-x-5 max-lg:space-y-2 max-lg:hidden max-lg:py-4 max-lg:w-full"
        >
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <Link
              className="lg:hover:text-indigo-600 text-gray-500 block font-semibold text-[15px]"
              href="/book"
            >
              Books
            </Link>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <Link
              className="lg:hover:text-indigo-600 text-gray-500 block font-semibold text-[15px]"
              href="/user"
            >
              Users
            </Link>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <Link
              className="lg:hover:text-indigo-600 text-gray-500 block font-semibold text-[15px]"
              href="/"
            >
              Top
            </Link>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <a className="lg:hover:text-indigo-600 text-gray-500 block font-semibold text-[15px]">
              About
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
