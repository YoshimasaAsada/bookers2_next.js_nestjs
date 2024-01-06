import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

const useCreateBook = () => {
  const router = useRouter();

  const onSubmit: SubmitHandler<CreateBookForm> = async (data) => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/book`, data);
    router.push("/book");
  };

  return onSubmit;
};

export default useCreateBook;
