import type { Todo } from "@/lib/definitions";
import { type ColumnValues } from "./data-table";
import { useForm } from "react-hook-form";
import { todoValidationSchema, type TodoValidationSchema } from "./data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "react-day-picker";
import {
  ApiInputCommand,
  InputCommand,
  InputDate,
  InputNumber,
  InputText,
  InputTextArea,
} from "./input-types";

interface EditTaskFormProps {
  todo: Todo;
  columnValues: ColumnValues[];
}

export default function EditTaskForm({
  todo,
  columnValues,
}: EditTaskFormProps) {
  const defaultValues = {
    ...todo,
  };

  const form = useForm<TodoValidationSchema>({
    resolver: zodResolver(todoValidationSchema),
    defaultValues,
  });

  function onSubmit(values: TodoValidationSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {columnValues.map(({ id, inputType }) => (
          <FormField
            key={id}
            control={form.control}
            name={id}
            render={({ field }) => {
              if (inputType === "number") {
                return <InputNumber field={field} />;
              }
              if (inputType === "date") {
                return <InputDate field={field} />;
              }
              if (inputType === "textarea") {
                return <InputTextArea field={field} />;
              }
              if (inputType instanceof Array) {
                return <InputCommand field={field} values={inputType} />;
              }
              if (inputType instanceof Function) {
                return <ApiInputCommand field={field} query={inputType} />;
              }

              return <InputText field={field} />;
            }}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
