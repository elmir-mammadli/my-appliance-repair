import type { Metadata } from 'next';
import { NJ_PATH, NJ_BOOKING_ENABLED } from './branches';
import type { BergenTown } from './bergen';

export function bergenMetadata(town?: BergenTown): Metadata {
  const area = town?.name ?? 'Bergen County';
  // The root template appends the brand; keep the whole title under 60 characters.
  const title = town ? `Appliance Repair in ${area}, NJ` : 'Appliance Repair in Bergen County, NJ';
  // Each town names its own areas and its own tagline so no two descriptions share a template.
  const description = town
    ? `Appliance repair in ${area}, NJ. ${town.tagline}`
    : 'Insured appliance repair in Hackensack and across Bergen County. Based in Hudson County, with written estimates and a 90-day parts and labor warranty.';
  const url = `https://www.myappliance.us${NJ_PATH}${town ? `/${town.slug}` : ''}`;
  const images = [
    {
      url: '/images/hero/dishwasher.jpg',
      alt: 'MyAppliance Repair technician servicing a dishwasher',
    },
  ];
  return {
    title,
    description,
    keywords: town
      ? [
          `appliance repair ${area} NJ`,
          `${area} refrigerator repair`,
          `${area} washer dryer repair`,
          'Bergen County appliance repair',
        ]
      : [
          'appliance repair New Jersey',
          'Bergen County appliance repair',
          'Hackensack appliance repair',
          'Hudson County appliance repair',
        ],
    alternates: { canonical: url },
    robots: { index: NJ_BOOKING_ENABLED, follow: true },
    openGraph: { title, description, url, type: 'website', locale: 'en_US', images },
    twitter: { card: 'summary_large_image', title, description, images },
  };
}
