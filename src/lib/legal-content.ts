import { isPlaceholderValue } from "@/lib/placeholders";

type LegalBlock = {
  title: string;
  draft: string[];
  fallback: string[];
};

function resolveLegalParagraphs(block: LegalBlock) {
  if (block.draft.length === 1 && isPlaceholderValue(block.draft[0])) {
    return block.fallback;
  }

  return block.draft;
}

const legalBlocks = {
  notice: {
    title: "Mentions legales",
    draft: ["[LEGAL_NOTICE]"],
    fallback: [
      "Les mentions legales definitives doivent etre renseignees avant mise en ligne: identite de l'editeur, coordonnees de contact, statut juridique si applicable, hebergeur du site et modalites de publication.",
      "Cette base est volontairement propre et prete a recevoir le texte juridique reel de Ruby et, si necessaire, les informations d'edition ou de representation commerciale communiquees par KAH Digital."
    ]
  },
  privacy: {
    title: "Politique de confidentialite",
    draft: ["[PRIVACY_POLICY]"],
    fallback: [
      "La politique de confidentialite finale doit preciser les donnees collectees via le formulaire de contact, les finalites de traitement, la duree de conservation, les droits des personnes et le point de contact pour toute demande relative aux donnees personnelles.",
      "Le projet est deja structure pour stocker les messages recus en base de donnees. Avant publication, le texte definitif doit encadrer cet usage ainsi que les eventuels cookies ou outils tiers relies au paiement et a la mesure d'audience."
    ]
  },
  terms: {
    title: "Conditions de vente",
    draft: ["[TERMS_OF_SALE]"],
    fallback: [
      "Les conditions de vente doivent encadrer la disponibilite reelle des oeuvres, les modalites de paiement Stripe, la confirmation de commande, les conditions de livraison, les frais eventuels, le droit applicable et la politique de remboursement ou d'annulation.",
      "Le site est pret a gerer un achat d'oeuvre originale en ligne, mais la page finale doit encore recevoir les conditions de vente propres a Ruby avant toute ouverture publique."
    ]
  }
} satisfies Record<string, LegalBlock>;

export const legalContent = {
  intro:
    "Le site est pret a accueillir les textes juridiques reels de Ruby. Tant qu'ils ne sont pas fournis, les pages legale, confidentialite et vente conservent une base editoriale propre, clairement identifiable et non trompeuse.",
  notice: {
    title: legalBlocks.notice.title,
    paragraphs: resolveLegalParagraphs(legalBlocks.notice),
    isPlaceholder: legalBlocks.notice.draft.length === 1 && isPlaceholderValue(legalBlocks.notice.draft[0])
  },
  privacy: {
    title: legalBlocks.privacy.title,
    paragraphs: resolveLegalParagraphs(legalBlocks.privacy),
    isPlaceholder: legalBlocks.privacy.draft.length === 1 && isPlaceholderValue(legalBlocks.privacy.draft[0])
  },
  terms: {
    title: legalBlocks.terms.title,
    paragraphs: resolveLegalParagraphs(legalBlocks.terms),
    isPlaceholder: legalBlocks.terms.draft.length === 1 && isPlaceholderValue(legalBlocks.terms.draft[0])
  }
} as const;
