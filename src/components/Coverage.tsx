'use client';

import { useEffect, useRef, useState } from'react';
import dynamic from'next/dynamic';
import Link from'next/link';
import { cities } from'@/lib/cities';

const ServiceAreaMap = dynamic(() => import('./ServiceAreaMapInner'), {
 ssr: false,
 loading: () => (
 <div className="w-full h-[400px] bg-blue-800/30 flex items-center justify-center text-blue-300 text-sm">
 Loading map…
 </div>
),
});

export default function Coverage() {
 const [showMap, setShowMap] = useState(false);
 const mapRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 if (showMap || !mapRef.current) return;
 const observer = new IntersectionObserver(
 ([entry]) => {
 if (entry.isIntersecting) {
 setShowMap(true);
 observer.disconnect();
 }
 },
 { rootMargin:'200px 0px' }
);
 observer.observe(mapRef.current);
 return () => observer.disconnect();
 }, [showMap]);

 return (
 <section id="coverage" className="py-20 lg:py-28 bg-gradient-to-br from-blue-900 to-blue-800" aria-labelledby="coverage-heading">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-14">
 <span className="inline-block text-blue-300 font-semibold text-sm tracking-widest uppercase mb-3">Service Area</span>
 <h2 id="coverage-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
 Serving Greater New Haven, CT
 </h2>
 <p className="text-lg text-blue-200 max-w-2xl mx-auto">
 We serve New Haven and the surrounding communities across New Haven County — same-day service, local technicians, no travel fees.
 </p>
 </div>

 <div className="grid lg:grid-cols-2 gap-10 items-start">
 {/* Map */}
 <div className="bg-blue-800/50 border border-blue-600/30 p-8 backdrop-blur-sm">
 <div ref={mapRef} className="w-full overflow-hidden" style={{ height:'400px' }}>
 {showMap ? (
 <ServiceAreaMap />
) : (
 <div className="flex h-full flex-col items-center justify-center gap-3 bg-blue-800/30 px-6 text-center text-blue-200">
 <div className="flex h-14 w-14 items-center justify-center bg-blue-700/70 text-white">
 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
 <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
 </svg>
 </div>
 <p className="text-lg font-semibold text-white">Interactive service area map</p>
 <p className="max-w-sm text-sm leading-relaxed text-blue-200">
 The map loads as you reach this section so the homepage stays lighter and faster up top.
 </p>
 </div>
)}
 </div>
 <div className="grid grid-cols-3 gap-4 mt-6">
 {[
 { value:'17', label:'Cities Served' },
 { value:'30 min', label:'Avg. Response' },
 { value:'Same-Day', label:'Availability' },
 ].map((stat) => (
 <div key={stat.label} className="text-center bg-blue-700/40 py-3 px-2 border border-blue-500/30">
 <div className="text-xl font-bold text-orange-400">{stat.value}</div>
 <div className="text-blue-300 text-xs mt-0.5">{stat.label}</div>
 </div>
))}
 </div>
 </div>

 {/* City list */}
 <div className="space-y-6">
 <div className="bg-blue-800/50 border border-blue-600/30 p-6 backdrop-blur-sm">
 <h3 className="text-white font-bold text-xl mb-5 flex items-center gap-2">
 <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
 <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
 </svg>
 Greater New Haven Area
 </h3>
 <div className="grid grid-cols-2 gap-2">
 {cities.map((city) => (
 <Link
 key={city.slug}
 href={`/${city.slug}`}
 className="flex items-center gap-2 px-2 py-1.5 text-sm text-blue-200 transition-colors duration-200 hover:bg-blue-700/30 hover:text-white"
 >
 <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
 </svg>
 {city.name}
 </Link>
))}
 </div>
 </div>

 <div className="bg-orange-500/20 border border-orange-400/30 p-5">
 <p className="text-orange-300 font-semibold mb-1">Don&apos;t see your city?</p>
 <p className="text-blue-200 text-sm">Give us a call — we may be able to accommodate nearby towns depending on technician availability.</p>
 <a
 href="tel:+19592616736"
 className="inline-flex items-center gap-2 mt-3 bg-[#ffb81c] hover:bg-[#ffca4d] text-gray-900 font-bold px-5 py-2.5 transition-all duration-200 cursor-pointer text-sm"
 >
 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
 </svg>
 Call (959) 261-6736
 </a>
 </div>
 </div>
 </div>
 </div>
 </section>
);
}
