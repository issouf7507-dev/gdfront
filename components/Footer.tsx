"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { ArrowUp, ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal, RevealItem } from "@/components/home/motion";
import { openQuoteModal } from "@/lib/quote-modal";
import { serviceLandings } from "@/lib/services";
import { ADDRESS, EMAIL, MAPS_URL, PHONE, PHONE_DISPLAY, SOCIAL_LINKS, whatsappUrl } from "@/lib/site";

const COMPANY_LINKS = [
  { label: "À propos", href: "/a-propos" },
  { label: "Nos services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_ICONS = { Facebook, Instagram, LinkedIn: Linkedin };

// Pages qui se terminent déjà par <CtaSection> : pas de second appel à l'action dans le footer
const PAGES_WITH_CTA = ["/", "/a-propos", "/services", "/realisations", "/blog", "/contact"];

const CONTACT_ITEMS = [
  { icon: Phone, label: PHONE_DISPLAY, href: `tel:${PHONE}`, external: false },
  { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}`, external: false },
  { icon: MessageCircle, label: "WhatsApp", href: whatsappUrl(), external: true },
  { icon: MapPin, label: ADDRESS, href: MAPS_URL, external: true },
];

// Même intertitre que les sections de la page d'accueil (point orange + capitales espacées)
function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </h2>
  );
}

export function Footer() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const linkClass = (href: string) =>
    `text-[15px] transition-colors hover:text-brand ${isActive(href) ? "text-neutral-950" : "text-neutral-600"}`;

  return (
    <footer className="bg-white px-3 pb-3 md:px-6 md:pb-6">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[28px] bg-neutral-100 px-6 pt-14 md:rounded-[36px] md:px-14 md:pt-20">
        {/* Appel à l'action */}
        {!PAGES_WITH_CTA.includes(pathname) && (
          <Reveal className="flex flex-col gap-8 border-b border-neutral-200 pb-14 md:flex-row md:items-end md:justify-between">
            <RevealItem>
              <p className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Devis gratuit
              </p>
              <p className="max-w-2xl text-4xl font-medium leading-[1.08] tracking-tight text-neutral-950 md:text-6xl">
                Parlons de votre projet<span className="text-brand">.</span>
              </p>
            </RevealItem>
            <RevealItem className="shrink-0">
              <button
                type="button"
                onClick={openQuoteModal}
                className="group inline-flex h-14 w-fit cursor-pointer items-center gap-4 rounded-full bg-neutral-950 pl-7 pr-2 text-[15px] font-medium text-white transition-colors hover:bg-brand"
              >
                Demander un devis gratuit
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand transition-colors group-hover:bg-white/20">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </button>
            </RevealItem>
          </Reveal>
        )}

        {/* Colonnes */}
        <Reveal className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <RevealItem>
            <Link href="/" aria-label="GD Couverture — accueil" className="inline-block">
              <Image src="/img/logo_GDCCI.webp" alt="GD Couverture" width={640} height={389} className="h-14 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-neutral-500">
              Entreprise BTP multi-services spécialisée dans l&apos;enveloppe du bâtiment et la maintenance technique, depuis plus de 25 ans en Côte d&apos;Ivoire.
            </p>
            {SOCIAL_LINKS.length > 0 && (
              <ul className="mt-6 flex gap-2">
                {SOCIAL_LINKS.map((s) => {
                  const Icon = SOCIAL_ICONS[s.label];
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </RevealItem>

          <RevealItem>
            <nav aria-label="Nos métiers">
              <ColumnTitle>Nos métiers</ColumnTitle>
              <ul className="space-y-3">
                {serviceLandings.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className={linkClass(`/services/${s.slug}`)}>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </RevealItem>

          <RevealItem>
            <nav aria-label="Entreprise">
              <ColumnTitle>Entreprise</ColumnTitle>
              <ul className="space-y-3">
                {COMPANY_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass(l.href)}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </RevealItem>

          <RevealItem>
            <ColumnTitle>Contact</ColumnTitle>
            <ul className="space-y-3">
              {CONTACT_ITEMS.map(({ icon: Icon, label, href, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="group flex items-start gap-3 text-[15px] text-neutral-600 transition-colors hover:text-brand"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-neutral-950 transition-colors group-hover:bg-brand group-hover:text-white">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="pt-1">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>
        </Reveal>

        {/* Barre du bas */}
        <div className="flex flex-col gap-4 border-t border-neutral-200 py-6 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} GD Couverture. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="/mentions-legales" className="transition-colors hover:text-brand">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="transition-colors hover:text-brand">
              Confidentialité
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
              aria-label="Retour en haut de la page"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-neutral-950 text-white transition-colors hover:bg-brand"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Signature */}
        <p
          aria-hidden="true"
          className="pointer-events-none -mb-[0.22em] select-none whitespace-nowrap text-center text-[15.5vw] font-medium leading-none tracking-tighter text-neutral-950/[0.06] min-[1400px]:text-[216px]"
        >
          GD Couverture
        </p>
      </div>
    </footer>
  );
}

export default Footer;
