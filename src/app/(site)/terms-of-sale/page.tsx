import type { Metadata } from "next";

import { Notice } from "@/components/ui/notice";
import { legalContent } from "@/lib/legal-content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Conditions de vente | Ruby",
  description: "Conditions de vente et modalites d'acquisition des oeuvres de Ruby."
});

export default function TermsOfSalePage() {
  return (
    <main className="grid-shell section-space">
      <div className="surface rounded-[2.5rem] p-8 md:p-10">
        <p className="text-fine text-ruby/80">Conditions de vente</p>
        <h1 className="mt-5 font-display text-5xl leading-none tracking-hero text-ink">
          Acquisition, paiement et livraison
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-8 text-ink/72">
          {legalContent.terms.isPlaceholder ? (
            <Notice tone="info">
              Les conditions de vente definitives doivent etre ajoutees avant l'ouverture publique des paiements.
            </Notice>
          ) : null}
          {legalContent.terms.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
