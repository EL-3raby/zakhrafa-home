'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import {
  WhatsAppIcon,
  LuxuryShieldIcon,
  NaturalMaterialsIcon,
  ArchitectCompassIcon,
} from '@/components/common/BrandIcons';

export const HeroSection: React.FC = () => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201000000000';
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle parallax effect on the featured image on scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  // Headline staggered lines
  const headlineLine1 = 'فخامة التصميم..';
  const headlineLine2 = 'ولمسات مبتكرة تناسب ذوق منزلك';

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#EDF5F6]/40 via-white to-white py-12 md:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column (RTL Right side): Text & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-right">
            {/* Step 1: Pre-heading tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDF5F6] text-[#0B3D42] text-xs font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-[#E17F3F] inline-block animate-pulse" />
              <span>مجموعة أثاث 2026 الحصرية • تصاميم مخصصة</span>
            </motion.div>

            {/* Step 2: Staggered Headline Reveal */}
            <div className="space-y-1">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D42] leading-[1.2] tracking-tight"
                >
                  {headlineLine1}
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E17F3F] leading-[1.2] tracking-tight"
                >
                  {headlineLine2}
                </motion.h1>
              </div>
            </div>

            {/* Step 3: Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
              className="text-gray-600 text-base sm:text-lg max-w-2xl leading-relaxed"
            >
              اكتشف تشكيلة واسعة تضم أكثر من{' '}
              <span className="font-bold text-[#0B3D42]">200 قطعة وتصميم فاخر</span> من أرقى غرف
              المعيشة، السفرة، غرف النوم، والديكورات المبتكرة المصنوعة بأعلى معايير الجودة والمتانة.
            </motion.p>

            {/* Step 4: CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.75, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 bg-[#E17F3F] hover:bg-[#C96A2D] text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition duration-200 group"
              >
                <span>استكشف أقسام الكتالوج</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 stroke-[2]" />
              </Link>

              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white hover:bg-gray-50 text-[#0B3D42] border border-[#0B3D42]/30 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition duration-200 shadow-2xs"
              >
                <WhatsAppIcon className="w-4 h-4 fill-[#0B3D42]" />
                <span>استشارة وطلب تسعير فوري</span>
              </a>
            </motion.div>

            {/* Step 5: Trust indicators with clean stroke icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100"
            >
              <div className="flex items-start gap-2.5">
                <LuxuryShieldIcon className="w-5 h-5 text-[#0B3D42] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B3D42]">ضمان شامل</h4>
                  <p className="text-[11px] text-gray-500">على الهيكل والخامات</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <NaturalMaterialsIcon className="w-5 h-5 text-[#E17F3F] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B3D42]">خامات طبيعية</h4>
                  <p className="text-[11px] text-gray-500">خشب زان وأقمشة ممتازة</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ArchitectCompassIcon className="w-5 h-5 text-[#0B3D42] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B3D42]">تفصيل مخصص</h4>
                  <p className="text-[11px] text-gray-500">حسب مقاسات منزلك</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Featured Product Image with subtle Parallax */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Parallax Container */}
              <motion.div
                style={{ y: imageY }}
                className="relative aspect-[4/3] sm:aspect-[5/4] rounded-3xl overflow-hidden shadow-xl bg-slate-100"
              >
                <Image
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop"
                  alt="طقم صالون فاخر - زخرفة للديكورات والأثاث"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Floating Product Spotlight */}
              <div className="absolute -bottom-5 right-4 sm:-right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-3.5 max-w-xs">
                <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=300&auto=format&fit=crop"
                    alt="كنب عصري"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#E17F3F] block">
                    صالون إمبريال الفاخر
                  </span>
                  <p className="text-xs font-bold text-[#0B3D42] line-clamp-1">
                    تصميم عصري بخامات إيطالية
                  </p>
                  <p className="text-[10px] text-gray-400">تنفيذ متاح بكافة الألوان</p>
                </div>
              </div>

              {/* Counter Badge */}
              <div className="absolute -top-3 left-3 sm:-left-3 bg-[#0B3D42] text-white py-2 px-3.5 rounded-xl shadow-md flex items-center gap-2">
                <span className="text-lg font-black text-[#E17F3F]">+200</span>
                <span className="text-[11px] font-medium leading-tight">
                  تصميم حصري <br /> في الكتالوج
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
