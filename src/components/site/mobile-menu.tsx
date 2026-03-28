"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { navigation } from "@/lib/site";
import { NavLink } from "@/components/site/nav-link";

export function MobileMenu({ artistName = "Ruby" }: { artistName?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Ouvrir le menu"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/70 text-ink transition hover:border-ruby/30 hover:text-ruby"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-[#141111]/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute inset-x-0 top-16 z-50 rounded-[2rem] border border-ink/10 bg-pearl/95 p-5 shadow-veil backdrop-blur"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 flex items-center justify-between border-b border-black/6 pb-4">
                <p className="text-fine text-ruby/75">Navigation</p>
                <span className="text-xs text-ink/45">{artistName}</span>
              </div>
              <nav className="grid gap-3">
                {navigation.map((item) => (
                  <div key={item.href} onClick={() => setOpen(false)} className="rounded-2xl px-2 py-1">
                    <NavLink href={item.href} label={item.label} />
                  </div>
                ))}
                <Link
                  href="/gallery"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-full border border-ink/10 bg-ink px-4 py-3 text-center text-sm tracking-[0.08em] text-pearl"
                >
                  Entrer dans la galerie
                </Link>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
