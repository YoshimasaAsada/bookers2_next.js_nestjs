import Link from "next/link";

export const Header = () => {
  return (
    <header className="shadow-md py-4 px-4 sm:px-10 bg-dark font-[sans-serif] min-h-[70px]">
      <div className="flex flex-wrap items-center justify-between gap-5 relative">
        <a>
          <img className="w-36" />
        </a>
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
          <button id="toggle" className="lg:hidden ml-7">
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <ul
          id="collapseMenu"
          className="lg:!flex lg:space-x-5 max-lg:space-y-2 max-lg:hidden max-lg:py-4 max-lg:w-full"
        >
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <Link
              className="lg:hover:text-indigo-600 text-gray-500 block font-semibold text-[15px]"
              href="book"
            >
              Books
            </Link>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <Link
              className="lg:hover:text-indigo-600 text-gray-500 block font-semibold text-[15px]"
              href="user"
            >
              Users
            </Link>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <a className="lg:hover:text-indigo-600 text-gray-500 block font-semibold text-[15px]">
              Home
            </a>
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
