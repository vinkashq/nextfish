"use client"

import {
  SidebarMenu,
} from "@/components/ui/sidebar"
import { MenuItem } from "@/types/menu-item"
import SidebarNavItem from "./nav-item"

export default function SidebarNav({
  items,
}: {
  items: MenuItem[]
}) {
  return (
    <SidebarMenu className="mt-2">
      {items.map((item) => (
        <SidebarNavItem
          key={item.title}
          item={item}
          />
      ))}
    </SidebarMenu>
  )
}
