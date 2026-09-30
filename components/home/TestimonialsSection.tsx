import { Quote, Star } from "lucide-react";
import { getPublishedTestimonials } from "@/lib/content";
import { Reveal, RevealItem } from "./motion";

type Testimonial = Awaited<ReturnType<typeof getPublishedTestimonials>>[number];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full w-[340px] shrink-0 flex-col rounded-3xl bg-neutral-100 p-7 md:w-[400px]">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex gap-0.5" role="img" aria-label={`Note : ${t.rating} sur 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-brand text-brand" : "text-neutral-300"}`} />
          ))}
        </div>
        <Quote className="h-7 w-7 text-neutral-200" />
      </div>
      <blockquote className="flex-1 text-[15px] leading-relaxed text-neutral-700">« {t.content} »</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/15 text-sm font-semibold text-brand-dark">
          {t.name.charAt(0).toUpperCase()}
        </span>
        <span>
          <span className="block font-semibold text-neutral-950">{t.name}</span>
          {t.role && <span className="block text-xs text-neutral-500">{t.role}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

export async function TestimonialsSection() {
  const testimonials = await getPublishedTestimonials();
  if (testimonials.length === 0) return null;
  // Défilement continu seulement s'il y a assez d'avis pour remplir la largeur
  const marquee = testimonials.length >= 3;

  return (
    <section className="overflow-hidden bg-white py-20 md:py-28">
      <Reveal className="mx-auto mb-12 max-w-7xl px-6 md:mb-16 md:px-8">
        <RevealItem>
          <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Avis clients
          </p>
          <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-neutral-950 md:text-4xl">
            Ils nous font confiance<span className="text-brand">.</span>
          </h2>
        </RevealItem>
      </Reveal>

      {marquee ? (
        <div className="group relative motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {/* Deux copies identiques (pr-4 = gap) : translateX(-50%) boucle sans à-coup */}
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[false, true].map((copy) => (
              <div key={String(copy)} aria-hidden={copy || undefined} className="flex gap-4 pr-4">
                {testimonials.map((t) => (
                  <TestimonialCard key={t.id} t={t} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto flex max-w-7xl flex-wrap gap-4 px-6 md:px-8">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>
      )}
    </section>
  );
}
