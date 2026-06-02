import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Leave a Review | MyAppliance Repair LLC',
  description:
    'Share your experience with MyAppliance Repair LLC. Leave a review on Google, Yelp, or Thumbtack, or follow us on Instagram.',
  alternates: { canonical: 'https://myappliance.us/socials' },
  robots: { index: false, follow: false },
};

type ReviewLink = {
  key: string;
  name: string;
  title: string;
  description: string;
  url: string;
  cta: string;
  badge?: string;
  icon: React.ReactNode;
  accent: string;
};

const GoogleIcon = (
  <svg
    width="36"
    height="36"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
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
);

const YelpIcon = (
  <Image
    src="/images/yelp.svg"
    alt="Yelp"
    width={36}
    height={36}
    className="rounded-lg"
    aria-hidden="true"
  />
);

const ThumbtackIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 16 16"
    aria-hidden="true"
  >
    <path fill="#000000" d="M8 0a8 8 0 100 16A8 8 0 008 0" />
    <path fill="#FFF" d="M8.973 10.385a3.71 3.71 0 01-.564 1.957L8 13l-.409-.658a3.704 3.704 0 01-.564-1.957v-3.14C7.51 6.62 8.231 6.4 8.973 6.4v3.985zM4 5.69V4h8v1.69H4z" />
  </svg>
);

const InstagramIcon = (
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#feda75" />
        <stop offset="25%" stopColor="#fa7e1e" />
        <stop offset="50%" stopColor="#d62976" />
        <stop offset="75%" stopColor="#962fbf" />
        <stop offset="100%" stopColor="#4f5bd5" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad)" />
    <rect
      x="5"
      y="5"
      width="14"
      height="14"
      rx="4"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.8"
    />
    <circle cx="12" cy="12" r="3.6" fill="none" stroke="#ffffff" strokeWidth="1.8" />
    <circle cx="17" cy="7" r="1.1" fill="#ffffff" />
  </svg>
);

const reviewLinks: ReviewLink[] = [
  {
    key: 'google',
    name: 'Google',
    title: 'Leave us a Google Review',
    description: 'A 60-second review goes a long way.',
    url: 'https://share.google/aktwu5fUEtjV6Eo40',
    cta: 'Write a Review',
    badge: 'Most helpful for local ranking',
    icon: GoogleIcon,
    accent: '#4285F4',
  },
  {
    key: 'yelp',
    name: 'Yelp',
    title: 'Review us on Yelp',
    description: 'Help neighbors find a repair team they can trust.',
    url: 'https://www.yelp.com/writeareview/biz/4qpGmPtt9HvAqeKYkFw4Bw?review_origin=writeareview-landing&rating=5&uuid=96653301-8e8b-40e9-b4d9-76129f1229e4',
    cta: 'Write a Review',
    icon: YelpIcon,
    accent: '#d32323',
  },
  {
    key: 'thumbtack',
    name: 'Thumbtack',
    title: 'Rate us on Thumbtack',
    description: 'Tell other Thumbtack customers about your service.',
    url: 'https://www.thumbtack.com/reviews/services/580267695654707208/write-customer-review',
    cta: 'Leave a Review',
    icon: ThumbtackIcon,
    accent: '#009fd9',
  },
];

const instagramLink = {
  title: 'Follow us on Instagram',
  description: 'Repair tips, before-and-afters, and behind the scenes.',
  url: 'https://www.instagram.com/myappliancerepair',
  cta: 'Follow @myappliancerepair',
};

export default function SocialsPage() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-blue-50"
      style={{
        background:
          'radial-gradient(ellipse at top, #ffffff 0%, #EFF6FF 45%, #DBEAFE 100%)',
      }}
    >
      {/* Architectural background grid — subtle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(30, 58, 138, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(30, 58, 138, 0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      {/* Soft accent blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-24 h-80 w-80 rounded-full blur-3xl opacity-40"
        style={{ background: 'radial-gradient(circle, #93C5FD, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, #F97316, transparent 70%)' }}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
        {/* Header */}
        <header className="socials-fade-in flex flex-col items-center text-center">
          <div className="rounded-2xl bg-white/80 px-6 py-4 shadow-[0_8px_32px_-12px_rgba(30,58,138,0.18)] ring-1 ring-blue-100 backdrop-blur-sm">
            <Image
              src="/logo.svg"
              alt="MyAppliance Repair LLC"
              width={200}
              height={66}
              className="h-12 w-auto sm:h-14"
              priority
            />
          </div>

          <h1
            className="mt-8 text-balance text-3xl font-bold leading-tight tracking-tight text-blue-900 sm:text-4xl font-[family-name:var(--font-lexend)]"
          >
            Love our service? Let us know! <span aria-hidden="true">⭐</span>
          </h1>

          <p className="mt-3 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg font-[family-name:var(--font-source-sans-3)]">
            Your review helps Connecticut families find trusted repair service.
          </p>
        </header>

        {/* Cards */}
        <section
          aria-label="Review and social platforms"
          className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2"
        >
          {reviewLinks.map((link, idx) => (
            <a
              key={link.key}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="socials-fade-in group relative flex min-h-[88px] flex-col overflow-hidden rounded-2xl bg-white p-5 shadow-[0_4px_20px_-8px_rgba(30,58,138,0.18)] ring-1 ring-blue-100/80 transition-all duration-300 will-change-transform hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_rgba(30,58,138,0.28)] hover:ring-blue-200 active:scale-[0.98] sm:p-6"
              style={{ animationDelay: `${120 + idx * 80}ms` }}
              aria-label={`${link.title} — opens ${link.name} in a new tab`}
            >
              {/* Accent stripe */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-1 transition-all duration-300 group-hover:w-1.5"
                style={{ backgroundColor: link.accent }}
              />

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-100 transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
                  {link.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold leading-snug text-blue-900 font-[family-name:var(--font-lexend)] sm:text-xl">
                      {link.title}
                    </h2>
                  </div>
                  {link.badge ? (
                    <span
                      className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-700 ring-1 ring-amber-200/80 font-[family-name:var(--font-source-sans-3)]"
                    >
                      <svg
                        className="h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 2l2.39 7.36H22l-6.18 4.49L18.21 22 12 17.27 5.79 22l2.39-8.15L2 9.36h7.61L12 2z" />
                      </svg>
                      {link.badge}
                    </span>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 font-[family-name:var(--font-source-sans-3)]">
                    {link.description}
                  </p>
                </div>
              </div>

              <div
                className="mt-5 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 group-hover:shadow-md font-[family-name:var(--font-lexend)]"
                style={{ backgroundColor: '#F97316' }}
              >
                <span>{link.cta}</span>
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
              </div>
            </a>
          ))}

          {/* Instagram — lighter, social, not a review prompt */}
          <a
            href={instagramLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="socials-fade-in group relative col-span-1 flex min-h-[88px] flex-col overflow-hidden rounded-2xl p-5 text-white shadow-[0_6px_24px_-8px_rgba(214,41,118,0.45)] transition-all duration-300 will-change-transform hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(214,41,118,0.55)] active:scale-[0.98] sm:p-6 md:col-span-2"
            style={{
              background:
                'linear-gradient(120deg, #feda75 0%, #fa7e1e 22%, #d62976 55%, #962fbf 80%, #4f5bd5 100%)',
              animationDelay: `${120 + reviewLinks.length * 80}ms`,
            }}
            aria-label={`${instagramLink.title} — opens Instagram in a new tab`}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
                {InstagramIcon}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold leading-snug font-[family-name:var(--font-lexend)] sm:text-xl">
                  {instagramLink.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-white/90 font-[family-name:var(--font-source-sans-3)]">
                  {instagramLink.description}
                </p>
              </div>

              <div className="hidden items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold ring-1 ring-white/25 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/25 sm:flex font-[family-name:var(--font-lexend)]">
                <span>{instagramLink.cta}</span>
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
              </div>
            </div>

            {/* Mobile CTA row */}
            <div className="mt-4 flex items-center justify-between rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold ring-1 ring-white/25 backdrop-blur-sm sm:hidden font-[family-name:var(--font-lexend)]">
              <span>{instagramLink.cta}</span>
              <svg
                className="h-4 w-4"
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
            </div>
          </a>
        </section>

        {/* Tap-to-call */}
        <a
          href="tel:+19592616736"
          className="socials-fade-in mt-8 flex items-center justify-center gap-2.5 rounded-2xl border border-blue-200 bg-white/70 px-6 py-4 text-base font-semibold text-blue-900 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-blue-300 hover:bg-white hover:shadow-md active:scale-[0.98] font-[family-name:var(--font-lexend)]"
          style={{ animationDelay: `${120 + (reviewLinks.length + 1) * 80}ms` }}
          aria-label="Call MyAppliance Repair at (959) 261-6736"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span>Or call us: (959) 261-6736</span>
        </a>

        {/* Footer */}
        <footer className="socials-fade-in mt-auto pt-10 text-center" style={{ animationDelay: '720ms' }}>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 transition-colors duration-200 hover:text-blue-900 font-[family-name:var(--font-source-sans-3)]"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            myappliance.us
          </Link>
          <p className="mt-3 text-xs text-slate-500 font-[family-name:var(--font-source-sans-3)]">
            &copy; 2025 MyAppliance Repair LLC &middot; Connecticut
          </p>
        </footer>
      </div>

      {/* Scoped styles for entrance animation + reduced-motion respect */}
      <style>{`
        @keyframes socialsFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .socials-fade-in {
          opacity: 0;
          animation: socialsFadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .socials-fade-in {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}
