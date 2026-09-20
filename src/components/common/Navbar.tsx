'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ChevronLeft } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { BrandLogo } from './BrandLogo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { label: 'أقسام الكتالوج', href: '/categories' },
    { label: 'تواصل معنا', href: '/#contact' },
  ];

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201000000000';

  // Mobile menu departments matching the user's reference design
  const menuDepartments = [
    {
      title: 'الأثاث',
      href: '/categories',
      bgColor: 'bg-[#F7F4EE]',
      hoverBg: 'hover:bg-[#EFEAE2]',
      items: [
        {
          name: 'أثاث غرف النوم',
          href: '/categories/bedrooms',
          image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'أثاث غرفة سفرة',
          href: '/categories/dining-rooms',
          image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'غرف المعيشة',
          href: '/categories/living-rooms',
          image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'كنب وزوايا مودرن',
          href: '/categories/living-rooms',
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'كراسي وفوتيه',
          href: '/categories/living-rooms',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=300&auto=format&fit=crop',
        },
      ],
    },
    {
      title: 'الطاولات والكونسول',
      href: '/categories/tables-consoles',
      bgColor: 'bg-[#EDF2FA]',
      hoverBg: 'hover:bg-[#DFE7F5]',
      items: [
        {
          name: 'طاولات القهوة',
          href: '/categories/tables-consoles',
          image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'طاولات رخام',
          href: '/categories/tables-consoles',
          image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'كونسول مداخل',
          href: '/categories/tables-consoles',
          image: 'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'طاولات جانبية',
          href: '/categories/tables-consoles',
          image: 'https://images.unsplash.com/photo-1519947486513-ce62b9a0b160?q=80&w=300&auto=format&fit=crop',
        },
      ],
    },
    {
      title: 'الديكورات واللمسات المبتكرة',
      href: '/categories/decor-accessories',
      bgColor: 'bg-[#FFF6E5]',
      hoverBg: 'hover:bg-[#FEEDD0]',
      items: [
        {
          name: 'مرايا فخمة',
          href: '/categories/decor-accessories',
          image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'إضاءات وأباجورات',
          href: '/categories/decor-accessories',
          image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'إكسسوارات وتحف',
          href: '/categories/decor-accessories',
          image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=300&auto=format&fit=crop',
        },
      ],
    },
    {
      title: 'تفصيل خاص وعروض حصرية',
      href: '/categories?offers=true',
      bgColor: 'bg-[#EAF4F0]',
      hoverBg: 'hover:bg-[#DCEDE7]',
      items: [
        {
          name: 'عروض حصرية',
          href: '/categories?offers=true',
          image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'تفصيل حسب الطلب',
          href: '/categories/custom-projects',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'مشاريع متكاملة',
          href: '/categories/custom-projects',
          image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=300&auto=format&fit=crop',
        },
      ],
    },
  ];

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
            {/* Header Title (matching reference image) */}
            <div className="flex items-center justify-between pb-1 pt-1">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                تسوق حسب الأقسام
              </h2>
              <Link
                href="/categories"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold text-[#0B3D42] hover:text-[#E17F3F] transition"
              >
                عرض الكل
              </Link>
            </div>

            {/* Department Blocks with colored banners and horizontal thumbnail slider */}
            {menuDepartments.map((dept) => (
              <div key={dept.title} className="space-y-2">
                {/* Colored Department Banner */}
                <Link
                  href={dept.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl ${dept.bgColor} ${dept.hoverBg} transition-colors group`}
                >
                  <ChevronLeft className="w-4 h-4 text-stone-500 group-hover:-translate-x-0.5 transition-transform" />
                  <span className="font-bold text-sm text-stone-800">
                    {dept.title}
                  </span>
                </Link>

                {/* Horizontal Scroll of Categories with Square Photos */}
                <div className="flex items-start gap-3 overflow-x-auto no-scrollbar py-1 px-0.5">
                  {dept.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex flex-col items-center shrink-0 w-[66px] sm:w-[72px] group text-center cursor-pointer"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 shadow-2xs border border-stone-200/60 relative group-hover:scale-105 active:scale-95 transition-transform duration-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-[11px] font-medium text-stone-700 mt-1 leading-tight line-clamp-2 group-hover:text-[#0B3D42]">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
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

            <a
              href={`tel:${whatsappNumber.replace(/[^0-9+]/g, '')}`}
              className="w-full flex items-center justify-center gap-2 border border-stone-200 bg-white text-stone-700 py-2 rounded-xl text-xs font-semibold hover:bg-stone-50 transition active:scale-98"
            >
              <Phone className="w-4 h-4 text-[#E17F3F] stroke-[1.75]" />
              <span>اتصل بنا</span>
            </a>
          </div>
        </aside>
      </div>
    </>
  );
};
