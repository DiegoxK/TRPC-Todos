"use client";

import type { Todo } from "@/lib/definitions";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "done",
    header: "Done",
  },
];
