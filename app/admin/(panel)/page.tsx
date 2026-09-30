import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ImageOff, Plus, Star } from "lucide-react";
import { DashCard, Meter, MoreLink, TrendBadge } from "@/components/admin/DashCard";
import { MonthlyQuotesChart, type MonthPoint } from "@/components/admin/MonthlyQuotesChart";
import { Badge, draftBadge, publishedBadge } from "@/components/admin/PageHeader";
import { buttonSecondaryClass, tableHeadClass } from "@/components/admin/styles";
import { serviceLabel } from "@/lib/emails/quote";
import { mediaUrl } from "@/lib/media-url";
import { prisma } from "@/lib/prisma";
import { QUOTE_STATUSES, quoteStatus } from "@/lib/quote-status";
import { requireAdminPage } from "@/lib/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Tableau de bord" };

const MONTHS = 6;

// Périodes de comparaison, calculées à chaque requête (page dynamique)
function periods() {
  const now = new Date();
  return {
    now,
    thisMonth: new Date(now.getFullYear(), now.getMonth(), 1),
    lastMonth: new Date(now.getFullYear(), now.getMonth() - 1, 1),
    chartStart: new Date(now.getFullYear(), now.getMonth() - (MONTHS - 1), 1),
    since90: new Date(now.getTime() - 90 * 24 * 3600 * 1000),
  };
}

const rtf = new Intl.RelativeTimeFormat("fr", { numeric: "auto" });

function timeAgo(date: Date, now: Date) {
  const minutes = Math.round((date.getTime() - now.getTime()) / 60000);
  if (minutes > -60) return rtf.format(minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (hours > -24) return rtf.format(hours, "hour");
  const days = Math.round(hours / 24);
  if (days > -7) return rtf.format(days, "day");
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join("");
}

const pct = (part: number, total: number) => (total ? Math.round((part / total) * 100) : 0);

function Kpi({ title, value, badge, hint, href }: {
  title: string;
  value: string | number;
  badge?: React.ReactNode;
  hint?: string;
  href: string;
}) {
  return (
    <DashCard title={title}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-3xl font-medium tabular-nums tracking-tight text-neutral-950">{value}</span>
        {badge}
      </div>
      {hint && <p className="mt-1 text-xs text-neutral-400">{hint}</p>}
      <div className="my-4 h-px bg-neutral-100" />
      <MoreLink href={href} />
    </DashCard>
  );
}

export default async function DashboardPage() {
  const { now, thisMonth, lastMonth, chartStart, since90 } = periods();
  const session = await requireAdminPage("quotes"); // les éditeurs arrivent sur les réalisations

  const [
    monthCount, lastMonthCount, adsMonth, byStatus, byService, bySource, adsCount90, total90,
    chartRows, recent, totalQuotes, testimonials, recentRealisations, content,
  ] = await Promise.all([
    prisma.quoteRequest.count({ where: { createdAt: { gte: thisMonth } } }),
    prisma.quoteRequest.count({ where: { createdAt: { gte: lastMonth, lt: thisMonth } } }),
    prisma.quoteRequest.count({ where: { createdAt: { gte: thisMonth }, gclid: { not: null } } }),
    prisma.quoteRequest.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.quoteRequest.groupBy({ by: ["service"], where: { createdAt: { gte: since90 } }, _count: { _all: true } }),
    prisma.quoteRequest.groupBy({ by: ["utmSource"], where: { createdAt: { gte: since90 }, gclid: null }, _count: { _all: true } }),
    prisma.quoteRequest.count({ where: { createdAt: { gte: since90 }, gclid: { not: null } } }),
    prisma.quoteRequest.count({ where: { createdAt: { gte: since90 } } }),
    prisma.quoteRequest.findMany({ where: { createdAt: { gte: chartStart } }, select: { createdAt: true, gclid: true } }),
    prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.quoteRequest.count(),
    prisma.testimonial.findMany({ orderBy: [{ position: "asc" }, { createdAt: "desc" }], select: { name: true, role: true, content: true, rating: true, published: true } }),
    prisma.realisation.findMany({ orderBy: { createdAt: "desc" }, take: 4, include: { cover: true } }),
    Promise.all([
      prisma.realisation.count({ where: { published: true } }),
      prisma.article.count({ where: { status: "PUBLIE" } }),
    ]),
  ]);

  // Indicateurs
  const statusCount = (s: string) => byStatus.find((b) => b.status === s)?._count._all ?? 0;
  const newCount = statusCount("NOUVEAU");
  const won = statusCount("GAGNE");
  const lost = statusCount("PERDU");
  const closed = won + lost;
  const monthTrend = lastMonthCount ? Math.round(((monthCount - lastMonthCount) / lastMonthCount) * 100) : null;

  // Histogramme : 6 derniers mois
  const months: MonthPoint[] = Array.from({ length: MONTHS }, (_, i) => {
    const d = new Date(chartStart.getFullYear(), chartStart.getMonth() + i, 1);
    return {
      label: d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", ""),
      fullLabel: d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
      ads: 0,
      other: 0,
    };
  });
  for (const q of chartRows) {
    const i = (q.createdAt.getFullYear() - chartStart.getFullYear()) * 12 + q.createdAt.getMonth() - chartStart.getMonth();
    if (months[i]) months[i][q.gclid ? "ads" : "other"]++;
  }
  const chartAds = months.reduce((s, m) => s + m.ads, 0);
  const chartOther = months.reduce((s, m) => s + m.other, 0);

  // Répartitions (90 jours)
  const services = byService.map((s) => ({ label: serviceLabel(s.service), value: s._count._all })).sort((a, b) => b.value - a.value);
  const sources = [
    { label: "Google Ads", value: adsCount90 },
    ...bySource.map((s) => ({ label: s.utmSource ?? "Direct / naturel", value: s._count._all })),
  ].filter((s) => s.value > 0).sort((a, b) => b.value - a.value);

  // Avis clients
  const published = testimonials.filter((t) => t.published);
  const avgRating = published.length ? published.reduce((s, t) => s + t.rating, 0) / published.length : 0;
  const ratingRows = [5, 4, 3, 2, 1].map((r) => ({ rating: r, count: published.filter((t) => t.rating === r).length }));
  const featured = published[0];

  const firstName = (session.user.name || "").split(" ")[0];
  const today = now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Accueil + indicateurs */}
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
        <DashCard className="lg:col-span-4" bodyClassName="relative overflow-hidden bg-neutral-950! p-6 text-white">
          {/* Halo décoratif */}
          <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/30 blur-3xl" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-10 h-40 w-40 rounded-full border border-white/10" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">{today}</p>
            <h1 className="mt-3 text-2xl font-medium tracking-tight">{firstName ? `Bonjour ${firstName}` : "Bonjour"}</h1>
            <p className="mt-1 text-sm text-white/60">
              {newCount > 0 ? "Des clients attendent votre réponse." : "Toutes les demandes ont été traitées."}
            </p>
            <div className="mt-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-5xl font-medium tabular-nums tracking-tight">{newCount}</p>
                <p className="mt-1 text-xs text-white/50">demande{newCount > 1 ? "s" : ""} à traiter</p>
              </div>
              <Link
                href="/admin/devis?status=NOUVEAU"
                className="group inline-flex h-10 items-center gap-2 rounded-full bg-white pl-4 pr-1.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-brand hover:text-white"
              >
                Traiter
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-950 text-white">
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </Link>
            </div>
          </div>
        </DashCard>

        <div className="grid gap-4 md:grid-cols-3 lg:col-span-8 lg:gap-6">
          <Kpi
            title="Devis ce mois-ci"
            value={monthCount}
            badge={<TrendBadge value={monthTrend} />}
            hint={lastMonthCount ? `${lastMonthCount} le mois dernier` : "Premier mois de suivi"}
            href="/admin/devis"
          />
          <Kpi
            title="Via Google Ads"
            value={adsMonth}
            hint={monthCount ? `${pct(adsMonth, monthCount)} % des demandes du mois` : "Aucune demande ce mois-ci"}
            href="/admin/devis?source=ads"
          />
          <Kpi
            title="Taux de devis gagnés"
            value={closed ? `${pct(won, closed)} %` : "—"}
            hint={`${won} gagné${won > 1 ? "s" : ""} sur ${closed} clôturé${closed > 1 ? "s" : ""}`}
            href="/admin/devis?status=GAGNE"
          />
        </div>
      </div>

      {/* Graphique + suivi */}
      <div className="grid gap-4 lg:gap-6 xl:grid-cols-[1.4fr_1fr]">
        <DashCard
          title="Demandes par mois"
          action={
            <div className="flex items-center gap-5">
              <div className="flex items-baseline gap-2">
                <span className="text-xs uppercase tracking-wider text-neutral-400">Ads</span>
                <span className="text-lg font-medium leading-none tabular-nums">{chartAds}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs uppercase tracking-wider text-neutral-400">Autres</span>
                <span className="text-lg font-medium leading-none tabular-nums">{chartOther}</span>
              </div>
            </div>
          }
          bodyClassName="p-5 pt-6"
        >
          <MonthlyQuotesChart data={months} />
        </DashCard>

        <DashCard title="Suivi des demandes" action={<span className="text-xs text-neutral-400">{totalQuotes} au total</span>}>
          <ul className="space-y-5">
            {QUOTE_STATUSES.map((s) => {
              const count = statusCount(s.value);
              return (
                <li key={s.value}>
                  <Link href={`/admin/devis?status=${s.value}`} className="group block space-y-2">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <Badge className={s.badge}>{s.label}</Badge>
                      <span className="tabular-nums text-neutral-500 transition-colors group-hover:text-neutral-950">
                        <span className="font-medium text-neutral-950">{count}</span>
                        <span className="ml-1.5 text-xs">{pct(count, totalQuotes)} %</span>
                      </span>
                    </div>
                    <Meter value={count} max={totalQuotes} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </DashCard>
      </div>

      {/* Répartitions + avis */}
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6 xl:grid-cols-12">
        <DashCard className="xl:col-span-4" title="Par service" action={<span className="text-xs text-neutral-400">90 jours · {total90}</span>}>
          <SplitList items={services} total={total90} />
        </DashCard>
        <DashCard className="xl:col-span-3" title="Par provenance" action={<span className="text-xs text-neutral-400">90 jours</span>}>
          <SplitList items={sources} total={total90} />
        </DashCard>
        <DashCard
          className="lg:col-span-2 xl:col-span-5"
          title="Avis clients"
          action={<Link href="/admin/avis" className={`${buttonSecondaryClass} h-8 px-3 text-xs`}>Tout voir</Link>}
        >
          {published.length === 0 ? (
            <p className="py-10 text-center text-sm text-neutral-400">Aucun avis affiché sur le site.</p>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
                <div className="flex flex-col items-center gap-1.5 sm:px-4">
                  <Stars rating={Math.round(avgRating)} size="h-5 w-5" />
                  <p className="text-3xl font-medium tabular-nums tracking-tight">{avgRating.toFixed(1).replace(".", ",")}</p>
                  <p className="text-xs text-neutral-400">sur 5 · {published.length} avis</p>
                </div>
                <ul className="space-y-2">
                  {ratingRows.map((r) => (
                    <li key={r.rating} className="flex items-center gap-3 text-sm">
                      <span className="w-8 shrink-0 tabular-nums text-neutral-600">{r.rating} ★</span>
                      <Meter value={r.count} max={published.length} className="bg-brand" />
                      <span className="w-6 shrink-0 text-right tabular-nums text-neutral-400">{r.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {featured && (
                <figure className="mt-6 rounded-2xl bg-neutral-50 p-4 ring-1 ring-neutral-950/5">
                  <Stars rating={featured.rating} size="h-3.5 w-3.5" />
                  <blockquote className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">« {featured.content} »</blockquote>
                  <figcaption className="mt-2 text-xs">
                    <span className="font-medium text-neutral-950">{featured.name}</span>
                    {featured.role && <span className="text-neutral-400"> · {featured.role}</span>}
                  </figcaption>
                </figure>
              )}
            </>
          )}
        </DashCard>
      </div>

      {/* Tableaux */}
      <div className="grid gap-4 lg:gap-6 xl:grid-cols-12">
        <DashCard
          className="xl:col-span-7"
          title="Dernières demandes"
          action={<Link href="/admin/devis" className={`${buttonSecondaryClass} h-8 px-3 text-xs`}>Tout voir</Link>}
          bodyClassName="flex flex-col overflow-hidden"
        >
          {recent.length === 0 ? (
            <p className="py-12 text-center text-sm text-neutral-400">Aucune demande pour l&apos;instant.</p>
          ) : (
            <>
              <div className="flex-1 overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className={tableHeadClass}>
                    <tr className="border-b border-neutral-100">
                      <th className="h-10 px-5 font-medium">Client</th>
                      <th className="h-10 px-3 font-medium">Service</th>
                      <th className="h-10 px-3 font-medium">Statut</th>
                      <th className="h-10 px-5 text-right font-medium">Reçue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {recent.map((q) => {
                      const st = quoteStatus(q.status);
                      return (
                        <tr key={q.id} className="relative transition-colors hover:bg-neutral-50">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-medium text-neutral-700 ring-1 ring-neutral-950/5">
                                {initials(q.name)}
                              </span>
                              <Link href={`/admin/devis/${q.id}`} className="truncate font-medium text-neutral-950 after:absolute after:inset-0">
                                {q.name}
                              </Link>
                            </div>
                          </td>
                          <td className="px-3 py-3 text-neutral-500">{serviceLabel(q.service)}</td>
                          <td className="px-3 py-3"><Badge className={st.badge}>{st.label}</Badge></td>
                          <td className="whitespace-nowrap px-5 py-3 text-right text-neutral-400">{timeAgo(q.createdAt, now)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="border-t border-neutral-100 px-5 py-3 text-xs tabular-nums text-neutral-400">
                {recent.length} sur {totalQuotes} demande{totalQuotes > 1 ? "s" : ""}
              </p>
            </>
          )}
        </DashCard>

        <DashCard
          className="xl:col-span-5"
          title="Contenu du site"
          action={
            <Link href="/admin/realisations/new" className={`${buttonSecondaryClass} h-8 px-3 text-xs`}>
              <Plus className="h-3.5 w-3.5" /> Réalisation
            </Link>
          }
          bodyClassName="flex flex-col overflow-hidden"
        >
          <div className="grid grid-cols-2 divide-x divide-neutral-100 border-b border-neutral-100">
            <Link href="/admin/realisations" className="px-5 py-4 transition-colors hover:bg-neutral-50">
              <p className="text-2xl font-medium tabular-nums tracking-tight">{content[0]}</p>
              <p className="text-xs text-neutral-400">réalisations publiées</p>
            </Link>
            <Link href="/admin/articles" className="px-5 py-4 transition-colors hover:bg-neutral-50">
              <p className="text-2xl font-medium tabular-nums tracking-tight">{content[1]}</p>
              <p className="text-xs text-neutral-400">articles publiés</p>
            </Link>
          </div>
          {recentRealisations.length === 0 ? (
            <p className="py-10 text-center text-sm text-neutral-400">Aucune réalisation pour l&apos;instant.</p>
          ) : (
            <ul className="flex-1 divide-y divide-neutral-100">
              {recentRealisations.map((r) => (
                <li key={r.id}>
                  <Link href={`/admin/realisations/${r.id}`} className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-neutral-50">
                    <span className="flex h-10 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-100 text-neutral-300">
                      {r.cover ? (
                        // eslint-disable-next-line @next/next/no-img-element -- vignette admin
                        <img src={mediaUrl(r.cover)!} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <ImageOff className="h-4 w-4" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-neutral-950">{r.title}</span>
                      <span className="block truncate text-xs text-neutral-400">{serviceLabel(r.service)}</span>
                    </span>
                    <Badge className={r.published ? publishedBadge : draftBadge}>{r.published ? "Publiée" : "Brouillon"}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <a
            href="https://analytics.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between border-t border-neutral-100 px-5 py-3 text-xs text-neutral-500 transition-colors hover:text-neutral-950"
          >
            Visites du site : ouvrir Google Analytics
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
          </a>
        </DashCard>
      </div>
    </div>
  );
}

function SplitList({ items, total }: { items: { label: string; value: number }[]; total: number }) {
  if (items.length === 0) return <p className="py-10 text-center text-sm text-neutral-400">Aucune demande sur la période.</p>;
  const max = Math.max(...items.map((i) => i.value));
  return (
    <ul className="space-y-5">
      {items.map((item) => (
        <li key={item.label} className="space-y-2">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="truncate text-neutral-700">{item.label}</span>
            <span className="shrink-0 tabular-nums">
              <span className="font-medium text-neutral-950">{item.value}</span>
              <span className="ml-1.5 text-xs text-neutral-400">{pct(item.value, total)} %</span>
            </span>
          </div>
          <Meter value={item.value} max={max} className="bg-brand" />
        </li>
      ))}
    </ul>
  );
}

function Stars({ rating, size }: { rating: number; size: string }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${rating} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`${size} ${i < rating ? "fill-brand text-brand" : "text-neutral-200"}`} />
      ))}
    </span>
  );
}
