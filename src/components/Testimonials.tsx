'use client';

import { useState, useEffect, useRef } from 'react';

const GOOGLE_REVIEWS_URL = 'https://share.google/aktwu5fUEtjV6Eo40';

const testimonials = [
  {
    name: 'Niyazi Y.',
    initials: 'NY',
    text: 'I called MyAppliance Repair at 10 AM and they had Nijat at my door by 1:30 that same afternoon. He walked me through everything and even installed my disposal press button — all without me asking. 75 minutes. That\'s all it took.',
    appliance: 'Dishwasher',
  },
  {
    name: 'Ruhiyya A.',
    initials: 'RA',
    text: 'Our KitchenAid dishwasher was not draining correctly. Nijat diagnosed the issue fast and knew exactly what to check. Professional, honest, and took the time to explain everything. The dishwasher is running perfectly again.',
    appliance: 'Dishwasher',
  },
  {
    name: 'Christopher N.',
    initials: 'CN',
    text: 'They contacted me minutes after I submitted a request, came out at my earliest time, and fixed my freezer. The technician showed me the problem, explained the fix, and communicated the cost before doing anything. Great experience.',
    appliance: 'Freezer',
  },
  {
    name: 'Linda',
    initials: 'L',
    text: 'Such a smooth and pleasant experience. They were kind, professional, and made the whole process feel easy and stress free. So happy I found them and will definitely call again.',
    appliance: 'Appliance Repair',
  },
  {
    name: 'Koksal D.',
    initials: 'KD',
    text: 'Really good people and great service. They came fast, explained everything clearly, and fixed the issue without wasting time. Honest, respectful and easy to deal with. Felt more like getting help from people you know.',
    appliance: 'Appliance Repair',
  },
  {
    name: 'S. Mizrahi',
    initials: 'SM',
    text: 'Our microwave stopped heating and was making unusual noises. The technician arrived on time, quickly diagnosed the issue, and fixed it the same day. Very professional, honest pricing, and great communication.',
    appliance: 'Microwave',
  },
];

function GoogleG() {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" aria-label="Google review" role="img">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

function GoogleWordmark() {
  return (
    <svg viewBox="0 0 272 92" className="h-7 w-auto" aria-label="Google" role="img">
      <path fill="#4285F4" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
      <path fill="#EA4335" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
      <path fill="#FBBC05" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" />
      <path fill="#4285F4" d="M225 3v65h-9.5V3h9.5z" />
      <path fill="#34A853" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.70-8.23-4.70-4.95 0-11.84 4.37-11.59 12.93z" />
      <path fill="#EA4335" d="M35.29 41.41V32h31.36c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 35.36.36 16.83 16.32 1.37 34.95 1.37c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.14.11z" />
    </svg>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisible(1);
      else if (window.innerWidth < 1024) setVisible(2);
      else setVisible(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const max = testimonials.length - visible;

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev >= max ? 0 : prev + 1));
    }, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, max]);

  const prev = () => { setIndex((i) => (i <= 0 ? max : i - 1)); setPaused(true); };
  const next = () => { setIndex((i) => (i >= max ? 0 : i + 1)); setPaused(true); };

  return (
    <section id="testimonials" className="py-14 bg-blue-50" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <h2
          id="testimonials-heading"
          className="text-3xl sm:text-4xl font-bold text-center text-blue-900 mb-2 font-[family-name:var(--font-lexend)]"
        >
          Our Happy{' '}
          <span style={{ color: '#F97316' }}>Customers!</span>
        </h2>
        <div className="mx-auto mb-10 h-px w-16 bg-slate-300" aria-hidden="true" />

        {/* Body: rating panel + carousel */}
        <div
          className="flex items-center gap-4 sm:gap-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >

          {/* Left: aggregate rating */}
          <div className="hidden sm:flex flex-col items-center gap-1.5 w-36 flex-shrink-0 text-center select-none">
            <div className="flex gap-0.5" aria-label="4.9 out of 5 stars">
              {[1,2,3,4,5].map((i) => (
                <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-xs text-slate-600 font-[family-name:var(--font-source-sans-3)]">
              Based on <strong className="text-blue-900">22</strong> reviews
            </p>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View our Google reviews"
              className="mt-1 hover:opacity-80 transition-opacity"
            >
              <GoogleWordmark />
            </a>
          </div>

          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Previous reviews"
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 cursor-pointer"
          >
            <svg className="w-4 h-4 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Cards */}
          <div className="flex-1 overflow-hidden" aria-live="polite" aria-atomic="true">
            <div
              className="flex gap-4 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(calc(-${index} * (100% / ${visible} + ${visible > 1 ? '16px' : '0px'})))` }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="flex-shrink-0 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col gap-3"
                  style={{ width: `calc(${100 / visible}% - ${visible > 1 ? '12px' : '0px'})` }}
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0" aria-hidden="true">
                        {t.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900 text-sm leading-tight font-[family-name:var(--font-lexend)]">{t.name}</div>
                        <div className="text-xs text-slate-400">{t.appliance}</div>
                      </div>
                    </div>
                    <GoogleG />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5" aria-label="5 stars">
                    {[1,2,3,4,5].map((i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-slate-600 text-sm leading-relaxed flex-1 font-[family-name:var(--font-source-sans-3)]">
                    {t.text}
                  </p>

                  <a
                    href={GOOGLE_REVIEWS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    Read more
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Next reviews"
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 cursor-pointer"
          >
            <svg className="w-4 h-4 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>

        {/* Mobile: rating strip */}
        <div className="sm:hidden flex items-center justify-center gap-3 mt-6">
          <div className="flex gap-0.5" aria-label="4.9 out of 5 stars">
            {[1,2,3,4,5].map((i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-bold text-blue-900">4.9</span>
          <span className="text-sm text-slate-500">· 22 reviews</span>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="View on Google">
            <GoogleG />
          </a>
        </div>

      </div>
    </section>
  );
}
