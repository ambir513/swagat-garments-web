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

  // 1. Prevent logged-in users from visiting login page
  if (pathname === "/auth/login" || "/auth/signup") {
    if (token) {
      try {
        return NextResponse.redirect(new URL("/account", request.url));
      } catch {
        // ❌ invalid token → clear it and allow login page
        const res = NextResponse.next();
        res.cookies.delete("token");
        return res;
      }
    }
    // no token → allow login page
    return NextResponse.next();
  }

  // 2. Protect private routes
  const protectedRoutes = ["/dashboard", "/account", "/admin", "/api"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;

      const response = NextResponse.next();
      response.headers.set("x-user-id", decoded.id);
      response.headers.set("x-user-email", decoded.email);
      response.headers.set("x-user-role", decoded.role);
      response.headers.set("x-user-name", decoded.name);
      response.headers.set("x-user-data", JSON.stringify(decoded));

      return response;
    } catch {
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url)
      );
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

// 3. Matcher
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
    "/admin/:path*",
    "/api/protected/:path*",
    "/auth/:path*",
  ],
};
