import type { Metadata } from "next";

import { hasConfiguredValue } from "@/lib/placeholders";
import { siteConfig } from "@/lib/site";

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function createMetadata({
  title,
  description,
  path = "/",
  image = "/branding/og-ruby.svg",
  keywords = [...siteConfig.keywords]
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: readonly string[];
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    title,
    description,
    keywords: [...keywords],
    creator: "KAH Digital",
    publisher: siteConfig.name,
    category: "art",
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "fr_FR",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    }
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "fr-FR"
  };
}

export function artistJsonLd(input?: {
  name?: string;
  location?: string;
  instagram?: string;
  description?: string;
}) {
  const location = input?.location ?? "Occitanie, France";
  const [addressRegion = "Occitanie", addressCountry = "FR"] = location.split(",").map((item) => item.trim());
  const instagram = input?.instagram ?? siteConfig.instagramUrl;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input?.name ?? siteConfig.name,
    jobTitle: "Artiste peintre",
    address: {
      "@type": "PostalAddress",
      addressRegion,
      addressCountry: addressCountry || "FR"
    },
    knowsAbout: [
      "peinture contemporaine",
      "oeuvres originales",
      "art abstrait sensible",
      "tableaux contemporains"
    ],
    description:
      input?.description ??
      `${input?.name ?? siteConfig.name} est une artiste peintre contemporaine basee en ${addressRegion}. Elle cree des oeuvres originales sensibles, minimalistes et profondes.`,
    sameAs: hasConfiguredValue(instagram) ? [instagram] : []
  };
}

export function artworkJsonLd(input: {
  title: string;
  description: string;
  image: string[];
  price: string;
  availability: "InStock" | "SoldOut" | "PreOrder";
  slug: string;
  creatorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: input.title,
    description: input.description,
    image: input.image.map((item) => absoluteUrl(item)),
    creator: {
      "@type": "Person",
      name: input.creatorName ?? siteConfig.name
    },
    artform: "Peinture contemporaine",
    artMedium: "Huile et techniques mixtes sur toile",
    offers: {
      "@type": "Offer",
      priceCurrency: siteConfig.stripeCurrency.toUpperCase(),
      price: input.price,
      availability: `https://schema.org/${input.availability}`,
      url: absoluteUrl(`/gallery/${input.slug}`)
    }
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}
