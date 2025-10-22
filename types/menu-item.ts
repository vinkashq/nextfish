import { SubMenuItem } from "./sub-menu-item";
import { type LucideIcon } from "lucide-react"

export interface MenuItem extends SubMenuItem {
  icon?: LucideIcon,
  isActive?: boolean,
  items?: SubMenuItem[],
}
