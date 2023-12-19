import { createTRPCRouter } from "~/server/api/trpc";
import { recruitmentRouter } from "./routers/recruitment/recruitment";
import { candidateRouter } from "./routers/candidate/candidate";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  recruitment: recruitmentRouter,
  candidate: candidateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
