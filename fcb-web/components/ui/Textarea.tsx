import { cn } from "@/lib/cn";
import { forwardRef, type ComponentProps } from "react";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<"textarea">
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[140px] w-full resize-y rounded-[var(--radius-md)] border border-ink/12 bg-elevated px-4 py-3 text-ink placeholder:text-sub transition-shadow focus:border-brand-start focus:outline-none focus:ring-2 focus:ring-brand-start/35 focus:shadow-[0_0_0_4px_rgb(0_180_255/0.12)]",
        className,
      )}
      {...props}
    />
  );
});
