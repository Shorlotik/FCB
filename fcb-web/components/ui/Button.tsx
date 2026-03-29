import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
};

export function Button({
  className,
  variant = "primary",
  href,
  children,
  ...props
}: Props) {
  const styles = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-[transform,box-shadow,background] duration-motion focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-start",
    variant === "primary" &&
      "bg-ink text-elevated shadow-soft hover:-translate-y-0.5 hover:shadow-[0_20px_48px_-16px_rgb(0_180_255/0.35),0_20px_40px_-18px_rgb(0_0_0/0.5),0_0_0_1px_rgb(255_255_255/0.08)_inset]",
    variant === "secondary" &&
      "border border-ink/12 bg-elevated/90 text-ink backdrop-blur-sm hover:border-ink/25 hover:bg-elevated",
    variant === "ghost" && "text-ink hover:bg-ink/5",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={styles} {...props}>
      {children}
    </button>
  );
}
