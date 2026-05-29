import type { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/posts'
import { getAllCitySlugs } from '@/lib/cities'

const BASE_URL = 'https://myappliance.us'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getAllSlugs()
  const citySlugs = getAllCitySlugs()

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const cityEntries: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

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
      url: `${BASE_URL}/blog`,
      changeFrequency: 'weekly',
      priority: 0.9,
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
    ...blogEntries,
  ]
}
