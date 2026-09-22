'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import {
  ArrowLeft,
  HeartHandshake,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';
import {
  WoodGrainJoineryIcon,
  WovenFabricIcon,
  ArchitecturalDraftingIcon,
} from './ArtisanalIcons';

interface AboutHeroProps {
  whatsappNumber: string;
}

// Interactive Hotspots carefully positioned in the visible upper 60% of the furniture
const HOTSPOTS = [
  {
    id: 'wood',
    title: 'خشب زان أحمر روماني 100%',
    subtitle: 'هيكل مصمت مجفف حرارياً',
    desc: 'خشب طبيعي صلب خالي من الحشوات الرديئة، مجفف بنسب رطوبة دقيقة (8-10%) لمنع أي تقوس أو تصدع مدى الحياة.',
    icon: WoodGrainJoineryIcon,
    x: '28%',
    y: '42%',
    badge: '100% SOLID BEECH',
  },
  {
    id: 'fabric',
    title: 'أقمشة إيطالية معالجة',
    subtitle: 'مخمل وكتان فاخر ضد البقع',
    desc: 'معالجة ذكية بالألياف العازلة تمنع تسرب السوائل وتمنح ملمساً حريرياً فائق النعومة مع سهولة تامة في التنظيف.',
    icon: WovenFabricIcon,
    x: '72%',
    y: '46%',
    badge: 'STAIN-REPELLENT',
  },
  {
    id: 'craft',
    title: 'تفصيل معماري بالمليمتر',
    subtitle: 'أبعاد مخصصة لمساحتك أنت',
    desc: 'تعديل الأطوال، زوايا الانحناء، وارتفاع الجلسات بدقة هندسية تضمن استغلال كل مليمتر في غرفتك بشكل مثالي.',
    icon: ArchitecturalDraftingIcon,
    x: '50%',
    y: '26%',
    badge: 'CUSTOM FIT',
  },
];

export const AboutHero: React.FC<AboutHeroProps> = ({ whatsappNumber }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // 1. Scroll-driven Stage Dissolve (Smooth gradual fade out on scroll down)
  // ---------------------------------------------------------------------------
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth gradual dissolution starting at 30% scroll and fully dissolving by 80%
  const heroScale = useTransform(scrollYProgress, [0, 0.3, 0.8], [1, 1, 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 0, -50]);

  // ---------------------------------------------------------------------------
  // 2. High-Precision 3D Interactive Mouse Parallax (World-Class Studio Tilt)
  // ---------------------------------------------------------------------------
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setActiveHotspot(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[135vh] z-10"
    >
      {/* Pinned Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#FAF8F5] px-4 sm:px-6 lg:px-10 py-6">
        
        {/* Subtle Architectural Atmosphere Shaders */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,127,63,0.1),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(11,61,66,0.07),transparent_55%)] pointer-events-none" />
        
        {/* Architectural Fine Grid & Alignment Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b3d4206_1px,transparent_1px),linear-gradient(to_bottom,#0b3d4206_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Global Presentation Header / Slide Counter (Crystal Clear Typography) */}
        <div className="absolute top-4 right-6 sm:top-6 sm:right-10 flex items-center gap-2.5 text-stone-500 text-xs select-none">
          <span className="w-2 h-2 rounded-full bg-[#0B3D42]" />
          <span className="font-mono font-bold text-stone-600 text-[13px]">01 / 06</span>
          <span className="text-stone-300">•</span>
          <span className="font-sans font-semibold text-stone-700">مدخل الحكاية والمعمار</span>
          <span className="text-stone-300 hidden sm:inline">|</span>
          <span className="text-[#DE7635] font-mono font-bold text-[11px] hidden sm:inline tracking-wider">DAR ZAKHRAFA ATELIER</span>
        </div>

        {/* Main Stage Content */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity, y: contentY }}
          className="relative z-10 mx-auto max-w-7xl w-full will-change-[transform,opacity]"
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* ===================================================================== */}
            {/* RIGHT COLUMN: WORLD-CLASS EDITORIAL TYPOGRAPHY & BESPOKE ACTIONS */}
            {/* ===================================================================== */}
            <div className="lg:col-span-7 text-center sm:text-right">
              
              {/* Architectural Eyebrow Badge */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0B3D42]/5 border border-[#0B3D42]/15 text-[#0B3D42] text-xs font-bold shadow-2xs mb-5 sm:mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DE7635] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DE7635]" />
                </span>
                <span>دار تصميم للأثاث والديكور المعماري</span>
                <span className="text-stone-300">•</span>
                <span className="text-[#DE7635] font-mono font-bold tracking-wider">EST. 2021</span>
              </motion.div>

              {/* Master Title: Perfectly Balanced 2-Line Editorial Typography */}
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl xs:text-4xl sm:text-[40px] lg:text-[44px] xl:text-[48px] font-black text-[#0B3D42] tracking-tight leading-[1.32] sm:leading-[1.3] mb-6"
                style={{ fontFamily: 'var(--font-alexandria), sans-serif' }}
              >
                <span>نختار التفاصيل التي تجعل البيت أحنّ،</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-l from-[#B45309] via-[#C96627] to-[#DE7635] mt-2">
                  ونبني أثاثاً راقياً يعيش لأجيال.
                </span>
              </motion.h1>

              {/* Poetic & Articulate Manifesto Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-stone-600 text-sm sm:text-base lg:text-[16.5px] leading-[1.88] max-w-xl mx-auto sm:mx-0 font-normal mb-8 text-right"
              >
                في «زخرفة»، لا نصنع قطعاً تملأ المساحات فحسب، بل نصيغ هوية متكاملة لبيتك. ندمج أصالة خشب الزان الأحمر الروماني المصمت مع دقة التفصيل المعماري بالمليمتر وأفخم الأقمشة الإيطالية، لنمنح منزلك دفئاً وتفرداً يدوم لعقود.
              </motion.p>

              {/* Bespoke Luxury CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-8"
              >
                <Link
                  href="/categories"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0B3D42] hover:bg-[#12555C] text-white text-xs sm:text-sm font-black shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-98 overflow-hidden"
                >
                  <span className="relative z-10">استكشف كتالوج المجموعات</span>
                  <ArrowLeft className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:-translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>

                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    'مرحباً زخرفة، أود الاستفسار عن خدمات التصميم والتفصيل المخصص لديكم.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full border border-stone-300/90 hover:border-[#DE7635]/60 bg-white/95 hover:bg-white text-[#0B3D42] text-xs sm:text-sm font-bold transition-all duration-200 shadow-2xs active:scale-98"
                >
                  <HeartHandshake className="w-4 h-4 text-[#DE7635]" />
                  <span>استشارة خاصة مع مهندس التصميم</span>
                </a>
              </motion.div>

              {/* Minimalist Architectural Specs Footnote Strip (High Contrast & Clear) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="pt-5 flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-5 text-xs font-bold text-[#0B3D42] border-t border-stone-200/90"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#DE7635] shrink-0" />
                  <span>خشب زان روماني طبيعي 100%</span>
                </div>
                <span className="text-stone-300 hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0B3D42] shrink-0" />
                  <span>أقمشة إيطالية معالجة ضد البقع</span>
                </div>
                <span className="text-stone-300 hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ضمان معتمد 5 أعوام</span>
                </div>
              </motion.div>
            </div>

            {/* ===================================================================== */}
            {/* LEFT COLUMN: 3D INTERACTIVE SPATIAL ATELIER SHOWCASE (GLOBAL STUDIO) */}
            {/* ===================================================================== */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center lg:justify-end relative"
            >
              {/* 3D Perspective Container */}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-[4/4.8] select-none"
                style={{ perspective: 1400 }}
              >
                {/* Terracotta Architectural Foundation Shadow Backing */}
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#DE7635] to-[#B35218] translate-x-3.5 translate-y-3.5 sm:translate-x-4 sm:translate-y-4 shadow-2xl border border-[#C56526] -z-20" />

                {/* Primary Tiltable Architectural Frame */}
                <motion.div
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                  }}
                  className="relative w-full h-full rounded-[32px] bg-[#1C2826] border border-stone-200/60 shadow-[0_20px_50px_-15px_rgba(11,61,66,0.3)] overflow-hidden"
                >
                  {/* Master Living Setting Visual (Curated Architectural Interior) */}
                  <Image
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop"
                    alt="طقم صالون وأثاث معماري فاخر من دار زخرفة"
                    fill
                    sizes="(max-width: 768px) 100vw, 460px"
                    priority
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />

                  {/* Deep Spatial Lighting & Vignette Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(222,118,53,0.25),transparent_55%)] pointer-events-none" />

                  {/* Top Live Studio Status Pill (Clean and Centered without any clipping) */}
                  <div className="absolute top-4 inset-x-0 flex justify-center pointer-events-none z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white text-xs font-medium shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-sans">ورشة التصميم والتفصيل نشطة</span>
                      <span className="text-white/40">•</span>
                      <span className="text-[#F3B084] font-mono text-[11px] font-bold">100% BESPOKE</span>
                    </div>
                  </div>

                  {/* ================================================================= */}
                  {/* INTERACTIVE CRAFTSMANSHIP HOTSPOTS (Positioned in Visible Area) */}
                  {/* ================================================================= */}
                  {HOTSPOTS.map((spot) => {
                    const Icon = spot.icon;
                    const isActive = activeHotspot === spot.id;

                    return (
                      <div
                        key={spot.id}
                        style={{ left: spot.x, top: spot.y }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                      >
                        {/* Hotspot Pulse Node */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHotspot(isActive ? null : spot.id);
                          }}
                          onMouseEnter={() => setActiveHotspot(spot.id)}
                          aria-label={spot.title}
                          className="relative flex items-center justify-center w-9 h-9 rounded-full focus:outline-none group cursor-pointer"
                        >
                          <span className="absolute inset-0 rounded-full bg-[#DE7635] opacity-60 animate-ping" />
                          <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#0B3D42] shadow-xl border-2 border-[#DE7635] transition-transform group-hover:scale-115">
                            <Icon className="w-4 h-4 text-[#DE7635]" />
                          </span>
                        </button>

                        {/* Interactive Tooltip Card */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: 8 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: 6 }}
                              transition={{ duration: 0.2 }}
                              className="absolute bottom-11 right-1/2 translate-x-1/2 w-64 p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-stone-200 shadow-2xl text-right z-50 pointer-events-auto"
                            >
                              <div className="flex items-center justify-between mb-1.5 border-b border-stone-100 pb-1.5">
                                <span className="text-[10px] font-mono font-bold text-[#DE7635] bg-[#DE7635]/10 px-2 py-0.5 rounded-md">
                                  {spot.badge}
                                </span>
                                <span className="text-xs font-bold text-[#0B3D42]">
                                  {spot.subtitle}
                                </span>
                              </div>
                              <h4 className="text-xs font-black text-[#0B3D42] mb-1">
                                {spot.title}
                              </h4>
                              <p className="text-[11px] text-stone-600 leading-relaxed font-normal">
                                {spot.desc}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                  {/* ================================================================= */}
                  {/* BOTTOM FLOATING ARTISANAL HALLMARK GLASS CARD */}
                  {/* ================================================================= */}
                  <div className="absolute bottom-3.5 inset-x-3.5 p-4 sm:p-4.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-2xl text-right z-20">
                    
                    {/* Brand & Guarantee Row */}
                    <div className="flex items-center justify-between border-b border-stone-200/70 pb-2.5 mb-2.5">
                      <div className="flex items-center gap-2">
                        <BrandLogo className="h-6 sm:h-7 w-auto" theme="light" />
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B3D42]/5 border border-[#0B3D42]/15 text-xs font-bold text-[#0B3D42]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#DE7635]" />
                        <span>ضمان 5 سنوات شامل</span>
                      </div>
                    </div>

                    {/* Architectural Specifications Pill Grid with high visibility */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="py-2 px-1 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col items-center gap-1">
                        <WoodGrainJoineryIcon className="w-4 h-4 text-[#DE7635]" />
                        <span className="text-xs font-bold text-[#0B3D42] truncate w-full">خشب زان طبيعي</span>
                      </div>
                      <div className="py-2 px-1 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col items-center gap-1">
                        <WovenFabricIcon className="w-4 h-4 text-[#0B3D42]" />
                        <span className="text-xs font-bold text-[#0B3D42] truncate w-full">أقمشة ضد البقع</span>
                      </div>
                      <div className="py-2 px-1 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col items-center gap-1">
                        <ArchitecturalDraftingIcon className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-[#0B3D42] truncate w-full">تفصيل بالمليمتر</span>
                      </div>
                    </div>

                    {/* Interactive Hint Footer */}
                    <div className="mt-2.5 pt-2 border-t border-stone-200/70 flex items-center justify-between text-xs text-stone-500 font-medium">
                      <span className="flex items-center gap-1.5 text-[#DE7635] font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-[#DE7635]" />
                        <span>انقر على النقاط لاكتشاف أسرار الصنعة</span>
                      </span>
                      <span className="font-mono text-stone-400 font-bold text-[11px]">EST. 2021</span>
                    </div>
                  </div>

                </motion.div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};
