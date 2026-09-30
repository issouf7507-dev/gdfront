import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Administration", template: "%s | Admin GD Couverture" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-neutral-100 text-neutral-950">{children}</div>;
}
