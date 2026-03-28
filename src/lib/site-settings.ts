import { prisma } from "@/lib/prisma";
import { defaultSiteSettingsSeed } from "@/lib/starter-data";

export const defaultSiteSettings = defaultSiteSettingsSeed;

export async function getSiteSettings() {
  return prisma.siteSettings.upsert({
    where: { singleton: "default" },
    update: {},
    create: {
      singleton: "default",
      ...defaultSiteSettings
    }
  });
}

export function splitParagraphs(value: string) {
  return value
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getInstagramLabel(url: string) {
  if (!url) {
    return "";
  }

  const cleaned = url.trim().replace(/\/+$/, "");
  const parts = cleaned.split("/");
  const candidate = parts.at(-1);

  if (!candidate || candidate.includes(".")) {
    return "Instagram";
  }

  return candidate.startsWith("@") ? candidate : `@${candidate}`;
}
