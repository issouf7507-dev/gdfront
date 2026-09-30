import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealItem } from "@/components/home/motion";
import { ADDRESS, EMAIL, MAPS_URL, PHONE, PHONE_DISPLAY, whatsappUrl } from "@/lib/site";

const CHANNELS = [
  { icon: Phone, label: "Téléphone", value: PHONE_DISPLAY, href: `tel:${PHONE}`, external: false },
  { icon: MessageCircle, label: "WhatsApp", value: "Écrivez-nous directement", href: whatsappUrl(), external: true },
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, external: false },
  { icon: MapPin, label: "Adresse", value: ADDRESS, href: MAPS_URL, external: true },
];

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.474646004259!2d-4.014646523708001!3d5.344278394634338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ebc53434550b%3A0xe78179144bd2a9e2!2sGD%20COUVERTURE%20CI!5e0!3m2!1sfr!2sci!4v1770372481642!5m2!1sfr!2sci";

export default function ContactPage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Parlons de votre projet<span className="text-brand">.</span>
          </>
        }
        subtitle="Devis gratuit et détaillé après visite technique. Notre équipe vous répond sous 24 h ouvrées."
        image="/img/gdcouverture-21.webp"
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Coordonnées */}
          <Reveal>
            <RevealItem>
              <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Nous joindre
              </p>
              <h2 className="text-3xl font-medium leading-tight tracking-tight text-neutral-950 md:text-4xl">
                Un devis, une urgence, une question ?
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-neutral-500">
                Appelez-nous, écrivez-nous sur WhatsApp ou remplissez le formulaire : nous revenons vers vous rapidement.
              </p>
            </RevealItem>

            <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
              {CHANNELS.map(({ icon: Icon, label, value, href, external }) => (
                <RevealItem key={label}>
                  <a
                    href={href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="group flex items-center gap-4 py-5"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-950 transition-colors group-hover:bg-brand group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-neutral-400">{label}</span>
                      <span className="block truncate font-medium text-neutral-950 transition-colors group-hover:text-brand">{value}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-neutral-300 transition-all group-hover:rotate-45 group-hover:text-neutral-950" />
                  </a>
                </RevealItem>
              ))}
            </div>
          </Reveal>

          {/* Formulaire */}
          <Reveal>
            <RevealItem className="h-full">
              <ContactForm />
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* Carte */}
      <section className="px-3 pb-3 md:px-6 md:pb-6">
        <div className="group relative mx-auto h-[420px] max-w-[1400px] overflow-hidden rounded-[28px] bg-neutral-100 md:h-[520px] md:rounded-[36px]">
          <iframe
            src={MAP_EMBED}
            title="Localisation de GD Couverture à Cocody, Abidjan"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale transition-[filter] duration-500 group-hover:grayscale-0"
          />
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-950 shadow-sm transition-colors hover:bg-neutral-950 hover:text-white md:left-6 md:top-6"
          >
            <MapPin className="h-4 w-4 text-brand" />
            Ouvrir dans Google Maps
          </a>
        </div>
      </section>
    </div>
  );
}
