import { auth } from "@/firebase/server";
import { sessionCookie } from "@/lib/const";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(sessionCookie);
  if (!cookie) {
    return NextResponse.json({
      status: "error",
      message: "User not signed in."
    });
  }

  // Verify the session cookie and decode its contents
  const decodedIdToken = await auth.verifySessionCookie(cookie.value, true);
  if (!decodedIdToken) {
    cookieStore.set(sessionCookie, "", {
      maxAge: 0,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return NextResponse.json({
      status: "error",
      message: "User not signed in."
    });
  }

  const userId = decodedIdToken.uid;

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
