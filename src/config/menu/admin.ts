import { Menu } from "@/types/menu"
import { Image, LayoutDashboard, Users } from "lucide-react"

export const defaultMenu: Menu = {
  title: "Admin Console",
  baseUrl: "/admin",
  items: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      url: "/users/",
      icon: Users,
    },
    {
      title: "Images",
      url: "/images/",
      icon: Image,
    }
  ]
}

export const menus: Menu[] = [
  defaultMenu,
]
