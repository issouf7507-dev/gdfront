import type { Metadata } from "next";
import { NewUserForm, ResetPasswordForm, RoleForm } from "@/components/admin/AccountForms";
import { Badge, Panel } from "@/components/admin/PageHeader";
import { DeleteButton } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { ROLES, isRole } from "@/lib/roles";
import { requireAdminPage } from "@/lib/session";
import { changeUserRole, createUser, deleteUser, resetUserPassword } from "../actions";

export const metadata: Metadata = { title: "Utilisateurs" };

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join("");
}

export default async function UsersPage() {
  const { user: me } = await requireAdminPage("users");
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, email: true, role: true, createdAt: true, sessions: { orderBy: { updatedAt: "desc" }, take: 1, select: { updatedAt: true } } },
  });

  return (
    <div className="grid items-start gap-4 xl:grid-cols-[1fr_420px]">
      <Panel
        title="Accès au back-office"
        description={`${users.length} compte${users.length > 1 ? "s" : ""} · ${users.filter((u) => u.role === "ADMIN").length} administrateur(s)`}
        bodyClassName="px-3 pb-3 pt-4"
      >
        <ul className="divide-y divide-neutral-100">
          {users.map((u) => {
            const isMe = u.id === me.id;
            const lastSeen = u.sessions[0]?.updatedAt;
            return (
              <li key={u.id} className="flex flex-wrap items-start gap-4 px-3 py-4">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium ${isMe ? "bg-brand text-white" : "bg-neutral-100 text-neutral-700"}`}>
                  {initials(u.name || u.email)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2 font-medium text-neutral-950">
                    {u.name}
                    {isMe && <Badge className="bg-brand/10 text-[#b9730b]">Vous</Badge>}
                    {isMe && <Badge className={u.role === "ADMIN" ? "bg-neutral-950 text-white" : "bg-neutral-100 text-neutral-600"}>{ROLES[u.role].label}</Badge>}
                  </p>
                  <p className="truncate text-sm text-neutral-500">{u.email}</p>
                  <p className="mt-1 text-xs text-neutral-400">
                    Créé le {u.createdAt.toLocaleDateString("fr-FR")}
                    {" · "}
                    {lastSeen ? `dernière activité le ${lastSeen.toLocaleDateString("fr-FR")}` : "jamais connecté"}
                  </p>
                </div>
                {!isMe && (
                  <div className="flex w-full flex-wrap items-start gap-2 sm:w-auto">
                    <RoleForm action={changeUserRole.bind(null, u.id)} role={isRole(u.role) ? u.role : "EDITEUR"} />
                    <ResetPasswordForm action={resetUserPassword.bind(null, u.id)} userId={u.id} userName={u.name} />
                    {users.length > 1 && (
                      <DeleteButton
                        action={deleteUser.bind(null, u.id)}
                        label="Retirer"
                        confirmText={`Retirer l'accès de ${u.name} (${u.email}) ? Le compte sera supprimé.`}
                      />
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Panel>

      <div className="grid gap-4">
        <Panel title="Ajouter un utilisateur" description="La personne se connecte sur /admin/login avec cet email et ce mot de passe.">
          <NewUserForm action={createUser} />
        </Panel>
        <p className="px-2 text-xs leading-relaxed text-neutral-500">
          Changer le rôle ou le mot de passe d&apos;un compte le déconnecte : la personne se reconnecte avec ses nouveaux droits.
        </p>
      </div>
    </div>
  );
}
