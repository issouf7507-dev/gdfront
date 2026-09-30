import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "GD Couverture, entreprise BTP multi-services à Abidjan : plus de 25 ans d'expérience en couverture, étanchéité et maintenance du bâtiment.",
  alternates: { canonical: "/a-propos" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
