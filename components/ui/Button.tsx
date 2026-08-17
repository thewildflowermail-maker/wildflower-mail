import Link from "next/link";
import { cn } from "@/lib/utils/format";

type BaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
};

type ButtonAsLink = BaseProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

const base =
  "inline-flex items-center justify-center gap-2 rounded font-sans font-medium tracking-wide transition-colors duration-250 focus-visible:outline-2 disabled:opacity-50 disabled:pointer-events-none";

// 2026.5 color-balance correction: the primary action color moves off
// olive onto the site's deep berry/raspberry tone (sage/olive is now an
// accent, not the brand's dominant action color) — applied here so every
// primary button sitewide (not just the homepage) stays consistent.
const variants: Record<string, string> = {
  primary: "bg-raspberry text-paper hover:bg-charcoal",
  secondary: "bg-transparent border border-raspberry text-raspberry hover:bg-raspberry hover:text-paper",
  ghost: "bg-transparent text-raspberry underline underline-offset-4 hover:text-clay",
};

const sizes: Record<string, string> = {
  md: "px-6 py-3 text-sm min-h-[44px]",
  lg: "px-8 py-4 text-base min-h-[48px]",
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", size = "md", className } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href, variant: _v, size: _s, className: _c, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
