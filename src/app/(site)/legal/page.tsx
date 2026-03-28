import type { Metadata } from "next";
import Link from "next/link";

import { Notice } from "@/components/ui/notice";
import { legalContent } from "@/lib/legal-content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Mentions legales | Ruby",
  description: "Mentions legales et politique de confidentialite du site de Ruby."
});

export default function LegalPage() {
  return (
    <main className="grid-shell section-space">
      <div className="surface rounded-[2.5rem] p-8 md:p-10">
        <p className="text-fine text-ruby/80">Mentions legales</p>
        <h1 className="mt-5 font-display text-5xl leading-none tracking-hero text-ink">Cadre legal et confidentialite</h1>
        <div className="mt-8 space-y-6 text-sm leading-8 text-ink/72">
          <p>{legalContent.intro}</p>
          {legalContent.notice.isPlaceholder ? (
            <Notice tone="info">
              Les mentions legales definitives restent a integrer avant mise en production.
            </Notice>
          ) : null}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { href: "/legal", label: "Mentions legales", state: legalContent.notice.isPlaceholder },
            { href: "/privacy", label: "Confidentialite", state: legalContent.privacy.isPlaceholder },
            { href: "/terms-of-sale", label: "Conditions de vente", state: legalContent.terms.isPlaceholder }
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="surface-strong rounded-[1.7rem] px-5 py-5 transition hover:border-ruby/20 hover:text-ruby"
            >
              <p className="text-fine text-ruby/80">{item.label}</p>
              <p className="mt-3 text-sm text-ink/60">
                {item.state ? "Texte final a renseigner" : "Version definitive en place"}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10 space-y-6 rounded-[2rem] border border-black/6 bg-white/72 p-6 md:p-8">
          <h2 className="font-display text-3xl text-ink">{legalContent.notice.title}</h2>
          <div className="space-y-5 text-sm leading-8 text-ink/72">
            {legalContent.notice.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
