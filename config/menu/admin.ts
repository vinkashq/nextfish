import { Menu } from "@/types/menu"
import { LayoutDashboard } from "lucide-react"

export const defaultMenu: Menu = {
  title: "Admin Console",
  items: [{
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  }]
}

export const menus: Menu[] = [defaultMenu]
