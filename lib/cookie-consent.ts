/**
 * Escolha do visitante no aviso de cookies.
 *
 * A medição de audiência fica ligada desde a primeira visita e só para quando o visitante clica em
 * "Recusar": a recusa fica guardada no navegador e o Google Tag Manager deixa de ser carregado
 * (ver `components/ui/GoogleTagManager.tsx`).
 */
export const CONSENT_STORAGE_KEY = "libertad-cookie-consent";
export const CONSENT_ACCEPTED = "accepted";
export const CONSENT_DENIED = "denied";

/** Cookies próprios que o Google Analytics e o Google Ads gravam no navegador. */
const TRACKING_COOKIE = /^(_ga|_gid|_gat|_gcl|_gac)/;

/** Apaga os cookies de medição já gravados, no endereço do site e nos domínios acima dele. */
export function clearTrackingCookies() {
  const host = window.location.hostname.split(".");
  const domains = host.map((_, i) => host.slice(i).join(".")).filter((d) => d.includes("."));
  for (const pair of document.cookie.split(";")) {
    const name = pair.split("=")[0].trim();
    if (!TRACKING_COOKIE.test(name)) continue;
    const expired = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    document.cookie = expired;
    for (const domain of domains) document.cookie = `${expired}; domain=.${domain}`;
  }
}

/** Guarda a escolha. Devolve `false` quando o navegador bloqueia o armazenamento local. */
export function storeConsent(value: typeof CONSENT_ACCEPTED | typeof CONSENT_DENIED): boolean {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    return true;
  } catch {
    return false;
  }
}

/** Lê a escolha guardada (`null` quando ainda não houve escolha ou o armazenamento está bloqueado). */
export function readConsent(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}
