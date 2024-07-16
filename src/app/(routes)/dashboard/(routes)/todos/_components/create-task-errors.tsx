import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Todo } from "@/lib/definitions";

import { type FieldErrors } from "react-hook-form";

interface CreateTaskErrorsProps {
  errors: FieldErrors<Todo>;
}

export default function CreateTaskErrors({ errors }: CreateTaskErrorsProps) {
  return (
    <>
      <DialogTitle>Couldn&apos;t create task.</DialogTitle>
      <DialogDescription className="space-y-2 rounded-md border border-red-400 bg-accent px-6 py-3">
        {Object.entries(errors).map(([key, error]) => {
          return (
            <code className="text-red-400" key={key}>
              {error?.message?.toString()}
              <br />
            </code>
          );
        })}
      </DialogDescription>
    </>
  );
}
