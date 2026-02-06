"use client";
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Menu, X, Send, CheckCircle2, User, Mail, Phone, Building2, MessageSquare } from 'lucide-react'
import Image from 'next/image';

const Header = () => {
    const headerRef = useRef<HTMLDivElement>(null)
    const [isScrolled, setIsScrolled] = useState(false)
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

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            setIsScrolled(scrollY > 50)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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
        <>
            {/* SVG Filter for Gooey Effect */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="gooey-filter">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                            result="gooey"
                        />
                    </filter>
                </defs>
            </svg>

            <header
                ref={headerRef}
                className={`z-50 fixed top-0 left-0 right-0 transition-all duration-500 ease-out ${isScrolled ? 'py-3 px-4 md:px-6' : 'py-4 md:py-6 px-4 md:px-6'
                    }`}
            >
                <div
                    className={`flex items-center justify-between transition-all duration-500 ease-out ${isScrolled
                        ? 'bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-full px-4 md:px-6 py-3 '
                        : 'bg-transparent px-0 py-0'
                        }`}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image src="/img/logo_GDCCI.png" alt="GD Couverture" width={100} height={100} />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-2">
                        <Link
                            href="/"
                            className={`text-xs font-light px-3 py-2 rounded-full transition-all duration-200 ${isScrolled
                                ? 'text-gray-700 hover:text-black hover:bg-gray-100'
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            Accueil
                        </Link>
                        <Link
                            href="/a-propos"
                            className={`text-xs font-light px-3 py-2 rounded-full transition-all duration-200 ${isScrolled
                                ? 'text-gray-700 hover:text-black hover:bg-gray-100'
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            À propos
                        </Link>
                        <Link
                            href="/services"
                            className={`text-xs font-light px-3 py-2 rounded-full transition-all duration-200 ${isScrolled
                                ? 'text-gray-700 hover:text-black hover:bg-gray-100'
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            Services
                        </Link>
                        <Link
                            href="/contact"
                            className={`text-xs font-light px-3 py-2 rounded-full transition-all duration-200 ${isScrolled
                                ? 'text-gray-700 hover:text-black hover:bg-gray-100'
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Desktop CTA Button */}
                    <div className="hidden lg:flex">
                        <div
                        // id="gooey-btn"
                        // className="relative flex items-center group"
                        // style={{ filter: 'url(#gooey-filter)' }}
                        >

                            <button
                                onClick={handleQuoteClick}
                                className="px-6 py-2 rounded-full bg-[#f39c12] text-white font-normal text-xs transition-all duration-300 hover:bg-[#d68910] cursor-pointer h-8 flex items-center z-10"
                            >
                                Demander un devis
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`lg:hidden p-2 rounded-full transition-all duration-200 ${isScrolled
                            ? 'text-gray-700 hover:bg-gray-100'
                            : 'text-white hover:bg-white/10'
                            }`}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed top-0 right-0 h-full w-[280px] bg-white z-40 transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 392.02 324.6"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="#f39c12"
                                d="M268.08,0c-27.4,0-51.41,4.43-72.07,13.26C175.36,4.43,151.35,0,123.95,0H0v324.6h123.95c27.37,0,51.38-4.58,72.07-13.7,20.69,9.12,44.7,13.7,72.07,13.7h123.95V0h-123.95ZM324.09,268.36h-47.91c-20.25,0-37.3-4.05-51.18-12.15-12.28-7.17-21.94-17.41-28.99-30.7h0s0,0,0,0c0,0,0,0,0,0h0c-7.05,13.29-16.71,23.53-28.99,30.7-13.87,8.1-30.93,12.15-51.18,12.15h-47.91V56.24h47.91c19.8,0,36.67,4.01,50.61,12.04,12.51,7.2,22.35,17.47,29.55,30.77h0s0,0,0,0c0,0,0,0,0,0h0c7.2-13.3,17.04-23.57,29.55-30.77,13.95-8.02,30.82-12.04,50.61-12.04h47.91v212.13Z"
                            ></path>
                        </svg>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <nav className="flex flex-col p-6 space-y-1 flex-1">
                        <Link
                            href="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-gray-700 hover:text-black hover:bg-gray-100 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium"
                        >
                            Accueil
                        </Link>
                        <Link
                            href="/a-propos"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-gray-700 hover:text-black hover:bg-gray-100 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium"
                        >
                            À propos
                        </Link>
                        <Link
                            href="/services"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-gray-700 hover:text-black hover:bg-gray-100 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium"
                        >
                            Services
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-gray-700 hover:text-black hover:bg-gray-100 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium"
                        >
                            Contact
                        </Link>
                    </nav>

                    <div className="p-6 border-t">
                        <button
                            onClick={handleQuoteClick}
                            className="w-full px-6 py-3 rounded-full bg-[#f39c12] text-white font-medium text-sm transition-all duration-300 hover:bg-[#d68910] cursor-pointer flex items-center justify-center gap-2"
                        >
                            Demander un devis
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 17L17 7M17 7H7M17 7V17"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

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
        </>
    );
};

export default Header;