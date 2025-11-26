'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Model, ModelType } from '@/types/ai/chat';
import { DataTableActionsMenu } from '@/components/data-table';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { modelTypeIcons } from '@/config/ai';

interface ColumnsProps {
  onEdit: (chatbot: Model) => void;
  onDelete: (chatbot: Model) => void;
}

export const columns = ({
  onEdit,
  onDelete,
}: ColumnsProps): ColumnDef<Model>[] => [
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => {
        const type = row.original.type;
        const Icon = modelTypeIcons[type]
        return <Icon className="w-4 h-4" />
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'provider',
      header: 'Provider',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const chatbot = row.original;

        return (
          <DataTableActionsMenu>
            <DropdownMenuItem onClick={() => onEdit(chatbot)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(chatbot)}
              className="text-red-600 focus:text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DataTableActionsMenu>
        );
      },
    },
  ];
