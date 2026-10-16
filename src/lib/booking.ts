import type { BranchId } from './branches';

export interface OpenBookingDetail {
  branchId?: BranchId;
  municipality?: string;
  appliance?: string;
}

export const openBookingModal = (detail?: OpenBookingDetail) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent<OpenBookingDetail>('open-booking', { detail }));
  }
};
