import {
    Home,
    Droplet,
    Wrench,
    PaintBucket,
    Brush,
    Mountain,
    ClipboardCheck,
    Building2,
} from "lucide-react";

export const services = [
    {
        id: "couverture",
        icon: Home,
        title: "Couverture",
        subtitle: "Protection durable de votre bâtiment",
        description: "Expertise complète en couverture adaptée au climat ivoirien pour garantir la longévité de vos toitures.",
        features: [
            "Pose de toitures neuves adaptées au climat ivoirien",
            "Rénovation et réparation de toitures",
            "Traitement des fuites et infiltrations",
            "Remplacement d'éléments défectueux",
            "Entretien préventif et curatif",
            "Isolation thermique des toitures"
        ],
        images: [
            "/img/qui-somme.webp",
        ],
        color: "from-orange-500 to-orange-600"
    },
    {
        id: "etancheite",
        icon: Droplet,
        title: "Étanchéité",
        subtitle: "Préserver la structure et éviter les dégradations coûteuses",
        description: "Solutions d'étanchéité complètes pour protéger vos bâtiments contre l'humidité et les infiltrations.",
        features: [
            "Toitures-terrasses",
            "Balcons et terrasses",
            "Murs enterrés et sous-sols",
            "Traitement des joints et points sensibles",
            "Recherche et réparation de fuites",
            "Solutions préventives et correctives"
        ],
        images: [
            "/img/gdcouverture-18.webp",
        ],
        color: "from-blue-500 to-blue-600"
    },
    {
        id: "plomberie",
        icon: Wrench,
        title: "Plomberie",
        subtitle: "Interventions rapides et efficaces",
        description: "Service de plomberie professionnel pour tous vos besoins en installation et maintenance.",
        features: [
            "Installation de réseaux de plomberie",
            "Détection et réparation de fuites",
            "Débouchage de canalisations",
            "Remplacement de sanitaires et robinetterie",
            "Maintenance préventive et corrective"
        ],
        images: [
            "/img/gdcouverture-8.webp"
        ],
        color: "from-cyan-500 to-cyan-600"
    },
    {
        id: "ravalement",
        icon: Building2,
        title: "Ravalement de façades",
        subtitle: "Valoriser et protéger votre patrimoine immobilier",
        description: "Redonnez vie à vos façades avec nos services de ravalement complets et durables.",
        features: [
            "Nettoyage et remise en état des façades",
            "Réparation des fissures et dégradations",
            "Traitement anti-humidité et moisissures",
            "Enduits, peintures extérieures et revêtements durables",
            "Isolation thermique par l'extérieur (ITE)"
        ],
        images: [
            "/img/gdcouverture-13.webp"
        ],
        color: "from-amber-500 to-amber-600"
    },
    {
        id: "peinture",
        icon: PaintBucket,
        title: "Peinture intérieure",
        subtitle: "Des finitions soignées pour sublimer vos espaces",
        description: "Transformez vos intérieurs avec des finitions professionnelles et des peintures de qualité.",
        features: [
            "Peinture murs, plafonds et boiseries",
            "Préparation des supports",
            "Peintures durables et adaptées",
            "Résultat esthétique, propre et durable"
        ],
        images: [
            "/img/gdcouverture-2.webp"
        ],
        color: "from-purple-500 to-purple-600"
    },
    {
        id: "renovation",
        icon: Brush,
        title: "Rénovation & maintenance",
        subtitle: "Services complémentaires",
        description: "Une gamme complète de services pour la rénovation et l'entretien de vos bâtiments.",
        features: [
            "Maintenance générale du bâtiment",
            "Rénovation partielle ou complète",
            "Réhabilitation de bâtiments existants",
            "Coordination de plusieurs corps de métiers",
            "Amélioration du confort et de la fonctionnalité",
            "Menuiserie aluminium",
            "Électricité"
        ],
        images: [
            "/img/gdcouverture-10.webp"
        ],
        color: "from-green-500 to-green-600"
    }
];

export const specialties = [
    {
        id: "hauteur",
        icon: Mountain,
        title: "Travaux en hauteur / Travaux à la corde",
        subtitle: "Interventions sans échafaudage, rapides et économiques",
        advantages: [
            "Rapidité d'exécution",
            "Réduction des coûts",
            "Sécurité maximale"
        ],
        services: [
            "Interventions en hauteur sur façades et toitures",
            "Accès difficiles sans échafaudage",
            "Réparations ponctuelles et sécurisation",
            "Maintenance urgente",
            "Nettoyage de façades et vitres",
            "Étanchéité localisée"
        ],
        image: "/img/gdcouverture-9.webp"
    },
    {
        id: "maintenance",
        icon: ClipboardCheck,
        title: "Offre maintenance & entretien",
        subtitle: "Contrats de maintenance sur mesure",
        services: [
            "Visites régulières d'inspection",
            "Contrôle toitures, façades et étanchéité",
            "Nettoyage des gouttières",
            "Détection préventive des fuites",
            "Petites réparations incluses",
            "Interventions prioritaires en cas d'urgence",
            "Rapport d'intervention avec recommandations"
        ],
        note: "(Travaux hors forfait sur devis après diagnostic)",
        image: "/img/gdcouverture-18.webp"
    }
];

export type ServiceLanding = {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    image: string;
};

// Données normalisées pour les pages d'atterrissage /services/[slug]
export const serviceLandings: ServiceLanding[] = [
    ...services.map((s) => ({
        slug: s.id,
        title: s.title,
        subtitle: s.subtitle,
        description: s.description,
        features: s.features,
        image: s.images[0],
    })),
    ...specialties.map((s) => ({
        slug: s.id,
        title: s.title,
        subtitle: s.subtitle,
        description: s.subtitle,
        features: s.services,
        image: s.image,
    })),
];

export function getServiceLanding(slug: string) {
    return serviceLandings.find((s) => s.slug === slug);
}

// Services proposés dans les formulaires de devis (clé => libellé)
export const QUOTE_SERVICE_LABELS = {
    couverture: "Couverture",
    etancheite: "Étanchéité",
    plomberie: "Plomberie",
    ravalement: "Ravalement de façades",
    peinture: "Peinture intérieure",
    renovation: "Rénovation & maintenance",
    hauteur: "Travaux en hauteur",
    maintenance: "Contrat de maintenance",
    autre: "Autre",
} as const;

export type QuoteService = keyof typeof QUOTE_SERVICE_LABELS;
