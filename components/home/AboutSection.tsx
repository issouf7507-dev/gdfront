import Link from "next/link";
import { ArrowRight, HardHat, ShieldCheck, Wallet } from "lucide-react";
import { serviceLandings } from "@/lib/services";
import { CountUp, Reveal, RevealItem } from "./motion";

// Uniquement des chiffres vérifiables (repris du reste du site) — ne pas inventer de statistiques.
const STATS = [
  { value: 25, suffix: "+", label: "années d'expérience dans le bâtiment" },
  { value: 100, suffix: "+", label: "clients accompagnés en Côte d'Ivoire" },
  { value: serviceLandings.length, suffix: "", label: "métiers maîtrisés en interne" },
  { value: 24, suffix: " h", label: "pour vous recontacter (jours ouvrés)" },
];

const PILLARS = [
  { icon: ShieldCheck, title: "Sécurité" },
  { icon: HardHat, title: "Qualité" },
  { icon: Wallet, title: "Maîtrise des coûts" },
];

export function AboutSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal>
          <RevealItem>
            <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Qui sommes-nous
            </p>
            <h2 className="text-3xl font-medium leading-tight tracking-tight text-neutral-950 md:text-4xl">
              Protéger, valoriser et prolonger la vie de vos bâtiments.
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-6 max-w-lg leading-relaxed text-neutral-500">
              GD Couverture accompagne particuliers, syndics et entreprises sur toute l&apos;enveloppe du bâtiment. Des prestations soignées, des matériaux adaptés au climat ivoirien et un devis gratuit et détaillé après visite technique.
            </p>
          </RevealItem>
          <RevealItem>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {PILLARS.map((p) => (
                <li key={p.title} className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                  <p.icon className="h-4 w-4 text-brand" />
                  {p.title}
                </li>
              ))}
            </ul>
          </RevealItem>
          <RevealItem>
            <Link
              href="/a-propos"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-neutral-950"
            >
              <span className="border-b border-neutral-950 pb-0.5">Découvrir l&apos;entreprise</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </RevealItem>
        </Reveal>

        <Reveal className="grid grid-cols-2 gap-x-8 gap-y-12 self-center">
          {STATS.map((s) => (
            <RevealItem key={s.label} className="border-t border-neutral-200 pt-6 text-center sm:text-left">
              <p className="text-5xl font-medium tracking-tight text-neutral-950 md:text-6xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-sm leading-snug text-neutral-500">{s.label}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
