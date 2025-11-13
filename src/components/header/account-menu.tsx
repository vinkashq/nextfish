"use client";

import { useCurrentUser } from "@/context/CurrentUserContext";
import HeaderGuestMenu from "./guest-menu";
import HeaderUserMenu from "./user-menu";

export default function HeaderAccountMenu() {
  const { isLoading, currentUser } = useCurrentUser()

  if (isLoading) return null
  if (currentUser) return <HeaderUserMenu user={currentUser} />

  return <HeaderGuestMenu />
}
