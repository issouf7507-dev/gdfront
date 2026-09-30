"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { ArrowUpRight, Phone } from "lucide-react";
import { PHONE, PHONE_DISPLAY } from "@/lib/site";
import { QuoteButton } from "./motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const TITLE = [["Une", "expertise", "reconnue"], ["au", "service", "de", "votre"], ["patrimoine."]];

const TRUST = ["25 ans d'expérience", "Devis gratuit", "Réponse sous 24 h"];

// Coin arrondi « inversé » (blanc en bas à gauche) qui raccorde l'encoche à la photo
const inverseCorner = "absolute h-8 w-8 bg-[radial-gradient(circle_at_100%_0,transparent_32px,white_32.5px)]";

const titleVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
};

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay } },
});

function Ctas({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <QuoteButton className="group inline-flex h-14 cursor-pointer items-center gap-4 rounded-full bg-neutral-950 pl-7 pr-2 text-[15px] font-medium text-white transition-colors hover:bg-neutral-800">
        Demander un devis gratuit
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-950 transition-colors group-hover:bg-brand group-hover:text-white">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </QuoteButton>
      <a
        href={`tel:${PHONE}`}
        className={`inline-flex h-14 items-center gap-2 rounded-full px-6 text-[15px] font-medium transition-colors ${dark ? "border border-white/25 text-white hover:bg-white/10" : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950"}`}
      >
        <Phone className="h-4 w-4 text-brand" />
        {PHONE_DISPLAY}
      </a>
    </div>
  );
}

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "15%"]);
  const initial = reduce ? "visible" : "hidden";

  return (
    <section ref={ref} className="bg-white px-3 pb-6 pt-24 md:px-6 md:pt-28">
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="relative mx-auto h-[min(78svh,760px)] min-h-[520px] max-w-[1400px] overflow-hidden rounded-[28px] bg-neutral-900 md:rounded-[36px] md:rounded-bl-none"
      >
        <motion.div className="absolute inset-0 scale-110" style={{ y: imageY }}>
          <Image
            src="/img/cover11.webp"
            alt="Équipe GD Couverture sur un chantier de toiture"
            fill
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-cover"
            priority
            fetchPriority="high"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />

        {/* Titre */}
        <div className="relative flex h-full flex-col justify-center px-6 pb-28 md:px-14 md:pb-24">
          <motion.p
            variants={fadeUp(0.1)}
            initial={initial}
            animate="visible"
            className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-white/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Couverture · Étanchéité · Abidjan
          </motion.p>

          <motion.h1
            variants={titleVariants}
            initial={initial}
            animate="visible"
            className="max-w-3xl text-[clamp(2.3rem,5.4vw,4.75rem)] font-medium leading-[1.04] tracking-tight text-white"
          >
            {TITLE.map((line, i) => (
              <span key={i} className="block">
                {line.map((word, j) => (
                  <span key={j} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span variants={wordVariants} className="inline-block">
                      {word === "patrimoine." ? (
                        <>
                          patrimoine<span className="text-brand">.</span>
                        </>
                      ) : (
                        word
                      )}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp(0.7)}
            initial={initial}
            animate="visible"
            className="mt-6 max-w-md text-base leading-relaxed text-white/75 md:text-lg"
          >
            Couverture, étanchéité, plomberie, ravalement et travaux en hauteur : nous préservons vos bâtiments partout en Côte d&apos;Ivoire.
          </motion.p>
        </div>

        {/* Engagements (desktop) */}
        <motion.ul
          variants={fadeUp(1)}
          initial={initial}
          animate="visible"
          className="absolute bottom-8 right-8 hidden gap-2 lg:flex"
        >
          {TRUST.map((item) => (
            <li key={item} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
              {item}
            </li>
          ))}
        </motion.ul>

        {/* Encoche avec les boutons (tablette et desktop) */}
        <div className="absolute bottom-0 left-0 hidden md:block">
          <span className={`${inverseCorner} -top-8 left-0`} />
          <span className={`${inverseCorner} -right-8 bottom-0`} />
          <motion.div
            variants={fadeUp(0.9)}
            initial={initial}
            animate="visible"
            className="rounded-tr-[32px] bg-white pr-5 pt-5"
          >
            <Ctas />
          </motion.div>
        </div>
      </motion.div>

      {/* Boutons sous la photo (mobile) */}
      <div className="mx-auto mt-4 max-w-[1400px] md:hidden">
        <Ctas />
      </div>
    </section>
  );
}
