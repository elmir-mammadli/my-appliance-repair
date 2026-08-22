import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import BookingModal from '@/components/BookingModal';
import NotFoundActions from '@/components/NotFoundActions';

export const metadata: Metadata = {
  title: 'Page Not Found | MyAppliance Repair LLC',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      {/* Static header — Navbar is'use client'; replicate the shell here */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center group cursor-pointer">
            <Image
              src="/logo.svg"
              alt="MyAppliance Repair LLC"
              width={160}
              height={53}
              className="h-11 w-auto transition-transform duration-200 group-hover:scale-105"
              priority
            />
          </Link>

          <a
            href="tel:+19592616736"
            className="hidden sm:flex items-center gap-2 text-blue-900 hover:text-blue-600 font-semibold text-sm transition-colors duration-200"
            aria-label="Call us now"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            (959) 261-6736
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="min-h-screen flex flex-col items-center justify-center bg-blue-50 pt-20 px-4">
        {/* Broken appliance illustration */}
        <div className="relative mb-8" aria-hidden="true">
          {/* Washer outline */}
          <svg
            width="160"
            height="160"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md"
          >
            {/* Appliance body */}
            <rect
              x="20"
              y="30"
              width="120"
              height="115"
              rx="10"
              fill="white"
              stroke="#1E3A8A"
              strokeWidth="3.5"
            />
            {/* Control panel top */}
            <rect x="20" y="30" width="120" height="28" rx="10" fill="#1E3A8A" />
            <rect x="20" y="48" width="120" height="10" fill="#1E3A8A" />
            {/* Control dots */}
            <circle cx="40" cy="44" r="5" fill="#ffb81c" />
            <circle cx="58" cy="44" r="4" fill="white" fillOpacity="0.4" />
            <circle cx="74" cy="44" r="4" fill="white" fillOpacity="0.4" />
            {/* Door circle */}
            <circle cx="80" cy="105" r="38" fill="#EFF6FF" stroke="#1E3A8A" strokeWidth="3" />
            <circle cx="80" cy="105" r="28" fill="white" stroke="#93C5FD" strokeWidth="2" />
            {/* Water swirl (broken) — squiggly lines */}
            <path
              d="M62 99 Q68 93 74 99 Q80 105 86 99 Q92 93 98 99"
              stroke="#3B82F6"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M62 108 Q68 102 74 108 Q80 114 86 108 Q92 102 98 108"
              stroke="#3B82F6"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Wrench overlay — the"repair needed" signal */}
            <g transform="translate(106, 60) rotate(30)">
              <rect x="-4" y="-22" width="8" height="32" rx="3" fill="#ffb81c" />
              <rect x="-10" y="-28" width="20" height="10" rx="3" fill="#ffb81c" />
              <rect x="-8" y="-30" width="6" height="6" rx="1" fill="#1E3A8A" />
              <rect x="2" y="-30" width="6" height="6" rx="1" fill="#1E3A8A" />
            </g>
            {/* Error X on door */}
            <line
              x1="72"
              y1="97"
              x2="88"
              y2="113"
              stroke="#EF4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.5"
            />
            <line
              x1="88"
              y1="97"
              x2="72"
              y2="113"
              stroke="#EF4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.5"
            />
            {/* Bottom feet */}
            <rect x="35" y="143" width="14" height="8" rx="3" fill="#1E3A8A" />
            <rect x="111" y="143" width="14" height="8" rx="3" fill="#1E3A8A" />
          </svg>
        </div>

        {/* 404 number */}
        <div className="text-center">
          <p
            className="text-[7rem] sm:text-[9rem] font-bold leading-none tracking-tight text-[#ffb81c]"
            style={{
              fontFamily: "'Lexend', Arial, sans-serif",
              textShadow: '0 4px 24px rgba(255,184,28,0.18)',
            }}
            aria-label="Error 404"
          >
            404
          </p>

          <h1
            className="mt-2 text-3xl sm:text-4xl font-bold text-blue-900"
            style={{ fontFamily: "'Lexend', Arial, sans-serif" }}
          >
            Page Not Found
          </h1>

          <p className="mt-4 text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
            Looks like this page needs a repair too.
            <br className="hidden sm:block" />
            Let&apos;s get you back on track.
          </p>

          <NotFoundActions />

          {/* Helpful link row */}
          <p className="mt-8 text-sm text-slate-500">
            Need help?{' '}
            <a
              href="tel:+19592616736"
              className="text-blue-700 hover:text-blue-900 font-medium underline underline-offset-2 transition-colors duration-200"
            >
              Call (959) 261-6736.
            </a>
            {' '}We&apos;re available 7 days a week.
          </p>
        </div>
      </main>

      {/* Booking modal — listens for the open-booking event dispatched by NotFoundActions */}
      <BookingModal />
    </>
  );
}
