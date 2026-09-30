import { z } from "zod";
import { ValidationError } from "@/lib/app-error";
import { QUOTE_SERVICE_LABELS, type QuoteService } from "@/lib/services";

const serviceKeys = Object.keys(QUOTE_SERVICE_LABELS) as [QuoteService, ...QuoteService[]];

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => v || undefined);

const attributionSchema = z
  .object({
    utm_source: optionalText(300),
    utm_medium: optionalText(300),
    utm_campaign: optionalText(300),
    utm_term: optionalText(300),
    utm_content: optionalText(300),
    gclid: optionalText(300),
    landing_page: optionalText(300),
    referrer: optionalText(300),
  })
  .partial();

export const quoteRequestSchema = z.object({
  name: z.string().trim().min(1, "Nom requis").max(100),
  email: z.string().trim().max(200).pipe(z.email("Email invalide")),
  phone: z.string().trim().min(6, "Téléphone invalide").max(30),
  company: optionalText(150),
  service: z.enum(serviceKeys),
  message: z.string().trim().min(1, "Message requis").max(5000),
  attribution: attributionSchema.optional().catch(undefined),
  // Champ piège (honeypot) : invisible pour un humain, rempli par les robots
  website: z.string().optional(),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

export function parseQuoteRequest(body: unknown): QuoteRequestInput {
  const result = quoteRequestSchema.safeParse(body);
  if (!result.success) throw new ValidationError(z.flattenError(result.error));
  return result.data;
}
