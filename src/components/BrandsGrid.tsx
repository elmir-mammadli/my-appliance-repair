'use client';

import { useRef, useEffect, useState } from 'react';

const brands = [
  // Premium tier
  { name: 'Sub-Zero', tier: 'premium' },
  { name: 'Viking', tier: 'premium' },
  { name: 'Thermador', tier: 'premium' },
  { name: 'Miele', tier: 'premium' },
  { name: 'Wolf', tier: 'premium' },
  { name: 'Dacor', tier: 'premium' },
  { name: 'Fisher & Paykel', tier: 'premium' },
  // Major tier
  { name: 'Whirlpool', tier: 'major' },
  { name: 'Samsung', tier: 'major' },
  { name: 'LG', tier: 'major' },
  { name: 'GE', tier: 'major' },
  { name: 'Bosch', tier: 'major' },
  { name: 'KitchenAid', tier: 'major' },
  { name: 'Maytag', tier: 'major' },
  { name: 'Electrolux', tier: 'major' },
  { name: 'Kenmore', tier: 'major' },
  // Standard tier
  { name: 'Frigidaire', tier: 'standard' },
  { name: 'Amana', tier: 'standard' },
  { name: 'Speed Queen', tier: 'standard' },
  { name: 'Hotpoint', tier: 'standard' },
  { name: 'GE Profile', tier: 'standard' },
  { name: 'Haier', tier: 'standard' },
  { name: 'Hisense', tier: 'standard' },
  { name: 'Sharp', tier: 'standard' },
  { name: 'Panasonic', tier: 'standard' },
  { name: 'Insignia', tier: 'standard' },
  { name: 'Crosley', tier: 'standard' },
  { name: 'Magic Chef', tier: 'standard' },
  { name: 'Admiral', tier: 'standard' },
  { name: 'Estate', tier: 'standard' },
];

export default function BrandsGrid() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-white border-y border-blue-100" aria-labelledby="brands-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-2">All Brands Welcome</span>
          <h2 id="brands-heading" className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">
            We Repair Every Major Brand
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            From budget-friendly to premium luxury — our certified technicians are trained and stocked for all of them.
          </p>
        </div>

        {/* Premium Brands */}
        <div className="mb-6">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 text-center">Premium & Luxury</p>
          <div ref={ref} className="flex flex-wrap justify-center gap-3">
            {brands.filter(b => b.tier === 'premium').map((brand, i) => (
              <div
                key={brand.name}
                className={`px-5 py-2.5 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl font-bold text-blue-900 text-sm hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-default ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
                style={{ transitionDelay: `${i * 50}ms`, transitionDuration: '400ms' }}
              >
                {brand.name}
              </div>
            ))}
          </div>
        </div>

        {/* Major Brands */}
        <div className="mb-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 text-center">Major Brands</p>
          <div className="flex flex-wrap justify-center gap-3">
            {brands.filter(b => b.tier === 'major').map((brand, i) => (
              <div
                key={brand.name}
                className={`px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 text-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 transition-all duration-200 cursor-default shadow-sm ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
                style={{ transitionDelay: `${(i + 7) * 50}ms`, transitionDuration: '400ms' }}
              >
                {brand.name}
              </div>
            ))}
          </div>
        </div>

        {/* Standard Brands */}
        <div className="mb-8">
          <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-3 text-center">& Many More</p>
          <div className="flex flex-wrap justify-center gap-2">
            {brands.filter(b => b.tier === 'standard').map((brand, i) => (
              <div
                key={brand.name}
                className={`px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg font-medium text-slate-500 text-xs hover:border-blue-200 hover:text-blue-600 transition-all duration-200 cursor-default ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
                style={{ transitionDelay: `${(i + 16) * 40}ms`, transitionDuration: '400ms' }}
              >
                {brand.name}
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-slate-400">
          Don&apos;t see your brand?{' '}
          <a href="tel:+19173783014" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200 cursor-pointer">
            Call us — we most likely service it.
          </a>
        </p>
      </div>
    </section>
  );
}
