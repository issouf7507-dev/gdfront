import { z } from "zod";
import { QUOTE_SERVICE_LABELS, type QuoteService } from "@/lib/services";

const serviceKeys = Object.keys(QUOTE_SERVICE_LABELS) as [QuoteService, ...QuoteService[]];

// Résultat renvoyé aux formulaires admin (useActionState)
export type ActionState = {
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  success?: string;
};

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().transform((v) => v || null);

const checkbox = z.preprocess((v) => v === "on" || v === "true", z.boolean());

const optionalId = z.string().trim().max(40).optional().transform((v) => v || null);

export const quoteUpdateSchema = z.object({
  status: z.enum(["NOUVEAU", "CONTACTE", "DEVIS_ENVOYE", "GAGNE", "PERDU"]),
  notes: optionalText(10000),
});

const realisationImagesSchema = z
  .string()
  .default("[]")
  .transform((raw, ctx) => {
    try {
      return JSON.parse(raw) as unknown;
    } catch {
      ctx.addIssue({ code: "custom", message: "Images invalides" });
      return z.NEVER;
    }
  })
  .pipe(
    z
      .array(z.object({ mediaId: z.string().min(1).max(40), kind: z.enum(["AVANT", "APRES", "GALERIE"]) }))
      .max(60),
  );

export const realisationSchema = z.object({
  title: z.string().trim().min(1, "Titre requis").max(150),
  slug: optionalText(160),
  location: optionalText(150),
  service: z.enum(serviceKeys),
  description: z.string().trim().min(1, "Description requise").max(10000),
  completedAt: z
    .string()
    .optional()
    .transform((v) => (v ? new Date(v) : null))
    .refine((d) => d === null || !Number.isNaN(d.getTime()), "Date invalide"),
  published: checkbox,
  coverId: optionalId,
  images: realisationImagesSchema,
});

export const articleSchema = z.object({
  title: z.string().trim().min(1, "Titre requis").max(200),
  slug: optionalText(160),
  excerpt: optionalText(500),
  content: z.string().max(500_000),
  category: optionalText(100),
  seoTitle: optionalText(200),
  seoDescription: optionalText(300),
  status: z.enum(["BROUILLON", "PUBLIE"]),
  coverId: optionalId,
});

export const testimonialSchema = z.object({
  name: z.string().trim().min(1, "Nom requis").max(100),
  role: optionalText(150),
  content: z.string().trim().min(1, "Avis requis").max(2000),
  rating: z.coerce.number().int().min(1).max(5),
  position: z.coerce.number().int().min(0).max(9999).default(0),
  published: checkbox,
});

// Comptes du back-office
const email = z.string().trim().toLowerCase().max(200).pipe(z.email("Email invalide"));
const password = z.string().min(10, "10 caractères minimum").max(128);

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Nom requis").max(100),
  email,
});

export const passwordChangeSchema = z
  .object({ currentPassword: z.string().min(1, "Mot de passe actuel requis"), newPassword: password, confirm: z.string() })
  .refine((d) => d.newPassword === d.confirm, { path: ["confirm"], message: "Les mots de passe ne correspondent pas" });

const role = z.enum(["ADMIN", "EDITEUR"], "Rôle invalide");

export const newUserSchema = z.object({
  name: z.string().trim().min(1, "Nom requis").max(100),
  email,
  password,
  role,
});

export const roleSchema = z.object({ role });

export const passwordResetSchema = z.object({ password });

export function parseForm<T extends z.ZodType>(schema: T, formData: FormData) {
  const raw: Record<string, FormDataEntryValue> = {};
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("$")) raw[key] = value; // ignore les champs internes de Next
  }
  return schema.safeParse(raw);
}

export function validationState(error: z.ZodError): ActionState {
  return {
    error: "Certains champs sont invalides.",
    fieldErrors: z.flattenError(error).fieldErrors as Record<string, string[]>,
  };
}
