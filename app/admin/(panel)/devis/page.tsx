import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, Search } from "lucide-react";
import { Badge, EmptyState, PageHeader } from "@/components/admin/PageHeader";
import { buttonPrimaryClass, buttonSecondaryClass, cardClass, inputClass, tableHeadClass } from "@/components/admin/styles";
import { quoteOrigin, serviceLabel } from "@/lib/emails/quote";
import { prisma } from "@/lib/prisma";
import { filtersToQuery, quoteWhere, readQuoteFilters } from "@/lib/quote-filters";
import { QUOTE_STATUSES, quoteStatus } from "@/lib/quote-status";
import { QUOTE_SERVICE_LABELS } from "@/lib/services";
import { requireAdminPage } from "@/lib/session";

export const metadata: Metadata = { title: "Demandes de devis" };

const PAGE_SIZE = 25;

export default async function QuotesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdminPage("quotes");
  const params = await searchParams;
  const filters = readQuoteFilters(params);
  const page = Math.max(1, Number(params.page) || 1);
  const where = quoteWhere(filters);

  const [quotes, total, byStatus] = await Promise.all([
    prisma.quoteRequest.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE }),
    prisma.quoteRequest.count({ where }),
    prisma.quoteRequest.groupBy({ by: ["status"], where: quoteWhere({ ...filters, status: undefined }), _count: { _all: true } }),
  ]);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const countFor = (status?: string) =>
    byStatus.filter((s) => !status || s.status === status).reduce((sum, s) => sum + s._count._all, 0);
  const hasFilters = Boolean(filters.q || filters.service || filters.source);

  const tab = (active: boolean) =>
    `inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${
      active ? "bg-neutral-950 font-medium text-white" : "text-neutral-600 hover:bg-white hover:text-neutral-950"
    }`;

  return (
    <>
      <PageHeader
        eyebrow="Suivi"
        title="Demandes de devis"
        description={`${total} demande${total > 1 ? "s" : ""}${hasFilters || filters.status ? " correspondant aux filtres" : ""}`}
        actions={
          <a href={`/api/admin/devis/export${filtersToQuery(filters)}`} className={buttonSecondaryClass}>
            <Download className="h-4 w-4" /> Exporter en CSV
          </a>
        }
      />

      {/* Onglets par statut */}
      <nav aria-label="Filtrer par statut" className="-mx-1 mb-4 flex gap-1 overflow-x-auto px-1 pb-1">
        <Link href={`/admin/devis${filtersToQuery({ ...filters, status: undefined })}`} className={tab(!filters.status)}>
          Toutes <span className="tabular-nums opacity-50">{countFor()}</span>
        </Link>
        {QUOTE_STATUSES.map((s) => (
          <Link key={s.value} href={`/admin/devis${filtersToQuery({ ...filters, status: s.value })}`} className={tab(filters.status === s.value)}>
            {s.label} <span className="tabular-nums opacity-50">{countFor(s.value)}</span>
          </Link>
        ))}
      </nav>

      {/* Recherche et filtres */}
      <form className={`${cardClass} mb-4 grid gap-3 p-3 sm:grid-cols-2 lg:grid-cols-[1fr_200px_200px_auto]`}>
        {filters.status && <input type="hidden" name="status" value={filters.status} />}
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input name="q" defaultValue={filters.q} placeholder="Nom, email, téléphone, entreprise…" aria-label="Rechercher" className={`${inputClass} pl-11`} />
        </div>
        <select name="service" defaultValue={filters.service ?? ""} aria-label="Service" className={inputClass}>
          <option value="">Tous les services</option>
          {Object.entries(QUOTE_SERVICE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select name="source" defaultValue={filters.source ?? ""} aria-label="Provenance" className={inputClass}>
          <option value="">Toutes provenances</option>
          <option value="ads">Google Ads</option>
          <option value="autre">Hors Google Ads</option>
        </select>
        <div className="flex gap-2">
          <button type="submit" className={`${buttonPrimaryClass} h-auto flex-1 lg:flex-none`}>Filtrer</button>
          {hasFilters && (
            <Link href={`/admin/devis${filtersToQuery({ status: filters.status })}`} className={`${buttonSecondaryClass} h-auto`}>
              Effacer
            </Link>
          )}
        </div>
      </form>

      {quotes.length === 0 ? (
        <EmptyState>Aucune demande ne correspond.</EmptyState>
      ) : (
        <div className={`${cardClass} overflow-x-auto`}>
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className={tableHeadClass}>
              <tr className="border-b border-neutral-100">
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-4 py-4 font-medium">Service</th>
                <th className="px-4 py-4 font-medium">Provenance</th>
                <th className="px-4 py-4 font-medium">Statut</th>
                <th className="px-6 py-4 text-right font-medium">Reçue le</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {quotes.map((q) => {
                const st = quoteStatus(q.status);
                return (
                  <tr key={q.id} className="group relative transition-colors hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      {/* Lien étendu à toute la ligne */}
                      <Link href={`/admin/devis/${q.id}`} className="font-medium text-neutral-950 after:absolute after:inset-0">
                        {q.name}
                      </Link>
                      <div className="mt-0.5 text-xs text-neutral-400">{q.phone} · {q.email}</div>
                    </td>
                    <td className="px-4 py-4 text-neutral-600">{serviceLabel(q.service)}</td>
                    <td className="px-4 py-4 text-neutral-600">{quoteOrigin(q)}</td>
                    <td className="px-4 py-4"><Badge className={st.badge}>{st.label}</Badge></td>
                    <td className="whitespace-nowrap px-6 py-4 text-right tabular-nums text-neutral-500">
                      {q.createdAt.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {pages > 1 && (
        <nav className="mt-6 flex items-center justify-between text-sm" aria-label="Pagination">
          <span className="text-neutral-500">Page {page} sur {pages}</span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link className={buttonSecondaryClass} href={`/admin/devis${filtersToQuery(filters, { page: String(page - 1) })}`}>
                <ArrowLeft className="h-4 w-4" /> Précédente
              </Link>
            )}
            {page < pages && (
              <Link className={buttonSecondaryClass} href={`/admin/devis${filtersToQuery(filters, { page: String(page + 1) })}`}>
                Suivante <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
