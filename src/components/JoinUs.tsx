'use client';

import { openHiringModal } from'@/lib/hiring';

const perks = [
 {
 icon: (
 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
),
 title:'Competitive Pay',
 description:'Earn top-of-market wages with performance bonuses. We reward great work.',
 },
 {
 icon: (
 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
 </svg>
),
 title:'Flexible Schedule',
 description:'Full-time or part-time — we work around your life, not the other way around.',
 },
 {
 icon: (
 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
 </svg>
),
 title:'Steady Work Year-Round',
 description:'Appliances break in every season. Enjoy consistent work with no dry spells.',
 },
 {
 icon: (
 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
 </svg>
),
 title:'Locally Owned & Respected',
 description:"Join a tight-knit team that's trusted by thousands of CT homeowners. Your name matters here.",
 },
];

export default function JoinUs() {
 return (
 <section id="join-us" className="py-20 lg:py-28 bg-blue-950">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

 {/* Header */}
 <div className="text-center max-w-2xl mx-auto mb-14">
 <p className="text-xs font-bold uppercase tracking-widest text-[#ffb81c] mb-3">
 We&apos;re Hiring
 </p>
 <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
 Join Our Team
 </h2>
 <p className="text-blue-200 text-lg leading-relaxed">
 MyAppliance Repair LLC is a locally owned company built on real craftsmanship and real relationships.
 We&apos;re looking for skilled technicians who take pride in their work and want to grow with us.
 </p>
 </div>

 {/* Perks grid */}
 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
 {perks.map((perk) => (
 <div
 key={perk.title}
 className="bg-blue-900/50 border border-blue-800 p-6 hover:bg-blue-900/80 hover:border-blue-700 transition-all duration-300"
 >
 <div className="w-12 h-12 bg-[#ffb81c]/10 flex items-center justify-center text-[#ffb81c] mb-4">
 {perk.icon}
 </div>
 <h3 className="font-bold text-white text-lg mb-2">{perk.title}</h3>
 <p className="text-blue-300 text-sm leading-relaxed">{perk.description}</p>
 </div>
))}
 </div>

 {/* CTA */}
 <div className="text-center">
 <button
 onClick={openHiringModal}
 className="inline-flex items-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] text-gray-900 font-bold px-8 py-4 transition-colors duration-200 cursor-pointer shadow-lg text-lg"
 >
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
 </svg>
 Apply Now
 </button>
 <p className="text-blue-400 text-sm mt-4">
 We review every application personally and respond within 2 business days.
 </p>
 </div>

 </div>
 </section>
);
}
