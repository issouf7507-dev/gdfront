'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const router = useRouter();
    const slides = [
        {
            image: '/img/hero-1.jpeg',
            title: 'Excellence et Innovation',
            subtitle: `Des solutions professionnelles pour vos projets \n avec des experts en intelligence artificielle et en développement web`,
        },
        {
            image: '/img/hero-2.jpeg',
            title: 'Votre Partenaire de Confiance',
            subtitle: `Qualité, Expertise et Engagement \n avec des experts en intelligence artificielle et en développement web`,
        }
    ];

    // Carrousel automatique toutes les 5 secondes
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Images en arrière-plan avec transition */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    {/* Overlay gradient pour améliorer la lisibilité */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
                </div>
            ))}

            {/* Contenu principal */}
            <div className="relative z-10 flex h-full flex-col items-start justify-center px-4 ">
                <div className="   w-full space-y-6 max-w-[1700px] mx-auto ">
                    {/* Titre avec animation */}
                    <h1 className="text-5xl font-bold text-white md:text-6xl lg:text-7xl animate-fade-in">
                        {slides[currentSlide].title}
                    </h1>

                    {/* Sous-titre */}
                    <p className="text-xl text-white/90 md:text-2xl lg:text-3xl animate-fade-in-delay whitespace-pre-line">
                        {slides[currentSlide].subtitle}
                    </p>

                    {/* Boutons CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-start items-center pt-4 animate-fade-in-delay-2">
                        <button className="px-8 py-4 bg-[#f39c12] text-white font-semibold rounded-lg hover:bg-[#d68910] transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Nos Services
                        </button>
                        <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/50 hover:bg-white/20 transition-all duration-300 transform hover:scale-105" onClick={() => {
                            router.push('/contact');
                        }}>
                            Nous Contacter
                        </button>
                    </div>
                </div>

                {/* Indicateurs de navigation */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-3 rounded-full transition-all duration-300 ${currentSlide === index
                                ? 'w-12 bg-white'
                                : 'w-3 bg-white/50 hover:bg-white/75'
                                }`}
                            aria-label={`Aller à la slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Bouton scroll down */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce">
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </div>
    );
};

export default Hero;