'use client';

import { useState } from 'react';
import { isCtZip } from '@/lib/zip';
import DatePicker from '@/components/DatePicker';

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
  appliance: '',
  brand: '',
  issue: '',
  date: '',
  timeSlot: '',
  urgency: 'standard',
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(form.phone.replace(/\s/g, '')))
      newErrors.phone = 'Please enter a valid phone number';
    if (!form.zip.trim()) newErrors.zip = 'ZIP code is required';
    else if (!/^\d{5}$/.test(form.zip)) newErrors.zip = 'Please enter a valid 5-digit ZIP code';
    else if (!isCtZip(form.zip))
      newErrors.zip = 'Sorry, we only service Connecticut (ZIP 06001–06928)';
    if (!form.appliance) newErrors.appliance = 'Please select an appliance';
    if (!form.issue.trim()) newErrors.issue = 'Please describe the issue';
    if (!form.date) newErrors.date = 'Please select a preferred date';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
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

  if (submitted) {
    return (
      <section id="contact" className="py-20 lg:py-28 bg-white" aria-labelledby="contact-heading">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
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
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Booking Request Received!</h2>
          <p className="text-lg text-slate-600 mb-6">
            Thank you, <strong>{form.name}</strong>! We&apos;ve received your repair request for
            your <strong>{form.appliance}</strong>.
            {form.date && (
              <>
                {' '}
                Your preferred date is <strong>{form.date}</strong>.
              </>
            )}
            {''}A technician will call you at <strong>{form.phone}</strong> within 30 minutes to
            confirm your appointment.
          </p>
          <div className="bg-blue-50 border border-blue-200 p-6 mb-8">
            <p className="text-blue-800 font-medium">Need immediate assistance?</p>
            <a
              href="tel:+19592616736"
              className="text-blue-700 font-bold text-xl hover:text-blue-900 transition-colors duration-200 cursor-pointer"
            >
              Call (959) 261-6736
            </a>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm(initialState);
            }}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 cursor-pointer"
          >
            Submit another request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Info */}
          <div>
            <span className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
              Book a Repair
            </span>
            <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6">
              Schedule Your Repair Today
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Fill out the form and we&apos;ll contact you within 30 minutes to confirm your
              appointment. Same-day service available in most Connecticut areas.
            </p>

            {/* Contact Methods */}
            <div className="space-y-4 mb-8">
              <a
                href="tel:+19592616736"
                className="flex items-center gap-4 p-5 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all duration-200 cursor-pointer group"
                aria-label="Call us at (959) 261-6736"
              >
                <div className="w-12 h-12 bg-blue-700 flex items-center justify-center text-white flex-shrink-0 group-hover:bg-blue-800 transition-colors duration-200">
                  <svg
                    className="w-6 h-6"
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
                  <div className="font-bold text-blue-900">(959) 261-6736</div>
                  <div className="text-sm text-slate-500">Available 24/7 for emergencies</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-5 bg-blue-50 border border-blue-200">
                <div className="w-12 h-12 bg-blue-700 flex items-center justify-center text-white flex-shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-blue-900">service@myappliance.us</div>
                  <div className="text-sm text-slate-500">We respond within 1 hour</div>
                </div>
              </div>
            </div>

            {/* Guarantee Banner */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-6 text-white">
              <h3 className="font-bold text-lg mb-3">Our Service Guarantee</h3>
              <ul className="space-y-2">
                {[
                  'Free diagnostic with any paid repair',
                  'Written estimate before work begins',
                  '90-day parts & labor warranty',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <svg
                      className="w-4 h-4 text-green-400 flex-shrink-0"
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
          </div>

          {/* Form */}
          <div className="bg-blue-50 p-8 border border-blue-100 shadow-sm">
            <h3 className="text-xl font-bold text-blue-900 mb-6">Request a Repair Appointment</h3>
            <form onSubmit={handleSubmit} noValidate aria-label="Repair booking form">
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-blue-900 mb-1.5"
                  >
                    Full Name{' '}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="John Smith"
                    className={`w-full px-4 py-3 border bg-white text-blue-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-blue-200 hover:border-blue-300'
                    }`}
                    aria-required="true"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone + ZIP */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-blue-900 mb-1.5"
                    >
                      Phone{' '}
                      <span className="text-red-500" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="(203) 555-0100"
                      className={`w-full px-4 py-3 border bg-white text-blue-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.phone
                          ? 'border-red-400 focus:ring-red-400'
                          : 'border-blue-200 hover:border-blue-300'
                      }`}
                      aria-required="true"
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-red-500 text-xs mt-1" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="zip"
                      className="block text-sm font-semibold text-blue-900 mb-1.5"
                    >
                      ZIP Code{' '}
                      <span className="text-red-500" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="zip"
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      value={form.zip}
                      onChange={(e) => handleChange('zip', e.target.value)}
                      placeholder="06510"
                      maxLength={5}
                      className={`w-full px-4 py-3 border bg-white text-blue-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.zip
                          ? 'border-red-400 focus:ring-red-400'
                          : 'border-blue-200 hover:border-blue-300'
                      }`}
                      aria-required="true"
                      aria-describedby={errors.zip ? 'zip-error' : 'zip-status'}
                    />
                    {errors.zip ? (
                      <p id="zip-error" className="text-red-500 text-xs mt-1" role="alert">
                        {errors.zip}
                      </p>
                    ) : (
                      form.zip.length === 5 &&
                      (isCtZip(form.zip) ? (
                        <p
                          id="zip-status"
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
                          We service your area
                        </p>
                      ) : (
                        <p
                          id="zip-status"
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
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-blue-900 mb-1.5"
                  >
                    Email <span className="text-slate-400 font-normal text-xs">(optional)</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-blue-200 hover:border-blue-300 bg-white text-blue-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Appliance */}
                <div>
                  <label
                    htmlFor="appliance"
                    className="block text-sm font-semibold text-blue-900 mb-1.5"
                  >
                    Appliance Type{' '}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <select
                    id="appliance"
                    value={form.appliance}
                    onChange={(e) => handleChange('appliance', e.target.value)}
                    className={`w-full px-4 py-3 border bg-white text-blue-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                      errors.appliance
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-blue-200 hover:border-blue-300'
                    } ${!form.appliance ? 'text-slate-400' : 'text-blue-900'}`}
                    aria-required="true"
                    aria-describedby={errors.appliance ? 'appliance-error' : undefined}
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
                    <p id="appliance-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.appliance}
                    </p>
                  )}
                </div>

                {/* Brand */}
                <div>
                  <label
                    htmlFor="brand"
                    className="block text-sm font-semibold text-blue-900 mb-1.5"
                  >
                    Brand <span className="text-slate-400 font-normal text-xs">(optional)</span>
                  </label>
                  <input
                    id="brand"
                    type="text"
                    value={form.brand}
                    onChange={(e) => handleChange('brand', e.target.value)}
                    placeholder="e.g. Whirlpool, Samsung, LG..."
                    className="w-full px-4 py-3 border border-blue-200 hover:border-blue-300 bg-white text-blue-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Issue */}
                <div>
                  <label
                    htmlFor="issue"
                    className="block text-sm font-semibold text-blue-900 mb-1.5"
                  >
                    Describe the Issue{' '}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <textarea
                    id="issue"
                    rows={3}
                    value={form.issue}
                    onChange={(e) => handleChange('issue', e.target.value)}
                    placeholder="e.g. Washer won't spin, makes grinding noise..."
                    className={`w-full px-4 py-3 border bg-white text-blue-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      errors.issue
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-blue-200 hover:border-blue-300'
                    }`}
                    aria-required="true"
                    aria-describedby={errors.issue ? 'issue-error' : undefined}
                  />
                  {errors.issue && (
                    <p id="issue-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.issue}
                    </p>
                  )}
                </div>

                {/* Preferred Date */}
                <div>
                  <label
                    htmlFor="datepicker"
                    className="block text-sm font-semibold text-blue-900 mb-1.5"
                  >
                    Preferred Date{' '}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <DatePicker
                    id="datepicker"
                    value={form.date}
                    onChange={(date) => handleChange('date', date)}
                    error={errors.date}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errors.date}
                    </p>
                  )}
                </div>

                {/* Urgency + Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <fieldset>
                      <legend className="block text-sm font-semibold text-blue-900 mb-2">
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
                              name="urgency"
                              value={opt.value}
                              checked={form.urgency === opt.value}
                              onChange={(e) => handleChange('urgency', e.target.value)}
                              className="text-blue-700 focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-sm text-blue-900">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                  <div>
                    <label
                      htmlFor="timeSlot"
                      className="block text-sm font-semibold text-blue-900 mb-1.5"
                    >
                      Preferred Time
                    </label>
                    <select
                      id="timeSlot"
                      value={form.timeSlot}
                      onChange={(e) => handleChange('timeSlot', e.target.value)}
                      className="w-full px-3 py-2.5 border border-blue-200 hover:border-blue-300 bg-white text-blue-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer"
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
                  className="w-full flex items-center justify-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] disabled:bg-[#ffb81c]/50 text-gray-900 font-bold py-4 transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg text-lg disabled:cursor-not-allowed"
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

                <p className="text-center text-xs text-slate-400">
                  By submitting, you agree to receive a call from our team. No spam — ever.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
