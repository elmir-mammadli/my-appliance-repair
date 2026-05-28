'use client';

import { useState, useEffect, useCallback } from 'react';
import { isCtZip } from '@/lib/zip';
import DatePicker from '@/components/DatePicker';
import AddressAutocomplete from '@/components/AddressAutocomplete';

const appliances = [
  'Washer', 'Dryer', 'Refrigerator', 'Dishwasher', 'Oven / Range',
  'Cooktop', 'Microwave', 'Freezer', 'Other',
];

const timeSlots = [
  'Morning (8am–12pm)', 'Afternoon (12pm–4pm)', 'Evening (4pm–7pm)',
];

interface FormState {
  name: string; phone: string; email: string; zip: string;
  address: string; appliance: string; brand: string; issue: string;
  date: string; timeSlot: string; urgency: string;
}

const initialState: FormState = {
  name: '', phone: '', email: '', zip: '',
  address: '', appliance: '', brand: '', issue: '', date: '', timeSlot: '', urgency: 'standard',
};

export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openModal = useCallback(() => {
    setOpen(true);
    setTimeout(() => setVisible(true), 10);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
    setTimeout(() => setOpen(false), 250);
  }, []);

  useEffect(() => {
    window.addEventListener('open-booking', openModal);
    return () => window.removeEventListener('open-booking', openModal);
  }, [openModal]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, closeModal]);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(form.phone.replace(/\s/g, '')))
      newErrors.phone = 'Please enter a valid phone number';
    if (!form.zip.trim()) newErrors.zip = 'ZIP code is required';
    else if (!/^\d{5}$/.test(form.zip)) newErrors.zip = 'Please enter a valid 5-digit ZIP';
    else if (!isCtZip(form.zip)) newErrors.zip = 'Sorry, we only service Connecticut (ZIP 06001–06928)';
    if (!form.address.trim()) newErrors.address = 'Service address is required';
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

      {/* Panel */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto transition-all duration-250 ${
          visible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-white border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-blue-950">Schedule a Repair</h2>
            <p className="text-sm text-slate-500 mt-0.5">We&apos;ll call you within 30 minutes to confirm</p>
          </div>
          <button
            onClick={closeModal}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors duration-200 cursor-pointer flex-shrink-0"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-950 mb-3">Booking Request Received!</h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Thank you, <strong className="text-blue-950">{form.name}</strong>! We&apos;ve received your repair request for your <strong className="text-blue-950">{form.appliance}</strong>.
                {form.date && <> Your preferred date is <strong className="text-blue-950">{form.date}</strong>.</>}{' '}
                A technician will call <strong className="text-blue-950">{form.phone}</strong> within 30 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:+19592616736"
                  className="inline-flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200 cursor-pointer"
                >
                  Call (959) 261-6736
                </a>
                <button
                  onClick={() => { setSubmitted(false); setForm(initialState); closeModal(); }}
                  className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium rounded-xl transition-colors duration-200 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[280px_1fr] gap-8">

              {/* Left — trust sidebar */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Contact Us Directly</p>
                  <a
                    href="tel:+19592616736"
                    className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors duration-200 cursor-pointer group"
                  >
                    <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-blue-950 text-sm">(959) 261-6736</div>
                      <div className="text-xs text-slate-500">24/7 emergency line</div>
                    </div>
                  </a>
                </div>

                <div className="bg-blue-950 rounded-xl p-5 text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Our Guarantee</p>
                  <ul className="space-y-2.5">
                    {[
                      'Free diagnostic with any paid repair',
                      'Written estimate before work begins',
                      '90-day parts & labor warranty',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-blue-100">
                        <svg className="w-4 h-4 text-[#ffb81c] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-1" aria-label="4.9 out of 5 stars">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} className="w-4 h-4 text-[#ffb81c]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm font-semibold text-blue-950 ml-1">4.9</span>
                  <span className="text-sm text-slate-400 ml-1">· 2,400+ reviews</span>
                </div>
              </div>

              {/* Right — form */}
              <form onSubmit={handleSubmit} noValidate aria-label="Repair booking form">
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="m-name" className="block text-sm font-semibold text-blue-950 mb-1.5">
                      Full Name <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input id="m-name" type="text" autoComplete="name" value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)} placeholder="John Smith"
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-blue-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${errors.name ? 'border-red-400' : 'border-slate-200 hover:border-blue-300'}`}
                      aria-required="true" aria-describedby={errors.name ? 'm-name-error' : undefined}
                    />
                    {errors.name && <p id="m-name-error" className="text-red-500 text-xs mt-1" role="alert">{errors.name}</p>}
                  </div>

                  {/* Phone + ZIP */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="m-phone" className="block text-sm font-semibold text-blue-950 mb-1.5">
                        Phone <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input id="m-phone" type="tel" autoComplete="tel" value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)} placeholder="(203) 555-0100"
                        className={`w-full px-4 py-3 rounded-xl border bg-white text-blue-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${errors.phone ? 'border-red-400' : 'border-slate-200 hover:border-blue-300'}`}
                        aria-required="true" aria-describedby={errors.phone ? 'm-phone-error' : undefined}
                      />
                      {errors.phone && <p id="m-phone-error" className="text-red-500 text-xs mt-1" role="alert">{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="m-zip" className="block text-sm font-semibold text-blue-950 mb-1.5">
                        ZIP Code <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input id="m-zip" type="text" inputMode="numeric" autoComplete="postal-code"
                        value={form.zip} onChange={(e) => handleChange('zip', e.target.value)}
                        placeholder="06510" maxLength={5}
                        className={`w-full px-4 py-3 rounded-xl border bg-white text-blue-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${errors.zip ? 'border-red-400' : 'border-slate-200 hover:border-blue-300'}`}
                        aria-required="true" aria-describedby={errors.zip ? 'm-zip-error' : 'm-zip-status'}
                      />
                      {errors.zip
                        ? <p id="m-zip-error" className="text-red-500 text-xs mt-1" role="alert">{errors.zip}</p>
                        : form.zip.length === 5 && (
                            isCtZip(form.zip)
                              ? <p id="m-zip-status" className="text-green-600 text-xs mt-1 flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>We service your area</p>
                              : <p id="m-zip-status" className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>Outside our service area (CT only)</p>
                          )
                      }
                    </div>
                  </div>

                  {/* Service Address */}
                  <div>
                    <label htmlFor="m-address" className="block text-sm font-semibold text-blue-950 mb-1.5">
                      Service Address <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <AddressAutocomplete
                      id="m-address"
                      value={form.address}
                      onChange={(v) => handleChange('address', v)}
                      error={errors.address}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1" role="alert">{errors.address}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="m-email" className="block text-sm font-semibold text-blue-950 mb-1.5">
                      Email <span className="text-slate-400 font-normal text-xs">(optional)</span>
                    </label>
                    <input id="m-email" type="email" autoComplete="email" value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)} placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 hover:border-blue-300 bg-white text-blue-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                    />
                  </div>

                  {/* Appliance + Brand */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="m-appliance" className="block text-sm font-semibold text-blue-950 mb-1.5">
                        Appliance <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <select id="m-appliance" value={form.appliance}
                        onChange={(e) => handleChange('appliance', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${errors.appliance ? 'border-red-400 text-blue-950' : 'border-slate-200 hover:border-blue-300'} ${!form.appliance ? 'text-slate-400' : 'text-blue-950'}`}
                        aria-required="true" aria-describedby={errors.appliance ? 'm-appliance-error' : undefined}
                      >
                        <option value="" disabled>Select appliance...</option>
                        {appliances.map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                      {errors.appliance && <p id="m-appliance-error" className="text-red-500 text-xs mt-1" role="alert">{errors.appliance}</p>}
                    </div>
                    <div>
                      <label htmlFor="m-brand" className="block text-sm font-semibold text-blue-950 mb-1.5">
                        Brand <span className="text-slate-400 font-normal text-xs">(optional)</span>
                      </label>
                      <input id="m-brand" type="text" value={form.brand}
                        onChange={(e) => handleChange('brand', e.target.value)}
                        placeholder="e.g. Whirlpool, LG..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 hover:border-blue-300 bg-white text-blue-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Issue */}
                  <div>
                    <label htmlFor="m-issue" className="block text-sm font-semibold text-blue-950 mb-1.5">
                      Describe the Issue <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <textarea id="m-issue" rows={3} value={form.issue}
                      onChange={(e) => handleChange('issue', e.target.value)}
                      placeholder="e.g. Washer won't spin, makes grinding noise..."
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-blue-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors duration-200 ${errors.issue ? 'border-red-400' : 'border-slate-200 hover:border-blue-300'}`}
                      aria-required="true" aria-describedby={errors.issue ? 'm-issue-error' : undefined}
                    />
                    {errors.issue && <p id="m-issue-error" className="text-red-500 text-xs mt-1" role="alert">{errors.issue}</p>}
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label htmlFor="m-datepicker" className="block text-sm font-semibold text-blue-950 mb-1.5">
                      Preferred Date <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <DatePicker
                      id="m-datepicker"
                      value={form.date}
                      onChange={(date) => handleChange('date', date)}
                      error={errors.date}
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1" role="alert">{errors.date}</p>}
                  </div>

                  {/* Urgency + Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <fieldset>
                        <legend className="block text-sm font-semibold text-blue-950 mb-2">Urgency</legend>
                        <div className="space-y-2">
                          {[{ value: 'emergency', label: 'Emergency' }, { value: 'today', label: 'Today' }, { value: 'standard', label: 'Next 2 days' }].map((opt) => (
                            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name="m-urgency" value={opt.value}
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
                      <label htmlFor="m-timeSlot" className="block text-sm font-semibold text-blue-950 mb-1.5">Preferred Time</label>
                      <select id="m-timeSlot" value={form.timeSlot}
                        onChange={(e) => handleChange('timeSlot', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 hover:border-blue-300 bg-white text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 text-sm cursor-pointer"
                      >
                        <option value="">Any time</option>
                        {timeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit" disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] disabled:bg-[#ffb81c]/50 text-gray-900 font-bold py-4 rounded-xl transition-colors duration-200 cursor-pointer shadow-md text-lg disabled:cursor-not-allowed"
                    aria-disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
          )}
        </div>
      </div>
    </div>
  );
}
