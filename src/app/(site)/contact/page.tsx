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
          <SectionHeading
            eyebrow="Contact"
            title={`Parler d'une oeuvre, d'une acquisition ou d'un projet avec ${settings.artistName}.`}
            description={contactContent.intro}
          />

          <div className="surface mt-8 rounded-[2rem] p-8 text-sm leading-7 text-ink/70">
            <div className="grid gap-4">
              <div>
                <p className="text-fine text-ruby/80">Email</p>
                {hasConfiguredValue(settings.email) ? (
                  <a href={`mailto:${settings.email}`} className="mt-2 inline-block text-ink transition hover:text-ruby">
                    {settings.email}
                  </a>
                ) : (
                  <p className="mt-2 text-ink/55">Email non renseigne.</p>
                )}
              </div>
              <div>
                <p className="text-fine text-ruby/80">Telephone</p>
                <p className="mt-2 text-ink/75">
                  {hasConfiguredValue(settings.phone) ? settings.phone : "Telephone non renseigne"}
                </p>
              </div>
              <div>
                <p className="text-fine text-ruby/80">Localisation</p>
                <p className="mt-2">{settings.location}</p>
              </div>
              <div>
                <p className="text-fine text-ruby/80">Instagram</p>
                {hasConfiguredValue(settings.instagram) ? (
                  <a href={settings.instagram} target="_blank" rel="noreferrer" className="mt-2 inline-block text-ink transition hover:text-ruby">
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
              <div key={item} className="surface rounded-[1.6rem] px-5 py-4 text-sm leading-7 text-ink/68">
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
