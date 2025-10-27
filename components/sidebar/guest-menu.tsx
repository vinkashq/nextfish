"use client";

import Link from "next/link";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Button } from "../ui/button";

export default function SidebarGuestMenu() {
  return (
    <SidebarMenu className="group-data-[collapsible=icon]:hidden">
      <SidebarMenuItem>
        <SidebarMenuButton size="sm" asChild>
          <Button variant="outline" asChild>
            <Link href="/signup">Create an account</Link>
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem className="flex gap-1 my-2 text-xs">
        <span className="">Are you an existing user?</span>
        <Link href="/login">Sign in</Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
