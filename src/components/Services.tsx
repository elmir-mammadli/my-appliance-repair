'use client';

import { useState, useRef, useEffect } from 'react';
import { openBookingModal } from '@/lib/booking';
import { HugeiconsIcon } from '@hugeicons/react';
import { ToolsIcon, ShieldPlusIcon, FlashIcon } from '@hugeicons/core-free-icons';

const services = [
  {
    id: 'washer',
    title: 'Washer Repair',
    subtitle: 'Top-load & front-load, all brands',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5} />
        <circle cx="17" cy="5" r="1" fill="currentColor" strokeWidth={0} />
        <circle cx="14.5" cy="5" r="1" fill="currentColor" strokeWidth={0} />
      </svg>
    ),
    description: 'A broken washer disrupts your entire household routine. Our technicians are stocked for same-day washer repairs on every major brand and model.',
    symptoms: [
      'Won\'t spin or agitate',
      'Not draining — water sitting in drum',
      'Leaking water from door or bottom',
      'Excessive vibration or "walking"',
      'Won\'t fill with water',
      'Loud banging or grinding noise',
      'Door won\'t lock or latch',
      'Mold or mildew on door gasket',
      'Leaves clothes soaking wet',
      'Error codes on display panel',
      'Won\'t start or power on',
      'Burning smell during cycle',
    ],
    parts: [
      'Control board', 'Door latch/lock assembly', 'Drain pump', 'Water inlet valve',
      'Drive belt', 'Motor coupling', 'Lid switch', 'Door gasket / boot seal',
      'Shock absorbers', 'Drum bearing', 'Agitator cam kit', 'Pressure switch',
    ],
    brands: ['Whirlpool', 'Samsung', 'LG', 'GE', 'Maytag', 'Speed Queen', 'Electrolux', 'Bosch'],
  },
  {
    id: 'dryer',
    title: 'Dryer Repair',
    subtitle: 'Gas & electric, all configurations',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="5" strokeWidth={1.5} />
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeWidth={1.5} d="M12 7v1M12 16v1M7 12h1M16 12h1" />
      </svg>
    ),
    description: 'No heat or a drum that won\'t turn means wet clothes and frustration. We carry heating elements, belts, and gas components for every major dryer brand.',
    symptoms: [
      'No heat — clothes come out damp',
      'Takes 2–3 cycles to dry clothes',
      'Stops mid-cycle unexpectedly',
      'Won\'t start at all',
      'Squeaking or thumping noise',
      'Drum not turning',
      'Overheating / shutting off early',
      'Burning smell from drum',
      'Door won\'t close or latch',
      'Error or fault codes on display',
      'Gas smell from dryer (call us immediately)',
      'Lint trap not seating properly',
    ],
    parts: [
      'Heating element', 'Thermal fuse', 'Igniter (gas)', 'Gas valve coils',
      'Drum drive belt', 'Idler pulley', 'Drum bearing', 'Drum glides / slides',
      'Door switch', 'Thermistor / thermostat', 'Control board', 'Start switch',
    ],
    brands: ['Whirlpool', 'LG', 'Samsung', 'GE', 'Maytag', 'Electrolux', 'Kenmore', 'Speed Queen'],
  },
  {
    id: 'refrigerator',
    title: 'Refrigerator Repair',
    subtitle: 'French door, side-by-side, top & bottom freezer',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <rect x="4" y="2" width="16" height="20" rx="2" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 10h16" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 6v2M8 14v4" />
      </svg>
    ),
    description: 'A fridge failure can cost you hundreds in lost food. We treat refrigerator calls as a priority — aiming for same-day service across all of Connecticut.',
    symptoms: [
      'Fridge not cooling — food going bad',
      'Freezer works but fridge section is warm',
      'Ice maker not producing ice',
      'Water dispenser not working',
      'Leaking water inside or on floor',
      'Loud humming, clicking, or buzzing',
      'Frost buildup in freezer',
      'Compressor running constantly',
      'Water pooling under vegetable drawers',
      'Temperature fluctuations',
      'Door seal / gasket not sealing',
      'Display panel not responding',
    ],
    parts: [
      'Compressor', 'Start relay & capacitor', 'Evaporator fan motor', 'Condenser fan motor',
      'Water inlet valve', 'Ice maker assembly', 'Door gasket', 'Defrost heater',
      'Defrost thermostat', 'Thermistor / temp sensor', 'Control board', 'Drain heater',
    ],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'KitchenAid', 'Sub-Zero', 'Bosch', 'Frigidaire'],
  },
  {
    id: 'dishwasher',
    title: 'Dishwasher Repair',
    subtitle: 'Built-in & portable, all brands',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <rect x="3" y="4" width="18" height="17" rx="2" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9h18" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 4v5M15 4v5" />
      </svg>
    ),
    description: 'Dishes coming out dirty or water not draining? We diagnose and fix all dishwasher problems — Bosch, Whirlpool, GE, Miele, and every brand in between.',
    symptoms: [
      'Dishes not getting clean',
      'Water not draining — standing at bottom',
      'Won\'t start or no power',
      'Leaking water onto kitchen floor',
      'Won\'t fill with water',
      'Dishes still wet after cycle ends',
      'Making grinding or rattling noise',
      'Door not latching or closing',
      'Soap dispenser not opening',
      'Bad odor after every cycle',
      'Spots and film on glasses',
      'Error code on display',
    ],
    parts: [
      'Drain pump', 'Wash pump / circulation motor', 'Control board', 'Door latch assembly',
      'Water inlet valve', 'Spray arms (upper & lower)', 'Heating element', 'Door gasket / tub seal',
      'Detergent dispenser', 'Float switch', 'Sump gasket', 'Vent & fan assembly',
    ],
    brands: ['Bosch', 'Whirlpool', 'GE', 'Samsung', 'Miele', 'KitchenAid', 'Frigidaire', 'Maytag'],
  },
  {
    id: 'oven',
    title: 'Oven & Range Repair',
    subtitle: 'Gas & electric, ranges & wall ovens',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18" />
        <circle cx="7" cy="7.5" r="1" fill="currentColor" strokeWidth={0} />
        <circle cx="12" cy="7.5" r="1" fill="currentColor" strokeWidth={0} />
        <circle cx="17" cy="7.5" r="1" fill="currentColor" strokeWidth={0} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 16h6" />
      </svg>
    ),
    description: 'Gas or electric — we repair all oven and range types. From igniter issues and temperature problems to control board failures and door repairs.',
    symptoms: [
      'Oven not heating to correct temperature',
      'Gas burners won\'t ignite',
      'Electric burner not working',
      'Oven takes too long to preheat',
      'Uneven cooking — hot and cold spots',
      'Self-clean cycle not working',
      'Door won\'t close or seal',
      'Gas smell when oven is on (urgent)',
      'Broiler not working',
      'Igniter clicking constantly',
      'Control panel / display malfunction',
      'Oven light not working',
    ],
    parts: [
      'Bake element', 'Broil element', 'Igniter assembly (gas)', 'Gas valve',
      'Temperature sensor / thermostat', 'Control board', 'Door hinge & spring',
      'Door gasket', 'Spark module', 'Surface burner switch', 'Burner caps & bases', 'Thermal fuse',
    ],
    brands: ['GE', 'Whirlpool', 'Samsung', 'LG', 'Bosch', 'KitchenAid', 'Thermador', 'Wolf'],
  },
  {
    id: 'other',
    title: 'More Appliances',
    subtitle: 'Freezer, ice maker, cooktop, microwave',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    description: 'We also repair freezers, stand-alone ice makers, cooktops, and microwaves. If it plugs in or runs on gas, we most likely fix it.',
    symptoms: [
      'Freezer not freezing properly',
      'Ice maker producing hollow or cloudy ice',
      'Cooktop burner not igniting',
      'Microwave not heating food',
      'Ice maker making too much or no ice',
      'Freezer making loud noise',
      'Cooktop display not working',
      'Microwave sparking inside',
      'Freezer door not sealing',
      'Ice maker leaking water',
      'Induction cooktop not detecting cookware',
      'Microwave turntable not spinning',
    ],
    parts: [
      'Freezer evaporator coil', 'Ice maker module', 'Cooktop igniter', 'Microwave magnetron',
      'Freezer compressor', 'Water filter head', 'Cooktop spark switch', 'Microwave control board',
      'Thermostat / thermocouple', 'Ice maker water valve', 'Cooktop glass surface', 'Door switch',
    ],
    brands: ['Whirlpool', 'Samsung', 'LG', 'GE', 'Frigidaire', 'Bosch', 'Sharp', 'Panasonic'],
  },
];

type TabType = 'symptoms' | 'parts';

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [activeTab, setActiveTab] = useState<TabType>('symptoms');
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      {/* Header */}
      <div className="p-6 pb-4 border-b border-blue-50">
        <div className="flex items-start gap-4">
          <div className="w-13 h-13 w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm">
            {service.icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-blue-900 text-lg leading-tight">{service.title}</h3>
            <p className="text-blue-500 text-xs font-medium mt-0.5">{service.subtitle}</p>
          </div>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed mt-3">{service.description}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-blue-50">
        <button
          onClick={() => setActiveTab('symptoms')}
          className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors duration-150 cursor-pointer ${
            activeTab === 'symptoms' ? 'text-blue-700 bg-blue-50 border-b-2 border-blue-600' : 'text-slate-400 hover:text-blue-500'
          }`}
          aria-pressed={activeTab === 'symptoms'}
        >
          Common Symptoms
        </button>
        <button
          onClick={() => setActiveTab('parts')}
          className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors duration-150 cursor-pointer ${
            activeTab === 'parts' ? 'text-blue-700 bg-blue-50 border-b-2 border-blue-600' : 'text-slate-400 hover:text-blue-500'
          }`}
          aria-pressed={activeTab === 'parts'}
        >
          Parts We Replace
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-5 flex-1">
        {activeTab === 'symptoms' && (
          <ul className="space-y-1.5" aria-label={`Common ${service.title} symptoms`}>
            {service.symptoms.map((symptom) => (
              <li key={symptom} className="flex items-start gap-2 text-sm text-slate-600">
                <svg className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {symptom}
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'parts' && (
          <div>
            <p className="text-xs text-slate-400 mb-3">Most carried in-stock on our service vans:</p>
            <div className="flex flex-wrap gap-1.5" aria-label={`Common parts replaced for ${service.title}`}>
              {service.parts.map((part) => (
                <span key={part} className="text-xs bg-blue-50 border border-blue-100 text-blue-700 px-2.5 py-1 rounded-md font-medium">
                  {part}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Brand Row */}
      <div className="px-5 pb-4 pt-2 border-t border-blue-50">
        <p className="text-xs text-slate-400 font-medium mb-2">Common brands we fix:</p>
        <div className="flex flex-wrap gap-1.5">
          {service.brands.map((brand) => (
            <span key={brand} className="text-xs bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded font-medium">
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <button
          onClick={openBookingModal}
          className="block w-full text-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-all duration-200 cursor-pointer text-sm"
        >
          Book {service.title}
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-blue-50" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">What We Fix</span>
          <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
            Expert Appliance Repair Services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Certified technicians stocked with OEM parts for every major brand. Click any appliance to see common symptoms and the parts we typically replace.
          </p>

          {/* Review pill */}
          <div className="inline-flex items-center gap-2 mt-5 bg-white border border-blue-200 rounded-full px-5 py-2 shadow-sm">
            <div className="flex gap-0.5" aria-label="4.9 star rating">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-bold text-blue-900 text-sm">4.9/5</span>
            <span className="text-slate-400 text-sm">·</span>
            <span className="text-slate-500 text-sm">2,400+ verified reviews across Connecticut</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-4 text-center">
          {[
            { icon: ToolsIcon, label: 'OEM Parts Only', sub: 'Original manufacturer parts on every repair' },
            { icon: ShieldPlusIcon, label: '90-Day Warranty', sub: 'Parts & labor guaranteed for 90 days' },
            { icon: FlashIcon, label: 'Single-Visit Goal', sub: 'Parts stocked to finish most jobs same day' },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-blue-100 px-5 py-4 flex items-center gap-4 shadow-sm">
              <HugeiconsIcon icon={item.icon} size={24} className="text-blue-700 flex-shrink-0" aria-hidden="true" />
              <div className="text-left">
                <p className="font-bold text-blue-900 text-sm">{item.label}</p>
                <p className="text-slate-500 text-xs">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
