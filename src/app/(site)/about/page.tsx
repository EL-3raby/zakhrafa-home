'use client';

import React from 'react';
import { AboutHero } from '@/components/about/AboutHero';
import { NotebookLookbook } from '@/components/about/NotebookLookbook';
import { AboutMetricsSlide } from '@/components/about/AboutMetricsSlide';
import { AboutPillarsSlide } from '@/components/about/AboutPillarsSlide';
import { AboutCareSlide } from '@/components/about/AboutCareSlide';
import { AboutFinaleSlide } from '@/components/about/AboutFinaleSlide';

export default function AboutPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201050150780';

  return (
    <div className="bg-[#FAF8F5] text-[#0B3D42] selection:bg-[#E17F3F] selection:text-white overflow-x-hidden" dir="rtl">
      {/* ========================================================================= */}
      {/* CHAPTER 1: THE ATELIER MANIFESTO (مدخل الحكاية والمعمار الفاخر) */}
      {/* ========================================================================= */}
      <AboutHero whatsappNumber={whatsappNumber} />

      {/* ========================================================================= */}
      {/* CHAPTER 2: THE 3D WIRE SPIRAL NOTEPAD (المفكرة وهوية دار زخرفة التفاعلية) */}
      {/* ========================================================================= */}
      <section className="relative z-20 bg-gradient-to-b from-[#FAF8F5] via-[#F4EEE6] to-[#FAF8F5]">
        <NotebookLookbook />
      </section>

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
