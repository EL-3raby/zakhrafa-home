'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowUpLeft } from 'lucide-react';
import { WhatsAppIcon, FacebookIcon, InstagramIcon } from './BrandIcons';
import { BrandLogo } from './BrandLogo';
import { useCatalogCategories } from './useCatalogCategories';

export const Footer: React.FC = () => {
  const categories = useCatalogCategories();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201000000000';
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com';
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com';

  const quickLinks = [
    { name: 'عن زخرفة', href: '/about' },
    { name: 'كتالوج المنتجات', href: '/categories' },
    { name: 'العروض الحصرية', href: '/categories?offers=true' },
    { name: 'تواصل واستفسار', href: '/#contact' },
  ];

  return (
    <footer id="contact" className="bg-[#0B3D42] text-white pt-10 sm:pt-16 pb-24 sm:pb-8 border-t-2 border-[#E17F3F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pb-8 sm:pb-12 border-b border-[#12555C]">
          {/* Brand Column */}
          <div className="space-y-3.5 sm:space-y-4">
            <Link href="/" className="inline-block group py-1" aria-label="زخرفة - ZAKHRAFA">
              <BrandLogo className="h-11 sm:h-14 w-auto" theme="dark" />
            </Link>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              علامة تجارية متخصصة في ابتكار أرقى قطع الأثاث والديكورات العصرية. نجمع بين الأناقة والفخامة لنصنع لك مساحة تعبر عن ذوقك الرفيع.
            </p>

            {/* Social Media Strip */}
            <div className="pt-1 sm:pt-2">
              <span className="text-[11px] sm:text-xs text-slate-300 block mb-2 font-medium">تابعونا على منصات التواصل:</span>
              <div className="flex items-center gap-2 sm:gap-2.5">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="فيسبوك زخرفة"
                  className="w-9 h-9 sm:w-9 sm:h-9 rounded-xl bg-white/10 hover:bg-[#1877F2] text-slate-200 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-[#1877F2] hover:scale-110 active:scale-95 shadow-2xs"
                  title="فيسبوك"
                >
                  <FacebookIcon className="w-4 h-4 fill-current" />
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="إنستغرام زخرفة"
                  className="w-9 h-9 sm:w-9 sm:h-9 rounded-xl bg-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-slate-200 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-transparent hover:scale-110 active:scale-95 shadow-2xs"
                  title="إنستغرام"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="واتساب زخرفة"
                  className="w-9 h-9 sm:w-9 sm:h-9 rounded-xl bg-white/10 hover:bg-[#25D366] text-slate-200 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-[#25D366] hover:scale-110 active:scale-95 shadow-2xs"
                  title="واتساب"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                </a>
              </div>
            </div>
          </div>

          {/* Links Section: 2 Columns on Mobile, 2 Columns in Desktop Grid */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-4 sm:gap-8 pt-2 sm:pt-0">
            {/* Categories Column */}
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E17F3F]" />
                أقسام الكتالوج
              </h3>
              <ul className="space-y-2 sm:space-y-2.5 text-[11px] sm:text-xs text-slate-300">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="hover:text-[#E17F3F] transition-colors inline-flex items-center gap-1 sm:gap-1.5 group py-0.5"
                    >
                      <ArrowUpLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 group-hover:text-[#E17F3F] stroke-[1.5] transition-transform group-hover:-translate-x-0.5 shrink-0" />
                      <span className="line-clamp-1">{cat.name_ar}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E17F3F]" />
                روابط سريعة
              </h3>
              <ul className="space-y-2 sm:space-y-2.5 text-[11px] sm:text-xs text-slate-300">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-[#E17F3F] transition-colors inline-flex items-center gap-1 sm:gap-1.5 group py-0.5"
                    >
                      <ArrowUpLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 group-hover:text-[#E17F3F] stroke-[1.5] transition-transform group-hover:-translate-x-0.5 shrink-0" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-0">
            <h3 className="text-xs sm:text-sm font-bold text-white mb-2 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E17F3F]" />
              تواصل واستفسار
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
              يسعدنا استقبال استفساراتكم ومساعدتكم في اختيار ومواءمة التصميم المناسب.
            </p>
            
            {/* Quick Action Buttons on Mobile */}
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-col sm:gap-2.5 sm:space-y-0 text-xs">
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-2 px-3 py-2.5 rounded-xl bg-white/[0.07] sm:bg-transparent border border-white/10 sm:border-0 text-slate-200 hover:text-[#25D366] hover:bg-white/10 transition active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-4 h-4 fill-[#25D366] shrink-0" />
                <span className="text-[11px] sm:text-xs font-medium">واتساب مباشر</span>
              </a>

            </div>

            {/* Shipping & Location Badge */}
            <div className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-300 pt-1">
              <MapPin className="w-4 h-4 text-[#E17F3F] shrink-0 mt-0.5 stroke-[1.75]" />
              <span className="leading-snug">جمهورية مصر العربية • شحن وتوصيل لكافة المحافظات</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-400 text-center sm:text-right">
          <p>© {new Date().getFullYear()} زخرفة - ديكورات مبتكرة. جميع الحقوق محفوظة.</p>
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span>أثاث عصري وتصاميم استثنائية</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
