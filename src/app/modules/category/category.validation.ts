import { z } from "zod";

const categoryCreateValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "name must be a string",
      required_error: "name is required",
    }),
  }),
});

export const categoryValidationSchemas = {
  categoryCreateValidationSchema,
};
