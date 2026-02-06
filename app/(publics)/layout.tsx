"use client";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { FacebookIcon, InstagramIcon, XIcon } from "lucide-react";

import { LumaSpin } from "@/components/ui/luma-spin";
import { useEffect, useState } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const socialLinksData = [
    { label: 'Facebook', href: '#', icon: <FacebookIcon /> },
    { label: 'Instagram', href: '#', icon: <InstagramIcon /> },
    { label: 'Twitter (X)', href: '#', icon: <XIcon /> },
  ];

  const [showLumaSpin, setShowLumaSpin] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLumaSpin(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  if (showLumaSpin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LumaSpin />
      </div>
    );
  }


  return (
    <div>
      <Header />
      {children}

      <Footer
        logoSrc="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=256&h=256&fit=crop&crop=entropy"
        // onSubscribe={handleNewsletterSubscribe}
        socialLinks={socialLinksData}
      />
    </div>
  );
}
