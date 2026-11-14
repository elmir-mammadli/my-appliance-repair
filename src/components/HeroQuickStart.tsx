'use client';

import { useState, type FormEvent } from 'react';
import { APPLIANCES } from '@/lib/appliances';
import { openBookingModal } from '@/lib/booking';

const selectClass =
  'h-12 w-full appearance-none border border-slate-300 bg-white px-3.5 pr-10 text-base text-blue-950 transition-colors hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500';

/**
 * Two-field strip under the hero. It does not submit anywhere itself: Continue opens
 * the existing booking modal with the appliance and ZIP already filled in, so step 1
 * only asks for a phone number.
 */
export default function HeroQuickStart() {
  const [appliance, setAppliance] = useState('');
  const [zip, setZip] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    openBookingModal({
      appliance: appliance || undefined,
      zip: zip || undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Start a booking"
      className="grid gap-x-6 gap-y-4 border border-blue-100 bg-white p-5 sm:p-7 lg:grid-cols-[minmax(220px,1.1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-end lg:px-8"
    >
      <div className="lg:self-center">
        <p className="font-[family-name:var(--font-lexend)] text-lg font-bold leading-tight text-blue-950 sm:text-xl">
          Start a booking
        </p>
        <p className="mt-1 text-sm leading-snug text-slate-600">
          Tell us what&rsquo;s broken and where. We confirm the time by phone.
        </p>
      </div>

      <div>
        <label htmlFor="hero-appliance" className="mb-2 block text-xs font-bold text-slate-400">
          Appliance
        </label>
        <div className="relative">
          <select
            id="hero-appliance"
            value={appliance}
            onChange={(e) => setAppliance(e.target.value)}
            className={`${selectClass} ${appliance ? '' : 'text-slate-500'}`}
          >
            <option value="">Choose an appliance</option>
            {APPLIANCES.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      <div>
        <label htmlFor="hero-zip" className="mb-2 block text-xs font-bold text-slate-400">
          ZIP code
        </label>
        <input
          id="hero-zip"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          placeholder="06518"
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
          className="h-12 w-full border border-slate-300 bg-white px-3.5 text-base text-blue-950 placeholder-slate-400 transition-colors hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 whitespace-nowrap bg-[#ffb81c] px-7 text-base font-bold text-gray-900 shadow-[4px_4px_0_#172554] transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#e6a619] hover:shadow-[2px_2px_0_#172554] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
      >
        Continue
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </form>
  );
}
