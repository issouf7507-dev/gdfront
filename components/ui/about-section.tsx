"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
export default function AboutSection3() {
    const heroRef = useRef<HTMLDivElement>(null);
    const revealVariants = {
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                delay: i * 0.1,
                duration: 0.2,
            },
        }),
        hidden: {
            filter: "blur(10px)",
            y: -20,
            opacity: 0,
        },
    };
    const scaleVariants = {
        visible: (i: number) => ({
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                delay: i * 0.1,
                duration: 0.2,
            },
        }),
        hidden: {
            filter: "blur(10px)",
            opacity: 0,
        },
    };
    const router = useRouter();
    return (
        <section className="py-8 px-4 bg-[#f9f9f9]" ref={heroRef}>
            <div className="max-w-6xl mx-auto">
                <div className="relative">
                    {/* Header with social icons */}
                    <div className="flex justify-between items-center mb-8 w-[85%] absolute lg:top-4 md:top-0 sm:-top-2 -top-3 z-10">
                        <div className="flex items-center gap-2  text-xl">
                            <span className="text-[#f39c12] animate-spin text-xl">✱</span>
                            <TimelineContent
                                as="span"
                                animationNum={0}
                                timelineRef={heroRef}
                                customVariants={revealVariants}
                                className="text-xl font-medium text-gray-600 "
                            >
                                Qui sommes-nous ?
                            </TimelineContent>
                        </div>
                    </div>

                    <TimelineContent
                        as="figure"
                        animationNum={4}
                        timelineRef={heroRef}
                        customVariants={scaleVariants}
                        className="relative group"
                    >
                        <svg
                            className="w-full"
                            width={"100%"}
                            height={"100%"}
                            viewBox="0 0 100 40"
                        >
                            <defs>
                                <clipPath
                                    id="clip-inverted"
                                    clipPathUnits={"objectBoundingBox"}
                                >
                                    <path
                                        d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                                        fill="#D9D9D9"
                                    />
                                </clipPath>
                            </defs>
                            <image
                                clipPath="url(#clip-inverted)"
                                preserveAspectRatio="xMidYMid slice"
                                width={"100%"}
                                height={"100%"}
                                xlinkHref="/img/qui-somme.png"
                            ></image>
                        </svg>
                    </TimelineContent>

                    {/* Stats */}
                    <div className="flex flex-wrap lg:justify-start justify-between items-center py-3 text-sm">
                        <TimelineContent
                            as="div"
                            animationNum={5}
                            timelineRef={heroRef}
                            customVariants={revealVariants}
                            className="flex gap-4"
                        >
                            <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                                <span className="text-[#f39c12] font-bold">+25</span>
                                <span className="text-gray-600">ans d'expérience</span>
                                <span className="text-gray-300">|</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                                <span className="text-[#f39c12] font-bold">Depuis 2010</span>
                                <span className="text-gray-600">en France</span>
                            </div>
                        </TimelineContent>
                        <div className="lg:absolute right-0 bottom-16 flex lg:flex-col flex-row-reverse lg:gap-0 gap-4">
                            <TimelineContent
                                as="div"
                                animationNum={6}
                                timelineRef={heroRef}
                                customVariants={revealVariants}
                                className="flex lg:text-4xl sm:text-3xl text-2xl items-center gap-2 mb-2"
                            >
                                <span className="text-[#f39c12] font-semibold">100+</span>
                                <span className="text-gray-600 uppercase">clients </span>
                            </TimelineContent>
                            <TimelineContent
                                as="div"
                                animationNum={7}
                                timelineRef={heroRef}
                                customVariants={revealVariants}
                                className="flex items-center gap-2 mb-2 sm:text-base text-xs"
                            >
                                <span className="text-[#f39c12] font-bold">+500</span>
                                <span className="text-gray-600">chantiers réussis</span>
                                <span className="text-gray-300 lg:hidden block">|</span>
                            </TimelineContent>
                        </div>
                    </div>
                </div>
                {/* Main Content */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">

                        <h1 className="sm:text-4xl md:text-5xl text-2xl !leading-[110%] font-semibold text-[#f39c12] mb-8">
                            <VerticalCutReveal
                                splitBy="words"
                                staggerDuration={0.1}
                                staggerFrom="first"
                                reverse={true}
                                transition={{
                                    type: "spring",
                                    stiffness: 250,
                                    damping: 30,
                                    delay: 3,
                                }}
                            >
                                Votre partenaire BTP multi-services pour l'enveloppe du bâtiment
                            </VerticalCutReveal>
                        </h1>

                        <TimelineContent
                            as="div"
                            animationNum={9}
                            timelineRef={heroRef}
                            customVariants={revealVariants}
                            className="grid md:grid-cols-2 gap-8 text-gray-600"
                        >
                            <TimelineContent
                                as="div"
                                animationNum={10}
                                timelineRef={heroRef}
                                customVariants={revealVariants}
                                className="sm:text-base text-xs"
                            >
                                <p className="leading-relaxed text-justify">
                                    Adossée à une maison mère en France créée en 2010, GD Couverture bénéficie de plus de 25 ans d'expérience dans le bâtiment. Notre expertise couvre l'enveloppe globale du bâtiment et la maintenance technique, avec une approche multi-services qui simplifie vos projets.
                                </p>
                            </TimelineContent>
                            <TimelineContent
                                as="div"
                                animationNum={11}
                                timelineRef={heroRef}
                                customVariants={revealVariants}
                                className="sm:text-base text-xs"
                            >
                                <p className="leading-relaxed text-justify">
                                    Notre force réside dans la rigueur de nos standards, notre réactivité terrain et un principe simple : un interlocuteur unique pour plusieurs corps de métiers. Vous gagnez en efficacité, nous assurons la cohérence de vos travaux.
                                </p>
                            </TimelineContent>
                        </TimelineContent>
                    </div>

                    <div className="md:col-span-1">
                        <div className="text-right">
                            <TimelineContent
                                as="div"
                                animationNum={12}
                                timelineRef={heroRef}
                                customVariants={revealVariants}
                                className="text-[#f39c12] text-2xl font-bold mb-2"
                            >
                                GD COUVERTURE
                            </TimelineContent>
                            <TimelineContent
                                as="div"
                                animationNum={13}
                                timelineRef={heroRef}
                                customVariants={revealVariants}
                                className="text-gray-600 text-sm mb-8"
                            >
                                BTP Multi-services | Enveloppe & Maintenance
                            </TimelineContent>

                            <TimelineContent
                                as="div"
                                animationNum={14}
                                timelineRef={heroRef}
                                customVariants={revealVariants}
                                className="mb-6"
                            >
                                <p className="text-gray-900 font-medium mb-4">
                                    Besoin d'un devis ou d'un conseil ?
                                </p>
                            </TimelineContent>

                            <TimelineContent
                                as="button"
                                animationNum={15}
                                timelineRef={heroRef}
                                customVariants={revealVariants}
                                className="px-8 py-3 rounded-full bg-[#f39c12] text-white font-normal text-xs transition-all duration-200 hover:bg-[#d68910] cursor-pointer"
                                onClick={() => {
                                    router.push('/contact');
                                }}
                            >
                                <span className="relative">
                                    Nous contacter
                                </span>
                            </TimelineContent>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}