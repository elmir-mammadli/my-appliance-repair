import Image from 'next/image';
import BookingButton from '@/components/BookingButton';
import HeroQuickStart from '@/components/HeroQuickStart';
import { BUSINESS, BUSINESS_HOURS, REVIEW_RATINGS, SERVICE_CALL_FEE } from '@/lib/business';

const DESCRIPTION =
  'Insured technicians repair refrigerators, washers, dryers, dishwashers, ovens, and freezers in New Haven, Hamden, West Haven and across Connecticut, with a written estimate before work begins and a 90-day parts and labor warranty.';

// Identical on both <Image>s on purpose: React dedupes preloads by srcset+sizes, so one
// <link rel=preload> covers the mobile backdrop and the desktop photo.
const HERO_IMAGE_SIZES = '(max-width: 1024px) 100vw, 54vw';

const totalReviews = REVIEW_RATINGS.google.count + REVIEW_RATINGS.thumbtack.count;
// Round down to the nearest ten so the copy stays true as reviews come in.
const reviewFloor = Math.floor(totalReviews / 10) * 10;

const calendarIcon = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const phoneIcon = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const checkIcon = (className: string) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Hero() {
  return (
    <section className="bg-blue-50 pt-20" aria-label="Hero section">
      {/* Mobile and tablet: photo backdrop under a navy wash, copy on top. */}
      <div className="relative isolate overflow-hidden bg-blue-950 text-white lg:hidden">
        <Image
          src="/images/hero/dishwasher.jpg"
          alt="MyAppliance technician working on a dishwasher"
          fill
          priority
          sizes={HERO_IMAGE_SIZES}
          className="object-cover object-[65%_center] opacity-40"
        />
        {/* deslop-keep: photo scrim, keeps the white copy readable over the backdrop */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#101d40] via-[#101d40]/90 to-[#101d40]/35"
          aria-hidden="true"
        />

        <div className="nj-entrance relative px-6 pb-12 pt-18">
          <h1 className="max-w-sm text-4xl font-bold leading-[1.1] sm:text-5xl">
            Same-day appliance repair in Connecticut
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-blue-100">{DESCRIPTION}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <BookingButton className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 bg-[#ffb81c] px-8 py-4 text-base font-bold text-gray-900 transition-colors duration-200 hover:bg-[#c9920d]">
              {calendarIcon}
              Schedule a Repair
            </BookingButton>
            <a
              href={BUSINESS.phone.href}
              className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-white bg-transparent px-8 py-4 text-base font-bold text-white transition-colors duration-200 hover:border-[#ffb81c] hover:text-[#ffb81c]"
            >
              {phoneIcon}
              {BUSINESS.phone.display}
            </a>
          </div>

          <div className="mt-5 flex flex-col flex-wrap text-sm text-blue-100/85 sm:flex-row">
            {[
              '5.0 ★ across Google & Thumbtack',
              'Same-day when available',
              'Diagnostic waived with repair',
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 py-1">
                {checkIcon('h-4 w-4 flex-shrink-0 text-[#ffb81c]')}
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: the photo owns the right half and fades into the navy on the left. */}
      <div className="relative isolate hidden overflow-hidden bg-[#101d40] text-white lg:block">
        <div className="absolute inset-y-0 right-0 w-[54%]" aria-hidden="true">
          <Image
            src="/images/hero/dishwasher.jpg"
            alt=""
            fill
            priority
            sizes={HERO_IMAGE_SIZES}
            className="object-cover object-[60%_center]"
          />
          {/* deslop-keep: photo scrims, they keep the white copy readable where it meets the photo */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#101d40] via-[#101d40]/40 to-transparent" />
          {/* deslop-keep: photo scrim, darkens the photo's foot so the strip's edge reads */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101d40]/80 via-transparent to-transparent" />
        </div>

        <div className="nj-entrance relative mx-auto max-w-7xl px-8 pb-44 pt-24">
          <div className="max-w-2xl">
            {/* The mobile block above owns the page's single <h1>; this desktop copy is
                exposed as a level-1 heading to assistive tech without a second h1 element. */}
            <p role="heading" aria-level={1} className="mb-6 text-[3.75rem] font-bold leading-[1.02]">
              Same-day appliance repair in Connecticut
            </p>

            <p className="mb-7 max-w-xl text-xl leading-relaxed text-blue-100">{DESCRIPTION}</p>

            <ul className="mb-9 space-y-2.5 text-[17px] text-blue-100">
              <li className="flex items-center gap-2.5">
                {checkIcon('h-[18px] w-[18px] flex-shrink-0 text-[#ffb81c]')}
                <span>5.0 ★ on Google and Thumbtack, {reviewFloor}+ reviews</span>
              </li>
              <li className="flex items-center gap-2.5">
                {checkIcon('h-[18px] w-[18px] flex-shrink-0 text-[#ffb81c]')}
                <span>
                  <strong className="font-semibold text-white">${SERVICE_CALL_FEE} diagnostic</strong>,
                  waived when you go ahead with the repair
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                {checkIcon('h-[18px] w-[18px] flex-shrink-0 text-[#ffb81c]')}
                <span>
                  Based in {BUSINESS.address.addressLocality}, open {BUSINESS_HOURS.display}
                </span>
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
              <BookingButton className="inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2 bg-[#ffb81c] px-8 py-3.5 text-base font-bold text-gray-900 transition-colors duration-200 hover:bg-[#e6a619]">
                {calendarIcon}
                Schedule a Repair
              </BookingButton>
              <a
                href={BUSINESS.phone.href}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 border-2 border-white px-7 py-3 text-base font-bold text-white transition-colors duration-200 hover:border-[#ffb81c] hover:text-[#ffb81c]"
              >
                {phoneIcon}
                {BUSINESS.phone.display}
              </a>
              <p className="text-sm leading-tight text-blue-200">
                <span className="block text-base font-bold text-white">Call before noon</span>
                for best same-day availability
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick-start strip: in flow under the mobile hero, overlapping the desktop hero's bottom edge. */}
      <div className="relative mx-auto mt-6 max-w-7xl px-4 pb-12 sm:px-6 lg:-mt-24 lg:px-8 lg:pb-16">
        <HeroQuickStart />
      </div>
    </section>
  );
}
