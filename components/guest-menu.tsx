"use client";

import Link from "next/link";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Button } from "./ui/button";

export default function GuestMenu() {
  return (
    <SidebarMenu className="group-data-[collapsible=icon]:hidden">
      <SidebarMenuItem>
        <SidebarMenuButton size="sm" asChild>
          <Button variant="outline" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem className="flex gap-1 my-2 text-xs">
        <span className="">Are you a new user?</span>
        <Link href="/signup">Create an account</Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
