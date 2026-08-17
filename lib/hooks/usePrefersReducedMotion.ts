"use client";

import { useEffect, useState } from "react";

/**
 * Reads the user's OS-level reduced-motion preference and keeps it in sync
 * if they change it while the page is open (e.g. via System Settings).
 * Returns `false` during server render / before hydration so there's never
 * a mismatch — the real value is picked up on mount, before any animated
 * effect (ScrollReveal, TactileZoomModal, etc.) ever fires.
 *
 * Shared by every component that needs to gate a transition/animation
 * behind `prefers-reduced-motion`, so the read/listen logic lives in one
 * place instead of being copy-pasted per component.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
