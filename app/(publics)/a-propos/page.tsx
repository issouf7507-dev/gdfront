"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { ContainerStagger, ContainerAnimated } from "@/components/blocks/cta-section-with-gallery";
import { GalleryGrid, GalleryGridCell } from "@/components/blocks/cta-section-with-gallery";
import { Shield, Award, Users, TrendingUp, MapPin, ClipboardCheck, Mountain, Brush, PaintBucket, Wrench, Droplet, Home, Building2, CheckCircle2, Mail, MessageSquare, Phone, Send, User, X } from "lucide-react";


import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const IMAGES_MISSION = [
    "/img/gdcouverture-4.png",
    "/img/gdcouverture-5.png",
    "/img/gdcouverture-6.png",
    "/img/gdcouverture-8.png",

]

const IMAGES_POSITIONING = [
    "/img/gdcouverture-2.png",
    "/img/gdcouverture-3.png",

    "/img/gdcouverture-9.png",
    "/img/gdcouverture-10.png",
];

export default function AboutPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

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
        <div className="min-h-screen bg-white relative">

            <div className="relative w-full h-[400px] bg-black/50 z-10 py-16">
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
                <div className="max-w-6xl mx-auto flex items-end justify-start h-full">
                    <div className="relative">
                        <div
                            className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-2 relative"
                            style={{
                                filter: "url(#glass-effect)",
                            }}
                        >
                            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                            <span className="text-white/90 text-xs font-light relative z-10"> GD COUVERTURE</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                            Qui sommes-nous ?
                        </h1>
                    </div>
                </div>
            </div>

            {/* Hero Section - Qui sommes-nous */}
            <section className="py-8 px-4 bg-[#f9f9f9]" ref={heroRef}>
                <div className="max-w-6xl mx-auto">
                    <div className="relative">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8 w-[85%] absolute lg:top-4 md:top-0 sm:-top-2 -top-3 z-10">
                            <div className="flex items-center gap-2 text-xl">
                                <span className="text-[#f39c12] animate-spin text-xl">✱</span>
                                <TimelineContent
                                    as="span"
                                    animationNum={0}
                                    timelineRef={heroRef}
                                    customVariants={revealVariants}
                                    className="text-xl font-medium text-gray-600"
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
                                    <span className="text-gray-600 uppercase">clients</span>
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
                                >
                                    <button className="relative" onClick={() => {
                                        router.push('/contact');
                                    }}>
                                        Nous contacter
                                    </button>
                                </TimelineContent>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Notre Mission Section */}
            <section className="bg-white">
                <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-20 px-8 py-16 md:grid-cols-2">
                    <ContainerStagger>
                        <ContainerAnimated className="mb-4 block text-xs font-medium text-[#f39c12] md:text-sm">
                            Notre Mission
                        </ContainerAnimated>
                        <ContainerAnimated className="sm:text-4xl md:text-5xl text-2xl !leading-[110%] font-semibold text-[#f39c12] mb-8">
                            Protéger, valoriser et prolonger la vie de vos bâtiments
                        </ContainerAnimated>
                        <ContainerAnimated className="sm:text-base text-sm leading-relaxed text-justify text-gray-600 mb-8">
                            Notre engagement repose sur trois piliers fondamentaux qui guident chacune de nos interventions : la sécurité de vos installations et de nos équipes, la qualité irréprochable de nos prestations, et la maîtrise totale des coûts pour vous garantir le meilleur rapport investissement-durabilité.
                        </ContainerAnimated>

                        {/* Three pillars */}
                        <ContainerAnimated className="grid grid-cols-3 gap-4 mb-8">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#f39c12]/10 flex items-center justify-center">
                                    <Shield className="w-8 h-8 text-[#f39c12]" />
                                </div>
                                <p className="text-gray-900 font-semibold text-sm">Sécurité</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#f39c12]/10 flex items-center justify-center">
                                    <Award className="w-8 h-8 text-[#f39c12]" />
                                </div>
                                <p className="text-gray-900 font-semibold text-sm">Qualité</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#f39c12]/10 flex items-center justify-center">
                                    <TrendingUp className="w-8 h-8 text-[#f39c12]" />
                                </div>
                                <p className="text-gray-900 font-semibold text-sm">Maîtrise des coûts</p>
                            </div>
                        </ContainerAnimated>

                        <ContainerAnimated>
                            <button className="px-8 py-3 rounded-full bg-[#f39c12] text-white font-normal text-sm transition-all duration-200 hover:bg-[#d68910] cursor-pointer"
                                onClick={() => {
                                    router.push('/services');
                                }}
                            >
                                Découvrir nos services
                            </button>
                        </ContainerAnimated>
                    </ContainerStagger>

                    <GalleryGrid>
                        {IMAGES_MISSION.map((imageUrl, index) => (
                            <GalleryGridCell index={index} key={index}>
                                <img
                                    className="size-full object-cover object-center"
                                    width="100%"
                                    height="100%"
                                    src={imageUrl}
                                    alt=""
                                />
                            </GalleryGridCell>
                        ))}
                    </GalleryGrid>
                </div>
            </section>

            {/* Notre Positionnement Section */}
            <section className="bg-[#f9f9f9]">
                <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-20 px-8 py-16 md:grid-cols-2">
                    <GalleryGrid>
                        {IMAGES_POSITIONING.map((imageUrl, index) => (
                            <GalleryGridCell index={index} key={index}>
                                <img
                                    className="size-full object-cover object-center"
                                    width="100%"
                                    height="100%"
                                    src={imageUrl}
                                    alt=""
                                />
                            </GalleryGridCell>
                        ))}
                    </GalleryGrid>

                    <ContainerStagger>
                        <ContainerAnimated className="mb-4 block text-xs font-medium text-[#f39c12] md:text-sm">
                            Notre Positionnement
                        </ContainerAnimated>
                        <ContainerAnimated className="sm:text-4xl md:text-5xl text-2xl !leading-[110%] font-semibold text-[#f39c12] mb-8">
                            Votre partenaire technique de confiance en Côte d'Ivoire
                        </ContainerAnimated>
                        <ContainerAnimated className="sm:text-base text-sm leading-relaxed text-justify text-gray-600 mb-6">
                            GD Couverture Côte d'Ivoire se positionne comme un acteur de référence auprès des entreprises, institutions et particuliers moyen et haut standing qui recherchent l'excellence et la fiabilité.
                        </ContainerAnimated>

                        {/* Two columns for services */}
                        <ContainerAnimated className="grid md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <h3 className="text-[#f39c12] font-semibold mb-3 text-sm flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    Nos clients
                                </h3>
                                <ul className="space-y-2 text-gray-600 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#f39c12] ">•</span>
                                        <span>Entreprises & institutions</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#f39c12] ">•</span>
                                        <span>Particuliers moyen et haut standing</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-[#f39c12] font-semibold mb-3 text-sm flex items-center gap-2">
                                    <Shield className="w-5 h-5" />
                                    Nos interventions
                                </h3>
                                <ul className="space-y-2 text-gray-600 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#f39c12] ">•</span>
                                        <span>Travaux ponctuels</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#f39c12] ">•</span>
                                        <span>Contrats de maintenance récurrents</span>
                                    </li>
                                </ul>
                            </div>
                        </ContainerAnimated>

                        <ContainerAnimated className="bg-white border-l-4 border-[#f39c12] p-4 mb-8">
                            <p className="text-gray-700 text-sm">
                                Avec une approche orientée <strong className="text-[#f39c12]">prévention</strong>, <strong className="text-[#f39c12]">durabilité</strong> et <strong className="text-[#f39c12]">performance</strong>.
                            </p>
                        </ContainerAnimated>

                        <ContainerAnimated>
                            <button className="px-8 py-3 rounded-full bg-[#f39c12] text-white font-normal text-sm transition-all duration-200 hover:bg-[#d68910] cursor-pointer" onClick={() => setIsQuoteModalOpen(true)}>
                                Obtenir mon devis gratuit
                            </button>
                        </ContainerAnimated>
                    </ContainerStagger>
                </div>
            </section>

            {/* Nos Valeurs Section */}
            <section className="bg-white py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-semibold text-[#f39c12] mb-4">
                            Nos Valeurs
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Des principes qui guident notre action au quotidien
                        </p>
                    </div>




                    <div className="bg-[#f9f9f9]">
                        <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
                            {/* Main Services Grid */}
                            <div className="relative mx-auto grid max-w-2xl lg:max-w-5xl divide-x divide-y border *:p-8 sm:grid-cols-2 lg:grid-cols-3">

                                {/* Couverture */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Shield className="size-8 text-[#f39c12]" />
                                        <h3 className="text-base font-semibold text-[#f39c12]">Rigueur</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Standards élevés dans chaque intervention, respect des normes et engagement qualité sur tous nos chantiers.
                                    </p>
                                </div>

                                {/* Étanchéité */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Award className="size-8 text-[#f39c12]" />
                                        <h3 className="text-base font-semibold text-[#f39c12]">Réactivité</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Réactivité terrain pour répondre rapidement à vos besoins, même en cas d'urgence ou de situations complexes.
                                    </p>
                                </div>

                                {/* Plomberie */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Users className="size-8 text-[#f39c12]" />
                                        <h3 className="text-base font-semibold text-[#f39c12]">Proximité</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Un interlocuteur unique pour plusieurs corps de métiers, simplifiant vos échanges et garantissant la cohérence.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final Section */}
            <section className="relative py-16 md:py-20">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/img/gdcouverture-18.png"
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="mx-auto max-w-4xl px-8 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Prêt à démarrer votre projet ?
                    </h2>
                    <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                        Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé. Notre équipe est à votre écoute pour répondre à toutes vos questions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
                            Nous appeler maintenant
                        </button>
                        <button className="px-8 py-3 rounded-full bg-[#f39c12] text-white font-normal text-xs transition-all duration-200 hover:bg-[#d68910] cursor-pointer" onClick={() => setIsQuoteModalOpen(true)}>
                            Demander un devis gratuit
                        </button>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-12 grid md:grid-cols-3 gap-6 text-white">
                        <div className="flex flex-col items-center gap-2">
                            <Phone className="w-6 h-6" />
                            <p className="font-semibold">Téléphone</p>
                            <p className="text-sm text-white/80"> <a href="tel:+2250713488488" target="_blank" rel="noopener noreferrer">+225 07 13 48 84 88</a></p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Mail className="w-6 h-6" />
                            <p className="font-semibold">Email</p>
                            <p className="text-sm text-white/80"> <a href="mailto:contact@gdcouverture.ci" target="_blank" rel="noopener noreferrer">contact@gdcouverture.ci</a></p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <MapPin className="w-6 h-6" />
                            <p className="font-semibold">Localisation</p>
                            <p className="text-sm text-white/80"> <a href="https://maps.google.com/?q=Abidjan,Cocody" target="_blank" rel="noopener noreferrer">Cocody Danga, Abidjan Côte d'Ivoire</a></p>
                        </div>
                    </div>
                </div>
            </section>


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
        </div>
    );
}