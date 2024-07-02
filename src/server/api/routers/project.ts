import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { projects } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const projectRouter = createTRPCRouter({
  getProjects: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;

    return ctx.db.query.projects.findMany({
      where: eq(projects.createdById, userId),
    });
  }),
  getProjectNames: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const names = await ctx.db.query.projects.findMany({
      where: eq(projects.createdById, userId),
      columns: {
        name: true,
      },
    });

    return names.map((name) => name.name);
  }),
  getProject: protectedProcedure
    .input(z.object({ projectSlug: z.string() }))
    .query(({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return ctx.db.query.projects.findFirst({
        where: and(
          eq(projects.createdById, userId),
          eq(projects.nameSlug, input.projectSlug),
        ),
        with: {
          todos: true,
        },
      });
    }),
});
