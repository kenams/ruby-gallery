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
        <SectionHeading
          eyebrow="Galerie"
          title={galleryContent.title}
          description={galleryContent.intro}
        />
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          { label: "Total", value: stats.total },
          { label: "Disponibles", value: stats.available },
          { label: "Reservees", value: stats.reserved },
          { label: "Vendues", value: stats.sold }
        ].map((item) => (
          <div key={item.label} className="surface rounded-[1.8rem] px-5 py-5">
            <p className="text-fine text-ruby/80">{item.label}</p>
            <p className="mt-3 font-display text-4xl text-ink">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="surface h-fit rounded-[2rem] p-6">
          <p className="text-fine text-ruby/80">Filtres</p>

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
                  "rounded-full border px-4 py-3 text-sm transition",
                  availability === item.value
                    ? "border-ruby/30 bg-ruby/5 text-ruby"
                    : "border-black/8 bg-white/60 text-ink/70 hover:border-ruby/20 hover:text-ruby"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-fine text-ruby/80">Collections</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href={`/gallery?${new URLSearchParams({
                  ...(availability !== "all" ? { availability } : {}),
                  ...(sort !== "curated" ? { sort } : {})
                }).toString()}`}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition",
                  !collection
                    ? "border-ruby/30 bg-ruby/5 text-ruby"
                    : "border-black/8 bg-white/60 text-ink/70 hover:border-ruby/20 hover:text-ruby"
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
                    "rounded-full border px-4 py-2 text-sm transition",
                    collection === item
                      ? "border-ruby/30 bg-ruby/5 text-ruby"
                      : "border-black/8 bg-white/60 text-ink/70 hover:border-ruby/20 hover:text-ruby"
                  )}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-fine text-ruby/80">Tri</p>
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
                    "rounded-full border px-4 py-3 text-sm transition",
                    sort === item.value
                      ? "border-ruby/30 bg-ruby/5 text-ruby"
                      : "border-black/8 bg-white/60 text-ink/70 hover:border-ruby/20 hover:text-ruby"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink/55">
              {artworks.length} oeuvre{artworks.length > 1 ? "s" : ""} affichee{artworks.length > 1 ? "s" : ""}
            </p>
            <div className="text-sm text-ink/50">
              {collection ? `Collection: ${collection}` : "Toutes les collections"}
            </div>
          </div>

          {artworks.length ? (
            <div className="grid gap-6 md:grid-cols-2">
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
