'use client';

import { useState, useEffect } from 'react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Détecte le scroll pour changer le style du header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Accueil', href: '#accueil' },
        { name: 'Services', href: '#services' },
        { name: 'Projets', href: '#projets' },
        { name: 'À Propos', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-lg py-4'
                    : 'bg-transparent py-6'
            }`}
        >
            <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="#accueil" className="flex items-center space-x-2">
                            <div className={`text-2xl font-bold transition-colors duration-300 ${
                                isScrolled ? 'text-gray-900' : 'text-white'
                            }`}>
                                <span className="text-[#f39c12]">GD</span>COUV
                            </div>
                        </a>
                    </div>

                    {/* Navigation Desktop */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`font-medium transition-all duration-300 hover:scale-105 ${
                                    isScrolled
                                        ? 'text-gray-700 hover:text-[#f39c12]'
                                        : 'text-white hover:text-[#f5b041]'
                                }`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Bouton CTA Desktop */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <a
                            href="tel:+33123456789"
                            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                                isScrolled
                                    ? 'bg-[#f39c12] text-white hover:bg-[#d68910] shadow-md'
                                    : 'bg-white text-[#f39c12] hover:bg-gray-100'
                            }`}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>Contactez-nous</span>
                        </a>
                    </div>

                    {/* Bouton Menu Mobile */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
                            isScrolled
                                ? 'text-gray-900 hover:bg-gray-100'
                                : 'text-white hover:bg-white/10'
                        }`}
                        aria-label="Menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Menu Mobile */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ${
                        isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
                    }`}
                >
                    <nav className="flex flex-col space-y-3 py-4 bg-white/95 backdrop-blur-md rounded-lg shadow-xl px-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-700 hover:text-[#f39c12] font-medium py-2 transition-colors duration-300"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="tel:+33123456789"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#f39c12] text-white rounded-lg font-semibold hover:bg-[#d68910] transition-colors duration-300 mt-2"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>Contactez-nous</span>
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;