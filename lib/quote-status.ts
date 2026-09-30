import type { QuoteStatus } from "@/lib/generated/prisma/enums";

export const QUOTE_STATUSES: { value: QuoteStatus; label: string; badge: string }[] = [
  { value: "NOUVEAU", label: "Nouveau", badge: "bg-brand/10 text-[#b9730b]" },
  { value: "CONTACTE", label: "Contacté", badge: "bg-sky-50 text-sky-700" },
  { value: "DEVIS_ENVOYE", label: "Devis envoyé", badge: "bg-violet-50 text-violet-700" },
  { value: "GAGNE", label: "Gagné", badge: "bg-emerald-50 text-emerald-700" },
  { value: "PERDU", label: "Perdu", badge: "bg-neutral-100 text-neutral-500" },
];

export function quoteStatus(value: QuoteStatus) {
  return QUOTE_STATUSES.find((s) => s.value === value) ?? QUOTE_STATUSES[0];
}
