import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userData = req.headers.get("x-user-data");

  if (!userData) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = JSON.parse(userData);

  const userDetails = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      id: true,
      role: true,
      name: true,
      email: true,
      avatar: true,
      addresses: {
        select: {
          id: true,
          addressNo1: true,
          addressNo2: true,
          phoneNo: true,
          landMark: true,
          city: true,
          state: true,
          country: true,
        },
      },
      cart: {
        select: {
          id: true,
          title: true,
          description: true,
          details: true,
          price: true,
          offer: true,
          size: true,
          image1: true,
          image2: true,
          image3: true,
          image4: true,
          brand: true,
        },
      },
      favorites: {
        select: {
          id: true,
          title: true,
          description: true,
          details: true,
          price: true,
          offer: true,
          size: true,
          image1: true,
          image2: true,
          image3: true,
          image4: true,
          brand: true,
        },
      },
      orders: {
        select: {
          id: true,
          orderNumber: true,
          status: true,
          amount: true,
          products: true,
          orderStatus: true,
        },
      },
    },
  });

  return NextResponse.json({
    message: "User authenticated",
    userDetails,
  });
}
