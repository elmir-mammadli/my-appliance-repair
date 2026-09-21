import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import BookingButton from './BookingButton';
import BrandsGrid from './BrandsGrid';
import { BRANCHES, NJ_PATH } from '@/lib/branches';
import { BERGEN_MUNICIPALITIES, BERGEN_TOWNS, type BergenTown } from '@/lib/bergen';
import { APPLIANCE_REPAIR_COST_ANSWER } from '@/lib/business';

const repairs = [
  {
    name: 'Refrigerator',
    appliance: 'Refrigerator',
    symptoms: 'Not cooling · Ice maker trouble · Water leaks',
    image: 'refrigerator-repair',
  },
  {
    name: 'Washer',
    appliance: 'Washer',
    symptoms: 'Won’t spin · Won’t drain · Shaking or leaks',
    image: 'washer-repair',
  },
  {
    name: 'Dryer',
    appliance: 'Dryer',
    symptoms: 'No heat · Long cycles · Squeaking or thumping',
    image: 'dryer-repair',
  },
  {
    name: 'Dishwasher',
    appliance: 'Dishwasher',
    symptoms: 'Standing water · Dirty dishes · Leaks',
    image: 'dishwasher-repair',
  },
  {
    name: 'Oven & range',
    appliance: 'Oven / Range',
    symptoms: 'Not heating · Uneven temperature · Burner issues',
    image: 'oven-range-repair',
  },
  {
    name: 'More appliances',
    appliance: 'Other',
    symptoms: 'Freezers · Cooktops · Microwaves',
    image: 'more-appliances',
  },
];
const buttonClass =
  'inline-flex min-h-12 items-center justify-center gap-3 bg-[#ffb81c] px-6 py-3.5 font-semibold text-blue-950 transition-colors hover:bg-[#ffd071] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400';

export default function BergenPage({ town }: { town?: BergenTown }) {
  const branch = BRANCHES.nj;
  const area = town?.name ?? 'Bergen County';
  const path = town ? `${NJ_PATH}/${town.slug}` : NJ_PATH;
  const faqs = [
    ...(town ? [{ q: town.question, a: town.answer }] : []),
    {
      q: `How much does an appliance repair visit in ${area} cost?`,
      a: APPLIANCE_REPAIR_COST_ANSWER,
    },
    {
      q: 'Can I request a same-day appointment?',
      a: 'Call our NJ team to check the schedule. Same-day appointments depend on technician availability, your address, and the appliance. We confirm the appointment with you before dispatch.',
    },
    {
      q: 'Which brands and appliances can I book?',
      a: 'We take requests for refrigerators, washers, dryers, dishwashers, ovens, ranges, freezers, cooktops, and microwaves. Tell us the brand and model, including specialty or built-in appliances, so we can confirm service and parts availability.',
    },
    {
      q: 'Is the repair covered by a warranty?',
      a: 'Our repairs include a 90-day parts and labor warranty. Your technician explains the repair and warranty before work begins.',
    },
    {
      q: 'Do you cover my Bergen County town?',
      a: 'We accept service requests from all 70 Bergen County municipalities. Enter your ZIP code and municipality when booking. Our team confirms your service address and appointment availability before scheduling.',
    },
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.myappliance.us/#organization',
        name: 'MyAppliance Repair LLC',
        url: 'https://www.myappliance.us',
        logo: 'https://www.myappliance.us/logo.svg',
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.myappliance.us/#website',
        name: 'MyAppliance Repair LLC',
        url: 'https://www.myappliance.us',
      },
      {
        '@type': 'LocalBusiness',
        '@id': `https://www.myappliance.us${NJ_PATH}#business`,
        name: 'MyAppliance Repair LLC',
        url: `https://www.myappliance.us${NJ_PATH}`,
        telephone: branch.telephone,
        image: 'https://www.myappliance.us/images/hero/dishwasher.jpg',
        parentOrganization: { '@id': 'https://www.myappliance.us/#organization' },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Bergen County',
          containedInPlace: { '@type': 'State', name: 'New Jersey' },
        },
        openingHours: 'Mo-Su 08:00-18:00',
        priceRange: '$$',
        sameAs: [
          'https://www.instagram.com/myappliancerepair',
          'https://www.facebook.com/myappliancerepairllc',
        ],
      },
      {
        '@type': 'Service',
        name: `Appliance repair in ${area}, NJ`,
        provider: { '@id': `https://www.myappliance.us${NJ_PATH}#business` },
        areaServed: {
          '@type': town ? 'City' : 'AdministrativeArea',
          name: area,
          containedInPlace: { '@type': 'State', name: 'New Jersey' },
        },
        url: `https://www.myappliance.us${path}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.myappliance.us' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Bergen County, NJ',
            item: `https://www.myappliance.us${NJ_PATH}`,
          },
          ...(town
            ? [
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: town.name,
                  item: `https://www.myappliance.us${path}`,
                },
              ]
            : []),
        ],
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <main className="bg-white">
        <section className="relative isolate overflow-hidden bg-blue-950 pb-16 pt-32 text-white sm:pb-20 lg:pb-24 lg:pt-40">
          <Image
            src="/images/hero/dishwasher.jpg"
            alt="MyAppliance technician working on a dishwasher"
            fill
            sizes="100vw"
            preload
            className="object-cover object-[65%_center] opacity-40 lg:opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101d40] via-[#101d40]/90 to-[#101d40]/20" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="mb-10 flex flex-wrap gap-2 text-xs text-blue-100/75"
            >
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link href={NJ_PATH} className="hover:text-white">
                Bergen County, NJ
              </Link>
              {town && (
                <>
                  <span aria-hidden="true">/</span>
                  <span aria-current="page">{town.name}</span>
                </>
              )}
            </nav>
            <div className="nj-entrance max-w-2xl">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#ffb81c]">
                MyAppliance Repair · New Jersey
              </p>
              <h1 className="max-w-xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                Appliance repair
                <br />
                in {area}
                <span className="text-[#ffb81c]">.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-blue-100">
                Your home has enough moving parts. Let us take care of the ones that stop working.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <BookingButton
                  branchId="nj"
                  municipality={town?.name}
                  className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 bg-[#ffb81c] px-8 py-4 text-base font-bold text-gray-900 transition-colors duration-200 hover:bg-[#c9920d]"
                >
                  <svg
                    className="h-5 w-5"
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
                  href={`tel:${branch.telephone}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-white bg-transparent px-8 py-4 text-base font-bold text-white transition-colors duration-200 hover:border-[#ffb81c] hover:text-[#ffb81c]"
                >
                  <svg
                    className="h-5 w-5"
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
                  {branch.phone}
                </a>
              </div>
              <p className="mt-5 text-sm text-blue-100/75">
                $99 service call · Written estimate · 90-day warranty
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-[#f5f7fb] px-6 py-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-bold tracking-tight text-blue-950">$99</span>
              <div>
                <h2 className="font-semibold text-blue-950">The service call. Not a surprise.</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Waived when you proceed with the repair.
                </p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-600">
              Your technician diagnoses the problem and gives you a written repair quote on-site.
              You decide before work begins.
            </p>
          </div>
        </section>

        {town && (
          <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-2 lg:gap-20 lg:px-8">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-600">
                {town.name} · {town.zip}
              </p>
              <h2 className="text-3xl font-bold text-blue-950">
                A repair visit that starts with the details.
              </h2>
              <p className="mt-5 leading-relaxed text-slate-600">{town.intro}</p>
            </div>
            <div className="border-l-2 border-[#ffb81c] pl-6">
              <h3 className="text-lg font-semibold text-blue-950">Before your {town.name} visit</h3>
              <p className="mt-4 leading-relaxed text-slate-600">{town.preparation}</p>
              <p className="mt-4 text-sm text-slate-500">
                Requests go to our Bergen County team at {branch.phone}. Your preferred date is
                confirmed by our team.
              </p>
            </div>
          </section>
        )}

        <section
          id="services"
          className="mx-auto max-w-7xl scroll-mt-28 px-6 py-16 lg:px-8 lg:py-20"
        >
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-600">
                Kitchen to laundry room
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">
                What needs a little attention?
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              Choose your appliance to start a repair request. Add the symptoms and we’ll take it
              from there.
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {repairs.map((repair) => (
              <article key={repair.name} className="group border-b border-slate-200 pb-5">
                <div className="relative mb-5 aspect-[16/9] overflow-hidden bg-slate-100">
                  <Image
                    src={`/images/services/${repair.image}.jpg`}
                    alt={`${repair.name} appliance service`}
                    fill
                    sizes="(min-width:1024px) 380px, (min-width:640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="text-xl font-semibold text-blue-950">
                  {repair.appliance === 'Other' ? repair.name : `${repair.name} repair`}
                </h3>
                <p className="mt-2 text-sm text-slate-500">{repair.symptoms}</p>
                <BookingButton
                  branchId="nj"
                  municipality={town?.name}
                  appliance={repair.appliance}
                  className="mt-4 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-blue-700 hover:text-blue-950"
                >
                  Request service <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </BookingButton>
              </article>
            ))}
          </div>
        </section>

        <BrandsGrid regionName="Bergen County" telephone={branch.telephone} />

        <section
          id="how-it-works"
          className="scroll-mt-28 bg-blue-950 px-6 py-16 text-white lg:py-20"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#ffb81c]">
                Clear from the first call
              </p>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                A plan for your appliance.
                <br />
                And your day.
              </h2>
              <p className="mt-5 max-w-sm leading-relaxed text-blue-100/75">
                One local number for Bergen County. A real conversation about your repair. No work
                begins without your approval.
              </p>
            </div>
            <ol className="divide-y divide-white/20">
              {[
                [
                  'Tell us what happened',
                  'Share the appliance, symptoms, and service address. We confirm coverage and arrange an available appointment.',
                ],
                [
                  'Get a diagnosis & quote',
                  'The $99 service call covers the diagnostic. Your technician explains the repair and its price before you decide.',
                ],
                [
                  'Get back to your routine',
                  'Approve the repair and the service call fee is waived. Completed repairs include a 90-day parts and labor warranty.',
                ],
              ].map(([title, copy], index) => (
                <li key={title} className="flex gap-6 py-6 first:pt-0 last:pb-0">
                  <span className="text-sm font-semibold text-[#ffb81c]">0{index + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-blue-100/75">{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="coverage"
          className="mx-auto max-w-7xl scroll-mt-28 px-6 py-16 lg:px-8 lg:py-20"
        >
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-600">
                Our New Jersey service area
              </p>
              <h2 className="text-3xl font-bold text-blue-950 sm:text-4xl">
                Bergen County.
                <br />
                All 70 municipalities.
              </h2>
              <p className="mt-5 leading-relaxed text-slate-600">
                From your kitchen to the laundry room, we come to you. Start with your ZIP code;
                we’ll confirm your address and the next available appointment.
              </p>
              <a
                href={`tel:${branch.telephone}`}
                className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-blue-700"
              >
                Check your address: {branch.phone}
                <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-x-6">
                {BERGEN_TOWNS.map((place) => (
                  <Link
                    key={place.slug}
                    href={`${NJ_PATH}/${place.slug}`}
                    aria-current={town?.slug === place.slug ? 'page' : undefined}
                    className="group flex min-h-14 items-center justify-between gap-2 border-b border-slate-200 py-3 font-medium text-blue-950 hover:text-blue-600"
                  >
                    <span>{place.name}</span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
              <details className="mt-6 border-b border-slate-200 pb-5">
                <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold text-blue-700">
                  See all 70 municipalities
                </summary>
                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-600 sm:grid-cols-3">
                  {BERGEN_MUNICIPALITIES.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="scroll-mt-28 border-y border-slate-200 bg-[#f5f7fb] px-6 py-16"
        >
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-600">
                Before you book
              </p>
              <h2 className="text-3xl font-bold text-blue-950">A few useful answers.</h2>
            </div>
            <div className="divide-y divide-slate-200">
              {faqs.map(({ q, a }) => (
                <details key={q} className="py-5 first:pt-0">
                  <summary className="cursor-pointer py-2 pr-4 font-semibold text-blue-950">
                    {q}
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 sm:flex-row sm:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-bold text-blue-950">Let’s get your home running again.</h2>
            <p className="mt-3 text-slate-500">Bergen County appointments · {branch.hours}</p>
          </div>
          <BookingButton
            branchId="nj"
            municipality={town?.name}
            className={`${buttonClass} shrink-0`}
          >
            Book my repair <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </BookingButton>
        </section>
      </main>
    </>
  );
}
