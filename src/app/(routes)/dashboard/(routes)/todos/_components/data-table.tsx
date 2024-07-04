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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ZodTypeAny, z } from "zod";

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

interface DataTableProps<TData extends Todo, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

type Schema = Record<string, ZodTypeAny>;
type DefaultValues = Record<string, string>;

export function DataTable<TData extends Todo, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

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

  const columnValues = columns.map((column) => {
    return {
      id: column.id,
      default: column.meta?.default,
      validation: column.meta?.validation,
      inputType: column.meta?.inputType,
    };
  });

  const schema = columnValues.reduce<Schema>((acc, { id, validation }) => {
    if (id && validation) {
      acc[id] = validation;
    }
    return acc;
  }, {});

  const defaultValues = columnValues.reduce<DefaultValues>(
    (acc, { id, default: defaultValue }) => {
      if (id) {
        acc[id] = defaultValue ?? "";
      }
      return acc;
    },
    {},
  );

  const formSchema = z.object(schema);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const dismissForm = () => {
    form.reset();
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="space-y-4">
      <DataTableToolbar
        dismissForm={dismissForm}
        table={table}
        isAdding={isAdding}
        setIsAdding={setIsAdding}
      />
      <div className="border bg-background">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Table
              className="table-fixed border-separate border-spacing-0"
              style={{ minWidth: table.getTotalSize() }}
            >
              <TableHeader className="sticky top-0 z-[2] bg-background">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
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
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isAdding && (
                  <CreateTaskForm
                    dismissForm={dismissForm}
                    form={form}
                    setIsAdding={setIsAdding}
                    columnValues={columnValues}
                  />
                )}
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
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
  );
}
