import { AdminShell } from "@/components/admin/admin-shell";
import { ArtworkForm } from "@/components/admin/artwork-form";
import { requireAdmin } from "@/lib/auth";

export default async function NewArtworkPage() {
  await requireAdmin();

  return (
    <AdminShell
      title="Ajouter une nouvelle oeuvre."
      description="Une fiche claire pour ajouter l'image principale, les vues detail, le prix, le statut, l'ordre d'affichage et les informations de vente sans interface technique inutile."
    >
      <ArtworkForm />
    </AdminShell>
  );
}
