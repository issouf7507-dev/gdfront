// Crée (ou réinitialise le mot de passe d') un compte admin.
// Usage : pnpm admin:create <email> <mot-de-passe> [nom]
import "dotenv/config";
import { upsertAdmin } from "./lib/admin";
import { prisma } from "@/lib/prisma";

const [email, password, name] = process.argv.slice(2);
if (!email || !password) {
  console.error("Usage : pnpm admin:create <email> <mot-de-passe> [nom]");
  process.exit(1);
}

upsertAdmin(email, password, name)
  .then((created) => console.log(created ? `Compte créé : ${email}` : `Mot de passe mis à jour : ${email}`))
  .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
