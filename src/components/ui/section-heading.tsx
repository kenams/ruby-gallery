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
      <p className="quiet-kicker">{eyebrow}</p>
      <h2 className="section-title mt-5 max-w-[12ch]">
        {title}
      </h2>
      {description ? (
        <p className="section-copy mt-5 max-w-2xl">{description}</p>
      ) : null}
    </div>
  );
}
