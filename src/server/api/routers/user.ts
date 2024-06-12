import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  hasUserName: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userEmail = input.email;

      const user = await ctx.db.query.users.findFirst({
        where: (table, funcs) => funcs.eq(table.email, userEmail),
      });

      if (!user) {
        throw new Error("User not found");
      }

      if (!user.name) {
        return false;
      }

      return true;
    }),

  createUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userEmail = input.email;

      const userExist = await ctx.db.query.users.findFirst({
        where: (table, funcs) => funcs.eq(table.email, userEmail),
      });

      if (userExist) {
        throw new Error("User already exists");
      }

      return await ctx.db.insert(users).values({
        email: userEmail,
      });
    }),
});
