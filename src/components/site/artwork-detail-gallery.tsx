"use client";

import type { ArtworkImage } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type GalleryImage = Pick<ArtworkImage, "id" | "url" | "altText">;

export function ArtworkDetailGallery({
  images,
  fallbackAlt
}: {
  images: GalleryImage[];
  fallbackAlt: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="grid gap-4">
      <div className="museum-frame relative aspect-[0.92] overflow-hidden rounded-[2.6rem] shadow-[0_24px_60px_rgba(24,18,16,0.05)]">
        <div className="absolute inset-0 p-6 md:p-10">
          <div className="relative h-full w-full">
            <Image
              src={activeImage.url}
              alt={activeImage.altText || fallbackAlt}
              fill
              className="object-contain transition duration-700 hover:scale-[1.018]"
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "museum-frame relative aspect-square overflow-hidden rounded-[1.5rem] transition",
                activeIndex === index
                  ? "border-ruby/30 shadow-[0_18px_36px_rgba(24,18,16,0.05)]"
                  : "border-black/10 hover:border-ruby/20"
              )}
              aria-label={`Voir l'image ${index + 1}`}
            >
              <div className="absolute inset-0 p-2">
                <div className="relative h-full w-full">
                  <Image
                    src={image.url}
                    alt={image.altText || fallbackAlt}
                    fill
                    className="object-contain"
                    sizes="20vw"
                  />
                </div>
              </div>
              <span
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-[#171311]/15 to-transparent transition-opacity",
                  activeIndex === index ? "opacity-100" : "opacity-0"
                )}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
