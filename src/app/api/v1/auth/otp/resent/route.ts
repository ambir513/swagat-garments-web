import { NextResponse } from "next/server";
import { RegisterSchema } from "../../.././../../../../Schema";
import { sendEmail } from "@/lib/sendEmail";
import { PrismaClient } from "@prisma/client";
import { db } from "@/lib/db";

const prisma = new PrismaClient();

const otpcode = () => Math.floor(100000 + Math.random() * 900000).toString();

export async function POST(req: Request) {
  const body = await req.json();
  const validatedFields = RegisterSchema.safeParse(body);

  if (!validatedFields.success) {
    return NextResponse.json(
      { message: "Invalid fields provided." },
      { status: 400 }
    );
  }

  const { name, email, password } = body;

  const existingOtp = await db.otp.findFirst({
    where: { email },
  });

  if (existingOtp) {
    if (existingOtp.expiresAt > new Date()) {
      return NextResponse.json(
        {
          message:
            "An OTP has already been sent. Please wait until it expires.",
        },
        { status: 400 }
      );
    } else {
      await db.otp.delete({
        where: { id: existingOtp.id },
      });
    }
  }

  const code = otpcode();
  await db.otp.create({
    data: {
      email,
      code,
    },
  });

  await sendEmail(
    email,
    "Your One-Time Password (OTP)",
    `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
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

  return NextResponse.json(
    { message: "OTP resent successfully" },
    { status: 200 }
  );
}
