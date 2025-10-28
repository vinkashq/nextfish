"use client"

import Link from "next/link";
import { Button } from "../ui/button";

export default function HeaderGuestMenu() {
  return (
    <Button size="sm" asChild>
      <Link
        href="/login"
        >
        Sign in
      </Link>
    </Button>
  )
}
