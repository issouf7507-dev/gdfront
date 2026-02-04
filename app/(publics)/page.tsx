"use client";
import Hero2 from "@/components/Hero-2";
import { LumaSpin } from "@/components/ui/luma-spin";
import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/blocks/cta-section-with-gallery"
import { Features } from "@/components/blocks/features-4";

import AboutSection3 from "@/components/ui/about-section";
import { HeroDemo1 } from "@/components/ui/galery";

import { useEffect, useState } from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1733680958774-39a0e8a64a54?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1548783307-f63adc3f200b?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1703622377707-29bc9409aaf2?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

export default function Home() {



  return (

    <div>

      <Hero2 />
      <AboutSection3 />
      {/*  */}
      <section>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-20 px-8 py-12 md:grid-cols-2">
          <ContainerStagger>
            <ContainerAnimated className="mb-4 block text-xs font-medium text-[#f39c12] md:text-sm">
              Expertise & Sécurité
            </ContainerAnimated>
            <ContainerAnimated className="sm:text-4xl md:text-5xl text-2xl !leading-[110%] font-semibold text-[#f39c12] mb-8">
              Donnez de la hauteur à vos projets de toiture.
            </ContainerAnimated>
            <ContainerAnimated className="sm:text-base text-xs leading-relaxed text-justify text-gray-600 mb-8">
              Spécialistes de la couverture et des travaux d'accès difficile, nous intervenons sur tous types de bâtiments en Île-de-France. Nos techniciens cordistes allient savoir-faire artisanal et techniques alpines pour garantir l'étanchéité et la pérennité de votre patrimoine, même dans les zones les plus complexes.
            </ContainerAnimated>
            <ContainerAnimated>

              <button className="px-8 py-3 rounded-full bg-[#f39c12] text-white font-normal text-xs transition-all duration-200 hover:bg-[#d68910] cursor-pointer">
                Obtenir mon devis gratuit
              </button>
            </ContainerAnimated>
          </ContainerStagger>

          <GalleryGrid>
            {IMAGES.map((imageUrl, index) => (
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

      {/*  */}
      {/*  */}
      <Features />


      {/*  */}
      <div className="w-full relative">

        <HeroDemo1 />
      </div>
      {/*  */}


    </div>
  );
}
