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

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
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
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
