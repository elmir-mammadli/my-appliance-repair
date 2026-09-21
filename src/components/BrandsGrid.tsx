import Image from 'next/image';

const featuredBrands = [
  { name: 'Sub-Zero', logo: '/images/brands/sub-zero.svg' },
  { name: 'Wolf', logo: '/images/brands/wolf.svg' },
  { name: 'Thermador', logo: '/images/brands/thermador.jpg' },
  { name: 'Miele', logo: '/images/brands/miele.svg' },
  { name: 'Fisher & Paykel', logo: '/images/brands/fisher-paykel.png' },
  { name: 'Whirlpool', logo: '/images/brands/whirlpool.svg' },
  { name: 'Samsung', logo: '/images/brands/samsung.svg' },
  { name: 'LG', logo: '/images/brands/lg.svg' },
  { name: 'GE Appliances', logo: '/images/brands/ge-appliances.svg' },
  { name: 'Bosch', logo: '/images/brands/bosch.svg' },
  { name: 'KitchenAid', logo: '/images/brands/kitchenaid.svg' },
  { name: 'Maytag', logo: '/images/brands/maytag.svg' },
  { name: 'Electrolux', logo: '/images/brands/electrolux.svg' },
  { name: 'Frigidaire', logo: '/images/brands/frigidaire.svg' },
  { name: 'Amana', logo: '/images/brands/amana.png' },
  { name: 'Speed Queen', logo: '/images/brands/speed-queen.png' },
  { name: 'Haier', logo: '/images/brands/haier.svg' },
  { name: 'Panasonic', logo: '/images/brands/panasonic.svg' },
];

const additionalBrands = [
  'Viking',
  'Dacor',
  'Kenmore',
  'Hotpoint',
  'GE Profile',
  'Hisense',
  'Sharp',
  'Insignia',
  'THOR',
  'Magic Chef',
  'Admiral',
  'Estate',
];

export default function BrandsGrid() {
  return (
    <section className="border-y border-blue-100 bg-slate-50 py-16" aria-labelledby="brands-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-blue-600">
            All Brands Welcome
          </span>
          <h2 id="brands-heading" className="mb-3 text-2xl font-bold text-blue-900 sm:text-3xl">
            We Repair Every Major Brand
          </h2>
          <p className="mx-auto max-w-xl text-slate-600">
            From everyday laundry rooms to premium kitchen packages, our technicians work on the
            brands Connecticut homeowners call about most.
          </p>
        </div>

        <ul
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
          aria-label="Appliance brands we repair"
        >
          {featuredBrands.map((brand) => (
            <li
              key={brand.name}
              className="flex min-h-28 items-center justify-center border border-slate-200 bg-white px-5 py-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:min-h-32"
            >
              <div className="relative h-12 w-full">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  fill
                  sizes="(min-width: 1024px) 160px, (min-width: 640px) 30vw, 45vw"
                  className="object-contain"
                />
              </div>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-4xl text-center text-sm leading-7 text-slate-500">
          We also service {additionalBrands.slice(0, -1).join(', ')}, and{' '}
          {additionalBrands.at(-1)} appliances.
        </p>

        <p className="mt-3 text-center text-sm text-slate-500">
          Don&apos;t see your brand?{' '}
          <a
            href="tel:+19592616736"
            className="font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 transition-colors duration-200 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            Call us. We most likely service it.
          </a>
        </p>
      </div>
    </section>
  );
}
