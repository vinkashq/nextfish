import { Menu } from "@/types/menu"
import { LayoutDashboard, Users } from "lucide-react"

export const defaultMenu: Menu = {
  title: "Admin Console",
  baseUrl: "/admin",
  items: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    }, {
      title: "Users",
      url: "/users/",
      icon: Users,
    },
  ]
}

export const menus: Menu[] = [
  defaultMenu,
]
