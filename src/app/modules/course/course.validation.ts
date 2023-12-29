import { z } from "zod";

const courseTagsValidationSchema = z
  .object({
    name: z.string(),
    isDeleted: z.boolean(),
  })
  .array();

const courseDetailsValidationSchema = z.object({
  level: z.string(),
  description: z.string(),
});

const courseCreateValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: courseTagsValidationSchema,
    startDate: z.string(),
    endDate: z.string(),
    details: courseDetailsValidationSchema,
  }),
});

const courseUpdateValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z
      .object({
        name: z.string(),
        isDeleted: z.boolean(),
      })
      .array()
      .optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: z
      .object({
        level: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
  }),
});

export const courseValidationSchemas = {
  courseCreateValidationSchema,
  courseUpdateValidationSchema,
};
