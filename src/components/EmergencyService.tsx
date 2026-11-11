'use client';

import { useSyncExternalStore } from 'react';
import { BUSINESS, EMERGENCY_SERVICE, GAS_ODOR_GUIDANCE } from '@/lib/business';
import { isEmergencyWindow, subscribeToEmergencyClock } from '@/lib/emergency';

const iconProps = {
  className: 'w-8 h-8',
  fill: 'none',
  viewBox: '0 0 24 24',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  'aria-hidden': true,
} as const;

const emergencies = [
  {
    title: 'Refrigerator & Freezer',
    description: 'Stopped cooling, freezer thawing, or warm fresh-food section with groceries at risk.',
    icon: (
      <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h10a1 1 0 011 1v16a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zm-1 7h12M9 6v2m0 5v3" />
      </svg>
    ),
  },
  {
    title: 'Washer & Dishwasher Leaks',
    description: 'Water on the floor, a machine that won’t drain, or a cycle stuck full of water.',
    icon: (
      <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5c-3 4-6 7.2-6 10.5a6 6 0 0012 0c0-3.3-3-6.5-6-10.5z" />
      </svg>
    ),
  },
  {
    title: 'Oven & Range',
    description: 'Oven won’t heat or burners won’t light before a holiday meal or family dinner.',
    icon: (
      <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v15a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 4h16M8 6.5h.01M12 6.5h.01M7 12h10v6H7v-6z" />
      </svg>
    ),
  },
  {
    title: 'Dryer',
    description: 'No heat, loud grinding, or a dryer that stops mid-cycle with a full load inside.',
    icon: (
      <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h14a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1zm0 4h14M12 17a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ),
  },
];

const phoneIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

/** Live "open now" indicator. Renders nothing on the server so static HTML never claims a status. */
function LineStatus() {
  const open = useSyncExternalStore<boolean | null>(subscribeToEmergencyClock, isEmergencyWindow, () => null);
  if (open === null) return null;

  return open ? (
    <span className="inline-flex items-center gap-2 bg-[#ffb81c] px-3 py-1.5 text-sm font-bold text-gray-900">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gray-900 opacity-60 motion-reduce:hidden" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-gray-900" />
      </span>
      Emergency line open now
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 border border-white/25 px-3 py-1.5 text-sm font-semibold text-blue-100">
      <span className="h-2 w-2 rounded-full bg-blue-300" aria-hidden="true" />
      Emergency line opens at {EMERGENCY_SERVICE.from}
    </span>
  );
}

export default function EmergencyService() {
  return (
    <section id="emergency" className="py-20 lg:py-28 bg-blue-950" aria-labelledby="emergency-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="mb-5 flex justify-center">
            <LineStatus />
          </div>
          <h2 id="emergency-heading" className="text-3xl sm:text-4xl font-bold text-white mb-5">
            Evening emergency repair, every night until midnight
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Appliances don’t break on a schedule. After regular hours, call our emergency line from{' '}
            <span className="whitespace-nowrap">{EMERGENCY_SERVICE.from} to {EMERGENCY_SERVICE.until}</span> for urgent repairs.
          </p>
        </div>

        {/* Emergency cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {emergencies.map((item) => (
            <div
              key={item.title}
              className="relative bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/35 p-6 flex flex-col gap-4 transition-colors duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-14 h-14 bg-white/15 flex items-center justify-center text-white flex-shrink-0">
                  {item.icon}
                </div>
                <span className="bg-[#ffb81c] text-gray-900 text-sm font-extrabold px-3 py-1.5 flex-shrink-0">
                  {EMERGENCY_SERVICE.from} – 12 AM
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="bg-white/10 border border-white/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="text-white font-bold text-lg mb-2">Call our emergency line</p>
            <p className="text-blue-200 text-sm leading-relaxed max-w-xl">
              The emergency service call is ${EMERGENCY_SERVICE.fee} and covers the evening visit and diagnosis.
              Your technician gives you a written repair quote before any work begins.
            </p>
          </div>
          <a
            href={BUSINESS.phone.href}
            className="flex-shrink-0 inline-flex items-center justify-center gap-2 font-bold px-7 py-3.5 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-gray-900 bg-[#ffb81c] hover:bg-[#c9920d]"
          >
            {phoneIcon}
            Call {BUSINESS.phone.display}
          </a>
        </div>

        {/* Fine print */}
        <p className="text-center text-blue-400 text-xs mt-6 leading-relaxed max-w-3xl mx-auto">
          Emergency line hours are {EMERGENCY_SERVICE.from} to 12 AM Eastern, 7 days a week. Arrival times depend on technician
          availability and location.{' '}
          {GAS_ODOR_GUIDANCE}
        </p>
      </div>
    </section>
  );
}
