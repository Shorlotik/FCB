import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  selected?: boolean;
};

export function Chip({
  className,
  selected,
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm font-medium transition-[color,background,border,transform] duration-motion focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-start",
        selected
          ? "border-brand-start bg-brand-start/12 text-ink shadow-sm"
          : "border-ink/12 text-sub hover:-translate-y-px hover:border-ink/28 hover:text-ink",
        className,
      )}
      {...props}
    />
  );
}
