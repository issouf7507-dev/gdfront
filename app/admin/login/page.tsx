import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, Star } from "lucide-react";
import { getPublishedTestimonials } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { serviceLandings } from "@/lib/services";
import { getSession } from "@/lib/session";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Connexion" };

// Entrée en cascade (tw-animate-css), désactivée si l'utilisateur réduit les animations
const enter = "animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700 motion-reduce:animate-none";

// Coin arrondi « inversé » qui raccorde l'encoche blanche à la photo
const inverseCorner = "absolute h-7 w-7 bg-[radial-gradient(circle_at_0_0,transparent_28px,white_28.5px)]";

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");

  const [[testimonial], realisations] = await Promise.all([
    getPublishedTestimonials(1),
    prisma.realisation.count({ where: { published: true } }),
  ]);

  // Mêmes chiffres vérifiables que sur le site public
  const stats = [
    { value: "25", suffix: "ans", label: "d'expérience" },
    { value: String(serviceLandings.length), suffix: "", label: "métiers en interne" },
    { value: String(realisations), suffix: "", label: realisations > 1 ? "réalisations en ligne" : "réalisation en ligne" },
  ];

  return (
    <div className="min-h-dvh bg-neutral-950 p-2 sm:p-4">
      <div className="flex min-h-[calc(100dvh-1rem)] flex-col rounded-[32px] bg-white p-4 sm:min-h-[calc(100dvh-2rem)] sm:p-6">
        {/* Barre du haut */}
        <header className={`${enter} flex items-center justify-between px-2`}>
          <Image src="/img/logo_GDCCI.webp" alt="GD Couverture" width={640} height={389} className="h-14 w-auto" priority />
          <Link
            href="/"
            className="group flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-neutral-500 transition-colors hover:text-neutral-950"
          >
            Retour au site
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </header>

        <div className="mt-4 grid flex-1 gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* Photo de chantier avec encoche */}
          <section
            className={`animate-in fade-in zoom-in-[0.98] fill-mode-both relative hidden min-h-[560px] overflow-hidden rounded-[28px] duration-1000 motion-reduce:animate-none lg:block ${testimonial ? "xl:rounded-br-none" : ""}`}
            aria-hidden="true"
          >
            <Image src="/img/gdcouverture-4.webp" alt="" fill sizes="55vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/25 to-transparent" />

            <div className="absolute bottom-10 left-10 max-w-md text-white">
              <p className={`${enter} delay-300 mb-4 text-xs font-medium uppercase tracking-[0.25em] text-white/60`}>
                GD Couverture · Abidjan
              </p>
              <p className={`${enter} delay-500 text-4xl font-medium leading-[1.1] tracking-tight xl:text-5xl`}>
                Bâtir, protéger,
                <br />
                entretenir<span className="text-brand">.</span>
              </p>
            </div>

            {testimonial && (
              <div className="absolute bottom-0 right-0 hidden xl:block">
                <span className={`${inverseCorner} -top-7 right-0`} />
                <span className={`${inverseCorner} -left-7 bottom-0`} />
                <figure className={`${enter} delay-700 w-80 rounded-tl-[28px] bg-white pl-5 pt-5`}>
                  <div className="flex gap-0.5" role="img" aria-label={`Note : ${testimonial.rating} sur 5`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < testimonial.rating ? "fill-brand text-brand" : "text-neutral-200"}`} />
                    ))}
                  </div>
                  <blockquote className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-700">
                    « {testimonial.content} »
                  </blockquote>
                  <figcaption className="mt-3 text-sm">
                    <span className="font-medium text-neutral-950">{testimonial.name}</span>
                    {testimonial.role && <span className="text-neutral-400"> · {testimonial.role}</span>}
                  </figcaption>
                </figure>
              </div>
            )}
          </section>

          {/* Formulaire */}
          <main className="flex flex-col justify-center px-2 py-8 sm:px-8 xl:px-14">
            <div className="mx-auto w-full max-w-md">
              <p className={`${enter} delay-100 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400`}>
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Espace administrateur
              </p>
              <h1 className={`${enter} delay-200 mt-5 text-5xl font-medium tracking-tight text-neutral-950 sm:text-6xl`}>
                Connexion
              </h1>
              <p className={`${enter} delay-300 mt-4 text-neutral-500`}>
                Gérez vos devis, réalisations, articles et avis clients.
              </p>

              <LoginForm enterClass={enter} />

              <dl className={`${enter} delay-700 mt-12 grid grid-cols-3 gap-4 border-t border-neutral-100 pt-8`}>
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="text-3xl font-medium tracking-tight text-neutral-950">{s.value}</span>
                      {s.suffix && <span className="ml-1 text-sm text-neutral-400">{s.suffix}</span>}
                      <span className="mt-1 block text-xs leading-snug text-neutral-500">{s.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
