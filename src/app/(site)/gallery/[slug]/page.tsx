import type { Metadata } from "next";
import { ArtworkStatus } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { BuyButton } from "@/components/forms/buy-button";
import { ArtworkCard } from "@/components/site/artwork-card";
import { ArtworkDetailGallery } from "@/components/site/artwork-detail-gallery";
import { JsonLd } from "@/components/site/json-ld";
import { StatusPill } from "@/components/ui/status-pill";
import { getArtworkBySlug, getArtworks, getRelatedArtworks } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { artworkJsonLd, breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateStaticParams() {
  const artworks = await getArtworks();
  return artworks.map((artwork) => ({ slug: artwork.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [artwork, settings] = await Promise.all([getArtworkBySlug(slug), getSiteSettings()]);

  if (!artwork) {
    return createMetadata({
      title: `Oeuvre introuvable | ${settings.artistName}`,
      description: "Cette oeuvre n'est plus disponible sur la galerie."
    });
  }

  return createMetadata({
    title: artwork.seoTitle ?? `${artwork.title} | ${settings.artistName}`,
    description: artwork.seoDescription ?? artwork.description,
    path: `/gallery/${artwork.slug}`,
    keywords: [
      artwork.title,
      artwork.collection,
      "tableau contemporain original",
      "oeuvre originale a vendre",
      `artiste peintre ${settings.location}`
    ]
  });
}

export default async function ArtworkDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);

  if (!artwork) {
    notFound();
  }

  const [related, settings] = await Promise.all([
    getRelatedArtworks(artwork.id, artwork.collection),
    getSiteSettings()
  ]);
  const images = artwork.images.length ? artwork.images : [{ url: artwork.coverImage, altText: artwork.altText, id: artwork.id, sortOrder: 0, artworkId: artwork.id, createdAt: artwork.createdAt }];
  const availability =
    artwork.status === ArtworkStatus.AVAILABLE
      ? "InStock"
      : artwork.status === ArtworkStatus.RESERVED
        ? "PreOrder"
        : "SoldOut";

  return (
    <main className="grid-shell section-space">
      <JsonLd
        data={artworkJsonLd({
          title: artwork.title,
          description: artwork.description,
          image: images.map((item) => item.url),
          price: String(artwork.priceInCents / 100),
          availability,
          slug: artwork.slug,
          creatorName: settings.artistName
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Galerie", path: "/gallery" },
          { name: artwork.title, path: `/gallery/${artwork.slug}` }
        ])}
      />

      <div className="mb-8">
        <Link href="/gallery" className="note-link">
          <ArrowLeft size={15} />
          Retour a la galerie
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <ArtworkDetailGallery images={images} fallbackAlt={artwork.altText} />

        <div className="public-panel h-fit rounded-[2.5rem] p-8 md:sticky md:top-28 md:p-10">
          <p className="quiet-kicker">{artwork.collection}</p>
          <h1 className="section-title mt-5 max-w-[10ch]">
            {artwork.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <StatusPill status={artwork.status} />
            <p className="text-[0.82rem] uppercase tracking-[0.22em] text-ink/62">
              {formatPrice(artwork.priceInCents)}
            </p>
          </div>

          <div className="mt-8 py-6">
            <div className="spec-row">
              <span>Dimensions</span>
              <span>{artwork.dimensions}</span>
            </div>
            <div className="spec-row">
              <span>Annee</span>
              <span>{artwork.year}</span>
            </div>
            <div className="spec-row">
              <span>Technique</span>
              <span>Huile et techniques mixtes sur toile</span>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <p className="text-base leading-8 text-ink/70">{artwork.description}</p>
            <p className="text-sm leading-7 text-ink/58">
              Oeuvre originale signee par {settings.artistName}. Chaque tableau est pense pour exister dans
              la duree et pour s'integrer dans un lieu sans perdre sa tension propre.
            </p>
          </div>

          <div className="mt-8">
            {artwork.status === ArtworkStatus.AVAILABLE ? (
              <BuyButton artworkId={artwork.id} />
            ) : artwork.status === ArtworkStatus.RESERVED ? (
              <div className="rounded-[1.75rem] border border-amber-700/15 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-800">
                Cette oeuvre est actuellement reservee. Tu peux contacter {settings.artistName} pour etre informe en priorite si elle redevient disponible.
              </div>
            ) : (
              <div className="rounded-[1.75rem] border border-black/8 bg-stone-100 px-5 py-4 text-sm leading-7 text-stone-700">
                Oeuvre vendue. {settings.artistName} peut proposer une piece proche dans le meme esprit ou accueillir une demande de commande.
              </div>
            )}
          </div>

          <div className="public-soft-panel mt-8 grid gap-4 rounded-[1.9rem] px-5 py-6 text-sm leading-7 text-ink/68">
            <div>
              <p className="quiet-kicker">Acquisition</p>
              <p className="mt-2">
                Paiement securise via Stripe, puis echange direct avec {settings.artistName} pour confirmer
                les details de livraison et de presentation.
              </p>
            </div>
            <div className="hairline" />
            <div>
              <p className="quiet-kicker">Livraison & contact</p>
              <p className="mt-2">
                Livraison sur demande en France et en Europe. Pour une question sur l'accrochage,
                une commande ou une oeuvre proche dans le meme esprit,{" "}
                <Link href="/contact" className="note-link">
                  contactez {settings.artistName}
                </Link>
                .
              </p>
              {settings.email ? <p className="mt-3 text-ink/55">{settings.email}</p> : null}
            </div>
          </div>
        </div>
      </div>

      {related.length ? (
        <section className="mt-20">
          <div className="flex items-end justify-between gap-4 border-b border-black/6 pb-5">
            <div>
              <p className="quiet-kicker">Autres oeuvres</p>
              <h2 className="mt-4 font-display text-[2.7rem] leading-none tracking-[-0.04em] text-ink">
                Poursuivre la visite
              </h2>
            </div>
            <Link href="/gallery" className="note-link">
              Retour a la galerie
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <ArtworkCard key={item.id} artwork={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
