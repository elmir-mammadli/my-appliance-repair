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
    'Licensed appliance repair service in Connecticut. Same-day service for refrigerators, washing machines, dryers, dishwashers, ovens, and freezers. Licensed, insured, 90-day parts and labor warranty.',
  slogan: 'Same-day appliance repair in Connecticut',
  knowsAbout: [
    'Appliance repair',
    'Refrigerator repair',
    'Washing machine repair',
    'Clothes dryer repair',
    'Dishwasher repair',
    'Oven repair',
  ],
  areaServed: [
    {
      '@type': 'City',
      name: 'New Haven',
      containedInPlace: { '@type': 'State', name: 'Connecticut' },
    },
    {
      '@type': 'City',
      name: 'Hamden',
      containedInPlace: { '@type': 'State', name: 'Connecticut' },
    },
    {
      '@type': 'City',
      name: 'West Haven',
      containedInPlace: { '@type': 'State', name: 'Connecticut' },
    },
    {
      '@type': 'City',
      name: 'East Haven',
      containedInPlace: { '@type': 'State', name: 'Connecticut' },
    },
    {
      '@type': 'City',
      name: 'North Haven',
      containedInPlace: { '@type': 'State', name: 'Connecticut' },
    },
    {
      '@type': 'City',
      name: 'Woodbridge',
      containedInPlace: { '@type': 'State', name: 'Connecticut' },
    },
    {
      '@type': 'City',
      name: 'Orange',
      containedInPlace: { '@type': 'State', name: 'Connecticut' },
    },
    {
      '@type': 'City',
      name: 'Bethany',
      containedInPlace: { '@type': 'State', name: 'Connecticut' },
    },
    {
      '@type': 'City',
      name: 'Branford',
      containedInPlace: { '@type': 'State', name: 'Connecticut' },
    },
    {
      '@type': 'City',
      name: 'Milford',
      containedInPlace: { '@type': 'State', name: 'Connecticut' },
    },
    {
      '@type': 'City',
      name: 'Shelton',
      containedInPlace: { '@type': 'State', name: 'Connecticut' },
    },
    { '@type': 'City', name: 'Derby', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
    {
      '@type': 'City',
      name: 'Ansonia',
      containedInPlace: { '@type': 'State', name: 'Connecticut' },
    },
    {
      '@type': 'City',
      name: 'Naugatuck',
      containedInPlace: { '@type': 'State', name: 'Connecticut' },
    },
    {
      '@type': 'City',
      name: 'Cheshire',
      containedInPlace: { '@type': 'State', name: 'Connecticut' },
    },
    {
      '@type': 'City',
      name: 'Meriden',
      containedInPlace: { '@type': 'State', name: 'Connecticut' },
    },
    {
      '@type': 'City',
      name: 'Wallingford',
      containedInPlace: { '@type': 'State', name: 'Connecticut' },
    },
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 41.353,
      longitude: -72.9587,
    },
    geoRadius: '25000',
  },
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '38',
    bestRating: '5',
  },
  sameAs: [
    'https://www.instagram.com/myappliancerepair',
    'https://www.yelp.com/writeareview/biz/4qpGmPtt9HvAqeKYkFw4Bw',
    'https://share.google/aktwu5fUEtjV6Eo40',
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
    areaServed: { '@type': 'State', name: 'Connecticut' },
    serviceType: 'Appliance Repair',
    url: 'https://www.myappliance.us/services/refrigerator-repair',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Washing Machine Repair Connecticut',
    description:
      'Expert washing machine repair across Connecticut. We diagnose and fix spin failures, leaks, drain issues, loud noises, and other common washer problems.',
    provider: { '@id': 'https://www.myappliance.us/#business' },
    areaServed: { '@type': 'State', name: 'Connecticut' },
    serviceType: 'Appliance Repair',
    url: 'https://www.myappliance.us/services/washer-repair',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Clothes Dryer Repair Connecticut',
    description:
      'Clothes dryer repair across Connecticut for no-heat, long-dry, squeaking, thumping, belt, and vent-related dryer problems.',
    provider: { '@id': 'https://www.myappliance.us/#business' },
    areaServed: { '@type': 'State', name: 'Connecticut' },
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
    areaServed: { '@type': 'State', name: 'Connecticut' },
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
    areaServed: { '@type': 'State', name: 'Connecticut' },
    serviceType: 'Appliance Repair',
    url: 'https://www.myappliance.us/services/oven-range-repair',
  },
];

const faq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you offer same-day appliance repair in Connecticut?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We offer same-day appliance repair throughout Connecticut, including Hamden, New Haven, West Haven, North Haven, and surrounding areas. Call us to confirm availability for your location.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does appliance repair cost in Connecticut?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Repair costs vary by appliance and issue. We offer free estimates before any work begins so you know the price upfront. Most common repairs range from $100–$350 including parts and labor.',
      },
    },
    {
      '@type': 'Question',
      name: 'What appliances do you repair?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We repair refrigerators, washing machines, dryers, dishwashers, ovens, ranges, and freezers. We service all major brands including Samsung, LG, Whirlpool, GE, Maytag, KitchenAid, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer a warranty on repairs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All repairs come with a 90-day parts and labor warranty. If the same issue returns within 90 days, we fix it at no additional charge.',
      },
    },
    {
      '@type': 'Question',
      name: 'What areas in Connecticut do you serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We serve most of Connecticut including Hamden, New Haven, West Haven, East Haven, North Haven, Woodbridge, Orange, Branford, Milford, Shelton, Cheshire, Meriden, Wallingford, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are you licensed and insured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. MyAppliance Repair LLC is fully licensed and insured in Connecticut. Our technicians are experienced professionals who service all major appliance brands.',
      },
    },
  ],
};

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(localBusiness) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faq) }} />
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
