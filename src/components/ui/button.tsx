import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "buy" | "admin";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-ink text-pearl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-px hover:bg-[#241c1b] focus-visible:outline-ink",
  secondary:
    "border border-ink/10 bg-pearl/90 text-ink hover:-translate-y-px hover:border-bronze/35 hover:bg-white hover:text-ruby focus-visible:outline-bronze",
  ghost:
    "border border-black/10 bg-white/45 text-ink/72 hover:-translate-y-px hover:border-ruby/20 hover:bg-white hover:text-ink focus-visible:outline-ink",
  buy:
    "border border-ruby/20 bg-ruby text-pearl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-px hover:bg-[#69242e] focus-visible:outline-ruby",
  admin:
    "border border-black/10 bg-white text-ink shadow-[0_12px_32px_rgba(23,19,17,0.06)] hover:-translate-y-px hover:border-ruby/25 hover:bg-[#fffaf6] hover:text-ruby focus-visible:outline-ruby"
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: ButtonVariant;
};

export function Button({
  className,
  asChild,
  variant = "primary",
  children,
  ...props
}: Props) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium tracking-[0.08em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
