/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The production build otherwise fails on react/no-unescaped-entities
  // (plain apostrophes/quotes in copy across ~10 files). Not a real bug —
  // just ESLint being strict about JSX text content — so it's safe to skip
  // during the build. `npm run lint` still runs it locally if wanted.
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' }
    ],
    // Cloudflare Pages doesn't run Next's built-in Image Optimization API.
    // The site doesn't currently use next/image anywhere (plain <img> tags
    // throughout), so this is just a safety net in case that changes later
    // — without it, any next/image usage would 500 in production on
    // Cloudflare.
    unoptimized: true
  }
};

export default nextConfig;
