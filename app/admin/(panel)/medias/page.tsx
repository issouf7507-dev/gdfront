import type { Metadata } from "next";
import { MediaLibrary } from "@/components/admin/MediaLibrary";
import { PageHeader } from "@/components/admin/PageHeader";
import { mediaUrl } from "@/lib/media-url";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Médiathèque" };

export default async function MediaPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    take: 300,
    include: { _count: { select: { realisationCovers: true, realisationImages: true, articleCovers: true } } },
  });

  const items = media.map((m) => ({
    id: m.id,
    url: mediaUrl(m)!,
    alt: m.alt,
    width: m.width,
    height: m.height,
    originalName: m.originalName,
    size: m.size,
    usage: m._count.realisationCovers + m._count.realisationImages + m._count.articleCovers,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Contenu du site"
        title="Médiathèque"
        description="Images converties automatiquement en WebP (2000 px max). Ajoutez une description pour le référencement."
      />
      <MediaLibrary items={items} />
    </>
  );
}
