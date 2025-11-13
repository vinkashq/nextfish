"use client";

import Link from "next/link";
import { privacyPolicyUrl, termsOfServiceUrl } from "@/config";
import GoogleSignInButton from "@/components/google-signin-button";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, User } from "firebase/auth";
import { clearInput, getInputValue } from "@/lib/utils";
import { toast } from "sonner";
import BreadcrumbHeading from "@/components/breadcrumb-heading";
import { useFirebase } from "@/context/firebase/Context";

export default function Page() {
  const { auth } = useFirebase();
  const [isDisabled, setIsDisabled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const createAccount = async (e: FormEvent<HTMLFormElement>) => {
    if (!auth) return;
    e.preventDefault()
    setIsDisabled(true)

    const email = getInputValue("email")
    const password = getInputValue("password")

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        clearInput("email")
        clearInput("password")
        const user = userCredential.user;
        setUser(user)

        sendEmailVerification(user)
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorCode + ' ' + errorMessage, {
              duration: Infinity,
            });
          })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode + ' ' + errorMessage, {
          duration: Infinity,
        });
      })
      .finally(() => {
        setIsDisabled(false);
      })
  }

  if (user) {
    return (
      <div className="grid gap-6">
        <p className="text-center text-sm text-green-700 dark:text-green-400">
          Your account created successfully! Please check your email at <span className="font-semibold">{user.email}</span> to verify your account.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <BreadcrumbHeading text="Sign up" />
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <form onSubmit={createAccount}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                required={true}
                disabled={isDisabled}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required={true}
                disabled={isDisabled}
              />
            </div>
            <Button disabled={isDisabled}>
              <Spinner variant="visibleOnDisabled" aria-disabled={isDisabled} />
              Create Account
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <GoogleSignInButton />
      </div>
      <p className="px-8 py-4 text-center text-sm text-muted-foreground"> {/* Added py-4 for spacing */}
        By clicking continue, you agree to our{" "}
        <Link
          href={termsOfServiceUrl}
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href={privacyPolicyUrl}
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
