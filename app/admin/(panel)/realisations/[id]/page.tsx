import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHeader, secondaryLinkClass } from "@/components/admin/PageHeader";
import { RealisationForm } from "@/components/admin/RealisationForm";
import { DeleteButton } from "@/components/admin/ui";
import { mediaUrl } from "@/lib/media-url";
import { prisma } from "@/lib/prisma";
import { deleteRealisation, saveRealisation } from "../actions";

export const metadata: Metadata = { title: "Modifier la réalisation" };

export default async function EditRealisationPage({ params, searchParams }: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
}) {
  const { id } = await params;
  const { created } = await searchParams;
  const r = await prisma.realisation.findUnique({
    where: { id },
    include: { cover: true, images: { orderBy: { position: "asc" }, include: { media: true } } },
  });
  if (!r) notFound();

  return (
    <>
      <PageHeader
        back={{ href: "/admin/realisations", label: "Toutes les réalisations" }}
        title={r.title}
        description={created ? "Réalisation créée." : undefined}
        actions={
          <>
            {r.published && <a href={`/realisations/${r.slug}`} target="_blank" rel="noopener noreferrer" className={secondaryLinkClass}>Voir sur le site <ArrowUpRight className="h-4 w-4" /></a>}
            <DeleteButton action={deleteRealisation.bind(null, r.id)} confirmText="Supprimer cette réalisation ? Les images restent dans la médiathèque." />
          </>
        }
      />
      <RealisationForm
        action={saveRealisation.bind(null, r.id)}
        values={{
          title: r.title,
          slug: r.slug,
          location: r.location ?? "",
          service: r.service,
          description: r.description,
          completedAt: r.completedAt ? r.completedAt.toISOString().slice(0, 10) : "",
          published: r.published,
          cover: r.cover ? { id: r.cover.id, url: mediaUrl(r.cover)! } : null,
          images: r.images.map((img) => ({ mediaId: img.mediaId, url: mediaUrl(img.media)!, kind: img.kind })),
        }}
      />
    </>
  );
}
