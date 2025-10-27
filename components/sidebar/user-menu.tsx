"use client"

import {
  ChevronsUpDown,
} from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { User } from "firebase/auth"
import UserAvatar from "../user/avatar"
import UserDropdownMenu from "../user/dropdown-menu"

export default function SidebarUserMenu({
  user,
}: {
  user: User
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserDropdownMenu user={user}>
          <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
            <UserAvatar user={user} />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.displayName}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </SidebarMenuButton>
        </UserDropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
