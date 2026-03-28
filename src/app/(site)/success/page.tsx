import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getSiteSettings } from "@/lib/site-settings";

export default async function SuccessPage() {
  const settings = await getSiteSettings();

  return (
    <main className="grid-shell section-space">
      <div className="surface mx-auto max-w-3xl rounded-[2.5rem] p-10 text-center">
        <p className="text-fine text-ruby/80">Paiement confirme</p>
        <h1 className="mt-5 font-display text-5xl leading-none tracking-hero text-ink">
          Merci pour votre acquisition.
        </h1>
        <p className="mt-6 text-base leading-8 text-ink/70">
          Votre paiement a ete pris en compte. {settings.artistName} reviendra vers vous pour confirmer les
          details de livraison, de suivi et de presentation de votre oeuvre.
        </p>
        {settings.email ? (
          <p className="mt-4 text-sm text-ink/55">
            Une confirmation pourra egalement etre envoyee depuis {settings.email}.
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/gallery">Retour a la galerie</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/contact">Contacter {settings.artistName}</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
