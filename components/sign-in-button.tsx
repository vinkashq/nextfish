"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { useFirebase } from "@/firebase/client";
import { useCurrentUser } from "@/firebase/client/auth";

export default function SignInButton() {
  useFirebase()
  const { isLoading, user } = useCurrentUser()

  if (isLoading || user) {
    return null
  }

  return (
    <Button asChild>
      <Link
        href="/login"
        type="outline"
        >
        Sign in
      </Link>
    </Button>
  )
}
