import type { Artwork, ArtworkImage } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { StatusPill } from "@/components/ui/status-pill";
import { formatPrice } from "@/lib/format";

type ArtworkWithImages = Artwork & { images: ArtworkImage[] };

export function ArtworkCard({ artwork }: { artwork: ArtworkWithImages }) {
  const image = artwork.images[0]?.url ?? artwork.coverImage;

  return (
    <article className="public-panel group relative overflow-hidden rounded-[2.2rem] transition-transform duration-500 hover:-translate-y-1">
      <Link href={`/gallery/${artwork.slug}`} className="block">
        <div className="museum-frame relative aspect-[0.96] overflow-hidden rounded-t-[2.2rem]">
          <div className="absolute inset-0 p-6">
            <div className="relative h-full w-full">
              <Image
                src={image}
                alt={artwork.altText}
                fill
                className="object-contain transition duration-700 group-hover:scale-[1.025]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          <div className="absolute left-5 top-5">
            <StatusPill status={artwork.status} />
          </div>
          <div className="absolute bottom-5 left-5">
            <span className="metric-chip">
              {artwork.collection}
            </span>
          </div>
        </div>

        <div className="space-y-5 p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-[2.1rem] leading-[0.96] tracking-[-0.035em] text-ink">
                {artwork.title}
              </h3>
              <p className="mt-3 text-[0.68rem] uppercase tracking-[0.26em] text-ink/42">
                {artwork.year} | {artwork.dimensions}
              </p>
            </div>
            <p className="text-[0.78rem] uppercase tracking-[0.22em] text-ink/60">
              {formatPrice(artwork.priceInCents)}
            </p>
          </div>

          <p className="line-clamp-3 text-sm leading-7 text-ink/64">{artwork.description}</p>
          <span className="note-link">Voir l'oeuvre</span>
        </div>
      </Link>
    </article>
  );
}
