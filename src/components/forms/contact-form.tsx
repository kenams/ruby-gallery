"use client";

import { useActionState, useEffect, useRef } from "react";

import { contactAction, type ContactActionState } from "@/actions/contact";
import { SubmitButton } from "@/components/forms/submit-button";
import { Notice } from "@/components/ui/notice";

const initialState: ContactActionState = {
  success: false,
  message: ""
};

export function ContactForm() {
  const [state, formAction] = useActionState(contactAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-5 rounded-[2rem] border border-black/6 bg-white/80 p-6 shadow-veil">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-ink/80">
          Nom
          <input
            type="text"
            name="name"
            className="h-12 rounded-2xl border border-black/10 bg-pearl px-4 outline-none transition focus:border-ruby/40"
            placeholder="Votre nom"
            required
          />
        </label>

        <label className="grid gap-2 text-sm text-ink/80">
          Email
          <input
            type="email"
            name="email"
            className="h-12 rounded-2xl border border-black/10 bg-pearl px-4 outline-none transition focus:border-ruby/40"
            placeholder="vous@example.com"
            required
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm text-ink/80">
        Message
        <textarea
          name="message"
          rows={7}
          className="rounded-[1.5rem] border border-black/10 bg-pearl px-4 py-4 outline-none transition focus:border-ruby/40"
          placeholder="Parlez de l'oeuvre qui vous interesse, d'une commande, d'une exposition ou d'une demande de rendez-vous."
          required
        />
      </label>

      {state.message ? (
        <Notice tone={state.success ? "success" : "error"}>{state.message}</Notice>
      ) : null}

      <div>
        <SubmitButton variant="primary">Envoyer le message</SubmitButton>
      </div>
    </form>
  );
}
