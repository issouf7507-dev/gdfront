import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & devis gratuit",
  description:
    "Contactez GD Couverture à Abidjan (Cocody) : devis gratuit pour vos travaux de couverture, étanchéité, plomberie et rénovation.",
  alternates: { canonical: "/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
