"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { priorities, statuses } from "./data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { api } from "@/trpc/react";

interface WithId {
  id: string;
}

interface DataTableToolbarProps<TData extends WithId> {
  table: Table<TData>;
}

export function DataTableToolbar<TData extends WithId>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("task")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("task")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] border-border lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="outline"
            onClick={() => table.resetColumnFilters()}
            className="h-8 border-0 px-2 outline-dashed outline-1 outline-border hover:outline-primary lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        {/* TODO: Add delete button if there are selected rows */}
        {/* {table.getFilteredSelectedRowModel().rows.length} */}
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <DeleteDalog table={table} />
        )}
      </div>
    </div>
  );
}

const DeleteDalog = <TData extends WithId>({
  table,
}: DataTableToolbarProps<TData>) => {
  const { mutate: deleteTodos } = api.todo.deleteTodos.useMutation({
    onSuccess: () => {
      table.getFilteredSelectedRowModel().rows.forEach((row) => {
        console.log(row.original.id);
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-8 border-0 px-2 outline-dashed outline-1 outline-border transition-all hover:text-destructive hover:outline-destructive lg:px-3"
        >
          <Cross2Icon className="mr-1 h-4 w-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            selected tasks.
          </DialogDescription>
          <DialogFooter>
            <Button
              onClick={() => {
                const todosIds = table
                  .getFilteredSelectedRowModel()
                  .rows.map((row) => row.original.id);

                deleteTodos({ ids: todosIds });
              }}
              variant="outlineDestructive"
              type="submit"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
