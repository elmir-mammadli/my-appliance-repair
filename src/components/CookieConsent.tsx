'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';

declare global { interface Window { gtag?: (...args: unknown[]) => void } }

const GA_ID = 'G-JKQBNGF2P9';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('ga_consent');
    if (stored === 'granted') {
      window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    } else if (stored !== 'denied') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  const choose = (value: 'granted' | 'denied') => {
    localStorage.setItem('ga_consent', value);
    setVisible(false);
    window.gtag?.('consent', 'update', { analytics_storage: value });
  };

  return (
    <>
      {/* GA always loads; consent defaults to denied (cookieless pings only) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `}</Script>

      {visible && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-lg"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center">
            <p className="flex-1 text-sm text-slate-600">
              We use cookies to understand how visitors use our site and improve your experience.{' '}
              <Link href="/privacy" className="font-medium text-blue-700 underline underline-offset-2">
                Privacy Policy
              </Link>
            </p>
            <div className="flex flex-shrink-0 gap-3">
              <button
                onClick={() => choose('denied')}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-800"
              >
                Decline
              </button>
              <button
                onClick={() => choose('granted')}
                className="rounded-lg bg-blue-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
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