import type { Metadata } from 'next';
import { NJ_PATH, NJ_BOOKING_ENABLED } from './branches';
import type { BergenTown } from './bergen';

export function bergenMetadata(town?: BergenTown): Metadata {
  const area = town?.name ?? 'Bergen County';
  const title = town
    ? `Appliance Repair ${area}, NJ | $99 Service Call`
    : 'Appliance Repair in New Jersey | Bergen County & Hackensack';
  const description = town
    ? `Refrigerator, washer, dryer, dishwasher and oven repair in ${area}, NJ. $99 service call, written repair quote, 90-day warranty. Call (201) 403-0001.`
    : 'Insured technicians repair refrigerators, washers, dryers, dishwashers, ovens, and freezers in Hackensack and across Bergen County. Based in Hudson County, with a written estimate before work begins and a 90-day labor warranty.';
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
      ? [`appliance repair ${area} NJ`, 'Bergen County appliance repair']
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
