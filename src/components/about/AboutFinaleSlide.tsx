'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, MessageCircle, Compass } from 'lucide-react';
import { WhatsAppIcon } from '@/components/common/BrandIcons';

interface AboutFinaleSlideProps {
  whatsappNumber: string;
}

export const AboutFinaleSlide: React.FC<AboutFinaleSlideProps> = ({ whatsappNumber }) => {
  return (
    <section
      className="relative z-50 w-full min-h-[65vh] sm:min-h-[75vh] flex flex-col justify-center items-center bg-gradient-to-b from-[#07262A] via-[#07262A] to-[#0B3D42] text-white pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 text-center overflow-hidden shadow-[0_-30px_60px_rgba(0,0,0,0.4)] border-t border-white/10"
    >
      {/* Luxury Ambient Radial Glow (Deep Emerald & Warm Radiant Copper) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,127,63,0.22),transparent_65%),radial-gradient(circle_at_top_right,rgba(11,61,66,0.4),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Chapter Marker */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10 flex items-center gap-2.5 text-stone-300 text-xs select-none">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E17F3F] shadow-[0_0_8px_#E17F3F]" />
        <span className="font-mono font-bold text-stone-100 text-[13px]">06 / 06</span>
        <span className="text-stone-500">•</span>
        <span className="font-sans font-semibold text-stone-200">الخطوة التالية</span>
      </div>

      {/* Main Content: 100% Solid, Vivid, Never Faded, Never Disappears */}
      <div className="relative z-10 mx-auto max-w-3xl space-y-6 sm:space-y-8 opacity-100">
        
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/20 text-[#F3B084] text-[11px] sm:text-xs font-bold shadow-lg backdrop-blur-md">
          <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#E17F3F]" />
          <span>خلّي بيتك يحكي حكايتك مع دار زخرفة</span>
        </div>

        {/* Master Headline: High Contrast & Vibrant Gold Gradient */}
        <h2
          className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.34] sm:leading-[1.28] tracking-tight"
          style={{ fontFamily: 'var(--font-alexandria), sans-serif' }}
        >
          جاهز تلاقي القطعة اللي{' '}
          <span className="block text-transparent bg-clip-text bg-gradient-to-l from-[#F59E0B] via-[#E17F3F] to-[#F3B084] mt-1.5 sm:mt-2 drop-shadow-sm">
            تكمّل بيتك وتعيش لأجيال؟
          </span>
        </h2>

        {/* Subtitle: Crisp White-Champagne Tone */}
        <p className="text-stone-200 text-xs sm:text-base lg:text-lg leading-relaxed sm:leading-[1.9] max-w-xl mx-auto pt-0.5 sm:pt-1 font-normal">
          تصفح أحدث أطقم الصالونات والمعيشة، غرف النوم، وطاولات السفرة المصنوعة بخشب الزان الروماني وأفخم الأقمشة الإيطالية، أو اطلب تفصيل أبعاد وألوان مخصصة تماماً لمساحتك.
        </p>

        {/* High-Impact Action Buttons: Radiant, Bold, Clickable */}
        <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full max-w-sm sm:max-w-none mx-auto">
          {/* Primary CTA: Radiant Copper Button with Glow */}
          <Link
            href="/categories"
            className="w-full sm:w-auto justify-center group relative inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4.5 rounded-full bg-gradient-to-l from-[#DE7635] via-[#E17F3F] to-[#E99056] text-white text-xs sm:text-sm font-black shadow-[0_12px_35px_rgba(225,127,63,0.45)] hover:shadow-[0_16px_45px_rgba(225,127,63,0.65)] hover:brightness-110 transition-all duration-200 active:scale-98 overflow-hidden"
          >
            <span className="relative z-10">استكشف الكتالوج الشامل</span>
            <ArrowLeft className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:-translate-x-1.5" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Link>

          {/* Secondary CTA: WhatsApp VIP Consultation */}
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              'مرحباً زخرفة، أود الاستفسار عن تفصيل قطعة أثاث خاصة أو زيارة المعرض.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto justify-center inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4.5 rounded-full bg-white/10 hover:bg-[#25D366]/20 text-white text-xs sm:text-sm font-bold border border-white/25 hover:border-[#25D366]/60 transition-all duration-200 shadow-md active:scale-98 backdrop-blur-md"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            <span>تواصل مباشرة عبر واتساب</span>
          </a>
        </div>

        {/* Quality Badges Strip */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] sm:text-xs font-semibold text-stone-300">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E17F3F]" />
            <span>خشب زان أحمر مصمت</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>ضمان 5 سنوات شامل</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E17F3F]" />
            <span>توصيل وتركيب VIP</span>
          </div>
        </div>

      </div>
    </section>
  );
};
