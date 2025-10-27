"use client";

import { useCurrentUser } from "@/firebase/client/auth";
import SidebarGuestMenu from "./guest-menu";
import SidebarUserMenu from "./user-menu";
import { useFirebase } from "@/firebase/client";

export default function SidebarAccountMenu() {
  useFirebase()
  const { isLoading, user } = useCurrentUser()

  if (isLoading) return null
  if (user) return <SidebarUserMenu user={user} />

  return <SidebarGuestMenu />
}
