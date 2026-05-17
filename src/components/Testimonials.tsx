'use client';

import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'West Hartford, CT',
    rating: 5,
    appliance: 'Refrigerator',
    text: 'My fridge stopped cooling on a Friday evening. I called MyAppliance Repair LLC and they had a technician at my home Saturday morning. Fixed in under an hour! Saved all my food. Incredibly professional and fair pricing.',
    initials: 'SM',
  },
  {
    name: 'James K.',
    location: 'Fairfield, CT',
    rating: 5,
    appliance: 'Washing Machine',
    text: 'Called them about my washer that was leaking everywhere. The tech came the same afternoon, diagnosed the problem quickly, had the part on his truck, and fixed it on the spot. Couldn\'t ask for better service.',
    initials: 'JK',
  },
  {
    name: 'Linda P.',
    location: 'Glastonbury, CT',
    rating: 5,
    appliance: 'Dryer',
    text: 'My dryer was taking forever to dry clothes. They came out, cleaned the vent system which was severely clogged, and checked the heating element. Very thorough! The dryer works perfectly now and they even gave me tips to maintain it.',
    initials: 'LP',
  },
  {
    name: 'Robert T.',
    location: 'Stamford, CT',
    rating: 5,
    appliance: 'Dishwasher',
    text: 'Used MyAppliance Repair LLC twice now — once for my dishwasher and once for my oven. Both times: fast scheduling, punctual technicians, fair prices, and excellent work. They\'ve earned a customer for life.',
    initials: 'RT',
  },
  {
    name: 'Maria G.',
    location: 'New Haven, CT',
    rating: 5,
    appliance: 'Oven',
    text: 'Our oven stopped working right before Thanksgiving. MY APPLIANCE came out on very short notice, diagnosed a bad igniter, and had it replaced within hours. They saved our holiday dinner. Absolutely recommend them!',
    initials: 'MG',
  },
  {
    name: 'David H.',
    location: 'Norwalk, CT',
    rating: 5,
    appliance: 'Refrigerator',
    text: 'Professional from start to finish. They gave me a real upfront quote, showed up on time, and the repair was done right the first time. The 90-day warranty gives real peace of mind. Highly recommend.',
    initials: 'DH',
  },
];

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
          <div className="flex items-center justify-center gap-3 text-slate-600">
            <div className="flex gap-0.5" aria-label="4.9 out of 5 stars average rating">
              {[1,2,3,4,5].map((i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-bold text-blue-900">4.9/5</span>
            <span>from 2,400+ reviews</span>
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
                  <div className="ml-auto hidden sm:block">
                    <div className="text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                      Verified Customer
                    </div>
                  </div>
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
                <div>
                  <div className="font-semibold text-blue-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.location}</div>
                </div>
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
