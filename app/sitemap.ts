import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { serviceLandings } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/contact", priority: 0.8 },
    { path: "/realisations", priority: 0.8 },
    { path: "/blog", priority: 0.7 },
    { path: "/a-propos", priority: 0.7 },
    { path: "/mentions-legales", priority: 0.2 },
    { path: "/confidentialite", priority: 0.2 },
  ];

  const [realisations, articles] = await Promise.all([
    prisma.realisation.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.article.findMany({ where: { status: "PUBLIE" }, select: { slug: true, updatedAt: true } }),
  ]);

  return [
    ...pages.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...serviceLandings.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...realisations.map((r) => ({
      url: `${SITE_URL}/realisations/${r.slug}`,
      lastModified: r.updatedAt,
      priority: 0.6,
    })),
    ...articles.map((a) => ({
      url: `${SITE_URL}/blog/${a.slug}`,
      lastModified: a.updatedAt,
      priority: 0.6,
    })),
  ];
}
