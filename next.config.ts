import type { NextConfig } from "next";

// Near-duplicate posts folded into the strongest article in each cluster. Google was
// parking these as a pattern rather than crawling them; keys must stay in sync with
// the RETIRED map used to prune content/posts.json.
const RETIRED_POSTS: Record<string, string> = {
  'appliance-reset-after-power-outage-connecticut':
    'appliance-power-outage-guide-connecticut-storm-season',
  'stop-unplugging-appliances-during-storm':
    'appliance-power-outage-guide-connecticut-storm-season',
  'dishwasher-soap-wont-dissolve-winter-connecticut-cold-water':
    'dishwasher-dishes-wet-cold-water-winter-connecticut',
  'smart-appliances-2026-what-to-know': 'smart-appliance-repair-costs-2026',
  'washing-machine-vibration-bearing-wear-drain-pump-failure':
    'washing-machine-vibration-uneven-floors-connecticut',
  'ice-maker-fails-spring-connecticut-water-pressure': 'ice-maker-not-actually-broken',
};

// HSTS is set by the host (Vercel). Everything else has to come from here.
const SECURITY_HEADERS = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.12.173'],
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return [
      ...Object.entries(RETIRED_POSTS).map(([from, to]) => ({
        source: `/blog/${from}`,
        destination: `/blog/${to}`,
        permanent: true,
      })),
      // Linked from older blog copy before the /services hub existed.
      {
        source: '/dishwasher-repair',
        destination: '/services/dishwasher-repair',
        permanent: true,
      },
      // The state-level URL has no page of its own; Bergen County is the NJ hub.
      {
        source: '/new-jersey',
        destination: '/new-jersey/bergen-county',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Optimized images are immutable per source hash; 31 days keeps CDN hits warm
    // across deploys instead of re-encoding on every cold edge.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
