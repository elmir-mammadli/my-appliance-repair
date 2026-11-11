import type { Metadata } from 'next';
import { BUSINESS, REVIEW_RATINGS } from '@/lib/business';
import { BUSINESS_ID, BUSINESS_TYPE, jsonLd } from '@/components/StructuredData';
import AboutContent from '@/components/AboutContent';

const description = `Learn about ${BUSINESS.name}, an insured Connecticut appliance repair service rated ${REVIEW_RATINGS.google.rating.toFixed(1)} on Google and Thumbtack. 90-day parts and labor warranty, 2,500+ repairs completed across CT.`;

export const metadata: Metadata = {
  title: 'About Our CT Appliance Repair Team',
  description,
  alternates: { canonical: `${BUSINESS.url}/about` },
};

// The business itself is defined once in StructuredData (rendered by the footer);
// this page only points at it.
const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: `About ${BUSINESS.name}`,
  description,
  url: `${BUSINESS.url}/about`,
  mainEntity: { '@type': BUSINESS_TYPE, '@id': BUSINESS_ID },
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
