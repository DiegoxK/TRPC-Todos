import type { Todo } from "@/lib/definitions";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { todoValidationSchema, type TodoValidationSchema } from "./data";

interface TableActionsProps {
  todo: Todo;
}

export default function TableActions({ todo }: TableActionsProps) {
  return (
    <Dialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            className="absolute bottom-[18px] right-[18px] block h-4 w-4 rounded-none"
            size="icon"
            variant="ghost"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DialogTrigger asChild>
            <DropdownMenuItem>Edit Task</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View Task information</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="pl-6 pr-10">
        <EditTodoForm todo={todo} />
      </DialogContent>
    </Dialog>
  );
}

const EditTodoForm = ({ todo }: TableActionsProps) => {
  const form = useForm<TodoValidationSchema>({
    resolver: zodResolver(todoValidationSchema),
    defaultValues: {
      ...todo,
    },
  });

  function onSubmit(values: TodoValidationSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
