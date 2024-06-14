import { type todos } from "@/server/db/schema";

// type user = typeof users.$inferSelect;

export type Todo = typeof todos.$inferSelect;
