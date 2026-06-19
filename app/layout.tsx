import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";

import { JsonLd } from "@/components/ui/JsonLd";
import { SITE } from "@/lib/constants";

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

const title = "Libertad Capital | Assessoria Patrimonial em Indaiatuba | Credenciada EQI Investimentos";
const description =
  "Boutique de estratégia patrimonial em Indaiatuba-SP. Atendimento exclusivo para investidores de alta renda. Escritório credenciado à EQI Investimentos. Agende sua reunião.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  keywords: [
    "assessoria de investimentos indaiatuba",
    "assessor de investimentos indaiatuba",
    "planejamento patrimonial indaiatuba",
    "investimentos indaiatuba",
    "wealth management interior de são paulo",
    "consultoria patrimonial são paulo",
    "eqi indaiatuba",
    "escritório credenciado eqi",
    "investidor alta renda são paulo",
    "proteção patrimonial",
    "planejamento sucessório",
    "family office interior de são paulo",
    "investimentos para empresários",
    "gestão patrimonial",
    "wealth advisory são paulo",
  ],
  openGraph: {
    title,
    description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/og-libertad.jpg",
        width: 1200,
        height: 630,
        alt: "Libertad Capital — Assessoria Patrimonial credenciada à EQI Investimentos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-libertad.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
      </body>
    </html>
  );
}
