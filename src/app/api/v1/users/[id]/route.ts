import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userData = req.headers.get("x-user-data");
  const { id } = params;
  console.log(id);

  if (!id) {
    return NextResponse.json({ message: "Id is not found" }, { status: 404 });
  }

  if (!userData) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = JSON.parse(userData);

  if (user?.role !== "ADMIN") {
    return NextResponse.json(
      { message: "You are not an Admin user" },
      { status: 404 }
    );
  }

  const userDetails = await db.user.findUnique({
    where: {
      id,
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

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userData = req.headers.get("x-user-data");
  const body = await req.json();
  const { id } = params;
  console.log(id);

  if (!id) {
    return NextResponse.json({ message: "Id is not found" }, { status: 404 });
  }

  if (!userData) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = JSON.parse(userData);

  const userDetails = await db.user.update({
    data: { ...body },
    where: {
      id,
    },
  });

  return NextResponse.json({
    message: "User authenticated",
    userDetails,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userData = req.headers.get("x-user-data");
  const { id } = params;
  console.log(id);

  if (!id) {
    return NextResponse.json({ message: "Id is not found" }, { status: 404 });
  }

  if (!userData) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = JSON.parse(userData);

  const userDetails = await db.user.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    message: "User Deleted successfully",
    userDetails,
  });
}
