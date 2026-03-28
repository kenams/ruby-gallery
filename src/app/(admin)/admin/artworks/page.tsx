import Link from "next/link";
import Image from "next/image";

import { deleteArtworkAction } from "@/actions/artworks";
import { AdminShell } from "@/components/admin/admin-shell";
import { DeleteArtworkButton } from "@/components/admin/delete-artwork-button";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { StatusPill } from "@/components/ui/status-pill";
import { getAdminArtworks } from "@/lib/data";
import { requireAdmin } from "@/lib/auth";
import { formatDate, formatPrice } from "@/lib/format";

export default async function AdminArtworksPage({
  searchParams
}: {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}) {
  await requireAdmin();
  const { saved, deleted } = await searchParams;
  const artworks = await getAdminArtworks();

  return (
    <AdminShell
      title="Le catalogue complet de Ruby."
      description="Gestion des oeuvres, de leur ordre, de leur statut, du pricing et des informations de vente."
    >
      <div className="admin-panel">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-fine text-ruby/80">Oeuvres</p>
            <h2 className="mt-4 font-display text-4xl text-ink">Catalogue</h2>
            <p className="mt-3 text-sm leading-7 text-ink/66">
              Une vue plus visuelle pour reperer rapidement le statut, le prix et la place de chaque oeuvre dans l'accrochage.
            </p>
          </div>
          <Button asChild variant="admin">
            <Link href="/admin/artworks/new">Nouvelle oeuvre</Link>
          </Button>
        </div>

        <div className="mt-4 grid gap-3">
          {saved ? <Notice tone="success">L'oeuvre a ete enregistree avec succes.</Notice> : null}
          {deleted ? <Notice tone="success">L'oeuvre a ete supprimee du catalogue.</Notice> : null}
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-2">
          {artworks.length ? (
            artworks.map((artwork) => (
              <article
                key={artwork.id}
                className="rounded-[1.8rem] border border-black/10 bg-white/84 p-5 shadow-[0_14px_38px_rgba(23,19,17,0.04)]"
              >
                <div className="relative overflow-hidden rounded-[1.3rem] border border-black/6 bg-pearl">
                  <div className="relative aspect-[1.05]">
                    <Image src={artwork.coverImage} alt={artwork.altText} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 33vw" />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-3xl text-ink">{artwork.title}</h3>
                      <StatusPill status={artwork.status} />
                      {artwork.featured ? <span className="admin-tag">Mise en avant</span> : null}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-ink/64">
                      {artwork.collection} | {artwork.year} | {artwork.dimensions}
                    </p>
                  </div>
                  <p className="font-medium text-ink">{formatPrice(artwork.priceInCents)}</p>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="admin-section p-4">
                    <p className="text-fine text-ruby/80">Ordre</p>
                    <p className="mt-3 text-sm text-ink/70">{artwork.sortOrder}</p>
                  </div>
                  <div className="admin-section p-4">
                    <p className="text-fine text-ruby/80">Slug</p>
                    <p className="mt-3 break-all text-sm text-ink/70">/gallery/{artwork.slug}</p>
                  </div>
                  <div className="admin-section p-4">
                    <p className="text-fine text-ruby/80">Mise a jour</p>
                    <p className="mt-3 text-sm text-ink/70">{formatDate(artwork.updatedAt)}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button asChild variant="ghost">
                    <Link href={`/gallery/${artwork.slug}`}>Voir</Link>
                  </Button>
                  <Button asChild variant="admin">
                    <Link href={`/admin/artworks/${artwork.id}/edit`}>Modifier</Link>
                  </Button>
                  <DeleteArtworkButton artworkId={artwork.id} artworkTitle={artwork.title} action={deleteArtworkAction} />
                </div>
              </article>
            ))
          ) : (
            <div className="admin-section xl:col-span-2">
              <p className="font-display text-3xl text-ink">Le catalogue est encore vide.</p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/66">
                Cree une premiere oeuvre pour faire apparaitre ici les cartes visuelles, les statuts et les actions rapides.
              </p>
              <div className="mt-6">
                <Button asChild variant="admin">
                  <Link href="/admin/artworks/new">Ajouter une oeuvre</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
