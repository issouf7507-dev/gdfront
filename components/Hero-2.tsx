import Image from 'next/image'

const Hero2 = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/img/hear.jpg"
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* <header className="relative z-20 flex items-center justify-between p-6">

                <div className="flex items-center">
                    <svg width="24" height="24" viewBox="0 0 392.02 324.6" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill="#f39c12" d="M268.08,0c-27.4,0-51.41,4.43-72.07,13.26C175.36,4.43,151.35,0,123.95,0H0v324.6h123.95c27.37,0,51.38-4.58,72.07-13.7,20.69,9.12,44.7,13.7,72.07,13.7h123.95V0h-123.95ZM324.09,268.36h-47.91c-20.25,0-37.3-4.05-51.18-12.15-12.28-7.17-21.94-17.41-28.99-30.7h0s0,0,0,0c0,0,0,0,0,0h0c-7.05,13.29-16.71,23.53-28.99,30.7-13.87,8.1-30.93,12.15-51.18,12.15h-47.91V56.24h47.91c19.8,0,36.67,4.01,50.61,12.04,12.51,7.2,22.35,17.47,29.55,30.77h0s0,0,0,0c0,0,0,0,0,0h0c7.2-13.3,17.04-23.57,29.55-30.77,13.95-8.02,30.82-12.04,50.61-12.04h47.91v212.13Z"></path></svg>
                </div>


                <nav className="flex items-center space-x-2">
                    <a
                        href="#"
                        className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
                    >
                        Products
                    </a>
                    <a
                        href="#"
                        className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
                    >
                        Pricing
                    </a>
                    <a
                        href="#"
                        className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
                    >
                        Docs
                    </a>
                </nav>


                <div id="gooey-btn" className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
                    <button className="absolute right-0 px-2.5 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-19 z-0">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </button>
                    <button className="px-6 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center z-10">
                        Login
                    </button>
                </div>
            </header> */}
            <main className="absolute bottom-8 left-8 z-20 max-w-5xl">
                <div className="text-left">
                    <div
                        className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
                        style={{
                            filter: "url(#glass-effect)",
                        }}
                    >
                        <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                        <span className="text-white/90 text-xs font-light relative z-10">✨ GD COUVERTURE</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-6xl leading-14 tracking-tight  text-white mb-4">
                        <span className="italic instrument">Expertise en Toiture & Travaux d’Accès Difficile en </span> Île-de-France
                        <br />
                        {/* <span className="tracking-tight text-white font-bold">Experiences</span> */}
                    </h1>

                    {/* Description */}
                    <p className="text-xs font-light text-white/70 mb-4 leading-relaxed">
                        De la rénovation de toiture à la recherche de fuites, nos artisans cordistes interviennent là où les autres s'arrêtent.
                    </p>

                    {/* Buttons */}
                    <div className="flex items-center gap-4 flex-wrap">
                        <button className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
                            Demander un devis
                        </button>
                        <button className="px-8 py-3 rounded-full bg-[#f39c12] text-white font-normal text-xs transition-all duration-200 hover:bg-[#d68910] cursor-pointer">
                            Nous contacter
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Hero2