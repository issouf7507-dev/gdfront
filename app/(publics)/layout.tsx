import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingContact } from "@/components/FloatingContact";
import { MotionProvider } from "@/components/MotionProvider";

// Pas d'écran de chargement : le contenu, prérendu côté serveur, s'affiche tout de suite.
export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <MotionProvider>
      <Header />
      {children}
      <Footer />
      <FloatingContact />
      <CookieBanner />
    </MotionProvider>
  );
}
