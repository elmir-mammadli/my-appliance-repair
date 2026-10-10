import type { Metadata } from 'next';
import { BUSINESS, SERVICE_AREA_SCHEMA } from '@/lib/business';
import AboutContent from '@/components/AboutContent';

export const metadata: Metadata = {
  title: 'About Us | Insured CT Appliance Repair Experts',
  description:
    `Learn about ${BUSINESS.name} — Connecticut's trusted local appliance repair service. Insured technicians, 90-day warranty, 2,500+ repairs completed across CT.`,
  alternates: { canonical: `${BUSINESS.url}/about` },
};

function jsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: `About ${BUSINESS.name}`,
  description:
    "Connecticut's trusted local appliance repair service. Insured technicians, 90-day warranty, 2,500+ repairs completed across CT.",
  url: 'https://www.myappliance.us/about',
  mainEntity: {
    '@type': 'LocalBusiness',
    '@id': 'https://www.myappliance.us/#business',
    name: BUSINESS.name,
    description:
      "Connecticut's most trusted appliance repair service. Insured technicians, 90-day warranty, same-day appointments available.",
    url: BUSINESS.url,
    telephone: BUSINESS.phone.e164,
    email: BUSINESS.email,
    address: BUSINESS.schemaAddress,
    areaServed: SERVICE_AREA_SCHEMA,
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'EPA 608 Certified',
        credentialCategory: 'certification',
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(aboutPageSchema) }}
      />
      <AboutContent />
    </>
  );
}
