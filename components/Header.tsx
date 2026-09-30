"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { Menu, X, Phone, ArrowUpRight, MessageCircle } from 'lucide-react'
import Image from 'next/image';
import dynamic from 'next/dynamic';
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

const QuoteModal = dynamic(() => import('./QuoteModal'), { ssr: false })

const Header = () => {
    const headerRef = useRef<HTMLDivElement>(null)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const pathname = usePathname()
    const reduceMotion = useReducedMotion()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

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
                                        <m.span
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
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-neutral-950 px-6 pb-8 pt-28 lg:hidden"
                    >
                        <nav className="flex flex-1 flex-col gap-1">
                            {NAV_LINKS.map((link, i) => (
                                <m.div
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
                                </m.div>
                            ))}
                        </nav>

                        <m.div
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
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>

            {/* Modale de devis, chargée seulement à l'ouverture */}
            {isQuoteModalOpen && <QuoteModal onClose={() => setIsQuoteModalOpen(false)} />}
        </>
    );
};

export default Header;