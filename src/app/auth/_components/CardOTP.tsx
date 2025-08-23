"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "../../../../Schema";
import { Spinner } from "@/components/ui";
import { useState } from "react";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function CardOTP({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const Route = useRouter();
  const [spinner, setSpinner] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function handleResent() {
    const response = await toast.promise(
      axios.post("/api/v1/auth/otp/resent", {
        name,
        email,
        password,
      }),
      {
        loading: "resenting....",
        success: (res) => <b>{res.data.message}</b>,
        error: (err: any) => <b>{err.response?.data?.message}</b>,
      }
    );
  }
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setSpinner((prev) => !prev);
    const response = await toast.promise(
      axios.post("/api/v1/auth/otp/verify", {
        name,
        email,
        password,
        code: data?.pin,
      }),
      {
        loading: "Verifying...",
        success: (res) => <b>{res.data.message}</b>,
        error: (err: any) => <b>{err.response?.data?.message}</b>,
      }
    );
    setSpinner((prev) => !prev);
    if ((response.data.status = "SUCCESS")) {
      Route.push("/auth/login");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="text-center">
              <FormControl>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </FormControl>
              <FormDescription>
                Please enter the 6-digit code sent to your email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full flex items-center gap-x-3"
          disabled={spinner}
        >
          <span className="">{spinner && <Spinner />}</span>
          <span>Verify Code</span>
        </Button>
      </form>
      <div className="mt-4  text-center">
        <p className="text-sm text-muted-foreground">
          Didn't receive the code?{" "}
          <button
            className="font-medium underline cursor-pointer"
            onClick={handleResent}
          >
            Resend
          </button>
        </p>
      </div>
    </Form>
  );
}
