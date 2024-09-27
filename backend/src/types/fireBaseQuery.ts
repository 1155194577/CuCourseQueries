import { z } from "zod";
const queryOperatorsSchema = z.enum([
  "<",
  "<=",
  "==",
  "!=",
  ">=",
  ">",
  "array-contains",
  "in",
  "not-in",
  "array-contains-any",
]); // enum
export const fireBaseQuerySchema = z.object({
  field: z.string(),
  operator: queryOperatorsSchema,
  value: z.string(),
});
export type FireBaseQueryType = z.infer<typeof fireBaseQuerySchema>;
