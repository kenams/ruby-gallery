import type { Artwork, ArtworkImage } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { StatusPill } from "@/components/ui/status-pill";
import { formatPrice } from "@/lib/format";

type ArtworkWithImages = Artwork & { images: ArtworkImage[] };

export function ArtworkCard({ artwork }: { artwork: ArtworkWithImages }) {
  const image = artwork.images[0]?.url ?? artwork.coverImage;

  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-black/6 bg-white/80 shadow-veil transition-transform duration-500 hover:-translate-y-1">
      <Link href={`/gallery/${artwork.slug}`} className="block">
        <div className="relative aspect-[0.92] overflow-hidden bg-[#ece2d6]">
          <div className="absolute inset-0 p-5">
            <div className="relative h-full w-full">
              <Image
                src={image}
                alt={artwork.altText}
                fill
                className="object-contain transition duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#171311]/30 to-transparent opacity-70" />
          <div className="absolute left-5 top-5">
            <StatusPill status={artwork.status} />
          </div>
          <div className="absolute bottom-5 left-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-ink/70 backdrop-blur">
              {artwork.collection}
            </span>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-[2rem] leading-none text-ink">{artwork.title}</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-ink/45">
                {artwork.year} | {artwork.dimensions}
              </p>
            </div>
            <p className="text-sm text-ink/70">{formatPrice(artwork.priceInCents)}</p>
          </div>

          <p className="line-clamp-3 text-sm leading-7 text-ink/66">{artwork.description}</p>
          <span className="story-link">Voir l'oeuvre</span>
        </div>
      </Link>
    </article>
  );
}
