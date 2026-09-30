import type { Metadata } from "next";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { PageHeader } from "@/components/admin/PageHeader";
import { saveArticle } from "../actions";

export const metadata: Metadata = { title: "Nouvel article" };

export default function NewArticlePage() {
  return (
    <>
      <PageHeader back={{ href: "/admin/articles", label: "Tous les articles" }} title="Nouvel article" />
      <ArticleForm
        action={saveArticle.bind(null, null)}
        values={{ title: "", slug: "", excerpt: "", content: "", category: "", seoTitle: "", seoDescription: "", status: "BROUILLON", cover: null }}
      />
    </>
  );
}
