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

export default function Hero() {
  return (
    <section className="border-b border-slate-100 bg-white pt-20" aria-label="Hero section">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Appliance Repair Near You
            <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" aria-hidden="true" />
            New Haven, Hamden, West Haven & across CT
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-[1.02] tracking-tight text-blue-950 lg:text-6xl">
            Same-Day Appliance Repair
            <br />
            in <span className="text-[#ffb81c]">Connecticut</span>
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-600">
            Looking for appliance repair near you in Connecticut? We repair refrigerators,
            washing machines, dryers, dishwashers, ovens, freezers, and more with licensed,
            insured technicians, written estimates before work begins, and a 90-day labor warranty.
          </p>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <BookingButton className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#ffb81c] px-8 py-4 text-base font-bold text-gray-900 shadow-md transition-colors duration-200 hover:bg-[#e6a619]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule a Repair
            </BookingButton>
            <a
              href="tel:+19592616736"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-blue-950 px-8 py-4 text-base font-bold text-blue-950 transition-colors duration-200 hover:bg-blue-950 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (959) 261-6736
            </a>
          </div>

          <div className="mb-8 flex flex-wrap gap-3 text-sm text-slate-600">
            {[
              '4.9/5 rating',
              '2,400+ verified reviews',
              'Same-day when available',
              'Diagnostic waived with repair',
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3.5 py-2">
                <svg className="h-4 w-4 flex-shrink-0 text-[#ffb81c]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
                    className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 transition-colors duration-200 hover:border-blue-400 hover:bg-blue-50"
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
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:border-blue-300 hover:bg-white hover:text-blue-800"
                  >
                    {city.label} Appliance Repair
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-slate-100 shadow-2xl shadow-slate-200">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/hero/dishwasher.jpg"
                alt="Connecticut technician performing same-day dishwasher repair service"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/25 to-transparent" aria-hidden="true" />
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

          <div className="absolute -left-4 top-6 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-lg backdrop-blur sm:-left-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Most searched
            </p>
            <ul className="mt-2 space-y-2 text-sm font-semibold text-blue-950">
              <li>Refrigerator repair</li>
              <li>Washing machine repair</li>
              <li>Appliance repair near me</li>
            </ul>
          </div>

          <div className="hidden md:block absolute -bottom-5 right-4 rounded-2xl bg-blue-950 px-5 py-4 text-white shadow-xl sm:right-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
              Service promise
            </p>
            <p className="mt-1 text-lg font-bold">Call before noon for best same-day availability.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
