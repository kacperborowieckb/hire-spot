import { newRecruitmentSchema } from "~/schemas/newRecruitmentSchema";
import { createTRPCRouter, privateProcedure } from "../trpc";

export const recruitmentRouter = createTRPCRouter({
  getAllRecruitment: privateProcedure.query(({ ctx }) => {
    return ctx.db.recruitment.findMany({
      where: { creatorId: ctx.currentUser },
    });
  }),
  addRecruitment: privateProcedure
    .input(newRecruitmentSchema)
    .mutation(async ({ ctx, input }) => {
      const recruitment = await ctx.db.recruitment.create({
        data: {
          position: input.positionTitle,
          description: input.description,
          creatorId: ctx.currentUser,
        },
      });

      return recruitment.id;
    }),
});
