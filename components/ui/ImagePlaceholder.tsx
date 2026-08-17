import { cn } from "@/lib/utils/format";

/**
 * Neutral, clearly-labeled placeholder for photography that has not been
 * shot/uploaded yet. Replace with a real <Image> once assets are ready —
 * search the codebase for <ImagePlaceholder to find every spot that needs one.
 */
export function ImagePlaceholder({
  label,
  ratio = "aspect-[4/5]",
  className,
}: {
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder image: ${label}`}
      className={cn(
        ratio,
        "flex items-center justify-center rounded-sm border border-dashed border-olive/30 bg-[repeating-linear-gradient(135deg,rgba(62,70,54,0.04)_0px,rgba(62,70,54,0.04)_2px,transparent_2px,transparent_10px)] p-6 text-center",
        className
      )}
    >
      <span className="font-sans text-xs uppercase tracking-wide text-olive/60">
        Photography placeholder — {label}
      </span>
    </div>
  );
}
