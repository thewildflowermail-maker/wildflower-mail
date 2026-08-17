import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/Container";
import { SocialIcons } from "./SocialIcons";
import { brand, nav, footerLinks } from "@/lib/config/site-config";
import { currentYear } from "@/lib/utils/format";

const infoLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Shipping & Returns", href: "/shipping-cancellation-refund" },
];

/**
 * Editorial, column-organized footer. Per the 2026.5 color-balance
 * correction: the footer is one of the largest single-color shapes on the
 * page, so it moves off solid olive/sage onto a deep, moody aubergine-berry
 * — grounded and quiet like the back of a nice piece of stationery, but
 * pulling from the site's "berry" accent family instead of green.
 */
export function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-aubergine">
      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          <div>
            <Logo tone="ivory" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/65">{brand.tagline}</p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ivory/50">Explore</p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-ivory/75 hover:text-ivory">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ivory/50">Info</p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {infoLinks.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-ivory/75 hover:text-ivory">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ivory/50">Let&rsquo;s Connect</p>
            <a href={`mailto:${brand.supportEmail}`} className="mt-4 block text-sm text-ivory/75 hover:text-ivory">
              {brand.supportEmail}
            </a>
            <SocialIcons items={footerLinks.social} className="mt-4 text-ivory/55" />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-ivory/15 pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-ivory/50">© {currentYear()} The Wildflower Mail. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
