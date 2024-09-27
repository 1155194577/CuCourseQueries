import { z } from "zod";

export const FireBaseKeySchema = z.object({
  type: z.string(),
  project_id: z.string(),
  private_key_id: z.string(),
  private_key: z.string(),
  client_email: z.string().email(),
  client_id: z.string(),
  auth_uri: z.string().url(),
  token_uri: z.string().url(),
  auth_provider_x509_cert_url: z.string().url(),
  client_x509_cert_url: z.string().url(),
  universe_domain: z.string(),
});

export const portSchema = z.string().transform((val) => {
  Number(val);
});
export type PortType = z.infer<typeof portSchema>;
export type FireBaseKeyType = z.infer<typeof FireBaseKeySchema>;
