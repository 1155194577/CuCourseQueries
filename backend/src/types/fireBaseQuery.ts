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
  value: z.union([z.string(), z.number()]),
});
export type FireBaseQueryType = z.infer<typeof fireBaseQuerySchema>;
