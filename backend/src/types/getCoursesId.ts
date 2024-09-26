import { z } from "zod";

// Define the program name schema as part of an object
export const programNameSchema = z
  .string()
  .length(4, { message: "Program name must be exactly 4 characters long" }) // Ensure length is 4
  .regex(/^[a-zA-Z]{4}$/, {
    message: "Program name must contain only alphabetic characters (a-z, A-Z)",
  })
  .transform((val) => val.toUpperCase()); // Transform to uppercase

export const responseCourseIdSchema = z.record(z.array(z.string()));

export type programNameType = z.infer<typeof programNameSchema>;
export type responseCourseIdType = z.infer<typeof responseCourseIdSchema>;
