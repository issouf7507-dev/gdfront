export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gdcouverture.ci";

export const PHONE = "+2250713488488";
export const PHONE_DISPLAY = "+225 07 13 48 84 88";
export const EMAIL = "contact@gdcouverture.ci";

// Numéro WhatsApp au format international sans "+" (ex. 2250713488488).
// Par défaut : le numéro de téléphone du site, à confirmer avec le client.
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? PHONE.replace("+", "");

export const WHATSAPP_MESSAGE =
  "Bonjour GD Couverture, je souhaite obtenir un devis.";

export function whatsappUrl(message = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const ADDRESS = "Cocody Danga, Abidjan, Côte d'Ivoire";
export const MAPS_URL = "https://maps.google.com/?q=Abidjan,Cocody";

// Réseaux sociaux affichés dans le footer : ne renseigner que des pages qui existent
// (la liste vide masque le bloc).
export const SOCIAL_LINKS: { label: "Facebook" | "Instagram" | "LinkedIn"; href: string }[] = [];
