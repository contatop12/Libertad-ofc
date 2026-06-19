import { FAQ_ITEMS, SITE } from "@/lib/constants";

export function JsonLd() {
  const financialService = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: SITE.name,
    description:
      "Boutique de estratégia patrimonial em Indaiatuba-SP. Atendimento exclusivo para investidores de alta renda. Escritório credenciado à EQI Investimentos.",
    url: SITE.url,
    telephone: `+${SITE.whatsapp}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Indaiatuba",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    areaServed: "BR",
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financialService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
