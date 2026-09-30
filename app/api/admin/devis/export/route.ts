import { withErrorHandling } from "@/lib/api-handler";
import { quoteOrigin, serviceLabel } from "@/lib/emails/quote";
import { prisma } from "@/lib/prisma";
import { quoteWhere, readQuoteFilters } from "@/lib/quote-filters";
import { quoteStatus } from "@/lib/quote-status";
import { requireAdmin } from "@/lib/session";

// Échappement CSV + neutralisation des formules (=, +, -, @) pour Excel
function cell(value: string | null | undefined) {
  let v = value ?? "";
  if (/^[=+\-@\t\r]/.test(v)) v = `'${v}`;
  return `"${v.replace(/"/g, '""')}"`;
}

export const GET = withErrorHandling(async (req) => {
  await requireAdmin("quotes");
  const filters = readQuoteFilters(Object.fromEntries(new URL(req.url).searchParams));
  const quotes = await prisma.quoteRequest.findMany({ where: quoteWhere(filters), orderBy: { createdAt: "desc" }, take: 10000 });

  const header = ["Date", "Nom", "Email", "Téléphone", "Entreprise", "Service", "Statut", "Origine", "Campagne", "Mot-clé", "Message", "Notes"];
  const rows = quotes.map((q) => [
    q.createdAt.toISOString(), q.name, q.email, q.phone, q.company, serviceLabel(q.service),
    quoteStatus(q.status).label, quoteOrigin(q), q.utmCampaign, q.utmTerm, q.message, q.notes,
  ]);
  // Point-virgule + BOM : ouverture directe dans Excel en français
  const csv = "﻿" + [header, ...rows].map((r) => r.map(cell).join(";")).join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="devis-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
});
