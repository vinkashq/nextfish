"use client";

import { useCurrentUser } from "@/firebase/client/auth";
import { useFirebase } from "@/firebase/client";
import SignInButton from "./sign-in-button";
import HeaderUserMenu from "./user-menu";
import { useSidebar } from "../ui/sidebar";

export default function HeaderAccountMenu() {
  useFirebase()
  const { isMobile } = useSidebar()
  const { isLoading, user } = useCurrentUser()

  if (!isMobile || isLoading) return null
  if (user) return <HeaderUserMenu user={user} />

  return <SignInButton />
}
