"use server";
import useToken from "@/utils/GetToken";
import { redirect } from "next/navigation";
import Login from "@/feature/auth/pages/Login";

const page = async () => {
  const { getToken } = useToken();
  const token = await getToken();
  if (token) {
    redirect("/");
  }
  return <Login />;
};

export default page;
