import { Menu } from "@/types/menu"
import { Home } from "lucide-react"

export const defaultMenu: Menu = {
  title: "Admin Console",
  items: [{
    title: "Dashboard",
    url: "/",
    icon: Home,
  }]
}

export const menus: Menu[] = [defaultMenu]
