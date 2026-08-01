'use client';

import { useState, useEffect, useCallback } from 'react';
import type { OpenBookingDetail } from '@/lib/booking';
import BookingForm from '@/components/BookingForm';

export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [initialAppliance, setInitialAppliance] = useState<string | undefined>();

  const openModal = useCallback((appliance?: string) => {
    setInitialAppliance(appliance);
    setStep(1);
    setOpen(true);
    setTimeout(() => setVisible(true), 10);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setOpen(false);
      setStep(1);
    }, 250);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<OpenBookingDetail>).detail;
      openModal(detail?.appliance);
    };
    window.addEventListener('open-booking', handler);
    return () => window.removeEventListener('open-booking', handler);
  }, [openModal]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, closeModal]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-250 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Book a repair appointment"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Panel — narrows on step 1, expands on step 2 */}
      <div
        className={`relative bg-white shadow-2xl w-full max-h-[92vh] overflow-y-auto transition-all duration-300 ${
          step === 1 ? 'max-w-md' : 'max-w-4xl'
        } ${visible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
      >
        <BookingForm
          onClose={closeModal}
          initialAppliance={initialAppliance}
          onStepChange={setStep}
          stickyHeader
        />
      </div>
    </div>
  );
}
