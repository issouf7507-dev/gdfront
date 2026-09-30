import { createHash } from "node:crypto";
import { Resend } from "resend";
import { TooManyRequestsError } from "@/lib/app-error";
import { customerAckEmail, internalQuoteEmail } from "@/lib/emails/quote";
import { prisma } from "@/lib/prisma";
import { EMAIL } from "@/lib/site";
import type { QuoteRequestInput } from "@/lib/validation/quote";

const FROM_EMAIL = process.env.FROM_EMAIL ?? "GD Couverture <contact@gdcouverture.ci>";
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

// Derrière nginx : x-real-ip ($remote_addr) est fiable. À défaut, on prend la
// DERNIÈRE entrée de x-forwarded-for (ajoutée par le proxy) : la première est
// fournie par le client et falsifiable.
export function clientIp(req: Request): string | null {
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",").pop()?.trim() || null;
}

// L'IP n'est jamais stockée en clair
function hashIp(ip: string | null) {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT ?? "gdcouv";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

async function assertNotRateLimited(ipHash: string | null) {
  if (!ipHash) return;
  const recent = await prisma.quoteRequest.count({
    where: { ipHash, createdAt: { gte: new Date(Date.now() - RATE_LIMIT_WINDOW_MS) } },
  });
  if (recent >= RATE_LIMIT_MAX) {
    throw new TooManyRequestsError(
      "Trop de demandes envoyées. Réessayez plus tard ou appelez-nous directement.",
    );
  }
}

// Enregistre la demande PUIS envoie les emails : un échec d'envoi ne fait
// jamais perdre le lead (emailSent reste à false et l'erreur est journalisée).
export async function createQuoteRequest(input: QuoteRequestInput, ip: string | null) {
  const ipHash = hashIp(ip);
  await assertNotRateLimited(ipHash);

  const a = input.attribution ?? {};
  const quote = await prisma.quoteRequest.create({
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone,
      company: input.company,
      service: input.service,
      message: input.message,
      utmSource: a.utm_source,
      utmMedium: a.utm_medium,
      utmCampaign: a.utm_campaign,
      utmTerm: a.utm_term,
      utmContent: a.utm_content,
      gclid: a.gclid,
      landingPage: a.landing_page,
      referrer: a.referrer,
      ipHash,
    },
  });

  if (!resend) {
    console.warn(`RESEND_API_KEY absente : devis ${quote.id} enregistré sans email`);
    return quote;
  }

  const internal = internalQuoteEmail(quote);
  const ack = customerAckEmail(quote);
  const [internalResult, ackResult] = await Promise.allSettled([
    resend.emails.send({ from: FROM_EMAIL, to: [EMAIL], replyTo: quote.email, ...internal }),
    resend.emails.send({ from: FROM_EMAIL, to: [quote.email], replyTo: EMAIL, ...ack }),
  ]);

  const internalOk = internalResult.status === "fulfilled" && !internalResult.value.error;
  if (!internalOk) {
    console.error(`Échec email interne pour le devis ${quote.id}:`,
      internalResult.status === "fulfilled" ? internalResult.value.error : internalResult.reason);
  }
  if (ackResult.status === "rejected" || ackResult.value.error) {
    console.error(`Échec accusé de réception pour le devis ${quote.id}:`,
      ackResult.status === "fulfilled" ? ackResult.value.error : ackResult.reason);
  }

  if (internalOk) {
    return prisma.quoteRequest.update({ where: { id: quote.id }, data: { emailSent: true } });
  }
  return quote;
}
