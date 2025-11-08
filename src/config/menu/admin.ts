import { Menu } from "@/types/menu"
import { Image, LayoutDashboard, Users, MessageSquare } from "lucide-react"

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
    },
    {
      title: "AI Chat",
      url: "/ai/chat",
      icon: MessageSquare,
    }
  ]
}

export const menus: Menu[] = [
  defaultMenu,
]
