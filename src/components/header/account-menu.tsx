"use client";

import { useCurrentUser } from "@/firebase/client/auth";
import { useFirebase } from "@/firebase/client";
import HeaderGuestMenu from "./guest-menu";
import HeaderUserMenu from "./user-menu";
import { useSidebar } from "../ui/sidebar";

export default function HeaderAccountMenu() {
  useFirebase()
  const { isLoading, user } = useCurrentUser()

  if (isLoading) return null
  if (user) return <HeaderUserMenu user={user} />

  return <HeaderGuestMenu />
}
