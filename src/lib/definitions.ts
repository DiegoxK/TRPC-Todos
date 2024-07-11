import type { z } from "zod";
import type { createTodoSchema } from "@/server/api/routers/todo";

type NoNullFields<T> = {
  [P in keyof T]: NoNullFields<Exclude<T[P], null>>;
};

type CreateTodoSchema = z.infer<typeof createTodoSchema>;

export type Todo = NoNullFields<CreateTodoSchema>;
