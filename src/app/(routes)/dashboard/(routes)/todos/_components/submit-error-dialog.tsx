import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Dispatch, type SetStateAction } from "react";
import type { FieldErrors, FieldValues } from "react-hook-form";

interface SubmitErrorDialogProps<T extends FieldValues> {
  open: boolean;
  errors?: FieldErrors<T>;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function SubmitErrorDialog<T extends FieldValues>({
  open,
  errors,
  onOpenChange,
}: SubmitErrorDialogProps<T>) {
  if (!errors) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  );
}
