"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { OTPInput, SlotProps } from "input-otp";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterFormSchema } from "../index";
import z from "zod";
import axios from "axios";
import useSign from "../hooks/useSign";
import useVerify from "../hooks/useVerify";
import { useRouter } from "next/navigation";

type RegisterFormType = z.infer<typeof RegisterFormSchema>;
let CORRECT_CODE = "23323";

function OtpDialog({ data }: { data: any }) {
  const { signUp } = useSign();
  const { verifyOtp } = useVerify();
  const [value, setValue] = useState("");
  const [hasGuessed, setHasGuessed] = useState<undefined | boolean>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const Route = useRouter();
  const handleResend = () => {
    setMessage("OTP has been resent to your email or phone.");
    setOtp(["", "", "", ""]);
    setTimeLeft(60);
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

  async function onSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault?.();

    inputRef.current?.select();
    const response = await verifyOtp({ ...data, code: value });
    console.log(response);
    setHasGuessed(response);
    if (response) {
      Route.push("/");
    }

    setValue("");
    setTimeout(() => {
      inputRef.current?.blur();
    }, 20);
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
            : `Check your email and enter the 6 Digit code `}
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
            <div className="flex justify-center">
              <OTPInput
                id="cofirmation-code"
                ref={inputRef}
                value={value}
                onChange={setValue}
                containerClassName="flex items-center gap-3 has-[:disabled]:opacity-50"
                maxLength={6}
                onFocus={() => setHasGuessed(undefined)}
                render={({ slots }) => (
                  <div className="flex gap-2">
                    {slots.map((slot, idx) => (
                      <Slot key={idx} {...slot} />
                    ))}
                  </div>
                )}
                onComplete={onSubmit}
              />
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

        {hasGuessed === false && (
          <Badge variant={"destructive"}>Invalid code. Please try again.</Badge>
        )}

        <Button
          variant={"default"}
          className="sm:w-[300px] w-full"
          disabled={!canResend}
          onClick={async () => {
            await signUp(data);
            handleResend();
          }}
        >
          Resend code
        </Button>
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

export default OtpDialog;
