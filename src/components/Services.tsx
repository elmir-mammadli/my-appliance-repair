import Link from 'next/link';
import { services } from '@/lib/services';
import ServiceCard from '@/components/ServiceCard';
import { HugeiconsIcon } from '@hugeicons/react';
import { ToolsIcon, ShieldPlusIcon, FlashIcon } from '@hugeicons/core-free-icons';

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-blue-50" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">What we fix</span>
          <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
            Appliance repair across Connecticut
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Pick an appliance to see the symptoms we hear most weeks and the parts we keep on the truck. Same-day service when slots are open.
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
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border-2 border-blue-900 hover:bg-blue-900 hover:text-white text-blue-900 font-bold px-8 py-3.5 rounded-xl transition-all duration-200 cursor-pointer"
          >
            View All Services
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-4 text-center">
          {[
            { icon: ToolsIcon, label: 'OEM parts only', sub: 'Original manufacturer parts on every repair' },
            { icon: ShieldPlusIcon, label: '90-day warranty', sub: 'Parts and labor guaranteed for 90 days' },
            { icon: FlashIcon, label: 'One trip when we can', sub: 'Parts stocked to finish most jobs the same day' },
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
