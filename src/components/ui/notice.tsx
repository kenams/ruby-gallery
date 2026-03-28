import { AlertCircle, CheckCircle2, Info } from "lucide-react";

import { cn } from "@/lib/utils";

export function Notice({
  tone = "info",
  children,
  className
}: {
  tone?: "info" | "success" | "error";
  children: React.ReactNode;
  className?: string;
}) {
  const Icon = tone === "success" ? CheckCircle2 : tone === "error" ? AlertCircle : Info;

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-[1.5rem] border px-4 py-4 text-sm leading-7 shadow-[0_10px_30px_rgba(23,19,17,0.03)]",
        tone === "success" && "border-emerald-600/12 bg-[linear-gradient(180deg,rgba(244,252,247,1)_0%,rgba(236,249,240,1)_100%)] text-emerald-900",
        tone === "error" && "border-ruby/10 bg-[linear-gradient(180deg,rgba(255,246,247,1)_0%,rgba(255,239,241,1)_100%)] text-ruby",
        tone === "info" && "border-black/10 bg-[linear-gradient(180deg,rgba(251,246,240,0.96)_0%,rgba(246,240,233,0.92)_100%)] text-ink/74",
        className
      )}
    >
      <Icon size={18} className="mt-1 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
