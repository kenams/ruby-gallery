import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

import { defaultSiteSettingsSeed, starterArtworkSeed } from "../src/lib/starter-data";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@ruby-gallery.local";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeThisPassword123!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "Ruby Admin",
      passwordHash
    },
    create: {
      email: adminEmail,
      name: "Ruby Admin",
      passwordHash
    }
  });

  await prisma.siteSetting.upsert({
    where: { key: "homepage_baseline" },
    update: {
      value: "Peintures originales contemporaines de Ruby, artiste peintre en Occitanie."
    },
    create: {
      key: "homepage_baseline",
      value: "Peintures originales contemporaines de Ruby, artiste peintre en Occitanie."
    }
  });

  await prisma.siteSettings.upsert({
    where: { singleton: "default" },
    update: defaultSiteSettingsSeed,
    create: {
      singleton: "default",
      ...defaultSiteSettingsSeed
    }
  });

  for (const [index, artwork] of starterArtworkSeed.entries()) {
    const { galleryImages, ...artworkData } = artwork;
    const created = await prisma.artwork.upsert({
      where: { slug: artworkData.slug },
      update: {
        ...artworkData,
        sortOrder: artworkData.sortOrder ?? index + 1
      },
      create: {
        ...artworkData,
        sortOrder: artworkData.sortOrder ?? index + 1
      }
    });

    await prisma.artworkImage.deleteMany({
      where: { artworkId: created.id }
    });

    await prisma.artworkImage.createMany({
      data: [artworkData.coverImage, ...galleryImages].map((url, imageIndex) => ({
        artworkId: created.id,
        url,
        altText: imageIndex === 0 ? artworkData.altText : `${artworkData.altText} vue detaillee ${imageIndex}`,
        sortOrder: imageIndex
      }))
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
