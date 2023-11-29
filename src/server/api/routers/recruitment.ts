import { createTRPCRouter, privateProcedure } from "../trpc";

export const recruitmentRouter = createTRPCRouter({
  getAllRecruitment: privateProcedure.query(({ ctx }) => {
    return ctx.db.recruitment.findMany({
      where: { creatorId: ctx.currentUser },
    });
  }),
});
