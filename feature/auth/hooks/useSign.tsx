import { RegisterFormSchema } from "..";
import z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

type ResponseType = z.infer<typeof RegisterFormSchema>;

const useSign = () => {
  async function signUp(data: ResponseType) {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/sign-up",
        data
      );
      toast.success(res.data.message);
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message);
        console.log(error.response?.data?.message || error.message);
      } else {
        console.log(error);
      }
      return false;
    }
  }

  return { signUp };
};

export default useSign;
