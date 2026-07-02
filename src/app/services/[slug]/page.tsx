import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import BookingButton from '@/components/BookingButton';
import ServiceFAQ from '@/components/ServiceFAQ';
import {
  services,
  getServiceBySlug,
  getRelatedServices,
} from '@/lib/services';

function jsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = `${service.title} in Connecticut | Same-Day Service`;
  const description = `${service.title} in CT. Same-day service when slots are open, OEM parts on the truck, 90-day warranty. We work on ${service.brands.slice(0, 4).join(', ')} and the rest. Book online or call (959) 261-6736.`;

  return {
    title,
    description,
    keywords: `${service.title.toLowerCase()} Connecticut, ${service.shortName.toLowerCase()} repair near me, ${service.brands.join(', ')}, same-day appliance repair CT`,
    alternates: { canonical: `https://www.myappliance.us/services/${slug}` },
    openGraph: {
      type: 'website',
      url: `https://www.myappliance.us/services/${slug}`,
      title: `${title} | MY APPLIANCE Repair`,
      description,
      images: [
        {
          url: service.heroImage,
          width: 1200,
          height: 800,
          alt: service.heroImageAlt,
        },
      ],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(service.slug, 3);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    name: `${service.title} in Connecticut`,
    description: service.intro,
    provider: {
      '@type': 'LocalBusiness',
      name: 'MY APPLIANCE Repair',
      telephone: '+1-959-261-6736',
      url: 'https://www.myappliance.us',
      image: 'https://www.myappliance.us/og-image.svg',
      areaServed: {
        '@type': 'State',
        name: 'Connecticut',
      },
    },
    areaServed: {
      '@type': 'State',
      name: 'Connecticut',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: 120,
        maxPrice: 400,
        priceCurrency: 'USD',
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.myappliance.us' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.myappliance.us/#services' },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://www.myappliance.us/services/${service.slug}`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const processSteps = [
    { step: '1', title: 'Book online or call', desc: "Tell us what is broken. Two minutes, no account, no credit card." },
    { step: '2', title: 'Tech shows up', desc: 'Same or next day. Parts already on the van for most jobs.' },
    { step: '3', title: 'Written estimate', desc: 'You see the cost before we open anything up. Diagnostic fee waived if you go ahead.' },
    { step: '4', title: 'Fix and warranty', desc: '90 days on parts and labor. If the same issue comes back, we come back.' },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-white pt-20 border-b border-slate-100" aria-label={`${service.title} hero`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <li><Link href="/" className="hover:text-blue-700 transition-colors duration-200">Home</Link></li>
              <li aria-hidden="true">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </li>
              <li><Link href="/#services" className="hover:text-blue-700 transition-colors duration-200">Services</Link></li>
              <li aria-hidden="true">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </li>
              <li className="text-blue-900 font-semibold">{service.title}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT */}
            <div>
              <p className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-6">
                CT · Same-day when we can
              </p>

              <h1 className="text-5xl lg:text-6xl font-bold text-blue-950 leading-[1.1] tracking-tight mb-6">
                {service.heroAccent !== service.title ? (
                  <>
                    <span className="text-[#ffb81c]">{service.heroAccent}</span> repair in Connecticut
                  </>
                ) : (
                  <>
                    Same-day <span className="text-[#ffb81c]">{service.heroAccent}</span> repair
                  </>
                )}
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-lg">
                {service.intro}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-5">
                <BookingButton
                  appliance={service.applianceValue}
                  className="inline-flex items-center justify-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] text-gray-900 font-bold px-8 py-4 rounded-xl text-base transition-colors duration-200 cursor-pointer shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule {service.shortName} Repair
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

              <Link
                href="/#discounts"
                className="inline-flex items-center gap-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 hover:border-amber-300 text-amber-800 text-sm font-semibold px-4 py-2 rounded-full mb-8 transition-colors duration-200 self-start"
                aria-label="See community discounts. Veterans save $30, seniors save $30."
              >
                <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Veterans Save $30 · Seniors Save $30
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                {['OEM parts on the truck', '90 days on parts and labor', 'Written estimate first'].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-[#ffb81c] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — hero image, cropped to 4:5 on white card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 aspect-[4/5] bg-white border border-blue-100">
              <Image
                src={service.heroImage}
                alt={service.heroImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
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

      {/* ── Common Symptoms ── */}
      <section className="py-20 lg:py-28 bg-blue-50" aria-labelledby="symptoms-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
              What goes wrong
            </span>
            <h2 id="symptoms-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
              Sound like your {service.shortName.toLowerCase()}?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These are the calls we get most weeks. If your {service.shortName.toLowerCase()} is doing any of them, we can almost always fix it on the first visit.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.symptoms.map((symptom) => (
              <div
                key={symptom}
                className="bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-blue-900 font-semibold text-sm leading-snug">{symptom}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Parts We Carry ── */}
      <section className="py-20 lg:py-28 bg-white" aria-labelledby="parts-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
              On the truck
            </span>
            <h2 id="parts-heading" className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
              {service.shortName} parts we keep stocked
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Parts we keep in regular rotation, so most {service.shortName.toLowerCase()} jobs finish in one visit.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-8">
            <p className="text-xs text-slate-400 mb-4 font-medium uppercase tracking-wider">Commonly stocked:</p>
            <div className="flex flex-wrap gap-2">
              {service.parts.map((part) => (
                <span
                  key={part}
                  className="text-sm bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1.5 rounded-md font-medium"
                >
                  {part}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Brands Serviced ── */}
      <section className="py-16 bg-blue-50" aria-labelledby="brands-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
            Brands we work on
          </span>
          <h2 id="brands-heading" className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">
            {service.shortName} brands we see every week
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {service.brands.map((brand) => (
              <span
                key={brand}
                className="text-sm bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-md font-medium shadow-sm"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 lg:py-28 bg-white" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
              How a repair goes
            </span>
            <h2 id="process-heading" className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
              Four steps. No surprises.
            </h2>

            {/* Review pill */}
            <div className="inline-flex items-center gap-2 mt-3 bg-white border border-blue-200 rounded-full px-5 py-2 shadow-sm">
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

      {/* ── Related Services ── */}
      <section className="py-20 lg:py-28 bg-blue-50" aria-labelledby="related-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
              Other appliances
            </span>
            <h2 id="related-heading" className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
              Something else broken too?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/services/${r.slug}`}
                className="group bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-12 h-12 bg-blue-700 group-hover:bg-blue-800 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm transition-colors duration-200">
                    {r.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900 text-lg leading-tight group-hover:text-blue-700 transition-colors duration-200">{r.title}</h3>
                    <p className="text-blue-500 text-xs font-medium mt-0.5">{r.subtitle}</p>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{r.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-blue-700 group-hover:text-blue-800 font-bold text-sm">
                  See {r.shortName} Details
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ subset ── */}
      <section className="py-20 lg:py-28 bg-white" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">FAQ</span>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
              {service.shortName} questions we get a lot
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              The {service.shortName.toLowerCase()} questions CT homeowners ask us most. If yours is not here, call us. We can usually diagnose it over the phone.
            </p>
          </div>

          <ServiceFAQ faqs={service.faqs} />

          {/* Bottom CTA */}
          <div className="mt-12 text-center bg-blue-50 border border-blue-100 rounded-2xl p-8">
            <p className="text-blue-900 font-bold text-lg mb-2">Still stuck?</p>
            <p className="text-slate-500 mb-5">A tech can usually diagnose your {service.shortName.toLowerCase()} over the phone. No charge.</p>
            <a
              href="tel:+19592616736"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 cursor-pointer shadow-md"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call (959) 261-6736
            </a>
          </div>
        </div>
      </section>

      {/* ── Final CTA band ── */}
      <section className="py-20 lg:py-28 bg-blue-900" aria-labelledby="final-cta-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-yellow-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Book a repair
          </span>
          <h2 id="final-cta-heading" className="text-3xl sm:text-4xl font-bold text-white mb-5">
            Get your {service.shortName.toLowerCase()} fixed
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Same-day CT service when slots are open. Written estimate before we open anything. OEM parts on the truck. 90 days on parts and labor.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <BookingButton
              appliance={service.applianceValue}
              className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-xl transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-gray-900 bg-[#ffb81c] hover:bg-[#e6a619]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book {service.shortName} Repair
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
