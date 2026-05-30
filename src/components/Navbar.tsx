'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { openBookingModal } from '@/lib/booking';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/#coverage', label: 'Coverage' },
    { href: '/#why-us', label: 'Why Us' },
    { href: '/#testimonials', label: 'Reviews' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/about', label: 'About' },
    { href: '/#join-us', label: 'Join Our Team' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isScrolled
          ? 'shadow-md py-3'
          : 'border-b border-slate-200 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group cursor-pointer">
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
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
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
        <div className="hidden md:flex items-center gap-2">
          <a
            href="tel:+19592616736"
            className="flex items-center gap-2 text-blue-900 hover:text-blue-600 font-semibold text-sm mr-1 transition-colors duration-200 cursor-pointer"
            aria-label="Call us now"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (959) 261-6736
          </a>
          <button
            onClick={() => openBookingModal()}
            className="flex items-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] text-gray-900 font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer shadow-sm"
          >
            Book a Repair
          </button>
        </div>

        {/* Mobile Phone Link + Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href="tel:+19592616736"
            className="flex items-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm px-3 py-1.5 rounded-lg transition-colors duration-200 cursor-pointer"
            aria-label="Call (959) 261-6736"
          >
            <svg className="w-4 h-4 text-[#ffb81c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (959) 261-6736
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-lg text-blue-900 hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
            aria-expanded={isMobileOpen}
            aria-label="Toggle mobile menu"
          >
          {isMobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-white border-t border-blue-100 overflow-hidden transition-all duration-300 ${
          isMobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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
            onClick={() => { setIsMobileOpen(false); openBookingModal(); }}
            className="mt-2 flex items-center justify-center gap-2 bg-[#ffb81c] hover:bg-[#e6a619] text-gray-900 font-semibold px-5 py-3 rounded-lg transition-colors duration-200 cursor-pointer w-full"
          >
            Book a Repair
          </button>
          <a
            href="tel:+19592616736"
            className="flex items-center justify-center gap-2 border border-blue-200 text-blue-900 font-semibold px-5 py-3 rounded-lg transition-colors duration-200 cursor-pointer hover:bg-blue-50"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (959) 261-6736
          </a>
        </nav>
      </div>
    </header>
  );
}
