"use client";

import SidebarGuestMenu from "./guest-menu";
import SidebarUserMenu from "./user-menu";
import { useSidebar } from "../ui/sidebar";
import { useCurrentUser } from "@/context/CurrentUserContext";

export default function SidebarAccountMenu() {
  const { isMobile } = useSidebar()
  const { isLoading, currentUser } = useCurrentUser()

  if (isMobile || isLoading) return null
  if (currentUser) return <SidebarUserMenu user={currentUser} />

  return <SidebarGuestMenu />
}
