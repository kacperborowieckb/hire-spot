import { applySchema } from "~/schemas/applySchema";
import {
  createTRPCRouter,
  creatorProcedure,
  privateProcedure,
  publicProcedure,
} from "../../trpc";
import { z } from "zod";
import { UTApi } from "uploadthing/server";
import { TRPCError } from "@trpc/server";
import { Rating } from "@prisma/client";

const utapi = new UTApi();

export const candidateRouter = createTRPCRouter({
  //Another middleware for checking if user have right to this data?
  getCandidateById: privateProcedure
    .input(z.object({ candidateId: z.string() }))
    .query(async ({ ctx, input: { candidateId } }) => {
      return await ctx.db.candidate.findUnique({ where: { id: candidateId } });
    }),
  addCandidate: publicProcedure
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
  getCandidatesByRecruitmentId: creatorProcedure
    .input(z.object({ recruitmentId: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.candidate.findMany({
        where: { recruitmentId: input.recruitmentId },
      });
      //TODO tests
      return data;
    }),
  getUncheckedCandidatesByRecruitmentId: creatorProcedure
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
  //TODO invalidatePath
  deleteCandidate: privateProcedure
    .input(z.object({ candidateId: z.string(), cvUrl: z.string() }))
    .mutation(async ({ ctx, input: { candidateId, cvUrl } }) => {
      await ctx.db.candidate.delete({ where: { id: candidateId } });

      const fileName = cvUrl.split("/").pop();
      const fileKey = fileName?.split(".")[0];

      if (fileKey) {
        await utapi.deleteFiles(fileName);
      } else {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Resume key not found",
        });
      }
    }),
  scheduleCandidate: privateProcedure
    .input(
      z.object({
        candidateId: z.string(),
        dateTime: z.date(),
      }),
    )
    .mutation(async ({ ctx, input: { candidateId, dateTime } }) => {
      await ctx.db.candidate.update({
        where: { id: candidateId },
        data: {
          scheduledFor: dateTime,
          forInterview: true,
          interviewStage: "SCHEDULED",
        },
      });
    }),
  completeInterview: privateProcedure
    .input(
      z.object({
        candidateId: z.string(),
        summary: z.string(),
      }),
    )
    .mutation(async ({ ctx, input: { candidateId, summary } }) => {
      await ctx.db.candidate.update({
        where: { id: candidateId },
        data: {
          interviewStage: "COMPLETED",
          summary: summary,
          forInterview: false,
        },
      });
    }),
});
