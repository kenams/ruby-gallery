import type { MetadataRoute } from "next";

import { getArtworks } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const artworks = await getArtworks();

  const pages: MetadataRoute.Sitemap = [
    "",
    "/gallery",
    "/about",
    "/contact",
    "/legal",
    "/privacy",
    "/terms-of-sale"
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date()
  }));

  const artworkPages: MetadataRoute.Sitemap = artworks.map((artwork) => ({
    url: `${siteConfig.url}/gallery/${artwork.slug}`,
    lastModified: artwork.updatedAt
  }));

  return [...pages, ...artworkPages];
}
