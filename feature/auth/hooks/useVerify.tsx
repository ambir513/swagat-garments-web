import { VerifySchema } from "..";
import z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

type VerifyOTPType = z.infer<typeof VerifySchema>;

const useVerify = () => {
  async function verifyOtp(data: VerifyOTPType) {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/verify",
        data,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.message || error.message);
      } else {
        console.log(error);
      }
      return false;
    }
  }

  return { verifyOtp };
};

export default useVerify;
