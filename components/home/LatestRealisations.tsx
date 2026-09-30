import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getPublishedRealisations, realisationThumb } from "@/lib/content";
import { mediaUrl } from "@/lib/media-url";
import { QuoteButton, Reveal, RevealItem } from "./motion";

type Realisation = Awaited<ReturnType<typeof getPublishedRealisations>>[number];

function Tile({ r, className, sizes }: { r: Realisation; className: string; sizes: string }) {
  const image = realisationThumb(r);
  return (
    <Link href={`/realisations/${r.slug}`} className={`group relative block overflow-hidden rounded-3xl bg-neutral-900 ${className}`}>
      {image && (
        <Image
          src={mediaUrl(image)!}
          alt={image.alt ?? r.title}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-transparent to-transparent" />
      <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100">
        <ArrowUpRight className="h-5 w-5" />
      </span>
      <div className="absolute inset-x-5 bottom-5 text-white">
        <h3 className="font-medium underline decoration-white/40 underline-offset-4">{r.title}</h3>
        {r.location && <p className="mt-1 text-xs text-white/70">{r.location}</p>}
      </div>
    </Link>
  );
}

// Mosaïque éditoriale : intro + 1 chantier | 2 chantiers empilés | 1 grand chantier.
// Sans 4e réalisation, la case libre devient une invitation à demander un devis.
export async function LatestRealisations() {
  const realisations = await getPublishedRealisations(4);
  if (realisations.length === 0) return null;
  const [tall, mid1, mid2, extra] = realisations;

  const allLink = (
    <Link
      href="/realisations"
      className="group flex h-14 items-center justify-center gap-2 rounded-full border border-neutral-300 text-[15px] font-medium text-neutral-950 transition-colors hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
    >
      Voir tous les projets
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );

  return (
    <section className="bg-white py-20 md:py-28">
      <Reveal className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-2 md:px-8 lg:grid-cols-3">
        {/* Colonne 1 : intro + chantier (ou appel à l'action) */}
        <div className="flex flex-col gap-4">
          <RevealItem className="pb-4 lg:pb-8 lg:pr-6">
            <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Réalisations
            </p>
            <h2 className="text-3xl font-medium leading-tight tracking-tight text-neutral-950 md:text-4xl">
              Nos chantiers, du toit aux fondations.
            </h2>
            <p className="mt-5 leading-relaxed text-neutral-500">
              Toitures, façades, terrasses : un aperçu de nos interventions récentes à Abidjan et partout en Côte d&apos;Ivoire.
            </p>
          </RevealItem>
          <RevealItem className="flex-1">
            {extra ? (
              <Tile r={extra} className="aspect-[4/3] h-full lg:aspect-auto lg:min-h-[280px]" sizes="(max-width: 768px) 100vw, 33vw" />
            ) : (
              <div className="flex h-full min-h-[240px] flex-col justify-between rounded-3xl bg-neutral-950 p-7 text-white">
                <p className="text-2xl font-medium leading-snug">
                  Votre projet sera le prochain<span className="text-brand">.</span>
                </p>
                <QuoteButton className="group flex w-fit cursor-pointer items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 text-sm font-medium text-neutral-950 transition-colors hover:bg-brand hover:text-white">
                  Demander un devis
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </QuoteButton>
              </div>
            )}
          </RevealItem>
        </div>

        {/* Colonne 2 : deux chantiers empilés */}
        {(mid1 || mid2) && (
          <div className="flex flex-col gap-4">
            {[mid1, mid2].filter(Boolean).map((r) => (
              <RevealItem key={r.id} className="flex-1">
                <Tile r={r} className="aspect-[4/3] h-full md:aspect-auto md:min-h-[300px]" sizes="(max-width: 768px) 100vw, 33vw" />
              </RevealItem>
            ))}
          </div>
        )}

        {/* Colonne 3 : grand chantier + lien */}
        <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
          <RevealItem className="flex-1">
            <Tile r={tall} className="aspect-[4/3] h-full md:aspect-[16/9] lg:aspect-auto lg:min-h-[520px]" sizes="(max-width: 1024px) 100vw, 33vw" />
          </RevealItem>
          <RevealItem>{allLink}</RevealItem>
        </div>
      </Reveal>
    </section>
  );
}
