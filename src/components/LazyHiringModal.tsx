'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Loaded on the first "open-hiring" event; see LazyBookingModal for the pattern.
const HiringModal = dynamic(() => import('./HiringModal'), { ssr: false });

export default function LazyHiringModal() {
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (requested) return;
    const handler = () => setRequested(true);
    window.addEventListener('open-hiring', handler);
    return () => window.removeEventListener('open-hiring', handler);
  }, [requested]);

  if (!requested) return null;
  return <HiringModal openOnMount />;
}
