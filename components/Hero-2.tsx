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
                    src="/img/hero-gd.png"
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>


            <main className="absolute bottom-8 left-8 z-20 max-w-5xl">
                <div className="text-left">
                    <div
                        className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
                        style={{
                            filter: "url(#glass-effect)",
                        }}
                    >
                        <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                        <span className="text-white/90 text-xs font-light relative z-10"> GD COUVERTURE</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-6xl leading-14 tracking-tight  text-white mb-4">
                        <span className="italic instrument">Une expertise reconnue au service de  </span> votre patrimoine
                        <br />
                        {/* <span className="tracking-tight text-white font-bold">Experiences</span> */}
                    </h1>

                    {/* Description */}
                    <p className="text-xs font-light text-white/70 mb-4 leading-relaxed">
                        Votre partenaire de confiance pour la conservation de vos bâtiments
                    </p>

                    {/* Buttons */}
                    <div className="flex items-center gap-4 flex-wrap">
                        <button className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
                            Demander un devis
                        </button>
                        <button className="px-8 py-3 rounded-full bg-[#f39c12] text-white font-normal text-xs transition-all duration-200 hover:bg-[#d68910] cursor-pointer" onClick={() => {
                            router.push('/contact');
                        }}>
                            Nous contacter
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Hero2