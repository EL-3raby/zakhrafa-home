'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, Compass, HeartHandshake, ShieldCheck, Sparkles, Award, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';
import { WoodGrainJoineryIcon, WovenFabricIcon, ArchitecturalDraftingIcon } from './ArtisanalIcons';

interface AboutHeroProps {
  whatsappNumber: string;
}

export const AboutHero: React.FC<AboutHeroProps> = ({ whatsappNumber }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Fast, instant, lag-free scroll disappearance
  const heroScale = useTransform(scrollYProgress, [0, 0.4, 0.85], [1, 1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.85], [1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4, 0.85], [0, 0, -45]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen sm:h-[125vh] z-10"
    >
      {/* Pinned Viewport Stage */}
      <div className="relative sm:sticky sm:top-0 min-h-screen w-full flex flex-col justify-center items-center overflow-visible sm:overflow-hidden bg-[#FAF8F5] px-4 sm:px-6 lg:px-8 py-16 sm:py-6">
        {/* Zero-lag GPU Radial Gradient Glows (No blur filter penalty) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,127,63,0.12),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(11,61,66,0.08),transparent_60%)] pointer-events-none" />

        {/* Architectural Fine Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(11,61,66,0.03)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

        {/* Chapter Marker */}
        <div className="absolute top-4 right-6 sm:top-6 sm:right-10 flex items-center gap-2 text-stone-400 text-xs font-mono select-none">
          <span className="w-2 h-2 rounded-full bg-[#0B3D42]" />
          <span>01 / 06 • مدخل الحكاية والمعمار</span>
        </div>

        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity, y: contentY }}
          className="relative z-10 mx-auto max-w-7xl w-full will-change-[transform,opacity]"
        >
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ===================================================================== */}
          {/* RIGHT: HEADLINE, PHILOSOPHY & BESPOKE CTAS */}
          {/* ===================================================================== */}
          <div className="lg:col-span-7 text-center sm:text-right">
            
            {/* Heritage Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex max-w-full flex-wrap items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0B3D42]/5 border border-[#0B3D42]/15 text-[#0B3D42] text-xs font-bold shadow-2xs mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E17F3F]" />
              <span>دار تصميم للأثاث والديكور المعماري</span>
              <span className="text-stone-300">•</span>
              <span className="text-[#E17F3F] font-mono">EST. 2021</span>
            </motion.div>

            {/* Architectural Headline with generous line height */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-[46px] xl:text-[52px] font-black text-[#0B3D42] tracking-tight leading-[1.38] sm:leading-[1.34] mb-6"
              style={{ fontFamily: 'var(--font-alexandria), sans-serif' }}
            >
              نختار التفاصيل التي تجعل البيت أحنّ،{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#C85D1A] via-[#E17F3F] to-[#D97706] block sm:inline mt-1">
                ونبني أثاثاً يعيش لأجيال.
              </span>
            </motion.h1>

            {/* Refined Paragraph with breathable leading */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-stone-600 text-sm sm:text-base lg:text-[17px] leading-[1.85] max-w-xl mx-auto sm:mx-0 font-normal mb-8"
            >
              زخرفة ليست مجرد معرض لبيع الأثاث، بل دار تصميم تجمع بين أصالة خشب الزان الأحمر الروماني، ودقة التفصيل المعماري بالمليمتر، وأقمشة إيطالية فاخرة تصنع مساحة تشبه شخصيتك وتعبر عن ذوقك.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-8"
            >
              <Link
                href="/categories"
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0B3D42] hover:bg-[#12555C] text-white text-xs sm:text-sm font-black shadow-lg hover:shadow-xl transition-all duration-200 group active:scale-98"
              >
                <span>استكشف كتالوج المجموعات</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </Link>

              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  'مرحباً زخرفة، أود التعرف أكثر على خدمات التصميم والتفصيل المخصص لديكم.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-5 py-3.5 rounded-full border border-[#0B3D42]/20 hover:border-[#0B3D42]/40 bg-white/90 hover:bg-white text-[#0B3D42] text-xs sm:text-sm font-bold transition-all duration-200 shadow-2xs active:scale-98"
              >
                <HeartHandshake className="w-4 h-4 text-[#E17F3F]" />
                <span>تحدث مع مهندس التصميم</span>
              </a>
            </motion.div>

            {/* Three Craft Assurance Mini Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-3 text-xs font-bold text-[#0B3D42]/80 border-t border-stone-200/80"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E17F3F]" />
                <span>خشب زان روماني طبيعي 100%</span>
              </div>
              <span className="text-stone-300">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0B3D42]" />
                <span>أقمشة معالجة ضد البقع</span>
              </div>
              <span className="text-stone-300">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>ضمان 5 سنوات معتمد</span>
              </div>
            </motion.div>
          </div>

          {/* ===================================================================== */}
          {/* LEFT: THE ATELIER MOODBOARD & CRAFTSMANSHIP COMPOSITION */}
          {/* ===================================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
          >
            {/* Composition Container */}
            <div className="relative w-full max-w-[360px] sm:max-w-[400px]">
              
              {/* Terracotta Foundation Offset Backing */}
              <div className="absolute inset-0 rounded-3xl bg-[#DE7635] translate-x-3.5 translate-y-3.5 sm:translate-x-4 sm:translate-y-4 shadow-2xl border border-[#C56526] -z-10" />

              {/* Main Atelier Card with generous breathing room */}
              <div className="relative rounded-3xl bg-[#FFFDF9] border border-stone-200/90 shadow-2xl p-7 sm:p-8 space-y-6 text-right overflow-hidden">
                
                {/* Background Watermark */}
                <div className="absolute -bottom-10 -left-10 w-44 h-44 opacity-5 pointer-events-none text-[#0B3D42]">
                  <WoodGrainJoineryIcon className="w-full h-full" />
                </div>

                {/* Top Row: Brand Monogram & Seal */}
                <div className="flex items-center justify-between border-b border-stone-200/70 pb-4">
                  <div className="flex items-center gap-2">
                    <BrandLogo className="h-8 sm:h-9 w-auto" theme="light" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-500 font-mono text-[11px] font-bold">
                    <span>EST. 2021</span>
                  </div>
                </div>

                {/* Craftsmanship Manifesto Quote */}
                <div className="space-y-2.5 py-2">
                  <span className="text-xs font-bold text-[#E17F3F] block tracking-wide">
                    فلسفة بيت زخرفة
                  </span>
                  <p className="text-base sm:text-lg font-black text-[#0B3D42] leading-[1.65]">
                    «البيت ليس جدراناً تُملأ، بل مشاعر تُصاغ بكل قطعة تختارها.»
                  </p>
                </div>

                {/* Three Architectural Specifications Badges with generous spacing */}
                <div className="space-y-3 pt-3 border-t border-stone-200/70 text-xs">
                  <div className="flex items-start justify-between gap-3 py-3 px-3.5 rounded-xl bg-stone-50/80 border border-stone-200/60">
                    <div className="flex min-w-0 items-start gap-2.5 font-bold text-[#0B3D42]">
                      <WoodGrainJoineryIcon className="w-4 h-4 text-[#E17F3F]" />
                      <span className="min-w-0">هياكل خشب زان أحمر مصمت</span>
                    </div>
                    <span className="text-[11px] font-bold text-stone-400 font-mono">100% SOLID</span>
                  </div>

                  <div className="flex items-start justify-between gap-3 py-3 px-3.5 rounded-xl bg-stone-50/80 border border-stone-200/60">
                    <div className="flex min-w-0 items-start gap-2.5 font-bold text-[#0B3D42]">
                      <WovenFabricIcon className="w-4 h-4 text-[#0B3D42]" />
                      <span className="min-w-0">أقمشة إيطالية معالجة ضد البقع</span>
                    </div>
                    <span className="text-[11px] font-bold text-stone-400 font-mono">STAIN-FREE</span>
                  </div>

                  <div className="flex items-start justify-between gap-3 py-3 px-3.5 rounded-xl bg-stone-50/80 border border-stone-200/60">
                    <div className="flex min-w-0 items-start gap-2.5 font-bold text-[#0B3D42]">
                      <ArchitecturalDraftingIcon className="w-4 h-4 text-emerald-600" />
                      <span className="min-w-0">تفصيل بالمقاس والمليمتر</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 font-mono">CUSTOM FIT</span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-stone-200/70 flex items-center justify-between text-[11px] text-stone-500 font-medium">
                  <span>صناعة تدوم لأجيال</span>
                  <span className="font-black text-[#0B3D42]">ضمان 5 سنوات شامل</span>
                </div>
              </div>

              {/* Floating Wax Stamp Tag */}
              <div className="absolute -bottom-3 -right-3 sm:-right-4 px-3 py-1.5 rounded-full bg-[#0B3D42] text-white text-[11px] font-bold shadow-xl border-2 border-white flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#E17F3F]" />
                <span>صنعة مصرية بأيدي محترفين</span>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
      </div>
    </div>
  );
};
