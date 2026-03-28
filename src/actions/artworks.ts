"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseArtworkFormData } from "@/lib/validation";

export type ArtworkActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
  values?: Record<string, string | boolean | undefined>;
};

function normalizeFormEntries(formData: FormData) {
  return Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [key, typeof value === "string" ? value : value.name])
  );
}

export async function saveArtworkAction(
  _: ArtworkActionState,
  formData: FormData
): Promise<ArtworkActionState> {
  await requireAdmin();

  const parsed = parseArtworkFormData(formData);

  if (!parsed.success) {
    return {
      success: false,
      message: "Merci de corriger les champs en erreur.",
      errors: parsed.errors,
      values: parsed.values
    };
  }

  const { galleryImages, id, ...data } = parsed.data;
  const imageList = [data.coverImage, ...galleryImages.filter((item) => item !== data.coverImage)];

  try {
    const artwork = id
      ? await prisma.artwork.update({
          where: { id },
          data: {
            ...data,
            images: {
              deleteMany: {},
              create: imageList.map((url, index) => ({
                url,
                altText: data.altText,
                sortOrder: index
              }))
            }
          }
        })
      : await prisma.artwork.create({
          data: {
            ...data,
            images: {
              create: imageList.map((url, index) => ({
                url,
                altText: data.altText,
                sortOrder: index
              }))
            }
          }
        });

    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath(`/gallery/${artwork.slug}`);
    revalidatePath("/admin");
    revalidatePath("/admin/artworks");

    redirect("/admin/artworks?saved=1");
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "Ce slug existe deja. Merci d'en choisir un autre.",
        values: normalizeFormEntries(formData)
      };
    }

    return {
      success: false,
      message: "Une erreur est survenue lors de l'enregistrement de l'oeuvre.",
      values: normalizeFormEntries(formData)
    };
  }
}

export async function deleteArtworkAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id")?.toString();

  if (!id) {
    return;
  }

  await prisma.artwork.delete({
    where: { id }
  });

  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/admin");
  revalidatePath("/admin/artworks");

  redirect("/admin/artworks?deleted=1");
}
