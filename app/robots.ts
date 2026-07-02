import type { MetadataRoute } from "next";

import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

const AI_AGENTS = ["GPTBot", "ChatGPT-User", "ClaudeBot", "Google-Extended", "PerplexityBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...AI_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
