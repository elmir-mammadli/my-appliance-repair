import type { MetadataRoute } from 'next';
import { posts } from '@/lib/posts';
import { BUSINESS } from '@/lib/business';
import { getAllCitySlugs } from '@/lib/cities';
import { getAllServiceSlugs } from '@/lib/services';
import { BERGEN_TOWNS } from '@/lib/bergen';
import { NJ_PATH, NJ_BOOKING_ENABLED } from '@/lib/branches';

const BASE_URL = BUSINESS.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const citySlugs = getAllCitySlugs();
  const serviceSlugs = getAllServiceSlugs();

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    ...(post.updatedAt ? { lastModified: post.updatedAt } : {}),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const cityEntries: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Only edited articles with a recorded update date receive lastModified.
  // Deployment timestamps would falsely refresh unchanged pages.
  return [
    {
      url: BASE_URL,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/booking`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/privacy`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...cityEntries,
    ...serviceEntries,
    ...(NJ_BOOKING_ENABLED ? [
      { url: `${BASE_URL}${NJ_PATH}` },
      { url: `${BASE_URL}${NJ_PATH}/booking` },
      ...BERGEN_TOWNS.map(({ slug }) => ({ url: `${BASE_URL}${NJ_PATH}/${slug}` })),
    ] : []),
    ...blogEntries,
  ];
}
