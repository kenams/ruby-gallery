# Deploy temporaire Vercel + Neon

Ce projet reste utilisable en local avec SQLite, mais la version en ligne temporaire doit utiliser PostgreSQL via Neon.

## 1. Creer la base Neon

1. Ouvrir https://neon.tech/
2. Creer un projet gratuit
3. Recuperer :
   - l'URL de connexion pooled
   - l'URL directe non pooled

## 2. Variables Neon a utiliser

- `DATABASE_URL` = URL pooled Neon
- `DIRECT_URL` = URL directe Neon

Exemple :

```env
DATABASE_URL="postgres://USER:PASSWORD@ep-xxx-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connect_timeout=15"
DIRECT_URL="postgres://USER:PASSWORD@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=15"
```

## 3. Initialiser la base Neon depuis le poste local

Avant de deployer, pointer localement `.env` vers Neon puis executer :

```powershell
cd "C:\Users\kenam\Application-Projet-K\ruby-gallery"
npm install
npm run prisma:push:postgres
npm run prisma:seed:postgres
```

Cela cree les tables et charge le contenu de demonstration.

## 4. Deployer sur Vercel

1. Ouvrir https://vercel.com/
2. Importer le repository ou le projet
3. Laisser le framework `Next.js`
4. Le projet utilise deja `vercel.json` avec :

```text
npm run build:vercel
```

## 5. Variables a renseigner dans Vercel

Ajouter dans `Project Settings > Environment Variables` :

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
- `KAH_DIGITAL_URL`
- `NEXT_PUBLIC_RUBY_LOCATION`
- `NEXT_PUBLIC_RUBY_PORTRAIT`
- `CONTACT_EMAIL`
- `CONTACT_PHONE`
- `INSTAGRAM_URL`
- `INSTAGRAM_HANDLE`

## 6. URL publique a utiliser

Une fois le deploy termine, recuperer l'URL Vercel du type :

```text
https://ruby-gallery-demo.vercel.app
```

Puis remettre cette URL dans :

- `NEXT_PUBLIC_SITE_URL` sur Vercel

Redeployer ensuite une fois pour que les metadata, canonical et le sitemap utilisent la bonne URL.

## 7. Admin

URL admin :

```text
https://ton-domaine.vercel.app/admin/login
```

Les identifiants admin sont ceux definis dans :

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## 8. Images pour la version temporaire

Sur Vercel, le televersement runtime dans `public/uploads` n'est pas persistant.

Pour cette version temporaire :

1. ajouter les images dans le repository sous :
   - `public/media/artworks/...`
   - `public/media/artist/...`
2. ou utiliser des URLs d'images externes
3. coller ensuite les chemins publics dans l'admin

## 9. Stripe

Stripe reste facultatif pour la demo.

Si les cles ne sont pas renseignees :

- le site public se deploye quand meme
- l'API checkout renvoie un message propre
- aucune page publique ne casse

## 10. Commandes utiles

Local SQLite :

```powershell
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
npm run build
npm run dev
```

Preparation Neon / Vercel :

```powershell
npm run prisma:generate:postgres
npm run prisma:push:postgres
npm run prisma:seed:postgres
npm run build:vercel
```
