import { OFFICES, FAQ_ITEMS, SITE, SOCIAL_LINKS } from "@/lib/constants";

function toPostalAddress(office: (typeof OFFICES)[number]) {
  return {
    "@type": "PostalAddress" as const,
    streetAddress: office.address,
    addressLocality: office.city.replace(/ - SP$/, ""),
    addressRegion: "SP",
    addressCountry: "BR",
  };
}

export function JsonLd() {
  const indaiatubaOffice = OFFICES.find((office) => office.city.includes("Indaiatuba"))!;
  const saoPauloOffice = OFFICES.find((office) => office.city.includes("São Paulo"))!;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.tagline,
        inLanguage: "pt-BR",
        publisher: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": ["FinancialService", "LocalBusiness", "Organization"],
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        description: SITE.tagline,
        url: SITE.url,
        email: SITE.email,
        telephone: `+${SITE.whatsapp}`,
        image: `${SITE.url}/images/logo-libertad-capital-eqi.png`,
        logo: `${SITE.url}/images/logo-libertad-capital-eqi.png`,
        address: toPostalAddress(indaiatubaOffice),
        location: [
          {
            "@type": "Place",
            name: `${SITE.name} — Indaiatuba`,
            address: toPostalAddress(indaiatubaOffice),
          },
          {
            "@type": "Place",
            name: `${SITE.name} — São Paulo`,
            address: toPostalAddress(saoPauloOffice),
          },
        ],
        areaServed: [
          { "@type": "City", name: "Indaiatuba" },
          { "@type": "City", name: "São Paulo" },
          { "@type": "Country", name: "Brasil" },
        ],
        sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.linkedin],
        parentOrganization: {
          "@type": "Organization",
          name: "EQI Investimentos",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
