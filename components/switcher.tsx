"use client"

import { ChevronsUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { appName } from "@/lib/const"
import Logomark from "./logomark"
import { useState } from "react"

type Section = {
  name: string,
  logomark: any
}

const sections = [
  {
    name: "App",
    logomark: Logomark,
  },
  {
    name: "Admin",
    logomark: Logomark,
  },
]

export function Switcher() {
  const { isMobile } = useSidebar()
  const [activeSection, setActiveSection] = useState<Section>(sections[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="border bg-background text-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Logomark className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{appName}</span>
                <span className="truncate text-xs">{activeSection.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Sections
            </DropdownMenuLabel>
            {sections.map((section, index) => (
              <DropdownMenuItem
                key={section.name}
                onClick={() => setActiveSection(section)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <section.logomark className="size-3 shrink-0" />
                </div>
                {section.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
