"use client";

import { LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export function SubmitButton({
  children,
  variant = "primary",
  className
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "buy" | "admin";
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant={variant} className={className} disabled={pending}>
      {pending ? <LoaderCircle className="animate-spin" size={16} /> : null}
      {children}
    </Button>
  );
}
