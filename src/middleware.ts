import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

interface UserPayload {
  id: string;
  email: string;
  role: string;
}

function isUserPayload(payload: unknown): payload is UserPayload {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "id" in payload &&
    "email" in payload &&
    "role" in payload &&
    typeof (payload as any).id === "string" &&
    typeof (payload as any).email === "string" &&
    typeof (payload as any).role === "string"
  );
}

const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_SECRET_KEY || ""
);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);

    if (!isUserPayload(payload)) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const response = NextResponse.next();
    response.headers.set("x-user-data", JSON.stringify(payload));
    return response;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/v1/auth/me", "/api/v1/users/:path*"],
};
