"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { SubmitButton } from "@/components/forms/submit-button";
import { Notice } from "@/components/ui/notice";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    setLoading(false);

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Email ou mot de passe incorrect.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-[2rem] border border-black/6 bg-white/90 p-8 shadow-veil">
      <label className="grid gap-2 text-sm text-ink/80">
        Email admin
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-12 rounded-2xl border border-black/10 bg-pearl px-4 outline-none transition focus:border-ruby/40"
          placeholder="admin@test.com"
          required
        />
      </label>

      <label className="grid gap-2 text-sm text-ink/80">
        Mot de passe
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-12 rounded-2xl border border-black/10 bg-pearl px-4 outline-none transition focus:border-ruby/40"
          placeholder="admin123"
          required
        />
      </label>

      {error ? <Notice tone="error">{error}</Notice> : null}

      <SubmitButton variant="primary" className="w-full" disabled={loading}>
        {loading ? "Connexion..." : "Se connecter"}
      </SubmitButton>
    </form>
  );
}
