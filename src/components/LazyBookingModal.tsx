'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import type { OpenBookingDetail } from '@/lib/booking';

// The booking form (address autocomplete, date picker, municipality list) is the
// largest client bundle on the site and nobody needs it before they click "Book".
// This shell listens for the open event, loads the real modal on first use, and
// replays that first request once the chunk has mounted.
const BookingModal = dynamic(() => import('./BookingModal'), { ssr: false });

const loadModalChunk = () => import('./BookingModal');

export default function LazyBookingModal() {
  // undefined: never requested. null: requested with no detail.
  const [pending, setPending] = useState<OpenBookingDetail | null | undefined>(undefined);

  useEffect(() => {
    if (pending !== undefined) return;
    const handler = (e: Event) => {
      setPending((e as CustomEvent<OpenBookingDetail>).detail ?? null);
    };
    window.addEventListener('open-booking', handler);

    // Warm the chunk once the page is idle so the first click opens instantly.
    const idle = window.requestIdleCallback?.(() => void loadModalChunk());
    const timer = idle === undefined ? window.setTimeout(() => void loadModalChunk(), 2500) : undefined;

    return () => {
      window.removeEventListener('open-booking', handler);
      if (idle !== undefined) window.cancelIdleCallback?.(idle);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [pending]);

  if (pending === undefined) return null;
  return <BookingModal openOnMount={pending} />;
}
