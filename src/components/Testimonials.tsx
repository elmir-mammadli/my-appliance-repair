import { PROFILES, REVIEW_RATINGS } from '@/lib/business';
import { REVIEWS, REVIEWS_SOURCE, type Review } from '@/lib/reviews';

const GOOGLE_REVIEWS_URL = PROFILES.google;

const half = Math.ceil(REVIEWS.length / 2);
const row1 = REVIEWS.slice(0, half);
const row2 = REVIEWS.slice(half);

function StarRow() {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="w-80 shrink-0 block group"
      tabIndex={-1}
    >
      <article className="h-full border border-blue-100 bg-white p-5 transition-all duration-300 group-hover:border-blue-300 group-hover:-translate-y-1 group-hover:bg-blue-50/40">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-blue-700 text-sm font-bold text-white transition-colors duration-300 group-hover:bg-blue-600">
              {review.initials}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-blue-900 text-sm truncate">{review.name}</p>
              <p className="text-xs text-slate-500">
                {review.appliance} · {review.when} · {REVIEWS_SOURCE}
              </p>
            </div>
          </div>
          {/* Google G mark — appears on hover */}
          <svg
            className="w-5 h-5 flex-shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
            <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
            <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
            <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
          </svg>
        </div>
        <StarRow />
        <blockquote className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-4">{review.text}</blockquote>
      </article>
    </a>
  );
}

function GoogleWordmark() {
  return (
    <svg viewBox="0 0 272 92" className="h-7 w-auto" aria-label="Google" role="img">
      <path fill="#4285F4" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
      <path fill="#EA4335" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
      <path fill="#FBBC05" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" />
      <path fill="#4285F4" d="M225 3v65h-9.5V3h9.5z" />
      <path fill="#34A853" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.70-8.23-4.70-4.95 0-11.84 4.37-11.59 12.93z" />
      <path fill="#EA4335" d="M35.29 41.41V32h31.36c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 35.36.36 16.83 16.32 1.37 34.95 1.37c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.14.11z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-blue-50 py-14 overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col gap-6 border border-blue-100 bg-white p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 id="testimonials-heading" className="text-3xl font-bold text-blue-900 sm:text-4xl">
              Google reviews from Connecticut homeowners
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Fast response, honest diagnosis, and clear communication show up again and again in
              our review history. That matters when you are choosing who to let into your home.
            </p>
          </div>

          <div className="bg-blue-950 px-6 py-5 text-white shrink-0">
            <div className="flex gap-1" aria-label={`${REVIEW_RATINGS.google.rating} out of 5 stars on Google`}>
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="mt-2 text-3xl font-bold">{REVIEW_RATINGS.google.rating.toFixed(1)} / 5</p>
            <p className="text-sm text-blue-300 mt-0.5">{REVIEW_RATINGS.google.count}+ Google reviews</p>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-3 bg-white px-4 py-2 text-sm font-semibold text-blue-950 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <GoogleWordmark />
              Read all reviews
            </a>
          </div>
        </div>
      </div>

      {/* Marquee rows: each row is rendered twice so the loop is seamless; the copy is hidden from AT. */}
      <div className="space-y-4">
        {[
          { items: row1, animation: 'marquee-left 110s linear infinite' },
          { items: row2, animation: 'marquee-right 120s linear infinite' },
        ].map(({ items, animation }, rowIndex) => (
          <div key={rowIndex} className="overflow-hidden px-2 md:px-10">
            <div className="marquee-track flex w-max gap-4" style={{ animation }}>
              <ul className="flex gap-4">
                {items.map((review) => (
                  <li key={`${review.name}-${review.when}`}>
                    <ReviewCard review={review} />
                  </li>
                ))}
              </ul>
              <ul className="flex gap-4" aria-hidden="true">
                {items.map((review) => (
                  <li key={`${review.name}-${review.when}-copy`}>
                    <ReviewCard review={review} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 text-center">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors duration-200"
        >
          See all {REVIEW_RATINGS.google.count} reviews on Google
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
