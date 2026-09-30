import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/home/CtaSection";
import { Reveal, RevealItem } from "@/components/home/motion";
import { getPublishedArticles } from "@/lib/content";
import { mediaUrl } from "@/lib/media-url";

export const revalidate = 3600;

type Props = { searchParams: Promise<{ page?: string }> };
type Article = Awaited<ReturnType<typeof getPublishedArticles>>["items"][number];

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const page = Math.max(1, Number((await searchParams).page) || 1);
  return {
    title: page > 1 ? `Blog - page ${page}` : "Blog : conseils toiture et bâtiment",
    description: "Conseils d'experts sur la couverture, l'étanchéité, l'entretien et la rénovation de vos bâtiments en Côte d'Ivoire.",
    alternates: { canonical: page > 1 ? `/blog?page=${page}` : "/blog" },
  };
}

const pageHref = (p: number) => (p === 1 ? "/blog" : `/blog?page=${p}`);

function Meta({ a, light = false }: { a: Article; light?: boolean }) {
  const date = a.publishedAt?.toLocaleDateString("fr-FR", { dateStyle: "long" });
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${light ? "text-white/70" : "text-neutral-400"}`}>
      {a.category && (
        <span className={`flex items-center gap-2 font-medium ${light ? "text-white" : "text-neutral-950"}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {a.category}
        </span>
      )}
      {date && <time dateTime={a.publishedAt!.toISOString()}>{date}</time>}
    </p>
  );
}

// Premier article de la page 1, mis en avant
function Featured({ a }: { a: Article }) {
  return (
    <Link href={`/blog/${a.slug}`} className="group grid overflow-hidden rounded-3xl bg-neutral-100 lg:grid-cols-[1.3fr_1fr]">
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200 lg:aspect-auto lg:min-h-[420px]">
        {a.cover && (
          <Image
            src={mediaUrl(a.cover)!}
            alt={a.cover.alt ?? a.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority
          />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-950 backdrop-blur">
          À la une
        </span>
      </div>
      <div className="flex flex-col p-8 md:p-10">
        <Meta a={a} />
        <h2 className="mt-4 text-2xl font-medium leading-tight tracking-tight text-neutral-950 md:text-3xl">{a.title}</h2>
        {a.excerpt && <p className="mt-4 line-clamp-4 leading-relaxed text-neutral-500">{a.excerpt}</p>}
        <span className="mt-auto inline-flex items-center gap-3 pt-8 text-sm font-medium text-neutral-950">
          Lire l&apos;article
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-white transition-colors group-hover:bg-brand">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </span>
      </div>
    </Link>
  );
}

function Card({ a }: { a: Article }) {
  return (
    <Link href={`/blog/${a.slug}`} className="group flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-100">
        {a.cover && (
          <Image
            src={mediaUrl(a.cover)!}
            alt={a.cover.alt ?? a.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
      </div>
      <div className="mt-5">
        <Meta a={a} />
        <h3 className="mt-3 text-lg font-medium leading-snug text-neutral-950 transition-colors group-hover:text-brand">{a.title}</h3>
        {a.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-500">{a.excerpt}</p>}
      </div>
    </Link>
  );
}

function Pagination({ page, pages }: { page: number; pages: number }) {
  const arrow = "flex h-12 w-12 items-center justify-center rounded-full border transition-colors";
  return (
    <nav className="mt-16 flex items-center justify-center gap-2" aria-label="Pagination">
      {page > 1 ? (
        <Link href={pageHref(page - 1)} aria-label="Page précédente" className={`${arrow} border-neutral-300 text-neutral-950 hover:border-neutral-950`}>
          <ArrowLeft className="h-5 w-5" />
        </Link>
      ) : (
        <span className={`${arrow} border-neutral-200 text-neutral-300`} aria-hidden="true">
          <ArrowLeft className="h-5 w-5" />
        </span>
      )}
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={pageHref(p)}
          aria-current={p === page ? "page" : undefined}
          className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-medium transition-colors ${
            p === page ? "bg-neutral-950 text-white" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
          }`}
        >
          {p}
        </Link>
      ))}
      {page < pages ? (
        <Link href={pageHref(page + 1)} aria-label="Page suivante" className={`${arrow} border-neutral-950 bg-neutral-950 text-white hover:border-brand hover:bg-brand`}>
          <ArrowRight className="h-5 w-5" />
        </Link>
      ) : (
        <span className={`${arrow} border-neutral-200 text-neutral-300`} aria-hidden="true">
          <ArrowRight className="h-5 w-5" />
        </span>
      )}
    </nav>
  );
}

export default async function BlogPage({ searchParams }: Props) {
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const { items, pages } = await getPublishedArticles(page);
  if (page > 1 && items.length === 0) notFound();
  const featured = page === 1 ? items[0] : undefined;
  const rest = featured ? items.slice(1) : items;

  return (
    <div className="bg-white">
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Conseils &amp; actualités<span className="text-brand">.</span>
          </>
        }
        subtitle="Le savoir-faire de nos équipes pour entretenir, protéger et rénover vos bâtiments en Côte d'Ivoire."
        image="/img/gdcouverture-20.webp"
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          {items.length === 0 ? (
            <p className="rounded-3xl bg-neutral-100 px-6 py-16 text-center text-neutral-500">
              Nos premiers articles arrivent bientôt.
            </p>
          ) : (
            <>
              {featured && (
                <Reveal className="mb-16 md:mb-20">
                  <RevealItem>
                    <Featured a={featured} />
                  </RevealItem>
                </Reveal>
              )}

              {rest.length > 0 && (
                <>
                  <Reveal className="mb-10">
                    <RevealItem>
                      <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                        {page === 1 ? "Derniers articles" : `Page ${page}`}
                      </p>
                    </RevealItem>
                  </Reveal>
                  <Reveal className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((a) => (
                      <RevealItem key={a.id}>
                        <Card a={a} />
                      </RevealItem>
                    ))}
                  </Reveal>
                </>
              )}

              {pages > 1 && <Pagination page={page} pages={pages} />}
            </>
          )}
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
