import { z } from "zod";
export const getCourseRequestSchema = z.object({
  programName: z.string().transform((val) => val.toUpperCase()),
  courseCode: z.string().optional(),
});

export const ErrorSchema = z.object({
  success: z.boolean(),
  errorCode: z.number(),
  errorMessage: z.string(),
});

export type getCourseRequestType = z.infer<typeof getCourseRequestSchema>;
export type ErrorType = z.infer<typeof ErrorSchema>;
