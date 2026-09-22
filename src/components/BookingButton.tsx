'use client';

import type { BranchId } from '@/lib/branches';
import { openBookingModal } from '@/lib/booking';

interface BookingButtonProps {
  className?: string;
  children: React.ReactNode;
  appliance?: string;
  branchId?: BranchId;
  municipality?: string;
}

export default function BookingButton({
  className,
  children,
  appliance,
  branchId,
  municipality,
}: BookingButtonProps) {
  return (
    <button
      onClick={() => openBookingModal({ appliance, branchId, municipality })}
      className={className}
    >
      {children}
    </button>
  );
}
