import { TableCell, TableRow } from "@/components/ui/table";
import { Send, SquareMinus } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

import { FormField } from "@/components/ui/form";

import type { UseFormReturn } from "react-hook-form";

import {
  ApiInputCommand,
  InputCommand,
  InputDate,
  InputNumber,
  InputText,
} from "./input-types";
import { type ColumnValues } from "./data-table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Form = UseFormReturn<Record<string, any>, any, undefined>;

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
  const formValues = columnValues
    .map(({ id, defaultValue, optional }) => {
      if (id !== "checkbox" && id !== "actions" && !defaultValue && !optional) {
        return id;
      }
    })
    .filter((value) => value !== undefined);

  const isFilled = formValues.every((id) => {
    return form.formState.dirtyFields[id];
  });

  return (
    <TableRow className="sticky top-[48px] z-[2] bg-accent">
      {columnValues.map(({ id, inputType }) => {
        if (!id) {
          throw new Error(
            "A column id is required in CreateTaskForm component",
          );
        }

        if (id === "checkbox") {
          return (
            <TableCell
              className="sticky left-0 top-[48px] z-[1] bg-accent pl-[15px] pr-0"
              key={id}
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
              key={id}
            >
              <button
                className="cursor-pointer text-green-400 transition-colors hover:text-green-500 disabled:cursor-not-allowed disabled:text-zinc-500"
                disabled={!isFilled}
                title={isFilled ? "Add Task" : "Invalid Fields"}
                type="submit"
              >
                <Send
                  className=" absolute bottom-[21px]  right-[17px]"
                  size={20}
                />
              </button>
            </TableCell>
          );
        }

        return (
          <TableCell key={id}>
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
                if (inputType instanceof Array) {
                  return <InputCommand field={field} values={inputType} />;
                }
                if (inputType instanceof Function) {
                  return <ApiInputCommand field={field} hook={inputType} />;
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
