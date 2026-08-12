import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import BookingButton from '@/components/BookingButton';
import { posts, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import ViewCounter from '@/components/ViewCounter';
// import BlogAudioPlayer from '@/components/BlogAudioPlayer';

function jsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

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

  const description = post.excerpt.length > 160 ? post.excerpt.slice(0, 157) + '...' : post.excerpt;

  return {
    title: `${post.title} | MyAppliance Repair LLC Blog`,
    description,
    keywords: `${post.category.toLowerCase()}, appliance repair Connecticut, ${post.title.toLowerCase()}`,
    alternates: { canonical: `https://www.myappliance.us/blog/${slug}` },
    openGraph: {
      type: 'article',
      url: `https://www.myappliance.us/blog/${slug}`,
      title: `${post.title} | MyAppliance Repair LLC Blog`,
      description,
      publishedTime: post.date,
      authors: ['MyAppliance Repair LLC Team'],
      images: [
        {
          url: post.image,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 2);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt.length > 160 ? post.excerpt.slice(0, 157) + '...' : post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'MyAppliance Repair LLC Team',
      url: 'https://www.myappliance.us',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MyAppliance Repair LLC',
      url: 'https://www.myappliance.us',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.myappliance.us/images/og-image.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.myappliance.us/blog/${post.slug}`,
    },
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
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://www.myappliance.us/blog/${post.slug}`,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
      />
      <Navbar />

      {/* ── Post Header — full-bleed image with overlay ── */}
      <header className="relative overflow-hidden h-[480px] lg:h-[560px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-950/55 to-blue-950/10"
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16 w-full">
            <nav aria-label="Breadcrumb" className="mb-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-300 hover:text-white transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Blog
              </Link>
            </nav>

            <span
              className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 mb-5 ${post.accentColor}`}
            >
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-[-0.02em] mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200">
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {post.author}
              </span>
              <ViewCounter slug={post.slug} />
            </div>
          </div>
        </div>
      </header>

      {/* ── Post Body ── */}
      <article className="bg-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            {/* Temporary turn off the blog audio player */}
            {/* <div className="lg:col-span-2">
              <BlogAudioPlayer slug={post.slug} title={post.title} />
              <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div> */}

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* CTA Card */}
              <div className="bg-blue-950 p-6 text-white sticky top-24">
                <div className="w-10 h-10 bg-[#ffb81c] flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h2 className="font-bold text-lg mb-2 leading-snug">Need Appliance Repair?</h2>
                <p className="text-blue-200 text-sm leading-relaxed mb-5">
                  Same-day service across Connecticut. Licensed technicians, 90-day warranty on all
                  repairs.
                </p>
                <BookingButton className="w-full bg-[#ffb81c] hover:bg-[#e6a619] text-gray-900 font-bold py-3 transition-all duration-200 text-sm cursor-pointer">
                  Book a Service Call
                </BookingButton>
                <a
                  href="tel:+19592616736"
                  className="mt-3 w-full flex items-center justify-center gap-2 border border-blue-700 hover:border-blue-400 text-blue-200 hover:text-white font-medium py-3 transition-all duration-200 text-sm"
                >
                  <svg
                    className="w-4 h-4"
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
                  (959) 261-6736
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
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                  <article className="flex flex-col">
                    <div className="relative aspect-video overflow-hidden mb-4">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover motion-safe:group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                    <span className="self-start text-[10px] font-bold uppercase tracking-[0.14em] text-blue-600 mb-2">
                      {p.category}
                    </span>
                    <h3 className="text-base font-bold text-blue-950 tracking-[-0.01em] leading-snug mb-2 group-hover:text-blue-700 transition-colors duration-200 line-clamp-2">
                      {p.title}
                    </h3>
                    <div className="mt-auto flex items-center gap-2 text-[12px] text-slate-400 font-medium border-t border-blue-100 pt-3">
                      {formatDate(p.date)} <span className="text-blue-300">·</span> {p.readTime}
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-bold px-8 py-3 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
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
            Connecticut&apos;s most trusted repair team is ready to help — same day, backed by a
            90-day warranty.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <BookingButton className="inline-flex items-center justify-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] text-gray-900 font-bold px-8 py-4 transition-all duration-200 cursor-pointer">
              Book a Service Call
            </BookingButton>
            <a
              href="tel:+19592616736"
              className="inline-flex items-center justify-center gap-2 border-2 border-blue-600 hover:border-blue-400 text-white font-bold px-8 py-4 transition-all duration-200"
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
              (959) 261-6736
            </a>
          </div>
        </div>
      </section>

      <BookingModal />
      <Footer />
    </main>
  );
}
