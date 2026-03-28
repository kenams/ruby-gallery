"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export function DeleteArtworkButton({
  artworkId,
  artworkTitle,
  action
}: {
  artworkId: string;
  artworkTitle: string;
  action: (formData: FormData) => void;
}) {
  const [confirming, setConfirming] = useState(false);

  return (
    <>
      {confirming ? (
        <form action={action} className="flex flex-wrap items-center gap-2 rounded-[1.2rem] border border-ruby/10 bg-[#fff6f7] px-3 py-2 text-sm text-ruby">
          <input type="hidden" name="id" value={artworkId} />
          <span>Confirmer la suppression ?</span>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="rounded-full border border-black/10 px-3 py-1 text-ink/68 transition hover:bg-white"
          >
            Annuler
          </button>
          <Button variant="ghost" type="submit" className="border-ruby/20 bg-white text-ruby hover:border-ruby/25 hover:text-ruby">
            Oui, supprimer
          </Button>
        </form>
      ) : (
        <Button
          variant="ghost"
          type="button"
          onClick={() => setConfirming(true)}
          className="border-ruby/10 bg-white/70 text-ruby hover:border-ruby/20 hover:bg-white"
        >
          Supprimer
        </Button>
      )}
    </>
  );
}
