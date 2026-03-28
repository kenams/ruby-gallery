"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="fr">
      <body className="bg-haze font-body text-ink antialiased">
        <main className="grid-shell section-space">
          <div className="surface mx-auto max-w-3xl rounded-[2.5rem] p-10 text-center">
            <p className="text-fine text-ruby/80">Erreur</p>
            <h1 className="mt-5 font-display text-5xl leading-none tracking-hero text-ink">
              Une interruption est survenue.
            </h1>
            <p className="mt-6 text-base leading-8 text-ink/70">
              Le site a rencontre une erreur inattendue. Tu peux reessayer ou revenir a la galerie.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button type="button" onClick={reset}>
                Reessayer
              </Button>
              <Button asChild variant="ghost">
                <Link href="/gallery">Retour a la galerie</Link>
              </Button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
