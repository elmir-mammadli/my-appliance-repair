export interface City {
  slug: string;
  name: string;
  county: string;
  region: string;
}

export const cities: City[] = [
  { slug: 'new-haven', name: 'New Haven', county: 'New Haven County', region: 'Greater New Haven' },
  { slug: 'hamden', name: 'Hamden', county: 'New Haven County', region: 'Greater New Haven' },
  {
    slug: 'west-haven',
    name: 'West Haven',
    county: 'New Haven County',
    region: 'Greater New Haven',
  },
  {
    slug: 'east-haven',
    name: 'East Haven',
    county: 'New Haven County',
    region: 'Greater New Haven',
  },
  {
    slug: 'north-haven',
    name: 'North Haven',
    county: 'New Haven County',
    region: 'Greater New Haven',
  },
  {
    slug: 'woodbridge',
    name: 'Woodbridge',
    county: 'New Haven County',
    region: 'Greater New Haven',
  },
  { slug: 'orange', name: 'Orange', county: 'New Haven County', region: 'Greater New Haven' },
  { slug: 'bethany', name: 'Bethany', county: 'New Haven County', region: 'Greater New Haven' },
  { slug: 'branford', name: 'Branford', county: 'New Haven County', region: 'Greater New Haven' },
  { slug: 'milford', name: 'Milford', county: 'New Haven County', region: 'Greater New Haven' },
  { slug: 'shelton', name: 'Shelton', county: 'Fairfield County', region: 'Greater New Haven' },
  { slug: 'derby', name: 'Derby', county: 'New Haven County', region: 'Greater New Haven' },
  { slug: 'ansonia', name: 'Ansonia', county: 'New Haven County', region: 'Greater New Haven' },
  { slug: 'naugatuck', name: 'Naugatuck', county: 'New Haven County', region: 'Greater New Haven' },
  { slug: 'cheshire', name: 'Cheshire', county: 'New Haven County', region: 'Greater New Haven' },
  { slug: 'meriden', name: 'Meriden', county: 'New Haven County', region: 'Greater New Haven' },
  {
    slug: 'wallingford',
    name: 'Wallingford',
    county: 'New Haven County',
    region: 'Greater New Haven',
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getCitiesByRegion(region: string): City[] {
  return cities.filter((c) => c.region === region);
}

export function getAllCitySlugs(): string[] {
  return cities.map((c) => c.slug);
}
