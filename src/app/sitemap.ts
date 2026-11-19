import type { MetadataRoute } from 'next';
import { posts } from '@/lib/posts';
import { BUSINESS } from '@/lib/business';
import { getAllCitySlugs } from '@/lib/cities';
import { getAllServiceSlugs } from '@/lib/services';
import { BERGEN_TOWNS } from '@/lib/bergen';
import { NJ_PATH, NJ_BOOKING_ENABLED } from '@/lib/branches';

const BASE_URL = BUSINESS.url;

// Last substantive edit to each page template or its copy. Deployment timestamps
// would falsely refresh unchanged pages, so bump these by hand when the content
// of that page type actually changes.
const CONTENT_UPDATED = {
  home: '2026-11-18',
  about: '2026-11-11',
  booking: '2026-11-11',
  servicesHub: '2026-11-15',
  serviceDetails: '2026-11-11',
  cities: '2026-11-18',
  nj: '2026-11-15',
  njBooking: '2026-11-15',
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const citySlugs = getAllCitySlugs();
  const serviceSlugs = getAllServiceSlugs();

  // Publication date is the true lastModified for an article that was never edited.
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.date,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  const newestPost = posts
    .map((post) => post.updatedAt ?? post.date)
    .sort()
    .at(-1);

  const cityEntries: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: CONTENT_UPDATED.cities,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: CONTENT_UPDATED.serviceDetails,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // /privacy and /terms are noindex and intentionally absent.
  return [
    {
      url: BASE_URL,
      lastModified: CONTENT_UPDATED.home,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: CONTENT_UPDATED.about,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/booking`,
      lastModified: CONTENT_UPDATED.booking,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      ...(newestPost ? { lastModified: newestPost } : {}),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: CONTENT_UPDATED.servicesHub,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    ...cityEntries,
    ...serviceEntries,
    { url: `${BASE_URL}${NJ_PATH}`, lastModified: CONTENT_UPDATED.nj },
    ...BERGEN_TOWNS.map(({ slug }) => ({
      url: `${BASE_URL}${NJ_PATH}/${slug}`,
      lastModified: CONTENT_UPDATED.nj,
    })),
    // The booking route is a phone-only fallback with noindex while intake is paused.
    ...(NJ_BOOKING_ENABLED
      ? [{ url: `${BASE_URL}${NJ_PATH}/booking`, lastModified: CONTENT_UPDATED.njBooking }]
      : []),
    ...blogEntries,
  ];
}
