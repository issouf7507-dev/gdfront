import { Phone } from "lucide-react";
import { PHONE, whatsappUrl } from "@/lib/site";

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.93.95-3.47-.22-.36a9.42 9.42 0 0 1-1.45-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.9.99 6.68 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.46 9.43zm8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.67 5.8.67 12.07c0 2 .52 3.96 1.52 5.69L.57 23.7l6.08-1.6a11.36 11.36 0 0 0 5.4 1.38h.01c6.27 0 11.38-5.1 11.38-11.38 0-3.04-1.18-5.9-3.35-8.06z" />
    </svg>
  );
}

// Boutons de contact fixes : WhatsApp partout, appel direct sur mobile.
// Les clics sont suivis globalement par <Analytics />.
export function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-center gap-3">
      <a
        href={`tel:${PHONE}`}
        aria-label="Appeler GD Couverture"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f39c12] text-white shadow-lg transition-transform hover:scale-105 md:hidden"
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nous écrire sur WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <WhatsappIcon className="h-7 w-7" />
      </a>
    </div>
  );
}
