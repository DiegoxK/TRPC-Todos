import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { todos } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const todoRouter = createTRPCRouter({
  getTodos: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(todos);
  }),
  setDone: publicProcedure
    .input(
      z.object({
        id: z.string(),
        done: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(todos)
        .set({
          done: input.done,
        })
        .where(eq(todos.id, input.id));
    }),
});
