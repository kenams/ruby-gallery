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
        "relative py-2 text-sm transition",
        isActive ? "text-ink" : "text-ink/66 hover:text-ruby"
      )}
    >
      {label}
      <span
        className={cn(
          "absolute bottom-0 left-0 h-px bg-ruby/60 transition-all duration-300",
          isActive ? "w-full" : "w-0"
        )}
      />
    </Link>
  );
}
