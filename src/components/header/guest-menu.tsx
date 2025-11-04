"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";

export default function HeaderGuestMenu() {
  return (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" asChild>
        <Link
          href="/auth/login"
          >
          Sign in
        </Link>
      </Button>
      <Button size="sm" className="hidden lg:flex" asChild>
        <Link
          href="/auth/signup"
          >
          Create Account
        </Link>
      </Button>
    </div>
  )
}
