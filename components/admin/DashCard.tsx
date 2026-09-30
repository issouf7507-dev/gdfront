import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Carte du tableau de bord : un cadre gris clair qui porte le titre et l'action,
// et un contenu blanc en relief (même principe que les dashboards shadcn).
export function DashCard({ title, action, className = "", bodyClassName = "p-5", children }: {
  title?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`flex flex-col rounded-3xl bg-neutral-200/50 p-1.5 ring-1 ring-neutral-950/5 ${className}`}>
      {(title || action) && (
        <div className="flex min-h-12 flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5">
          {title && <h2 className="text-sm font-medium text-neutral-950">{title}</h2>}
          {action}
        </div>
      )}
      <div className={`flex-1 rounded-[20px] bg-white shadow-xs ring-1 ring-neutral-950/5 ${bodyClassName}`}>{children}</div>
    </section>
  );
}

// Variation en pourcentage, en pastille (hausse en vert, baisse en rouge)
export function TrendBadge({ value, suffix = "%" }: { value: number | null; suffix?: string }) {
  if (value === null) return null;
  const up = value >= 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums ring-1 ring-inset ${
        up ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-red-50 text-red-700 ring-red-200"
      }`}
    >
      <span aria-hidden="true">{up ? "↑" : "↓"}</span>
      <span className="sr-only">{up ? "Hausse de" : "Baisse de"}</span>
      {Math.abs(value)}
      {suffix}
    </span>
  );
}

export function MoreLink({ href, children = "Voir plus" }: { href: string; children?: React.ReactNode }) {
  return (
    <Link href={href} className="group flex items-center justify-between text-xs text-neutral-500 transition-colors hover:text-neutral-950">
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

// Barre de progression fine, une seule série
export function Meter({ value, max, className = "bg-neutral-950" }: { value: number; max: number; className?: string }) {
  const pct = max > 0 ? Math.max((value / max) * 100, value > 0 ? 2 : 0) : 0;
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
      <div className={`h-full rounded-full ${className}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
