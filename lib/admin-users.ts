import "server-only";
import { randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import { prisma } from "@/lib/prisma";
import type { Role } from "@/lib/roles";

// Comptes du back-office au format Better Auth : un utilisateur + un compte
// « credential » qui porte le mot de passe haché.

export async function createAdminUser(email: string, password: string, name: string, role: Role) {
  const id = randomUUID();
  return prisma.user.create({
    data: {
      id,
      email,
      name,
      role,
      emailVerified: true,
      accounts: { create: { id: randomUUID(), accountId: id, providerId: "credential", password: await hashPassword(password) } },
    },
  });
}

// Remplace le mot de passe et déconnecte toutes les sessions de l'utilisateur
export async function setAdminPassword(userId: string, password: string) {
  const hash = await hashPassword(password);
  await prisma.$transaction(async (tx) => {
    const updated = await tx.account.updateMany({ where: { userId, providerId: "credential" }, data: { password: hash } });
    if (updated.count === 0) {
      await tx.account.create({ data: { id: randomUUID(), accountId: userId, providerId: "credential", userId, password: hash } });
    }
    await tx.session.deleteMany({ where: { userId } });
  });
}
