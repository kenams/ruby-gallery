import { ArtworkStatus } from "@prisma/client";

export const defaultSiteSettingsSeed = {
  artistName: "Ruby",
  bio:
    "Ruby vit et travaille en Occitanie. Depuis huit ans, elle developpe une peinture attentive a la matiere, a la lenteur du regard et a la retenue des formes.\n\nSa pratique s'ancre dans des couches fines, des reserves et des tensions sourdes qui laissent a chaque oeuvre une presence calme, durable et tres physique dans l'espace.\n\nAvant l'integration des textes definitifs, cette version conserve une base editoriale premium, claire et directement exploitable en presentation client.",
  about:
    "Le travail de Ruby se construit dans un equilibre entre silence, profondeur et lumiere tenue. Chaque toile cherche une justesse plutot qu'un effet, avec une ecriture contemporaine sobre et sensible.\n\nL'atelier devient un lieu de depots, de retraits et de reprises. Les surfaces avancent lentement jusqu'a trouver une densite stable, capable d'accompagner un interieur, une collection ou un projet d'accrochage.\n\nCette section est deja prete a accueillir la biographie definitive et la formulation exacte voulue pour la mise en ligne.",
  heroTitle: "Une peinture originale pensee pour les lieux qui laissent la lumiere respirer.",
  heroSubtitle:
    "Ruby construit des oeuvres sensibles ou la couleur avance par strates, reserves et tensions retenues. Sa peinture cherche moins l'effet qu'une forme de presence durable, sobre et silencieuse.",
  email: "",
  phone: "",
  instagram: "",
  location: "Occitanie, France",
  artistStatement:
    "Le travail de Ruby s'inscrit dans une economie de gestes et de matieres. Les toiles se construisent lentement, jusqu'a obtenir un equilibre entre densite, respiration et lumiere retenue.",
  portraitImage: "/branding/ruby-portrait.svg"
} as const;

export const starterArtworkSeed = [
  {
    title: "Velours Interieur",
    slug: "velours-interieur",
    coverImage: "/artworks/ruby-01.svg",
    galleryImages: ["/artworks/ruby-detail-01.svg"],
    altText: "Peinture contemporaine de Ruby aux rouges profonds, creme voile et matiere sourde",
    description:
      "Une toile dense et tenue, parcourue de rouges profonds, de reserves cremees et d'une lumiere presque interieure. Velours Interieur installe une sensation de chambre calme, contenue, ou la couleur demeure plus qu'elle ne se montre.",
    priceInCents: 280000,
    dimensions: "100 x 140 cm",
    year: 2026,
    collection: "Chambres lentes",
    status: ArtworkStatus.AVAILABLE,
    featured: true,
    sortOrder: 1,
    seoTitle: "Velours Interieur | Tableau original contemporain de Ruby",
    seoDescription:
      "Velours Interieur, oeuvre originale de Ruby, artiste peintre contemporaine basee en Occitanie. Huile et pigments sur toile."
  },
  {
    title: "Poussiere Blanche",
    slug: "poussiere-blanche",
    coverImage: "/artworks/ruby-02.svg",
    galleryImages: ["/artworks/ruby-detail-02.svg"],
    altText: "Peinture originale de Ruby aux tonalites ivoire, sable et lumiere mate",
    description:
      "Poussiere Blanche travaille la matiere comme un souffle. La surface reste claire, presque minerale, avec des passages ivoire et sable qui construisent une presence silencieuse, tres stable dans l'espace.",
    priceInCents: 190000,
    dimensions: "90 x 120 cm",
    year: 2025,
    collection: "Silences utiles",
    status: ArtworkStatus.SOLD,
    featured: true,
    sortOrder: 2,
    seoTitle: "Poussiere Blanche | Oeuvre vendue de Ruby",
    seoDescription:
      "Poussiere Blanche, peinture originale vendue de Ruby. Une oeuvre contemporaine sensible entre sable, creme et traces lumineuses."
  },
  {
    title: "Matiere de l'Aube",
    slug: "matiere-de-laube",
    coverImage: "/artworks/ruby-03.svg",
    galleryImages: ["/artworks/ruby-detail-02.svg"],
    altText: "Peinture contemporaine de Ruby avec beige poudre, prune assourdie et accent champagne",
    description:
      "Des champs de beige poudre, de prune assourdie et de champagne discret se rencontrent dans une tension calme. L'oeuvre demande un regard lent et gagne en profondeur a mesure qu'on s'en approche.",
    priceInCents: 240000,
    dimensions: "80 x 100 cm",
    year: 2026,
    collection: "Chambres lentes",
    status: ArtworkStatus.AVAILABLE,
    featured: true,
    sortOrder: 3,
    seoTitle: "Matiere de l'Aube | Tableau original de Ruby",
    seoDescription:
      "Matiere de l'Aube, peinture contemporaine originale de Ruby. Oeuvre disponible a l'achat en ligne."
  },
  {
    title: "Nerf Solaire",
    slug: "nerf-solaire",
    coverImage: "/artworks/ruby-04.svg",
    galleryImages: ["/artworks/ruby-detail-03.svg"],
    altText: "Peinture abstraite de Ruby, centre lumineux bronze sur fond encre",
    description:
      "Un noyau lumineux traverse une architecture sombre et veloutee. Nerf Solaire tient ensemble la chaleur, la gravite et une forme de rayonnement retenu, presque ceremoniel.",
    priceInCents: 310000,
    dimensions: "100 x 100 cm",
    year: 2026,
    collection: "Orbite douce",
    status: ArtworkStatus.AVAILABLE,
    featured: false,
    sortOrder: 4,
    seoTitle: "Nerf Solaire | Peinture originale contemporaine",
    seoDescription:
      "Nerf Solaire de Ruby, oeuvre abstraite contemporaine disponible, entre bronze doux et profondeur anthracite."
  },
  {
    title: "Calme Brutal",
    slug: "calme-brutal",
    coverImage: "/artworks/ruby-05.svg",
    galleryImages: ["/artworks/ruby-detail-04.svg"],
    altText: "Peinture de Ruby avec geste brun profond sur fond ivoire et beige doux",
    description:
      "Une ligne puissante fend une surface douce, presque ouatee. La piece joue l'ecart entre la coupe franche du geste et une atmosphere de retrait, comme une memoire qui resiste.",
    priceInCents: 210000,
    dimensions: "73 x 100 cm",
    year: 2024,
    collection: "Silences utiles",
    status: ArtworkStatus.RESERVED,
    featured: false,
    sortOrder: 5,
    seoTitle: "Calme Brutal | Oeuvre reservee de Ruby",
    seoDescription:
      "Calme Brutal, peinture reservee de Ruby. Une oeuvre abstraite contemporaine aux contrastes discrets."
  },
  {
    title: "Peau de Craie",
    slug: "peau-de-craie",
    coverImage: "/artworks/ruby-06.svg",
    galleryImages: ["/artworks/ruby-detail-02.svg"],
    altText: "Peinture originale de Ruby aux tonalites perlees, sable et blanc de craie",
    description:
      "Une toile claire et tactile, traversee de reserves et de depots opalins. Peau de Craie porte une pudeur presque architecturale: elle s'impose sans bruit, par sa respiration propre.",
    priceInCents: 170000,
    dimensions: "65 x 92 cm",
    year: 2025,
    collection: "Silences utiles",
    status: ArtworkStatus.AVAILABLE,
    featured: false,
    sortOrder: 6,
    seoTitle: "Peau de Craie | Tableau original a vendre",
    seoDescription:
      "Peau de Craie, oeuvre originale a vendre de Ruby, artiste peintre en Occitanie."
  },
  {
    title: "Rumeur d'Or",
    slug: "rumeur-dor",
    coverImage: "/artworks/ruby-07.svg",
    galleryImages: ["/artworks/ruby-detail-01.svg"],
    altText: "Peinture contemporaine de Ruby entre ivoire, bronze discret et bordeaux profond",
    description:
      "Des accents bronze affleurent comme des respirations sur une surface mate. L'ensemble reste retenu, presque murmure, puis gagne en presence lorsqu'on s'en approche.",
    priceInCents: 260000,
    dimensions: "97 x 130 cm",
    year: 2026,
    collection: "Orbite douce",
    status: ArtworkStatus.AVAILABLE,
    featured: true,
    sortOrder: 7,
    seoTitle: "Rumeur d'Or | Oeuvre contemporaine disponible",
    seoDescription:
      "Rumeur d'Or, peinture contemporaine originale de Ruby, disponible a l'achat sur la galerie en ligne."
  },
  {
    title: "La Chambre Secrete",
    slug: "la-chambre-secrete",
    coverImage: "/artworks/ruby-08.svg",
    galleryImages: ["/artworks/ruby-detail-04.svg"],
    altText: "Grande peinture abstraite profonde de Ruby, entre nuit sourde et vibration claire",
    description:
      "Une composition nocturne, profonde et retenue, ou les couches sombres s'ouvrent par une vibration claire. La Chambre Secrete est une oeuvre de seuil, d'intimite et de lente intensite.",
    priceInCents: 330000,
    dimensions: "110 x 150 cm",
    year: 2026,
    collection: "Chambres lentes",
    status: ArtworkStatus.AVAILABLE,
    featured: true,
    sortOrder: 8,
    seoTitle: "La Chambre Secrete | Grande toile originale de Ruby",
    seoDescription:
      "La Chambre Secrete, grande toile originale de Ruby, artiste peintre francaise contemporaine."
  }
] as const;
