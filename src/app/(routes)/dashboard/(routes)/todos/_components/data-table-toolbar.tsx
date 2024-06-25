import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { priorities, statuses } from "./data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { api } from "@/trpc/react";
import { DiamondPlus, RotateCcw } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface WithId {
  id: string;
}

interface DataTableToolbarProps<TData extends WithId> {
  table: Table<TData>;
  isAdding: boolean;
  setIsAdding: Dispatch<SetStateAction<boolean>>;
}

export function DataTableToolbar<TData extends WithId>({
  table,
  isAdding,
  setIsAdding,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const isSorted = table.getState().sorting.length > 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
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
        {isSorted && (
          <Button
            variant="outline"
            onClick={() => {
              table.resetSorting();
            }}
            className="h-8 border-0 px-2 text-accent-foreground outline-dashed outline-1 outline-border hover:text-amber-300 hover:outline-amber-300 lg:px-3"
          >
            <RotateCcw size={15} className="mr-2" />
            Reset sorting
          </Button>
        )}
      </div>
      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <DeleteDalog table={table} />
      )}
      <AddTrigger
        onClick={() => {
          setIsAdding((prev) => !prev);
        }}
        isAdding={isAdding}
      />
    </div>
  );
}

interface AddTriggerProps {
  isAdding: boolean;
  onClick: () => void;
}

const AddTrigger = ({ isAdding, onClick }: AddTriggerProps) => {
  if (isAdding) {
    return (
      <Button
        variant="outline"
        className="h-8 border-0 px-2 text-accent-foreground outline-dashed outline-1 outline-border transition-all hover:text-pink-400 hover:outline-pink-400 lg:px-3"
        onClick={onClick}
      >
        <DiamondPlus className="mr-1 h-4 w-4" />
        Discard
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      className="h-8 border-0 px-2 text-accent-foreground outline-dashed outline-1 outline-border transition-all hover:text-green-400 hover:outline-green-400 lg:px-3"
      onClick={onClick}
    >
      <DiamondPlus className="mr-1 h-4 w-4" />
      Add Task
    </Button>
  );
};

interface DeleteDalogProps<TData extends WithId> {
  table: Table<TData>;
}

const DeleteDalog = <TData extends WithId>({
  table,
}: DeleteDalogProps<TData>) => {
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="h-8 border-0 px-2 text-accent-foreground outline-dashed outline-1 outline-border transition-all hover:text-destructive hover:outline-destructive lg:px-3"
        >
          <Cross2Icon className="mr-1 h-4 w-4" />
          Delete {table.getFilteredSelectedRowModel().rows.length} tasks
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            {table.getFilteredSelectedRowModel().rows.length} tasks.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                className="bg-background"
                onClick={() => {
                  const todosIds = table
                    .getFilteredSelectedRowModel()
                    .rows.map((row) => row.original.id);

                  deleteTodos({ ids: todosIds });
                }}
                variant="outlineDestructive"
                type="submit"
              >
                Delete tasks
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
