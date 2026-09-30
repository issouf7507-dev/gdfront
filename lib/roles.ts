// Rôles du back-office et droits associés (utilisable côté serveur et client)

export const ROLES = {
  ADMIN: { label: "Administrateur", description: "Accès complet : devis, statistiques, contenu et utilisateurs." },
  EDITEUR: { label: "Éditeur", description: "Contenu du site uniquement : réalisations, articles, avis et médiathèque." },
} as const;

export type Role = keyof typeof ROLES;

export type Permission = "content" | "quotes" | "users";

const PERMISSIONS: Record<Role, readonly Permission[]> = {
  ADMIN: ["content", "quotes", "users"],
  EDITEUR: ["content"],
};

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && value in ROLES;
}

// Rôle inconnu ou absent : traité comme éditeur (le moins de droits)
export function can(role: unknown, permission: Permission) {
  return PERMISSIONS[isRole(role) ? role : "EDITEUR"].includes(permission);
}

// Page d'arrivée après connexion selon le rôle
export function homeFor(role: unknown) {
  return can(role, "quotes") ? "/admin" : "/admin/realisations";
}
