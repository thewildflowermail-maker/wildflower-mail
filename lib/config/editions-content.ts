import type { Edition } from "@/components/marketing/EditionCard";

/**
 * SAMPLE CONTENT — these are placeholder past editions used to demonstrate
 * the archive layout. Replace with real editions (ideally sourced from the
 * `monthly_editions` Supabase table via the admin dashboard) before launch.
 */
export const sampleEditions: Edition[] = [
  {
    slug: "the-becoming-edition",
    name: "The Becoming Edition",
    monthYear: "July 2026",
    description: "A gentle reminder that growth does not always look dramatic.",
    playlistUrl: "https://open.spotify.com/",
    availability: "available",
  },
  {
    slug: "soft-beginnings",
    name: "Soft Beginnings",
    monthYear: "June 2026",
    description: "For the early, tender weeks of any new season of motherhood.",
    playlistUrl: "https://open.spotify.com/",
    availability: "sold-out",
  },
  {
    slug: "enough-for-today",
    name: "Enough for Today",
    monthYear: "May 2026",
    description: "On letting today's version of enough be enough.",
    playlistUrl: "https://open.spotify.com/",
    availability: "archived",
  },
  {
    slug: "returning-to-yourself",
    name: "Returning to Yourself",
    monthYear: "April 2026",
    description: "A quiet invitation back to the parts of you that existed before.",
    playlistUrl: "https://open.spotify.com/",
    availability: "archived",
  },
  {
    slug: "the-slow-summer-edition",
    name: "The Slow Summer Edition",
    monthYear: "March 2026",
    description: "On unhurried days, even when the calendar says otherwise.",
    playlistUrl: "https://open.spotify.com/",
    availability: "archived",
  },
  {
    slug: "where-you-are-planted",
    name: "Where You Are Planted",
    monthYear: "February 2026",
    description: "Finding steadiness in the season you're actually in.",
    playlistUrl: "https://open.spotify.com/",
    availability: "archived",
  },
];
