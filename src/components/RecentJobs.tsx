import Image from 'next/image';

const jobs = [
  {
    id: 1,
    src: '/images/gallery/1.jpg',
    alt: 'OEM appliance main control board replacement in Connecticut, new PCB unpacked from anti-static packaging next to old failed board before installation',
    appliance: 'Control Board Replacement',
    caption: 'OEM control board: old vs new PCB swap',
    city: 'Connecticut',
    date: 'Jul 2026',
  },
  {
    id: 2,
    src: '/images/gallery/2.jpg',
    alt: 'Built-in dishwasher pulled from kitchen cabinet for repair in Connecticut, control panel open with diagnostic indicator light active',
    appliance: 'Dishwasher Repair',
    caption: 'Built-in dishwasher: control board diagnostic',
    city: 'Connecticut',
    date: 'Jul 2026',
  },
  {
    id: 3,
    src: '/images/gallery/3.jpg',
    alt: 'Viking Professional 48-inch commercial gas range with double oven serviced by Connecticut appliance repair technician, burner and ignition inspection',
    appliance: 'Range Repair',
    caption: 'Viking Professional 48" range, burner service',
    city: 'Connecticut',
    date: 'Jun 2026',
  },
  {
    id: 4,
    src: '/images/gallery/4.jpg',
    alt: 'Top-load washing machine with lid open for inspection in Connecticut home laundry room, diagnosing spin cycle and agitator issue',
    appliance: 'Washer Repair',
    caption: 'Top-load washer: spin & agitator diagnostic',
    city: 'Connecticut',
    date: 'Jun 2026',
  },
  {
    id: 5,
    src: '/images/gallery/5.jpg',
    alt: 'LG ThinQ front-load washing machine internal components exposed during repair in Connecticut basement utility room',
    appliance: 'Washer Repair',
    caption: 'LG ThinQ front-load: internal inspection',
    city: 'Connecticut',
    date: 'May 2026',
  },
  {
    id: 6,
    src: '/images/gallery/6.jpg',
    alt: 'Stacked front-load washer front panel removed in Connecticut home, door boot seal and drain pump exposed for replacement',
    appliance: 'Washer Repair',
    caption: 'Front-load washer: boot seal & pump replacement',
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
        <p className="text-xs font-bold text-[#ffb81c] mb-0.5">
          {job.appliance}
        </p>
        <p className="text-sm font-semibold text-white">{job.caption}</p>
        <p className="text-xs text-blue-300 mt-0.5">{job.date}</p>
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
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              id="jobs-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-950"
            >
              Recent jobs
            </h2>
            <p className="text-slate-500 max-w-md text-base">
              Real technician visits across Connecticut: photos taken on-site after every completed
              repair.
            </p>
          </div>
        </div>

        {/* One list: a snap-scrolling row on phones, a grid from md up. */}
        <ul
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-2 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible lg:grid-cols-3"
          aria-label="Recent repair photos"
        >
          {jobs.map((job) => (
            <li key={job.id} className="flex-none w-[82vw] snap-start md:w-auto">
              <JobCard job={job} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
