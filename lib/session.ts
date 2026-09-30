import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ForbiddenError, UnauthorizedError } from "@/lib/app-error";
import { auth } from "@/lib/auth";
import { can, homeFor, type Permission } from "@/lib/roles";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

// Pages admin : redirige vers la connexion si pas de session valide, et vers
// la page d'accueil du rôle si la permission demandée manque.
// Sans permission : tout compte du back-office (admin ou éditeur).
export async function requireAdminPage(permission?: Permission) {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  if (permission && !can(session.user.role, permission)) redirect(homeFor(session.user.role));
  return session;
}

// Server actions et routes API admin : chaque point d'entrée vérifie la session
// (le proxy ne fait qu'une vérification rapide du cookie).
export async function requireAdmin(permission?: Permission) {
  const session = await getSession();
  if (!session) throw new UnauthorizedError();
  if (permission && !can(session.user.role, permission)) throw new ForbiddenError();
  return session;
}
