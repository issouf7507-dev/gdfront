import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonPrimaryClass, buttonSecondaryClass, cardClass } from "./styles";

export function PageHeader({ title, description, eyebrow, back, actions }: {
  title: string;
  description?: React.ReactNode;
  eyebrow?: string;
  back?: { href: string; label: string };
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      {back && (
        <Link href={back.href} className="group mb-5 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-950">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          {back.label}
        </Link>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          {eyebrow && (
            <p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl font-medium tracking-tight text-neutral-950 md:text-4xl">{title}</h1>
          {description && <p className="mt-2 text-neutral-500">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

// Bloc blanc avec titre facultatif
export function Panel({ title, description, actions, className = "", bodyClassName = "p-6", children }: {
  title?: React.ReactNode;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`${cardClass} ${className}`}>
      {(title || actions) && (
        <div className="flex flex-wrap items-start justify-between gap-3 px-6 pt-6">
          <div>
            {title && <h2 className="text-lg font-medium tracking-tight text-neutral-950">{title}</h2>}
            {description && <p className="mt-1 text-sm text-neutral-500">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

export function EmptyState({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-3xl border border-dashed border-neutral-300 px-6 py-16 text-center">
      <p className="text-neutral-500">{children}</p>
      {action}
    </div>
  );
}

// Pastille de statut : `className` porte les couleurs (bg / text / dot via currentColor)
export function Badge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export const publishedBadge = "bg-emerald-50 text-emerald-700";
export const draftBadge = "bg-neutral-100 text-neutral-500";

// Compatibilité avec les anciens imports
export const buttonLinkClass = buttonPrimaryClass;
export const secondaryLinkClass = buttonSecondaryClass;
