import type { Metadata } from 'next';
import AboutContent from '@/components/AboutContent';

export const metadata: Metadata = {
  title: 'About Us | Licensed CT Appliance Repair Experts | MY APPLIANCE Repair',
  description:
    "Learn about MY APPLIANCE Repair — Connecticut's trusted local appliance repair service. Licensed technicians, 90-day warranty, 2,500+ repairs completed across CT.",
  alternates: { canonical: 'https://myappliance.us/about' },
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
  name: 'About MY APPLIANCE Repair',
  description:
    "Connecticut's trusted local appliance repair service. Licensed technicians, 90-day warranty, 2,500+ repairs completed across CT.",
  url: 'https://myappliance.us/about',
  mainEntity: {
    '@type': 'LocalBusiness',
    '@id': 'https://myappliance.us/#business',
    name: 'MY APPLIANCE Repair',
    description:
      "Connecticut's most trusted appliance repair service. Licensed & insured technicians, 90-day warranty, same-day appointments available.",
    url: 'https://myappliance.us',
    telephone: '+1-917-378-3014',
    email: 'info@myappliance.us',
    foundingDate: '2008',
    areaServed: {
      '@type': 'State',
      name: 'Connecticut',
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'CT State Licensed Appliance Technician',
        credentialCategory: 'license',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'EPA 608 Certified',
        credentialCategory: 'certification',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2500',
      bestRating: '5',
    },
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
