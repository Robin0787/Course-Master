import { z } from "zod";

const reviewCreateValidationSchema = z.object({
  body: z.object({
    courseId: z.string(),
    rating: z.number().min(0).max(5),
    review: z.string(),
  }),
});

export const reviewValidationSchemas = {
  reviewCreateValidationSchema,
};
