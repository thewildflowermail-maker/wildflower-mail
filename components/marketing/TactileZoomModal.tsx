"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

export type TactileDetail = {
  name: string;
  paperWeight?: string;
  finish?: string;
  /** Hex swatch used to render the magnified paper-grain close-up. */
  swatch: string;
  /** Hex text color that reads legibly on top of `swatch`. */
  textColor: string;
};

/**
 * A focused, high-resolution-feeling close-up of a stamp's paper: a large
 * swatch of its color at a coarser, more visible grain than the small card
 * ever shows, plus its tactile details (paper weight, finish). This is a
 * simulated "zoom" — the same feTurbulence noise technique used for
 * .paper-grain sitewide, just rendered bigger and more visible — rather
 * than a real photographed macro shot, since no such photography exists
 * yet for these plans.
 */
export function TactileZoomModal({
  detail,
  onClose,
}: {
  detail: TactileDetail | null;
  onClose: () => void;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = detail !== null;

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);

    // Prevent the page from scrolling behind the modal while it's open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Paper texture detail for ${detail.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
    >
      <button
        type="button"
        aria-label="Close paper texture detail"
        onClick={onClose}
        className="absolute inset-0 bg-charcoal/55"
      />
      <div
        className={
          "paper-grain paper-grain-heavy paper-shadow relative w-full max-w-sm overflow-hidden rounded-2xl" +
          (prefersReducedMotion ? "" : " fade-in-up")
        }
        style={{ backgroundColor: detail.swatch }}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-paper/85 text-charcoal shadow-warm-sm transition-colors duration-150 hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative flex h-56 items-center justify-center px-6 text-center sm:h-64">
          <p
            className="relative font-serif text-2xl font-semibold leading-tight sm:text-3xl"
            style={{ color: detail.textColor }}
          >
            {detail.name}
          </p>
        </div>

        <div className="relative border-t border-charcoal/10 bg-paper px-6 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-clay/70">
            Tactile details
          </p>
          <dl className="mt-3 space-y-2">
            {detail.paperWeight && (
              <div className="flex items-center justify-between gap-4">
                <dt className="font-sans text-sm text-muted-aaa">Paper</dt>
                <dd className="font-sans text-sm font-medium text-charcoal">{detail.paperWeight}</dd>
              </div>
            )}
            {detail.finish && (
              <div className="flex items-center justify-between gap-4">
                <dt className="font-sans text-sm text-muted-aaa">Finish</dt>
                <dd className="font-sans text-sm font-medium text-charcoal">{detail.finish}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
