'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BRANCHES, NJ_PATH } from '@/lib/branches';
import { openBookingModal } from '@/lib/booking';
import AnnouncementBar from './AnnouncementBar';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const branchId = pathname.startsWith(NJ_PATH) ? 'nj' : 'ct';
  const branch = BRANCHES[branchId];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = branchId === 'nj' ? [
    { href: `${NJ_PATH}#services`, label: 'Services' },
    { href: `${NJ_PATH}#coverage`, label: 'Coverage' },
    { href: `${NJ_PATH}#how-it-works`, label: 'How It Works' },
    { href: `${NJ_PATH}#faq`, label: 'FAQ' },
    { href: '/', label: 'Connecticut ↗' },
  ] : [
    { href: '/services', label: 'Services' },
    { href: '/#coverage', label: 'Coverage' },
    { href: '/#why-us', label: 'Why Us' },
    { href: '/#testimonials', label: 'Reviews' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Our Blog' },
    { href: NJ_PATH, label: 'New Jersey ↗' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isScrolled ? 'shadow-sm' : 'border-b border-slate-200'
      }`}
    >
      {branchId === 'ct' && <AnnouncementBar />}
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        {/* Logo */}
        <Link href={branch.home} className="flex items-center group cursor-pointer">
          <Image
            src="/logo.svg"
            alt="MyAppliance Repair LLC"
            width={160}
            height={53}
            className="h-11 w-auto transition-transform duration-200 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-4 text-sm" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-medium text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden xl:flex items-center gap-4">
          <a
            href={`tel:${branch.telephone}`}
            className="flex items-center gap-2 text-blue-900 hover:text-blue-600 font-semibold text-sm mr-1 transition-colors duration-200 cursor-pointer"
            aria-label="Call us now"
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
            {branch.phone}
          </a>
          <button
            onClick={() => openBookingModal({ branchId })}
            className="flex items-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] text-gray-900 font-bold px-5 py-2.5 transition-all duration-100 cursor-pointer shadow-[4px_4px_0_#172554] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#172554] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            Book a Repair
          </button>
        </div>

        {/* Mobile Phone Link + Hamburger */}
        <div className="xl:hidden flex items-center gap-3">
          <a
            href={`tel:${branch.telephone}`}
            className="flex items-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm px-3 py-1.5 transition-colors duration-200 cursor-pointer"
            aria-label={`Call ${branch.phone}`}
          >
            <svg
              className="w-4 h-4 text-[#ffb81c]"
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
            {branch.phone}
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 text-blue-900 hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
            aria-expanded={isMobileOpen}
            aria-label="Toggle mobile menu"
          >
            {isMobileOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`xl:hidden bg-white border-t border-blue-100 overflow-hidden transition-all duration-300 ${
          isMobileOpen ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-4 py-4 flex flex-col gap-3" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="text-blue-900 font-medium py-2 hover:text-blue-600 transition-colors duration-200 cursor-pointer border-b border-blue-50 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setIsMobileOpen(false);
              openBookingModal({ branchId });
            }}
            className="mt-2 flex items-center justify-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] text-gray-900 font-semibold px-5 py-3 transition-all duration-100 cursor-pointer w-full shadow-[4px_4px_0_#172554] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#172554] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            Book a Repair
          </button>
          <Link
            href="/#join-us"
            onClick={() => setIsMobileOpen(false)}
            className="flex items-center justify-center gap-2 border border-blue-200 text-blue-900 font-semibold px-5 py-3 transition-colors duration-200 cursor-pointer hover:bg-blue-50"
          >
            Join Our Team
          </Link>
        </nav>
      </div>
    </header>
  );
}
