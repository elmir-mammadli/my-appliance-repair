function jsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': 'https://myappliance.us/#business',
  name: 'MyAppliance Repair LLC',
  url: 'https://myappliance.us',
  telephone: '+19592616736',
  email: 'service@myappliance.us',
  description:
    'Licensed appliance repair service in Connecticut. Same-day service for refrigerators, washers, dryers, dishwashers, ovens, and more. Licensed, insured, 90-day parts and labor warranty.',
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
        itemOffered: { '@type': 'Service', name: 'Refrigerator Repair' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Washer Repair' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Dryer Repair' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Dishwasher Repair' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Oven & Range Repair' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Air Conditioner Repair' },
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
  sameAs: [],
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://myappliance.us/#website',
  url: 'https://myappliance.us',
  name: 'MyAppliance Repair LLC',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://myappliance.us/blog?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
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
    url: 'https://myappliance.us',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Washer & Dryer Repair Connecticut',
    description:
      'Expert washer and dryer repair across Connecticut. We diagnose and fix all issues including spin failures, leaks, no-heat problems, and loud noises.',
    provider: { '@id': 'https://myappliance.us/#business' },
    areaServed: { '@type': 'State', name: 'Connecticut' },
    serviceType: 'Appliance Repair',
    url: 'https://myappliance.us',
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
    url: 'https://myappliance.us',
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
    url: 'https://myappliance.us',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Air Conditioner Repair Connecticut',
    description:
      'Air conditioner repair services in Connecticut. We service window units, portable ACs, and mini-splits. Licensed technicians, 90-day warranty.',
    provider: { '@id': 'https://myappliance.us/#business' },
    areaServed: { '@type': 'State', name: 'Connecticut' },
    serviceType: 'Appliance Repair',
    url: 'https://myappliance.us',
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
