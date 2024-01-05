import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

const useSubmitHandler = () => {
  const router = useRouter();

  const onSubmit: SubmitHandler<CreateBookForm> = async (data) => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/book`, data);
    router.push("/book");
  };

  return onSubmit;
};

export default useSubmitHandler;