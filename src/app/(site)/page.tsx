import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

import { JsonLd } from "@/components/site/json-ld";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { getFeaturedArtworks } from "@/lib/data";
import { homeContent } from "@/lib/content";
import { formatPrice } from "@/lib/format";
import { artistJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { getSiteSettings, splitParagraphs } from "@/lib/site-settings";

export default async function HomePage() {
  const [featured, settings] = await Promise.all([getFeaturedArtworks(4), getSiteSettings()]);
  const heroArtwork = featured[0];
  const secondaryWorks = featured.slice(1, 4);
  const bioParagraphs = splitParagraphs(settings.bio);
  const aboutParagraphs = splitParagraphs(settings.about);
  const leadBio = bioParagraphs[0] ?? settings.bio;
  const supportingBio = bioParagraphs[1] ?? aboutParagraphs[0] ?? settings.about;

  return (
    <main className="overflow-hidden">
      <JsonLd data={websiteJsonLd()} />
      <JsonLd
        data={artistJsonLd({
          name: settings.artistName,
          location: settings.location,
          instagram: settings.instagram,
          description: settings.bio
        })}
      />

      <section className="grid-shell pb-10 pt-8 md:pb-14 md:pt-12">
        <div className="museum-stage relative overflow-hidden rounded-[2.6rem] px-6 pb-8 pt-7 md:px-10 md:pb-12 md:pt-10 xl:px-14 xl:pb-16 xl:pt-12">
          <div className="grid gap-12 xl:grid-cols-[1fr_0.92fr] xl:items-center">
            <Reveal className="relative z-10">
              <div className="max-w-[50rem]">
                <p className="quiet-kicker">
                  {settings.artistName} | artiste peintre contemporaine |{" "}
                  {settings.location || siteConfig.location}
                </p>

                <h1 className="hero-monument mt-7 max-w-[7.4ch] font-display text-ink md:max-w-[8.1ch]">
                  {settings.heroTitle}
                </h1>

                <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,0.22fr)] xl:items-start">
                  <p className="max-w-xl text-base leading-8 text-ink/68 md:text-[1.02rem]">
                    {settings.heroSubtitle}
                  </p>
                  <div className="space-y-3 pt-1">
                    <div className="quiet-line" />
                    <p className="text-[0.72rem] uppercase tracking-[0.28em] text-ink/46">
                      Selection en ligne
                    </p>
                    <p className="text-sm leading-7 text-ink/58">
                      Une peinture de la retenue, des reserves et d'une lumiere qui se manifeste
                      lentement.
                    </p>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Button asChild className="bg-[#181312] px-7">
                    <Link href="/gallery" className="inline-flex items-center gap-2">
                      Entrer dans la selection
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    className="border-black/12 bg-white/55 px-7 tracking-[0.14em] text-ink/78"
                  >
                    <Link href="/about">Lire le portrait</Link>
                  </Button>
                </div>

                <div className="mt-12 grid gap-3 border-t border-black/8 pt-5 text-[0.72rem] uppercase tracking-[0.24em] text-ink/46 md:grid-cols-3">
                  <p>30 ans</p>
                  <p>8 ans de pratique</p>
                  <p>{settings.location || siteConfig.location}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="relative z-10">
              <div className="space-y-5">
                <div className="museum-frame relative overflow-hidden rounded-[2.2rem] p-5 shadow-[0_24px_70px_rgba(24,18,16,0.06)]">
                  {heroArtwork ? (
                    <>
                      <div className="relative aspect-[0.9] overflow-hidden rounded-[1.8rem] bg-[#efe6da]">
                        <div className="absolute inset-0 p-6 md:p-9">
                          <div className="relative h-full w-full">
                            <Image
                              src={heroArtwork.coverImage}
                              alt={heroArtwork.altText}
                              fill
                              priority
                              className="object-contain transition duration-1000 hover:scale-[1.015]"
                              sizes="(max-width: 1280px) 100vw, 48vw"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <p className="quiet-kicker">Oeuvre au premier regard</p>
                            <StatusPill status={heroArtwork.status} />
                          </div>
                          <p className="mt-4 font-display text-[2rem] leading-none text-ink md:text-[2.4rem]">
                            {heroArtwork.title}
                          </p>
                          <p className="mt-3 text-xs uppercase tracking-[0.22em] text-ink/44">
                            {heroArtwork.collection} | {heroArtwork.dimensions}
                          </p>
                        </div>
                        <p className="text-sm tracking-[0.16em] text-ink/58">
                          {formatPrice(heroArtwork.priceInCents)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex aspect-[0.94] items-center justify-center rounded-[1.8rem] bg-[#efe6da] text-sm text-ink/44">
                      Selection a venir
                    </div>
                  )}
                </div>
                <div className="museum-panel rounded-[1.8rem] px-6 py-5">
                  <p className="quiet-kicker">En atelier</p>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-ink/62">{leadBio}</p>
                  <Link href="/about" className="editorial-link mt-5">
                    Decouvrir l'artiste
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 md:mt-14">
            <div className="quiet-line" />
            <div className="mt-5 grid gap-4 md:grid-cols-[0.9fr_1.1fr_auto] md:items-end">
              <p className="text-sm leading-7 text-ink/60">
                {homeContent.confidenceNotes[0]}
              </p>
              <p className="text-sm leading-7 text-ink/60">
                {homeContent.confidenceNotes[1]}
              </p>
              <Link href="/contact" className="editorial-link whitespace-nowrap">
                Demande privee
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid-shell pb-12 md:pb-18">
        <div className="grid gap-8 xl:grid-cols-[0.78fr_1.22fr]">
          <Reveal>
            <div className="museum-card-dark rounded-[2.4rem] px-7 py-8 md:px-9 md:py-10">
              <p className="quiet-kicker text-[#dbc9b8]/78">Ouverture</p>
              <blockquote className="mt-6 max-w-[11ch] font-display text-[3.2rem] leading-[0.92] tracking-hero text-[#f6efe6] md:text-[4.2rem]">
                {homeContent.manifestoTitle}
              </blockquote>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="museum-panel rounded-[2.4rem] px-7 py-8 md:px-10 md:py-10">
              <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <p className="quiet-kicker">Dossier d'exposition</p>
                  <p className="mt-5 text-base leading-8 text-ink/72">
                    {settings.artistStatement}
                  </p>
                </div>
                <div className="space-y-6 text-sm leading-7 text-ink/66">
                  <p>{supportingBio}</p>
                  <p>{aboutParagraphs[1] ?? aboutParagraphs[0] ?? settings.about}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="grid-shell section-space pt-2">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="quiet-kicker">Selection curatoriale</p>
              <h2 className="mt-5 max-w-[11ch] font-display text-5xl leading-[0.94] tracking-hero text-ink md:text-6xl">
                Une mise en espace pensee comme un accrochage prive.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-ink/64">
              Formats, statuts et prix s'effacent derriere la perception generale:
              les oeuvres s'abordent d'abord comme des presences.
            </p>
          </div>
        </Reveal>

        {heroArtwork ? (
          <div className="mt-10 grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
            <Reveal delay={0.08}>
              <article className="museum-panel overflow-hidden rounded-[2.5rem] p-5 md:p-7">
                <Link href={`/gallery/${heroArtwork.slug}`} className="block">
                  <div className="museum-frame relative overflow-hidden rounded-[2rem]">
                    <div className="relative aspect-[1.02]">
                      <div className="absolute inset-0 p-6 md:p-10">
                        <div className="relative h-full w-full">
                          <Image
                            src={heroArtwork.images[0]?.url ?? heroArtwork.coverImage}
                            alt={heroArtwork.altText}
                            fill
                            className="object-contain transition duration-1000 hover:scale-[1.03]"
                            sizes="(max-width: 1280px) 100vw, 58vw"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 px-2 pb-2 pt-7 md:grid-cols-[1fr_auto] md:items-end">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <StatusPill status={heroArtwork.status} />
                        <span className="metric-chip">{heroArtwork.collection}</span>
                      </div>
                      <h3 className="mt-5 max-w-[12ch] font-display text-[3rem] leading-[0.92] text-ink md:text-[4rem]">
                        {heroArtwork.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/66">
                        {heroArtwork.description}
                      </p>
                    </div>

                    <div className="space-y-3 text-right">
                      <p className="text-xs uppercase tracking-[0.26em] text-ink/42">
                        {heroArtwork.year} | {heroArtwork.dimensions}
                      </p>
                      <p className="font-display text-[2rem] text-ink">
                        {formatPrice(heroArtwork.priceInCents)}
                      </p>
                      <span className="editorial-link justify-end">
                        Voir l'oeuvre
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            </Reveal>

            <div className="grid gap-5">
              {secondaryWorks.map((artwork, index) => (
                <Reveal key={artwork.id} delay={0.12 + index * 0.08}>
                  <article className="museum-panel rounded-[2rem] p-4 md:p-5">
                    <Link
                      href={`/gallery/${artwork.slug}`}
                      className="grid gap-5 md:grid-cols-[190px_1fr]"
                    >
                      <div className="museum-frame relative overflow-hidden rounded-[1.7rem]">
                        <div className="relative aspect-[0.95]">
                          <div className="absolute inset-0 p-4">
                            <div className="relative h-full w-full">
                              <Image
                                src={artwork.images[0]?.url ?? artwork.coverImage}
                                alt={artwork.altText}
                                fill
                                className="object-contain transition duration-700 hover:scale-[1.03]"
                                sizes="190px"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between gap-4 py-1">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <StatusPill status={artwork.status} />
                            <span className="quiet-kicker">{artwork.collection}</span>
                          </div>
                          <h3 className="mt-4 font-display text-[2.2rem] leading-none text-ink">
                            {artwork.title}
                          </h3>
                          <p className="mt-4 text-sm leading-7 text-ink/66">
                            {artwork.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <p className="text-xs uppercase tracking-[0.24em] text-ink/42">
                            {artwork.year} | {artwork.dimensions}
                          </p>
                          <p className="text-sm tracking-[0.16em] text-ink/62">
                            {formatPrice(artwork.priceInCents)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        ) : (
          <Reveal delay={0.08}>
            <div className="museum-panel mt-10 rounded-[2.4rem] px-8 py-10 text-center">
              <p className="font-display text-4xl text-ink">La selection sera bientot revelee.</p>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ink/62">
                L'accrochage est en cours de preparation. La home reste volontairement sobre et
                respirante pour conserver une valeur percue forte meme avant l'arrivee des oeuvres definitives.
              </p>
            </div>
          </Reveal>
        )}
      </section>

      <section className="grid-shell section-space pt-8">
        <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className="museum-panel rounded-[2.4rem] px-7 py-8 md:px-10 md:py-10">
              <p className="quiet-kicker">Presences silencieuses</p>
              <h2 className="mt-5 max-w-[9ch] font-display text-5xl leading-[0.94] tracking-hero text-ink md:text-6xl">
                Une peinture pour les lieux qui savent attendre.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="museum-panel rounded-[2.4rem] px-7 py-8 md:px-10 md:py-10">
              <div className="grid gap-6 md:grid-cols-3">
                {homeContent.studioHighlights.map((item) => (
                  <div key={item.title} className="space-y-4">
                    <p className="quiet-kicker">{item.title}</p>
                    <p className="text-sm leading-7 text-ink/64">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="grid-shell pb-24 pt-6 md:pb-28">
        <Reveal>
          <div className="museum-card-dark relative overflow-hidden rounded-[2.8rem] px-8 py-12 md:px-12 md:py-14">
            <div className="absolute inset-x-12 top-10">
              <div className="bronze-line" />
            </div>
            <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(219,201,184,0.12)_0%,rgba(219,201,184,0)_72%)]" />

            <div className="relative z-10 grid gap-10 xl:grid-cols-[1fr_auto] xl:items-end">
              <div>
                <p className="quiet-kicker text-[#dbc9b8]/78">Cloture</p>
                <h2 className="mt-5 max-w-[12ch] font-display text-[3.3rem] leading-[0.9] tracking-hero text-[#f6efe6] md:text-[4.8rem]">
                  Une visite qui s'acheve comme une invitation privee.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[#f6efe6]/72">
                  {homeContent.collectingBody}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="border border-white/10 bg-[#f6efe6] px-7 text-[#181312] hover:bg-white">
                  <Link href="/gallery">Explorer la galerie</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="border-white/12 bg-white/6 px-7 tracking-[0.14em] text-[#f6efe6] hover:border-white/22 hover:bg-white/10 hover:text-white"
                >
                  <Link href="/contact">Entrer en contact</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
