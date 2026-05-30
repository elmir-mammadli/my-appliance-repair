import Image from 'next/image';
import Link from 'next/link';

const footerServiceLinks: { label: string; href: string }[] = [
  { label: 'Washer Repair', href: '/services/washer-repair' },
  { label: 'Dryer Repair', href: '/services/dryer-repair' },
  { label: 'Refrigerator Repair', href: '/services/refrigerator-repair' },
  { label: 'Dishwasher Repair', href: '/services/dishwasher-repair' },
  { label: 'Oven & Range Repair', href: '/services/oven-range-repair' },
  { label: 'Same-Day Emergency', href: '/services' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-950 text-blue-200" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo.svg"
                alt="MyAppliance Repair LLC"
                width={160}
                height={53}
                className="h-10 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Connecticut&apos;s trusted appliance repair experts since 2008. Licensed, insured, and committed to your satisfaction.
            </p>
            <a
              href="tel:+19592616736"
              className="inline-flex items-center gap-2 bg-[#ffb81c] hover:bg-[#ffca4d] text-gray-900 font-bold px-5 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (959) 261-6736
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              {footerServiceLinks.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="hover:text-white transition-colors duration-200 cursor-pointer">{s.label}</Link>
                </li>
              ))}
              <li className="pt-1 border-t border-blue-800 mt-2">
                <Link href="/about" className="hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#ffb81c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#ffb81c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Blog &amp; Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-white font-bold mb-4">Service Areas</h3>
            <ul className="space-y-2 text-sm">
              {['Greater Hartford', 'Greater New Haven', 'Fairfield County', 'New London County', 'Waterbury Area', 'Northeastern CT'].map((area) => (
                <li key={area}>
                  <Link href="/#coverage" className="hover:text-white transition-colors duration-200 cursor-pointer">{area}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(959) 261-6736<br/><span className="text-blue-400 text-xs">24/7 Emergency Line</span></span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@myappliance.us</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Mon–Sat: 7am–8pm<br/>Sun: 9am–5pm<br/><span className="text-blue-400 text-xs">Emergency 24/7</span></span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Serving all of<br/>Connecticut, USA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-blue-400">
          <p>&copy; 2026 MyAppliance Repair LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white transition-colors duration-200 cursor-pointer">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors duration-200 cursor-pointer">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Sitemap</a>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">CT License #HIC.0642318</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
