import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { getRealisationBySlug, realisationThumb } from "@/lib/content";
import { serviceLabel } from "@/lib/emails/quote";
import { mediaUrl } from "@/lib/media-url";
import { getServiceLanding } from "@/lib/services";

export const revalidate = 3600;

// Aucune page générée au build : chaque réalisation est rendue à la première visite puis mise en cache
export function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ slug: string }> };

function PhotoFigure({ label, media, fallbackAlt }: {
  label: string;
  media?: { path: string; alt: string | null };
  fallbackAlt: string;
}) {
  if (!media) return <div className="hidden sm:block" />;
  return (
    <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
      <Image src={mediaUrl(media)!} alt={media.alt ?? `${fallbackAlt} - ${label}`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
      <figcaption className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">{label}</figcaption>
    </figure>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = await getRealisationBySlug(slug);
  if (!r) return {};
  const thumb = realisationThumb(r);
  const description = r.description.slice(0, 160);
  return {
    title: `${r.title}${r.location ? ` à ${r.location}` : ""}`,
    description,
    alternates: { canonical: `/realisations/${r.slug}` },
    openGraph: { title: r.title, description, images: thumb ? [{ url: mediaUrl(thumb)! }] : undefined },
  };
}

export default async function RealisationPage({ params }: Props) {
  const { slug } = await params;
  const r = await getRealisationBySlug(slug);
  if (!r) notFound();

  const before = r.images.filter((i) => i.kind === "AVANT");
  const after = r.images.filter((i) => i.kind === "APRES");
  const gallery = r.images.filter((i) => i.kind === "GALERIE");
  const pairs = Array.from({ length: Math.max(before.length, after.length) }, (_, i) => [before[i], after[i]] as const);
  const thumb = realisationThumb(r);
  const landing = getServiceLanding(r.service);

  return (
    <div className="min-h-screen bg-white">
      <PageHero title={r.title} subtitle={serviceLabel(r.service)} image={thumb ? mediaUrl(thumb)! : undefined} />

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <Link href="/realisations" className="mb-8 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#f39c12]">
            <ArrowLeft className="h-4 w-4" /> Toutes nos réalisations
          </Link>
          <div className="mb-6 flex flex-wrap gap-4 text-sm text-gray-500">
            {r.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-[#f39c12]" /> {r.location}</span>}
            {r.completedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-[#f39c12]" /> {r.completedAt.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
              </span>
            )}
          </div>
          <p className="whitespace-pre-line text-base leading-relaxed text-gray-700">{r.description}</p>

          {pairs.length > 0 && (
            <div className="mt-12 space-y-8">
              <h2 className="text-2xl font-bold text-[#f39c12]">Avant / après</h2>
              {pairs.map(([b, a], i) => (
                <div key={i} className="grid gap-4 sm:grid-cols-2">
                  <PhotoFigure label="Avant" media={b?.media} fallbackAlt={r.title} />
                  <PhotoFigure label="Après" media={a?.media} fallbackAlt={r.title} />
                </div>
              ))}
            </div>
          )}

          {gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-[#f39c12]">Photos du chantier</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {gallery.map((img) => (
                  <div key={img.id} className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                    <Image src={mediaUrl(img.media)!} alt={img.media.alt ?? r.title} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 rounded-2xl bg-[#f9f9f9] p-8 text-center">
            <h2 className="mb-2 text-xl font-bold text-gray-900">Vous avez un projet similaire ?</h2>
            <p className="mb-6 text-sm text-gray-600">Devis gratuit, réponse sous 24 heures ouvrées.</p>
            <Link
              href={landing ? `/services/${landing.slug}#devis` : "/contact"}
              className="inline-block rounded-full bg-[#f39c12] px-8 py-3 text-sm text-white transition-colors hover:bg-[#d68910]"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
