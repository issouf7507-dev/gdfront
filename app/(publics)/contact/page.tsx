"use client";
import { useState } from "react";
import { ContainerStagger, ContainerAnimated } from "@/components/blocks/cta-section-with-gallery";
import Image from "next/image";
import {
    MapPin,
    Facebook,
    Instagram,
    Linkedin,
    Send,
    CheckCircle2,
    X
} from "lucide-react";
import { InputContact } from "@/components/ui/inputcontact";
import { TextareaContact } from "@/components/ui/textarea-contact";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
        preferredContact: "email"
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/send-quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    company: formData.company || undefined,
                    service: formData.service || 'autre',
                    message: formData.message,
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    service: '',
                    message: '',
                    preferredContact: 'email'
                });
                setTimeout(() => {
                    setSubmitStatus('idle');
                }, 5000);
            } else {
                setSubmitStatus('error');
                setTimeout(() => setSubmitStatus('idle'), 5000);
            }
        } catch (error) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const socialLinks = [
        {
            label: 'Facebook',
            href: 'https://facebook.com/gdcouverture',
            icon: <Facebook className="w-6 h-6" />
        },
        {
            label: 'Instagram',
            href: 'https://instagram.com/gdcouverture',
            icon: <Instagram className="w-6 h-6" />
        },
        {
            label: 'LinkedIn',
            href: 'https://linkedin.com/company/gdcouverture',
            icon: <Linkedin className="w-6 h-6" />
        },
    ]

    return (
        <div className="min-h-screen bg-white">

            {/* Hero Section */}
            <div className="relative w-full h-[400px] bg-black/50 z-10 py-16">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/img/hear.jpg"
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="max-w-6xl mx-auto flex items-end justify-start h-full px-8">
                    <div className="relative">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-2 relative">
                            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                            <span className="text-white/90 text-xs font-light relative z-10">GD COUVERTURE</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                            Contactez-nous
                        </h1>
                        <p className="text-xs font-light text-white/70 mb-4 leading-relaxed">
                            Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner dans vos projets
                        </p>
                    </div>
                </div>
            </div>


            {/* Contact Info Cards */}


            {/* Main Content: Form + Map */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid lg:grid-cols-2 gap-12">

                        {/* Contact Form */}
                        <ContainerStagger className="place-self-center">
                            <ContainerAnimated>
                                <div className="mb-8">
                                    <h2 className="text-3xl md:text-4xl font-bold text-[#f39c12] mb-10 tracking-normal">
                                        Nous sommes toujours là <br /> pour vous aider et <br /> répondre à vos <br /> questions
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-10">
                                        Remplissez le formulaire ci-dessous et notre équipe vous recontactera dans les plus brefs délais.
                                        <br />
                                        Vous pouvez aussi nous joindre par téléphone ou par email.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">

                                    <div>
                                        <h1 className="text-lg font-bold text-[#f39c12] mb-5 tracking-normal hover:text-[#f39c12] transition-all duration-300">Centre d&apos;appels</h1>
                                        <p className="text-gray-600 text-sm"> <a href="tel:+2250713488488">+225 07 13 48 84 88</a></p>

                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold text-[#f39c12] mb-5 tracking-normal hover:text-[#f39c12] transition-all duration-300">Notre adresse</h1>
                                        <p className="text-gray-600 text-sm"> <a href="https://maps.google.com/?q=Abidjan,Cocody" target="_blank" rel="noopener noreferrer">Cocody Danga, Abidjan Côte d'Ivoire</a></p>

                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold text-[#f39c12] mb-5 tracking-normal hover:text-[#f39c12] transition-all duration-300">Email</h1>
                                        <p className="text-gray-600 text-sm"> <a href="mailto:contact@gdcouverture.ci">contact@gdcouverture.ci</a></p>

                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold text-[#f39c12] mb-5 tracking-normal hover:text-[#f39c12] transition-all duration-300">Réseaux sociaux</h1>
                                        <div className="flex gap-3">
                                            {socialLinks.map((link) => (
                                                <a
                                                    key={link.label}
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={link.label}
                                                    className=" flex items-center justify-center ml-2 text-gray-400 hover:text-[#f39c12] transition-all duration-300"
                                                >
                                                    {link.icon}
                                                </a>
                                            ))}
                                        </div>
                                    </div>


                                </div>
                            </ContainerAnimated>




                        </ContainerStagger>

                        <ContainerAnimated>
                            <div className="bg-[#f39c12] text-white py-10 px-20 rounded-2xl">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-normal">
                                    Prendre contact
                                </h2>
                                <p className="text-white/90 text-lg">
                                    Remplissez le formulaire ci-dessous et notre équipe <br /> vous recontactera dans les plus brefs délais.
                                </p>


                                <form onSubmit={handleSubmit} className="mt-10 space-y-10">
                                    <InputContact
                                        label="Nom"
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full text-white placeholder:text-white/90"
                                        required
                                    />
                                    <InputContact
                                        label="Adresse email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full text-white"
                                        required
                                    />
                                    <InputContact
                                        label="Téléphone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full text-white placeholder:text-white/90"
                                        required
                                    />
                                    <InputContact
                                        label="Entreprise"
                                        name="company"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full text-white placeholder:text-white/90"
                                    />

                                    <TextareaContact
                                        label="Message"
                                        name="message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={5}
                                        required
                                    />

                                    {/* Success Message */}
                                    {submitStatus === 'success' && (
                                        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3">
                                            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                                            <p className="text-green-800 font-medium text-sm">
                                                Merci ! Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
                                            </p>
                                        </div>
                                    )}

                                    {/* Error Message */}
                                    {submitStatus === 'error' && (
                                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3">
                                            <X className="w-6 h-6 text-red-600 flex-shrink-0" />
                                            <p className="text-red-800 font-medium text-sm">
                                                Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
                                            </p>
                                        </div>
                                    )}

                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting || submitStatus === 'success'}
                                        className="w-full px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Envoi en cours...
                                            </>
                                        ) : submitStatus === 'success' ? (
                                            <>
                                                <CheckCircle2 className="w-4 h-4" />
                                                Message envoyé !
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Envoyer le message
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </ContainerAnimated>

                    </div>
                </div>
            </section>

            <section>
                <div className="space-y-8">

                    {/* Map */}
                    <ContainerAnimated>
                        <div className="bg-gray-100  overflow-hidden h-[600px] relative group">
                            {/* Google Maps Embed - Replace with actual coordinates */}
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.474646004259!2d-4.014646523708001!3d5.344278394634338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ebc53434550b%3A0xe78179144bd2a9e2!2sGD%20COUVERTURE%20CI!5e0!3m2!1sfr!2sci!4v1770372481642!5m2!1sfr!2sci"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale group-hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                            <div className="absolute top-4 right-4">
                                <a
                                    href="https://maps.google.com/?q=Abidjan,Cocody"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white px-4 py-2 rounded-full  text-sm font-semibold text-[#f39c12] hover:bg-[#f39c12] hover:text-white transition-all duration-300 flex items-center gap-2"
                                >
                                    <MapPin className="w-4 h-4" />
                                    Ouvrir dans Maps
                                </a>
                            </div>
                        </div>
                    </ContainerAnimated>


                </div>
            </section>


        </div>
    );
}