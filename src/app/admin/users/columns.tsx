"use client"

import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/types"
import Link from "next/link"
import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { InputCopyable } from "@/components/ui/input-copyable"
import { DataTableActionsMenu } from "@/components/data-table"

export const columns = (): ColumnDef<User>[] => [
  {
    accessorKey: "displayName",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "uid",
    header: "UID",
    cell: ({ row }) => {
      const user = row.original

      return (
        <InputCopyable value={user.uid} className="w-48 border-none shadow-none" />
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

      return (
        <DataTableActionsMenu>
          <DropdownMenuItem asChild>
            <Link href={`/admin/users/${user.uid}`}>View</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/admin/users/${user.uid}/edit`}>Edit</Link>
          </DropdownMenuItem>
        </DataTableActionsMenu>
      )
    },
  },
]
