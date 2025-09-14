"use server";
import Register from "@/feature/auth/pages/Register";
import useToken from "@/utils/GetToken";
import { redirect } from "next/navigation";

const page = async () => {
  const { getToken } = useToken();
  const token = await getToken();
  if (token) {
    redirect("/");
  }
  return <Register />;
};

export default page;
