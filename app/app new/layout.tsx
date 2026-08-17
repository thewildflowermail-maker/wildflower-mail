import type { Metadata } from "next";
import { Fraunces, Inter, Caveat, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { brand, featureFlags } from "@/lib/config/site-config";

// Fraunces — a high-contrast, highly legible display serif with real
// character (soft ink-trap curves, subtle optical sizing) that reads as
// "tactile stationery" rather than a generic web-safe serif. Replaces
// Cormorant Garamond per the "Artist's Lens" design-token refresh; Inter
// stays as the body font since it already satisfies the brief's request
// for a clean, accessible sans-serif.
const heading = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const script = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-script",
  display: "swap",
});

// Logo wordmark font — swapped from the handwritten script (still used for
// the About Wildflower body copy) to Cormorant Garamond Light per the
// "more elegant/feminine" request. Light weight + italic reads as a
// refined stationery-brand logotype rather than a generic web font, while
// staying far more legible at small sizes than a full script face.
const logo = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "500"],
  style: ["italic", "normal"],
  variable: "--font-logo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Wildflower Mail | A Monthly Snail-Mail Subscription for Mothers",
    template: "%s | Wildflower Mail",
  },
  description:
    "A thoughtful monthly letter created for mothers, featuring heartfelt words, reflection prompts, keepsake paper goods, and a curated playlist delivered by mail.",
  openGraph: {
    title: "Wildflower Mail | A Monthly Snail-Mail Subscription for Mothers",
    description:
      "A thoughtful monthly letter created for mothers, featuring heartfelt words, reflection prompts, keepsake paper goods, and a curated playlist delivered by mail.",
    siteName: brand.name,
    type: "website",
    images: [{ url: "/images/placeholders/social-share-placeholder.svg" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} ${script.variable} ${logo.variable}`}>
      <body className="font-sans antialiased">
        {children}

        {/* Google Analytics 4 — inactive until an ID is configured */}
        {featureFlags.gaEnabled && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

        {/* Meta Pixel — inactive until an ID is configured */}
        {featureFlags.metaPixelEnabled && (
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
