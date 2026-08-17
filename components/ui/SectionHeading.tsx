import { cn } from "@/lib/utils/format";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "text-center mx-auto max-w-2xl" : "text-left", className)}>
      {eyebrow && (
        <p className="mb-3 text-xs font-sans font-semibold uppercase tracking-[0.2em] text-clay">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl font-medium leading-tight text-olive">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-charcoal/85">
          {description}
        </p>
      )}
    </div>
  );
}
