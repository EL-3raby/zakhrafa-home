'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { BrandLogo } from './BrandLogo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 15;
      setIsScrolled(scrolled);
      if (mobileMenuOpen && scrolled) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'الرئيسية', href: '/' },
    { label: 'أقسام الكتالوج', href: '/categories' },
    { label: 'تواصل معنا', href: '/#contact' },
  ];

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201000000000';

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-100'
          : 'bg-white border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo - Vector Retina Crisp */}
        <Link
          href="/"
          className="flex items-center group py-0.5 transition-transform duration-200 group-hover:scale-102"
          aria-label="زخرفة للأثاث والديكور | ZAKHRAFA"
        >
          <BrandLogo className="h-9 sm:h-11 w-auto" theme="light" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-gray-700 hover:text-[#0B3D42] font-semibold text-sm transition-colors duration-200 py-1 after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#E17F3F] after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${whatsappNumber.replace(/[^0-9+]/g, '')}`}
            className="flex items-center gap-2 text-xs font-semibold text-[#0B3D42] hover:text-[#E17F3F] transition-all px-3 py-2 rounded-lg hover:bg-gray-50 hover:scale-105 active:scale-95"
          >
            <Phone className="w-4 h-4 text-[#E17F3F] stroke-[1.5]" />
            <span>اتصل بنا</span>
          </a>

          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0B3D42] hover:bg-[#07262A] text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 border border-[#12555C]"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
            <span>طلب وتسعير فوري</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 rounded-lg text-gray-700 hover:text-[#0B3D42] hover:bg-gray-100 transition"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[1.75]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[1.75]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Floating Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full inset-x-0 bg-white/98 backdrop-blur-xl border-b border-gray-100 shadow-xl p-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-800 hover:text-[#E17F3F] hover:bg-stone-50 transition"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#0B3D42] text-white py-2.5 rounded-xl text-xs font-semibold"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>تواصل عبر واتساب</span>
            </a>
            <a
              href={`tel:${whatsappNumber.replace(/[^0-9+]/g, '')}`}
              className="w-full flex items-center justify-center gap-2 border border-gray-200 text-[#0B3D42] py-2 rounded-xl text-xs font-semibold"
            >
              <Phone className="w-4 h-4 text-[#E17F3F] stroke-[1.5]" />
              <span>اتصل بنا</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
