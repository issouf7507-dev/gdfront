"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowUpRight, FileText, Hammer, Image as ImageIcon, Inbox, LayoutDashboard, LogOut, Menu, MessageSquareQuote, Settings, X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { can, ROLES, type Permission, type Role } from "@/lib/roles";
import { cn } from "@/lib/utils";

type NavLink = { href: string; label: string; icon: typeof Inbox; exact?: boolean; permission?: Permission };

const sections: { title: string; links: NavLink[] }[] = [
  {
    title: "Suivi",
    links: [
      { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true, permission: "quotes" },
      { href: "/admin/devis", label: "Demandes de devis", icon: Inbox, permission: "quotes" },
    ],
  },
  {
    title: "Contenu du site",
    links: [
      { href: "/admin/realisations", label: "Réalisations", icon: Hammer },
      { href: "/admin/articles", label: "Articles", icon: FileText },
      { href: "/admin/avis", label: "Avis clients", icon: MessageSquareQuote },
      { href: "/admin/medias", label: "Médiathèque", icon: ImageIcon },
    ],
  },
  {
    title: "Compte",
    links: [{ href: "/admin/parametres", label: "Paramètres", icon: Settings }],
  },
];

function initials(name: string) {
  return name
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

export function AdminNav({ userName, role, newQuotes }: { userName: string; role: Role; newQuotes: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const signOut = async () => {
    await authClient.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  const nav = (
    <nav className="flex h-full flex-col" aria-label="Administration">
      <Link href="/admin" className="mb-8 flex items-center gap-3 px-2">
        <span className="rounded-2xl bg-white px-3 py-2">
          <Image src="/img/logo_GDCCI.webp" alt="GD Couverture" width={640} height={389} className="h-8 w-auto" />
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">Admin</span>
      </Link>

      <div className="flex-1 space-y-7 overflow-y-auto">
        {sections.map((section) => ({ ...section, links: section.links.filter((l) => !l.permission || can(role, l.permission)) }))
          .filter((section) => section.links.length > 0)
          .map((section) => (
          <div key={section.title}>
            <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/30">{section.title}</p>
            <ul className="space-y-1">
              {section.links.map(({ href, label, icon: Icon, exact }) => {
                const active = exact ? pathname === href : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-full px-3 py-2.5 text-sm transition-colors",
                        active ? "bg-white font-medium text-neutral-950" : "text-white/60 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      <Icon className={cn("h-[18px] w-[18px]", active && "text-brand")} />
                      <span className="flex-1">{label}</span>
                      {href === "/admin/devis" && newQuotes > 0 && (
                        <span className="min-w-6 rounded-full bg-brand px-2 py-0.5 text-center text-xs font-medium text-white">
                          {newQuotes}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-1 border-t border-white/10 pt-6">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-full px-3 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ArrowUpRight className="h-[18px] w-[18px] transition-transform group-hover:rotate-45" />
          Voir le site
        </a>
        <div className="flex items-center gap-3 rounded-3xl bg-white/5 p-2 pl-3">
          <Link
            href="/admin/parametres"
            onClick={() => setOpen(false)}
            title="Mon profil"
            className="flex min-w-0 flex-1 items-center gap-3 rounded-full transition-opacity hover:opacity-80"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-medium text-white">
              {initials(userName)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm text-white">{userName}</span>
              <span className="block truncate text-xs text-white/40">{ROLES[role].label}</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={signOut}
            aria-label="Se déconnecter"
            title="Se déconnecter"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile : barre du haut + tiroir */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-neutral-950 px-4 py-3 lg:hidden">
        <Link href="/admin" className="rounded-xl bg-white px-2.5 py-1.5">
          <Image src="/img/logo_GDCCI.webp" alt="GD Couverture" width={640} height={389} className="h-7 w-auto" />
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
          className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white"
        >
          <Menu className="h-5 w-5" />
          {newQuotes > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand" />}
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 bg-neutral-950 p-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              className="absolute right-3 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            {nav}
          </div>
        </div>
      )}

      {/* Desktop : barre latérale fixe */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 p-4 pr-2 lg:block">{nav}</aside>
    </>
  );
}
