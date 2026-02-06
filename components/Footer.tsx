"use client";
import React, { useState, type FC, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    Home,
    Droplet,
    Wrench,
    Building2,
    PaintBucket,
    Brush
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Props for the Footer component.
 */
interface FooterProps extends React.HTMLAttributes<HTMLElement> {
    /** The source URL for the company logo. */
    logoSrc?: string;
    /** The name of the company, displayed next to the logo. */
    companyName?: string;
    /** A short description of the company. */
    description?: string;
    /** An array of objects for generating service links. */
    serviceLinks?: { label: string; href: string; icon?: ReactNode }[];
    /** An array of objects for generating quick links. */
    quickLinks?: { label: string; href: string }[];
    /** An array of objects for generating social media links. */
    socialLinks?: { label: string; href: string; icon: ReactNode }[];
    /** The title for the newsletter subscription section. */
    newsletterTitle?: string;
    /** Async function to handle email subscription. Should return `true` for success and `false` for failure. */
    onSubscribe?: (email: string) => Promise<boolean>;
}

/**
 * Footer component for GD Couverture - BTP Multi-services
 */
export const Footer: FC<FooterProps> = ({
    logoSrc = "/logo.png",
    companyName = 'GD COUVERTURE',
    description = 'Entreprise BTP multi-services spécialisée dans l\'enveloppe globale du bâtiment et la maintenance technique. Plus de 25 ans d\'expérience au service de vos projets en Côte d\'Ivoire.',
    serviceLinks = [
        { label: 'Couverture', href: '/services#couverture', icon: <Home className="w-4 h-4" /> },
        { label: 'Étanchéité', href: '/services#etancheite', icon: <Droplet className="w-4 h-4" /> },
        { label: 'Plomberie', href: '/services#plomberie', icon: <Wrench className="w-4 h-4" /> },
        { label: 'Ravalement', href: '/services#ravalement', icon: <Building2 className="w-4 h-4" /> },
        { label: 'Peinture', href: '/services#peinture', icon: <PaintBucket className="w-4 h-4" /> },
        { label: 'Rénovation', href: '/services#renovation', icon: <Brush className="w-4 h-4" /> },
    ],
    quickLinks = [
        { label: 'À propos', href: '/a-propos' },
        { label: 'Nos services', href: '/services' },
        { label: 'Contact', href: '/contact' },

    ],
    socialLinks = [
        {
            label: 'Facebook',
            href: 'https://facebook.com/gdcouverture',
            icon: <Facebook className="w-5 h-5" />
        },
        {
            label: 'Instagram',
            href: 'https://instagram.com/gdcouverture',
            icon: <Instagram className="w-5 h-5" />
        },
        {
            label: 'LinkedIn',
            href: 'https://linkedin.com/company/gdcouverture',
            icon: <Linkedin className="w-5 h-5" />
        },
    ],
    newsletterTitle = 'Restez informé',
    onSubscribe,
    className,
    ...props
}) => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubscribe = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!email || !onSubscribe || isSubmitting) return;

        setIsSubmitting(true);
        const success = await onSubscribe(email);

        setSubscriptionStatus(success ? 'success' : 'error');
        setIsSubmitting(false);

        if (success) {
            setEmail('');
        }

        // Reset the status message after 3 seconds
        setTimeout(() => {
            setSubscriptionStatus('idle');
        }, 3000);
    };

    return (
        <footer className={cn('bg-gray-900 text-white', className)} {...props}>
            <div className="container mx-auto grid grid-cols-1 gap-8 px-8 py-16 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">

                {/* Company Info - Takes 2 columns on large screens */}
                <div className="lg:col-span-2 flex flex-col items-start gap-4">
                    <div className="flex items-center gap-3">

                        <div>
                            {/* <span className="text-2xl font-bold text-white">{companyName}</span> */}
                            {/* <p className="text-xs text-[#f39c12] font-semibold">BTP Multi-services</p> */}
                            <Link href="/" className="flex items-center">
                                <Image src="/img/logo_GDCCI.png" alt="GD Couverture" width={100} height={100} />
                            </Link>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-md">
                        {description}
                    </p>

                    {/* Contact Info */}
                    <div className="space-y-3 mt-4">
                        <a
                            href="tel:+2250713488488"
                            className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#f39c12] transition-colors group"
                        >
                            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center  transition-colors">
                                <Phone className="w-4 h-4" />
                            </div>
                            <span>+225 07 13 48 84 88</span>
                        </a>
                        <a
                            href="mailto:contact@gdcouverture.ci" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#f39c12] transition-colors group"
                        >
                            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center  transition-colors">
                                <Mail className="w-4 h-4" />
                            </div>
                            <span>contact@gdcouverture.ci</span>
                        </a>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <span> <a href="https://maps.google.com/?q=Abidjan,Cocody" target="_blank" rel="noopener noreferrer">Cocody Danga, Abidjan Côte d'Ivoire</a></span>
                        </div>
                    </div>
                </div>

                {/* Services */}
                <div>
                    <h3 className="mb-4 text-base font-bold text-white">Nos Services</h3>
                    <ul className="space-y-2">
                        {serviceLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#f39c12] group"
                                >
                                    <span className="text-gray-600 group-hover:text-[#f39c12] transition-colors">
                                        {link.icon}
                                    </span>
                                    <span>{link.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="mb-4 text-base font-bold text-white">Liens Rapides</h3>
                    <ul className="space-y-2">
                        {quickLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="text-sm text-gray-400 transition-colors hover:text-[#f39c12] inline-block"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="mb-4 text-base font-bold text-white">{newsletterTitle}</h3>
                    <p className="text-sm text-gray-400 mb-4">
                        Recevez nos actualités et conseils
                    </p>
                    <form onSubmit={handleSubscribe} className="relative w-full">
                        <div className="relative">
                            <Input
                                type="email"
                                placeholder="Votre email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isSubmitting || subscriptionStatus !== 'idle'}
                                required
                                aria-label="Email pour la newsletter"
                                className="pr-24 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#f39c12]"
                            />
                            <Button
                                type="submit"
                                disabled={isSubmitting || subscriptionStatus !== 'idle'}
                                className="absolute right-0 top-0 h-full rounded-l-none px-3 bg-[#f39c12] hover:bg-[#d68910] text-white border-none text-xs"
                            >
                                {isSubmitting ? 'Envoi...' : 'OK'}
                            </Button>
                        </div>
                        {/* Status Overlay */}
                        {(subscriptionStatus === 'success' || subscriptionStatus === 'error') && (
                            <div
                                key={subscriptionStatus}
                                className="animate-in fade-in absolute inset-0 flex items-center justify-center rounded-lg bg-gray-800/95 text-center backdrop-blur-sm"
                            >
                                {subscriptionStatus === 'success' ? (
                                    <span className="font-semibold text-[#f39c12]">Inscrit ! 🎉</span>
                                ) : (
                                    <span className="font-semibold text-red-500">Erreur. Réessayez.</span>
                                )}
                            </div>
                        )}
                    </form>

                    {/* Social Links */}
                    <div className="mt-6">
                        <h4 className="text-sm font-semibold text-gray-300 mb-3">Suivez-nous</h4>
                        <div className="flex gap-3">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#f39c12] hover:text-white transition-all duration-300"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-500 text-center md:text-left">
                            © {new Date().getFullYear()} GD Couverture. Tous droits réservés.
                        </p>
                        <div className="flex gap-6 text-sm text-gray-500">
                            <a href="/mentions-legales" className="hover:text-[#f39c12] transition-colors">
                                Mentions légales
                            </a>
                            <a href="/confidentialite" className="hover:text-[#f39c12] transition-colors">
                                Confidentialité
                            </a>
                            {/* <a href="/cgv" className="hover:text-[#f39c12] transition-colors">
                                CGV
                            </a> */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;