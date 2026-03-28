import Link from "next/link";

export function Logo({ artistName = "Ruby" }: { artistName?: string }) {
  return (
    <Link href="/" className="inline-flex items-center gap-3" aria-label={`${artistName}, retour a l'accueil`}>
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/70 font-display text-lg text-ink">
        {artistName.slice(0, 1)}
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-2xl tracking-hero text-ink">{artistName}</span>
        <span className="mt-1 text-[0.62rem] uppercase tracking-[0.28em] text-ink/50">
          Galerie contemporaine
        </span>
      </span>
    </Link>
  );
}
