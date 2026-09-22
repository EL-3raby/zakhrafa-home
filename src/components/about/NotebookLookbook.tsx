'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrandLogo } from '@/components/common/BrandLogo';
import { ChevronUp, ChevronDown, BookOpen, Sparkles } from 'lucide-react';

interface NotebookPageData {
  pageNumber: string;
  total: string;
  tagline: string;
  title: string;
  subtitle: string;
  description: string;
  highlightLeft: string;
  highlightRight: string;
  accentDotColor: string;
}

const LOOKBOOK_PAGES: NotebookPageData[] = [
  {
    pageNumber: '01',
    total: '03',
    tagline: 'INNOVATIVE DECORATIONS',
    title: 'زخرفة',
    subtitle: 'أثاث وديكور بطابعك الخاص.',
    description: 'نختار التفاصيل التي تجعل البيت أحنّ، ونجمع بين أصالة الحرفة ولمسات الذوق المعاصر لتشعر بالانتماء في كل زاوية.',
    highlightLeft: 'منذ 2021',
    highlightRight: 'مساحات تشبه أصحابها',
    accentDotColor: '#0B3D42',
  },
  {
    pageNumber: '02',
    total: '03',
    tagline: 'TIMELESS MATERIALS',
    title: 'خامات تعيش',
    subtitle: 'خشب زان أحمر طبيعي وأقمشة إيطالية.',
    description: 'لا نساوم على متانة الهياكل الداخلية؛ أخشاب صلبة مجففة حرارياً، إسفنج طبي كثافة 36 لا يهبط، وأقمشة معالجة ضد البقع مع ضمان 5 سنوات.',
    highlightLeft: 'ضمان 5 سنوات',
    highlightRight: 'صناعة تدوم للأجيال',
    accentDotColor: '#E17F3F',
  },
  {
    pageNumber: '03',
    total: '03',
    tagline: 'BESPOKE TAILORING',
    title: 'بيت على ذوقك',
    subtitle: 'تفصيل حسب المقاس والألوان المطلوبة.',
    description: 'زخرفة تتيح لك حرية اختيار نوع القماش، أبعاد الغرفة المحددة، ولمسات الأرجل والدهانات، لتكون القطعة مصممة خصيصاً لمساحتك أنت.',
    highlightLeft: 'تسليم فوري ومخصص',
    highlightRight: 'خدمة تفصيل واستشارات خاصة',
    accentDotColor: '#10B981',
  },
];

export const NotebookLookbook: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activePageIndex, setActivePageIndex] = useState(0);

  // Scroll track for page-by-page notebook flipping
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // =========================================================================
  // PAGE 1 (01 / 03) Top-to-Bottom Spiral Notepad Flip (rotateX)
  // Lifts the bottom edge up towards the viewer and swings over the top spiral
  // =========================================================================
  const page1RotateX = useTransform(scrollYProgress, [0.12, 0.44], [0, 115]);
  const page1TranslateY = useTransform(scrollYProgress, [0.12, 0.44], [0, -25]);
  const page1Opacity = useTransform(scrollYProgress, [0.12, 0.38, 0.44], [1, 0.9, 0]);
  const page1Shadow = useTransform(scrollYProgress, [0.12, 0.44], [0, 0.55]);

  // =========================================================================
  // PAGE 2 (02 / 03) Top-to-Bottom Spiral Notepad Flip (rotateX)
  // Flips up and over between 0.52 and 0.84
  // =========================================================================
  const page2RotateX = useTransform(scrollYProgress, [0.52, 0.84], [0, 115]);
  const page2TranslateY = useTransform(scrollYProgress, [0.52, 0.84], [0, -25]);
  const page2Opacity = useTransform(scrollYProgress, [0.52, 0.78, 0.84], [1, 0.9, 0]);
  const page2Shadow = useTransform(scrollYProgress, [0.52, 0.84], [0, 0.55]);

  // Clean disappearance when scrolling past page 3
  const stageOpacity = useTransform(scrollYProgress, [0.88, 0.98], [1, 0]);
  const stageScale = useTransform(scrollYProgress, [0.88, 0.98], [1, 0.94]);
  const stageY = useTransform(scrollYProgress, [0.88, 0.98], [0, -35]);

  // Sync active page indicator with scroll position
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      if (latest < 0.35) {
        setActivePageIndex(0);
      } else if (latest < 0.72) {
        setActivePageIndex(1);
      } else {
        setActivePageIndex(2);
      }
    });
  }, [scrollYProgress]);

  const scrollToPage = (index: number) => {
    setActivePageIndex(index);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const scrollHeight = containerRef.current.scrollHeight - window.innerHeight;

    let targetRatio = 0.08;
    if (index === 1) targetRatio = 0.50;
    if (index === 2) targetRatio = 0.90;

    window.scrollTo({
      top: scrollTop + scrollHeight * targetRatio,
      behavior: 'smooth',
    });
  };

  // 10 realistic spiral binding rings across the top of the notepad
  const spiralRings = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[260vh]"
      id="lookbook-stage"
    >
      {/* 
        Sticky Stage Container: 
        Pins the notebook firmly in the viewport while user scrolls to flip pages.
        Once all 3 pages are flipped, page smoothly fades out and disappears!
      */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 overflow-hidden select-none z-20">
        
        {/* Zero-Lag Ambient Radial Gradient (No Blur) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,127,63,0.1),transparent_65%)] pointer-events-none" />

        {/* Chapter Marker */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-10 flex items-center gap-2 text-stone-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#DE7635]" />
          <span>02 / 06 • المفكرة وهوية الدار</span>
        </div>

        {/* Stage Wrapper with Clean Exit Fade */}
        <motion.div
          style={{ opacity: stageOpacity, scale: stageScale, y: stageY }}
          className="w-full flex flex-col items-center justify-center will-change-[transform,opacity]"
        >
          {/* Section Mini Badge & Scroll Hint */}
          <div className="relative z-10 mb-5 sm:mb-7 text-center space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B3D42]/5 border border-[#0B3D42]/15 text-[#0B3D42] text-xs font-bold shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-[#E17F3F]" />
              <span>مفكرة وهوية دار زخرفة التفاعلية</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E17F3F] animate-pulse" />
            </div>
            <p className="text-xs text-stone-500 font-medium">
              حرّك السكرول لتقليب صفحات المفكرة من السلك العلوي
            </p>
          </div>

        {/* 3D Notepad Stage Container */}
        <div
          className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] aspect-[1/1.26] sm:aspect-[1/1.28]"
          style={{ perspective: 1800 }}
        >
          {/* ========================================================================= */}
          {/* 1. TERRACOTTA FOUNDATION BACKING CARD (مطابق تماماً لصورة العميل) */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 bg-[#DE7635] rounded-3xl translate-x-4 translate-y-4 sm:translate-x-5 sm:translate-y-5 shadow-2xl border border-[#C56526] -z-20">
            {/* Signature Dark Teal Dot on Top-Right Edge (كما في صورة المستخدم) */}
            <div className="absolute -top-1.5 -right-2.5 sm:-right-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0B3D42] shadow-md border-2 border-white" />
          </div>

          {/* Soft Spine Drop Shadow behind pages */}
          <div className="absolute inset-0 bg-stone-300/60 rounded-3xl translate-x-2 translate-y-2 -z-10 shadow-lg" />

          {/* ========================================================================= */}
          {/* 2. REALISTIC METALLIC WIRE SPIRAL BINDER (السلك العلوي للمفكرة) */}
          {/* ========================================================================= */}
          <div className="absolute -top-3.5 inset-x-8 h-8 z-50 pointer-events-none flex items-center justify-between px-2">
            {spiralRings.map((idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                {/* Spiral Wire Loop */}
                <div className="w-2.5 sm:w-3 h-7 sm:h-8 rounded-full bg-gradient-to-b from-stone-600 via-stone-300 to-stone-700 shadow-md border border-stone-400/60" />
                {/* Punch Hole under loop */}
                <div className="absolute top-4 w-2 h-2 rounded-full bg-stone-900/40 shadow-inner" />
              </div>
            ))}
          </div>

          {/* ========================================================================= */}
          {/* PAGE 3 (Base Page - 03 / 03: بيت على ذوقك) */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 bg-[#FFFDF9] rounded-3xl border border-stone-200/90 shadow-xl pt-7 pb-6 px-6 sm:px-8 flex flex-col justify-between overflow-hidden z-10">
            {/* Punch Holes Row at top edge */}
            <div className="absolute top-2 inset-x-8 h-2 flex items-center justify-between px-2 pointer-events-none">
              {spiralRings.map((idx) => (
                <div key={idx} className="w-1.5 h-1.5 rounded-full bg-stone-200" />
              ))}
            </div>

            {/* Page Header (Matching Reference Image) */}
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-3 pt-1">
              <div className="flex items-center gap-2">
                <BrandLogo className="h-7 sm:h-8 w-auto" theme="light" />
              </div>
              <span className="text-xs font-mono font-black text-stone-400">03 / 03</span>
            </div>

            {/* Page Body with generous breathing space */}
            <div className="py-5 text-right flex-1 flex flex-col justify-center">
              <span className="text-3xl sm:text-4xl font-black text-[#0B3D42] tracking-tight block leading-[1.3] mb-3">
                {LOOKBOOK_PAGES[2].title}
              </span>
              <p className="text-base sm:text-lg font-bold text-[#0B3D42] leading-[1.5] mb-3">
                {LOOKBOOK_PAGES[2].subtitle}
              </p>
              <p className="text-xs sm:text-[13.5px] text-stone-600 leading-[1.85] pt-1">
                {LOOKBOOK_PAGES[2].description}
              </p>
            </div>

            {/* Page Footer (Right & Left Highlights) */}
            <div className="flex items-center justify-between border-t border-stone-200/80 pt-3 text-[11px] sm:text-xs">
              <span className="font-bold text-stone-400">{LOOKBOOK_PAGES[2].highlightLeft}</span>
              <span className="font-bold text-[#0B3D42]">{LOOKBOOK_PAGES[2].highlightRight}</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PAGE 2 (Middle Page - 02 / 03: خامات تعيش) */}
          {/* Flips Upwards from bottom over top wire (rotateX) */}
          {/* ========================================================================= */}
          <motion.div
            style={{
              rotateX: page2RotateX,
              y: page2TranslateY,
              opacity: page2Opacity,
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
            className="absolute inset-0 bg-[#FFFDF9] rounded-3xl border border-stone-200/90 shadow-2xl pt-7 pb-6 px-6 sm:px-8 flex flex-col justify-between overflow-hidden z-20"
          >
            {/* Dynamic Curl Shadow */}
            <motion.div
              style={{ opacity: page2Shadow }}
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"
            />

            {/* Punch Holes Row at top edge */}
            <div className="absolute top-2 inset-x-8 h-2 flex items-center justify-between px-2 pointer-events-none">
              {spiralRings.map((idx) => (
                <div key={idx} className="w-1.5 h-1.5 rounded-full bg-stone-200" />
              ))}
            </div>

            {/* Page Header */}
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-3 pt-1">
              <div className="flex items-center gap-2">
                <BrandLogo className="h-7 sm:h-8 w-auto" theme="light" />
              </div>
              <span className="text-xs font-mono font-black text-stone-400">02 / 03</span>
            </div>

            {/* Page Body with generous breathing space */}
            <div className="py-5 text-right flex-1 flex flex-col justify-center">
              <span className="text-3xl sm:text-4xl font-black text-[#0B3D42] tracking-tight block leading-[1.3] mb-3">
                {LOOKBOOK_PAGES[1].title}
              </span>
              <p className="text-base sm:text-lg font-bold text-[#0B3D42] leading-[1.5] mb-3">
                {LOOKBOOK_PAGES[1].subtitle}
              </p>
              <p className="text-xs sm:text-[13.5px] text-stone-600 leading-[1.85] pt-1">
                {LOOKBOOK_PAGES[1].description}
              </p>
            </div>

            {/* Page Footer */}
            <div className="flex items-center justify-between border-t border-stone-200/80 pt-3 text-[11px] sm:text-xs">
              <span className="font-bold text-[#E17F3F]">{LOOKBOOK_PAGES[1].highlightLeft}</span>
              <span className="font-bold text-[#0B3D42]">{LOOKBOOK_PAGES[1].highlightRight}</span>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* PAGE 1 (Cover Page - 01 / 03: زخرفة - أثاث وديكور بطابعك الخاص) */}
          {/* Flips Upwards from bottom over top wire (rotateX) */}
          {/* ========================================================================= */}
          <motion.div
            style={{
              rotateX: page1RotateX,
              y: page1TranslateY,
              opacity: page1Opacity,
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
            className="absolute inset-0 bg-[#FFFDF9] rounded-3xl border border-stone-200/90 shadow-2xl pt-7 pb-6 px-6 sm:px-8 flex flex-col justify-between overflow-hidden z-30"
          >
            {/* Dynamic Curl Shadow */}
            <motion.div
              style={{ opacity: page1Shadow }}
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"
            />

            {/* Punch Holes Row at top edge */}
            <div className="absolute top-2 inset-x-8 h-2 flex items-center justify-between px-2 pointer-events-none">
              {spiralRings.map((idx) => (
                <div key={idx} className="w-1.5 h-1.5 rounded-full bg-stone-200" />
              ))}
            </div>

            {/* Page Header (مطابق تماماً لصورة العميل: ZAKHRAFA على اليسار مع 01 / 03 على اليمين) */}
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-3 pt-1">
              <div className="flex items-center gap-2">
                <BrandLogo className="h-7 sm:h-8 w-auto" theme="light" />
              </div>
              <span className="text-xs font-mono font-black text-stone-500">01 / 03</span>
            </div>

            {/* Page Body (مطابق تماماً لصورة العميل مع مسافات مريحة وواسعة) */}
            <div className="py-6 text-center space-y-7 flex-1 flex flex-col justify-center">
              <span className="text-5xl sm:text-6xl font-black text-[#0B3D42] tracking-wide block">
                {LOOKBOOK_PAGES[0].title}
              </span>
              <div className="space-y-3">
                <p className="text-lg sm:text-xl font-black text-[#0B3D42] leading-relaxed">
                  أثاث وديكور
                </p>
                <p className="text-lg sm:text-xl font-black text-[#0B3D42] leading-relaxed">
                  بطابعك الخاص.
                </p>
              </div>
            </div>

            {/* Page Footer (منذ 2021 على اليسار، ومساحات تشبه أصحابها على اليمين كما بالصورة) */}
            <div className="flex items-center justify-between border-t border-stone-200/80 pt-3 text-[11px] sm:text-xs">
              <span className="font-bold text-[#E17F3F]">{LOOKBOOK_PAGES[0].highlightLeft}</span>
              <span className="font-bold text-stone-500">{LOOKBOOK_PAGES[0].highlightRight}</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Floating Lookbook Interactive Navigation Bar */}
        <div className="relative z-30 mt-6 sm:mt-8 flex items-center gap-4 bg-white/95 px-4 py-2 rounded-full border border-stone-200 shadow-md">
          <button
            type="button"
            onClick={() => scrollToPage(Math.max(0, activePageIndex - 1))}
            disabled={activePageIndex === 0}
            className="p-1.5 text-stone-600 hover:text-[#0B3D42] disabled:opacity-30 transition cursor-pointer"
            aria-label="الصفحة السابقة"
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          {/* Page Indicators */}
          <div className="flex items-center gap-2">
            {LOOKBOOK_PAGES.map((page, idx) => (
              <button
                key={page.pageNumber}
                type="button"
                onClick={() => scrollToPage(idx)}
                className={`flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  activePageIndex === idx
                    ? 'bg-[#0B3D42] text-white shadow-xs scale-105'
                    : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{page.pageNumber}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToPage(Math.min(LOOKBOOK_PAGES.length - 1, activePageIndex + 1))}
            disabled={activePageIndex === LOOKBOOK_PAGES.length - 1}
            className="p-1.5 text-stone-600 hover:text-[#0B3D42] disabled:opacity-30 transition cursor-pointer"
            aria-label="الصفحة التالية"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        </motion.div>
      </div>
    </div>
  );
};
