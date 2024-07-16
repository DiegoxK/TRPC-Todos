import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Todo } from "@/lib/definitions";
import type { Dispatch, SetStateAction } from "react";
import type { FieldErrors } from "react-hook-form";

import type { TodoValidationSchema } from "@/lib/definitions";

interface DataTableDialogProps {
  open: boolean;
  setTodo: Dispatch<SetStateAction<Todo | undefined>>;
  setErrors: Dispatch<
    SetStateAction<FieldErrors<TodoValidationSchema> | undefined>
  >;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function DataTableDialog({
  open,
  setTodo,
  setErrors,
  onOpenChange,
  children,
}: DataTableDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        setErrors(undefined);
        setTodo(undefined);
      }}
    >
      <DialogContent className="pr-8 pt-7">{children}</DialogContent>
    </Dialog>
  );
}
