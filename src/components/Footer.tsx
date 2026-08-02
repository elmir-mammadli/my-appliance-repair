import Image from 'next/image';
import Link from 'next/link';
import { cities } from '@/lib/cities';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'About Us', href: '/about' },
  { label: 'Blog & Tips', href: '/blog' },
  { label: 'Book a Repair', href: '/#book' },
  { label: 'Careers', href: '/#join' },
];

const serviceLinks = [
  { label: 'Refrigerator Repair', href: '/services/refrigerator-repair' },
  { label: 'Washer Repair', href: '/services/washer-repair' },
  { label: 'Dryer Repair', href: '/services/dryer-repair' },
  { label: 'Dishwasher Repair', href: '/services/dishwasher-repair' },
  { label: 'Oven & Range Repair', href: '/services/oven-range-repair' },
  { label: 'Same-Day Emergency', href: '/services' },
];

function ArrowLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const cls =
    'group flex items-center gap-2.5 text-sm text-blue-200/70 hover:text-white transition-colors duration-200';
  const icon = (
    <svg
      className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {icon}
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {icon}
      {label}
    </Link>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080f1e] text-blue-200/70" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/logo.svg"
              alt="MyAppliance Repair LLC"
              width={180}
              height={60}
              className="h-11 w-auto mb-5"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-sm leading-relaxed mb-6">
              Connecticut&apos;s trusted appliance repair experts. Licensed, insured technicians
              with a 90-day warranty on every repair.
            </p>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-[#F97316] flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <span className="font-semibold text-white">Connecticut, USA</span>
              </li>
              <li>
                <a
                  href="tel:+19592616736"
                  className="flex items-center gap-3 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 text-[#F97316] flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-semibold text-white">(959) 261-6736</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:service@myappliance.us"
                  className="flex items-center gap-3 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 text-[#F97316] flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>service@myappliance.us</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 font-[family-name:var(--font-lexend)]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <ArrowLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Our Services */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 font-[family-name:var(--font-lexend)]">
              Our Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s.label}>
                  <ArrowLink href={s.href} label={s.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Service Areas */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 font-[family-name:var(--font-lexend)]">
              Service Areas
            </h3>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${city.slug}`}
                    className="text-xs text-blue-200/70 hover:text-white transition-colors duration-200"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 — Connect With Us */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 font-[family-name:var(--font-lexend)]">
              Connect With Us
            </h3>
            <p className="text-sm leading-relaxed mb-5">
              Love our service? Share your experience and help Connecticut neighbors find trusted
              appliance repair.
            </p>

            <div className="flex items-center gap-3 mb-5">
              {/* Google */}
              <a
                href="https://share.google/aktwu5fUEtjV6Eo40"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Leave us a Google review"
                className="flex h-10 w-10 items-center justify-center bg-white/10 ring-1 ring-white/15 hover:bg-white/20 transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
                  />
                  <path
                    fill="#EA4335"
                    d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
                  />
                </svg>
              </a>

              {/* Yelp */}
              <a
                href="https://www.yelp.com/writeareview/biz/4qpGmPtt9HvAqeKYkFw4Bw?review_origin=writeareview-landing&rating=5&uuid=96653301-8e8b-40e9-b4d9-76129f1229e4"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Review us on Yelp"
                className="flex h-10 w-10 items-center justify-center bg-white/10 ring-1 ring-white/15 hover:bg-white/20 transition-colors duration-200 overflow-hidden"
              >
                <Image src="/images/yelp.svg" alt="Yelp" width={28} height={28} />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/myappliancerepair"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="flex h-10 w-10 items-center justify-center bg-white/10 ring-1 ring-white/15 hover:bg-white/20 transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <defs>
                    <linearGradient id="footer-ig" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#feda75" />
                      <stop offset="40%" stopColor="#fa7e1e" />
                      <stop offset="65%" stopColor="#d62976" />
                      <stop offset="100%" stopColor="#4f5bd5" />
                    </linearGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#footer-ig)" />
                  <rect
                    x="5"
                    y="5"
                    width="14"
                    height="14"
                    rx="4"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.8"
                  />
                  <circle cx="12" cy="12" r="3.6" fill="none" stroke="#fff" strokeWidth="1.8" />
                  <circle cx="17" cy="7" r="1.1" fill="#fff" />
                </svg>
              </a>
            </div>

            <Link
              href="/socials"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F97316] hover:text-orange-400 transition-colors duration-200 font-[family-name:var(--font-lexend)]"
            >
              Leave us a review
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-white/10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/40">
          <p>&copy; {currentYear} MyAppliance Repair LLC. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
          <div className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>CT License #HIC.0642318</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
