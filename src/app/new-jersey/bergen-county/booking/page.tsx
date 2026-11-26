import type { Metadata } from 'next';
import BookingForm from '@/components/BookingForm';
import { bergenMetadata } from '@/lib/bergen-metadata';
import { BRANCHES, NJ_BOOKING_ENABLED, NJ_PATH } from '@/lib/branches';
import { BUSINESS, SERVICE_CALL_FEE } from '@/lib/business';

const base = bergenMetadata();
const branch = BRANCHES.nj;
const title = 'Book Appliance Repair in Bergen County, NJ';
const description = NJ_BOOKING_ENABLED
  ? `Request appliance repair in Bergen County, NJ. Share your ZIP code and appliance issue. Our team confirms appointments. $${SERVICE_CALL_FEE} diagnostic waived with repair.`
  : `Call ${branch.phone} to request appliance repair in Bergen County, NJ and check appointment availability.`;
const url = `${BUSINESS.url}${NJ_PATH}/booking`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  // Same reasoning as /booking: a form, not a landing page.
  robots: { index: false, follow: true },
  openGraph: {
    ...base.openGraph,
    title,
    description,
    url,
  },
  twitter: {
    ...base.twitter,
    title,
    description,
  },
};

export default function Page() {
  return (
    <main className="bg-blue-50 px-4 pb-16 pt-32">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-center text-sm font-semibold text-blue-600">
          Bergen County, NJ
        </p>
        <h1 className="mb-8 text-center text-3xl font-bold text-blue-950">
          Request an appliance repair
        </h1>
        {NJ_BOOKING_ENABLED ? (
          <div className="border border-blue-100 bg-white">
            <BookingForm initialBranch="nj" />
          </div>
        ) : (
          <p className="text-center text-blue-950">
            Call{' '}
            <a href={`tel:${branch.telephone}`} className="font-semibold underline">
              {branch.phone}
            </a>{' '}
            to request a repair and check appointment availability.
          </p>
        )}
      </div>
    </main>
  );
}
