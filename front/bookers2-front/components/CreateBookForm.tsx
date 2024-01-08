import useMutateBook from "@/hooks/useMutateBook";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const CreateBookForm = () => {
  const { register, handleSubmit, reset } = useForm<CreateBookForm>();
  const { createBookMutation } = useMutateBook();

  /* 投稿ロジックはコンポーネント内で書くみたい */
  const onSubmit: SubmitHandler<CreateBookForm> = (data) => {
    createBookMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            title
          </label>
          <input
            {...register("title")}
            type="text"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            body
          </label>
          <input
            {...register("body")}
            type="text"
            id="large-input"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          CreateBook
        </button>
      </form>
    </>
  );
};

export default CreateBookForm;
