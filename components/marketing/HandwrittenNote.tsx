import { cn } from "@/lib/utils/format";

/**
 * A small floating handwritten-style annotation — the "made for your quiet
 * moments" / "open slowly" asides scattered through the page. Used
 * sparingly, per brand guidelines (script font for one or two decorative
 * words only, never for body copy).
 */
export function HandwrittenNote({
  children,
  tilt = "left",
  className,
}: {
  children: React.ReactNode;
  tilt?: "left" | "right";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "handwritten-note text-2xl sm:text-3xl text-clay",
        tilt === "right" && "tilt-right",
        className
      )}
    >
      {children}
    </p>
  );
}
