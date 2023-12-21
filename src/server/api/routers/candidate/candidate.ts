import { applySchema } from "~/schemas/applySchema";
import { createTRPCRouter, privateProcedure } from "../../trpc";
import { z } from "zod";

export const candidateRouter = createTRPCRouter({
  addCandidate: privateProcedure
    .input(
      applySchema.omit({ cv: true }).extend({
        cvUrl: z.string(),
        recruitmentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.candidate.create({
        data: {
          name: input.name,
          cvUrl: input.cvUrl,
          email: input.email,
          description: input.description,
          recruitmentId: input.recruitmentId,
        },
      });
    }),
});
