import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, ArrowUpLeft } from 'lucide-react';
import { WhatsAppIcon, FacebookIcon, InstagramIcon } from './BrandIcons';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201000000000';
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com';
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com';

  const categories = [
    { name: 'غرف المعيشة والصالونات', href: '/categories/living-rooms' },
    { name: 'غرف السفرة وطاولات الطعام', href: '/categories/dining-rooms' },
    { name: 'غرف النوم الفاخرة', href: '/categories/bedrooms' },
    { name: 'طاولات القهوة والكونسول', href: '/categories/tables-consoles' },
    { name: 'الديكورات واللمسات المبتكرة', href: '/categories/decor-accessories' },
    { name: 'تفصيل خاص ومشاريع متكاملة', href: '/categories/custom-projects' },
  ];

  const quickLinks = [
    { name: 'عن زخرفة', href: '/' },
    { name: 'كتالوج المنتجات', href: '/categories' },
    { name: 'العروض الحصرية', href: '/categories?offers=true' },
    { name: 'تواصل واستفسار', href: '/#contact' },
  ];

  return (
    <footer id="contact" className="bg-[#0B3D42] text-white pt-16 pb-8 border-t-2 border-[#E17F3F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#12555C]">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group py-1" aria-label="زخرفة - ZAKHRAFA">
              <BrandLogo className="h-12 sm:h-14 w-auto" theme="dark" />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed">
              علامة تجارية متخصصة في ابتكار أرقى قطع الأثاث والديكورات العصرية. نجمع بين الأناقة والفخامة لنصنع لك مساحة تعبر عن ذوقك الرفيع.
            </p>
            <div className="pt-1">
              <span className="inline-block px-3 py-1 rounded-md bg-white/10 text-xs text-[#E17F3F] font-semibold">
                أكثر من 200 تصميم حصري
              </span>
            </div>

            {/* Social Media Strip */}
            <div className="pt-2">
              <span className="text-xs text-slate-300 block mb-2.5 font-medium">تابعونا على منصات التواصل:</span>
              <div className="flex items-center gap-2.5">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="فيسبوك زخرفة"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#1877F2] text-slate-200 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-[#1877F2] hover:scale-110 active:scale-95 shadow-2xs"
                  title="فيسبوك"
                >
                  <FacebookIcon className="w-4 h-4 fill-current" />
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="إنستغرام زخرفة"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-slate-200 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-transparent hover:scale-110 active:scale-95 shadow-2xs"
                  title="إنستغرام"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="واتساب زخرفة"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#25D366] text-slate-200 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-[#25D366] hover:scale-110 active:scale-95 shadow-2xs"
                  title="واتساب"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                </a>
              </div>
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E17F3F]" />
              أقسام الكتالوج
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <a
                    href={cat.href}
                    className="hover:text-[#E17F3F] transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <ArrowUpLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#E17F3F] stroke-[1.5] transition-transform group-hover:-translate-x-0.5" />
                    <span>{cat.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E17F3F]" />
              روابط سريعة
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#E17F3F] transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <ArrowUpLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#E17F3F] stroke-[1.5] transition-transform group-hover:-translate-x-0.5" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E17F3F]" />
              تواصل واستفسار
            </h3>
            <p className="text-xs text-slate-300">
              يسعدنا استقبال استفساراتكم ومساعدتكم في اختيار ومواءمة التصميم المناسب.
            </p>
            <div className="space-y-3 text-xs">
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-200 hover:text-[#E17F3F] transition"
              >
                <WhatsAppIcon className="w-4 h-4 fill-[#E17F3F]" />
                <span>واتساب مباشر لطلبات الكتالوج</span>
              </a>

              <a
                href={`tel:${whatsappNumber.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-3 text-slate-200 hover:text-[#E17F3F] transition"
              >
                <Phone className="w-4 h-4 text-[#E17F3F] stroke-[1.75]" />
                <span>اتصل بنا</span>
              </a>

              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-slate-400 stroke-[1.75]" />
                <span>جمهورية مصر العربية • شحن وتوصيل لكافة المحافظات</span>
              </div>

              {/* Social Media Quick Badges */}
              <div className="pt-2 flex items-center gap-2">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#1877F2] text-slate-300 hover:text-white border border-white/10 transition text-xs font-medium"
                  title="صفحتنا على فيسبوك"
                >
                  <FacebookIcon className="w-3.5 h-3.5 fill-current" />
                  <span>فيسبوك</span>
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-slate-300 hover:text-white border border-white/10 transition text-xs font-medium"
                  title="حسابنا على إنستغرام"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>إنستغرام</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} زخرفة - ديكورات مبتكرة. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <span>أثاث عصري وتصاميم استثنائية</span>
            <span>•</span>
            <Link
              href="/admin"
              className="text-slate-400 hover:text-white transition underline underline-offset-4"
            >
              دخول الإدارة
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
