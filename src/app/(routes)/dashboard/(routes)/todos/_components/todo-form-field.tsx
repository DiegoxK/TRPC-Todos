import type {
  TodoValidationKeys,
  TodoValidationSchema,
} from "@/lib/definitions";
import type { InputTypes } from "./columns";
import type { UseFormReturn } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import {
  ApiInputCommand,
  InputCommand,
  InputDate,
  InputNumber,
  InputText,
  InputTextArea,
} from "./input-types";

interface TodoFormFieldProps {
  id: TodoValidationKeys;
  className?: string;
  form: UseFormReturn<TodoValidationSchema>;
  inputType: InputTypes;
}

export const TodoFormField = ({
  id,
  inputType,
  form,
  className,
}: TodoFormFieldProps) => {
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
