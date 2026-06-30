import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "light";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-out will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-blue text-white-warm shadow-[0_10px_30px_-10px_rgba(0,74,146,0.6)] hover:bg-brand-orange hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(240,144,26,0.5)]",
  ghost:
    "border border-line text-ink hover:border-brand-blue hover:text-brand-blue hover:-translate-y-0.5",
  light:
    "bg-white-warm text-brand-blue hover:bg-brand-leaf hover:text-ink hover:-translate-y-0.5",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  external,
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  external?: boolean;
}) {
  const sizing = size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm";
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${sizing} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
    >
      {children}
    </a>
  );
}
