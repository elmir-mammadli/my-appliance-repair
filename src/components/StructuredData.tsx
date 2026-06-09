function jsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://myappliance.us/#business',
  name: 'MyAppliance Repair LLC',
  alternateName: 'My Appliance Repair',
  url: 'https://myappliance.us',
  telephone: '+19592616736',
  email: 'service@myappliance.us',
  image: 'https://myappliance.us/images/og-image.png',
  logo: 'https://myappliance.us/logo.svg',
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
    { '@type': 'City', name: 'New Haven', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
    { '@type': 'City', name: 'Hamden', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
    { '@type': 'City', name: 'West Haven', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
    { '@type': 'City', name: 'East Haven', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
    { '@type': 'City', name: 'North Haven', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
    { '@type': 'City', name: 'Woodbridge', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
    { '@type': 'City', name: 'Orange', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
    { '@type': 'City', name: 'Bethany', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
    { '@type': 'City', name: 'Branford', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
    { '@type': 'City', name: 'Milford', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
    { '@type': 'City', name: 'Shelton', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
    { '@type': 'City', name: 'Derby', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
    { '@type': 'City', name: 'Ansonia', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
    { '@type': 'City', name: 'Naugatuck', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
    { '@type': 'City', name: 'Cheshire', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
    { '@type': 'City', name: 'Meriden', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
    { '@type': 'City', name: 'Wallingford', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 41.3530,
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
        itemOffered: { '@type': 'Service', name: 'Refrigerator Repair', url: 'https://myappliance.us/services/refrigerator-repair' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Washing Machine Repair', url: 'https://myappliance.us/services/washer-repair' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Clothes Dryer Repair', url: 'https://myappliance.us/services/dryer-repair' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Dishwasher Repair', url: 'https://myappliance.us/services/dishwasher-repair' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Oven & Range Repair', url: 'https://myappliance.us/services/oven-range-repair' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Additional Appliance Repair', url: 'https://myappliance.us/services' },
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
    ratingValue: '4.9',
    reviewCount: '2400',
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
  '@id': 'https://myappliance.us/#website',
  url: 'https://myappliance.us',
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
    provider: { '@id': 'https://myappliance.us/#business' },
    areaServed: { '@type': 'State', name: 'Connecticut' },
    serviceType: 'Appliance Repair',
    url: 'https://myappliance.us/services/refrigerator-repair',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Washing Machine Repair Connecticut',
    description:
      'Expert washing machine repair across Connecticut. We diagnose and fix spin failures, leaks, drain issues, loud noises, and other common washer problems.',
    provider: { '@id': 'https://myappliance.us/#business' },
    areaServed: { '@type': 'State', name: 'Connecticut' },
    serviceType: 'Appliance Repair',
    url: 'https://myappliance.us/services/washer-repair',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Clothes Dryer Repair Connecticut',
    description:
      'Clothes dryer repair across Connecticut for no-heat, long-dry, squeaking, thumping, belt, and vent-related dryer problems.',
    provider: { '@id': 'https://myappliance.us/#business' },
    areaServed: { '@type': 'State', name: 'Connecticut' },
    serviceType: 'Appliance Repair',
    url: 'https://myappliance.us/services/dryer-repair',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Dishwasher Repair Connecticut',
    description:
      'Reliable dishwasher repair in Connecticut. We fix cleaning issues, drainage problems, door latch failures, and all common dishwasher faults.',
    provider: { '@id': 'https://myappliance.us/#business' },
    areaServed: { '@type': 'State', name: 'Connecticut' },
    serviceType: 'Appliance Repair',
    url: 'https://myappliance.us/services/dishwasher-repair',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Oven & Range Repair Connecticut',
    description:
      'Gas and electric oven repair in Connecticut. We fix ignition failures, uneven heating, control board issues, and all oven and range problems.',
    provider: { '@id': 'https://myappliance.us/#business' },
    areaServed: { '@type': 'State', name: 'Connecticut' },
    serviceType: 'Appliance Repair',
    url: 'https://myappliance.us/services/oven-range-repair',
  },
];

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(website) }}
      />
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
