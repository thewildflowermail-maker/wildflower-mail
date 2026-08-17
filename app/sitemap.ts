import type { MetadataRoute } from "next";

const routes = [
  "",
  "/how-it-works",
  "/membership",
  "/gift",
  "/about",
  "/past-editions",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
  "/shipping-cancellation-refund",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
