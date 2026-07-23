'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'promo-bar-dismissed';

/**
 * Shopify-style promotional bar that sits above the navbar inside the fixed
 * header. It advertises the community discounts (see Discounts.tsx) and links
 * to the #discounts section. It is dismissible (persisted in localStorage) and
 * collapses away as the user scrolls so the fixed header returns to just the
 * navbar height — keeping every page's existing top offset correct.
 */
export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash before we read storage
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setDismissed(localStorage.getItem(STORAGE_KEY) === 'true');
  }, []);

  useEffect(() => {
    const handleScroll = () => setCollapsed(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      /* ignore storage failures */
    }
  };

  const hidden = dismissed || collapsed;

  return (
    <div
      className={`overflow-hidden bg-blue-900 transition-all duration-300 ease-in-out ${
        hidden ? 'max-h-0 opacity-0' : 'max-h-16 opacity-100'
      }`}
      aria-hidden={hidden}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-x-2 gap-y-0.5 px-10 py-2 text-center sm:px-12">
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
          <span>
            for Military, First Responders, Seniors 65+ &amp; Teachers
          </span>
          <span className="hidden items-center gap-1 font-semibold text-white underline-offset-2 group-hover:underline sm:inline-flex">
            View Community Discounts
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </Link>

        <button
          onClick={handleDismiss}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-blue-300 transition-colors hover:bg-white/10 hover:text-white sm:right-3"
          aria-label="Dismiss announcement"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
