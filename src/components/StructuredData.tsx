import { BUSINESS, BUSINESS_HOURS, SERVICE_AREA_SCHEMA } from '@/lib/business';

function jsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BUSINESS.url}/#business`,
  name: BUSINESS.name,
  legalName: BUSINESS.name,
  url: BUSINESS.url,
  telephone: BUSINESS.phone.e164,
  email: BUSINESS.email,
  address: BUSINESS.schemaAddress,
  image: `${BUSINESS.url}/images/appliance-repair-connecticut-og.jpg`,
  logo: `${BUSINESS.url}/logo.svg`,
  description:
    'Insured appliance repair service in Connecticut. Same-day service for refrigerators, washing machines, dryers, dishwashers, ovens, and freezers. Fully insured, 90-day parts and labor warranty.',
  slogan: 'Same-day appliance repair in Connecticut',
  knowsAbout: [
    'Appliance repair',
    'Refrigerator repair',
    'Washing machine repair',
    'Clothes dryer repair',
    'Dishwasher repair',
    'Oven repair',
  ],
  areaServed: SERVICE_AREA_SCHEMA,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Appliance Repair Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${BUSINESS.url}/services/refrigerator-repair#service`,
          name: 'Refrigerator Repair',
          url: `${BUSINESS.url}/services/refrigerator-repair`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${BUSINESS.url}/services/washer-repair#service`,
          name: 'Washing Machine Repair',
          url: `${BUSINESS.url}/services/washer-repair`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${BUSINESS.url}/services/dryer-repair#service`,
          name: 'Clothes Dryer Repair',
          url: `${BUSINESS.url}/services/dryer-repair`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${BUSINESS.url}/services/dishwasher-repair#service`,
          name: 'Dishwasher Repair',
          url: `${BUSINESS.url}/services/dishwasher-repair`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${BUSINESS.url}/services/oven-range-repair#service`,
          name: 'Oven & Range Repair',
          url: `${BUSINESS.url}/services/oven-range-repair`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${BUSINESS.url}/services/more-appliances#service`,
          name: 'Additional Appliance Repair',
          url: `${BUSINESS.url}/services/more-appliances`,
        },
      },
    ],
  },
  openingHoursSpecification: [BUSINESS_HOURS.schema],
  priceRange: '$$',
  sameAs: [
    'https://www.instagram.com/myappliancerepair',
    'https://www.yelp.com/writeareview/biz/4qpGmPtt9HvAqeKYkFw4Bw',
    'https://share.google/aktwu5fUEtjV6Eo40',
    'https://www.thumbtack.com/ct/hamden/appliance-repair/my-appliance-repair-llc/service/580267695654707208',
  ],
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BUSINESS.url}/#website`,
  url: BUSINESS.url,
  name: BUSINESS.name,
  inLanguage: 'en-US',
};

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(localBusiness) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(website) }} />
    </>
  );
}
