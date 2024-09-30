import { z } from "zod";

type APIResponse<T> = {
  success: boolean;
  data: T;
};
const APIResponseSchema = <T>(dataSchema: z.ZodType<T>) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
  });
