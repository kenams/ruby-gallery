"use client";

import { useActionState } from "react";

import { loginAction, type AuthActionState } from "@/actions/auth";
import { SubmitButton } from "@/components/forms/submit-button";
import { Notice } from "@/components/ui/notice";

const initialState: AuthActionState = {
  success: false
};

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="grid gap-5 rounded-[2rem] border border-black/6 bg-white/90 p-8 shadow-veil">
      <label className="grid gap-2 text-sm text-ink/80">
        Email admin
        <input
          type="email"
          name="email"
          className="h-12 rounded-2xl border border-black/10 bg-pearl px-4 outline-none transition focus:border-ruby/40"
          placeholder="admin@ruby-gallery.local"
          required
        />
      </label>

      <label className="grid gap-2 text-sm text-ink/80">
        Mot de passe
        <input
          type="password"
          name="password"
          className="h-12 rounded-2xl border border-black/10 bg-pearl px-4 outline-none transition focus:border-ruby/40"
          placeholder="********"
          required
        />
      </label>

      {state.message ? <Notice tone="error">{state.message}</Notice> : null}

      <SubmitButton variant="primary" className="w-full">
        Se connecter
      </SubmitButton>
    </form>
  );
}
