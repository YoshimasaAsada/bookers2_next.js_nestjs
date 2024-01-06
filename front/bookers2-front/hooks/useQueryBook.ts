import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useQueryBook = () => {
  const router = useRouter();

  const getBookAll = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/book`);
      console.log(res);
      return res.data;
    } catch (error: any) {
      router.push("log-in");
    }
  };

  return useQuery({
    queryKey: ["books"],
    queryFn: getBookAll,
    onError: (error: any) => {
      console.log(error);
    },
  });
};
