import { TableCell, TableRow } from "@/components/ui/table";
import { Send, SquareMinus } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

import { type ZodTypeAny, z } from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";

type form = UseFormReturn<Record<string, unknown>, unknown, undefined>;

interface CreateTaskFormProps {
  setIsAdding: Dispatch<SetStateAction<boolean>>;
  form: form;
  columnValues: {
    id: string | undefined;
    default: string | undefined;
    validation: ZodTypeAny | undefined;
  }[];
}

export default function CreateTaskForm({
  setIsAdding,
  form,
  columnValues,
}: CreateTaskFormProps) {
  return (
    <TableRow className="bg-accent">
      {columnValues.map(({ id }, index) => {
        if (id === "select") {
          return (
            <TableCell
              className="sticky left-0 top-0 z-[1] bg-accent pl-[15px] pr-0"
              key={index}
            >
              <SquareMinus
                onClick={() => setIsAdding(false)}
                size={20}
                className="cursor-pointer text-red-400 transition-colors hover:text-[#ff8674]"
              />
            </TableCell>
          );
        }
        if (id === "actions") {
          return (
            <TableCell
              className="sticky right-0 z-[1] border-l border-r-0 bg-accent"
              key={index}
            >
              <button type="submit">
                <Send
                  className="absolute bottom-[21px] right-[17px] cursor-pointer text-green-400 transition-colors hover:text-green-500"
                  size={20}
                />
              </button>
            </TableCell>
          );
        }
        if (id) {
          return (
            <TableCell key={index}>
              <FormField
                control={form.control}
                name={id}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-8 border-border"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TableCell>
          );
        }
        return <TableCell key={index}>Na</TableCell>;
      })}
    </TableRow>
  );
}
