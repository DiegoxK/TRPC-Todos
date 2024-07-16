"use client";

import {
  type SortingState,
  type ColumnFiltersState,
  type ColumnSizingState,
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";

import { type FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";

import { useState } from "react";
import { DataTableToolbar } from "./data-table-toolbar";

import CreateTaskForm from "./create-task-form";
import { DataTableResizer } from "./data-table-resizer";
import { cn } from "@/lib/utils";
import type { Todo } from "@/lib/definitions";
import { Form } from "@/components/ui/form";
import DataTableDialog from "./data-table-dialog";
import { useRouter } from "next/navigation";
import { type CustomMeta } from "./columns";
import { api } from "@/trpc/react";

import {
  type TodoValidationSchema,
  todoValidationSchema,
  type ValidationKeys,
} from "./data";
import { Checkbox } from "@/components/ui/checkbox";
import { Bolt } from "lucide-react";
import TableActions from "./table-actions";
import CreateTaskErrors from "./create-task-errors";
import EditTaskForm from "./edit-task-form";

interface DataTableProps<TData extends Todo, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export interface ColumnValues extends CustomMeta {
  id: ValidationKeys;
}

export function DataTable<TData extends Todo, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [todo, setTodo] = useState<Todo>();
  const [errors, setErrors] = useState<FieldErrors<TodoValidationSchema>>();
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

  const router = useRouter();

  const { mutate: createTodo } = api.todo.createTodo.useMutation({
    onSuccess: () => {
      setIsAdding(false);
      dismissForm();
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnSizing,
      columnFilters,
      rowSelection,
    },
  });

  const columnValues: ColumnValues[] = columns.map((column) => {
    if (!column.meta)
      throw new Error(`Column ${column.id} is missing meta property`);

    return {
      id: column.id as ValidationKeys,
      defaultValue: column.meta.defaultValue,
      inputType: column.meta.inputType,
      optional: column.meta?.optional,
    };
  });

  const defaultValues = columnValues.reduce<TodoValidationSchema>(
    (acc, { id, defaultValue }) => {
      // @ts-expect-error - String is not assignable to type 'never'
      acc[id] = defaultValue;
      return acc;
    },
    {} as TodoValidationSchema,
  );

  const form = useForm<TodoValidationSchema>({
    resolver: zodResolver(todoValidationSchema),
    defaultValues,
  });

  const dismissForm = () => {
    form.reset();
  };

  function onSubmit(values: TodoValidationSchema) {
    createTodo(values);
  }

  function onSubmitError(errors: FieldErrors<TodoValidationSchema>) {
    setIsDialogOpen(true);
    setErrors(errors);
  }

  return (
    <>
      <DataTableDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        setErrors={setErrors}
        setTodo={setTodo}
      >
        {errors ? (
          <CreateTaskErrors errors={errors} />
        ) : todo ? (
          <EditTaskForm todo={todo} />
        ) : null}
      </DataTableDialog>
      <div className="space-y-4">
        <DataTableToolbar
          dismissForm={dismissForm}
          table={table}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
        />
        <div className="border bg-background">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onSubmitError)}>
              <Table
                className="table-fixed border-separate border-spacing-0"
                style={{ minWidth: table.getTotalSize() }}
              >
                <TableHeader className="sticky top-0 z-[2] bg-background">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      <TableHead
                        className="sticky left-0 top-0 z-[1] bg-background"
                        style={{
                          width: 50,
                        }}
                      >
                        <Checkbox
                          checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() &&
                              "indeterminate")
                          }
                          onCheckedChange={(value) => {
                            table.toggleAllPageRowsSelected(!!value);
                            if (value === false) {
                              table.toggleAllRowsSelected(!!value);
                            }
                          }}
                          aria-label="Select all"
                        />
                      </TableHead>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            className={cn(
                              "relative",
                              header.column.columnDef.meta?.className,
                            )}
                            key={header.id}
                            style={{
                              width: header.getSize(),
                            }}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                            <DataTableResizer header={header} />
                          </TableHead>
                        );
                      })}
                      <TableHead
                        className="sticky right-0 z-[1] border-l border-r-0 bg-background"
                        style={{
                          width: 53,
                        }}
                      >
                        <Bolt
                          className="absolute bottom-[14px] right-4"
                          size={20}
                        />
                      </TableHead>
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {isAdding && (
                    <CreateTaskForm
                      dismissForm={dismissForm}
                      form={form}
                      columnValues={columnValues}
                      setIsAdding={setIsAdding}
                    />
                  )}
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        <TableCell className="sticky left-0 top-0 z-[1] bg-background">
                          <Checkbox
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) =>
                              row.toggleSelected(!!value)
                            }
                            aria-label="Select row"
                          />
                        </TableCell>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            className={cn(
                              "truncate",
                              cell.column.columnDef.meta?.className,
                            )}
                            key={cell.id}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                        <TableCell className="sticky right-0 z-[1] border-l border-r-0 bg-background">
                          <TableActions
                            todo={row.original}
                            setTodo={setTodo}
                            setIsDialogOpen={setIsDialogOpen}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </form>
          </Form>
        </div>
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
