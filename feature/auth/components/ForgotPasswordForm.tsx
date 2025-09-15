"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthCard from "./AuthCard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import useForgotPass from "../hooks/useForgotPass";
import { useState } from "react";
import OtpDialogPass from "./OtpDialogPass";
import Spinner from "@/components/ui/spinner";

const EmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .toLowerCase()
    .max(50, { message: "email must be in 50 character only" }),
});

const ForgotPasswordForm = () => {
  const { useSendCode } = useForgotPass();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const EmailForm = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof EmailSchema>) {
    setIsLoading((prev) => !prev);
    const response = await useSendCode(values.email);

    if (response) {
      setData(values.email);
      setIsOpen(true);
    } else {
      setIsLoading((prev) => !prev);
    }
    console.log(values);
  }
  if (isOpen) {
    return <OtpDialogPass email={data} />;
  }

  return (
    <div className="sm:w-lg w-full m-4">
      <AuthCard
        title="Forgot Password"
        description="Enter your email below to receive a password reset link"
        linkLabel="Go back to login"
        footerLabel="Remembered your password?"
        href="/auth/login"
        isForPass={false}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Form {...EmailForm}>
              <form
                onSubmit={EmailForm.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={EmailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isLoading ? (
                  <Button type="submit" className="w-full" disabled>
                    <Spinner />
                    <span>Send Verification Code...</span>
                  </Button>
                ) : (
                  <Button type="submit" className="w-full">
                    Send Verification Code
                  </Button>
                )}
              </form>
            </Form>
          </div>
        </div>
      </AuthCard>
    </div>
  );
};

export default ForgotPasswordForm;
