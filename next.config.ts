import type { NextConfig } from "next";

// Near-duplicate posts folded into the strongest article in each cluster.
const RETIRED_POSTS: Record<string, string> = {
  'appliance-reset-after-power-outage-connecticut':
    'appliance-power-outage-guide-connecticut-storm-season',
  'stop-unplugging-appliances-during-storm':
    'appliance-power-outage-guide-connecticut-storm-season',
  'ice-maker-fails-spring-connecticut-water-pressure': 'ice-maker-not-actually-broken',
};

// Posts removed on 2026-11-26. Search Console showed Google indexing 7 of 37 posts; the
// rest were generated in batches and never earned a crawl. Each goes to the service page
// for its appliance (same mapping as getServiceSlugForPost), or to the blog index when it
// had none. Three earlier retirements whose targets are gone are listed first so they
// redirect in one hop. Do not re-publish these slugs; new posts get new URLs.
const REMOVED_POSTS: Record<string, string> = {
  'dishwasher-soap-wont-dissolve-winter-connecticut-cold-water': '/services/dishwasher-repair',
  'smart-appliances-2026-what-to-know': '/blog',
  'washing-machine-vibration-bearing-wear-drain-pump-failure': '/services/washer-repair',
  '2026-appliance-maintenance-checklist': '/blog',
  'ai-predictive-maintenance-2026': '/blog',
  'appliance-maintenance-saves-money-connecticut': '/blog',
  'appliance-odor-diagnosis-guide-ct-homeowners': '/blog',
  'garbage-disposal-jams-holiday-meals-connecticut': '/blog',
  'lower-energy-bill-appliance-tips-2026': '/blog',
  'microwave-maintenance-ignored-appliance': '/blog',
  'repair-vs-replace-guide-2025': '/blog',
  'smart-appliance-repair-costs-2026': '/blog',
  'water-heater-appliances-energy-bill-connecticut': '/blog',
  'common-dishwasher-problems': '/services/dishwasher-repair',
  'dishwasher-dishes-wet-cold-water-winter-connecticut': '/services/dishwasher-repair',
  'stop-running-dishwasher-on-hot-dry': '/services/dishwasher-repair',
  'connecticut-hard-water-appliance-damage-prevention': '/services/dryer-repair',
  'dryer-takes-longer-winter-connecticut-cold-weather': '/services/dryer-repair',
  'dryer-vent-fire-hazard-connecticut-homeowners-guide': '/services/dryer-repair',
  'stacking-washer-dryer-warranty-problems': '/services/dryer-repair',
  'washer-dryer-maintenance-tips': '/services/dryer-repair',
  'oven-safety-hazards-connecticut-holiday-cooking': '/services/oven-range-repair',
  'oven-self-clean-cycle-damage': '/services/oven-range-repair',
  'range-hood-fails-winter-connecticut-ventilation-problem': '/services/oven-range-repair',
  'stove-burners-wont-light-cheap-fix': '/services/oven-range-repair',
  'ac-refrigerator-energy-conflict-connecticut-summer': '/services/refrigerator-repair',
  'garage-freezer-problems-connecticut-extreme-temperatures': '/services/refrigerator-repair',
  'refrigerator-clicking-noise-causes-repair': '/services/refrigerator-repair',
  'signs-refrigerator-needs-repair': '/services/refrigerator-repair',
  'summer-humidity-refrigerator-problems-connecticut': '/services/refrigerator-repair',
  'washing-machine-mold-smell-summer-connecticut-humidity': '/services/washer-repair',
  'washing-machine-vibration-uneven-floors-connecticut': '/services/washer-repair',
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
  // Turnstile site keys are public by design; inline it for the browser widget.
  env: { TURNSTILE_SITE_KEY: process.env.TURNSTILE_SITE_KEY ?? '' },
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
      ...Object.entries(REMOVED_POSTS).map(([from, destination]) => ({
        source: `/blog/${from}`,
        destination,
        permanent: true,
      })),
      // Linked from older blog copy before the /services hub existed.
      {
        source: '/dishwasher-repair',
        destination: '/services/dishwasher-repair',
        permanent: true,
      },
      // The Google Business Profile once linked /bookings (plural). Search Console still
      // reports impressions for it, and it was returning the 404 page.
      { source: '/bookings', destination: '/booking', permanent: true },
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
