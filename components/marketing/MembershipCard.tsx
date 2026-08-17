import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/format";

export function MembershipCard({
  eyebrow,
  name,
  price,
  cadence,
  features,
  ctaLabel,
  ctaHref,
  note,
  featured,
}: {
  eyebrow: string;
  name: string;
  price: string;
  cadence: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  note?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-sm border p-8",
        featured ? "border-olive bg-olive text-paper" : "border-olive/20 bg-paper text-charcoal"
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.2em]",
          featured ? "text-beige" : "text-clay"
        )}
      >
        {eyebrow}
      </p>
      <h3 className={cn("mt-3 font-serif text-2xl font-medium", featured ? "text-paper" : "text-olive")}>
        {name}
      </h3>
      <p className="mt-4">
        <span className="font-serif text-4xl font-medium">{price}</span>{" "}
        <span className={cn("text-sm", featured ? "text-paper/75" : "text-charcoal/60")}>{cadence}</span>
      </p>
      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm leading-relaxed">
            <span aria-hidden="true" className={featured ? "text-beige" : "text-sage"}>
              ✦
            </span>
            <span className={featured ? "text-paper/90" : "text-charcoal/85"}>{f}</span>
          </li>
        ))}
      </ul>
      <Button
        href={ctaHref}
        variant={featured ? "secondary" : "primary"}
        className={cn("mt-8", featured && "border-paper text-paper hover:bg-paper hover:text-olive")}
      >
        {ctaLabel}
      </Button>
      {note && (
        <p className={cn("mt-3 text-xs leading-relaxed", featured ? "text-paper/70" : "text-charcoal/60")}>
          {note}
        </p>
      )}
    </div>
  );
}
