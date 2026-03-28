"use client";

import { useActionState, useMemo, useState } from "react";

import { saveSiteSettingsAction, type SiteSettingsActionState } from "@/actions/site-settings";
import { SubmitButton } from "@/components/forms/submit-button";
import { Notice } from "@/components/ui/notice";

const initialState: SiteSettingsActionState = {
  success: false
};

type SiteSettingsFormProps = {
  settings: {
    artistName: string;
    heroTitle: string;
    heroSubtitle: string;
    bio: string;
    about: string;
    email: string;
    phone: string;
    instagram: string;
    location: string;
    artistStatement: string;
    portraitImage: string;
  };
};

export function SiteSettingsForm({ settings }: SiteSettingsFormProps) {
  const [state, formAction] = useActionState(saveSiteSettingsAction, initialState);
  const [artistName, setArtistName] = useState(settings.artistName);
  const [heroTitle, setHeroTitle] = useState(settings.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(settings.heroSubtitle);
  const [email, setEmail] = useState(settings.email);
  const [location, setLocation] = useState(settings.location);

  const preview = useMemo(
    () => ({
      artistName: state.values?.artistName ?? artistName,
      heroTitle: state.values?.heroTitle ?? heroTitle,
      heroSubtitle: state.values?.heroSubtitle ?? heroSubtitle,
      email: state.values?.email ?? email,
      location: state.values?.location ?? location
    }),
    [artistName, email, heroSubtitle, heroTitle, location, state.values]
  );

  return (
    <form action={formAction} className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="admin-stat-card">
          <p className="text-fine text-ruby/80">Nom public</p>
          <p className="mt-3 font-display text-3xl text-ink">{preview.artistName}</p>
        </div>
        <div className="admin-stat-card">
          <p className="text-fine text-ruby/80">Contact</p>
          <p className="mt-3 text-sm leading-7 text-ink/68">{preview.email || "Email non renseigne"}</p>
        </div>
        <div className="admin-stat-card">
          <p className="text-fine text-ruby/80">Localisation</p>
          <p className="mt-3 text-sm leading-7 text-ink/68">{preview.location || "Localisation non renseignee"}</p>
        </div>
      </div>

      <section className="admin-panel">
        <div className="mb-6">
          <p className="text-fine text-ruby/80">Identite</p>
          <h2 className="mt-4 font-display text-3xl text-ink">Nom, portrait et presence publique</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
        <label className="admin-label">
          Nom de l'artiste
          <input
            type="text"
            name="artistName"
            defaultValue={settings.artistName}
            onChange={(event) => setArtistName(event.target.value)}
            className="admin-input"
            required
          />
          <span className="admin-helper">Affiche le nom dans le header, le footer et les zones editoriales.</span>
        </label>

        <label className="admin-label">
          Portrait
          <input
            type="text"
            name="portraitImage"
            defaultValue={settings.portraitImage}
            className="admin-input"
            placeholder="/media/artist/portrait-ruby.jpg"
          />
          <span className="admin-helper">Chemin public de l'image portrait utilisee sur la page A propos.</span>
        </label>
        </div>
      </section>

      <section className="admin-panel">
        <div className="mb-6">
          <p className="text-fine text-ruby/80">Accueil</p>
          <h2 className="mt-4 font-display text-3xl text-ink">Hero et promesse artistique</h2>
        </div>
        <div className="grid gap-6">
        <label className="admin-label">
          Titre d'accueil
          <textarea
            name="heroTitle"
            rows={3}
            defaultValue={settings.heroTitle}
            onChange={(event) => setHeroTitle(event.target.value)}
            className="admin-textarea"
            required
          />
        </label>

        <label className="admin-label">
          Sous-titre d'accueil
          <textarea
            name="heroSubtitle"
            rows={4}
            defaultValue={settings.heroSubtitle}
            onChange={(event) => setHeroSubtitle(event.target.value)}
            className="admin-textarea"
            required
          />
        </label>
        </div>

      <div className="admin-section mt-6">
        <p className="text-fine text-ruby/80">Apercu accueil</p>
        <h3 className="mt-4 max-w-[14ch] font-display text-4xl leading-none tracking-hero text-ink">
          {preview.heroTitle}
        </h3>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/70">{preview.heroSubtitle}</p>
      </div>
      </section>

      <section className="admin-panel">
        <div className="mb-6">
          <p className="text-fine text-ruby/80">Bio & a propos</p>
          <h2 className="mt-4 font-display text-3xl text-ink">Textes editoriaux</h2>
        </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <label className="admin-label">
          Bio
          <textarea
            name="bio"
            rows={9}
            defaultValue={settings.bio}
            className="admin-textarea"
            required
          />
          <span className="admin-helper">Utilise un saut de ligne vide pour creer plusieurs paragraphes.</span>
        </label>

        <label className="admin-label">
          Texte A propos
          <textarea
            name="about"
            rows={9}
            defaultValue={settings.about}
            className="admin-textarea"
            required
          />
          <span className="admin-helper">Ce texte alimente la page A propos et les blocs editoriaux du site.</span>
        </label>
      </div>

      <label className="admin-label mt-6">
        Manifeste artistique
        <textarea
          name="artistStatement"
          rows={5}
          defaultValue={settings.artistStatement}
          className="admin-textarea"
          placeholder="Quelques lignes sur la demarche artistique de Ruby."
        />
      </label>
      </section>

      <section className="admin-panel">
        <div className="mb-6">
          <p className="text-fine text-ruby/80">Contact & reseaux</p>
          <h2 className="mt-4 font-display text-3xl text-ink">Coordonnees publiques</h2>
        </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <label className="admin-label">
          Email
          <input
            type="email"
            name="email"
            defaultValue={settings.email}
            onChange={(event) => setEmail(event.target.value)}
            className="admin-input"
            required
          />
        </label>

        <label className="admin-label">
          Telephone
          <input
            type="text"
            name="phone"
            defaultValue={settings.phone}
            className="admin-input"
            placeholder="+33 ..."
          />
        </label>

        <label className="admin-label">
          Instagram
          <input
            type="url"
            name="instagram"
            defaultValue={settings.instagram}
            className="admin-input"
            placeholder="https://instagram.com/..."
          />
        </label>

        <label className="admin-label">
          Localisation
          <input
            type="text"
            name="location"
            defaultValue={settings.location}
            onChange={(event) => setLocation(event.target.value)}
            className="admin-input"
            required
          />
        </label>
      </div>
      </section>

      {state.message ? (
        <Notice tone={state.success ? "success" : "error"}>{state.message}</Notice>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <SubmitButton variant="admin" className="min-w-[240px]">Enregistrer les parametres du site</SubmitButton>
      </div>
    </form>
  );
}
