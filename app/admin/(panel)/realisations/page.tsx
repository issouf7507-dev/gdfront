import type { Metadata } from "next";
import Link from "next/link";
import { ImageOff, Images, MapPin, Plus } from "lucide-react";
import { Badge, EmptyState, PageHeader, draftBadge, publishedBadge } from "@/components/admin/PageHeader";
import { buttonPrimaryClass, cardClass } from "@/components/admin/styles";
import { serviceLabel } from "@/lib/emails/quote";
import { mediaUrl } from "@/lib/media-url";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Réalisations" };

export default async function RealisationsPage() {
  const items = await prisma.realisation.findMany({
    orderBy: { createdAt: "desc" },
    include: { cover: true, _count: { select: { images: true } } },
  });

  const newButton = (
    <Link href="/admin/realisations/new" className={buttonPrimaryClass}>
      <Plus className="h-4 w-4" /> Nouvelle réalisation
    </Link>
  );

  return (
    <>
      <PageHeader
        eyebrow="Contenu du site"
        title="Réalisations"
        description="Chantiers présentés sur la page Réalisations et l'accueil."
        actions={newButton}
      />
      {items.length === 0 ? (
        <EmptyState action={newButton}>Aucune réalisation pour l&apos;instant.</EmptyState>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((r) => (
            <li key={r.id}>
              <Link href={`/admin/realisations/${r.id}`} className={`${cardClass} group block overflow-hidden p-2 transition-colors hover:border-neutral-950`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-neutral-100">
                  {r.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element -- vignette admin
                    <img src={mediaUrl(r.cover)!} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-sm text-neutral-400">
                      <ImageOff className="h-6 w-6" /> Pas d&apos;image
                    </div>
                  )}
                  <span className="absolute left-3 top-3">
                    <Badge className={r.published ? publishedBadge : draftBadge}>
                      {r.published ? "Publiée" : "Brouillon"}
                    </Badge>
                  </span>
                </div>
                <div className="px-3 pb-3 pt-4">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">{serviceLabel(r.service)}</p>
                  <h2 className="mt-1.5 truncate font-medium text-neutral-950">{r.title}</h2>
                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
                    {r.location && (
                      <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {r.location}</span>
                    )}
                    <span className="inline-flex items-center gap-1.5">
                      <Images className="h-3.5 w-3.5" /> {r._count.images} photo{r._count.images > 1 ? "s" : ""}
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
