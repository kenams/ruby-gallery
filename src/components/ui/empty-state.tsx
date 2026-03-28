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
    <div className="public-panel rounded-[2.2rem] px-7 py-14 text-center">
      <p className="quiet-kicker">Accrochage</p>
      <h3 className="mt-5 font-display text-[2.8rem] leading-[0.96] tracking-[-0.04em] text-ink">{title}</h3>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-ink/66">{description}</p>
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
