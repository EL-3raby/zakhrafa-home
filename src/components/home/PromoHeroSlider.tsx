'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ArrowLeft, Tag } from 'lucide-react';
import { WhatsAppIcon } from '@/components/common/BrandIcons';
import { createClient } from '@/lib/supabase/client';
import { HeroSlideRecord } from '@/types/database';

interface PromoHeroSliderProps {
  initialSlides?: HeroSlideRecord[];
}

export const PromoHeroSlider: React.FC<PromoHeroSliderProps> = ({ initialSlides = [] }) => {
  const [slides, setSlides] = useState<HeroSlideRecord[]>(initialSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201000000000';

  // Fetch dynamic hero slides from Supabase
  useEffect(() => {
    let isMounted = true;

    async function loadSlides() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('hero_slides')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error loading hero slides:', error);
          if (isMounted) setSlides([]);
          return;
        }

        if (isMounted) {
          setSlides((data as HeroSlideRecord[]) || []);
        }
      } catch (err) {
        console.error('Failed to load hero slides:', err);
        if (isMounted) setSlides([]);
      }
    }

    loadSlides();

    // Supabase Realtime update for live changes from admin
    try {
      const supabase = createClient();
      const channel = supabase
        .channel('realtime-hero-slides')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'hero_slides' },
          () => {
            loadSlides();
          }
        )
        .subscribe();

      return () => {
        isMounted = false;
        supabase.removeChannel(channel);
      };
    } catch {
      return () => {
        isMounted = false;
      };
    }
  }, []);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Adjust currentSlide index if slides array changes
  useEffect(() => {
    if (totalSlides > 0 && currentSlide >= totalSlides) {
      setCurrentSlide(0);
    }
  }, [currentSlide, totalSlides]);

  // Auto play (longer interval for videos)
  useEffect(() => {
    if (!isAutoPlay || totalSlides <= 1) return;
    const currentMediaIsVideo = slides[currentSlide]?.media_type === 'video';
    const intervalMs = currentMediaIsVideo ? 9000 : 6000;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlay, nextSlide, currentSlide, slides, totalSlides]);

  if (slides.length === 0) {
    return null;
  }

  const slide = slides[currentSlide] || slides[0];
  if (!slide) return null;

  return (
    <section
      className="relative w-full pt-6 sm:pt-8 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="عروض وتخفيضات زخرفة"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Banner Outer Card - Wide Landscape on Mobile (~2.1:1), Spacious Hero on Desktop */}
      <div className="relative w-full aspect-[2.1/1] sm:aspect-auto min-h-[190px] xs:min-h-[210px] sm:min-h-[520px] lg:min-h-[560px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100/20 bg-[#0B3D42] text-white flex flex-col justify-between">
        {/* Slide Background Images or Videos with Fade Transition */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute inset-0 z-0 overflow-hidden"
          >
            {slide.media_type === 'video' ? (
              <video
                src={slide.media_url}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <Image
                src={slide.media_url}
                alt={slide.title}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
            )}

            {/* Multi-stage High-Contrast Gradient Overlays: reveals left-side furniture image/video on mobile */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#0B3D42]/95 via-[#0B3D42]/75 to-transparent via-60% sm:bg-gradient-to-r sm:from-[#0B3D42]/95 sm:via-[#0B3D42]/85 sm:to-transparent sm:via-45% to-90%" />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
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
                {slide.badge && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full bg-[#E17F3F] text-white text-[9px] xs:text-[10px] sm:text-sm font-bold shadow-xs">
                    <Tag className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 stroke-[2]" />
                    <span>{slide.badge}</span>
                  </span>
                )}

                {slide.discount_percentage && (
                  <span className="px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-[9px] xs:text-[10px] sm:text-xs font-semibold border border-white/30">
                    {slide.discount_percentage}
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-0.5">
                <h2 className="text-xs xs:text-sm sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight line-clamp-1">
                  {slide.title}
                </h2>
                {slide.subtitle && (
                  <p className="text-[#F3B084] text-[10px] xs:text-xs sm:text-lg font-semibold line-clamp-1">
                    {slide.subtitle}
                  </p>
                )}
              </div>

              {/* Description (Desktop only) */}
              {slide.description && (
                <p className="hidden sm:block text-slate-200 text-xs sm:text-sm leading-relaxed line-clamp-2 max-w-xl">
                  {slide.description}
                </p>
              )}

              {/* Big Price Showcase */}
              {slide.starting_price && (
                <div className="pt-0.5 sm:pt-2 flex items-baseline gap-1.5 sm:gap-3">
                  <div className="bg-black/40 backdrop-blur-xs px-2 py-0.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-2xl border border-white/15 inline-flex items-baseline gap-1 sm:gap-2">
                    <span className="text-[9px] xs:text-[10px] sm:text-sm font-semibold text-slate-300">
                      {slide.highlight_tag || 'أطقم معيشة تبدأ من'}
                    </span>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-sm xs:text-base sm:text-4xl lg:text-5xl font-black text-[#E17F3F] tracking-tight">
                        {slide.starting_price}
                      </span>
                      <span className="text-[9px] xs:text-[10px] sm:text-sm font-bold text-slate-300">ج.م</span>
                    </div>
                  </div>

                  {slide.original_price && (
                    <span className="text-[9px] xs:text-[10px] sm:text-base text-slate-300 line-through">
                      بدلاً من {slide.original_price} ج.م
                    </span>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-3 pt-0.5 sm:pt-2">
                <Link
                  href={slide.link || '/'}
                  className="inline-flex items-center gap-1 sm:gap-2 bg-[#E17F3F] hover:bg-[#C96A2D] text-white px-2.5 py-1 sm:px-8 sm:py-3.5 rounded-md sm:rounded-xl font-bold text-[10px] xs:text-xs sm:text-base shadow-xs hover:shadow-lg transition duration-200 group"
                >
                  <span>{slide.cta_text || 'استكشف العروض'}</span>
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1 stroke-[2]" />
                </Link>

                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `مرحباً زخرفة، أود الاستفسار عن عرض: ${slide.title} (${slide.highlight_tag || 'يبدأ من'} ${slide.starting_price || ''} ج.م)`
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
        {totalSlides > 1 && (
          <>
            {/* Right Arrow (Next in RTL) */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="العرض السابق"
              className="absolute right-1.5 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition hover:scale-105 active:scale-95 shadow-md cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>

            {/* Left Arrow (Prev in RTL) */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label="العرض التالي"
              className="absolute left-1.5 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition hover:scale-105 active:scale-95 shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>
          </>
        )}

        {/* Bottom Slide Indicators / Pagination Dots */}
        {totalSlides > 1 && (
          <div className="relative z-10 px-6 sm:px-10 pb-5 sm:pb-6 flex items-center justify-center gap-2">
            {slides.map((s, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={s.id || idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`الانتقال إلى الشريحة ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive ? 'w-8 bg-[#E17F3F]' : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
