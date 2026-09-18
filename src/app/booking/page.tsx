import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { SERVICE_AREAS, SERVICE_CALL_FEE } from '@/lib/business';

export const metadata: Metadata = {
  title: 'Book Appliance Repair in CT | Same-Day Service',
  description:
    `Book appliance repair in ${SERVICE_AREAS.length} Connecticut communities. $${SERVICE_CALL_FEE} service call, on-site repair quote, insured technicians, and a 90-day warranty.`,
  alternates: { canonical: 'https://www.myappliance.us/booking' },
  openGraph: {
    type: 'website',
    url: 'https://www.myappliance.us/booking',
    title: 'Book Appliance Repair | MyAppliance Repair LLC',
    description:
      `Schedule appliance repair in our Connecticut service area. $${SERVICE_CALL_FEE} service call, on-site repair quote, and a 90-day warranty.`,
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
  },
};

const trustBadges = [
  'Fully Insured',
  'Same-day available',
  '90-day warranty',
  `$${SERVICE_CALL_FEE} service call`,
];

export default function BookingPage() {
  return (
    <main className="min-h-full flex flex-col">
      <Navbar />

      {/* Page header */}
      <section className="bg-white pt-20 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 lg:py-14 text-center">
          <p className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-3">
            Connecticut · Same-day appliance repair
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-blue-950 mb-4">
            Book Your Appliance Repair
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto mb-6 hidden md:block">
            Share your contact details and appliance issue. We&apos;ll call to confirm coverage
            for your address and appointment availability. Your technician provides the repair
            quote on-site.
          </p>
          <div className="hidden md:flex flex-wrap justify-center gap-x-6 gap-y-2">
            {trustBadges.map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 text-sm text-slate-500">
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
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="flex-1 bg-white md:bg-blue-50 pb-4 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white md:shadow-sm md:border border-blue-100">
            <BookingForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
