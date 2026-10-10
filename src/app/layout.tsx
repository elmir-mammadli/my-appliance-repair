import type { Metadata } from 'next';
import { BUSINESS, SERVICE_AREAS, SERVICE_CALL_FEE } from '@/lib/business';
import { Lexend, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import StructuredData from '@/components/StructuredData';
import CookieConsent from '@/components/CookieConsent';

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
});

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans-3',
  display: 'swap',
});

const serviceDescription = `Appliance repair in ${SERVICE_AREAS.length} Connecticut communities. $${SERVICE_CALL_FEE} service call; repair quote provided on-site. Insured technicians, 90-day warranty.`;

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: `Same-Day Appliance Repair in CT | 90-Day Warranty | ${BUSINESS.shortName}`,
    template: `%s | ${BUSINESS.shortName}`,
  },
  description:
    serviceDescription,
  keywords: [
    'appliance repair Connecticut',
    'CT appliance repair',
    'refrigerator repair CT',
    'washer repair Connecticut',
    'washing machine repair Connecticut',
    'dryer repair CT',
    'appliance repair near me',
    'appliance repair New Haven',
    'appliance repair Hamden',
    'dishwasher repair Connecticut',
    BUSINESS.name,
  ],
  authors: [{ name: BUSINESS.name, url: BUSINESS.url }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    title: `Same-Day Appliance Repair in CT | 90-Day Warranty | ${BUSINESS.shortName}`,
    description:
      serviceDescription,
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
    title: `Same-Day Appliance Repair in CT | 90-Day Warranty | ${BUSINESS.shortName}`,
    description:
      serviceDescription,
    images: ['/images/appliance-repair-connecticut-og.jpg'],
  },
  verification: {},
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased scroll-smooth ${lexend.variable} ${sourceSans3.variable}`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col bg-blue-50">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
