import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Badge, PageHeader, Panel } from "@/components/admin/PageHeader";
import { buttonPrimaryClass, buttonSecondaryClass } from "@/components/admin/styles";
import { DeleteButton } from "@/components/admin/ui";
import { quoteOrigin, serviceLabel } from "@/lib/emails/quote";
import { prisma } from "@/lib/prisma";
import { quoteStatus } from "@/lib/quote-status";
import { requireAdminPage } from "@/lib/session";
import { deleteQuote, updateQuote } from "../actions";
import { QuoteStatusForm } from "./QuoteStatusForm";

export const metadata: Metadata = { title: "Demande de devis" };

function whatsappNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  // Numéro ivoirien à 10 chiffres sans indicatif : on ajoute 225
  return digits.length === 10 ? `225${digits}` : digits;
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">{label}</dt>
      <dd className="mt-1.5 break-all text-neutral-950">{children}</dd>
    </div>
  );
}

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage("quotes");
  const { id } = await params;
  const quote = await prisma.quoteRequest.findUnique({ where: { id } });
  if (!quote) notFound();

  const st = quoteStatus(quote.status);
  const provenance: [string, string | null][] = [
    ["Origine", quoteOrigin(quote)],
    ["Source", quote.utmSource],
    ["Support", quote.utmMedium],
    ["Campagne", quote.utmCampaign],
    ["Mot-clé", quote.utmTerm],
    ["Annonce", quote.utmContent],
    ["GCLID", quote.gclid],
    ["Page d'arrivée", quote.landingPage],
    ["Site référent", quote.referrer],
  ];

  return (
    <>
      <PageHeader
        back={{ href: "/admin/devis", label: "Toutes les demandes" }}
        title={quote.name}
        description={
          <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-2">
            <Badge className={st.badge}>{st.label}</Badge>
            {serviceLabel(quote.service)} · reçue le {quote.createdAt.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}
          </span>
        }
        actions={
          <>
            <a href={`mailto:${quote.email}`} className={buttonSecondaryClass}><Mail className="h-4 w-4" /> Email</a>
            <a href={`https://wa.me/${whatsappNumber(quote.phone)}`} target="_blank" rel="noopener noreferrer" className={buttonSecondaryClass}>
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a href={`tel:${quote.phone}`} className={buttonPrimaryClass}><Phone className="h-4 w-4" /> Appeler</a>
          </>
        }
      />

      <div className="grid items-start gap-4 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <Panel title="Message">
            <p className="whitespace-pre-wrap leading-relaxed text-neutral-700">{quote.message}</p>
          </Panel>
          <Panel title="Coordonnées">
            <dl className="grid gap-6 text-sm sm:grid-cols-2">
              <Info label="Téléphone">{quote.phone}</Info>
              <Info label="Email">{quote.email}</Info>
              <Info label="Entreprise">{quote.company ?? "—"}</Info>
              <Info label="Email de notification">{quote.emailSent ? "Envoyé" : "Non envoyé"}</Info>
            </dl>
          </Panel>
          <Panel title="Provenance" description="Paramètres de campagne enregistrés à l'arrivée du visiteur.">
            <dl className="grid gap-6 text-sm sm:grid-cols-2">
              {provenance.filter(([, v]) => v).map(([k, v]) => (
                <Info key={k} label={k}>{v}</Info>
              ))}
            </dl>
          </Panel>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-10">
          <Panel title="Suivi">
            <QuoteStatusForm action={updateQuote.bind(null, quote.id)} status={quote.status} notes={quote.notes ?? ""} />
          </Panel>
          <div className="flex justify-end">
            <DeleteButton
              action={deleteQuote.bind(null, quote.id)}
              label="Supprimer la demande"
              confirmText="Supprimer définitivement cette demande de devis ?"
            />
          </div>
        </aside>
      </div>
    </>
  );
}
