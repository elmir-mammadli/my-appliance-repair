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
  keywords: 'appliance repair tips Connecticut, washer dryer maintenance, refrigerator problems, dishwasher repair, appliance maintenance',
  alternates: { canonical: 'https://myappliance.us/blog' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://myappliance.us',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: 'https://myappliance.us/blog',
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
      <section className="bg-blue-950 relative overflow-hidden">
        {/* Subtle radial pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #ffffff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #ffffff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-28">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#ffb81c] mb-4">
              Expert Knowledge
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
              Expert Tips &amp;{' '}
              <span className="text-[#ffb81c]">Appliance Insights</span>
            </h1>
            <p className="text-lg text-blue-200 leading-relaxed max-w-xl">
              Practical guides and maintenance advice from Connecticut&apos;s appliance repair
              specialists — so your appliances last longer and cost you less.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Post ── */}
      <section className="bg-blue-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-blue-500">
              Latest Article
            </span>
            <span className="flex-1 h-px bg-blue-200" aria-hidden="true" />
          </div>

          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 grid lg:grid-cols-2">
              {/* Left: image with gradient overlay */}
              <div
                className={`bg-gradient-to-br ${featured.featuredColor} relative min-h-64 lg:min-h-auto flex flex-col justify-end p-8 lg:p-12`}
              >
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" aria-hidden="true" />
                <div className="relative">
                  <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${featured.accentColor}`}>
                    {featured.category}
                  </span>
                  <p className="text-blue-100 text-sm font-medium">
                    {formatDate(featured.date)} &nbsp;·&nbsp; {featured.readTime}
                  </p>
                </div>
              </div>

              {/* Right: text content */}
              <div className="bg-white flex flex-col justify-center p-8 lg:p-12">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 leading-tight mb-4 group-hover:text-blue-700 transition-colors duration-200">
                  {featured.title}
                </h2>
                <p className="text-slate-500 leading-relaxed mb-8 text-base">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 group-hover:text-blue-900 transition-colors duration-200">
                  Read Article
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
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

          <div className="grid sm:grid-cols-2 gap-6">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
                  {/* Card image header */}
                  <div className={`bg-gradient-to-br ${post.featuredColor} h-36 relative flex items-end p-5`}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" aria-hidden="true" />
                    <span className={`relative inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${post.accentColor}`}>
                      {post.category}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-blue-900 leading-snug mb-3 group-hover:text-blue-700 transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-blue-50">
                      <span className="text-xs text-slate-400 font-medium">
                        {formatDate(post.date)} &nbsp;·&nbsp; {post.readTime}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 group-hover:text-blue-900 transition-colors duration-200">
                        Read Article
                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
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
            Same-day service across all 169 CT towns. Licensed, insured, and backed by a 90-day warranty.
          </p>
          <a
            href="tel:+19592616736"
            className="inline-flex items-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] text-gray-900 font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
