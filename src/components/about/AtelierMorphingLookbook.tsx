'use client';

import React, { useRef, useState, useEffect } from 'react';
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
  BookOpen,
  ChevronUp,
  ChevronDown,
  X,
} from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';

interface AtelierMorphingLookbookProps {
  whatsappNumber: string;
}

// Interactive Hotspots on the initial Atelier card
const HOTSPOTS = [
  {
    id: 'wood',
    title: 'خشب زان أحمر روماني 100%',
    subtitle: 'هيكل مصمت مجفف حرارياً',
    desc: 'خشب طبيعي صلب خالي من الحشوات الرديئة، مجفف بنسب رطوبة دقيقة (8-10%) لمنع أي تقوس أو تصدع مدى الحياة.',
    x: '28%',
    y: '44%',
    badge: 'خشب زان طبيعي',
    shortLabel: 'خشب زان',
  },
  {
    id: 'fabric',
    title: 'أقمشة إيطالية معالجة',
    subtitle: 'مخمل وكتان فاخر ضد البقع',
    desc: 'معالجة ذكية بالألياف العازلة تمنع تسرب السوائل وتمنح ملمساً حريرياً فائق النعومة مع سهولة تامة في التنظيف.',
    x: '72%',
    y: '48%',
    badge: 'معالج ضد البقع',
    shortLabel: 'ضد البقع',
  },
  {
    id: 'craft',
    title: 'تفصيل معماري بالمليمتر',
    subtitle: 'أبعاد مخصصة لمساحتك أنت',
    desc: 'تعديل الأطوال، زوايا الانحناء، وارتفاع الجلسات بدقة هندسية تضمن استغلال كل مليمتر في غرفتك بشكل مثالي.',
    x: '50%',
    y: '28%',
    badge: 'تفصيل حسب المقاس',
    shortLabel: 'بالمليمتر',
  },
];

// Content for the 3 Lookbook Notepad pages
const LOOKBOOK_PAGES = [
  {
    id: 'page-1',
    pageNumber: '01 / 03',
    title: 'زخرفة',
    subtitle: 'أثاث وديكور بطابعك الخاص.',
    description: '',
    highlightLeft: 'منذ 2021',
    highlightRight: 'مساحات تشبه أصحابها',
  },
  {
    id: 'page-2',
    pageNumber: '02 / 03',
    title: 'خامات تعيش وتفاصيل تدوم',
    subtitle: 'خشب زان أحمر وأقمشة إيطالية فاخرة.',
    description:
      'نختار الخشب الطبيعي المصمت ونعالجه بأعلى معايير التجفيف، ونكسوه بأقمشة مقاومة للبقع لتدوم معك سنوات طويلة من الأناقة والراحة.',
    highlightLeft: 'ضمان 5 سنوات',
    highlightRight: 'خشب طبيعي 100%',
  },
  {
    id: 'page-3',
    pageNumber: '03 / 03',
    title: 'بيت على ذوقك',
    subtitle: 'تفصيل حسب المقاس والألوان المطلوبة.',
    description:
      'زخرفة تتيح لك حرية اختيار نوع القماش، أبعاد الغرفة المحددة، ولمسات الأرجل والدهانات، لتكون القطعة مصممة خصيصاً لمساحتك أنت.',
    highlightLeft: 'خدمة تفصيل واستشارات خاصة',
    highlightRight: 'تسليم فوري ومخصص',
  },
];

export const AtelierMorphingLookbook: React.FC<AtelierMorphingLookbookProps> = ({
  whatsappNumber,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const activeSpot = HOTSPOTS.find((s) => s.id === activeHotspot);
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [centerOffset, setCenterOffset] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardColRef = useRef<HTMLDivElement | null>(null);

  // Measure dynamic horizontal offset from left-column center to viewport center
  useEffect(() => {
    const updateOffset = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile && stageRef.current && cardColRef.current) {
        const stageRect = stageRef.current.getBoundingClientRect();
        const stageCenterX = stageRect.left + stageRect.width / 2;
        const colRect = cardColRef.current.getBoundingClientRect();
        const colCenterX = colRect.left + colRect.width / 2;
        const dist = stageCenterX - colCenterX;
        setCenterOffset(dist);
      } else {
        setCenterOffset(0);
      }
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  // Continuous unified scroll track for Hero + Morph + Notebook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ---------------------------------------------------------------------------
  // 1. Mouse Tracking Tilt (Active ONLY during initial Hero state < 0.06 on desktop)
  // ---------------------------------------------------------------------------
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 26, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile || scrollYProgress.get() > 0.06) return;
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

  // Reset 3D tilt and close active hotspot as soon as scrolling starts
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      if (v > 0.04) {
        mouseX.set(0);
        mouseY.set(0);
        setActiveHotspot(null);
      }
    });
  }, [scrollYProgress, mouseX, mouseY]);

  // ---------------------------------------------------------------------------
  // 2. Cinematic Morph Transitions (Hero Text Exits FIRST, Card Glides to Center)
  // ---------------------------------------------------------------------------
  // Hero right text slides up and fades out cleanly BEFORE the card enters the center
  const heroTextOpacity = useTransform(scrollYProgress, [0.03, 0.14], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0.03, 0.14], [0, -50]);
  const heroTextPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.14 ? 'none' : 'auto'));
  const heroTextVisibility = useTransform(scrollYProgress, (v) => (!isMobile && v > 0.14 ? 'hidden' : 'visible'));
  const heroTextDisplay = useTransform(scrollYProgress, (v) => (isMobile && v > 0.12 ? 'none' : 'block'));

  // Card translation: Glides from left column into center AND glides down ("ينزل معايا")
  // and at the end of Page 3, dives deep DOWNWARDS under Section 3 ("تنزل تحت الجزء")
  const cardTranslateX = useTransform(scrollYProgress, [0.06, 0.22], [0, centerOffset]);
  const cardTranslateY = useTransform(scrollYProgress, (v) => {
    if (v <= 0.06) return 0;
    if (v <= 0.22) {
      const p = (v - 0.06) / 0.16;
      return isMobile ? 0 : p * 50;
    }
    if (isMobile) {
      // On Mobile: Dive deeply downwards (850px) so it completely disappears into Section 3
      if (v <= 0.76) return 0;
      const p = Math.min(1, (v - 0.76) / 0.14);
      return p * 850;
    }
    // Desktop:
    if (v <= 0.84) return 50;
    const p = (v - 0.84) / 0.16;
    return 50 + p * 600;
  });

  const cardScale = useTransform(scrollYProgress, (v) => {
    if (isMobile) {
      if (v <= 0.76) return 1;
      const p = Math.min(1, (v - 0.76) / 0.14);
      return 1 - p * 0.18;
    }
    if (v <= 0.06) return 1;
    if (v <= 0.22) return 1 + ((v - 0.06) / 0.16) * 0.02;
    if (v <= 0.84) return 1.02;
    return 1.02 - ((v - 0.84) / 0.16) * 0.22;
  });

  const cardOpacity = useTransform(scrollYProgress, (v) => {
    if (isMobile) {
      if (v <= 0.76) return 1;
      if (v >= 0.87) return 0;
      return 1 - (v - 0.76) / 0.11;
    }
    if (v <= 0.86) return 1;
    if (v >= 0.98) return 0;
    return 1 - (v - 0.86) / 0.12;
  });

  const cardDisplay = useTransform(scrollYProgress, (v) => {
    if (isMobile) return v > 0.88 ? 'none' : 'flex';
    return v > 0.98 ? 'none' : 'flex';
  });

  // Inside Card: Living Room Scene and inspect cards crossfade out completely
  const atelierFaceOpacity = useTransform(scrollYProgress, [0.16, 0.24], [1, 0]);
  const atelierPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.24 ? 'none' : 'auto'));
  const atelierDisplay = useTransform(scrollYProgress, (v) => (v > 0.25 ? 'none' : 'block'));

  // Inside Card: Wire Spiral rings slide into place at the top edge
  const spiralOpacity = useTransform(scrollYProgress, [0.18, 0.25], [0, 1]);
  const spiralY = useTransform(scrollYProgress, [0.18, 0.25], [-30, 0]);

  // Floating Lookbook Badge & Hint appears above notepad when morphed to center
  const notebookHeaderOpacity = useTransform(scrollYProgress, (v) => {
    if (isMobile) {
      if (v < 0.22) return 0;
      if (v < 0.28) return (v - 0.22) / 0.06;
      if (v <= 0.76) return 1;
      if (v >= 0.85) return 0;
      return 1 - (v - 0.76) / 0.09;
    }
    if (v < 0.22) return 0;
    if (v < 0.28) return (v - 0.22) / 0.06;
    if (v <= 0.84) return 1;
    if (v >= 0.92) return 0;
    return 1 - (v - 0.84) / 0.08;
  });
  const notebookHeaderDisplay = useTransform(scrollYProgress, (v) => (v < 0.20 || (isMobile ? v > 0.86 : v > 0.94) ? 'none' : 'block'));

  // Chapter markers crossfade at the top
  const chapter1Opacity = useTransform(scrollYProgress, [0.12, 0.20], [1, 0]);
  const chapter2Opacity = useTransform(scrollYProgress, [0.20, 0.28], [0, 1]);

  // ---------------------------------------------------------------------------
  // 3. Spiral Notepad Page Flips (Pages 1, 2, 3)
  // ---------------------------------------------------------------------------
  // Page 1 flips up and over the spiral: 0.32 to 0.48
  const page1RotateX = useTransform(scrollYProgress, [0.32, 0.48], [0, 115]);
  const page1TranslateY = useTransform(scrollYProgress, [0.32, 0.48], [0, -25]);
  const page1FlipOpacity = useTransform(scrollYProgress, [0.32, 0.44, 0.48], [1, 0.9, 0]);
  const page1Shadow = useTransform(scrollYProgress, [0.32, 0.48], [0, 0.55]);
  const page1Display = useTransform(scrollYProgress, (v) => (v >= 0.48 ? 'none' : 'flex'));

  // Page 2 flips up and over the spiral: 0.54 to 0.70
  const page2RotateX = useTransform(scrollYProgress, [0.54, 0.70], [0, 115]);
  const page2TranslateY = useTransform(scrollYProgress, [0.54, 0.70], [0, -25]);
  const page2FlipOpacity = useTransform(scrollYProgress, [0.54, 0.66, 0.70], [1, 0.9, 0]);
  const page2Shadow = useTransform(scrollYProgress, [0.54, 0.70], [0, 0.55]);
  const page2Display = useTransform(scrollYProgress, (v) => (v >= 0.70 ? 'none' : 'flex'));

  // Page 3 rests comfortably in full view from 0.70 to 0.84!

  // Pagination indicator pill fades in under the notepad and fades out on exit
  const paginationOpacity = useTransform(scrollYProgress, (v) => {
    if (isMobile) {
      if (v < 0.24) return 0;
      if (v < 0.30) return (v - 0.24) / 0.06;
      if (v <= 0.76) return 1;
      if (v >= 0.85) return 0;
      return 1 - (v - 0.76) / 0.09;
    }
    if (v < 0.24) return 0;
    if (v < 0.30) return (v - 0.24) / 0.06;
    if (v <= 0.84) return 1;
    if (v >= 0.92) return 0;
    return 1 - (v - 0.84) / 0.08;
  });
  const paginationDisplay = useTransform(scrollYProgress, (v) => (v < 0.22 || (isMobile ? v > 0.86 : v > 0.94) ? 'none' : 'flex'));

  // Sync active page index with scroll
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      if (latest < 0.34) {
        setActivePageIndex(0);
      } else if (latest < 0.56) {
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

    let targetRatio = 0.28;
    if (index === 1) targetRatio = 0.52;
    if (index === 2) targetRatio = 0.76;

    window.scrollTo({
      top: scrollTop + scrollHeight * targetRatio,
      behavior: 'smooth',
    });
  };

  const spiralRings = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[250vh] sm:h-[280vh] z-10"
    >
      {/* Sticky Fullscreen Pinned Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#FAF8F5] px-4 sm:px-6 lg:px-10 py-6 select-none">
        
        {/* Subtle Ambient Shaders */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,127,63,0.1),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(11,61,66,0.07),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b3d4206_1px,transparent_1px),linear-gradient(to_bottom,#0b3d4206_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Dynamic Top Chapter Markers */}
        <div className="absolute top-4 right-6 sm:top-6 sm:right-10 pointer-events-none">
          {/* Chapter 1 Marker */}
          <motion.div
            style={{ opacity: chapter1Opacity }}
            className="flex items-center gap-2.5 text-stone-500 text-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#0B3D42]" />
            <span className="font-mono font-bold text-stone-600 text-[13px]">01 / 06</span>
            <span className="text-stone-300">•</span>
            <span className="font-sans font-semibold text-stone-700">مدخل الحكاية والمعمار</span>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <span className="text-[#DE7635] font-mono font-bold text-[11px] hidden sm:inline tracking-wider">DAR ZAKHRAFA ATELIER</span>
          </motion.div>

          {/* Chapter 2 Marker */}
          <motion.div
            style={{ opacity: chapter2Opacity }}
            className="absolute top-0 right-0 flex items-center gap-2.5 text-stone-500 text-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#DE7635]" />
            <span className="font-mono font-bold text-stone-600 text-[13px]">02 / 06</span>
            <span className="text-stone-300">•</span>
            <span className="font-sans font-semibold text-stone-700">المفكرة وهوية الدار</span>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <span className="text-[#DE7635] font-mono font-bold text-[11px] hidden sm:inline tracking-wider">LOOKBOOK NOTEBOOK</span>
          </motion.div>
        </div>

        {/* Global Stage Container */}
        <div ref={stageRef} className="relative z-10 mx-auto max-w-7xl w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* ================================================================= */}
            {/* RIGHT COLUMN: HERO EDITORIAL TEXT (Smoothly slides away on scroll) */}
            {/* ================================================================= */}
            <motion.div
              style={{
                opacity: heroTextOpacity,
                y: heroTextY,
                pointerEvents: heroTextPointerEvents as any,
                visibility: heroTextVisibility as any,
                display: heroTextDisplay as any,
              }}
              className="lg:col-span-7 text-center sm:text-right"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#0B3D42]/5 border border-[#0B3D42]/15 text-[#0B3D42] text-[11px] sm:text-xs font-bold shadow-2xs mb-3 sm:mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DE7635] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DE7635]" />
                </span>
                <span>دار تصميم للأثاث والديكور المعماري</span>
                <span className="text-stone-300">•</span>
                <span className="text-[#DE7635] font-mono font-bold tracking-wider">EST. 2021</span>
              </div>

              {/* Headline */}
              <h1
                className="text-2xl xs:text-3xl sm:text-[40px] lg:text-[44px] xl:text-[48px] font-black text-[#0B3D42] tracking-tight leading-[1.32] sm:leading-[1.3] mb-3 sm:mb-6"
                style={{ fontFamily: 'var(--font-alexandria), sans-serif' }}
              >
                <span>نختار التفاصيل التي تجعل البيت أحنّ،</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-l from-[#B45309] via-[#C96627] to-[#DE7635] mt-1 sm:mt-2">
                  ونبني أثاثاً راقياً يعيش لأجيال.
                </span>
              </h1>

              {/* Manifesto */}
              <p className="text-stone-600 text-xs sm:text-base lg:text-[16.5px] leading-relaxed sm:leading-[1.88] max-w-xl mx-auto sm:mx-0 font-normal mb-4 sm:mb-8 text-center sm:text-right line-clamp-3 sm:line-clamp-none">
                في «زخرفة»، لا نصنع قطعاً تملأ المساحات فحسب، بل نصيغ هوية متكاملة لبيتك. ندمج أصالة خشب الزان الأحمر الروماني المصمت مع دقة التفصيل المعماري بالمليمتر وأفخم الأقمشة الإيطالية، لنمنح منزلك دفئاً وتفرداً يدوم لعقود.
              </p>

              {/* CTAs */}
              <div className="flex flex-col xs:flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-4 mb-4 sm:mb-8 w-full xs:w-auto">
                <Link
                  href="/categories"
                  className="w-full xs:w-auto justify-center group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-[#0B3D42] hover:bg-[#12555C] text-white text-xs sm:text-sm font-black shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-98 overflow-hidden"
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
                  className="w-full xs:w-auto justify-center inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 sm:py-4 rounded-full border border-stone-300/90 hover:border-[#DE7635]/60 bg-white/95 hover:bg-white text-[#0B3D42] text-xs sm:text-sm font-bold transition-all duration-200 shadow-2xs active:scale-98"
                >
                  <HeartHandshake className="w-4 h-4 text-[#DE7635]" />
                  <span>استشارة خاصة مع مهندس التصميم</span>
                </a>
              </div>

              {/* Specs Strip (Hidden on mobile to save vertical space) */}
              <div className="pt-4 hidden sm:flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-5 text-xs font-bold text-[#0B3D42] border-t border-stone-200/90">
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
              </div>
            </motion.div>

            {/* ================================================================= */}
            {/* LEFT COLUMN: THE CINEMATIC MORPHING CARD (Glides to Center & Morphs) */}
            {/* ================================================================= */}
            <div ref={cardColRef} className="lg:col-span-5 flex justify-center relative">
              
              {/* Animated Wrapper: Moves to center and sinks underneath Section 3 on exit */}
              <motion.div
                style={{
                  x: cardTranslateX,
                  y: cardTranslateY,
                  scale: cardScale,
                  opacity: cardOpacity,
                  display: cardDisplay as any,
                }}
                className="relative will-change-transform flex flex-col items-center"
              >
                {/* Section Mini Badge & Scroll Hint (Fades in smoothly when morphed into notebook) */}
                <motion.div
                  style={{
                    opacity: notebookHeaderOpacity,
                    display: notebookHeaderDisplay as any,
                  }}
                  className="mb-2 sm:mb-3 text-center space-y-0.5 sm:space-y-1 pointer-events-none"
                >
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-0.5 sm:py-1 rounded-full bg-[#0B3D42]/5 border border-[#0B3D42]/15 text-[#0B3D42] text-[10px] sm:text-xs font-bold shadow-2xs">
                    <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E17F3F]" />
                    <span>مفكرة وهوية دار زخرفة التفاعلية</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E17F3F] animate-pulse" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-stone-500 font-medium">
                    حرّك السكرول لتقليب صفحات المفكرة من السلك العلوي
                  </p>
                </motion.div>

                {/* 3D Perspective Stage Container */}
                <div
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="relative w-[315px] xs:w-[345px] sm:w-[380px] lg:w-[420px] max-w-[92vw] aspect-[1/1.28] sm:aspect-[1/1.28]"
                  style={{ perspective: 1600 }}
                >
                  {/* Terracotta Foundation Offset Backing (Shared Identity) */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#DE7635] to-[#B35218] translate-x-2.5 translate-y-2.5 sm:translate-x-3.5 sm:translate-y-3.5 shadow-xl border border-[#C56526]/60 -z-20" />

                  {/* Soft Drop Shadow under pages */}
                  <div className="absolute inset-0 bg-stone-300/60 rounded-3xl translate-x-1.5 translate-y-1.5 -z-10 shadow-lg" />

                  {/* ============================================================= */}
                  {/* METALLIC WIRE SPIRAL BINDER (Slides into place during morph) */}
                  {/* ============================================================= */}
                  <motion.div
                    style={{ opacity: spiralOpacity, y: spiralY }}
                    className="absolute -top-3.5 inset-x-8 h-8 z-50 pointer-events-none flex items-center justify-between px-2"
                  >
                    {spiralRings.map((idx) => (
                      <div key={idx} className="relative flex flex-col items-center">
                        <div className="w-2.5 sm:w-3 h-7 sm:h-8 rounded-full bg-gradient-to-b from-stone-600 via-stone-300 to-stone-700 shadow-md border border-stone-400/60" />
                        <div className="absolute top-4 w-2 h-2 rounded-full bg-stone-900/40 shadow-inner" />
                      </div>
                    ))}
                  </motion.div>

                  {/* ============================================================= */}
                  {/* BASE PAGE 3 (03 / 03: بيت على ذوقك - Revealed after Page 2) */}
                  {/* ============================================================= */}
                  <div className="absolute inset-0 bg-[#FFFDF9] rounded-3xl border border-stone-200/90 shadow-xl pt-5 pb-4 px-4 xs:px-5 sm:pt-7 sm:pb-6 sm:px-8 flex flex-col justify-between overflow-hidden z-10">
                    {/* Punch Holes Row */}
                    <div className="absolute top-2 inset-x-8 h-2 flex items-center justify-between px-2 pointer-events-none">
                      {spiralRings.map((idx) => (
                        <div key={idx} className="w-1.5 h-1.5 rounded-full bg-stone-200" />
                      ))}
                    </div>

                    {/* Page Header */}
                    <div className="flex items-center justify-between border-b border-stone-200/80 pb-2.5 sm:pb-3 pt-1">
                      <div className="flex items-center gap-2">
                        <BrandLogo className="h-6 sm:h-8 w-auto" theme="light" />
                      </div>
                      <span className="text-[11px] sm:text-xs font-mono font-black text-stone-400">03 / 03</span>
                    </div>

                    {/* Page Body */}
                    <div className="py-3 sm:py-5 text-right flex-1 flex flex-col justify-center">
                      <span className="text-xl xs:text-2xl sm:text-4xl font-black text-[#0B3D42] tracking-tight block leading-[1.3] mb-2 sm:mb-3">
                        {LOOKBOOK_PAGES[2].title}
                      </span>
                      <p className="text-xs xs:text-sm sm:text-lg font-bold text-[#0B3D42] leading-snug sm:leading-[1.5] mb-2 sm:mb-3">
                        {LOOKBOOK_PAGES[2].subtitle}
                      </p>
                      <p className="text-[11px] xs:text-xs sm:text-[13.5px] text-stone-600 leading-relaxed sm:leading-[1.85] pt-0.5 line-clamp-4 sm:line-clamp-none">
                        {LOOKBOOK_PAGES[2].description}
                      </p>
                    </div>

                    {/* Page Footer */}
                    <div className="flex items-center justify-between border-t border-stone-200/80 pt-2.5 sm:pt-3 text-[10px] sm:text-xs">
                      <span className="font-bold text-stone-400">{LOOKBOOK_PAGES[2].highlightLeft}</span>
                      <span className="font-bold text-[#0B3D42]">{LOOKBOOK_PAGES[2].highlightRight}</span>
                    </div>
                  </div>

                  {/* ============================================================= */}
                  {/* MIDDLE PAGE 2 (02 / 03: خامات تعيش - Flips Over at 0.58-0.76) */}
                  {/* ============================================================= */}
                  <motion.div
                    style={{
                      rotateX: page2RotateX,
                      y: page2TranslateY,
                      opacity: page2FlipOpacity,
                      display: page2Display as any,
                      transformOrigin: 'top center',
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                    }}
                    className="absolute inset-0 bg-[#FFFDF9] rounded-3xl border border-stone-200/90 shadow-2xl pt-5 pb-4 px-4 xs:px-5 sm:pt-7 sm:pb-6 sm:px-8 flex flex-col justify-between overflow-hidden z-20"
                  >
                    <motion.div
                      style={{ opacity: page2Shadow }}
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"
                    />

                    {/* Punch Holes Row */}
                    <div className="absolute top-2 inset-x-8 h-2 flex items-center justify-between px-2 pointer-events-none">
                      {spiralRings.map((idx) => (
                        <div key={idx} className="w-1.5 h-1.5 rounded-full bg-stone-200" />
                      ))}
                    </div>

                    {/* Page Header */}
                    <div className="flex items-center justify-between border-b border-stone-200/80 pb-2.5 sm:pb-3 pt-1">
                      <div className="flex items-center gap-2">
                        <BrandLogo className="h-6 sm:h-8 w-auto" theme="light" />
                      </div>
                      <span className="text-[11px] sm:text-xs font-mono font-black text-stone-400">02 / 03</span>
                    </div>

                    {/* Page Body */}
                    <div className="py-3 sm:py-5 text-right flex-1 flex flex-col justify-center">
                      <span className="text-xl xs:text-2xl sm:text-4xl font-black text-[#0B3D42] tracking-tight block leading-[1.3] mb-2 sm:mb-3">
                        {LOOKBOOK_PAGES[1].title}
                      </span>
                      <p className="text-xs xs:text-sm sm:text-lg font-bold text-[#0B3D42] leading-snug sm:leading-[1.5] mb-2 sm:mb-3">
                        {LOOKBOOK_PAGES[1].subtitle}
                      </p>
                      <p className="text-[11px] xs:text-xs sm:text-[13.5px] text-stone-600 leading-relaxed sm:leading-[1.85] pt-0.5 line-clamp-4 sm:line-clamp-none">
                        {LOOKBOOK_PAGES[1].description}
                      </p>
                    </div>

                    {/* Page Footer */}
                    <div className="flex items-center justify-between border-t border-stone-200/80 pt-2.5 sm:pt-3 text-[10px] sm:text-xs">
                      <span className="font-bold text-[#E17F3F]">{LOOKBOOK_PAGES[1].highlightLeft}</span>
                      <span className="font-bold text-[#0B3D42]">{LOOKBOOK_PAGES[1].highlightRight}</span>
                    </div>
                  </motion.div>

                  {/* ============================================================= */}
                  {/* COVER PAGE 1 (01 / 03: زخرفة - Fades in & Flips Over 0.34-0.54) */}
                  {/* ============================================================= */}
                  <motion.div
                    style={{
                      rotateX: page1RotateX,
                      y: page1TranslateY,
                      opacity: page1FlipOpacity,
                      display: page1Display as any,
                      transformOrigin: 'top center',
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                    }}
                    className="absolute inset-0 bg-[#FFFDF9] rounded-3xl border border-stone-200/90 shadow-2xl pt-5 pb-4 px-4 xs:px-5 sm:pt-7 sm:pb-6 sm:px-8 flex flex-col justify-between overflow-hidden z-30"
                  >
                    <motion.div
                      style={{ opacity: page1Shadow }}
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"
                    />

                    {/* Punch Holes Row */}
                    <div className="absolute top-2 inset-x-8 h-2 flex items-center justify-between px-2 pointer-events-none">
                      {spiralRings.map((idx) => (
                        <div key={idx} className="w-1.5 h-1.5 rounded-full bg-stone-200" />
                      ))}
                    </div>

                    {/* Page Header */}
                    <div className="flex items-center justify-between border-b border-stone-200/80 pb-2.5 sm:pb-3 pt-1">
                      <div className="flex items-center gap-2">
                        <BrandLogo className="h-6 sm:h-8 w-auto" theme="light" />
                      </div>
                      <span className="text-[11px] sm:text-xs font-mono font-black text-stone-500">01 / 03</span>
                    </div>

                    {/* Page Body */}
                    <div className="py-4 sm:py-6 text-center space-y-4 sm:space-y-7 flex-1 flex flex-col justify-center">
                      <span className="text-4xl sm:text-6xl font-black text-[#0B3D42] tracking-wide block">
                        {LOOKBOOK_PAGES[0].title}
                      </span>
                      <div className="space-y-1.5 sm:space-y-3">
                        <p className="text-base sm:text-xl font-black text-[#0B3D42] leading-relaxed">
                          أثاث وديكور
                        </p>
                        <p className="text-base sm:text-xl font-black text-[#0B3D42] leading-relaxed">
                          بطابعك الخاص.
                        </p>
                      </div>
                    </div>

                    {/* Page Footer */}
                    <div className="flex items-center justify-between border-t border-stone-200/80 pt-2.5 sm:pt-3 text-[10px] sm:text-xs">
                      <span className="font-bold text-[#E17F3F]">{LOOKBOOK_PAGES[0].highlightLeft}</span>
                      <span className="font-bold text-stone-500">{LOOKBOOK_PAGES[0].highlightRight}</span>
                    </div>
                  </motion.div>

                  {/* ============================================================= */}
                  {/* INITIAL ATELIER FACE (Image, Hotspots, Hallmark Glass Card) */}
                  {/* Fades out smoothly as the card glides to the center! */}
                  {/* ============================================================= */}
                  <motion.div
                    style={{
                      rotateX,
                      rotateY,
                      opacity: atelierFaceOpacity,
                      pointerEvents: atelierPointerEvents as any,
                      display: atelierDisplay as any,
                      transformStyle: 'preserve-3d',
                    }}
                    className="absolute inset-0 rounded-[32px] bg-[#0B1717] border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)] overflow-hidden z-40"
                  >
                    {/* Living Setting Visual */}
                    <Image
                      src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop"
                      alt="طقم صالون وأثاث معماري فاخر من دار زخرفة"
                      fill
                      sizes="(max-width: 768px) 100vw, 460px"
                      priority
                      className="object-cover object-center"
                    />

                    {/* Lighting Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35 pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(222,118,53,0.25),transparent_55%)] pointer-events-none" />

                    {/* Top Status Pill */}
                    <div className="absolute top-3 sm:top-4 inset-x-0 flex justify-center pointer-events-none z-20 px-2">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white text-[11px] font-medium shadow-xl">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                        </span>
                        <span className="font-sans font-medium text-stone-200">ورشة التصميم والتفصيل نشطة</span>
                        <span className="text-white/30">•</span>
                        <span className="text-[#F3B084] font-mono text-[10px] font-bold tracking-wider">BESPOKE</span>
                      </div>
                    </div>

                    {/* Interactive Luxury Pearl Beacons (Icon-Free, Fixed Dimensions) */}
                    {HOTSPOTS.map((spot) => {
                      const isActive = activeHotspot === spot.id;

                      return (
                        <div
                          key={spot.id}
                          style={{ left: spot.x, top: spot.y }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveHotspot(isActive ? null : spot.id);
                            }}
                            onMouseEnter={() => setActiveHotspot(spot.id)}
                            aria-label={spot.title}
                            className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center group cursor-pointer focus:outline-none"
                          >
                            {/* Subtle Radar Pulse Halo (Bound to button bounds) */}
                            <span
                              className={`absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none ${
                                isActive ? 'bg-[#DE7635]/40 animate-ping' : 'bg-white/30 animate-ping'
                              }`}
                            />

                            {/* Frosted Glass Outer Ring */}
                            <span
                              className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full backdrop-blur-md transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.4)] ${
                                isActive
                                  ? 'bg-[#DE7635] border-2 border-white scale-110 shadow-[0_0_20px_rgba(222,118,53,0.85)]'
                                  : 'bg-black/40 hover:bg-black/60 border border-white/75 group-hover:scale-110 group-hover:border-white'
                              }`}
                            >
                              {/* Glowing Pearl Center Core */}
                              <span
                                className={`rounded-full transition-all duration-300 ${
                                  isActive
                                    ? 'w-2.5 h-2.5 bg-white shadow-[0_0_8px_#FFFFFF]'
                                    : 'w-2 h-2 bg-white group-hover:bg-[#DE7635] shadow-[0_0_6px_rgba(255,255,255,0.9)]'
                                }`}
                              />
                            </span>
                          </button>
                        </div>
                      );
                    })}

                    {/* Bottom Unified Architectural Glass Dock & Interactive Detail Card */}
                    <div className="absolute bottom-2.5 sm:bottom-3 inset-x-2.5 sm:inset-x-3.5 rounded-2xl bg-[#07262A]/92 backdrop-blur-2xl border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.65)] text-right z-30 text-white overflow-hidden transition-all duration-300">
                      <AnimatePresence mode="wait">
                        {activeSpot ? (
                          /* Active Hotspot Expanded Details View */
                          <motion.div
                            key={activeSpot.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.18 }}
                            className="p-3 sm:p-3.5"
                          >
                            {/* Top Header of Active Card: Badge, Title & Close Button */}
                            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1.5">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveHotspot(null);
                                }}
                                className="px-2 py-0.5 -mr-1 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
                                aria-label="إغلاق التفاصيل"
                              >
                                <X className="w-3 h-3" />
                                <span>إغلاق</span>
                              </button>

                              <div className="flex items-center gap-1.5 justify-end">
                                <span className="text-[11px] sm:text-xs font-black text-white">
                                  {activeSpot.title}
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#DE7635]" />
                              </div>
                            </div>

                            {/* Subtitle & Description */}
                            <div className="mb-2">
                              <p className="text-[10px] text-[#F3B084] font-bold mb-1">
                                {activeSpot.subtitle} • {activeSpot.badge}
                              </p>
                              <p className="text-[10px] sm:text-[11px] text-stone-300 leading-relaxed font-normal">
                                {activeSpot.desc}
                              </p>
                            </div>

                            {/* 3 Interactive Switcher Pills inside the expanded card */}
                            <div className="grid grid-cols-3 gap-1.5 pt-1.5 border-t border-white/10">
                              {HOTSPOTS.map((spot) => {
                                const isSelected = activeHotspot === spot.id;
                                return (
                                  <button
                                    key={spot.id}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveHotspot(isSelected ? null : spot.id);
                                    }}
                                    className={`py-1 px-1 rounded-xl text-center text-[10px] sm:text-xs font-bold transition-all duration-200 cursor-pointer ${
                                      isSelected
                                        ? 'bg-[#DE7635] text-white shadow-[0_2px_12px_rgba(222,118,53,0.6)] border border-[#F3B084]/50'
                                        : 'bg-white/[0.06] hover:bg-white/[0.14] text-stone-300 border border-white/10'
                                    }`}
                                  >
                                    <span className="truncate block">{spot.shortLabel}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        ) : (
                          /* Default Idle Dock View */
                          <motion.div
                            key="idle-dock"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.18 }}
                            className="p-2 sm:p-2.5"
                          >
                            {/* Brand & Guarantee Minimal Header */}
                            <div className="flex items-center justify-between px-1 mb-1.5">
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#DE7635]" />
                                <span className="text-[11px] sm:text-xs font-black tracking-wide text-white">
                                  دار زخرفة
                                </span>
                                <span className="text-white/30 text-[10px] hidden xs:inline">•</span>
                                <span className="text-[10px] text-stone-300 font-medium hidden xs:inline">
                                  تفصيل حسب الطلب
                                </span>
                              </div>

                              <div className="px-2 py-0.5 rounded-full bg-white/[0.08] border border-white/15 text-[9px] sm:text-[10px] font-bold text-[#F3B084] shrink-0">
                                ضمان 5 سنوات معتمد
                              </div>
                            </div>

                            {/* 3 Interactive Feature Pills */}
                            <div className="grid grid-cols-3 gap-1.5">
                              {HOTSPOTS.map((spot) => (
                                <button
                                  key={spot.id}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveHotspot(spot.id);
                                  }}
                                  className="py-1.5 px-1.5 rounded-xl text-center text-[10px] sm:text-xs font-bold bg-white/[0.06] hover:bg-white/[0.14] text-stone-200 border border-white/10 transition-all duration-200 cursor-pointer"
                                >
                                  <span className="truncate block">{spot.shortLabel}</span>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                </div>

                {/* Floating Pagination Pill (Appears under the notepad after morph) */}
                <motion.div
                  style={{
                    opacity: paginationOpacity,
                    display: paginationDisplay as any,
                  }}
                  className="mt-5 flex items-center justify-center pointer-events-auto"
                >
                  <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-stone-200 text-xs font-mono font-bold">
                    <button
                      type="button"
                      onClick={() => scrollToPage(Math.max(0, activePageIndex - 1))}
                      disabled={activePageIndex === 0}
                      className="p-1 rounded-full text-stone-400 hover:text-[#0B3D42] disabled:opacity-30 transition-colors"
                    >
                      <ChevronDown className="w-3.5 h-3.5 rotate-180" />
                    </button>

                    <div className="flex items-center gap-1 px-1">
                      {LOOKBOOK_PAGES.map((page, idx) => (
                        <button
                          key={page.id}
                          type="button"
                          onClick={() => scrollToPage(idx)}
                          className={`w-6 h-6 rounded-full text-[11px] font-bold transition-all flex items-center justify-center ${
                            activePageIndex === idx
                              ? 'bg-[#0B3D42] text-white shadow-xs'
                              : 'text-stone-400 hover:text-stone-600'
                          }`}
                        >
                          0{idx + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollToPage(Math.min(2, activePageIndex + 1))}
                      disabled={activePageIndex === 2}
                      className="p-1 rounded-full text-stone-400 hover:text-[#0B3D42] disabled:opacity-30 transition-colors"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>

              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
