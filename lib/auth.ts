import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "mysql" }),
  emailAndPassword: {
    enabled: true,
    // Pas d'inscription publique : les comptes admin sont créés par script
    disableSignUp: true,
    minPasswordLength: 10,
  },
  user: {
    additionalFields: {
      // Exposé dans la session ; jamais modifiable via l'API publique (input: false)
      role: { type: "string", required: false, defaultValue: "EDITEUR", input: false },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 jours
    updateAge: 60 * 60 * 24,
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 20,
    customRules: { "/sign-in/email": { window: 60, max: 5 } },
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
