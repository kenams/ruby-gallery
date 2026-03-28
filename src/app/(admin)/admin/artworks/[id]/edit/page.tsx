import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { ArtworkForm } from "@/components/admin/artwork-form";
import { requireAdmin } from "@/lib/auth";
import { getArtworkById } from "@/lib/data";

export default async function EditArtworkPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const artwork = await getArtworkById(id);

  if (!artwork) {
    notFound();
  }

  return (
    <AdminShell
      title={`Modifier ${artwork.title}`}
      description="Mise a jour du contenu, du pricing, des images, du statut, de l'ordre d'affichage et du SEO dans une interface pensee comme un mini CMS."
    >
      <ArtworkForm artwork={artwork} />
    </AdminShell>
  );
}
