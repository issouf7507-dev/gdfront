import { NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.NEXT_PUBLIC_RESEND_API_KEY;
const TO_EMAIL = "contact@gdcouverture.ci";
const FROM_EMAIL =
  process.env.FROM_EMAIL ?? "GD Couverture <contact@gdcouverture.ci>";

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

type Body = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
};

export async function POST(request: Request) {
  if (!resend) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Configuration email manquante" },
      { status: 500 },
    );
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête invalide" },
      { status: 400 },
    );
  }

  const { name, email, phone, company, service, message } = body;
  if (
    !name?.trim() ||
    !email?.trim() ||
    !phone?.trim() ||
    !service?.trim() ||
    !message?.trim()
  ) {
    return NextResponse.json(
      {
        error:
          "Champs obligatoires manquants (nom, email, téléphone, service, message)",
      },
      { status: 400 },
    );
  }

  const serviceLabels: Record<string, string> = {
    couverture: "Couverture",
    etancheite: "Étanchéité",
    plomberie: "Plomberie",
    ravalement: "Ravalement de façades",
    peinture: "Peinture intérieure",
    renovation: "Rénovation & maintenance",
    hauteur: "Travaux en hauteur",
    maintenance: "Contrat de maintenance",
    autre: "Autre",
  };
  const serviceLabel = serviceLabels[service] ?? service;

  const html = `
    <h2>Nouvelle demande de devis</h2>
    <p><strong>Nom complet :</strong> ${escapeHtml(name)}</p>
    <p><strong>Email du client :</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    <p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>
    <p><strong>Entreprise :</strong> ${escapeHtml(company || "—")}</p>
    <p><strong>Service souhaité :</strong> ${escapeHtml(serviceLabel)}</p>
    <h3>Message du client</h3>
    <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
    <p style="color: #666; font-size: 12px;">Pour répondre directement au client, utilisez l'adresse : <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
  `;

  const text = `
Nouvelle demande de devis

Nom complet : ${name}
Email du client : ${email}
Téléphone : ${phone}
Entreprise : ${company || "—"}
Service souhaité : ${serviceLabel}

Message du client :
${message}

---
Pour répondre directement au client, utilisez l'adresse : ${email}
  `.trim();

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `[Demande de devis] ${name} - ${serviceLabel}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: error.message ?? "Échec d'envoi" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Send quote error:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi" },
      { status: 500 },
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
