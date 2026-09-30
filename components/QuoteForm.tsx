"use client";
import { useState } from "react";
import { CheckCircle2, Mail, MessageSquare, Phone, Send, User, X } from "lucide-react";
import { getAttribution, trackLead } from "@/lib/analytics";
import { HoneypotField, honeypotValue } from "@/components/HoneypotField";

const emptyForm = { name: "", email: "", phone: "", message: "" };

// Formulaire de devis court pour les pages d'atterrissage (service présélectionné)
export function QuoteForm({ service }: { service: string }) {
    const [formData, setFormData] = useState(emptyForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            const response = await fetch("/api/send-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    service,
                    attribution: getAttribution(),
                    website: honeypotValue(e.currentTarget),
                }),
            });

            if (response.ok) {
                trackLead(service);
                setSubmitStatus("success");
                setFormData(emptyForm);
            } else {
                setSubmitStatus("error");
            }
        } catch {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitStatus === "success") {
        return (
            <div className="rounded-2xl bg-white p-8 text-center">
                <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-[#f39c12]" />
                <h3 className="mb-2 text-xl font-bold text-gray-900">Demande envoyée !</h3>
                <p className="text-sm text-gray-600">
                    Merci, notre équipe vous recontacte sous 24 heures ouvrées.
                </p>
            </div>
        );
    }

    const inputClass =
        "w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#f39c12] focus:outline-none transition-colors";

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 md:p-8">
            <HoneypotField />
            <div>
                <h2 className="text-2xl font-bold text-[#f39c12]">Devis gratuit</h2>
                <p className="mt-1 text-sm text-gray-600">Réponse sous 24 heures ouvrées.</p>
            </div>

            <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                    aria-label="Nom complet" placeholder="Nom complet *" className={inputClass} />
            </div>
            <div className="relative">
                <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                    aria-label="Téléphone" placeholder="Téléphone *" className={inputClass} />
            </div>
            <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required
                    aria-label="Email" placeholder="Email *" className={inputClass} />
            </div>
            <div className="relative">
                <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={3}
                    aria-label="Votre projet" placeholder="Décrivez votre projet *"
                    className={`${inputClass} resize-none`} />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#f39c12] px-8 py-4 font-semibold text-white transition-colors hover:bg-[#d68910] disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isSubmitting ? (
                    <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Envoi en cours...
                    </>
                ) : (
                    <>
                        <Send className="h-5 w-5" />
                        Recevoir mon devis gratuit
                    </>
                )}
            </button>

            {submitStatus === "error" && (
                <div className="flex items-center gap-3 rounded-xl border-2 border-red-200 bg-red-50 p-4">
                    <X className="h-6 w-6 flex-shrink-0 text-red-600" />
                    <p className="text-sm font-medium text-red-800">
                        Une erreur est survenue. Veuillez réessayer ou nous appeler directement.
                    </p>
                </div>
            )}
        </form>
    );
}
