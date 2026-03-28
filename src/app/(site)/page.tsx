import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

import { ArtworkCard } from "@/components/site/artwork-card";
import { JsonLd } from "@/components/site/json-ld";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedArtworks } from "@/lib/data";
import { homeContent } from "@/lib/content";
import { artistJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { getSiteSettings } from "@/lib/site-settings";

export default async function HomePage() {
  const [featured, settings] = await Promise.all([getFeaturedArtworks(4), getSiteSettings()]);
  const heroArtwork = featured[0];

  return (
    <main>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd
        data={artistJsonLd({
          name: settings.artistName,
          location: settings.location,
          instagram: settings.instagram,
          description: settings.bio
        })}
      />

      <section className="grid-shell section-space">
        <div className="surface overflow-hidden rounded-[2.6rem] px-6 py-8 md:px-10 md:py-12">
          <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal className="max-w-3xl">
              <p className="text-fine text-ruby/80">
                {settings.artistName} | artiste peintre contemporaine | {settings.location}
              </p>
              <h1 className="mt-5 max-w-[10ch] font-display text-[3.8rem] leading-[0.9] tracking-hero text-ink sm:text-[5rem] md:text-[6.4rem]">
                {settings.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-ink/70 md:text-lg">
                {settings.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/gallery" className="inline-flex items-center gap-2">
                    Entrer dans la galerie
                    <ArrowRight size={16} />
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/about">Decouvrir {settings.artistName}</Link>
                </Button>
              </div>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Age", value: "30 ans" },
                  { label: "Atelier", value: settings.location || siteConfig.location },
                  { label: "Pratique", value: "8 ans" }
                ].map((item) => (
                  <div key={item.label} className="rounded-[1.5rem] border border-black/10 bg-white/60 px-4 py-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.26em] text-ink/42">{item.label}</p>
                    <p className="mt-2 font-display text-2xl text-ink">{item.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="grid gap-4 md:grid-cols-[1fr_240px]">
                <div className="relative aspect-[0.85] overflow-hidden rounded-[2rem] bg-[#eadfd2]">
                  {heroArtwork ? (
                    <div className="absolute inset-0 p-5">
                      <div className="relative h-full w-full">
                        <Image
                          src={heroArtwork.coverImage}
                          alt={heroArtwork.altText}
                          fill
                          className="object-contain transition duration-700 hover:scale-[1.02]"
                          priority
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#171311]/30 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 rounded-[1.4rem] bg-white/78 px-4 py-4 backdrop-blur">
                    <p className="text-fine text-ruby/75">Selection du moment</p>
                    <p className="mt-2 font-display text-3xl text-ink">{heroArtwork?.title ?? settings.artistName}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between rounded-[2rem] border border-black/6 bg-white/80 p-5">
                  <div>
                    <p className="text-fine text-ruby/70">{heroArtwork?.collection ?? homeContent.heroAsideTitle}</p>
                    <h2 className="mt-4 font-display text-3xl leading-none text-ink">
                      {heroArtwork?.title ?? "Accrochage en cours"}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-ink/70">
                      {heroArtwork?.description ?? homeContent.heroAsideBody}
                    </p>
                  </div>
                  <Link href="/gallery" className="story-link mt-6">
                    Voir la selection <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="grid-shell pb-10 md:pb-16">
        <div className="grid gap-5 md:grid-cols-3">
          {homeContent.confidenceNotes.map((item, index) => (
            <Reveal key={item} delay={index * 0.08}>
              <div className="surface rounded-[2rem] p-6">
                <p className="text-sm leading-7 text-ink/70">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grid-shell section-space">
        <Reveal>
          <SectionHeading
            eyebrow="Oeuvres mises en avant"
            title="Une selection pensee comme un accrochage."
            description="Chaque oeuvre est presentee avec espace, matiere et precision pour donner au visiteur une sensation de visite plutot qu'une simple grille de produits."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {featured.map((artwork, index) => (
            <Reveal key={artwork.id} delay={index * 0.08}>
              <ArtworkCard artwork={artwork} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grid-shell section-space">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="surface rounded-[2.2rem] p-8">
              <p className="text-fine text-ruby/80">Manifeste</p>
              <blockquote className="mt-5 font-display text-4xl leading-none tracking-hero text-ink md:text-5xl">
                {homeContent.manifestoTitle}
              </blockquote>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="surface rounded-[2.2rem] p-8">
              <p className="text-fine text-ruby/80">Approche</p>
              <p className="mt-5 text-base leading-8 text-ink/75">
                {settings.artistStatement}
              </p>
              <div className="mt-8">
                <Button asChild variant="secondary">
                  <Link href="/about">Lire le portrait de {settings.artistName}</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="grid-shell section-space pt-0">
        <Reveal>
          <div className="surface rounded-[2.5rem] px-8 py-10 md:px-12 md:py-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-fine text-ruby/80">Collection & acquisition</p>
                <h2 className="mt-5 max-w-[11ch] font-display text-5xl leading-none tracking-hero text-ink md:text-6xl">
                  {homeContent.collectingTitle}
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-ink/70">
                  {homeContent.collectingBody}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/gallery">Acheter une oeuvre</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/contact">Prendre contact</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="grid-shell pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          {homeContent.studioHighlights.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <div className="surface rounded-[2rem] p-6">
                <p className="text-fine text-ruby/80">{item.title}</p>
                <p className="mt-4 text-sm leading-7 text-ink/70">{item.body}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ink/40">
                  <ChevronRight size={14} />
                  {settings.location || siteConfig.location}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
