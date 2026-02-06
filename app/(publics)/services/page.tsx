"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import Image from "next/image";
import {
    Home,
    Droplet,
    Wrench,

    PaintBucket,
    Brush,
    Mountain,
    ClipboardCheck,

    ArrowRight,
    Building2, CheckCircle2, Mail, MessageSquare, Phone, Send, User, X
} from "lucide-react";


const services = [
    {
        id: "couverture",
        icon: Home,
        title: "Couverture",
        subtitle: "Protection durable de votre bâtiment",
        description: "Expertise complète en couverture adaptée au climat ivoirien pour garantir la longévité de vos toitures.",
        features: [
            "Pose de toitures neuves adaptées au climat ivoirien",
            "Rénovation et réparation de toitures",
            "Traitement des fuites et infiltrations",
            "Remplacement d'éléments défectueux",
            "Entretien préventif et curatif",
            "Isolation thermique des toitures"
        ],
        images: [
            "/img/hear.jpg",
        ],
        color: "from-orange-500 to-orange-600"
    },
    {
        id: "etancheite",
        icon: Droplet,
        title: "Étanchéité",
        subtitle: "Préserver la structure et éviter les dégradations coûteuses",
        description: "Solutions d'étanchéité complètes pour protéger vos bâtiments contre l'humidité et les infiltrations.",
        features: [
            "Toitures-terrasses",
            "Balcons et terrasses",
            "Murs enterrés et sous-sols",
            "Traitement des joints et points sensibles",
            "Recherche et réparation de fuites",
            "Solutions préventives et correctives"
        ],
        images: [
            "/img/gdcouverture-18.png",
        ],
        color: "from-blue-500 to-blue-600"
    },
    {
        id: "plomberie",
        icon: Wrench,
        title: "Plomberie",
        subtitle: "Interventions rapides et efficaces",
        description: "Service de plomberie professionnel pour tous vos besoins en installation et maintenance.",
        features: [
            "Installation de réseaux de plomberie",
            "Détection et réparation de fuites",
            "Débouchage de canalisations",
            "Remplacement de sanitaires et robinetterie",
            "Maintenance préventive et corrective"
        ],
        images: [
            "/img/gdcouverture-8.png"
        ],
        color: "from-cyan-500 to-cyan-600"
    },
    {
        id: "ravalement",
        icon: Building2,
        title: "Ravalement de façades",
        subtitle: "Valoriser et protéger votre patrimoine immobilier",
        description: "Redonnez vie à vos façades avec nos services de ravalement complets et durables.",
        features: [
            "Nettoyage et remise en état des façades",
            "Réparation des fissures et dégradations",
            "Traitement anti-humidité et moisissures",
            "Enduits, peintures extérieures et revêtements durables",
            "Isolation thermique par l'extérieur (ITE)"
        ],
        images: [
            "/img/gdcouverture-13.png"
        ],
        color: "from-amber-500 to-amber-600"
    },
    {
        id: "peinture",
        icon: PaintBucket,
        title: "Peinture intérieure",
        subtitle: "Des finitions soignées pour sublimer vos espaces",
        description: "Transformez vos intérieurs avec des finitions professionnelles et des peintures de qualité.",
        features: [
            "Peinture murs, plafonds et boiseries",
            "Préparation des supports",
            "Peintures durables et adaptées",
            "Résultat esthétique, propre et durable"
        ],
        images: [
            "/img/gdcouverture-2.png"
        ],
        color: "from-purple-500 to-purple-600"
    },
    {
        id: "renovation",
        icon: Brush,
        title: "Rénovation & maintenance",
        subtitle: "Services complémentaires",
        description: "Une gamme complète de services pour la rénovation et l'entretien de vos bâtiments.",
        features: [
            "Maintenance générale du bâtiment",
            "Rénovation partielle ou complète",
            "Réhabilitation de bâtiments existants",
            "Coordination de plusieurs corps de métiers",
            "Amélioration du confort et de la fonctionnalité",
            "Menuiserie aluminium",
            "Électricité"
        ],
        images: [
            "/img/gdcouverture-10.png"
        ],
        color: "from-green-500 to-green-600"
    }
];

const specialties = [
    {
        id: "hauteur",
        icon: Mountain,
        title: "Travaux en hauteur / Travaux à la corde",
        subtitle: "Interventions sans échafaudage, rapides et économiques",
        advantages: [
            "Rapidité d'exécution",
            "Réduction des coûts",
            "Sécurité maximale"
        ],
        services: [
            "Interventions en hauteur sur façades et toitures",
            "Accès difficiles sans échafaudage",
            "Réparations ponctuelles et sécurisation",
            "Maintenance urgente",
            "Nettoyage de façades et vitres",
            "Étanchéité localisée"
        ],
        image: "/img/gdcouverture-9.png"
    },
    {
        id: "maintenance",
        icon: ClipboardCheck,
        title: "Offre maintenance & entretien",
        subtitle: "Contrats de maintenance sur mesure",
        services: [
            "Visites régulières d'inspection",
            "Contrôle toitures, façades et étanchéité",
            "Nettoyage des gouttières",
            "Détection préventive des fuites",
            "Petites réparations incluses",
            "Interventions prioritaires en cas d'urgence",
            "Rapport d'intervention avec recommandations"
        ],
        note: "(Travaux hors forfait sur devis après diagnostic)",
        image: "/img/gdcouverture-18.png"
    }
];

export default function ServicesPage() {
    const [activeService, setActiveService] = useState(services[0].id);


    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
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
                body: JSON.stringify(formData),
            })

            if (response.ok) {
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
                    setIsQuoteModalOpen(false)
                    setSubmitStatus('idle')
                }, 2000)
            } else {
                setSubmitStatus('error')
            }
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
            setTimeout(() => setSubmitStatus('idle'), 3000)
        }
    }



    return (
        <div className="min-h-screen bg-white">

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
                            Nos Services
                        </h1>
                        <p className="text-xs font-light text-white/70 mb-4 leading-relaxed">
                            Une gamme complète de solutions BTP pour protéger, valoriser et prolonger la durée de vie de vos bâtiments
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation — desktop only */}
            <section className="hidden md:block bg-white border-b sticky top-0 z-50 backdrop-blur-lg bg-white/80">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="relative">
                        <div className="overflow-x-auto scrollbar-hide">
                            <div className="flex gap-3 min-w-max">
                                {services.map((service) => {
                                    const Icon = service.icon;
                                    const isActive = activeService === service.id;
                                    return (
                                        <button
                                            key={service.id}
                                            onClick={() => setActiveService(service.id)}
                                            className={`px-8 py-3 rounded-full  text-black flex items-center gap-2 font-normal text-xs transition-all duration-200 hover:bg-[#d68910] cursor-pointer whitespace-nowrap ${isActive
                                                ? 'bg-[#f39c12] text-white '
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'
                                                }`} />
                                            <span>{service.title}</span>

                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile: tous les services en file (colonne) */}
            <section className="md:hidden py-8 bg-[#f9f9f9]">
                <div className="max-w-7xl mx-auto px-6 flex flex-col gap-10">
                    {services.map((service) => {
                        const ServiceIcon = service.icon;
                        return (
                            <motion.article
                                key={service.id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.4 }}
                                className="bg-white rounded-2xl overflow-hidden  border-gray-100"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">

                                        <div>
                                            <h2 className="text-xl font-bold text-[#f39c12]">
                                                {service.title}
                                            </h2>
                                            <p className="text-gray-600 text-sm font-medium">
                                                {service.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="h-1 w-16 bg-[#f39c12] rounded-full mb-4" />
                                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                        {service.description}
                                    </p>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                        Nos prestations
                                    </h3>
                                    <ul className="space-y-2 mb-6">
                                        {service.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                                                {/* <CheckCircle2 className="w-4 h-4 text-[#f39c12] flex-shrink-0 mt-0.5" /> */}
                                                <span className="text-[#f39c12] ">•</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#f39c12] text-white font-normal text-xs transition-all duration-200 hover:bg-[#d68910] cursor-pointer" onClick={() => setIsQuoteModalOpen(true)}>
                                        Demander un devis
                                        <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={service.images[0]}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </section>

            {/* Desktop: Main Services Section with Warped Grid (tabs content) */}
            <section className="hidden md:block py-16 md:py-24 bg-[#f9f9f9]">
                <div className="max-w-7xl mx-auto px-8">
                    <AnimatePresence mode="wait">
                        {services.map((service) => {
                            const ServiceIcon = service.icon;
                            if (activeService !== service.id) return null;

                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="grid md:grid-cols-2 gap-12 items-center">
                                        {/* Content */}
                                        <div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                                className="flex items-center gap-3 mb-6"
                                            >

                                                <div>
                                                    <h2 className="text-3xl md:text-4xl font-bold text-[#f39c12]">
                                                        {service.title}
                                                    </h2>
                                                    <p className="text-gray-600 font-medium">
                                                        {service.subtitle}
                                                    </p>
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '6.25rem' }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                                className="h-1 bg-[#f39c12] mb-6"
                                            />

                                            <motion.p
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.1 }}
                                                className="text-gray-600 text-base mb-8 leading-relaxed"
                                            >
                                                {service.description}
                                            </motion.p>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                                className=""
                                            >
                                                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                                    Nos prestations
                                                </h3>
                                                <ul className="space-y-4">
                                                    {service.features.map((feature, index) => (
                                                        <motion.li
                                                            key={index}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                                            className="flex items-start gap-3"
                                                        >

                                                            <span className="text-gray-700">{feature}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </motion.div>

                                            <motion.button
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.4 }} className="mt-8 flex items-center gap-2 px-8 py-3 rounded-full bg-[#f39c12] text-white font-normal text-xs transition-all duration-200 hover:bg-[#d68910] cursor-pointer" onClick={() => setIsQuoteModalOpen(true)}>
                                                Demander un devis
                                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                            </motion.button>
                                        </div>

                                        {/* Warped Image Grid - Inspired by DicedHeroSection */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="relative"
                                        >
                                            <div className="grid grid-cols-1 gap-5 w-full aspect-square">
                                                {[service.images[0]].map((image, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                                        className="relative w-full pb-[100%] overflow-hidden rounded-[20px] group cursor-pointer"
                                                    >
                                                        <img
                                                            src={image}
                                                            alt={`${service.title} ${index + 1}`}
                                                            className={`warped-image ${['bottom-right', 'bottom-left', 'top-right', 'top-left'][index]
                                                                } absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110`}
                                                        />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </section>

            {/* Specialties Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#f39c12] mb-4">
                            Nos Spécialités
                        </h2>
                        <p className="text-gray-600 text-base max-w-2xl mx-auto">
                            Des solutions innovantes pour répondre à vos besoins spécifiques
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {specialties.map((specialty) => {
                            const SpecialtyIcon = specialty.icon;
                            return (
                                <div
                                    key={specialty.id}
                                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl  hover:border-gray-300 transition-all duration-300 overflow-hidden border border-gray-200"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={specialty.image}
                                            alt={specialty.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="flex items-center gap-3 mb-2">

                                                <h3 className="text-2xl font-bold text-white">
                                                    {specialty.title}
                                                </h3>
                                            </div>
                                            <p className="text-white/90 text-sm font-medium">
                                                {specialty.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        {specialty.advantages && (
                                            <div className="mb-6">
                                                <h4 className="text-lg font-semibold text-[#f39c12] mb-4">
                                                    Avantages :
                                                </h4>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {specialty.advantages.map((advantage, index) => (
                                                        <div
                                                            key={index}
                                                            className="bg-[#f39c12]/5 rounded-lg p-3 text-center "
                                                        >
                                                            <CheckCircle2 className="w-5 h-5 text-[#f39c12] mx-auto mb-1" />
                                                            <p className="text-xs font-medium text-gray-700">
                                                                {advantage}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                                Prestations incluses :
                                            </h4>
                                            <ul className="space-y-3">
                                                {specialty.services.map((service, index) => (
                                                    <li key={index} className="flex items-center gap-3">
                                                        <span className="text-[#f39c12] ">•</span>
                                                        <span className="text-gray-700 text-sm">{service}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            {specialty.note && (
                                                <p className="mt-4 text-xs text-gray-500 italic bg-gray-50 p-3 rounded-lg">
                                                    {specialty.note}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="  py-16 md:py-20 relative">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/img/gdcouverture-18.png"
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Besoin d'une intervention ou d'un conseil ?
                    </h2>
                    <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                        Notre équipe d'experts est à votre disposition pour évaluer vos besoins et vous proposer la solution la plus adaptée.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
                            Nous appeler maintenant
                        </button>
                        <button className="px-8 py-3 rounded-full bg-[#f39c12] text-white font-normal text-xs transition-all duration-200 hover:bg-[#d68910] cursor-pointer" onClick={() => setIsQuoteModalOpen(true)}>
                            Demander un devis gratuit
                        </button>

                    </div>
                </div>
            </section>



            {/* Quote Request Modal */}
            {isQuoteModalOpen && (
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
                                    onClick={() => setIsQuoteModalOpen(false)}
                                    className="w-10 h-10  hover:scale-110 cursor-pointer rounded-full flex items-center justify-center transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
            )}

            {/* Warped Image Styles */}
            <style jsx>{`
                .warped-image {
                    --r: 20px;
                    --s: 40px;
                    --x: 25px;
                    --y: 5px;
                }
                .top-right {
                    --_m:/calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 70%,#0000 72%);
                    --_g:conic-gradient(at calc(100% - var(--r)) var(--r),#0000 25%,#000 0);
                    --_d:(var(--s) + var(--r));
                    mask: calc(100% - var(--_d) - var(--x)) 0 var(--_m), 100% calc(var(--_d) + var(--y)) var(--_m), radial-gradient(var(--s) at 100% 0,#0000 99%,#000 calc(100% + 1px)) calc(-1*var(--r) - var(--x)) calc(var(--r) + var(--y)), var(--_g) calc(-1*var(--_d) - var(--x)) 0, var(--_g) 0 calc(var(--_d) + var(--y));
                    mask-repeat: no-repeat;
                }
                .top-left {
                    --_m:/calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 70%,#0000 72%);
                    --_g:conic-gradient(at var(--r) var(--r),#000 75%,#0000 0);
                    --_d:(var(--s) + var(--r));
                    mask: calc(var(--_d) + var(--x)) 0 var(--_m), 0 calc(var(--_d) + var(--y)) var(--_m), radial-gradient(var(--s) at 0 0,#0000 99%,#000 calc(100% + 1px)) calc(var(--r) + var(--x)) calc(var(--r) + var(--y)), var(--_g) calc(var(--_d) + var(--x)) 0, var(--_g) 0 calc(var(--_d) + var(--y));
                    mask-repeat: no-repeat;
                }
                .bottom-left {
                    --_m:/calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 70%,#0000 72%);
                    --_g:conic-gradient(from 180deg at var(--r) calc(100% - var(--r)),#0000 25%,#000 0);
                    --_d:(var(--s) + var(--r));
                    mask: calc(var(--_d) + var(--x)) 100% var(--_m), 0 calc(100% - var(--_d) - var(--y)) var(--_m), radial-gradient(var(--s) at 0 100%,#0000 99%,#000 calc(100% + 1px)) calc(var(--r) + var(--x)) calc(-1*var(--r) - var(--y)), var(--_g) calc(var(--_d) + var(--x)) 0, var(--_g) 0 calc(-1*var(--_d) - var(--y));
                    mask-repeat: no-repeat;
                }
                .bottom-right {
                    --_m:/calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 70%,#0000 72%);
                    --_g:conic-gradient(from 90deg at calc(100% - var(--r)) calc(100% - var(--r)),#0000 25%,#000 0);
                    --_d:(var(--s) + var(--r));
                    mask: calc(100% - var(--_d) - var(--x)) 100% var(--_m), 100% calc(100% - var(--_d) - var(--y)) var(--_m), radial-gradient(var(--s) at 100% 100%,#0000 99%,#000 calc(100% + 1px)) calc(-1*var(--r) - var(--x)) calc(-1*var(--r) - var(--y)), var(--_g) calc(-1*var(--_d) - var(--x)) 0, var(--_g) 0 calc(-1*var(--_d) - var(--y));
                    mask-repeat: no-repeat;
                }
            `}</style>
        </div>
    );
}