'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { openBookingModal } from '@/lib/booking';

const slides = [
  {
    src: '/images/hero/washer.jpg',
    alt: 'Washer and dryer repair service',
    label: 'Washer & Dryer Repair',
    stat: 'Same-day service available',
  },
  {
    src: '/images/hero/dishwasher.jpg',
    alt: 'Dishwasher being serviced',
    label: 'Dishwasher Repair',
    stat: 'OEM parts on every job',
  },
  {
    src: '/images/hero/oven-repair.jpg',
    alt: 'Oven and range repair',
    label: 'Oven & Range Repair',
    stat: '90-day labor warranty',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((i) => (i + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="bg-white pt-20 border-b border-slate-100" aria-label="Hero section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT ── */}
          <div>
            <p className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-6">
              Licensed &amp; Insured · Serving Connecticut Since 2008
            </p>

            <h1 className="text-5xl lg:text-6xl font-bold text-blue-950 leading-[1.1] tracking-tight mb-6">
              Same-Day Appliance
              <br />
              Repair Across{' '}
              <span className="text-[#ffb81c]">Connecticut</span>
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-lg">
              Fast, affordable repairs for washers, dryers, refrigerators, dishwashers, and ovens.
              OEM parts, and a 90-day labor warranty&nbsp;on&nbsp;every job.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-5">
              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center justify-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] text-gray-900 font-bold px-8 py-4 rounded-xl text-base transition-colors duration-200 cursor-pointer shadow-md"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule a Repair
              </button>
              <a
                href="tel:+19592616736"
                className="inline-flex items-center justify-center gap-2 border-2 border-blue-950 hover:bg-blue-950 hover:text-white text-blue-950 font-bold px-8 py-4 rounded-xl text-base transition-colors duration-200 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (959) 261-6736
              </a>
            </div>

            <a
              href="#discounts"
              className="inline-flex items-center gap-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 hover:border-amber-300 text-amber-800 text-sm font-semibold px-4 py-2 rounded-full mb-8 transition-colors duration-200 self-start"
              aria-label="See community discounts — veterans save $50, seniors save $30"
            >
              <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Veterans Save $30 · Seniors Save $30
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              {['All major brands', '90-day warranty', 'Background-checked techs'].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#ffb81c] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Carousel ── */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 aspect-[4/5]" role="region" aria-label="Service image carousel" aria-roledescription="carousel">

            {/* Slides */}
            {slides.map((slide, i) => (
              <div
                key={slide.src}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}: ${slide.label}`}
                aria-hidden={i !== current}
                className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/20 to-transparent" aria-hidden="true" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-[#ffb81c] text-xs font-bold uppercase tracking-widest mb-1.5">{slide.stat}</p>
                  <p className="text-white text-2xl font-bold leading-tight">{slide.label}</p>
                </div>
              </div>
            ))}

            {/* Prev / Next */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center transition-colors duration-200 cursor-pointer"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center transition-colors duration-200 cursor-pointer"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 right-7 flex gap-1.5" role="tablist" aria-label="Slide indicators">
              {slides.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === current
                      ? 'w-6 h-2 bg-[#ffb81c]'
                      : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
