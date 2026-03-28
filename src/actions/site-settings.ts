"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { defaultSiteSettings } from "@/lib/site-settings";
import { parseSiteSettingsFormData } from "@/lib/validation";

export type SiteSettingsActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
  values?: Record<string, string | undefined>;
};

export async function saveSiteSettingsAction(
  _: SiteSettingsActionState,
  formData: FormData
): Promise<SiteSettingsActionState> {
  await requireAdmin();

  const parsed = parseSiteSettingsFormData(formData);

  if (!parsed.success) {
    return {
      success: false,
      message: "Merci de corriger les champs en erreur.",
      errors: parsed.errors,
      values: parsed.values
    };
  }

  await prisma.siteSettings.upsert({
    where: { singleton: "default" },
    update: parsed.data,
    create: {
      singleton: "default",
      ...defaultSiteSettings,
      ...parsed.data
    }
  });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/gallery");
  revalidatePath("/legal");
  revalidatePath("/privacy");
  revalidatePath("/terms-of-sale");
  revalidatePath("/admin");
  revalidatePath("/admin/settings");

  redirect("/admin/settings?saved=1");
}
