import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { posts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Appliance Repair Tips & Guides | CT Homeowners Blog | MyAppliance Repair LLC',
  description:
    "Expert appliance repair tips, maintenance guides, and cost-saving advice for Connecticut homeowners. Stay informed with MyAppliance Repair LLC's blog.",
  keywords:
    'appliance repair tips Connecticut, washer dryer maintenance, refrigerator problems, dishwasher repair, appliance maintenance',
  alternates: { canonical: 'https://www.myappliance.us/blog' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.myappliance.us',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: 'https://www.myappliance.us/blog',
    },
  ],
};

function jsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
      />
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-32 pb-10 lg:pt-40 lg:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Editorial top rail */}
          <div className="flex items-center justify-between border-t-2 border-blue-950 pt-5 mb-10">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.22em] bg-[#ffb81c] text-blue-950 px-2 py-0.5">
              Expert Knowledge
            </span>
            <span className="hidden sm:block text-[11px] font-bold uppercase tracking-[0.22em] text-blue-700">
              Connecticut&apos;s Appliance Blog
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl sm:text-7xl lg:text-[6rem] xl:text-[7rem] font-extrabold text-blue-950 leading-[1.05] lg:leading-[0.9] tracking-[-0.04em] mb-8 max-w-5xl">
            Expert Tips &amp; <span className="text-blue-700">Appliance Insights</span>
          </h1>

          {/* Bottom rule + description */}
          <div className="border-t border-blue-200 pt-6">
            <p className="text-lg lg:text-xl text-slate-700 leading-relaxed max-w-2xl">
              Practical guides and maintenance advice from Connecticut&apos;s appliance repair
              specialists — so your appliances last longer and cost you less.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Post ── */}
      <section className="bg-blue-50 py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-blue-500">
              Latest Article
            </span>
            <span className="flex-1 h-px bg-blue-200" aria-hidden="true" />
          </div>

          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="overflow-hidden border border-blue-200 grid lg:grid-cols-[1.6fr_1fr]">
              {/* Left: image with category badge + gradient overlay */}
              <div className="relative aspect-video lg:aspect-auto lg:min-h-[360px] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover motion-safe:group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  sizes="(max-width: 1024px) 100vw, 62vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-blue-950/10 to-transparent"
                  aria-hidden="true"
                />
                <span
                  className={`absolute top-4 left-4 inline-block text-[11px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 ${featured.accentColor}`}
                >
                  {featured.category}
                </span>
              </div>

              {/* Right: text content */}
              <div className="bg-white flex flex-col justify-center p-8 lg:p-12">
                <h2 className="text-3xl lg:text-[2.5rem] font-extrabold text-blue-950 tracking-[-0.02em] leading-[1.05] mb-4 group-hover:text-blue-800 transition-colors duration-200">
                  {featured.title}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6 text-base">{featured.excerpt}</p>
                <div className="border-t border-blue-100 pt-4">
                  <p className="text-[13px] text-slate-500 font-medium">
                    {formatDate(featured.date)} <span className="text-blue-300">·</span>{' '}
                    {featured.readTime} <span className="text-blue-300">·</span> {featured.author}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Post Grid ── */}
      <section className="bg-blue-50 pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-blue-500">
              More Articles
            </span>
            <span className="flex-1 h-px bg-blue-200" aria-hidden="true" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="flex flex-col">
                  {/* Card image */}
                  <div className="relative aspect-video overflow-hidden mb-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover motion-safe:group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Category kicker — single consistent editorial accent (TC uses one accent, not per-category) */}
                  <span className="self-start text-[10px] font-bold uppercase tracking-[0.14em] text-blue-600 mb-2">
                    {post.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-blue-950 tracking-[-0.01em] leading-snug mb-3 group-hover:text-blue-700 transition-colors duration-200">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="mt-auto flex items-center gap-2 text-[12px] text-slate-400 font-medium border-t border-blue-100 pt-3">
                    {formatDate(post.date)} <span className="text-blue-300">·</span> {post.readTime}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-blue-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Need Appliance Repair in Connecticut?
          </h2>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
            Same-day service across all 169 CT towns. Licensed, insured, and backed by a 90-day
            warranty.
          </p>
          <a
            href="tel:+19592616736"
            className="inline-flex items-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] text-gray-900 font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Call (959) 261-6736
          </a>
        </div>
      </section>

      <BookingModal />
      <Footer />
    </main>
  );
}
