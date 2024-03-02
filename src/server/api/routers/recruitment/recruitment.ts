import { newRecruitmentSchema } from "~/schemas/newRecruitmentSchema";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "../../trpc";
import { z } from "zod";
import { countCandidatesByRating } from "~/helpers/countCandidatesByRating";

export const recruitmentRouter = createTRPCRouter({
  getAllRecruitmentData: privateProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.recruitment.findMany({
      where: { creatorId: ctx.currentUser },
      include: {
        candidates: { select: { rating: true } },
      },
    });

    return data.map((recruitment) => ({
      id: recruitment.id,
      position: recruitment.position,
      candidates: recruitment.candidates.length,
      createdAt: recruitment.createdAt,
      uncheckedCandidates: countCandidatesByRating(
        recruitment.candidates,
        "UNCHECKED",
      ),
    }));
  }),
  getRecruitmentById: publicProcedure
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
          createdAt: new Date(),
        },
      });

      return recruitment.id;
    }),
});
