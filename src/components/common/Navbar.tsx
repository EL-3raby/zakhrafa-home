'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronLeft, Heart } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import CartButton from './CartButton';
import { BrandLogo } from './BrandLogo';
import { useCatalogCategories } from './useCatalogCategories';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const categories = useCatalogCategories();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'الرئيسية', href: '/' },
    { label: 'من نحن', href: '/#about' },
    { label: 'أقسام الكتالوج', href: '/categories' },
    { label: 'تواصل معنا', href: '/#contact' },
  ];

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201000000000';

  return (
    <>
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
            <Link
              href="/wishlist"
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-[#0B3D42] transition-all hover:bg-[#E17F3F]/10 hover:text-[#E17F3F]"
            >
              <Heart className="h-4 w-4 text-[#E17F3F]" />
              <span>المفضلة</span>
            </Link>

            <CartButton />

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
              onClick={() => setMobileMenuOpen(true)}
              type="button"
              className="p-2 rounded-xl text-gray-700 hover:text-[#0B3D42] hover:bg-gray-100 transition active:scale-95"
              aria-label="فتح القائمة الجانبية"
            >
              <Menu className="w-6 h-6 stroke-[1.75]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Side Drawer Menu (Slide from Left - Visual Department Look) */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop overlay */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Drawer Panel */}
        <aside
          className={`fixed top-0 left-0 bottom-0 w-[88%] max-w-sm bg-white shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Drawer Top Bar */}
          <div className="h-14 px-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
            <button
              onClick={() => setMobileMenuOpen(false)}
              type="button"
              className="w-8 h-8 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 flex items-center justify-center transition active:scale-95"
              aria-label="إغلاق القائمة"
            >
              <X className="w-5 h-5 stroke-[1.75]" />
            </button>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block py-1"
              aria-label="زخرفة - الصفحة الرئيسية"
            >
              <BrandLogo className="h-8 w-auto" theme="light" />
            </Link>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar">
            <nav aria-label="التنقل السريع" className="space-y-1">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-bold text-stone-800 hover:bg-stone-50">
                <span>
                  <span className="block">الرئيسية</span>
                  <span className="mt-0.5 block text-[11px] font-normal text-stone-500">اكتشف أحدث التشكيلات</span>
                </span>
                <ChevronLeft className="w-4 h-4 text-stone-400" />
              </Link>
              <Link href="/categories" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-bold text-stone-800 hover:bg-stone-50">
                <span>
                  <span className="block">كل المنتجات</span>
                  <span className="mt-0.5 block text-[11px] font-normal text-stone-500">تصفح الكتالوج الكامل</span>
                </span>
                <ChevronLeft className="w-4 h-4 text-stone-400" />
              </Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-bold text-stone-800 hover:bg-stone-50">
                <span>
                  <span className="block">من نحن</span>
                  <span className="mt-0.5 block text-[11px] font-normal text-stone-500">تعرف على قصتنا وقيمنا</span>
                </span>
                <ChevronLeft className="w-4 h-4 text-stone-400" />
              </Link>
              <Link href="/categories?offers=true" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-bold text-[#0B3D42] bg-[#EAF4F0] hover:bg-[#DCEDE7]">
                <span>
                  <span className="block">أقوى العروض</span>
                  <span className="mt-0.5 block text-[11px] font-normal text-[#0B3D42]/65">قطع مختارة بأسعار مخفضة</span>
                </span>
                <ChevronLeft className="w-4 h-4 text-[#E17F3F]" />
              </Link>
              <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-bold text-stone-800 hover:bg-stone-50">
                <span>
                  <span className="block">الدعم</span>
                  <span className="mt-0.5 block text-[11px] font-normal text-stone-500">تواصل معنا واستفسر</span>
                </span>
                <ChevronLeft className="w-4 h-4 text-stone-400" />
              </Link>
            </nav>

            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <h2 className="text-base font-bold text-gray-900">تسوق حسب الأقسام</h2>
                <span className="text-xs text-stone-400">{categories.length} أقسام</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group overflow-hidden rounded-xl border border-stone-200/80 bg-white hover:border-[#0B3D42]/30"
                  >
                    <div className="h-20 overflow-hidden bg-stone-100">
                      <img src={category.image_url} alt={category.name_ar} className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105" loading="lazy" />
                    </div>
                    <span className="block px-2 py-2 text-right text-xs font-semibold leading-tight text-stone-700 group-hover:text-[#0B3D42]">
                      {category.name_ar}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 border-t border-gray-100 bg-stone-50/60 space-y-2 shrink-0">
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#0B3D42] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#07262A] transition active:scale-98 shadow-xs"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>طلب وتسعير فوري عبر واتساب</span>
            </a>

          </div>
        </aside>
      </div>
    </>
  );
};
