import Link from "next/link";

import { hasConfiguredValue } from "@/lib/placeholders";
import { navigation, siteConfig } from "@/lib/site";
import { getInstagramLabel, getSiteSettings } from "@/lib/site-settings";

export async function Footer() {
  const settings = await getSiteSettings();
  const locationLabel = settings.location || siteConfig.location;
  const email = settings.email;
  const instagram = settings.instagram;

  return (
    <footer className="border-t border-black/5 bg-[#f7f1e8]">
      <div className="mx-auto max-w-7xl px-5 pt-14 md:px-8">
        <div className="surface rounded-[2.4rem] px-7 py-8 md:px-10 md:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-fine text-ruby/80">Collection & contact</p>
              <h2 className="mt-5 max-w-[12ch] font-display text-4xl leading-none tracking-hero text-ink md:text-5xl">
                Une presence digitale pour accompagner des oeuvres originales.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-ink/70">
              {settings.artistStatement}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:px-8">
        <div>
          <p className="font-display text-3xl text-ink">{settings.artistName}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-ink/70">
            {siteConfig.baseline}
          </p>
        </div>

        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-ruby/80">Navigation</p>
          <div className="mt-4 grid gap-3">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="story-link">
                {item.label}
              </Link>
            ))}
            <Link href="/legal" className="story-link">
              Mentions legales
            </Link>
            <Link href="/privacy" className="story-link">
              Confidentialite
            </Link>
            <Link href="/terms-of-sale" className="story-link">
              Conditions de vente
            </Link>
          </div>
        </div>

        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-ruby/80">Contact</p>
          <div className="mt-4 grid gap-3 text-sm text-ink/75">
            {hasConfiguredValue(email) ? (
              <a href={`mailto:${email}`} className="story-link w-fit">
                {email}
              </a>
            ) : (
              <span>Email collection privee a renseigner</span>
            )}
            {hasConfiguredValue(instagram) ? (
              <a href={instagram} target="_blank" rel="noreferrer" className="story-link w-fit">
                {getInstagramLabel(instagram)}
              </a>
            ) : (
              <span>Instagram a renseigner</span>
            )}
            <span>{locationLabel}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-black/5 px-5 py-5 text-xs text-ink/50 md:flex-row md:items-center md:justify-between md:px-8">
        <p>(c) {new Date().getFullYear()} {settings.artistName}. Tous droits reserves.</p>
        <p>
          Site realise par{" "}
          <a
            href={siteConfig.kahDigitalUrl}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-ruby"
          >
            KAH Digital
          </a>
        </p>
      </div>
    </footer>
  );
}
