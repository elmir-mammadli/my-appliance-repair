'use client';

import { useRef } from 'react';
import type { BranchId } from './branches';
import { trackRepairEvent } from './analytics';

export function useRepairTracking(
  formId: 'booking' | 'contact',
  variant: 'modal' | 'page' | 'inline',
  branchId: BranchId,
  appliance: string,
) {
  const started = useRef(false);
  const completedStep = useRef(false);
  const context = { form_id: formId, form_variant: variant, branch_id: branchId, appliance };

  return {
    start() {
      if (started.current) return;
      started.current = true;
      trackRepairEvent('form_start', context);
    },
    completeContactStep() {
      if (completedStep.current) return;
      completedStep.current = true;
      trackRepairEvent('booking_step_complete', { ...context, step: 1 });
    },
    success() {
      trackRepairEvent('generate_lead', context);
    },
    error() {
      trackRepairEvent('booking_submit_error', context);
    },
    reset() {
      started.current = false;
      completedStep.current = false;
    },
  };
}
