import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";

import { JsonLd } from "@/components/ui/JsonLd";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { SITE } from "@/lib/constants";
import { SITE_SEO } from "@/lib/seo";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE_SEO.title,
  description: SITE_SEO.description,
  keywords: [...SITE_SEO.keywords],
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: SITE_SEO.title,
    description: SITE_SEO.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "pt_BR",
    type: "website",
    images: [SITE_SEO.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_SEO.title,
    description: SITE_SEO.description,
    images: [SITE_SEO.ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${dmSans.variable} ${sora.variable} font-body antialiased`}>
        <JsonLd />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
