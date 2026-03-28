import Link from "next/link";

export function Logo({ artistName = "Ruby" }: { artistName?: string }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-4"
      aria-label={`${artistName}, retour a l'accueil`}
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/80 font-display text-xl italic text-ink shadow-[0_10px_24px_rgba(23,19,17,0.04)]">
        {artistName.slice(0, 1)}
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[2rem] tracking-[-0.04em] text-ink">{artistName}</span>
        <span className="mt-1 text-[0.58rem] uppercase tracking-[0.34em] text-ink/50">
          Peinture contemporaine
        </span>
      </span>
    </Link>
  );
}
