import Link from "next/link";
import Image from "next/image";

import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { getAdminArtworks, getDashboardSummary } from "@/lib/data";
import { requireAdmin } from "@/lib/auth";
import { formatDate, formatPrice } from "@/lib/format";
import { getSiteSettings } from "@/lib/site-settings";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [summary, artworks, settings] = await Promise.all([getDashboardSummary(), getAdminArtworks(), getSiteSettings()]);
  const recent = artworks.slice(0, 4);

  return (
    <AdminShell
      title="Bienvenue Admin"
      description="Depuis ici, tu peux piloter la galerie, les prix, les statuts, les contenus du site et la coherence globale de la presence en ligne."
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="grid gap-4 md:grid-cols-2">
          {[
            { label: "Total oeuvres", value: summary.total },
            { label: "Disponibles", value: summary.available },
            { label: "Vendues", value: summary.sold },
            { label: "Mises en avant", value: summary.featured },
            { label: "Messages", value: summary.messages }
          ].map((item) => (
            <div key={item.label} className="admin-stat-card">
              <p className="text-fine text-ruby/80">{item.label}</p>
              <p className="mt-4 font-display text-5xl text-ink">{item.value}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.22em] text-ink/36">Vue instantanee du catalogue</p>
            </div>
          ))}
        </section>

        <section className="admin-panel">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-fine text-ruby/80">Actions rapides</p>
              <h2 className="mt-4 font-display text-4xl text-ink">Piloter la collection</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="admin">
                <Link href="/admin/artworks/new">Ajouter une oeuvre</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/admin/settings">Modifier le site</Link>
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <Notice tone="info">
              {settings.artistName} peut maintenant modifier les textes d'accueil, la bio, les coordonnees et les informations de contact depuis l'onglet Parametres.
            </Notice>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Nouvelle oeuvre",
                body: "Ajouter un tableau avec ses images, son prix et son statut.",
                href: "/admin/artworks/new"
              },
              {
                title: "Contenu du site",
                body: "Modifier le hero, la bio, les coordonnees et la page A propos.",
                href: "/admin/settings"
              },
              {
                title: "Voir la galerie",
                body: "Controler le rendu public et la mise en avant des oeuvres.",
                href: "/gallery"
              }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="admin-section transition hover:-translate-y-px hover:border-ruby/20"
              >
                <p className="text-fine text-ruby/80">{item.title}</p>
                <p className="mt-4 text-sm leading-7 text-ink/68">{item.body}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 grid gap-4">
            {recent.length ? (
              recent.map((artwork) => (
                <div
                  key={artwork.id}
                  className="grid gap-4 rounded-[1.6rem] border border-black/10 bg-white/78 px-5 py-4 md:grid-cols-[88px_1fr_auto]"
                >
                  <div className="relative h-[88px] w-[88px] overflow-hidden rounded-[1.2rem] border border-black/6 bg-white">
                    <Image src={artwork.coverImage} alt={artwork.altText} fill className="object-cover" sizes="88px" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-ink">{artwork.title}</p>
                      {artwork.featured ? <span className="admin-tag">Mise en avant</span> : null}
                    </div>
                    <p className="mt-2 text-sm text-ink/60">
                      {artwork.collection} | {formatPrice(artwork.priceInCents)}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-ink/35">
                      Mise a jour {formatDate(artwork.updatedAt)}
                    </p>
                  </div>
                  <Button asChild variant="ghost">
                    <Link href={`/admin/artworks/${artwork.id}/edit`}>Modifier</Link>
                  </Button>
                </div>
              ))
            ) : (
              <div className="admin-section text-center">
                <p className="font-display text-3xl text-ink">Aucune oeuvre pour le moment.</p>
                <p className="mt-4 text-sm leading-7 text-ink/66">
                  Commence par creer une premiere fiche oeuvre pour remplir la galerie.
                </p>
                <div className="mt-6">
                  <Button asChild variant="admin">
                    <Link href="/admin/artworks/new">Ajouter une oeuvre</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
