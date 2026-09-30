# GD Couverture : site et administration

Next.js 16 · Prisma 7 (MySQL) · Better Auth · Tailwind CSS 4

## Lancer le projet en local

Prérequis : Node 24, pnpm, MySQL 8 installé sur la machine (port 3306) avec une base `gdcouv`.

```bash
pnpm install                 # installe les dépendances (et génère le client Prisma)
cp .env.example .env         # puis compléter (voir ci-dessous)
pnpm db:migrate              # crée les tables
pnpm db:seed                 # compte admin + contenu de démonstration
pnpm dev                     # http://localhost:3001
```

Valeurs minimales du `.env` en local :

```bash
DATABASE_URL="mysql://root:<mot-de-passe>@localhost:3306/gdcouv"
BETTER_AUTH_SECRET="…"                  # openssl rand -base64 32
BETTER_AUTH_URL="http://localhost:3001"
ADMIN_EMAIL="admin@gdcouverture.local"
ADMIN_PASSWORD="…"                      # 10 caractères minimum
```

- Site public : http://localhost:3001
- Administration : http://localhost:3001/admin (identifiants `ADMIN_EMAIL` / `ADMIN_PASSWORD`)
- Base de données : `pnpm db:studio`

Sans `RESEND_API_KEY`, les demandes de devis sont enregistrées mais aucun email n'est envoyé.
Sans `NEXT_PUBLIC_GA_ID`, le suivi Google Analytics / Ads est désactivé.

## Scripts utiles

| Commande | Rôle |
|---|---|
| `pnpm admin:create <email> <mot-de-passe> [nom]` | Crée un compte admin ou réinitialise son mot de passe |
| `pnpm db:migrate` | Crée/applique une migration en développement |
| `pnpm db:deploy` | Applique les migrations en production |
| `pnpm build` | Génère le client Prisma puis build Next.js (la base doit être joignable) |

## Organisation

- `app/(publics)` : site public (accueil, services, réalisations, blog, contact)
- `app/admin` : back-office (devis, réalisations, articles, avis, médiathèque)
- `app/api` : formulaire de devis, authentification, API admin (médias, export CSV)
- `lib/` : accès aux données, validation (Zod), emails, suivi (analytics), auth
- `prisma/` : schéma et migrations
- Images uploadées : `UPLOAD_DIR` (par défaut `storage/uploads`, hors git, **à sauvegarder**)
