import { ArtworkStatus } from "@prisma/client";
import { z } from "zod";

import { parseImageList, slugify } from "@/lib/utils";

export const loginSchema = z.object({
  email: z.string().trim().email("Adresse email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caracteres")
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Veuillez indiquer votre nom"),
  email: z.string().trim().email("Veuillez indiquer un email valide"),
  message: z.string().trim().min(20, "Votre message doit contenir au moins 20 caracteres")
});

export const siteSettingsSchema = z.object({
  artistName: z.string().trim().min(2, "Le nom de l'artiste est requis"),
  heroTitle: z.string().trim().min(12, "Le titre d'accueil doit etre plus precis"),
  heroSubtitle: z.string().trim().min(20, "Le sous-titre d'accueil doit etre plus detaille"),
  bio: z.string().trim().min(40, "La bio doit contenir plus de matiere"),
  about: z.string().trim().min(60, "Le texte a propos doit etre plus detaille"),
  email: z.string().trim().email("Veuillez indiquer une adresse email valide"),
  phone: z.string().trim().max(40, "Le telephone est trop long").optional().or(z.literal("")),
  instagram: z.string().trim().url("Veuillez indiquer une URL Instagram valide").optional().or(z.literal("")),
  location: z.string().trim().min(2, "La localisation est requise"),
  artistStatement: z
    .string()
    .trim()
    .max(1200, "Le manifeste artistique est trop long")
    .optional()
    .or(z.literal("")),
  portraitImage: z
    .string()
    .trim()
    .max(255, "Le chemin du portrait est trop long")
    .optional()
    .or(z.literal(""))
});

export const artworkSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(3, "Le titre est requis"),
  slug: z.string().trim().optional(),
  coverImage: z.string().trim().min(2, "L'image principale est requise"),
  galleryImages: z.string().optional(),
  altText: z.string().trim().min(5, "Le texte alternatif est requis"),
  description: z.string().trim().min(40, "La description doit etre plus detaillee"),
  priceInCents: z.coerce.number().int().min(10000, "Le prix doit etre superieur a 100 EUR"),
  dimensions: z.string().trim().min(3, "Les dimensions sont requises"),
  year: z.coerce.number().int().min(1900).max(2100),
  collection: z.string().trim().min(2, "La collection est requise"),
  status: z.nativeEnum(ArtworkStatus),
  featured: z.coerce.boolean().default(false),
  sortOrder: z.coerce.number().int().min(0).default(0),
  seoTitle: z.string().trim().optional(),
  seoDescription: z.string().trim().optional()
});

export type ArtworkFormValues = z.infer<typeof artworkSchema> & {
  galleryImages?: string;
};

export function parseArtworkFormData(formData: FormData) {
  const raw = {
    id: formData.get("id")?.toString() || undefined,
    title: formData.get("title")?.toString() || "",
    slug: formData.get("slug")?.toString() || "",
    coverImage: formData.get("coverImage")?.toString() || "",
    galleryImages: formData.get("galleryImages")?.toString() || "",
    altText: formData.get("altText")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    priceInCents: formData.get("priceInCents")?.toString() || "",
    dimensions: formData.get("dimensions")?.toString() || "",
    year: formData.get("year")?.toString() || "",
    collection: formData.get("collection")?.toString() || "",
    status: formData.get("status")?.toString() || ArtworkStatus.AVAILABLE,
    featured: formData.get("featured") === "on",
    sortOrder: formData.get("sortOrder")?.toString() || "0",
    seoTitle: formData.get("seoTitle")?.toString() || "",
    seoDescription: formData.get("seoDescription")?.toString() || ""
  };

  const parsed = artworkSchema.safeParse({
    ...raw,
    slug: raw.slug || slugify(raw.title)
  });

  if (!parsed.success) {
    return {
      success: false as const,
      errors: parsed.error.flatten().fieldErrors,
      values: raw
    };
  }

  return {
    success: true as const,
    data: {
      ...parsed.data,
      slug: parsed.data.slug || slugify(parsed.data.title),
      galleryImages: parseImageList(raw.galleryImages)
    }
  };
}

export function parseSiteSettingsFormData(formData: FormData) {
  const raw = {
    artistName: formData.get("artistName")?.toString() || "",
    heroTitle: formData.get("heroTitle")?.toString() || "",
    heroSubtitle: formData.get("heroSubtitle")?.toString() || "",
    bio: formData.get("bio")?.toString() || "",
    about: formData.get("about")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    instagram: formData.get("instagram")?.toString() || "",
    location: formData.get("location")?.toString() || "",
    artistStatement: formData.get("artistStatement")?.toString() || "",
    portraitImage: formData.get("portraitImage")?.toString() || ""
  };

  const parsed = siteSettingsSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false as const,
      errors: parsed.error.flatten().fieldErrors,
      values: raw
    };
  }

  return {
    success: true as const,
    data: parsed.data
  };
}
