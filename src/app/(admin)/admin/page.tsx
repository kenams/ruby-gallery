import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/auth";

const quickLinks = [
  {
    title: "Bienvenue Admin",
    body: "Le login de test est actif. Tu peux maintenant acceder aux sections admin de facon immediate.",
    href: "/admin"
  },
  {
    title: "Gerer les oeuvres",
    body: "Ajouter, modifier ou organiser les tableaux de Ruby depuis l'administration.",
    href: "/admin/artworks"
  },
  {
    title: "Parametres du site",
    body: "Mettre a jour les textes, le hero, les coordonnees et les informations publiques.",
    href: "/admin/settings"
  },
  {
    title: "Voir le site public",
    body: "Verifier le rendu final de la galerie, de la home et des fiches oeuvre.",
    href: "/gallery"
  }
];

export default async function AdminDashboardPage() {
  await requireAdmin();

  return (
    <AdminShell
      title="Bienvenue Admin"
      description="Acces admin simple, stable et immediat. Cette page reste accessible meme si la base est en cours de configuration."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {quickLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="admin-panel transition hover:-translate-y-px hover:border-ruby/20"
          >
            <p className="text-fine text-ruby/80">{item.title}</p>
            <p className="mt-4 text-sm leading-7 text-ink/68">{item.body}</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
