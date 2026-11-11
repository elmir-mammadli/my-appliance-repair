import {
  BUSINESS,
  BUSINESS_HOURS,
  CREDENTIALS,
  SAME_AS,
  SERVICE_AREA_SCHEMA,
  WARRANTY_STATEMENT,
} from '@/lib/business';
import { BRANCHES, NJ_BOOKING_ENABLED, NJ_PATH } from '@/lib/branches';
import { services } from '@/lib/services';

export function jsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

// One business entity for the whole site. Every other page references this node by
// @id instead of redefining the business, so Google sees a single, consistent record.
export const BUSINESS_ID = `${BUSINESS.url}/#business`;
export const WEBSITE_ID = `${BUSINESS.url}/#website`;
export const NJ_BUSINESS_ID = `${BUSINESS.url}${NJ_PATH}#business`;

// Appliance repair falls under HomeAndConstructionBusiness, a LocalBusiness subtype.
export const BUSINESS_TYPE = 'HomeAndConstructionBusiness';

/** Minimal reference to the canonical business for `provider`, `mainEntity`, etc. */
export const businessRef = {
  '@type': BUSINESS_TYPE,
  '@id': BUSINESS_ID,
  name: BUSINESS.name,
  url: BUSINESS.url,
  telephone: BUSINESS.phone.e164,
};

export const njBusiness = {
  '@type': BUSINESS_TYPE,
  '@id': NJ_BUSINESS_ID,
  name: `${BUSINESS.name} – Bergen County, NJ`,
  url: `${BUSINESS.url}${NJ_PATH}`,
  telephone: BRANCHES.nj.telephone,
  image: `${BUSINESS.url}/images/hero/dishwasher.jpg`,
  parentOrganization: { '@id': BUSINESS_ID },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Bergen County',
    containedInPlace: { '@type': 'State', name: 'New Jersey' },
  },
  openingHoursSpecification: [BUSINESS_HOURS.schema],
  priceRange: '$$',
  sameAs: SAME_AS,
};

const localBusiness = {
  '@type': BUSINESS_TYPE,
  '@id': BUSINESS_ID,
  name: BUSINESS.name,
  legalName: BUSINESS.name,
  url: BUSINESS.url,
  telephone: BUSINESS.phone.e164,
  email: BUSINESS.email,
  address: BUSINESS.schemaAddress,
  image: `${BUSINESS.url}/images/appliance-repair-connecticut-og.jpg`,
  logo: `${BUSINESS.url}/logo.svg`,
  description: `Insured appliance repair service in Connecticut. Same-day service for refrigerators, washing machines, dryers, dishwashers, ovens, and freezers. Fully insured, ${WARRANTY_STATEMENT}.`,
  slogan: 'Same-day appliance repair in Connecticut',
  knowsAbout: [
    'Appliance repair',
    'Refrigerator repair',
    'Washing machine repair',
    'Clothes dryer repair',
    'Dishwasher repair',
    'Oven repair',
  ],
  hasCredential: CREDENTIALS.map((credential) => ({
    '@type': 'EducationalOccupationalCredential',
    name: credential.name,
    credentialCategory: credential.category,
  })),
  areaServed: SERVICE_AREA_SCHEMA,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Appliance Repair Services',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        '@id': `${BUSINESS.url}/services/${service.slug}#service`,
        name: service.title,
        url: `${BUSINESS.url}/services/${service.slug}`,
      },
    })),
  },
  openingHoursSpecification: [BUSINESS_HOURS.schema],
  priceRange: '$$',
  sameAs: SAME_AS,
  ...(NJ_BOOKING_ENABLED ? { subOrganization: [njBusiness] } : {}),
};

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: BUSINESS.url,
  name: BUSINESS.name,
  inLanguage: 'en-US',
  publisher: { '@id': BUSINESS_ID },
};

const graph = {
  '@context': 'https://schema.org',
  '@graph': [localBusiness, website],
};

export default function StructuredData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />;
}
