"use client";

import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { SquareMinus } from "lucide-react";

interface CreateTaskFormProps {
  columnIds: (string | undefined)[];
}

export default function CreateTaskForm({ columnIds }: CreateTaskFormProps) {
  return (
    <TableRow>
      {columnIds.map((columnId, index) => {
        if (columnId === "select") {
          return (
            <TableCell className="pl-[15px] pr-0" key={index}>
              <SquareMinus
                size={19}
                className="cursor-pointer text-destructive hover:text-red-500"
              />
            </TableCell>
          );
        }
        if (columnId === "actions") {
          return <TableCell key={index}>a</TableCell>;
        }
        return (
          <TableCell key={index}>
            <Input
              className="h-8 w-52 border-border"
              type="text"
              // placeholder={columnId}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
}
