import type { Metadata } from "next";
import Link from "next/link";

import { ArtworkCard } from "@/components/site/artwork-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { galleryContent } from "@/lib/content";
import { getArtworks, getCollections, getGalleryStats } from "@/lib/data";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Galerie | Ruby",
  description:
    "Decouvrez les peintures originales de Ruby, artiste peintre contemporaine en Occitanie. Oeuvres disponibles, reservees ou vendues.",
  keywords: [
    "galerie d'art en ligne",
    "tableaux contemporains originaux",
    "oeuvres originales a vendre",
    "artiste peintre Occitanie"
  ]
});

export default async function GalleryPage({
  searchParams
}: {
  searchParams: Promise<{ availability?: string; collection?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const availability =
    params.availability === "available" || params.availability === "reserved" || params.availability === "sold"
      ? params.availability
      : "all";
  const collection = params.collection || "";
  const sort =
    params.sort === "latest" || params.sort === "price-asc" || params.sort === "price-desc"
      ? params.sort
      : "curated";

  const [artworks, collections, stats] = await Promise.all([
    getArtworks({ availability, collection: collection || undefined, sort }),
    getCollections(),
    getGalleryStats()
  ]);

  return (
    <main className="grid-shell section-space">
      <Reveal>
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-end">
          <SectionHeading
            eyebrow="Galerie"
            title={galleryContent.title}
            description={galleryContent.intro}
          />
          <div className="public-panel rounded-[2.2rem] px-6 py-7 md:px-8">
            <p className="curatorial-note">Lecture de la galerie</p>
            <p className="mt-4 text-sm leading-7 text-ink/64">
              Les oeuvres sont presentees dans un rythme volontairement aere, avec un traitement
              plus proche d'un accrochage editorial que d'un catalogue marchand.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          { label: "Total", value: stats.total },
          { label: "Disponibles", value: stats.available },
          { label: "Reservees", value: stats.reserved },
          { label: "Vendues", value: stats.sold }
        ].map((item) => (
          <div key={item.label} className="public-panel rounded-[1.9rem] px-5 py-6">
            <p className="quiet-kicker">{item.label}</p>
            <p className="mt-4 font-display text-[2.6rem] leading-none text-ink">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="public-panel h-fit rounded-[2.2rem] p-6">
          <p className="quiet-kicker">Filtres</p>

          <div className="mt-5 grid gap-3">
            {[
              { value: "all", label: "Toutes les oeuvres" },
              { value: "available", label: "Disponibles" },
              { value: "reserved", label: "Reservees" },
              { value: "sold", label: "Vendues" }
            ].map((item) => (
              <Link
                key={item.value}
                href={`/gallery?availability=${item.value}${collection ? `&collection=${encodeURIComponent(collection)}` : ""}${sort !== "curated" ? `&sort=${sort}` : ""}`}
                className={cn(
                  "filter-chip justify-center",
                  availability === item.value
                    ? "filter-chip-active"
                    : ""
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <p className="quiet-kicker">Collections</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href={`/gallery?${new URLSearchParams({
                  ...(availability !== "all" ? { availability } : {}),
                  ...(sort !== "curated" ? { sort } : {})
                }).toString()}`}
                className={cn(
                  "filter-chip py-2",
                  !collection ? "filter-chip-active" : ""
                )}
              >
                Tout
              </Link>
              {collections.map((item) => (
                <Link
                  key={item}
                  href={`/gallery?${new URLSearchParams({
                    collection: item,
                    ...(availability !== "all" ? { availability } : {}),
                    ...(sort !== "curated" ? { sort } : {})
                  }).toString()}`}
                  className={cn(
                    "filter-chip py-2",
                    collection === item ? "filter-chip-active" : ""
                  )}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="quiet-kicker">Tri</p>
            <div className="mt-5 grid gap-3">
              {[
                { value: "curated", label: "Accrochage curatorial" },
                { value: "latest", label: "Les plus recentes" },
                { value: "price-asc", label: "Prix croissant" },
                { value: "price-desc", label: "Prix decroissant" }
              ].map((item) => (
                <Link
                  key={item.value}
                  href={`/gallery?${new URLSearchParams({
                    ...(collection ? { collection } : {}),
                    ...(availability !== "all" ? { availability } : {}),
                    ...(item.value !== "curated" ? { sort: item.value } : {})
                  }).toString()}`}
                  className={cn(
                    "filter-chip justify-center",
                    sort === item.value ? "filter-chip-active" : ""
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-black/6 pb-5">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-ink/46">
              {artworks.length} oeuvre{artworks.length > 1 ? "s" : ""} affichee{artworks.length > 1 ? "s" : ""}
            </p>
            <div className="text-[0.72rem] uppercase tracking-[0.24em] text-ink/42">
              {collection ? `Collection: ${collection}` : "Toutes les collections"}
            </div>
          </div>

          {artworks.length ? (
            <div className="grid gap-7 md:grid-cols-2">
              {artworks.map((artwork, index) => (
                <Reveal key={artwork.id} delay={index * 0.05}>
                  <ArtworkCard artwork={artwork} />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Aucune oeuvre ne correspond a ce filtre."
              description="Tu peux revenir a l'ensemble de la galerie ou afficher uniquement les oeuvres disponibles."
              href="/gallery"
              cta="Revenir a la galerie"
            />
          )}
        </div>
      </div>
    </main>
  );
}
