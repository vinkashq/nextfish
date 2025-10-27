"use client"

import SidebarNav from "@/components/sidebar/nav"
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
import { menus } from "@/config/menu"
import Logomark from "./logomark"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import SidebarAccountMenu from "./sidebar/account-menu"
import { ComponentProps } from "react"
import Link from "next/link"

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
              <div className="flex justify-between w-full group-data-[collapsible=icon]:flex-col  group-data-[collapsible=icon]:h-22!">
                <Link href="/">
                  <Logomark className="!size-8" background="default" />
                </Link>
                <SidebarTrigger className="size-9 text-muted-foreground" mobileIcon="X" />
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
                  <SidebarNav items={menu.items} />
                )}
                {menus.length > 1 && (
                  <>
                    <AccordionTrigger className="py-1">
                      <SidebarGroupLabel className="h-4">
                        {menu.title}
                      </SidebarGroupLabel>
                    </AccordionTrigger>
                    <AccordionContent asChild>
                      <SidebarNav items={menu.items} />
                    </AccordionContent>
                  </>
                )}
              </SidebarGroup>
            </AccordionItem>
          ))}
        </Accordion>
      </SidebarContent>
      <SidebarFooter>
        <SidebarAccountMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
