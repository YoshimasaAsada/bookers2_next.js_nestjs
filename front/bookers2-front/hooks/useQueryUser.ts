import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useQueryUser = () => {
  const router = useRouter();

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`);
      console.log(res);
      return res.data;
    } catch (error: any) {
      router.push("/log-in");
    }
  };

  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    onError: (err: any) => {
      console.log(err);
    },
  });
};
