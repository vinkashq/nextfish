import Link from "./link";
import { type LucideIcon } from "lucide-react"

export interface MenuItem extends Link {
  icon?: LucideIcon,
  isActive?: boolean,
  items?: Link[],
}
