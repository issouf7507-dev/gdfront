"use client";
import { useState } from 'react'
import { X, Send, CheckCircle2, User, Mail, Phone, Building2, MessageSquare } from 'lucide-react'
import { getAttribution, trackLead } from "@/lib/analytics";
import { HoneypotField, honeypotValue } from "@/components/HoneypotField";

// Modale de demande de devis : chargée à la demande par le Header (next/dynamic),
// elle ne pèse donc pas sur le chargement initial des pages.
export default function QuoteModal({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/send-quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, attribution: getAttribution(), website: honeypotValue(e.currentTarget) }),
            })

            if (response.ok) {

                trackLead(formData.service)
                setSubmitStatus('success')
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    service: '',
                    message: ''
                })
                setTimeout(() => {
                    onClose()
                    setSubmitStatus('idle')
                }, 2000)
            } else {
                setSubmitStatus('error')
            }
        } catch {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
            setTimeout(() => setSubmitStatus('idle'), 3000)
        }
    }

    return (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div
                        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0  p-6 rounded-t-2xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold   text-[#f39c12]">Demande de devis</h2>
                                    <p className="text-gray-600 text-sm mt-1">
                                        Remplissez le formulaire, nous vous recontacterons rapidement
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10  hover:scale-110 cursor-pointer rounded-full flex items-center justify-center transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <HoneypotField />
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nom complet *
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#f39c12] focus:outline-none transition-colors"
                                        placeholder="Votre nom"
                                    />
                                </div>
                            </div>

                            {/* Email & Phone */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#f39c12] focus:outline-none transition-colors"
                                            placeholder="votre@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Téléphone *
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#f39c12] focus:outline-none transition-colors"
                                            placeholder="+225 XX XX XX XX XX"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Company & Service */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Entreprise
                                    </label>
                                    <div className="relative">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#f39c12] focus:outline-none transition-colors"
                                            placeholder="Nom de l'entreprise"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Service souhaité *
                                    </label>
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#f39c12] focus:outline-none transition-colors appearance-none bg-white"
                                    >
                                        <option value="">Sélectionnez un service</option>
                                        <option value="couverture">Couverture</option>
                                        <option value="etancheite">Étanchéité</option>
                                        <option value="plomberie">Plomberie</option>
                                        <option value="ravalement">Ravalement de façades</option>
                                        <option value="peinture">Peinture intérieure</option>
                                        <option value="renovation">Rénovation & maintenance</option>
                                        <option value="hauteur">Travaux en hauteur</option>
                                        <option value="maintenance">Contrat de maintenance</option>
                                        <option value="autre">Autre</option>
                                    </select>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Décrivez votre projet *
                                </label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#f39c12] focus:outline-none transition-colors resize-none"
                                        placeholder="Décrivez votre projet, vos besoins spécifiques..."
                                    />
                                </div>
                            </div>

                            {/* Info Box */}
                            <div className=" rounded-xl p-4">
                                <p className="text-sm text-gray-700">
                                    <strong className="text-[#f39c12]">Votre demande sera envoyée à :</strong> contact@gdcouverture.ci
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                    Nous nous engageons à vous répondre sous 24 heures ouvrées
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting || submitStatus === 'success'}
                                className="w-full py-4 px-8 bg-[#f39c12] text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Envoi en cours...
                                    </>
                                ) : submitStatus === 'success' ? (
                                    <>
                                        <CheckCircle2 className="w-5 h-5" />
                                        Devis envoyé avec succès !
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        Envoyer la demande de devis
                                    </>
                                )}
                            </button>

                            {/* Error Message */}
                            {submitStatus === 'error' && (
                                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3">
                                    <X className="w-6 h-6 text-red-600 flex-shrink-0" />
                                    <p className="text-red-800 font-medium text-sm">
                                        Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
    );
}
