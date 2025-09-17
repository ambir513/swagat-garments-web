"use client";
import AuthCard from "./AuthCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginFormSchema } from "../index";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Social from "./Social";
import { useRef, useState } from "react";
import Spinner from "@/components/ui/spinner";
import useSign from "../hooks/useSign";
import useLogin from "../hooks/useLogin";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const { login } = useLogin();
  const [isLoading, setIsLoading] = useState({ load: false, event: "" });
  const emailFocus = useRef<HTMLInputElement>(null);

  const [show, setShow] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const Route = useRouter();
  const LoginForm = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    const response = await login(inputData);

    if (response) {
      Route.push("/");
    } else {
      setIsLoading({ load: false, event: "" });
      setInputData((prev) => ({ email: "", password: "" }));
      emailFocus.current?.focus();
    }
    console.log(values);
  }

  return (
    <div className="sm:w-lg w-full m-4">
      <AuthCard
        title="Login to Swagat Garments"
        description="Welcome back! Please sign in to continue"
        footerLabel="Don’t have an account? "
        href="/auth/register"
        isForPass={true}
        linkLabel="Register"
      >
        <main className="flex flex-col gap-y-3">
          <Form {...LoginForm}>
            <form
              onSubmit={LoginForm.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={LoginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@gmail.com"
                        {...field}
                        ref={emailFocus}
                        value={inputData.email.trim()}
                        onChange={(e) => {
                          setInputData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }));
                          field.onChange(e.target.value.trim());
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={LoginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type={show ? "text" : "password"}
                        placeholder="XXXXXXXXXX"
                        {...field}
                        value={inputData.password.trim()}
                        onChange={(e) => {
                          setInputData((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }));
                          field.onChange(e.target.value.trim());
                        }}
                        onBlur={() => setShow((prev) => !prev)}
                        onFocus={() => setShow((prev) => !prev)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isLoading?.event === "login" && isLoading.load ? (
                <Button type="submit" className="w-full" disabled>
                  <Spinner />
                  <span>Submit...</span>
                </Button>
              ) : isLoading.event === "google" ? (
                <Button type="submit" className="w-full" disabled>
                  Submit
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              )}
            </form>
          </Form>
          <Social isLoading={false} disabled={isLoading.load} />
        </main>
      </AuthCard>
    </div>
  );
};

export default LoginForm;
