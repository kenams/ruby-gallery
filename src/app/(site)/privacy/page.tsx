import type { Metadata } from "next";

import { Notice } from "@/components/ui/notice";
import { legalContent } from "@/lib/legal-content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Confidentialite | Ruby",
  description: "Politique de confidentialite du site de Ruby."
});

export default function PrivacyPage() {
  return (
    <main className="grid-shell section-space">
      <div className="surface rounded-[2.5rem] p-8 md:p-10">
        <p className="text-fine text-ruby/80">Confidentialite</p>
        <h1 className="mt-5 font-display text-5xl leading-none tracking-hero text-ink">
          Donnees personnelles et usage du formulaire
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-8 text-ink/72">
          {legalContent.privacy.isPlaceholder ? (
            <Notice tone="info">
              La politique de confidentialite definitive doit encore etre remplacee par le texte juridique reel.
            </Notice>
          ) : null}
          {legalContent.privacy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
