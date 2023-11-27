import { createTRPCRouter, privateProcedure } from "../trpc";

export const recruitmentRouter = createTRPCRouter({
  hello: privateProcedure.query(() => ({ name: "hello" })),
});
