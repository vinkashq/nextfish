import { Menu } from "@/types/menu"
import { Image, LayoutDashboard, Users, MessageSquare } from "lucide-react"

export const defaultMenu: Menu = {
  title: "General",
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

const aiMenu: Menu = {
  title: "AI",
  baseUrl: "/admin/ai",
  items: [
    {
      title: "Chat",
      url: "/chat",
      icon: MessageSquare,
    }
  ]
}

export const menus: Menu[] = [
  defaultMenu,
  aiMenu,
]
