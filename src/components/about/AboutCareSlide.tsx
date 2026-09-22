'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Sparkles, HeartHandshake } from 'lucide-react';
import {
  RoyalWarrantySealIcon,
  WhiteGloveCareIcon,
} from './ArtisanalIcons';

export const AboutCareSlide: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Lag-free rising entrance as this card slides over Section 4,
  // Subtle scale-down as next section slides over it
  const stageOpacity = useTransform(scrollYProgress, [0.75, 0.98], [1, 0.7]);
  const stageScale = useTransform(scrollYProgress, [0.75, 0.98], [1, 0.96]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[140vh] sm:h-[160vh] z-40"
    >
      <div className="sticky top-0 min-h-screen w-full flex flex-col justify-center items-center bg-[#F6F2ED] text-[#0B3D42] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-[0_-30px_60px_rgba(0,0,0,0.15)] border-t border-stone-200/80">
        {/* Chapter Marker (Clear typography) */}
        <div className="absolute top-4 right-6 sm:top-6 sm:right-10 flex items-center gap-2.5 text-stone-500 text-xs select-none">
          <span className="w-2 h-2 rounded-full bg-[#E17F3F]" />
          <span className="font-mono font-bold text-stone-600 text-[13px]">05 / 06</span>
          <span className="text-stone-300">•</span>
          <span className="font-sans font-semibold text-stone-700">راحة البال وخدمة VIP</span>
        </div>

        <motion.div
          style={{ opacity: stageOpacity, scale: stageScale }}
          className="relative z-10 mx-auto max-w-5xl w-full will-change-[transform,opacity]"
        >
        {/* Header with generous font spacing */}
        <div className="text-center max-w-xl mx-auto mb-4 sm:mb-8 space-y-1.5 sm:space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#0B3D42]/5 border border-[#0B3D42]/15 text-[#0B3D42] text-[11px] sm:text-xs font-bold shadow-2xs"
          >
            <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#E17F3F]" />
            <span>التزامنا الكامل بعد الشراء</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B3D42] tracking-tight leading-[1.3] sm:leading-[1.28]"
            style={{ fontFamily: 'var(--font-alexandria), sans-serif' }}
          >
            تجربة فندقية تليق بك وببيتك
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-600 text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-2"
          >
            علاقتنا معك لا تنتهي عند استلام القطعة، بل تبدأ من لحظة دخولها بيتك.
          </motion.p>
        </div>

        {/* 2 VIP Cards: Compact on Mobile, 2-cols on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-8">
          {/* Card 1: Royal Warranty */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-4 sm:p-10 rounded-2xl sm:rounded-3xl bg-white border border-stone-200 shadow-md hover:shadow-2xl text-right flex flex-col justify-between transition-all duration-300 relative group overflow-hidden"
          >
            {/* Top Accent Strip */}
            <div className="absolute top-0 right-0 left-0 h-1 sm:h-1.5 bg-gradient-to-r from-[#0B3D42] to-[#E17F3F]" />

            <div>
              <div className="flex items-center justify-between mb-2.5 sm:mb-5">
                <div className="w-8 h-8 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#0B3D42]/5 text-[#0B3D42] group-hover:text-[#E17F3F] flex items-center justify-center transition-colors">
                  <RoyalWarrantySealIcon className="w-4 h-4 sm:w-7 sm:h-7" />
                </div>
                <span className="text-[11px] sm:text-xs font-mono font-black text-stone-300">5 YEARS</span>
              </div>

              <h3 className="text-base sm:text-2xl font-black text-[#0B3D42] leading-snug sm:leading-[1.4] mb-1.5 sm:mb-3">
                شهادة ضمان 5 سنوات معتمدة
              </h3>

              <p className="text-[11px] sm:text-[13.5px] text-stone-600 leading-relaxed sm:leading-[1.85] mb-3 sm:mb-5 line-clamp-3 sm:line-clamp-none">
                نضمن لك الهياكل الخشبية المصمتة والوصلات وحشوات الإسفنج الطبي ضد عيوب الصناعة أو الهبوط لمدة 5 أعوام كاملة، مع صيانة فورية عند الحاجة.
              </p>
            </div>

            <div className="pt-2 sm:pt-3.5 border-t border-stone-100 text-[10px] sm:text-xs font-bold text-[#E17F3F] flex items-center gap-1.5">
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span>شهادة ضمان ورقية مع كل فاتورة</span>
            </div>
          </motion.div>

          {/* Card 2: White Glove VIP Delivery */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-4 sm:p-10 rounded-2xl sm:rounded-3xl bg-white border border-stone-200 shadow-md hover:shadow-2xl text-right flex flex-col justify-between transition-all duration-300 relative group overflow-hidden"
          >
            {/* Top Accent Strip */}
            <div className="absolute top-0 right-0 left-0 h-1 sm:h-1.5 bg-gradient-to-r from-[#E17F3F] to-[#0B3D42]" />

            <div>
              <div className="flex items-center justify-between mb-2.5 sm:mb-5">
                <div className="w-8 h-8 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#E17F3F]/10 text-[#E17F3F] group-hover:text-[#0B3D42] flex items-center justify-center transition-colors">
                  <WhiteGloveCareIcon className="w-4 h-4 sm:w-7 sm:h-7" />
                </div>
                <span className="text-[11px] sm:text-xs font-mono font-black text-stone-300">VIP CARE</span>
              </div>

              <h3 className="text-base sm:text-2xl font-black text-[#0B3D42] leading-snug sm:leading-[1.4] mb-1.5 sm:mb-3">
                توصيل وتركيب VIP فندقي
              </h3>

              <p className="text-[11px] sm:text-[13.5px] text-stone-600 leading-relaxed sm:leading-[1.85] mb-3 sm:mb-5 line-clamp-3 sm:line-clamp-none">
                فريق مدرب من الفنيين المحترفين يقومون بنقل قطع الأثاث وتركيبها وتنسيقها داخل منزلك بعناية فائقة ونظافة تامة، مع إزالة كافة مواد التغليف.
              </p>
            </div>

            <div className="pt-2 sm:pt-3.5 border-t border-stone-100 text-[10px] sm:text-xs font-bold text-[#0B3D42] flex items-center gap-1.5">
              <HeartHandshake className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#E17F3F]" />
              <span>مواعيد تسليم دقيقة بدون تأخير</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};
