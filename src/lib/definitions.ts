import type { ColumnDef } from "@tanstack/react-table";
import { type todos } from "@/server/db/schema";

// type user = typeof users.$inferSelect;

export type Todo = typeof todos.$inferSelect;

export type TodoColumnName = keyof Todo;

export type CustomColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
  headClassName?: string;
  accessorKey?: string;
};
