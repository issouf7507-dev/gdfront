import { AdminNav } from "@/components/admin/AdminNav";
import { prisma } from "@/lib/prisma";
import { can, isRole } from "@/lib/roles";
import { requireAdminPage } from "@/lib/session";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdminPage();
  const role = isRole(session.user.role) ? session.user.role : "EDITEUR";
  const newQuotes = can(role, "quotes") ? await prisma.quoteRequest.count({ where: { status: "NOUVEAU" } }) : 0;

  // Cadre sombre + espace de travail clair aux coins arrondis (comme la page de connexion)
  return (
    <div className="min-h-dvh bg-neutral-950 lg:flex">
      <AdminNav userName={session.user.name || session.user.email} role={role} newQuotes={newQuotes} />
      <main className="min-w-0 flex-1 lg:py-2 lg:pr-2">
        <div className="min-h-dvh bg-neutral-100 px-4 py-8 md:px-8 lg:min-h-[calc(100dvh-1rem)] lg:rounded-[28px] lg:px-10 lg:py-10">
          <div className="mx-auto max-w-[1280px]">{children}</div>
        </div>
      </main>
    </div>
  );
}
