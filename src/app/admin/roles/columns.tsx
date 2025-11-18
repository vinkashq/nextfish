"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Role } from "@/types"
import { DataTableActionsMenu } from "@/components/data-table"
import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export const columns = (
  onEdit: (role: Role) => void,
  onDelete: (role: Role) => void
): ColumnDef<Role>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string
      return (
        <div className="max-w-[300px] truncate">
          {description || <span className="text-muted-foreground">No description</span>}
        </div>
      )
    },
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ row }) => {
      const permissions = row.getValue("permissions") as string[]
      return (
        <div className="max-w-[200px]">
          {permissions && permissions.length > 0 ? (
            <span className="text-sm">{permissions.length} permission{permissions.length !== 1 ? 's' : ''}</span>
          ) : (
            <span className="text-muted-foreground text-sm">No permissions</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as Date | undefined
      return date ? (
        <span className="text-sm text-muted-foreground">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ) : (
        <span className="text-muted-foreground text-sm">—</span>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const role = row.original

      return (
        <DataTableActionsMenu>
          <DropdownMenuItem onClick={() => onEdit(role)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete(role)}
            className="text-destructive"
          >
            Delete
          </DropdownMenuItem>
        </DataTableActionsMenu>
      )
    },
  },
]

