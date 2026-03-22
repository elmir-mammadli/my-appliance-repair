'use client';

import { useRef, useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { HonourStarIcon, StarCircleIcon, LeafyGreenIcon, LicenseIcon } from '@hugeicons/core-free-icons';

const reasons = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Licensed & Insured',
    description: 'Fully licensed in Connecticut with comprehensive insurance. Your home and appliances are always protected.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Same-Day Service',
    description: 'Call before noon and we\'ll often be there the same day. Evening and weekend appointments available.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: '90-Day Warranty',
    description: 'Every repair comes with a 90-day parts and labor warranty. We stand behind our work, guaranteed.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Certified Technicians',
    description: 'Our technicians are factory-trained and certified on all major appliance brands. 10+ years average experience.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Upfront Pricing',
    description: 'No hidden fees. You get a full written estimate before any work begins. Free diagnostic with repair.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: 'All Parts In Stock',
    description: 'Our vans are stocked with thousands of OEM parts. Most repairs completed in a single visit — no waiting.',
  },
];

function ReasonCard({ reason, index }: { reason: typeof reasons[0]; index: number }) {
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
      className={`flex gap-5 transition-all duration-500 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex-shrink-0 w-14 h-14 bg-blue-700 rounded-xl flex items-center justify-center text-white shadow-md">
        {reason.icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-blue-900 mb-1">{reason.title}</h3>
        <p className="text-slate-600 leading-relaxed">{reason.description}</p>
      </div>
    </div>
  );
}

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-white" aria-labelledby="why-us-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <div>
            <span className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">Why Choose Us</span>
            <h2 id="why-us-heading" className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6">
              Connecticut&apos;s Most Trusted Appliance Repair Service
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              We&apos;ve been repairing appliances for Connecticut homeowners since 2008. Our commitment to quality, transparency, and fast service has made us the #1 rated appliance repair company in the state.
            </p>
            <div className="space-y-7">
              {reasons.map((reason, index) => (
                <ReasonCard key={reason.title} reason={reason} index={index} />
              ))}
            </div>
          </div>

          {/* Right: Credential Cards */}
          <div className="space-y-5">
            {/* Rating Card */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1" aria-label="5 out of 5 stars">
                  {[1,2,3,4,5].map((i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-bold text-2xl">4.9/5</span>
              </div>
              <p className="text-blue-100 text-lg font-medium">Over 2,400 verified reviews across Google, Yelp & HomeAdvisor</p>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'BBB Accredited', subtitle: 'A+ Rating since 2010', icon: HonourStarIcon },
                { title: 'HomeAdvisor', subtitle: 'Top Rated Pro 2024', icon: StarCircleIcon },
                { title: 'EPA Certified', subtitle: 'Refrigerant Handling', icon: LeafyGreenIcon },
                { title: 'CT Licensed', subtitle: '#HIC.0642318', icon: LicenseIcon },
              ].map((badge) => (
                <div
                  key={badge.title}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-default"
                >
                  <div className="flex justify-center mb-2" aria-hidden="true"><HugeiconsIcon icon={badge.icon} size={24} className="text-blue-700" /></div>
                  <div className="font-bold text-blue-900 text-sm">{badge.title}</div>
                  <div className="text-blue-500 text-xs mt-0.5">{badge.subtitle}</div>
                </div>
              ))}
            </div>

            {/* Process Steps */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-4 text-lg">How It Works</h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Call or Book Online', desc: 'Tell us about your appliance issue' },
                  { step: '2', title: 'Technician Arrives', desc: 'Same or next day at your convenience' },
                  { step: '3', title: 'Diagnosis & Quote', desc: 'Free written estimate before we start' },
                  { step: '4', title: 'Repair & Warranty', desc: '90-day guarantee on all repairs' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-semibold text-blue-900">{item.title}</div>
                      <div className="text-sm text-slate-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
