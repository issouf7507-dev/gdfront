import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { Badge, EmptyState, PageHeader, draftBadge, publishedBadge } from "@/components/admin/PageHeader";
import { buttonPrimaryClass, cardClass } from "@/components/admin/styles";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Avis clients" };

export default async function TestimonialsPage() {
  const items = await prisma.testimonial.findMany({ orderBy: [{ position: "asc" }, { createdAt: "desc" }] });

  const newButton = (
    <Link href="/admin/avis/new" className={buttonPrimaryClass}>
      <Plus className="h-4 w-4" /> Nouvel avis
    </Link>
  );

  return (
    <>
      <PageHeader eyebrow="Contenu du site" title="Avis clients" description="Témoignages affichés sur la page d'accueil." actions={newButton} />
      {items.length === 0 ? (
        <EmptyState action={newButton}>Aucun avis pour l&apos;instant.</EmptyState>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((t) => (
            <li key={t.id}>
              <Link href={`/admin/avis/${t.id}`} className={`${cardClass} flex h-full flex-col p-6 transition-colors hover:border-neutral-950`}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex gap-0.5" role="img" aria-label={`${t.rating} sur 5`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-brand text-brand" : "text-neutral-200"}`} />
                    ))}
                  </div>
                  <Badge className={t.published ? publishedBadge : draftBadge}>{t.published ? "Affiché" : "Masqué"}</Badge>
                </div>
                <blockquote className="mt-5 line-clamp-4 flex-1 leading-relaxed text-neutral-700">« {t.content} »</blockquote>
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-neutral-100 pt-4 text-sm">
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-neutral-950">{t.name}</span>
                    {t.role && <span className="block truncate text-neutral-500">{t.role}</span>}
                  </span>
                  <span className="shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-xs tabular-nums text-neutral-500" title="Ordre d'affichage">
                    #{t.position}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
