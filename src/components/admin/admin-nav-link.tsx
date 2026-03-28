"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function AdminNavLink({
  href,
  children
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const active =
    pathname === href ||
    (href !== "/admin" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-3 rounded-[1.25rem] px-4 py-3 text-sm transition",
        active
          ? "border border-ruby/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(251,244,239,0.95)_100%)] text-ruby shadow-[0_14px_30px_rgba(127,45,55,0.06)]"
          : "border border-transparent text-ink/68 hover:border-black/6 hover:bg-white/70 hover:text-ink"
      )}
    >
      {children}
    </Link>
  );
}
