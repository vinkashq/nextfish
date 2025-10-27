"use client"

import Link from "next/link";
import { Button } from "../ui/button";

export default function HeaderGuestMenu() {
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
