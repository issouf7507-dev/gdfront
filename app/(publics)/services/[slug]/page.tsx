import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Phone } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { getServiceLanding, serviceLandings } from "@/lib/services";
import { PHONE, PHONE_DISPLAY } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return serviceLandings.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = getServiceLanding(slug);
    if (!service) return {};

    const title = `${service.title} à Abidjan`;
    const description = `${service.description} Devis gratuit, intervention rapide à Abidjan et en Côte d'Ivoire.`;
    return {
        title,
        description,
        alternates: { canonical: `/services/${slug}` },
        openGraph: { title, description, images: [{ url: service.image }] },
    };
}

export default async function ServiceLandingPage({ params }: Props) {
    const { slug } = await params;
    const service = getServiceLanding(slug);
    if (!service) notFound();

    return (
        <div className="min-h-screen bg-white">
            <section className="relative isolate overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="100vw"
                    className="-z-10 object-cover"
                    priority
                />
                <div className="absolute inset-0 -z-10 bg-black/60" />

                <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 md:px-8 lg:grid-cols-2">
                    <div className="text-white">
                        <span className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-light backdrop-blur-sm">
                            GD COUVERTURE · ABIDJAN
                        </span>
                        <h1 className="mb-3 text-4xl font-black tracking-tight md:text-6xl">
                            {service.title}
                        </h1>
                        <p className="mb-6 text-lg text-white/80">{service.subtitle}</p>
                        <ul className="mb-8 space-y-3">
                            {service.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3 text-sm text-white/90">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#f39c12]" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <a
                            href={`tel:${PHONE}`}
                            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
                        >
                            <Phone className="h-4 w-4 text-[#f39c12]" />
                            {PHONE_DISPLAY}
                        </a>
                    </div>

                    <div id="devis" className="shadow-2xl rounded-2xl">
                        <QuoteForm service={service.slug} />
                    </div>
                </div>
            </section>

            <section className="bg-[#f9f9f9] py-16">
                <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
                    <h2 className="mb-4 text-3xl font-bold text-[#f39c12]">Pourquoi GD Couverture ?</h2>
                    <p className="mb-8 text-gray-600">{service.description}</p>
                    <div className="grid gap-6 text-left sm:grid-cols-3">
                        {[
                            ["25 ans d'expérience", "Une équipe qualifiée au service de vos bâtiments."],
                            ["Devis gratuit", "Diagnostic et chiffrage clairs, sans engagement."],
                            ["Intervention rapide", "Partout à Abidjan et en Côte d'Ivoire."],
                        ].map(([title, text]) => (
                            <div key={title} className="rounded-2xl bg-white p-6">
                                <h3 className="mb-2 font-semibold text-gray-900">{title}</h3>
                                <p className="text-sm text-gray-600">{text}</p>
                            </div>
                        ))}
                    </div>
                    <Link
                        href="/services"
                        className="mt-10 inline-block text-sm text-[#f39c12] hover:underline"
                    >
                        Voir tous nos services
                    </Link>
                </div>
            </section>
        </div>
    );
}
