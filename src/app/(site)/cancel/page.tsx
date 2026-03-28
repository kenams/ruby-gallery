import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getSiteSettings } from "@/lib/site-settings";

export default async function CancelPage() {
  const settings = await getSiteSettings();

  return (
    <main className="grid-shell section-space">
      <div className="surface mx-auto max-w-3xl rounded-[2.5rem] p-10 text-center">
        <p className="text-fine text-ruby/80">Paiement annule</p>
        <h1 className="mt-5 font-display text-5xl leading-none tracking-hero text-ink">
          La selection reste ouverte.
        </h1>
        <p className="mt-6 text-base leading-8 text-ink/70">
          Aucun debit n'a ete effectue. Vous pouvez reprendre votre visite, revenir sur
          l'oeuvre plus tard ou contacter {settings.artistName} si vous avez besoin d'un echange avant achat.
        </p>
        {settings.email ? (
          <p className="mt-4 text-sm text-ink/55">
            Pour une demande privee ou une question de disponibilite, ecrivez a {settings.email}.
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/gallery">Revenir a la galerie</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/contact">Poser une question</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
