import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid-shell section-space">
      <div className="surface mx-auto max-w-3xl rounded-[2.5rem] p-10 text-center">
        <p className="text-fine text-ruby/80">404</p>
        <h1 className="mt-5 font-display text-5xl leading-none tracking-hero text-ink">
          Cette page n'est plus dans l'accrochage.
        </h1>
        <p className="mt-6 text-base leading-8 text-ink/70">
          Le lien que vous cherchez n'existe pas ou n'est plus disponible. Vous pouvez
          revenir a la galerie ou reprendre depuis l'accueil.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/">Accueil</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/gallery">Galerie</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
