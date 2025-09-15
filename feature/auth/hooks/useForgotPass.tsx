import axios from "axios";
import toast from "react-hot-toast";

const useForgotPass = () => {
  async function useSendCode(email: string) {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/auth/forgot-password/${email}`,
        { withCredentials: true }
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

  return { useSendCode };
};

export default useForgotPass;
