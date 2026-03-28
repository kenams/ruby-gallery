import { AdminShell } from "@/components/admin/admin-shell";
import { SiteSettingsForm } from "@/components/admin/site-settings-form";
import { Notice } from "@/components/ui/notice";
import { requireAdmin } from "@/lib/auth";
import { getSiteSettings } from "@/lib/site-settings";

export default async function AdminSettingsPage({
  searchParams
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdmin();
  const { saved } = await searchParams;
  const settings = await getSiteSettings();

  return (
    <AdminShell
      title="Parametres du site"
      description="Modifie ici le contenu d'accueil, la bio, les informations de contact et les textes qui alimentent le site public."
    >
      <div className="grid gap-5">
        {saved ? <Notice tone="success">Les parametres du site ont ete enregistres avec succes.</Notice> : null}
        <SiteSettingsForm settings={settings} />
      </div>
    </AdminShell>
  );
}
