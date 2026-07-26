'use client';

import { openBookingModal } from '@/lib/booking';

interface BookingButtonProps {
  className?: string;
  children: React.ReactNode;
  appliance?: string;
}

export default function BookingButton({ className, children, appliance }: BookingButtonProps) {
  return (
    <button onClick={() => openBookingModal({ appliance })} className={className}>
      {children}
    </button>
  );
}
