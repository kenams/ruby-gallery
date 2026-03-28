"use client";

import { LoaderCircle, LockKeyhole, Sparkles } from "lucide-react";
import { useState } from "react";

import { Notice } from "@/components/ui/notice";
import { Button } from "@/components/ui/button";

export function BuyButton({ artworkId }: { artworkId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artworkId })
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Le paiement ne peut pas etre initialise pour le moment.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <Button type="button" variant="buy" onClick={handleClick} disabled={loading} className="w-full md:w-auto">
        {loading ? <LoaderCircle className="animate-spin" size={16} /> : <Sparkles size={16} />}
        {loading ? "Redirection vers Stripe..." : "Acheter cette oeuvre"}
      </Button>
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ink/45">
        <LockKeyhole size={14} />
        Paiement securise via Stripe
      </div>
      {error ? <Notice tone="error">{error}</Notice> : null}
    </div>
  );
}
