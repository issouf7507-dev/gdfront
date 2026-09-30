import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { RealisationsGrid, type RealisationItem } from "@/components/RealisationsGrid";
import { CtaSection } from "@/components/home/CtaSection";
import { Reveal, RevealItem } from "@/components/home/motion";
import { getPublishedRealisations, realisationThumb } from "@/lib/content";
import { serviceLabel } from "@/lib/emails/quote";
import { mediaUrl } from "@/lib/media-url";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Nos réalisations",
  description: "Chantiers de couverture, étanchéité, ravalement et rénovation réalisés par GD Couverture à Abidjan : photos avant / après.",
  alternates: { canonical: "/realisations" },
};

export default async function RealisationsPage() {
  const realisations = await getPublishedRealisations();
  const items: RealisationItem[] = realisations.map((r) => {
    const thumb = realisationThumb(r);
    return {
      id: r.id,
      slug: r.slug,
      title: r.title,
      service: r.service,
      serviceLabel: serviceLabel(r.service),
      location: r.location,
      image: thumb ? { src: mediaUrl(thumb)!, alt: thumb.alt ?? r.title } : null,
    };
  });

  return (
    <div className="bg-white">
      <PageHero
        eyebrow="Réalisations"
        title={
          <>
            Nos chantiers, du toit aux fondations<span className="text-brand">.</span>
          </>
        }
        subtitle="Toitures, façades, terrasses : un aperçu de nos interventions à Abidjan et partout en Côte d'Ivoire."
        image="/img/gdcouverture-19.webp"
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <RevealItem>
              <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Portfolio
              </p>
              <h2 className="text-3xl font-medium leading-tight tracking-tight text-neutral-950 md:text-4xl">
                {items.length > 0 ? `${items.length} projet${items.length > 1 ? "s" : ""} à découvrir` : "Nos réalisations arrivent bientôt"}
              </h2>
            </RevealItem>
          </Reveal>

          {items.length === 0 ? (
            <p className="rounded-3xl bg-neutral-100 px-6 py-16 text-center text-neutral-500">
              Nous publions très vite nos premiers chantiers. En attendant, parlez-nous de votre projet.
            </p>
          ) : (
            <RealisationsGrid items={items} />
          )}
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
