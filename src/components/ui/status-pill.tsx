import { ArtworkStatus } from "@prisma/client";

import { artworkStatusLabels, artworkStatusTone } from "@/lib/site";
import { cn } from "@/lib/utils";

export function StatusPill({ status }: { status: ArtworkStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.66rem] font-medium uppercase tracking-[0.22em] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]",
        artworkStatusTone[status]
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" aria-hidden="true" />
      {artworkStatusLabels[status]}
    </span>
  );
}
