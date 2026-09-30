import "server-only";
import { prisma } from "@/lib/prisma";

export const ARTICLES_PER_PAGE = 9;

export function getPublishedRealisations(limit?: number) {
  return prisma.realisation.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" }, // dernières ajoutées en premier
    take: limit,
    include: { cover: true, images: { orderBy: { position: "asc" }, take: 1, include: { media: true } } },
  });
}

export function getRealisationBySlug(slug: string) {
  return prisma.realisation.findFirst({
    where: { slug, published: true },
    include: { cover: true, images: { orderBy: { position: "asc" }, include: { media: true } } },
  });
}

export async function getPublishedArticles(page = 1) {
  const where = { status: "PUBLIE" as const };
  const [items, total] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * ARTICLES_PER_PAGE,
      take: ARTICLES_PER_PAGE,
      select: { id: true, title: true, slug: true, excerpt: true, category: true, publishedAt: true, cover: true },
    }),
    prisma.article.count({ where }),
  ]);
  return { items, total, pages: Math.max(1, Math.ceil(total / ARTICLES_PER_PAGE)) };
}

export function getArticleBySlug(slug: string) {
  return prisma.article.findFirst({ where: { slug, status: "PUBLIE" }, include: { cover: true } });
}

export function getPublishedTestimonials(limit = 6) {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: [{ position: "asc" }, { createdAt: "desc" }],
    take: limit,
  });
}

// Image à afficher pour une réalisation : couverture, sinon première photo
export function realisationThumb(r: { cover: { path: string; alt: string | null; width: number; height: number } | null; images: { media: { path: string; alt: string | null; width: number; height: number } }[] }) {
  return r.cover ?? r.images[0]?.media ?? null;
}
