/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' }
    ],
    unoptimized: true
  }
};

export default nextConfig;
