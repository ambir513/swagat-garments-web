// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = [
    "/dashboard",
    "/account",
    "/admin",
    "/api/protected",
  ];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const { isUserExist }: any = await jwt.verify(token, SECRET_KEY);
      const userDetails = isUserExist as UserPayload;
      if (isUserExist) {
        const response = NextResponse.next();

        // Add user details to request headers for downstream use
        response.headers.set("x-user-id", isUserExist?.id);
        response.headers.set("x-user-email", isUserExist.email);
        response.headers.set("x-user-role", isUserExist.role);
        response.headers.set("x-user-name", isUserExist.name);

        // You can also pass the entire user object as JSON
        response.headers.set("x-user-data", JSON.stringify(isUserExist));

        return response;
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("authToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/api/protected/:path*",
  ],
};
