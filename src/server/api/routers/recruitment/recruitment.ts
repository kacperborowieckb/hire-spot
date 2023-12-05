import { newRecruitmentSchema } from "~/schemas/newRecruitmentSchema";
import { createTRPCRouter, privateProcedure } from "../../trpc";
import { z } from "zod";

export const recruitmentRouter = createTRPCRouter({
  getAllRecruitment: privateProcedure.query(({ ctx }) => {
    return ctx.db.recruitment.findMany({
      where: { creatorId: ctx.currentUser },
    });
  }),
  getRecruitmentById: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const recruitmentData = await ctx.db.recruitment.findUnique({
        where: { id: input.id },
        include: { creator: { select: { username: true } } },
      });

      return {
        ...recruitmentData,
        creator: recruitmentData?.creator.username,
      };
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
