"use server";
import { cookies } from "next/headers";
import { use } from "react";

const useToken = () => {
  async function getToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  return { getToken };
};

export default useToken;
