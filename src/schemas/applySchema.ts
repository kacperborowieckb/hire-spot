import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["application/pdf"];

export const applySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(32, "Name must be below 32 characters"),
  email: z.string().email().min(3).max(100),
  description: z.optional(
    z.string().max(100, "Description must be below 100 characters"),
  ),
  cv: z
    .any()
    .refine((files) => files?.length == 1, "Cv is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .pdf files are accepted.",
    ),
});

export type TApplySchema = z.infer<typeof applySchema>;
