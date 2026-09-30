import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site GD Couverture CI.",
  alternates: { canonical: "/mentions-legales" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
