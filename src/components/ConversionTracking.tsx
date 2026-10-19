'use client';

import { useEffect } from 'react';
import { branchForPhoneLink, trackRepairEvent } from '@/lib/analytics';
import type { OpenBookingDetail } from '@/lib/booking';

export default function ConversionTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href^="tel:"]');
      if (!link) return;
      const branch = branchForPhoneLink(link.getAttribute('href') ?? '');
      if (branch) trackRepairEvent('click_to_call', { branch_id: branch });
    };
    const onBookingOpen = (event: Event) => {
      const detail = (event as CustomEvent<OpenBookingDetail>).detail;
      trackRepairEvent('booking_open', {
        branch_id: detail?.branchId,
        appliance: detail?.appliance,
      });
    };
    document.addEventListener('click', onClick, true);
    window.addEventListener('open-booking', onBookingOpen);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('open-booking', onBookingOpen);
    };
  }, []);

  return null;
}
