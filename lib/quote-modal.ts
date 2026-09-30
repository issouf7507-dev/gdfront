// La modale de devis vit dans le Header ; les autres composants l'ouvrent via cet événement.
export const OPEN_QUOTE_EVENT = "gd:open-quote";

export function openQuoteModal() {
  window.dispatchEvent(new Event(OPEN_QUOTE_EVENT));
}
