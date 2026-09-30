import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, HardHat, Home, ShieldCheck, Wallet, Wrench } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/home/CtaSection";
import { CountUp, QuoteButton, Reveal, RevealItem } from "@/components/home/motion";
import { serviceLandings } from "@/lib/services";

// Uniquement des chiffres vérifiables (mêmes que sur l'accueil) — ne pas inventer de statistiques.
const STATS = [
  { value: 25, suffix: "+", label: "années d'expérience dans le bâtiment" },
  { value: 2010, suffix: "", label: "création de notre maison mère en France", noCount: true },
  { value: 100, suffix: "+", label: "clients accompagnés en Côte d'Ivoire" },
  { value: serviceLandings.length, suffix: "", label: "métiers maîtrisés en interne" },
];

const PILLARS = [
  { icon: ShieldCheck, title: "Sécurité", text: "De vos installations comme de nos équipes, sur chaque intervention." },
  { icon: HardHat, title: "Qualité", text: "Des prestations soignées et des matériaux adaptés au climat ivoirien." },
  { icon: Wallet, title: "Maîtrise des coûts", text: "Le meilleur rapport entre investissement et durabilité." },
];

const AUDIENCE = [
  { icon: Building2, title: "Entreprises & institutions", text: "Sièges, sites industriels, bâtiments publics." },
  { icon: Home, title: "Particuliers", text: "Villas et résidences moyen et haut standing." },
  { icon: Wrench, title: "Travaux ponctuels ou récurrents", text: "Interventions à la demande ou contrats de maintenance." },
];

const VALUES = [
  {
    title: "Rigueur",
    text: "Des standards élevés dans chaque intervention, le respect des normes et un engagement qualité sur tous nos chantiers.",
  },
  {
    title: "Réactivité",
    text: "Une présence terrain pour répondre rapidement à vos besoins, même en urgence ou dans des situations complexes.",
  },
  {
    title: "Proximité",
    text: "Un interlocuteur unique pour plusieurs corps de métiers : des échanges simplifiés et des travaux cohérents.",
  },
];

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

function Photo({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-neutral-100 ${className}`}>
      <Image src={src} alt="" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="À propos"
        title={
          <>
            Qui sommes-nous<span className="text-brand">?</span>
          </>
        }
        subtitle="Une entreprise BTP multi-services dédiée à l'enveloppe du bâtiment et à la maintenance technique, en Côte d'Ivoire."
        image="/img/qui-somme.webp"
      />

      {/* Présentation */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <RevealItem>
              <Eyebrow>Notre histoire</Eyebrow>
              <h2 className={h2}>Votre partenaire BTP multi-services pour l&apos;enveloppe du bâtiment.</h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 max-w-lg leading-relaxed text-neutral-500">
                Adossée à une maison mère en France créée en 2010, GD Couverture bénéficie de plus de 25 ans d&apos;expérience dans le bâtiment. Notre expertise couvre l&apos;enveloppe globale du bâtiment et la maintenance technique, avec une approche multi-services qui simplifie vos projets.
              </p>
              <p className="mt-4 max-w-lg leading-relaxed text-neutral-500">
                Notre force : la rigueur de nos standards, notre réactivité terrain et un principe simple, un interlocuteur unique pour plusieurs corps de métiers. Vous gagnez en efficacité, nous assurons la cohérence de vos travaux.
              </p>
            </RevealItem>
          </Reveal>

          <Reveal className="grid grid-cols-2 gap-x-8 gap-y-12 self-center">
            {STATS.map((s) => (
              <RevealItem key={s.label} className="border-t border-neutral-200 pt-6 text-center sm:text-left">
                <p className="text-5xl font-medium tracking-tight text-neutral-950 md:text-6xl">
                  {s.noCount ? s.value : <CountUp to={s.value} suffix={s.suffix} />}
                </p>
                <p className="mt-3 text-sm leading-snug text-neutral-500">{s.label}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className="px-3 md:px-6">
        <div className="mx-auto max-w-[1400px] rounded-[28px] bg-neutral-100 px-6 py-20 md:rounded-[36px] md:px-14 md:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <RevealItem>
                <Eyebrow>Notre mission</Eyebrow>
                <h2 className={h2}>
                  Protéger, valoriser et prolonger la vie de vos bâtiments<span className="text-brand">.</span>
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-6 max-w-lg leading-relaxed text-neutral-500">
                  Trois piliers guident chacune de nos interventions, du diagnostic à la réception des travaux.
                </p>
              </RevealItem>
              <div className="mt-10 space-y-6">
                {PILLARS.map((p) => (
                  <RevealItem key={p.title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-medium text-neutral-950">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-neutral-500">{p.text}</p>
                    </div>
                  </RevealItem>
                ))}
              </div>
              <RevealItem>
                <Link href="/services" className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-neutral-950">
                  <span className="border-b border-neutral-950 pb-0.5">Découvrir nos services</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </RevealItem>
            </Reveal>

            <Reveal className="grid grid-cols-2 gap-4">
              <RevealItem>
                <Photo src="/img/gdcouverture-4.webp" className="aspect-[4/5]" />
              </RevealItem>
              <RevealItem className="mt-12">
                <Photo src="/img/gdcouverture-5.webp" className="aspect-[4/5]" />
              </RevealItem>
              <RevealItem className="-mt-12">
                <Photo src="/img/gdcouverture-6.webp" className="aspect-[4/5]" />
              </RevealItem>
              <RevealItem>
                <Photo src="/img/gdcouverture-8.webp" className="aspect-[4/5]" />
              </RevealItem>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Positionnement */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-last grid grid-cols-2 gap-4 lg:order-first">
            <RevealItem className="col-span-2">
              <Photo src="/img/gdcouverture-2.webp" className="aspect-[16/10]" />
            </RevealItem>
            <RevealItem>
              <Photo src="/img/gdcouverture-9.webp" className="aspect-square" />
            </RevealItem>
            <RevealItem>
              <Photo src="/img/gdcouverture-10.webp" className="aspect-square" />
            </RevealItem>
          </Reveal>

          <Reveal>
            <RevealItem>
              <Eyebrow>Notre positionnement</Eyebrow>
              <h2 className={h2}>Votre partenaire technique de confiance en Côte d&apos;Ivoire.</h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 max-w-lg leading-relaxed text-neutral-500">
                Nous accompagnons les clients qui recherchent l&apos;excellence et la fiabilité, avec une approche orientée{" "}
                <span className="font-medium text-neutral-950">prévention</span>,{" "}
                <span className="font-medium text-neutral-950">durabilité</span> et{" "}
                <span className="font-medium text-neutral-950">performance</span>.
              </p>
            </RevealItem>
            <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
              {AUDIENCE.map((a) => (
                <RevealItem key={a.title} className="flex items-start gap-4 py-5">
                  <a.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <h3 className="font-medium text-neutral-950">{a.title}</h3>
                    <p className="mt-1 text-sm text-neutral-500">{a.text}</p>
                  </div>
                </RevealItem>
              ))}
            </div>
            <RevealItem>
              <QuoteButton className="group mt-10 inline-flex h-14 cursor-pointer items-center gap-4 rounded-full bg-neutral-950 pl-7 pr-2 text-[15px] font-medium text-white transition-colors hover:bg-brand">
                Obtenir mon devis gratuit
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand transition-colors group-hover:bg-white/20">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </QuoteButton>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* Valeurs */}
      <section className="border-t border-neutral-200 pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Reveal className="mb-12 max-w-2xl md:mb-16">
            <RevealItem>
              <Eyebrow>Nos valeurs</Eyebrow>
              <h2 className={h2}>Des principes qui guident notre action au quotidien.</h2>
            </RevealItem>
          </Reveal>
          <Reveal className="grid gap-4 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <RevealItem key={v.title} className="flex flex-col rounded-3xl bg-neutral-100 p-8 md:min-h-[280px]">
                <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-950">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-auto pt-12 text-2xl font-medium tracking-tight text-neutral-950">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">{v.text}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
