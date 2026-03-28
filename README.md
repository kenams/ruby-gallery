# Ruby Gallery

Version client-ready du site galerie de Ruby, artiste peintre contemporaine.

Le projet est deja pret pour :
- presenter Ruby dans un univers premium
- afficher un catalogue d'oeuvres
- gerer les oeuvres depuis un admin simple
- lancer un checkout Stripe
- recevoir les vraies donnees, les vrais visuels et les vrais textes avant mise en ligne
- etre deploye temporairement sur Vercel avec Neon Postgres

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Prisma
- SQLite pour le demarrage local
- Neon Postgres pour la mise en ligne Vercel
- Auth admin par cookie signe
- Stripe Checkout + webhook

## Installation

```powershell
cd "C:\Users\kenam\Application-Projet-K\ruby-gallery"
npm install
```

## Variables d'environnement a renseigner

Copie `.env.example` vers `.env`, puis remplace les placeholders.

Variables principales :

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_SITE_URL`
- `AUTH_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_CURRENCY`
- `NEXT_PUBLIC_RUBY_LOCATION`
- `NEXT_PUBLIC_RUBY_PORTRAIT`
- `CONTACT_EMAIL`
- `CONTACT_PHONE`
- `INSTAGRAM_URL`
- `INSTAGRAM_HANDLE`

Placeholders de contenu a remplacer :

- `[RUBY_BIO]`
- `[RUBY_MANIFESTE]`
- `[RUBY_ARTIST_STATEMENT]`
- `[RUBY_EMAIL]`
- `[RUBY_PHONE]`
- `[RUBY_INSTAGRAM]`
- `[RUBY_PORTRAIT]`
- `[RUBY_LOCATION]`
- `[LEGAL_NOTICE]`
- `[PRIVACY_POLICY]`
- `[TERMS_OF_SALE]`
- `[STRIPE_PUBLIC_KEY]`
- `[STRIPE_SECRET_KEY]`
- `[STRIPE_WEBHOOK_SECRET]`

Les emplacements de contenu sont centralises dans :

- `src/lib/content.ts`
- `src/lib/legal-content.ts`
- `src/lib/site.ts`
- `src/lib/starter-data.ts`

## Prisma

En local, le projet peut rester en SQLite.

```powershell
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

Note Windows pour SQLite :
si Prisma echoue avec une URL relative, utilise une URL absolue de type :

```env
DATABASE_URL="file:C:/Users/kenam/Application-Projet-K/ruby-gallery/prisma/dev.db"
```

Pour Vercel + Neon, utilise la variante Postgres :

```powershell
npm run prisma:generate:postgres
npm run prisma:push:postgres
npm run prisma:seed:postgres
```

## Integrer les vraies oeuvres de Ruby

1. Deposer les fichiers dans :

- `public/media/artworks/nom-de-loeuvre/cover.jpg`
- `public/media/artworks/nom-de-loeuvre/detail-1.jpg`
- `public/media/artworks/nom-de-loeuvre/detail-2.jpg`

2. Mettre a jour les oeuvres :

- soit depuis l'admin `/admin/artworks`
- soit dans `src/lib/starter-data.ts` si tu veux reseeder un catalogue propre

3. Pour chaque oeuvre, renseigner :

- titre
- slug
- cover image
- vues detail
- alt text
- description
- prix
- dimensions
- annee
- collection
- statut
- mise en avant
- SEO title / SEO description si utile

## Integrer les vraies informations artiste

1. Mettre a jour :

- `src/lib/starter-data.ts` pour les textes et reglages seed par defaut
- l'admin `/admin/settings` pour modifier les contenus publics sans coder
- `.env` pour le contact, les reseaux et les variables de production

2. Deposer le portrait dans :

- `public/media/artist/portrait-ruby.jpg`

## Stripe en reel

1. Renseigner dans `.env` :

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_CURRENCY`

2. Lancer le listener local :

```powershell
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

3. Verifier qu'une oeuvre a le statut `AVAILABLE`.

4. Tester le parcours d'achat.

Le checkout empeche deja l'achat d'une oeuvre vendue ou reservee.

Si les cles Stripe ne sont pas encore renseignees, le site public reste deployable sans casser les pages.

## Lancer en local

```powershell
npm run dev
```

Puis ouvrir :

```text
http://localhost:3000
```

## Admin

Page :

```text
/admin/login
```

Identifiants locaux par defaut si rien n'est defini dans `.env` :

- email : `admin@ruby-gallery.local`
- mot de passe : `ChangeThisPassword123!`

En production, definis toujours un `ADMIN_PASSWORD` fort.

## Deploy temporaire gratuit

Le chemin recommande pour montrer le site a Ruby a distance est :

- frontend et fonctions serverless : Vercel
- base de donnees : Neon Postgres

Le guide pas a pas est ici :

- `DEPLOY_VERCEL_NEON.md`

## Preparer la mise en production

1. Remplacer tous les placeholders de contenu.
2. Integrer les vraies images.
3. Remplir les pages legales finales.
4. Remplir les variables Stripe reelles.
5. Verifier l'admin avec un mot de passe fort.
6. Lancer :

```powershell
npm run prisma:generate
npm run build
```

7. Verifier :

- le rendu mobile
- le formulaire de contact
- les pages legales
- le sitemap
- le checkout Stripe
- les statuts des oeuvres

## Commandes utiles

```powershell
npm install
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
npm run prisma:generate:postgres
npm run prisma:push:postgres
npm run prisma:seed:postgres
npm run build:vercel
npm run build
npm run dev
```
