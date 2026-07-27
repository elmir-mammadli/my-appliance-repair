import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import BookingButton from '@/components/BookingButton';
import { cities, getCityBySlug, getCitiesByRegion } from '@/lib/cities';

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  return {
    title: `Appliance Repair ${city.name}, CT | Same-Day Service | MyAppliance Repair LLC`,
    description: `Fast, reliable appliance repair in ${city.name}, CT. Same-day service for refrigerators, washers, dryers, dishwashers & ovens. Licensed techs, 90-day warranty. Call (959) 261-6736.`,
    alternates: { canonical: `https://www.myappliance.us/${city.slug}` },
    openGraph: {
      type: 'website',
      url: `https://www.myappliance.us/${city.slug}`,
      title: `Appliance Repair ${city.name}, CT | Same-Day Service | MyAppliance Repair LLC`,
      description: `Fast, reliable appliance repair in ${city.name}, CT. Same-day service for refrigerators, washers, dryers, dishwashers & ovens. Licensed techs, 90-day warranty.`,
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: `Appliance Repair ${city.name} CT`,
        },
      ],
    },
  };
}

function jsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

const services = [
  {
    name: 'Refrigerator Repair',
    desc: 'Cooling issues, ice maker failures, noisy compressors, and more.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm0 7h14M9 3v7"
      />
    ),
  },
  {
    name: 'Washer Repair',
    desc: "Won't spin, leaking, loud noises, error codes — all makes and models.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 8a4 4 0 100 8 4 4 0 000-8zM3 12h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m.7 11.4l-.7-.7M6.3 18.4l-.7-.7"
      />
    ),
  },
  {
    name: 'Dryer Repair',
    desc: 'No heat, long drying times, squeaking, tumbling issues fixed fast.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 3v1m0 16v1M4.22 4.22l.71.71m14.14-.71l-.71.71M3 12h1m16 0h1M4.93 19.78l.71-.71m12.72.71l-.71-.71M12 8a4 4 0 100 8 4 4 0 000-8z"
      />
    ),
  },
  {
    name: 'Dishwasher Repair',
    desc: 'Not cleaning, not draining, leaking, door latch problems.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-4M9 3a2 2 0 002 2h2a2 2 0 002-2M9 3a2 2 0 012-2h2a2 2 0 012 2"
      />
    ),
  },
  {
    name: 'Oven & Range Repair',
    desc: 'Gas ignition failures, uneven heating, broken elements, control boards.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
      />
    ),
  },
  {
    name: 'Air Conditioner Repair',
    desc: 'Window units, portable ACs, and mini-splits serviced year-round.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364"
      />
    ),
  },
];

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const nearbyCities = getCitiesByRegion(city.region).filter((c) => c.slug !== city.slug);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': 'https://www.myappliance.us/#business',
    name: 'MyAppliance Repair LLC',
    url: 'https://www.myappliance.us',
    telephone: '+19592616736',
    email: 'service@myappliance.us',
    description: `Licensed appliance repair service in ${city.name}, CT. Same-day service for refrigerators, washers, dryers, dishwashers, ovens, and more. 90-day parts and labor warranty.`,
    areaServed: [
      {
        '@type': 'City',
        name: city.name,
        containedInPlace: { '@type': 'State', name: 'Connecticut' },
      },
    ],
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '38',
      bestRating: '5',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.myappliance.us' },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Appliance Repair ${city.name}`,
        item: `https://www.myappliance.us/${city.slug}`,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
      />
      <Navbar />

      {/* Hero */}
      <section className="bg-white pt-20 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-600 font-medium">Appliance Repair {city.name}</li>
            </ol>
          </nav>

          <p className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-4">
            {city.county} · Same-day appliance repair
          </p>

          <h1 className="text-4xl lg:text-5xl font-bold text-blue-950 leading-tight tracking-tight mb-6">
            Appliance Repair in{''}
            <span className="text-[#ffb81c]">{city.name}, CT</span>
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-2xl">{city.intro}</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <BookingButton className="inline-flex items-center justify-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] text-gray-900 font-bold px-8 py-4 text-base transition-colors duration-200 cursor-pointer shadow-md">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Schedule a Repair
            </BookingButton>
            <a
              href="tel:+19592616736"
              className="inline-flex items-center justify-center gap-2 border-2 border-blue-950 hover:bg-blue-950 hover:text-white text-blue-950 font-bold px-8 py-4 text-base transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              (959) 261-6736
            </a>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
            {[
              'Licensed & Insured',
              'Same-day available',
              '90-day warranty',
              'OEM parts',
              'Background-checked techs',
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#ffb81c] flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-20 bg-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-blue-950 mb-3 text-center">
            Appliances We Repair in {city.name}
          </h2>
          <p className="text-slate-500 text-center mb-10">
            All major brands. OEM parts on board for the most common repairs.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc) => (
              <div key={svc.name} className="bg-white p-6 border border-blue-100 shadow-sm">
                <div className="w-10 h-10 bg-blue-950 flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-[#ffb81c]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    {svc.icon}
                  </svg>
                </div>
                <h3 className="font-bold text-blue-950 mb-1.5">{svc.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-blue-950 mb-12 text-center">
            Why {city.name} Residents Choose Us
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                title: 'Same-Day Service',
                body: 'Call before noon and we typically arrive the same day. Morning, afternoon, and evening slots available across all of Connecticut.',
              },
              {
                title: 'Licensed & Insured',
                body: 'All technicians are CT state licensed, background-checked, and fully insured. Your home is in safe hands.',
              },
              {
                title: '90-Day Warranty',
                body: 'Every repair is backed by a 90-day parts and labor warranty. If the same issue returns, we fix it free of charge.',
              },
              {
                title: 'OEM Parts on Board',
                body: "We carry OEM parts for the most common failures, so most repairs finish in a single visit. If a part isn't on board, we order it and come back.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-8 h-8 bg-[#ffb81c] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-blue-950 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      {nearbyCities.length > 0 && (
        <section className="py-16 bg-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-blue-950 mb-3 text-center">
              Areas Near {city.name} We Also Serve
            </h2>
            <p className="text-slate-500 text-center mb-8">
              We cover all of {city.region} — same-day service throughout {city.county}.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {nearbyCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="px-4 py-2 bg-white border border-blue-200 hover:border-blue-500 hover:text-blue-700 text-slate-600 text-sm font-medium transition-colors duration-200"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-blue-950 mb-10 text-center">
            Appliance Repair FAQ — {city.name}
          </h2>
          <div className="space-y-6">
            {city.faqs.map((faq) => (
              <div key={faq.q} className="bg-blue-50 p-6">
                <h3 className="font-bold text-blue-950 mb-2">{faq.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-950 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Ready to Schedule Your Repair in {city.name}?
          </h2>
          <p className="text-blue-200 mb-8 max-w-lg mx-auto">
            Same-day appointments available. Licensed technicians, 90-day warranty, OEM parts on
            every van.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <BookingButton className="inline-flex items-center justify-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] text-gray-900 font-bold px-8 py-4 transition-all duration-200 cursor-pointer">
              Book a Repair
            </BookingButton>
            <a
              href="tel:+19592616736"
              className="inline-flex items-center justify-center gap-2 border-2 border-blue-600 hover:border-blue-400 text-white font-bold px-8 py-4 transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
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
