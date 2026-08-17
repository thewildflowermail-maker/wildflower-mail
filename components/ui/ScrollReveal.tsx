"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils/format";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

/**
 * Wraps children so they gently fade + rise into place the first time they
 * scroll into view. Falls back to fully visible content if JavaScript
 * doesn't run (via the .reveal-on-scroll noscript-safe CSS in globals.css).
 *
 * Reduced motion is enforced in TWO layers, deliberately redundant:
 *  1. Here in JS — when prefers-reduced-motion is on, we skip setting up
 *     the IntersectionObserver entirely and render content fully visible
 *     immediately, with no transition-delay stagger.
 *  2. In globals.css — a `@media (prefers-reduced-motion: reduce)` override
 *     zeroes out the opacity/transform/transition as a safety net, in case
 *     this component ever renders before the effect below runs, or a
 *     future contributor adds a similar animated component without
 *     wiring up the JS check.
 */
export function ScrollReveal({
  children,
  className,
  delayMs = 0,
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: keyof JSX.IntrinsicElements;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Reduced motion: skip the observer, show content immediately, no
    // fade/rise and no staggered delay.
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const Component = Tag as any;

  return (
    <Component
      ref={ref}
      style={{
        ...style,
        transitionDelay: visible && !prefersReducedMotion ? `${delayMs}ms` : "0ms",
      }}
      className={cn(
        prefersReducedMotion ? "opacity-100" : "reveal-on-scroll",
        visible && !prefersReducedMotion && "is-visible",
        className
      )}
    >
      {children}
    </Component>
  );
}
