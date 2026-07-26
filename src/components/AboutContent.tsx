'use client';

import { useEffect, useRef, useState } from'react';
import type { ReactNode } from'react';
import Link from'next/link';
import Navbar from'@/components/Navbar';
import Footer from'@/components/Footer';
import BookingModal from'@/components/BookingModal';
import { openBookingModal } from'@/lib/booking';

function useFadeIn(threshold = 0.1) {
 const ref = useRef<HTMLDivElement>(null);
 const [visible, setVisible] = useState(false);
 useEffect(() => {
 const el = ref.current;
 if (!el) return;
 const obs = new IntersectionObserver(
 ([entry]) => {
 if (entry.isIntersecting) {
 setVisible(true);
 obs.disconnect();
 }
 },
 { threshold }
);
 obs.observe(el);
 return () => obs.disconnect();
 }, [threshold]);
 return { ref, visible };
}

interface ValueCard {
 icon: ReactNode;
 title: string;
 description: string;
}

interface Credential {
 icon: ReactNode;
 label: string;
 sub: string;
}

const WHY_VALUES: ValueCard[] = [
 {
 icon: (
 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
 </svg>
),
 title:'Licensed & Insured in Connecticut',
 description:
'All technicians carry valid CT state licenses and full liability insurance. You get qualified, accountable service — every single visit, without exception.',
 },
 {
 icon: (
 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
 </svg>
),
 title:'90-Day Parts & Labor Warranty',
 description:
"If the same problem comes back within 90 days, we'll fix it free. No questions asked, no hassle — we stand behind every repair we make.",
 },
 {
 icon: (
 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
),
 title:'Same-Day & Next-Day Appointments',
 description:
"A broken appliance can't wait. We offer same-day and next-day slots across Connecticut so your home gets back to normal fast.",
 },
 {
 icon: (
 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
),
 title:'Transparent Pricing — No Surprises',
 description:
"You'll know the full cost before we touch anything. Our diagnostic fee is waived when you proceed with the repair. Zero hidden charges, ever.",
 },
];

const STATS = [
 { value:'6+', label:'Years Experience' },
 { value:'100+', label:'Repairs This Month' },
 { value:'5.0★', label:'Average Rating' },
 { value:'20', label:'Brands Serviced' },
 { value:'All of CT', label:'Coverage Area' },
];

const CREDENTIALS: Credential[] = [
 {
 icon: (
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
 </svg>
),
 label:'CT State Licensed Technician',
 sub:'License #HIC.0642318',
 },
 {
 icon: (
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
 </svg>
),
 label:'BBB Accredited Business',
 sub:'A+ Rating',
 },
 {
 icon: (
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
),
 label:'EPA 608 Certified',
 sub:'Refrigerant Handling',
 },
 {
 icon: (
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
 </svg>
),
 label:'HomeAdvisor / Angi Verified',
 sub:'Background Checked',
 },
];

const CT_CITIES = [
'Hartford','New Haven','Bridgeport','Stamford','Waterbury',
'Norwalk','Danbury','New Britain','Greenwich','West Hartford',
];

const STORY_FACTS = [
 {
 icon: (
 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
 </svg>
),
 label:'Headquarters',
 value:'Connecticut, USA',
 },
 {
 icon: (
 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
 </svg>
),
 label:'Ownership',
 value:'Locally Owned & Operated',
 },
 {
 icon: (
 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
 </svg>
),
 label:'Technicians',
 value:'Licensed & Background-Checked',
 },
 {
 icon: (
 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
 </svg>
),
 label:'Coverage',
 value:'All 169 CT Towns',
 },
 {
 icon: (
 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
 </svg>
),
 label:'Brands Serviced',
 value:'39+ Major Brands',
 },
];

export default function AboutContent() {
 const storySection = useFadeIn();
 const valuesSection = useFadeIn();
 const statsSection = useFadeIn();
 const credsSection = useFadeIn();
 const areaSection = useFadeIn();
 const ctaSection = useFadeIn();

 return (
 <main>
 <Navbar />

 {/* ── Hero ── */}
 <section className="bg-blue-950 relative overflow-hidden">
 <div
 className="absolute inset-0 opacity-10"
 style={{
 backgroundImage:
'radial-gradient(circle at 20% 50%, #ffffff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #ffffff 1px, transparent 1px)',
 backgroundSize:'60px 60px',
 }}
 aria-hidden="true"
 />
 <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24">
 {/* Breadcrumb */}
 <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-blue-400 mb-6">
 <Link href="/" className="hover:text-white transition-colors duration-200">
 Home
 </Link>
 <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
 </svg>
 <span className="text-blue-200">About</span>
 </nav>
 <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#ffb81c] mb-4">
 Our Story
 </span>
 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
 About MyAppliance Repair LLC
 </h1>
 <p className="text-blue-300 text-lg sm:text-xl max-w-2xl leading-relaxed">
 Connecticut&apos;s trusted appliance repair team &mdash; licensed, local, and here when you need us
 </p>
 </div>
 </section>

 {/* ── Our Story ── */}
 <section className="bg-white py-20 lg:py-28">
 <div
 ref={storySection.ref}
 className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-700 ${
 storySection.visible ?'opacity-100 translate-y-0' :'opacity-0 translate-y-8'
 }`}
 >
 {/* Text */}
 <div>
 <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">
 How It All Started
 </span>
 <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 leading-tight mb-6">
 Built by a Connecticut technician, for Connecticut homeowners
 </h2>
 <div className="space-y-4 text-slate-600 leading-relaxed">
 <p>
 MyAppliance Repair LLC was founded by a Connecticut-born technician with over a decade of experience
 working for a major national appliance chain. After years of watching customers get hit with
 surprise fees, week-long wait times, and technicians who&apos;d never return a call &mdash; he
 knew there had to be a better way.
 </p>
 <p>
 He launched MyAppliance Repair LLC with one simple promise: show up when we say we will,
 fix it right the first time, and charge a fair price. No bait-and-switch diagnostics. No pressure
 to replace an appliance that can still be saved. Just honest, skilled work backed by a real
 warranty.
 </p>
 <p>
 Today, we serve homeowners and families across all of Connecticut &mdash; from Stamford to
 Storrs, Greenwich to Groton. Our licensed, background-checked technicians carry OEM parts in
 every van so most repairs are completed in a single visit. We&apos;re still the same local
 business we&apos;ve always been &mdash; just bigger, and better at what we do.
 </p>
 </div>
 </div>

 {/* Visual Card */}
 <div className="relative">
 <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-8 text-white shadow-xl">
 <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
 <div className="w-12 h-12 bg-white/10 flex items-center justify-center flex-shrink-0">
 <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
 </svg>
 </div>
 <div>
 <p className="font-bold text-lg leading-tight">MyAppliance Repair LLC</p>
 <p className="text-blue-200 text-sm">Connecticut&apos;s trusted repair experts</p>
 </div>
 </div>
 <ul className="space-y-0 divide-y divide-white/10">
 {STORY_FACTS.map((fact) => (
 <li key={fact.label} className="flex items-center justify-between py-3.5">
 <div className="flex items-center gap-2 text-blue-200 text-sm">
 {fact.icon}
 {fact.label}
 </div>
 <span className="font-semibold text-white text-sm text-right max-w-[160px]">
 {fact.value}
 </span>
 </li>
))}
 </ul>
 </div>
 <div className="absolute -top-5 -right-5 w-28 h-28 bg-[#ffb81c]/15 blur-2xl pointer-events-none" aria-hidden="true" />
 <div className="absolute -bottom-5 -left-5 w-36 h-36 bg-blue-300/20 blur-2xl pointer-events-none" aria-hidden="true" />
 </div>
 </div>
 </section>

 {/* ── Why Choose Us ── */}
 <section className="bg-blue-50 py-20 lg:py-28">
 <div
 ref={valuesSection.ref}
 className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
 valuesSection.visible ?'opacity-100 translate-y-0' :'opacity-0 translate-y-8'
 }`}
 >
 <div className="text-center mb-14">
 <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">
 Our Commitment
 </span>
 <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
 Why Connecticut homeowners choose us
 </h2>
 </div>
 <div className="grid sm:grid-cols-2 gap-6">
 {WHY_VALUES.map((v, i) => (
 <div
 key={v.title}
 className={`bg-white p-7 shadow-sm border border-blue-100 flex gap-5 transition-all duration-500 ${
 valuesSection.visible ?'opacity-100 translate-y-0' :'opacity-0 translate-y-6'
 }`}
 style={{ transitionDelay:`${i * 100 + 100}ms` }}
 >
 <div className="w-12 h-12 bg-blue-700 flex items-center justify-center flex-shrink-0 text-white">
 {v.icon}
 </div>
 <div>
 <h3 className="font-bold text-blue-900 text-base mb-2">{v.title}</h3>
 <p className="text-slate-600 text-sm leading-relaxed">{v.description}</p>
 </div>
 </div>
))}
 </div>
 </div>
 </section>

 {/* ── Stats Bar ── */}
 <section className="bg-blue-950 py-14">
 <div
 ref={statsSection.ref}
 className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-0 lg:divide-x lg:divide-blue-800 transition-all duration-700 ${
 statsSection.visible ?'opacity-100 translate-y-0' :'opacity-0 translate-y-8'
 }`}
 >
 {STATS.map((stat, i) => (
 <div
 key={stat.label}
 className={`text-center lg:px-6 transition-all duration-500 ${
 statsSection.visible ?'opacity-100 translate-y-0' :'opacity-0 translate-y-4'
 }`}
 style={{ transitionDelay:`${i * 80}ms` }}
 >
 <p className="text-3xl sm:text-4xl font-extrabold text-[#ffb81c] mb-1">{stat.value}</p>
 <p className="text-blue-300 text-sm font-medium">{stat.label}</p>
 </div>
))}
 </div>
 </section>

 {/* ── Credentials ── */}
 <section className="bg-white py-20 lg:py-28">
 <div
 ref={credsSection.ref}
 className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
 credsSection.visible ?'opacity-100 translate-y-0' :'opacity-0 translate-y-8'
 }`}
 >
 <div className="text-center mb-12">
 <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">
 Certifications &amp; Accreditations
 </span>
 <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
 Credentials you can trust
 </h2>
 <p className="text-slate-600 mt-4 max-w-xl mx-auto leading-relaxed">
 We&apos;re not just skilled at what we do — we hold the certifications to prove it. Every credential
 represents a real commitment to quality, safety, and accountability.
 </p>
 </div>
 <div className="flex flex-wrap justify-center gap-4">
 {CREDENTIALS.map((cred, i) => (
 <div
 key={cred.label}
 className={`flex items-center gap-3 bg-blue-50 border border-blue-200 px-5 py-4 transition-all duration-500 ${
 credsSection.visible ?'opacity-100 translate-y-0' :'opacity-0 translate-y-4'
 }`}
 style={{ transitionDelay:`${i * 100}ms` }}
 >
 <div className="w-10 h-10 bg-blue-700 flex items-center justify-center text-white flex-shrink-0">
 {cred.icon}
 </div>
 <div>
 <p className="font-bold text-blue-900 text-sm leading-tight">{cred.label}</p>
 <p className="text-blue-600 text-xs mt-0.5">{cred.sub}</p>
 </div>
 </div>
))}
 </div>
 </div>
 </section>

 {/* ── Service Area ── */}
 <section className="bg-blue-50 py-20 lg:py-28">
 <div
 ref={areaSection.ref}
 className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${
 areaSection.visible ?'opacity-100 translate-y-0' :'opacity-0 translate-y-8'
 }`}
 >
 <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">
 We Come to You
 </span>
 <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-6">
 Serving all of Connecticut
 </h2>
 <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
 Whether you&apos;re in Hartford, New Haven, Bridgeport, Stamford, Waterbury, Norwalk, or anywhere in
 between &mdash; we&apos;re likely already in your area today. MyAppliance Repair LLC covers all 169
 Connecticut towns and cities, with same-day availability across most of the state.
 </p>
 <div className="flex flex-wrap justify-center gap-3 mb-10">
 {CT_CITIES.map((city) => (
 <span
 key={city}
 className="inline-flex items-center gap-1.5 bg-white border border-blue-200 text-blue-800 text-sm font-medium px-4 py-2"
 >
 <svg className="w-3.5 h-3.5 text-[#ffb81c]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
 <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
 </svg>
 {city}
 </span>
))}
 </div>
 <Link
 href="/#coverage"
 className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-900 transition-colors duration-200 underline underline-offset-4"
 >
 View our full coverage map
 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
 </svg>
 </Link>
 </div>
 </section>

 {/* ── CTA ── */}
 <section className="bg-blue-950 py-20">
 <div
 ref={ctaSection.ref}
 className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${
 ctaSection.visible ?'opacity-100 translate-y-0' :'opacity-0 translate-y-8'
 }`}
 >
 <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#ffb81c] mb-4">
 Ready to Get Started?
 </span>
 <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5">
 Book your repair today
 </h2>
 <p className="text-blue-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
 Same-day and next-day appointments available across Connecticut. Fast, honest, warrantied repairs
 &mdash; guaranteed.
 </p>
 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
 <button
 onClick={() => openBookingModal()}
 className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] text-gray-900 font-bold px-8 py-4 transition-colors duration-200 cursor-pointer shadow-lg text-base"
 >
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
 </svg>
 Book a Service
 </button>
 <a
 href="mailto:service@myappliance.us"
 className="w-full sm:w-auto flex items-center justify-center gap-2 border border-blue-600 text-blue-200 hover:bg-blue-800 hover:text-white font-semibold px-8 py-4 transition-colors duration-200 cursor-pointer text-base"
 >
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
 </svg>
 service@myappliance.us
 </a>
 </div>
 <p className="text-blue-500 text-sm mt-8">
 Have a question?{''}
 <a href="mailto:service@myappliance.us" className="text-blue-300 hover:text-white transition-colors duration-200 underline underline-offset-2">
 Contact us at service@myappliance.us
 </a>
 </p>
 </div>
 </section>

 <Footer />
 <BookingModal />
 </main>
);
}
