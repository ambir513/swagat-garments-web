import axios from "axios";
import toast from "react-hot-toast";

const usePassVerify = () => {
  async function useVerify(data: {
    email: string;
    code: string;
    newPassword: string;
  }) {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/password/verify",
        data,
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

  return { useVerify };
};

export default usePassVerify;
