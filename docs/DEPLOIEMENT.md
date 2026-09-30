# Déploiement sur le VPS

Suite à faire une fois le projet récupéré (`git pull`) et la base MySQL créée sur le serveur.
Remplacer les valeurs entre `<…>` par celles du serveur.

| Élément | Valeur à utiliser |
|---|---|
| Dossier du projet | `<chemin-app>` (ex. `/home/<user>/apps/gdfront`) |
| Nom du process PM2 | `<nom-app>` (voir `pm2 list` si le site tourne déjà) |
| Port de l'app | `3000` (celui de `next start`), ou celui déjà utilisé par Nginx |
| Domaine | `gdcouverture.ci` |

---

## 1. Récupérer la dernière version

Le correctif de migration `a8acc2c` doit être présent, sinon l'étape 5 échoue sur une base neuve (`Duplicate key name 'account_userId_idx'`).

```bash
cd <chemin-app>
git pull origin dev-issouf
git log --oneline -2    # doit afficher a8acc2c « fix(prisma): ne pas recréer les index… »
node -v                 # Node 24 attendu (sharp, Prisma 7)
pnpm -v
```

## 2. Utilisateur MySQL dédié

Ne pas utiliser `root` pour l'application. Dans `mysql -u root -p` :

```sql
CREATE USER 'gdcouv'@'localhost' IDENTIFIED BY '<mot-de-passe-fort>';
GRANT ALL PRIVILEGES ON `<nom-de-la-base>`.* TO 'gdcouv'@'localhost';
FLUSH PRIVILEGES;
```

`ALL PRIVILEGES` limité à cette base suffit pour `prisma migrate deploy` (qui, contrairement à `migrate dev`, n'a pas besoin de base « shadow »).

> Si le mot de passe contient des caractères spéciaux (`@ : / # ?`), il faut les encoder dans l'URL (`@` → `%40`, etc.).

## 3. Fichier `.env` de production

Créer `<chemin-app>/.env` (il n'est jamais versionné) :

```bash
# Site
NEXT_PUBLIC_SITE_URL=https://gdcouverture.ci

# Base de données
DATABASE_URL="mysql://gdcouv:<mot-de-passe>@localhost:3306/<nom-de-la-base>"

# Better Auth : secret aléatoire, et URL publique EXACTE du site (https, sans / final)
BETTER_AUTH_SECRET="<openssl rand -base64 32>"
BETTER_AUTH_URL=https://gdcouverture.ci

# Anti-spam : sel aléatoire pour le hachage des IP
IP_HASH_SALT="<openssl rand -hex 32>"

# Emails (Resend) — serveur uniquement, jamais préfixé NEXT_PUBLIC_
RESEND_API_KEY=re_...
FROM_EMAIL="GD Couverture <contact@gdcouverture.ci>"

# Images uploadées depuis l'admin : en dehors du dossier du projet
UPLOAD_DIR=/var/lib/gdcouv/uploads

# Suivi (laisser vide tant que les comptes ne sont pas prêts)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GOOGLE_ADS_ID=
NEXT_PUBLIC_GOOGLE_ADS_LEAD_SEND_TO=
NEXT_PUBLIC_GOOGLE_ADS_CALL_SEND_TO=
NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_SEND_TO=
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

Générer les secrets :

```bash
openssl rand -base64 32   # BETTER_AUTH_SECRET
openssl rand -hex 32      # IP_HASH_SALT
chmod 600 .env
```

Points d'attention :

- **Supprimer l'ancienne variable `NEXT_PUBLIC_RESEND_API_KEY`** si elle existe encore : elle exposait la clé au navigateur. La clé s'appelle maintenant `RESEND_API_KEY`.
- **Les variables `NEXT_PUBLIC_*` sont figées au moment du build.** Toute modification demande un nouveau `pnpm build`, pas seulement un redémarrage.
- **`BETTER_AUTH_URL` doit être l'adresse exacte utilisée par les visiteurs.** Sinon la connexion à `/admin` est refusée (origine non autorisée). Choisir une seule version du domaine (avec ou sans `www`) et rediriger l'autre dans Nginx (étape 8).
- Ne pas mettre `ADMIN_EMAIL` / `ADMIN_PASSWORD` en production : le compte est créé à l'étape 6.

## 4. Dossier des images uploadées

En dehors du projet, pour qu'il survive aux mises à jour :

```bash
sudo mkdir -p /var/lib/gdcouv/uploads
sudo chown -R <user>:<user> /var/lib/gdcouv   # l'utilisateur qui lance PM2
```

Ce dossier est à inclure dans les sauvegardes (étape 11).

## 5. Installation, migrations, build

Dans cet ordre :

```bash
cd <chemin-app>
pnpm install --frozen-lockfile   # génère aussi le client Prisma (postinstall)
pnpm db:deploy                    # = prisma migrate deploy : crée les tables
pnpm build
```

`pnpm db:deploy` doit afficher `All migrations have been successfully applied.` (3 migrations).
**Ne jamais lancer `pnpm db:migrate` ni `pnpm db:seed` en production** : le premier est réservé au développement, le second insère des données de démonstration.

## 6. Premier compte administrateur

```bash
pnpm admin:create <email> '<mot-de-passe>' "<Prénom Nom>"
```

- 10 caractères minimum ; les guillemets simples évitent que le shell interprète `$`, `!`, etc.
- Le compte créé est **Administrateur**. Les autres comptes (administrateurs ou éditeurs) se créent ensuite depuis `/admin/parametres/utilisateurs`.
- La même commande sur un email existant réinitialise son mot de passe (et le déconnecte).

## 7. Lancer l'app avec PM2

Créer `<chemin-app>/ecosystem.config.js` :

```js
module.exports = {
  apps: [
    {
      name: "<nom-app>",
      cwd: "<chemin-app>",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      exec_mode: "fork",
      instances: 1,
      env: { NODE_ENV: "production" },
      max_memory_restart: "600M",
    },
  ],
};
```

**Si l'app n'existe pas encore dans PM2 :**

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup      # une seule fois par serveur : suivre la commande affichée
```

**Si l'ancienne version tourne déjà sous PM2** (`pm2 list`) :

```bash
pm2 describe <nom-app>   # vérifier le dossier (cwd) et le port utilisés
pm2 delete <nom-app>     # l'ancienne config ne connaît ni le nouveau .env ni l'ecosystem
pm2 start ecosystem.config.js
pm2 save
```

Contrôle :

```bash
pm2 logs <nom-app> --lines 50     # « Ready » sans erreur
curl -I http://127.0.0.1:3000     # HTTP/1.1 200
```

## 8. Nginx

À adapter dans le fichier du site (souvent `/etc/nginx/sites-available/gdcouverture`) :

```nginx
server {
    server_name gdcouverture.ci;

    # Uploads de l'admin : jusqu'à 15 Mo par image (sinon erreur 413)
    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        # Adresse IP réelle : utilisée par la limite anti-spam des devis
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # listen 443 ssl; + certificats gérés par certbot
}

# Une seule adresse officielle : www redirige vers le domaine nu
server {
    server_name www.gdcouverture.ci;
    return 301 https://gdcouverture.ci$request_uri;
}
```

```bash
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d gdcouverture.ci -d www.gdcouverture.ci   # si HTTPS pas encore en place
```

## 9. Emails (Resend)

Dans le tableau de bord Resend, le domaine `gdcouverture.ci` doit être **vérifié** (enregistrements SPF et DKIM ajoutés dans la zone DNS). Sans cela, les demandes de devis sont bien enregistrées en base, mais aucun email ne part (ni la notification interne, ni l'accusé de réception au client).

## 10. Vérifications après mise en ligne

- [ ] `https://gdcouverture.ci` s'affiche, ainsi que `/services`, `/realisations`, `/blog` et `/contact`
- [ ] `/sitemap.xml` et `/robots.txt` répondent
- [ ] Connexion sur `/admin/login` avec le compte de l'étape 6
- [ ] Envoyer une demande depuis `/contact` : elle apparaît dans **Admin → Demandes de devis**, et les 2 emails arrivent (colonne « Email de notification : Envoyé » sur la fiche)
- [ ] Ajouter une image dans la **Médiathèque** : pas d'erreur 413, fichier présent dans `/var/lib/gdcouv/uploads`
- [ ] Publier une réalisation : elle apparaît sur `/realisations` et sur l'accueil
- [ ] Créer un compte **Éditeur** et vérifier qu'il ne voit ni les devis ni le tableau de bord
- [ ] `pm2 list` : pas de redémarrages en boucle (colonne ↺ stable)

## 11. Sauvegardes

À programmer (cron quotidien, par exemple), et à copier hors du serveur :

```bash
mysqldump -u gdcouv -p <nom-de-la-base> | gzip > ~/backups/gdcouv-$(date +%F).sql.gz
tar czf ~/backups/uploads-$(date +%F).tar.gz -C /var/lib/gdcouv uploads
```

## 12. Mises à jour suivantes

```bash
cd <chemin-app>
git pull origin dev-issouf
pnpm install --frozen-lockfile
pnpm db:deploy            # seulement si de nouvelles migrations sont arrivées (sans effet sinon)
pnpm build
pm2 reload <nom-app>
pm2 logs <nom-app> --lines 50
```

Faire une sauvegarde de la base avant toute mise à jour qui contient une migration.

## Dépannage

| Symptôme | Cause probable |
|---|---|
| `pool timeout: failed to retrieve a connection` | `DATABASE_URL` incorrecte (utilisateur, mot de passe, nom de base, caractère spécial non encodé) ou MySQL arrêté |
| `Duplicate key name 'account_userId_idx'` pendant `db:deploy` | le commit `a8acc2c` n'a pas été récupéré (étape 1) |
| Connexion admin refusée alors que le mot de passe est bon | `BETTER_AUTH_URL` différente de l'adresse dans le navigateur (http/https, www) |
| Erreur 413 à l'envoi d'une image | `client_max_body_size` absent dans Nginx |
| Images uploadées disparues après une mise à jour | `UPLOAD_DIR` pointe dans le dossier du projet |
| GA / Ads / WhatsApp pas pris en compte après modification du `.env` | variable `NEXT_PUBLIC_*` : refaire `pnpm build` puis `pm2 reload` |
| Devis enregistrés mais aucun email | `RESEND_API_KEY` manquante ou domaine non vérifié dans Resend |
