import { SERVICE_AREA_SCHEMA } from '@/lib/business';

function jsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.myappliance.us/#business',
  name: 'MyAppliance Repair LLC',
  alternateName: 'My Appliance Repair',
  url: 'https://www.myappliance.us',
  telephone: '+19592616736',
  email: 'service@myappliance.us',
  image: 'https://www.myappliance.us/images/appliance-repair-connecticut-og.jpg',
  logo: 'https://www.myappliance.us/logo.svg',
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
          name: 'Refrigerator Repair',
          url: 'https://www.myappliance.us/services/refrigerator-repair',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Washing Machine Repair',
          url: 'https://www.myappliance.us/services/washer-repair',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Clothes Dryer Repair',
          url: 'https://www.myappliance.us/services/dryer-repair',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Dishwasher Repair',
          url: 'https://www.myappliance.us/services/dishwasher-repair',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Oven & Range Repair',
          url: 'https://www.myappliance.us/services/oven-range-repair',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Additional Appliance Repair',
          url: 'https://www.myappliance.us/services',
        },
      },
    ],
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
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
  '@id': 'https://www.myappliance.us/#website',
  url: 'https://www.myappliance.us',
  name: 'MyAppliance Repair LLC',
  inLanguage: 'en-US',
};

const services = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Refrigerator Repair Connecticut',
    description:
      'Professional refrigerator repair in Connecticut. We fix all makes and models including Samsung, LG, Whirlpool, GE, and more. Same-day service available.',
    provider: { '@id': 'https://www.myappliance.us/#business' },
    areaServed: SERVICE_AREA_SCHEMA,
    serviceType: 'Appliance Repair',
    url: 'https://www.myappliance.us/services/refrigerator-repair',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Washing Machine Repair Connecticut',
    description:
      'Expert washing machine repair in our Connecticut service communities. We diagnose and fix spin failures, leaks, drain issues, loud noises, and other common washer problems.',
    provider: { '@id': 'https://www.myappliance.us/#business' },
    areaServed: SERVICE_AREA_SCHEMA,
    serviceType: 'Appliance Repair',
    url: 'https://www.myappliance.us/services/washer-repair',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Clothes Dryer Repair Connecticut',
    description:
      'Clothes dryer repair in our Connecticut service communities for no-heat, long-dry, squeaking, thumping, belt, and vent-related dryer problems.',
    provider: { '@id': 'https://www.myappliance.us/#business' },
    areaServed: SERVICE_AREA_SCHEMA,
    serviceType: 'Appliance Repair',
    url: 'https://www.myappliance.us/services/dryer-repair',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Dishwasher Repair Connecticut',
    description:
      'Reliable dishwasher repair in Connecticut. We fix cleaning issues, drainage problems, door latch failures, and all common dishwasher faults.',
    provider: { '@id': 'https://www.myappliance.us/#business' },
    areaServed: SERVICE_AREA_SCHEMA,
    serviceType: 'Appliance Repair',
    url: 'https://www.myappliance.us/services/dishwasher-repair',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Oven & Range Repair Connecticut',
    description:
      'Gas and electric oven repair in Connecticut. We fix ignition failures, uneven heating, control board issues, and all oven and range problems.',
    provider: { '@id': 'https://www.myappliance.us/#business' },
    areaServed: SERVICE_AREA_SCHEMA,
    serviceType: 'Appliance Repair',
    url: 'https://www.myappliance.us/services/oven-range-repair',
  },
];

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(localBusiness) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(website) }} />
      {services.map((service, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(service) }}
        />
      ))}
    </>
  );
}
