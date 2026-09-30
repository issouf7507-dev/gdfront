import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { Badge, EmptyState, PageHeader, draftBadge, publishedBadge } from "@/components/admin/PageHeader";
import { buttonPrimaryClass, cardClass, tableHeadClass } from "@/components/admin/styles";
import { mediaUrl } from "@/lib/media-url";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Articles" };

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, status: true, category: true, publishedAt: true, updatedAt: true, cover: true },
  });

  const newButton = (
    <Link href="/admin/articles/new" className={buttonPrimaryClass}>
      <Plus className="h-4 w-4" /> Nouvel article
    </Link>
  );

  return (
    <>
      <PageHeader eyebrow="Contenu du site" title="Articles" description="Actualités et conseils publiés sur le blog." actions={newButton} />
      {articles.length === 0 ? (
        <EmptyState action={newButton}>Aucun article pour l&apos;instant.</EmptyState>
      ) : (
        <div className={`${cardClass} overflow-x-auto`}>
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className={tableHeadClass}>
              <tr className="border-b border-neutral-100">
                <th className="px-6 py-4 font-medium">Titre</th>
                <th className="px-4 py-4 font-medium">Catégorie</th>
                <th className="px-4 py-4 font-medium">Statut</th>
                <th className="px-6 py-4 text-right font-medium">Modifié le</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {articles.map((a) => (
                <tr key={a.id} className="relative transition-colors hover:bg-neutral-50">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-neutral-100 text-neutral-300">
                        {a.cover ? (
                          // eslint-disable-next-line @next/next/no-img-element -- vignette admin
                          <img src={mediaUrl(a.cover)!} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <FileText className="h-5 w-5" />
                        )}
                      </span>
                      {/* Lien étendu à toute la ligne */}
                      <Link href={`/admin/articles/${a.id}`} className="font-medium text-neutral-950 after:absolute after:inset-0">
                        {a.title}
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{a.category ?? "—"}</td>
                  <td className="px-4 py-3">
                    <Badge className={a.status === "PUBLIE" ? publishedBadge : draftBadge}>{a.status === "PUBLIE" ? "Publié" : "Brouillon"}</Badge>
                  </td>
                  <td className="px-6 py-3 text-right tabular-nums text-neutral-500">{a.updatedAt.toLocaleDateString("fr-FR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
