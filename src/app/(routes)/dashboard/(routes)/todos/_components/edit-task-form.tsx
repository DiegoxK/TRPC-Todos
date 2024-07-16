import type { Todo, TodoValidationSchema } from "@/lib/definitions";
import { type ColumnValues } from "./data-table";
import { useForm, type UseFormReturn } from "react-hook-form";
import { todoValidationSchema } from "./data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { TodoFormField } from "./todo-form-field";

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
    description: todo.description ?? "",
    due: todo.due ? todo.due.toISOString() : undefined,
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
          <FormItem>
            <FormLabel />
            <FormControl>
              {columnValues.map(({ id, inputType }) => {
                if (!id) {
                  throw new Error(
                    "A column id is required to create a Form component",
                  );
                }

                if (id === "priority" || id === "status") {
                  return (
                    <TodoFormField
                      key={id}
                      id={id}
                      form={form}
                      inputType={inputType}
                    />
                  );
                }

                return (
                  <TodoFormField
                    className="col-span-2"
                    key={id}
                    id={id}
                    form={form}
                    inputType={inputType}
                  />
                );
              })}
            </FormControl>
          </FormItem>
          <Button className="col-span-2 mt-2" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
