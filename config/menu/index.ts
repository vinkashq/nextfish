import { Menu } from "@/types/menu"
import { Home } from "lucide-react"

export const defaultMenu: Menu = {
  title: "Platform",
  items: [{
    title: "Home",
    url: "/",
    icon: Home,
  }]
}

export const menus: Menu[] = [defaultMenu]