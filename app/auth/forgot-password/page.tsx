"use server";
import useToken from "@/utils/GetToken";
import { redirect } from "next/navigation";
import ForgotPassword from "@/feature/auth/pages/ForgotPassword";

const page = async () => {
  const { getToken } = useToken();
  const token = await getToken();
  if (token) {
    redirect("/");
  }
  return <ForgotPassword />;
};

export default page;
