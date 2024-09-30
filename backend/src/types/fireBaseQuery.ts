import { z } from "zod";
export const dBcollectionSchema = z.object({
  dbName: z.string(),
  colName: z.string(),
});

export const dBdocumentSchema = dBcollectionSchema.extend({
  docName: z.string().optional(),
});

export const dBdocumentStrictSchema = dBcollectionSchema.extend({
  docName: z.string(),
});

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
export type dBDocumentType = z.infer<typeof dBdocumentSchema>;
export type dBDocumentStrictType = z.infer<typeof dBdocumentStrictSchema>;
export type dBcollectionType = z.infer<typeof dBcollectionSchema>;
