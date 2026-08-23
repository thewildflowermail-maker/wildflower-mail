import { cn } from "@/lib/utils/format";

type SocialLink = { label: string; href: string; placeholder?: boolean };

// Sized at 22px, matching the previous hand-drawn icon set.
const ICON_SIZE = 22;

// Real platform logo PNGs (uploaded by the user), stored in
// public/images/social/. These are solid black-on-transparent images, so
// (unlike the old inline SVGs, which used stroke="currentColor") they
// can't naturally pick up the surrounding text color on their own. To
// keep the same "goes dark in the light header, goes light in the dark
// footer" behavior as before, each icon is rendered as a CSS mask - a
// technique where the PNG's shape is used as a stencil and
// `background-color: currentColor` is painted through it. That's what
// lets a single black source image still automatically become
// ivory-colored in the footer and charcoal-colored in the header,
// matching whatever `text-*` class is passed in via `className`.
const ICON_SRC: Record<string, string> = {
  Instagram: "/images/social/instagram.png",
  Facebook: "/images/social/facebook.png",
  TikTok: "/images/social/tiktok.png",
};

/**
 * Small, tasteful social icons - used in the header (desktop) and footer.
 * Intentionally minimal: icon only, no labels, no heavy buttons.
 */
export function SocialIcons({ items, className }: { items: SocialLink[]; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {items.map((item) => {
        const src = ICON_SRC[item.label];
        if (!src) return null;
        return (
          <a
            key={item.label}
            href={item.href}
            aria-label={item.label}
            className="opacity-70 transition-opacity duration-250 hover:opacity-100"
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: ICON_SIZE,
                height: ICON_SIZE,
                backgroundColor: "currentColor",
                WebkitMaskImage: `url(${src})`,
                maskImage: `url(${src})`,
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          </a>
        );
      })}
    </div>
  );
}
