import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import BookingButton from '@/components/BookingButton';
import { posts, getPostBySlug, getRelatedPosts } from '@/lib/posts';

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | CT Appliance Repair Blog`,
    description: post.excerpt,
    keywords: `${post.category.toLowerCase()}, appliance repair Connecticut, ${post.title.toLowerCase()}`,
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 2);

  return (
    <main>
      <Navbar />

      {/* ── Post Header ── */}
      <header className={`bg-gradient-to-br ${post.featuredColor} relative overflow-hidden`}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, #ffffff 1.5px, transparent 1.5px)', backgroundSize: '50px 50px' }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </nav>

          <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5 ${post.accentColor}`}>
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {post.author}
            </span>
          </div>
        </div>
      </header>

      {/* ── Post Body ── */}
      <article className="bg-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* CTA Card */}
              <div className="bg-blue-950 rounded-2xl p-6 text-white sticky top-24">
                <div className="w-10 h-10 bg-[#ffb81c] rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2 leading-snug">
                  Need Appliance Repair?
                </h3>
                <p className="text-blue-200 text-sm leading-relaxed mb-5">
                  Same-day service across Connecticut. Licensed technicians, 90-day warranty on all repairs.
                </p>
                <BookingButton className="w-full bg-[#ffb81c] hover:bg-[#e6a619] text-gray-900 font-bold py-3 rounded-xl transition-all duration-200 text-sm cursor-pointer">
                  Book a Service Call
                </BookingButton>
                <a
                  href="tel:+18005550123"
                  className="mt-3 w-full flex items-center justify-center gap-2 border border-blue-700 hover:border-blue-400 text-blue-200 hover:text-white font-medium py-3 rounded-xl transition-all duration-200 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (800) 555-0123
                </a>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* ── Related Posts ── */}
      {related.length > 0 && (
        <section className="bg-blue-50 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-blue-500">
                Keep Reading
              </span>
              <span className="flex-1 h-px bg-blue-200" aria-hidden="true" />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                  <article className="bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                    <div className={`bg-gradient-to-br ${p.featuredColor} h-28 relative flex items-end p-4`}>
                      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #ffffff 1px, transparent 1px)', backgroundSize: '25px 25px' }} aria-hidden="true" />
                      <span className={`relative inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${p.accentColor}`}>
                        {p.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h4 className="font-bold text-blue-900 text-sm leading-snug mb-2 group-hover:text-blue-700 transition-colors duration-200 line-clamp-2">
                        {p.title}
                      </h4>
                      <span className="text-xs text-blue-500 font-medium flex items-center gap-1">
                        {p.readTime}
                        <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-bold px-8 py-3 rounded-xl transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ── */}
      <section className="bg-blue-950 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Appliance giving you trouble?
          </h2>
          <p className="text-blue-200 mb-7 max-w-lg mx-auto">
            Connecticut&apos;s most trusted repair team is ready to help — same day, backed by a 90-day warranty.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <BookingButton className="inline-flex items-center justify-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] text-gray-900 font-bold px-8 py-4 rounded-xl transition-all duration-200 cursor-pointer">
              Book a Service Call
            </BookingButton>
            <a
              href="tel:+18005550123"
              className="inline-flex items-center justify-center gap-2 border-2 border-blue-600 hover:border-blue-400 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (800) 555-0123
            </a>
          </div>
        </div>
      </section>

      <BookingModal />
      <Footer />
    </main>
  );
}
