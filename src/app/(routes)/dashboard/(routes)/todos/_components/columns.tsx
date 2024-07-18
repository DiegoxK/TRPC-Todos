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

type SelectionInput = string[] | Query;

export type InputTypes =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | SelectionInput;

export type CustomMeta = {
  inputType: InputTypes;
  formHeader: string;
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
      formHeader: "Task",
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
      formHeader: "Project",
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
      formHeader: "Description",
      defaultValue: "",
      optional: true,
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
      formHeader: "Due date",
      defaultValue: undefined,
      optional: true,
      inputType: "date",
    },
    size: 200,
    minSize: 200,
    accessorKey: "due",
    sortingFn: "datetime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due date" />
    ),
    cell: ({ row }) => {
      const { due } = row.original;
      if (due) {
        return format(due, "PPP");
      }
    },
  },

  {
    id: "status",
    meta: {
      formHeader: "Status",
      defaultValue: "TODO",
      inputType: [...STATUSES],
    },
    minSize: 130,
    accessorKey: "status",
    // IN_PROGRESS > TODO > DONE
    sortingFn: (rowA, rowB) => {
      const statusOrder = { DONE: 2, TODO: 1, IN_PROGRESS: 0 };
      return (
        statusOrder[rowB.original.status] - statusOrder[rowA.original.status]
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },

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
  },
  {
    id: "priority",
    meta: {
      formHeader: "Priority",
      className: "border-r-0",
      defaultValue: "MEDIUM",
      inputType: [...PRIORITIES],
    },
    minSize: 150,
    accessorKey: "priority",
    // HIGH > MEDIUM > LOW
    sortingFn: (rowA, rowB) => {
      const priorityOrder = { LOW: 2, MEDIUM: 1, HIGH: 0 };
      return (
        priorityOrder[rowB.original.priority] -
        priorityOrder[rowA.original.priority]
      );
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
  },
];
