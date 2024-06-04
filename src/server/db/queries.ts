import "server-only";
import { db } from "@/server/db";
import { todos } from "./schema";

export async function getTodos() {
  return await db.select().from(todos);
}
