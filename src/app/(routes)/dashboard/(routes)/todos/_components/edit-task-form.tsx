import type { Todo, TodoValidationSchema } from "@/lib/definitions";
import { type ColumnValues } from "./data-table";
import { useForm } from "react-hook-form";
import { todoValidationSchema } from "./data";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormTableItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { TodoFormField } from "./todo-form-field";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/trpc/react";
import { useRef } from "react";

interface EditTaskFormProps {
  todo: Todo;
  columnValues: ColumnValues[];
}

export default function EditTaskForm({
  todo,
  columnValues,
}: EditTaskFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const { mutate: editTodo } = api.todo.editTodo.useMutation({
    onSuccess: () => {
      console.log("Todo edited");
    },
    onError: (error) => {
      console.log(error);
    },
  });

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
    console.log({
      id: todo.id,
      ...values,
    });
    editTodo({
      id: todo.id,
      ...values,
    });
  }

  return (
    <>
      <DialogTitle>Edit Task</DialogTitle>
      <Form {...form}>
        <ScrollArea className="max-h-[60vh] rounded-lg pr-4">
          <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
            <div className="m-1 grid grid-cols-2 gap-4">
              {columnValues.map(({ id, inputType, formHeader }) => {
                if (!id) {
                  throw new Error(
                    "A column id is required to create a Form component",
                  );
                }

                if (id === "priority" || id === "status") {
                  return (
                    <FormField
                      key={id}
                      control={form.control}
                      name={id}
                      render={({ field }) => (
                        <FormItem className="col-span-1" key={id}>
                          <FormLabel>
                            {formHeader} <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <TodoFormField
                              field={field}
                              inputType={inputType}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  );
                }

                return (
                  <FormField
                    key={id}
                    control={form.control}
                    name={id}
                    render={({ field }) => (
                      <FormTableItem className="col-span-2" key={id}>
                        <FormLabel>
                          {formHeader} <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <TodoFormField field={field} inputType={inputType} />
                        </FormControl>
                      </FormTableItem>
                    )}
                  />
                );
              })}
            </div>
          </form>
        </ScrollArea>
        <Button
          onClick={() => {
            formRef.current?.requestSubmit();
          }}
          className="w-full"
        >
          Submit
        </Button>
      </Form>
    </>
  );
}
