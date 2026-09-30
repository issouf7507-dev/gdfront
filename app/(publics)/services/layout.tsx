import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Nos services", template: "%s | GD Couverture CI" },
  description:
    "Couverture, étanchéité, plomberie, ravalement de façades, peinture, rénovation et travaux en hauteur à Abidjan. Devis gratuit.",
  alternates: { canonical: "/services" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
