"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site-settings";
import { contactSchema } from "@/lib/validation";

export type ContactActionState = {
  success: boolean;
  message: string;
};

export async function contactAction(_: ContactActionState, formData: FormData): Promise<ContactActionState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message")
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0]?.message ?? "Le message ne peut pas etre envoye."
    };
  }

  await prisma.contactMessage.create({
    data: parsed.data
  });

  const settings = await getSiteSettings();

  revalidatePath("/contact");

  return {
    success: true,
    message: `Votre message a bien ete enregistre. ${settings.artistName} vous recontactera via l'adresse email indiquee.`
  };
}
