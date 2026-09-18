import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/posts';
import { getAllCitySlugs } from '@/lib/cities';
import { getAllServiceSlugs } from '@/lib/services';

const BASE_URL = 'https://www.myappliance.us';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getAllSlugs();
  const citySlugs = getAllCitySlugs();
  const serviceSlugs = getAllServiceSlugs();

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
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

  // Omit lastModified until we track actual content updates. A build timestamp
  // would incorrectly mark unchanged pages as fresh on every deployment.
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
    ...blogEntries,
  ];
}
