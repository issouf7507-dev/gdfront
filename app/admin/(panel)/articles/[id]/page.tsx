import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { PageHeader, secondaryLinkClass } from "@/components/admin/PageHeader";
import { DeleteButton } from "@/components/admin/ui";
import { mediaUrl } from "@/lib/media-url";
import { prisma } from "@/lib/prisma";
import { deleteArticle, saveArticle } from "../actions";

export const metadata: Metadata = { title: "Modifier l'article" };

export default async function EditArticlePage({ params, searchParams }: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
}) {
  const { id } = await params;
  const { created } = await searchParams;
  const a = await prisma.article.findUnique({ where: { id }, include: { cover: true } });
  if (!a) notFound();

  return (
    <>
      <PageHeader
        back={{ href: "/admin/articles", label: "Tous les articles" }}
        title={a.title}
        description={created ? "Article créé." : a.publishedAt ? `Publié le ${a.publishedAt.toLocaleDateString("fr-FR")}` : "Brouillon"}
        actions={
          <>
            {a.status === "PUBLIE" && <a href={`/blog/${a.slug}`} target="_blank" rel="noopener noreferrer" className={secondaryLinkClass}>Voir sur le site <ArrowUpRight className="h-4 w-4" /></a>}
            <DeleteButton action={deleteArticle.bind(null, a.id)} confirmText="Supprimer définitivement cet article ?" />
          </>
        }
      />
      <ArticleForm
        action={saveArticle.bind(null, a.id)}
        values={{
          title: a.title,
          slug: a.slug,
          excerpt: a.excerpt ?? "",
          content: a.content,
          category: a.category ?? "",
          seoTitle: a.seoTitle ?? "",
          seoDescription: a.seoDescription ?? "",
          status: a.status,
          cover: a.cover ? { id: a.cover.id, url: mediaUrl(a.cover)! } : null,
        }}
      />
    </>
  );
}
