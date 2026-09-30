"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  ADS_ID,
  CONSENT_KEY,
  GA_ID,
  captureAttribution,
  trackPhoneClick,
  trackWhatsappClick,
} from "@/lib/analytics";

const TAG_ID = GA_ID ?? ADS_ID;

// Consent Mode v2 : tout est refusé par défaut, puis restauré depuis le choix
// mémorisé (voir CookieBanner). Les changements de page sont suivis par GA4
// via la mesure améliorée (historique du navigateur).
const initScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
var stored = null;
try { stored = localStorage.getItem(${JSON.stringify(CONSENT_KEY)}); } catch (e) {}
var v = stored === "granted" ? "granted" : "denied";
gtag("consent", "default", {
  ad_storage: v,
  ad_user_data: v,
  ad_personalization: v,
  analytics_storage: v,
  wait_for_update: 500
});
gtag("js", new Date());
${GA_ID ? `gtag("config", ${JSON.stringify(GA_ID)});` : ""}
${ADS_ID ? `gtag("config", ${JSON.stringify(ADS_ID)});` : ""}
`;

export function Analytics() {
  const pathname = usePathname();
  useEffect(() => {
    captureAttribution();

    // Suivi global des clics téléphone / WhatsApp, quel que soit le composant
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) trackPhoneClick();
      else if (/wa\.me|api\.whatsapp\.com/.test(href)) trackWhatsappClick();
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // Pas de suivi dans l'administration
  if (!TAG_ID || pathname.startsWith("/admin")) return null;

  return (
    <>
      <Script id="gtag-init" strategy="afterInteractive">
        {initScript}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${TAG_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
