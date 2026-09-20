import Link from 'next/link';
import Image from 'next/image';
import { BRANCHES, NJ_PATH } from '@/lib/branches';

export default function BergenFooter() {
  const branch = BRANCHES.nj;
  return (
    <footer className="bg-[#080f1e] px-6 py-12 text-blue-100">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-3">
        <div>
          <Link href={NJ_PATH}>
            <Image
              src="/logo.svg"
              alt="MyAppliance Repair LLC"
              width={180}
              height={60}
              className="h-12 w-auto brightness-0 invert"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-blue-200/70">
            Appliance repair for Bergen County homes. A clear diagnosis. A written estimate. Care
            that lasts.
          </p>
        </div>
        <div>
          <p className="mb-4 font-semibold text-white">Bergen County, New Jersey</p>
          <a href={`tel:${branch.telephone}`} className="text-xl font-semibold text-[#ffb81c]">
            {branch.phone}
          </a>
          <p className="mt-2 text-sm">{branch.hours}</p>
          <p className="mt-2 text-sm">In-home service · Appointment required</p>
        </div>
        <nav aria-label="New Jersey footer" className="flex flex-col items-start gap-3 text-sm">
          <Link href={`${NJ_PATH}#coverage`} className="hover:text-white">
            Service areas
          </Link>
          <Link href={`${NJ_PATH}/booking`} className="hover:text-white">
            Request a repair
          </Link>
          <Link href="/" className="hover:text-white">
            Connecticut branch ↗
          </Link>
          <div className="flex gap-5">
            <a
              href="https://www.instagram.com/myappliancerepair"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </a>
            <a
              href="https://www.facebook.com/myappliancerepairllc"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook ↗
            </a>
          </div>
        </nav>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap justify-between gap-4 border-t border-white/15 pt-6 text-xs text-blue-200/60">
        <p>© {new Date().getFullYear()} MyAppliance Repair LLC.</p>
        <div className="flex gap-5">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
