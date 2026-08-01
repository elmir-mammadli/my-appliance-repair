'use client';

import { useState } from 'react';
import { isCtZip } from '@/lib/zip';
import DatePicker from '@/components/DatePicker';
import AddressAutocomplete from '@/components/AddressAutocomplete';

const appliances = [
  'Washer',
  'Dryer',
  'Refrigerator',
  'Dishwasher',
  'Oven / Range',
  'Cooktop',
  'Microwave',
  'Freezer',
  'Other',
];

const timeSlots = ['Morning (8am–12pm)', 'Afternoon (12pm–4pm)', 'Evening (4pm–7pm)'];

interface FormState {
  name: string;
  phone: string;
  email: string;
  zip: string;
  address: string;
  appliance: string;
  brand: string;
  issue: string;
  date: string;
  timeSlot: string;
  urgency: string;
}

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  zip: '',
  address: '',
  appliance: '',
  brand: '',
  issue: '',
  date: '',
  timeSlot: '',
  urgency: 'standard',
};

interface BookingFormProps {
  onClose?: () => void;
  initialAppliance?: string;
  onStepChange?: (step: 1 | 2) => void;
  stickyHeader?: boolean;
}

export default function BookingForm({
  onClose,
  initialAppliance,
  onStepChange,
  stickyHeader = false,
}: BookingFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormState>({
    ...initialState,
    appliance: initialAppliance ?? '',
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep1 = (): boolean => {
    const errs: Partial<FormState> = {};
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(form.phone.replace(/\s/g, '')))
      errs.phone = 'Please enter a valid phone number';
    if (!form.zip.trim()) errs.zip = 'ZIP code is required';
    else if (!/^\d{5}$/.test(form.zip)) errs.zip = 'Please enter a valid 5-digit ZIP';
    else if (!isCtZip(form.zip)) errs.zip = 'Sorry, we only service Connecticut (ZIP 06001–06928)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errs: Partial<FormState> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.address.trim()) errs.address = 'Service address is required';
    if (!form.appliance) errs.appliance = 'Please select an appliance';
    if (!form.issue.trim()) errs.issue = 'Please describe the issue';
    if (!form.date) errs.date = 'Please select a preferred date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      setStep(2);
      onStepChange?.(2);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
    } catch {
      alert('Something went wrong. Please call us directly at (959) 261-6736.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({ ...initialState, appliance: initialAppliance ?? '' });
    setStep(1);
    onStepChange?.(1);
  };

  const goBack = () => {
    setStep(1);
    setErrors({});
    onStepChange?.(1);
  };

  const headerClass = stickyHeader ? 'sticky top-0 z-10 ' : '';

  return (
    <>
      {/* Header */}
      <div
        className={`${headerClass}flex items-center justify-between px-6 py-5 bg-white border-b border-slate-100`}
      >
        <div className="flex items-center gap-3">
          {step === 2 && !submitted && (
            <button
              onClick={goBack}
              className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer flex-shrink-0"
              aria-label="Back to step 1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div>
            <h2 className="text-xl font-bold text-blue-950">Schedule a Repair</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {submitted
                ? 'Request received!'
                : step === 1
                  ? "Step 1 of 2 — Let's check your area"
                  : 'Step 2 of 2 — Repair details'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!submitted && (
            <div className="flex gap-1.5" aria-hidden="true">
              <div className="w-2 h-2 bg-blue-600" />
              <div
                className={`w-2 h-2 transition-colors duration-300 ${step === 2 ? 'bg-blue-600' : 'bg-slate-200'}`}
              />
            </div>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors duration-200 cursor-pointer flex-shrink-0"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8">
        {/* ── Success ── */}
        {submitted ? (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-blue-950 mb-3">Booking Request Received!</h3>
            <p className="text-slate-500 mb-4 max-w-sm mx-auto">
              Thanks, <strong className="text-blue-950">{form.name}</strong>! We&apos;ve got your{' '}
              {form.appliance} repair request.
            </p>
            <ol className="text-sm text-slate-600 text-left max-w-xs mx-auto mb-8 space-y-3">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  You&apos;ll get a call at{' '}
                  <strong className="text-blue-950">{form.phone}</strong> within 30 minutes to
                  confirm.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  Your technician arrives in your preferred window
                  {form.date ? (
                    <>
                      {' '}
                      on <strong className="text-blue-950">{form.date}</strong>
                    </>
                  ) : (
                    ''
                  )}
                  .
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  {form.email ? (
                    <>
                      Confirmation sent to <strong className="text-blue-950">{form.email}</strong>.
                    </>
                  ) : (
                    "We'll confirm your appointment by phone."
                  )}
                </span>
              </li>
            </ol>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+19592616736"
                className="inline-flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white font-bold px-6 py-3 transition-colors duration-200"
              >
                Call (959) 261-6736
              </a>
              <button
                onClick={() => {
                  resetForm();
                  onClose?.();
                }}
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium transition-colors duration-200 cursor-pointer"
              >
                {onClose ? 'Close' : 'Book Another Repair'}
              </button>
            </div>
          </div>
        ) : step === 1 ? (
          /* ── Step 1 — Phone + ZIP ── */
          <form onSubmit={handleStep1Next} noValidate aria-label="Step 1: Contact check">
            <div className="space-y-5">
              <p className="text-sm text-slate-500 text-center pb-1">
                Quick check — 2 fields and we&apos;ll confirm we service your area.
              </p>

              {/* Phone */}
              <div>
                <label
                  htmlFor="bf-phone"
                  className="block text-sm font-semibold text-blue-950 mb-1.5"
                >
                  Phone Number{' '}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="bf-phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="(203) 555-0100"
                  autoFocus
                  className={`w-full px-4 py-3.5 border bg-white text-blue-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-base ${errors.phone ? 'border-red-400' : 'border-slate-200 hover:border-blue-300'}`}
                  aria-required="true"
                  aria-describedby={errors.phone ? 'bf-phone-error' : undefined}
                />
                {errors.phone && (
                  <p id="bf-phone-error" className="text-red-500 text-xs mt-1" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* ZIP */}
              <div>
                <label
                  htmlFor="bf-zip"
                  className="block text-sm font-semibold text-blue-950 mb-1.5"
                >
                  ZIP Code{' '}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="bf-zip"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={form.zip}
                  onChange={(e) => handleChange('zip', e.target.value)}
                  placeholder="06510"
                  maxLength={5}
                  className={`w-full px-4 py-3.5 border bg-white text-blue-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-base ${errors.zip ? 'border-red-400' : 'border-slate-200 hover:border-blue-300'}`}
                  aria-required="true"
                  aria-describedby={errors.zip ? 'bf-zip-error' : 'bf-zip-status'}
                />
                {errors.zip ? (
                  <p id="bf-zip-error" className="text-red-500 text-xs mt-1" role="alert">
                    {errors.zip}
                  </p>
                ) : (
                  form.zip.length === 5 &&
                  (isCtZip(form.zip) ? (
                    <p
                      id="bf-zip-status"
                      className="text-green-600 text-xs mt-1 flex items-center gap-1"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Great — we service your area!
                    </p>
                  ) : (
                    <p
                      id="bf-zip-status"
                      className="text-red-500 text-xs mt-1 flex items-center gap-1"
                      role="alert"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Outside our service area (CT only)
                    </p>
                  ))
                )}
              </div>

              <button
                type="submit"
                disabled={checking}
                className="w-full flex items-center justify-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] disabled:bg-[#ffb81c]/80 text-gray-900 font-bold py-4 transition-colors shadow-md text-base cursor-pointer disabled:cursor-not-allowed"
              >
                {checking ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Checking your area...
                  </>
                ) : (
                  <>
                    Check Availability
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-400">
                We&apos;ll call you within 30 minutes to confirm your appointment.
              </p>
            </div>
          </form>
        ) : (
          /* ── Step 2 — Full details ── */
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Trust sidebar */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Contact Us Directly
                </p>
                <a
                  href="tel:+19592616736"
                  className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors duration-200 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-blue-700 flex items-center justify-center text-white flex-shrink-0">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-blue-950 text-sm">(959) 261-6736</div>
                    <div className="text-xs text-slate-500">Mon–Sun 8am–6pm</div>
                  </div>
                </a>
              </div>

              <div className="bg-blue-950 p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
                  Our Guarantee
                </p>
                <ul className="space-y-2.5">
                  {[
                    'Free diagnostic with any paid repair',
                    'Written estimate before work begins',
                    '90-day parts & labor warranty',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-blue-100">
                      <svg
                        className="w-4 h-4 text-[#ffb81c] flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-1" aria-label="5 out of 5 stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    className="w-4 h-4 text-[#ffb81c]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm font-semibold text-blue-950 ml-1">5.0</span>
                <span className="text-sm text-slate-400 ml-1">· Google &amp; Thumbtack</span>
              </div>
            </div>

            {/* Step 2 form */}
            <form onSubmit={handleSubmit} noValidate aria-label="Step 2: Repair details">
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="bf-name"
                    className="block text-sm font-semibold text-blue-950 mb-1.5"
                  >
                    Full Name{' '}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="bf-name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="John Smith"
                    className={`w-full px-4 py-3 border bg-white text-blue-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.name ? 'border-red-400' : 'border-slate-200 hover:border-blue-300'}`}
                    aria-required="true"
                    aria-describedby={errors.name ? 'bf-name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="bf-name-error" className="text-red-500 text-xs mt-1" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="bf-address"
                    className="block text-sm font-semibold text-blue-950 mb-1.5"
                  >
                    Service Address{' '}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <AddressAutocomplete
                    id="bf-address"
                    value={form.address}
                    onChange={(v) => handleChange('address', v)}
                    error={errors.address}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1" role="alert">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="bf-email"
                    className="block text-sm font-semibold text-blue-950 mb-1.5"
                  >
                    Email{' '}
                    <span className="text-slate-400 font-normal text-xs">
                      (optional — for confirmation)
                    </span>
                  </label>
                  <input
                    id="bf-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-slate-200 hover:border-blue-300 bg-white text-blue-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                </div>

                {/* Appliance + Brand */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="bf-appliance"
                      className="block text-sm font-semibold text-blue-950 mb-1.5"
                    >
                      Appliance{' '}
                      <span className="text-red-500" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <select
                      id="bf-appliance"
                      value={form.appliance}
                      onChange={(e) => handleChange('appliance', e.target.value)}
                      className={`w-full px-4 py-3 border bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${errors.appliance ? 'border-red-400 text-blue-950' : 'border-slate-200 hover:border-blue-300'} ${!form.appliance ? 'text-slate-400' : 'text-blue-950'}`}
                      aria-required="true"
                      aria-describedby={errors.appliance ? 'bf-appliance-error' : undefined}
                    >
                      <option value="" disabled>
                        Select appliance...
                      </option>
                      {appliances.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                    {errors.appliance && (
                      <p id="bf-appliance-error" className="text-red-500 text-xs mt-1" role="alert">
                        {errors.appliance}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="bf-brand"
                      className="block text-sm font-semibold text-blue-950 mb-1.5"
                    >
                      Brand{' '}
                      <span className="text-slate-400 font-normal text-xs">(optional)</span>
                    </label>
                    <input
                      id="bf-brand"
                      type="text"
                      value={form.brand}
                      onChange={(e) => handleChange('brand', e.target.value)}
                      placeholder="e.g. Whirlpool, LG..."
                      className="w-full px-4 py-3 border border-slate-200 hover:border-blue-300 bg-white text-blue-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Issue */}
                <div>
                  <label
                    htmlFor="bf-issue"
                    className="block text-sm font-semibold text-blue-950 mb-1.5"
                  >
                    Describe the Issue{' '}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <textarea
                    id="bf-issue"
                    rows={3}
                    value={form.issue}
                    onChange={(e) => handleChange('issue', e.target.value)}
                    placeholder="e.g. Washer won't spin, makes grinding noise..."
                    className={`w-full px-4 py-3 border bg-white text-blue-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors ${errors.issue ? 'border-red-400' : 'border-slate-200 hover:border-blue-300'}`}
                    aria-required="true"
                    aria-describedby={errors.issue ? 'bf-issue-error' : undefined}
                  />
                  {errors.issue && (
                    <p id="bf-issue-error" className="text-red-500 text-xs mt-1" role="alert">
                      {errors.issue}
                    </p>
                  )}
                </div>

                {/* Preferred Date */}
                <div>
                  <label
                    htmlFor="bf-datepicker"
                    className="block text-sm font-semibold text-blue-950 mb-1.5"
                  >
                    Preferred Date{' '}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <DatePicker
                    id="bf-datepicker"
                    value={form.date}
                    onChange={(date) => handleChange('date', date)}
                    error={errors.date}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-xs mt-1" role="alert">
                      {errors.date}
                    </p>
                  )}
                </div>

                {/* Urgency + Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <fieldset>
                      <legend className="block text-sm font-semibold text-blue-950 mb-2">
                        Urgency
                      </legend>
                      <div className="space-y-2">
                        {[
                          { value: 'emergency', label: 'Emergency' },
                          { value: 'today', label: 'Today' },
                          { value: 'standard', label: 'Next 2 days' },
                        ].map((opt) => (
                          <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="bf-urgency"
                              value={opt.value}
                              checked={form.urgency === opt.value}
                              onChange={(e) => handleChange('urgency', e.target.value)}
                              className="text-blue-700 focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-sm text-blue-950">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                  <div>
                    <label
                      htmlFor="bf-timeSlot"
                      className="block text-sm font-semibold text-blue-950 mb-1.5"
                    >
                      Preferred Time
                    </label>
                    <select
                      id="bf-timeSlot"
                      value={form.timeSlot}
                      onChange={(e) => handleChange('timeSlot', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 hover:border-blue-300 bg-white text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm cursor-pointer"
                    >
                      <option value="">Any time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] disabled:bg-[#ffb81c]/50 text-gray-900 font-bold py-4 transition-colors cursor-pointer text-lg disabled:cursor-not-allowed"
                  aria-disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending Request...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Book My Repair
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-400">
                  By submitting, you consent to receive communications from us, including follow-up calls, product announcements, and our newsletter. You may unsubscribe at any time.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
