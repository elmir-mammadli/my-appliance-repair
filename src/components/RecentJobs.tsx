'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

const jobs = [
  {
    id: 1,
    src: '/images/gallery/1.jpg',
    alt: 'OEM appliance main control board replacement in Connecticut — new PCB unpacked from anti-static packaging next to old failed board before installation',
    appliance: 'Control Board Replacement',
    caption: 'OEM control board — old vs new PCB swap',
    city: 'Connecticut',
    date: 'Jul 2026',
  },
  {
    id: 2,
    src: '/images/gallery/2.jpg',
    alt: 'Built-in dishwasher pulled from kitchen cabinet for repair in Connecticut — control panel open with diagnostic indicator light active',
    appliance: 'Dishwasher Repair',
    caption: 'Built-in dishwasher — control board diagnostic',
    city: 'Connecticut',
    date: 'Jul 2026',
  },
  {
    id: 3,
    src: '/images/gallery/3.jpg',
    alt: 'Viking Professional 48-inch commercial gas range with double oven serviced by Connecticut appliance repair technician — burner and ignition inspection',
    appliance: 'Range Repair',
    caption: 'Viking Professional 48" range — burner service',
    city: 'Connecticut',
    date: 'Jun 2026',
  },
  {
    id: 4,
    src: '/images/gallery/4.jpg',
    alt: 'Top-load washing machine with lid open for inspection in Connecticut home laundry room — diagnosing spin cycle and agitator issue',
    appliance: 'Washer Repair',
    caption: 'Top-load washer — spin & agitator diagnostic',
    city: 'Connecticut',
    date: 'Jun 2026',
  },
  {
    id: 5,
    src: '/images/gallery/5.jpg',
    alt: 'LG ThinQ front-load washing machine internal components exposed during repair in Connecticut basement utility room',
    appliance: 'Washer Repair',
    caption: 'LG ThinQ front-load — internal inspection',
    city: 'Connecticut',
    date: 'May 2026',
  },
  {
    id: 6,
    src: '/images/gallery/6.jpg',
    alt: 'Stacked front-load washer front panel removed in Connecticut home — door boot seal and drain pump exposed for replacement',
    appliance: 'Washer Repair',
    caption: 'Front-load washer — boot seal & pump replacement',
    city: 'Connecticut',
    date: 'May 2026',
  },
];

function JobCard({ job }: { job: (typeof jobs)[0] }) {
  return (
    <div className="group relative aspect-square overflow-hidden bg-slate-100 border border-slate-200">
      <Image
        src={job.src}
        alt={job.alt}
        fill
        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 33vw, 420px"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-950/90 to-transparent px-4 py-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-200">
        <p className="text-xs font-bold uppercase tracking-widest text-[#ffb81c] mb-0.5">
          {job.appliance}
        </p>
        <p className="text-sm font-semibold text-white">{job.caption}</p>
        <p className="text-xs text-blue-300 mt-0.5">{job.date}</p>
      </div>
    </div>
  );
}

function MobileCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {jobs.map((job) => (
            <div key={job.id} className="flex-none w-[82vw]">
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-5" role="tablist" aria-label="Gallery slides">
        {jobs.map((job, i) => (
          <button
            key={job.id}
            role="tab"
            aria-selected={i === selectedIndex}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 transition-all duration-300 ${
              i === selectedIndex ? 'w-6 bg-[#ffb81c]' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function RecentJobs() {
  return (
    <section
      className="py-20 lg:py-28 bg-white border-t border-slate-100"
      aria-labelledby="jobs-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
            From the field
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              id="jobs-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-950"
            >
              Recent Jobs
            </h2>
            <p className="text-slate-500 max-w-md text-base">
              Real technician visits across Connecticut — photos taken on-site after every completed
              repair.
            </p>
          </div>
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <MobileCarousel />
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
