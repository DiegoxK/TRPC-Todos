"use client";

import "@tanstack/react-table";

import type { Todo } from "@/lib/definitions";
import { format } from "date-fns";

import { DataTableColumnHeader } from "./data-table-column-header";
import { PRIORITIES, STATUSES, statuses } from "./data";
import type { ColumnDef, RowData } from "@tanstack/react-table";

import { api } from "@/trpc/react";
import type { ProcedureUseQuery } from "node_modules/@trpc/react-query/dist/createTRPCReact";

type ResolverDef = {
  input: void;
  output: {
    id: string;
    label: string;
  }[];
  transformer: true;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorShape: any;
};

export type Query = ProcedureUseQuery<ResolverDef>;

type InputTypes = "text" | "textarea" | "number" | "date";
type SelectionInput = string[] | Query;

export type CustomMeta = {
  inputType: InputTypes | SelectionInput;
  defaultValue?: string;
  className?: string;
  optional?: boolean;
};

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ColumnMeta<TData extends RowData, TValue> extends CustomMeta {}
}

const getProjectNames = api.project.getProjectNames.useQuery;

export const columns: ColumnDef<Todo>[] = [
  {
    id: "task",
    meta: {
      defaultValue: "",
      inputType: "text",
    },
    minSize: 70,
    accessorKey: "task",
    header: "Task",
  },
  {
    id: "projectId",
    meta: {
      defaultValue: "",
      inputType: getProjectNames,
    },
    minSize: 80,
    accessorKey: "project.name",
    header: "Project",
  },
  {
    id: "description",
    meta: {
      defaultValue: "",
      inputType: "textarea",
    },
    size: 660,
    minSize: 120,
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "due",
    meta: {
      defaultValue: undefined,
      optional: true,
      inputType: "date",
    },
    size: 200,
    minSize: 200,
    accessorKey: "due",
    header: "Due date",
    cell: ({ row }) => {
      const { due } = row.original;
      if (due) {
        return format(due, "PPP");
      }
    },
  },
  {
    id: "priority",
    meta: {
      defaultValue: "MEDIUM",
      inputType: [...PRIORITIES],
    },
    minSize: 150,
    accessorKey: "priority",
    header: "Priority",
  },
  {
    id: "status",
    meta: {
      className: "border-r-0",
      defaultValue: "TODO",
      inputType: [...STATUSES],
    },
    minSize: 130,
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
];
