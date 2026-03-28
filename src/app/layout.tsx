import type { Metadata } from "next";
import { Bodoni_Moda, Instrument_Sans } from "next/font/google";

import "@/app/globals.css";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = createMetadata({
  title: siteConfig.title,
  description: siteConfig.description
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${display.variable} ${body.variable} bg-haze font-body text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
