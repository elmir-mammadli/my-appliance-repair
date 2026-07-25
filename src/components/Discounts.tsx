'use client';

import { useRef, useEffect, useState } from'react';
import { openBookingModal } from'@/lib/booking';

const discounts = [
 {
 group:'Military & Veterans',
 badge:'$30 OFF',
 description:'Active duty, reservists, National Guard, veterans, and surviving spouses of U.S. service members.',
 eligibility:'Present military ID, VA card, or DD-214 at time of service.',
 icon: (
 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
 </svg>
),
 accentColor:'bg-yellow-400 text-blue-900',
 },
 {
 group:'First Responders',
 badge:'$30 OFF',
 description:'Full-time police officers, firefighters, EMTs, paramedics, and 911 emergency dispatchers.',
 eligibility:'Present department-issued badge or photo ID at time of service.',
 icon: (
 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 0v4m0-4h4m-4 0H8" />
 </svg>
),
 accentColor:'bg-orange-400 text-white',
 },
 {
 group:'Seniors (65+)',
 badge:'$30 OFF',
 description:'Connecticut residents aged 65 and older. Fixed income or not — every senior deserves a break.',
 eligibility:'Present any government-issued ID confirming date of birth.',
 icon: (
 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
 </svg>
),
 accentColor:'bg-blue-400 text-white',
 },
 {
 group:'Teachers & Educators',
 badge:'$30 OFF',
 description:'K–12 teachers, college faculty, school administrators, and licensed childcare workers.',
 eligibility:'Present a valid school-issued employee ID at time of service.',
 icon: (
 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
 </svg>
),
 accentColor:'bg-green-400 text-white',
 },
];

function DiscountCard({ item, index }: { item: typeof discounts[0]; index: number }) {
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
 className={`relative bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/35 p-6 flex flex-col gap-4 transition-all duration-500 group ${
 visible ?'opacity-100 translate-y-0' :'opacity-0 translate-y-6'
 }`}
 style={{ transitionDelay:`${index * 100}ms` }}
 >
 {/* Badge */}
 <div className="flex items-start justify-between gap-3">
 <div className="w-14 h-14 bg-white/15 flex items-center justify-center text-white flex-shrink-0">
 {item.icon}
 </div>
 <span className={`${item.accentColor} text-sm font-extrabold px-3 py-1.5 tracking-wide flex-shrink-0`}>
 {item.badge}
 </span>
 </div>

 {/* Text */}
 <div className="flex-1">
 <h3 className="text-white font-bold text-lg mb-2">{item.group}</h3>
 <p className="text-blue-200 text-sm leading-relaxed mb-3">{item.description}</p>
 <div className="flex items-start gap-2">
 <svg className="w-4 h-4 text-blue-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
 </svg>
 <p className="text-blue-300 text-xs leading-relaxed">{item.eligibility}</p>
 </div>
 </div>
 </div>
);
}

export default function Discounts() {
 const [headingVisible, setHeadingVisible] = useState(false);
 const headingRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 const observer = new IntersectionObserver(
 ([entry]) => { if (entry.isIntersecting) setHeadingVisible(true); },
 { threshold: 0.1 }
);
 if (headingRef.current) observer.observe(headingRef.current);
 return () => observer.disconnect();
 }, []);

 return (
 <section
 id="discounts"
 className="py-20 lg:py-28 bg-blue-900"
 aria-labelledby="discounts-heading"
 >
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 {/* Header */}
 <div
 ref={headingRef}
 className={`text-center mb-14 transition-all duration-700 ${
 headingVisible ?'opacity-100 translate-y-0' :'opacity-0 translate-y-4'
 }`}
 >
 <span className="inline-block text-yellow-400 font-semibold text-sm tracking-widest uppercase mb-3">
 Community Discounts
 </span>
 <h2 id="discounts-heading" className="text-3xl sm:text-4xl font-bold text-white mb-5">
 We Honor Those Who Serve Our Community
 </h2>
 <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
 MyAppliance Repair LLC is proud to offer special pricing for the people who keep our communities safe, educated, and protected. Discounts apply to labor on all repair services.
 </p>
 </div>

 {/* Discount Cards */}
 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
 {discounts.map((item, index) => (
 <DiscountCard key={item.group} item={item} index={index} />
))}
 </div>

 {/* Bottom Banner */}
 <div className="bg-white/10 border border-white/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
 <div className="text-center sm:text-left">
 <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
 <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
 <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
 </svg>
 <span className="text-white font-bold text-lg">Returning Customer Loyalty Bonus</span>
 </div>
 <p className="text-blue-200 text-sm leading-relaxed max-w-xl">
 Had us out before? Get <span className="text-white font-semibold">$30 off</span> your next repair — no ID required. Just mention you&apos;re a returning customer when you book.
 </p>
 </div>
 <button
 onClick={() => openBookingModal()}
 className="flex-shrink-0 inline-flex items-center justify-center gap-2 font-bold px-7 py-3.5 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-blue-900"
 style={{ backgroundColor:'#ffb81c' }}
 aria-label="Book a repair and claim your discount"
 >
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
 </svg>
 Book & Claim Discount
 </button>
 </div>

 {/* Fine print */}
 <p className="text-center text-blue-400 text-xs mt-6 leading-relaxed">
 Discounts apply to labor charges only and cannot be combined with other offers or promotions. One discount per service call. Verification required at time of service.
 </p>
 </div>
 </section>
);
}
