"use client";

import { useCurrentUser } from "@/firebase/client/auth";
import SidebarGuestMenu from "./guest-menu";
import SidebarUserMenu from "./user-menu";
import { useFirebase } from "@/firebase/client";
import { useSidebar } from "../ui/sidebar";

export default function SidebarAccountMenu() {
  useFirebase()
  const { isMobile } = useSidebar()
  const { isLoading, user } = useCurrentUser()

  if (isMobile || isLoading) return null
  if (user) return <SidebarUserMenu user={user} />

  return <SidebarGuestMenu />
}
