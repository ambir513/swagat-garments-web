"use client";
import AuthCard from "./AuthCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterFormSchema } from "../index";
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
import OtpDialog from "./OtpDialog";
import Spinner from "@/components/ui/spinner";
import useSign from "../hooks/useSign";

const RegisterForm = () => {
  const { signUp } = useSign();
  const [isOpen, setIsOpen] = useState(false);
  const emailFocus = useRef<HTMLInputElement>(null);
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState({ load: false, event: "" });
  const RegisterForm = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
    setIsLoading({ load: true, event: "register" });
    const response = await signUp(inputData);
    if (response) {
      setIsOpen(true);
    } else {
      setInputData((prev) => ({ ...prev, email: "", password: "" }));
      emailFocus.current?.focus();
      setIsLoading({ load: false, event: "" });
    }
  }
  if (isOpen) {
    return <OtpDialog data={inputData} />;
  }
  return (
    <div className="max-w-lg m-4">
      <AuthCard
        title="Create your account"
        description="Welcome! Please fill in the details to get started."
        footerLabel="Already have an account? "
        href="/auth/login"
        isForPass={false}
        linkLabel="Login"
      >
        <main className="flex flex-col gap-y-3">
          <Form {...RegisterForm}>
            <form
              onSubmit={RegisterForm.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <div className="flex justify-between gap-x-3">
                <FormField
                  control={RegisterForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          {...field}
                          value={inputData.firstName.trim()}
                          onChange={(e) => {
                            setInputData((prev) => ({
                              ...prev,
                              firstName: e.target.value,
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
                  control={RegisterForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          {...field}
                          value={inputData.lastName.trim()}
                          onChange={(e) => {
                            setInputData((prev) => ({
                              ...prev,
                              lastName: e.target.value,
                            }));
                            field.onChange(e.target.value.trim());
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={RegisterForm.control}
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
                control={RegisterForm.control}
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
              {isLoading?.event === "register" && isLoading.load ? (
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

export default RegisterForm;
