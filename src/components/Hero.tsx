import Image from 'next/image';
import Link from 'next/link';
import BookingButton from '@/components/BookingButton';

const popularRepairs = [
  { href: '/services/refrigerator-repair', label: 'Refrigerator Repair' },
  { href: '/services/washer-repair', label: 'Washing Machine Repair' },
  { href: '/services/dryer-repair', label: 'Clothes Dryer Repair' },
  { href: '/services/dishwasher-repair', label: 'Dishwasher Repair' },
];

const popularCities = [
  { href: '/new-haven', label: 'New Haven' },
  { href: '/hamden', label: 'Hamden' },
  { href: '/west-haven', label: 'West Haven' },
  { href: '/north-haven', label: 'North Haven' },
];

const THUMBTACK_URL =
  'https://www.thumbtack.com/ct/hamden/appliance-repair/my-appliance-repair-llc/service/580267695654707208';

export default function Hero() {
  return (
    <section className="border-b border-slate-100 bg-white pt-20" aria-label="Hero section">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="mb-4 flex flex-col items-start gap-1 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 sm:mb-6 sm:inline-flex sm:flex-row sm:items-center sm:gap-2">
            <span>Appliance Repair Near You</span>
            <span className="hidden h-1.5 w-1.5 bg-[#F97316] sm:inline-block" aria-hidden="true" />
            <span>New Haven, Hamden, West Haven & across CT</span>
          </p>

          <h1 className="mb-5 text-4xl font-bold leading-[1.05] tracking-tight text-blue-950 sm:mb-6 sm:text-5xl sm:leading-[1.02] lg:text-6xl">
            Same-Day Appliance Repair in <span className="text-[#ffb81c]">Connecticut</span>
          </h1>

          <p className="mb-6 max-w-xl text-base leading-relaxed text-slate-600 sm:mb-8 sm:text-lg">
            Insured technicians repair refrigerators, washers, dryers, dishwashers, ovens,
            and freezers across Connecticut, with a written estimate before work begins and a
            90-day labor warranty.
          </p>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <BookingButton className="inline-flex cursor-pointer min-h-12 items-center justify-center gap-2 bg-[#ffb81c] px-8 py-4 text-base font-bold text-gray-900 transition-colors duration-200 hover:bg-[#c9920d]">
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
              href="tel:+19592616736"
              className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-blue-950 px-8 py-4 text-base font-bold text-blue-950 transition-colors duration-200 hover:bg-blue-950 hover:text-white"
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
              (959) 261-6736
            </a>
          </div>

          <div className="mb-8 flex flex-wrap text-sm text-slate-600">
            {[
              '5.0 ★ across Google & Thumbtack',
              'Same-day when available',
              'Diagnostic waived with repair',
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 bg-slate-50 px-3.5 py-2">
                <svg
                  className="h-4 w-4 flex-shrink-0 text-[#ffb81c]"
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

          <div className="space-y-5">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Popular Repairs
              </p>
              <div className="flex flex-wrap gap-2.5">
                {popularRepairs.map((repair) => (
                  <Link
                    key={repair.href}
                    href={repair.href}
                    className=" border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 transition-colors duration-200 hover:border-blue-400 hover:bg-blue-50"
                  >
                    {repair.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Nearby Cities
              </p>
              <div className="flex flex-wrap gap-2.5">
                {popularCities.map((city) => (
                  <Link
                    key={city.href}
                    href={city.href}
                    className=" border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:border-blue-300 hover:bg-white hover:text-blue-800"
                  >
                    {city.label} Appliance Repair
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden border border-blue-100 bg-slate-100 shadow-2xl shadow-slate-200">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/hero/dishwasher.jpg"
                alt="Connecticut technician performing same-day dishwasher repair service"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/25 to-transparent"
                aria-hidden="true"
              />

              <a
                href={THUMBTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-3 top-3 z-10 flex items-center gap-2.5 border border-slate-100 bg-white/95 px-3 py-2.5 shadow-lg backdrop-blur transition-transform duration-200 hover:-translate-y-0.5 sm:right-4 sm:top-4 sm:px-3.5"
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-black">
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      fill="#FFF"
                      d="M8.973 10.385a3.71 3.71 0 01-.564 1.957L8 13l-.409-.658a3.704 3.704 0 01-.564-1.957v-3.14C7.51 6.62 8.231 6.4 8.973 6.4v3.985zM4 5.69V4h8v1.69H4z"
                    />
                  </svg>
                </span>
                <div className="leading-tight">
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-950">
                    Exceptional
                  </p>
                  <div className="mt-0.5 flex items-center gap-1">
                    <div className="flex gap-px" aria-hidden="true">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg
                          key={i}
                          className="h-2.5 w-2.5 text-[#ffb81c]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[11px] font-medium text-slate-500">113 on Thumbtack</span>
                  </div>
                </div>
              </a>

              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.24em] text-[#ffb81c]">
                  Refrigerator, washer, dryer, dishwasher & oven repair
                </p>
                <p className="text-2xl font-bold leading-tight text-white">
                  Local technicians. Written estimate. Repair backed by warranty.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute hidden md:block -left-4 top-6 border border-white/70 bg-white/95 p-4 shadow-lg backdrop-blur sm:-left-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Most searched
            </p>
            <ul className="mt-2 space-y-2 text-sm font-semibold text-blue-950">
              <li>Refrigerator repair</li>
              <li>Washing machine repair</li>
              <li>Appliance repair near me</li>
            </ul>
          </div>

          <div className="hidden md:block absolute -bottom-5 right-4 bg-blue-950 px-5 py-4 text-white sm:right-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
              Service promise
            </p>
            <p className="mt-1 text-lg font-bold">
              Call before noon for best same-day availability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
