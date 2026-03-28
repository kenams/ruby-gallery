import Link from "next/link";
import { LayoutGrid, LogOut, PaintbrushVertical, Rows3, Settings2 } from "lucide-react";

import { AdminNavLink } from "@/components/admin/admin-nav-link";
import { getSiteSettings } from "@/lib/site-settings";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutGrid },
  { href: "/admin/artworks", label: "Oeuvres", icon: PaintbrushVertical },
  { href: "/admin/settings", label: "Parametres", icon: Settings2 },
  { href: "/gallery", label: "Site public", icon: Rows3 }
];

export async function AdminShell({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,250,245,1)_0%,rgba(244,239,232,1)_45%,rgba(240,233,225,1)_100%)]">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-8 px-5 py-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="admin-surface h-fit rounded-[2rem] p-5 lg:sticky lg:top-6">
          <div className="border-b border-black/6 pb-5">
            <p className="font-display text-3xl text-ink">{settings.artistName}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.28em] text-ink/45">Admin studio</p>
            <p className="mt-4 text-sm leading-7 text-ink/62">
              Un back-office simple pour gerer les oeuvres et le contenu public sans interface technique.
            </p>
          </div>

          <nav className="mt-6 grid gap-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <AdminNavLink key={href} href={href}>
                <Icon size={16} />
                {label}
              </AdminNavLink>
            ))}
          </nav>

          <form action="/api/admin/logout" method="POST" className="mt-8 border-t border-black/6 pt-5">
            <button
              type="submit"
              className="inline-flex items-center gap-3 rounded-[1.25rem] border border-black/10 bg-white/70 px-4 py-3 text-sm text-ink/62 transition hover:border-ruby/20 hover:bg-white hover:text-ruby"
            >
              <LogOut size={16} />
              Deconnexion
            </button>
          </form>
        </aside>

        <main>
          <div className="admin-surface rounded-[2rem] p-6 md:p-8">
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-ruby/80">Administration</p>
            <h1 className="mt-4 font-display text-5xl leading-none tracking-hero text-ink">{title}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/70">{description}</p>
          </div>

          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
