import type { Metadata } from 'next';
import { BUSINESS, REVIEW_RATINGS } from '@/lib/business';
import { BUSINESS_ID, BUSINESS_TYPE, jsonLd } from '@/components/StructuredData';
import AboutContent from '@/components/AboutContent';

const title = 'About Our CT Appliance Repair Team';
// Under 160 characters so Google shows it whole.
const description = `${BUSINESS.name} is an insured Hamden, CT appliance repair team rated ${REVIEW_RATINGS.google.rating.toFixed(1)} on Google and Thumbtack. 90-day parts and labor warranty.`;
const url = `${BUSINESS.url}/about`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  // Without these the page inherits the root layout's block, which sets og:url and
  // og:title to the homepage's on every share of /about.
  openGraph: {
    type: 'website',
    url,
    siteName: BUSINESS.name,
    locale: 'en_US',
    title: `${title} | ${BUSINESS.shortName}`,
    description,
    images: [
      {
        url: '/images/appliance-repair-connecticut-og.jpg',
        width: 1200,
        height: 630,
        alt: `${BUSINESS.name} - Connecticut Appliance Repair Services`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${BUSINESS.shortName}`,
    description,
    images: ['/images/appliance-repair-connecticut-og.jpg'],
  },
};

// The business itself is defined once in StructuredData (rendered by the footer);
// this page only points at it.
const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: `About ${BUSINESS.name}`,
  description,
  url,
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
