import { applySchema } from "~/schemas/applySchema";
import { createTRPCRouter, privateProcedure } from "../../trpc";
import { z } from "zod";
import { UTApi } from "uploadthing/server";
import { TRPCError } from "@trpc/server";
import { Rating } from "@prisma/client";

const utapi = new UTApi();

export const candidateRouter = createTRPCRouter({
  addCandidate: privateProcedure
    .input(
      applySchema.omit({ cv: true }).extend({
        cvUrl: z.string(),
        recruitmentId: z.string(),
        imgKey: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.candidate.create({
          data: {
            name: input.name,
            cvUrl: input.cvUrl,
            email: input.email,
            description: input.description,
            recruitmentId: input.recruitmentId,
          },
        });
      } catch (err) {
        if (err instanceof Error) {
          utapi.deleteFiles(input.imgKey);
          throw new TRPCError({ code: "CONFLICT", message: err.message });
        }
      }
    }),
  getCandidatesByRecruitmentId: privateProcedure
    .input(z.object({ recruitmentId: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.candidate.findMany({
        where: { recruitmentId: input.recruitmentId },
      });
      //TODO tests
      return data;
    }),
  getUncheckedCandidatesByRecruitmentId: privateProcedure
    .input(z.object({ recruitmentId: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.candidate.findMany({
        where: { recruitmentId: input.recruitmentId, rating: "UNCHECKED" },
      });
      //TODO tests
      return data;
    }),

  rateCandidate: privateProcedure
    .input(z.object({ rating: z.nativeEnum(Rating), candidateId: z.string() }))
    .mutation(async ({ ctx, input: { candidateId, rating } }) => {
      await ctx.db.candidate.update({
        where: { id: candidateId },
        data: { rating: rating },
      });
    }),
});
