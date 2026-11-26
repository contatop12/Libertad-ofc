import Script from "next/script";

/** Contêiner do Google Tag Manager do site. É por ele que o Google Analytics 4 (G-8V4R5PXZ89) é carregado. */
export const GTM_ID = "GTM-K7LDXMXN";

/** Só o build de produção mede: `next dev` não envia visitas do ambiente local para o Analytics. */
const ATIVO = process.env.NODE_ENV === "production";

/** Script do GTM. Entra em todas as páginas pelo layout raiz. */
export function GoogleTagManager() {
  if (!ATIVO) return null;
  return (
    <Script id="google-tag-manager" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/** Versão do GTM para navegador sem JavaScript. Fica logo depois da abertura do <body>. */
export function GoogleTagManagerNoScript() {
  if (!ATIVO) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
