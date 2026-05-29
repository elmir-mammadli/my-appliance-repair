'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

const GA_ID = 'G-JKQBNGF2P9';

export default function CookieConsent() {
  const [consent, setConsent] = useState<'granted' | 'denied' | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('ga_consent') as 'granted' | 'denied' | null;
    if (stored === 'granted' || stored === 'denied') {
      setConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('ga_consent', 'granted');
    setConsent('granted');
    setVisible(false);
  };

  const deny = () => {
    localStorage.setItem('ga_consent', 'denied');
    setConsent('denied');
    setVisible(false);
  };

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });
          `}</Script>
        </>
      )}

      {visible && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-lg"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center">
            <p className="flex-1 text-sm text-slate-600">
              We use cookies to understand how visitors use our site and improve your experience.{' '}
              <a href="/privacy" className="font-medium text-blue-700 underline underline-offset-2">
                Privacy Policy
              </a>
            </p>
            <div className="flex flex-shrink-0 gap-3">
              <button
                onClick={deny}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-800"
              >
                Decline
              </button>
              <button
                onClick={accept}
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
