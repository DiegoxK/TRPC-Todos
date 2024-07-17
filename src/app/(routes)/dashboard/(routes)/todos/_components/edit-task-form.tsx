import type { Todo, TodoValidationSchema } from "@/lib/definitions";
import { type ColumnValues } from "./data-table";
import { useForm } from "react-hook-form";
import { todoValidationSchema } from "./data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { TodoFormField } from "./todo-form-field";
import { ScrollArea } from "@/components/ui/scroll-area";

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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ScrollArea className="h-[60vh] rounded-lg pr-4">
            <div className="m-1 grid grid-cols-2 gap-4">
              {columnValues.map(({ id, inputType, formHeader }) => {
                if (!id) {
                  throw new Error(
                    "A column id is required to create a Form component",
                  );
                }

                if (id === "priority" || id === "status") {
                  return (
                    <FormItem key={id}>
                      <FormLabel>{formHeader}</FormLabel>
                      <FormControl>
                        <TodoFormField
                          id={id}
                          form={form}
                          inputType={inputType}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }

                return (
                  <FormItem className="col-span-2" key={id}>
                    <FormLabel className="capitalize">{formHeader}</FormLabel>
                    <FormControl>
                      <TodoFormField
                        key={id}
                        id={id}
                        form={form}
                        inputType={inputType}
                      />
                    </FormControl>
                  </FormItem>
                );
              })}
            </div>
          </ScrollArea>
          <Button className="mt-4 w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
