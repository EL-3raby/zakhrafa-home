'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ArrowLeft, Tag } from 'lucide-react';
import { WhatsAppIcon } from '@/components/common/BrandIcons';

interface PromoSlide {
  id: string;
  badge: string;
  badgeType?: 'hot' | 'new' | 'limited';
  title: string;
  subtitle: string;
  description: string;
  startingPrice: string;
  originalPrice?: string;
  discountPercentage?: string;
  link: string;
  ctaText: string;
  image: string;
  imageAlt: string;
  highlightTag: string;
}

const PROMO_SLIDES: PromoSlide[] = [
  {
    id: 'slide-living',
    badge: 'مهرجان عروض الموسم • خصومات حصرية',
    badgeType: 'hot',
    title: 'أطقم صالونات ومعيشة فاخرة',
    subtitle: 'أناقة تدوم في كل تفصيلة',
    description:
      'أطقم كنب زاوية ومودرن مصنوعة من خشب الزان الطبيعي وأقمشة إيطالية مقاومة للبقع والاهتراء مع ضمان 5 سنوات.',
    startingPrice: '11,990',
    originalPrice: '16,500',
    discountPercentage: 'خصم 30%',
    link: '/categories/living-rooms',
    ctaText: 'استكشف عروض الصالونات',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'طقم صالون فخم - عروض زخرفة للأثاث',
    highlightTag: 'أطقم معيشة تبدأ من',
  },
  {
    id: 'slide-bedroom',
    badge: 'مهرجان الصيف والتجديد • تشكيلة ملكية',
    badgeType: 'limited',
    title: 'غرف نوم رئيسية متكاملة',
    subtitle: 'راحة فندقية وتصميم استثنائي',
    description:
      'سرير فندقي كينج مع خزانة ملابس دريسنج روم وتسريحة بتشطيبات أخشاب ورخام طبيعي لتجربة نوم لا تضاهى.',
    startingPrice: '18,490',
    originalPrice: '24,000',
    discountPercentage: 'خصم 25%',
    link: '/categories/bedrooms',
    ctaText: 'استكشف غرف النوم',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'غرفة نوم فاخرة - مهرجان العروض زخرفة',
    highlightTag: 'غرف نوم تبدأ من',
  },
  {
    id: 'slide-dining',
    badge: 'أناقة الضيافة • تسليم فوري وتفصيل',
    badgeType: 'new',
    title: 'طاولات سفرة رخام طبيعي',
    subtitle: 'فخامة الاستقبال وكرم الضيافة',
    description:
      'طاولات طعام مع 6 و 8 كراسي مبطنة ومريحة، قواعد ستانلس ستيل معالجة ضد الخدوش ولمسات خشبية راقية.',
    startingPrice: '8,750',
    originalPrice: '12,200',
    discountPercentage: 'وفر 3,450 ج.م',
    link: '/categories/dining-rooms',
    ctaText: 'استكشف طاولات السفرة',
    image:
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'طاولة طعام رخام طبيعي فاخرة',
    highlightTag: 'طاولات سفرة تبدأ من',
  },
];

export const PromoHeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201000000000';

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % PROMO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + PROMO_SLIDES.length) % PROMO_SLIDES.length);
  }, []);

  // Auto play
  useEffect(() => {
    if (!isAutoPlay) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlay, nextSlide]);

  const slide = PROMO_SLIDES[currentSlide];

  return (
    <section
      className="relative w-full pt-6 sm:pt-8 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="عروض وتخفيضات زخرفة"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Banner Outer Card - Wide Landscape on Mobile (~2.1:1), Spacious Hero on Desktop */}
      <div className="relative w-full aspect-[2.1/1] sm:aspect-auto min-h-[190px] xs:min-h-[210px] sm:min-h-[520px] lg:min-h-[560px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100/20 bg-[#0B3D42] text-white flex flex-col justify-between">
        {/* Slide Background Images with Fade Transition */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center"
            />
            {/* Multi-stage High-Contrast Gradient Overlays: reveals left-side furniture image on mobile */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#0B3D42]/95 via-[#0B3D42]/75 to-transparent via-60% sm:bg-gradient-to-r sm:from-[#0B3D42]/95 sm:via-[#0B3D42]/85 sm:to-transparent sm:via-45% to-90%" />
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Content Layer */}
        <div className="relative z-10 p-3 xs:p-4 sm:p-10 lg:p-14 flex-1 flex flex-col justify-center max-w-[70%] sm:max-w-2xl text-right">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="space-y-1 xs:space-y-1.5 sm:space-y-5"
            >
              {/* Badge & Discount Tag */}
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full bg-[#E17F3F] text-white text-[9px] xs:text-[10px] sm:text-sm font-bold shadow-xs">
                  <Tag className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 stroke-[2]" />
                  <span>{slide.badge}</span>
                </span>

                {slide.discountPercentage && (
                  <span className="px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-[9px] xs:text-[10px] sm:text-xs font-semibold border border-white/30">
                    {slide.discountPercentage}
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-0.5">
                <h2 className="text-xs xs:text-sm sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight line-clamp-1">
                  {slide.title}
                </h2>
                <p className="text-[#F3B084] text-[10px] xs:text-xs sm:text-lg font-semibold line-clamp-1">
                  {slide.subtitle}
                </p>
              </div>

              {/* Description (Desktop only) */}
              <p className="hidden sm:block text-slate-200 text-xs sm:text-sm leading-relaxed line-clamp-2 max-w-xl">
                {slide.description}
              </p>

              {/* Big Price Showcase */}
              <div className="pt-0.5 sm:pt-2 flex items-baseline gap-1.5 sm:gap-3">
                <div className="bg-black/40 backdrop-blur-xs px-2 py-0.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-2xl border border-white/15 inline-flex items-baseline gap-1 sm:gap-2">
                  <span className="text-[9px] xs:text-[10px] sm:text-sm font-semibold text-slate-300">
                    {slide.highlightTag}
                  </span>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-sm xs:text-base sm:text-4xl lg:text-5xl font-black text-[#E17F3F] tracking-tight">
                      {slide.startingPrice}
                    </span>
                    <span className="text-[9px] xs:text-[10px] sm:text-sm font-bold text-slate-300">ج.م</span>
                  </div>
                </div>

                {slide.originalPrice && (
                  <span className="text-[9px] xs:text-[10px] sm:text-base text-slate-300 line-through">
                    بدلاً من {slide.originalPrice} ج.م
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-3 pt-0.5 sm:pt-2">
                <Link
                  href={slide.link}
                  className="inline-flex items-center gap-1 sm:gap-2 bg-[#E17F3F] hover:bg-[#C96A2D] text-white px-2.5 py-1 sm:px-8 sm:py-3.5 rounded-md sm:rounded-xl font-bold text-[10px] xs:text-xs sm:text-base shadow-xs hover:shadow-lg transition duration-200 group"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1 stroke-[2]" />
                </Link>

                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `مرحباً زخرفة، أود الاستفسار عن عرض: ${slide.title} (${slide.highlightTag} ${slide.startingPrice} ج.م)`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden xs:inline-flex items-center gap-1 sm:gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white border border-white/25 px-2 py-1 sm:px-6 sm:py-3.5 rounded-md sm:rounded-xl font-semibold text-[10px] xs:text-xs sm:text-base transition duration-200"
                >
                  <WhatsAppIcon className="w-3 h-3 sm:w-4 sm:h-4 fill-white" />
                  <span>طلب واتساب</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Arrows */}
        {/* Right Arrow (Next in RTL) */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="العرض السابق"
          className="absolute right-1.5 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition hover:scale-105 active:scale-95 shadow-md"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>

        {/* Left Arrow (Prev in RTL) */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="العرض التالي"
          className="absolute left-1.5 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition hover:scale-105 active:scale-95 shadow-md"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>

        {/* Bottom Slide Indicators / Pagination Dots */}
        <div className="relative z-10 px-6 sm:px-10 pb-5 sm:pb-6 flex items-center justify-center gap-2">
          {PROMO_SLIDES.map((s, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`الانتقال إلى الشريحة ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  isActive ? 'w-8 bg-[#E17F3F]' : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
