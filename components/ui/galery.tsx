import { BentoCell, BentoGrid, ContainerScale, ContainerScroll } from "@/components/blocks/hero-gallery-scroll-animation"

import { Button } from "@/components/ui/button"

const IMAGES = [
    "/img/gdcouverture-19.png",
    "/img/gdcouverture-13.png",
    "/img/gdcouverture-21.png",
    "/img/gdcouverture-20.png",
    "/img/gdcouverture-18.png",
]
const HeroDemo1 = () => {
    return (
        <ContainerScroll className="h-[350vh]">
            <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-4">
                {IMAGES.map((imageUrl, index) => (
                    <BentoCell
                        key={index}
                        className="overflow-hidden rounded-xl shadow-xl"
                    >
                        <img
                            className="size-full object-cover object-center"
                            src={imageUrl}
                            alt=""
                        />
                    </BentoCell>
                ))}
            </BentoGrid>

            <ContainerScale className="relative z-10 text-center">
                {/* <h1 className="max-w-xl text-5xl font-bold tracking-tighter text-[#f39c12] ">
                    Nos réalisations en images.
                </h1>
                <p className="my-6 max-w-xl text-sm  md:text-base">
                    Découvrez nos derniers chantiers de couverture, zinguerie et interventions sur cordes à travers toute l'Île-de-France. La preuve de notre engagement pour un travail d'excellence.
                </p>
                <div className="flex items-center justify-center gap-4">

                    <button className="px-8 py-3 rounded-full bg-[#f39c12] text-white font-normal text-xs transition-all duration-200 hover:bg-[#d68910] cursor-pointer">
                        Voir tous nos projets
                    </button>
                    <Button
                        variant="link"
                        className="bg-transparent px-4 py-2 font-medium"
                    >
                        Nous contacter
                    </Button>
                </div> */}
            </ContainerScale>
        </ContainerScroll>
    )
}

const HeroDemo2 = () => {
    return (
        <ContainerScroll className="h-[350vh]">
            <BentoGrid
                variant={"fourCells"}
                className="sticky left-0 top-0 h-svh w-full p-4"
            >
                {IMAGES.filter((_, index) => index <= 3).map((imageUrl, index) => (
                    <BentoCell
                        key={index}
                        className="overflow-hidden rounded-xl shadow-xl"
                    >
                        <img
                            className="size-full object-cover object-center"
                            width="100%"
                            height="100%"
                            src={imageUrl}
                        />
                    </BentoCell>
                ))}
            </BentoGrid>
            <ContainerScale className="text-center">
                <h1
                    className="max-w-xl text-5xl font-bold tracking-tighter"
                >
                    Your Animated Hero
                </h1>
                <p className="my-6 max-w-xl text-sm text-stone-500 md:text-base">
                    Yet another hero section, this time with scroll trigger animations,
                    animating the hero content with motion.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Button className="bg-[#d68910] px-4 py-2 font-medium   hover:bg-[#f5b041]">
                        Get Started
                    </Button>
                    <Button
                        variant={"link"}
                        className="bg-transparent px-4 py-2 font-medium  "
                    >
                        Learn more
                    </Button>
                </div>
            </ContainerScale>
        </ContainerScroll>
    )
}


const HeroDemo3 = () => {
    return (
        <ContainerScroll className="h-[350vh] bg-slate-900 text-slate-100">
            <BentoGrid
                variant={"threeCells"}
                className="sticky left-0 top-0 h-svh w-full p-4"
            >
                {IMAGES.filter((_, index) => index <= 2).map((imageUrl, index) => (
                    <BentoCell
                        key={index}
                        className="overflow-hidden rounded-xl shadow-xl"
                    >
                        <img
                            className="size-full object-cover object-center"
                            width="100%"
                            height="100%"
                            src={imageUrl}
                        />
                    </BentoCell>
                ))}
            </BentoGrid>
            <ContainerScale className="text-center">
                <h1 className="max-w-xl text-5xl font-bold tracking-tighter ">
                    Your Animated Hero
                </h1>
                <p className="my-6 max-w-xl text-sm opacity-80 md:text-base">
                    Yet another hero section, this time with scroll trigger animations,
                    animating the hero content with motion.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Button className="bg-[#d68910] px-4 py-2 font-medium   hover:bg-[#f5b041]">
                        Get Started
                    </Button>
                    <Button
                        variant={"link"}
                        className="bg-transparent px-4 py-2 font-medium text-white  "
                    >
                        Learn more
                    </Button>
                </div>
            </ContainerScale>
        </ContainerScroll>
    )
}
export { HeroDemo1, HeroDemo2, HeroDemo3 }
