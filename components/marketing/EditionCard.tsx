import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/format";

export type Edition = {
  slug: string;
  name: string;
  monthYear: string;
  description: string;
  playlistUrl?: string;
  availability: "available" | "sold-out" | "archived";
};

export function EditionCard({ edition }: { edition: Edition }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-sm border border-olive/15 bg-paper">
      <ImagePlaceholder label={`${edition.name} flat lay`} ratio="aspect-[4/3]" className="rounded-none border-0 border-b" />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">{edition.monthYear}</p>
        <h3 className="mt-2 font-serif text-xl font-medium text-olive">{edition.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/80">{edition.description}</p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span
            className={cn(
              "inline-flex items-center rounded-sm px-3 py-1 text-xs font-medium",
              edition.availability === "available" && "bg-sage/20 text-olive",
              edition.availability === "sold-out" && "bg-rose/20 text-[#6b3a30]",
              edition.availability === "archived" && "bg-charcoal/10 text-charcoal/60"
            )}
          >
            {edition.availability === "available" && "Available"}
            {edition.availability === "sold-out" && "Sold Out"}
            {edition.availability === "archived" && "Archived"}
          </span>
          {edition.playlistUrl && (
            <a href={edition.playlistUrl} className="text-xs font-medium text-olive underline underline-offset-4 hover:text-clay">
              Playlist ↗
            </a>
          )}
        </div>

        {edition.availability === "available" && (
          <Button href="/membership" size="md" variant="secondary" className="mt-5">
            Purchase This Edition
          </Button>
        )}
      </div>
    </article>
  );
}
