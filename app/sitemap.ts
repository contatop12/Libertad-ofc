import type { MetadataRoute } from "next";

import { FOOTER_LINKS, SITE } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}${FOOTER_LINKS.privacy}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE.url}${FOOTER_LINKS.terms}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
