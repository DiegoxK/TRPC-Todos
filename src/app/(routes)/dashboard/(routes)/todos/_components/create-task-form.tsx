"use client";

import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { Send, SquareMinus } from "lucide-react";

interface CreateTaskFormProps {
  columnIds: (string | undefined)[];
}

export default function CreateTaskForm({ columnIds }: CreateTaskFormProps) {
  return (
    <TableRow className="bg-accent">
      {columnIds.map((columnId, index) => {
        if (columnId === "select") {
          return (
            <TableCell className="pl-[15px] pr-0" key={index}>
              <SquareMinus
                size={20}
                className="cursor-pointer text-accent-foreground transition-colors hover:text-destructive"
              />
            </TableCell>
          );
        }
        if (columnId === "actions") {
          return (
            <TableCell key={index}>
              <Send
                className="ml-2 cursor-pointer text-accent-foreground transition-colors hover:text-green-500"
                size={19}
              />
            </TableCell>
          );
        }
        return (
          <TableCell key={index}>
            <Input
              className="h-8 border-border"
              type="text"
              // placeholder={columnId}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
}
