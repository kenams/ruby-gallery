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
    <form ref={formRef} action={formAction} className="public-panel grid gap-6 rounded-[2.2rem] p-7 md:p-8">
      <div>
        <p className="quiet-kicker">Demande privee</p>
        <p className="mt-4 max-w-xl text-sm leading-7 text-ink/62">
          Chaque message est traite comme un premier echange autour d'une oeuvre, d'une acquisition
          ou d'un projet d'exposition.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-ink/78">
          Nom
          <input
            type="text"
            name="name"
            className="h-12 rounded-[1.3rem] border border-black/10 bg-[#fbf7f1] px-4 outline-none transition focus:border-ruby/30 focus:bg-white"
            placeholder="Votre nom"
            required
          />
        </label>

        <label className="grid gap-2 text-sm text-ink/78">
          Email
          <input
            type="email"
            name="email"
            className="h-12 rounded-[1.3rem] border border-black/10 bg-[#fbf7f1] px-4 outline-none transition focus:border-ruby/30 focus:bg-white"
            placeholder="vous@example.com"
            required
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm text-ink/78">
        Message
        <textarea
          name="message"
          rows={7}
          className="rounded-[1.55rem] border border-black/10 bg-[#fbf7f1] px-4 py-4 outline-none transition focus:border-ruby/30 focus:bg-white"
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
