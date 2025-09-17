"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface AuthCardProp {
  title: string;
  description: string;
  children: React.ReactNode;
  footerLabel: string;
  linkLabel: string;
  href: string;
  isForPass: Boolean;
}

const AuthCard = ({
  title,
  description,
  children,
  linkLabel,
  footerLabel,
  href,
  isForPass,
}: AuthCardProp) => {
  return (
    <Card>
      <CardHeader className="flex flex-col items-center gap-y-1">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col">
        <Separator />
        <p className="text-sm text-muted-foreground mt-4">
          {footerLabel}{" "}
          <Link
            href={href}
            className="underline text-primary"
            prefetch={false}
          >
            {linkLabel}
          </Link>{" "}
          {isForPass && (
            <>
              or{" "}
              <Link
                href={"/auth/forgot-password"}
                prefetch={false}
                className="underline text-primary"
              >
                Reset Password
              </Link>
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthCard;
