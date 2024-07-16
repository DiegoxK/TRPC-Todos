import type { z } from "zod";
import type { todoSchema } from "@/server/api/routers/todo";
import type { todoValidationSchema } from "@/app/(routes)/dashboard/(routes)/todos/_components/data";

//Server types
export type Todo = z.infer<typeof todoSchema>;

//Client types
export type TodoValidationSchema = z.infer<typeof todoValidationSchema>;
export type TodoValidationKeys = keyof TodoValidationSchema;
