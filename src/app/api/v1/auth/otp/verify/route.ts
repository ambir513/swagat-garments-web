import { NextResponse } from "next/server";
import { RegisterSchema } from "../../.././../../../../Schema";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const isValidFields = RegisterSchema.safeParse(body);

  if (isValidFields.error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 409 }
    );
  }

  const { name, email, password, code } = body;
  const otp = await db.otp.findFirst({
    where: {
      email,
      code,
      verified: false,
      expiresAt: { gt: new Date() },
    },
  });

  if (!otp) {
    return NextResponse.json(
      { message: "Invalid or expired OTP" },
      { status: 400 }
    );
  }
  await db.otp.delete({
    where: { id: otp.id },
  });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return NextResponse.json(
    {
      message: "OTP verified successfully.",
      status: "SUCCESS",
    },
    { status: 202 }
  );
}
