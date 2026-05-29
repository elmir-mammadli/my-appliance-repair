'use client';

import { useState, useEffect, useRef } from 'react';

const GOOGLE_REVIEWS_URL = 'https://share.google/aktwu5fUEtjV6Eo40';

const testimonials = [
  {
    name: 'Niyazi Y.',
    location: 'Connecticut',
    rating: 5,
    appliance: 'Dishwasher',
    text: 'I called MyAppliance Repair at 10 AM and they had Nijat at my door by 1:30 that same afternoon. He walked me through everything, tested every one of my new kitchen appliances, and even installed my disposal press button — all without me asking. 75 minutes. That\'s all it took to turn one of my most stressful days into one where I felt completely taken care of.',
    initials: 'NY',
    source: 'google' as const,
  },
  {
    name: 'Ruhiyya A.',
    location: 'Connecticut',
    rating: 5,
    appliance: 'Dishwasher',
    text: 'Our KitchenAid dishwasher was not draining correctly and had very weak water pressure during the wash cycle. Nijat diagnosed the issue fast and knew exactly what to check. He was professional, honest, and took the time to explain everything. The dishwasher is running properly again and we\'re really satisfied with the service.',
    initials: 'RA',
    source: 'google' as const,
  },
  {
    name: 'Christopher N.',
    location: 'Connecticut',
    rating: 5,
    appliance: 'Freezer',
    text: 'My Appliance Repair contacted me minutes after I submitted a request for service, came out at my earliest available time, and fixed the issue with my freezer. The technician showed me what the problem was, explained how he could fix it, and communicated the cost before doing anything. Did not pressure me at all. I had a great experience and recommend using them.',
    initials: 'CN',
    source: 'google' as const,
  },
  {
    name: 'Linda',
    location: 'Connecticut',
    rating: 5,
    appliance: 'Appliance Repair',
    text: 'Such a smooth and pleasant experience. They were kind, professional, and made the whole process feel easy and stress free. So happy I found them and will definitely call again if I ever need help.',
    initials: 'L',
    source: 'google' as const,
  },
  {
    name: 'Koksal D.',
    location: 'Connecticut',
    rating: 5,
    appliance: 'Appliance Repair',
    text: 'Really good people and great service. They came fast, explained everything clearly, and fixed the issue without wasting time. Honest, respectful and easy to deal with. Felt more like getting help from people you know than an appliance repair company. Definitely recommended.',
    initials: 'KD',
    source: 'google' as const,
  },
  {
    name: 'S. Mizrahi',
    location: 'Connecticut',
    rating: 5,
    appliance: 'Microwave',
    text: 'Our microwave stopped heating and was making unusual noises. The technician arrived on time, quickly diagnosed the issue, and fixed it the same day. Very professional, honest pricing, and great communication throughout the process. The microwave works perfectly again. Highly recommend MyAppliance Repair LLC for any appliance repairs!',
    initials: 'SM',
    source: 'google' as const,
  },
];

function GoogleLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-label="Google" role="img">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function YelpLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-label="Yelp" role="img" fill="#FF1A1A">
      <path d="M20.16 12.73l-4.703 1.14c-.44.107-.7-.12-.7-.51V13c0-.25.14-.48.37-.58l4.473-2.01c.45-.2.9.1.9.58v1.28c0 .29-.14.56-.34.46zM19.2 16.97l-4.18 2.35c-.4.23-.83.02-.9-.43l-.07-.34c-.05-.25.07-.5.3-.64l4.05-2.62c.42-.27.88 0 .88.5v.58c0 .23-.04.45-.1.6zM12 21.8c0 .66-.54 1.2-1.2 1.2h-.6c-3.28 0-5.9-1.2-7.55-3.3-.28-.36-.22-.87.14-1.15l3.74-2.83c.38-.29.92-.2 1.2.18.57.77 1.5 1.3 2.47 1.3h.6c.66 0 1.2.54 1.2 1.2v3.4zM10.8 2.2v5.4c0 .66-.54 1.2-1.2 1.2H9c-1.44 0-2.8.52-3.87 1.46-.3.27-.76.25-1.04-.05L1.5 7.6c-.3-.32-.27-.82.07-1.1C3.26 4.96 5.94 4 8.8 4h.8c.66 0 1.2.54 1.2 1.2v-3zM12 2.2V.6C12 .27 12.27 0 12.6 0h.6c3.04 0 5.76 1.08 7.87 2.87.34.29.37.8.06 1.12l-2.6 2.6c-.3.3-.77.3-1.07.02C15.96 5.54 14.67 5 13.2 5h-.6c-.33 0-.6-.27-.6-.6V2.2z"/>
    </svg>
  );
}

function SourceBadge({ source }: { source: 'google' | 'yelp' }) {
  if (source === 'google') {
    return (
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
        aria-label="Reviewed on Google"
      >
        <GoogleLogo className="w-4 h-4" />
        <span>Google</span>
      </a>
    );
  }
  return (
    <div className="ml-auto hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-500">
      <YelpLogo className="w-4 h-4" />
      <span>Yelp</span>
    </div>
  );
}

function MiniSourceBadge({ source }: { source: 'google' | 'yelp' }) {
  if (source === 'google') {
    return <GoogleLogo className="w-3.5 h-3.5 flex-shrink-0" />;
  }
  return <YelpLogo className="w-3.5 h-3.5 flex-shrink-0" />;
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused]);

  const go = (index: number) => {
    setCurrent(index);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  };

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-blue-50" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">Customer Reviews</span>
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
            What Our Customers Say
          </h2>
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 text-slate-600">
              <div className="flex gap-0.5" aria-label="4.9 out of 5 stars average rating">
                {[1,2,3,4,5].map((i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-bold text-blue-900">4.9/5</span>
              <span>from 2,400+ verified reviews</span>
            </div>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 hover:border-slate-300 bg-white rounded-full px-4 py-2 shadow-sm"
            >
              <GoogleLogo className="w-4 h-4" />
              Read all our Google reviews
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Featured Testimonial Carousel */}
        <div
          className="relative mb-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-blue-100 max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-6 right-8 text-blue-100">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {testimonials.map((t, index) => (
              <div
                key={t.name}
                className={`transition-all duration-500 ${
                  current === index ? 'block opacity-100' : 'hidden opacity-0'
                }`}
                aria-hidden={current !== index}
              >
                <StarRating count={t.rating} />
                <p className="text-slate-700 text-lg lg:text-xl leading-relaxed mt-4 mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" aria-hidden="true">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-blue-900">{t.name}</div>
                    <div className="text-sm text-slate-500">{t.location} • {t.appliance} Repair</div>
                  </div>
                  <SourceBadge source={t.source} />
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6" role="group" aria-label="Testimonial navigation">
            {testimonials.map((t, index) => (
              <button
                key={index}
                onClick={() => go(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                  current === index ? 'bg-blue-700 w-6' : 'bg-blue-300 hover:bg-blue-400'
                }`}
                aria-label={`View testimonial from ${t.name}`}
                aria-pressed={current === index}
              />
            ))}
          </div>
        </div>

        {/* Grid of mini cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, index) => (
            <button
              key={t.name}
              onClick={() => go(index)}
              className={`text-left bg-white rounded-xl p-5 border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
                current === index ? 'border-blue-400 shadow-md' : 'border-blue-100 hover:border-blue-300'
              }`}
              aria-pressed={current === index}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0" aria-hidden="true">
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-blue-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.location}</div>
                </div>
                <MiniSourceBadge source={t.source} />
              </div>
              <StarRating count={t.rating} />
              <p className="text-slate-600 text-sm mt-2 line-clamp-2">{t.text}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
