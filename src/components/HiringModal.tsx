'use client';

import { useState, useEffect, useCallback } from 'react';

const brandOptions = [
  'Samsung', 'LG', 'Whirlpool', 'GE', 'Bosch',
  'Maytag', 'Frigidaire', 'KitchenAid', 'Electrolux', 'Miele',
];

interface FormState {
  name: string;
  phone: string;
  email: string;
  experience: string;
  availability: string;
  why: string;
}

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  experience: '',
  availability: '',
  why: '',
};

export default function HiringModal() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<FormState>(initialState);
  const [brands, setBrands] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string>('');
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
    window.addEventListener('open-hiring', openModal);
    return () => window.removeEventListener('open-hiring', openModal);
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
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Please enter a valid email address';
    if (!form.experience) newErrors.experience = 'Please select your experience level';
    if (!form.availability) newErrors.availability = 'Please select your availability';
    if (!form.why.trim()) newErrors.why = 'Please tell us why you want to join';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleBrand = (brand: string) => {
    setBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleCvChange = (file: File | null) => {
    setCvError('');
    if (!file) { setCvFile(null); return; }
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type)) {
      setCvError('Only PDF, DOC, or DOCX files are accepted');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setCvError('File must be 5MB or smaller');
      return;
    }
    setCvFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // Simulate submission — wire to an API route when ready
      await new Promise((res) => setTimeout(res, 800));
      setSubmitted(true);
    } catch {
      alert('Something went wrong. Please call us directly at (800) 555-0123.');
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
      aria-label="Join our team application"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto transition-all duration-250 ${
          visible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-white border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-blue-950">Apply to Join Our Team</h2>
            <p className="text-sm text-slate-500 mt-0.5">We&apos;ll be in touch within 2 business days</p>
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
              <h3 className="text-2xl font-bold text-blue-950 mb-3">Application Received!</h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Thanks, <strong className="text-blue-950">{form.name}</strong>! We&apos;ve received your application and will review it shortly.
                We&apos;ll be in touch within <strong className="text-blue-950">2 business days</strong> at{' '}
                <strong className="text-blue-950">{form.phone}</strong>.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm(initialState); setBrands([]); setCvFile(null); setCvError(''); closeModal(); }}
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium rounded-xl transition-colors duration-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-label="Job application form">
              <div className="space-y-5">

                {/* Name */}
                <div>
                  <label htmlFor="h-name" className="block text-sm font-semibold text-blue-950 mb-1.5">
                    Full Name <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="h-name" type="text" autoComplete="name" value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)} placeholder="John Smith"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-blue-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${errors.name ? 'border-red-400' : 'border-slate-200 hover:border-blue-300'}`}
                    aria-required="true" aria-describedby={errors.name ? 'h-name-error' : undefined}
                  />
                  {errors.name && <p id="h-name-error" className="text-red-500 text-xs mt-1" role="alert">{errors.name}</p>}
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="h-phone" className="block text-sm font-semibold text-blue-950 mb-1.5">
                      Phone <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="h-phone" type="tel" autoComplete="tel" value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)} placeholder="(203) 555-0100"
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-blue-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${errors.phone ? 'border-red-400' : 'border-slate-200 hover:border-blue-300'}`}
                      aria-required="true" aria-describedby={errors.phone ? 'h-phone-error' : undefined}
                    />
                    {errors.phone && <p id="h-phone-error" className="text-red-500 text-xs mt-1" role="alert">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="h-email" className="block text-sm font-semibold text-blue-950 mb-1.5">
                      Email <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="h-email" type="email" autoComplete="email" value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)} placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-blue-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${errors.email ? 'border-red-400' : 'border-slate-200 hover:border-blue-300'}`}
                      aria-required="true" aria-describedby={errors.email ? 'h-email-error' : undefined}
                    />
                    {errors.email && <p id="h-email-error" className="text-red-500 text-xs mt-1" role="alert">{errors.email}</p>}
                  </div>
                </div>

                {/* Experience + Availability */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="h-experience" className="block text-sm font-semibold text-blue-950 mb-1.5">
                      Years of Experience <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="h-experience" value={form.experience}
                      onChange={(e) => handleChange('experience', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${errors.experience ? 'border-red-400 text-blue-950' : 'border-slate-200 hover:border-blue-300'} ${!form.experience ? 'text-slate-400' : 'text-blue-950'}`}
                      aria-required="true" aria-describedby={errors.experience ? 'h-experience-error' : undefined}
                    >
                      <option value="" disabled>Select range...</option>
                      {['0–1 years', '1–3 years', '3–5 years', '5–10 years', '10+ years'].map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {errors.experience && <p id="h-experience-error" className="text-red-500 text-xs mt-1" role="alert">{errors.experience}</p>}
                  </div>
                  <div>
                    <fieldset>
                      <legend className="block text-sm font-semibold text-blue-950 mb-2">
                        Availability <span className="text-red-500" aria-hidden="true">*</span>
                      </legend>
                      <div className="space-y-2">
                        {[
                          { value: 'full-time', label: 'Full-time' },
                          { value: 'part-time', label: 'Part-time' },
                          { value: 'either', label: 'Either' },
                        ].map((opt) => (
                          <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio" name="h-availability" value={opt.value}
                              checked={form.availability === opt.value}
                              onChange={(e) => handleChange('availability', e.target.value)}
                              className="text-blue-700 focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-sm text-blue-950">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    {errors.availability && <p className="text-red-500 text-xs mt-1" role="alert">{errors.availability}</p>}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <p className="block text-sm font-semibold text-blue-950 mb-2">
                    Appliance Brands You&apos;re Comfortable With{' '}
                    <span className="text-slate-400 font-normal text-xs">(select all that apply)</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {brandOptions.map((brand) => {
                      const checked = brands.includes(brand);
                      return (
                        <button
                          key={brand}
                          type="button"
                          onClick={() => toggleBrand(brand)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors duration-200 cursor-pointer ${
                            checked
                              ? 'bg-blue-700 border-blue-700 text-white'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700'
                          }`}
                          aria-pressed={checked}
                        >
                          {brand}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Why */}
                <div>
                  <label htmlFor="h-why" className="block text-sm font-semibold text-blue-950 mb-1.5">
                    Why do you want to join us? <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="h-why" rows={4} value={form.why}
                    onChange={(e) => handleChange('why', e.target.value)}
                    placeholder="Tell us a bit about yourself and why you'd be a great fit..."
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-blue-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors duration-200 ${errors.why ? 'border-red-400' : 'border-slate-200 hover:border-blue-300'}`}
                    aria-required="true" aria-describedby={errors.why ? 'h-why-error' : undefined}
                  />
                  {errors.why && <p id="h-why-error" className="text-red-500 text-xs mt-1" role="alert">{errors.why}</p>}
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-sm font-semibold text-blue-950 mb-1.5">
                    Resume / CV{' '}
                    <span className="text-slate-400 font-normal text-xs">(optional)</span>
                  </label>
                  {cvFile ? (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50">
                      <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm text-blue-950 truncate flex-1">{cvFile.name}</span>
                      <button
                        type="button"
                        onClick={() => { setCvFile(null); setCvError(''); }}
                        className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors duration-200 flex-shrink-0 cursor-pointer"
                        aria-label="Remove file"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full px-4 py-5 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50/30 cursor-pointer transition-colors duration-200">
                      <svg className="w-7 h-7 text-slate-400 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span className="text-sm text-slate-500">Click to upload or drag and drop</span>
                      <span className="text-xs text-slate-400 mt-0.5">PDF, DOC or DOCX, max 5MB</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="sr-only"
                        onChange={(e) => handleCvChange(e.target.files?.[0] ?? null)}
                        aria-label="Upload resume or CV"
                      />
                    </label>
                  )}
                  {cvError && <p className="text-red-500 text-xs mt-1" role="alert">{cvError}</p>}
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
                      Submitting...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Submit Application
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-400">
                  We review every application personally. No automated rejections.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
