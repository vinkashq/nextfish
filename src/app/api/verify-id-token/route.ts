import { auth } from "@/firebase/server";
import { sessionCookie } from "@/lib/const";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const {idToken} = await request.json();
  if (!idToken) {
    return NextResponse.json({
      status: 400,
      message: "ID token is required."
    });
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    if (!decodedToken) {
      return NextResponse.json({
        status: 401,
        message: "Invalid ID token."
      });
    }

    const {uid} = decodedToken;
    const user = await auth.getUser(uid);
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found."
      });
    } else if (user.email && !user.emailVerified) {
      return NextResponse.json({
        status: 403,
        message: "Email not verified."
      });
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const cookie = await auth.createSessionCookie(idToken, {expiresIn});

    cookieStore.set(sessionCookie, cookie, {
      maxAge: expiresIn,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return NextResponse.json({
      status: "success",
      message: "ID token verified successfully.",
      user: {
        uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
    });
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal server error."
    })
  }
}
