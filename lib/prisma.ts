import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/lib/generated/prisma/client";

// Une seule instance en dev (le hot reload recrée les modules)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  // Prisma utilise mysql://, le driver mariadb attend mariadb://
  const url = new URL((process.env.DATABASE_URL ?? "").replace(/^mysql:/, "mariadb:"));
  // MySQL 8 (caching_sha2_password) sans TLS : après un redémarrage du serveur, le driver
  // doit récupérer la clé RSA, sinon chaque connexion échoue et Prisma finit en "pool timeout".
  if (!url.searchParams.has("allowPublicKeyRetrieval")) url.searchParams.set("allowPublicKeyRetrieval", "true");
  const adapter = new PrismaMariaDb(url.toString());
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
