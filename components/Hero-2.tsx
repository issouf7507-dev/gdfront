import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const Hero2 = () => {
    const router = useRouter();
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/img/cover11.jpg"
                    alt="Hero Background"
                    fill
                    className="object-cover animate-subtle-zoom"
                    priority
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20" />
            </div>


            <main className="absolute bottom-8 left-8 z-20 max-w-5xl">
                <div className="text-left">
                    <div
                        className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative animate-fade-in-down"
                        style={{
                            filter: "url(#glass-effect)",
                            animationDelay: "0.2s",
                            opacity: 0,
                            animationFillMode: "forwards"
                        }}
                    >
                        <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                        <span className="text-white/90 text-xs font-light relative z-10"> GD COUVERTURE</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-6xl leading-14 tracking-tight text-white mb-4 animate-fade-in-up"
                        style={{
                            animationDelay: "0.4s",
                            opacity: 0,
                            animationFillMode: "forwards"
                        }}
                    >
                        <span className="italic instrument">Une expertise reconnue au service de  </span> votre patrimoine
                        <br />
                    </h1>

                    {/* Description */}
                    <p className="text-xs font-light text-white/70 mb-4 leading-relaxed animate-fade-in-up"
                        style={{
                            animationDelay: "0.6s",
                            opacity: 0,
                            animationFillMode: "forwards"
                        }}
                    >
                        Votre partenaire de confiance pour la conservation de vos bâtiments
                    </p>

                    {/* Buttons */}
                    <div className="flex items-center gap-4 flex-wrap animate-fade-in-up"
                        style={{
                            animationDelay: "0.8s",
                            opacity: 0,
                            animationFillMode: "forwards"
                        }}
                    >
                        <button className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105 cursor-pointer">
                            Demander un devis
                        </button>
                        <button className="px-8 py-3 rounded-full bg-[#f39c12] text-white font-normal text-xs transition-all duration-300 hover:bg-[#d68910] hover:scale-105 hover:shadow-lg hover:shadow-[#f39c12]/30 cursor-pointer" onClick={() => {
                            router.push('/contact');
                        }}>
                            Nous contacter
                        </button>
                    </div>
                </div>
            </main>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes subtleZoom {
                    from {
                        transform: scale(1);
                    }
                    to {
                        transform: scale(1.05);
                    }
                }

                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out;
                }

                .animate-fade-in-down {
                    animation: fadeInDown 0.8s ease-out;
                }

                .animate-subtle-zoom {
                    animation: subtleZoom 20s ease-in-out infinite alternate;
                }
            `}</style>
        </div>
    )
}

export default Hero2