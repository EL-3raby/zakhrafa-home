'use client';

import React from 'react';
import { AtelierMorphingLookbook } from '@/components/about/AtelierMorphingLookbook';
import { AboutMetricsSlide } from '@/components/about/AboutMetricsSlide';
import { AboutPillarsSlide } from '@/components/about/AboutPillarsSlide';
import { AboutCareSlide } from '@/components/about/AboutCareSlide';
import { AboutFinaleSlide } from '@/components/about/AboutFinaleSlide';

export default function AboutPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201050150780';
  return (
    <div className="relative isolate bg-[#FAF8F5] text-[#0B3D42] selection:bg-[#E17F3F] selection:text-white" dir="rtl">
      {/* ========================================================================= */}
      {/* CHAPTER 1 & 2: THE ATELIER MANIFESTO & CINEMATIC MORPHING LOOKBOOK */}
      {/* الكارت يتحرك وينزل بسلاسة للمنتصف ويتحول إلى المفكرة السلكية التفاعلية مع تقليب الصفحات */}
      {/* ========================================================================= */}
      <AtelierMorphingLookbook whatsappNumber={whatsappNumber} />

      {/* ========================================================================= */}
      {/* CHAPTER 3: PRESTIGE METRICS & NUMBERS (أرقام تتحدث عن هيبة الصنعة) */}
      {/* ========================================================================= */}
      <AboutMetricsSlide />

      {/* ========================================================================= */}
      {/* CHAPTER 4: ARTISANAL CRAFTSMANSHIP PILLARS (معايير الصنعة الهندسية الحقيقية) */}
      {/* ========================================================================= */}
      <AboutPillarsSlide />

      {/* ========================================================================= */}
      {/* CHAPTER 5: ROYAL GUARANTEES & VIP CARE (راحة بالك أولاً وخدمة VIP) */}
      {/* ========================================================================= */}
      <AboutCareSlide />

      {/* ========================================================================= */}
      {/* CHAPTER 6: GRAND FINALE & BESPOKE CTA (الخاتمة واستكشاف الكتالوج) */}
      {/* ========================================================================= */}
      <AboutFinaleSlide whatsappNumber={whatsappNumber} />
    </div>
  );
}
