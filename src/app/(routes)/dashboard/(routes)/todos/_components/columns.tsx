"use client";

import "@tanstack/react-table";

import type { Todo } from "@/lib/definitions";
import { Bolt, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DataTableColumnHeader } from "./data-table-column-header";
import { statuses } from "./data";
import type { ColumnDef, RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
  }
}

export const columns: ColumnDef<Todo, unknown>[] = [
  {
    id: "select",
    size: 50,
    enableResizing: false,
    meta: {
      className: "sticky z-[1] left-0 bg-background",
    },
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value);
          if (value === false) {
            table.toggleAllRowsSelected(!!value);
          }
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "task",

    accessorKey: "task",
    header: "Task",
  },
  {
    id: "project",

    accessorKey: "project.name",
    header: "Project",
  },
  {
    id: "description",
    size: 300,
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "priority",

    accessorKey: "priority",
    header: "Priority",
  },
  {
    id: "status",

    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "due",
    meta: {
      className: "border-r-0",
    },
    size: 130,
    accessorKey: "due",
    header: "Due date",
    cell: ({ row }) => {
      const { due } = row.original;
      if (due) {
        return new Date(due).toLocaleDateString();
      }
    },
  },
  {
    id: "actions",
    meta: {
      className: "sticky border-l z-[1] border-r-0 right-0 bg-background",
    },
    size: 53,
    enableResizing: false,
    header: () => <Bolt className="absolute bottom-[14px] right-4" size={20} />,
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="" asChild>
            <Button
              className="absolute bottom-[18px] right-5 block h-4 w-4 rounded-none"
              size="icon"
              variant="ghost"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
