import { cn } from "@/lib/utils/format";

type SocialLink = { label: string; href: string; placeholder?: boolean };

// Sized at 22px (up from 18px) per the "make the icons a little bigger"
// request — still the same thin, outline-only line-icon language as the
// rest of the brand mark set (no filled/solid platform logos).
const ICON_SIZE = 22;

const ICONS: Record<string, JSX.Element> = {
  Instagram: (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" />
    </svg>
  ),
  Pinterest: (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M9 18c1-3 1.5-5.5 2-8.5.3-2 3.5-2.3 4-.2.3 1.4-.6 3.7-1 5-.3 1.1.4 2 1.6 2 2 0 3.4-2.6 3.4-5.6 0-2.9-2.4-5.1-5.5-5.1-3.8 0-6 2.8-6 5.7 0 1.1.4 2.3 1 3" />
    </svg>
  ),
  Facebook: (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M13.6 8.2h-1.1c-.9 0-1.6.7-1.6 1.6v1.7H9.3v2.1h1.6V18h2.1v-4.4h1.6l.3-2.1h-1.9v-1.4c0-.4.3-.7.7-.7h1.2V8.2z" />
    </svg>
  ),
  TikTok: (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M13.8 4.2v10.4a3.3 3.3 0 1 1-3.3-3.3c.3 0 .6 0 .9.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.8 4.2c.3 2.1 1.9 3.7 4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/**
 * Small, tasteful social icons — used in the header (desktop) and footer.
 * Intentionally minimal: icon only, no labels, no heavy buttons.
 */
export function SocialIcons({ items, className }: { items: SocialLink[]; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          aria-label={item.label}
          className="opacity-70 transition-opacity duration-250 hover:opacity-100"
        >
          {ICONS[item.label] ?? null}
        </a>
      ))}
    </div>
  );
}
