import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/home/CtaSection";
import { Reveal, RevealItem } from "@/components/home/motion";
import { services, specialties } from "@/lib/services";

const eyebrow = "mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400";
const h2 = "text-3xl font-medium leading-tight tracking-tight text-neutral-950 md:text-4xl";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className={eyebrow}>
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </p>
  );
}

// Lien vers la page du service, où le formulaire de devis est déjà présélectionné
function QuoteLink({ slug }: { slug: string }) {
  return (
    <Link
      href={`/services/${slug}#devis`}
      className="group inline-flex h-12 items-center gap-3 rounded-full bg-neutral-950 pl-6 pr-1.5 text-sm font-medium text-white transition-colors hover:bg-brand"
    >
      Demander un devis
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand transition-colors group-hover:bg-white/20">
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
      </span>
    </Link>
  );
}

function DetailsLink({ slug }: { slug: string }) {
  return (
    <Link href={`/services/${slug}`} className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-950">
      <span className="border-b border-neutral-950 pb-0.5">En savoir plus</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export default function ServicesPage() {
  const all = [...services, ...specialties];

  return (
    <div className="bg-white">
      <PageHero
        eyebrow="Nos services"
        title={
          <>
            Tous nos métiers, un seul interlocuteur<span className="text-brand">.</span>
          </>
        }
        subtitle="Couverture, étanchéité, plomberie, façades, peinture, rénovation et travaux en hauteur à Abidjan et partout en Côte d'Ivoire."
        image="/img/gdcouverture-13.webp"
      />

      {/* Sommaire */}
      <nav aria-label="Sommaire des services" className="mx-auto max-w-7xl px-6 pt-12 md:px-8 md:pt-16">
        <ul className="flex flex-wrap gap-2">
          {all.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-700 transition-colors hover:border-neutral-950 hover:text-neutral-950"
              >
                <s.icon className="h-4 w-4 text-brand" />
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Métiers */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl space-y-24 px-6 md:space-y-32 md:px-8">
          {services.map((s, i) => (
            <article key={s.id} id={s.id} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20">
              <Reveal className={i % 2 === 1 ? "lg:order-last" : ""}>
                <RevealItem>
                  <Link href={`/services/${s.id}`} className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-100">
                    <Image
                      src={s.images[0]}
                      alt={s.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-950 backdrop-blur">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </RevealItem>
              </Reveal>

              <Reveal>
                <RevealItem>
                  <Eyebrow>{s.subtitle}</Eyebrow>
                  <h2 className={h2}>{s.title}</h2>
                  <p className="mt-5 max-w-lg leading-relaxed text-neutral-500">{s.description}</p>
                </RevealItem>
                <RevealItem>
                  <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[15px] text-neutral-700">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </RevealItem>
                <RevealItem className="mt-10 flex flex-wrap items-center gap-6">
                  <QuoteLink slug={s.id} />
                  <DetailsLink slug={s.id} />
                </RevealItem>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      {/* Spécialités */}
      <section className="px-3 pb-3 md:px-6 md:pb-6">
        <div className="mx-auto max-w-[1400px] rounded-[28px] bg-neutral-100 px-6 py-20 md:rounded-[36px] md:px-14 md:py-28">
          <Reveal className="mb-12 max-w-2xl md:mb-16">
            <RevealItem>
              <Eyebrow>Nos spécialités</Eyebrow>
              <h2 className={h2}>Des solutions sur mesure pour les besoins spécifiques.</h2>
            </RevealItem>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {specialties.map((s) => (
              <Reveal key={s.id}>
                <RevealItem>
                  <article id={s.id} className="flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl bg-white">
                    <div className="relative aspect-[16/9] bg-neutral-200">
                      <Image src={s.image} alt={s.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col p-8 md:p-10">
                      <h3 className="text-2xl font-medium tracking-tight text-neutral-950">{s.title}</h3>
                      <p className="mt-2 text-neutral-500">{s.subtitle}</p>

                      {"advantages" in s && s.advantages && (
                        <ul className="mt-6 flex flex-wrap gap-2">
                          {s.advantages.map((a) => (
                            <li key={a} className="rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-neutral-950">
                              {a}
                            </li>
                          ))}
                        </ul>
                      )}

                      <ul className="mt-8 space-y-3">
                        {s.services.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-[15px] text-neutral-700">
                            <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      {"note" in s && s.note && <p className="mt-6 text-sm text-neutral-400">{s.note}</p>}

                      <div className="mt-auto flex flex-wrap items-center gap-6 pt-10">
                        <QuoteLink slug={s.id} />
                        <DetailsLink slug={s.id} />
                      </div>
                    </div>
                  </article>
                </RevealItem>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
