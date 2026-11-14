import type { BranchId } from './branches';

export interface OpenBookingDetail {
  branchId?: BranchId;
  municipality?: string;
  appliance?: string;
  /** 5-digit ZIP from the hero quick-start strip; pre-fills step 1. */
  zip?: string;
}

export const openBookingModal = (detail?: OpenBookingDetail) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent<OpenBookingDetail>('open-booking', { detail }));
  }
};
