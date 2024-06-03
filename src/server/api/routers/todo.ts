import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getTodos: publicProcedure.query(async () => {
    return [10, 20, 30];
  }),
});
