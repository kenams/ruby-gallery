import type { Metadata } from "next";
import Image from "next/image";

import { JsonLd } from "@/components/site/json-ld";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { artistJsonLd, createMetadata } from "@/lib/seo";
import { getSiteSettings, splitParagraphs } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return createMetadata({
    title: `A propos | ${settings.artistName}`,
    description: `Decouvrez ${settings.artistName}, artiste peintre contemporaine basee a ${settings.location}, et son approche sensible de la peinture depuis 8 ans.`,
    keywords: [
      `artiste peintre ${settings.location}`,
      "artiste peintre francaise",
      "peintre contemporaine France",
      "biographie artiste peintre"
    ]
  });
}

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const aboutParagraphs = splitParagraphs(settings.about);

  return (
    <main className="grid-shell section-space">
      <JsonLd
        data={artistJsonLd({
          name: settings.artistName,
          location: settings.location,
          instagram: settings.instagram,
          description: settings.bio
        })}
      />

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="museum-frame relative aspect-[0.84] overflow-hidden rounded-[2.6rem] shadow-[0_24px_60px_rgba(24,18,16,0.05)]">
            <Image
              src={settings.portraitImage}
              alt={`Portrait editorial de ${settings.artistName}, artiste peintre contemporaine`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={0.08}>
            <div className="grid gap-6 xl:grid-cols-[1fr_0.45fr] xl:items-start">
              <SectionHeading
                eyebrow="A propos"
                title={`${settings.artistName} peint depuis huit ans une forme de presence qui refuse l'effet facile.`}
                description={settings.bio}
              />
              <div className="public-panel rounded-[2rem] px-6 py-6">
                <p className="curatorial-note">Repere</p>
                <p className="mt-4 text-sm leading-7 text-ink/62">
                  Une pratique construite dans la lenteur, la reserve et la justesse, avec une
                  attention constante a la tenue d'une oeuvre dans l'espace.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="public-panel rounded-[2.35rem] p-8 text-base leading-8 text-ink/74">
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph} className="mt-0 last:mt-6 [&+p]:mt-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="museum-card-dark rounded-[2.35rem] p-8">
              <p className="quiet-kicker text-[#dbc9b8]/78">Citation</p>
              <blockquote className="mt-5 font-display text-[2.8rem] leading-[0.98] tracking-[-0.04em] text-[#f6efe6]">
                {settings.artistStatement}
              </blockquote>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Age", value: "30 ans" },
                { label: "Lieu", value: settings.location },
                { label: "Pratique", value: "8 ans de peinture" }
              ].map((item) => (
                <div key={item.label} className="public-panel rounded-[1.85rem] p-5">
                  <p className="quiet-kicker">{item.label}</p>
                  <p className="mt-4 font-display text-[2.2rem] leading-none text-ink">{item.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
