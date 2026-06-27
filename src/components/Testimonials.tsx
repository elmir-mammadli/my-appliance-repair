const GOOGLE_REVIEWS_URL = 'https://share.google/aktwu5fUEtjV6Eo40';

const testimonials = [
  {
    name: 'Niyazi Y.',
    initials: 'NY',
    text: 'I called MyAppliance Repair at 10 AM and they had Nijat at my door by 1:30 that same afternoon. He walked me through everything and even installed my disposal press button — all without me asking.',
    appliance: 'Dishwasher repair',
  },
  {
    name: 'Christopher N.',
    initials: 'CN',
    text: 'They contacted me minutes after I submitted a request, came out at my earliest time, and fixed my freezer. The technician showed me the problem, explained the fix, and communicated the cost before doing anything.',
    appliance: 'Freezer repair',
  },
  {
    name: 'S. Mizrahi',
    initials: 'SM',
    text: 'Our microwave stopped heating and was making unusual noises. The technician arrived on time, quickly diagnosed the issue, and fixed it the same day. Very professional, honest pricing, and great communication.',
    appliance: 'Microwave repair',
  },
  {
    name: 'Patricia L.',
    initials: 'PL',
    text: 'My washing machine was leaking and I was worried it would be a huge expense. The tech came out quickly, found the issue, and had the part on hand. Fair price and he cleaned up everything before leaving.',
    appliance: 'Washer repair',
  },
  {
    name: 'David K.',
    initials: 'DK',
    text: 'Called on a Saturday morning about my refrigerator not cooling. Someone was at my house by noon. Diagnosed a failing compressor start relay, replaced it on the spot, and saved me from losing a fridge full of food.',
    appliance: 'Refrigerator repair',
  },
  {
    name: 'Maria T.',
    initials: 'MT',
    text: 'Dryer stopped heating mid-cycle. MyAppliance sent a tech the next morning who found a burned heating element. He had the part in his van and fixed it in under an hour. Excellent service from start to finish.',
    appliance: 'Dryer repair',
  },
];

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
    <section id="testimonials" className="bg-blue-50 py-14" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-500">
              Google Reviews
            </p>
            <h2
              id="testimonials-heading"
              className="text-3xl font-bold text-blue-900 sm:text-4xl"
            >
              Trusted by Connecticut homeowners
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Fast response, honest diagnosis, and clear communication show up again and again in our
              review history. That matters when you are choosing who to let into your home.
            </p>
          </div>

          <div className="rounded-2xl bg-blue-950 px-6 py-5 text-white">
            <div className="flex gap-1" aria-label="5 out of 5 stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="mt-2 text-3xl font-bold">5.0/5</p>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-3 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-950 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <GoogleWordmark />
              Read all reviews
            </a>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex h-full flex-col rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-blue-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.appliance}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-0.5" aria-label="5 stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                {testimonial.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
