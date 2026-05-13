import type { Metadata } from "next";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL('https://myappliance.us'),
  title: {
    default: 'MY APPLIANCE Repair | CT Appliance Repair Services',
    template: '%s | MY APPLIANCE Repair',
  },
  description:
    "Connecticut's trusted appliance repair experts. Same-day service for refrigerators, washers, dryers, dishwashers & more. Licensed, insured, 90-day warranty. Call now!",
  keywords: [
    'appliance repair Connecticut',
    'CT appliance repair',
    'refrigerator repair CT',
    'washer repair Connecticut',
    'dryer repair CT',
    'dishwasher repair Connecticut',
    'appliance repair near me',
    'MY APPLIANCE Repair',
  ],
  authors: [{ name: 'MY APPLIANCE Repair', url: 'https://myappliance.us' }],
  creator: 'MY APPLIANCE Repair',
  publisher: 'MY APPLIANCE Repair',
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
    url: 'https://myappliance.us',
    siteName: 'MY APPLIANCE Repair',
    title: 'MY APPLIANCE Repair | CT Appliance Repair Services',
    description:
      "Connecticut's trusted appliance repair experts. Same-day service for refrigerators, washers, dryers, dishwashers & more. Licensed, insured, 90-day warranty. Call now!",
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'MY APPLIANCE Repair - Connecticut Appliance Repair Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MY APPLIANCE Repair | CT Appliance Repair Services',
    description:
      "Connecticut's trusted appliance repair experts. Same-day service for refrigerators, washers, dryers, dishwashers & more. Licensed, insured, 90-day warranty. Call now!",
    images: ['/og-image.svg'],
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
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-blue-50">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
