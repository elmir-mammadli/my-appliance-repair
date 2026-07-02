import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import BookingButton from '@/components/BookingButton';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/lib/services';

function jsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export const metadata: Metadata = {
  title: 'Appliance Repair Services in Connecticut | Same-Day, OEM Parts',
  description:
    'Appliances we repair in Connecticut. Washers, dryers, fridges, dishwashers, ovens, and the rest. Same-day service when slots are open, OEM parts on the truck, 90 days on parts and labor.',
  alternates: { canonical: 'https://www.myappliance.us/services' },
  openGraph: {
    type: 'website',
    url: 'https://www.myappliance.us/services',
    title: 'Appliance Repair Services in Connecticut | MY APPLIANCE Repair',
    description:
      'Appliances we repair in Connecticut. Washers, dryers, fridges, dishwashers, ovens, and the rest. Same-day when slots are open, OEM parts on the truck, 90 days on parts and labor.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'MY APPLIANCE Repair Services',
      },
    ],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.myappliance.us' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.myappliance.us/services' },
  ],
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: services.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: s.title,
    url: `https://www.myappliance.us/services/${s.slug}`,
  })),
};

const processSteps = [
  { step: '1', title: 'Book online or call', desc: "Tell us what is broken. Two minutes, no account, no credit card." },
  { step: '2', title: 'Tech shows up', desc: 'Same or next day. Parts already on the van for most jobs.' },
  { step: '3', title: 'Written estimate', desc: 'You see the cost before we open anything up. Diagnostic fee waived if you go ahead.' },
  { step: '4', title: 'Fix and warranty', desc: '90 days on parts and labor. If the same issue comes back, we come back.' },
];

export default function ServicesIndexPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(itemListSchema) }} />

      <Navbar />

      {/* ── Hero / Header ── */}
      <section className="bg-white pt-20 border-b border-slate-100" aria-label="Services overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <li><Link href="/" className="hover:text-blue-700 transition-colors duration-200">Home</Link></li>
              <li aria-hidden="true">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </li>
              <li className="text-blue-900 font-semibold">Services</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-6">
              CT · Licensed and insured · Same-day service
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-blue-950 leading-[1.1] tracking-tight mb-6">
              Appliances we <span className="text-[#ffb81c]">repair</span> in Connecticut
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-2xl">
              Washers that won&apos;t spin. Fridges running warm. Ovens that won&apos;t hold temp. Pick an appliance below to see the symptoms we hear most weeks, the parts we keep on the truck, and book a repair. Same-day service when slots are open, anywhere from Greenwich to Mystic.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <BookingButton className="inline-flex items-center justify-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] text-gray-900 font-bold px-8 py-4 rounded-xl text-base transition-colors duration-200 cursor-pointer shadow-md">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule a Repair
              </BookingButton>
              <a
                href="tel:+19592616736"
                className="inline-flex items-center justify-center gap-2 border-2 border-blue-950 hover:bg-blue-950 hover:text-white text-blue-950 font-bold px-8 py-4 rounded-xl text-base transition-colors duration-200 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (959) 261-6736
              </a>
            </div>

            {/* Review pill */}
            <div className="inline-flex items-center gap-2 bg-white border border-blue-200 rounded-full px-5 py-2 shadow-sm">
              <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-bold text-blue-900 text-sm">5.0</span>
              <span className="text-slate-400 text-sm">·</span>
              <span className="text-slate-500 text-sm">across Google &amp; Thumbtack</span>
            </div>
          </div>

          {/* 3-up sub-feature strip */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4 text-center">
            {[
              { label: 'OEM parts only', sub: 'Original manufacturer parts on every repair' },
              { label: '90-day warranty', sub: 'Parts and labor guaranteed for 90 days' },
              { label: 'One trip when we can', sub: 'Parts stocked to finish most jobs the same day' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl border border-blue-100 px-5 py-4 flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-bold text-blue-900 text-sm">{item.label}</p>
                  <p className="text-slate-500 text-xs">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Cards Grid ── */}
      <section className="py-20 lg:py-28 bg-blue-50" aria-labelledby="cards-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">Pick an appliance</span>
            <h2 id="cards-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
              Open a card. Book a repair.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Each card lists the symptoms we see most weeks, the parts on the truck, and the brands we work on.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 lg:py-28 bg-white" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">How a repair goes</span>
            <h2 id="process-heading" className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
              Four steps. No surprises.
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Same process every time. You see the cost before we open anything.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6"
              >
                <div className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA band ── */}
      <section className="py-20 lg:py-28 bg-blue-900" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-yellow-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Book a repair
          </span>
          <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold text-white mb-5">
            Get your appliance fixed
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Same-day CT service when slots are open. Written estimate before we open anything. OEM parts on the truck. 90 days on parts and labor.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <BookingButton className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-xl transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-gray-900 bg-[#ffb81c] hover:bg-[#e6a619]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule a Repair
            </BookingButton>
            <a
              href="tel:+19592616736"
              className="inline-flex items-center justify-center gap-2 border-2 border-blue-600 hover:border-blue-400 text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (959) 261-6736
            </a>
          </div>
        </div>
      </section>

      <BookingModal />
      <Footer />
    </main>
  );
}
