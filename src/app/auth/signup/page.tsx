"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CardForm from "../_components/CardForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../../../../Schema";
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
import getOTP from "@/utils/getOTP";
import { Spinner } from "@/components/ui";
import { BadgeAlert, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import CardOTP from "../_components/CardOTP";
import toast from "react-hot-toast";

const page = () => {
  const [showPass, setShowPass] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState({
    result: false,
    message: " ",
    name: "",
    email: "",
    password: "",
  });
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setSpinner((prev) => !prev);
    const response = await getOTP(values);
    console.log(response);
    setSpinner((prev) => !prev);
    setMessage({ ...response, ...values });
    if (response.result) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div className="sm:flex justify-center items-center ">
      {message.result ? (
        <div className="2xl:mx-0 mx-5 2xl:pt-0 pt-28">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="text-center mb-4 ">
                <h1 className="text-2xl font-bold mb-2">Verify Your Account</h1>
                <p className="text-muted-foreground">
                  {`We've sent a verification code to your ${
                    !message?.email ? "email" : message?.email
                  }. Please enter it
                  below to continue.`}
                </p>
              </div>
              <CardOTP
                name={message?.name}
                email={message?.email}
                password={message?.password}
              />
            </div>
          </div>
        </div>
      ) : (
        <CardForm
          title="Create your account"
          description="Welcome! Please fill in the details to get started."
          backButtonLabel="Login"
          backButtonTitle="Already have an account?"
          backButtonUrl="/auth/login"
          className="sm:w-[380px] w-full px-0 border-0 bg-background flex flex-col"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <Button
                type="submit"
                className="w-full flex items-center gap-x-3"
                disabled={spinner}
              >
                <span className="">{spinner && <Spinner />}</span>
                <span>Create account</span>
              </Button>
            </form>
          </Form>
        </CardForm>
      )}
    </div>
  );
};

export default page;
