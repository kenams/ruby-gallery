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
      <div className="relative aspect-[0.9] overflow-hidden rounded-[2.4rem] border border-black/6 bg-[#eadfd4] shadow-veil">
        <div className="absolute inset-0 p-6 md:p-8">
          <div className="relative h-full w-full">
            <Image
              src={activeImage.url}
              alt={activeImage.altText || fallbackAlt}
              fill
              className="object-contain transition duration-700 hover:scale-[1.02]"
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
                "relative aspect-square overflow-hidden rounded-[1.4rem] border bg-[#eadfd4] transition",
                activeIndex === index
                  ? "border-ruby/35 shadow-veil"
                  : "border-black/6 hover:border-ruby/20"
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
