import type { Prisma } from "@/lib/generated/prisma/client";
import { QUOTE_STATUSES } from "@/lib/quote-status";
import { QUOTE_SERVICE_LABELS } from "@/lib/services";

export type QuoteFilters = { q?: string; status?: string; service?: string; source?: string };

export function readQuoteFilters(params: Record<string, string | string[] | undefined>): QuoteFilters {
  const get = (k: string) => (typeof params[k] === "string" ? (params[k] as string).trim() : undefined) || undefined;
  return { q: get("q")?.slice(0, 100), status: get("status"), service: get("service"), source: get("source") };
}

// Les valeurs inconnues sont ignorées (jamais passées telles quelles à Prisma)
export function quoteWhere(f: QuoteFilters): Prisma.QuoteRequestWhereInput {
  const where: Prisma.QuoteRequestWhereInput = {};
  const status = QUOTE_STATUSES.find((s) => s.value === f.status);
  if (status) where.status = status.value;
  if (f.service && f.service in QUOTE_SERVICE_LABELS) where.service = f.service;
  if (f.source === "ads") where.gclid = { not: null };
  if (f.source === "autre") where.gclid = null;
  if (f.q) {
    where.OR = [
      { name: { contains: f.q } },
      { email: { contains: f.q } },
      { phone: { contains: f.q } },
      { company: { contains: f.q } },
    ];
  }
  return where;
}

export function filtersToQuery(f: QuoteFilters, extra: Record<string, string> = {}) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries({ ...f, ...extra })) if (v) params.set(k, v);
  const s = params.toString();
  return s ? `?${s}` : "";
}
