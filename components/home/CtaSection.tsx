import Image from "next/image";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { PHONE, PHONE_DISPLAY, whatsappUrl } from "@/lib/site";
import { QuoteButton, Reveal, RevealItem } from "./motion";

export function CtaSection() {
  return (
    <section className="bg-white px-3 pb-3 md:px-6 md:pb-6">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[28px] bg-neutral-950 px-6 py-20 text-white md:rounded-[36px] md:px-14 md:py-28">
        <Image src="/img/gdcouverture-21.webp" alt="" fill sizes="(max-width: 1400px) 100vw, 1400px" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-neutral-950/20" />

        <Reveal className="relative max-w-2xl">
          <RevealItem>
            <p className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Devis gratuit
            </p>
            <h2 className="text-4xl font-medium leading-[1.08] tracking-tight md:text-5xl">
              Un projet, une fuite, un doute sur votre toiture<span className="text-brand">?</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-6 max-w-lg text-white/70 md:text-lg">
              Décrivez-nous votre besoin : devis détaillé après visite technique, réponse sous 24 h ouvrées.
            </p>
          </RevealItem>
          <RevealItem className="mt-10 flex flex-wrap gap-3">
            <QuoteButton className="group inline-flex h-14 cursor-pointer items-center gap-4 rounded-full bg-white pl-7 pr-2 text-[15px] font-medium text-neutral-950 transition-colors hover:bg-brand hover:text-white">
              Demander un devis
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-white">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </QuoteButton>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex h-14 items-center gap-2 rounded-full border border-white/25 px-6 text-[15px] font-medium transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2 rounded-full border border-white/25 px-6 text-[15px] font-medium transition-colors hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
