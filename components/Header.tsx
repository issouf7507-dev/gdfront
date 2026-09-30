"use client";
import { getAttribution, trackLead } from "@/lib/analytics";
import { HoneypotField, honeypotValue } from "@/components/HoneypotField";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Menu, X, Send, CheckCircle2, User, Mail, Phone, Building2, MessageSquare, ArrowUpRight, MessageCircle } from 'lucide-react'
import Image from 'next/image';
import { OPEN_QUOTE_EVENT } from '@/lib/quote-modal';
import { PHONE, PHONE_DISPLAY, whatsappUrl } from '@/lib/site';

const NAV_LINKS = [
    { href: '/', label: 'Accueil' },
    { href: '/a-propos', label: 'À propos' },
    { href: '/services', label: 'Services' },
    { href: '/realisations', label: 'Réalisations' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
]

const EASE = [0.22, 1, 0.36, 1] as const

const Header = () => {
    const headerRef = useRef<HTMLDivElement>(null)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const pathname = usePathname()
    const reduceMotion = useReducedMotion()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

    // Le header se masque quand on descend et réapparaît dès qu'on remonte
    useEffect(() => {
        let lastY = window.scrollY
        const handleScroll = () => {
            const scrollY = window.scrollY
            setIsScrolled(scrollY > 50)
            setIsHidden(scrollY > 300 && scrollY > lastY)
            lastY = scrollY
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isActive = (href: string) => href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

    useEffect(() => {
        if (isMobileMenuOpen || isQuoteModalOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen, isQuoteModalOpen])

    const handleQuoteClick = () => {
        setIsMobileMenuOpen(false)
        setIsQuoteModalOpen(true)
    }

    // Permet d'ouvrir la modale de devis depuis n'importe quelle page (voir lib/quote-modal.ts)
    useEffect(() => {
        window.addEventListener(OPEN_QUOTE_EVENT, handleQuoteClick)
        return () => window.removeEventListener(OPEN_QUOTE_EVENT, handleQuoteClick)
    }, [])

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
        <>
            <header
                ref={headerRef}
                className={`fixed inset-x-0 top-0 z-50 px-3 transition-[padding,transform] duration-500 ease-out md:px-6 ${isScrolled ? 'pt-3' : 'pt-4 md:pt-6'} ${isHidden && !isMobileMenuOpen ? '-translate-y-[120%]' : 'translate-y-0'}`}
            >
                <div
                    className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border pl-4 pr-2 transition-all duration-500 ease-out md:pl-6 ${isScrolled
                        ? 'border-neutral-200/70 bg-white/85 py-2 shadow-lg shadow-neutral-950/5 backdrop-blur-xl'
                        : 'border-white/40 bg-white/95 py-2.5 backdrop-blur-md'
                        }`}
                >
                    <Link href="/" className="flex shrink-0 items-center" aria-label="GD Couverture — accueil">
                        <Image src="/img/logo_GDCCI.webp" alt="GD Couverture" width={100} height={100} className={`w-auto transition-all duration-500 ${isScrolled ? 'h-9' : 'h-11'}`} priority />
                    </Link>

                    <nav className="hidden items-center gap-1 lg:flex">
                        {NAV_LINKS.map((link) => {
                            const active = isActive(link.href)
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-current={active ? 'page' : undefined}
                                    className={`relative isolate rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${active ? 'text-neutral-950' : 'text-neutral-500 hover:text-neutral-950'}`}
                                >
                                    {active && (
                                        <motion.span
                                            layoutId="nav-active"
                                            className="absolute inset-0 -z-10 rounded-full bg-neutral-100"
                                            transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 32 }}
                                        />
                                    )}
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="hidden items-center gap-2 lg:flex">
                        <a
                            href={`tel:${PHONE}`}
                            className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                        >
                            <Phone className="h-4 w-4 text-brand" />
                            <span className="hidden xl:inline">{PHONE_DISPLAY}</span>
                        </a>
                        <button
                            onClick={handleQuoteClick}
                            className="group flex cursor-pointer items-center gap-2 rounded-full bg-neutral-950 py-2.5 pl-5 pr-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand"
                        >
                            Demander un devis
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand transition-colors group-hover:bg-white/20">
                                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                            </span>
                        </button>
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                        aria-expanded={isMobileMenuOpen}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-950 text-white transition-colors hover:bg-brand lg:hidden"
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </header>

            {/* Menu mobile plein écran */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-neutral-950 px-6 pb-8 pt-28 lg:hidden"
                    >
                        <nav className="flex flex-1 flex-col gap-1">
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: EASE, delay: 0.05 + i * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-baseline gap-4 py-2 text-4xl font-semibold tracking-tight transition-colors ${isActive(link.href) ? 'text-brand' : 'text-white hover:text-brand'}`}
                                    >
                                        <span className="text-xs font-medium text-white/40">{String(i + 1).padStart(2, '0')}</span>
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
                            className="mt-8 space-y-3"
                        >
                            <button
                                onClick={handleQuoteClick}
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
                            >
                                Demander un devis
                                <ArrowUpRight className="h-5 w-5" />
                            </button>
                            <div className="grid grid-cols-2 gap-3">
                                <a href={`tel:${PHONE}`} className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3.5 text-sm font-semibold text-white">
                                    <Phone className="h-4 w-4" /> Appeler
                                </a>
                                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3.5 text-sm font-semibold text-white">
                                    <MessageCircle className="h-4 w-4" /> WhatsApp
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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
            )}
        </>
    );
};

export default Header;