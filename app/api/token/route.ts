import { auth } from "@/firebase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const userId = request.headers.get("x-user-id");

  if (!userId) {
    return NextResponse.json({
      status: "error",
      message: "User not authenticated.",
    });
  }

  const token = await auth.createCustomToken(userId);
  if (!token) {
    return NextResponse.json({
      status: "error",
      message: "Failed to create custom token.",
    });
  }

  return NextResponse.json({
    value: token,
  });
};
