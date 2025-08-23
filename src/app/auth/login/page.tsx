"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CardForm from "../_components/CardForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../../../Schema";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const page = () => {
  const [showPass, setShowPass] = useState(false);
  const Route = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    const response = await toast.promise(
      axios.post("/api/v1/auth/login", { ...values }),
      {
        loading: "Verifying...",
        success: (res) => <b>{res.data.message}</b>,
        error: (err: any) => <b>{err.response?.data?.message}</b>,
      }
    );
    if (response.data.status === "SUCCESS") {
      Route.push("/");
    }
  };
  return (
    <div className="sm:flex justify-center items-center  2xl:pt-0 pt-28">
      <CardForm
        title="Sign in to Swagat Garments"
        description="Welcome back! Please sign in to continue"
        backButtonLabel="Sign up"
        backButtonTitle="Don't have an account?"
        backButtonUrl="/auth/signup"
        className="sm:w-[380px] w-full px-0 border-0 bg-background flex flex-col"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="***********"
                      type={showPass ? "text" : "password"}
                      {...field}
                      onFocus={() => setShowPass((prev) => !prev)}
                      onBlur={() => setShowPass((prev) => !prev)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardForm>
    </div>
  );
};

export default page;
