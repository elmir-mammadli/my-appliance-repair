'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { BUSINESS, EMERGENCY_SERVICE } from '@/lib/business';
import { isEmergencyWindow, subscribeToEmergencyClock } from '@/lib/emergency';

// The discount dismissal is remembered across visits; the emergency notice only
// for the browser session, so a returning evening visitor sees it again.
const DISCOUNT_DISMISS_KEY = 'promo-bar-dismissed';
const EMERGENCY_DISMISS_KEY = 'emergency-bar-dismissed';

function readFlag(storage: 'local' | 'session', key: string): boolean {
  try {
    const store = storage === 'local' ? localStorage : sessionStorage;
    return store.getItem(key) === 'true';
  } catch {
    return false;
  }
}

function writeFlag(storage: 'local' | 'session', key: string) {
  try {
    const store = storage === 'local' ? localStorage : sessionStorage;
    store.setItem(key, 'true');
  } catch {
    /* the choice still applies for this page view */
  }
}

const noSubscription = () => () => {};

/**
 * Promotional bar above the navbar inside the fixed header. During regular
 * hours it advertises the community discounts (see Discounts.tsx); from 8 PM to
 * midnight Eastern it switches to the emergency call line. It is dismissible and
 * collapses away as the user scrolls so the fixed header returns to just the
 * navbar height — keeping every page's existing top offset correct.
 */
export default function AnnouncementBar() {
  // Server snapshots: discount mode, hidden until storage is read (avoids a flash).
  const emergency = useSyncExternalStore(subscribeToEmergencyClock, isEmergencyWindow, () => false);
  const storedDiscountDismissal = useSyncExternalStore(
    noSubscription,
    () => readFlag('local', DISCOUNT_DISMISS_KEY),
    () => true,
  );
  const storedEmergencyDismissal = useSyncExternalStore(
    noSubscription,
    () => readFlag('session', EMERGENCY_DISMISS_KEY),
    () => true,
  );
  const [dismissedNow, setDismissedNow] = useState<{ discount?: boolean; emergency?: boolean }>({});
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setCollapsed(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dismissed = emergency
    ? storedEmergencyDismissal || dismissedNow.emergency
    : storedDiscountDismissal || dismissedNow.discount;

  const handleDismiss = () => {
    if (emergency) {
      setDismissedNow((d) => ({ ...d, emergency: true }));
      writeFlag('session', EMERGENCY_DISMISS_KEY);
    } else {
      setDismissedNow((d) => ({ ...d, discount: true }));
      writeFlag('local', DISCOUNT_DISMISS_KEY);
    }
  };

  const hidden = dismissed || collapsed;

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        emergency ? 'bg-blue-950' : 'bg-blue-900'
      } ${hidden ? 'max-h-0 opacity-0' : 'max-h-16 opacity-100'}`}
      aria-hidden={hidden}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-x-2 gap-y-0.5 px-10 py-2 text-center sm:px-12">
        {emergency ? (
          <div className="flex flex-wrap items-center justify-center gap-x-1.5 text-xs font-medium text-blue-100 sm:text-sm">
            <span className="relative mr-0.5 flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffb81c] opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ffb81c]" />
            </span>
            <span className="font-bold text-[#ffb81c]">EMERGENCY LINE OPEN</span>
            <span className="sm:hidden">until midnight · ${EMERGENCY_SERVICE.fee}</span>
            <span className="hidden sm:inline">
              Calls until {EMERGENCY_SERVICE.until} midnight · ${EMERGENCY_SERVICE.fee} service call
            </span>
            <span className="inline-flex items-center gap-x-3">
              <a
                href={BUSINESS.phone.href}
                className="inline-flex items-center gap-1 font-semibold text-white underline-offset-2 hover:underline"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call {BUSINESS.phone.display}
              </a>
              <Link
                href="/#emergency"
                className="group inline-flex items-center gap-1 font-semibold text-[#ffb81c] underline-offset-2 hover:underline"
              >
                View details
                <svg
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </span>
          </div>
        ) : (
          <>
            <svg
              className="hidden h-4 w-4 flex-shrink-0 text-[#ffb81c] sm:block"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <Link
              href="/#discounts"
              className="group flex flex-wrap items-center justify-center gap-x-1.5 text-xs font-medium text-blue-100 transition-colors hover:text-white sm:text-sm"
            >
              <span className="font-bold text-[#ffb81c]">$30 OFF</span>
              <span>for Military, First Responders, Seniors 65+ &amp; Teachers</span>
              <span className="hidden items-center gap-1 font-semibold text-white underline-offset-2 group-hover:underline sm:inline-flex">
                View Community Discounts
                <svg
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </>
        )}

        <button
          onClick={handleDismiss}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-blue-300 transition-colors hover:bg-white/10 hover:text-white sm:right-3"
          aria-label={emergency ? 'Dismiss emergency notice' : 'Dismiss announcement'}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
