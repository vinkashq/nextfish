"use client"

import {
  SidebarMenu,
} from "@/components/ui/sidebar"
import { MenuItem } from "@/types/menu-item"
import SidebarNavItem from "./nav-item"

export default function SidebarNav({
  baseUrl,
  items,
}: {
  baseUrl: string,
  items: MenuItem[]
}) {
  return (
    <SidebarMenu className="mt-2">
      {items.map((item) => (
        <SidebarNavItem
          baseUrl={baseUrl}
          key={item.title}
          item={item}
          />
      ))}
    </SidebarMenu>
  )
}
