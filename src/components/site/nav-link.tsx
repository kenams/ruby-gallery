"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "lux-nav relative py-2",
        isActive ? "text-ink" : "text-ink/60 hover:text-ink"
      )}
    >
      {label}
      <span
        className={cn(
          "lux-nav-line absolute bottom-0 left-0 h-px transition-all duration-300",
          isActive ? "w-full" : "w-0"
        )}
      />
    </Link>
  );
}
