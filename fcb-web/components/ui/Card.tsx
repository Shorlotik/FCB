import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";

type Props = ComponentProps<"div"> & {
  /** Default true: lift on hover. Set false for static surfaces (e.g. forms). */
  interactive?: boolean;
};

export function Card({
  className,
  interactive = true,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] border border-ink/[0.08] bg-elevated p-6 shadow-card transition-[transform,box-shadow] duration-motion",
        interactive && "hover:-translate-y-0.5 hover:shadow-soft",
        className,
      )}
      {...props}
    />
  );
}
