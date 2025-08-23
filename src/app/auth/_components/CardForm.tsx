"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface AuthFormProp {
  title: string;
  description: string;
  children: React.ReactNode;
  backButtonTitle: string;
  backButtonUrl: string;
  backButtonLabel: string;
  className: string;
}

const CardForm = ({
  title,
  description,
  children,
  backButtonTitle,
  backButtonUrl,
  backButtonLabel,
  className,
}: AuthFormProp) => {
  return (
    <div className="">
      <Card className={className}>
        <CardHeader>
          <CardTitle className="font-bold tracking-tight text-2xl">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground">
            {backButtonTitle}
            <Link
              href={backButtonUrl}
              className="font-semibold hover:underline ml-2"
            >
              {backButtonLabel}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardForm;
