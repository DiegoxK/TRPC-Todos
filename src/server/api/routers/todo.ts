import type { TodoColumnName } from "@/lib/definitions";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { todos } from "@/server/db/schema";

import { eq, getTableName } from "drizzle-orm";
import { z } from "zod";

export const todoRouter = createTRPCRouter({
  getTodos: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;

    return ctx.db.query.todos.findMany({
      where: eq(todos.createdById, userId),
    });
  }),

  deleteTodos: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const tableName = getTableName(todos);
      const columnName: TodoColumnName = "createdById";
      const whereClause = `(${input.ids.map((id) => `'${id}'`).join(", ")})`;

      const query = `select * from "${tableName}" where "${columnName}" = '${userId}' and id in ${whereClause}`;

      console.log("SQL_QUERY:", query);

      // try {
      //   return await ctx.db
      //     .delete(todos)
      //     .where(
      //       sql`select * from todos where created_by_id = ${userId} and id in (${whereClause})`,
      //     );
      // } catch (err) {
      //   console.error(err);
      //   throw new TRPCError({
      //     code: "INTERNAL_SERVER_ERROR",
      //     message: "INTERNAL_SERVER_ERROR",
      //   });
      // }
    }),

  // setDone: publicProcedure
  //   .input(
  //     z.object({
  //       id: z.string(),
  //       done: z.boolean(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     return await ctx.db
  //       .update(todos)
  //       .set({
  //         done: input.done,
  //       })
  //       .where(eq(todos.id, input.id));
  //   }),
});
