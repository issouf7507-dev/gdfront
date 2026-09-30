"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRound, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/admin/parametres", label: "Mon profil", icon: UserRound },
  { href: "/admin/parametres/utilisateurs", label: "Utilisateurs", icon: Users },
];

export function SettingsTabs({ canManageUsers }: { canManageUsers: boolean }) {
  const pathname = usePathname();
  const tabs = canManageUsers ? TABS : TABS.slice(0, 1);
  return (
    <nav aria-label="Paramètres" className="mb-6 inline-flex gap-1 rounded-full bg-neutral-200/60 p-1">
      {tabs.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
              active ? "bg-white font-medium text-neutral-950 shadow-xs" : "text-neutral-500 hover:text-neutral-950",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
