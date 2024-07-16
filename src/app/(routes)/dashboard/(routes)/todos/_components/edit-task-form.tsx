import type { Todo } from "@/lib/definitions";
import { type ColumnValues } from "./data-table";
import { useForm, type UseFormReturn } from "react-hook-form";
import {
  todoValidationSchema,
  type ValidationKeys,
  type TodoValidationSchema,
} from "./data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  ApiInputCommand,
  InputCommand,
  InputDate,
  InputNumber,
  InputText,
  InputTextArea,
} from "./input-types";
import { type InputTypes } from "./columns";
import { DialogTitle } from "@/components/ui/dialog";

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
    <>
      <DialogTitle className="mb-2">Edit Task</DialogTitle>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          {columnValues.map(({ id, inputType }) => {
            if (id === "priority" || id === "status") {
              return (
                <EditFormField
                  key={id}
                  id={id}
                  form={form}
                  inputType={inputType}
                />
              );
            }

            return (
              <EditFormField
                className="col-span-2"
                key={id}
                id={id}
                form={form}
                inputType={inputType}
              />
            );
          })}
          <Button className="col-span-2 mt-2" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}

interface EditFormFieldProps {
  id: ValidationKeys;
  className?: string;
  form: UseFormReturn<TodoValidationSchema>;
  inputType: InputTypes;
}

const EditFormField = ({
  id,
  inputType,
  form,
  className,
}: EditFormFieldProps) => {
  return (
    <div className={className}>
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
    </div>
  );
};
