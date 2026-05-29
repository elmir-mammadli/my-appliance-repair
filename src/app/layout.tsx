import type { Metadata } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import CookieConsent from "@/components/CookieConsent";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-3",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://myappliance.us'),
  title: {
    default: 'MyAppliance Repair LLC | CT Appliance Repair Services',
    template: '%s | MyAppliance Repair LLC',
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
    'MyAppliance Repair LLC',
  ],
  authors: [{ name: 'MyAppliance Repair LLC', url: 'https://myappliance.us' }],
  creator: 'MyAppliance Repair LLC',
  publisher: 'MyAppliance Repair LLC',
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
    siteName: 'MyAppliance Repair LLC',
    title: 'MyAppliance Repair LLC | CT Appliance Repair Services',
    description:
      "Connecticut's trusted appliance repair experts. Same-day service for refrigerators, washers, dryers, dishwashers & more. Licensed, insured, 90-day warranty. Call now!",
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MyAppliance Repair LLC - Connecticut Appliance Repair Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyAppliance Repair LLC | CT Appliance Repair Services',
    description:
      "Connecticut's trusted appliance repair experts. Same-day service for refrigerators, washers, dryers, dishwashers & more. Licensed, insured, 90-day warranty. Call now!",
    images: ['/images/og-image.png'],
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
    <html lang="en" className={`h-full antialiased scroll-smooth ${lexend.variable} ${sourceSans3.variable}`}>
      <body className="min-h-full flex flex-col bg-blue-50">
        <StructuredData />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
