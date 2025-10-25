"use client"

import NavMenu from "@/components/nav-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { appName, menus } from "@/lib/const"
import Logomark from "./logomark"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import AccountMenu from "./account-menu"
import { ComponentProps } from "react"
import { X } from "lucide-react"

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="my-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="group-data-[collapsible=icon]:p-1! hover:bg-transparent"
              asChild
            >
              <div className="flex justify-between w-full">
                <a href="#" className="flex gap-2">
                  <Logomark className="!size-6" />
                  <span className="text-2xl font-semibold leading-none">{appName}</span>
                </a>
                <SidebarTrigger className="size-9" mobileIcon="X" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <Accordion type="single" collapsible defaultValue="0">
          {menus.map((menu, index) => (
            <AccordionItem key={index} value={index.toString()}>
              <SidebarGroup>
                {menus.length === 1 && (
                  <NavMenu items={menu.items} />
                )}
                {menus.length > 1 && (
                  <>
                    <AccordionTrigger className="py-1">
                      <SidebarGroupLabel className="h-4">
                        {menu.title}
                      </SidebarGroupLabel>
                    </AccordionTrigger>
                    <AccordionContent asChild>
                      <NavMenu items={menu.items} />
                    </AccordionContent>
                  </>
                )}
              </SidebarGroup>
            </AccordionItem>
          ))}
        </Accordion>
      </SidebarContent>
      <SidebarFooter>
        <AccountMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
