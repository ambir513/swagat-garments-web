import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/sendEmail";
import { RegisterSchema } from "../../../../../../Schema";

const otpcode = () => Math.floor(100000 + Math.random() * 900000).toString();

export async function POST(req: Request) {
  const body = await req.json();
  const isValidFields = RegisterSchema.safeParse(body);

  if (isValidFields.error) {
    return NextResponse.json({ message: "Something went wrong" });
  }

  const { name, email, password } = body;

  const isUserExist = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExist) {
    return NextResponse.json({ message: "User is already register" });
  }

  const code = otpcode();
  const isOtpCreated = await db.otp.create({
    data: {
      email,
      code,
    },
  });

  await sendEmail(
    email,
    "Your One-Time Password (OTP)",
    `
  <div style="
    font-family: Arial, sans-serif; 
    line-height: 1.5; 
    color: #333;
  ">
    <h2 style="color: #4CAF50;">Your OTP Code</h2>
    <p>Dear user,</p>
    <p>Your One-Time Password (OTP) for MyApp is:</p>
    <h1 style="letter-spacing: 4px;">${code}</h1>
    <p>This OTP will expire in <strong>5 minutes</strong>.</p>
    <p>If you did not request this, please ignore this email.</p>
    <hr>
    <p style="font-size: 12px; color: #888;">MyApp Team</p>
  </div>`
  );

  return NextResponse.json({ message: "OTP sent successfully" });
}
