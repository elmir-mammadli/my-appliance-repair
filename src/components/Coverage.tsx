'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const ServiceAreaMap = dynamic(() => import('./ServiceAreaMapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-blue-800/30 rounded-2xl flex items-center justify-center text-blue-300 text-sm">
      Loading map…
    </div>
  ),
});

const regions = [
  {
    name: 'Greater Hartford',
    cities: ['Hartford', 'West Hartford', 'Newington', 'Wethersfield', 'Rocky Hill', 'Glastonbury', 'Manchester', 'East Hartford', 'Bloomfield', 'Enfield'],
  },
  {
    name: 'Greater New Haven',
    cities: ['New Haven', 'Hamden', 'West Haven', 'Milford', 'Branford', 'East Haven', 'Orange', 'Woodbridge', 'Guilford', 'Madison'],
  },
  {
    name: 'Fairfield County',
    cities: ['Bridgeport', 'Stamford', 'Norwalk', 'Danbury', 'Fairfield', 'Greenwich', 'Trumbull', 'Westport', 'Darien', 'New Canaan'],
  },
  {
    name: 'Shoreline & Eastern CT',
    cities: ['New London', 'Groton', 'Mystic', 'Norwich', 'Waterford', 'Stonington', 'Old Saybrook', 'Essex', 'Clinton', 'Westbrook'],
  },
  {
    name: 'Waterbury & Central',
    cities: ['Waterbury', 'Meriden', 'Wallingford', 'Naugatuck', 'Shelton', 'Derby', 'Ansonia', 'Seymour', 'Torrington', 'Winsted'],
  },
  {
    name: 'Northeastern CT',
    cities: ['Willimantic', 'Putnam', 'Danielson', 'Stafford Springs', 'Plainfield', 'Killingly', 'Thompson', 'Windham', 'Coventry', 'Mansfield'],
  },
];

export default function Coverage() {
  const [activeRegion, setActiveRegion] = useState(0);

  return (
    <section id="coverage" className="py-20 lg:py-28 bg-gradient-to-br from-blue-900 to-blue-800" aria-labelledby="coverage-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-blue-300 font-semibold text-sm tracking-widest uppercase mb-3">Service Area</span>
          <h2 id="coverage-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Serving All of Connecticut
          </h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            From Stamford to Putnam, Mystic to Torrington — we cover all 169 Connecticut towns with fast, local technicians ready to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* CT Map Illustration */}
          <div className="relative">
            <div className="bg-blue-800/50 border border-blue-600/30 rounded-2xl p-8 backdrop-blur-sm">
              {/* Interactive Leaflet county map */}
              <div className="w-full rounded-xl overflow-hidden" style={{ height: '400px' }}>
                <ServiceAreaMap />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { value: '169', label: 'Towns' },
                  { value: '30 min', label: 'Avg. Response' },
                  { value: '24/7', label: 'Availability' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center bg-blue-700/40 rounded-xl py-3 px-2 border border-blue-500/30">
                    <div className="text-xl font-bold text-orange-400">{stat.value}</div>
                    <div className="text-blue-300 text-xs mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Region Tabs */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Connecticut regions">
              {regions.map((region, index) => (
                <button
                  key={region.name}
                  onClick={() => setActiveRegion(index)}
                  role="tab"
                  aria-selected={activeRegion === index}
                  aria-controls={`region-${index}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeRegion === index
                      ? 'bg-[#ffb81c] text-gray-900 shadow-md'
                      : 'bg-blue-700/50 text-blue-200 hover:bg-blue-600/50'
                  }`}
                >
                  {region.name}
                </button>
              ))}
            </div>

            {regions.map((region, index) => (
              <div
                key={region.name}
                id={`region-${index}`}
                role="tabpanel"
                aria-labelledby={`tab-${index}`}
                className={`transition-all duration-300 ${
                  activeRegion === index ? 'block opacity-100' : 'hidden opacity-0'
                }`}
              >
                <div className="bg-blue-800/50 border border-blue-600/30 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {region.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {region.cities.map((city) => (
                      <div key={city} className="flex items-center gap-2 text-blue-200 text-sm">
                        <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {city}
                      </div>
                    ))}
                  </div>
                  <p className="text-blue-400 text-xs mt-4">+ surrounding areas and all other towns in this region</p>
                </div>
              </div>
            ))}

            <div className="bg-orange-500/20 border border-orange-400/30 rounded-xl p-5 mt-4">
              <p className="text-orange-300 font-semibold mb-1">Don&apos;t see your town?</p>
              <p className="text-blue-200 text-sm">We cover <strong className="text-white">all 169 Connecticut municipalities</strong>. Call us to confirm availability in your area.</p>
              <a
                href="tel:+19173783014"
                className="inline-flex items-center gap-2 mt-3 bg-[#ffb81c] hover:bg-[#ffca4d] text-gray-900 font-bold px-5 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (917) 378-3014
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
