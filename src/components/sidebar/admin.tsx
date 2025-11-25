"use client"

import SidebarNav from "@/components/sidebar/nav"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { menus } from "@/config/menu/admin"
import { Cog } from "lucide-react"
import { ComponentProps } from "react"

export default function AdminSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="sticky top-(--header-height) h-[calc(100svh-var(--header-height))]!" collapsible="icon" {...props}>
      <SidebarContent className="mt-2">
        {menus.map((menu, index) => (
          <SidebarGroup key={index}>
            {menus.length === 1 && (
              <SidebarNav baseUrl={menu.baseUrl} items={menu.items} />
            )}
            {menus.length > 1 && (
              <>
                <SidebarGroupLabel className="h-4">
                  {menu.title}
                </SidebarGroupLabel>
                <SidebarNav baseUrl={menu.baseUrl} items={menu.items} />
              </>
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Cog />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Toggle Sidebar" asChild>
              <SidebarTrigger mobileIcon="X" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
