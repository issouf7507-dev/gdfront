"use client";
import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { getAttribution, trackLead } from "@/lib/analytics";
import { HoneypotField, honeypotValue } from "@/components/HoneypotField";
import { QUOTE_SERVICE_LABELS } from "@/lib/services";

const emptyForm = { name: "", email: "", phone: "", company: "", service: "", message: "" };

const field =
  "w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-[15px] text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-950 focus:ring-4 focus:ring-brand/15";
const labelClass = "mb-2 block text-sm font-medium text-neutral-700";

// Formulaire complet de la page Contact (service au choix, entreprise facultative)
export function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const service = form.service || "autre";

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          company: form.company || undefined,
          service,
          attribution: getAttribution(),
          website: honeypotValue(e.currentTarget),
        }),
      });
      if (!response.ok) throw new Error();
      trackLead(service);
      setForm(emptyForm);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="flex h-full flex-col items-start justify-center rounded-3xl bg-neutral-100 p-8 md:p-12">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-6 text-2xl font-medium tracking-tight text-neutral-950">Message envoyé, merci !</h3>
        <p className="mt-3 max-w-sm leading-relaxed text-neutral-500">
          Notre équipe vous recontacte sous 24 h ouvrées.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 cursor-pointer border-b border-neutral-950 pb-0.5 text-sm font-medium text-neutral-950"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-neutral-100 p-6 md:p-10">
      <HoneypotField />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="contact-name" className={labelClass}>Nom complet *</label>
          <input id="contact-name" name="name" required autoComplete="name" value={form.name} onChange={update} className={field} />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>Email *</label>
          <input id="contact-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={update} className={field} />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClass}>Téléphone *</label>
          <input id="contact-phone" name="phone" type="tel" required autoComplete="tel" value={form.phone} onChange={update} className={field} />
        </div>
        <div>
          <label htmlFor="contact-company" className={labelClass}>Entreprise</label>
          <input id="contact-company" name="company" autoComplete="organization" value={form.company} onChange={update} className={field} />
        </div>
        <div>
          <label htmlFor="contact-service" className={labelClass}>Service concerné</label>
          <select id="contact-service" name="service" value={form.service} onChange={update} className={`${field} cursor-pointer`}>
            <option value="">Choisir un service</option>
            {Object.entries(QUOTE_SERVICE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={labelClass}>Votre projet *</label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={update}
            placeholder="Type de travaux, surface, adresse du chantier…"
            className={`${field} resize-none`}
          />
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 rounded-2xl bg-red-50 px-5 py-4 text-sm text-red-700">
          Une erreur est survenue. Réessayez ou appelez-nous directement.
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-neutral-500">Réponse sous 24 h ouvrées.</p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-14 cursor-pointer items-center gap-4 rounded-full bg-neutral-950 pl-7 pr-2 text-[15px] font-medium text-white transition-colors hover:bg-brand disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand transition-colors group-hover:bg-white/20">
            {status === "sending" ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            )}
          </span>
        </button>
      </div>
    </form>
  );
}
