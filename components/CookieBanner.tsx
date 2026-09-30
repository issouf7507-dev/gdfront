"use client";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { CONSENT_KEY, updateConsent } from "@/lib/analytics";

const noopSubscribe = () => () => {};

function hasStoredChoice() {
  try {
    return localStorage.getItem(CONSENT_KEY) !== null;
  } catch {
    return false;
  }
}

export function CookieBanner() {
  // Côté serveur : considéré comme déjà choisi, pour ne rien afficher avant l'hydratation
  const alreadyChosen = useSyncExternalStore(noopSubscribe, hasStoredChoice, () => true);
  const [dismissed, setDismissed] = useState(false);
  const visible = !alreadyChosen && !dismissed;

  const choose = (granted: boolean) => {
    try {
      localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
    } catch {
      // stockage indisponible : le choix vaut pour cette page uniquement
    }
    updateConsent(granted);
    setDismissed(true);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Gestion des cookies"
      className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-xl rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl md:left-6 md:right-auto"
    >
      <p className="mb-4 text-xs leading-relaxed text-gray-600">
        Nous utilisons des cookies pour mesurer l&apos;audience du site et l&apos;efficacité de nos
        publicités. Vous pouvez accepter ou refuser.{" "}
        <Link href="/confidentialite" className="text-[#f39c12] hover:underline">
          En savoir plus
        </Link>
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => choose(false)}
          className="flex-1 cursor-pointer rounded-full bg-gray-100 px-6 py-2.5 text-xs text-gray-700 transition-colors hover:bg-gray-200"
        >
          Refuser
        </button>
        <button
          onClick={() => choose(true)}
          className="flex-1 cursor-pointer rounded-full bg-[#f39c12] px-6 py-2.5 text-xs text-white transition-colors hover:bg-[#d68910]"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
