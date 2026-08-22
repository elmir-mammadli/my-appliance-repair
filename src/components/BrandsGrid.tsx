const brands = [
  { name: 'Sub-Zero', tier: 'premium' },
  { name: 'Viking', tier: 'premium' },
  { name: 'Thermador', tier: 'premium' },
  { name: 'Miele', tier: 'premium' },
  { name: 'Wolf', tier: 'premium' },
  { name: 'Dacor', tier: 'premium' },
  { name: 'Fisher & Paykel', tier: 'premium' },
  { name: 'Whirlpool', tier: 'major' },
  { name: 'Samsung', tier: 'major' },
  { name: 'LG', tier: 'major' },
  { name: 'GE', tier: 'major' },
  { name: 'Bosch', tier: 'major' },
  { name: 'KitchenAid', tier: 'major' },
  { name: 'Maytag', tier: 'major' },
  { name: 'Electrolux', tier: 'major' },
  { name: 'Kenmore', tier: 'major' },
  { name: 'Frigidaire', tier: 'standard' },
  { name: 'Amana', tier: 'standard' },
  { name: 'Speed Queen', tier: 'standard' },
  { name: 'Hotpoint', tier: 'standard' },
  { name: 'GE Profile', tier: 'standard' },
  { name: 'Haier', tier: 'standard' },
  { name: 'Hisense', tier: 'standard' },
  { name: 'Sharp', tier: 'standard' },
  { name: 'Panasonic', tier: 'standard' },
  { name: 'Insignia', tier: 'standard' },
  { name: 'THOR', tier: 'standard' },
  { name: 'Magic Chef', tier: 'standard' },
  { name: 'Admiral', tier: 'standard' },
  { name: 'Estate', tier: 'standard' },
];

export default function BrandsGrid() {
  return (
    <section className="border-y border-blue-100 bg-white py-16" aria-labelledby="brands-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-blue-600">
            All Brands Welcome
          </span>
          <h2 id="brands-heading" className="mb-2 text-2xl font-bold text-blue-900 sm:text-3xl">
            We Repair Every Major Brand
          </h2>
          <p className="mx-auto max-w-xl text-slate-500">
            From everyday laundry rooms to premium kitchen packages, our technicians work on the
            brands Connecticut homeowners call about most.
          </p>
        </div>

        <div className="mb-6">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-blue-600">
            Premium & Luxury
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {brands
              .filter((brand) => brand.tier === 'premium')
              .map((brand) => (
                <div
                  key={brand.name}
                  className=" border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 px-5 py-2.5 text-sm font-bold text-blue-900"
                >
                  {brand.name}
                </div>
              ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            Major Brands
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {brands
              .filter((brand) => brand.tier === 'major')
              .map((brand) => (
                <div
                  key={brand.name}
                  className=" border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm"
                >
                  {brand.name}
                </div>
              ))}
          </div>
        </div>

        <div className="mb-8">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-slate-300">
            And Many More
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {brands
              .filter((brand) => brand.tier === 'standard')
              .map((brand) => (
                <div
                  key={brand.name}
                  className=" border border-slate-100 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500"
                >
                  {brand.name}
                </div>
              ))}
          </div>
        </div>

        <p className="text-center text-sm text-slate-400">
          Don&apos;t see your brand?{' '}
          <a
            href="tel:+19592616736"
            className="font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-800"
          >
            Call us. We most likely service it.
          </a>
        </p>
      </div>
    </section>
  );
}
