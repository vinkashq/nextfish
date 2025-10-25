import Link from "next/link";
import { Button } from "./ui/button";

export default function SignInButton() {
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