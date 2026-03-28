import Link from "next/link";

import { MobileMenu } from "@/components/site/mobile-menu";
import { NavLink } from "@/components/site/nav-link";
import { Logo } from "@/components/site/logo";
import { navigation, siteConfig } from "@/lib/site";
import { getSiteSettings } from "@/lib/site-settings";

export async function Header() {
  const settings = await getSiteSettings();
  const locationLabel = settings.location || siteConfig.location;

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f8f2ea] backdrop-blur-2xl" style={{ backgroundColor: "rgba(248, 242, 234, 0.84)" }}>
      <div className="mx-auto hidden max-w-7xl items-center justify-between px-5 py-2 text-[0.64rem] uppercase tracking-[0.32em] text-ink/42 md:flex md:px-8">
        <span>{locationLabel}</span>
        <span>{siteConfig.baseline}</span>
      </div>
      <div className="mx-auto flex h-[5.3rem] w-full max-w-7xl items-center justify-between px-5 md:px-8">
        <Logo artistName={settings.artistName} />

        <nav className="hidden items-center gap-10 lg:flex">
          {navigation.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/gallery" className="lux-button">
            Voir les oeuvres
          </Link>
        </div>

        <MobileMenu artistName={settings.artistName} />
      </div>
    </header>
  );
}
