import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "onDark";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-water text-on-accent hover:bg-water-deep",
  outline: "border-line text-ink hover:border-leaf hover:text-leaf",
  onDark:
    "border-white/45 text-white hover:border-white hover:bg-white hover:text-ink",
};

export function Button({
  href,
  variant = "solid",
  arrow = false,
  children,
}: {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
}) {
  return (
    <a href={href} className={`pill ${VARIANTS[variant]}`}>
      {children}
      {arrow && (
        <span className="pill-arrow" aria-hidden="true">
          →
        </span>
      )}
    </a>
  );
}
