import { NextResponse } from "next/server";
import { LoginSchema } from "../../../../../../Schema";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const cookieStore = cookies();
  const isValidFields = LoginSchema.safeParse(body);

  if (isValidFields.error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 409 }
    );
  }
  const { email, password } = body;
  const isUserExist = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!isUserExist) {
    return NextResponse.json(
      { message: "Invalid Cretentials" },
      { status: 402 }
    );
  }
  const isPassValid = await bcrypt.compare(password, isUserExist.password);
  if (!isPassValid) {
    return NextResponse.json(
      { message: "Invalid Cretentials" },
      { status: 402 }
    );
  }
  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "";

  const token = jwt.sign({ isUserExist }, SECRET_KEY, {
    expiresIn: "1d",
  });
  (await cookieStore).set("token", token);
  //    cookieStore.set('token', token, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: 'strict',
  //     maxAge: 60 * 60 * 24 * 7, // 1 week
  //     path: '/'
  //   })
  return NextResponse.json(
    { message: "Logged in successfully" },
    { status: 200 }
  );
}
