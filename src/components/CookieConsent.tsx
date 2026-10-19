'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import {
  GA_ID,
  getStoredAnalyticsConsent,
  initializeAnalytics,
  setAnalyticsConsent,
} from '@/lib/analytics';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredAnalyticsConsent();
    initializeAnalytics(stored ?? 'denied');
    if (!stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  const choose = (value: 'granted' | 'denied') => {
    setAnalyticsConsent(value);
    setVisible(false);
  };

  return (
    <>
      {/* GA loads with the saved consent choice; new visitors default to denied. */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      {visible && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-lg"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center">
            <p className="flex-1 text-sm text-slate-600">
              We use cookies to understand how visitors use our site and improve your experience.
              {''}
              <Link
                href="/privacy"
                className="font-medium text-blue-700 underline underline-offset-2"
              >
                Privacy Policy
              </Link>
            </p>
            <div className="flex flex-shrink-0 gap-3">
              <button
                onClick={() => choose('denied')}
                className=" border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-800"
              >
                Decline
              </button>
              <button
                onClick={() => choose('granted')}
                className=" bg-blue-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
              >
                Accept Cookies
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
