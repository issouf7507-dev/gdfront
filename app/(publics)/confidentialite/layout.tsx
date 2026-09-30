import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et gestion des données personnelles de GD Couverture CI.",
  alternates: { canonical: "/confidentialite" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
