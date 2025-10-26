"use client";

import { useCurrentUser } from "@/firebase/client/auth";
import GuestMenu from "./guest-menu";
import UserMenu from "./user-menu";
import { useFirebase } from "@/firebase/client";

export default function AccountMenu() {
  useFirebase()
  const { isLoading, user } = useCurrentUser()

  if (isLoading) return null
  if (user) return <UserMenu user={user} />

  return <GuestMenu />
}
