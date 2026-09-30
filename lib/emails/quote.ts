import type { QuoteRequest } from "@/lib/generated/prisma/client";
import { QUOTE_SERVICE_LABELS, type QuoteService } from "@/lib/services";
import { EMAIL, PHONE_DISPLAY, SITE_URL } from "@/lib/site";

export function serviceLabel(service: string) {
  return QUOTE_SERVICE_LABELS[service as QuoteService] ?? service;
}

export function quoteOrigin(quote: Pick<QuoteRequest, "gclid" | "utmSource">) {
  if (quote.gclid) return "Google Ads";
  return quote.utmSource ?? "Direct / naturel";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function attributionRows(quote: QuoteRequest): [string, string][] {
  const rows: [string, string | null][] = [
    ["Source", quote.utmSource],
    ["Support", quote.utmMedium],
    ["Campagne", quote.utmCampaign],
    ["Mot-clé", quote.utmTerm],
    ["Annonce", quote.utmContent],
    ["GCLID (Google Ads)", quote.gclid],
    ["Page d'arrivée", quote.landingPage],
    ["Site référent", quote.referrer],
  ];
  return rows.filter((r): r is [string, string] => Boolean(r[1]));
}

// Email interne envoyé à GD Couverture pour chaque nouvelle demande
export function internalQuoteEmail(quote: QuoteRequest) {
  const label = serviceLabel(quote.service);
  const origin = quoteOrigin(quote);
  const rows = attributionRows(quote);

  const subject = `[Demande de devis${origin === "Google Ads" ? " · Google Ads" : ""}] ${quote.name} - ${label}`;

  const html = `
    <h2>Nouvelle demande de devis</h2>
    <p><strong>Nom complet :</strong> ${escapeHtml(quote.name)}</p>
    <p><strong>Email du client :</strong> <a href="mailto:${escapeHtml(quote.email)}">${escapeHtml(quote.email)}</a></p>
    <p><strong>Téléphone :</strong> ${escapeHtml(quote.phone)}</p>
    <p><strong>Entreprise :</strong> ${escapeHtml(quote.company || "—")}</p>
    <p><strong>Service souhaité :</strong> ${escapeHtml(label)}</p>
    <h3>Message du client</h3>
    <p>${escapeHtml(quote.message).replace(/\n/g, "<br>")}</p>
    <h3>Provenance</h3>
    <p><strong>Origine :</strong> ${escapeHtml(origin)}</p>
    ${rows.map(([k, v]) => `<p><strong>${escapeHtml(k)} :</strong> ${escapeHtml(v)}</p>`).join("\n    ")}
    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
    <p style="color: #666; font-size: 12px;">Pour répondre directement au client, utilisez l'adresse : <a href="mailto:${escapeHtml(quote.email)}">${escapeHtml(quote.email)}</a></p>
  `;

  const text = `
Nouvelle demande de devis

Nom complet : ${quote.name}
Email du client : ${quote.email}
Téléphone : ${quote.phone}
Entreprise : ${quote.company || "—"}
Service souhaité : ${label}

Message du client :
${quote.message}

Provenance
Origine : ${origin}
${rows.map(([k, v]) => `${k} : ${v}`).join("\n")}

---
Pour répondre directement au client, utilisez l'adresse : ${quote.email}
  `.trim();

  return { subject, html, text };
}

// Accusé de réception envoyé au client
export function customerAckEmail(quote: QuoteRequest) {
  const label = serviceLabel(quote.service);
  const subject = "Nous avons bien reçu votre demande de devis - GD Couverture";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; color: #333;">
      <h2 style="color: #f39c12;">Merci ${escapeHtml(quote.name)} !</h2>
      <p>Nous avons bien reçu votre demande de devis pour <strong>${escapeHtml(label)}</strong>.</p>
      <p>Notre équipe l'étudie et vous recontacte sous <strong>24 heures ouvrées</strong>.</p>
      <h3 style="font-size: 15px;">Récapitulatif de votre message</h3>
      <p style="background: #f7f7f7; padding: 12px; border-radius: 8px;">${escapeHtml(quote.message).replace(/\n/g, "<br>")}</p>
      <p>Pour toute urgence, appelez-nous au <a href="tel:${PHONE_DISPLAY.replace(/\s/g, "")}">${PHONE_DISPLAY}</a>.</p>
      <p>L'équipe GD Couverture<br /><a href="${SITE_URL}">${SITE_URL.replace(/^https?:\/\//, "")}</a></p>
    </div>
  `;

  const text = `
Merci ${quote.name} !

Nous avons bien reçu votre demande de devis pour : ${label}.
Notre équipe l'étudie et vous recontacte sous 24 heures ouvrées.

Récapitulatif de votre message :
${quote.message}

Pour toute urgence : ${PHONE_DISPLAY} / ${EMAIL}

L'équipe GD Couverture
${SITE_URL}
  `.trim();

  return { subject, html, text };
}
