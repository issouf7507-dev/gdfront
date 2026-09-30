import { createAdminUser, setAdminPassword } from "@/lib/admin-users";
import { prisma } from "@/lib/prisma";

// Crée un compte administrateur, ou réinitialise le mot de passe s'il existe déjà (le rôle est conservé)
export async function upsertAdmin(email: string, password: string, name?: string) {
  if (password.length < 10) throw new Error("Le mot de passe doit faire au moins 10 caractères.");
  const normalized = email.trim().toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email: normalized } });
  if (existing) {
    await setAdminPassword(existing.id, password);
    return false;
  }
  await createAdminUser(normalized, password, name ?? normalized.split("@")[0], "ADMIN");
  return true;
}
