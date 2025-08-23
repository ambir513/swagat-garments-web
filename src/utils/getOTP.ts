import z from "zod";
import { RegisterSchema } from "../../Schema";
import axios from "axios";

export default async function getOTP(value: z.infer<typeof RegisterSchema>) {
  const response: any = await axios.post("/api/v1/auth/register", value, {
    withCredentials: true,
  });
  try {
    return { result: true, message: "OTP sent successfully" };
  } catch (error: any) {
    return { result: false, message: error.response?.data?.message };
  }
}
