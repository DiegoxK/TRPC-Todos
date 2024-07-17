import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { todos } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

import { and, eq, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { z } from "zod";

export const todoSchema = createSelectSchema(todos);

const createTodoSchema = createInsertSchema(todos, {
  due: z.string().datetime().optional(),
  createdById: z.undefined(),
  taskSlug: z.undefined(),
});

export const todoRouter = createTRPCRouter({
  getTodosWithProject: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;

    return ctx.db.query.todos.findMany({
      where: eq(todos.createdById, userId),
      with: {
        project: {
          columns: {
            name: true,
          },
        },
      },
      orderBy: (todos, { desc }) => [desc(todos.createdAt)],
    });
  }),

  deleteTodos: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      try {
        return await ctx.db
          .delete(todos)
          .where(
            and(
              eq(todos.createdById, userId),
              sql`${todos.id} IN ${input.ids}`,
            ),
          );
      } catch (err) {
        console.error(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  createTodo: protectedProcedure
    .input(createTodoSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const taskSlug = input.task.toLowerCase().replace(/\s/g, "-");

      const project = await ctx.db.query.projects.findFirst({
        where: (table, funcs) =>
          funcs.and(
            funcs.eq(table.id, input.projectId),
            funcs.eq(table.createdById, userId),
          ),
        columns: {
          id: true,
        },
      });

      if (project) {
        return ctx.db.insert(todos).values({
          ...input,
          due: input.due ? new Date(input.due) : null,
          taskSlug,
          createdById: userId,
        });
      }

      throw new Error("Project not found");
    }),
  editTodo: protectedProcedure
    .input(createTodoSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const taskSlug = input.task.toLowerCase().replace(/\s/g, "-");

      if (!input.id) {
        throw new Error("Todo id is required");
      }

      const project = await ctx.db.query.projects.findFirst({
        where: (table, funcs) =>
          funcs.and(
            funcs.eq(table.id, input.projectId),
            funcs.eq(table.createdById, userId),
          ),
        columns: {
          id: true,
        },
      });

      if (project) {
        return ctx.db
          .update(todos)
          .set({
            ...input,
            due: input.due ? new Date(input.due) : null,
            taskSlug,
          })
          .where(and(eq(todos.id, input.id), eq(todos.createdById, userId)));
      }

      throw new Error("Project not found");
    }),
});
