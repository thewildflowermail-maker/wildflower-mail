import { Container } from "@/components/ui/Container";
import { BotanicalDivider } from "./BotanicalDivider";
import { cn } from "@/lib/utils/format";

const moods = {
  ivory: "bg-ivory",
  blush: "bg-blush/40",
  sage: "bg-sage/20",
  oatmeal: "bg-oatmeal",
  lavender: "bg-lavender/35",
} as const;

export function PageHero({
  eyebrow,
  title,
  description,
  mood = "ivory",
  note,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  mood?: keyof typeof moods;
  note?: string;
}) {
  return (
    <section className={cn("paper-grain relative border-b border-olive/10 py-16 sm:py-24", moods[mood])}>
      <Container className="max-w-3xl">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">{eyebrow}</p>
        )}
        <h1 className="font-serif text-4xl sm:text-5xl font-medium leading-tight text-olive">{title}</h1>
        {description && (
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal/85">{description}</p>
        )}
        {note && <p className="handwritten-note mt-5 text-2xl text-clay">{note}</p>}
        <BotanicalDivider className="mt-10 justify-start" />
      </Container>
    </section>
  );
}
