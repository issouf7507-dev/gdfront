import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gdcouverture.ci";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GD Couverture CI | Couverture, Étanchéité & BTP à Abidjan",
    template: "%s | GD Couverture CI",
  },
  description:
    "Entreprise de couverture, étanchéité, plomberie et ravalement à Abidjan. Devis gratuit, travaux en hauteur, maintenance. GD Couverture Côte d'Ivoire.",
  keywords: [
    "couverture Abidjan",
    "étanchéité toiture",
    "plomberie Côte d'Ivoire",
    "ravalement façades Abidjan",
    "travaux en hauteur",
    "devis couverture",
    "GD Couverture",
    "toiture Cocody",
    "maintenance bâtiment Abidjan",
  ],
  authors: [{ name: "GD Couverture", url: siteUrl }],
  creator: "GD Couverture",
  publisher: "GD Couverture",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_CI",
    url: siteUrl,
    siteName: "GD Couverture CI",
    title: "GD Couverture CI | Couverture, Étanchéité & BTP à Abidjan",
    description:
      "Couverture, étanchéité, plomberie, ravalement à Abidjan. Devis gratuit et interventions rapides.",
    images: [
      {
        url: "/img/logo_GDCCI.png",
        width: 512,
        height: 512,
        alt: "GD Couverture CI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GD Couverture CI | Couverture & BTP à Abidjan",
    description: "Couverture, étanchéité, plomberie, ravalement. Devis gratuit à Abidjan.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    // À remplir si vous utilisez Google Search Console
    // google: "votre-code-verification",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "construction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
