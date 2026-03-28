import { resolvePlaceholder } from "@/lib/placeholders";

export const siteConfig = {
  name: "Ruby",
  title: "Ruby | Artiste peintre contemporaine",
  description:
    "Galerie en ligne de Ruby, artiste peintre contemporaine. Oeuvres originales, peinture sensible et presence artistique en Occitanie.",
  baseline:
    "Peintures originales ou le silence, la matiere et la lumiere tiennent ensemble dans un meme geste.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contactEmail: process.env.CONTACT_EMAIL ?? "[RUBY_EMAIL]",
  contactPhone: process.env.CONTACT_PHONE ?? "[RUBY_PHONE]",
  instagramUrl: process.env.INSTAGRAM_URL ?? "[RUBY_INSTAGRAM]",
  instagramHandle: process.env.INSTAGRAM_HANDLE ?? "@ruby",
  kahDigitalUrl: process.env.KAH_DIGITAL_URL ?? "https://kah-digital.ch/",
  location: process.env.NEXT_PUBLIC_RUBY_LOCATION ?? "[RUBY_LOCATION]",
  artistPortrait: process.env.NEXT_PUBLIC_RUBY_PORTRAIT ?? "[RUBY_PORTRAIT]",
  stripeCurrency: resolvePlaceholder(process.env.STRIPE_CURRENCY, "eur").toLowerCase(),
  keywords: [
    "artiste peintre Occitanie",
    "peintre contemporaine francaise",
    "galerie d'art en ligne",
    "oeuvre originale a vendre",
    "tableau contemporain original",
    "artiste peintre en Occitanie",
    "peintures contemporaines originales"
  ]
} as const;

export const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/gallery", label: "Galerie" },
  { href: "/about", label: "A propos" },
  { href: "/contact", label: "Contact" }
] as const;

export const artworkStatusLabels = {
  AVAILABLE: "Disponible",
  RESERVED: "Reservee",
  SOLD: "Vendue"
} as const;

export const artworkStatusTone = {
  AVAILABLE: "text-emerald-700 border-emerald-700/15 bg-emerald-50",
  RESERVED: "text-amber-700 border-amber-700/15 bg-amber-50",
  SOLD: "text-stone-700 border-stone-700/15 bg-stone-100"
} as const;
