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
    // eslint-disable-next-line
    .refine((file) => Boolean(file?.name), "Cv is required.")
    // eslint-disable-next-line
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    // eslint-disable-next-line
    .refine(
      // eslint-disable-next-line
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .pdf files are accepted.",
    ),
});

export type TApplySchema = z.infer<typeof applySchema>;
