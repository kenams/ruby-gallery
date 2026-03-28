import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  href,
  cta
}: {
  title: string;
  description: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="rounded-[2rem] border border-ink/8 bg-white/70 px-6 py-12 text-center shadow-veil">
      <h3 className="font-display text-3xl text-ink">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ink/70">{description}</p>
      {href && cta ? (
        <div className="mt-6">
          <Button asChild variant="secondary">
            <a href={href}>{cta}</a>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
