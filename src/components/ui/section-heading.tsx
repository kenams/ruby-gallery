import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-ruby/80">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl leading-none tracking-hero text-ink md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/70 md:text-base">{description}</p>
      ) : null}
    </div>
  );
}
