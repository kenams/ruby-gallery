import { ArtworkStatus } from "@prisma/client";
import { cache } from "react";

import { prisma } from "@/lib/prisma";

export type GalleryFilters = {
  availability?: "all" | "available" | "reserved" | "sold";
  collection?: string;
  sort?: "curated" | "latest" | "price-asc" | "price-desc";
};

function getGalleryOrderBy(sort: GalleryFilters["sort"]) {
  switch (sort) {
    case "latest":
      return [{ year: "desc" as const }, { createdAt: "desc" as const }];
    case "price-asc":
      return [{ priceInCents: "asc" as const }, { sortOrder: "asc" as const }];
    case "price-desc":
      return [{ priceInCents: "desc" as const }, { sortOrder: "asc" as const }];
    case "curated":
    default:
      return [{ featured: "desc" as const }, { sortOrder: "asc" as const }, { createdAt: "desc" as const }];
  }
}

export const getFeaturedArtworks = cache(async (limit = 4) => {
  return prisma.artwork.findMany({
    where: { featured: true },
    include: { images: { orderBy: { sortOrder: "asc" } } },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: limit
  });
});

export const getCollections = cache(async () => {
  const records = await prisma.artwork.findMany({
    distinct: ["collection"],
    select: { collection: true },
    orderBy: { collection: "asc" }
  });

  return records.map((record) => record.collection);
});

export const getArtworks = cache(async (filters?: GalleryFilters) => {
  return prisma.artwork.findMany({
    where: {
      collection: filters?.collection || undefined,
      ...(filters?.availability === "available"
        ? { status: ArtworkStatus.AVAILABLE }
        : filters?.availability === "reserved"
          ? { status: ArtworkStatus.RESERVED }
        : filters?.availability === "sold"
          ? { status: ArtworkStatus.SOLD }
          : {})
    },
    include: { images: { orderBy: { sortOrder: "asc" } } },
    orderBy: getGalleryOrderBy(filters?.sort)
  });
});

export const getArtworkBySlug = cache(async (slug: string) => {
  return prisma.artwork.findUnique({
    where: { slug },
    include: { images: { orderBy: { sortOrder: "asc" } } }
  });
});

export const getArtworkById = cache(async (id: string) => {
  return prisma.artwork.findUnique({
    where: { id },
    include: { images: { orderBy: { sortOrder: "asc" } } }
  });
});

export const getRelatedArtworks = cache(async (artworkId: string, collection: string, limit = 3) => {
  return prisma.artwork.findMany({
    where: {
      id: { not: artworkId },
      OR: [{ collection }, { featured: true }]
    },
    include: { images: { orderBy: { sortOrder: "asc" } } },
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
    take: limit
  });
});

export const getDashboardSummary = cache(async () => {
  const [available, sold, reserved, messages, orders, total, featured] = await Promise.all([
    prisma.artwork.count({ where: { status: ArtworkStatus.AVAILABLE } }),
    prisma.artwork.count({ where: { status: ArtworkStatus.SOLD } }),
    prisma.artwork.count({ where: { status: ArtworkStatus.RESERVED } }),
    prisma.contactMessage.count(),
    prisma.order.count(),
    prisma.artwork.count(),
    prisma.artwork.count({ where: { featured: true } })
  ]);

  return { available, sold, reserved, messages, orders, total, featured };
});

export const getAdminArtworks = cache(async () => {
  return prisma.artwork.findMany({
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }]
  });
});

export const getGalleryStats = cache(async () => {
  const [available, sold, reserved, total] = await Promise.all([
    prisma.artwork.count({ where: { status: ArtworkStatus.AVAILABLE } }),
    prisma.artwork.count({ where: { status: ArtworkStatus.SOLD } }),
    prisma.artwork.count({ where: { status: ArtworkStatus.RESERVED } }),
    prisma.artwork.count()
  ]);

  return {
    available,
    sold,
    reserved,
    total
  };
});
