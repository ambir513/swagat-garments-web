"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SlotProps } from "input-otp";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OtpVerfiySchema } from "../index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import usePassVerify from "../hooks/usePassVerify";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import useForgotPass from "../hooks/useForgotPass";

function OtpDialogPass({ email }: { email: string }) {
  const { useVerify } = usePassVerify();
  const { useSendCode } = useForgotPass();
  const [hasGuessed, setHasGuessed] = useState<undefined | boolean>(undefined);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [timeLeft, setTimeLeft] = useState(100);
  const [isLoading, setIsLoading] = useState({ load: false, event: "" });
  const [otpValue, setOtpValue] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const Route = useRouter();

  const LoginForm = useForm<z.infer<typeof OtpVerfiySchema>>({
    resolver: zodResolver(OtpVerfiySchema),
    defaultValues: {
      code: "",
      password: "",
    },
  });

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setTimeLeft(100);
    setCanResend(false);
    document.getElementById("otp-0")?.focus();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (hasGuessed) {
      closeButtonRef.current?.focus();
    }
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [hasGuessed, timeLeft]);

  async function onSubmit(values: z.infer<typeof OtpVerfiySchema>) {
    setIsLoading({ load: true, event: "submit" });
    const response = await useVerify({
      email,
      code: otpValue,
      newPassword: password,
    });

    if (response) {
      setIsLoading({ load: false, event: "" });
      Route.push("/auth/login");
    } else {
      setIsLoading({ load: false, event: "" });
      setOtpValue("");
      setPassword("");
      setHasGuessed(false);
    }
  }

  return (
    <Card className="w-md mx-4 mt-20">
      <CardHeader>
        <CardTitle className="text-center">
          {hasGuessed ? "Code verified!" : "Enter confirmation code"}
        </CardTitle>
        <CardDescription className="text-center">
          {hasGuessed
            ? "Your code has been successfully verified."
            : `Enter the 6 Digit code along with New password`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasGuessed ? (
          <div className="text-center">
            <div>
              <Button type="button" ref={closeButtonRef}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="">
              <Form {...LoginForm}>
                <form
                  onSubmit={LoginForm.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={LoginForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>One time password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="XXXXXX"
                            {...field}
                            value={otpValue.trim()}
                            onChange={(e) => {
                              setOtpValue(e.target.value);
                              field.onChange(e.target.value.trim());
                            }}
                            ref={field.ref}
                            onFocus={() => setHasGuessed(undefined)}
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
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            type={show ? "text" : "password"}
                            placeholder="XXXXXXXXXX"
                            {...field}
                            value={password.trim()}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              field.onChange(e.target.value.trim());
                            }}
                            onBlur={() => setShow(false)}
                            ref={field.ref}
                            onFocus={() => setShow((prev) => true)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {isLoading?.event === "submit" && isLoading.load ? (
                    <Button type="submit" className="w-full" disabled>
                      <Spinner />
                      <span>Submit...</span>
                    </Button>
                  ) : isLoading.event === "resent" ? (
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
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col justify-center items-center gap-y-2">
        {!canResend && (
          <p className="text-center text-xs text-muted-foreground mb-2">
            You can resend OTP in <strong>{formatTime(timeLeft)}</strong>
          </p>
        )}
        {isLoading?.event === "resent" && isLoading.load ? (
          <Button className="w-full" variant={"outline"} disabled>
            <Spinner />
            <span>Resent code...</span>
          </Button>
        ) : isLoading.event === "google" ? (
          <Button className="w-full" variant={"outline"} disabled>
            Resent code
          </Button>
        ) : (
          <Button
            variant={"outline"}
            className="sm:w-[300px] w-full"
            disabled={!canResend}
            onClick={async () => {
              setIsLoading({ load: true, event: "resent" });
              await useSendCode(email);
              setIsLoading({ load: false, event: "" });
              setOtpValue("");
              setPassword("");
              handleResend();
            }}
          >
            Resent code
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "flex size-9 items-center justify-center rounded-lg border border-input bg-background font-medium text-foreground shadow-sm shadow-black/5 transition-shadow",
        { "z-10 border border-ring ring-[3px] ring-ring/20": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}

export default OtpDialogPass;
