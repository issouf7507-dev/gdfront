import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { getArticleBySlug } from "@/lib/content";
import { mediaUrl } from "@/lib/media-url";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a) return {};
  const description = a.seoDescription ?? a.excerpt ?? undefined;
  return {
    title: a.seoTitle ?? a.title,
    description,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.seoTitle ?? a.title,
      description,
      publishedTime: a.publishedAt?.toISOString(),
      images: a.cover ? [{ url: mediaUrl(a.cover)! }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.excerpt ?? undefined,
    datePublished: a.publishedAt?.toISOString(),
    dateModified: a.updatedAt.toISOString(),
    image: a.cover ? `${SITE_URL}${mediaUrl(a.cover)}` : undefined,
    mainEntityOfPage: `${SITE_URL}/blog/${a.slug}`,
    publisher: { "@type": "Organization", name: "GD Couverture CI", logo: `${SITE_URL}/img/logo_GDCCI.png` },
  };

  return (
    <article className="min-h-screen bg-white pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHero title={a.title} image={a.cover ? mediaUrl(a.cover)! : undefined} />

      <div className="mx-auto max-w-3xl px-6 pt-10">
        <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#f39c12]">
          <ArrowLeft className="h-4 w-4" /> Tous les articles
        </Link>
        <p className="mb-6 text-sm text-gray-500">
          {a.category && <span className="font-medium text-[#f39c12]">{a.category} · </span>}
          {a.publishedAt?.toLocaleDateString("fr-FR", { dateStyle: "long" })}
        </p>
        {a.excerpt && <p className="mb-10 text-lg leading-relaxed text-gray-600">{a.excerpt}</p>}
      </div>

      {/* HTML nettoyé à l'enregistrement (lib/sanitize.ts) */}
      <div
        className="prose prose-lg mx-auto max-w-3xl px-6 prose-headings:text-gray-900 prose-a:text-[#d68910] prose-img:rounded-2xl"
        dangerouslySetInnerHTML={{ __html: a.content }}
      />

      <div className="mx-auto mt-16 max-w-3xl px-6">
        <div className="rounded-2xl bg-[#f9f9f9] p-8 text-center">
          <h2 className="mb-2 text-xl font-bold text-gray-900">Besoin d&apos;un professionnel ?</h2>
          <p className="mb-6 text-sm text-gray-600">Devis gratuit, réponse sous 24 heures ouvrées.</p>
          <Link href="/contact" className="inline-block rounded-full bg-[#f39c12] px-8 py-3 text-sm text-white transition-colors hover:bg-[#d68910]">
            Demander un devis
          </Link>
        </div>
      </div>
    </article>
  );
}
