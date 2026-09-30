// Données de démonstration pour tester en local : pnpm db:seed
// - compte admin (ADMIN_EMAIL / ADMIN_PASSWORD du .env)
// - quelques réalisations, un article, des avis et des demandes de devis
// Ne s'exécute pas en production.
import "dotenv/config";
import { readFile } from "node:fs/promises";
import { upsertAdmin } from "./lib/admin";
import { storeImage } from "@/lib/media";
import { prisma } from "@/lib/prisma";

async function image(file: string) {
  return storeImage(await readFile(`public/img/${file}`), file);
}

async function main() {
  if (process.env.NODE_ENV === "production") throw new Error("Seed désactivé en production.");
  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) throw new Error("ADMIN_EMAIL et ADMIN_PASSWORD doivent être définis dans .env");

  await upsertAdmin(ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME);
  console.log(`Admin : ${ADMIN_EMAIL} (mot de passe : ADMIN_PASSWORD dans .env)`);

  if ((await prisma.realisation.count()) > 0) {
    console.log("Contenu de démonstration déjà présent, rien d'autre à faire.");
    return;
  }

  const [toit, toit2, facade, etanch, plomb, peinture] = await Promise.all(
    ["gdcouverture-4.webp", "gdcouverture-5.webp", "gdcouverture-13.webp", "gdcouverture-18.webp", "gdcouverture-8.webp", "gdcouverture-2.webp"].map(image),
  );

  await prisma.realisation.create({
    data: {
      title: "Réfection complète d'une toiture de villa",
      slug: "refection-toiture-villa-cocody",
      location: "Cocody, Abidjan",
      service: "couverture",
      description: "Dépose de l'ancienne couverture en tôles, reprise de la charpente et pose d'une couverture neuve avec isolation thermique.\n\nChantier réalisé en 12 jours.",
      published: true,
      completedAt: new Date("2026-06-15"),
      coverId: toit2.id,
      images: { create: [
        { mediaId: toit.id, kind: "AVANT", position: 0 },
        { mediaId: toit2.id, kind: "APRES", position: 1 },
      ] },
    },
  });
  await prisma.realisation.create({
    data: {
      title: "Ravalement de façade d'un immeuble R+4",
      slug: "ravalement-facade-immeuble-plateau",
      location: "Plateau, Abidjan",
      service: "ravalement",
      description: "Nettoyage haute pression, traitement des fissures et application d'une peinture extérieure anti-humidité, réalisés en travaux sur cordes.",
      published: true,
      completedAt: new Date("2026-04-02"),
      coverId: facade.id,
    },
  });
  await prisma.realisation.create({
    data: {
      title: "Étanchéité d'une toiture-terrasse",
      slug: "etancheite-toiture-terrasse-marcory",
      location: "Marcory, Abidjan",
      service: "etancheite",
      description: "Recherche de fuites puis mise en place d'une étanchéité bicouche sur 220 m² de toiture-terrasse.",
      published: true,
      completedAt: new Date("2026-02-20"),
      coverId: etanch.id,
      images: { create: [{ mediaId: plomb.id, kind: "GALERIE", position: 0 }] },
    },
  });

  await prisma.article.create({
    data: {
      title: "5 signes qu'il faut refaire l'étanchéité de votre terrasse",
      slug: "5-signes-refaire-etancheite-terrasse",
      excerpt: "Taches au plafond, cloques, flaques persistantes… Voici comment repérer une étanchéité fatiguée avant la saison des pluies.",
      category: "Conseils",
      status: "PUBLIE",
      publishedAt: new Date("2026-09-01"),
      coverId: peinture.id,
      content:
        "<p>À Abidjan, la saison des pluies met les toitures-terrasses à rude épreuve. Voici les signes à surveiller.</p>" +
        "<h2>1. Des taches d'humidité au plafond</h2><p>C'est souvent le premier signe visible d'une infiltration.</p>" +
        "<h2>2. Des cloques sur le revêtement</h2><p>Elles indiquent que l'eau passe sous la membrane.</p>" +
        "<h2>3. Des flaques qui restent après la pluie</h2><p>Une pente mal réglée fatigue l'étanchéité.</p>" +
        "<ul><li>Faites inspecter votre terrasse une fois par an</li><li>Nettoyez les évacuations avant la saison des pluies</li></ul>",
    },
  });
  await prisma.article.create({
    data: { title: "Brouillon : entretenir ses gouttières", slug: "entretenir-ses-gouttieres", content: "<p>À compléter.</p>", status: "BROUILLON" },
  });

  await prisma.testimonial.createMany({
    data: [
      { name: "Kouassi A.", role: "Propriétaire, Cocody", content: "Équipe sérieuse et ponctuelle. Plus aucune fuite depuis la réfection de notre toiture.", rating: 5, position: 0 },
      { name: "Syndic Résidence Les Palmiers", role: "Marcory", content: "Ravalement réalisé sans échafaudage, rapide et propre. Je recommande.", rating: 5, position: 1 },
      { name: "Aya K.", role: "Gérante de commerce, Plateau", content: "Intervention rapide pour une fuite urgente, devis clair.", rating: 4, position: 2 },
    ],
  });

  const day = 24 * 3600 * 1000;
  await prisma.quoteRequest.createMany({
    data: [
      { name: "Jean Démo", email: "jean@example.com", phone: "0701020304", service: "etancheite", message: "Infiltrations sur ma terrasse.", utmSource: "google", utmMedium: "cpc", utmCampaign: "etancheite-abidjan", gclid: "demo-gclid-1", landingPage: "/services/etancheite", createdAt: new Date(Date.now() - 1 * day) },
      { name: "Awa Démo", email: "awa@example.com", phone: "0501020304", company: "SCI Awa", service: "couverture", message: "Toiture à refaire, 150 m².", status: "CONTACTE", createdAt: new Date(Date.now() - 3 * day) },
      { name: "Paul Démo", email: "paul@example.com", phone: "0101020304", service: "ravalement", message: "Façade d'immeuble à rénover.", status: "DEVIS_ENVOYE", utmSource: "facebook", createdAt: new Date(Date.now() - 8 * day) },
      { name: "Fatou Démo", email: "fatou@example.com", phone: "0708091011", service: "plomberie", message: "Fuite sous évier.", status: "GAGNE", gclid: "demo-gclid-2", utmSource: "google", createdAt: new Date(Date.now() - 15 * day) },
      { name: "Marc Démo", email: "marc@example.com", phone: "0708091012", service: "peinture", message: "Peinture de 3 pièces.", status: "PERDU", createdAt: new Date(Date.now() - 40 * day) },
    ],
  });

  console.log("Contenu de démonstration créé.");
}

main()
  .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
