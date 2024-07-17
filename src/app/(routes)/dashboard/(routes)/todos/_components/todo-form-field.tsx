import type { TodoValidationSchema } from "@/lib/definitions";
import type { InputTypes } from "./columns";
import type { ControllerRenderProps } from "react-hook-form";

import {
  ApiInputCommand,
  InputCommand,
  InputDate,
  InputNumber,
  InputText,
  InputTextArea,
} from "./input-types";

interface TodoFormFieldProps {
  isTable?: boolean;
  field: ControllerRenderProps<TodoValidationSchema>;
  inputType: InputTypes;
}

export const TodoFormField = ({
  inputType,
  field,
  isTable,
}: TodoFormFieldProps) => {
  if (inputType === "number") {
    return <InputNumber field={field} />;
  }
  if (inputType === "date") {
    return <InputDate field={field} />;
  }
  if (inputType === "textarea" && !isTable) {
    return <InputTextArea field={field} />;
  }
  if (inputType instanceof Array) {
    return <InputCommand field={field} values={inputType} />;
  }
  if (inputType instanceof Function) {
    return <ApiInputCommand field={field} query={inputType} />;
  }

  return <InputText field={field} />;
};
