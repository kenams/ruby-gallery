import { isPlaceholderValue, resolvePlaceholder } from "@/lib/placeholders";
import { siteConfig } from "@/lib/site";

const biographyDraft = ["[RUBY_BIO]"];
const biographyFallback = [
  "Ruby vit et travaille en Occitanie. Depuis huit ans, elle developpe une peinture construite dans la retenue, attentive aux tensions de surface, aux reserves claires et a la lenteur du regard.",
  "Sa pratique s'ancre dans une sensibilite tres physique a la matiere: couches fines, effacements, reprises et deplacements subtils. Les oeuvres avancent comme des presences calmes, pensees pour s'inscrire durablement dans un lieu.",
  "Chaque tableau s'inscrit dans une recherche de justesse et d'intensite silencieuse, avec le desir de laisser une trace durable dans l'espace sans jamais forcer l'effet."
];

const artistStatementDraft = "[RUBY_ARTIST_STATEMENT]";
const manifestoDraft = "[RUBY_MANIFESTE]";

const biographyParagraphs =
  biographyDraft.length === 1 && isPlaceholderValue(biographyDraft[0]) ? biographyFallback : biographyDraft;

const locationLabel = resolvePlaceholder(siteConfig.location, "Occitanie, France");
const portraitImage = resolvePlaceholder(siteConfig.artistPortrait, "/branding/ruby-portrait.svg");

export const homeContent = {
  heroEyebrow: `Ruby | artiste peintre contemporaine | ${locationLabel}`,
  heroTitle: "Une peinture originale pensee pour les lieux qui laissent la lumiere respirer.",
  heroBody: resolvePlaceholder(
    artistStatementDraft,
    "Ruby construit des oeuvres sensibles ou la couleur avance par strates, reserves et tensions retenues. Sa peinture cherche moins l'effet qu'une forme de presence durable, sobre et silencieuse."
  ),
  heroAsideTitle: "Collection en cours",
  heroAsideBody:
    "Une selection d'oeuvres originales composees comme un accrochage lent: surfaces denses, marges claires, profondeur mate et details tenus.",
  confidenceNotes: [
    "Oeuvres originales disponibles a l'acquisition en ligne ou par demande privee.",
    "Presentation editoriale, lecture lente et informations claires pour accompagner collectionneurs et amateurs d'art.",
    "Une galerie en ligne concue pour valoriser durablement l'univers de Ruby et ses oeuvres originales."
  ],
  manifestoTitle: "Une peinture qui tient par le silence, la justesse et la persistance du regard.",
  manifestoBody: resolvePlaceholder(
    manifestoDraft,
    "Le travail de Ruby s'inscrit dans une economie de gestes et de matieres. Les toiles se construisent lentement, jusqu'a obtenir un equilibre entre densite, respiration et lumiere retenue."
  ),
  collectingTitle: "Collectionner une oeuvre de Ruby",
  collectingBody:
    "Chaque acquisition ouvre un echange direct avec l'artiste. Le site permet de verifier la disponibilite, de lancer un paiement securise via Stripe ou de formuler une demande privee autour d'une oeuvre, d'une commande ou d'un projet d'accrochage.",
  studioHighlights: [
    {
      title: "Presentation galerie",
      body: "Des images amples, une lecture lente et une structure qui laisse l'oeuvre respirer sans jamais la traiter comme un produit standard."
    },
    {
      title: "Acquisition & confiance",
      body: "Prix reels, statuts fiables, paiement securise et prise de contact claire pour un collectionneur, un architecte ou un amateur d'art."
    },
    {
      title: "Presence professionnelle",
      body: "Une presence digitale sobre et solide, pensee pour presenter Ruby comme une artiste contemporaine serieuse et collectionnable."
    }
  ]
} as const;

export const aboutContent = {
  title: "Ruby peint depuis huit ans une forme de presence qui refuse l'effet facile.",
  intro:
    "A trente ans, depuis l'Occitanie, Ruby developpe une peinture de la nuance, de la matiere et de la reserve.",
  paragraphs: biographyParagraphs,
  quote: "Je cherche une oeuvre qui tienne dans le temps avant de chercher une image qui seduise tout de suite.",
  portraitImage
} as const;

export const contactContent = {
  title: "Parler d'une oeuvre, d'une acquisition, d'une commande ou d'un projet d'exposition.",
  intro:
    "Le contact avec Ruby reste direct, soigne et rassurant, qu'il s'agisse d'une acquisition, d'une commande, d'une exposition ou d'une demande d'informations.",
  reassurance: [
    "Chaque demande peut etre oriente vers une acquisition, une commande, une exposition ou une demande d'images detaillees.",
    "Les informations de contact et les modalites de reponse sont centralisees pour rester simples a actualiser.",
    "Le formulaire enregistre deja proprement les messages recus et peut etre branche a un service d'email transactionnel plus tard."
  ]
} as const;

export const galleryContent = {
  title: "Une galerie pensee comme une visite lente.",
  intro:
    "Ici, les oeuvres sont presentees dans un rythme editorial volontairement ample, avec une lecture claire des prix, des statuts et des collections."
} as const;
