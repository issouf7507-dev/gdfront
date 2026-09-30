"use client";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingContact } from "@/components/FloatingContact";

import { LumaSpin } from "@/components/ui/luma-spin";
import { useEffect, useState } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const [showLumaSpin, setShowLumaSpin] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLumaSpin(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  // Le loader recouvre la page au lieu de la remplacer : le contenu est rendu
  // côté serveur (SEO, pages Google Ads) et les 404 renvoient bien un statut 404.
  return (
    <div>
      {showLumaSpin && (
        <div className="fixed inset-0 z-[200] flex justify-center items-center bg-white" aria-hidden="true">
          <LumaSpin />
        </div>
      )}
      <Header />
      {children}

      <Footer />
      <FloatingContact />
      <CookieBanner />
    </div>
  );
}
