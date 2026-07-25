'use client';

import { useState, useRef, useEffect } from'react';
import Link from'next/link';
import { openBookingModal } from'@/lib/booking';
import type { Service } from'@/lib/services';

type TabType ='symptoms' |'parts';

interface ServiceCardProps {
 service: Service;
 index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
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
 className={`bg-white border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden ${
 visible ?'opacity-100 translate-y-0' :'opacity-0 translate-y-6'
 }`}
 style={{ transitionDelay:`${index * 70}ms` }}
 >
 {/* Header */}
 <div className="p-6 pb-4 border-b border-blue-50">
 <Link href={`/services/${service.slug}`} className="flex items-start gap-4 group cursor-pointer">
 <div className="w-12 h-12 bg-blue-700 group-hover:bg-blue-800 flex items-center justify-center text-white flex-shrink-0 shadow-sm transition-colors duration-200">
 {service.icon}
 </div>
 <div className="min-w-0">
 <h3 className="font-bold text-blue-900 text-lg leading-tight group-hover:text-blue-700 transition-colors duration-200">{service.title}</h3>
 <p className="text-blue-500 text-xs font-medium mt-0.5">{service.subtitle}</p>
 </div>
 </Link>
 <p className="text-slate-500 text-sm leading-relaxed mt-3">{service.description}</p>
 </div>

 {/* Tabs */}
 <div className="flex border-b border-blue-50">
 <button
 onClick={() => setActiveTab('symptoms')}
 className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors duration-150 cursor-pointer ${
 activeTab ==='symptoms' ?'text-blue-700 bg-blue-50 border-b-2 border-blue-600' :'text-slate-400 hover:text-blue-500'
 }`}
 aria-pressed={activeTab ==='symptoms'}
 >
 Symptoms
 </button>
 <button
 onClick={() => setActiveTab('parts')}
 className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors duration-150 cursor-pointer ${
 activeTab ==='parts' ?'text-blue-700 bg-blue-50 border-b-2 border-blue-600' :'text-slate-400 hover:text-blue-500'
 }`}
 aria-pressed={activeTab ==='parts'}
 >
 Parts on the truck
 </button>
 </div>

 {/* Tab Content */}
 <div className="p-5 flex-1">
 {activeTab ==='symptoms' && (
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

 {activeTab ==='parts' && (
 <div>
 <p className="text-xs text-slate-400 mb-3">Commonly stocked:</p>
 <div className="flex flex-wrap gap-1.5" aria-label={`Common parts replaced for ${service.title}`}>
 {service.parts.map((part) => (
 <span key={part} className="text-xs bg-blue-50 border border-blue-100 text-blue-700 px-2.5 py-1 font-medium">
 {part}
 </span>
))}
 </div>
 </div>
)}
 </div>

 {/* Brand Row */}
 <div className="px-5 pb-4 pt-2 border-t border-blue-50">
 <p className="text-xs text-slate-400 font-medium mb-2">Brands we work on:</p>
 <div className="flex flex-wrap gap-1.5">
 {service.brands.map((brand) => (
 <span key={brand} className="text-xs bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 font-medium">
 {brand}
 </span>
))}
 </div>
 </div>

 {/* CTAs */}
 <div className="px-5 pb-5 space-y-2">
 <Link
 href={`/services/${service.slug}`}
 className="block w-full text-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 transition-all duration-200 cursor-pointer text-sm"
 >
 See {service.shortName} Repair Details
 </Link>
 <button
 onClick={() => openBookingModal({ appliance: service.applianceValue })}
 className="block w-full text-center border-2 border-blue-200 hover:border-blue-400 text-blue-900 font-bold py-2.5 transition-all duration-200 cursor-pointer text-sm"
 >
 Book This Repair
 </button>
 </div>
 </div>
);
}
