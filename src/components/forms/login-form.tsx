"use client";

import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (res.ok) {
        window.location.href = "/admin";
        return;
      }

      setError(data?.error ?? "Erreur technique sur la route de login");
    } catch {
      setError("Erreur technique sur la route de login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-5 rounded-[2rem] border border-black/6 bg-white/90 p-8 shadow-veil">
      <div className="rounded-[1.5rem] border border-ruby/15 bg-[#fff7f4] px-5 py-4 text-sm leading-7 text-ink/78">
        <p className="text-fine text-ruby/80">Compte de test</p>
        <p className="mt-3">Email de test : admin@test.com</p>
        <p>Mot de passe de test : admin123</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5">
        <label className="grid gap-2 text-sm text-ink/80">
          Email admin
          <input
            type="email"
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 rounded-2xl border border-black/10 bg-pearl px-4 outline-none transition focus:border-ruby/40"
            placeholder="admin123"
            required
          />
        </label>

        {error ? (
          <div className="rounded-[1.25rem] border border-ruby/15 bg-[#fff2f3] px-4 py-3 text-sm text-ruby">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-transparent bg-ink px-6 text-sm font-medium tracking-[0.08em] text-pearl transition hover:bg-[#241c1b] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
