import { HomeHero } from "@/components/home/HomeHero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { LatestRealisations } from "@/components/home/LatestRealisations";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaSection } from "@/components/home/CtaSection";

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <HomeHero />
      <AboutSection />
      <ServicesSection />
      <LatestRealisations />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
