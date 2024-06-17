import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { projects } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const projectRouter = createTRPCRouter({
  getProjects: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;

    return ctx.db.query.projects.findMany({
      where: eq(projects.createdById, userId),
    });
  }),
});
