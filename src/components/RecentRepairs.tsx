'use client';

import { useRef, useEffect, useState } from 'react';
import { openBookingModal } from '@/lib/booking';

const repairs = [
  {
    brand: 'Samsung',
    model: 'WF45R6100AW — Front-Load Washer',
    issue: 'Door gasket torn + drum bearing worn',
    parts: ['Door boot seal', 'Drum bearing & shaft'],
    outcome: 'Full repair completed in one visit. Drum silent, seal watertight.',
    location: 'Glastonbury, CT',
    date: 'Mar 2026',
    category: 'Washer',
    color: 'blue',
  },
  {
    brand: 'Whirlpool',
    model: 'WRT518SZFM — Side-by-Side Refrigerator',
    issue: 'Compressor failure — fridge section not cooling',
    parts: ['Compressor', 'Start relay', 'Capacitor'],
    outcome: 'Compressor replaced. Fridge back to 37°F within 3 hours of repair.',
    location: 'West Hartford, CT',
    date: 'Mar 2026',
    category: 'Refrigerator',
    color: 'indigo',
  },
  {
    brand: 'LG',
    model: 'DLEX3900W — Electric Dryer',
    issue: 'No heat — clothes coming out damp after full cycle',
    parts: ['Heating element', 'Thermal fuse', 'Thermistor'],
    outcome: 'Heating restored. Unit tested at proper drying temp before leaving.',
    location: 'Fairfield, CT',
    date: 'Feb 2026',
    category: 'Dryer',
    color: 'blue',
  },
  {
    brand: 'Bosch',
    model: 'SHPM88Z75N — Built-In Dishwasher',
    issue: 'Water not draining — standing water after every cycle',
    parts: ['Drain pump motor', 'Check valve', 'Filter assembly'],
    outcome: 'Drain pump replaced. Full cycle run on-site — no standing water.',
    location: 'Westport, CT',
    date: 'Feb 2026',
    category: 'Dishwasher',
    color: 'teal',
  },
  {
    brand: 'GE',
    model: 'JGB735SPSS — Gas Range',
    issue: 'Burners not igniting — clicking but no flame',
    parts: ['Igniter assembly', 'Spark module', 'Burner caps'],
    outcome: 'All four burners restored. Gas pressure and connections verified safe.',
    location: 'Stamford, CT',
    date: 'Mar 2026',
    category: 'Oven & Range',
    color: 'orange',
  },
  {
    brand: 'KitchenAid',
    model: 'KRMF706ESS — French Door Refrigerator',
    issue: 'Ice maker not producing ice — water dispenser working fine',
    parts: ['Ice maker assembly', 'Water inlet valve (ice side)', 'Ice level sensor'],
    outcome: 'Ice maker replaced. Full ice production restored within 24 hrs.',
    location: 'Greenwich, CT',
    date: 'Jan 2026',
    category: 'Refrigerator',
    color: 'indigo',
  },
  {
    brand: 'Maytag',
    model: 'MED5500FW — Electric Dryer',
    issue: 'Loud thumping noise + drum not spinning freely',
    parts: ['Drum drive belt', 'Idler pulley', 'Drum glides'],
    outcome: 'Belt & pulley replaced. Drum runs quietly and smoothly.',
    location: 'New Haven, CT',
    date: 'Feb 2026',
    category: 'Dryer',
    color: 'blue',
  },
  {
    brand: 'Frigidaire',
    model: 'FFSS2615TS — Side-by-Side Refrigerator',
    issue: 'Loud humming + freezer frosting over — fridge section warm',
    parts: ['Evaporator fan motor', 'Defrost heater', 'Defrost thermostat'],
    outcome: 'Defrost system repaired. Both compartments back to proper temp.',
    location: 'Hartford, CT',
    date: 'Mar 2026',
    category: 'Refrigerator',
    color: 'indigo',
  },
];

const categoryColors: Record<string, string> = {
  'Washer': 'bg-blue-100 text-blue-700',
  'Dryer': 'bg-sky-100 text-sky-700',
  'Refrigerator': 'bg-indigo-100 text-indigo-700',
  'Dishwasher': 'bg-teal-100 text-teal-700',
  'Oven & Range': 'bg-orange-100 text-orange-700',
};

function RepairCard({ repair, index }: { repair: typeof repairs[0]; index: number }) {
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
    <div
      ref={ref}
      className={`bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-default ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-2 ${categoryColors[repair.category] ?? 'bg-blue-100 text-blue-700'}`}>
              {repair.category}
            </span>
            <p className="font-bold text-white text-base">{repair.brand}</p>
            <p className="text-blue-200 text-xs mt-0.5">{repair.model}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-blue-300 text-xs">{repair.date}</p>
            <p className="text-blue-200 text-xs mt-0.5">{repair.location}</p>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-5 py-4 space-y-3">
        {/* Problem */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Problem Reported</p>
          <p className="text-slate-700 text-sm font-medium">{repair.issue}</p>
        </div>

        {/* Parts */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Parts Replaced</p>
          <div className="flex flex-wrap gap-1.5">
            {repair.parts.map((part) => (
              <span key={part} className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-md font-medium">
                {part}
              </span>
            ))}
          </div>
        </div>

        {/* Outcome */}
        <div className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-lg px-3 py-2.5">
          <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <p className="text-green-700 text-xs font-medium leading-relaxed">{repair.outcome}</p>
        </div>
      </div>
    </div>
  );
}

export default function RecentRepairs() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-100" aria-labelledby="repairs-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">Proof of Work</span>
          <h2 id="repairs-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
            Recently Completed Repairs
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Real repairs, real appliances, real Connecticut homeowners. Every job documented with the parts replaced and outcome verified before we leave.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {repairs.map((repair, index) => (
            <RepairCard key={`${repair.brand}-${repair.model}`} repair={repair} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-8 text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex gap-0.5" aria-label="5 out of 5 stars">
              {[1,2,3,4,5].map((i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-bold text-lg">5.0</span>
            <span className="text-blue-300">·</span>
            <span className="text-blue-200">across Google &amp; Thumbtack</span>
          </div>
          <p className="text-blue-100 mb-6 text-lg">Your appliance could be next. Most repairs done in a single visit.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openBookingModal()}
              className="inline-flex items-center justify-center gap-2 bg-[#ffb81c] hover:bg-[#ffca4d] text-gray-900 font-bold px-8 py-3.5 rounded-xl transition-all duration-200 cursor-pointer shadow-lg"
            >
              Book a Repair Today
            </button>
            <a
              href="tel:+19592616736"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (959) 261-6736
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
