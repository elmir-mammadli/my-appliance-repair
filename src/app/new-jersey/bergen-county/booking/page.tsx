import type { Metadata } from 'next';
import BookingForm from '@/components/BookingForm';
import { bergenMetadata } from '@/lib/bergen-metadata';
import { NJ_PATH } from '@/lib/branches';
const base = bergenMetadata();
export const metadata: Metadata = {
  ...base,
  title: 'Book Appliance Repair in Bergen County, NJ',
  alternates: { canonical: `https://www.myappliance.us${NJ_PATH}/booking` },
  openGraph: {
    ...base.openGraph,
    title: 'Book Appliance Repair in Bergen County, NJ',
    url: `https://www.myappliance.us${NJ_PATH}/booking`,
  },
};
export default function Page() {
  return (
    <main className="bg-blue-50 px-4 pb-16 pt-32">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-center text-sm font-semibold text-blue-600">
          Bergen County, NJ · (201) 403-0001
        </p>
        <h1 className="mb-8 text-center text-3xl font-bold text-blue-950">
          Request an appliance repair
        </h1>
        <div className="border border-blue-100 bg-white">
          <BookingForm initialBranch="nj" />
        </div>
      </div>
    </main>
  );
}
