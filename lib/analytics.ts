// Suivi GA4 / Google Ads et attribution des demandes de devis.
// Toutes les fonctions sont sans effet si gtag n'est pas chargé (ID absent).

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
// Libellés de conversion Google Ads (format "AW-XXX/label"), optionnels
const ADS_LEAD_SEND_TO = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_SEND_TO;
const ADS_CALL_SEND_TO = process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_SEND_TO;
const ADS_WHATSAPP_SEND_TO = process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_SEND_TO;

export const CONSENT_KEY = "gd-consent";
const ATTRIBUTION_KEY = "gd-attribution";

export const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

export type Attribution = Partial<
  Record<(typeof ATTRIBUTION_PARAMS)[number] | "landing_page" | "referrer", string>
>;

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}

function trackAdsConversion(sendTo: string | undefined) {
  if (sendTo) trackEvent("conversion", { send_to: sendTo });
}

export function trackLead(service?: string) {
  trackEvent("generate_lead", { service: service || "autre" });
  trackAdsConversion(ADS_LEAD_SEND_TO);
}

export function trackPhoneClick() {
  trackEvent("click_phone");
  trackAdsConversion(ADS_CALL_SEND_TO);
}

export function trackWhatsappClick() {
  trackEvent("click_whatsapp");
  trackAdsConversion(ADS_WHATSAPP_SEND_TO);
}

export function updateConsent(granted: boolean) {
  const value = granted ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}

// Mémorise les paramètres de campagne à l'arrivée sur le site (sessionStorage :
// rien n'est conservé après la fermeture de l'onglet).
export function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const hasCampaign = ATTRIBUTION_PARAMS.some((p) => params.get(p));
    if (!hasCampaign && sessionStorage.getItem(ATTRIBUTION_KEY)) return;

    const data: Attribution = {
      landing_page: window.location.pathname,
      referrer: document.referrer || undefined,
    };
    for (const p of ATTRIBUTION_PARAMS) {
      const v = params.get(p);
      if (v) data[p] = v.slice(0, 200);
    }
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(data));
  } catch {
    // stockage indisponible (navigation privée, etc.)
  }
}

export function getAttribution(): Attribution {
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
