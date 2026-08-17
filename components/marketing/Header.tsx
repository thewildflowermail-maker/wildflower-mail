"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { SocialIcons } from "./SocialIcons";
import { Container } from "@/components/ui/Container";
import { nav, footerLinks } from "@/lib/config/site-config";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-ivory/95 backdrop-blur">
      <Container className="flex h-[88px] items-center justify-between gap-6 lg:h-[100px]">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium uppercase tracking-[0.14em] text-charcoal/70 hover:text-clay transition-colors duration-250"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <SocialIcons items={footerLinks.social} className="text-charcoal/45" />
          <Link
            href="#choose-your-mail"
            className="inline-flex items-center justify-center rounded-full bg-raspberry px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ivory transition-colors duration-250 hover:bg-charcoal"
          >
            Join Now
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-sm text-charcoal"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </Container>

      {open && (
        <div id="mobile-menu" className="lg:hidden border-t border-charcoal/10 bg-ivory">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm px-2 py-3 text-base font-medium text-charcoal hover:bg-cream"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#choose-your-mail"
              className="mt-4 inline-flex self-start rounded-full bg-raspberry px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ivory"
            >
              Join Now
            </Link>
            <SocialIcons items={footerLinks.social} className="mt-4 px-2 text-charcoal/45" />
          </Container>
        </div>
      )}
    </header>
  );
}
