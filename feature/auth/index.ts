import { z } from "zod";

export const RegisterFormSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "firstname is required" })
    .max(20, { message: "firstname must be in 20 character only" }),
  lastName: z
    .string()
    .min(3, { message: "lastname is required" })
    .max(20, { message: "lastname must be in 20 character only" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .toLowerCase()
    .max(50, { message: "email must be in 50 character only" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/[a-z]/, { message: "Password must include a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must include an uppercase letter" })
    .regex(/[0-9]/, { message: "Password must include a number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must include a special character",
    })
    .max(16, { message: "email must be in 16 character only" }),
});

export const VerifySchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "firstName is required" })
    .max(20, { message: "firstName must be in 20 character only" }),
  lastName: z
    .string()
    .min(3, { message: "lastname is required" })
    .max(20, { message: "lastname must be in 20 character only" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .toLowerCase()
    .max(50, { message: "email must be in 50 character only" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/[a-z]/, { message: "Password must include a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must include an uppercase letter" })
    .regex(/[0-9]/, { message: "Password must include a number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must include a special character",
    })
    .max(16, { message: "email must be in 16 character only" }),
  code: z
    .string()
    .min(6, { message: "Otp must be 6 digit" })
    .max(6, { message: "Otp must be 6 digit" })
    .optional(),
});

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .toLowerCase()
    .max(50, { message: "email must be in 50 character only" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/[a-z]/, { message: "Password must include a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must include an uppercase letter" })
    .regex(/[0-9]/, { message: "Password must include a number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must include a special character",
    })
    .max(16, { message: "email must be in 16 character only" }),
});
export const OtpVerfiySchema = z.object({
  code: z
    .string()
    .min(6, { message: "Otp must be 6 digit" })
    .max(6, { message: "Otp must be 6 digit" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/[a-z]/, { message: "Password must include a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must include an uppercase letter" })
    .regex(/[0-9]/, { message: "Password must include a number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must include a special character",
    })
    .max(16, { message: "email must be in 16 character only" }),
});
