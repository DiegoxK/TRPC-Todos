import { TableCell, TableRow } from "@/components/ui/table";
import { Send, SquareMinus } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

import { FormField } from "@/components/ui/form";

import type { UseFormReturn } from "react-hook-form";
import { type CustomMeta } from "./columns";
import { InputCommand, InputDate, InputNumber, InputText } from "./input-types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Form = UseFormReturn<Record<string, any>, any, undefined>;

interface ColumnValues extends CustomMeta {
  id?: string;
}

interface CreateTaskFormProps {
  setIsAdding: Dispatch<SetStateAction<boolean>>;
  form: Form;
  columnValues: ColumnValues[];
  dismissForm: () => void;
}

export default function CreateTaskForm({
  setIsAdding,
  form,
  columnValues,
  dismissForm,
}: CreateTaskFormProps) {
  return (
    <TableRow className="sticky top-[48px] z-[2] bg-accent">
      {columnValues.map(({ id, inputType }, index) => {
        if (!id) {
          throw new Error(
            "A column id is required in CreateTaskForm component",
          );
        }

        if (id === "checkbox") {
          return (
            <TableCell
              className="sticky left-0 top-[48px] bg-accent pl-[15px] pr-0"
              key={index}
            >
              <SquareMinus
                onClick={() => {
                  setIsAdding(false);
                  dismissForm();
                }}
                size={20}
                className="cursor-pointer text-red-400 transition-colors hover:text-[#ff8674]"
              />
            </TableCell>
          );
        }

        if (id === "actions") {
          return (
            <TableCell
              className="sticky right-0 top-[48px] border-l border-r-0 bg-accent"
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

        return (
          <TableCell key={index}>
            <FormField
              control={form.control}
              name={id}
              render={({ field }) => {
                if (inputType === "number") {
                  return <InputNumber field={field} />;
                }
                if (inputType === "date") {
                  return <InputDate field={field} />;
                }
                if (inputType instanceof Function) {
                  return <InputCommand field={field} hook={inputType} />;
                }

                return <InputText field={field} />;
              }}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
}
