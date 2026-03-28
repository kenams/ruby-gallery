import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactContent } from "@/lib/content";
import { hasConfiguredValue } from "@/lib/placeholders";
import { createMetadata } from "@/lib/seo";
import { getInstagramLabel, getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return createMetadata({
    title: `Contact | ${settings.artistName}`,
    description: `Contacter ${settings.artistName} pour une acquisition, une commande, une exposition ou une demande autour de ses peintures contemporaines originales.`,
    keywords: [
      "contacter artiste peintre",
      "acheter oeuvre originale",
      "commande peinture contemporaine",
      `artiste peintre ${settings.location} contact`
    ]
  });
}

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <main className="grid-shell section-space">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="grid gap-6">
            <SectionHeading
              eyebrow="Contact"
              title={`Parler d'une oeuvre, d'une acquisition ou d'un projet avec ${settings.artistName}.`}
              description={contactContent.intro}
            />
            <div className="public-panel rounded-[2rem] px-6 py-6">
              <p className="curatorial-note">Echange prive</p>
              <p className="mt-4 text-sm leading-7 text-ink/63">
                Une prise de contact pensee pour collectionneurs, architectes, galeries et amateurs
                souhaitant recevoir des informations, des vues detaillees ou organiser un echange.
              </p>
            </div>
          </div>

          <div className="public-panel mt-8 rounded-[2.2rem] p-8 text-sm leading-7 text-ink/68">
            <div className="grid gap-4">
              <div>
                <p className="quiet-kicker">Email</p>
                {hasConfiguredValue(settings.email) ? (
                  <a href={`mailto:${settings.email}`} className="note-link mt-3">
                    {settings.email}
                  </a>
                ) : (
                  <p className="mt-2 text-ink/55">Email non renseigne.</p>
                )}
              </div>
              <div>
                <p className="quiet-kicker">Telephone</p>
                <p className="mt-2 text-ink/75">
                  {hasConfiguredValue(settings.phone) ? settings.phone : "Telephone non renseigne"}
                </p>
              </div>
              <div>
                <p className="quiet-kicker">Localisation</p>
                <p className="mt-2">{settings.location}</p>
              </div>
              <div>
                <p className="quiet-kicker">Instagram</p>
                {hasConfiguredValue(settings.instagram) ? (
                  <a href={settings.instagram} target="_blank" rel="noreferrer" className="note-link mt-3">
                    {getInstagramLabel(settings.instagram)}
                  </a>
                ) : (
                  <p className="mt-2 text-ink/55">Instagram non renseigne.</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {contactContent.reassurance.map((item) => (
              <div key={item} className="public-soft-panel rounded-[1.75rem] px-5 py-5 text-sm leading-7 text-ink/66">
                {item}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <ContactForm />
        </Reveal>
      </div>
    </main>
  );
}
