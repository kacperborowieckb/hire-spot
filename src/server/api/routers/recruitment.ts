import { newRecruitmentSchema } from "~/schemas/newRecruitment";
import { createTRPCRouter, privateProcedure } from "../trpc";

export const recruitmentRouter = createTRPCRouter({
  getAllRecruitment: privateProcedure.query(({ ctx }) => {
    return ctx.db.recruitment.findMany({
      where: { creatorId: ctx.currentUser },
    });
  }),
  addRecruitment: privateProcedure
    .input(newRecruitmentSchema)
    .mutation(({ ctx, input }) => {
      const recruitment = ctx.db.recruitment.create({
        data: {
          position: input.positionTitle,
          description: input.description,
          creatorId: ctx.currentUser,
        },
      });

      return recruitment;
    }),
});
