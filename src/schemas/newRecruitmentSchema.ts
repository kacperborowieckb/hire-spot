import { z } from "zod";

export const newRecruitmentSchema = z.object({
  positionTitle: z
    .string()
    .min(3, "Position title must be at least 3 characters")
    .max(32, "Position title must be below 32 characters"),
  description: z
    .string()
    .max(1024, "Description must be below 1024 characters"),
});

export type TNewRecruitmentSchema = z.infer<typeof newRecruitmentSchema>;
